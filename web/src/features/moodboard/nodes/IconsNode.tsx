import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Shapes, Zap, Sparkles, Activity, ShieldCheck, Target, Heart } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const IconsNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Symbols"
        icon={Shapes}
        typeColor="bg-blue-600"
        handles={<TypedHandles nodeType="icons" />}
        data={{ ...data, id, type: 'icons' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={180}
                minHeight={100}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="grid grid-cols-3 gap-3">
                {[Zap, Sparkles, Activity, ShieldCheck, Target, Heart].map((Icon, i) => (
                    <div key={i} className="aspect-square bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-950 transition-all cursor-pointer group/sym shadow-sm">
                        <Icon size={18} className="text-zinc-400 group-hover/sym:text-primary transition-colors" strokeWidth={1} />
                    </div>
                ))}
            </div>

            <div className="mt-auto p-4 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3 relative">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono font-bold tracking-widest uppercase text-zinc-400">GLYPH_PROTOCOL</span>
                    <span className="text-[8px] font-mono font-bold text-primary italic">66%_STR</span>
                </div>
                <div className="h-1 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-primary/40 w-2/3" />
                </div>
                <div className="flex justify-between text-[6px] font-mono text-zinc-400 uppercase tracking-widest opacity-50">
                    <span>min_stroke::1.5px</span>
                    <span>opt_optical_sync</span>
                </div>
            </div>
        </div>
    </NodeContainer>
);
