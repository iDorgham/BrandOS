import React, { useState, useMemo, useCallback } from 'react';
import { Card, Button, Input, EmptyState } from '@/components/ui';
import { Sparkles, Download, Check, ExternalLink, Box, Search, Filter, Trash2, Loader2 } from 'lucide-react';
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

    const categories: NodeCategory[] = ['CORE', 'AI_GEN', 'SIGNAL', 'SYSTEM', 'REFINEMENT', 'EXTRAS'];

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

    // Flatten for empty check
    const sortedNodes = filteredNodes;

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
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-background relative selection:bg-primary/20">
                {/* Refined Carbon Progress Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] z-50 overflow-hidden transition-opacity duration-300 ${isAnyActionLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-full bg-primary animate-progress-indeterminate origin-left" />
                </div>

                {/* Technical Grid Background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="p-10 max-w-[1600px] mx-auto relative z-10">
                    {filteredNodes.length === 0 ? (
                        <div className="h-[60vh] flex flex-col items-center justify-center border border-border/20 border-dashed bg-muted/5 backdrop-blur-sm">
                            <Search size={48} className="text-muted-foreground/20 mb-6" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 mb-2">Null_Result_Set</h3>
                            <p className="text-[11px] text-muted-foreground/30 uppercase tracking-widest font-mono">No logical modules matched the current trajectory.</p>
                            <Button
                                variant="ghost"
                                onClick={() => { setSearchQuery(''); setStatusFilter('All'); setActiveFilter('All'); }}
                                className="mt-8 text-[10px] uppercase tracking-widest border border-border/40 text-muted-foreground/60 hover:text-foreground rounded-none"
                            >
                                Reset_Query
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {Object.entries(groupedNodes).map(([category, nodes]) => (
                                <section key={category} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex items-center gap-6">
                                        <div className="w-2 h-6 bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                                        <h3 className="text-[13px] font-black uppercase tracking-[0.35em] text-foreground">
                                            {category}
                                        </h3>
                                        <div className="h-[1px] flex-1 bg-border/20 translate-y-0.5" />
                                        <div className="px-3 py-1 border border-border/20 text-[10px] font-mono text-muted-foreground/40 font-bold bg-muted/5 backdrop-blur-xs">
                                            SEC::{category.substring(0, 3).toUpperCase()} // CNT::{nodes.length.toString().padStart(2, '0')}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                        {nodes.map((node) => {
                                            const installed = isInstalled(node.id);
                                            const isLoading = loadingNodes[node.id];
                                            return (
                                                <div
                                                    key={node.id}
                                                    className="group relative flex flex-col bg-card/40 backdrop-blur-md border border-border/40 transition-all duration-500 hover:border-primary/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden scale-100 hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    {/* Color Bar with Glow */}
                                                    <div className={`h-[5px] w-full ${node.defaultColor} opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]`} />

                                                    {/* Corner Tech Accents */}
                                                    <div className="absolute top-[5px] left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                                                    <div className="absolute top-[5px] right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />

                                                    <div className="p-7 flex-1 flex flex-col relative">
                                                        {/* Ghost Label Background */}
                                                        <div className="absolute top-10 right-[-10px] text-[40px] font-black text-foreground/[0.02] uppercase select-none pointer-events-none group-hover:text-primary/[0.03] transition-colors leading-none tracking-tighter">
                                                            {node.label}
                                                        </div>

                                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                                            <div className={`w-14 h-14 flex items-center justify-center bg-muted/20 border border-border/20 text-foreground group-hover:border-primary/60 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 shadow-inner group-hover:rotate-[360deg]`}>
                                                                <node.icon size={26} strokeWidth={1} />
                                                            </div>
                                                            <div className="flex flex-col items-end gap-2 pt-1">
                                                                {node.isCore ? (
                                                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500 bg-emerald-500/10 px-2 py-1 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">Core_Module</span>
                                                                ) : (
                                                                    <span className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] border border-border/20 px-2 py-1 bg-muted/5">
                                                                        Ver::1.2.0
                                                                    </span>
                                                                )}
                                                                {installed && (
                                                                    <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-[0.3em] text-primary mt-1 px-2 py-1 bg-primary/10 border border-primary/30 animate-in fade-in duration-500">
                                                                        <div className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                                                                        Registered
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4 mb-10 flex-1 relative z-10">
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="font-black text-[14px] uppercase tracking-[0.1em] text-foreground group-hover:text-primary transition-colors duration-300">{node.label}</h4>
                                                                <div className="h-[2px] flex-1 bg-border/10 group-hover:bg-primary/20 transition-all duration-500" />
                                                            </div>
                                                            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium tracking-wide line-clamp-3 group-hover:text-foreground/90 transition-colors opacity-70 group-hover:opacity-100">
                                                                {node.description}
                                                            </p>
                                                        </div>

                                                        <div className="mt-auto pt-6 border-t border-border/10 group-hover:border-primary/20 transition-all duration-500 flex flex-col gap-5 relative z-10">
                                                            {/* Technical Footer Metas */}
                                                            <div className="flex items-center justify-between opacity-20 group-hover:opacity-50 transition-all duration-500">
                                                                <span className="text-[7px] font-mono uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary">
                                                                    HEX_ID::{node.id.substring(0, 8).toUpperCase()}
                                                                </span>
                                                                <span className="text-[7px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                                                                    SGN::QUANTUM.VAL
                                                                </span>
                                                            </div>

                                                            {installed ? (
                                                                node.isCore ? (
                                                                    <div className="w-full flex items-center justify-between px-5 h-11 bg-muted/10 border border-border/5 opacity-50 cursor-not-allowed">
                                                                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-foreground/40">Immutable_Block</span>
                                                                        <Check size={14} className="text-foreground/20" />
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        variant="ghost"
                                                                        onClick={() => handleNodeAction(node.id, 'uninstall')}
                                                                        disabled={isLoading}
                                                                        className="w-full h-11 text-[10px] font-black uppercase tracking-[0.25em] bg-transparent border border-border/40 text-muted-foreground/60 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/60 transition-all rounded-none disabled:opacity-50 group/un"
                                                                    >
                                                                        {isLoading ? 'DEPROVISIONING...' : (
                                                                            <span className="flex items-center gap-2">
                                                                                <Trash2 size={13} className="group-hover/un:scale-110 transition-transform" /> Uninstall_Module
                                                                            </span>
                                                                        )}
                                                                    </Button>
                                                                )
                                                            ) : (
                                                                <Button
                                                                    onClick={() => handleNodeAction(node.id, 'install')}
                                                                    disabled={isLoading}
                                                                    className="w-full h-11 text-[10px] font-black uppercase tracking-[0.25em] bg-primary hover:bg-primary/90 text-primary-foreground rounded-none border-none transition-all shadow-[0_4px_15px_rgba(var(--primary-rgb),0.3)] active:scale-[0.97] disabled:opacity-80 group/btn relative overflow-hidden"
                                                                >
                                                                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                                                                    {isLoading ? (
                                                                        <span className="flex items-center gap-2">
                                                                            <Loader2 size={13} className="animate-spin" /> Provisioning...
                                                                        </span>
                                                                    ) : (
                                                                        <span className="flex items-center gap-2 relative z-10">
                                                                            <Download size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" /> Deploy_Module
                                                                        </span>
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
