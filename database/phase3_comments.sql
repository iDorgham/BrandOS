-- Phase 3: Commenting System for Brand OS

CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view comments on accessible assets" ON public.comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.assets a
      WHERE a.id = comments.asset_id
      AND (
        a.user_id = auth.uid() OR 
        a.organization_id IN (SELECT org_id FROM public.organization_members WHERE user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Users can insert comments on accessible assets" ON public.comments
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.assets a
      WHERE a.id = asset_id
      AND (
        a.user_id = auth.uid() OR 
        a.organization_id IN (SELECT org_id FROM public.organization_members WHERE user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Users can delete own comments" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER handle_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
