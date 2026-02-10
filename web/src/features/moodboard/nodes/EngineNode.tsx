import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Cpu, Database, Sparkles, Brain, Shrink } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const EngineNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Engine"
            icon={Cpu}
            typeColor="bg-violet-600"
            handles={<NodeHandles nodeColor="bg-violet-600" />}
            data={{ ...data, id, type: 'engine' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={300}
                    minHeight={200}
                    isVisible={selected}
                    lineClassName="!border-violet-600/60"
                    handleClassName="!w-3 !h-3 !bg-violet-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-5 p-6 h-full font-mono">
                {/* Model Configuration */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-violet-400 border-b border-violet-500/20 pb-2">
                        <span>MODEL_SELECTION</span>
                        <div className="flex gap-4">
                            <span className="text-white hover:text-violet-400 cursor-pointer transition-colors shadow-[0_0_10px_rgba(124,58,237,0.3)]">GPT-4o</span>
                            <span className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity">CLAUDE-3.5</span>
                            <span className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity">GEMINI-1.5</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-zinc-900 border border-violet-500/20 rounded-sm">
                        <Brain size={14} className="text-violet-500 animate-pulse" />
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-white uppercase tracking-wider">Aesthetic_Intelligence_v4</div>
                            <div className="text-[7px] text-zinc-500 uppercase tracking-widest mt-0.5">Parameter_Space::1.8T</div>
                        </div>
                        <Shrink size={12} className="text-zinc-600 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>

                {/* Sub-Context Layers */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 flex flex-col gap-2 group cursor-pointer hover:border-violet-500/40 transition-all">
                        <div className="flex items-center justify-between">
                            <Database size={12} className="text-zinc-500 group-hover:text-violet-500 transition-colors" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Memory_SYNC</span>
                        <span className="text-[6px] text-zinc-600">PostgreSQL_LVM</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 flex flex-col gap-2 group cursor-pointer hover:border-violet-500/40 transition-all">
                        <div className="flex items-center justify-between">
                            <Sparkles size={12} className="text-zinc-500 group-hover:text-violet-500 transition-colors" />
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Brand_DNA</span>
                        <span className="text-[6px] text-zinc-600">DNA_Active::P-001</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[7px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                        <span>Latence::24ms</span>
                        <span>Token_Flow::1.2k/s</span>
                    </div>
                    <div className="h-[2px] w-full bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-violet-600 w-3/4 animate-shimmer" />
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
