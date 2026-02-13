import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Layers } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const TextureNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Material"
        icon={Layers}
        typeColor="bg-slate-400"
        handles={<NodeHandles nodeColor="bg-slate-400" />}
        data={{ ...data, id, type: 'texture' }}
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
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-[8px] font-bold font-mono tracking-widest text-zinc-400 uppercase">MATERIAL_SPEC / V3</span>
                </div>
                <select
                    value={data.variant}
                    onChange={(e) => data.onChange?.(id, { variant: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-[11px] font-bold outline-none font-mono text-zinc-900 dark:text-zinc-100 hover:border-primary transition-all cursor-pointer shadow-sm appearance-none"
                >
                    <option value="grainy">FILM_GRAIN</option>
                    <option value="glossy">HIGH_GLOSS</option>
                    <option value="matte">SOFT_MATTE</option>
                    <option value="organic">ORGANIC_V3</option>
                    <option value="chrome">CHROME_POLISH</option>
                </select>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-400">BUMP_INTENSITY</span>
                    <span className="text-[10px] font-mono font-bold text-primary">{data.intensity || 50}%</span>
                </div>
                <input
                    type="range" min="0" max="100"
                    value={data.intensity || 50}
                    onChange={(e) => data.onChange?.(id, { intensity: parseInt(e.target.value) })}
                    className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 appearance-none cursor-pointer accent-primary rounded-full outline-none"
                />
            </div>

            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden relative group/material shadow-inner">
                {/* Dynamic Material Backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/10 via-transparent to-white/5" />

                {data.variant === 'grainy' && <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none grayscale" />}
                {data.variant === 'glossy' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent skew-y-12 transition-transform duration-1000 group-hover/material:translate-x-full -translate-x-full pointer-events-none" />
                )}

                {/* Meta Overlay */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 opacity-40">
                    <div className="w-1 h-1 bg-primary" />
                    <span className="text-[6px] font-mono font-bold uppercase text-zinc-500 tracking-widest">PHYSICAL_RENDER_ACTIVE</span>
                </div>
            </div>
        </div>
    </NodeContainer>
);
