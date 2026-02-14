import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { syncService, brandService, assetService, promptHistoryService, organizationService, realtimeService, userService } from '../services/persistence.service';
import { BrandProfile, GeneratedAsset, PromptHistoryItem, Workspace, UserRole, UserProfile } from '../types';
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

interface DataContextType {
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
    loadInitialData: (user: User) => Promise<void>;
    loadWorkspaceData: (user: User) => Promise<void>;
    clearData: () => void;
    isDataInitialized: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

interface DataProviderProps {
    user: User | null;
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ user, children }) => {
    const [isDataInitialized, setIsDataInitialized] = useState(false);

    // Initialize state from local storage
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

    const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace | null>(() => {
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

    const setActiveWorkspace = useCallback((workspace: Workspace | null) => {
        setActiveWorkspaceState(workspace);
    }, []);

    const clearData = useCallback(() => {
        setBrands([]);
        setAssets([]);
        setWorkspaces([]);
        setPromptHistory([]);
        setActiveWorkspaceState(null);
        setUserProfile(null);
        setUserRole('designer');
        localStorage.clear();
        setIsDataInitialized(false);
    }, []);

    const loadWorkspaceData = useCallback(async (currentUser: User) => {
        try {
            const orgId = activeWorkspace?.id;

            const [brandsData, assetsData, historyData, roleData, profileData] = await Promise.all([
                brandService.getBrands(orgId).catch(e => { console.warn(e); return []; }),
                assetService.getAssets(orgId).catch(e => { console.warn(e); return []; }),
                promptHistoryService.getPromptHistory(orgId).catch(e => { console.warn(e); return []; }),
                orgId ? organizationService.getUserRole(orgId, currentUser.id).catch(() => 'designer') : Promise.resolve('admin'),
                userService.getProfile().catch(e => { console.warn('Profile load failed:', e); return null; })
            ]);

            if (brandsData) setBrands(brandsData as BrandProfile[]);
            if (assetsData) setAssets(assetsData as GeneratedAsset[]);
            if (historyData) setPromptHistory(historyData as PromptHistoryItem[]);
            if (roleData) setUserRole(roleData as UserRole);
            if (profileData) setUserProfile(profileData as UserProfile);

        } catch (error) {
            console.error('Critical error in data loader:', error);
        }
    }, [activeWorkspace?.id]);

    const loadInitialData = useCallback(async (currentUser: User) => {
        try {
            const orgs = await organizationService.getWorkspaces();
            const hasRealWorkspaces = orgs.length > 0;
            const allOrgs = hasRealWorkspaces ? orgs : MOCK_WORKSPACES;
            setWorkspaces(allOrgs);

            if (!activeWorkspace || !hasRealWorkspaces) {
                if (hasRealWorkspaces) {
                    setActiveWorkspaceState(orgs[0]);
                } else {
                    setActiveWorkspaceState(null);
                }
            } else {
                const exists = orgs.find(w => w.id === activeWorkspace.id);
                if (!exists) setActiveWorkspaceState(orgs[0]);
            }

            await loadWorkspaceData(currentUser);
            setIsDataInitialized(true);
        } catch (error) {
            console.error('Failed to load initial data:', error);
            setIsDataInitialized(true);
        }
    }, [activeWorkspace, loadWorkspaceData]);

    const refreshData = useCallback(async () => {
        if (user) {
            await loadWorkspaceData(user);
        }
    }, [user, loadWorkspaceData]);

    const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
        try {
            const updatedProfile = await userService.updateProfile(updates);
            setUserProfile(updatedProfile);
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        }
    }, []);

    // Real-time subscriptions
    useEffect(() => {
        if (user && isDataInitialized) {
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
    }, [user, activeWorkspace?.id, isDataInitialized]);

    const value = useMemo(() => ({
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
        loadInitialData,
        loadWorkspaceData,
        clearData,
        isDataInitialized
    }), [
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
        loadInitialData,
        loadWorkspaceData,
        clearData,
        isDataInitialized
    ]);

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
