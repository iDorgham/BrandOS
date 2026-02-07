-- Fix 1: Secure Search Paths for Functions
-- Setting search_path to 'public' prevents search path hijacking

ALTER FUNCTION public.update_version_analytics_trigger() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.calculate_next_version(UUID, VARCHAR) SET search_path = public;
ALTER FUNCTION public.track_version_analytics(UUID, JSONB, JSONB) SET search_path = public;
ALTER FUNCTION public.initialize_brand_versioning() SET search_path = public;
ALTER FUNCTION public.create_version_snapshot(UUID, VARCHAR, TEXT, UUID) SET search_path = public;
ALTER FUNCTION public.trigger_set_timestamp() SET search_path = public;
ALTER FUNCTION public.track_prompt_analytics(UUID, INTEGER, DECIMAL, BOOLEAN, UUID, UUID, JSONB) SET search_path = public;
ALTER FUNCTION public.get_prompt_metrics(UUID) SET search_path = public;
ALTER FUNCTION public.get_top_performing_prompts(INTEGER, UUID, UUID, DECIMAL) SET search_path = public;
ALTER FUNCTION public.get_analytics_summary(UUID, UUID, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITH TIME ZONE) SET search_path = public;
ALTER FUNCTION public.track_prompt_feedback(UUID, UUID, INTEGER, TEXT) SET search_path = public;
ALTER FUNCTION public.get_prompt_insights(UUID) SET search_path = public;
-- Note: create_organization_with_owner signature unverified, possibly legacy. 
-- Assuming (TEXT, TEXT) matches create_workspace_with_owner pattern.
ALTER FUNCTION public.create_organization_with_owner(TEXT, TEXT) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.create_workspace_with_owner(TEXT, TEXT) SET search_path = public;
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Fix 2: Harden RLS Policies
-- Replacing permissive "USING (true)" policies with explicit workspace membership checks

-- dna_branches
DROP POLICY IF EXISTS "Users can manage dna_branches for their workspaces" ON public.dna_branches;
CREATE POLICY "Users can manage dna_branches for their workspaces" ON public.dna_branches
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.brands b
            WHERE b.id = dna_branches.brand_id
            AND b.workspace_id IN (
                SELECT workspace_members.workspace_id
                FROM public.workspace_members
                WHERE workspace_members.user_id = auth.uid()
            )
        )
    );

-- dna_merges
DROP POLICY IF EXISTS "Users can manage dna_merges for their workspaces" ON public.dna_merges;
CREATE POLICY "Users can manage dna_merges for their workspaces" ON public.dna_merges
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.brands b
            WHERE b.id = dna_merges.brand_id
            AND b.workspace_id IN (
                SELECT workspace_members.workspace_id
                FROM public.workspace_members
                WHERE workspace_members.user_id = auth.uid()
            )
        )
    );

-- dna_version_rollbacks
DROP POLICY IF EXISTS "Users can manage dna_version_rollbacks for their workspaces" ON public.dna_version_rollbacks;
CREATE POLICY "Users can manage dna_version_rollbacks for their workspaces" ON public.dna_version_rollbacks
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.brands b
            WHERE b.id = dna_version_rollbacks.brand_id
            AND b.workspace_id IN (
                SELECT workspace_members.workspace_id
                FROM public.workspace_members
                WHERE workspace_members.user_id = auth.uid()
            )
        )
    );

-- dna_export_history
DROP POLICY IF EXISTS "Users can manage dna_export_history for their workspaces" ON public.dna_export_history;
CREATE POLICY "Users can manage dna_export_history for their workspaces" ON public.dna_export_history
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.dna_versions dv
            JOIN public.brands b ON b.id = dv.brand_id
            WHERE dv.id = dna_export_history.version_id
            AND b.workspace_id IN (
                SELECT workspace_members.workspace_id
                FROM public.workspace_members
                WHERE workspace_members.user_id = auth.uid()
            )
        )
    );

-- dna_version_analytics
DROP POLICY IF EXISTS "Users can manage dna_version_analytics for their workspaces" ON public.dna_version_analytics;
CREATE POLICY "Users can manage dna_version_analytics for their workspaces" ON public.dna_version_analytics
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.dna_versions dv
            JOIN public.brands b ON b.id = dv.brand_id
            WHERE dv.id = dna_version_analytics.version_id
            AND b.workspace_id IN (
                SELECT workspace_members.workspace_id
                FROM public.workspace_members
                WHERE workspace_members.user_id = auth.uid()
            )
        )
    );

-- dna_version_comments
DROP POLICY IF EXISTS "Users can manage dna_version_comments for their workspaces" ON public.dna_version_comments;
CREATE POLICY "Users can manage dna_version_comments for their workspaces" ON public.dna_version_comments
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.dna_versions dv
            JOIN public.brands b ON b.id = dv.brand_id
            WHERE dv.id = dna_version_comments.version_id
            AND b.workspace_id IN (
                SELECT workspace_members.workspace_id
                FROM public.workspace_members
                WHERE workspace_members.user_id = auth.uid()
            )
        )
    );

-- dna_version_tests
DROP POLICY IF EXISTS "Users can manage dna_version_tests for their workspaces" ON public.dna_version_tests;
CREATE POLICY "Users can manage dna_version_tests for their workspaces" ON public.dna_version_tests
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.dna_versions dv
            JOIN public.brands b ON b.id = dv.brand_id
            WHERE dv.id = dna_version_tests.version_id
            AND b.workspace_id IN (
                SELECT workspace_members.workspace_id
                FROM public.workspace_members
                WHERE workspace_members.user_id = auth.uid()
            )
        )
    );
