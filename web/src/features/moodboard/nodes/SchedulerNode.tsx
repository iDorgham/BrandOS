import React, { useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { CalendarClock, ChevronDown } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

const RECURRENCE_OPTIONS = ['Once', 'Daily', 'Weekly', 'Bi-Weekly', 'Monthly'];

export const SchedulerNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const [date, setDate] = useState(data.content || '');
    const [time, setTime] = useState(data.prompt || '09:00');
    const [recurrence, setRecurrence] = useState(data.variant || 'Once');

    return (
        <NodeContainer
            selected={selected}
            title="Schedule"
            icon={CalendarClock}
            typeColor="bg-orange-400"
            handles={<TypedHandles nodeType="scheduler" />}
            data={{ ...data, id, type: 'scheduler' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={200}
                    isVisible={selected && !data.isLocked}
                    lineClassName="!border-orange-400/60"
                    handleClassName="!w-3 !h-3 !bg-orange-400 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-4 p-5 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-400/10 border border-orange-400/20">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Beta</span>
                    </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Date</span>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                data.onChange?.(id, { content: e.target.value });
                            }}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-orange-400 transition-colors"
                        />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Time</span>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => {
                                setTime(e.target.value);
                                data.onChange?.(id, { prompt: e.target.value });
                            }}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-orange-400 transition-colors"
                        />
                    </div>
                </div>

                {/* Recurrence Pattern */}
                <div className="space-y-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Recurrence</span>
                    <div className="relative">
                        <select
                            value={recurrence}
                            onChange={(e) => {
                                setRecurrence(e.target.value);
                                data.onChange?.(id, { variant: e.target.value });
                            }}
                            className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer focus:border-orange-400 outline-none"
                        >
                            {RECURRENCE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className={`w-3 h-3 rounded-full ${data.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                    <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                            {data.isActive ? 'Active' : 'Paused'}
                        </span>
                        <span className="text-[7px] font-mono text-zinc-400">
                            {date ? `Next: ${date} at ${time}` : 'No schedule set'}
                        </span>
                    </div>
                </div>

                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">SCHEDULER::V1</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-orange-400/30" />)}
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
});
