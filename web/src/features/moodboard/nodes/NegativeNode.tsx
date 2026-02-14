import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';
import { Input } from '@/components/ui';

export const NegativeNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Anti_DNA"
        icon={X}
        typeColor="bg-rose-600"
        handles={<TypedHandles nodeType="negative" />}
        data={{ ...data, id, type: 'negative' }}
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
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-[8px] font-bold font-mono uppercase text-zinc-400 tracking-widest">FORBIDDEN_CONCEPT</span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={data.content || ''}
                        placeholder="DEFINE_PROTOCOL..."
                        onChange={(e) => data.onChange?.(id, { content: e.target.value.toUpperCase() })}
                        className="w-full h-12 text-[12px] font-bold bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 font-mono tracking-tighter text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-primary transition-all placeholder:opacity-20 uppercase"
                    />
                </div>
            </div>

            <div className="mt-auto p-4 border border-zinc-100 dark:border-zinc-800 space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                    <div className="w-1 h-3 bg-primary" />
                    <span className="text-[9px] font-bold tracking-widest text-zinc-900 dark:text-zinc-100 uppercase italic">Constraint::Active_V2</span>
                </div>

                <p className="text-[9px] leading-relaxed text-zinc-500 font-medium italic border-l border-zinc-200 dark:border-zinc-800 pl-4">
                    Exclusion parameter detected. bypassing aesthetic vector.
                </p>

                <div className="flex gap-1 pt-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className={`h-0.5 flex-1 ${i <= 5 ? 'bg-primary' : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                    ))}
                </div>
            </div>
        </div>
    </NodeContainer>
);
