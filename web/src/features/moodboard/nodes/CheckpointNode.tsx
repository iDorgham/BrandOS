import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { HardDrive, Layers } from 'lucide-react';
import { NodeContainer } from '../components/NodeComponents';

export const CheckpointNode = memo(({ id, data, selected, isConnectable }: { id: string; data: MoodNodeData; isConnectable?: boolean; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Model_Loader"
            icon={HardDrive}
            typeColor="bg-blue-600"
            data={{ ...data, id, type: 'checkpoint' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={220}
                    minHeight={140}
                    isVisible={selected}
                    lineClassName="!border-blue-600/60"
                    handleClassName="!w-3 !h-3 !bg-blue-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
            handles={
                <>
                    {/* Left input handle */}
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="l"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[7px] !bg-orange-500 !border-transparent transition-all hover:scale-150 z-50 shadow-md rounded-full top-1/2 -translate-y-1/2"
                    />
                    {/* MODEL Output */}
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="model_output"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[7px] !bg-blue-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '35%' }}
                    />
                    {/* CLIP Output */}
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="clip_output"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[7px] !bg-yellow-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '55%' }}
                    />
                    {/* VAE Output */}
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="vae_output"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[7px] !bg-red-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '75%' }}
                    />
                </>
            }
        >
            <div className="p-4 space-y-3">
                {/* Model Preview */}
                <div className="relative aspect-video bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden group/preview">
                    {data.imageUrl ? (
                        <img src={data.imageUrl} alt="Model Cover" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <Layers size={24} className="text-zinc-300 dark:text-zinc-700 mb-2" strokeWidth={1} />
                            <span className="text-[8px] font-bold font-mono uppercase tracking-widest text-zinc-400">No Preview</span>
                        </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-zinc-900/70 p-2">
                        <div className="text-[9px] font-bold font-mono text-white truncate uppercase tracking-tight">
                            {data.model || 'SDXL_Turbo_v1.0.safetensors'}
                        </div>
                    </div>
                </div>

                {/* Output Labels */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                        <span>Outputs</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-blue-500" />
                            <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase">Model</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-yellow-500" />
                            <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase">CLIP</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-red-500" />
                            <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase">VAE</span>
                        </div>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
