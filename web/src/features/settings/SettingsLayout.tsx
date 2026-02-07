import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layout,
    Settings,
    Shield,
    Activity,
    Box,
    Monitor,
    ChevronRight,
    Users,
    User,
    Lock,
    Key
} from 'lucide-react';
import { ApiKeysView } from './ApiKeysView';
import { NodesMarketView } from './NodesMarketView';
import { GeneralSettings } from './GeneralSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { ProfileSettings } from './ProfileSettings';
import { SecuritySettings } from './SecuritySettings';
import { TeamView } from '../team/TeamView';
import { AuthStatus } from '@/components/auth/Auth';

interface SettingsLayoutProps {
    onAuth: () => void;
}

type SettingsSection = 'general' | 'profile' | 'security' | 'appearance' | 'team' | 'market' | 'api';

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ onAuth }) => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('general');

    const MENU = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Monitor },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'market', label: 'Modules', icon: Box },
        { id: 'api', label: 'API Keys', icon: Key },
    ];

    return (
        <div className="flex flex-col h-full bg-background relative overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="w-full border-b border-border bg-card/30 backdrop-blur-md z-10">
                <div className="w-full px-6 md:px-10 pt-1.5 pb-2">
                    <div className="flex flex-col gap-2">
                        <div className="h-1" />

                        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 -mx-4 px-4 md:px-0">
                            {MENU.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id as SettingsSection)}
                                    className={`
                                        relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap
                                        ${activeSection === item.id
                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-1 ring-primary/20'
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                        }
                                    `}
                                >
                                    <item.icon size={14} strokeWidth={activeSection === item.id ? 2.5 : 2} />
                                    <span>{item.label}</span>
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-primary/10 rounded-full -z-10 mix-blend-multiply opacity-0"
                                        // Handled by CSS class but kept for potential future layout anims
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-muted/5">
                <div className="w-full px-6 md:px-10 pt-1 pb-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.99 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-transparent"
                        >
                            {activeSection === 'general' && <GeneralSettings />}
                            {activeSection === 'profile' && <ProfileSettings />}
                            {activeSection === 'security' && <SecuritySettings />}
                            {activeSection === 'appearance' && <AppearanceSettings />}
                            {activeSection === 'team' && <TeamView />}
                            {activeSection === 'api' && <ApiKeysView />}
                            {activeSection === 'market' && <NodesMarketView />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer / Status Area */}
            <div className="absolute bottom-6 right-8 pointer-events-none z-50">
                <div className="pointer-events-auto bg-background/80 backdrop-blur-xl border border-border p-2 rounded-full shadow-2xl">
                    <AuthStatus />
                </div>
            </div>
        </div>
    );
};
