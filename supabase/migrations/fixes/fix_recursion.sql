-- Fix Infinite Recursion in RLS Policies
-- =====================================

-- 1. Create secure helper functions (SECURITY DEFINER to bypass RLS loops)

CREATE OR REPLACE FUNCTION public.get_my_workspace_ids()
RETURNS UUID[]
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    workspace_ids UUID[];
BEGIN
    SELECT ARRAY_AGG(workspace_id)
    INTO workspace_ids
    FROM public.workspace_members
    WHERE user_id = auth.uid();

    RETURN COALESCE(workspace_ids, '{}');
END;
$$;

CREATE OR REPLACE FUNCTION public.is_workspace_member(_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.workspace_members
        WHERE workspace_id = _workspace_id
        AND user_id = auth.uid()
    );
END;
$$;

-- 2. Update Workspaces Policies to break recursion
-- Drop potentially recursive policy
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;

-- Re-create using secure function
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
  FOR SELECT USING (
    owner_id = auth.uid() OR
    id = ANY(public.get_my_workspace_ids())
  );

-- 3. Update Workspace Members Policies to break recursion
-- Drop potentially recursive policy
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;

-- Re-create using secure function
CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members
  FOR SELECT USING (
    -- Safe check using security definer function
    public.is_workspace_member(workspace_id)
    OR
    -- Check ownership (this queries workspaces, which now uses safe policy)
    EXISTS (
        SELECT 1 FROM public.workspaces
        WHERE id = public.workspace_members.workspace_id
        AND owner_id = auth.uid()
    )
  );

-- 4. Handle legacy/alias 'organization_members' if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'organization_members') THEN
        -- Drop recursive policy if it exists
        DROP POLICY IF EXISTS "Users can view members of their organizations" ON public.organization_members;
        DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.organization_members; -- In case name matches

        -- Try to enable RLS checks using the same secure functions if applicable
        -- Assuming organization_members structure matches workspace_members
        
        -- We won't re-create the policy blindly as columns might differ, 
        -- but dropping the recursive one stops the error.
        -- If this table is critical, the user should migrate to workspace_members.
    END IF;
END
$$;
