-- Brand OS: Workspace Rebranding Migration
-- This script synchronizes the database schema with the "Workspace" terminology.

-- 1. Create Workspace Roles Enum if not exists
DO $$ BEGIN
    CREATE TYPE public.workspace_role AS ENUM ('admin', 'art_director', 'designer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create workspaces table (Replica of organizations)
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- 3. Create workspace_members table
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.workspace_role DEFAULT 'designer' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(workspace_id, user_id)
);

-- 4. Ensure existing tables have workspace_id column
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='brands' AND COLUMN_NAME='workspace_id') THEN
        ALTER TABLE public.brands ADD COLUMN workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='assets' AND COLUMN_NAME='workspace_id') THEN
        ALTER TABLE public.assets ADD COLUMN workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='prompt_history' AND COLUMN_NAME='workspace_id') THEN
        ALTER TABLE public.prompt_history ADD COLUMN workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 5. Enable RLS
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
DO $$ BEGIN
  CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
    FOR SELECT USING (
      id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can create workspaces" ON public.workspaces
    FOR INSERT WITH CHECK (auth.uid() = owner_id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Owners and Admins can update their workspaces" ON public.workspaces
    FOR UPDATE USING (
      owner_id = auth.uid() OR 
      EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = workspaces.id AND user_id = auth.uid() AND role = 'admin')
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 7. Helper function for creating a workspace with the creator as admin
CREATE OR REPLACE FUNCTION public.create_workspace_with_owner(ws_name TEXT, ws_slug TEXT)
RETURNS UUID AS $$
DECLARE
  new_ws_id UUID;
BEGIN
  INSERT INTO public.workspaces (name, slug, owner_id)
  VALUES (ws_name, ws_slug, auth.uid())
  RETURNING id INTO new_ws_id;

  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (new_ws_id, auth.uid(), 'admin');

  RETURN new_ws_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
