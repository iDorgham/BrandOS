-- Fix Infinite Recursion in RLS Policies

-- 1. Helper functions (SECURITY DEFINER)
-- Bypasses RLS to prevent recursion when querying membership
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

CREATE OR REPLACE FUNCTION public.is_workspace_admin(_workspace_id UUID)
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
        AND role = 'admin'
    );
END;
$$;

-- 2. Fix Workspaces Policy (SELECT)
-- Original policy queried workspace_members which queried workspaces -> cycle
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
  FOR SELECT USING (
    owner_id = auth.uid() OR
    id = ANY(public.get_my_workspace_ids())
  );

-- 3. Fix Workspace Members Policy (SELECT)
-- Original policy queried itself -> recursion
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members
  FOR SELECT USING (
    public.is_workspace_member(workspace_id)
    OR
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
  );

-- 4. Fix Workspace Members Policy (UPDATE)
-- Original policy queried itself -> recursion
DROP POLICY IF EXISTS "Workspace owners and admins can update members" ON public.workspace_members;
CREATE POLICY "Workspace owners and admins can update members" ON public.workspace_members
  FOR UPDATE USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    OR
    public.is_workspace_admin(workspace_id)
  );

-- 5. Cleanup legacy policies from earlier botched migrations if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view members of their organizations') THEN
        DROP POLICY "Users can view members of their organizations" ON public.organization_members;
    END IF;
END $$;
