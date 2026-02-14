import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Search } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const SEOOptimizerNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [inputText, setInputText] = useState(data.content || '');
    const score = data.toneValue ?? 0;
    const keywords = data.tags || [];

    return (
        <NodeContainer
            selected={selected}
            title="SEO"
            icon={Search}
            typeColor="bg-teal-400"
            handles={<TypedHandles nodeType="seo_optimizer" />}
            data={{ ...data, id, type: 'seo_optimizer' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-teal-400/60"
                    handleClassName="!w-3 !h-3 !bg-teal-400 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-teal-400/10 border border-teal-400/20">
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">Beta</span>
                    </div>
                </div>

                {/* Text Input */}
                <div className="space-y-1 pt-2 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Content</span>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: inputText })}
                        className="w-full h-full min-h-[60px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-teal-400 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Paste content to analyze..."
                    />
                </div>

                {/* Score Gauge */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">SEO Score</span>
                        <span className={`text-[12px] font-mono font-bold ${score >= 70 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-rose-500'}`}>{score}/100</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${score}%` }}
                        />
                    </div>
                </div>

                {/* Keywords */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Keywords</span>
                    {keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {keywords.map((kw, i) => (
                                <span key={i} className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 text-[8px] font-mono font-bold text-teal-700 dark:text-teal-300 uppercase tracking-widest">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="px-2 py-2 border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">No keywords extracted</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">SEO_OPT::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-teal-400/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
