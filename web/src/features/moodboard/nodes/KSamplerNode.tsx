import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { Activity } from 'lucide-react';
import { NodeContainer } from '../components/NodeComponents';

export const KSamplerNode = memo(({ id, data, selected, isConnectable }: { id: string; data: MoodNodeData; isConnectable?: boolean; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="K_Sampler"
            icon={Activity}
            typeColor="bg-purple-600"
            data={{ ...data, id, type: 'ksampler' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={260}
                    isVisible={selected}
                    lineClassName="!border-purple-600/60"
                    handleClassName="!w-3 !h-3 !bg-purple-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
            handles={
                <>
                    {/* Left inputs (targets) - color-coded */}
                    <Handle type="target" position={Position.Left} id="model" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[7px] !bg-blue-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '28%' }} />
                    <Handle type="target" position={Position.Left} id="positive" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[7px] !bg-green-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '40%' }} />
                    <Handle type="target" position={Position.Left} id="negative" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[7px] !bg-red-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '52%' }} />
                    <Handle type="target" position={Position.Left} id="latent_image" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[7px] !bg-pink-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '64%' }} />
                    {/* Right output (source) */}
                    <Handle type="source" position={Position.Right} id="latent_output" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[7px] !bg-pink-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '50%' }} />
                </>
            }
        >
            <div className="flex flex-col p-4 h-full gap-4">
                {/* Input Labels */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <span>Inputs</span>
                        <div className="flex-1" />
                        <span className="text-[8px] font-mono text-zinc-500">ID: {data.seed || 'RANDOM'}</span>
                    </div>
                    <div className="space-y-1.5 pl-1">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500" />
                            <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase">Model</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500" />
                            <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase">Positive</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500" />
                            <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase">Negative</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-500" />
                            <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase">Latent</span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-3">
                    <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-primary w-0 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-20" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <span className="block text-[7px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Steps</span>
                            <div className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100">{data.steps || 20}</div>
                        </div>
                        <div className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <span className="block text-[7px] font-mono uppercase tracking-widest text-zinc-400 mb-1">CFG</span>
                            <div className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100">{data.cfg || 7.0}</div>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 opacity-40">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 ${data.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                        <span className="text-[6px] font-mono uppercase tracking-widest text-zinc-500">{data.isActive ? 'PROCESSING' : 'IDLE'}</span>
                    </div>
                    <span className="text-[6px] font-mono uppercase tracking-widest text-zinc-500">OUTPUT::LATENT</span>
                </div>
            </div>
        </NodeContainer>
    );
});
