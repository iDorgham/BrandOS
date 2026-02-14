import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Send } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const PLATFORMS = [
    { id: 'instagram', label: 'IG', color: 'bg-pink-500' },
    { id: 'x', label: 'X', color: 'bg-zinc-800 dark:bg-zinc-200' },
    { id: 'linkedin', label: 'LI', color: 'bg-blue-600' },
    { id: 'tiktok', label: 'TT', color: 'bg-black dark:bg-white' },
];

export const SocialPosterNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [caption, setCaption] = useState(data.content || '');
    const activePlatforms = (data.tags || ['instagram']) as string[];

    const togglePlatform = (platformId: string) => {
        const current = [...activePlatforms];
        const idx = current.indexOf(platformId);
        if (idx >= 0) current.splice(idx, 1);
        else current.push(platformId);
        data.onChange?.(id, { tags: current });
    };

    return (
        <NodeContainer
            selected={selected}
            title="Publisher"
            icon={Send}
            typeColor="bg-orange-500"
            handles={<TypedHandles nodeType="social_poster" />}
            data={{ ...data, id, type: 'social_poster' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-orange-500/60"
                    handleClassName="!w-3 !h-3 !bg-orange-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 border border-orange-500/20">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Beta</span>
                    </div>
                </div>

                {/* Platform Toggles */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Platforms</span>
                    <div className="flex gap-2">
                        {PLATFORMS.map(p => (
                            <button
                                key={p.id}
                                onClick={() => togglePlatform(p.id)}
                                className={`w-10 h-10 flex items-center justify-center border transition-all text-[9px] font-black uppercase tracking-widest ${activePlatforms.includes(p.id)
                                    ? `${p.color} text-white border-transparent`
                                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-orange-500'
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Caption */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Caption</span>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: caption })}
                        className="w-full h-full min-h-[80px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-orange-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Write your caption..."
                    />
                </div>

                {/* Schedule Indicator */}
                <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30">
                    <div className="w-2 h-2 bg-orange-500/50 rounded-full" />
                    <span className="text-[8px] font-mono font-bold text-orange-700 dark:text-orange-300 uppercase tracking-widest">
                        {data.isActive ? 'Ready to publish' : 'Draft'}
                    </span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">SOCIAL_POST::V1</span>
                    <span className="text-[7px] font-mono text-zinc-400">{activePlatforms.length} platforms</span>
                </div>
            </div>
        </NodeContainer>
    );
});
