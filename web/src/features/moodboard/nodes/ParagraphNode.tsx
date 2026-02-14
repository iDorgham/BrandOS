import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { AlignLeft } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const ParagraphNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState(data.content || '');

    const typographyStyle: React.CSSProperties = {
        fontFamily: data.fontFamily || 'inherit',
        fontSize: data.fontSize ? `${data.fontSize}pt` : '13px',
        fontWeight: data.fontWeight || 'inherit',
        fontStyle: data.fontStyle || 'inherit',
        textDecoration: data.textDecoration || 'none',
        textTransform: (data.textTransform as React.CSSProperties['textTransform']) || 'none',
        letterSpacing: data.letterSpacing || 'inherit',
        lineHeight: data.lineHeight || '1.8',
        textAlign: data.textAlign || 'left',
    };

    return (
        <NodeContainer
            selected={selected}
            title="Copy"
            icon={AlignLeft}
            typeColor="bg-blue-600"
            onEdit={() => setIsEditing(!isEditing)}
            isEditing={isEditing}
            handles={<TypedHandles nodeType="paragraph" />}
            data={{ ...data, id, type: 'paragraph' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={200}
                    minHeight={120}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-primary/60"
                    handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            {isEditing ? (
                <textarea
                    value={tempContent}
                    onChange={(e) => setTempContent(e.target.value)}
                    onBlur={() => { data.onChange?.(id, { content: tempContent }); setIsEditing(false); }}
                    style={typographyStyle}
                    className="w-full h-full bg-zinc-50 dark:bg-zinc-900/50 p-6 outline-none border-0 resize-none text-zinc-900 dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-900 transition-all font-sans"
                    placeholder="Enter detailed narrative..."
                    autoFocus
                />
            ) : (
                <div className={`p-6 h-full flex flex-col group/para overflow-y-auto ${data.isLocked ? 'cursor-default' : 'cursor-text'}`} onClick={() => !data.isLocked && setIsEditing(true)}>
                    <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <span className="text-[8px] font-bold font-mono tracking-widest text-zinc-400 uppercase">COPY_BLOCK / STREAM_A</span>
                    </div>
                    <p
                        style={typographyStyle}
                        className={`font-sans transition-all duration-300 ${data.content ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-300 dark:text-zinc-700 italic'}`}
                    >
                        {data.content || 'Awaiting doctrinal flow components...'}
                    </p>
                    {data.content && (
                        <div className="mt-auto pt-4 flex justify-between items-center opacity-40">
                            <span className="text-[6px] font-mono uppercase tracking-[0.2em] text-zinc-500">SYNCHRONIZATION::COMPLETE</span>
                            <div className="flex gap-1.5">
                                {[1, 2].map(i => <div key={i} className="w-0.5 h-0.5 bg-zinc-400" />)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </NodeContainer>
    );
});
