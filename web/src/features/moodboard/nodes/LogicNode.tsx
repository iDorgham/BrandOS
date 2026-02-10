import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { GitBranch, Maximize } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const LogicNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Logic Gate"
        icon={GitBranch}
        typeColor="bg-amber-500"
        handles={<NodeHandles nodeColor="bg-amber-500" />}
        data={{ ...data, id, type: 'logic' }}
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
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 relative group/gate_header">
                <div className="text-[10px] font-bold font-mono text-zinc-900 dark:text-zinc-100 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-1 h-3 bg-primary" />
                    <span>IF::BRAND_FLOW → {data.label?.toUpperCase() || 'NULL_GATE'}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span>SIGNAL_RESONANCE</span>
                    <span className="text-primary">98.4%_LOCK</span>
                </div>
                <div className="h-1 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-primary/40 w-4/5" />
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 group/gate cursor-pointer">
                    <Maximize size={10} className="text-zinc-400 group-hover:text-primary transition-colors" />
                    <span className="text-[6px] font-mono uppercase tracking-[0.3em] text-zinc-500">EXP_LOGIC_ARRAY</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2].map(i => <div key={i} className="w-[1px] h-[1px] bg-zinc-400" />)}
                </div>
            </div>
        </div>
    </NodeContainer>
);
