import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { RefreshCw } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const TONE_PRESETS = ['Formal', 'Casual', 'Humorous', 'Academic', 'Marketing', 'Technical'];

export const ContentRewriterNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [inputText, setInputText] = useState(data.content || '');
    const [selectedTone, setSelectedTone] = useState(data.variant || 'Casual');

    return (
        <NodeContainer
            selected={selected}
            title="Rewriter"
            icon={RefreshCw}
            typeColor="bg-cyan-600"
            handles={<TypedHandles nodeType="content_rewriter" />}
            data={{ ...data, id, type: 'content_rewriter' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-cyan-600/60"
                    handleClassName="!w-3 !h-3 !bg-cyan-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-cyan-600/10 border border-cyan-600/20">
                        <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Beta</span>
                    </div>
                </div>

                {/* Input Text */}
                <div className="space-y-1 pt-2 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Input</span>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: inputText })}
                        className="w-full h-full min-h-[60px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-cyan-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Paste text to rewrite..."
                    />
                </div>

                {/* Tone Selector */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Target Tone</span>
                    <div className="flex flex-wrap gap-1">
                        {TONE_PRESETS.map(tone => (
                            <button
                                key={tone}
                                onClick={() => {
                                    setSelectedTone(tone);
                                    data.onChange?.(id, { variant: tone });
                                }}
                                className={`px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest border transition-colors ${selectedTone === tone
                                    ? 'bg-cyan-600 text-white border-cyan-600'
                                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-cyan-600'
                                    }`}
                            >
                                {tone}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Output Text */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Output</span>
                    <div className="w-full h-full min-h-[60px] bg-cyan-50 dark:bg-cyan-900/10 p-3 border border-cyan-200 dark:border-cyan-800/50">
                        {data.prompt ? (
                            <p className="text-[10px] text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.prompt}</p>
                        ) : (
                            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Awaiting rewrite...</span>
                        )}
                    </div>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">REWRITER::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-cyan-600/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
