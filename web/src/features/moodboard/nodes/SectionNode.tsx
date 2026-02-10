import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { useMoodBoard } from '../MoodBoardContext';

export const SectionNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const { isShiftPressed } = useMoodBoard();

    return (
        <div className={`
      w-full h-full border relative transition-all duration-700 overflow-hidden
      ${selected ? 'border-primary shadow-sm scale-[1.002]' : 'border-border/40'}
      ${data.customColor || 'bg-card/60 backdrop-blur-md'}
      ${data.isLocked ? 'cursor-default' : ''}
    `}>
            <NodeResizer
                isVisible={selected && !data.isLocked}
                minWidth={200}
                minHeight={200}
                keepAspectRatio={isShiftPressed || data.isRatioLocked}
                lineClassName="!border-primary/40"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-125 transition-transform"
            />

            {/* Premium Label for the section */}
            <div className="absolute -top-10 left-0 flex items-center gap-3">
                <div className={`w-[1px] h-4 transition-all duration-500 bg-primary`} />
                <div className="flex flex-col">
                    <span className="text-[12px] font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 italic">{data.label || 'Group_Zone'}</span>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Logical_Partition::{id?.slice(-4).toUpperCase()}</span>
                </div>
            </div>

            {/* Internal Grid System Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                <div className="w-full h-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.5)_1px,transparent_1px)] bg-[length:24px_24px]" />
            </div>

            {/* Technical Perimeter Markers */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-zinc-200 dark:border-zinc-800" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-zinc-200 dark:border-zinc-800" />
        </div>
    );
});
