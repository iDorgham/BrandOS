import React, { useState } from 'react';
import { Layout, Layers, Network, Image as ImageIcon, Settings, Fingerprint, Menu, X, Rocket, Users, Brain, BarChart3, ShieldCheck } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SIDEBAR_TABS } from './Sidebar';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = React.memo(({ activeTab, onTabChange }) => {
    const { visibleTabs, tabOrder } = useSettings();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Filter visible tabs and order them
    const allVisibleTabs = tabOrder
        .map(id => SIDEBAR_TABS.find(t => t.id === id))
        .filter((tab): tab is (typeof SIDEBAR_TABS)[0] => !!tab && visibleTabs[tab.id] !== false);

    // Primary tabs for the bottom bar (first 4)
    const primaryTabs = allVisibleTabs.slice(0, 4);
    // Remaining tabs for the "More" menu
    const moreTabs = allVisibleTabs.slice(4);

    const handleTabClick = (tabId: string) => {
        onTabChange(tabId);
        setIsMenuOpen(false);
    };

    return (
        <>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[55] md:hidden"
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={e => e.stopPropagation()}
                            className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl p-6 pb-24 max-h-[70vh] overflow-y-auto"
                        >
                            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-8" />
                            <div className="grid grid-cols-3 gap-6">
                                {moreTabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabClick(tab.id)}
                                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'
                                                }`}
                                        >
                                            <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-center line-clamp-1">
                                                {tab.label}
                                            </span>
                                        </button>
                                    );
                                })}
                                {/* Always include Settings in the more menu if not visible otherwise */}
                                {!allVisibleTabs.find(t => t.id === 'settings') && (
                                    <button
                                        onClick={() => handleTabClick('settings')}
                                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                                            }`}
                                    >
                                        <Settings size={24} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Settings</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-lg border-t border-border z-[60] flex items-center justify-around px-2 pb-safe md:hidden transition-transform duration-300">
                {primaryTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-all ${isActive ? 'text-primary' : 'text-muted-foreground'
                                }`}
                        >
                            {isActive && (
                                <motion.div layoutId="bottom-nav-indicator" className="absolute top-0 w-8 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                            )}
                            <tab.icon
                                size={20}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}
                            />
                            <span className="text-[10px] font-bold uppercase tracking-tighter truncate w-full text-center">
                                {tab.label.split(' ')[0]}
                            </span>
                        </button>
                    );
                })}

                {/* More Button */}
                {moreTabs.length > 0 && (
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-all ${isMenuOpen ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        {isMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} />}
                        <span className="text-[10px] font-bold uppercase tracking-tighter">More</span>
                    </button>
                )}
            </nav>
        </>
    );
});
