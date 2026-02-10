import React, { useState } from 'react';
import { X, Zap, ArrowRight, LayoutGrid, Search } from 'lucide-react';
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

    if (!isOpen) return null;

    const categories = Array.from(new Set(WORKFLOW_TEMPLATES.map(t => t.category)));

    const filteredTemplates = WORKFLOW_TEMPLATES.filter(t => {
        const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? t.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />

            {/* Window Frame */}
            <div className="relative w-[90vw] h-[85vh] max-w-[1500px] bg-card/60 backdrop-blur-2xl border border-border/40 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-[0.98] fade-in duration-700 overflow-hidden rounded-none">

                {/* Advanced Header Decor */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-50" />
                <div className="absolute top-[1px] left-[10%] w-[80%] h-[20px] bg-primary/[0.03] blur-xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between h-20 bg-card/40 border-b border-border/40 px-10 select-none relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 border border-primary/20 shadow-[inset_0_0_15px_rgba(var(--primary-rgb),0.2)]">
                            <Zap size={24} className="text-primary animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-[16px] font-black uppercase tracking-[0.4em] text-foreground">Workflow_Repository</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-mono border border-primary/20">V2.0_STABLE</span>
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em] mt-1">Enterprise Grade Multi-Agent Sequence Matrix</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-6 mr-8 px-6 py-2 border-x border-border/10 bg-muted/5">
                            <div className="flex flex-col items-center">
                                <span className="text-[14px] font-black text-foreground">{WORKFLOW_TEMPLATES.length}</span>
                                <span className="text-[7px] font-mono text-muted-foreground uppercase opacity-40">Total_Sequences</span>
                            </div>
                            <div className="w-[1px] h-6 bg-border/20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[14px] font-black text-primary">{WORKFLOW_TEMPLATES.filter(t => t.id.includes('quantum') || t.id.includes('loop')).length}</span>
                                <span className="text-[7px] font-mono text-muted-foreground uppercase opacity-40">High_Complexity</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-12 h-12 flex items-center justify-center hover:bg-rose-500/10 transition-all text-muted-foreground hover:text-rose-500 group relative border border-transparent hover:border-rose-500/20"
                        >
                            <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-hidden flex bg-background/30 backdrop-blur-sm">
                    {/* Sidebar Filters */}
                    <div className="w-80 border-r border-border/40 bg-muted/5 flex flex-col relative z-20">
                        <div className="p-6 border-b border-border/20 bg-card/20 backdrop-blur-md">
                            <div className="relative group">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="SCAN MODULES..."
                                    className="h-11 pl-12 bg-background/50 border-border/40 text-[11px] font-mono rounded-none focus:border-primary/50 transition-all uppercase placeholder:tracking-[0.2em] focus:ring-0 focus:shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                            <div className="px-4 py-2 mb-2">
                                <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Trajectory_Filters</span>
                            </div>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full group flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] rounded-none transition-all duration-300 ${!selectedCategory ? 'bg-primary/10 text-primary border-r-2 border-primary shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.05)]' : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground border-r-2 border-transparent'}`}
                            >
                                <span className="flex items-center gap-3">
                                    <LayoutGrid size={14} className={!selectedCategory ? 'text-primary' : 'text-muted-foreground/40'} />
                                    Omni_Directory
                                </span>
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-none border ${!selectedCategory ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-muted/10 border-border/20 text-muted-foreground/40'}`}>
                                    {WORKFLOW_TEMPLATES.length.toString().padStart(2, '0')}
                                </span>
                            </button>
                            {categories.map(cat => {
                                const count = WORKFLOW_TEMPLATES.filter(t => t.category === cat).length;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full group flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] rounded-none transition-all duration-300 ${selectedCategory === cat ? 'bg-primary/10 text-primary border-r-2 border-primary shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.05)]' : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground border-r-2 border-transparent'}`}
                                    >
                                        <span className="truncate pr-4">{cat.replace(' ', '_')}</span>
                                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-none border ${selectedCategory === cat ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-muted/10 border-border/20 text-muted-foreground/40'}`}>
                                            {count.toString().padStart(2, '0')}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex-1 overflow-y-auto p-12 relative">
                        {/* Technical Grid Pattern */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                            style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        {filteredTemplates.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center border-2 border-border/20 border-dashed bg-muted/5 relative z-10 backdrop-blur-sm">
                                <div className="w-20 h-20 flex items-center justify-center bg-muted/10 border border-border/10 mb-8 rounded-full">
                                    <Search size={40} className="text-muted-foreground/10" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.5em] text-muted-foreground/40 mb-3">No_Results_Found</h3>
                                <p className="text-[11px] font-mono text-muted-foreground/20 uppercase tracking-widest">Adjust filters to re-scry the repository.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 relative z-10 p-2">
                                {filteredTemplates.map((template, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative bg-card/40 backdrop-blur-xl border border-border/60 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col h-[300px] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700"
                                        style={{ animationDelay: `${idx * 40}ms` }}
                                    >
                                        {/* Status Header */}
                                        <div className="h-[2px] w-full bg-border/20 group-hover:bg-primary/60 transition-all duration-500" />

                                        {/* Content Area */}
                                        <div className="p-8 flex-1 flex flex-col relative">
                                            {/* Ghost Index */}
                                            <div className="absolute top-6 right-8 text-[48px] font-black text-foreground/[0.01] group-hover:text-primary/[0.03] transition-colors pointer-events-none">
                                                {idx.toString().padStart(2, '0')}
                                            </div>

                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/20 px-2.5 py-1">
                                                        {template.category}
                                                    </span>
                                                    <span className="text-[7px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">Sequence_Unlocked</span>
                                                </div>
                                                <div className="w-10 h-10 flex items-center justify-center bg-muted/20 border border-border/10 group-hover:border-primary/40 group-hover:text-primary transition-all duration-500 group-hover:rotate-12">
                                                    <Zap size={18} strokeWidth={1.5} />
                                                </div>
                                            </div>

                                            <h3 className="text-[15px] font-black uppercase tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {template.label}
                                            </h3>
                                            <p className="text-[11px] text-muted-foreground/70 leading-relaxed line-clamp-3 font-medium tracking-wide">
                                                {template.description}
                                            </p>
                                        </div>

                                        {/* Interaction Footer */}
                                        <div className="px-8 py-6 border-t border-border/20 bg-muted/5 group-hover:bg-primary/[0.02] transition-all flex items-center justify-between mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-[7px] font-mono text-muted-foreground/20 uppercase tracking-[0.25em]">Registry_Signature</span>
                                                <span className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-[0.1em] group-hover:text-primary/60 transition-colors">OS_BND_442_{idx}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                onClick={() => { onSelectTemplate(template.id); onClose(); }}
                                                className="h-10 px-6 text-[10px] font-black uppercase tracking-[0.3em] bg-primary/5 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all rounded-none group/btn shadow-[0_0_15px_rgba(var(--primary-rgb),0.05)]"
                                            >
                                                Deploy_Sequence
                                                <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-2 transition-transform duration-500" />
                                            </Button>
                                        </div>

                                        {/* Hover Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Technical Footer */}
                <div className="h-14 bg-card/60 backdrop-blur-md border-t border-border/40 px-10 flex items-center justify-between relative z-10">
                    <div className="flex gap-10">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                            <span className="text-[9px] font-black text-foreground/60 uppercase tracking-[0.3em]">System_Integrity.Nominal</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-help group">
                            <ArrowRight size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Protocol::BND_OS_X</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-[9px] font-mono text-muted-foreground/20 uppercase tracking-widest hidden md:block">
                            Local_Node_Registry_Status: Synced
                        </span>
                        <div className="h-6 w-[1px] bg-border/20 hidden md:block" />
                        <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em]">
                            Total {WORKFLOW_TEMPLATES.length} Sequences_Available
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
