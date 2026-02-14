import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { FileVideo, Image, Share2, Download, Zap } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const EncoderNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Encoder"
            icon={Zap}
            typeColor="bg-slate-700"
            handles={<TypedHandles nodeType="encoder" />}
            data={{ ...data, id, type: 'encoder' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected}
                    lineClassName="!border-slate-700/60"
                    handleClassName="!w-3 !h-3 !bg-slate-700 !border-background !rounded-full"
                />
            }
        >
            <div className="flex flex-col p-6 h-full font-mono bg-zinc-900/10 dark:bg-zinc-900/30">
                {/* Enhancement Panel */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-500/10 pb-2">
                        <span>PROCESSING_PIPELINE</span>
                        <span className="text-emerald-500 animate-pulse">4X_ULTRA_RES</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-2 group cursor-pointer hover:border-primary/40 transition-all">
                            <Image size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                            <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-500">EX_STILL</span>
                        </div>
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-2 group cursor-pointer hover:border-primary/40 transition-all">
                            <FileVideo size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                            <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-500">EX_MOTION</span>
                        </div>
                    </div>
                </div>

                {/* Final Export Format */}
                <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Target_Format</span>
                        <div className="flex gap-2">
                            <span className="text-[7px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 font-black">PNG</span>
                            <span className="text-[7px] px-2 py-0.5 bg-slate-700 text-white border border-slate-600 font-black">WEBP</span>
                            <span className="text-[7px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 font-black">MP4</span>
                        </div>
                    </div>

                    <button className="w-full h-10 bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-all flex items-center justify-center gap-3 group text-white">
                        <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deploy_Export</span>
                    </button>
                </div>

                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 opacity-30 group">
                    <Share2 size={12} className="text-zinc-500 cursor-pointer hover:text-primary transition-colors" />
                    <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
                    <span className="text-[6px] uppercase tracking-widest text-zinc-500">Render_Time::5.2s</span>
                </div>
            </div>
        </NodeContainer>
    );
};
