import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Megaphone, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const OBJECTIVES = ['Awareness', 'Traffic', 'Engagement', 'Leads', 'Conversions', 'App Installs'];
const PLACEMENTS = ['Feed', 'Stories', 'Reels', 'Audience Network', 'Messenger', 'Automatic'];

export const MetaAdsNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [campaignName, setCampaignName] = useState(data.prompt || '');
    const [objective, setObjective] = useState(data.variant || 'Awareness');
    const [placement, setPlacement] = useState(data.subtitle || 'Automatic');
    const [targeting, setTargeting] = useState(data.content || '');

    return (
        <NodeContainer
            selected={selected}
            title="Meta Ads"
            icon={Megaphone}
            typeColor="bg-blue-600"
            handles={<TypedHandles nodeType="meta_ads" />}
            data={{ ...data, id, type: 'meta_ads' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-blue-600/60"
                    handleClassName="!w-3 !h-3 !bg-blue-600 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-600/10 border border-blue-600/20">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Beta</span>
                    </div>
                </div>

                {/* Objective + Placement */}
                <div className="flex gap-2 pt-2">
                    <div className="flex-1 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Objective</span>
                        <div className="relative">
                            <select
                                value={objective}
                                onChange={(e) => {
                                    setObjective(e.target.value);
                                    data.onChange?.(id, { variant: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-blue-600 outline-none"
                            >
                                {OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="w-28 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Placement</span>
                        <div className="relative">
                            <select
                                value={placement}
                                onChange={(e) => {
                                    setPlacement(e.target.value);
                                    data.onChange?.(id, { subtitle: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-blue-600 outline-none"
                            >
                                {PLACEMENTS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <ChevronDown size={8} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Campaign Name */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Campaign Name</span>
                    <input
                        type="text"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt: campaignName })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Spring 2026 Brand Awareness"
                    />
                </div>

                {/* Targeting / Audience */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Audience / Targeting</span>
                    <textarea
                        value={targeting}
                        onChange={(e) => setTargeting(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: targeting })}
                        className="w-full h-full min-h-[60px] bg-zinc-900 dark:bg-zinc-950 p-3 text-[10px] leading-relaxed font-mono outline-none border border-zinc-700 resize-none text-sky-400 focus:border-blue-600 transition-colors"
                        placeholder='{"age": "25-45", "interests": ["marketing", "design"], "locations": ["US", "UK"]}'
                        spellCheck={false}
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.executionStatus === 'success' ? 'bg-emerald-500' : data.executionStatus === 'error' ? 'bg-rose-500' : data.executionStatus === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-zinc-400'}`} />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                            {data.executionStatus === 'success' ? 'Active' : data.executionStatus === 'running' ? 'Creating...' : data.executionStatus === 'error' ? 'Error' : 'Draft'}
                        </span>
                    </div>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{objective}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">META_ADS::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-blue-600/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
