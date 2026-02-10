import React from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { GripVertical, Lock } from 'lucide-react';
import { MoodNodeData } from '../types';
import { useMoodBoard } from '../MoodBoardContext';

// Helper function
export const hexToRgbForDisplay = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `RGB(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
        : 'RGB(0, 0, 0)';
};

export const CustomHandle = React.memo(({ type, position, id, className, nodeColor }: { type: 'source' | 'target', position: Position, id?: string, className?: string, nodeColor?: string }) => (
    <Handle
        type={type}
        position={position}
        id={id}
        className={`
            !w-3 !h-3 !bg-orange-500 !dark:bg-zinc-950 border border-transparent
            transition-all duration-200 flex items-center justify-center
            ${className}
            hover:scale-150 z-50 shadow-md group/handle rounded-full
        `}
    >
        {/* Inner Target Point - Gray in Light mode, Type-coded in Dark mode */}
        <div className={`w-1 h-1 rounded-full !bg-zinc-100 !dark:${nodeColor?.replace('bg-', 'bg-') || 'bg-primary'} transition-transform duration-300 group-hover/handle:scale-110`} />
    </Handle>
));

export const NodeHandles = React.memo(({ nodeColor }: { nodeColor?: string }) => (
    <>
        <CustomHandle type="target" position={Position.Left} id="l" className="top-1/2 -translate-y-1/2 !-left-[7px]" nodeColor={nodeColor} />
        <CustomHandle type="source" position={Position.Right} id="r" className="top-1/2 -translate-y-1/2 !-right-[7px]" nodeColor={nodeColor} />
        <CustomHandle type="target" position={Position.Top} id="t" className="left-1/2 -translate-x-1/2 !-top-[7px]" nodeColor={nodeColor} />
        <CustomHandle type="source" position={Position.Bottom} id="b" className="left-1/2 -translate-x-1/2 !-bottom-[7px]" nodeColor={nodeColor} />
    </>
));

export const NodeContainer = React.memo(({ children, selected, title, icon: Icon, typeColor, onEdit, isEditing, handles, resizer, data, id, hideHeaderBar }: any) => {
    return (
        <div className={`
            relative group/node w-full h-full
            ${selected ? 'z-50' : 'z-10'}
            transition-all duration-200
        `}>
            {resizer}

            <div className={`
                relative h-full flex flex-col transition-all duration-200
                bg-card/80 backdrop-blur-xl
                border shadow-sm
                ${selected
                    ? 'border-primary shadow-[0_0_0_1px_rgba(var(--primary-rgb),1)] ring-4 ring-primary/10'
                    : 'border-border/40 hover:border-border/60'}
            `}>
                {/* Carbon Style Grid Indicator (Optional/Subtle) */}
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/40 opacity-50" />

                {/* Header Bar - Enhanced Contrast with Type Color Bar */}
                {!hideHeaderBar && (
                    <div className={`
                        h-8 px-2 flex items-center justify-between border-b relative
                        ${selected ? 'bg-primary/20 border-primary/30' : 'bg-transparent border-border/20'}
                    `}>
                        {/* Type Color Bar */}
                        <div className={`absolute top-0 left-0 right-0 h-[2px] ${typeColor}`} />

                        <div className="flex items-center gap-2 overflow-hidden">
                            <Icon size={13} className={`${typeColor?.replace('bg-', 'text-')} dark:${typeColor?.replace('bg-', 'text-')}`} strokeWidth={2} />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 truncate">
                                {title}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {data?.isLocked && <Lock size={10} className="text-zinc-500" />}
                            <span className="text-[8px] font-mono font-bold text-zinc-400 opacity-40">
                                {id?.slice(-4).toUpperCase()}
                            </span>
                        </div>
                    </div>
                )}

                {/* Content Area - 1:1 Base */}
                <div className="relative flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>

                {/* Handles */}
                <div className={`opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 ${selected ? 'opacity-100' : ''}`}>
                    {handles}
                </div>
            </div>
        </div>
    );
});
