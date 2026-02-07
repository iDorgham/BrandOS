-- Fix Recursive Policies on Brands and Assets

-- 1. Fix Brands Policies
-- Legacy policies on brands likely reference 'organization_members', causing recursion
DROP POLICY IF EXISTS "Users can view their brands" ON public.brands;
DROP POLICY IF EXISTS "Users can view brands for their workspaces" ON public.brands;
DROP POLICY IF EXISTS "Users can view brands associated with their organizations" ON public.brands; -- Legacy name guess
DROP POLICY IF EXISTS "Users can view their own brands" ON public.brands;

-- Create safe policy using SECURITY DEFINER function
CREATE POLICY "Users can view brands" ON public.brands
  FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
  );

DROP POLICY IF EXISTS "Users can insert their brands" ON public.brands;
CREATE POLICY "Users can insert their brands" ON public.brands
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

DROP POLICY IF EXISTS "Users can update their brands" ON public.brands;
CREATE POLICY "Users can update their brands" ON public.brands
  FOR UPDATE USING (
    user_id = auth.uid() OR
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role IN ('admin', 'art_director'))
  );

DROP POLICY IF EXISTS "Users can delete their brands" ON public.brands;
CREATE POLICY "Users can delete their brands" ON public.brands
  FOR DELETE USING (
    user_id = auth.uid() OR
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role = 'admin')
  );


-- 2. Fix Assets Policies
-- Legacy policies on assets likely reference 'organization_members'
DROP POLICY IF EXISTS "Users can view their assets" ON public.assets;
DROP POLICY IF EXISTS "Users can view assets for their workspaces" ON public.assets;
DROP POLICY IF EXISTS "Users can view assets associated with their organizations" ON public.assets; -- Legacy name guess
DROP POLICY IF EXISTS "Users can view their own assets" ON public.assets;

-- Create safe policy
CREATE POLICY "Users can view assets" ON public.assets
  FOR SELECT USING (
    user_id = auth.uid() OR
    workspace_id = ANY(public.get_my_workspace_ids())
  );

DROP POLICY IF EXISTS "Users can insert their assets" ON public.assets;
CREATE POLICY "Users can insert their assets" ON public.assets
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

DROP POLICY IF EXISTS "Users can update their assets" ON public.assets;
CREATE POLICY "Users can update their assets" ON public.assets
  FOR UPDATE USING (
    user_id = auth.uid() OR
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role IN ('admin', 'art_director'))
  );

DROP POLICY IF EXISTS "Users can delete their assets" ON public.assets;
CREATE POLICY "Users can delete their assets" ON public.assets
  FOR DELETE USING (
    user_id = auth.uid() OR
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role = 'admin')
  );


-- 3. Explicitly Drop Recursive Policies on organization_members (if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'organization_members') THEN
        DROP POLICY IF EXISTS "Users can view members of their organizations" ON public.organization_members;
        DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.organization_members;
        
        -- Add a safe policy just in case it's still used
        -- We use EXECUTE to avoid syntax errors if table doesn't exist during compilation of the block
        EXECUTE 'CREATE POLICY "Users can view organization members safe" ON public.organization_members FOR SELECT USING (user_id = auth.uid())';
    END IF;
END $$;
