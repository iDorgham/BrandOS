import React from 'react';

export const GuideTab: React.FC = () => {
    return (
        <div className="p-3 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block border-b border-border/40 pb-2">Shortcuts</span>

                <div className="grid gap-2">
                    {[
                        { keys: ['V'], label: 'Pointer Tool' },
                        { keys: ['H', 'Space'], label: 'Hand / Pan' },
                        { keys: ['T'], label: 'Insert Text' },
                        { keys: ['S'], label: 'Section Tool' },
                        { keys: ['Ctrl', 'D'], label: 'Duplicate' },
                        { keys: ['Del'], label: 'Delete' },
                        { keys: ['Ctrl', 'Z'], label: 'Undo' },
                        { keys: ['Ctrl', 'Y'], label: 'Redo' },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-sm transition-colors">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">{s.label}</span>
                            <div className="flex gap-1">
                                {s.keys.map(k => (
                                    <kbd key={k} className="h-5 px-1.5 min-w-[20px] bg-muted border border-border flex items-center justify-center text-[9px] font-mono rounded-sm text-foreground">
                                        {k}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block border-b border-border/40 pb-2">Canvas Tips</span>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Use <span className="text-foreground font-bold">Sections</span> to group related nodes together. Double-click the canvas to quickly add a label. Right-click nodes for advanced options like <span className="text-primary">Locking</span> or <span className="text-primary">Layering</span>.
                </p>
            </div>
        </div>
    );
};
