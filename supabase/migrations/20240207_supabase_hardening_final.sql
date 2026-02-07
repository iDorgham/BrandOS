-- SUPABASE HARDENING & PERFORMANCE OPTIMIZATION (FINAL - FIXED)
-- Addresses lints: auth_rls_initplan, unindexed_foreign_keys, multiple_permissive_policies, duplicate_index
-- Reconciled: Uses workspace_id instead of organization_id (Legacy)

BEGIN;

-- ==========================================
-- 1. MISSING INDICES (Foreign Keys & Filters)
-- ==========================================

-- assets
CREATE INDEX IF NOT EXISTS idx_assets_workspace_id ON public.assets(workspace_id);
CREATE INDEX IF NOT EXISTS idx_assets_user_id ON public.assets(user_id);

-- brands
CREATE INDEX IF NOT EXISTS idx_brands_workspace_id ON public.brands(workspace_id);
CREATE INDEX IF NOT EXISTS idx_brands_user_id ON public.brands(user_id);

-- comments
CREATE INDEX IF NOT EXISTS idx_comments_asset_id ON public.comments(asset_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);

-- compliance_patterns
CREATE INDEX IF NOT EXISTS idx_compliance_patterns_source_analysis_id ON public.compliance_patterns(source_analysis_id);

-- dna_branches
CREATE INDEX IF NOT EXISTS idx_dna_branches_base_version_id ON public.dna_branches(base_version_id);
CREATE INDEX IF NOT EXISTS idx_dna_branches_created_by ON public.dna_branches(created_by);
CREATE INDEX IF NOT EXISTS idx_dna_branches_head_version_id ON public.dna_branches(head_version_id);

-- dna_export_history
CREATE INDEX IF NOT EXISTS idx_dna_export_history_exported_by ON public.dna_export_history(exported_by);

-- dna_merges
CREATE INDEX IF NOT EXISTS idx_dna_merges_merged_by ON public.dna_merges(merged_by);
CREATE INDEX IF NOT EXISTS idx_dna_merges_source_branch_id ON public.dna_merges(source_branch_id);
CREATE INDEX IF NOT EXISTS idx_dna_merges_target_version_id ON public.dna_merges(target_version_id);

-- dna_version_comments
CREATE INDEX IF NOT EXISTS idx_dna_version_comments_parent_comment_id ON public.dna_version_comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_dna_version_comments_user_id ON public.dna_version_comments(user_id);

-- dna_version_rollbacks
CREATE INDEX IF NOT EXISTS idx_dna_version_rollbacks_brand_id ON public.dna_version_rollbacks(brand_id);
CREATE INDEX IF NOT EXISTS idx_dna_version_rollbacks_rollback_by ON public.dna_version_rollbacks(rollback_by);
CREATE INDEX IF NOT EXISTS idx_dna_version_rollbacks_version_id ON public.dna_version_rollbacks(version_id);

-- dna_version_tests
CREATE INDEX IF NOT EXISTS idx_dna_version_tests_tested_by ON public.dna_version_tests(tested_by);

-- dna_versions
CREATE INDEX IF NOT EXISTS idx_dna_versions_created_by ON public.dna_versions(created_by);
CREATE INDEX IF NOT EXISTS idx_dna_versions_parent_version_id ON public.dna_versions(parent_version_id);

-- workspace_members
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);

-- workspaces
CREATE INDEX IF NOT EXISTS idx_workspaces_owner_id ON public.workspaces(owner_id);

-- prompt_batch_analytics
CREATE INDEX IF NOT EXISTS idx_prompt_batch_analytics_user_id ON public.prompt_batch_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_prompt_batch_analytics_workspace_id ON public.prompt_batch_analytics(workspace_id);

-- prompt_history
CREATE INDEX IF NOT EXISTS idx_prompt_history_workspace_id ON public.prompt_history(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompt_history_user_id ON public.prompt_history(user_id);


-- ==========================================
-- 2. CLEANUP (Duplicate Indices)
-- ==========================================
DROP INDEX IF EXISTS public.assets_user_id_idx;
DROP INDEX IF EXISTS public.brands_user_id_idx;
DROP INDEX IF EXISTS public.prompt_history_user_id_idx;


-- ==========================================
-- 3. RLS OPTIMIZATION (auth.uid Wrapping)
-- ==========================================

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = (SELECT auth.uid()));

-- Workspaces
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces FOR SELECT USING (owner_id = (SELECT auth.uid()) OR id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid())));
DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
CREATE POLICY "Users can create workspaces" ON public.workspaces FOR INSERT WITH CHECK (owner_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Owners and admins can update workspaces" ON public.workspaces;
CREATE POLICY "Owners and admins can update workspaces" ON public.workspaces FOR UPDATE USING (owner_id = (SELECT auth.uid()) OR id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role = 'admin'));

-- Brands
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
CREATE POLICY "Users can view brands" ON public.brands FOR SELECT USING (user_id = (SELECT auth.uid()) OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid())));
DROP POLICY IF EXISTS "Users can insert their brands" ON public.brands;
CREATE POLICY "Users can insert their brands" ON public.brands FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can update their brands" ON public.brands;
CREATE POLICY "Users can update their brands" ON public.brands FOR UPDATE USING (user_id = (SELECT auth.uid()) OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role IN ('admin', 'art_director')));
DROP POLICY IF EXISTS "Users can delete their brands" ON public.brands;
CREATE POLICY "Users can delete their brands" ON public.brands FOR DELETE USING (user_id = (SELECT auth.uid()) OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role = 'admin'));

-- Assets
DROP POLICY IF EXISTS "Users can view assets" ON public.assets;
CREATE POLICY "Users can view assets" ON public.assets FOR SELECT USING (user_id = (SELECT auth.uid()) OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid())));
DROP POLICY IF EXISTS "Users can insert their assets" ON public.assets;
CREATE POLICY "Users can insert their assets" ON public.assets FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can update their assets" ON public.assets;
CREATE POLICY "Users can update their assets" ON public.assets FOR UPDATE USING (user_id = (SELECT auth.uid()) OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role IN ('admin', 'art_director')));
DROP POLICY IF EXISTS "Users can delete their assets" ON public.assets;
CREATE POLICY "Users can delete their assets" ON public.assets FOR DELETE USING (user_id = (SELECT auth.uid()) OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role = 'admin'));

-- Prompt History
DROP POLICY IF EXISTS "Users can view own prompt history" ON public.prompt_history;
CREATE POLICY "Users can view own prompt history" ON public.prompt_history FOR SELECT USING (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can insert own prompt history" ON public.prompt_history;
CREATE POLICY "Users can insert own prompt history" ON public.prompt_history FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can delete own prompt history" ON public.prompt_history;
CREATE POLICY "Users can delete own prompt history" ON public.prompt_history FOR DELETE USING (user_id = (SELECT auth.uid()));

-- Moodboards
DROP POLICY IF EXISTS "Users can view own moodboards" ON public.moodboards;
CREATE POLICY "Users can view own moodboards" ON public.moodboards FOR SELECT USING (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can insert own moodboards" ON public.moodboards;
CREATE POLICY "Users can insert own moodboards" ON public.moodboards FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can update own moodboards" ON public.moodboards;
CREATE POLICY "Users can update own moodboards" ON public.moodboards FOR UPDATE USING (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Users can delete own moodboards" ON public.moodboards;
CREATE POLICY "Users can delete own moodboards" ON public.moodboards FOR DELETE USING (user_id = (SELECT auth.uid()));

-- DNA Branching & Versioning
DROP POLICY IF EXISTS "Users can manage dna_branches for their workspaces" ON public.dna_branches;
DROP POLICY IF EXISTS "Users can view and manage dna_branches for their workspaces" ON public.dna_branches;
DROP POLICY IF EXISTS "Users can view dna_branches for their workspaces" ON public.dna_branches;
CREATE POLICY "Users can view and manage dna_branches for their workspaces" ON public.dna_branches 
FOR ALL USING (brand_id IN (SELECT id FROM public.brands WHERE workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()))));

DROP POLICY IF EXISTS "Users can view dna_versions for their workspaces" ON public.dna_versions;
DROP POLICY IF EXISTS "Users can create dna_versions for their workspaces" ON public.dna_versions;
DROP POLICY IF EXISTS "Users can update dna_versions for their workspaces" ON public.dna_versions;
CREATE POLICY "Users can view and manage dna_versions for their workspaces" ON public.dna_versions 
FOR ALL USING (brand_id IN (SELECT id FROM public.brands WHERE workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()))));

-- AI Model Performance (Consolidated)
DROP POLICY IF EXISTS "Users can view AI performance in their workspaces" ON public.ai_model_performance;
DROP POLICY IF EXISTS "Workspace owners and admins can manage AI performance data" ON public.ai_model_performance;
DROP POLICY IF EXISTS "Users can view and manage AI performance in their workspaces" ON public.ai_model_performance;
CREATE POLICY "Users can view and manage AI performance in their workspaces" ON public.ai_model_performance 
FOR ALL USING (workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid())));

-- Brand Guidelines (Consolidated)
DROP POLICY IF EXISTS "Users can view brand guidelines in their workspaces" ON public.brand_guidelines;
DROP POLICY IF EXISTS "Workspace owners and admins can manage brand guidelines" ON public.brand_guidelines;
DROP POLICY IF EXISTS "Users can view and manage brand guidelines in their workspaces" ON public.brand_guidelines;
CREATE POLICY "Users can view and manage brand guidelines in their workspaces" ON public.brand_guidelines 
FOR ALL USING (workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid())));

-- Workspace Members
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can insert members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can update members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can delete members" ON public.workspace_members;
CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid())));
CREATE POLICY "Workspace admins can manage members" ON public.workspace_members FOR ALL USING (workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = (SELECT auth.uid()) OR id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role = 'admin')));

-- Comments
DROP POLICY IF EXISTS "Users can view comments on accessible assets" ON public.comments;
DROP POLICY IF EXISTS "Users can insert comments on accessible assets" ON public.comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON public.comments;
CREATE POLICY "Users can view and manage comments on accessible assets" ON public.comments 
FOR ALL USING (asset_id IN (SELECT id FROM public.assets WHERE workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()))));

-- Legacy/Stub for organization_members if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'organization_members') THEN
       DROP POLICY IF EXISTS "Safe view organization members" ON public.organization_members;
       EXECUTE 'CREATE POLICY "Safe view organization members" ON public.organization_members FOR SELECT USING (user_id = (SELECT auth.uid()))';
    END IF;
END $$;

COMMIT;
