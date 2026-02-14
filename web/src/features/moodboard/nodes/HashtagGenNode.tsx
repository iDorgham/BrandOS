import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Hash, X } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const PLATFORMS = ['Instagram', 'TikTok', 'X/Twitter', 'LinkedIn'];

export const HashtagGenNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [topic, setTopic] = useState(data.content || '');
    const [selectedPlatform, setSelectedPlatform] = useState(data.variant || 'Instagram');
    const hashtags = data.tags || [];

    return (
        <NodeContainer
            selected={selected}
            title="Tags"
            icon={Hash}
            typeColor="bg-cyan-500"
            handles={<TypedHandles nodeType="hashtag_gen" />}
            data={{ ...data, id, type: 'hashtag_gen' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-cyan-500/60"
                    handleClassName="!w-3 !h-3 !bg-cyan-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Beta</span>
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
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Topic or keyword..."
                    />
                </div>

                {/* Platform Selector */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Platform</span>
                    <div className="flex flex-wrap gap-1">
                        {PLATFORMS.map(p => (
                            <button
                                key={p}
                                onClick={() => {
                                    setSelectedPlatform(p);
                                    data.onChange?.(id, { variant: p });
                                }}
                                className={`px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest border transition-colors ${selectedPlatform === p
                                    ? 'bg-cyan-500 text-white border-cyan-500'
                                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-cyan-500'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hashtag Chips */}
                <div className="flex-1 space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Generated Tags</span>
                    {hashtags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {hashtags.map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 text-[9px] font-mono font-bold text-cyan-700 dark:text-cyan-300">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="h-16 flex items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">No tags generated</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">HASHTAG_GEN::V1</span>
                    <span className="text-[7px] font-mono text-zinc-400">{hashtags.length} tags</span>
                </div>
            </div>
        </NodeContainer>
    );
});
