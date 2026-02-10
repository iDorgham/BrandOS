import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Zap, Clock, ShieldCheck, MessageSquareText, Table2, HardDrive, Layers, Cpu } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const TriggerNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Trigger"
            icon={Zap}
            typeColor="bg-yellow-500"
            handles={<NodeHandles nodeColor="bg-yellow-500" />}
            data={{ ...data, id, type: 'trigger' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={160}
                    isVisible={selected}
                    lineClassName="!border-yellow-500/60"
                    handleClassName="!w-3 !h-3 !bg-yellow-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-4 p-5 h-full relative overflow-hidden">
                {/* Status Indicator */}
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                        <div className="w-1.5 h-1.5 bg-yellow-500 animate-pulse rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-yellow-600 dark:text-yellow-400">Listening</span>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    {/* Method Selector */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-yellow-500/10 hover:border-yellow-500/40 transition-colors group cursor-pointer">
                            <Clock size={12} className="text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Schedule</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">Daily @ 09:00</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 transition-colors group cursor-pointer opacity-50">
                            <MessageSquareText size={12} className="text-zinc-400 group-hover:text-primary transition-colors" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Telegram</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">External_Webhook</span>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 p-2 border-l-2 border-yellow-500">
                            <span>LAST_SIGNAL</span>
                            <span className="text-zinc-400">2026-02-10 17:42:01</span>
                        </div>
                        <div className="flex items-center gap-2 px-2">
                            <Table2 size={10} className="text-zinc-400" />
                            <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-zinc-400">Sheet_Sync::Active</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={10} className="text-emerald-500" />
                        <span className="text-[6px] font-mono uppercase tracking-widest text-zinc-500">AUTH_BYPASS_OFF</span>
                    </div>
                    <div className="flex gap-1.5 opacity-30">
                        <div className="w-1 h-3 bg-zinc-400" />
                        <div className="w-1 h-3 bg-yellow-500" />
                        <div className="w-1 h-3 bg-zinc-400" />
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
