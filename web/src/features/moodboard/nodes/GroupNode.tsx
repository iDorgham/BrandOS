import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { Box, ChevronDown, ChevronRight, Settings2 } from 'lucide-react';
import { useMoodBoard } from '../MoodBoardContext';
import { MoodNodeData } from '../types';

export const GroupNode = memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const { onToggleCollapse } = useMoodBoard();
    const isCollapsed = data.isCollapsed;
    const colorClass = (data.color as string) || 'bg-slate-800';

    // Extract border color/text color mapping
    const colorMap: Record<string, string> = {
        'bg-blue-500': 'border-blue-500/40 text-blue-500',
        'bg-emerald-500': 'border-emerald-500/40 text-emerald-500',
        'bg-amber-500': 'border-amber-500/40 text-amber-500',
        'bg-purple-500': 'border-purple-500/40 text-purple-500',
        'bg-rose-500': 'border-rose-500/40 text-rose-500',
        'bg-cyan-500': 'border-cyan-500/40 text-cyan-500',
        'bg-orange-500': 'border-orange-500/40 text-orange-500',
    };

    const colorSpecs = colorMap[colorClass] || 'border-primary/40 text-primary';
    const borderColor = colorSpecs.split(' ')[0];
    const textColor = colorSpecs.split(' ')[1];

    const bgColorMap: Record<string, string> = {
        'bg-blue-500': 'bg-blue-500/5',
        'bg-emerald-500': 'bg-emerald-500/5',
        'bg-amber-500': 'bg-amber-500/5',
        'bg-purple-500': 'bg-purple-500/5',
        'bg-rose-500': 'bg-rose-500/5',
        'bg-cyan-500': 'bg-cyan-500/5',
        'bg-orange-500': 'bg-orange-500/5',
    };

    const bgColor = bgColorMap[colorClass] || 'bg-primary/5';

    return (
        <div className={`h-full w-full flex flex-col transition-all duration-300 ${isCollapsed ? 'overflow-hidden' : ''}`}>
            <NodeResizer
                minWidth={300}
                minHeight={200}
                isVisible={selected && !isCollapsed}
                lineClassName="!border-primary/40"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />

            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                id="group_in"
                className={`!w-2 !h-6 !rounded-none !border-none !transition-all hover:!w-3 ${colorClass} !opacity-30 hover:!opacity-100`}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
            />

            {/* Group Header */}
            <div className={`flex items-center justify-between px-3 h-8 shrink-0 border-b border-dashed ${borderColor} ${bgColor} backdrop-blur-md`}>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colorClass} shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]`} />
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${textColor}`}>
                        {data.label || 'UNTITLED_GROUP'}
                    </span>
                    <span className="text-[7px] font-mono text-muted-foreground/30 ml-1">
                        NODE_ARRAY_ROOT
                    </span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover/node:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleCollapse?.(id);
                        }}
                        className="p-1 text-muted-foreground/30 hover:text-foreground transition-colors"
                        title={isCollapsed ? 'Expand Group' : 'Collapse Group'}
                    >
                        {isCollapsed ? <ChevronRight size={10} /> : <ChevronDown size={10} />}
                    </button>
                    <button className="p-1 text-muted-foreground/30 hover:text-foreground transition-colors">
                        <Settings2 size={10} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 relative ${isCollapsed ? 'bg-zinc-950/20' : ''}`}>
                {!isCollapsed && (
                    <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-primary/5 m-2" />
                )}

                {isCollapsed && (
                    <div className="h-full flex flex-col items-center justify-center p-6 gap-3">
                        <Box size={20} className={`${textColor} opacity-20`} />
                        <div className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest text-center">
                            Workflow Encapsulated<br />
                            <span className="text-[7px] opacity-60">Output Stream Active</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id="group_out"
                className={`!w-2 !h-6 !rounded-none !border-none !transition-all hover:!w-3 ${colorClass} !opacity-30 hover:!opacity-100`}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
            />

            {/* Status Footer */}
            <div className={`h-4 border-t border-dashed ${borderColor} flex items-center justify-between px-2 bg-background/40`}>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-1 h-1 rounded-full ${colorClass} opacity-20`} />
                    ))}
                </div>
                <div className="text-[6px] font-mono text-muted-foreground/30 uppercase tracking-tighter">
                    Status::Nominal
                </div>
            </div>
        </div>
    );
});

GroupNode.displayName = 'GroupNode';
