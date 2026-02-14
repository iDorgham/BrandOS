import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Film, ImageIcon } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const TEMPLATES = ['Minimal', 'Bold', 'Gradient', 'Photo-First', 'Text-Heavy', 'Carousel'];

export const StoryCreatorNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(data.variant || 'Minimal');
    const [overlayText, setOverlayText] = useState(data.content || '');

    return (
        <NodeContainer
            selected={selected}
            title="Stories"
            icon={Film}
            typeColor="bg-orange-600"
            handles={<TypedHandles nodeType="story_creator" />}
            data={{ ...data, id, type: 'story_creator' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-orange-600/60"
                    handleClassName="!w-3 !h-3 !bg-orange-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-600/10 border border-orange-600/20">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Beta</span>
                    </div>
                </div>

                {/* Template Selector */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Template</span>
                    <div className="grid grid-cols-3 gap-1">
                        {TEMPLATES.map(t => (
                            <button
                                key={t}
                                onClick={() => {
                                    setSelectedTemplate(t);
                                    data.onChange?.(id, { variant: t });
                                }}
                                className={`px-2 py-1.5 text-[7px] font-mono font-bold uppercase tracking-widest border transition-colors text-center ${selectedTemplate === t
                                    ? 'bg-orange-600 text-white border-orange-600'
                                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-orange-600'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image Slots */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Media Slots</span>
                    <div className="grid grid-cols-3 gap-1">
                        {[1, 2, 3].map(slot => (
                            <div key={slot} className="aspect-[9/16] bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-1 hover:border-orange-500 transition-colors cursor-pointer">
                                <ImageIcon size={12} className="text-zinc-300 dark:text-zinc-700" />
                                <span className="text-[6px] font-mono text-zinc-400 uppercase">Slot {slot}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text Overlay */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Text Overlay</span>
                    <input
                        type="text"
                        value={overlayText}
                        onChange={(e) => setOverlayText(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: overlayText })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-orange-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Story text..."
                    />
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">STORY_CREATE::V1</span>
                    <span className="text-[7px] font-mono text-zinc-400">{selectedTemplate}</span>
                </div>
            </div>
        </NodeContainer>
    );
});
