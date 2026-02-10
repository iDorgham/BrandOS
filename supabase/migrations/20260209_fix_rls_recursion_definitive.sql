-- ==========================================
-- PHASE 37: DEFINITIVE RLS & WORKSPACE CONSOLIDATION
-- Address: Persistent RLS recursion and legacy "organization_id" pollution.
-- ==========================================

BEGIN;

-- 1. STRENGTHEN HELPER FUNCTIONS (SECURITY DEFINER)
-- These are the ONLY safe way to check membership without triggering recursion.

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

-- 2. DYNAMICALLY CLEAR ALL POLICIES (CLEAN SLATE)
-- This ensures no named policies from previous conflicting migrations remain.

DO $$
DECLARE
    pol record;
    tables TEXT[] := ARRAY['workspaces', 'workspace_members', 'brands', 'assets', 'prompt_history', 'prompt_variations'];
    t TEXT;
BEGIN
    FOREACH t IN ARRAY tables LOOP
        FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = t AND schemaname = 'public' LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, t);
        END LOOP;
    END LOOP;
END $$;

-- 3. SCHEMA CONSISTENCY: RENAME OR DROP LEGACY COLUMNS
-- Ensure we don't have conflicting organization_id/workspace_id columns.

DO $$
BEGIN
    -- prompt_history
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='prompt_history' AND column_name='organization_id') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='prompt_history' AND column_name='workspace_id') THEN
            -- Both exist, legacy can be dropped
            ALTER TABLE public.prompt_history DROP COLUMN organization_id;
        ELSE
            ALTER TABLE public.prompt_history RENAME COLUMN organization_id TO workspace_id;
        END IF;
    END IF;
    
    -- prompt_variations
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='prompt_variations' AND column_name='organization_id') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='prompt_variations' AND column_name='workspace_id') THEN
            ALTER TABLE public.prompt_variations DROP COLUMN organization_id;
        ELSE
            ALTER TABLE public.prompt_variations RENAME COLUMN organization_id TO workspace_id;
        END IF;
    END IF;
END $$;

-- 4. APPLY NON-RECURSIVE, HARDENED POLICIES

-- WORKSPACES
CREATE POLICY "workspaces_select_policy" ON public.workspaces 
FOR SELECT USING (
    owner_id = auth.uid() OR 
    id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "workspaces_insert_policy" ON public.workspaces 
FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "workspaces_update_policy" ON public.workspaces 
FOR UPDATE USING (
    owner_id = auth.uid() OR 
    public.is_workspace_admin(id)
);

CREATE POLICY "workspaces_delete_policy" ON public.workspaces 
FOR DELETE USING (owner_id = auth.uid());

-- WORKSACE MEMBERS
-- IMPORTANT: This policy MUST be non-recursive.
CREATE POLICY "workspace_members_select_policy" ON public.workspace_members
FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "workspace_members_insert_policy" ON public.workspace_members
FOR INSERT WITH CHECK (
    public.is_workspace_admin(workspace_id)
);

CREATE POLICY "workspace_members_update_policy" ON public.workspace_members
FOR UPDATE USING (
    public.is_workspace_admin(workspace_id)
);

CREATE POLICY "workspace_members_delete_policy" ON public.workspace_members
FOR DELETE USING (
    public.is_workspace_admin(workspace_id)
);

-- BRANDS
CREATE POLICY "brands_select_policy" ON public.brands 
FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "brands_insert_policy" ON public.brands 
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "brands_update_policy" ON public.brands 
FOR UPDATE USING (
    user_id = auth.uid() OR 
    public.is_workspace_admin(workspace_id)
);

CREATE POLICY "brands_delete_policy" ON public.brands 
FOR DELETE USING (
    user_id = auth.uid() OR 
    public.is_workspace_admin(workspace_id)
);

-- ASSETS
CREATE POLICY "assets_select_policy" ON public.assets 
FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "assets_insert_policy" ON public.assets 
FOR INSERT WITH CHECK (user_id = auth.uid());

-- PROMPT HISTORY 
CREATE POLICY "prompt_history_select_policy" ON public.prompt_history 
FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

CREATE POLICY "prompt_history_insert_policy" ON public.prompt_history 
FOR INSERT WITH CHECK (user_id = auth.uid());

COMMIT;
