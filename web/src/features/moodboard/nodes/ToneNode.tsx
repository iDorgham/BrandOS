import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { SlidersHorizontal, Zap } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const ToneNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Frequency"
        icon={SlidersHorizontal}
        typeColor="bg-orange-600"
        handles={<TypedHandles nodeType="tone" />}
        data={{ ...data, id, type: 'tone' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={200}
                minHeight={100}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-5">
            <div className="space-y-4">
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[8px] font-mono font-black uppercase tracking-[0.3em] px-1 opacity-50">
                        <span className="text-amber-500/80">RESONANCE_LOW</span>
                        <span className="text-amber-500/80">PRECISION_HIGH</span>
                    </div>

                    <div className="relative h-10 flex items-center group/slider bg-background/40 backdrop-blur-sm p-1.5 border border-border/10 rounded-xl shadow-inner overflow-hidden">
                        {/* Technical Background Markers */}
                        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none opacity-20">
                            {Array.from({ length: 21 }).map((_, i) => (
                                <div key={i} className={`h-1.5 w-[1px] ${i % 5 === 0 ? 'h-3 bg-amber-500/60' : 'bg-amber-500/20'}`} />
                            ))}
                        </div>

                        <input
                            type="range" min="0" max="100"
                            value={data.toneValue || 50}
                            onChange={(e) => data.onChange?.(id, { toneValue: parseInt(e.target.value) })}
                            className="w-full h-1 bg-amber-500/10 appearance-none cursor-pointer accent-amber-500 relative z-10 rounded-full"
                        />
                    </div>

                    <div className="flex justify-between items-end px-1">
                        <div className="flex flex-col">
                            <span className="text-[14px] font-mono font-black text-amber-500 leading-none drop-shadow-sm">{data.toneValue || 50}%</span>
                            <span className="text-[6px] font-mono text-muted-foreground/30 uppercase tracking-widest mt-1">BIT_DEPTH_SYMMETRY</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-1 px-2 mb-0.5 bg-amber-500/5 border border-amber-500/10 rounded-md">
                            <div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[7px] font-mono font-black text-amber-500/60 uppercase">FREQ_LOCK</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 bg-background/40 backdrop-blur-md border border-border/10 rounded-2xl relative overflow-hidden group/analysis shadow-inner">
                {/* Decorative Tech Elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 blur-[20px] rounded-full -mr-8 -mt-8" />
                <div className="absolute top-3 right-3 opacity-20 group-hover/analysis:opacity-100 transition-opacity duration-500">
                    <Zap size={18} className="text-amber-500" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                        <div className="w-1 h-3 bg-amber-500/40 rounded-full" />
                        <div className="w-1 h-3 bg-amber-500/20 rounded-full" />
                    </div>
                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-foreground/80">Linguistic_Heuristics</span>
                </div>

                <p className="text-[10px] leading-[1.6] text-muted-foreground font-bold uppercase tracking-tight h-8 flex items-center border-l-2 border-amber-500/30 pl-3">
                    {(data.toneValue || 50) < 30 && ">> Mode: Minimalist_Stoicism"}
                    {(data.toneValue || 50) >= 30 && (data.toneValue || 50) <= 70 && ">> Mode: Balanced_Articulation"}
                    {(data.toneValue || 50) > 70 && ">> Mode: Max_Art_Propulsion"}
                </p>

                <div className="mt-4 flex gap-1 h-1 bg-background/40 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500/40 transition-all duration-700" style={{ width: `${data.toneValue || 50}%` }} />
                </div>
            </div>
        </div>
    </NodeContainer>
);
