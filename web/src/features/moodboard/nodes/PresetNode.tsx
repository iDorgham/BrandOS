import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const PresetNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Aesthetic"
        icon={Zap}
        typeColor="bg-blue-600"
        handles={<TypedHandles nodeType="preset" />}
        data={{ ...data, id, type: 'preset' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={200}
                minHeight={100}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-[8px] font-bold font-mono tracking-widest text-zinc-400 uppercase">AESTHETIC_ID / SELECT</span>
                </div>
                <select
                    value={data.variant}
                    onChange={(e) => data.onChange?.(id, { variant: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-[11px] font-bold outline-none font-mono text-zinc-900 dark:text-zinc-100 hover:border-primary transition-all cursor-pointer shadow-sm appearance-none"
                >
                    <option value="cinematic">CINEMATIC</option>
                    <option value="minimalist">MINIMALIST</option>
                    <option value="noir">NOIR_PROTOCOL</option>
                    <option value="vogue">VOGUE_SYSTEM</option>
                    <option value="industrial">INDUSTRIAL_V4</option>
                </select>
            </div>

            <div className="mt-auto p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 group/preset relative">
                <div className="w-1 h-10 bg-primary group-hover:scale-y-110 transition-transform duration-300" />

                <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter leading-tight">{data.variant || 'NULL_VARIANT'}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">RAPID_AESTHETIC_SYNC</span>
                        <div className="w-1 h-1 bg-primary/20 animate-pulse" />
                    </div>
                </div>

                <div className="absolute top-2 right-3 opacity-20">
                    <Zap size={10} className="text-zinc-400" />
                </div>
            </div>
        </div>
    </NodeContainer>
);
