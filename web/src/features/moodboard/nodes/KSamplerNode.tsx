import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { Layers, Activity, Play, Zap } from 'lucide-react';

export const KSamplerNode = memo(({ data, isConnectable, selected }: { data: MoodNodeData; isConnectable: boolean; selected: boolean }) => {
    return (
        <div className={`
      group relative flex flex-col w-[320px] bg-card/95 backdrop-blur-xl 
      border-2 transition-all duration-300 rounded-lg overflow-hidden
      ${selected
                ? 'border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] scale-[1.02]'
                : 'border-border/50 hover:border-primary/50 hover:shadow-lg'}
    `}>
            {/* Header */}
            <div className="h-10 bg-muted/40 border-b border-border/50 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-primary/10 text-primary">
                        <Activity size={14} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/90">
                        K_Sampler_Engine
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-1.5 py-0.5 rounded bg-background border border-border/50 text-[9px] font-mono text-muted-foreground">
                        ID: {data.seed || 'RANDOM'}
                    </div>
                </div>
            </div>

            {/* Inputs (Left Side) */}
            <div className="relative p-4 space-y-6">
                {/* Model Input */}
                <div className="relative flex items-center">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="model"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[19px] !bg-blue-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Model</span>
                </div>

                {/* Positive Conditioning */}
                <div className="relative flex items-center">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="positive"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[19px] !bg-green-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Positive</span>
                </div>

                {/* Negative Conditioning */}
                <div className="relative flex items-center">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="negative"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[19px] !bg-red-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Negative</span>
                </div>

                {/* Latent Input */}
                <div className="relative flex items-center">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="latent_image"
                        isConnectable={isConnectable}
                        className="!w-3 !h-3 !-left-[19px] !bg-pink-500 !border-2 !border-background transition-all hover:scale-125"
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Latent</span>
                </div>
            </div>

            {/* Controls Area */}
            <div className="px-4 pb-4 space-y-3">
                {/* Progress Bar (Visual only for now) */}
                <div className="h-1 w-full bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-0 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-20" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/20 rounded border border-border/50">
                        <span className="block text-[8px] uppercase tracking-widest text-muted-foreground mb-1">Steps</span>
                        <div className="text-xs font-mono font-bold text-foreground">{data.steps || 20}</div>
                    </div>
                    <div className="p-2 bg-muted/20 rounded border border-border/50">
                        <span className="block text-[8px] uppercase tracking-widest text-muted-foreground mb-1">CFG</span>
                        <div className="text-xs font-mono font-bold text-foreground">{data.cfg || 7.0}</div>
                    </div>
                </div>
            </div>

            {/* Outputs (Right Side) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Handle
                    type="source"
                    position={Position.Right}
                    id="latent_output"
                    isConnectable={isConnectable}
                    className="!w-3 !h-3 !-right-[7px] !bg-pink-500 !border-2 !border-background transition-all hover:scale-125"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Latent</span>
            </div>

            {/* Execution Indicator */}
            <div className="absolute top-2 right-2">
                <div className={`w-2 h-2 rounded-full ${data.isActive ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
            </div>

        </div>
    );
});
