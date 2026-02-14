import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Link2, Globe, ExternalLink } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const ReferenceNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Metadata"
        icon={Link2}
        typeColor="bg-emerald-600"
        handles={<TypedHandles nodeType="reference" />}
        data={{ ...data, id, type: 'reference' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={200}
                minHeight={80}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="space-y-4">
                <div className="space-y-2 group/title">
                    <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <span className="text-[8px] font-bold font-mono uppercase text-zinc-400 tracking-widest">REF_LABEL_ID</span>
                    </div>
                    <input
                        type="text"
                        value={data.linkTitle || ''}
                        placeholder="REFERENCE_LABEL"
                        onChange={(e) => data.onChange?.(id, { linkTitle: e.target.value.toUpperCase() })}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-[11px] font-bold outline-none tracking-tighter font-mono text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-primary transition-all placeholder:opacity-20 uppercase"
                    />
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group/link relative overflow-hidden">
                    <div className="p-2 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                        <Globe size={14} className="text-zinc-400 group-hover/link:text-primary" strokeWidth={1} />
                    </div>
                    <div className="flex-1 truncate">
                        <input
                            type="text"
                            value={data.linkUrl || ''}
                            placeholder="https://dna.ref.vault..."
                            onChange={(e) => data.onChange?.(id, { linkUrl: e.target.value })}
                            className="w-full bg-transparent border-none text-[10px] font-mono outline-none text-zinc-500 dark:text-zinc-400 font-bold placeholder:opacity-20"
                        />
                    </div>
                    <div className="p-1 hover:text-primary transition-colors cursor-pointer">
                        <ExternalLink size={10} />
                    </div>
                </div>
            </div>

            <div className="mt-auto p-4 border border-zinc-100 dark:border-zinc-800 space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-[1px] h-3 bg-primary" />
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">CRAWL_PROTOCOL_V2</span>
                    </div>
                    <span className="text-[7px] font-mono font-bold text-primary">INDEXED::ACTIVE</span>
                </div>

                <div className="flex gap-1 overflow-hidden h-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className={`flex-1 transition-all duration-1000 ${i < 15 ? 'bg-primary/20' : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                    ))}
                </div>
                <div className="flex justify-between items-center text-[6px] font-mono uppercase tracking-widest text-zinc-400 opacity-50">
                    <span>latency::0.02ms</span>
                    <span>packets::1024_kb</span>
                </div>
            </div>
        </div>
    </NodeContainer>
);
