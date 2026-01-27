import React from 'react';
import { Box, Layout, ShieldCheck, Layers, Image as ImageIcon, Settings } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

interface SidebarTab {
    id: string;
    icon: any;
    label: string;
}

const SIDEBAR_TABS: SidebarTab[] = [
    { id: 'dashboard', icon: Layout, label: 'Control' },
    { id: 'profiles', icon: ShieldCheck, label: 'Doctrine' },
    { id: 'creative', icon: Layers, label: 'Studio' },
    { id: 'library', icon: ImageIcon, label: 'Vault' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    return (
        <aside className="w-16 md:w-64 h-screen border-r border-border flex flex-col p-4 fixed left-0 top-0 z-50 bg-card">
            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center shrink-0">
                    <Box className="text-primary-foreground" size={24} />
                </div>
                <div className="hidden md:block">
                    <span className="font-display text-xl font-bold tracking-tighter">BRAND OS</span>
                </div>
            </div>
            <nav className="flex-1 space-y-1">
                {SIDEBAR_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-md transition-all group ${activeTab === tab.id ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            }`}
                    >
                        <tab.icon size={20} className={activeTab === tab.id ? '' : 'group-hover:text-primary'} />
                        <span className="hidden md:block text-sm">{tab.label}</span>
                    </button>
                ))}
            </nav>
            <button
                onClick={() => onTabChange('settings')}
                className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-md mt-auto transition-all ${activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
            >
                <Settings size={20} />
                <span className="hidden md:block text-sm">Settings</span>
            </button>
        </aside>
    );
};
