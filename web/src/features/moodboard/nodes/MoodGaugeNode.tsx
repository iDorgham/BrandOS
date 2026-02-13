import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Gauge } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const MoodGaugeNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Pressure"
        icon={Gauge}
        typeColor="bg-lime-500"
        handles={<NodeHandles nodeColor="bg-lime-500" />}
        data={{ ...data, id, type: 'mood_gauge' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={180}
                minHeight={180}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col items-center gap-8 p-6 h-full">
            <div className="relative w-32 h-32 group/gauge">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" fill="none" strokeWidth="1" className="stroke-zinc-100 dark:stroke-zinc-800" strokeDasharray="2, 4" />
                    <circle
                        cx="64" cy="64" r="58" fill="none" strokeWidth="2"
                        className="stroke-primary transition-all duration-1000 ease-out"
                        strokeDasharray={364}
                        strokeDashoffset={364 - (364 * (data.moodLevel || 50)) / 100}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 italic">{data.moodLevel || 50}%</span>
                    <div className="flex items-center gap-1.5 opacity-40">
                        <div className="w-1 h-1 bg-primary" />
                        <span className="text-[6px] font-mono font-bold uppercase tracking-widest text-zinc-500">ATMOS_FLUX</span>
                    </div>
                </div>
            </div>

            <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span>STATIC</span>
                    <span>KINETIC</span>
                </div>

                <input
                    type="range" min="0" max="100"
                    value={data.moodLevel || 50}
                    onChange={(e) => data.onChange?.(id, { moodLevel: parseInt(e.target.value) })}
                    className="w-full h-1 appearance-none cursor-pointer accent-primary bg-zinc-100 dark:bg-zinc-800 outline-none"
                />

                <div className="w-full grid grid-cols-12 gap-1 h-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-full transition-all duration-500 ${i < Math.floor((data.moodLevel || 50) / 8)
                                ? 'bg-primary'
                                : 'bg-zinc-100 dark:bg-zinc-800'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    </NodeContainer>
);
