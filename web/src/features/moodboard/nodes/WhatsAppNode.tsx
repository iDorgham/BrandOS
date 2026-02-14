import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const ACTIONS = ['Send Text', 'Send Template', 'Send Media', 'Send Location', 'Interactive List'];
const TEMPLATE_LANGS = ['en', 'ar', 'es', 'fr', 'de', 'pt'];

export const WhatsAppNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [phone, setPhone] = useState(data.prompt || '');
    const [action, setAction] = useState(data.variant || 'Send Text');
    const [message, setMessage] = useState(data.content || '');
    const [templateName, setTemplateName] = useState(data.subtitle || '');

    return (
        <NodeContainer
            selected={selected}
            title="WhatsApp"
            icon={MessageCircle}
            typeColor="bg-green-600"
            handles={<TypedHandles nodeType="whatsapp" />}
            data={{ ...data, id, type: 'whatsapp' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-green-600/60"
                    handleClassName="!w-3 !h-3 !bg-green-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-600/10 border border-green-600/20">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">Beta</span>
                    </div>
                </div>

                {/* Action Selector */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Action</span>
                    <div className="relative">
                        <select
                            value={action}
                            onChange={(e) => {
                                setAction(e.target.value);
                                data.onChange?.(id, { variant: e.target.value });
                            }}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-green-600 outline-none"
                        >
                            {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Recipient</span>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt: phone })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-green-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="+1234567890 or {{contact}}"
                    />
                </div>

                {/* Template Name (for template messages) */}
                {action === 'Send Template' && (
                    <div className="space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Template</span>
                        <input
                            type="text"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            onBlur={() => data.onChange?.(id, { subtitle: templateName })}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-green-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                            placeholder="order_confirmation"
                        />
                    </div>
                )}

                {/* Message Body */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                        {action === 'Send Template' ? 'Template Variables (JSON)' : 'Message'}
                    </span>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: message })}
                        className="w-full h-full min-h-[60px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-green-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder={action === 'Send Template' ? '{"1": "Order #123", "2": "Delivered"}' : 'Message content...'}
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.executionStatus === 'success' ? 'bg-emerald-500' : data.executionStatus === 'error' ? 'bg-rose-500' : 'bg-zinc-400'}`} />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                            {data.executionStatus === 'success' ? 'Delivered' : data.executionStatus === 'error' ? 'Error' : 'Idle'}
                        </span>
                    </div>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{action}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">WA_BIZ::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-green-600/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
