import React, { useState, useMemo, useCallback } from 'react';
import { Card, Button, Input, EmptyState } from '@/components/ui';
import { Sparkles, Download, Check, ExternalLink, Box, Search, Filter, Trash2 } from 'lucide-react';
import { useNodeManager } from '@/hooks/useNodeManager';
import { NodeCategory } from '@/features/moodboard/NodeRegistry';
import { useDebounce } from '@/hooks/useDebounce';

export const ModulesMarketView = () => {
    const { allNodes, isInstalled, installNode, uninstallNode } = useNodeManager();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<NodeCategory | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Installed' | 'Available'>('All');
    const [sortBy, setSortBy] = useState<'label' | 'newest'>('label');
    const [loadingNodes, setLoadingNodes] = useState<Record<string, boolean>>({});
    const [isAnyActionLoading, setIsAnyActionLoading] = useState(false);

    // Debounce search query to optimize filtering
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const categories: NodeCategory[] = ['Foundation', 'Orchestration', 'Generative', 'Utility', 'External'];

    const handleNodeAction = useCallback(async (nodeId: string, action: 'install' | 'uninstall') => {
        setLoadingNodes(prev => ({ ...prev, [nodeId]: true }));
        setIsAnyActionLoading(true);

        // Refined simulation of a server-side registration delay
        await new Promise(resolve => setTimeout(resolve, 600));

        if (action === 'install') {
            installNode(nodeId);
        } else {
            uninstallNode(nodeId);
        }

        setLoadingNodes(prev => ({ ...prev, [nodeId]: false }));
        setIsAnyActionLoading(false);
    }, [installNode, uninstallNode]);

    const filteredNodes = useMemo(() => {
        let nodes = allNodes.filter(node => {
            const matchesSearch = node.label.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                node.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            const matchesFilter = activeFilter === 'All' || node.category.toLowerCase() === activeFilter.toLowerCase();

            let matchesStatus = true;
            if (statusFilter === 'Installed') matchesStatus = isInstalled(node.id);
            if (statusFilter === 'Available') matchesStatus = !isInstalled(node.id);

            return matchesSearch && matchesFilter && matchesStatus;
        });

        // Sorting
        return nodes.sort((a, b) => {
            if (sortBy === 'label') return a.label.localeCompare(b.label);
            return 0; // Default or extend for dates if added to registry
        });
    }, [allNodes, debouncedSearchQuery, activeFilter, statusFilter, sortBy, isInstalled]);

    const groupedNodes = useMemo(() => {
        const groups: Record<string, typeof allNodes> = {};
        filteredNodes.forEach(node => {
            if (!groups[node.category]) groups[node.category] = [];
            groups[node.category].push(node);
        });
        return groups;
    }, [filteredNodes]);

    return (
        <div className="flex h-full animate-in fade-in duration-500 overflow-hidden bg-background">
            {/* Carbon SideNav: Deep Filters */}
            <div className="w-72 bg-card border-r border-border/40 flex flex-col pt-8">
                <div className="px-6 mb-4">
                    <div className="text-[12px] font-black text-foreground uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                        <Filter size={14} className="text-primary" /> Logic_Filters
                    </div>

                    <div className="relative mb-8">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                        <Input
                            placeholder="SEARCH SYSTEM MODULES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 pl-10 bg-muted/20 border-border/20 focus:border-primary/40 text-[10px] uppercase font-mono tracking-widest rounded-none shadow-none placeholder:text-muted-foreground/20"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-8">
                    {/* Status Filter Section */}
                    <div className="space-y-2">
                        <div className="px-3 py-1 text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.25em]">Registry_Status</div>
                        {(['All', 'Installed', 'Available'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`
                                    w-full px-4 py-3 flex items-center justify-between transition-all group border-l-2
                                    ${statusFilter === status
                                        ? 'bg-primary/5 text-primary border-primary font-bold'
                                        : 'text-muted-foreground/60 border-transparent hover:bg-muted/10 hover:text-foreground'}
                                `}
                            >
                                <span className="text-[11px] font-mono uppercase tracking-widest">{status}</span>
                                {statusFilter === status && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                            </button>
                        ))}
                    </div>

                    {/* Category Filter Section */}
                    <div className="space-y-2">
                        <div className="px-3 py-1 text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.25em]">Functional_DNA</div>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className={`
                                w-full px-4 py-3 flex items-center justify-between transition-all group border-l-2
                                ${activeFilter === 'All'
                                    ? 'bg-primary/5 text-primary border-primary font-bold'
                                    : 'text-muted-foreground/60 border-transparent hover:bg-muted/10 hover:text-foreground'}
                            `}
                        >
                            <span className="text-[11px] font-mono uppercase tracking-widest">All_Modules</span>
                            {activeFilter === 'All' && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`
                                    w-full px-4 py-3 flex items-center justify-between transition-all group border-l-2
                                    ${activeFilter === cat
                                        ? 'bg-primary/5 text-primary border-primary font-bold'
                                        : 'text-muted-foreground/60 border-transparent hover:bg-muted/10 hover:text-foreground'}
                                `}
                            >
                                <span className="text-[11px] font-mono uppercase tracking-widest">{cat}</span>
                                {activeFilter === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                            </button>
                        ))}
                    </div>

                    {/* Sort Section */}
                    <div className="space-y-2">
                        <div className="px-3 py-1 text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.25em]">Sequence_Order</div>
                        <button
                            onClick={() => setSortBy('label')}
                            className={`
                                w-full px-4 py-3 flex items-center justify-between transition-all group border-l-2
                                ${sortBy === 'label'
                                    ? 'bg-primary/5 text-primary border-primary font-bold'
                                    : 'text-muted-foreground/60 border-transparent hover:bg-muted/10 hover:text-foreground'}
                            `}
                        >
                            <span className="text-[11px] font-mono uppercase tracking-widest">Descriptor (A-Z)</span>
                            {sortBy === 'label' && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                        </button>
                    </div>
                </div>

                <div className="p-6 border-t border-border/40 bg-card">
                    <div className="flex items-center gap-3 text-muted-foreground/40 mb-2">
                        <Box size={12} />
                        <span className="text-[9px] font-mono tracking-widest uppercase truncate letter-spacing-widest">Registry_Protocol_v1.0</span>
                    </div>
                </div>
            </div>

            {/* Content: Carbon Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-background relative">
                {/* Refined Carbon Progress Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] z-50 overflow-hidden transition-opacity duration-300 ${isAnyActionLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-full bg-primary animate-progress-indeterminate origin-left" />
                </div>

                <div className="p-10 max-w-[1600px] mx-auto">
                    {filteredNodes.length === 0 ? (
                        <div className="h-[60vh] flex flex-col items-center justify-center border border-border/20 border-dashed bg-muted/5">
                            <Search size={48} className="text-muted-foreground/20 mb-6" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 mb-2">Null_Result_Set</h3>
                            <p className="text-[11px] text-muted-foreground/30 uppercase tracking-widest font-mono">No logical modules matched the current trajectory.</p>
                            <Button
                                variant="ghost"
                                onClick={() => { setSearchQuery(''); setStatusFilter('All'); setActiveFilter('All'); }}
                                className="mt-8 text-[10px] uppercase tracking-widest border border-border/40 text-muted-foreground/60 hover:text-foreground"
                            >
                                Reset_Query
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {Object.entries(groupedNodes).map(([category, nodes]) => (
                                <section key={category} className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-2 h-6 bg-primary" />
                                        <h3 className="text-[13px] font-black uppercase tracking-[0.35em] text-foreground">
                                            {category}
                                        </h3>
                                        <div className="h-[1px] flex-1 bg-border/20" />
                                        <div className="px-3 py-1 border border-border/20 text-[10px] font-mono text-muted-foreground/40 font-bold bg-muted/5">
                                            CNT::{nodes.length.toString().padStart(2, '0')}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                        {nodes.map((node) => {
                                            const installed = isInstalled(node.id);
                                            const isLoading = loadingNodes[node.id];
                                            return (
                                                <div
                                                    key={node.id}
                                                    className="group relative flex flex-col bg-card border border-border/40 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] overflow-hidden"
                                                >
                                                    {/* Color Bar */}
                                                    <div className={`h-[4px] w-full ${node.defaultColor} opacity-70 group-hover:opacity-100 transition-opacity`} />

                                                    {/* Corner Accents */}
                                                    <div className="absolute top-[4px] left-0 w-3 h-3 border-t border-l border-primary/0 group-hover:border-primary/40 transition-all duration-300" />
                                                    <div className="absolute top-[4px] right-0 w-3 h-3 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all duration-300" />
                                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/0 group-hover:border-primary/40 transition-all duration-300" />
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/0 group-hover:border-primary/40 transition-all duration-300" />

                                                    <div className="p-6 flex-1 flex flex-col">
                                                        <div className="flex justify-between items-start mb-8">
                                                            <div className={`w-12 h-12 flex items-center justify-center bg-muted/20 border border-border/20 text-foreground group-hover:border-primary/40 group-hover:text-primary transition-all duration-300 shadow-inner`}>
                                                                <node.icon size={22} strokeWidth={1.5} />
                                                            </div>
                                                            <div className="flex flex-col items-end gap-1.5 pt-1">
                                                                {node.isCore ? (
                                                                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/20">System_Core</span>
                                                                ) : (
                                                                    <span className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest border border-border/20 px-2 py-0.5 bg-muted/5">
                                                                        {node.cost ? `CR::${node.cost}` : 'STD::00'}
                                                                    </span>
                                                                )}
                                                                {installed && (
                                                                    <div className="flex items-center gap-1.5 text-[7px] font-black uppercase tracking-[0.25em] text-primary mt-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20">
                                                                        <div className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                                                                        Online
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3 mb-8 flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="font-bold text-[12px] uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">{node.label}</h4>
                                                                <div className="h-[1px] flex-1 bg-border/10 group-hover:bg-primary/10 transition-colors" />
                                                            </div>
                                                            <p className="text-[11px] text-muted-foreground leading-relaxed font-normal tracking-tight line-clamp-3 group-hover:text-foreground transition-colors opacity-60 group-hover:opacity-100">
                                                                {node.description}
                                                            </p>
                                                        </div>

                                                        <div className="mt-auto pt-5 border-t border-border/10 group-hover:border-primary/10 transition-colors flex flex-col gap-4">
                                                            {/* Technical Footer Metas */}
                                                            <div className="flex items-center justify-between opacity-30 group-hover:opacity-60 transition-opacity">
                                                                <span className="text-[7px] font-mono uppercase tracking-widest text-muted-foreground">
                                                                    ID::{node.id.substring(0, 8).toUpperCase()}
                                                                </span>
                                                                <span className="text-[7px] font-mono uppercase tracking-widest text-muted-foreground">
                                                                    VER::1.0.42
                                                                </span>
                                                            </div>

                                                            {installed ? (
                                                                node.isCore ? (
                                                                    <div className="w-full flex items-center justify-between px-4 h-10 bg-muted/20 border border-transparent opacity-40 cursor-not-allowed">
                                                                        <span className="text-[9px] font-bold uppercase tracking-widest text-foreground">Immutable</span>
                                                                        <Check size={12} className="text-foreground" />
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        variant="ghost"
                                                                        onClick={() => handleNodeAction(node.id, 'uninstall')}
                                                                        disabled={isLoading}
                                                                        className="w-full h-10 text-[10px] font-black uppercase tracking-widest bg-transparent border border-border/40 text-muted-foreground/60 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/40 transition-all rounded-none disabled:opacity-50"
                                                                    >
                                                                        {isLoading ? 'DEPROVISIONING...' : (
                                                                            <span className="flex items-center gap-2">
                                                                                <Trash2 size={12} /> Remove
                                                                            </span>
                                                                        )}
                                                                    </Button>
                                                                )
                                                            ) : (
                                                                <Button
                                                                    onClick={() => handleNodeAction(node.id, 'install')}
                                                                    disabled={isLoading}
                                                                    className="w-full h-10 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground rounded-none border-transparent transition-all shadow-md active:scale-[0.98] disabled:opacity-80 group/btn"
                                                                >
                                                                    {isLoading ? (
                                                                        <>PROVISIONING...</>
                                                                    ) : (
                                                                        <>
                                                                            <Download size={14} className="mr-2 group-hover/btn:-translate-y-0.5 transition-transform" /> Install
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};
