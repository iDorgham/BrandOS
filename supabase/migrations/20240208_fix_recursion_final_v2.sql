-- Migration: Fix Infinite Recursion Final V2
-- Date: 2024-02-08
-- This migration breaks the circular dependency between workspace_members and workspaces.

BEGIN;

-- 1. Create or Replace Security Definer Functions
-- These functions bypass RLS to prevent recursion loops.

-- Check if user is a member of the workspace
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

-- Check if user is the owner of the workspace
CREATE OR REPLACE FUNCTION public.is_workspace_owner(_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.workspaces
        WHERE id = _workspace_id
        AND owner_id = auth.uid()
    );
END;
$$;

-- Get all workspace IDs the user belongs to
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

-- 2. Update WORKSPACES Policies
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
FOR SELECT USING (
    owner_id = auth.uid() OR
    id = ANY(public.get_my_workspace_ids())
);

-- 3. Update WORKSPACE_MEMBERS Policies (The Critical Fix)
-- Break the loop by NOT querying 'workspaces' directly in the USING clause.
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members
FOR SELECT USING (
    -- Case 1: Checking your own membership (Always safe)
    user_id = auth.uid() 
    OR 
    -- Case 2: Checking other memberships in a workspace you are a member of
    -- Use SECURITY DEFINER function to bypass RLS on the junction table itself
    public.is_workspace_member(workspace_id)
    OR
    -- Case 3: Checking memberships in a workspace you own
    -- Use SECURITY DEFINER function to bypass RLS on the workspaces table
    public.is_workspace_owner(workspace_id)
);

-- Also fix INSERT/UPDATE/DELETE policies to be safe
DROP POLICY IF EXISTS "Workspace owners and admins can insert members" ON public.workspace_members;
CREATE POLICY "Workspace owners and admins can insert members" ON public.workspace_members
FOR INSERT WITH CHECK (
    public.is_workspace_owner(workspace_id)
    -- Add more role-based checks here if needed using secure functions
);

DROP POLICY IF EXISTS "Workspace owners and admins can update members" ON public.workspace_members;
CREATE POLICY "Workspace owners and admins can update members" ON public.workspace_members
FOR UPDATE USING (
    public.is_workspace_owner(workspace_id)
);

DROP POLICY IF EXISTS "Workspace owners and admins can delete members" ON public.workspace_members;
CREATE POLICY "Workspace owners and admins can delete members" ON public.workspace_members
FOR DELETE USING (
    public.is_workspace_owner(workspace_id)
);

-- 4. Fix BRANDS/ASSETS policies if they still use direct subqueries that loop
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
CREATE POLICY "Users can view brands" ON public.brands
FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
);

DROP POLICY IF EXISTS "Users can view assets" ON public.assets;
CREATE POLICY "Users can view assets" ON public.assets
FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
);

COMMIT;
