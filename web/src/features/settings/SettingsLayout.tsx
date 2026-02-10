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
import { AuditLogDashboard } from '../audit/AuditLogDashboard';
import { AuthStatus } from '@/components/auth/Auth';
import { useAuth } from '@/contexts/AuthContext';

interface SettingsLayoutProps {
    onAuth: () => void;
}

type SettingsSection = 'general' | 'profile' | 'security' | 'appearance' | 'team' | 'market' | 'api' | 'compliance';

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ onAuth }) => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('general');
    const { userRole } = useAuth();
    const isAdmin = userRole === 'admin';

    const MENU = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Monitor },
        { id: 'team', label: 'Team', icon: Users },
        ...(isAdmin ? [{ id: 'compliance', label: 'Compliance', icon: Activity }] : []),
        { id: 'market', label: 'Modules', icon: Box },
        { id: 'api', label: 'API Keys', icon: Key },
    ];

    return (
        <div className="flex flex-col h-full bg-background relative overflow-hidden">
            {/* Top Navigation Bar */}
            {/* Top Navigation Bar - Carbon Style */}
            <div className="w-full bg-background border-b border-border z-10 pt-8 px-8 md:px-12">
                <h1 className="text-3xl font-light tracking-tight mb-8">Settings</h1>

                <div className="flex items-center gap-8 overflow-x-auto custom-scrollbar">
                    {MENU.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id as SettingsSection)}
                            className={`
                                relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors whitespace-nowrap
                                ${activeSection === item.id
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
                                }
                            `}
                        >
                            <span>{item.label}</span>
                        </button>
                    ))}
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
                            {activeSection === 'compliance' && <AuditLogDashboard />}
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
