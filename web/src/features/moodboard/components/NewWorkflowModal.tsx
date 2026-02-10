import React, { useState } from 'react';
import { X, Plus, Save, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';

interface NewWorkflowModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description: string) => void;
    onSaveCurrent: () => void;
    hasUnsavedChanges: boolean;
}

export const NewWorkflowModal: React.FC<NewWorkflowModalProps> = ({
    isOpen,
    onClose,
    onCreate,
    onSaveCurrent,
    hasUnsavedChanges
}) => {
    const [step, setStep] = useState<'save_prompt' | 'details'>(hasUnsavedChanges ? 'save_prompt' : 'details');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSaveAndContinue = () => {
        onSaveCurrent();
        setStep('details');
    };

    const handleSkipSave = () => {
        setStep('details');
    };

    const handleCreate = () => {
        if (!name.trim()) return;
        onCreate(name, description);
        onClose();
        // Reset state
        setName('');
        setDescription('');
        setStep(hasUnsavedChanges ? 'save_prompt' : 'details');
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative w-full max-w-md bg-card border border-border/40 shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-300 overflow-hidden rounded-sm">
                {/* Header */}
                <div className="flex items-center justify-between h-12 bg-card border-b border-border/40 px-6 select-none">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
                            <Plus size={14} className="text-blue-500" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-foreground">New_Workflow_Sequence</span>
                    </div>
                    <button onClick={onClose} className="hover:bg-muted/20 p-1 rounded-sm transition-colors text-muted-foreground hover:text-foreground">
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {step === 'save_prompt' ? (
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-amber-500/10 border border-amber-500/20 rounded-sm">
                                    <AlertTriangle size={20} className="text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-foreground mb-1">Unsaved Progress Detected</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Your current workspace has unsaved changes. Would you like to save before creating a new workflow?
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-2">
                                <Button variant="ghost" size="sm" onClick={handleSkipSave} className="text-xs uppercase tracking-widest">
                                    Discard & Continue
                                </Button>
                                <Button variant="primary" size="sm" onClick={handleSaveAndContinue} className="gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-none border-0 uppercase tracking-widest text-[10px] font-bold h-9">
                                    <Save size={14} />
                                    Save & Continue
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Workflow Name</label>
                                    <Input
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Q3 Marketing Blast"
                                        className="h-10 bg-muted/30 border-border/40 text-xs font-medium rounded-none focus:border-blue-500/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Briefly describe the purpose of this sequence..."
                                        className="min-h-[80px] bg-muted/30 border-border/40 text-xs font-medium rounded-none focus:border-blue-500/50 transition-colors resize-none p-3"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-2 border-t border-border/20">
                                <Button variant="ghost" size="sm" onClick={onClose} className="text-xs uppercase tracking-widest">
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleCreate}
                                    disabled={!name.trim()}
                                    className="gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-none border-0 uppercase tracking-widest text-[10px] font-bold h-9 px-6 disabled:opacity-50"
                                >
                                    Initialize Workflow
                                    <ArrowRight size={14} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
