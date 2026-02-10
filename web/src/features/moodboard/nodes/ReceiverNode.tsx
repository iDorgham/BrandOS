import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Terminal, ShieldAlert, CheckCircle2, ListFilter, Search } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const ReceiverNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Receiver"
            icon={Terminal}
            typeColor="bg-emerald-600"
            handles={<NodeHandles nodeColor="bg-emerald-600" />}
            data={{ ...data, id, type: 'receiver' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={320}
                    minHeight={240}
                    isVisible={selected}
                    lineClassName="!border-emerald-600/60"
                    handleClassName="!w-3 !h-3 !bg-emerald-600 !border-background !rounded-full"
                />
            }
        >
            <div className="flex flex-col p-6 h-full font-mono bg-black/5 dark:bg-zinc-950/40">
                {/* Protocol Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <ListFilter size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">Data_Sieve</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="text-[8px] font-bold text-emerald-500 uppercase">Val_OK</span>
                    </div>
                </div>

                {/* Console Log Area */}
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 space-y-2 overflow-hidden relative group">
                    <div className="flex items-center gap-3 text-[8px] text-zinc-400 border-b border-zinc-100 dark:border-zinc-900 pb-2 mb-2">
                        <Search size={10} />
                        <span>LOG_STREAM_TERMINAL_V.01</span>
                    </div>
                    <div className="space-y-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="text-[7px] text-zinc-500 flex gap-2">
                            <span className="text-emerald-500">[INFO]</span> <span>SIGNAL_BATCH_RECEIVED::14kb</span>
                        </div>
                        <div className="text-[7px] text-zinc-500 flex gap-2">
                            <span className="text-emerald-500">[INFO]</span> <span>SCHEMA_VALIDATION_COMPLETE</span>
                        </div>
                        <div className="text-[7px] text-zinc-500 flex gap-2">
                            <span className="text-amber-500">[WARN]</span> <span>LATENCY_SPIKE_DETECTED::102ms</span>
                        </div>
                        <div className="text-[7px] text-zinc-500 flex gap-2">
                            <span className="text-emerald-500">[DONE]</span> <span>SYNC_FINALIZED_FOR_ENCODER</span>
                        </div>
                    </div>

                    {/* Console Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-4 animate-scanline" />
                </div>

                {/* Error Summary */}
                <div className="mt-6 flex items-center justify-between p-3 bg-emerald-500/5 border border-emerald-500/10">
                    <div className="flex items-center gap-3">
                        <ShieldAlert size={14} className="text-zinc-400" />
                        <div>
                            <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none">Integrity_Check</div>
                            <div className="text-[6px] text-zinc-400 uppercase tracking-widest mt-1">Zero_Fatal_Exceptions</div>
                        </div>
                    </div>
                    <div className="w-10 h-6 bg-zinc-900 flex items-center justify-center">
                        <span className="text-[10px] text-emerald-500 font-black">00</span>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
