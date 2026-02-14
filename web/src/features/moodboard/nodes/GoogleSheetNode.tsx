import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Sheet, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const OPERATIONS = ['Read Range', 'Write Range', 'Append Row', 'Clear Range', 'Create Sheet'];

export const GoogleSheetNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [sheetUrl, setSheetUrl] = useState(data.linkUrl || '');
    const [range, setRange] = useState(data.prompt || '');
    const [operation, setOperation] = useState(data.variant || 'Read Range');
    const [payload, setPayload] = useState(data.content || '');

    return (
        <NodeContainer
            selected={selected}
            title="Sheets"
            icon={Sheet}
            typeColor="bg-emerald-500"
            handles={<TypedHandles nodeType="google_sheet" />}
            data={{ ...data, id, type: 'google_sheet' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-emerald-500/60"
                    handleClassName="!w-3 !h-3 !bg-emerald-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Beta</span>
                    </div>
                </div>

                {/* Operation Selector */}
                <div className="space-y-1 pt-2">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Operation</span>
                    <div className="relative">
                        <select
                            value={operation}
                            onChange={(e) => {
                                setOperation(e.target.value);
                                data.onChange?.(id, { variant: e.target.value });
                            }}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-emerald-500 outline-none"
                        >
                            {OPERATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                {/* Sheet URL */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Sheet URL / ID</span>
                    <input
                        type="text"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        onBlur={() => data.onChange?.(id, { linkUrl: sheetUrl })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                    />
                </div>

                {/* Range */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Range</span>
                    <input
                        type="text"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        onBlur={() => data.onChange?.(id, { prompt: range })}
                        className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="Sheet1!A1:D10"
                    />
                </div>

                {/* Data Payload (for write operations) */}
                <div className="space-y-1 flex-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Data</span>
                    <textarea
                        value={payload}
                        onChange={(e) => setPayload(e.target.value)}
                        onBlur={() => data.onChange?.(id, { content: payload })}
                        className="w-full h-full min-h-[60px] bg-zinc-900 dark:bg-zinc-950 p-3 text-[10px] leading-relaxed font-mono outline-none border border-zinc-700 resize-none text-emerald-400 focus:border-emerald-500 transition-colors"
                        placeholder='[["Name","Value"],["Row1","Data1"]]'
                        spellCheck={false}
                    />
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">GSHEET::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-emerald-500/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
