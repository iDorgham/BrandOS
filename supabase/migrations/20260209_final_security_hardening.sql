-- ==========================================
-- PHASE 35: FINAL SECURITY HARDENING
-- Specifically addresses remaining Supabase Linter warnings
-- ==========================================

BEGIN;

-- 1. HARDEN SEARCH PATHS FOR REMAINING FUNCTIONS
-- Explicitly locking search_path to 'public' as recommended by linter.
-- This prevents search path hijacking.

ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Also ensuring other critical helpers are definitively hardened
-- (Redundant if already handled, but provides a single source of truth)
ALTER FUNCTION public.get_my_workspace_ids() SET search_path = public;
ALTER FUNCTION public.is_workspace_member(uuid) SET search_path = public;
ALTER FUNCTION public.is_workspace_admin(uuid) SET search_path = public;
ALTER FUNCTION public.create_workspace_with_owner(text, text) SET search_path = public;

-- 2. VERIFY RLS IS ENABLED FOR ALL TABLES
-- (No-op if already enabled, but ensures production state)
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

COMMIT;
