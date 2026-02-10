import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { CaseUpper } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const TypographyNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const families = ['IBM Plex Sans', 'IBM Plex Mono', 'Inter', 'Roboto', 'Playfair Display', 'Space Grotesk'];
    const weights = ['Regular', 'Medium', 'Bold', 'Black'];

    return (
        <NodeContainer
            selected={selected}
            title="Specimen"
            icon={CaseUpper}
            typeColor="bg-blue-600"
            handles={<NodeHandles nodeColor="bg-blue-600" />}
            data={{ ...data, id, type: 'typography' }}
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
            <div className="flex flex-col gap-6 p-6 h-full bg-white dark:bg-zinc-900/40">
                <div className="space-y-4">
                    <div className="space-y-2 group/selector">
                        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-[8px] font-bold font-mono uppercase tracking-widest text-zinc-400">AESTHETIC_FAMILY</span>
                        </div>
                        <select
                            value={data.fontFamily}
                            onChange={(e) => data.onChange?.(id, { fontFamily: e.target.value })}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-[11px] font-bold outline-none font-mono text-zinc-900 dark:text-zinc-100 hover:border-primary transition-all uppercase tracking-tight shadow-sm cursor-pointer appearance-none"
                        >
                            {families.map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <span className="text-[7px] font-mono font-bold uppercase text-zinc-400">Weight</span>
                            <select
                                value={data.fontWeight}
                                onChange={(e) => data.onChange?.(id, { fontWeight: e.target.value })}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-[10px] font-bold font-mono outline-none text-zinc-900 dark:text-zinc-100 uppercase tracking-tight appearance-none"
                            >
                                {weights.map(w => <option key={w} value={w}>{w.toUpperCase()}</option>)}
                            </select>
                        </div>
                        <div className="w-24 space-y-2">
                            <span className="text-[7px] font-mono font-bold uppercase text-zinc-400">Dimension</span>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.fontSize || 16}
                                    onChange={(e) => data.onChange?.(id, { fontSize: parseInt(e.target.value) })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-[10px] font-bold font-mono outline-none text-primary"
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[7px] font-mono font-bold opacity-30">PX</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative group/specimen flex items-center justify-center min-h-[120px]">
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-zinc-200 dark:border-zinc-700" />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-zinc-200 dark:border-zinc-700" />

                    <div className="flex items-center justify-center overflow-hidden w-full">
                        <span style={{
                            fontFamily: data.fontFamily || 'Inter',
                            fontWeight: (data.fontWeight?.toLowerCase() === 'black' ? 900 : data.fontWeight?.toLowerCase() === 'bold' ? 700 : data.fontWeight?.toLowerCase() === 'medium' ? 500 : 400),
                            fontSize: `${Math.min(data.fontSize || 16, 48)}px`
                        }} className="text-zinc-900 dark:text-zinc-100 truncate w-full text-center tracking-tighter transition-all duration-500 group-hover:scale-110 italic">
                            AaBbCc123
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[7px] font-mono mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-400 font-bold uppercase">Kerning</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold">{data.letterSpacing || 'AUTO'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-400 font-bold uppercase">Leading</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold">{data.lineHeight || '1.61'}</span>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
