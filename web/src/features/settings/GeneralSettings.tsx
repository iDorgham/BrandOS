import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from '@/components/ui';
import { Settings, PenLine, Copy, Trash2, AlertTriangle, Activity, Zap, Cpu, Globe, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const GeneralSettings = () => {
    const { activeWorkspace } = useAuth();
    const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name || '');
    const [voiceMode, setVoiceMode] = useState('professional');

    // System Health State
    const [performanceData, setPerformanceData] = useState({
        latency: 420,
        load: 12,
        throughput: 4.2
    });

    // Simulate real-time telemetry
    useEffect(() => {
        const interval = setInterval(() => {
            setPerformanceData(prev => ({
                latency: Math.floor(380 + Math.random() * 100),
                load: Math.floor(8 + Math.random() * 8),
                throughput: Number((3.8 + Math.random() * 0.8).toFixed(1))
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Update local state when active workspace changes
    useEffect(() => {
        if (activeWorkspace) {
            setWorkspaceName(activeWorkspace.name);
        }
    }, [activeWorkspace]);

    const handleSave = () => {
        toast.success(`Workspace "${workspaceName}" settings saved`);
    };

    const copyId = () => {
        navigator.clipboard.writeText(activeWorkspace.slug || activeWorkspace.id);
        toast.success('Workspace Handle copied');
    };

    if (!activeWorkspace) return null;

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col gap-0.5 mb-1">
                <h2 className="text-xl font-display font-black tracking-tighter">General Settings</h2>
                <p className="text-muted-foreground text-[10px] font-medium opacity-60">Manage workspace identity and monitor system infrastructure.</p>
            </div>

            {/* --- System Telemetry Section (Merged) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8">
                    <Card className="p-6 bg-primary/5 border border-primary/20 relative overflow-hidden h-full flex flex-col justify-center min-h-[220px] rounded-xl">
                        <div className="absolute top-0 right-0 p-8 text-primary opacity-5">
                            <Activity size={200} />
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Zap size={12} className="text-primary" /> Latency
                                </h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-display font-bold tracking-tight text-primary">{performanceData.latency}ms</span>
                                    <span className="text-[9px] font-bold text-emerald-500 uppercase">Stable</span>
                                </div>
                                <div className="h-1 w-full bg-muted/30 overflow-hidden rounded-full">
                                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(performanceData.latency / 600) * 100}%` }} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Cpu size={12} className="text-primary" /> Load
                                </h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-display font-bold tracking-tight text-primary">{performanceData.load}%</span>
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Good</span>
                                </div>
                                <div className="h-1 w-full bg-muted/30 overflow-hidden rounded-full">
                                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${performanceData.load}%` }} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Globe size={12} className="text-primary" /> Regions
                                </h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-display font-bold tracking-tight text-primary">04</span>
                                    <span className="text-[9px] font-bold text-emerald-500 uppercase">Sync</span>
                                </div>
                                <div className="flex gap-1.5">
                                    {[1, 1, 1, 1, 0, 0].map((v, i) => (
                                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${v ? 'bg-primary/40 shadow-[0_0_10px_rgba(15,98,254,0.3)]' : 'bg-muted/30'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <Card className="p-6 bg-card border-border h-full flex flex-col justify-between rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                                <Terminal size={14} className="text-primary" /> System Manifest
                            </h3>
                            <span className="text-[10px] font-mono text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full">v4.3.0</span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'UI Core', version: '4.3.0', status: 'Optimal' },
                                { label: 'DNA Engine', version: '3.1.b', status: 'Active' },
                                { label: 'Auditor', version: '2.5.0', status: 'Secure' },
                            ].map((v, i) => (
                                <div key={i} className="flex items-center justify-between text-[11px]">
                                    <span className="font-medium opacity-70">{v.label}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono opacity-50">{v.version}</span>
                                        <span className={`w-1.5 h-1.5 rounded-full ${v.status === 'Optimal' || v.status === 'Active' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-medium opacity-60">All Systems Operational</span>
                        </div>
                    </Card>
                </div>
            </div>

            {/* --- Settings Content (Original) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <Card className="p-6 bg-card border-border space-y-6 rounded-xl">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Workspace Name</label>
                                    <div className="relative">
                                        <Input
                                            value={workspaceName}
                                            onChange={(e) => setWorkspaceName(e.target.value)}
                                            className="pl-9 h-10 bg-muted/10 border-border focus:border-primary/50 text-sm font-medium"
                                        />
                                        <Settings size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Workspace Handle</label>
                                    <div className="flex gap-2 p-1 pl-3 rounded-md bg-muted/10 border border-border items-center justify-between group h-10">
                                        <code className="text-xs font-mono text-foreground/90">
                                            {activeWorkspace.slug ? `@${activeWorkspace.slug}` : activeWorkspace.id}
                                        </code>
                                        <Button variant="ghost" size="sm" onClick={copyId} className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Copy size={14} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleSave} size="sm" className="px-6">Save Changes</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-card border-border space-y-4 rounded-xl">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                                <PenLine size={16} className="text-primary" /> Brand Voice Default
                            </h3>
                            <p className="text-[11px] text-muted-foreground">Set the default tone for AI-generated content.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Professional', 'Casual', 'Academic'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setVoiceMode(mode.toLowerCase())}
                                    className={`
                                        p-3 rounded-lg border text-left transition-all
                                        ${voiceMode === mode.toLowerCase()
                                            ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                            : 'bg-muted/10 border-transparent hover:bg-card hover:border-border'
                                        }
                                    `}
                                >
                                    <span className="text-xs font-bold block mb-0.5">{mode}</span>
                                    <span className="text-[10px] opacity-60 leading-tight block">
                                        {mode === 'Professional' && 'Clear, concise, and authoritative.'}
                                        {mode === 'Casual' && 'Friendly, relaxed, and conversational.'}
                                        {mode === 'Academic' && 'Detailed, objective, and structured.'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <Card className="p-6 bg-red-500/[0.02] border-red-500/10 space-y-4 h-full rounded-xl flex flex-col justify-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-red-500/10 text-red-500 shrink-0">
                                <AlertTriangle size={18} />
                            </div>
                            <h3 className="text-sm font-bold text-red-500">Danger Zone</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Deleting your workspace is irreversible. All brands, assets, and history will be permanently removed.
                        </p>
                        <Button variant="secondary" size="sm" className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30 mt-auto">
                            <Trash2 size={14} className="mr-2" /> Delete Workspace
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};
