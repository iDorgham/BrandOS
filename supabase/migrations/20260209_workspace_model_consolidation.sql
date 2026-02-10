-- ==========================================
-- PHASE 36: WORKSPACE MODEL CONSOLIDATION
-- Address: RLS Recursion and Legacy Organization References
-- ==========================================

BEGIN;

-- 1. Helper Functions (SECURITY DEFINER)
-- These bypass RLS to prevent recursion during permission checks.

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

-- 2. Clean up ALL previous policies on core tables to ensure a clean slate.
-- This handles legacy migrations that reintroduced recursion or organization references.

DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
DROP POLICY IF EXISTS "Users can view workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_select_policy" ON public.workspaces;
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "workspace_members_select_policy" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
DROP POLICY IF EXISTS "brands_select_policy" ON public.brands;
DROP POLICY IF EXISTS "Users can view assets" ON public.assets;
DROP POLICY IF EXISTS "assets_select_policy" ON public.assets;

-- 3. APPLY CONSOLIDATED WORKSPACE POLICIES

-- WORKSPACES
CREATE POLICY "workspaces_select_policy" ON public.workspaces 
FOR SELECT USING (
    owner_id = (SELECT auth.uid()) OR 
    id = ANY(public.get_my_workspace_ids())
);

-- WORKSPACE MEMBERS
-- Note: Must use a subquery that doesn't trigger recursion. 
-- Checking if user is the OWNER of the target workspace OR if they are a member of it.
CREATE POLICY "workspace_members_select_policy" ON public.workspace_members
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = (SELECT auth.uid())) OR
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- BRANDS
-- Isolated by workspace OR ownership. Strictly removes organization_id references.
CREATE POLICY "brands_select_policy" ON public.brands 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- ASSETS
-- Isolated by workspace OR ownership. Strictly removes organization_id references.
CREATE POLICY "assets_select_policy" ON public.assets 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- 4. FINAL INDEXING FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_brands_workspace_user ON public.brands(workspace_id, user_id);
CREATE INDEX IF NOT EXISTS idx_assets_workspace_user ON public.assets(workspace_id, user_id);

COMMIT;
