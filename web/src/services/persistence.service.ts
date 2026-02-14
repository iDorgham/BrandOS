import { supabase, Database, getCurrentUser } from './supabase.service';
import { BrandProfile, GeneratedAsset, PromptHistoryItem, Workspace, WorkspaceMember, Comment, UserProfile, UserRole, Moodboard, DeploymentRequest, DeploymentStatus, AuditLog } from '../types';
import { toast } from 'sonner';

// Brand Profile Services
export const brandService = {
  // Get all brands for the current user and their organizations
  async getBrands(orgId?: string): Promise<BrandProfile[]> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.warn('No user found, returning empty brands');
        return [];
      }
      let query = supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });

      if (orgId) {
        query = query.eq('workspace_id', orgId);
      } else {
        // PERSONAL MODE: Strictly fetch where workspace_id is null
        query = query.is('workspace_id', null);
      }

      console.log(`[BrandService] Fetching brands for orgId: ${orgId || 'Personal'}`);
      const { data, error } = await query;
      if (error) {
        console.error('[BrandService] Query error:', error);
        throw error;
      }

      console.log(`[BrandService] Found ${data?.length || 0} brands in DB`);

      // is_active may not exist in older schema
      let rows = data || [];
      try {
        rows = rows.filter((r: any) => r.is_active !== false);
      } catch {
        // ignore
      }
      return rows.map(this.mapDbBrandToApp);
    } catch (error: any) {
      console.warn('Failed to fetch brands:', error?.message);
      // Return empty instead of throwing so app can show default templates
      // Handle schema errors, auth errors, and other recoverable issues
      if (
        !error?.message ||
        error.message?.includes('does not exist') ||
        error.message?.includes('workspace_id') ||
        error.message?.includes('not authenticated') ||
        error.message?.includes('User not authenticated') ||
        error.message?.includes('JWT') ||
        error.code === 'PGRST116' ||
        error.code === '42703' ||
        error.code === '42P01' ||
        error.status === 401 ||
        error.status === 403
      ) {
        return [];
      }
      // For unexpected errors, still return [] to prevent blocking the UI
      console.error('Unexpected error loading brands:', error);
      return [];
    }
  },

  // Create a new brand
  async createBrand(brand: Omit<BrandProfile, 'id'>, orgId?: string): Promise<BrandProfile> {
    console.log('DEBUG: brandService.createBrand starting', { orgId, brandName: brand.name });
    const user = await getCurrentUser();
    if (!user) {
      console.error('DEBUG: No user found in createBrand');
      throw new Error('User not authenticated');
    }
    const { data, error } = await supabase
      .from('brands')
      .insert({
        user_id: user.id,
        workspace_id: orgId || brand.workspaceId || null,
        name: brand.name,
        doctrine: brand.doctrine,
        palette: brand.palette as any,
        background: brand.background,
        negative_space: brand.negativeSpace,
        safe_zones: brand.safeZones as any,
        emotional_tags: brand.emotionalTags,
        forbidden_elements: brand.forbiddenElements,
        grammar_rules: brand.grammarRules as any,
        extracted_patterns: brand.extractedPatterns,
        stylistic_signatures: brand.stylisticSignatures,
      })
      .select()
      .single();

    if (error) {
      console.error('DEBUG: [brandService.createBrand] Supabase insertion failed:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }
    console.log('DEBUG: Supabase brand insertion success:', data);

    const newBrand = this.mapDbBrandToApp(data);

    // Audit Log
    await auditService.logAction({
      workspaceId: newBrand.workspaceId || '',
      action: 'BRAND_CREATE',
      entityType: 'brand',
      entityId: newBrand.id,
      metadata: { name: newBrand.name }
    });

    return newBrand;
  },

  // Update an existing brand (or create if it doesn't exist - upsert pattern)
  async updateBrand(brand: BrandProfile): Promise<BrandProfile> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    // First, try to update
    const { data, error } = await supabase
      .from('brands')
      .update({
        name: brand.name,
        doctrine: brand.doctrine,
        palette: brand.palette as any,
        background: brand.background,
        negative_space: brand.negativeSpace,
        safe_zones: brand.safeZones as any,
        emotional_tags: brand.emotionalTags,
        forbidden_elements: brand.forbiddenElements,
        grammar_rules: brand.grammarRules as any,
        extracted_patterns: brand.extractedPatterns,
        stylistic_signatures: brand.stylisticSignatures,
        workspace_id: brand.workspaceId || null,
      })
      .eq('id', brand.id)
      .select()
      .single();

    if (!error) {
      const updatedBrand = this.mapDbBrandToApp(data);

      // Audit Log
      await auditService.logAction({
        workspaceId: updatedBrand.workspaceId || '',
        action: 'BRAND_UPDATE',
        entityType: 'brand',
        entityId: updatedBrand.id,
        metadata: { name: updatedBrand.name }
      });

      return updatedBrand;
    }

    // If update failed because row doesn't exist (406 Not Acceptable or PGRST116), create it
    if (error.code === 'PGRST116' || error.message?.includes('not found') || error.code === '406') {
      console.log('Brand not found in database, creating new record...');
      const { data: insertData, error: insertError } = await supabase
        .from('brands')
        .insert({
          id: brand.id,
          user_id: user.id,
          workspace_id: brand.workspaceId || null,
          name: brand.name,
          doctrine: brand.doctrine,
          palette: brand.palette as any,
          background: brand.background,
          negative_space: brand.negativeSpace,
          safe_zones: brand.safeZones as any,
          emotional_tags: brand.emotionalTags,
          forbidden_elements: brand.forbiddenElements,
          grammar_rules: brand.grammarRules as any,
          extracted_patterns: brand.extractedPatterns,
          stylistic_signatures: brand.stylisticSignatures,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return this.mapDbBrandToApp(insertData);
    }

    // For other errors, throw
    throw error;
  },

  // Delete a brand (soft delete)
  async deleteBrand(brandId: string): Promise<void> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('brands')
      .update({ is_active: false })
      .eq('id', brandId)
      .eq('user_id', user.id);

    if (error) throw error;
  },

  // Helper function to map database brand to app brand
  mapDbBrandToApp(dbBrand: Database['public']['Tables']['brands']['Row']): BrandProfile {
    return {
      id: dbBrand.id,
      name: dbBrand.name,
      doctrine: dbBrand.doctrine,
      palette: dbBrand.palette,
      background: dbBrand.background,
      negativeSpace: dbBrand.negative_space,
      safeZones: dbBrand.safe_zones,
      emotionalTags: dbBrand.emotional_tags as any,
      forbiddenElements: dbBrand.forbidden_elements || [],
      grammarRules: dbBrand.grammar_rules as any || [],
      extractedPatterns: dbBrand.extracted_patterns || [],
      stylisticSignatures: dbBrand.stylistic_signatures || [],
      workspaceId: dbBrand.workspace_id || undefined,
      userId: dbBrand.user_id,
    };
  },
};

// Asset Services
export const assetService = {
  // Get all assets for the current user or organization
  async getAssets(orgId?: string): Promise<GeneratedAsset[]> {
    try {
      const user = await getCurrentUser();
      let query = supabase.from('assets').select('*');

      if (orgId) {
        query = query.eq('workspace_id', orgId);
      } else {
        query = query.eq('user_id', user.id).is('workspace_id', null);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(this.mapDbAssetToApp);
    } catch (error: any) {
      console.warn('Failed to fetch assets:', error.message);
      if (error.message?.includes('does not exist') || error.code === 'PGRST116') {
        return [];
      }
      throw error;
    }
  },

  // Get assets for a specific brand
  async getAssetsByBrand(brandId: string): Promise<GeneratedAsset[]> {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(this.mapDbAssetToApp);
  },

  // Create a new asset
  async createAsset(asset: Omit<GeneratedAsset, 'id' | 'timestamp'>, orgId?: string): Promise<GeneratedAsset> {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from('assets')
      .insert({
        user_id: user.id,
        brand_id: asset.brandId,
        workspace_id: orgId || asset.workspaceId || null,
        url: asset.url,
        prompt: asset.prompt,
        subject: asset.subject,
        orchestrated_prompt: asset.orchestratedPrompt,
        asset_type: asset.assetType,
        compliance_score: asset.complianceScore,
        audit_details: asset.auditDetails,
        metadata: asset.metadata,
      })
      .select()
      .single();

    if (error) throw error;

    return this.mapDbAssetToApp(data);
  },

  // Delete an asset
  async deleteAsset(assetId: string): Promise<void> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', assetId)
      .eq('user_id', user.id);

    if (error) throw error;
  },

  // Helper function to map database asset to app asset
  mapDbAssetToApp(dbAsset: Database['public']['Tables']['assets']['Row']): GeneratedAsset {
    return {
      id: dbAsset.id,
      url: dbAsset.url,
      prompt: dbAsset.prompt,
      subject: dbAsset.subject || undefined,
      orchestratedPrompt: dbAsset.orchestrated_prompt || undefined,
      assetType: dbAsset.asset_type,
      complianceScore: dbAsset.compliance_score || 0,
      auditDetails: dbAsset.audit_details as any,
      brandId: dbAsset.brand_id,
      timestamp: new Date(dbAsset.created_at).getTime(),
      workspaceId: dbAsset.workspace_id || undefined,
    };
  },
};

// Prompt History Services
export const promptHistoryService = {
  // Get prompt history for the current user or organization
  async getPromptHistory(orgId?: string): Promise<PromptHistoryItem[]> {
    try {
      const user = await getCurrentUser();
      let query = supabase.from('prompt_history').select('*');

      if (orgId) {
        query = query.eq('workspace_id', orgId);
      } else {
        query = query.eq('user_id', user.id).is('workspace_id', null);
      }

      const { data, error } = await query.order('created_at', { ascending: false }).limit(30);

      if (error) throw error;
      return data.map(this.mapDbPromptToApp);
    } catch (error: any) {
      console.warn('Failed to fetch prompt history:', error.message);
      if (error.message?.includes('does not exist') || error.code === 'PGRST116') {
        return [];
      }
      throw error;
    }
  },

  // Get prompt history for a specific brand
  async getPromptHistoryByBrand(brandId: string): Promise<PromptHistoryItem[]> {
    const { data, error } = await supabase
      .from('prompt_history')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    return data.map(this.mapDbPromptToApp);
  },

  // Add a new prompt to history
  async addPromptToHistory(prompt: Omit<PromptHistoryItem, 'id' | 'timestamp'>, orgId?: string): Promise<PromptHistoryItem> {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from('prompt_history')
      .insert({
        user_id: user.id,
        workspace_id: orgId || prompt.workspaceId || null,
        brand_id: prompt.brandId,
        subject: prompt.subject,
        orchestrated: prompt.orchestrated,
        asset_type: prompt.assetType,
        intensities: prompt.intensities,
      })
      .select()
      .single();

    if (error) throw error;

    return this.mapDbPromptToApp(data);
  },

  // Clear prompt history for a user
  async clearPromptHistory(): Promise<void> {
    const user = await getCurrentUser();
    const { error } = await supabase
      .from('prompt_history')
      .delete()
      .eq('user_id', user.id);

    if (error) throw error;
  },

  // Helper function to map database prompt to app prompt
  mapDbPromptToApp(dbPrompt: Database['public']['Tables']['prompt_history']['Row']): PromptHistoryItem {
    return {
      id: dbPrompt.id,
      subject: dbPrompt.subject,
      orchestrated: dbPrompt.orchestrated,
      brandId: dbPrompt.brand_id,
      assetType: dbPrompt.asset_type || undefined,
      intensities: dbPrompt.intensities as any,
      timestamp: new Date(dbPrompt.created_at).getTime(),
      workspaceId: dbPrompt.workspace_id || undefined,
    };
  },
};

// Moodboard Services
export const moodboardService = {
  // Get all moodboards for a brand
  async getMoodboards(brandId: string): Promise<Moodboard[]> {
    try {
      const user = await getCurrentUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('moodboards')
        .select('*')
        .eq('brand_id', brandId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        // Table may not exist yet
        if (error.code === 'PGRST116' || error.message?.includes('does not exist') || error.code === '42P01') {
          console.warn('Moodboards table not found, returning empty array');
          return [];
        }
        throw error;
      }

      return (data || []).map(this.mapDbMoodboardToApp);
    } catch (error: any) {
      console.warn('Failed to fetch moodboards:', error?.message);
      return [];
    }
  },

  // Create a new moodboard
  async createMoodboard(moodboard: Omit<Moodboard, 'id' | 'createdAt' | 'updatedAt'>, orgId?: string): Promise<Moodboard> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('moodboards')
      .insert({
        user_id: user.id,
        brand_id: moodboard.brandId,
        workspace_id: orgId || moodboard.workspaceId || null,
        name: moodboard.name,
        description: moodboard.description || null,
        is_active: moodboard.isActive ?? true,
        nodes: moodboard.nodes || [],
        edges: moodboard.edges || [],
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapDbMoodboardToApp(data);
  },

  // Update an existing moodboard
  async updateMoodboard(moodboard: Moodboard): Promise<Moodboard> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('moodboards')
      .update({
        name: moodboard.name,
        description: moodboard.description || null,
        is_active: moodboard.isActive,
        nodes: moodboard.nodes,
        edges: moodboard.edges,
      })
      .eq('id', moodboard.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return this.mapDbMoodboardToApp(data);
  },

  // Toggle moodboard active status
  async toggleActive(moodboardId: string, isActive: boolean): Promise<void> {
    const { error } = await supabase
      .from('moodboards')
      .update({ is_active: isActive })
      .eq('id', moodboardId);

    if (error) throw error;
  },

  // Delete a moodboard (hard delete)
  async deleteMoodboard(moodboardId: string): Promise<void> {
    const { error } = await supabase
      .from('moodboards')
      .delete()
      .eq('id', moodboardId);

    if (error) throw error;
  },

  // Helper function to map database moodboard to app moodboard
  mapDbMoodboardToApp(dbMoodboard: any): Moodboard {
    return {
      id: dbMoodboard.id,
      brandId: dbMoodboard.brand_id,
      workspaceId: dbMoodboard.workspace_id || undefined,
      userId: dbMoodboard.user_id,
      name: dbMoodboard.name,
      description: dbMoodboard.description || undefined,
      isActive: dbMoodboard.is_active,
      nodes: dbMoodboard.nodes || [],
      edges: dbMoodboard.edges || [],
      createdAt: new Date(dbMoodboard.created_at).getTime(),
      updatedAt: new Date(dbMoodboard.updated_at).getTime(),
    };
  },
};

// Deployment Services
export const deploymentService = {
  // Get all deployment requests for current user or organization
  async getDeploymentRequests(orgId?: string): Promise<DeploymentRequest[]> {
    try {
      const user = await getCurrentUser();
      if (!user) return [];

      let query = supabase.from('deployments').select('*');

      if (orgId) {
        query = query.eq('workspace_id', orgId);
      } else {
        query = query.eq('user_id', user.id).is('workspace_id', null);
      }

      const { data, error } = await query.order('requested_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(this.mapDbDeploymentToApp);
    } catch (error: any) {
      console.warn('Failed to fetch deployments:', error.message);
      return [];
    }
  },

  // Create a new deployment request
  async createDeploymentRequest(request: Omit<DeploymentRequest, 'id' | 'requestedAt' | 'status' | 'requestedBy' | 'userId'>, orgId?: string): Promise<DeploymentRequest> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('deployments')
      .insert({
        asset_id: request.assetId,
        target_id: request.targetId,
        workspace_id: orgId || request.workspaceId || null,
        user_id: user.id,
        notes: request.notes,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapDbDeploymentToApp(data);
  },

  // Update deployment status (Approve/Reject/Deploy)
  async updateDeploymentStatus(
    id: string,
    status: DeploymentStatus,
    notes?: string
  ): Promise<DeploymentRequest> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const updateData: any = { status };
    if (notes) updateData.notes = notes;

    if (status === 'approved') {
      updateData.approved_by = user.id;
      updateData.approved_at = new Date().toISOString();
    } else if (status === 'deployed') {
      updateData.deployed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('deployments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Audit Log
    const updatedRequest = this.mapDbDeploymentToApp(data);
    await auditService.logAction({
      workspaceId: updatedRequest.workspaceId || '',
      action: `DEPLOYMENT_${status.toUpperCase()}`,
      entityType: 'deployment',
      entityId: updatedRequest.id,
      metadata: { target: updatedRequest.targetId, status }
    });

    return updatedRequest;
  },

  // Delete a deployment request
  async deleteDeploymentRequest(id: string): Promise<void> {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('deployments')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  },

  // Helper function to map database deployment to app deployment
  mapDbDeploymentToApp(dbDeployment: any): DeploymentRequest {
    return {
      id: dbDeployment.id,
      assetId: dbDeployment.asset_id,
      targetId: dbDeployment.target_id,
      status: dbDeployment.status as DeploymentStatus,
      requestedBy: dbDeployment.user_id,
      requestedAt: new Date(dbDeployment.requested_at).getTime(),
      approvedBy: dbDeployment.approved_by || undefined,
      approvedAt: dbDeployment.approved_at ? new Date(dbDeployment.approved_at).getTime() : undefined,
      deployedAt: dbDeployment.deployed_at ? new Date(dbDeployment.deployed_at).getTime() : undefined,
      notes: dbDeployment.notes || undefined,
      workspaceId: dbDeployment.workspace_id || undefined,
      userId: dbDeployment.user_id,
    };
  }
};

// Audit Services
export const auditService = {
  // Record a new audit log
  async logAction(log: Omit<AuditLog, 'id' | 'createdAt' | 'userId'>): Promise<void> {
    try {
      const user = await getCurrentUser();

      const { error } = await supabase
        .from('audit_logs')
        .insert({
          workspace_id: log.workspaceId,
          user_id: user?.id || null,
          action: log.action,
          entity_type: log.entityType,
          entity_id: log.entityId,
          metadata: log.metadata || {},
          user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server'
        });

      if (error) throw error;
    } catch (error: any) {
      console.warn('Failed to record audit log:', error.message);
    }
  },

  // Get audit logs for a workspace with filtering
  async getAuditLogs(
    workspaceId: string,
    filters?: {
      action?: string;
      entityType?: string;
      userId?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<AuditLog[]> {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false });

      if (filters?.action) {
        query = query.eq('action', filters.action);
      }
      if (filters?.entityType) {
        query = query.eq('entity_type', filters.entityType);
      }
      if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        const limit = filters.limit || 50;
        query = query.range(filters.offset, filters.offset + limit - 1);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data || []).map(this.mapDbLogToApp);
    } catch (error: any) {
      console.warn('Failed to fetch audit logs:', error.message);
      return [];
    }
  },

  // Helper function to map database log to app log
  mapDbLogToApp(dbLog: any): AuditLog {
    return {
      id: dbLog.id,
      workspaceId: dbLog.workspace_id,
      userId: dbLog.user_id || undefined,
      action: dbLog.action,
      entityType: dbLog.entity_type,
      entityId: dbLog.entity_id || undefined,
      metadata: dbLog.metadata,
      createdAt: new Date(dbLog.created_at).getTime(),
    };
  }
};

// Workspace Services
export const organizationService = {
  // Get all workspaces the user belongs to
  async getWorkspaces(): Promise<Workspace[]> {
    try {
      console.log('DEBUG: Fetching workspaces from Supabase...');
      const { data, error } = await supabase
        .from('workspaces')
        .select('*');

      if (error) {
        console.error('DEBUG: [organizationService.getWorkspaces] Supabase error:', {
          message: error.message,
          code: error.code,
          details: error.details
        });

        // If table doesn't exist, log it and return empty for mock fallback
        if (error.code === 'PGRST116' || error.message?.includes('schema cache')) {
          console.warn('Workspaces table not found in schema cache. Falling back to mock data.');
          return [];
        }
        throw error;
      }

      console.log('DEBUG: RAW Workspaces data:', data);

      return data.map(this.mapDbOrgToApp);
    } catch (err: any) {
      console.error('DEBUG: [organizationService.getWorkspaces] Critical error:', {
        message: err.message,
        stack: err.stack
      });
      return []; // Return empty to trigger mock fallback in AuthContext
    }
  },

  // Create a new organization
  async createWorkspace(name: string, slug: string): Promise<Workspace> {
    const user = await getCurrentUser();

    // 1. Try RPC (Transactionally creates org + owner membership)
    const { data, error: rpcError } = await supabase
      .rpc('create_workspace_with_owner', {
        ws_name: name,
        ws_slug: slug
      });

    if (!rpcError && data) {
      const { data: orgData, error: orgError } = await supabase
        .from('workspaces')
        .select('*')
        .eq('id', data)
        .single();

      if (!orgError && orgData) return this.mapDbOrgToApp(orgData);
    }

    // 2. Fallback: Manual Creation (If RPC fails or is missing)
    console.warn('RPC create_workspace_with_owner failed or returned no data, attempting manual creation...', rpcError);

    const { data: newOrg, error: createError } = await supabase
      .from('workspaces')
      .insert({
        name,
        slug,
        owner_id: user.id
      })
      .select()
      .single();

    if (createError) throw createError;

    // Must also add the member record for the owner
    const { error: memberError } = await supabase
      .from('workspace_members')
      .insert({
        workspace_id: newOrg.id,
        user_id: user.id,
        role: 'admin'
      });

    if (memberError) {
      // Cleanup orphaned org if member creation fails
      await supabase.from('workspaces').delete().eq('id', newOrg.id);
      throw memberError;
    }

    const ws = this.mapDbOrgToApp(newOrg);

    // Audit Log
    await auditService.logAction({
      workspaceId: ws.id,
      action: 'WORKSPACE_CREATE',
      entityType: 'workspace',
      entityId: ws.id,
      metadata: { name: ws.name, slug: ws.slug }
    });

    return ws;
  },

  // Get workspace members
  async getMembers(workspaceId: string): Promise<(WorkspaceMember & { profile: any })[]> {
    try {
      // First try with profiles join
      const { data, error } = await supabase
        .from('workspace_members')
        .select('*')
        .eq('workspace_id', workspaceId);

      if (error) {
        console.warn('Failed to load workspace members:', error);
        return [];
      }

      // Map the data and create a mock profile from available data
      return (data || []).map(member => ({
        ...member,
        profile: {
          id: member.user_id,
          email: `user-${member.user_id.substring(0, 8)}@workspace.local`,
          full_name: `Team Member`,
          avatar_url: null,
        }
      })) as any;
    } catch (err) {
      console.error('Error in getMembers:', err);
      return [];
    }
  },

  // Get user role in workspace
  async getUserRole(workspaceId: string, userId: string): Promise<UserRole> {
    try {
      const { data, error } = await supabase
        .from('workspace_members')
        .select('role')
        .eq('workspace_id', workspaceId)
        .eq('user_id', userId)
        .single();

      if (error || !data) return 'designer';
      return data.role as UserRole;
    } catch {
      return 'designer';
    }
  },

  // Invite/Add a member
  async addMember(workspaceId: string, email: string, role: string): Promise<void> {
    // This would typically involve a cloud function or invite system
    console.log('Adding member', email, 'to', workspaceId, 'with role', role);
    toast.info('Member invite system pending implementation');
  },

  // Helper function to map database org to app org
  mapDbOrgToApp(dbOrg: Database['public']['Tables']['workspaces']['Row']): Workspace {
    return {
      id: dbOrg.id,
      name: dbOrg.name,
      slug: dbOrg.slug,
      ownerId: dbOrg.owner_id,
      createdAt: new Date(dbOrg.created_at).getTime(),
    };
  },
};

// User Profile Services
export const userService = {
  async getProfile(): Promise<UserProfile> {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return {
        id: user.id,
        name: '',
        email: user.email || '',
        avatarUrl: '',
        bio: '',
        role: 'art_director',
        preferences: {
          notifications: true,
          theme: 'dark',
          compactMode: false
        }
      };
    }

    return this.mapDbProfileToApp(data, user.email);
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        full_name: profile.name,
        avatar_url: profile.avatarUrl,
        bio: profile.bio,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    return this.mapDbProfileToApp(data, user.email);
  },

  mapDbProfileToApp(dbProfile: any, email?: string): UserProfile {
    return {
      id: dbProfile.id,
      name: dbProfile.full_name || '',
      email: email || '',
      avatarUrl: dbProfile.avatar_url || '',
      bio: dbProfile.bio || '',
      role: 'art_director', // Default role for demo
      preferences: {
        notifications: true,
        theme: 'dark',
        compactMode: false
      }
    };
  }
};

// Comment Services
export const commentService = {
  // Get comments for an asset
  async getComments(assetId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profile:profiles(full_name, avatar_url)
      `)
      .eq('asset_id', assetId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data.map(this.mapDbCommentToApp);
  },

  // Add a comment
  async addComment(assetId: string, content: string): Promise<Comment> {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from('comments')
      .insert({
        asset_id: assetId,
        user_id: user.id,
        content,
      })
      .select(`
        *,
        profile:profiles(full_name, avatar_url)
      `)
      .single();

    if (error) throw error;

    return this.mapDbCommentToApp(data);
  },

  // Helper function to map database comment to app comment
  mapDbCommentToApp(dbComment: any): Comment {
    return {
      id: dbComment.id,
      assetId: dbComment.asset_id,
      userId: dbComment.user_id,
      content: dbComment.content,
      createdAt: new Date(dbComment.created_at).getTime(),
      profile: dbComment.profile ? {
        fullName: dbComment.profile.full_name,
        avatarUrl: dbComment.profile.avatar_url,
      } : undefined,
    };
  },
};

// Sync Service - handles migration from localStorage to Supabase
export const syncService = {
  // Migrate localStorage data to Supabase
  async migrateFromLocalStorage(): Promise<void> {
    try {
      // Get current user
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      // Migrate brands
      const localBrands = localStorage.getItem('brand_os_brands');
      if (localBrands) {
        const brands = JSON.parse(localBrands);
        for (const brand of brands) {
          try {
            await brandService.createBrand(brand);
          } catch (error) {
            console.warn('Failed to migrate brand:', brand.name, error);
          }
        }
        localStorage.removeItem('brand_os_brands');
      }

      // Migrate prompt history
      const localPromptHistory = localStorage.getItem('brand_os_prompt_history');
      if (localPromptHistory) {
        const promptHistory = JSON.parse(localPromptHistory);
        for (const prompt of promptHistory) {
          try {
            await promptHistoryService.addPromptToHistory(prompt);
          } catch (error) {
            console.warn('Failed to migrate prompt:', prompt.subject, error);
          }
        }
        localStorage.removeItem('brand_os_prompt_history');
      }

      console.log('Migration from localStorage completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  },

  // Check if migration is needed
  async needsMigration(): Promise<boolean> {
    const hasLocalBrands = !!localStorage.getItem('brand_os_brands');
    const hasLocalPromptHistory = !!localStorage.getItem('brand_os_prompt_history');
    return hasLocalBrands || hasLocalPromptHistory;
  },
};

// Real-time subscriptions
export const realtimeService = {
  // Subscribe to brand updates
  subscribeToBrands(callback: (brands: BrandProfile[]) => void, orgId?: string) {
    return supabase
      .channel(`brands-changes-${orgId || 'personal'}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'brands',
        },
        async () => {
          const brands = await brandService.getBrands(orgId);
          callback(brands);
        }
      )
      .subscribe();
  },

  // Subscribe to asset updates
  subscribeToAssets(callback: (assets: GeneratedAsset[]) => void, orgId?: string) {
    return supabase
      .channel(`assets-changes-${orgId || 'personal'}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'assets',
        },
        async () => {
          const assets = await assetService.getAssets(orgId);
          callback(assets);
        }
      )
      .subscribe();
  },
};
