import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Palette } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles, hexToRgbForDisplay } from '../components/NodeComponents';
import { useMoodBoard } from '../MoodBoardContext';

export const PaletteNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const { brand } = useMoodBoard();
    return (
        <NodeContainer
            selected={selected}
            title="Chromatic"
            icon={Palette}
            typeColor="bg-blue-600"
            handles={<NodeHandles nodeColor="bg-blue-600" />}
            data={{ ...data, id, type: 'palette' }}
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
                <div className="space-y-4">
                    <div className="flex items-center gap-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm relative overflow-hidden group/pal_preview">
                        <div
                            className="w-16 h-16 border border-zinc-200 dark:border-zinc-800 shadow-inner group-hover/pal_preview:scale-110 transition-transform duration-500 relative flex items-center justify-center p-1 bg-white dark:bg-zinc-950"
                        >
                            <div className="w-full h-full" style={{ backgroundColor: data.color || '#ffffff' }} />
                        </div>

                        <div className="flex flex-col justify-center gap-1 z-10">
                            <span className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 uppercase italic tracking-tighter">{data.color || '#FFFFFF'}</span>
                            <div className="flex flex-col gap-1 mt-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[7px] font-mono font-bold text-zinc-400 tracking-widest uppercase">HEX_CODE</span>
                                    <span className="text-[7px] font-mono font-bold text-primary italic">{data.color?.substring(1) || 'FFFFFF'}</span>
                                </div>
                                <span className="text-[6px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{hexToRgbForDisplay(data.color || '#ffffff')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-[1px] h-3 bg-primary" />
                            <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-400">Brand_Matrix_Sync</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-primary/40" />
                            <div className="w-1 h-1 bg-zinc-100 dark:bg-zinc-800" />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        {brand.palette.map(c => (
                            <button
                                key={c.id}
                                onClick={() => data.onChange?.(id, { color: c.hex, label: c.label })}
                                className={`
                                    aspect-square border border-zinc-200 dark:border-zinc-800 transition-all duration-300 relative group/swatch p-0.5 bg-white dark:bg-zinc-950
                                    ${data.color === c.hex ? 'ring-1 ring-primary scale-110 z-10' : 'hover:scale-105'}
                                `}
                                title={c.label}
                            >
                                <div className="w-full h-full" style={{ backgroundColor: c.hex }} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-4 text-[7px] font-mono pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-400 font-bold uppercase">CONTRAST_RATIO</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold italic">PASSED_AA::9.8:1</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-zinc-400 font-bold uppercase">TYPE</span>
                        <span className="text-primary font-bold italic">PRIME_VECTOR</span>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
