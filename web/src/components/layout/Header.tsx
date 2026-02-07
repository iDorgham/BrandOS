import React from 'react';
import { WorkspaceSwitcher } from '../auth/WorkspaceSwitcher';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from '../ui/ThemeToggle';

import { ShieldCheck } from 'lucide-react';
import { BrandProfile } from '@/types';

interface HeaderProps {
    activeTab: string;
    activeBrand?: BrandProfile;
    onNavigate?: (tab: string) => void;
    actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, activeBrand, onNavigate, actions }) => {
    const tabLabels: Record<string, string> = {
        dashboard: 'Dashboard',
        identity: 'Identity',
        doctrine: 'Brand',
        moodboard: 'Moodboard',
        creative: 'Studio',
        training: 'Training',
        analytics: 'Analytics',
        audit: 'Market Audit',
        library: 'Asset Vault',
        team: 'Team',
        deployment: 'Deployment',
        settings: 'Settings',
    };

    return (
        <header className="h-14 flex items-center justify-between px-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 transition-all duration-300">
            <div className="flex-1 flex items-center">
                <h2 className="text-sm font-display font-black tracking-tighter uppercase flex items-center gap-3">
                    <span className="opacity-90">{tabLabels[activeTab] || activeTab}</span>
                    {activeTab === 'identity' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Brand Asset Manifest & Core Brand
                        </span>
                    )}
                    {activeTab === 'doctrine' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Brand Protocol Configuration
                        </span>
                    )}
                    {activeTab === 'moodboard' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Creative Ideation & Visual Synthesis
                        </span>
                    )}
                    {activeTab === 'training' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Fine-tuning AI models on proprietary brand assets
                        </span>
                    )}
                    {activeTab === 'dashboard' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Nexus Operation Intelligence Hub
                        </span>
                    )}
                    {activeTab === 'creative' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Generative Content & Asset Production
                        </span>
                    )}
                    {activeTab === 'analytics' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Predictive analytics & performance tracking
                        </span>
                    )}
                    {activeTab === 'audit' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Side-by-side analysis against market benchmarks
                        </span>
                    )}
                    {activeTab === 'library' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Centralized Media & Creative Repository
                        </span>
                    )}
                    {activeTab === 'team' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Manage architectural permissions and team access
                        </span>
                    )}
                    {activeTab === 'deployment' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Enterprise deployment and protocol synchronization
                        </span>
                    )}
                    {activeTab === 'settings' && (
                        <span className="text-[10px] font-medium normal-case opacity-40 tracking-normal hidden md:block border-l border-border/50 pl-3">
                            Global configuration & system preferences
                        </span>
                    )}
                </h2>
            </div>

            <div className="flex items-center gap-3">
                {actions && (
                    <div className={`flex items-center gap-2 ${activeTab === 'moodboard' ? 'mr-6' : 'mr-4 border-r border-border pr-4'}`}>
                        {actions}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    {activeTab !== 'moodboard' && <WorkspaceSwitcher />}

                    {/* Active Identity Indicator */}
                    {activeTab !== 'moodboard' && <div className="h-6 w-px bg-border/40 hidden md:block" />}

                    {activeTab !== 'moodboard' && (
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-[10px] font-medium text-muted-foreground/60">Active Identity</span>
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-sm border border-border/60 bg-muted/20 hover:bg-muted/30 transition-colors cursor-default">
                                <ShieldCheck size={13} className="text-primary" />
                                <span className="text-[12px] font-medium text-foreground truncate max-w-[150px]">
                                    {activeBrand?.name || 'No Identity'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {activeTab !== 'moodboard' && <div className="h-4 w-px bg-border/40 mx-2 hidden sm:block" />}
                <ThemeToggle />
                {activeTab !== 'moodboard' && <div className="h-4 w-px bg-border/40 mx-2 hidden sm:block" />}
                <UserMenu onNavigate={onNavigate} />
            </div>
        </header>
    );
};
