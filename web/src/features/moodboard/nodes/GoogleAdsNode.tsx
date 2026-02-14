import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Target, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const CAMPAIGN_TYPES = ['Search', 'Display', 'Shopping', 'Video', 'Performance Max', 'App'];
const BID_STRATEGIES = ['Max Clicks', 'Max Conversions', 'Target CPA', 'Target ROAS', 'Manual CPC'];

export const GoogleAdsNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [campaignName, setCampaignName] = useState(data.prompt || '');
    const [campaignType, setCampaignType] = useState(data.variant || 'Search');
    const [bidStrategy, setBidStrategy] = useState(data.subtitle || 'Max Clicks');
    const [keywords, setKeywords] = useState(data.content || '');

    return (
        <NodeContainer
            selected={selected}
            title="Google Ads"
            icon={Target}
            typeColor="bg-amber-500"
            handles={<TypedHandles nodeType="google_ads" />}
            data={{ ...data, id, type: 'google_ads' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-amber-500/60"
                    handleClassName="!w-3 !h-3 !bg-amber-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Beta</span>
                    </div>
                </div>

                {/* Campaign Type + Bid Strategy */}
                <div className="flex gap-2 pt-2">
                    <div className="flex-1 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Campaign</span>
                        <div className="relative">
                            <select
                                value={campaignType}
                                onChange={(e) => {
                                    setCampaignType(e.target.value);
                                    data.onChange?.(id, { variant: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-amber-500 outline-none"
                            >
                                {CAMPAIGN_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="w-28 space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Bidding</span>
                        <div className="relative">
                            <select
                                value={bidStrategy}
                                onChange={(e) => {
                                    setBidStrategy(e.target.value);
                                    data.onChange?.(id, { subtitle: e.target.value });
                                }}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-amber-500 outline-none"
                            >
                                {BID_STRATEGIES.map(b => <option key={b} value={b}>{b}</option>)}
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
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Brand OS - Search Campaign Q2"
                    />
                </div>

                {/* Keywords / Ad Copy */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                        {campaignType === 'Search' ? 'Keywords' : 'Ad Configuration'}
                    </span>
                    <textarea
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: keywords })}
                        className="w-full h-full min-h-[60px] bg-zinc-900 dark:bg-zinc-950 p-3 text-[10px] leading-relaxed font-mono outline-none border border-zinc-700 resize-none text-amber-400 focus:border-amber-500 transition-colors"
                        placeholder={campaignType === 'Search'
                            ? '+brand +management\n"creative platform"\n[brand os software]'
                            : '{"headline": "...", "description": "...", "url": "..."}'
                        }
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
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">{campaignType} · {bidStrategy}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">GADS::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-amber-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
