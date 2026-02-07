import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
    visibleTabs: Record<string, boolean>;
    toggleTabVisibility: (tabId: string) => void;
    tabOrder: string[];
    updateTabOrder: (newOrder: string[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

interface SettingsProviderProps {
    children: ReactNode;
}

const SETTINGS_KEY = 'brandos_visible_tabs_v1';
const ORDER_KEY = 'brandos_tab_order_v1';

// Default all tabs to visible
const DEFAULT_VISIBILITY = {
    dashboard: true,
    identity: true,
    doctrine: true,
    moodboard: true,
    creative: true,
    training: true,
    audit: true,
    analytics: true,
    library: true,
    team: true,
    deployment: true,
};

const DEFAULT_ORDER = [
    'dashboard',
    'identity',
    'doctrine',
    'creative',
    'moodboard',
    'training',
    'audit',
    'analytics',
    'library',
    'team',
    'deployment'
];

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [visibleTabs, setVisibleTabs] = useState<Record<string, boolean>>(() => {
        try {
            const saved = localStorage.getItem(SETTINGS_KEY);
            return saved ? { ...DEFAULT_VISIBILITY, ...JSON.parse(saved) } : DEFAULT_VISIBILITY;
        } catch (e) {
            console.error('Failed to load visibility settings', e);
            return DEFAULT_VISIBILITY;
        }
    });

    const [tabOrder, setTabOrder] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem(ORDER_KEY);
            if (saved) {
                let parsed = JSON.parse(saved) as string[];

                // Migration: Ensure 'creative' comes before 'moodboard' for existing users
                const creativeIdx = parsed.indexOf('creative');
                const moodboardIdx = parsed.indexOf('moodboard');
                if (creativeIdx !== -1 && moodboardIdx !== -1 && creativeIdx > moodboardIdx) {
                    // Swap them
                    parsed.splice(creativeIdx, 1);
                    parsed.splice(moodboardIdx, 0, 'creative');
                }

                // Ensure all default tabs are present even if new ones were added
                const missing = DEFAULT_ORDER.filter(id => !parsed.includes(id));
                return [...parsed, ...missing];
            }
            return DEFAULT_ORDER;
        } catch (e) {
            console.error('Failed to load tab order', e);
            return DEFAULT_ORDER;
        }
    });

    useEffect(() => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(visibleTabs));
    }, [visibleTabs]);

    useEffect(() => {
        localStorage.setItem(ORDER_KEY, JSON.stringify(tabOrder));
    }, [tabOrder]);

    const toggleTabVisibility = (tabId: string) => {
        setVisibleTabs(prev => ({
            ...prev,
            [tabId]: !prev[tabId]
        }));
    };

    const updateTabOrder = (newOrder: string[]) => {
        setTabOrder(newOrder);
    };

    return (
        <SettingsContext.Provider value={{ visibleTabs, toggleTabVisibility, tabOrder, updateTabOrder }}>
            {children}
        </SettingsContext.Provider>
    );
};
