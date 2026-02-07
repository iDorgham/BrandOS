-- PERFORMANCE OPTIMIZATION: RLS Policy Wrapping
-- This migration optimizes RLS policies by wrapping auth functions in subqueries.
-- As per Supabase performance docs: (select auth.uid()) is faster than auth.uid() 
-- because it prevents re-evaluation of the function for every row.

BEGIN;

-- 1. PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (id = (SELECT auth.uid()));

-- 2. ORGANIZATIONS
DROP POLICY IF EXISTS "Users can view organizations they belong to" ON public.organizations;
CREATE POLICY "Users can view organizations they belong to" ON public.organizations
FOR SELECT USING (
    id IN (
        SELECT organization_id 
        FROM public.organization_members 
        WHERE user_id = (SELECT auth.uid())
    )
);

-- 3. WORKSPACES
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
FOR SELECT USING (
    id IN (
        SELECT workspace_id 
        FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid())
    )
);

-- 4. BRANDS
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
CREATE POLICY "Users can view brands" ON public.brands
FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id 
        FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid())
    )
);

-- 5. ASSETS
DROP POLICY IF EXISTS "Users can view assets" ON public.assets;
CREATE POLICY "Users can view assets" ON public.assets
FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id 
        FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid())
    )
);

-- 6. PROMPT HISTORY
DROP POLICY IF EXISTS "Users can view own prompt history" ON public.prompt_history;
CREATE POLICY "Users can view own prompt history" ON public.prompt_history
FOR SELECT USING (user_id = (SELECT auth.uid()));

COMMIT;
