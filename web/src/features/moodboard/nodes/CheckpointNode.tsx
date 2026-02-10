import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { HardDrive, Layers, Cpu } from 'lucide-react';

export const CheckpointNode = memo(({ data, isConnectable, selected }: { data: MoodNodeData; isConnectable: boolean; selected: boolean }) => {
    return (
        <div className={`
      group relative flex flex-col w-[260px] bg-card/95 backdrop-blur-xl 
      border-2 transition-all duration-300 rounded-lg overflow-hidden
      ${selected
                ? 'border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] scale-[1.02]'
                : 'border-border/50 hover:border-primary/50 hover:shadow-lg'}
    `}>
            {/* Header */}
            <div className="h-10 bg-muted/40 border-b border-border/50 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-primary/10 text-primary">
                        <HardDrive size={14} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/90">
                        Model_Loader
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 space-y-3">
                <div className="relative aspect-video rounded bg-muted/30 border border-border/50 overflow-hidden group-hover:border-primary/30 transition-colors">
                    {data.imageUrl ? (
                        <img src={data.imageUrl} alt="Model Cover" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30">
                            <Layers size={24} className="mb-2" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">No Preview</span>
                        </div>
                    )}
                    {/* Model Name Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-2">
                        <div className="text-[10px] font-bold text-white truncate">
                            {data.model || 'SDXL_Turbo_v1.0.safetensors'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Outputs (Right Side) */}
            <div className="absolute -right-[1px] top-[60px] flex flex-col gap-6 items-end">
                {/* MODEL Output */}
                <div className="relative flex items-center group/handle">
                    <span className="mr-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground opacity-0 group-hover/handle:opacity-100 transition-opacity">Model</span>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="model_output"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[6px] !bg-blue-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                </div>

                {/* CLIP Output */}
                <div className="relative flex items-center group/handle">
                    <span className="mr-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground opacity-0 group-hover/handle:opacity-100 transition-opacity">CLIP</span>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="clip_output"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[6px] !bg-yellow-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                </div>

                {/* VAE Output */}
                <div className="relative flex items-center group/handle">
                    <span className="mr-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground opacity-0 group-hover/handle:opacity-100 transition-opacity">VAE</span>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="vae_output"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-right-[6px] !bg-red-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                </div>
            </div>

        </div>
    );
});
