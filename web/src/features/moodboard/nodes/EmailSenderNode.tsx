import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Mail, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const TEMPLATE_OPTIONS = ['Plain Text', 'Newsletter', 'Promotional', 'Transactional', 'Welcome Series'];

export const EmailSenderNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [toField, setToField] = useState(data.prompt || '');
    const [subject, setSubject] = useState(data.subtitle || '');
    const [body, setBody] = useState(data.content || '');
    const [template, setTemplate] = useState(data.variant || 'Plain Text');

    return (
        <NodeContainer
            selected={selected}
            title="Email"
            icon={Mail}
            typeColor="bg-rose-500"
            handles={<TypedHandles nodeType="email_sender" />}
            data={{ ...data, id, type: 'email_sender' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-rose-500/60"
                    handleClassName="!w-3 !h-3 !bg-rose-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-500/10 border border-rose-500/20">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Beta</span>
                    </div>
                </div>

                {/* Template Selector */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Template</span>
                    <div className="relative">
                        <select
                            value={template}
                            onChange={(e) => {
                                setTemplate(e.target.value);
                                data.onChange?.(id, { variant: e.target.value });
                            }}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-rose-500 outline-none"
                        >
                            {TEMPLATE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                {/* To Field */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">To</span>
                    <input
                        type="text"
                        value={toField}
                        onChange={(e) => setToField(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt: toField })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-rose-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="recipient@email.com or {{list}}"
                    />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Subject</span>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        onBlur={() => data.onChange?.(id, { subtitle: subject })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-rose-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Email subject line..."
                    />
                </div>

                {/* Body */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Body</span>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: body })}
                        className="w-full h-full min-h-[60px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-rose-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Email body content..."
                    />
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">EMAIL_SEND::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-rose-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
