import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Cpu, Sparkles } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const MidjourneyNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Generative_AI"
        icon={Cpu}
        typeColor="bg-fuchsia-600"
        handles={<TypedHandles nodeType="midjourney" />}
        data={{ ...data, id, type: 'midjourney' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={250}
                minHeight={150}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-[8px] font-bold font-mono tracking-widest text-zinc-500 uppercase">PROMPT_ENGINE / V6</span>
                    <span className="text-[7px] font-mono text-zinc-400">MDL::GPT-4T</span>
                </div>

                <div className="relative group/input">
                    <textarea
                        className="w-full h-32 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono p-4 outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 resize-none focus:border-primary transition-all leading-relaxed"
                        placeholder="IMAGE_DESCRIPTION_INPUT::..."
                        value={data.prompt as string || ''}
                        onChange={(e) => data.onChange?.(id, { prompt: e.target.value })}
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1">
                        <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800" />
                        <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-4">
                <button className="w-full bg-primary hover:bg-primary/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-3 transition-all flex items-center justify-center gap-3">
                    <Sparkles size={14} strokeWidth={1.5} />
                    <span>EXECUTE_GENERATE</span>
                </button>

                <div className="flex justify-between items-center px-1 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary" />
                        <span className="text-[7px] font-mono text-zinc-500 uppercase">EST_CREDITS::0.02</span>
                    </div>
                    <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest">LATENCY::~45s</span>
                </div>
            </div>
        </div>
    </NodeContainer>
);
