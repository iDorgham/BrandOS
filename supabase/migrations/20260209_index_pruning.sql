-- ==========================================
-- PHASE 23: FINAL INDEX PRUNING
-- Removes confirmed legacy and redundant indexes
-- ==========================================

BEGIN;

-- 1. LEGACY ORGANIZATION INDEXES (Redundant after Workspace Hardening)
-- These columns are still in the schema for compatibility, but the linter confirms
-- they are no longer being hit by queries or our new RLS policies.
DROP INDEX IF EXISTS public.idx_assets_organization_id;
DROP INDEX IF EXISTS public.idx_brands_organization_id;
DROP INDEX IF EXISTS public.idx_prompt_history_organization_id;
DROP INDEX IF EXISTS public.idx_org_members_user_id;
DROP INDEX IF EXISTS public.idx_orgs_owner_id;

-- 2. REDUNDANT/UNUSED UNIQUE IDENTIFIERS
-- Safely remove indexes that the linter has confirmed as never used 
-- and do not support critical RLS logic or new features.
DROP INDEX IF EXISTS public.idx_prompt_history_brand_id;
DROP INDEX IF EXISTS public.idx_dna_versions_version; -- Often covered by PK or unique constraints
DROP INDEX IF EXISTS public.idx_dna_branches_purpose;
DROP INDEX IF EXISTS public.idx_dna_version_tests_status;
DROP INDEX IF EXISTS public.idx_prompt_analytics_success_rate;

-- NOTE: We are KEEPING the following "Unused" indexes for now because:
-- - They were just created (Statistics haven't updated)
-- - They support Row Level Security (RLS) performance
-- - They are essential for future feature use cases (Analytics/DNA)
--   - idx_prompt_batches_user_id (Essential for RLS)
--   - idx_prompt_batches_workspace_id (Essential for RLS)
--   - idx_assets_brand_id (Essential for Lookups)
--   - idx_dna_versions_brand_id (Essential for DNA navigation)

COMMIT;
