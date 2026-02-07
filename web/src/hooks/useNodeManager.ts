import { useState, useEffect, useCallback } from 'react';
import { NODE_REGISTRY, MoodNodeDefinition } from '@/features/moodboard/NodeRegistry';

const STORAGE_KEY = 'brand_os_installed_nodes';

export const useNodeManager = () => {
    const [installedNodeIds, setInstalledNodeIds] = useState<string[]>(() => {
        // Initialize with core nodes
        const coreIds = NODE_REGISTRY.filter(n => n.isCore).map(n => n.id);

        // Load persistend user selection
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge core IDs with stored IDs (ensures core nodes are always present)
                return Array.from(new Set([...coreIds, ...parsed]));
            }
        } catch (e) {
            console.error('Failed to load installed nodes', e);
        }

        return coreIds;
    });

    // Sync to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(installedNodeIds));
    }, [installedNodeIds]);

    const installNode = useCallback((nodeId: string) => {
        setInstalledNodeIds(prev => {
            if (prev.includes(nodeId)) return prev;
            return [...prev, nodeId];
        });
    }, []);

    const uninstallNode = useCallback((nodeId: string) => {
        // Prevent uninstalling core nodes
        const node = NODE_REGISTRY.find(n => n.id === nodeId);
        if (node?.isCore) return;

        setInstalledNodeIds(prev => prev.filter(id => id !== nodeId));
    }, []);

    const isInstalled = useCallback((nodeId: string) => {
        return installedNodeIds.includes(nodeId);
    }, [installedNodeIds]);

    const getInstalledNodes = useCallback(() => {
        return NODE_REGISTRY.filter(node => installedNodeIds.includes(node.id));
    }, [installedNodeIds]);

    const getAvailableNodes = useCallback(() => {
        return NODE_REGISTRY.filter(node => !installedNodeIds.includes(node.id));
    }, [installedNodeIds]);

    return {
        installedNodeIds,
        installNode,
        uninstallNode,
        isInstalled,
        getInstalledNodes,
        getAvailableNodes,
        allNodes: NODE_REGISTRY
    };
};
