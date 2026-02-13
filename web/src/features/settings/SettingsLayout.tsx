import React, { useState, useRef, useEffect } from 'react';
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
    PanelLeft,
    LayoutList,
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

type LayoutMode = 'sidebar' | 'tabs';

interface NavItem {
    id: SettingsSection;
    label: string;
    icon: React.ElementType;
    badge?: string;
}

interface NavGroup {
    label: string;
    items: NavItem[];
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

const LAYOUT_KEY = 'brandos_settings_layout_v2';

const SettingsContent: React.FC<{ activeSection: SettingsSection }> = ({ activeSection }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
);

/* ─── Layout Mode Toggle ─── */
const LayoutToggle: React.FC<{ mode: LayoutMode; onChange: (m: LayoutMode) => void }> = ({ mode, onChange }) => (
    <div className="flex items-center border border-border/40 bg-muted/10 p-0.5">
        {([
            { id: 'sidebar' as const, icon: PanelLeft, tip: 'Sidebar' },
            { id: 'tabs' as const, icon: LayoutList, tip: 'Tabs' },
        ]).map(({ id, icon: Icon, tip }) => (
            <button
                key={id}
                onClick={() => onChange(id)}
                title={tip}
                className={`
                    flex items-center justify-center w-7 h-7 transition-all
                    ${mode === id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                    }
                `}
            >
                <Icon size={14} />
            </button>
        ))}
    </div>
);

/* ─── Top Tabs Bar ─── */
const TabsBar: React.FC<{
    activeSection: SettingsSection;
    onSelect: (s: SettingsSection) => void;
}> = ({ activeSection, onSelect }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeTabRef.current && scrollRef.current) {
            const container = scrollRef.current;
            const tab = activeTabRef.current;
            const left = tab.offsetLeft - container.offsetLeft;
            const scrollTo = left - container.clientWidth / 2 + tab.clientWidth / 2;
            container.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }, [activeSection]);

    return (
        <div className="relative border-b border-border/30 bg-card/80 backdrop-blur-xl">
            <div
                ref={scrollRef}
                className="flex items-end overflow-x-auto hide-scrollbar px-2"
            >
                {NAV_GROUPS.map((group, gi) => (
                    <React.Fragment key={group.label}>
                        {gi > 0 && (
                            <div className="self-center mx-1 w-px h-5 bg-border/30 shrink-0" />
                        )}
                        {group.items.map((item) => {
                            const isActive = activeSection === item.id;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    ref={isActive ? activeTabRef : undefined}
                                    onClick={() => onSelect(item.id)}
                                    className={`
                                        relative flex items-center gap-2 px-4 py-3 shrink-0 transition-all duration-200
                                        text-[11px] font-bold tracking-wide whitespace-nowrap
                                        border-b-2 -mb-px
                                        ${isActive
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary/30'
                                        }
                                    `}
                                >
                                    <Icon size={14} className={isActive ? 'text-primary' : ''} />
                                    {item.label}
                                    {item.badge && (
                                        <span className="text-[8px] font-mono font-bold bg-primary/20 text-primary px-1.5 py-0.5">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

/* ─── Sidebar (original) ─── */
const Sidebar: React.FC<{
    activeSection: SettingsSection;
    onSelect: (s: SettingsSection) => void;
    layoutMode: LayoutMode;
    onLayoutChange: (m: LayoutMode) => void;
}> = ({ activeSection, onSelect, layoutMode, onLayoutChange }) => {
    const { user, userProfile, activeWorkspace } = useAuth();
    const profileName = userProfile?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

    return (
        <div className="w-[260px] shrink-0 h-full bg-card/80 backdrop-blur-xl border-r border-border/40 flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-border/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-primary" />
                        <div>
                            <h1 className="text-[14px] font-bold text-foreground tracking-tight">SETTINGS</h1>
                            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">
                                System_Configuration
                            </p>
                        </div>
                    </div>
                    <LayoutToggle mode={layoutMode} onChange={onLayoutChange} />
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

            {/* Nav Groups */}
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
                                        onClick={() => onSelect(item.id)}
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

            {/* Footer */}
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
    );
};

/* ─── Main Export ─── */
export const SettingsLayout: React.FC<SettingsLayoutProps> = () => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
    const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
        try {
            const saved = localStorage.getItem(LAYOUT_KEY);
            if (saved === 'sidebar' || saved === 'tabs') return saved;
        } catch { /* ignore */ }
        return 'tabs';
    });

    const handleLayoutChange = (mode: LayoutMode) => {
        setLayoutMode(mode);
        try { localStorage.setItem(LAYOUT_KEY, mode); } catch { /* ignore */ }
    };

    /* ─── Sidebar Layout ─── */
    if (layoutMode === 'sidebar') {
        return (
            <div className="flex h-full bg-background relative overflow-hidden">
                <Sidebar
                    activeSection={activeSection}
                    onSelect={setActiveSection}
                    layoutMode={layoutMode}
                    onLayoutChange={handleLayoutChange}
                />
                <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-muted/5">
                    <div className="p-8 pb-20">
                        <SettingsContent activeSection={activeSection} />
                    </div>
                </div>
            </div>
        );
    }

    /* ─── Tabs Layout ─── */
    return (
        <div className="flex flex-col h-full bg-background relative overflow-hidden">
            {/* Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-primary" />
                    <div>
                        <h1 className="text-[14px] font-bold text-foreground tracking-tight">SETTINGS</h1>
                        <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">
                            System_Configuration
                        </p>
                    </div>
                </div>
                <LayoutToggle mode={layoutMode} onChange={handleLayoutChange} />
            </div>

            {/* Tabs Bar */}
            <TabsBar activeSection={activeSection} onSelect={setActiveSection} />

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-muted/5">
                <div className="max-w-5xl mx-auto p-8 pb-20">
                    <SettingsContent activeSection={activeSection} />
                </div>
            </div>
        </div>
    );
};
