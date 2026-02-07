-- Comprehensive Cleanup of Recursive Policies
-- This script dynamically drops ALL policies on affected tables to ensure no "hidden" recursive policies remain.

DO $$
DECLARE
    pol record;
BEGIN
    -- 1. Drop ALL policies on organization_members
    -- (Legacy table causing recursion)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'organization_members') THEN
        FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'organization_members' LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.organization_members', pol.policyname);
        END LOOP;
    END IF;

    -- 2. Drop ALL policies on workspace_members
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'workspace_members' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.workspace_members', pol.policyname);
    END LOOP;

    -- 3. Drop ALL policies on workspaces
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'workspaces' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.workspaces', pol.policyname);
    END LOOP;

    -- 4. Drop ALL policies on brands
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'brands' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.brands', pol.policyname);
    END LOOP;

    -- 5. Drop ALL policies on assets
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'assets' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.assets', pol.policyname);
    END LOOP;
END $$;


-- =========================================================
-- RE-APPLY SAFE POLICIES
-- =========================================================

-- Ensure Helper Functions Exist (Crucial)
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

-- 1. Workspaces Policies
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
  FOR SELECT USING (
    owner_id = auth.uid() OR
    id = ANY(public.get_my_workspace_ids())
  );

CREATE POLICY "Users can create workspaces" ON public.workspaces
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners and admins can update workspaces" ON public.workspaces
  FOR UPDATE USING (
    owner_id = auth.uid() OR
    public.is_workspace_admin(id)
  );

-- 2. Workspace Members Policies
CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members
  FOR SELECT USING (
    public.is_workspace_member(workspace_id)
    OR
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
  );

CREATE POLICY "Workspace owners and admins can insert members" ON public.workspace_members
  FOR INSERT WITH CHECK (
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    OR
    public.is_workspace_admin(workspace_id)
  );

CREATE POLICY "Workspace owners and admins can update members" ON public.workspace_members
  FOR UPDATE USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    OR
    public.is_workspace_admin(workspace_id)
  );

CREATE POLICY "Workspace owners and admins can delete members" ON public.workspace_members
  FOR DELETE USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    OR
    public.is_workspace_admin(workspace_id)
  );

-- 3. Brands Policies
CREATE POLICY "Users can view brands" ON public.brands
  FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
  );

CREATE POLICY "Users can insert their brands" ON public.brands
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "Users can update their brands" ON public.brands
  FOR UPDATE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id) OR 
    (workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role = 'art_director'))
  );

CREATE POLICY "Users can delete their brands" ON public.brands
  FOR DELETE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id)
  );

-- 4. Assets Policies
CREATE POLICY "Users can view assets" ON public.assets
  FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
  );

CREATE POLICY "Users can insert their assets" ON public.assets
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "Users can update their assets" ON public.assets
  FOR UPDATE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id) OR
    (workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role = 'art_director'))
  );

CREATE POLICY "Users can delete their assets" ON public.assets
  FOR DELETE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id)
  );

-- 5. Safe stub for organization_members
-- Leave it with ONE safe policy so queries don't fail, but return only user's own rows if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'organization_members') THEN
       EXECUTE 'CREATE POLICY "Safe view organization members" ON public.organization_members FOR SELECT USING (user_id = auth.uid())';
    END IF;
END $$;

-- 6. Add indexes if missing (crucial for performance)
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_brands_workspace_id ON public.brands(workspace_id);
CREATE INDEX IF NOT EXISTS idx_assets_workspace_id ON public.assets(workspace_id);
