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
    // Derived groups from nodes for backward compatibility with UI
    const groups = nodes
        .filter(n => n.type === 'groupNode')
        .map(n => ({
            id: n.id,
            name: n.data.label || 'Untitled Group',
            color: (n.data.color as string) || 'bg-slate-800',
            nodeIds: nodes.filter(child => child.parentId === n.id).map(c => c.id),
            isCollapsed: !!n.data.isCollapsed,
            position: n.position,
            size: {
                width: parseInt(n.style?.width as string) || 400,
                height: parseInt(n.style?.height as string) || 300
            }
        })) as NodeGroup[];

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
            y: minY - PADDING - 30,
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
        const groupId = generateId();
        const color = GROUP_COLORS[nodes.filter(n => n.type === 'groupNode').length % GROUP_COLORS.length];

        const groupNode: Node<MoodNodeData> = {
            id: groupId,
            type: 'groupNode',
            position: { x: bounds.x, y: bounds.y },
            style: { width: bounds.width, height: bounds.height },
            data: {
                label: name || `Group ${nodes.filter(n => n.type === 'groupNode').length + 1}`,
                color,
                isCollapsed: false,
                groupId,
            },
            zIndex: -1,
        };

        setNodes(nds => {
            const children = nds.map(n => {
                if (nodeIds.includes(n.id)) {
                    return {
                        ...n,
                        parentId: groupId,
                        position: {
                            x: n.position.x - bounds.x,
                            y: n.position.y - bounds.y
                        },
                        // extent: 'parent' as const, // Removed to allow dragging out
                    };
                }
                return n;
            });
            return [...children, groupNode];
        });

        saveToHistory();
        toast.success(`Group node initialized with ${nodeIds.length} members`);
        return groupId;
    }, [nodes, getGroupBounds, setNodes, saveToHistory]);

    const ungroupNodes = useCallback((groupId: string) => {
        const groupNode = nodes.find(n => n.id === groupId);
        if (!groupNode) return;

        setNodes(nds => {
            const nextNodes = nds.map(n => {
                if (n.parentId === groupId) {
                    return {
                        ...n,
                        parentId: undefined,
                        position: {
                            x: n.position.x + groupNode.position.x,
                            y: n.position.y + groupNode.position.y
                        },
                        extent: undefined,
                        hidden: false,
                    };
                }
                return n;
            });
            return nextNodes.filter(n => n.id !== groupId);
        });

        saveToHistory();
        toast.info('Group container dissolved');
    }, [nodes, setNodes, saveToHistory]);

    const toggleCollapse = useCallback((groupId: string) => {
        setNodes(nds => nds.map(n => {
            if (n.id === groupId) {
                const willCollapse = !n.data.isCollapsed;
                return {
                    ...n,
                    data: { ...n.data, isCollapsed: willCollapse },
                    style: {
                        ...n.style,
                        width: willCollapse ? 240 : n.style?.width,
                        height: willCollapse ? 160 : n.style?.height,
                    }
                };
            }
            if (n.parentId === groupId) {
                const parent = nds.find(p => p.id === groupId);
                const willCollapse = !parent?.data.isCollapsed;
                return { ...n, hidden: willCollapse };
            }
            return n;
        }));

        // Hide edges connected to children
        const groupNodeIds = nodes.filter(n => n.parentId === groupId).map(n => n.id);
        setEdges(eds => eds.map(e =>
            groupNodeIds.includes(e.source) || groupNodeIds.includes(e.target)
                ? { ...e, hidden: !nodes.find(n => n.id === groupId)?.data.isCollapsed }
                : e
        ));
    }, [nodes, setNodes, setEdges]);

    const updateGroup = useCallback((groupId: string, updates: Partial<NodeGroup>) => {
        setNodes(nds => nds.map(n => {
            if (n.id === groupId) {
                const dataUpdates: Partial<MoodNodeData> = {};
                if (updates.name) dataUpdates.label = updates.name;
                if (updates.color) dataUpdates.color = updates.color;
                if (updates.isCollapsed !== undefined) dataUpdates.isCollapsed = updates.isCollapsed;

                return {
                    ...n,
                    data: { ...n.data, ...dataUpdates }
                };
            }
            return n;
        }));
    }, [setNodes]);

    const deleteGroup = useCallback((groupId: string) => {
        ungroupNodes(groupId); // For now, delete just dissolves the group but keeps nodes
    }, [ungroupNodes]);

    const refreshGroupBounds = useCallback(() => {
        setNodes(nds => {
            const groups = nds.filter(n => n.type === 'groupNode' && !n.data.isCollapsed);
            if (groups.length === 0) return nds;

            let hasChanges = false;
            const updates = new Map<string, any>(); // Map<nodeId, Partial<Node>>

            groups.forEach(group => {
                const children = nds.filter(n => n.parentId === group.id);
                if (children.length === 0) return;

                let minX = Infinity;
                let minY = Infinity;
                let maxX = -Infinity;
                let maxY = -Infinity;

                children.forEach(child => {
                    // Use child updates if available (though unlikely in this synchronous loop)
                    const x = child.position.x;
                    const y = child.position.y;
                    const w = child.measured?.width || child.width || parseInt(child.style?.width as string) || 0;
                    const h = child.measured?.height || child.height || parseInt(child.style?.height as string) || 0;

                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (x + w > maxX) maxX = x + w;
                    if (y + h > maxY) maxY = y + h;
                });

                // Add padding
                const PADDING = 20;

                // If children are within bounds and not negative, and group is large enough, 
                // do we SHRINK? Maybe not, prevents jitter. Only Expand.
                // CURRENT LOGIC: Auto-Expand Only.

                // Current Group Bounds
                const gW = parseInt(group.style?.width as string) || 0;
                const gH = parseInt(group.style?.height as string) || 0;

                let newGW = gW;
                let newGH = gH;
                let shiftX = 0;
                let shiftY = 0;

                // 1. Check Negative Expansion (Left/Top)
                if (minX < PADDING) {
                    shiftX = minX - PADDING; // negative value
                    newGW += -shiftX;
                }
                if (minY < PADDING + 30) { // +30 for header
                    shiftY = minY - (PADDING + 30);
                    newGH += -shiftY;
                }

                // 2. Check Positive Expansion (Right/Bottom)
                // If we shifted, effective maxX overlaps more? 
                // Let's think: changing origin implies we move children.
                // New limit = maxX - shiftX (since shiftX is negative, this increases maxX relative to new origin?)
                // Actually: New Width must cover (maxX - minX) + PADDING*2

                // Let's just recalculate desired bounds from scratch based on content
                const contentWidth = maxX - minX;
                const contentHeight = maxY - minY;

                const desiredWidth = Math.max(gW, contentWidth + PADDING * 2);
                const desiredHeight = Math.max(gH, contentHeight + PADDING * 2 + 30);

                // If we have negative overflow, we must shift.
                // If we have positive overflow, we must expand.

                const expansionRight = (maxX + PADDING) - gW;
                const expansionBottom = (maxY + PADDING) - gH;

                let finalShiftX = 0;
                let finalShiftY = 0;
                let finalWidth = gW;
                let finalHeight = gH;
                let groupChanged = false;

                // Handle Left Overflow
                if (minX < PADDING) {
                    finalShiftX = minX - PADDING; // e.g., -50
                    finalWidth += -finalShiftX;
                    groupChanged = true;
                }

                // Handle Top Overflow
                const TOP_OFFSET = 40; // Header space roughly
                if (minY < TOP_OFFSET) {
                    finalShiftY = minY - TOP_OFFSET;
                    finalHeight += -finalShiftY;
                    groupChanged = true;
                }

                // Handle Right Overflow (relative to potentially new origin?)
                // Actually if we shift origin left by 50, effectively the right boundary moves left by 50 in world space?
                // No, "Width" increases. 
                // If we shift X by -50, and Width by +50, the Right Edge stays in place.
                // We need to check if content extends BEYOND current width.

                if (maxX > finalWidth + finalShiftX - PADDING) {
                    finalWidth = Math.max(finalWidth, maxX - finalShiftX + PADDING);
                    groupChanged = true;
                }
                if (maxY > finalHeight + finalShiftY - PADDING) {
                    finalHeight = Math.max(finalHeight, maxY - finalShiftY + PADDING);
                    groupChanged = true;
                }

                if (groupChanged) {
                    updates.set(group.id, {
                        id: group.id,
                        position: { x: group.position.x + finalShiftX, y: group.position.y + finalShiftY },
                        style: { ...group.style, width: finalWidth, height: finalHeight }
                    });
                    hasChanges = true;

                    // If we shifted, we must shift ALL children in opposite direction
                    if (finalShiftX !== 0 || finalShiftY !== 0) {
                        children.forEach(c => {
                            updates.set(c.id, {
                                id: c.id,
                                position: { x: c.position.x - finalShiftX, y: c.position.y - finalShiftY }
                            });
                        });
                    }
                }
            });

            if (!hasChanges) return nds;

            return nds.map(n => {
                if (updates.has(n.id)) {
                    const update = updates.get(n.id);
                    return { ...n, ...update };
                }
                return n;
            });
        });
    }, [setNodes]);

    const moveGroup = useCallback((groupId: string, dx: number, dy: number) => {
        setNodes(nds => nds.map(n =>
            n.id === groupId
                ? { ...n, position: { x: n.position.x + dx, y: n.position.y + dy } }
                : n
        ));
    }, [setNodes]);

    return {
        groups,
        setGroups: () => { }, // No longer used as independent state
        getGroupBounds,
        createGroup,
        ungroupNodes,
        toggleCollapse,
        updateGroup,
        deleteGroup,
        refreshGroupBounds,
        moveGroup,
    };
};
