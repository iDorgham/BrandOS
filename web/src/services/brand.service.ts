import { supabase } from '@/services/supabase.service';
import { BrandProfile } from '@/types';
import { dnaVersionControl } from '@/services/dna-version-control.service';
import { generateId } from '@/utils';

export interface BrandCreationData {
    name: string;
    doctrine: string;
    workspaceId?: string;
}

export const brandService = {
    // Create a new brand
    async createBrand(brandData: BrandCreationData): Promise<{ success: boolean; error?: string; brand?: BrandProfile }> {
        try {
            const user = await supabase.auth.getUser();
            if (!user.user) {
                return { success: false, error: 'User not authenticated' };
            }

            // Get workspace ID (default to first workspace if not provided)
            let workspaceId = brandData.workspaceId;
            if (!workspaceId) {
                const { data: workspaces, error: workspaceError } = await supabase
                    .from('workspaces')
                    .select('id')
                    .eq('owner_id', user.user.id)
                    .limit(1);

                if (workspaceError || !workspaces || workspaces.length === 0) {
                    return { success: false, error: 'No workspace found' };
                }
                workspaceId = workspaces[0].id;
            }

            // Create brand with proper structure
            const newBrand: BrandProfile = {
                id: generateId(),
                name: brandData.name,
                doctrine: brandData.doctrine,
                palette: [
                    { id: generateId(), label: 'Primary', hex: '#000000' },
                    { id: generateId(), label: 'Secondary', hex: '#ffffff' }
                ],
                background: '#ffffff',
                negativeSpace: 50,
                safeZones: [],
                emotionalTags: [],
                forbiddenElements: [],
                grammarRules: [],
                extractedPatterns: [],
                stylisticSignatures: [],
                workspaceId: workspaceId,
                userId: user.user.id,
                // Add missing required properties
                brandId: generateId(), // Required for asset generation
                timestamp: Date.now()
            };

            // Insert into database
            const { data, error } = await supabase
                .from('brands')
                .insert(newBrand)
                .select()
                .single();

            if (error) {
                console.error('Brand creation error:', error);
                return { success: false, error: error.message };
            }

            return { success: true, brand: data };
        } catch (error) {
            console.error('Brand creation failed:', error);
            return { success: false, error: error.message };
        }
    },

    // Get all brands for current user
    async getUserBrands(): Promise<BrandProfile[]> {
        try {
            const user = await supabase.auth.getUser();
            if (!user.user) {
                return [];
            }

            const { data, error } = await supabase
                .from('brands')
                .select('*')
                .eq('user_id', user.user.id)
                .order('created_at', { ascending: false });

            return data || [];
        } catch (error) {
            console.error('Failed to get user brands:', error);
            return [];
        }
    },

    // Update brand with version control
    async updateBrand(brandId: string, updates: Partial<BrandProfile>, versionInfo?: { name: string; description?: string }): Promise<{ success: boolean; error?: string; version?: any }> {
        try {
            // Get current brand to calculate changes
            const currentBrand = await this.getBrandById(brandId);
            if (!currentBrand) {
                return { success: false, error: 'Brand not found' };
            }

            // Calculate changes for version tracking
            const changes = Object.keys(updates).map(field => ({
                id: generateId(),
                type: 'update' as const,
                field,
                oldValue: currentBrand[field as keyof BrandProfile],
                newValue: updates[field as keyof BrandProfile],
                timestamp: Date.now(),
                userId: supabase.auth.getUser().then(u => u.user?.id || 'unknown')
            }));

            // Update brand
            const { data, error } = await supabase
                .from('brands')
                .update(updates)
                .eq('id', brandId)
                .select()
                .single();

            if (error) {
                console.error('Brand update error:', error);
                return { success: false, error: error.message };
            }

            // Create version if version info provided
            let version;
            if (versionInfo) {
                const user = await supabase.auth.getUser();
                const versionResult = await dnaVersionControl.createVersion(
                    brandId,
                    changes,
                    versionInfo.name,
                    versionInfo.description,
                    user.user?.id
                );
                
                if (versionResult.success) {
                    version = versionResult.version;
                }
            }

            return { success: true, version };
        } catch (error) {
            console.error('Brand update failed:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete brand
    async deleteBrand(brandId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase
                .from('brands')
                .delete()
                .eq('id', brandId);

            if (error) {
                console.error('Brand deletion error:', error);
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Brand deletion failed:', error);
            return { success: false, error: error.message };
        }
    },

    // Get brand by ID
    async getBrandById(brandId: string): Promise<BrandProfile | null> {
        try {
            const { data, error } = await supabase
                .from('brands')
                .select('*')
                .eq('id', brandId)
                .single();

            if (error) {
                console.error('Failed to get brand:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Failed to get brand:', error);
            return null;
        }
    }
};
