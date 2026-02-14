import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Heading1 } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';
import { useMoodBoard } from '../MoodBoardContext';

export const TitleNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState(data.content || '');

    const { isShiftPressed } = useMoodBoard();

    const typographyStyle: React.CSSProperties = {
        fontFamily: data.fontFamily || 'Inter',
        fontSize: data.fontSize ? `${data.fontSize}pt` : '30px',
        fontWeight: data.fontWeight || '900',
        fontStyle: data.fontStyle || 'inherit',
        textDecoration: data.textDecoration || 'none',
        textTransform: (data.textTransform as React.CSSProperties['textTransform']) || 'none',
        letterSpacing: data.letterSpacing || 'inherit',
        lineHeight: data.lineHeight || '1',
        textAlign: data.textAlign || 'left',
    };

    return (
        <NodeContainer
            selected={selected}
            title="Section"
            icon={Heading1}
            typeColor="bg-indigo-600"
            onEdit={() => setIsEditing(!isEditing)}
            isEditing={isEditing}
            handles={<TypedHandles nodeType="title" />}
            data={{ ...data, id, type: 'title' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={150}
                    minHeight={60}
                    isVisible={selected && !data.isLocked}
                    keepAspectRatio={isShiftPressed || data.isRatioLocked}
                    lineClassName="!border-primary/60"
                    handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            {isEditing ? (
                <div className="px-6 h-full flex flex-col justify-center">
                    <input
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        onBlur={() => { data.onChange?.(id, { content: tempContent }); setIsEditing(false); }}
                        style={typographyStyle}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 px-4 py-2 font-black outline-none border border-primary text-zinc-900 dark:text-zinc-100 uppercase"
                        placeholder="ENTER_TITLE"
                        autoFocus
                    />
                </div>
            ) : (
                <div className={`px-6 h-full flex flex-col justify-center group/title ${data.isLocked ? 'cursor-default' : 'cursor-text'}`} onClick={() => !data.isLocked && setIsEditing(true)}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-[1px] bg-primary" />
                        <span className="text-[7px] font-mono font-bold tracking-[0.3em] text-zinc-500 uppercase">SECTION_HEADER</span>
                    </div>
                    <h1
                        style={typographyStyle}
                        className={`font-black transition-all duration-300 uppercase ${data.content ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-200 dark:text-zinc-800'}`}
                    >
                        {data.content || 'ADD_TITLE'}
                    </h1>
                </div>
            )}
        </NodeContainer>
    );
});
