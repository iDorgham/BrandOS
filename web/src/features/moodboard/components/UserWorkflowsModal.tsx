import React, { useState } from 'react';
import { X, LayoutGrid, ArrowRight, Search, Clock, FolderOpen } from 'lucide-react';
import { Button, Input } from '@/components/ui';

interface UserWorkflowsModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onSelectUserWorkflow: (workflowId: string) => void; 
}

// Mock Data
const USER_WORKFLOWS = [
    { id: '1', name: 'Q4 Marketing Strategy', description: 'Complete automated flow for Q4 campaign with social and email.', date: '2025-10-14', nodes: 12 },
    { id: '2', name: 'Daily Content Gen', description: 'Simple daily post generation pipeline.', date: '2025-11-02', nodes: 5 },
    { id: '3', name: 'Competitor Analysis', description: 'Scrape and analyze top 3 competitors.', date: '2026-01-15', nodes: 8 },
];

export const UserWorkflowsModal: React.FC<UserWorkflowsModalProps> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    const filteredWorkflows = USER_WORKFLOWS.filter(w =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />

            {/* Window Frame */}
            <div className="relative w-[85vw] h-[80vh] max-w-[1400px] bg-card border border-border/40 shadow-2xl flex flex-col animate-in zoom-in-[0.98] fade-in duration-500 overflow-hidden rounded-sm">

                {/* Header */}
                <div className="flex items-center justify-between h-16 bg-card border-b border-border/40 px-8 select-none relative">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                            <LayoutGrid size={20} className="text-emerald-500" />
                        </div>
                        <div>
                            <span className="block text-[14px] font-black uppercase tracking-[0.3em] text-foreground">User_Workflows</span>
                            <span className="block text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest mt-0.5">Personal Sequence Archive</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-muted/20 transition-all text-muted-foreground hover:text-foreground group">
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                </div>

                {/* Body */}
                <div className="flex-1 overflow-hidden flex flex-col bg-background">
                    {/* Toolbar */}
                    <div className="h-14 border-b border-border/40 bg-muted/5 px-8 flex items-center justify-between">
                        <div className="relative w-96">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH MY WORKFLOWS..."
                                className="h-9 pl-9 bg-background border-border/40 text-[10px] font-mono rounded-none focus:border-emerald-500/50 transition-colors uppercase placeholder:tracking-widest"
                            />
                        </div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                            {filteredWorkflows.length} Sequences Found
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex-1 overflow-y-auto p-8 bg-grid-dotted bg-[length:20px_20px]">
                        {filteredWorkflows.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredWorkflows.map(workflow => (
                                    <div key={workflow.id} className="group relative bg-card/50 backdrop-blur-sm border border-border/40 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col h-[200px] overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-colors duration-300" />

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                                                    <Clock size={10} /> {workflow.date}
                                                </span>
                                                <FolderOpen size={16} className="text-muted-foreground/20 group-hover:text-emerald-500 transition-colors" />
                                            </div>

                                            <h3 className="text-sm font-black uppercase tracking-wide text-foreground mb-2 group-hover:text-emerald-500 transition-colors line-clamp-1">
                                                {workflow.name}
                                            </h3>
                                            <p className="text-[10px] text-muted-foreground/70 leading-relaxed line-clamp-2">
                                                {workflow.description}
                                            </p>
                                        </div>

                                        <div className="p-4 border-t border-border/20 bg-muted/5 group-hover:bg-emerald-500/5 transition-colors flex justify-between items-center">
                                            <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{workflow.nodes} Nodes</span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => { /* TODO: Load user workflow */ onClose(); }}
                                                className="text-[9px] font-black uppercase tracking-widest gap-2 hover:text-emerald-500 hover:bg-transparent pr-0"
                                            >
                                                Open Board <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground/30">
                                <FolderOpen size={48} className="mb-4 opacity-50" />
                                <span className="text-xs font-black uppercase tracking-widest">No Workflows Found</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="h-10 bg-card border-t border-border/40 px-8 flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Archive.Ready</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
