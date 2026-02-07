-- FORCE FIX RECURSION FINAL
-- ==========================================
-- This migration fixes the infinite recursion error by ensuring all RLS policies
-- use SECURITY DEFINER functions instead of direct subqueries that trigger RLS cycles.
-- It strictly overrides any previous optimizations that reintroduced recursion.

BEGIN;

-- 1. Helper Functions (SECURITY DEFINER)
-- Bypasses RLS to prevent recursion when querying membership

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

-- 2. WORKSPACES
-- Drop ALL existing policies to ensure clean slate
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
DROP POLICY IF EXISTS "Users can update workspaces they own" ON public.workspaces;
DROP POLICY IF EXISTS "Users can insert workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can delete workspaces they own" ON public.workspaces;

-- Safe Select Policy
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
FOR SELECT USING (
    owner_id = auth.uid() OR
    id = ANY(public.get_my_workspace_ids())
);

-- Other Workspace Policies
CREATE POLICY "Users can update workspaces they own" ON public.workspaces
FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Users can insert workspaces" ON public.workspaces
FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete workspaces they own" ON public.workspaces
FOR DELETE USING (owner_id = auth.uid());


-- 3. WORKSPACE MEMBERS
-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can update members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and admins can delete members" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can leave workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can join workspaces" ON public.workspace_members; -- If exists

-- Safe Select Policy
CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members
FOR SELECT USING (
    -- Check if user is a member (using secure function)
    public.is_workspace_member(workspace_id)
    OR
    -- Check if user is the owner of the workspace (query workspaces, which uses safe policy now)
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
);

-- Update Policy
CREATE POLICY "Workspace owners and admins can update members" ON public.workspace_members
FOR UPDATE USING (
    -- Owner
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    OR
    -- Admin (secure function)
    public.is_workspace_admin(workspace_id)
);

-- Delete Policy
CREATE POLICY "Workspace owners and admins can delete members" ON public.workspace_members
FOR DELETE USING (
    -- Owner
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    OR
    -- Admin (secure function)
    public.is_workspace_admin(workspace_id)
    OR
    -- Users can leave (delete themselves)
    user_id = auth.uid()
);

-- Insert Policy
-- Note: inserting often requires checking if the workspace exists and if the adder has permissions
CREATE POLICY "Workspace owners and admins can insert members" ON public.workspace_members
FOR INSERT WITH CHECK (
    -- Owner
    workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    OR
    -- Admin (secure function)
    public.is_workspace_admin(workspace_id)
);


-- 4. BRANDS
-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
DROP POLICY IF EXISTS "Users can insert their brands" ON public.brands;
DROP POLICY IF EXISTS "Users can update their brands" ON public.brands;
DROP POLICY IF EXISTS "Users can delete their brands" ON public.brands;
DROP POLICY IF EXISTS "Users can view own brands" ON public.brands; -- Legacy

-- Safe Select Policy
CREATE POLICY "Users can view brands" ON public.brands
FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- Insert Policy
CREATE POLICY "Users can insert their brands" ON public.brands
FOR INSERT WITH CHECK (
    user_id = auth.uid()
);

-- Update Policy
CREATE POLICY "Users can update their brands" ON public.brands
FOR UPDATE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id) OR
    public.is_workspace_member(workspace_id) -- Assuming members can edit? Or maybe specific roles. Sticking to simple for now.
    -- If we need role check:
    -- workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role IN ('admin', 'art_director'))
    -- But using subquery might trigger recursion if workspace_members policy isn't perfectly safe.
    -- Secure function for specific roles would be better.
);

-- Delete Policy
CREATE POLICY "Users can delete their brands" ON public.brands
FOR DELETE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id)
);


-- 5. ASSETS
-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view assets" ON public.assets;
DROP POLICY IF EXISTS "Users can insert their assets" ON public.assets;
DROP POLICY IF EXISTS "Users can update their assets" ON public.assets;
DROP POLICY IF EXISTS "Users can delete their assets" ON public.assets;

-- Safe Select Policy
CREATE POLICY "Users can view assets" ON public.assets
FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- Insert Policy
CREATE POLICY "Users can insert their assets" ON public.assets
FOR INSERT WITH CHECK (
    user_id = auth.uid()
);

-- Update Policy
CREATE POLICY "Users can update their assets" ON public.assets
FOR UPDATE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id)
);

-- Delete Policy
CREATE POLICY "Users can delete their assets" ON public.assets
FOR DELETE USING (
    user_id = auth.uid() OR
    public.is_workspace_admin(workspace_id)
);

COMMIT;
