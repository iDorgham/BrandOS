import React, { useState, useMemo } from 'react';
import { Card, Button, Input, EmptyState } from '@/components/ui';
import { Sparkles, Download, Check, ExternalLink, Box, Search, Filter } from 'lucide-react';
import { useNodeManager } from '@/hooks/useNodeManager';
import { NodeCategory } from '@/features/moodboard/NodeRegistry';
import { useDebounce } from '@/hooks/useDebounce';

export const NodesMarketView = () => {
    const { allNodes, isInstalled, installNode, uninstallNode } = useNodeManager();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<NodeCategory | 'All'>('All');

    // Debounce search query to optimize filtering
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const categories: NodeCategory[] = ['Foundation', 'Orchestration', 'Generative', 'Utility', 'External'];

    const filteredNodes = useMemo(() => {
        return allNodes.filter(node => {
            const matchesSearch = node.label.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                node.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            const matchesFilter = activeFilter === 'All' || node.category.toLowerCase() === activeFilter.toLowerCase();
            return matchesSearch && matchesFilter;
        });
    }, [allNodes, debouncedSearchQuery, activeFilter]);

    const groupedNodes = useMemo(() => {
        const groups: Record<string, typeof allNodes> = {};
        filteredNodes.forEach(node => {
            if (!groups[node.category]) groups[node.category] = [];
            groups[node.category].push(node);
        });
        return groups;
    }, [filteredNodes]);

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-2">
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-xl font-display font-black tracking-tighter">Modules Manager</h2>
                    <p className="text-muted-foreground text-[10px] font-medium opacity-60">Expand your Moodboard capabilities with specialized logic and generative modules.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Find modules..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-card border-border h-9 text-xs shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pb-3 border-b border-border/50">
                <button
                    onClick={() => setActiveFilter('All')}
                    className={`
                        px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all
                        ${activeFilter === 'All'
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted/10 text-muted-foreground border-transparent hover:bg-card hover:border-border'
                        }
                    `}
                >
                    All Modules
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`
                            px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all
                            ${activeFilter === cat
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted/10 text-muted-foreground border-transparent hover:bg-card hover:border-border'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="space-y-8">
                {Object.entries(groupedNodes).map(([category, nodes]) => (
                    <div key={category} className="space-y-3">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 pl-1">
                            <Box size={14} /> {category} Modules <span className="text-primary/40">•</span> {nodes.length}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {nodes.map((node) => {
                                const installed = isInstalled(node.id);
                                return (
                                    <div
                                        key={node.id}
                                        className={`
                                            group relative rounded-xl border transition-all duration-300 flex flex-col h-full overflow-hidden
                                            ${installed
                                                ? 'bg-card border-border/60 shadow-sm'
                                                : 'bg-muted/5 border-transparent hover:bg-card hover:border-border hover:shadow-md'
                                            }
                                        `}
                                    >
                                        <div className={`h-1.5 w-full bg-opacity-80 transition-opacity duration-300 ${node.defaultColor}`} />
                                        <div className="p-4 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className={`p-2 rounded-lg ${node.defaultColor} bg-opacity-10 text-${node.defaultColor.replace('bg-', '')}`}>
                                                    <node.icon size={16} />
                                                </div>
                                                {node.isCore ? (
                                                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 bg-foreground/5 px-1.5 py-0.5 rounded-sm">Core</span>
                                                ) : (
                                                    <span className={`text-[9px] font-mono opacity-60 ${node.cost ? 'text-amber-500 font-bold' : ''}`}>
                                                        {node.cost ? `${node.cost} Credits` : 'Free'}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-1 mb-4 flex-1">
                                                <h4 className="font-bold text-xs tracking-tight text-foreground">{node.label}</h4>
                                                <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">{node.description}</p>
                                            </div>

                                            <div className="mt-auto pt-3 border-t border-border/30">
                                                {installed ? (
                                                    node.isCore ? (
                                                        <Button disabled variant="ghost" size="sm" className="w-full justify-start gap-2 h-7 text-[10px] bg-muted/20 opacity-50 cursor-not-allowed px-0 pl-2">
                                                            <Check size={12} /> Installed
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => uninstallNode(node.id)}
                                                            className="w-full justify-between h-7 text-[10px] group-hover:bg-destructive/10 group-hover:text-destructive group-hover:border-destructive/20 transition-all border-transparent"
                                                        >
                                                            <span className="flex items-center gap-1.5"><Check size={12} /> Installed</span>
                                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Uninstall</span>
                                                        </Button>
                                                    )
                                                ) : (
                                                    <Button
                                                        onClick={() => installNode(node.id)}
                                                        size="sm"
                                                        className="w-full gap-2 h-7 text-[10px] shadow-sm"
                                                    >
                                                        <Download size={12} /> Install
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {filteredNodes.length === 0 && (
                <EmptyState
                    icon={Search}
                    title="No Modules Found"
                    description={`We couldn't find any modules matching "${searchQuery}". Try adjusting your filters.`}
                    actionLabel="Clear Search"
                    onAction={() => setSearchQuery('')}
                />
            )}
        </div>
    );
};
