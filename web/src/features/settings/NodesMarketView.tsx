import React, { useState, useMemo, useCallback } from 'react';
import { Card, Button, Input, EmptyState } from '@/components/ui';
import { Sparkles, Download, Check, ExternalLink, Box, Search, Filter } from 'lucide-react';
import { useNodeManager } from '@/hooks/useNodeManager';
import { NodeCategory } from '@/features/moodboard/NodeRegistry';
import { useDebounce } from '@/hooks/useDebounce';

export const NodesMarketView = () => {
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
        <div className="flex h-full animate-in fade-in duration-500 overflow-hidden bg-[var(--cds-layer-02)]">
            {/* Carbon SideNav: Deep Filters */}
            <div className="w-64 bg-[var(--cds-layer-01)] border-r border-[var(--carbon-table-border)] flex flex-col pt-6">
                <div className="px-4 mb-2">
                    <div className="text-[11px] font-bold text-[var(--cds-text-primary)] uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                        <Filter size={12} className="text-primary" /> Filters
                    </div>

                    <div className="relative mb-6">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cds-text-placeholder)]" />
                        <Input
                            placeholder="Search modules..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 pl-10 bg-[var(--cds-field-01)] border-transparent focus:border-primary text-[10px] uppercase font-mono tracking-widest rounded-none shadow-none text-[var(--cds-text-primary)] placeholder:text-[var(--cds-text-placeholder)]"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-6">
                    {/* Status Filter Section */}
                    <div className="space-y-1">
                        <div className="px-3 py-1 text-[8px] font-black text-[var(--cds-text-placeholder)] uppercase tracking-[0.2em]">Status</div>
                        {(['All', 'Installed', 'Available'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`
                                    w-full px-3 py-2 flex items-center justify-between transition-all group
                                    ${statusFilter === status ? 'bg-[var(--cds-layer-selected)] text-[var(--cds-text-primary)]' : 'text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover)] hover:text-[var(--cds-text-primary)]'}
                                `}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest">{status}</span>
                                {statusFilter === status && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            </button>
                        ))}
                    </div>

                    {/* Category Filter Section */}
                    <div className="space-y-1">
                        <div className="px-3 py-1 text-[8px] font-black text-[var(--cds-text-placeholder)] uppercase tracking-[0.2em]">Logic</div>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className={`
                                w-full px-3 py-2 flex items-center justify-between transition-all group
                                ${activeFilter === 'All' ? 'bg-[var(--cds-layer-selected)] text-[var(--cds-text-primary)]' : 'text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover)] hover:text-[var(--cds-text-primary)]'}
                            `}
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest">All Modules</span>
                            {activeFilter === 'All' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`
                                    w-full px-3 py-2 flex items-center justify-between transition-all group
                                    ${activeFilter === cat ? 'bg-[var(--cds-layer-selected)] text-[var(--cds-text-primary)]' : 'text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover)] hover:text-[var(--cds-text-primary)]'}
                                `}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest">{cat}</span>
                                {activeFilter === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            </button>
                        ))}
                    </div>

                    {/* Sort Section */}
                    <div className="space-y-1">
                        <div className="px-3 py-1 text-[8px] font-black text-[var(--cds-text-placeholder)] uppercase tracking-[0.2em]">Sort</div>
                        <button
                            onClick={() => setSortBy('label')}
                            className={`
                                w-full px-3 py-2 flex items-center justify-between transition-all group
                                ${sortBy === 'label' ? 'bg-[var(--cds-layer-selected)] text-[var(--cds-text-primary)]' : 'text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover)] hover:text-[var(--cds-text-primary)]'}
                            `}
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest">Name (A-Z)</span>
                            {sortBy === 'label' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                    </div>
                </div>

                <div className="p-4 border-t border-[var(--carbon-table-border)] bg-[var(--cds-layer-01)]">
                    <div className="flex items-center gap-3 text-[var(--cds-text-placeholder)] mb-2">
                        <Box size={10} />
                        <span className="text-[8px] font-mono tracking-widest uppercase truncate">Registry verified</span>
                    </div>
                </div>
            </div>

            {/* Content: Carbon Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[var(--cds-layer-02)] relative">
                {/* Refined Carbon Progress Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] z-50 overflow-hidden transition-opacity duration-300 ${isAnyActionLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-full bg-primary animate-progress-indeterminate origin-left" />
                </div>

                <div className="p-8 max-w-[1400px] mx-auto">
                    {filteredNodes.length === 0 ? (
                        <div className="h-[60vh] flex flex-col items-center justify-center border border-[var(--carbon-table-border)] border-dashed bg-[var(--cds-field-01)]">
                            <Search size={48} className="text-[var(--cds-text-placeholder)] mb-6 opacity-20" />
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--cds-text-secondary)] mb-2">No modules found</h3>
                            <p className="text-[10px] text-[var(--cds-text-placeholder)] uppercase tracking-widest font-mono">No modules match your current filters.</p>
                            <Button variant="ghost" onClick={() => { setSearchQuery(''); setStatusFilter('All'); setActiveFilter('All'); }} className="mt-8 text-[9px] uppercase tracking-widest border border-[var(--carbon-table-border)] text-[var(--cds-text-secondary)] hover:text-[var(--cds-text-primary)]">Reset</Button>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {Object.entries(groupedNodes).map(([category, nodes]) => (
                                <section key={category} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1 h-4 bg-primary" />
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--cds-text-primary)]">
                                            {category}
                                        </h3>
                                        <div className="h-[1px] flex-1 bg-[var(--carbon-table-border)]" />
                                        <div className="px-2 py-0.5 border border-[var(--carbon-table-border)] text-[9px] font-mono text-[var(--cds-text-placeholder)]">
                                            CNT::{nodes.length.toString().padStart(2, '0')}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px] bg-[var(--carbon-table-border)] border border-[var(--carbon-table-border)]">
                                        {nodes.map((node) => {
                                            const installed = isInstalled(node.id);
                                            const isLoading = loadingNodes[node.id];
                                            return (
                                                <div
                                                    key={node.id}
                                                    className="group relative flex flex-col bg-[var(--cds-layer-01)] transition-all duration-300 hover:bg-[var(--cds-layer-hover)] hover:-translate-y-1 hover:shadow-xl border border-[var(--carbon-table-border)] hover:border-primary/50 overflow-hidden"
                                                >
                                                    {/* Color Bar */}
                                                    <div className={`h-[3px] w-full ${node.defaultColor} opacity-80 group-hover:opacity-100 transition-opacity`} />

                                                    {/* Corner Accents */}
                                                    <div className="absolute top-[3px] left-0 w-2 h-2 border-t border-l border-primary/0 group-hover:border-primary/60 transition-all duration-300" />
                                                    <div className="absolute top-[3px] right-0 w-2 h-2 border-t border-r border-primary/0 group-hover:border-primary/60 transition-all duration-300" />
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/0 group-hover:border-primary/60 transition-all duration-300" />
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/0 group-hover:border-primary/60 transition-all duration-300" />

                                                    <div className="p-5 flex-1 flex flex-col">
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div className={`w-10 h-10 flex items-center justify-center bg-[var(--cds-layer-02)] border border-[var(--carbon-table-border)] text-[var(--cds-text-primary)] group-hover:border-primary/50 group-hover:text-primary transition-colors shadow-inner`}>
                                                                <node.icon size={18} strokeWidth={2} />
                                                            </div>
                                                            <div className="flex flex-col items-end gap-1">
                                                                {node.isCore ? (
                                                                    <span className="text-[7px] font-black uppercase tracking-widest text-[var(--cds-support-success)] bg-[var(--cds-support-success)]/10 px-1.5 py-0.5 border border-[var(--cds-support-success)]/20">Core</span>
                                                                ) : (
                                                                    <span className="text-[7px] font-mono text-[var(--cds-text-placeholder)] uppercase tracking-widest border border-[var(--carbon-table-border)] px-1.5 py-0.5">
                                                                        {node.cost ? `CR::${node.cost}` : 'STD::00'}
                                                                    </span>
                                                                )}
                                                                {installed && (
                                                                    <div className="flex items-center gap-1 text-[6px] font-black uppercase tracking-[0.2em] text-primary mt-1 px-1.5 py-0.5 bg-primary/10 border border-primary/20">
                                                                        <div className="w-1 h-1 bg-primary animate-pulse rounded-full" />
                                                                        Active
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2 mb-8 flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[var(--cds-text-primary)] group-hover:text-primary transition-colors">{node.label}</h4>
                                                                <div className="h-[1px] flex-1 bg-[var(--carbon-table-border)] group-hover:bg-primary/20 transition-colors" />
                                                            </div>
                                                            <p className="text-[10px] text-[var(--cds-text-secondary)] leading-relaxed font-normal tracking-normal line-clamp-3 group-hover:text-[var(--cds-text-primary)] transition-colors">
                                                                {node.description}
                                                            </p>
                                                        </div>

                                                        <div className="mt-auto pt-4 border-t border-[var(--carbon-table-border)] group-hover:border-primary/20 transition-colors">
                                                            {/* Technical Footer Metas */}
                                                            <div className="flex items-center justify-between mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                                                <span className="text-[6px] font-mono uppercase tracking-widest text-[var(--cds-text-placeholder)]">
                                                                    MOD::{node.id.substring(0, 3).toUpperCase()}
                                                                </span>
                                                                <span className="text-[6px] font-mono uppercase tracking-widest text-[var(--cds-text-placeholder)]">
                                                                    V.1.0
                                                                </span>
                                                            </div>

                                                            {installed ? (
                                                                node.isCore ? (
                                                                    <div className="w-full flex items-center justify-between px-3 h-8 bg-[var(--cds-layer-02)] border border-transparent opacity-50 cursor-not-allowed">
                                                                        <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--cds-text-primary)]">System Locked</span>
                                                                        <Check size={10} className="text-[var(--cds-text-primary)]" />
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        variant="ghost"
                                                                        onClick={() => handleNodeAction(node.id, 'uninstall')}
                                                                        disabled={isLoading}
                                                                        className="w-full h-8 text-[9px] font-bold uppercase tracking-widest bg-transparent border border-[var(--carbon-table-border)] text-[var(--cds-text-secondary)] hover:bg-[var(--cds-support-error)] hover:bg-opacity-10 hover:text-[var(--cds-support-error)] hover:border-[var(--cds-support-error)] hover:border-opacity-40 transition-all rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        {isLoading ? 'Processing...' : 'Uninstall Module'}
                                                                    </Button>
                                                                )
                                                            ) : (
                                                                <Button
                                                                    onClick={() => handleNodeAction(node.id, 'install')}
                                                                    disabled={isLoading}
                                                                    className="w-full h-8 text-[9px] font-bold uppercase tracking-widest bg-[var(--cds-interactive-01)] hover:bg-[var(--cds-link-primary-hover)] text-white rounded-none border-transparent transition-all shadow-sm hover:shadow-md disabled:opacity-80 disabled:cursor-not-allowed group/btn"
                                                                >
                                                                    {isLoading ? (
                                                                        <>Installing...</>
                                                                    ) : (
                                                                        <>
                                                                            <Download size={12} className="mr-2 group-hover/btn:-translate-y-0.5 transition-transform" /> Install Module
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
