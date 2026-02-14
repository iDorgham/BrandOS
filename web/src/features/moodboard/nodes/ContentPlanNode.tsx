import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { ClipboardList, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const PLAN_TYPES = ['Editorial Calendar', 'Campaign Brief', 'Content Pillars', 'Channel Strategy', 'Content Audit'];
const TIMEFRAMES = ['1 Week', '2 Weeks', '1 Month', '1 Quarter', '1 Year'];

export const ContentPlanNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [topic, setTopic] = useState(data.prompt || '');
    const [planType, setPlanType] = useState(data.variant || 'Editorial Calendar');
    const [timeframe, setTimeframe] = useState(data.subtitle || '1 Month');
    const [brief, setBrief] = useState(data.content || '');

    return (
        <NodeContainer
            selected={selected}
            title="Content Plan"
            icon={ClipboardList}
            typeColor="bg-teal-500"
            handles={<TypedHandles nodeType="content_plan" />}
            data={{ ...data, id, type: 'content_plan' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-teal-500/60"
                    handleClassName="!w-3 !h-3 !bg-teal-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-teal-500/10 border border-teal-500/20">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">Beta</span>
                    </div>
                </div>

                {/* Plan Type + Timeframe */}
                <div className="flex gap-2 pt-2">
                    <div className="flex-1 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Plan Type</span>
                        <div className="relative">
                            <select
                                value={planType}
                                onChange={(e) => {
                                    setPlanType(e.target.value);
                                    data.onChange?.(id, { variant: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-teal-500 outline-none"
                            >
                                {PLAN_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="w-24 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Timeframe</span>
                        <div className="relative">
                            <select
                                value={timeframe}
                                onChange={(e) => {
                                    setTimeframe(e.target.value);
                                    data.onChange?.(id, { subtitle: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-teal-500 outline-none"
                            >
                                {TIMEFRAMES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <ChevronDown size={8} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Topic / Focus */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Topic / Focus</span>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt: topic })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-teal-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="e.g. Q2 Product Launch Content"
                    />
                </div>

                {/* Brief / Objectives */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Brief / Objectives</span>
                    <textarea
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: brief })}
                        className="w-full h-full min-h-[60px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-teal-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Goals, target audience, key messages, channels..."
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.executionStatus === 'success' ? 'bg-emerald-500' : data.executionStatus === 'error' ? 'bg-rose-500' : data.executionStatus === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-zinc-400'}`} />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                            {data.executionStatus === 'success' ? 'Generated' : data.executionStatus === 'running' ? 'Planning...' : data.executionStatus === 'error' ? 'Error' : 'Idle'}
                        </span>
                    </div>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{timeframe}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">CPLAN::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-teal-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
