import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Search, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const RESEARCH_TYPES = ['Market Analysis', 'Competitor Audit', 'Audience Insights', 'Trend Report', 'Keyword Research'];
const DEPTH_LEVELS = ['Quick Scan', 'Standard', 'Deep Dive'];

export const ResearchNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [query, setQuery] = useState(data.prompt || '');
    const [researchType, setResearchType] = useState(data.variant || 'Market Analysis');
    const [depth, setDepth] = useState(data.subtitle || 'Standard');
    const [notes, setNotes] = useState(data.content || '');

    return (
        <NodeContainer
            selected={selected}
            title="Research"
            icon={Search}
            typeColor="bg-indigo-500"
            handles={<TypedHandles nodeType="research" />}
            data={{ ...data, id, type: 'research' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-indigo-500/60"
                    handleClassName="!w-3 !h-3 !bg-indigo-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Beta</span>
                    </div>
                </div>

                {/* Research Type + Depth */}
                <div className="flex gap-2 pt-2">
                    <div className="flex-1 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Type</span>
                        <div className="relative">
                            <select
                                value={researchType}
                                onChange={(e) => {
                                    setResearchType(e.target.value);
                                    data.onChange?.(id, { variant: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-indigo-500 outline-none"
                            >
                                {RESEARCH_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="w-24 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Depth</span>
                        <div className="relative">
                            <select
                                value={depth}
                                onChange={(e) => {
                                    setDepth(e.target.value);
                                    data.onChange?.(id, { subtitle: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-indigo-500 outline-none"
                            >
                                {DEPTH_LEVELS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <ChevronDown size={8} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Query */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Research Query</span>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt: query })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="e.g. Sustainable fashion trends 2026"
                    />
                </div>

                {/* Notes / Context */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Context / Notes</span>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: notes })}
                        className="w-full h-full min-h-[60px] bg-zinc-50 dark:bg-zinc-900/50 p-3 text-[11px] leading-relaxed font-mono outline-none border border-zinc-200 dark:border-zinc-800 resize-none text-zinc-900 dark:text-zinc-100 focus:border-indigo-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Add context, target audience, goals..."
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.executionStatus === 'success' ? 'bg-emerald-500' : data.executionStatus === 'error' ? 'bg-rose-500' : data.executionStatus === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-zinc-400'}`} />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                            {data.executionStatus === 'success' ? 'Complete' : data.executionStatus === 'running' ? 'Researching...' : data.executionStatus === 'error' ? 'Error' : 'Idle'}
                        </span>
                    </div>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{depth}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">RESEARCH::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-indigo-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
