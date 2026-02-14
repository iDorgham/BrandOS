import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Node } from '@xyflow/react';
import {
    Maximize2, Minimize2, AlignLeft, AlignCenter, AlignRight,
    AlignVerticalJustifyStart as AlignTop, AlignVerticalJustifyCenter as AlignMiddle,
    AlignVerticalJustifyEnd as AlignBottom, Unlock, Lock, Edit3, Power, Copy, Trash2,
    Group, Ungroup, ChevronsUpDown, Eye, EyeOff, ArrowUpToLine, ArrowDownToLine
} from 'lucide-react';
import { toast } from 'sonner';
import { MoodNodeData, NodeGroup } from '../types';
import { generateId } from '@/utils';
import { NODE_REGISTRY } from '../NodeRegistry';

interface MoodBoardContextMenuProps {
    contextMenu: { id: string; x: number; y: number } | null;
    setContextMenu: (menu: { id: string; x: number; y: number } | null) => void;
    nodes: Node<MoodNodeData>[];
    setNodes: React.Dispatch<React.SetStateAction<Node<MoodNodeData>[]>>;
    updateNodeData: (id: string, data: Partial<MoodNodeData>) => void;
    onNodesDelete: (nodes: Node<MoodNodeData>[]) => void;
    onAlignNodes: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
    groups?: NodeGroup[];
    onCreateGroup?: (nodeIds: string[], name?: string) => void;
    onUngroupNodes?: (groupId: string) => void;
    onToggleCollapse?: (groupId: string) => void;
    onUpdateGroup?: (groupId: string, updates: Partial<NodeGroup>) => void;
}

// Inline rename input
const InlineRename: React.FC<{
    initialValue: string;
    onConfirm: (value: string) => void;
    onCancel: () => void;
}> = ({ initialValue, onConfirm, onCancel }) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.select();
    }, []);

    return (
        <div className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onConfirm(value);
                    if (e.key === 'Escape') onCancel();
                }}
                onBlur={() => onConfirm(value)}
                className="w-full h-7 bg-muted/20 border border-primary/40 px-2 text-[11px] font-mono text-foreground outline-none"
                autoFocus
            />
        </div>
    );
};

// Menu item component
const MenuItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    shortcut?: string;
    onClick: () => void;
    variant?: 'default' | 'danger';
    disabled?: boolean;
}> = ({ icon, label, shortcut, onClick, variant = 'default', disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full flex items-center gap-2.5 px-3 py-1.5 transition-colors text-[11px] ${
            disabled ? 'opacity-30 pointer-events-none' :
            variant === 'danger'
                ? 'text-destructive/80 hover:bg-destructive/10 hover:text-destructive'
                : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
        }`}
    >
        <span className="w-4 h-4 flex items-center justify-center shrink-0">{icon}</span>
        <span className="flex-1 text-left">{label}</span>
        {shortcut && (
            <span className="text-[9px] font-mono text-muted-foreground/40 ml-auto">{shortcut}</span>
        )}
    </button>
);

const MenuDivider = () => <div className="h-px bg-border/20 my-1" />;

const MenuSection: React.FC<{ label: string }> = ({ label }) => (
    <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-[0.15em]">
        {label}
    </div>
);

export const MoodBoardContextMenu: React.FC<MoodBoardContextMenuProps> = ({
    contextMenu,
    setContextMenu,
    nodes,
    setNodes,
    updateNodeData,
    onNodesDelete,
    onAlignNodes,
    groups = [],
    onCreateGroup,
    onUngroupNodes,
    onToggleCollapse,
    onUpdateGroup,
}) => {
    const [renameMode, setRenameMode] = useState<'node' | 'group' | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
        setContextMenu(null);
        setRenameMode(null);
    }, [setContextMenu]);

    // Close on click outside
    useEffect(() => {
        if (!contextMenu) return;
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
                close();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [contextMenu, close]);

    // Close on Escape
    useEffect(() => {
        if (!contextMenu) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [contextMenu, close]);

    if (!contextMenu) return null;

    const targetNode = nodes.find(n => n.id === contextMenu.id);
    const selectedNodes = nodes.filter(n => n.selected);
    const multiSelect = selectedNodes.length > 1;
    const isLocked = targetNode?.data.isLocked;
    const isHidden = (targetNode?.style?.opacity as number || 1) <= 0;
    const isActive = targetNode?.data.isActive !== false;
    const nodeGroupId = targetNode?.data.groupId as string | undefined;
    const group = nodeGroupId ? groups.find(g => g.id === nodeGroupId) : undefined;

    // Get node display info
    const registryEntry = NODE_REGISTRY.find(r => r.id === targetNode?.type);
    const nodeLabel = targetNode?.data.label || registryEntry?.label || targetNode?.type || 'Node';

    // Clamp menu to viewport
    const menuStyle: React.CSSProperties = {
        top: Math.min(contextMenu.y, window.innerHeight - 400),
        left: Math.min(contextMenu.x, window.innerWidth - 220),
    };

    return (
        <div
            ref={menuRef}
            className="fixed z-[1000] bg-popover/98 backdrop-blur-xl border border-border/40 min-w-[200px] py-1 animate-in fade-in zoom-in-95 duration-150 origin-top-left"
            style={menuStyle}
        >
            {/* Node identity header */}
            <div className="px-3 py-1.5 flex items-center gap-2 border-b border-border/20 mb-1">
                {registryEntry?.icon && (
                    <registryEntry.icon size={12} className="text-primary shrink-0" />
                )}
                <span className="text-[10px] font-bold text-foreground/80 truncate">{nodeLabel}</span>
                {multiSelect && (
                    <span className="text-[8px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 ml-auto shrink-0">
                        {selectedNodes.length} selected
                    </span>
                )}
            </div>

            {/* Rename (inline) */}
            {renameMode === 'node' && targetNode ? (
                <InlineRename
                    initialValue={targetNode.data.label || ''}
                    onConfirm={(val) => {
                        if (val.trim()) updateNodeData(targetNode.id, { label: val.trim() });
                        setRenameMode(null);
                    }}
                    onCancel={() => setRenameMode(null)}
                />
            ) : renameMode === 'group' && group ? (
                <InlineRename
                    initialValue={group.name}
                    onConfirm={(val) => {
                        if (val.trim()) onUpdateGroup?.(group.id, { name: val.trim() });
                        setRenameMode(null);
                    }}
                    onCancel={() => setRenameMode(null)}
                />
            ) : (
                <>
                    {/* Edit */}
                    <MenuItem
                        icon={<Edit3 size={12} />}
                        label="Rename"
                        shortcut="F2"
                        onClick={() => setRenameMode('node')}
                    />

                    <MenuItem
                        icon={<Copy size={12} />}
                        label="Duplicate"
                        shortcut="Ctrl+D"
                        onClick={() => {
                            if (targetNode) {
                                const newNode: Node<MoodNodeData> = {
                                    ...targetNode,
                                    id: generateId(),
                                    position: { x: targetNode.position.x + 30, y: targetNode.position.y + 30 },
                                    selected: true,
                                };
                                setNodes((nds) => [...nds.map(n => ({ ...n, selected: false })), newNode]);
                                toast.success('Duplicated');
                            }
                            close();
                        }}
                    />

                    <MenuDivider />

                    {/* Layering */}
                    <MenuSection label="Layer" />
                    <MenuItem
                        icon={<ArrowUpToLine size={12} />}
                        label="Bring to Front"
                        shortcut="]"
                        onClick={() => {
                            setNodes((nds) => {
                                const maxZ = Math.max(...nds.map((n) => n.zIndex || 0));
                                return nds.map((n) => n.id === contextMenu.id ? { ...n, zIndex: maxZ + 1 } : n);
                            });
                            close();
                        }}
                    />
                    <MenuItem
                        icon={<ArrowDownToLine size={12} />}
                        label="Send to Back"
                        shortcut="["
                        onClick={() => {
                            setNodes((nds) => {
                                const minZ = Math.min(...nds.map((n) => n.zIndex || 0));
                                return nds.map((n) => n.id === contextMenu.id ? { ...n, zIndex: minZ - 1 } : n);
                            });
                            close();
                        }}
                    />

                    <MenuItem
                        icon={isLocked ? <Unlock size={12} /> : <Lock size={12} />}
                        label={isLocked ? 'Unlock' : 'Lock'}
                        shortcut="Ctrl+L"
                        onClick={() => {
                            if (targetNode) {
                                const newLocked = !isLocked;
                                setNodes((nds) =>
                                    nds.map((n) => n.id === contextMenu.id
                                        ? { ...n, draggable: !newLocked, selectable: true, data: { ...n.data, isLocked: newLocked } }
                                        : n
                                    )
                                );
                                toast.info(newLocked ? 'Locked' : 'Unlocked');
                            }
                            close();
                        }}
                    />

                    <MenuItem
                        icon={isHidden ? <Eye size={12} /> : <EyeOff size={12} />}
                        label={isHidden ? 'Show' : 'Hide'}
                        onClick={() => {
                            if (targetNode) {
                                setNodes((nds) =>
                                    nds.map((n) => n.id === contextMenu.id
                                        ? { ...n, style: { ...n.style, opacity: isHidden ? 1 : 0 } }
                                        : n
                                    )
                                );
                            }
                            close();
                        }}
                    />

                    <MenuItem
                        icon={<Power size={12} className={isActive ? 'text-emerald-500' : 'text-rose-500'} />}
                        label={isActive ? 'Disable' : 'Enable'}
                        onClick={() => {
                            if (targetNode) {
                                updateNodeData(targetNode.id, { isActive: !isActive });
                            }
                            close();
                        }}
                    />

                    {/* Alignment (multi-select only) */}
                    {multiSelect && (
                        <>
                            <MenuDivider />
                            <MenuSection label="Align" />
                            <div className="grid grid-cols-6 gap-0.5 px-3 py-1.5">
                                {[
                                    { dir: 'left' as const, icon: AlignLeft, title: 'Left' },
                                    { dir: 'center' as const, icon: AlignCenter, title: 'Center H' },
                                    { dir: 'right' as const, icon: AlignRight, title: 'Right' },
                                    { dir: 'top' as const, icon: AlignTop, title: 'Top' },
                                    { dir: 'middle' as const, icon: AlignMiddle, title: 'Middle V' },
                                    { dir: 'bottom' as const, icon: AlignBottom, title: 'Bottom' },
                                ].map(a => (
                                    <button
                                        key={a.dir}
                                        onClick={() => { onAlignNodes(a.dir); close(); }}
                                        className="h-7 flex items-center justify-center text-muted-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                                        title={a.title}
                                    >
                                        <a.icon size={12} />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Grouping */}
                    {multiSelect && onCreateGroup && (
                        <>
                            <MenuDivider />
                            <MenuItem
                                icon={<Group size={12} />}
                                label="Group Selected"
                                shortcut="Ctrl+G"
                                onClick={() => {
                                    const selectedIds = selectedNodes.map(n => n.id);
                                    onCreateGroup(selectedIds);
                                    close();
                                }}
                            />
                        </>
                    )}

                    {group && (
                        <>
                            <MenuDivider />
                            <MenuSection label={`Group: ${group.name}`} />
                            {onUngroupNodes && (
                                <MenuItem
                                    icon={<Ungroup size={12} />}
                                    label="Ungroup"
                                    onClick={() => { onUngroupNodes(group.id); close(); }}
                                />
                            )}
                            {onToggleCollapse && (
                                <MenuItem
                                    icon={<ChevronsUpDown size={12} />}
                                    label={group.isCollapsed ? 'Expand' : 'Collapse'}
                                    onClick={() => { onToggleCollapse(group.id); close(); }}
                                />
                            )}
                            {onUpdateGroup && (
                                <MenuItem
                                    icon={<Edit3 size={12} />}
                                    label="Rename Group"
                                    onClick={() => setRenameMode('group')}
                                />
                            )}
                        </>
                    )}

                    {/* Color override */}
                    <MenuDivider />
                    <MenuSection label="Color" />
                    <div className="flex items-center gap-2 px-3 py-1.5">
                        {[
                            { id: 'blue', color: 'bg-blue-600' },
                            { id: 'amber', color: 'bg-amber-500' },
                            { id: 'emerald', color: 'bg-emerald-600' },
                            { id: 'fuchsia', color: 'bg-fuchsia-600' },
                            { id: 'slate', color: 'bg-slate-500' },
                        ].map(c => (
                            <button
                                key={c.id}
                                onClick={() => {
                                    if (targetNode) updateNodeData(targetNode.id, { customColor: c.color });
                                    close();
                                }}
                                className={`w-5 h-5 ${c.color} border border-white/10 hover:scale-125 transition-transform cursor-pointer`}
                            />
                        ))}
                        <button
                            onClick={() => {
                                if (targetNode) updateNodeData(targetNode.id, { customColor: undefined });
                                close();
                            }}
                            className="w-5 h-5 border border-border/40 hover:border-foreground/40 transition-colors flex items-center justify-center text-[8px] text-muted-foreground/40 hover:text-foreground"
                            title="Reset color"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Delete */}
                    <MenuDivider />
                    <MenuItem
                        icon={<Trash2 size={12} />}
                        label={multiSelect ? `Delete ${selectedNodes.length} nodes` : 'Delete'}
                        shortcut="Del"
                        variant="danger"
                        onClick={() => {
                            if (multiSelect) {
                                onNodesDelete(selectedNodes);
                            } else if (targetNode) {
                                onNodesDelete([targetNode]);
                            }
                            close();
                        }}
                    />
                </>
            )}
        </div>
    );
};
