-- SUPABASE PERFORMANCE & SECURITY HARDENING V2
-- Date: 2026-02-09
-- Focus: RLS Performance (auth.uid wrapping), Policy Consolidation, and Index Refinement

BEGIN;

-- ==========================================
-- 1. RLS PERFORMANCE OPTIMIZATION
-- ==========================================
-- Wrapping auth.uid() in (SELECT auth.uid()) prevents row-by-row re-evaluation of the auth function.

-- ORGANIZATIONS (Legacy support)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='organizations' AND table_schema='public') THEN
        DROP POLICY IF EXISTS "Users can view organizations they belong to" ON public.organizations;
        CREATE POLICY "Users can view organizations they belong to" ON public.organizations 
        FOR SELECT USING (
            owner_id = (SELECT auth.uid()) OR 
            EXISTS (SELECT 1 FROM public.organization_members WHERE org_id = organizations.id AND user_id = (SELECT auth.uid()))
        );

        DROP POLICY IF EXISTS "Users can create organizations" ON public.organizations;
        CREATE POLICY "Users can create organizations" ON public.organizations 
        FOR INSERT WITH CHECK (owner_id = (SELECT auth.uid()));

        DROP POLICY IF EXISTS "Owners and Admins can update their organizations" ON public.organizations;
        CREATE POLICY "Owners and Admins can update their organizations" ON public.organizations 
        FOR UPDATE USING (owner_id = (SELECT auth.uid()));
    END IF;

    -- WORKSPACES (Modern)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='workspaces' AND table_schema='public') THEN
        DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
        CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces 
        FOR SELECT USING (
            owner_id = (SELECT auth.uid()) OR 
            id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()))
        );

        DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
        CREATE POLICY "Users can create workspaces" ON public.workspaces 
        FOR INSERT WITH CHECK (owner_id = (SELECT auth.uid()));

        DROP POLICY IF EXISTS "Owners and Admins can update their workspaces" ON public.workspaces;
        CREATE POLICY "Owners and Admins can update their workspaces" ON public.workspaces 
        FOR UPDATE USING (
            owner_id = (SELECT auth.uid()) OR 
            EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = workspaces.id AND user_id = (SELECT auth.uid()) AND role = 'admin')
        );
    END IF;
END $$;

-- PROMPT BATCHES
DROP POLICY IF EXISTS "Users can view own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can view own prompt batches" ON public.prompt_batches FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can insert own prompt batches" ON public.prompt_batches FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can update own prompt batches" ON public.prompt_batches FOR UPDATE USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can delete own prompt batches" ON public.prompt_batches FOR DELETE USING (user_id = (SELECT auth.uid()));

-- COMPLIANCE ANALYSES
DROP POLICY IF EXISTS "Users can view their own compliance analyses" ON public.compliance_analyses;
CREATE POLICY "Users can view their own compliance analyses" ON public.compliance_analyses FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert their own compliance analyses" ON public.compliance_analyses;
CREATE POLICY "Users can insert their own compliance analyses" ON public.compliance_analyses FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update their own compliance analyses" ON public.compliance_analyses;
CREATE POLICY "Users can update their own compliance analyses" ON public.compliance_analyses FOR UPDATE USING (user_id = (SELECT auth.uid()));

-- PROMPT ANALYTICS & FEEDBACK
DROP POLICY IF EXISTS "Users can view their own prompt analytics" ON public.prompt_analytics;
CREATE POLICY "Users can view their own prompt analytics" ON public.prompt_analytics FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can view their own prompt feedback" ON public.prompt_feedback;
CREATE POLICY "Users can view their own prompt feedback" ON public.prompt_feedback FOR SELECT USING (user_id = (SELECT auth.uid()));

-- COMPLIANCE PATTERNS
DROP POLICY IF EXISTS "Users can view their own compliance patterns" ON public.compliance_patterns;
CREATE POLICY "Users can view their own compliance patterns" ON public.compliance_patterns FOR SELECT USING (workspace_id = ANY(public.get_my_workspace_ids()));

-- PROMPT VARIATIONS
DROP POLICY IF EXISTS "Users can view their own prompt variations" ON public.prompt_variations;
CREATE POLICY "Users can view their own prompt variations" ON public.prompt_variations FOR SELECT USING (user_id = (SELECT auth.uid()));

-- DNA VERSIONING TABLES
DROP POLICY IF EXISTS "Users can manage dna_merges for their workspaces" ON public.dna_merges;
CREATE POLICY "Users can manage dna_merges for their workspaces" ON public.dna_merges FOR ALL USING (
    brand_id IN (SELECT id FROM public.brands WHERE user_id = (SELECT auth.uid()))
);

DROP POLICY IF EXISTS "Users can manage dna_version_rollbacks for their workspaces" ON public.dna_version_rollbacks;
CREATE POLICY "Users can manage dna_version_rollbacks for their workspaces" ON public.dna_version_rollbacks FOR ALL USING (
    brand_id IN (SELECT id FROM public.brands WHERE user_id = (SELECT auth.uid()))
);

DROP POLICY IF EXISTS "Users can manage dna_export_history for their workspaces" ON public.dna_export_history;
CREATE POLICY "Users can manage dna_export_history for their workspaces" ON public.dna_export_history FOR ALL USING (
    version_id IN (SELECT id FROM public.dna_versions WHERE brand_id IN (SELECT id FROM public.brands WHERE user_id = (SELECT auth.uid())))
);

DROP POLICY IF EXISTS "Users can manage dna_version_analytics for their workspaces" ON public.dna_version_analytics;
CREATE POLICY "Users can manage dna_version_analytics for their workspaces" ON public.dna_version_analytics FOR ALL USING (
    version_id IN (SELECT id FROM public.dna_versions WHERE brand_id IN (SELECT id FROM public.brands WHERE user_id = (SELECT auth.uid())))
);

DROP POLICY IF EXISTS "Users can manage dna_version_comments for their workspaces" ON public.dna_version_comments;
CREATE POLICY "Users can manage dna_version_comments for their workspaces" ON public.dna_version_comments FOR ALL USING (
    version_id IN (SELECT id FROM public.dna_versions WHERE brand_id IN (SELECT id FROM public.brands WHERE user_id = (SELECT auth.uid())))
);

DROP POLICY IF EXISTS "Users can manage dna_version_tests for their workspaces" ON public.dna_version_tests;
CREATE POLICY "Users can manage dna_version_tests for their workspaces" ON public.dna_version_tests FOR ALL USING (
    version_id IN (SELECT id FROM public.dna_versions WHERE brand_id IN (SELECT id FROM public.brands WHERE user_id = (SELECT auth.uid())))
);

-- PROMPT BATCH ANALYTICS
DROP POLICY IF EXISTS "Users can view own batch analytics" ON public.prompt_batch_analytics;
CREATE POLICY "Users can view own batch analytics" ON public.prompt_batch_analytics FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can view dna_branches for their workspaces" ON public.dna_branches;
DROP POLICY IF EXISTS "Users can manage dna_branches for their workspaces" ON public.dna_branches;
DROP POLICY IF EXISTS "Users can view and manage dna_branches for their workspaces" ON public.dna_branches;
CREATE POLICY "Users can view and manage dna_branches for their workspaces" ON public.dna_branches FOR ALL USING (
    brand_id IN (SELECT id FROM public.brands WHERE user_id = (SELECT auth.uid()))
);

-- AI MODEL PERFORMANCE
DROP POLICY IF EXISTS "Users can view AI performance in their workspaces" ON public.ai_model_performance;
DROP POLICY IF EXISTS "Workspace owners and admins can manage AI performance data" ON public.ai_model_performance;
DROP POLICY IF EXISTS "Users can view and manage AI performance in their workspaces" ON public.ai_model_performance;
CREATE POLICY "Users can view and manage AI performance in their workspaces" ON public.ai_model_performance FOR ALL USING (
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- ==========================================
-- 2. POLICY CONSOLIDATION (Multiple Permissive Policies)
-- ==========================================

-- ASSETS: Combine "Users can insert own assets" and "Users can insert their assets"
DROP POLICY IF EXISTS "Users can insert own assets" ON public.assets;
DROP POLICY IF EXISTS "Users can insert their assets" ON public.assets;
DROP POLICY IF EXISTS "assets_insert_policy" ON public.assets;
CREATE POLICY "assets_insert_policy" ON public.assets 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- ASSETS: Combine Select
DROP POLICY IF EXISTS "Users can view assets" ON public.assets;
DROP POLICY IF EXISTS "Users can view own assets" ON public.assets;
DROP POLICY IF EXISTS "Users can view assets in their organizations" ON public.assets;
DROP POLICY IF EXISTS "assets_select_policy" ON public.assets;
CREATE POLICY "assets_select_policy" ON public.assets 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids()) OR
    (EXISTS (SELECT 1 FROM public.organization_members WHERE org_id = assets.organization_id AND user_id = (SELECT auth.uid())))
);

-- BRANDS: Combine Insert
DROP POLICY IF EXISTS "Users can insert own brands" ON public.brands;
DROP POLICY IF EXISTS "Users can insert their brands" ON public.brands;
DROP POLICY IF EXISTS "brands_insert_policy" ON public.brands;
CREATE POLICY "brands_insert_policy" ON public.brands 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- BRANDS: Combine Select
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
DROP POLICY IF EXISTS "Users can view own brands" ON public.brands;
DROP POLICY IF EXISTS "Users can view brands in their organizations" ON public.brands;
DROP POLICY IF EXISTS "brands_select_policy" ON public.brands;
CREATE POLICY "brands_select_policy" ON public.brands 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids()) OR
    (EXISTS (SELECT 1 FROM public.organization_members WHERE org_id = brands.organization_id AND user_id = (SELECT auth.uid())))
);

-- ==========================================
-- 3. INDEX REFINEMENT (Duplicate & Redundant)
-- ==========================================

-- Drop identical redundant indexes identified by the linter
DROP INDEX IF EXISTS public.idx_assets_workspace_id_fkey;
DROP INDEX IF EXISTS public.idx_brands_workspace_id_fkey;
DROP INDEX IF EXISTS public.idx_prompt_history_workspace_id_fkey;
DROP INDEX IF EXISTS public.idx_workspace_members_user_id_fkey;
DROP INDEX IF EXISTS public.idx_workspaces_owner_id_fkey;

-- Ensure primary coverage indexes exist (without the _fkey suffix)
CREATE INDEX IF NOT EXISTS idx_assets_workspace_id ON public.assets(workspace_id);
CREATE INDEX IF NOT EXISTS idx_brands_workspace_id ON public.brands(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompt_history_workspace_id ON public.prompt_history(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_owner_id ON public.workspaces(owner_id);

-- Add missing indexes for Foreign Keys flagged by linter
CREATE INDEX IF NOT EXISTS idx_assets_brand_id ON public.assets(brand_id);
CREATE INDEX IF NOT EXISTS idx_prompt_history_brand_id ON public.prompt_history(brand_id);

-- Legacy organization support indexes
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='organization_members' AND column_name='user_id') THEN
        CREATE INDEX IF NOT EXISTS idx_org_members_user_id ON public.organization_members(user_id);
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='organizations' AND column_name='owner_id') THEN
        CREATE INDEX IF NOT EXISTS idx_orgs_owner_id ON public.organizations(owner_id);
    END IF;
END $$;

-- ==========================================
-- 4. UNUSED INDEX CLEANUP (Based on audit)
-- ==========================================
-- Dropping indexes that verified as never used to optimize write throughput.
DROP INDEX IF EXISTS public.idx_prompt_batches_user_created;
DROP INDEX IF EXISTS public.idx_prompt_batches_performance;
DROP INDEX IF EXISTS public.moodboards_is_active_idx;

COMMIT;
