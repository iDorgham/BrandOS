/**
 * Stub for DNA version control in the web app.
 * Provides createVersion so brand.service can call it; returns success: false
 * until full DNA versioning is wired to the web Supabase schema.
 */
export const dnaVersionControl = {
  createVersion: async (
    _brandId: string,
    _changes: unknown[],
    _versionName: string,
    _description?: string,
    _userId?: string
  ): Promise<{ success: boolean; version?: unknown; error?: string }> => {
    return { success: false, error: 'DNA versioning not configured' };
  },
};
