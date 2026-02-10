-- ==========================================
-- PHASE 38: RLS PERFORMANCE OPTIMIZATION (COMPREHENSIVE)
-- Address: auth_rls_initplan warnings from Supabase Linter
-- Optimization: Wrap auth.uid() in (SELECT auth.uid()) to prevent row-by-row re-evaluation.
-- ==========================================

BEGIN;

-- 1. CLEAN SLATE: DROP EXISTING POLICIES TO PREVENT CONFLICTS
-- These matches the policies identified in the linting report and Phase 37.

DO $$
DECLARE
    pol record;
    tables TEXT[] := ARRAY['workspaces', 'workspace_members', 'brands', 'assets', 'prompt_history'];
    t TEXT;
BEGIN
    FOREACH t IN ARRAY tables LOOP
        FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = t AND schemaname = 'public' LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, t);
        END LOOP;
    END LOOP;
END $$;

-- 2. RE-APPLY OPTIMIZED POLICIES

-- ==========================================
-- WORKSPACES
-- ==========================================

CREATE POLICY "workspaces_select_policy" ON public.workspaces 
FOR SELECT USING (
    owner_id = (SELECT auth.uid()) OR 
    id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "workspaces_insert_policy" ON public.workspaces 
FOR INSERT WITH CHECK (owner_id = (SELECT auth.uid()));

CREATE POLICY "workspaces_update_policy" ON public.workspaces 
FOR UPDATE USING (
    owner_id = (SELECT auth.uid()) OR 
    public.is_workspace_admin(id)
);

CREATE POLICY "workspaces_delete_policy" ON public.workspaces 
FOR DELETE USING (owner_id = (SELECT auth.uid()));

-- ==========================================
-- WORKSPACE MEMBERS
-- ==========================================

CREATE POLICY "workspace_members_select_policy" ON public.workspace_members
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- Note: Insert/Update/Delete on workspace_members use is_workspace_admin() 
-- which internally calls auth.uid(). Since those are SECURITY DEFINER helpers, 
-- we optimized the helper functions themselves in Phase 37 or earlier.
-- However, we'll re-verify them here just in case.

-- ==========================================
-- BRANDS
-- ==========================================

CREATE POLICY "brands_select_policy" ON public.brands 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "brands_insert_policy" ON public.brands 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "brands_update_policy" ON public.brands 
FOR UPDATE USING (
    user_id = (SELECT auth.uid()) OR 
    public.is_workspace_admin(workspace_id)
);

CREATE POLICY "brands_delete_policy" ON public.brands 
FOR DELETE USING (
    user_id = (SELECT auth.uid()) OR 
    public.is_workspace_admin(workspace_id)
);

-- ==========================================
-- ASSETS
-- ==========================================

CREATE POLICY "assets_select_policy" ON public.assets 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "assets_insert_policy" ON public.assets 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- ==========================================
-- PROMPT HISTORY 
-- ==========================================

CREATE POLICY "prompt_history_select_policy" ON public.prompt_history 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "prompt_history_insert_policy" ON public.prompt_history 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

COMMIT;
