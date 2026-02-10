import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { CloudRain } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const WeatherNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Atmosphere"
        icon={CloudRain}
        typeColor="bg-cyan-500"
        handles={<NodeHandles nodeColor="bg-cyan-500" />}
        data={{ ...data, id, type: 'weather' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={180}
                minHeight={150}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full border-zinc-100 dark:border-zinc-800">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[48px] font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 leading-none">18°</span>
                        <span className="text-[12px] font-mono font-bold text-zinc-400 uppercase tracking-widest">CEL</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-primary" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">London_UK</span>
                    </div>
                </div>
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    <CloudRain size={24} className="text-zinc-400 group-hover:text-primary transition-colors" strokeWidth={1} />
                </div>
            </div>

            <div className="mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-6 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase text-zinc-400 tracking-widest block">Humidity</span>
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100">82%</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase text-zinc-400 tracking-widest block">Wind_V</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100">12KM/H</span>
                        </div>
                    </div>
                </div>

                <div className="h-0.5 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-primary/40 w-[60%]" />
                </div>
            </div>
        </div>
    </NodeContainer>
);
