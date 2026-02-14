import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Card, Textarea } from '@/components/ui';
import { generateId } from '@/utils';
import { BatchItem } from '../types';

interface BatchItemCardProps {
    item: BatchItem;
    idx: number;
    onPromptChange: (idx: number, value: string) => void;
}

export const BatchItemCard: React.FC<BatchItemCardProps> = React.memo(({ item, idx, onPromptChange }) => {
    return (
        <Card className={`p-5 border-border bg-card transition-all relative overflow-hidden group rounded-sm ${item.status === 'orchestrating' ? 'ring-1 ring-primary/50' : ''}`}>
            {item.status === 'complete' && !item.result && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 blur-2xl rounded-full -mr-6 -mt-6" />
            )}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/10 rounded-none text-primary border border-primary/20">
                        <item.type.icon size={12} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">{item.type.label}</h4>
                        <p className="text-[9px] text-muted-foreground opacity-60 font-mono tracking-widest">PID: {generateId().slice(0, 4).toUpperCase()} // {item.type.aspectRatio}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-2 py-1 bg-background/50 rounded-full border border-border/50">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'complete' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                        item.status === 'failed' ? 'bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                            item.status === 'pending' ? 'bg-muted-foreground' :
                                'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                        }`} />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                        {item.status}
                    </span>
                </div>
            </div>

            <div className="h-32 bg-black/40 border border-border/40 rounded-none p-4 overflow-hidden relative group-hover:bg-black/50 transition-colors font-mono text-[10px]">
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.03)_2px)] pointer-events-none" />

                {item.status === 'orchestrating' ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-full max-w-[80%] space-y-2">
                            <div className="flex justify-between text-[9px] text-muted-foreground uppercase tracking-widest">
                                <span>Synthesizing</span>
                                <span>42%</span>
                            </div>
                            <div className="h-0.5 w-full bg-muted/20 relative overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-primary w-1/2 animate-[shimmer_1s_infinite]" />
                            </div>
                        </div>
                        <p className="text-[9px] text-primary/60 animate-pulse">Running Neural Handshake...</p>
                    </div>
                ) : (
                    <Textarea
                        className="bg-transparent border-none p-0 focus-visible:ring-0 text-[10px] leading-relaxed h-full resize-none font-mono text-muted-foreground/80 hover:text-primary/90 transition-colors selection:bg-primary/20 placeholder:text-muted-foreground/20"
                        value={item.orchestratedPrompt}
                        onChange={(e) => onPromptChange(idx, e.target.value)}
                        placeholder="// AWAITING_INPUT_SIGNAL..."
                        rows={3}
                    />
                )}
            </div>

            {item.result && (
                <div className="mt-5 aspect-video rounded-sm overflow-hidden border border-border group/img relative shadow-sm">
                    <img src={item.result.url} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" alt="Generated Asset" />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md border border-border px-2 py-1 rounded-sm text-[9px] font-medium text-primary shadow-sm">
                        {item.result.complianceScore}% DNA MATCH
                    </div>
                </div>
            )}
        </Card>
    );
});
