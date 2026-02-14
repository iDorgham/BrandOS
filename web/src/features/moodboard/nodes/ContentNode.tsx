import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Layout, FileText, Calendar, PenTool, Layers, Megaphone, Type } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const ContentNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Content Architect"
            icon={Layout}
            typeColor="bg-rose-500"
            handles={<TypedHandles nodeType="content" />}
            data={{ ...data, id, type: 'content' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={180}
                    isVisible={selected}
                    lineClassName="!border-rose-500/60"
                    handleClassName="!w-3 !h-3 !bg-rose-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-4 p-5 h-full relative overflow-hidden">
                <div className="space-y-3 pt-2">
                    {/* Format Selector */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-rose-500/40 transition-colors group cursor-pointer">
                            <FileText size={12} className="text-rose-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Blog Posts</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">Structure::SEO_Long</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 transition-colors group cursor-pointer opacity-50">
                            <Calendar size={12} className="text-zinc-400 group-hover:text-rose-500 transition-colors" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Social Planner</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">Multi_Platform::7_Days</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 transition-colors group cursor-pointer opacity-50">
                            <Type size={12} className="text-zinc-400 group-hover:text-rose-500 transition-colors" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Captions</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">Tone::Viral_DNA</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 transition-colors group cursor-pointer opacity-50">
                            <Layers size={12} className="text-zinc-400 group-hover:text-rose-500 transition-colors" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Ad Sets</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">Creative_Matrix::FB_IG</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-[7px] font-mono font-black uppercase tracking-widest text-rose-500 bg-rose-500/5 p-2 border-l-2 border-rose-500">
                        <div className="flex items-center gap-2">
                            <PenTool size={10} />
                            <span>DNA_ENFORCEMENT_ACTIVE</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Megaphone size={10} className="text-rose-400" />
                        <span className="text-[6px] font-mono uppercase tracking-widest text-zinc-500">CREATIVE_ENGINE_V1</span>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
