import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Node, useReactFlow } from '@xyflow/react';
import { MoodNodeData } from '../../types';
import { NODE_REGISTRY } from '../../NodeRegistry';
import {
    Eye, EyeOff, Lock, Unlock, Trash2, ChevronDown, ChevronRight,
    Search, ImageUp, Copy, Layers, Plus, Folder, File, GripVertical
} from 'lucide-react';

interface LayersTabProps {
    nodes: Node<MoodNodeData>[];
    onSelectNode: (nodeId: string) => void;
    onDeleteNode: (nodeId: string) => void;
    updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
    onDuplicateNode?: (nodeId: string) => void;
    onAddNode?: (type: string) => void;
    onImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // New prop for reparenting (handled in parent or we assume standard reactflow usage)
    onReparentNode?: (nodeId: string, newParentId: string | undefined) => void;
}

// Get display info for a node
const getNodeInfo = (node: Node<MoodNodeData>) => {
    const registryEntry = NODE_REGISTRY.find(r => r.id === node.type);
    const Icon = registryEntry?.icon;
    const colorClass = registryEntry?.defaultColor || 'bg-slate-500';
    const typeName = registryEntry?.label || node.type || 'Node';
    const displayName = node.data.label || node.data.content?.slice(0, 30) || typeName;
    const isGroup = node.type === 'groupNode';

    return { Icon, colorClass, typeName, displayName, isGroup };
};

export const LayersTab: React.FC<LayersTabProps> = ({
    nodes,
    onSelectNode,
    onDeleteNode,
    updateNodeData,
    onDuplicateNode,
    onAddNode,
    onImageUpload,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { fitView, setNodes } = useReactFlow();

    const toggleGroup = (id: string) => {
        setCollapsedGroups(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    // --- REPARENTING & REORDERING LOGIC ---
    const handleDrop = useCallback((draggedNodeId: string, targetNodeId: string | undefined) => {
        if (draggedNodeId === targetNodeId) return;

        setNodes((nds) => {
            const draggedNode = nds.find(n => n.id === draggedNodeId);
            const targetNode = targetNodeId ? nds.find(n => n.id === targetNodeId) : null;

            if (!draggedNode) return nds;

            // Determine if parent is changing
            const isReparenting = targetNodeId !== draggedNode.parentId;

            // Calculate new position if reparenting
            let newPos = { ...draggedNode.position };
            let newParentId = draggedNode.parentId;

            if (isReparenting) {
                // 1. Unparenting (Target is Root)
                if (!targetNodeId && draggedNode.parentId) {
                    newParentId = undefined;
                    const currentParent = nds.find(n => n.id === draggedNode.parentId);
                    if (currentParent) {
                        newPos.x += currentParent.position.x;
                        newPos.y += currentParent.position.y;
                    }
                }
                // 2. Parenting (Target is Group)
                else if (targetNodeId && targetNode) {
                    newParentId = targetNodeId;
                    let absX = draggedNode.position.x;
                    let absY = draggedNode.position.y;

                    if (draggedNode.parentId) {
                        const currentParent = nds.find(n => n.id === draggedNode.parentId);
                        if (currentParent) {
                            absX += currentParent.position.x;
                            absY += currentParent.position.y;
                        }
                    }

                    newPos.x = absX - targetNode.position.x;
                    newPos.y = absY - targetNode.position.y;
                }
            }

            // Move the node in the array (Reordering)
            // If target is undefined (root drop), effectively move to end? Or specific index?
            // React Flow renders in array order. Last = Top.
            // Our Drop logic doesn't easily give "index", just "target".
            // If dropping ON a group, it becomes the Last Child (Top).
            // If dropping ON a sibling (not implemented here fully), we'd insert before/after.

            // For now, let's just move it to the end of the array to ensure it's "on top" of its new context,
            // OR if it's just reordering within same parent, we move it to end of that group's children list (top z-index).

            // Filter out dragged node
            const remainingNodes = nds.filter(n => n.id !== draggedNodeId);

            const updatedNode = {
                ...draggedNode,
                parentId: newParentId,
                position: newPos,
                extent: undefined // Ensure free movement
            };

            // append to end (Topmost visual)
            return [...remainingNodes, updatedNode];
        });

    }, [setNodes]);


    // Build Tree Structure
    const nodeTree = useMemo(() => {
        const tree: any[] = [];
        const map = new Map<string, any>();

        // 1. Map all nodes
        nodes.forEach(n => {
            map.set(n.id, { ...n, children: [] });
        });

        // 2. Build hierarchy (Parent -> Children)
        nodes.forEach(n => {
            if (n.parentId && map.has(n.parentId)) {
                map.get(n.parentId).children.push(map.get(n.id));
            } else {
                tree.push(map.get(n.id));
            }
        });

        // 3. Sort (Manual Reordering Support)
        // If we want manual reordering, we must rely on the array order (render order).
        // React Flow renders [0] at bottom, [length-1] at top.
        // Layers Panel usually shows [length-1] at TOP (Visual Top).

        // So we strictly follow the `nodes` array order.
        // `nodes` comes from React Flow state.
        // The tree construction above naturally preserves order if iterated purely?
        // Map iteration order is insertion order usually.

        // Let's refine step 2:
        // We want children arrays to respect the order they appear in `nodes`.
        // `nodes` is our source of truth for Z-index.

        // Check: `nodes.forEach` runs 0..N (Bottom..Top).
        // So children.push() builds Bottom..Top list.
        // Tree.push() builds Bottom..Top list.

        // In the UI display (`map`), we usually want Top..Bottom (Reverse Order).
        // So we should reverse the validation lists for display.

        // Helper to reverse children for display
        const reverseChildren = (list: any[]) => {
            list.reverse(); // Now Top..Bottom
            list.forEach(node => {
                if (node.children.length > 0) reverseChildren(node.children);
            });
        };

        // Reverse the root list
        tree.reverse();

        // Reverse all children lists
        tree.forEach(node => {
            if (node.children.length > 0) reverseChildren(node.children);
        });

        // Remove forced group sorting to allow manual Z-index control if desired.
        // If users want groups on top, they must move them there.

        return tree;

    }, [nodes]);


    const handleFocusNode = useCallback((nodeId: string) => {
        onSelectNode(nodeId);
        setTimeout(() => {
            fitView({ nodes: [{ id: nodeId }] as any, duration: 300, padding: 0.5 });
        }, 50);
    }, [onSelectNode, fitView]);

    const nodeCount = nodes.length;
    const selectedCount = nodes.filter(n => n.selected).length;

    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header bar */}
            <div className="px-3 py-2 border-b border-border/20 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <Layers size={12} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                        {nodeCount} Node{nodeCount !== 1 ? 's' : ''}
                    </span>
                    {selectedCount > 0 && (
                        <span className="text-[9px] font-mono text-primary bg-primary/10 px-1.5 py-0.5">
                            {selectedCount} selected
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="h-6 w-6 flex items-center justify-center text-muted-foreground/40 hover:text-primary hover:bg-muted/20 transition-colors"
                        title="Upload Image"
                    >
                        <ImageUp size={12} />
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onImageUpload} />
                    {onAddNode && (
                        <button
                            onClick={() => onAddNode('label')}
                            className="h-6 w-6 flex items-center justify-center text-muted-foreground/40 hover:text-primary hover:bg-muted/20 transition-colors"
                            title="Add Label Node"
                        >
                            <Plus size={12} />
                        </button>
                    )}
                </div>
            </div>

            {/* Search */}
            <div className="px-3 py-1.5 border-b border-border/10 shrink-0">
                <div className="flex items-center gap-1.5 h-7 bg-muted/10 border border-border/20 px-2">
                    <Search size={11} className="text-muted-foreground/30 shrink-0" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter layers..."
                        className="flex-1 bg-transparent text-[10px] outline-none placeholder:text-muted-foreground/20"
                    />
                </div>
            </div>

            {/* Tree List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                {/* Root Drop Zone */}
                <div
                    onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
                    onDrop={(e) => {
                        e.preventDefault();
                        const nodeId = e.dataTransfer.getData('nodeId');
                        handleDrop(nodeId, undefined); // Unparent
                    }}
                    className="min-h-full"
                >
                    {nodeTree.map(node => (
                        <LayerItem
                            key={node.id}
                            node={node}
                            level={0}
                            collapsedGroups={collapsedGroups}
                            onToggleCollapse={toggleGroup}
                            onSelectNode={handleFocusNode}
                            onDeleteNode={onDeleteNode}
                            updateNodeData={updateNodeData}
                            onDuplicateNode={onDuplicateNode}
                            onDrop={handleDrop}
                            searchQuery={searchQuery}
                        />
                    ))}
                    {nodeTree.length === 0 && (
                        <div className="p-6 flex flex-col items-center justify-center text-center gap-2 opacity-50">
                            <span className="text-[10px]">No layers</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Recursive Layer Item
// Recursive Layer Item
interface LayerItemProps {
    node: any;
    level: number;
    collapsedGroups: Set<string>;
    onToggleCollapse: (id: string) => void;
    onSelectNode: (id: string) => void;
    onDeleteNode: (id: string) => void;
    updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
    onDuplicateNode?: (id: string) => void;
    onDrop: (draggedId: string, targetId: string | undefined) => void;
    searchQuery: string;
}

const LayerItem: React.FC<LayerItemProps> = ({
    node,
    level,
    collapsedGroups,
    onToggleCollapse,
    onSelectNode,
    onDeleteNode,
    updateNodeData,
    onDuplicateNode,
    onDrop,
    searchQuery
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon, colorClass, typeName, displayName, isGroup } = getNodeInfo(node);
    const isCollapsed = collapsedGroups.has(node.id);

    // Search filtering
    const matchesSearch = !searchQuery || displayName.toLowerCase().includes(searchQuery.toLowerCase()) || typeName.toLowerCase().includes(searchQuery.toLowerCase());
    const hasMatchingChildren = node.children.some((child: any) => {
        // Simple hack: if there's a query, and we are a group, always render if children match
        return true;
    });

    if (!matchesSearch && searchQuery && !hasMatchingChildren) return null;

    const isHidden = (node.style?.opacity as number || 1) <= 0;
    const isSelected = node.selected;

    return (
        <div className="select-none">
            <div
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData('nodeId', node.id);
                    e.dataTransfer.effectAllowed = 'move';
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const draggedId = e.dataTransfer.getData('nodeId');
                    if (isGroup) {
                        onDrop(draggedId, node.id);
                    }
                }}
                className={`
                    group flex items-center gap-1.5 px-2 py-1 cursor-pointer transition-all duration-100 
                    border border-transparent rounded-sm mb-[1px]
                    ${isSelected ? 'bg-primary/20 border-primary/20' : 'hover:bg-muted/10'}
                    ${isHidden ? 'opacity-40' : ''}
                `}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectNode(node.id);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Collapse Toggle for Groups */}
                {isGroup ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleCollapse(node.id); }}
                        className="p-0.5 hover:text-white text-muted-foreground/50 transition-colors"
                    >
                        {isCollapsed
                            ? <ChevronRight size={10} />
                            : <ChevronDown size={10} />
                        }
                    </button>
                ) : (
                    <div className="w-[14px]" /> // Spacer
                )}

                {/* Icon */}
                {Icon ? <Icon size={12} className={isSelected ? 'text-primary' : 'text-muted-foreground'} /> : <File size={12} />}

                {/* Label */}
                <span className={`text-[10px] truncate flex-1 ${isSelected ? 'text-white' : 'text-muted-foreground'}`}>
                    {displayName}
                </span>

                {/* Actions */}
                <div className={`flex items-center gap-0.5 shrink-0 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>
                    <button onClick={(e) => { e.stopPropagation(); updateNodeData(node.id, {}, { opacity: isHidden ? 1 : 0 }); }} className="p-1 hover:text-white text-muted-foreground/30">
                        {isHidden ? <EyeOff size={10} /> : <Eye size={10} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); updateNodeData(node.id, { isLocked: !node.data.isLocked }); }} className="p-1 hover:text-white text-muted-foreground/30">
                        {node.data.isLocked ? <Lock size={10} /> : <Unlock size={10} />}
                    </button>
                    {onDuplicateNode && (
                        <button onClick={(e) => { e.stopPropagation(); onDuplicateNode(node.id); }} className="p-1 hover:text-white text-muted-foreground/30">
                            <Copy size={10} />
                        </button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); onDeleteNode(node.id); }} className="p-1 hover:text-red-400 text-muted-foreground/30">
                        <Trash2 size={10} />
                    </button>
                </div>
            </div>

            {/* Children */}
            {isGroup && !isCollapsed && node.children.length > 0 && (
                <div>
                    {node.children.map((child: any) => (
                        <LayerItem
                            key={child.id}
                            node={child}
                            level={level + 1}
                            collapsedGroups={collapsedGroups}
                            onToggleCollapse={onToggleCollapse}
                            onSelectNode={onSelectNode}
                            onDeleteNode={onDeleteNode}
                            updateNodeData={updateNodeData}
                            onDuplicateNode={onDuplicateNode}
                            onDrop={onDrop}
                            searchQuery={searchQuery}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

