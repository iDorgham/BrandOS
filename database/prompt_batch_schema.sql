-- Add prompt batch analytics tables for AI-assisted development
-- Run these commands in Supabase SQL Editor to add to existing schema

-- Prompt batch management
CREATE TABLE IF NOT EXISTS public.prompt_batches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  variations JSONB DEFAULT '[]' NOT NULL,
  performance JSONB DEFAULT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Prompt batch analytics for tracking user interactions
CREATE TABLE IF NOT EXISTS public.prompt_batch_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  batch_id UUID REFERENCES public.prompt_batches(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL, -- 'batch_created', 'variations_selected', 'prompt_generated', 'batch_saved', 'batch_opened', 'batch_deleted'
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_prompt_batches_user_created ON public.prompt_batches(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_prompt_batches_performance ON public.prompt_batches USING gin (performance);
CREATE INDEX IF NOT EXISTS idx_prompt_batch_analytics_batch ON public.prompt_batch_analytics(batch_id, timestamp, event_type);

-- Enable Row Level Security
ALTER TABLE public.prompt_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_batch_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for prompt batches
CREATE POLICY "Users can view own prompt batches" ON public.prompt_batches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prompt batches" ON public.prompt_batches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prompt batches" ON public.prompt_batches
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompt batches" ON public.prompt_batches
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for batch analytics
CREATE POLICY "Users can view own batch analytics" ON public.prompt_batch_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own batch analytics" ON public.prompt_batch_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add comments for documentation
COMMENT ON TABLE public.prompt_batches IS 'Stores batches of AI-generated prompt variations with performance analytics';
COMMENT ON TABLE public.prompt_batch_analytics IS 'Tracks user interactions with prompt batches for AI-assisted development analytics';