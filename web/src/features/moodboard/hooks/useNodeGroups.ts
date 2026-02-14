import { useState, useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { MoodNodeData, NodeGroup } from '../types';
import { generateId } from '@/utils';
import { toast } from 'sonner';

const GROUP_COLORS = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-purple-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-orange-500',
];

export const useNodeGroups = (
    nodes: Node<MoodNodeData>[],
    setNodes: React.Dispatch<React.SetStateAction<Node<MoodNodeData>[]>>,
    edges: Edge[],
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
    saveToHistory: () => void
) => {
    const [groups, setGroups] = useState<NodeGroup[]>([]);

    const getGroupBounds = useCallback((nodeIds: string[]) => {
        const memberNodes = nodes.filter(n => nodeIds.includes(n.id));
        if (memberNodes.length === 0) return { x: 0, y: 0, width: 400, height: 300 };

        const PADDING = 40;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        memberNodes.forEach(node => {
            const w = parseInt(node.style?.width as string) || 340;
            const h = parseInt(node.style?.height as string) || 340;
            minX = Math.min(minX, node.position.x);
            minY = Math.min(minY, node.position.y);
            maxX = Math.max(maxX, node.position.x + w);
            maxY = Math.max(maxY, node.position.y + h);
        });

        return {
            x: minX - PADDING,
            y: minY - PADDING - 30, // Extra space for header
            width: maxX - minX + PADDING * 2,
            height: maxY - minY + PADDING * 2 + 30,
        };
    }, [nodes]);

    const createGroup = useCallback((nodeIds: string[], name?: string) => {
        if (nodeIds.length < 2) {
            toast.error('Select at least 2 nodes to group');
            return null;
        }

        const bounds = getGroupBounds(nodeIds);
        const colorIndex = groups.length % GROUP_COLORS.length;
        const groupId = generateId();

        const newGroup: NodeGroup = {
            id: groupId,
            name: name || `Group ${groups.length + 1}`,
            color: GROUP_COLORS[colorIndex],
            nodeIds: [...nodeIds],
            isCollapsed: false,
            position: { x: bounds.x, y: bounds.y },
            size: { width: bounds.width, height: bounds.height },
        };

        setGroups(prev => [...prev, newGroup]);

        // Tag nodes with group membership
        setNodes(nds => nds.map(n =>
            nodeIds.includes(n.id)
                ? { ...n, data: { ...n.data, groupId } }
                : n
        ));

        saveToHistory();
        toast.success(`Grouped ${nodeIds.length} nodes`);
        return groupId;
    }, [groups, getGroupBounds, setNodes, saveToHistory]);

    const ungroupNodes = useCallback((groupId: string) => {
        const group = groups.find(g => g.id === groupId);
        if (!group) return;

        // Clear group membership from nodes
        setNodes(nds => nds.map(n =>
            n.data.groupId === groupId
                ? { ...n, data: { ...n.data, groupId: undefined } }
                : n
        ));

        // Show hidden nodes if collapsed
        if (group.isCollapsed) {
            setNodes(nds => nds.map(n =>
                group.nodeIds.includes(n.id)
                    ? { ...n, hidden: false }
                    : n
            ));
        }

        setGroups(prev => prev.filter(g => g.id !== groupId));
        saveToHistory();
        toast.info('Group dissolved');
    }, [groups, setNodes, saveToHistory]);

    const toggleCollapse = useCallback((groupId: string) => {
        setGroups(prev => prev.map(g => {
            if (g.id !== groupId) return g;

            const willCollapse = !g.isCollapsed;

            // Hide/show member nodes
            setNodes(nds => nds.map(n =>
                g.nodeIds.includes(n.id)
                    ? { ...n, hidden: willCollapse }
                    : n
            ));

            // Hide/show edges connected to member nodes
            setEdges(eds => eds.map(e =>
                g.nodeIds.includes(e.source) || g.nodeIds.includes(e.target)
                    ? { ...e, hidden: willCollapse }
                    : e
            ));

            return { ...g, isCollapsed: willCollapse };
        }));
    }, [setNodes, setEdges]);

    const updateGroup = useCallback((groupId: string, updates: Partial<NodeGroup>) => {
        setGroups(prev => prev.map(g =>
            g.id === groupId ? { ...g, ...updates } : g
        ));
    }, []);

    const deleteGroup = useCallback((groupId: string) => {
        // Keep nodes, just remove group
        setNodes(nds => nds.map(n =>
            n.data.groupId === groupId
                ? { ...n, data: { ...n.data, groupId: undefined }, hidden: false }
                : n
        ));

        // Unhide edges
        const group = groups.find(g => g.id === groupId);
        if (group) {
            setEdges(eds => eds.map(e =>
                group.nodeIds.includes(e.source) || group.nodeIds.includes(e.target)
                    ? { ...e, hidden: false }
                    : e
            ));
        }

        setGroups(prev => prev.filter(g => g.id !== groupId));
        saveToHistory();
        toast.info('Group deleted');
    }, [groups, setNodes, setEdges, saveToHistory]);

    const refreshGroupBounds = useCallback(() => {
        setGroups(prev => prev.map(g => {
            if (g.isCollapsed) return g;
            const bounds = getGroupBounds(g.nodeIds);
            return {
                ...g,
                position: { x: bounds.x, y: bounds.y },
                size: { width: bounds.width, height: bounds.height },
            };
        }));
    }, [getGroupBounds]);

    return {
        groups,
        setGroups,
        createGroup,
        ungroupNodes,
        toggleCollapse,
        updateGroup,
        deleteGroup,
        refreshGroupBounds,
    };
};
