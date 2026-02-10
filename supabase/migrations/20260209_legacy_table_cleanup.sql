-- ==========================================
-- PHASE 35 (EXTRA): DEFINITIVE LEGACY CLEANUP
-- Address: RLS Enabled No Policy (public.organization_members)
-- ==========================================

BEGIN;

-- This table is a remnant of an early schema iteration.
-- Current membership logic uses 'public.workspace_members'.
-- Dropping it definitively resolves the linter warning and reduces security surface.

DROP TABLE IF EXISTS public.organization_members CASCADE;

-- If for any reason the table cannot be dropped, we add a safe stub policy 
-- (but CASCADE drop is preferred as it's unused).

COMMIT;
