import React from 'react';
import { X, Blocks } from 'lucide-react';
import { ModulesMarketView } from './ModulesMarketView';

interface ModulesManagerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModulesManager: React.FC<ModulesManagerProps> = ({ isOpen, onClose }) => {
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

                {/* Deep Carbon Header */}
                <div className="flex items-center justify-between h-16 bg-card border-b border-border/40 px-8 select-none relative">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/20">
                            <Blocks size={14} strokeWidth={2.5} className="text-primary" />
                        </div>
                        <div>
                            <span className="block text-[14px] font-bold uppercase tracking-[0.2em] text-foreground">Modules Manager</span>
                            <span className="block text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest mt-0.5">Deploy and manage core system modules</span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted/20 transition-all text-muted-foreground hover:text-foreground group"
                    >
                        <X size={14} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>


                    {/* Subtle Progress Bar Placeholder (Decorative) */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </div>

                {/* Window Body */}
                <div className="flex-1 overflow-hidden flex flex-col bg-background">
                    <ModulesMarketView />
                </div>

                {/* Tactical Footer */}
                <div className="h-10 bg-card border-t border-border/40 px-8 flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest">System Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest opacity-60">Secure Encryption</span>
                        </div>
                    </div>
                    <div className="text-[8px] font-medium text-muted-foreground/40 uppercase tracking-widest">
                        © 2026 Brand OS Enterprise
                    </div>
                </div>
            </div>
        </div>
    );
};
