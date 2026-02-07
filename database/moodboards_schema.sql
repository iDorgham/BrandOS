-- Moodboards Table Schema for Supabase
-- Run this in Supabase SQL Editor

-- Create moodboards table
CREATE TABLE IF NOT EXISTS public.moodboards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  nodes JSONB DEFAULT '[]' NOT NULL,
  edges JSONB DEFAULT '[]' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS moodboards_user_id_idx ON public.moodboards(user_id);
CREATE INDEX IF NOT EXISTS moodboards_brand_id_idx ON public.moodboards(brand_id);
CREATE INDEX IF NOT EXISTS moodboards_workspace_id_idx ON public.moodboards(workspace_id);
CREATE INDEX IF NOT EXISTS moodboards_is_active_idx ON public.moodboards(is_active);
CREATE INDEX IF NOT EXISTS moodboards_created_at_idx ON public.moodboards(created_at);

-- Enable Row Level Security
ALTER TABLE public.moodboards ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for moodboards
CREATE POLICY "Users can view own moodboards" ON public.moodboards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own moodboards" ON public.moodboards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own moodboards" ON public.moodboards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own moodboards" ON public.moodboards
  FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_moodboards_updated_at
  BEFORE UPDATE ON public.moodboards
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
