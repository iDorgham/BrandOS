import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Webhook, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const WebhookNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [url, setUrl] = useState(data.linkUrl || '');
    const [method, setMethod] = useState(data.variant || 'POST');
    const [payload, setPayload] = useState(data.content || '{\n  \n}');

    return (
        <NodeContainer
            selected={selected}
            title="Webhook"
            icon={Webhook}
            typeColor="bg-rose-600"
            handles={<TypedHandles nodeType="webhook" />}
            data={{ ...data, id, type: 'webhook' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-rose-600/60"
                    handleClassName="!w-3 !h-3 !bg-rose-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-600/10 border border-rose-600/20">
                        <div className="w-1.5 h-1.5 bg-rose-600 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Beta</span>
                    </div>
                </div>

                {/* URL Input */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Endpoint URL</span>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onBlur={() => data.onChange?.(id, { linkUrl: url })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-rose-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="https://api.example.com/webhook"
                    />
                </div>

                {/* Method Selector */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Method</span>
                    <div className="flex gap-1">
                        {METHODS.map(m => (
                            <button
                                key={m}
                                onClick={() => {
                                    setMethod(m);
                                    data.onChange?.(id, { variant: m });
                                }}
                                className={`px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest border transition-colors ${method === m
                                    ? 'bg-rose-600 text-white border-rose-600'
                                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-rose-600'
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payload Editor */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Payload</span>
                    <textarea
                        value={payload}
                        onChange={(e) => setPayload(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: payload })}
                        className="w-full h-full min-h-[80px] bg-zinc-900 dark:bg-zinc-950 p-3 text-[10px] leading-relaxed font-mono outline-none border border-zinc-700 resize-none text-emerald-400 focus:border-rose-600 transition-colors"
                        placeholder='{ "key": "value" }'
                        spellCheck={false}
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.executionStatus === 'success' ? 'bg-emerald-500' : data.executionStatus === 'error' ? 'bg-rose-500' : 'bg-zinc-400'}`} />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                            {data.executionStatus === 'success' ? '200 OK' : data.executionStatus === 'error' ? 'Error' : 'Idle'}
                        </span>
                    </div>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{method}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">WEBHOOK::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-rose-600/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
