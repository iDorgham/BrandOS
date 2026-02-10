import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';

interface ResetCanvasModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmName: string;
    setConfirmName: (name: string) => void;
}

export const ResetCanvasModal: React.FC<ResetCanvasModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    confirmName,
    setConfirmName
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />
            <div className="relative w-full max-w-md bg-card border border-rose-500/30 rounded-none shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                {/* Warning Header */}
                <div className="bg-rose-500/10 border-b border-rose-500/20 px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-rose-500/20 border border-rose-500/40">
                        <Trash2 size={16} className="text-rose-500 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-rose-500">Critical_Warning</h3>
                        <p className="text-[10px] font-mono text-rose-500/60 uppercase">Canvas Protocol Termination</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="p-4 bg-rose-500/5 border border-rose-500/20 text-rose-200/80 text-xs font-mono leading-relaxed">
                        <p>This action will permanently purge all nodes, connections, and workflow states. This process is irreversible.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Confirmation Protocol</label>
                        <Input
                            placeholder="Type 'DELETE' to confirm"
                            value={confirmName}
                            onChange={(e) => setConfirmName(e.target.value)}
                            className="bg-black/20 border-rose-500/30 focus-visible:ring-rose-500/50 font-mono text-center tracking-[0.2em] text-rose-500"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="secondary"
                            className="flex-1 rounded-none border-white/10 hover:bg-white/5"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex-1 rounded-none bg-rose-900/50 hover:bg-rose-600 border-rose-500/20 text-rose-200"
                            disabled={confirmName !== 'DELETE'}
                            onClick={onConfirm}
                        >
                            <Trash2 size={14} className="mr-2" />
                            Purge System
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
