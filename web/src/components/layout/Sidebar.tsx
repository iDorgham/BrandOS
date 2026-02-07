import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Box, Layout, ShieldCheck, Layers, Image as ImageIcon, Settings, Network, Rocket, Users, Brain, BarChart3, ChevronLeft, ChevronRight, Fingerprint } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

interface SidebarTab {
    id: string;
    icon: any;
    label: string;
    category?: 'OPERATIONS' | 'CREATIVE' | 'ANALYSIS' | 'MANAGEMENT';
}

export const SIDEBAR_TABS: SidebarTab[] = [
    { id: 'dashboard', icon: Layout, label: 'Dashboard', category: 'OPERATIONS' },
    { id: 'identity', icon: Fingerprint, label: 'Identity', category: 'OPERATIONS' },
    { id: 'doctrine', icon: ShieldCheck, label: 'Brand', category: 'OPERATIONS' },
    { id: 'creative', icon: Layers, label: 'Studio', category: 'CREATIVE' },
    { id: 'moodboard', icon: Network, label: 'Moodboard', category: 'CREATIVE' },
    { id: 'training', icon: Brain, label: 'Training', category: 'CREATIVE' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', category: 'ANALYSIS' },
    { id: 'audit', icon: ShieldCheck, label: 'Market Audit', category: 'ANALYSIS' },
    { id: 'library', icon: ImageIcon, label: 'Asset Vault', category: 'ANALYSIS' },
    { id: 'team', icon: Users, label: 'Team', category: 'MANAGEMENT' },
    { id: 'deployment', icon: Rocket, label: 'Deployment', category: 'MANAGEMENT' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isCollapsed, onToggle }) => {
    const { userRole } = useAuth();
    const { visibleTabs, tabOrder } = useSettings();

    const tabs = tabOrder
        .map(id => SIDEBAR_TABS.find(t => t.id === id))
        .filter((tab): tab is (typeof SIDEBAR_TABS)[0] => {
            if (!tab) return false;

            // if (userRole === 'designer') {
            //     return !['team', 'doctrine', 'analytics', 'audit', 'training', 'deployment'].includes(tab.id) && visibleTabs[tab.id] !== false;
            // }
            // if (userRole === 'art_director') {
            //     return !['team', 'deployment'].includes(tab.id) && visibleTabs[tab.id] !== false;
            // }
            return visibleTabs[tab.id] !== false;
        });

    return (
        <aside
            className={`
                h-screen border-r border-border flex flex-col fixed left-0 top-0 z-50 bg-background transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-[48px]' : 'w-[48px] md:w-[240px]'}
            `}
        >
            <div className={`flex items-center gap-3 h-14 mb-6 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}>
                <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Box size={18} strokeWidth={2} />
                </div>
                {!isCollapsed && (
                    <div className="hidden md:block overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="font-display text-sm font-bold tracking-tight text-foreground block leading-none">BRAND OS</span>
                        <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground block mt-0.5">Enterprise</span>
                    </div>
                )}
            </div>

            <nav className="flex-1 overflow-x-hidden overflow-y-auto no-scrollbar py-2">
                {['OPERATIONS', 'CREATIVE', 'ANALYSIS', 'MANAGEMENT'].map(category => {
                    const categoryTabs = tabs.filter(t => t.category === category);
                    if (categoryTabs.length === 0) return null;

                    return (
                        <div key={category} className="mb-6 last:mb-0">
                            {!isCollapsed && (
                                <h3 className="px-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-2 mt-4 first:mt-0">
                                    {category}
                                </h3>
                            )}
                            {categoryTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    aria-label={`Navigate to ${tab.label}`}
                                    aria-current={activeTab === tab.id ? 'page' : undefined}
                                    title={isCollapsed ? tab.label : undefined}
                                    className={`w-full flex items-center gap-3 h-10 px-0 relative group transition-colors ${activeTab === tab.id
                                        ? 'bg-muted/80 text-foreground font-medium'
                                        : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                                        } ${isCollapsed ? 'justify-center' : 'pl-4'}`}
                                >
                                    {activeTab === tab.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                                    )}
                                    <tab.icon size={18} className={`shrink-0 ${activeTab === tab.id ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
                                    {!isCollapsed && (
                                        <span className="hidden md:block text-[14px] leading-none whitespace-nowrap overflow-hidden">{tab.label}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-border bg-muted/10">
                <button
                    onClick={() => onTabChange('settings')}
                    className={`w-full flex items-center gap-3 h-[45px] relative group transition-colors ${activeTab === 'settings'
                        ? 'bg-muted text-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        } ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
                    title={isCollapsed ? 'Settings' : undefined}
                >
                    {activeTab === 'settings' && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                    )}
                    <Settings size={18} className={activeTab === 'settings' ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
                    {!isCollapsed && (
                        <span className="hidden md:block text-[12px]">Settings</span>
                    )}
                </button>

                <button
                    onClick={onToggle}
                    className="w-full h-[45px] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-t border-border"
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>
        </aside>
    );
};
