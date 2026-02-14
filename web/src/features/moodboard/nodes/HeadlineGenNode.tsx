import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Heading, Minus, Plus } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const HeadlineGenNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [topic, setTopic] = useState(data.content || '');
    const [count, setCount] = useState(data.steps || 5);

    const headlines = (data.tags || []).length > 0 ? data.tags : [];

    return (
        <NodeContainer
            selected={selected}
            title="Headlines"
            icon={Heading}
            typeColor="bg-teal-500"
            handles={<TypedHandles nodeType="headline_gen" />}
            data={{ ...data, id, type: 'headline_gen' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-teal-500/60"
                    handleClassName="!w-3 !h-3 !bg-teal-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-teal-500/10 border border-teal-500/20">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">Beta</span>
                    </div>
                </div>

                {/* Topic Input */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Topic</span>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: topic })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-teal-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Enter topic or keyword..."
                    />
                </div>

                {/* Count Selector */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Count</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                const newCount = Math.max(3, count - 1);
                                setCount(newCount);
                                data.onChange?.(id, { steps: newCount });
                            }}
                            className="w-6 h-6 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 transition-colors"
                        >
                            <Minus size={10} className="text-zinc-500" />
                        </button>
                        <span className="text-[12px] font-mono font-bold text-zinc-900 dark:text-zinc-100 w-6 text-center">{count}</span>
                        <button
                            onClick={() => {
                                const newCount = Math.min(10, count + 1);
                                setCount(newCount);
                                data.onChange?.(id, { steps: newCount });
                            }}
                            className="w-6 h-6 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 transition-colors"
                        >
                            <Plus size={10} className="text-zinc-500" />
                        </button>
                        <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest">headlines</span>
                    </div>
                </div>

                {/* Generated Headlines */}
                <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Output</span>
                    {headlines!.length > 0 ? (
                        <div className="space-y-1">
                            {headlines!.map((h, i) => (
                                <div key={i} className="flex items-start gap-2 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/40 transition-colors">
                                    <span className="text-[8px] font-mono font-bold text-teal-500 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-[10px] text-zinc-700 dark:text-zinc-300">{h}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-20 flex items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Awaiting generation...</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">HEADLINE_GEN::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-teal-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
