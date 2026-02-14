import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Node, useReactFlow } from '@xyflow/react';
import { MoodNodeData } from '../../types';
import { NODE_REGISTRY } from '../../NodeRegistry';
import {
    Eye, EyeOff, Lock, Unlock, Trash2, ChevronDown, ChevronRight,
    Search, ImageUp, GripVertical, MousePointer2, Copy,
    ArrowUp, ArrowDown, Layers, Plus
} from 'lucide-react';

interface LayersTabProps {
    nodes: Node<MoodNodeData>[];
    onSelectNode: (nodeId: string) => void;
    onDeleteNode: (nodeId: string) => void;
    updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
    onDuplicateNode?: (nodeId: string) => void;
    onAddNode?: (type: string) => void;
    onImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Get display info for a node
const getNodeInfo = (node: Node<MoodNodeData>) => {
    const registryEntry = NODE_REGISTRY.find(r => r.id === node.type);
    const Icon = registryEntry?.icon;
    const colorClass = registryEntry?.defaultColor || 'bg-slate-500';
    const typeName = registryEntry?.label || node.type || 'Node';
    const displayName = node.data.label || node.data.content?.slice(0, 30) || typeName;

    return { Icon, colorClass, typeName, displayName };
};

export const LayersTab: React.FC<LayersTabProps> = ({
    nodes,
    onSelectNode,
    onDeleteNode,
    updateNodeData,
    onDuplicateNode,
    onAddNode,
    onImageUpload
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
    const [sortBy, setSortBy] = useState<'position' | 'type' | 'name'>('position');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { fitView } = useReactFlow();

    const selectedNodes = useMemo(() => nodes.filter(n => n.selected), [nodes]);

    // Filter and sort nodes
    const filteredNodes = useMemo(() => {
        let result = [...nodes];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(n => {
                const info = getNodeInfo(n);
                return info.displayName.toLowerCase().includes(q)
                    || info.typeName.toLowerCase().includes(q)
                    || n.type?.toLowerCase().includes(q);
            });
        }

        switch (sortBy) {
            case 'type':
                result.sort((a, b) => (a.type || '').localeCompare(b.type || ''));
                break;
            case 'name':
                result.sort((a, b) => {
                    const nameA = a.data.label || a.data.content || '';
                    const nameB = b.data.label || b.data.content || '';
                    return nameA.localeCompare(nameB);
                });
                break;
            case 'position':
            default:
                // Reverse so top-most (last rendered) appears first in the list
                result.reverse();
                break;
        }

        return result;
    }, [nodes, searchQuery, sortBy]);

    // Group by type
    const groupedNodes = useMemo(() => {
        const groups: Record<string, Node<MoodNodeData>[]> = {};
        filteredNodes.forEach(n => {
            const category = NODE_REGISTRY.find(r => r.id === n.type)?.category || 'OTHER';
            if (!groups[category]) groups[category] = [];
            groups[category].push(n);
        });
        return groups;
    }, [filteredNodes]);

    const toggleCategory = (cat: string) => {
        setCollapsedCategories(prev => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat); else next.add(cat);
            return next;
        });
    };

    const handleFocusNode = useCallback((nodeId: string) => {
        onSelectNode(nodeId);
        // Brief delay for selection to propagate, then fit
        setTimeout(() => {
            fitView({ nodes: [{ id: nodeId }] as any, duration: 300, padding: 0.5 });
        }, 50);
    }, [onSelectNode, fitView]);

    const nodeCount = nodes.length;
    const selectedCount = selectedNodes.length;

    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">

            {/* Header bar with counts + actions */}
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
                    {/* Image upload button */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="h-6 w-6 flex items-center justify-center text-muted-foreground/40 hover:text-primary hover:bg-muted/20 transition-colors"
                        title="Upload Image"
                    >
                        <ImageUp size={12} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={onImageUpload}
                    />
                    {/* Quick add */}
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
                        placeholder="Filter nodes..."
                        className="flex-1 bg-transparent text-[10px] outline-none placeholder:text-muted-foreground/20"
                    />
                    {searchQuery && (
                        <span className="text-[8px] font-mono text-muted-foreground/40">{filteredNodes.length}</span>
                    )}
                </div>
            </div>

            {/* Sort controls */}
            <div className="px-3 py-1 border-b border-border/10 flex items-center gap-1 shrink-0">
                <span className="text-[8px] text-muted-foreground/40 uppercase tracking-wider mr-1">Sort</span>
                {(['position', 'type', 'name'] as const).map(s => (
                    <button
                        key={s}
                        onClick={() => setSortBy(s)}
                        className={`text-[8px] px-1.5 py-0.5 uppercase tracking-wider transition-colors ${sortBy === s
                            ? 'text-primary bg-primary/10 font-bold'
                            : 'text-muted-foreground/30 hover:text-muted-foreground'
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Node List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sortBy === 'type' ? (
                    // Grouped view
                    Object.entries(groupedNodes).map(([category, categoryNodes]) => (
                        <div key={category}>
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center gap-1.5 px-3 py-1.5 text-left hover:bg-muted/10 transition-colors border-b border-border/5"
                            >
                                {collapsedCategories.has(category)
                                    ? <ChevronRight size={9} className="text-muted-foreground/30" />
                                    : <ChevronDown size={9} className="text-muted-foreground/30" />
                                }
                                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
                                    {category.replace(/_/g, ' ')}
                                </span>
                                <span className="text-[8px] font-mono text-muted-foreground/20 ml-auto">{categoryNodes.length}</span>
                            </button>
                            {!collapsedCategories.has(category) && categoryNodes.map(node => (
                                <NodeRow
                                    key={node.id}
                                    node={node}
                                    onSelect={() => handleFocusNode(node.id)}
                                    onDelete={() => onDeleteNode(node.id)}
                                    onToggleLock={() => updateNodeData(node.id, { isLocked: !node.data.isLocked })}
                                    onToggleVisibility={() => updateNodeData(node.id, {}, { opacity: (node.style?.opacity as number || 1) > 0 ? 0 : 1 })}
                                    onDuplicate={onDuplicateNode ? () => onDuplicateNode(node.id) : undefined}
                                />
                            ))}
                        </div>
                    ))
                ) : (
                    // Flat list
                    filteredNodes.map(node => (
                        <NodeRow
                            key={node.id}
                            node={node}
                            onSelect={() => handleFocusNode(node.id)}
                            onDelete={() => onDeleteNode(node.id)}
                            onToggleLock={() => updateNodeData(node.id, { isLocked: !node.data.isLocked })}
                            onToggleVisibility={() => updateNodeData(node.id, {}, { opacity: (node.style?.opacity as number || 1) > 0 ? 0 : 1 })}
                            onDuplicate={onDuplicateNode ? () => onDuplicateNode(node.id) : undefined}
                        />
                    ))
                )}

                {filteredNodes.length === 0 && (
                    <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
                        <Layers size={16} className="text-muted-foreground/20" />
                        <span className="text-[9px] text-muted-foreground/30 uppercase tracking-wider">
                            {searchQuery ? 'No matching nodes' : 'Canvas is empty'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Individual node row in the layers list
const NodeRow: React.FC<{
    node: Node<MoodNodeData>;
    onSelect: () => void;
    onDelete: () => void;
    onToggleLock: () => void;
    onToggleVisibility: () => void;
    onDuplicate?: () => void;
}> = ({ node, onSelect, onDelete, onToggleLock, onToggleVisibility, onDuplicate }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon, colorClass, typeName, displayName } = getNodeInfo(node);
    const isHidden = (node.style?.opacity as number || 1) <= 0;
    const isSelected = node.selected;

    return (
        <div
            className={`group flex items-center gap-1.5 px-2 py-1 cursor-pointer transition-all duration-100 border-b border-border/5 ${isSelected
                ? 'bg-primary/10 border-l-2 border-l-primary'
                : 'hover:bg-muted/10 border-l-2 border-l-transparent'
                } ${isHidden ? 'opacity-30' : ''}`}
            onClick={onSelect}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Type indicator dot */}
            <div className={`w-2 h-2 shrink-0 ${colorClass}`} />

            {/* Icon */}
            {Icon && <Icon size={11} className={`shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground/40'}`} />}

            {/* Name + type */}
            <div className="flex-1 min-w-0 flex flex-col">
                <span className={`text-[10px] truncate leading-tight ${isSelected ? 'text-primary font-semibold' : 'text-foreground/80'}`}>
                    {displayName}
                </span>
                <span className="text-[7px] font-mono text-muted-foreground/30 uppercase tracking-wider leading-tight">
                    {typeName}
                </span>
            </div>

            {/* Actions (shown on hover or selected) */}
            <div className={`flex items-center gap-0.5 shrink-0 transition-opacity ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}>
                {onDuplicate && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
                        className="h-5 w-5 flex items-center justify-center text-muted-foreground/30 hover:text-foreground transition-colors"
                        title="Duplicate"
                    >
                        <Copy size={9} />
                    </button>
                )}
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
                    className={`h-5 w-5 flex items-center justify-center transition-colors ${isHidden ? 'text-muted-foreground/20' : 'text-muted-foreground/30 hover:text-foreground'}`}
                    title={isHidden ? 'Show' : 'Hide'}
                >
                    {isHidden ? <EyeOff size={9} /> : <Eye size={9} />}
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleLock(); }}
                    className={`h-5 w-5 flex items-center justify-center transition-colors ${node.data.isLocked ? 'text-primary/60' : 'text-muted-foreground/30 hover:text-foreground'}`}
                    title={node.data.isLocked ? 'Unlock' : 'Lock'}
                >
                    {node.data.isLocked ? <Lock size={9} /> : <Unlock size={9} />}
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="h-5 w-5 flex items-center justify-center text-muted-foreground/20 hover:text-destructive transition-colors"
                    title="Delete"
                >
                    <Trash2 size={9} />
                </button>
            </div>
        </div>
    );
};
