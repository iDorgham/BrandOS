import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Zap } from 'lucide-react';
import { Sidebar, Header, SiteHeader } from './components/layout';
import { AuthGuard } from './components/auth/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { BrandProfile, GeneratedAsset } from './types';
import { checkApiKeyStatus, openApiKeyDialog } from './services/gemini.service';
import { useSupabaseBrands, useSupabaseAssets, useSupabasePromptHistory } from './hooks';
import { useTheme } from './contexts/ThemeContext';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { CookiesPolicyPopup } from './components/common/CookiesPolicyPopup';
import { InfoPage, InfoTopic } from './features/info/InfoPage';
import { ProductSlug } from './features/info/ProductPage';
import { CompanySlug } from './features/info/CompanyPage';
import { ResourcesPage, ResourcesSlug } from './features/info/ResourcesPage';

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
const SolutionPage = React.lazy(() => import('./features/info/SolutionPage').then(m => ({ default: m.SolutionPage })));
const IndustriesPage = React.lazy(() => import('./features/info/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const CaseStudiesPage = React.lazy(() => import('./features/info/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const PricingPage = React.lazy(() => import('./features/info/PricingPage').then(m => ({ default: m.PricingPage })));
const CompanyPage = React.lazy(() => import('./features/info/CompanyPage').then(m => ({ default: m.CompanyPage })));
const ROICalculator = React.lazy(() => import('./features/calculator/ROICalculator').then(m => ({ default: m.ROICalculator })));
const OnboardingWizard = React.lazy(() => import('./features/onboarding/OnboardingWizard').then(m => ({ default: m.OnboardingWizard })));

// Loading component for Suspense
const ViewLoader = () => (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[var(--cds-ui-background)] z-[1000] overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none" />
        <div className="flex flex-col items-center gap-8 relative z-10">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative"
            >
                {/* Rotating Technical Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 border-[1px] border-dashed border-[var(--cds-interactive-01)]/30 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-12 border-[1px] border-dotted border-[var(--cds-layer-03)] rounded-full"
                />

                <div className="w-16 h-16 bg-[var(--cds-interactive-01)] flex items-center justify-center aura-glow relative z-10">
                    <Zap className="text-[var(--cds-text-on-color)]" size={32} fill="currentColor" />
                </div>
            </motion.div>

            <div className="flex flex-col items-center gap-2">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[12px] font-black font-mono uppercase tracking-[0.4em] text-[var(--cds-text-primary)]"
                >
                    Initializing Protocol
                </motion.div>
                <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1 h-1 bg-[var(--cds-interactive-01)]"
                        />
                    ))}
                </div>
            </div>

            {/* Subtle Technical readout */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1 }}
                className="absolute bottom-[-100px] text-[8px] font-mono text-[var(--cds-text-secondary)] whitespace-nowrap tracking-widest uppercase"
            >
                System.Status: Nominal // Kernel.Link: Secured // DNA.Buffer: Syncing
            </motion.div>
        </div>
    </div>
);

const AppContent: React.FC = () => {
    const { theme } = useTheme();
    const { user, loading, brands, assets, promptHistory, activeWorkspace } = useAuth();
    const { visibleTabs } = useSettings();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);
    const [apiKeyReady, setApiKeyReady] = useState<boolean | null>(null);
    const [showAuth, setShowAuth] = useState(false);
    const [infoView, setInfoView] = useState<InfoTopic | null>(null);
    const [productView, setProductView] = useState<ProductSlug | null>(null);
    const [companyView, setCompanyView] = useState<CompanySlug | null>(null);
    const [resourcesView, setResourcesView] = useState<ResourcesSlug | null>(null);
    const [calculatorView, setCalculatorView] = useState(false);
    const [industriesView, setIndustriesView] = useState(false);
    const [caseStudiesView, setCaseStudiesView] = useState(false);
    const [pricingView, setPricingView] = useState(false);

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
            setCompanyView(null);
            setResourcesView(null);
            setCalculatorView(false);
            setIndustriesView(false);
            setCaseStudiesView(false);
            setPricingView(false);
        }
    }, [user]);

    const handleNavigate = (view: 'landing' | 'products' | 'industries' | 'results' | 'pricing' | 'company' | 'resources' | 'calculator' | 'auth', params?: any) => {
        // Reset all views first
        setProductView(null);
        setIndustriesView(false);
        setCaseStudiesView(false);
        setPricingView(false);
        setCompanyView(null);
        setResourcesView(null);
        setCalculatorView(false);
        setInfoView(null);
        setShowAuth(false);

        // Set specific view
        switch (view) {
            case 'products': setProductView(params); break;
            case 'industries': setIndustriesView(true); break;
            case 'results': setCaseStudiesView(true); break;
            case 'pricing': setPricingView(true); break;
            case 'company': setCompanyView(params); break;
            case 'resources': setResourcesView(params); break;
            case 'calculator': setCalculatorView(true); break;
            case 'auth': setShowAuth(true); break;
            case 'landing': break; // All reset
        }
    };

    if (loading) {
        return <ViewLoader />;
    }

    if (!user) {
        // Determine if we need dark mode header (for dark pages like Industries)
        const isDarkPage = industriesView || caseStudiesView || pricingView;

        return (
            <React.Suspense fallback={<ViewLoader />}>
                {!showAuth && (
                    <SiteHeader
                        onLoginClick={() => handleNavigate('auth')}
                        onProductClick={(slug) => handleNavigate('products', slug)}
                        onCompanyClick={(slug) => handleNavigate('company', slug)}
                        onResourcesClick={(slug) => handleNavigate('resources', slug)}
                        onIndustriesClick={() => handleNavigate('industries')}
                        onCaseStudiesClick={() => handleNavigate('results')}
                        onPricingClick={() => handleNavigate('pricing')}
                        dark={isDarkPage}
                    />
                )}

                {productView ? (
                    <SolutionPage
                        initialTab={
                            productView === 'identity' || productView === 'doctrine' ? 'dna' :
                                productView === 'studio' ? 'generate' :
                                    'audit'
                        }
                        onBack={() => handleNavigate('landing')}
                        onLoginClick={() => handleNavigate('auth')}
                    />
                ) : calculatorView ? (
                    <ROICalculator
                        onSignup={() => handleNavigate('auth')}
                        onBack={() => handleNavigate('landing')}
                    />
                ) : industriesView ? (
                    <IndustriesPage
                        onBack={() => handleNavigate('landing')}
                        onLoginClick={() => handleNavigate('auth')}
                    />
                ) : caseStudiesView ? (
                    <CaseStudiesPage
                        onBack={() => handleNavigate('landing')}
                        onLoginClick={() => handleNavigate('auth')}
                    />
                ) : pricingView ? (
                    <PricingPage
                        onBack={() => handleNavigate('landing')}
                        onLoginClick={() => handleNavigate('auth')}
                    />
                ) : companyView ? (
                    <CompanyPage
                        slug={companyView}
                        onBack={() => handleNavigate('landing')}
                        onNavigate={(slug) => handleNavigate('company', slug)}
                    />
                ) : resourcesView ? (
                    <ResourcesPage
                        slug={resourcesView}
                        onBack={() => handleNavigate('landing')}
                        onNavigate={(slug) => handleNavigate('resources', slug)}
                    />
                ) : infoView ? (
                    <InfoPage topic={infoView} onBack={() => setInfoView(null)} />
                ) : showAuth ? (
                    <AuthGuard onBack={() => handleNavigate('landing')} />
                ) : (
                    <LandingPage
                        onLoginClick={() => handleNavigate('auth')}
                        onInfoClick={(topic: InfoTopic) => setInfoView(topic)}
                        onProductClick={(slug: ProductSlug) => handleNavigate('products', slug)}
                        onCompanyClick={(slug: CompanySlug) => handleNavigate('company', slug)}
                        onResourcesClick={(slug: ResourcesSlug) => handleNavigate('resources', slug)}
                        onCalculatorClick={() => handleNavigate('calculator')}
                        onIndustriesClick={() => handleNavigate('industries')}
                        onCaseStudiesClick={() => handleNavigate('results')}
                        onPricingClick={() => handleNavigate('pricing')}
                    />
                )}
            </React.Suspense>
        );
    }

    if (brands.length === 0 && !loading) {
        return (
            <React.Suspense fallback={<ViewLoader />}>
                <OnboardingWizard />
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
                <CookiesPolicyPopup />
                <AppContent />
            </SettingsProvider>
        </AuthProvider>
    );
};

export default App;
