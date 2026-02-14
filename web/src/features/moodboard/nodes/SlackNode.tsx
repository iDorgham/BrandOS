import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Hash, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const ACTIONS = ['Send Message', 'Send File', 'Update Status', 'Create Channel', 'List Members'];

export const SlackNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [channel, setChannel] = useState(data.prompt || '');
    const [action, setAction] = useState(data.variant || 'Send Message');
    const [message, setMessage] = useState(data.content || '');

    return (
        <NodeContainer
            selected={selected}
            title="Slack"
            icon={Hash}
            typeColor="bg-purple-500"
            handles={<TypedHandles nodeType="slack" />}
            data={{ ...data, id, type: 'slack' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-purple-500/60"
                    handleClassName="!w-3 !h-3 !bg-purple-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">Beta</span>
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
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-purple-500 outline-none"
                        >
                            {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                {/* Channel */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Channel</span>
                    <input
                        type="text"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt: channel })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="#general or @username"
                    />
                </div>

                {/* Message */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Message</span>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: message })}
                        className="w-full h-full min-h-[60px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-purple-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Message content or {{input}} variable..."
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.executionStatus === 'success' ? 'bg-emerald-500' : data.executionStatus === 'error' ? 'bg-rose-500' : 'bg-zinc-400'}`} />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                            {data.executionStatus === 'success' ? 'Sent' : data.executionStatus === 'error' ? 'Error' : 'Idle'}
                        </span>
                    </div>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{action}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">SLACK::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-purple-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
