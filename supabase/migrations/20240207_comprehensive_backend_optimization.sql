-- COMPREHENSIVE BACKEND OPTIMIZATION: PHASE 2
-- 1. RLS Subquery Wrapping for remaining tables
-- 2. Missing Indices for Workspace filtering
-- 3. Policy Consolidation for Permissive Policies

BEGIN;

-- ==========================================
-- 1. MISSING INDICES (Workspace Filtering)
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_brands_workspace_id ON public.brands(workspace_id);
CREATE INDEX IF NOT EXISTS idx_assets_workspace_id ON public.assets(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompt_history_workspace_id ON public.prompt_history(workspace_id);
CREATE INDEX IF NOT EXISTS idx_moodboards_workspace_id ON public.moodboards(workspace_id);

-- ==========================================
-- 2. RLS OPTIMIZATION (auth.uid Wrapping)
-- ==========================================

-- MOODBOARDS
DROP POLICY IF EXISTS "Users can view own moodboards" ON public.moodboards;
CREATE POLICY "Users can view own moodboards" ON public.moodboards
FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own moodboards" ON public.moodboards;
CREATE POLICY "Users can insert own moodboards" ON public.moodboards
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own moodboards" ON public.moodboards;
CREATE POLICY "Users can update own moodboards" ON public.moodboards
FOR UPDATE USING (user_id = (SELECT auth.uid()));

-- PROMPT BATCHES
DROP POLICY IF EXISTS "Users can view own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can view own prompt batches" ON public.prompt_batches
FOR SELECT USING (user_id = (SELECT auth.uid()));

-- BATCH ANALYTICS
DROP POLICY IF EXISTS "Users can view own batch analytics" ON public.prompt_batch_analytics;
CREATE POLICY "Users can view own batch analytics" ON public.prompt_batch_analytics
FOR SELECT USING (user_id = (SELECT auth.uid()));

-- DNA VERSIONS (Complex subquery optimization)
DROP POLICY IF EXISTS "Users can view dna_versions for their workspaces" ON public.dna_versions;
CREATE POLICY "Users can view dna_versions for their workspaces" ON public.dna_versions
FOR SELECT USING (
    brand_id IN (
        SELECT id FROM public.brands 
        WHERE workspace_id IN (
            SELECT workspace_id FROM public.workspace_members 
            WHERE user_id = (SELECT auth.uid())
        )
    )
);

-- PROMPT HISTORY (Missing from Phase 1)
DROP POLICY IF EXISTS "Users can view own prompt history" ON public.prompt_history;
CREATE POLICY "Users can view own prompt history" ON public.prompt_history
FOR SELECT USING (user_id = (SELECT auth.uid()));

-- ==========================================
-- 3. POLICY CONSOLIDATION
-- ==========================================

-- AI MODEL PERFORMANCE (Consolidating Selective and Admin views)
DROP POLICY IF EXISTS "Users can view AI performance in their workspaces" ON public.ai_model_performance;
DROP POLICY IF EXISTS "Workspace owners and admins can manage AI performance data" ON public.ai_model_performance;
CREATE POLICY "Users can view and manage AI performance in their workspaces" ON public.ai_model_performance
FOR ALL USING (
    workspace_id IN (
        SELECT workspace_id FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid())
    )
);

-- BRAND GUIDELINES
DROP POLICY IF EXISTS "Users can view brand guidelines in their workspaces" ON public.brand_guidelines;
DROP POLICY IF EXISTS "Workspace owners and admins can manage brand guidelines" ON public.brand_guidelines;
CREATE POLICY "Users can view and manage brand guidelines in their workspaces" ON public.brand_guidelines
FOR ALL USING (
    workspace_id IN (
        SELECT workspace_id FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid())
    )
);

-- DNA BRANCHES
DROP POLICY IF EXISTS "Users can view dna_branches for their workspaces" ON public.dna_branches;
DROP POLICY IF EXISTS "Users can manage dna_branches for their workspaces" ON public.dna_branches;
CREATE POLICY "Users can view and manage dna_branches for their workspaces" ON public.dna_branches
FOR ALL USING (
    brand_id IN (
        SELECT id FROM public.brands 
        WHERE workspace_id IN (
            SELECT workspace_id FROM public.workspace_members 
            WHERE user_id = (SELECT auth.uid())
        )
    )
);

COMMIT;
