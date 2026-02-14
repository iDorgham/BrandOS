import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Command, Zap, Box, Type, Image as ImageIcon,
    Settings, Save, Download, Trash2, Move, MousePointer,
    LayoutGrid, ChevronRight, X
} from 'lucide-react';
import { useNodeManager } from '@/hooks/useNodeManager';
import { MoodNodeDefinition } from '@/features/moodboard/NodeRegistry';
import { WORKFLOW_TEMPLATES } from '@/features/moodboard/WorkflowSequences';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    onAddNode: (type: string, position?: { x: number, y: number }) => void;
    onInjectTemplate: (templateId: string) => void;
    activeTool: string;
    setActiveTool: (tool: any) => void;
    onSave: () => void;
    onExport: () => void;
    onToggleZenMode: () => void;
}

type CommandItem = {
    id: string;
    label: string;
    category: 'Node' | 'Workflow' | 'Tool' | 'Action';
    icon: any;
    action: () => void;
    shortcut?: string;
    description?: string;
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
    isOpen,
    onClose,
    onAddNode,
    onInjectTemplate,
    activeTool,
    setActiveTool,
    onSave,
    onExport,
    onToggleZenMode
}) => {
    const [query, setQuery] = useState('');
    const { allNodes } = useNodeManager();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Group items for display
    const items: CommandItem[] = useMemo(() => {
        const list: CommandItem[] = [];

        // 1. Actions & Tools (High Priority)
        list.push({ id: 'save', label: 'Save Board', category: 'Action', icon: Save, action: onSave, shortcut: 'Ctrl+S' });
        list.push({ id: 'export', label: 'Export JSON', category: 'Action', icon: Download, action: onExport });
        list.push({ id: 'zen', label: 'Toggle Zen Mode', category: 'Action', icon: LayoutGrid, action: onToggleZenMode, shortcut: 'Z' });

        list.push({ id: 'tool_pointer', label: 'Pointer Tool', category: 'Tool', icon: MousePointer, action: () => setActiveTool('pointer'), shortcut: 'V' });
        list.push({ id: 'tool_hand', label: 'Hand Tool', category: 'Tool', icon: Move, action: () => setActiveTool('hand'), shortcut: 'H' });
        list.push({ id: 'tool_text', label: 'Text Tool', category: 'Tool', icon: Type, action: () => setActiveTool('text'), shortcut: 'T' });

        // 2. Nodes
        allNodes.forEach(node => {
            list.push({
                id: `node_${node.id}`,
                label: node.label,
                category: 'Node',
                icon: node.icon,
                description: node.description,
                action: () => onAddNode(node.id)
            });
        });

        // 3. Workflows
        WORKFLOW_TEMPLATES.forEach(tmpl => {
            list.push({
                id: `flow_${tmpl.id}`,
                label: tmpl.label,
                category: 'Workflow',
                icon: Zap,
                description: tmpl.description,
                action: () => onInjectTemplate(tmpl.id)
            });
        });

        return list;
    }, [allNodes, onSave, onExport, onToggleZenMode, setActiveTool, onAddNode, onInjectTemplate]);

    // Filter items
    const filteredItems = useMemo(() => {
        if (!query) return items.slice(0, 8); // Show recent/popular by default? Or just top 8
        const lowerQuery = query.toLowerCase();
        return items.filter(item =>
            item.label.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery) ||
            item.description?.toLowerCase().includes(lowerQuery)
        ).slice(0, 12);
    }, [query, items]);

    // Reset selection on query change
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    filteredItems[selectedIndex].action();
                    onClose();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredItems, selectedIndex, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />

            {/* Main Palette */}
            <div className="relative w-full max-w-2xl bg-card/90 backdrop-blur-xl border border-border/40 shadow-2xl rounded-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Search Header */}
                <div className="flex items-center px-4 py-3 border-b border-border/40 bg-muted/10">
                    <Search size={14} strokeWidth={2.5} className="text-muted-foreground mr-3" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50 h-10"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">ESC</span>
                        </kbd>
                    </div>
                </div>

                {/* Results List */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                    {filteredItems.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground/50">
                            <Command size={14} strokeWidth={2.5} className="mx-auto mb-3 opacity-20" />
                            <p className="text-sm">No results found.</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => { item.action(); onClose(); }}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-3 rounded-md transition-colors text-left
                                        ${index === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 text-foreground'}
                                    `}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className={`
                                        flex items-center justify-center w-8 h-8 rounded-sm
                                        ${index === selectedIndex ? 'bg-primary/20' : 'bg-muted/30 text-muted-foreground'}
                                    `}>
                                        <item.icon size={14} strokeWidth={2.5} />
                                    </div>


                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium truncate">{item.label}</span>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider opacity-60 ${item.category === 'Node' ? 'bg-emerald-500/10 text-emerald-500' :
                                                item.category === 'Workflow' ? 'bg-blue-500/10 text-blue-500' :
                                                    item.category === 'Action' ? 'bg-rose-500/10 text-rose-500' :
                                                        'bg-slate-500/10 text-slate-500'
                                                }`}>
                                                {item.category}
                                            </span>
                                        </div>
                                        {item.description && (
                                            <p className="text-[10px] text-muted-foreground truncate opacity-70 mt-0.5">{item.description}</p>
                                        )}
                                    </div>

                                    {item.shortcut && (
                                        <div className="text-[10px] text-muted-foreground font-mono bg-muted/30 px-1.5 py-0.5 rounded">
                                            {item.shortcut}
                                        </div>
                                    )}

                                    {index === selectedIndex && (
                                        <ChevronRight size={14} className="text-primary animate-in slide-in-from-left-1" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-muted/20 border-t border-border/40 flex justify-between items-center text-[10px] text-muted-foreground">
                    <div className="flex gap-4">
                        <span><strong className="text-foreground">↑↓</strong> to navigate</span>
                        <span><strong className="text-foreground">↵</strong> to select</span>
                    </div>
                    <div>
                        Brand OS Command Center
                    </div>
                </div>
            </div>
        </div>
    );
};
