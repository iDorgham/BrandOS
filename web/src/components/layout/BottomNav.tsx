import React from 'react';
import { Layout, Layers, Network, Image as ImageIcon, Settings, Fingerprint } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    const { visibleTabs } = useSettings();

    const tabs = [
        { id: 'dashboard', icon: Layout, label: 'Dashboard' },
        { id: 'identity', icon: Fingerprint, label: 'Identity' },
        { id: 'creative', icon: Layers, label: 'Studio' },
        { id: 'moodboard', icon: Network, label: 'Board' },
        { id: 'library', icon: ImageIcon, label: 'Vault' },
    ].filter(tab => visibleTabs[tab.id] !== false);

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-lg border-t border-border z-[60] flex items-center justify-around px-2 pb-safe md:hidden transition-transform duration-300">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-all ${isActive ? 'text-primary' : 'text-muted-foreground'
                            }`}
                    >
                        {isActive && (
                            <div className="absolute top-0 w-8 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--cds-interactive-01-rgb),0.5)]" />
                        )}
                        <tab.icon
                            size={20}
                            strokeWidth={isActive ? 2.5 : 2}
                            className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}
                        />
                        <span className="text-[10px] font-bold uppercase tracking-tighter truncate w-full text-center">
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};
