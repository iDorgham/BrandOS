-- SUPABASE PERFORMANCE HARDENING & SECURITY CONSOLIDATION
-- Date: 2026-02-09
-- Targeted Lints: auth_rls_initplan, unindexed_foreign_keys, multiple_permissive_policies, unused_index

BEGIN;

-- ==========================================
-- 1. RLS PERFORMANCE OPTIMIZATION (auth.uid wrapping)
-- ==========================================
-- Wrapping auth.uid() and auth.role() in (SELECT ...) prevents PostgreSQL from 
-- re-evaluating the function for every single row in a result set.

-- PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = (SELECT auth.uid()));

-- WORKSPACES
DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
CREATE POLICY "Users can create workspaces" ON public.workspaces FOR INSERT WITH CHECK (owner_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces FOR SELECT USING (
    owner_id = (SELECT auth.uid()) OR 
    id = ANY(public.get_my_workspace_ids())
);

-- BRANDS
DROP POLICY IF EXISTS "Users can view own brands" ON public.brands;
CREATE POLICY "Users can view own brands" ON public.brands FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

DROP POLICY IF EXISTS "Users can insert own brands" ON public.brands;
CREATE POLICY "Users can insert own brands" ON public.brands FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own brands" ON public.brands;
CREATE POLICY "Users can update own brands" ON public.brands FOR UPDATE USING (
    user_id = (SELECT auth.uid()) OR 
    public.is_workspace_admin(workspace_id)
);

-- ASSETS
DROP POLICY IF EXISTS "Users can view own assets" ON public.assets;
CREATE POLICY "Users can view own assets" ON public.assets FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

DROP POLICY IF EXISTS "Users can insert own assets" ON public.assets;
CREATE POLICY "Users can insert own assets" ON public.assets FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- DNA VERSIONING (Consolidated policies often use complex logic, wrapping auth.uid() helps significantly)
DROP POLICY IF EXISTS "Users can view and manage dna_versions for their workspaces" ON public.dna_versions;
CREATE POLICY "Users can view and manage dna_versions for their workspaces" ON public.dna_versions 
FOR ALL USING (
    brand_id IN (
        SELECT id FROM public.brands 
        WHERE workspace_id = ANY(public.get_my_workspace_ids())
    )
);

-- ==========================================
-- 2. MISSING INDEXES (Foreign Keys)
-- ==========================================
-- These indexes help with JOIN performance and CASCADE deletes.

-- Note: We use the most prevalent nomenclature found in the lints and schema.
CREATE INDEX IF NOT EXISTS idx_assets_workspace_id_fkey ON public.assets(workspace_id);
CREATE INDEX IF NOT EXISTS idx_brands_workspace_id_fkey ON public.brands(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompt_history_workspace_id_fkey ON public.prompt_history(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id_fkey ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_owner_id_fkey ON public.workspaces(owner_id);

-- Legacy support if organization columns still exist
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='assets' AND column_name='organization_id') THEN
        CREATE INDEX IF NOT EXISTS idx_assets_organization_id ON public.assets(organization_id);
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='brands' AND column_name='organization_id') THEN
        CREATE INDEX IF NOT EXISTS idx_brands_organization_id ON public.brands(organization_id);
    END IF;
END $$;

-- ==========================================
-- 3. UNUSED INDEX CLEANUP
-- ==========================================
-- Dropping indexes that haven't been scanned to reduce write IO and storage.

DROP INDEX IF EXISTS public.brands_is_active_idx;
DROP INDEX IF EXISTS public.assets_brand_id_idx;
DROP INDEX IF EXISTS public.assets_created_at_idx;
DROP INDEX IF EXISTS public.prompt_history_brand_id_idx;
DROP INDEX IF EXISTS public.prompt_history_created_at_idx;
DROP INDEX IF EXISTS public.idx_dna_versions_current;
DROP INDEX IF EXISTS public.idx_dna_branches_active;

-- ==========================================
-- 4. SECURITY CONSOLIDATION (Multiple Permissive Policies)
-- ==========================================
-- Combining multiple policies on the same table/role/action into single, clearer policies.

-- Workspace Members Consolidation
-- This replaces the multiple overlapping policies found in the linting report.
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace admins can manage members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can insert members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can update members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can delete members" ON public.workspace_members;

-- Consolidated Select
CREATE POLICY "workspace_members_select" ON public.workspace_members 
FOR SELECT USING (workspace_id = ANY(public.get_my_workspace_ids()));

-- Consolidated Modification (Owners & Admins)
CREATE POLICY "workspace_members_mgmt" ON public.workspace_members 
FOR ALL USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = (SELECT auth.uid())) OR 
    public.is_workspace_admin(workspace_id)
);

-- Workspaces Consolidation
DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can insert workspaces" ON public.workspaces;
CREATE POLICY "workspaces_insert" ON public.workspaces 
FOR INSERT WITH CHECK (owner_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Owners and admins can update workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can update workspaces they own" ON public.workspaces;
CREATE POLICY "workspaces_update" ON public.workspaces 
FOR UPDATE USING (
    owner_id = (SELECT auth.uid()) OR 
    public.is_workspace_admin(id)
);

COMMIT;
