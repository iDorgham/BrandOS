-- Phase 3: Enterprise & Collaboration Schema for Brand OS

-- Enable uuid-ossp if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Roles Enum
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('admin', 'art_director', 'designer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- 3. Create Organization Members table for RBAC
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.user_role DEFAULT 'designer' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(org_id, user_id)
);

-- 4. Add organization_id to existing tables
-- We use a function to add columns safely if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='brands' AND COLUMN_NAME='organization_id') THEN
        ALTER TABLE public.brands ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='assets' AND COLUMN_NAME='organization_id') THEN
        ALTER TABLE public.assets ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='prompt_history' AND COLUMN_NAME='organization_id') THEN
        ALTER TABLE public.prompt_history ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 5. Enable RLS on new tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for Organizations
CREATE POLICY "Users can view organizations they belong to" ON public.organizations
  FOR SELECT USING (
    id IN (SELECT org_id FROM public.organization_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create organizations" ON public.organizations
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners and Admins can update their organizations" ON public.organizations
  FOR UPDATE USING (
    owner_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.organization_members WHERE org_id = organizations.id AND user_id = auth.uid() AND role = 'admin')
  );

-- 7. RLS Policies for Organization Members
CREATE POLICY "Members can view fellow organization members" ON public.organization_members
  FOR SELECT USING (
    org_id IN (SELECT org_id FROM public.organization_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage organization members" ON public.organization_members
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.organization_members WHERE org_id = organization_members.org_id AND user_id = auth.uid() AND role = 'admin')
  );

-- 8. Helper function for creating an organization with the creator as admin
CREATE OR REPLACE FUNCTION public.create_organization_with_owner(org_name TEXT, org_slug TEXT)
RETURNS UUID AS $$
DECLARE
  new_org_id UUID;
BEGIN
  INSERT INTO public.organizations (name, slug, owner_id)
  VALUES (org_name, org_slug, auth.uid())
  RETURNING id INTO new_org_id;

  INSERT INTO public.organization_members (org_id, user_id, role)
  VALUES (new_org_id, auth.uid(), 'admin');

  RETURN new_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Update existing table policies to include organization-based access
-- Brands
DROP POLICY IF EXISTS "Users can view own brands" ON public.brands;
CREATE POLICY "Users can view brands in their organizations" ON public.brands
  FOR SELECT USING (
    user_id = auth.uid() OR 
    organization_id IN (SELECT org_id FROM public.organization_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert own brands" ON public.brands;
CREATE POLICY "Users can create brands in their organizations" ON public.brands
  FOR INSERT WITH CHECK (
    user_id = auth.uid() OR 
    organization_id IN (SELECT org_id FROM public.organization_members WHERE user_id = auth.uid())
  );

-- Assets
DROP POLICY IF EXISTS "Users can view own assets" ON public.assets;
CREATE POLICY "Users can view assets in their organizations" ON public.assets
  FOR SELECT USING (
    user_id = auth.uid() OR 
    organization_id IN (SELECT org_id FROM public.organization_members WHERE user_id = auth.uid())
  );

-- Trigger for organizations updated_at
CREATE TRIGGER handle_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
