import { useState, useCallback, useMemo } from 'react';
import { NodeBrowserState } from '../types';
import { NODE_REGISTRY, MoodNodeDefinition } from '../NodeRegistry';
import { useNodeManager } from '@/hooks/useNodeManager';

const STORAGE_KEY = 'brand_os_node_browser';

const loadState = (): Partial<NodeBrowserState> => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

const saveState = (state: NodeBrowserState) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { }
};

export const useNodeBrowser = () => {
    const { getInstalledNodes } = useNodeManager();
    const initial = loadState();

    const [viewMode, setViewModeState] = useState<NodeBrowserState['viewMode']>(initial.viewMode || 'list');
    const [favorites, setFavorites] = useState<string[]>(initial.favorites || []);
    const [recentlyUsed, setRecentlyUsed] = useState<string[]>(initial.recentlyUsed || []);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortByState] = useState<NodeBrowserState['sortBy']>(initial.sortBy || 'category');
    const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recent'>('all');

    const persist = useCallback((updates: Partial<NodeBrowserState>) => {
        const current: NodeBrowserState = { viewMode, favorites, recentlyUsed, searchQuery, sortBy };
        const next = { ...current, ...updates };
        saveState(next);
    }, [viewMode, favorites, recentlyUsed, searchQuery, sortBy]);

    const setViewMode = useCallback((mode: NodeBrowserState['viewMode']) => {
        setViewModeState(mode);
        persist({ viewMode: mode });
    }, [persist]);

    const setSortBy = useCallback((sort: NodeBrowserState['sortBy']) => {
        setSortByState(sort);
        persist({ sortBy: sort });
    }, [persist]);

    const toggleFavorite = useCallback((nodeId: string) => {
        setFavorites(prev => {
            const next = prev.includes(nodeId)
                ? prev.filter(id => id !== nodeId)
                : [...prev, nodeId];
            persist({ favorites: next });
            return next;
        });
    }, [persist]);

    const addToRecent = useCallback((nodeId: string) => {
        setRecentlyUsed(prev => {
            const filtered = prev.filter(id => id !== nodeId);
            const next = [nodeId, ...filtered].slice(0, 10);
            persist({ recentlyUsed: next });
            return next;
        });
    }, [persist]);

    const installedNodes = getInstalledNodes() as MoodNodeDefinition[];

    const filteredNodes = useMemo(() => {
        let nodes = [...installedNodes];

        // Filter by search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            nodes = nodes.filter(n =>
                n.label.toLowerCase().includes(q) ||
                n.description.toLowerCase().includes(q) ||
                n.id.toLowerCase().includes(q) ||
                n.category.toLowerCase().includes(q)
            );
        }

        // Sort
        if (sortBy === 'name') {
            nodes.sort((a, b) => a.label.localeCompare(b.label));
        } else if (sortBy === 'recent') {
            nodes.sort((a, b) => {
                const ai = recentlyUsed.indexOf(a.id);
                const bi = recentlyUsed.indexOf(b.id);
                if (ai === -1 && bi === -1) return 0;
                if (ai === -1) return 1;
                if (bi === -1) return -1;
                return ai - bi;
            });
        }
        // 'category' keeps original registry order

        return nodes;
    }, [installedNodes, searchQuery, sortBy, recentlyUsed]);

    const favoriteNodes = useMemo(() =>
        installedNodes.filter(n => favorites.includes(n.id)),
        [installedNodes, favorites]
    );

    const recentNodes = useMemo(() =>
        recentlyUsed
            .map(id => installedNodes.find(n => n.id === id))
            .filter(Boolean) as MoodNodeDefinition[],
        [installedNodes, recentlyUsed]
    );

    return {
        viewMode,
        setViewMode,
        favorites,
        toggleFavorite,
        recentlyUsed,
        addToRecent,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        activeTab,
        setActiveTab,
        filteredNodes,
        favoriteNodes,
        recentNodes,
    };
};
