import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Sparkles } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const AttributeNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Trait"
        icon={Sparkles}
        typeColor="bg-amber-500"
        handles={<NodeHandles nodeColor="bg-amber-500" />}
        data={{ ...data, id, type: 'attribute' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={180}
                minHeight={80}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <div className="w-[1px] h-4 bg-primary" />
                <div className="text-[13px] font-bold tracking-tight uppercase text-zinc-900 dark:text-zinc-100 italic">{data.label || 'NULL_TRAIT'}</div>
            </div>

            {data.color && (
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 w-full shadow-sm relative overflow-hidden">
                    <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 shadow-inner group-hover:scale-110 transition-transform duration-500 relative flex items-center justify-center p-1 bg-white dark:bg-zinc-950">
                        <div className="w-full h-full" style={{ backgroundColor: data.color }} />
                    </div>

                    <div className="flex flex-col gap-0.5 z-10">
                        <div className="flex items-center gap-2">
                            <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight italic">{data.color.toUpperCase()}</span>
                        </div>
                        <span className="text-[6px] font-mono font-bold text-zinc-400 uppercase tracking-widest">CHROMATIC_DATA</span>
                    </div>
                </div>
            )}

            <div className="mt-auto flex justify-between items-center opacity-30">
                <div className="w-8 h-[1px] bg-zinc-400" />
                <span className="text-[6px] font-mono font-bold uppercase tracking-widest text-zinc-500">TRAIT_REGISTERED</span>
            </div>
        </div>
    </NodeContainer>
);
