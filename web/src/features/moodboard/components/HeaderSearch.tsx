import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Search, Zap, Type, Save, Download, Move, MousePointer,
    LayoutGrid, ChevronRight, Check
} from 'lucide-react';
import { useNodeManager } from '@/hooks/useNodeManager';
import { WORKFLOW_TEMPLATES } from '@/features/moodboard/WorkflowSequences';
import { Button } from '@/components/ui';

// Simple class merger since @/lib/utils is missing in this project structure
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface HeaderSearchProps {
    onAddNode: (type: string) => void;
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

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
    onAddNode,
    onInjectTemplate,
    activeTool,
    setActiveTool,
    onSave,
    onExport,
    onToggleZenMode
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { allNodes } = useNodeManager();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
        if (!query) return items.slice(0, 8);
        const lowerQuery = query.toLowerCase();
        return items.filter(item =>
            item.label.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery) ||
            item.description?.toLowerCase().includes(lowerQuery)
        ).slice(0, 15);
    }, [query, items]);

    // Reset selection on query change
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
            }
            return;
        }

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
                setIsOpen(false);
                setQuery('');
                inputRef.current?.blur();
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div className="relative group">
                <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isOpen || query ? 'text-primary' : 'text-muted-foreground/50 group-hover:text-muted-foreground'}`} />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Brand OS..."
                    className={cn(
                        "h-8 border border-border/20 rounded-md pl-9 pr-12 text-[11px] font-mono tracking-wide transition-all outline-none",
                        "placeholder:text-muted-foreground/50 hover:bg-muted/20 hover:text-foreground focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
                        (isOpen || query) ? "w-80 border-primary/40 bg-background" : "w-64 bg-muted/10 text-muted-foreground"
                    )}
                />
                <div className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-opacity ${isOpen || query ? 'opacity-0 pointer-events-none' : 'opacity-50'}`}>
                    <kbd className="h-4 px-1 rounded bg-muted/20 border border-border/20 text-[9px]">Ctrl</kbd>
                    <kbd className="h-4 px-1 rounded bg-muted/20 border border-border/20 text-[9px]">K</kbd>
                </div>
            </div>

            {/* Results Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-md overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 z-50 flex flex-col max-h-[60vh] w-[400px]">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                        {filteredItems.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground/50">
                                <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                <p className="text-[10px]">No results found.</p>
                            </div>
                        ) : (
                            <div className="space-y-0.5">
                                {filteredItems.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            item.action();
                                            setIsOpen(false);
                                            setQuery('');
                                            inputRef.current?.blur();
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-colors text-left group",
                                            index === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 text-foreground'
                                        )}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <div className={cn(
                                            "flex items-center justify-center w-6 h-6 rounded-sm transition-colors",
                                            index === selectedIndex ? 'bg-primary/20' : 'bg-muted/30 text-muted-foreground group-hover:text-foreground'
                                        )}>
                                            <item.icon size={12} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-medium truncate">{item.label}</span>
                                                <span className={cn(
                                                    "text-[8px] px-1 py-0 rounded-[2px] uppercase font-black tracking-wider opacity-60",
                                                    item.category === 'Node' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        item.category === 'Workflow' ? 'bg-blue-500/10 text-blue-500' :
                                                            item.category === 'Action' ? 'bg-rose-500/10 text-rose-500' :
                                                                'bg-slate-500/10 text-slate-500'
                                                )}>
                                                    {item.category}
                                                </span>
                                            </div>
                                            {item.description && (
                                                <p className="text-[9px] text-muted-foreground truncate opacity-70 leading-tight">{item.description}</p>
                                            )}
                                        </div>

                                        {item.shortcut && (
                                            <div className="text-[9px] text-muted-foreground font-mono bg-muted/30 px-1 py-0 rounded border border-border/20">
                                                {item.shortcut}
                                            </div>
                                        )}

                                        {index === selectedIndex && (
                                            <ChevronRight size={12} className="text-primary animate-in slide-in-from-left-1" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="px-3 py-1.5 bg-muted/20 border-t border-border/40 flex justify-between items-center text-[9px] text-muted-foreground">
                        <div className="flex gap-2 font-mono">
                            <span><strong className="text-foreground">↑↓</strong> nav</span>
                            <span><strong className="text-foreground">↵</strong> exec</span>
                        </div>
                        <div className="font-mono opacity-50">
                            {filteredItems.length} results
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
