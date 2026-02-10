import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Grid3X3 } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const GridSysNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Grid_Array"
        icon={Grid3X3}
        typeColor="bg-blue-600"
        handles={<NodeHandles nodeColor="bg-blue-600" />}
        data={{ ...data, id, type: 'grid' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={150}
                minHeight={150}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group/input">
                    <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <span className="text-[8px] uppercase font-bold tracking-widest text-zinc-400">COL_STRUC</span>
                    </div>
                    <input
                        type="number"
                        value={data.gridCols || 12}
                        onChange={(e) => data.onChange?.(id, { gridCols: parseInt(e.target.value) })}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-[11px] font-mono font-bold outline-none text-zinc-900 dark:text-zinc-100 transition-all shadow-sm"
                    />
                </div>
                <div className="space-y-2 group/input">
                    <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <span className="text-[8px] uppercase font-bold tracking-widest text-zinc-400">GUTTER_VAL</span>
                    </div>
                    <input
                        type="number"
                        value={data.gap || 24}
                        onChange={(e) => data.onChange?.(id, { gap: parseInt(e.target.value) })}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-[11px] font-mono font-bold outline-none text-zinc-900 dark:text-zinc-100 transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative p-5 overflow-hidden shadow-inner min-h-[140px]">
                <div
                    className="w-full h-full grid gap-2 relative z-10"
                    style={{ gridTemplateColumns: `repeat(${data.gridCols || 12}, 1fr)` }}
                >
                    {Array.from({ length: (data.gridCols || 12) }).map((_, i) => (
                        <div key={i} className="h-full bg-primary/10 border-x border-primary/5 shadow-sm" />
                    ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="flex items-center gap-2 opacity-40">
                        <div className="w-1 h-1 bg-primary" />
                        <span className="text-[7px] font-mono font-bold text-zinc-500 tracking-widest uppercase">
                            ARRAY_SYNC_ACTIVE
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1 opacity-40 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <div className="flex flex-col gap-1">
                    <span className="text-[6px] font-mono font-bold tracking-widest uppercase text-zinc-400">Grid_Mode</span>
                    <span className="text-[9px] font-mono font-bold text-primary italic">FRACTIONAL_12</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[6px] font-mono font-bold tracking-widest uppercase text-zinc-400">Precision</span>
                    <span className="text-[9px] font-mono font-bold text-primary italic">SUB-PIXEL_V2</span>
                </div>
            </div>
        </div>
    </NodeContainer>
);
