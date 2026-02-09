-- ==========================================
-- PHASE 22: COMPREHENSIVE PERFORMANCE HARDENING (ROUND 2)
-- Addresses: Auth RLS InitPlan, Multiple Permissive Policies, Unindexed FKs
-- ==========================================

BEGIN;

-- ==========================================
-- 1. BRANDS: FULL CONSOLIDATION & HARDENING
-- ==========================================

-- Select
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
DROP POLICY IF EXISTS "Users can view own brands" ON public.brands;
DROP POLICY IF EXISTS "Users can view brands in their organizations" ON public.brands;
DROP POLICY IF EXISTS "Users can view their brands" ON public.brands;
DROP POLICY IF EXISTS "Users can view brands for their workspaces" ON public.brands;
DROP POLICY IF EXISTS "Users can view brands associated with their organizations" ON public.brands;
DROP POLICY IF EXISTS "brands_select_policy" ON public.brands;
CREATE POLICY "brands_select_policy" ON public.brands 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids()) OR
    (EXISTS (SELECT 1 FROM public.organization_members WHERE org_id = brands.organization_id AND user_id = (SELECT auth.uid())))
);

-- Insert
DROP POLICY IF EXISTS "Users can insert own brands" ON public.brands;
DROP POLICY IF EXISTS "Users can insert their brands" ON public.brands;
DROP POLICY IF EXISTS "brands_insert_policy" ON public.brands;
CREATE POLICY "brands_insert_policy" ON public.brands 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- Update
DROP POLICY IF EXISTS "Users can update own brands" ON public.brands;
DROP POLICY IF EXISTS "Users can update their brands" ON public.brands;
DROP POLICY IF EXISTS "brands_update_policy" ON public.brands;
CREATE POLICY "brands_update_policy" ON public.brands 
FOR UPDATE USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role IN ('admin', 'art_director'))
);

-- Delete
DROP POLICY IF EXISTS "Users can delete own brands" ON public.brands;
DROP POLICY IF EXISTS "Users can delete their brands" ON public.brands;
DROP POLICY IF EXISTS "brands_delete_policy" ON public.brands;
CREATE POLICY "brands_delete_policy" ON public.brands 
FOR DELETE USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role = 'admin')
);

-- ==========================================
-- 2. ASSETS: FULL CONSOLIDATION & HARDENING
-- ==========================================

-- Select
DROP POLICY IF EXISTS "Users can view assets" ON public.assets;
DROP POLICY IF EXISTS "Users can view own assets" ON public.assets;
DROP POLICY IF EXISTS "Users can view assets in their organizations" ON public.assets;
DROP POLICY IF EXISTS "Users can view their assets" ON public.assets;
DROP POLICY IF EXISTS "Users can view assets for their workspaces" ON public.assets;
DROP POLICY IF EXISTS "assets_select_policy" ON public.assets;
CREATE POLICY "assets_select_policy" ON public.assets 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids()) OR
    (EXISTS (SELECT 1 FROM public.organization_members WHERE org_id = assets.organization_id AND user_id = (SELECT auth.uid())))
);

-- Insert
DROP POLICY IF EXISTS "Users can insert own assets" ON public.assets;
DROP POLICY IF EXISTS "Users can insert their assets" ON public.assets;
DROP POLICY IF EXISTS "assets_insert_policy" ON public.assets;
CREATE POLICY "assets_insert_policy" ON public.assets 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- Update
DROP POLICY IF EXISTS "Users can update own assets" ON public.assets;
DROP POLICY IF EXISTS "Users can update their assets" ON public.assets;
DROP POLICY IF EXISTS "assets_update_policy" ON public.assets;
CREATE POLICY "assets_update_policy" ON public.assets 
FOR UPDATE USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role IN ('admin', 'art_director'))
);

-- Delete
DROP POLICY IF EXISTS "Users can delete own assets" ON public.assets;
DROP POLICY IF EXISTS "Users can delete their assets" ON public.assets;
DROP POLICY IF EXISTS "assets_delete_policy" ON public.assets;
CREATE POLICY "assets_delete_policy" ON public.assets 
FOR DELETE USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()) AND role = 'admin')
);

-- ==========================================
-- 3. WORKSPACES: CONSOLIDATION & HARDENING
-- ==========================================

-- Select
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
DROP POLICY IF EXISTS "Users can view workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_select" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_select_policy" ON public.workspaces;
CREATE POLICY "workspaces_select_policy" ON public.workspaces 
FOR SELECT USING (
    owner_id = (SELECT auth.uid()) OR 
    id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()))
);

-- Insert
DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_insert" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_insert_policy" ON public.workspaces;
CREATE POLICY "workspaces_insert_policy" ON public.workspaces 
FOR INSERT WITH CHECK ((SELECT auth.uid()) = owner_id);

-- Update
DROP POLICY IF EXISTS "Owners and admins can update workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Owners and Admins can update their workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_update" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_update_policy" ON public.workspaces;
CREATE POLICY "workspaces_update_policy" ON public.workspaces 
FOR UPDATE USING (
    owner_id = (SELECT auth.uid()) OR 
    EXISTS (SELECT 1 FROM public.workspace_members wm WHERE wm.workspace_id = workspaces.id AND wm.user_id = (SELECT auth.uid()) AND wm.role = 'admin')
);

-- Delete
DROP POLICY IF EXISTS "Users can delete workspaces they own" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_delete" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_delete_policy" ON public.workspaces;
CREATE POLICY "workspaces_delete_policy" ON public.workspaces 
FOR DELETE USING (owner_id = (SELECT auth.uid()));

-- ==========================================
-- 4. WORKSPACE MEMBERS: CONSOLIDATION
-- ==========================================

-- Select & Management
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can insert members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can update members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can delete members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can insert members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can delete members" ON public.workspace_members;
DROP POLICY IF EXISTS "workspace_members_select" ON public.workspace_members;
DROP POLICY IF EXISTS "workspace_members_mgmt" ON public.workspace_members;
DROP POLICY IF EXISTS "workspace_members_select_policy" ON public.workspace_members;
CREATE POLICY "workspace_members_select_policy" ON public.workspace_members
FOR SELECT USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = (SELECT auth.uid()))
    OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = (SELECT auth.uid()))
);

-- ==========================================
-- 5. PROMPT & COMPLIANCE: FULL HARDENING
-- ==========================================

-- PROMPT BATCHES
DROP POLICY IF EXISTS "Users can view own prompt batches" ON public.prompt_batches;
DROP POLICY IF EXISTS "Users can manage own prompt batches" ON public.prompt_batches;
DROP POLICY IF EXISTS "Users can insert own prompt batches" ON public.prompt_batches;
DROP POLICY IF EXISTS "Users can update own prompt batches" ON public.prompt_batches;
DROP POLICY IF EXISTS "Users can delete own prompt batches" ON public.prompt_batches;
DROP POLICY IF EXISTS "prompt_batches_all_policy" ON public.prompt_batches;
CREATE POLICY "prompt_batches_all_policy" ON public.prompt_batches FOR ALL USING (user_id = (SELECT auth.uid()));

-- PROMPT BATCH ANALYTICS
DROP POLICY IF EXISTS "Users can insert own batch analytics" ON public.prompt_batch_analytics;
DROP POLICY IF EXISTS "Users can view own batch analytics" ON public.prompt_batch_analytics;
DROP POLICY IF EXISTS "prompt_batch_analytics_select_policy" ON public.prompt_batch_analytics;
DROP POLICY IF EXISTS "prompt_batch_analytics_insert_policy" ON public.prompt_batch_analytics;
CREATE POLICY "prompt_batch_analytics_select_policy" ON public.prompt_batch_analytics FOR SELECT USING (user_id = (SELECT auth.uid()));
CREATE POLICY "prompt_batch_analytics_insert_policy" ON public.prompt_batch_analytics FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- PROMPT ANALYTICS
DROP POLICY IF EXISTS "Users can view their own prompt analytics" ON public.prompt_analytics;
DROP POLICY IF EXISTS "Users can insert their own prompt analytics" ON public.prompt_analytics;
DROP POLICY IF EXISTS "Users can update their own prompt analytics" ON public.prompt_analytics;
DROP POLICY IF EXISTS "prompt_analytics_all_policy" ON public.prompt_analytics;
CREATE POLICY "prompt_analytics_all_policy" ON public.prompt_analytics FOR ALL USING (user_id = (SELECT auth.uid()));

-- PROMPT FEEDBACK
DROP POLICY IF EXISTS "Users can view their own prompt feedback" ON public.prompt_feedback;
DROP POLICY IF EXISTS "Users can insert their own prompt feedback" ON public.prompt_feedback;
DROP POLICY IF EXISTS "Users can update their own prompt feedback" ON public.prompt_feedback;
DROP POLICY IF EXISTS "prompt_feedback_all_policy" ON public.prompt_feedback;
CREATE POLICY "prompt_feedback_all_policy" ON public.prompt_feedback FOR ALL USING (user_id = (SELECT auth.uid()));

-- COMPLIANCE PATTERNS
DROP POLICY IF EXISTS "Users can view their own compliance patterns" ON public.compliance_patterns;
DROP POLICY IF EXISTS "Users can insert their own compliance patterns" ON public.compliance_patterns;
DROP POLICY IF EXISTS "compliance_patterns_select_policy" ON public.compliance_patterns;
DROP POLICY IF EXISTS "compliance_patterns_insert_policy" ON public.compliance_patterns;
CREATE POLICY "compliance_patterns_select_policy" ON public.compliance_patterns FOR SELECT USING (workspace_id = ANY(public.get_my_workspace_ids()));
CREATE POLICY "compliance_patterns_insert_policy" ON public.compliance_patterns FOR INSERT WITH CHECK (workspace_id = ANY(public.get_my_workspace_ids()));

-- PROMPT VARIATIONS
DROP POLICY IF EXISTS "Users can view their own prompt variations" ON public.prompt_variations;
DROP POLICY IF EXISTS "Users can insert their own prompt variations" ON public.prompt_variations;
DROP POLICY IF EXISTS "Users can update their own prompt variations" ON public.prompt_variations;
DROP POLICY IF EXISTS "prompt_variations_all_policy" ON public.prompt_variations;
CREATE POLICY "prompt_variations_all_policy" ON public.prompt_variations FOR ALL USING (user_id = (SELECT auth.uid()));

-- LEGACY ORGANIZATION MEMBERS (Security Stub)
DROP POLICY IF EXISTS "Safe view organization members" ON public.organization_members;
DROP POLICY IF EXISTS "Users can view members of their organizations" ON public.organization_members;
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.organization_members;
DROP POLICY IF EXISTS "Users can view organization members safe" ON public.organization_members;
-- We do NOT create a new policy here as we want the table to be fully protected or dropped if unused.

-- ==========================================
-- 6. INDEXING ROUND 2
-- ==========================================

-- Unindexed Foreign Keys from Lint
CREATE INDEX IF NOT EXISTS idx_prompt_batches_user_id ON public.prompt_batches(user_id);
CREATE INDEX IF NOT EXISTS idx_prompt_history_organization_id ON public.prompt_history(organization_id);

-- Unused Index Cleanup Candidate (INFO from lint)
-- We will keep them for now as they are recently added or might be used by complex queries 
-- that the linter hasn't seen yet in common dashboard views.

COMMIT;
