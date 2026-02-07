import React, { useState, useEffect } from 'react';
import { Box, Zap } from 'lucide-react';
import { Sidebar, Header } from './components/layout';
import { AuthGuard } from './components/auth/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { BrandProfile, GeneratedAsset } from './types';
import { checkApiKeyStatus, openApiKeyDialog } from './services/gemini.service';
import { useSupabaseBrands, useSupabaseAssets, useSupabasePromptHistory } from './hooks';
import { useTheme } from './contexts/ThemeContext';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { InfoPage, InfoTopic } from './features/info/InfoPage';
import { ProductPage, ProductSlug } from './features/info/ProductPage';

// Lazy load feature views for performance
const ProfileView = React.lazy(() => import('./features/profile/ProfileView').then(m => ({ default: m.ProfileView })));
const DashboardView = React.lazy(() => import('./features/dashboard/DashboardView').then(m => ({ default: m.DashboardView })));
const DoctrineView = React.lazy(() => import('./features/doctrine/DoctrineView').then(m => ({ default: m.DoctrineView })));
const StudioView = React.lazy(() => import('./features/studio/StudioView').then(m => ({ default: m.StudioView })));
const LibraryView = React.lazy(() => import('./features/library/LibraryView').then(m => ({ default: m.LibraryView })));
const SettingsView = React.lazy(() => import('./features/settings/SettingsView').then(m => ({ default: m.SettingsView })));
const MoodBoardView = React.lazy(() => import('./features/moodboard/MoodBoardView'));
const DeploymentView = React.lazy(() => import('./features/deployment/DeploymentView'));
const TeamView = React.lazy(() => import('./features/team/TeamView').then(m => ({ default: m.TeamView })));
const TrainingView = React.lazy(() => import('./features/training/TrainingView').then(m => ({ default: m.TrainingView })));
const AuditView = React.lazy(() => import('./features/audit/AuditView').then(m => ({ default: m.AuditView })));
const AnalyticsView = React.lazy(() => import('./features/analytics/AnalyticsView').then(m => ({ default: m.AnalyticsView })));
const IdentityView = React.lazy(() => import('./features/identity/IdentityView').then(m => ({ default: m.IdentityView })));
const LandingPage = React.lazy(() => import('./features/landing/LandingPage').then(m => ({ default: m.LandingPage })));

// Loading component for Suspense
const ViewLoader = () => (
    <div className="flex-1 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
            <Zap className="w-8 h-8 text-primary animate-pulse" />
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/60">
                Initializing Protocol...
            </div>
        </div>
    </div>
);

const AppContent: React.FC = () => {
    const { theme } = useTheme();
    const { user, brands, assets, promptHistory, activeWorkspace } = useAuth();
    const { visibleTabs } = useSettings();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);
    const [apiKeyReady, setApiKeyReady] = useState<boolean | null>(null);
    const [showAuth, setShowAuth] = useState(false);
    const [infoView, setInfoView] = useState<InfoTopic | null>(null);
    const [productView, setProductView] = useState<ProductSlug | null>(null);

    // Reset header actions when tab changes
    useEffect(() => {
        setHeaderActions(null);
    }, [activeTab]);

    // Persist selected brand ID to localStorage
    const SELECTED_BRAND_KEY = 'brandos_selected_brand_id';

    // Initialize selectedBrand from localStorage if possible
    const [selectedBrand, setSelectedBrand] = useState<BrandProfile>(() => {
        const savedBrandId = localStorage.getItem(SELECTED_BRAND_KEY);
        if (savedBrandId && brands.length > 0) {
            const savedBrand = brands.find(b => b.id === savedBrandId);
            if (savedBrand) return savedBrand;
        }
        // Default to first brand from database
        return brands[0] || {
            id: '',
            name: 'Create your first identity',
            doctrine: 'Initialize a new brand DNA protocol to begin.',
            palette: [],
            background: '#393939',
            negativeSpace: 50,
            safeZones: [],
            emotionalTags: [],
            forbiddenElements: [],
            grammarRules: [],
            extractedPatterns: [],
            stylisticSignatures: [],
        } as BrandProfile;
    });
    const [refinementContext, setRefinementContext] = useState<{ subject: string, feedback: string } | null>(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Update selected brand when brands change (e.g., after data loads)
    useEffect(() => {
        const savedBrandId = localStorage.getItem(SELECTED_BRAND_KEY);
        if (savedBrandId && brands.length > 0) {
            const savedBrand = brands.find(b => b.id === savedBrandId);
            if (savedBrand) {
                setSelectedBrand(savedBrand);
                return;
            }
        }
        // Fallback to first brand if no saved brand found
        if (brands.length > 0 && (!selectedBrand.id || !brands.find(b => b.id === selectedBrand.id))) {
            setSelectedBrand(brands[0]);
        }
    }, [brands]);

    // Save selected brand ID to localStorage when it changes
    useEffect(() => {
        if (selectedBrand?.id) {
            localStorage.setItem(SELECTED_BRAND_KEY, selectedBrand.id);
        }
    }, [selectedBrand?.id]);

    // Dynamic title update for SEO and A11y
    useEffect(() => {
        const tabTitle = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
        document.title = `${tabTitle} | Brand OS`;
    }, [activeTab]);


    // Redirect to dashboard if current tab becomes hidden
    useEffect(() => {
        if (activeTab !== 'dashboard' && activeTab !== 'settings' && activeTab !== 'profile' && visibleTabs[activeTab] === false) {
            setActiveTab('dashboard');
        }
    }, [visibleTabs, activeTab]);

    useEffect(() => {
        checkApiKeyStatus().then(setApiKeyReady);
    }, []);

    const handleAuth = async () => {
        const success = await openApiKeyDialog();
        if (success) setApiKeyReady(true);
    };

    const { addBrand, updateBrand } = useSupabaseBrands();
    const { addAsset } = useSupabaseAssets();
    const { addToHistory } = useSupabasePromptHistory();

    const handleRefinePrompt = (asset: GeneratedAsset, customFeedback?: string) => {
        setRefinementContext({
            subject: asset.subject || asset.prompt,
            feedback: customFeedback || asset.auditDetails?.feedback || 'Improve brand alignment'
        });
        setActiveTab('creative');
    };

    // Reset views when user becomes present
    useEffect(() => {
        if (user) {
            setShowAuth(false);
            setInfoView(null);
            setProductView(null);
        }
    }, [user]);

    if (!user) {
        return (
            <React.Suspense fallback={<ViewLoader />}>
                {productView ? (
                    <ProductPage
                        slug={productView}
                        onBack={() => setProductView(null)}
                        onLoginClick={() => setShowAuth(true)}
                    />
                ) : infoView ? (
                    <InfoPage topic={infoView} onBack={() => setInfoView(null)} />
                ) : showAuth ? (
                    <AuthGuard onBack={() => setShowAuth(false)} />
                ) : (
                    <LandingPage
                        onLoginClick={() => setShowAuth(true)}
                        onInfoClick={(topic: InfoTopic) => setInfoView(topic)}
                        onProductClick={(slug: ProductSlug) => setProductView(slug)}
                    />
                )}
            </React.Suspense>
        );
    }

    return (
        <div className="min-h-screen flex bg-background text-foreground selection:bg-primary/30 font-sans relative">
            <div className="cinematic-noise" />
            <Toaster position="top-right" theme={theme} richColors />
            <Sidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <main
                className={`flex-1 min-w-0 flex flex-col transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'ml-[48px]' : 'ml-[48px] md:ml-[240px]'}`}
            >
                <Header
                    activeTab={activeTab}
                    activeBrand={selectedBrand}
                    onNavigate={setActiveTab}
                    actions={headerActions}
                />

                <div className={`
                    flex-1 w-full mx-auto transition-all duration-300 min-h-0
                    ${['moodboard'].includes(activeTab)
                        ? 'p-0 max-w-none overflow-hidden h-full'
                        : ['dashboard', 'library', 'profile', 'identity', 'doctrine', 'creative', 'training', 'audit', 'analytics', 'team', 'deployment', 'settings'].includes(activeTab)
                            ? 'p-0 max-w-none overflow-y-auto custom-scrollbar h-full'
                            : 'p-6 md:p-10 w-full max-w-[2400px] overflow-y-auto custom-scrollbar'
                    }
                `}>
                    <ErrorBoundary>
                        <React.Suspense fallback={<ViewLoader />}>
                            {activeTab === 'dashboard' && (
                                <DashboardView
                                    brands={brands}
                                    selectedBrand={selectedBrand}
                                    onSelectBrand={setSelectedBrand}
                                    onAddBrand={addBrand}
                                    onViewDoctrine={() => setActiveTab('doctrine')}
                                    onInviteTeam={() => setActiveTab('team')}
                                    onViewAudit={() => setActiveTab('audit')}
                                    workspaceId={activeWorkspace?.id}
                                />
                            )}

                            {activeTab === 'identity' && (
                                <IdentityView brand={selectedBrand} />
                            )}

                            {activeTab === 'doctrine' && (
                                <DoctrineView
                                    brand={selectedBrand}
                                    onUpdateBrand={async (brand) => {
                                        const brandWithWorkspace = {
                                            ...brand,
                                            workspaceId: brand.workspaceId || activeWorkspace?.id,
                                        };
                                        await updateBrand(brandWithWorkspace);
                                        setSelectedBrand(brandWithWorkspace);
                                    }}
                                />
                            )}

                            {activeTab === 'profile' && (
                                <ProfileView />
                            )}

                            {activeTab === 'moodboard' && (
                                <MoodBoardView brand={selectedBrand} setHeaderActions={setHeaderActions} />
                            )}

                            {activeTab === 'creative' && (
                                <StudioView
                                    brand={selectedBrand}
                                    onAssetGenerated={async (asset) => {
                                        await addAsset(asset);
                                        setActiveTab('library');
                                        setRefinementContext(null);
                                    }}
                                    promptHistory={promptHistory}
                                    onUpdateHistory={(history) => {
                                        // History is managed by context now
                                    }}
                                    initialContext={refinementContext}
                                />
                            )}

                            {activeTab === 'library' && (
                                <LibraryView
                                    assets={assets}
                                    onRefine={handleRefinePrompt}
                                />
                            )}

                            {activeTab === 'training' && (
                                <TrainingView brand={selectedBrand} assets={assets} setHeaderActions={setHeaderActions} />
                            )}

                            {activeTab === 'audit' && (
                                <AuditView brand={selectedBrand} />
                            )}

                            {activeTab === 'analytics' && (
                                <AnalyticsView brand={selectedBrand} assets={assets} />
                            )}

                            {activeTab === 'deployment' && (
                                <DeploymentView brand={selectedBrand} assets={assets} />
                            )}

                            {activeTab === 'team' && (
                                <TeamView />
                            )}

                            {activeTab === 'settings' && (
                                <SettingsView onAuth={handleAuth} />
                            )}
                        </React.Suspense>
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <SettingsProvider>
                <AppContent />
            </SettingsProvider>
        </AuthProvider>
    );
};

export default App;
