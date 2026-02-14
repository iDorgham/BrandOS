import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { NodeResizer } from '@xyflow/react';
import {
    Zap, Clock, ShieldCheck, MessageSquareText,
    CalendarDays, Repeat, Play
} from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

type TriggerMode = 'schedule' | 'telegram' | 'manual';
type Recurrence = 'daily' | 'weekly' | 'monthly' | 'once';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const TriggerNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const settings = (data.nodeSettings || {}) as Record<string, unknown>;

    // Local state for immediate UI response
    const [mode, setMode] = useState<TriggerMode>((settings.triggerMode as TriggerMode) || 'schedule');
    const [recurrence, setRecurrence] = useState<Recurrence>((settings.recurrence as Recurrence) || 'daily');
    const [time, setTime] = useState((settings.time as string) || '09:00');
    const [selectedDays, setSelectedDays] = useState<string[]>((settings.selectedDays as string[]) || ['Mon', 'Wed', 'Fri']);
    const [specificDate, setSpecificDate] = useState((settings.specificDate as string) || '');
    const [telegramBotToken, setTelegramBotToken] = useState((settings.telegramBotToken as string) || '');
    const [telegramChatId, setTelegramChatId] = useState((settings.telegramChatId as string) || '');

    // Sync from parent when external changes arrive
    useEffect(() => {
        setMode((settings.triggerMode as TriggerMode) || 'schedule');
        setRecurrence((settings.recurrence as Recurrence) || 'daily');
        setTime((settings.time as string) || '09:00');
        setSelectedDays((settings.selectedDays as string[]) || ['Mon', 'Wed', 'Fri']);
        setSpecificDate((settings.specificDate as string) || '');
        setTelegramBotToken((settings.telegramBotToken as string) || '');
        setTelegramChatId((settings.telegramChatId as string) || '');
    }, [data.nodeSettings]);

    const pushSettings = useCallback((patch: Record<string, unknown>) => {
        data.onChange?.(id, {
            nodeSettings: { ...settings, ...patch }
        });
    }, [id, data, settings]);

    const handleModeChange = (m: TriggerMode) => {
        setMode(m);
        pushSettings({ triggerMode: m });
    };

    const handleRecurrenceChange = (r: Recurrence) => {
        setRecurrence(r);
        pushSettings({ recurrence: r });
    };

    const handleTimeChange = (t: string) => {
        setTime(t);
        pushSettings({ time: t });
    };

    const handleDayToggle = (day: string) => {
        const next = selectedDays.includes(day)
            ? selectedDays.filter(d => d !== day)
            : [...selectedDays, day];
        setSelectedDays(next);
        pushSettings({ selectedDays: next });
    };

    const handleDateChange = (d: string) => {
        setSpecificDate(d);
        pushSettings({ specificDate: d });
    };

    const scheduleLabel = useMemo(() => {
        if (mode === 'telegram') return 'On message received';
        if (mode === 'manual') return 'Manual trigger';
        switch (recurrence) {
            case 'daily': return `Daily at ${time}`;
            case 'weekly': return `${selectedDays.join(', ')} at ${time}`;
            case 'monthly': return `Monthly, day 1 at ${time}`;
            case 'once': return specificDate ? `${specificDate} at ${time}` : 'Set date...';
            default: return 'Not configured';
        }
    }, [mode, recurrence, time, selectedDays, specificDate]);

    return (
        <NodeContainer
            selected={selected}
            title="Trigger"
            icon={Zap}
            typeColor="bg-yellow-500"
            handles={<TypedHandles nodeType="trigger" />}
            data={{ ...data, id, type: 'trigger' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={300}
                    minHeight={280}
                    isVisible={selected}
                    lineClassName="!border-yellow-500/60"
                    handleClassName="!w-3 !h-3 !bg-yellow-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-3 p-5 h-full relative overflow-hidden">
                {/* Status Badge */}
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                        <div className={`w-1.5 h-1.5 rounded-full ${data.executionStatus === 'running' ? 'bg-yellow-500 animate-pulse' : 'bg-yellow-500/50'}`} />
                        <span className="text-[7px] font-black uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                            {data.executionStatus === 'running' ? 'Active' : 'Ready'}
                        </span>
                    </div>
                </div>

                {/* ── Mode Selector ── */}
                <div className="pt-1">
                    <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Trigger_Source</span>
                    <div className="grid grid-cols-3 gap-1">
                        {([
                            { key: 'schedule' as const, icon: Clock, label: 'Schedule' },
                            { key: 'telegram' as const, icon: MessageSquareText, label: 'Telegram' },
                            { key: 'manual' as const, icon: Play, label: 'Manual' },
                        ]).map(opt => (
                            <button
                                key={opt.key}
                                onClick={() => handleModeChange(opt.key)}
                                className={`flex flex-col items-center gap-1 p-2 border transition-all ${
                                    mode === opt.key
                                        ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                                        : 'border-border/20 text-zinc-400 hover:text-zinc-200 hover:border-border/40'
                                }`}
                            >
                                <opt.icon size={13} />
                                <span className="text-[7px] font-bold uppercase tracking-widest">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Schedule Config ── */}
                {mode === 'schedule' && (
                    <div className="space-y-3">
                        {/* Recurrence */}
                        <div className="space-y-1">
                            <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                                <Repeat size={9} /> Repeat
                            </span>
                            <div className="grid grid-cols-4 gap-1">
                                {(['daily', 'weekly', 'monthly', 'once'] as const).map(r => (
                                    <button
                                        key={r}
                                        onClick={() => handleRecurrenceChange(r)}
                                        className={`py-1.5 text-[8px] font-bold uppercase tracking-wider border transition-all ${
                                            recurrence === r
                                                ? 'bg-yellow-500 text-white border-yellow-500'
                                                : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-border/20 hover:text-zinc-200 hover:bg-zinc-800'
                                        }`}
                                    >
                                        {r === 'once' ? 'Date' : r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Picker — always visible in schedule mode */}
                        <div className="space-y-1">
                            <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                                <Clock size={9} /> Time
                            </span>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => handleTimeChange(e.target.value)}
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-border/20 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-yellow-500/40 transition-colors"
                            />
                        </div>

                        {/* Weekly Day Picker — only when recurrence is 'weekly' */}
                        {recurrence === 'weekly' && (
                            <div className="space-y-1">
                                <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Days</span>
                                <div className="flex gap-1">
                                    {DAYS_OF_WEEK.map(day => (
                                        <button
                                            key={day}
                                            onClick={() => handleDayToggle(day)}
                                            className={`flex-1 py-1.5 text-[7px] font-bold uppercase border transition-all ${
                                                selectedDays.includes(day)
                                                    ? 'bg-yellow-500 text-white border-yellow-500'
                                                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-border/20 hover:bg-zinc-800'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specific Date — only when recurrence is 'once' */}
                        {recurrence === 'once' && (
                            <div className="space-y-1">
                                <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                                    <CalendarDays size={9} /> Date
                                </span>
                                <input
                                    type="date"
                                    value={specificDate}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-border/20 text-[11px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-yellow-500/40 transition-colors"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* ── Telegram Config ── */}
                {mode === 'telegram' && (
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Bot Token</span>
                            <input
                                type="password"
                                value={telegramBotToken}
                                onChange={(e) => setTelegramBotToken(e.target.value)}
                                onBlur={(e) => pushSettings({ telegramBotToken: e.target.value })}
                                placeholder="123456:ABC-DEF..."
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-border/20 text-[10px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-yellow-500/40 transition-colors placeholder:text-zinc-400"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">Chat ID</span>
                            <input
                                type="text"
                                value={telegramChatId}
                                onChange={(e) => setTelegramChatId(e.target.value)}
                                onBlur={(e) => pushSettings({ telegramChatId: e.target.value })}
                                placeholder="-1001234567890"
                                className="w-full h-8 px-2 bg-zinc-50 dark:bg-zinc-900 border border-border/20 text-[10px] font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-yellow-500/40 transition-colors placeholder:text-zinc-400"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-blue-500/5 border border-blue-500/10">
                            <MessageSquareText size={10} className="text-blue-400" />
                            <span className="text-[7px] font-mono text-blue-400 uppercase tracking-widest">Fires on any message to bot</span>
                        </div>
                    </div>
                )}

                {/* ── Manual Config ── */}
                {mode === 'manual' && (
                    <div className="flex flex-col items-center justify-center gap-3 py-6">
                        <Play size={24} className="text-yellow-500/40" />
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                            Click "Run" in toolbar<br />to trigger this workflow
                        </span>
                    </div>
                )}

                {/* ── Schedule Summary ── */}
                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                    <div className="flex justify-between items-center text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 p-2 border-l-2 border-yellow-500">
                        <span>Schedule</span>
                        <span className="text-zinc-400 normal-case">{scheduleLabel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={10} className="text-emerald-500" />
                            <span className="text-[6px] font-mono uppercase tracking-widest text-zinc-500">TRIGGER::{mode.toUpperCase()}</span>
                        </div>
                        <div className="flex gap-1.5 opacity-30">
                            <div className="w-1 h-3 bg-zinc-400" />
                            <div className="w-1 h-3 bg-yellow-500" />
                            <div className="w-1 h-3 bg-zinc-400" />
                        </div>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
