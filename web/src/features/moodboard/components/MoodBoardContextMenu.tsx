import React from 'react';
import { Node } from '@xyflow/react';
import {
    Maximize2, Minimize2, AlignLeft, AlignCenter, AlignRight,
    AlignVerticalJustifyStart as AlignTop, AlignVerticalJustifyCenter as AlignMiddle,
    AlignVerticalJustifyEnd as AlignBottom, Unlock, Lock, Edit3, Power, Copy, Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { MoodNodeData } from '../types';
import { generateId } from '@/utils';

interface MoodBoardContextMenuProps {
    contextMenu: { id: string; x: number; y: number } | null;
    setContextMenu: (menu: { id: string; x: number; y: number } | null) => void;
    nodes: Node<MoodNodeData>[];
    setNodes: React.Dispatch<React.SetStateAction<Node<MoodNodeData>[]>>;
    updateNodeData: (id: string, data: Partial<MoodNodeData>) => void;
    onNodesDelete: (nodes: Node<MoodNodeData>[]) => void;
    onAlignNodes: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
}

export const MoodBoardContextMenu: React.FC<MoodBoardContextMenuProps> = ({
    contextMenu,
    setContextMenu,
    nodes,
    setNodes,
    updateNodeData,
    onNodesDelete,
    onAlignNodes
}) => {
    if (!contextMenu) return null;

    return (
        <div
            className="fixed z-[1000] bg-secondary border border-border rounded-sm p-1 min-w-[140px] animate-in fade-in duration-200"
            style={{ top: contextMenu.y, left: contextMenu.x }}
        >
            <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Thematic Override</div>
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/20">
                {[
                    { id: 'blue', color: 'bg-blue-600' },
                    { id: 'amber', color: 'bg-amber-500' },
                    { id: 'emerald', color: 'bg-emerald-600' },
                    { id: 'fuchsia', color: 'bg-fuchsia-600' },
                    { id: 'slate', color: 'bg-slate-500' }
                ].map(c => (
                    <button
                        key={c.id}
                        onClick={() => {
                            const node = nodes.find(n => n.id === contextMenu.id);
                            if (node) updateNodeData(node.id, { customColor: c.color });
                            setContextMenu(null);
                        }}
                        className={`w-4 h-4 rounded-full ${c.color} border border-white/10 hover:scale-125 transition-transform`}
                    />
                ))}
            </div>

            <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Layering</div>
            <button
                onClick={() => {
                    setNodes((nds) => {
                        const maxZ = Math.max(...nds.map((n) => n.zIndex || 0));
                        return nds.map((node) => {
                            if (node.id === contextMenu.id) {
                                return { ...node, zIndex: maxZ + 1 };
                            }
                            return node;
                        });
                    });
                    setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
            >
                <Maximize2 size={12} /> Bring to Front
            </button>
            <button
                onClick={() => {
                    setNodes((nds) => {
                        const minZ = Math.min(...nds.map((n) => n.zIndex || 0));
                        return nds.map((node) => {
                            if (node.id === contextMenu.id) {
                                return { ...node, zIndex: minZ - 1 };
                            }
                            return node;
                        });
                    });
                    setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
            >
                <Minimize2 size={12} /> Send to Back
            </button>

            {nodes.filter(n => n.selected).length > 1 && (
                <>
                    <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Alignment</div>
                    <div className="grid grid-cols-6 gap-1 px-3 py-2">
                        <button onClick={() => { onAlignNodes('left'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Left"><AlignLeft size={12} /></button>
                        <button onClick={() => { onAlignNodes('center'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Center"><AlignCenter size={12} /></button>
                        <button onClick={() => { onAlignNodes('right'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Right"><AlignRight size={12} /></button>
                        <button onClick={() => { onAlignNodes('top'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Top"><AlignTop size={12} /></button>
                        <button onClick={() => { onAlignNodes('middle'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Middle"><AlignMiddle size={12} /></button>
                        <button onClick={() => { onAlignNodes('bottom'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Bottom"><AlignBottom size={12} /></button>
                    </div>
                </>
            )}

            <button
                onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                        const newLocked = !node.data.isLocked;
                        setNodes((nds) =>
                            nds.map((n) => {
                                if (n.id === contextMenu.id) {
                                    return {
                                        ...n,
                                        draggable: !newLocked,
                                        selectable: true, // Always selectable so we can unlock it
                                        data: { ...n.data, isLocked: newLocked }
                                    };
                                }
                                return n;
                            })
                        );
                        toast.info(newLocked ? 'Layer Locked' : 'Layer Unlocked');
                    }
                    setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
            >
                {nodes.find(n => n.id === contextMenu.id)?.data.isLocked ? <Unlock size={12} /> : <Lock size={12} />}
                {nodes.find(n => n.id === contextMenu.id)?.data.isLocked ? "Unlock Layer" : "Lock Layer"}
            </button>
            <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Operations</div>

            <button
                onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                        const newName = prompt("Rename Module Logic:", node.data.label);
                        if (newName) updateNodeData(node.id, { label: newName });
                    }
                    setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
            >
                <Edit3 size={12} /> Rename
            </button>
            <button
                onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                        updateNodeData(node.id, { isActive: node.data.isActive === false ? true : false });
                    }
                    setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
            >
                <Power size={12} className={nodes.find(n => n.id === contextMenu.id)?.data.isActive === false ? "text-rose-500" : "text-emerald-500"} />
                {nodes.find(n => n.id === contextMenu.id)?.data.isActive === false ? "Enable System" : "Disable System"}
            </button>
            <button
                onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                        const newNode: Node<MoodNodeData> = {
                            ...node,
                            id: generateId(),
                            position: { x: node.position.x + 30, y: node.position.y + 30 },
                            selected: true,
                        };
                        setNodes((nds) => [...nds.map(n => ({ ...n, selected: false })), newNode]);
                        toast.success('System module duplicated');
                    }
                    setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
            >
                <Copy size={12} /> Duplicate
            </button>
            <button
                onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) onNodesDelete([node]);
                    setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-rose-500 hover:bg-rose-500/10 transition-colors text-[11px] font-normal"
            >
                <Trash2 size={12} /> Delete
            </button>
        </div>
    );
};
