import React, { useState, useEffect } from 'react';
import { Box, Zap } from 'lucide-react';
import { Sidebar, Header } from './components/layout';
import { DashboardView } from './features/dashboard/DashboardView';
import { DoctrineView } from './features/doctrine/DoctrineView';
import { StudioView } from './features/studio/StudioView';
import { LibraryView } from './features/library/LibraryView';
import { SettingsView } from './features/settings/SettingsView';
import { BrandProfile, GeneratedAsset, PromptHistoryItem } from './types';
import { INITIAL_BRANDS } from './constants';
import { checkApiKeyStatus, openApiKeyDialog } from './services/gemini.service';
import { useLocalStorage } from './hooks';

import { Toaster } from 'sonner';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [apiKeyReady, setApiKeyReady] = useState<boolean | null>(null);
    const [brands, setBrands] = useState<BrandProfile[]>(INITIAL_BRANDS);
    const [selectedBrand, setSelectedBrand] = useState<BrandProfile>(INITIAL_BRANDS[0]);
    const [assets, setAssets] = useState<GeneratedAsset[]>([]);
    const [promptHistory, setPromptHistory] = useLocalStorage<PromptHistoryItem[]>('brand_os_prompt_history', []);

    useEffect(() => {
        checkApiKeyStatus().then(setApiKeyReady);
    }, []);

    const handleAuth = async () => {
        const success = await openApiKeyDialog();
        if (success) setApiKeyReady(true);
    };

    if (apiKeyReady === false) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 brand-gradient rounded-xl flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(16,185,129,0.3)] animate-pulse">
                    <Box size={40} className="text-primary-foreground" />
                </div>
                <h1 className="text-4xl font-display font-black mb-4 tracking-tight">INITIALIZATION REQUIRED</h1>
                <p className="text-muted-foreground max-w-sm mb-8 text-sm">
                    Please authenticate with your AI Studio API key to activate the creative core.
                </p>
                <button
                    onClick={handleAuth}
                    className="px-10 py-5 brand-gradient text-primary-foreground font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center gap-4 text-sm tracking-widest uppercase"
                >
                    <Zap size={20} />
                    ACTIVATE CORE
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-background text-foreground selection:bg-primary/30 font-sans">
            <Toaster position="top-right" theme="dark" richColors />
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-1 ml-16 md:ml-64 min-w-0 flex flex-col">
                <Header activeTab={activeTab} />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 max-w-7xl mx-auto w-full">
                    {activeTab === 'dashboard' && (
                        <DashboardView
                            brands={brands}
                            selectedBrand={selectedBrand}
                            onSelectBrand={setSelectedBrand}
                            onAddBrand={(brand) => setBrands([...brands, brand])}
                        />
                    )}

                    {activeTab === 'profiles' && (
                        <DoctrineView
                            brand={selectedBrand}
                            onUpdateBrand={setSelectedBrand}
                        />
                    )}

                    {activeTab === 'creative' && (
                        <StudioView
                            brand={selectedBrand}
                            onAssetGenerated={(asset) => {
                                setAssets([asset, ...assets]);
                                setActiveTab('library');
                            }}
                            promptHistory={promptHistory}
                            onUpdateHistory={setPromptHistory}
                        />
                    )}

                    {activeTab === 'library' && (
                        <LibraryView assets={assets} />
                    )}

                    {activeTab === 'settings' && (
                        <SettingsView onAuth={handleAuth} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
