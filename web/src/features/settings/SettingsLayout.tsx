import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Shield,
    Settings,
    Palette,
    Layout,
    Brain,
    CreditCard,
    Webhook,
    Users,
    ChevronRight,
    Terminal,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileSettings } from './ProfileSettings';
import { SecuritySettings } from './SecuritySettings';
import { WorkspaceSettings } from './WorkspaceSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { MoodboardSettings } from './MoodboardSettings';
import { LLMSettings } from './LLMSettings';
import { SubscriptionSettings } from './SubscriptionSettings';
import { ApiWebhookSettings } from './ApiWebhookSettings';
import { TeamSettings } from './TeamSettings';

interface SettingsLayoutProps {
    onAuth: () => void;
}

type SettingsSection =
    | 'profile'
    | 'security'
    | 'workspace'
    | 'appearance'
    | 'moodboard'
    | 'llm'
    | 'subscription'
    | 'api'
    | 'team';

interface NavGroup {
    label: string;
    items: { id: SettingsSection; label: string; icon: React.ElementType; badge?: string }[];
}

const NAV_GROUPS: NavGroup[] = [
    {
        label: 'ACCOUNT',
        items: [
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
        ],
    },
    {
        label: 'WORKSPACE',
        items: [
            { id: 'workspace', label: 'General', icon: Settings },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'moodboard', label: 'Moodboard', icon: Layout },
        ],
    },
    {
        label: 'INTEGRATIONS',
        items: [
            { id: 'llm', label: 'LLMs / AI Models', icon: Brain },
            { id: 'api', label: 'API & Webhooks', icon: Webhook },
        ],
    },
    {
        label: 'ORGANIZATION',
        items: [
            { id: 'team', label: 'Team', icon: Users },
            { id: 'subscription', label: 'Subscription', icon: CreditCard },
        ],
    },
];

export const SettingsLayout: React.FC<SettingsLayoutProps> = () => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
    const { user, userProfile, activeWorkspace } = useAuth();

    const profileName = userProfile?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

    return (
        <div className="flex h-full bg-background relative overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-[260px] shrink-0 h-full bg-card/80 backdrop-blur-xl border-r border-border/40 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-5 border-b border-border/20">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-primary" />
                        <div>
                            <h1 className="text-[14px] font-bold text-foreground tracking-tight">SETTINGS</h1>
                            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">
                                System_Configuration
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Card */}
                <div className="p-4 border-b border-border/20">
                    <div className="flex items-center gap-3 p-3 bg-muted/10 border border-border/40">
                        <div className="w-9 h-9 bg-primary/10 border border-border/40 flex items-center justify-center overflow-hidden">
                            {userProfile?.avatarUrl || user?.user_metadata?.avatar_url ? (
                                <img
                                    src={userProfile?.avatarUrl || user?.user_metadata?.avatar_url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={16} className="text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-foreground truncate">{profileName}</p>
                            <p className="text-[9px] font-mono text-muted-foreground/60 truncate">
                                {activeWorkspace?.name || 'No workspace'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Groups */}
                <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
                    {NAV_GROUPS.map((group, gi) => (
                        <div key={group.label} className={gi > 0 ? 'mt-1' : ''}>
                            <div className="px-5 py-2.5">
                                <span className="text-[8px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
                                    {group.label}
                                </span>
                            </div>
                            <div className="space-y-0.5 px-2">
                                {group.items.map((item) => {
                                    const isActive = activeSection === item.id;
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`
                                                w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200
                                                border-l-2
                                                ${isActive
                                                    ? 'border-primary bg-primary/10 text-primary'
                                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10 hover:border-primary/30'
                                                }
                                            `}
                                        >
                                            <Icon size={14} className={isActive ? 'text-primary' : ''} />
                                            <span className="text-[11px] font-bold tracking-wide">{item.label}</span>
                                            {item.badge && (
                                                <span className="ml-auto text-[8px] font-mono font-bold bg-primary/20 text-primary px-1.5 py-0.5">
                                                    {item.badge}
                                                </span>
                                            )}
                                            <ChevronRight
                                                size={10}
                                                className={`ml-auto transition-transform ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-border/20">
                    <div className="flex items-center gap-2">
                        <Terminal size={10} className="text-muted-foreground/40" />
                        <span className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                            BrandOS v4.3.0
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-muted-foreground/30">All Systems Operational</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-muted/5">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="p-8 pb-20"
                    >
                        {activeSection === 'profile' && <ProfileSettings />}
                        {activeSection === 'security' && <SecuritySettings />}
                        {activeSection === 'workspace' && <WorkspaceSettings />}
                        {activeSection === 'appearance' && <AppearanceSettings />}
                        {activeSection === 'moodboard' && <MoodboardSettings />}
                        {activeSection === 'llm' && <LLMSettings />}
                        {activeSection === 'subscription' && <SubscriptionSettings />}
                        {activeSection === 'api' && <ApiWebhookSettings />}
                        {activeSection === 'team' && <TeamSettings />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
