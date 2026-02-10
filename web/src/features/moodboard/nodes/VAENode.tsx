import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { Image, Cpu } from 'lucide-react';

export const VAENode = memo(({ data, isConnectable, selected }: { data: MoodNodeData; isConnectable: boolean; selected: boolean }) => {
    return (
        <div className={`
      group relative flex flex-col w-[240px] bg-card/95 backdrop-blur-xl 
      border-2 transition-all duration-300 rounded-lg overflow-hidden
      ${selected
                ? 'border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] scale-[1.02]'
                : 'border-border/50 hover:border-primary/50 hover:shadow-lg'}
    `}>
            {/* Header */}
            <div className="h-10 bg-muted/40 border-b border-border/50 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-primary/10 text-primary">
                        <Cpu size={14} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/90">
                        VAE_Decode
                    </span>
                </div>
            </div>

            {/* Inputs (Left Side) */}
            <div className="relative p-4 space-y-6">
                {/* Latent Input */}
                <div className="relative flex items-center">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="samples"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[19px] !bg-pink-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Latent</span>
                </div>

                {/* VAE Input */}
                <div className="relative flex items-center">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="vae"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[19px] !bg-red-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground ml-1">VAE</span>
                </div>
            </div>

            {/* Preview Area */}
            <div className="mx-4 mb-4 aspect-square bg-black/50 rounded border border-border/50 flex items-center justify-center relative overflow-hidden">
                {data.imageUrl ? (
                    <img src={data.imageUrl} alt="Generated Output" className="w-full h-full object-contain" />
                ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground/30">
                        <Image size={24} className="mb-2" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Awaiting Latent...</span>
                    </div>
                )}

                {/* Processing Overlay */}
                {data.isActive && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                )}
            </div>

            {/* Outputs (Right Side) */}
            <div className="absolute right-0 bottom-1/2 translate-y-1/2">
                <Handle
                    type="source"
                    position={Position.Right}
                    id="image_output"
                    isConnectable={isConnectable}
                    className="!w-3 !h-3 !-right-[7px] !bg-blue-300 !border-2 !border-background transition-all hover:scale-125"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Image</span>
            </div>

        </div>
    );
});
