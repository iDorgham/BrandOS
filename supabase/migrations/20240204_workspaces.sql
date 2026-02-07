-- Brand OS: Workspace tables and RLS
-- Run before 20240205_ai_enhancements_fixed.sql (which references public.workspaces and public.workspace_members)

-- 1. Workspace roles enum
DO $$ BEGIN
    CREATE TYPE public.workspace_role AS ENUM ('admin', 'art_director', 'designer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Workspaces table
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- 3. Workspace members table
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.workspace_role DEFAULT 'designer' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(workspace_id, user_id)
);

-- 4. Add workspace_id to existing tables (if base schema already applied)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'brands')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'brands' AND column_name = 'workspace_id') THEN
        ALTER TABLE public.brands ADD COLUMN workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'assets')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'assets' AND column_name = 'workspace_id') THEN
        ALTER TABLE public.assets ADD COLUMN workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'prompt_history')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'prompt_history' AND column_name = 'workspace_id') THEN
        ALTER TABLE public.prompt_history ADD COLUMN workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 5. RLS on workspaces and workspace_members
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- 6. Workspaces policies
DO $$ BEGIN
  CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
    FOR SELECT USING (
      owner_id = auth.uid() OR
      id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
    );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can create workspaces" ON public.workspaces
    FOR INSERT WITH CHECK (auth.uid() = owner_id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Owners and admins can update workspaces" ON public.workspaces
    FOR UPDATE USING (
      owner_id = auth.uid() OR
      EXISTS (SELECT 1 FROM public.workspace_members wm WHERE wm.workspace_id = workspaces.id AND wm.user_id = auth.uid() AND wm.role = 'admin')
    );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 7. Workspace members policies
DO $$ BEGIN
  CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members
    FOR SELECT USING (
      workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
      OR workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
    );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Workspace owners can insert members" ON public.workspace_members
    FOR INSERT WITH CHECK (
      workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Workspace owners and admins can update members" ON public.workspace_members
    FOR UPDATE USING (
      workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
      OR (workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role = 'admin'))
    );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Workspace owners can delete members" ON public.workspace_members
    FOR DELETE USING (
      workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
    );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 8. Helper: create workspace and add creator as admin
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

-- 9. Indexes for RLS and lookups
CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_owner_id ON public.workspaces(owner_id);
