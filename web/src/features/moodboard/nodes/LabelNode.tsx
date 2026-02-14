import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Lock } from 'lucide-react';
import { MoodNodeData } from '../types';

export const LabelNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempLabel, setTempLabel] = useState(data.label);

    const typographyStyle: React.CSSProperties = {
        fontFamily: data.fontFamily || 'Inter',
        fontSize: data.fontSize ? `${data.fontSize}pt` : '16px',
        fontWeight: data.fontWeight || 'inherit',
        fontStyle: data.fontStyle || 'inherit',
        textDecoration: data.textDecoration || 'none',
        textTransform: (data.textTransform as React.CSSProperties['textTransform']) || 'none',
        letterSpacing: data.letterSpacing || 'inherit',
        lineHeight: data.lineHeight || 'inherit',
        textAlign: data.textAlign || 'center',
    };

    return (
        <div className={`relative group/label transition-all ${selected ? 'z-50' : 'z-10'} ${data.isLocked ? 'cursor-default' : ''}`}>
            <NodeResizer
                isVisible={selected && !data.isLocked}
                minWidth={40}
                minHeight={20}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
            {isEditing ? (
                <div className="bg-card/90 backdrop-blur-xl border border-primary/30 p-3 shadow-2xl">
                    <input
                        value={tempLabel}
                        onChange={(e) => setTempLabel(e.target.value)}
                        onBlur={() => { data.onChange?.(id, { label: tempLabel }); setIsEditing(false); }}
                        style={typographyStyle}
                        className="bg-transparent border-none outline-none font-bold uppercase text-zinc-900 dark:text-zinc-100 w-full placeholder:text-zinc-400"
                        autoFocus
                        placeholder="ENTER_ID"
                    />
                    <div className="mt-2 text-[6px] font-mono text-center text-zinc-400 tracking-widest uppercase font-bold">COMMIT_ON_EXIT</div>
                </div>
            ) : (
                <div
                    className={`px-8 py-3 transition-all text-center relative group/label_inner ${data.isLocked ? 'cursor-default' : 'cursor-text hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800'}`}
                    onDoubleClick={() => !data.isLocked && setIsEditing(true)}
                >
                    {/* Hover Decoration */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-200 dark:border-zinc-700 opacity-0 group-hover/label_inner:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-200 dark:border-zinc-700 opacity-0 group-hover/label_inner:opacity-100 transition-opacity" />

                    <span
                        style={typographyStyle}
                        className={`font-bold uppercase transition-all duration-500 ${data.label ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-700 italic'} italic block`}
                    >
                        {data.label || 'ADD_LABEL'}
                    </span>

                    {data.isLocked && (
                        <div className="absolute top-1 right-2">
                            <Lock size={10} className="text-primary/40" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});
