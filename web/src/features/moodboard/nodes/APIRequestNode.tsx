import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Globe2, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const APIRequestNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [url, setUrl] = useState(data.linkUrl || '');
    const [method, setMethod] = useState(data.variant || 'GET');
    const [headers, setHeaders] = useState(data.prompt || '');
    const [body, setBody] = useState(data.content || '');
    const [activeTab, setActiveTab] = useState<'headers' | 'body' | 'response'>('headers');

    return (
        <NodeContainer
            selected={selected}
            title="API"
            icon={Globe2}
            typeColor="bg-rose-400"
            handles={<TypedHandles nodeType="api_request" />}
            data={{ ...data, id, type: 'api_request' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-rose-400/60"
                    handleClassName="!w-3 !h-3 !bg-rose-400 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-400/10 border border-rose-400/20">
                        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Beta</span>
                    </div>
                </div>

                {/* URL + Method */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Request</span>
                    <div className="flex gap-1">
                        <div className="relative">
                            <select
                                value={method}
                                onChange={(e) => {
                                    setMethod(e.target.value);
                                    data.onChange?.(id, { variant: e.target.value });
                                }}
                                className="h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-rose-400 outline-none w-20"
                            >
                                {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <ChevronDown size={8} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onBlur={() => data.onChange?.(id, { linkUrl: url })}
                            className="flex-1 h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-rose-400 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                            placeholder="https://api.example.com/v1/..."
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-zinc-200 dark:border-zinc-800">
                    {(['headers', 'body', 'response'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === tab
                                ? 'text-rose-500 border-rose-500'
                                : 'text-zinc-400 border-transparent hover:text-zinc-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1">
                    {activeTab === 'headers' && (
                        <textarea
                            value={headers}
                            onChange={(e) => setHeaders(e.target.value)}
                            onBlur={() => data.onChange?.(id, { prompt: headers })}
                            className="w-full h-full min-h-[80px] bg-zinc-900 dark:bg-zinc-950 p-3 text-[10px] leading-relaxed font-mono outline-none border border-zinc-700 resize-none text-sky-400 focus:border-rose-400 transition-colors"
                            placeholder={'Content-Type: application/json\nAuthorization: Bearer {{token}}'}
                            spellCheck={false}
                        />
                    )}
                    {activeTab === 'body' && (
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            onBlur={() => data.onChange?.(id, { content: body })}
                            className="w-full h-full min-h-[80px] bg-zinc-900 dark:bg-zinc-950 p-3 text-[10px] leading-relaxed font-mono outline-none border border-zinc-700 resize-none text-emerald-400 focus:border-rose-400 transition-colors"
                            placeholder='{ "key": "value" }'
                            spellCheck={false}
                        />
                    )}
                    {activeTab === 'response' && (
                        <div className="w-full h-full min-h-[80px] bg-zinc-900 dark:bg-zinc-950 p-3 border border-zinc-700 overflow-auto">
                            {data.executionOutput ? (
                                <pre className="text-[9px] font-mono text-amber-400 whitespace-pre-wrap">{JSON.stringify(data.executionOutput, null, 2)}</pre>
                            ) : (
                                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">No response yet</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.executionStatus === 'success' ? 'bg-emerald-500' : data.executionStatus === 'error' ? 'bg-rose-500' : data.executionStatus === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-zinc-400'}`} />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                            {data.executionStatus || 'idle'}
                        </span>
                    </div>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{method} {url ? new URL(url).pathname : ''}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">API_REQ::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-rose-400/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
