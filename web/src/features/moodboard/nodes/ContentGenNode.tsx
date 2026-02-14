import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { PenTool, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const TONE_OPTIONS = ['Professional', 'Casual', 'Witty', 'Formal', 'Friendly', 'Persuasive'];
const MODEL_OPTIONS = ['GPT-4', 'Gemini Pro', 'Claude', 'Llama 3'];

export const ContentGenNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [prompt, setPrompt] = useState(data.prompt || '');
    const [selectedTone, setSelectedTone] = useState(data.variant || 'Professional');
    const [selectedModel, setSelectedModel] = useState(data.model || 'Gemini Pro');

    return (
        <NodeContainer
            selected={selected}
            title="Writer"
            icon={PenTool}
            typeColor="bg-teal-600"
            handles={<TypedHandles nodeType="content_gen" />}
            data={{ ...data, id, type: 'content_gen' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-teal-600/60"
                    handleClassName="!w-3 !h-3 !bg-teal-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                {/* Beta Badge */}
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-teal-500/10 border border-teal-500/20">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">Beta</span>
                    </div>
                </div>

                {/* Model Selector */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Model</span>
                    <div className="relative">
                        <select
                            value={selectedModel}
                            onChange={(e) => {
                                setSelectedModel(e.target.value);
                                data.onChange?.(id, { model: e.target.value });
                            }}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-teal-500 outline-none"
                        >
                            {MODEL_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                {/* Prompt Area */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Prompt</span>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt })}
                        className="w-full h-full min-h-[80px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-teal-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Enter your content brief..."
                    />
                </div>

                {/* Tone Selector */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Tone</span>
                    <div className="flex flex-wrap gap-1">
                        {TONE_OPTIONS.map(tone => (
                            <button
                                key={tone}
                                onClick={() => {
                                    setSelectedTone(tone);
                                    data.onChange?.(id, { variant: tone });
                                }}
                                className={`px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest border transition-colors ${selectedTone === tone
                                    ? 'bg-teal-600 text-white border-teal-600'
                                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-teal-500'
                                    }`}
                            >
                                {tone}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Output Preview */}
                {data.content && (
                    <div className="p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                        <p className="text-[10px] text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-3">{data.content}</p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">CONTENT_GEN::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-teal-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
