import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Swords, Chrome } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const CompetitorNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Comparison"
        icon={Swords}
        typeColor="bg-stone-600"
        handles={<NodeHandles nodeColor="bg-stone-600" />}
        data={{ ...data, id, type: 'competitor' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={200}
                minHeight={150}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-[8px] font-bold font-mono uppercase text-zinc-400 tracking-widest">Comp_Entity_ID</span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={data.competitorName || ''}
                        placeholder="AWAITING_ID..."
                        onChange={(e) => data.onChange?.(id, { competitorName: e.target.value.toUpperCase() })}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-[11px] font-bold outline-none placeholder:opacity-20 font-mono tracking-tighter text-zinc-900 dark:text-zinc-100 transition-all shadow-sm uppercase"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 relative group/metrics">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <span className="text-[7px] font-mono font-bold uppercase text-zinc-400 tracking-widest">Market_Satur_Data</span>
                        <span className="text-[14px] font-bold text-primary italic leading-none">{data.marketShare || 20}%</span>
                    </div>
                    <div className="flex gap-1 mb-1">
                        {[1, 2].map(i => (
                            <div key={i} className={`w-1 h-1 ${i <= 1 ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="h-1 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                        <div
                            className="h-full bg-primary relative transition-all duration-1000"
                            style={{ width: `${data.marketShare || 20}%` }}
                        />
                    </div>
                    <input
                        type="range" min="1" max="100"
                        value={data.marketShare || 20}
                        onChange={(e) => data.onChange?.(id, { marketShare: parseInt(e.target.value) })}
                        className="w-full h-1 appearance-none cursor-pointer accent-primary bg-zinc-100 dark:bg-zinc-800 outline-none"
                    />
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between opacity-30">
                <div className="w-12 h-[1px] bg-zinc-400" />
                <span className="text-[6px] font-mono font-bold uppercase tracking-widest text-zinc-500">SYS_METRIC_V4</span>
            </div>
        </div>
    </NodeContainer>
);
