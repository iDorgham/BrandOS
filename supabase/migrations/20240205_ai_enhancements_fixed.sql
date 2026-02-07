-- AI Enhancement Tables Migration
-- This script adds AI analytics and compliance features to the existing Brand OS schema
-- Run this after the base schema and workspace migration

-- Create prompt_batches table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.prompt_batches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  variations JSONB DEFAULT '[]' NOT NULL,
  performance JSONB DEFAULT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create prompt_batch_analytics table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.prompt_batch_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  batch_id UUID REFERENCES public.prompt_batches(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL, -- 'batch_created', 'variations_selected', 'prompt_generated', 'batch_saved', 'batch_opened', 'batch_deleted'
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Ensure prompt_batches table has workspace_id if it was missing
-- Ensure prompt_batches table has workspace_id robustly
ALTER TABLE public.prompt_batches 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;





-- AI Enhancement Tables
-- =====================================

-- Prompt analytics tracking table
CREATE TABLE IF NOT EXISTS public.prompt_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  prompt_id UUID NOT NULL REFERENCES public.prompt_batches(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id),
  
  -- Performance metrics
  success_rate DECIMAL(3,2) NOT NULL DEFAULT 0.00, -- 0.00 to 1.00
  generation_time INTEGER NOT NULL, -- in milliseconds
  brand_alignment_score DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  usage_count INTEGER NOT NULL DEFAULT 0,
  
  -- Metadata
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompt feedback table
CREATE TABLE IF NOT EXISTS public.prompt_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  prompt_id UUID NOT NULL REFERENCES public.prompt_batches(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  helpful BOOLEAN,
  issues JSONB, -- Array of specific issues or suggestions
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance Analysis Tables
-- =====================================

-- Compliance analysis results
CREATE TABLE IF NOT EXISTS public.compliance_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Analysis metadata
  content_type VARCHAR(50) NOT NULL, -- 'text', 'image', 'html', 'design_tokens'
  content_snapshot JSONB NOT NULL, -- Snapshot of analyzed content
  
  -- Results
  overall_score DECIMAL(3,2) NOT NULL DEFAULT 0.00, -- 0.00 to 1.00
  violations JSONB NOT NULL, -- Array of violation objects
  heatmap_data JSONB NOT NULL, -- Heatmap point data
  recommendations JSONB NOT NULL, -- Array of recommendations
  
  -- Processing metadata
  analysis_version VARCHAR(20) DEFAULT '1.0',
  processing_time INTEGER, -- in milliseconds
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand Guidelines (enhanced for compliance checking)
CREATE TABLE IF NOT EXISTS public.brand_guidelines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id),
  
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'colors', 'typography', 'spacing', 'logo', 'tone', 'layout'
  description TEXT,
  
  -- Configuration stored as JSON
  config_json JSONB NOT NULL, -- Detailed rule configuration
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(workspace_id, name, version)
);

-- Compliance Violation Patterns (for ML training)
CREATE TABLE IF NOT EXISTS public.compliance_patterns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id),
  
  pattern_type VARCHAR(50) NOT NULL, -- 'color_mismatch', 'font_violation', etc.
  pattern_data JSONB NOT NULL, -- ML pattern features
  
  -- Training data
  is_violation BOOLEAN NOT NULL,
  confidence DECIMAL(3,2),
  user_confirmed BOOLEAN, -- Confirmed by human reviewer
  
  -- Metadata
  source_analysis_id UUID REFERENCES public.compliance_analyses(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Model Performance Tracking
CREATE TABLE IF NOT EXISTS public.ai_model_performance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id),
  
  model_name VARCHAR(100) NOT NULL,
  model_version VARCHAR(20) NOT NULL,
  
  -- Performance metrics
  task_type VARCHAR(50) NOT NULL, -- 'prompt_generation', 'compliance_analysis', etc.
  accuracy DECIMAL(3,2),
  precision_score DECIMAL(3,2),
  recall_score DECIMAL(3,2),
  f1_score DECIMAL(3,2),
  latency INTEGER, -- in milliseconds
  
  -- Usage metrics
  request_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  
  -- Metadata
  evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(workspace_id, model_name, model_version, evaluated_at)
);

-- Prompt Variations Table
CREATE TABLE IF NOT EXISTS public.prompt_variations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  base_prompt TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id),
  
  strategy_id VARCHAR(100) NOT NULL, -- 'semantic_enhancement', 'brand_alignment', etc.
  variation_prompt TEXT NOT NULL,
  confidence_score DECIMAL(3,2) DEFAULT 0.00,
  predicted_performance JSONB NOT NULL, -- { success_rate, brand_alignment, engagement }
  changes JSONB DEFAULT '[]', -- Array of change objects
  rationale TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);




-- =====================================
-- POST-CREATION FIXES (Run here to ensure columns exist before indexing)
-- =====================================

-- Ensure other AI tables have workspace_id (in case of partial previous runs where tables were created without it)
ALTER TABLE public.prompt_analytics 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;

ALTER TABLE public.prompt_batch_analytics 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;

ALTER TABLE public.compliance_analyses 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;

ALTER TABLE public.brand_guidelines 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;

ALTER TABLE public.compliance_patterns 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;

ALTER TABLE public.ai_model_performance 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;

ALTER TABLE public.prompt_variations 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;

-- Create indexes for prompt_batch tables
-- =====================================
CREATE INDEX IF NOT EXISTS idx_prompt_batches_user_created ON public.prompt_batches(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_prompt_batches_workspace_id ON public.prompt_batches(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompt_batches_performance ON public.prompt_batches USING gin (performance);
CREATE INDEX IF NOT EXISTS idx_prompt_batch_analytics_batch ON public.prompt_batch_analytics(batch_id, timestamp, event_type);

-- Enable RLS for prompt_batch tables
ALTER TABLE public.prompt_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_batch_analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies for prompt_batch tables
DROP POLICY IF EXISTS "Users can view own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can view own prompt batches" ON public.prompt_batches
  FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can insert own prompt batches" ON public.prompt_batches
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can update own prompt batches" ON public.prompt_batches
  FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own prompt batches" ON public.prompt_batches;
CREATE POLICY "Users can delete own prompt batches" ON public.prompt_batches
  FOR DELETE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own batch analytics" ON public.prompt_batch_analytics;
CREATE POLICY "Users can view own batch analytics" ON public.prompt_batch_analytics
  FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert own batch analytics" ON public.prompt_batch_analytics;
CREATE POLICY "Users can insert own batch analytics" ON public.prompt_batch_analytics
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create indexes for new tables
-- =====================================

-- prompt_analytics indexes
CREATE INDEX IF NOT EXISTS idx_prompt_analytics_prompt_id ON public.prompt_analytics(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_analytics_user_id ON public.prompt_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_prompt_analytics_workspace_id ON public.prompt_analytics(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompt_analytics_created_at ON public.prompt_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_prompt_analytics_success_rate ON public.prompt_analytics(success_rate);

-- prompt_feedback indexes
CREATE INDEX IF NOT EXISTS idx_prompt_feedback_prompt_id ON public.prompt_feedback(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_feedback_user_id ON public.prompt_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_prompt_feedback_rating ON public.prompt_feedback(rating);

-- compliance_analyses indexes
CREATE INDEX IF NOT EXISTS idx_compliance_analyses_workspace_id ON public.compliance_analyses(workspace_id);
CREATE INDEX IF NOT EXISTS idx_compliance_analyses_user_id ON public.compliance_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_compliance_analyses_content_type ON public.compliance_analyses(content_type);
CREATE INDEX IF NOT EXISTS idx_compliance_analyses_overall_score ON public.compliance_analyses(overall_score);
CREATE INDEX IF NOT EXISTS idx_compliance_analyses_created_at ON public.compliance_analyses(created_at);

-- brand_guidelines indexes
CREATE INDEX IF NOT EXISTS idx_brand_guidelines_workspace_id ON public.brand_guidelines(workspace_id);
CREATE INDEX IF NOT EXISTS idx_brand_guidelines_type ON public.brand_guidelines(type);
CREATE INDEX IF NOT EXISTS idx_brand_guidelines_is_active ON public.brand_guidelines(is_active);

-- compliance_patterns indexes
CREATE INDEX IF NOT EXISTS idx_compliance_patterns_workspace_id ON public.compliance_patterns(workspace_id);
CREATE INDEX IF NOT EXISTS idx_compliance_patterns_pattern_type ON public.compliance_patterns(pattern_type);
CREATE INDEX IF NOT EXISTS idx_compliance_patterns_is_violation ON public.compliance_patterns(is_violation);

-- ai_model_performance indexes
CREATE INDEX IF NOT EXISTS idx_ai_model_performance_workspace_id ON public.ai_model_performance(workspace_id);
CREATE INDEX IF NOT EXISTS idx_ai_model_performance_model_name ON public.ai_model_performance(model_name);
CREATE INDEX IF NOT EXISTS idx_ai_model_performance_task_type ON public.ai_model_performance(task_type);
CREATE INDEX IF NOT EXISTS idx_ai_model_performance_evaluated_at ON public.ai_model_performance(evaluated_at);

-- prompt_variations indexes
CREATE INDEX IF NOT EXISTS idx_prompt_variations_workspace_id ON public.prompt_variations(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompt_variations_user_id ON public.prompt_variations(user_id);
CREATE INDEX IF NOT EXISTS idx_prompt_variations_strategy_id ON public.prompt_variations(strategy_id);
CREATE INDEX IF NOT EXISTS idx_prompt_variations_created_at ON public.prompt_variations(created_at);

-- Functions for prompt analytics
-- =====================================

-- Function to track prompt analytics
CREATE OR REPLACE FUNCTION public.track_prompt_analytics(
  p_prompt_id UUID,
  p_generation_time INTEGER,
  p_brand_alignment_score DECIMAL(3,2),
  p_success BOOLEAN,
  p_user_id UUID,
  p_workspace_id UUID,
  p_context JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.prompt_analytics (
    prompt_id,
    generation_time,
    brand_alignment_score,
    success_rate,
    user_id,
    workspace_id,
    context
  ) VALUES (
    p_prompt_id,
    p_generation_time,
    p_brand_alignment_score,
    CASE WHEN p_success THEN 1.0 ELSE 0.0 END,
    p_user_id,
    p_workspace_id,
    p_context
  )
  ON CONFLICT (prompt_id, user_id, workspace_id) 
  DO UPDATE SET
    generation_time = EXCLUDED.generation_time,
    brand_alignment_score = EXCLUDED.brand_alignment_score,
    success_rate = EXCLUDED.success_rate,
    usage_count = public.prompt_analytics.usage_count + 1,
    context = EXCLUDED.context,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to get prompt metrics
CREATE OR REPLACE FUNCTION public.get_prompt_metrics(
  p_prompt_id UUID
) RETURNS TABLE (
  prompt_id UUID,
  success_rate DECIMAL(3,2),
  average_time DECIMAL(10,2),
  brand_alignment_score DECIMAL(3,2),
  refinement_count INTEGER,
  conversion_rate DECIMAL(3,2),
  user_rating DECIMAL(3,2),
  usage_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.prompt_id,
    AVG(pa.success_rate) as success_rate,
    AVG(pa.generation_time) as average_time,
    AVG(pa.brand_alignment_score) as brand_alignment_score,
    COUNT(pa.id) as refinement_count,
    -- Calculate conversion rate (successful generations / total generations)
    CASE 
      WHEN COUNT(pa.id) > 0 
      THEN SUM(CASE WHEN pa.success_rate > 0.8 THEN 1 ELSE 0 END)::DECIMAL / COUNT(pa.id)
      ELSE 0
    END as conversion_rate,
    COALESCE(AVG(pf.rating), 0) as user_rating,
    SUM(pa.usage_count) as usage_count
  FROM public.prompt_analytics pa
  LEFT JOIN public.prompt_feedback pf ON pa.prompt_id = pf.prompt_id
  WHERE pa.prompt_id = p_prompt_id
  GROUP BY pa.prompt_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get top performing prompts
CREATE OR REPLACE FUNCTION public.get_top_performing_prompts(
  p_limit INTEGER DEFAULT 10,
  p_user_id UUID DEFAULT NULL,
  p_workspace_id UUID DEFAULT NULL,
  p_min_success_rate DECIMAL(3,2) DEFAULT 0.7
) RETURNS TABLE (
  prompt_id UUID,
  success_rate DECIMAL(3,2),
  average_time DECIMAL(10,2),
  brand_alignment_score DECIMAL(3,2),
  refinement_count INTEGER,
  conversion_rate DECIMAL(3,2),
  user_rating DECIMAL(3,2),
  usage_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.prompt_id,
    AVG(pa.success_rate) as success_rate,
    AVG(pa.generation_time) as average_time,
    AVG(pa.brand_alignment_score) as brand_alignment_score,
    COUNT(pa.id) as refinement_count,
    CASE 
      WHEN COUNT(pa.id) > 0 
      THEN SUM(CASE WHEN pa.success_rate > 0.8 THEN 1 ELSE 0 END)::DECIMAL / COUNT(pa.id)
      ELSE 0
    END as conversion_rate,
    COALESCE(AVG(pf.rating), 0) as user_rating,
    SUM(pa.usage_count) as usage_count
  FROM public.prompt_analytics pa
  LEFT JOIN public.prompt_feedback pf ON pa.prompt_id = pf.prompt_id
  WHERE (p_user_id IS NULL OR pa.user_id = p_user_id)
    AND (p_workspace_id IS NULL OR pa.workspace_id = p_workspace_id)
  GROUP BY pa.prompt_id
  HAVING AVG(pa.success_rate) >= p_min_success_rate
  ORDER BY success_rate DESC, usage_count DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to get analytics summary
CREATE OR REPLACE FUNCTION public.get_analytics_summary(
  p_user_id UUID DEFAULT NULL,
  p_workspace_id UUID DEFAULT NULL,
  p_start_date TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  p_end_date TIMESTAMP WITH TIME ZONE DEFAULT NULL
) RETURNS TABLE (
  total_prompts INTEGER,
  average_success_rate DECIMAL(3,2),
  average_brand_alignment DECIMAL(3,2),
  total_generation_time BIGINT,
  best_performing_day DATE,
  improvement_trend DECIMAL(3,2)
) AS $$
BEGIN
  RETURN QUERY
  WITH daily_stats AS (
    SELECT 
      DATE(pa.created_at) as analysis_date,
      AVG(pa.success_rate) as daily_success_rate,
      SUM(pa.generation_time) as daily_generation_time
    FROM public.prompt_analytics pa
    WHERE (p_user_id IS NULL OR pa.user_id = p_user_id)
      AND (p_workspace_id IS NULL OR pa.workspace_id = p_workspace_id)
      AND (p_start_date IS NULL OR pa.created_at >= p_start_date)
      AND (p_end_date IS NULL OR pa.created_at <= p_end_date)
    GROUP BY DATE(pa.created_at)
  ),
  trend_comparison AS (
    SELECT 
      AVG(CASE WHEN analysis_date >= CURRENT_DATE - INTERVAL '7 days' THEN daily_success_rate END) as recent_avg,
      AVG(CASE WHEN analysis_date < CURRENT_DATE - INTERVAL '7 days' AND analysis_date >= CURRENT_DATE - INTERVAL '14 days' THEN daily_success_rate END) as previous_avg
    FROM daily_stats
    WHERE analysis_date >= CURRENT_DATE - INTERVAL '14 days'
  )
  SELECT 
    COUNT(DISTINCT pa.prompt_id) as total_prompts,
    AVG(pa.success_rate) as average_success_rate,
    AVG(pa.brand_alignment_score) as average_brand_alignment,
    SUM(pa.generation_time) as total_generation_time,
    (SELECT analysis_date FROM daily_stats ORDER BY daily_success_rate DESC LIMIT 1) as best_performing_day,
    COALESCE((SELECT recent_avg - previous_avg FROM trend_comparison), 0) as improvement_trend
  FROM public.prompt_analytics pa
  WHERE (p_user_id IS NULL OR pa.user_id = p_user_id)
    AND (p_workspace_id IS NULL OR pa.workspace_id = p_workspace_id)
    AND (p_start_date IS NULL OR pa.created_at >= p_start_date)
    AND (p_end_date IS NULL OR pa.created_at <= p_end_date);
END;
$$ LANGUAGE plpgsql;

-- Function to track prompt feedback
CREATE OR REPLACE FUNCTION public.track_prompt_feedback(
  p_prompt_id UUID,
  p_user_id UUID,
  p_rating INTEGER,
  p_feedback TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.prompt_feedback (
    prompt_id,
    user_id,
    rating,
    feedback
  ) VALUES (
    p_prompt_id,
    p_user_id,
    p_rating,
    p_feedback
  )
  ON CONFLICT (prompt_id, user_id) 
  DO UPDATE SET
    rating = EXCLUDED.rating,
    feedback = EXCLUDED.feedback,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to get prompt insights
CREATE OR REPLACE FUNCTION public.get_prompt_insights(
  p_prompt_id UUID
) RETURNS TABLE (
  strengths TEXT[],
  improvements TEXT[],
  recommendations TEXT[],
  performance_trend VARCHAR(20)
) AS $$
BEGIN
  RETURN QUERY
  WITH recent_analytics AS (
    SELECT 
      pa.*,
      LAG(pa.success_rate) OVER (ORDER BY pa.created_at) as previous_success_rate
    FROM public.prompt_analytics pa
    WHERE pa.prompt_id = p_prompt_id
    ORDER BY pa.created_at DESC
    LIMIT 10
  ),
  trend_analysis AS (
    SELECT 
      CASE 
        WHEN AVG(success_rate) > AVG(COALESCE(previous_success_rate, 0)) + 0.1 THEN 'improving'
        WHEN AVG(success_rate) < AVG(COALESCE(previous_success_rate, 0)) - 0.1 THEN 'declining'
        ELSE 'stable'
      END as trend
    FROM recent_analytics
  )
  SELECT 
    array_remove(ARRAY[
      CASE WHEN AVG(ra.success_rate) > 0.8 THEN 'High success rate' ELSE NULL END,
      CASE WHEN AVG(ra.brand_alignment_score) > 0.8 THEN 'Strong brand alignment' ELSE NULL END
    ], NULL) as strengths,
    array_remove(ARRAY[
      CASE WHEN AVG(ra.success_rate) < 0.6 THEN 'Improve success rate' ELSE NULL END,
      CASE WHEN AVG(ra.generation_time) > 5000 THEN 'Reduce generation time' ELSE NULL END
    ], NULL) as improvements,
    array_remove(ARRAY[
      CASE WHEN AVG(ra.brand_alignment_score) < 0.7 THEN 'Focus on brand guidelines' ELSE NULL END,
      CASE WHEN COUNT(ra.id) < 5 THEN 'Gather more usage data' ELSE NULL END
    ], NULL) as recommendations,
    COALESCE(ta.trend, 'stable') as performance_trend
  FROM recent_analytics ra
  CROSS JOIN (SELECT trend FROM trend_analysis LIMIT 1) ta;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security for new tables
ALTER TABLE public.prompt_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_model_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_variations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables
-- =====================================

-- prompt_analytics policies
DROP POLICY IF EXISTS "Users can view their own prompt analytics" ON public.prompt_analytics;
CREATE POLICY "Users can view their own prompt analytics" ON public.prompt_analytics
  FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert their own prompt analytics" ON public.prompt_analytics;
CREATE POLICY "Users can insert their own prompt analytics" ON public.prompt_analytics
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own prompt analytics" ON public.prompt_analytics;
CREATE POLICY "Users can update their own prompt analytics" ON public.prompt_analytics
  FOR UPDATE USING (user_id = auth.uid());

-- prompt_feedback policies (table has user_id only, no workspace_id)
DROP POLICY IF EXISTS "Users can view their own prompt feedback" ON public.prompt_feedback;
CREATE POLICY "Users can view their own prompt feedback" ON public.prompt_feedback
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert their own prompt feedback" ON public.prompt_feedback;
CREATE POLICY "Users can insert their own prompt feedback" ON public.prompt_feedback
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own prompt feedback" ON public.prompt_feedback;
CREATE POLICY "Users can update their own prompt feedback" ON public.prompt_feedback
  FOR UPDATE USING (user_id = auth.uid());

-- compliance_analyses policies
DROP POLICY IF EXISTS "Users can view their own compliance analyses" ON public.compliance_analyses;
CREATE POLICY "Users can view their own compliance analyses" ON public.compliance_analyses
  FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert their own compliance analyses" ON public.compliance_analyses;
CREATE POLICY "Users can insert their own compliance analyses" ON public.compliance_analyses
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own compliance analyses" ON public.compliance_analyses;
CREATE POLICY "Users can update their own compliance analyses" ON public.compliance_analyses
  FOR UPDATE USING (user_id = auth.uid());

-- brand_guidelines policies
DROP POLICY IF EXISTS "Users can view brand guidelines in their workspaces" ON public.brand_guidelines;
CREATE POLICY "Users can view brand guidelines in their workspaces" ON public.brand_guidelines
  FOR SELECT USING (
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Workspace owners and admins can manage brand guidelines" ON public.brand_guidelines;
CREATE POLICY "Workspace owners and admins can manage brand guidelines" ON public.brand_guidelines
  FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role = 'admin')
  );

-- compliance_patterns policies
DROP POLICY IF EXISTS "Users can view their own compliance patterns" ON public.compliance_patterns;
CREATE POLICY "Users can view their own compliance patterns" ON public.compliance_patterns
  FOR SELECT USING (
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert their own compliance patterns" ON public.compliance_patterns;
CREATE POLICY "Users can insert their own compliance patterns" ON public.compliance_patterns
  FOR INSERT WITH CHECK (
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

-- ai_model_performance policies
DROP POLICY IF EXISTS "Users can view AI performance in their workspaces" ON public.ai_model_performance;
CREATE POLICY "Users can view AI performance in their workspaces" ON public.ai_model_performance
  FOR SELECT USING (
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Workspace owners and admins can manage AI performance data" ON public.ai_model_performance;
CREATE POLICY "Workspace owners and admins can manage AI performance data" ON public.ai_model_performance
  FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid() AND role = 'admin')
  );

-- prompt_variations policies
DROP POLICY IF EXISTS "Users can view their own prompt variations" ON public.prompt_variations;
CREATE POLICY "Users can view their own prompt variations" ON public.prompt_variations
  FOR SELECT USING (
    user_id = auth.uid() OR 
    workspace_id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert their own prompt variations" ON public.prompt_variations;
CREATE POLICY "Users can insert their own prompt variations" ON public.prompt_variations
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own prompt variations" ON public.prompt_variations;
CREATE POLICY "Users can update their own prompt variations" ON public.prompt_variations
  FOR UPDATE USING (user_id = auth.uid());

-- Triggers for updated_at timestamps
-- =====================================

-- Create trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for new tables
DROP TRIGGER IF EXISTS set_prompt_batches_timestamp ON public.prompt_batches;
CREATE TRIGGER set_prompt_batches_timestamp
  BEFORE UPDATE ON public.prompt_batches
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_prompt_analytics_timestamp ON public.prompt_analytics;
CREATE TRIGGER set_prompt_analytics_timestamp
  BEFORE UPDATE ON public.prompt_analytics
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_prompt_feedback_timestamp ON public.prompt_feedback;
CREATE TRIGGER set_prompt_feedback_timestamp
  BEFORE UPDATE ON public.prompt_feedback
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_compliance_analyses_timestamp ON public.compliance_analyses;
CREATE TRIGGER set_compliance_analyses_timestamp
  BEFORE UPDATE ON public.compliance_analyses
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_brand_guidelines_timestamp ON public.brand_guidelines;
CREATE TRIGGER set_brand_guidelines_timestamp
  BEFORE UPDATE ON public.brand_guidelines
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_prompt_variations_timestamp ON public.prompt_variations;
CREATE TRIGGER set_prompt_variations_timestamp
  BEFORE UPDATE ON public.prompt_variations
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- =====================================
-- POST-CREATION FIXES (Moved to line 181)
-- =====================================
-- Columns added above used to be here.

-- Ensure UNIQUE constraint for prompt_analytics (Required for ON CONFLICT in track_prompt_analytics)
DO $$ BEGIN
    ALTER TABLE public.prompt_analytics 
    ADD CONSTRAINT prompt_analytics_unique_entry UNIQUE (prompt_id, user_id, workspace_id);
EXCEPTION
    WHEN duplicate_object THEN null;
    WHEN invalid_table_definition THEN null; 
END $$;