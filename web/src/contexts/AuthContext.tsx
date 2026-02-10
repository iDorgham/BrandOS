import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getCurrentUser, signInWithGoogle, signInWithEmail, signOut } from '../services/supabase.service';
import { syncService, brandService, assetService, promptHistoryService, organizationService, realtimeService, userService } from '../services/persistence.service';
import { BrandProfile, GeneratedAsset, PromptHistoryItem, Workspace, UserRole, UserProfile } from '../types';
import { toast } from 'sonner';
import { MOCK_WORKSPACES } from '../constants';

// Cache keys for local storage
const CACHE_KEYS = {
  BRANDS: 'brandos_cache_brands',
  ASSETS: 'brandos_cache_assets',
  HISTORY: 'brandos_cache_history',
  WORKSPACES: 'brandos_cache_workspaces',
  ACTIVE_WORKSPACE: 'brandos_cache_active_workspace',
  USER_ROLE: 'brandos_cache_user_role',
  USER_PROFILE: 'brandos_cache_user_profile'
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  migrateData: () => Promise<void>;
  brands: BrandProfile[];
  assets: GeneratedAsset[];
  promptHistory: PromptHistoryItem[];
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  userRole: UserRole;
  userProfile: UserProfile | null;
  setActiveWorkspace: (workspace: Workspace | null) => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize state from local storage to prevent pop-in
  const [brands, setBrands] = useState<BrandProfile[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.BRANDS);
      return cached ? JSON.parse(cached) : [];
    } catch { return []; }
  });

  const [assets, setAssets] = useState<GeneratedAsset[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.ASSETS);
      return cached ? JSON.parse(cached) : [];
    } catch { return []; }
  });

  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.HISTORY);
      return cached ? JSON.parse(cached) : [];
    } catch { return []; }
  });

  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.WORKSPACES);
      return cached ? JSON.parse(cached) : [];
    } catch { return []; }
  });

  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.ACTIVE_WORKSPACE);
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.USER_ROLE);
      return cached ? (cached as UserRole) : 'designer';
    } catch { return 'designer'; }
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.USER_PROFILE);
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });

  // Persist state changes to local storage
  useEffect(() => { localStorage.setItem(CACHE_KEYS.BRANDS, JSON.stringify(brands)); }, [brands]);
  useEffect(() => { localStorage.setItem(CACHE_KEYS.ASSETS, JSON.stringify(assets)); }, [assets]);
  useEffect(() => { localStorage.setItem(CACHE_KEYS.HISTORY, JSON.stringify(promptHistory)); }, [promptHistory]);
  useEffect(() => { localStorage.setItem(CACHE_KEYS.WORKSPACES, JSON.stringify(workspaces)); }, [workspaces]);
  useEffect(() => {
    if (activeWorkspace) localStorage.setItem(CACHE_KEYS.ACTIVE_WORKSPACE, JSON.stringify(activeWorkspace));
    else localStorage.removeItem(CACHE_KEYS.ACTIVE_WORKSPACE);
  }, [activeWorkspace]);
  useEffect(() => { localStorage.setItem(CACHE_KEYS.USER_ROLE, userRole); }, [userRole]);
  useEffect(() => {
    if (userProfile) localStorage.setItem(CACHE_KEYS.USER_PROFILE, JSON.stringify(userProfile));
    else localStorage.removeItem(CACHE_KEYS.USER_PROFILE);
  }, [userProfile]);


  // Load initial data when user changes
  useEffect(() => {
    if (user) {
      loadInitialData();
    } else if (!loading) { // Only clear if we're done loading auth and there's no user
      // Don't clear immediately on mount to avoid flash if session exists
    }
  }, [user]);

  // Reload data when active workspace changes
  useEffect(() => {
    if (user) {
      loadWorkspaceData();
    }
  }, [activeWorkspace?.id]); // Only trigger if ID changes, deep comparison fallback

  const loadInitialData = async () => {
    try {
      if (!user) return;

      console.log('DEBUG: AuthContext loadInitialData starting...');
      console.log('DEBUG: localStorage active workspace:', localStorage.getItem(CACHE_KEYS.ACTIVE_WORKSPACE));

      // Note: Removed blocking migration check for performance. 
      // Ensure migration runs only when explicitly needed or in background.

      // Load organizations 
      // We don't block UI here if we have cached workspaces
      organizationService.getWorkspaces().then(orgs => {
        const hasRealWorkspaces = orgs.length > 0;

        // Save for UI display only
        const allOrgs = hasRealWorkspaces ? orgs : MOCK_WORKSPACES;
        setWorkspaces(allOrgs);

        // Active Workspace Logic: 
        // We MUST use 'hasRealWorkspaces' to decide if we should be in a Workspace context or Personal context.
        // Mock workspaces should NEVER be the activeWorkspace if we want to see real Brands.
        if (!activeWorkspace || !hasRealWorkspaces) {
          if (hasRealWorkspaces) {
            // If we have real ones but none active, set first real one
            setActiveWorkspace(orgs[0]);
          } else {
            // If no real ones, FORCE active workspace to null (Personal space)
            // Even if we have mock ones for the UI switcher, the "active" filter must be null.
            setActiveWorkspace(null);
          }
        } else {
          // If we have an active workspace and it's real, verify it still exists
          const exists = orgs.find(w => w.id === activeWorkspace.id);
          if (!exists) setActiveWorkspace(orgs[0]);
        }
      }).catch(console.error);

      // Trigger workspace data load in parallel
      loadWorkspaceData();

    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  const loadWorkspaceData = async () => {
    try {
      if (!user) return;

      // Only set loading if we have NO data to show
      if (brands.length === 0 && assets.length === 0) {
        setLoading(true);
      }

      const orgId = activeWorkspace?.id;

      // Parallel fetch
      const [brandsData, assetsData, historyData, roleData, profileData] = await Promise.all([
        brandService.getBrands(orgId).catch(e => { console.warn(e); return []; }),
        assetService.getAssets(orgId).catch(e => { console.warn(e); return []; }),
        promptHistoryService.getPromptHistory(orgId).catch(e => { console.warn(e); return []; }),
        orgId ? organizationService.getUserRole(orgId, user.id).catch(() => 'designer') : Promise.resolve('admin'),
        userService.getProfile().catch(e => { console.warn('Profile load failed:', e); return null; })
      ]);

      // Batch updates
      if (brandsData) setBrands(brandsData as BrandProfile[]);
      if (assetsData) setAssets(assetsData as GeneratedAsset[]);
      if (historyData) setPromptHistory(historyData as PromptHistoryItem[]);
      if (roleData) setUserRole(roleData as UserRole);
      if (profileData) setUserProfile(profileData as UserProfile);

    } catch (error) {
      console.error('Critical error in data loader:', error);
      // Don't show toast on background refresh errors to avoid annoyance
    } finally {
      setLoading(false);
    }
  };

  // Check initial auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        // If no user, resolve loading immediately
        if (!currentUser) {
          setLoading(false);
        }
        // If there is a user, loadWorkspaceData (tripped by the user useEffect or manually) will resolve loading
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoading(false);
      }
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        // If sign out, clear data aggressively
        if (event === 'SIGNED_OUT' || !currentUser) {
          setBrands([]);
          setAssets([]);
          setWorkspaces([]);
          setPromptHistory([]);
          setActiveWorkspace(null);
          setUserProfile(null);
          setUserRole('designer'); // Reset to lowest role
          localStorage.clear(); // Clear all cache on sign out
        } else if (event === 'SIGNED_IN') {
          // Explicit sign-in: show loader and fetch fresh data
          setLoading(true);
          loadInitialData();
        } else if (event === 'INITIAL_SESSION') {
          // Background session resolution (e.g. on window focus)
          // loadInitialData already calls loadWorkspaceData which has internal smart loading
          loadInitialData();
        } else if (event === 'TOKEN_REFRESHED' && currentUser) {
          // Silent refresh on token update
          loadInitialData(); // Load data without setting loading=true
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Real-time subscriptions setup remains same...
  useEffect(() => {
    if (user) {
      const brandSubscription = realtimeService.subscribeToBrands((newBrands) => {
        setBrands(newBrands);
      }, activeWorkspace?.id);

      const assetSubscription = realtimeService.subscribeToAssets((newAssets) => {
        setAssets(newAssets);
      }, activeWorkspace?.id);

      return () => {
        brandSubscription.unsubscribe();
        assetSubscription.unsubscribe();
      };
    }
  }, [user, activeWorkspace?.id]);

  const signIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      toast.error('Failed to sign in');
      setLoading(false);
    }
  };

  const signInEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmail(email, password);
    } catch (error) {
      toast.error('Failed to sign in');
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut();
      toast.success('Signed out');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const migrateData = async () => {
    try {
      // Keep blocking for migration as it's critical
      setLoading(true);
      await syncService.migrateFromLocalStorage();
      await loadWorkspaceData();
      toast.success('Migration done');
    } catch (error) {
      toast.error('Migration failed');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadWorkspaceData();
    toast.success('Data refreshed');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updatedProfile = await userService.updateProfile(updates);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = React.useMemo(() => ({
    user,
    loading,
    signIn,
    signInEmail,
    signOut: signOutUser,
    migrateData,
    brands,
    assets,
    promptHistory,
    workspaces,
    activeWorkspace,
    userRole,
    userProfile,
    setActiveWorkspace,
    updateProfile,
    refreshData,
  }), [
    user,
    loading,
    brands,
    assets,
    promptHistory,
    workspaces,
    activeWorkspace,
    userRole,
    userProfile
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
