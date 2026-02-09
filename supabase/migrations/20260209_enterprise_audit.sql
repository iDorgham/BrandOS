-- ==========================================
-- PHASE 29: ENTERPRISE AUDIT SYSTEM
-- Create audit_logs table for compliance tracking
-- ==========================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- e.g., 'BRAND_UPDATE', 'MEMBER_INVITE', 'DEPLOYMENT_AUTHORIZED'
    entity_type TEXT NOT NULL, -- e.g., 'brand', 'workspace', 'deployment'
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Select Policy (Admins and Art Directors can see workspace logs)
DROP POLICY IF EXISTS "audit_logs_select_policy" ON public.audit_logs;
CREATE POLICY "audit_logs_select_policy" ON public.audit_logs 
FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id 
        FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid()) 
        AND role IN ('admin', 'art_director')
    )
);

-- Insert Policy (System/Service level - usually triggered by functions or authenticated users performing actions)
DROP POLICY IF EXISTS "audit_logs_insert_policy" ON public.audit_logs;
CREATE POLICY "audit_logs_insert_policy" ON public.audit_logs 
FOR INSERT WITH CHECK (
    workspace_id IN (
        SELECT workspace_id 
        FROM public.workspace_members 
        WHERE user_id = (SELECT auth.uid())
    )
);

-- No Update/Delete policies for audit logs to ensure immutability

-- Indexing for compliance reporting
CREATE INDEX IF NOT EXISTS idx_audit_logs_workspace_id ON public.audit_logs(workspace_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_type_id ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

COMMIT;
