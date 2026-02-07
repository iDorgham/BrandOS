import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          bio: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      brands: {
        Row: {
          id: string;
          user_id: string;
          workspace_id: string | null;
          name: string;
          doctrine: string;
          palette: BrandColor[];
          background: string;
          negative_space: number;
          safe_zones: any[];
          emotional_tags: string[];
          forbidden_elements: string[];
          grammar_rules: GrammarRule[];
          extracted_patterns: string[] | null;
          stylistic_signatures: string[] | null;
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          workspace_id?: string | null;
          name: string;
          doctrine: string;
          palette: BrandColor[];
          background: string;
          negative_space: number;
          safe_zones?: any[];
          emotional_tags?: string[];
          forbidden_elements?: string[];
          grammar_rules?: GrammarRule[];
          extracted_patterns?: string[] | null;
          stylistic_signatures?: string[] | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          workspace_id?: string | null;
          name?: string;
          doctrine?: string;
          palette?: BrandColor[];
          background?: string;
          negative_space?: number;
          safe_zones?: any[];
          emotional_tags?: string[];
          forbidden_elements?: string[];
          grammar_rules?: GrammarRule[];
          extracted_patterns?: string[] | null;
          stylistic_signatures?: string[] | null;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
      };
      assets: {
        Row: {
          id: string;
          user_id: string;
          brand_id: string;
          workspace_id: string | null;
          url: string;
          prompt: string;
          subject: string | null;
          orchestrated_prompt: string | null;
          asset_type: string;
          compliance_score: number | null;
          audit_details: any | null;
          created_at: string;
          metadata: any | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          brand_id: string;
          workspace_id?: string | null;
          url: string;
          prompt: string;
          subject?: string | null;
          orchestrated_prompt?: string | null;
          asset_type: string;
          compliance_score?: number | null;
          audit_details?: any | null;
          metadata?: any | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          brand_id?: string;
          workspace_id?: string | null;
          url?: string;
          prompt?: string;
          subject?: string | null;
          orchestrated_prompt?: string | null;
          asset_type?: string;
          compliance_score?: number | null;
          audit_details?: any | null;
          created_at?: string;
          metadata?: any | null;
        };
      };
      prompt_history: {
        Row: {
          id: string;
          user_id: string;
          brand_id: string;
          workspace_id: string | null;
          subject: string;
          orchestrated: string;
          asset_type: string | null;
          intensities: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          brand_id: string;
          workspace_id?: string | null;
          subject: string;
          orchestrated: string;
          asset_type?: string | null;
          intensities?: any | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          brand_id?: string;
          workspace_id?: string | null;
          subject?: string;
          orchestrated?: string;
          asset_type?: string | null;
          intensities?: any | null;
          created_at?: string;
        };
      };
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          owner_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          owner_id?: string;
          updated_at?: string;
        };
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          role?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          user_id?: string;
          role?: string;
        };
      };

    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for the existing application
export interface BrandColor {
  id: string;
  label: string;
  hex: string;
}

export interface GrammarRule {
  id: string;
  condition: string;
  directive: string;
}

// Auth helpers – use session as fallback so UI and API share the same auth state
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (user) return user;
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user ?? null;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  if (error) throw error;
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
