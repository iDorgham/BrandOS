import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { Image, Cpu } from 'lucide-react';
import { NodeContainer } from '../components/NodeComponents';

export const VAENode = memo(({ id, data, selected, isConnectable }: { id: string; data: MoodNodeData; isConnectable?: boolean; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="VAE_Decode"
            icon={Cpu}
            typeColor="bg-red-500"
            data={{ ...data, id, type: 'vae' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={200}
                    minHeight={200}
                    isVisible={selected}
                    lineClassName="!border-red-500/60"
                    handleClassName="!w-3 !h-3 !bg-red-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
            handles={
                <>
                    {/* Left inputs (targets) */}
                    <Handle type="target" position={Position.Left} id="samples" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[7px] !bg-pink-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '35%' }} />
                    <Handle type="target" position={Position.Left} id="vae" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[7px] !bg-red-500 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '50%' }} />
                    {/* Right output (source) */}
                    <Handle type="source" position={Position.Right} id="image_output" isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[7px] !bg-blue-300 !border-2 !border-background transition-all hover:scale-150 z-50 shadow-md rounded-full"
                        style={{ top: '50%' }} />
                </>
            }
        >
            <div className="flex flex-col p-4 h-full gap-3">
                {/* Input Labels */}
                <div className="space-y-1.5 pl-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-500" />
                        <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase">Latent</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500" />
                        <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase">VAE</span>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden min-h-[120px]">
                    {data.imageUrl ? (
                        <img src={data.imageUrl} alt="Generated Output" className="w-full h-full object-contain" />
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <Image size={24} className="text-zinc-300 dark:text-zinc-700 mb-2" strokeWidth={1} />
                            <span className="text-[8px] font-bold font-mono uppercase tracking-widest text-zinc-400">Awaiting Latent...</span>
                        </div>
                    )}

                    {/* Processing Overlay */}
                    {data.isActive && (
                        <div className="absolute inset-0 bg-zinc-900/50 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
                        </div>
                    )}
                </div>

                {/* Output Label */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 opacity-40">
                    <span className="text-[6px] font-mono uppercase tracking-widest text-zinc-500">DECODER_ACTIVE</span>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-blue-300" />
                        <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase">Image Out</span>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
