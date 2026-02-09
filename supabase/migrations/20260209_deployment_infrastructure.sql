-- ==========================================
-- PHASE 28: DEPLOYMENT INFRASTRUCTURE
-- Create deployments table and RLS policies
-- ==========================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'deployed')),
    requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    deployed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;

-- Select Policy
DROP POLICY IF EXISTS "deployments_select_policy" ON public.deployments;
CREATE POLICY "deployments_select_policy" ON public.deployments 
FOR SELECT USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id = ANY(public.get_my_workspace_ids())
);

-- Insert Policy
DROP POLICY IF EXISTS "deployments_insert_policy" ON public.deployments;
CREATE POLICY "deployments_insert_policy" ON public.deployments 
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

-- Update Policy (Requester or Workspace Admins/Art Directors)
DROP POLICY IF EXISTS "deployments_update_policy" ON public.deployments;
CREATE POLICY "deployments_update_policy" ON public.deployments 
FOR UPDATE USING (
    user_id = (SELECT auth.uid()) OR 
    workspace_id IN (
        SELECT workspace_id 
        FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid()) 
        AND role IN ('admin', 'art_director')
    )
);

-- Delete Policy (Requester if pending, or Admins)
DROP POLICY IF EXISTS "deployments_delete_policy" ON public.deployments;
CREATE POLICY "deployments_delete_policy" ON public.deployments 
FOR DELETE USING (
    (user_id = (SELECT auth.uid()) AND status = 'pending') OR 
    workspace_id IN (
        SELECT workspace_id 
        FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid()) 
        AND role = 'admin'
    )
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_deployments_updated_at ON public.deployments;
CREATE TRIGGER set_deployments_updated_at
    BEFORE UPDATE ON public.deployments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_deployments_asset_id ON public.deployments(asset_id);
CREATE INDEX IF NOT EXISTS idx_deployments_workspace_id ON public.deployments(workspace_id);
CREATE INDEX IF NOT EXISTS idx_deployments_user_id ON public.deployments(user_id);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON public.deployments(status);

COMMIT;
