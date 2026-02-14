import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Type } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';
import { useMoodBoard } from '../MoodBoardContext';

export const TextNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState(data.content || '');

    const { isShiftPressed } = useMoodBoard();

    return (
        <NodeContainer
            selected={selected}
            title={data.label}
            icon={Type}
            typeColor="bg-blue-600"
            onEdit={() => setIsEditing(!isEditing)}
            isEditing={isEditing}
            handles={<TypedHandles nodeType="text" />}
            data={{ ...data, id, type: 'text' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={150}
                    minHeight={100}
                    isVisible={selected && !data.isLocked}
                    keepAspectRatio={isShiftPressed || data.isRatioLocked}
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
                    className="w-full h-full bg-zinc-50 dark:bg-zinc-900/50 p-6 text-[12px] leading-relaxed font-mono outline-none border-0 resize-none text-zinc-900 dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-900 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                    placeholder="ENTER NARRATIVE DATA..."
                    autoFocus
                />
            ) : (
                <div className={`p-6 h-full flex flex-col group/text ${data.isLocked ? 'cursor-default' : 'cursor-text'}`} onClick={() => !data.isLocked && setIsEditing(true)}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-3 bg-primary" />
                        <span className="text-[8px] font-bold font-mono tracking-widest text-zinc-500 dark:text-zinc-500 uppercase">CONTENT_BLOCK / V1</span>
                    </div>
                    <p className={`text-[13px] leading-[1.7] font-sans selection:bg-primary/20 transition-colors ${data.content ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-300 dark:text-zinc-700 italic uppercase tracking-wider'}`}>
                        {data.content || 'Awaiting doctrinal input...'}
                    </p>
                    {data.content && (
                        <div className="mt-auto pt-4 flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800/50">
                            <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest leading-none">CHAR_CT::{data.content.length}</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3].map(i => <div key={i} className="w-[1px] h-[1px] bg-zinc-400" />)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </NodeContainer>
    );
});
