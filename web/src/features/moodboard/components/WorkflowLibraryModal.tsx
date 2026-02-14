import React, { useState, useMemo } from 'react';
import { X, Zap, ArrowRight, LayoutGrid, Search, Filter, Box, Star } from 'lucide-react';
import { WORKFLOW_TEMPLATES } from '../WorkflowSequences';
import { Button, Input } from '@/components/ui';

interface WorkflowLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectTemplate: (templateId: string) => void;
}

export const WorkflowLibraryModal: React.FC<WorkflowLibraryModalProps> = ({ isOpen, onClose, onSelectTemplate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(WORKFLOW_TEMPLATES.map(t => t.category)));

    const filteredTemplates = useMemo(() => {
        return WORKFLOW_TEMPLATES.filter(t => {
            const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? t.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const groupedTemplates = useMemo(() => {
        const groups: Record<string, typeof WORKFLOW_TEMPLATES> = {};
        filteredTemplates.forEach(t => {
            if (!groups[t.category]) groups[t.category] = [];
            groups[t.category].push(t);
        });
        return groups;
    }, [filteredTemplates]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />

            {/* Window Frame - Enlarged to 90vw, 85vh */}
            <div className="relative w-[90vw] h-[85vh] max-w-[1800px] bg-card/60 backdrop-blur-2xl border border-border/40 shadow-[0_32px_100px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-[0.98] fade-in duration-700 overflow-hidden rounded-none">

                {/* Advanced Header Decor */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-50" />
                <div className="absolute top-[1px] left-[10%] w-[80%] h-[20px] bg-primary/[0.03] blur-xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between h-16 bg-card border-b border-border/40 px-8 select-none relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/20">
                            <Zap size={14} strokeWidth={2.5} className="text-primary animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-foreground">Workflow Library</span>
                                <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[8px] font-black border border-primary/20">STABLE</span>
                            </div>
                            <span className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest mt-0.5">Browse and deploy automated sequences</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-6 mr-4 px-6 py-2 border-x border-border/10">
                            <div className="flex flex-col items-center">
                                <span className="text-[14px] font-bold text-foreground">{WORKFLOW_TEMPLATES.length}</span>
                                <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Total</span>
                            </div>
                            <div className="w-[1px] h-6 bg-border/20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[14px] font-bold text-primary">{WORKFLOW_TEMPLATES.filter(t => t.id.includes('quantum') || t.id.includes('loop')).length}</span>
                                <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Advanced</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center hover:bg-rose-500/10 transition-all text-muted-foreground hover:text-rose-500 group"
                        >
                            <X size={14} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-hidden flex bg-background">
                    {/* Sidebar Filters */}
                    <div className="w-72 bg-card border-r border-border/40 flex flex-col pt-8 relative z-20">
                        <div className="px-6 mb-4">

                            <div className="relative mb-8">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                                <Input
                                    placeholder="Search workflows..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-10 pl-10 bg-muted/20 border-border/20 focus:border-primary/50 text-[10px] uppercase font-medium tracking-widest rounded-none shadow-none placeholder:text-muted-foreground/40"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-8">
                            <div className="space-y-2">
                                <div className="px-3 py-1 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">Functional Areas</div>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`
                                        w-full px-4 py-3 flex items-center justify-between transition-all group border-l-2
                                        ${!selectedCategory
                                            ? 'bg-primary/5 text-primary border-primary font-bold'
                                            : 'text-muted-foreground/60 border-transparent hover:bg-muted/10 hover:text-foreground'}
                                    `}
                                >
                                    <span className="text-[11px] font-medium uppercase tracking-widest">Library Home</span>
                                    {!selectedCategory && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`
                                            w-full px-4 py-3 flex items-center justify-between transition-all group border-l-2
                                            ${selectedCategory === cat
                                                ? 'bg-primary/5 text-primary border-primary font-bold'
                                                : 'text-muted-foreground/60 border-transparent hover:bg-muted/10 hover:text-foreground'}
                                        `}
                                    >
                                        <span className="text-[11px] font-medium uppercase tracking-widest">{cat.replace(/_/g, ' ')}</span>
                                        {selectedCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                                    </button>
                                    // Count badges removed for cleaner sidebar flow, matching ModulesMarketView
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-border/40 bg-card">
                            <div className="flex items-center gap-3 text-muted-foreground/40 mb-2">
                                <Box size={12} />
                                <span className="text-[9px] font-medium tracking-widest uppercase truncate">Sequence Registry v1.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-background relative selection:bg-primary/20">
                        {/* Technical Grid Background */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                            style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                        <div className="p-10 max-w-[1600px] mx-auto relative z-10">
                            {filteredTemplates.length === 0 ? (
                                <div className="h-[60vh] flex flex-col items-center justify-center border border-border/20 border-dashed bg-muted/5 backdrop-blur-sm">
                                    <Search size={48} className="text-muted-foreground/20 mb-6" />
                                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-2">No Results Found</h3>
                                    <p className="text-[11px] text-muted-foreground/40 uppercase tracking-widest font-medium">Try adjusting your filters.</p>
                                    <Button
                                        variant="ghost"
                                        onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                                        className="mt-8 text-[10px] uppercase tracking-widest border border-border/60 text-muted-foreground hover:bg-muted/20 hover:text-foreground rounded-none"
                                    >
                                        Reset Filters
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-16">
                                    {Object.entries(groupedTemplates).map(([category, templates]) => (
                                        <section key={category} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            <div className="flex items-center gap-6">
                                                <div className="w-2 h-6 bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                                                <h3 className="text-[13px] font-black uppercase tracking-[0.35em] text-foreground">
                                                    {category}
                                                </h3>
                                                <div className="h-[1px] flex-1 bg-border/20 translate-y-0.5" />
                                                <div className="px-3 py-1 border border-border/20 text-[10px] font-medium text-muted-foreground/60 bg-muted/5 backdrop-blur-xs">
                                                    {category.replace(/_/g, ' ')} // {templates.length.toString().padStart(2, '0')} Units
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                                {templates.map((template, idx) => (
                                                    <div
                                                        key={template.id}
                                                        className="group relative flex flex-col bg-card border border-border/40 transition-all duration-700 hover:border-primary/60 hover:shadow-[0_40px_100px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden scale-100 hover:scale-[1.04] hover:-translate-y-2 active:scale-[0.98] rounded-none cursor-pointer ease-[cubic-bezier(0.23,1,0.32,1)]"
                                                        onClick={() => { onSelectTemplate(template.id); onClose(); }}
                                                    >
                                                        {/* Color Bar */}
                                                        <div className="h-[6px] w-full bg-primary opacity-70 group-hover:opacity-100 transition-all duration-500" />

                                                        {/* Corner Tech Accents */}
                                                        <div className="absolute top-[6px] left-0 w-5 h-5 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                                                        <div className="absolute top-[6px] right-0 w-5 h-5 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />

                                                        {/* Premium Glass Sweep Effect */}
                                                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-20" />

                                                        <div className="p-8 flex-1 flex flex-col relative bg-card/50 backdrop-blur-xl">
                                                            {/* Ghost Label Background */}
                                                            <div className="absolute top-12 right-[-15px] text-[56px] font-black text-foreground/[0.03] uppercase select-none pointer-events-none group-hover:text-primary/[0.05] transition-colors leading-none tracking-tighter">
                                                                {template.label.split(' ')[0]}
                                                            </div>

                                                            {/* Top Header Area: Icon & Badges */}
                                                            <div className="flex justify-between items-start mb-8 relative z-10">
                                                                <div className="w-16 h-16 flex items-center justify-center bg-muted/30 border border-border/30 text-foreground group-hover:border-primary/60 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-700 shadow-md group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] rounded-none">
                                                                    <LayoutGrid size={32} strokeWidth={1} />
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 bg-primary/5 px-3 py-1.5 border border-primary/20">
                                                                        TEMPLATE
                                                                    </span>
                                                                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30">
                                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                                                                        READY
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Info Body */}
                                                            <div className="space-y-4 mb-8 flex-1 relative z-10">
                                                                <div className="flex items-center gap-3">
                                                                    <h4 className="font-black text-[16px] uppercase tracking-[0.1em] text-foreground group-hover:text-primary transition-colors duration-300">
                                                                        {template.label}
                                                                    </h4>
                                                                </div>

                                                                {/* Rating - Relocated for maximum visibility */}
                                                                <div className="flex items-center gap-2 py-1">
                                                                    <div className="flex items-center bg-amber-500/10 px-2 py-1 border border-amber-500/20 rounded-sm">
                                                                        <div className="flex items-center mr-2">
                                                                            {[...Array(5)].map((_, i) => {
                                                                                const rating = (template.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 15 + 35) / 10;
                                                                                const fill = i < Math.floor(rating);
                                                                                const isHalf = !fill && i < Math.ceil(rating) && (rating % 1) >= 0.5;
                                                                                return (
                                                                                    <Star
                                                                                        key={i}
                                                                                        size={10}
                                                                                        fill={fill || isHalf ? "#f59e0b" : "none"}
                                                                                        className={fill ? "opacity-100" : isHalf ? "opacity-60" : "opacity-20"}
                                                                                        color="#f59e0b"
                                                                                        strokeWidth={fill ? 0 : 2}
                                                                                    />
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 font-mono">
                                                                            {((template.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 15 + 35) / 10).toFixed(1)}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <p className="text-[12px] text-muted-foreground leading-relaxed font-semibold tracking-wide group-hover:text-foreground transition-colors">
                                                                    {template.description}
                                                                </p>
                                                            </div>

                                                            <div className="mt-auto pt-6 border-t border-border/20 group-hover:border-primary/40 transition-all duration-500 relative z-10">
                                                                {/* Desired Focused Data Only - Metadata Removed */}

                                                                <Button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        onSelectTemplate(template.id);
                                                                        onClose();
                                                                    }}
                                                                    className="w-full h-12 text-[11px] font-black uppercase tracking-[0.3em] bg-primary hover:bg-primary/90 text-primary-foreground rounded-none border-none transition-all shadow-lg active:scale-[0.98] group/btn relative overflow-hidden"
                                                                >
                                                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                                                                    <span className="flex items-center gap-2 relative z-10">
                                                                        <Zap size={16} className="group-hover/btn:scale-110 transition-transform" /> SELECT WORKFLOW
                                                                    </span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tactical Footer */}
                <div className="h-10 bg-card border-t border-border/40 px-8 flex items-center justify-between relative z-10">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                            <span className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest">Library System Active</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-border/20 pl-6">
                            <span className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest opacity-60">Sequence Ready</span>
                        </div>
                    </div>
                    <div className="text-[8px] font-medium text-muted-foreground/40 uppercase tracking-widest">
                        {WORKFLOW_TEMPLATES.length} SEQUENCES DEPLOYABLE
                    </div>
                </div>
            </div>
        </div>
    );
};
