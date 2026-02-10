import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Database } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const CMSSyncNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Data_Sync"
        icon={Database}
        typeColor="bg-orange-500"
        handles={<NodeHandles nodeColor="bg-orange-500" />}
        data={{ ...data, id, type: 'cms_sync' }}
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
        <div className="flex flex-col gap-6 p-6 items-center justify-center h-full relative overflow-hidden">
            <div className="relative group/sync_icon">
                <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-inner group-hover:border-primary transition-all duration-300">
                    <Database size={24} className="text-zinc-400 dark:text-zinc-600 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                </div>
            </div>

            <div className="w-full space-y-4">
                <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold font-mono tracking-widest text-zinc-400 uppercase leading-tight">SYNC_STREAM</span>
                        <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">DATA_SYNCHRONIZED</span>
                    </div>
                    <div className="px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-700 text-[6px] font-mono font-bold text-zinc-500 uppercase">
                        STB_O_3
                    </div>
                </div>

                <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-primary w-full animate-[progress_3s_ease-in-out_infinite]" />
                </div>

                <div className="flex justify-between items-center text-[7px] font-mono text-zinc-400 uppercase tracking-widest">
                    <span>PKT_LATENCY::0.02s</span>
                    <span className="text-primary/60 font-bold">60HZ_REFRESH</span>
                </div>
            </div>
        </div>
    </NodeContainer>
);
