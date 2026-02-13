import React, { useState, useEffect } from 'react';
import { Settings, Copy, PenLine, Trash2, AlertTriangle, Activity, Zap, Cpu, Globe, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';
import { useSettings } from '@/contexts/SettingsContext';

export const WorkspaceSettings = () => {
    const { activeWorkspace } = useAuth();
    const { visibleTabs, toggleTabVisibility, tabOrder } = useSettings();
    const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name || '');
    const [voiceMode, setVoiceMode] = useState('professional');

    const [performanceData, setPerformanceData] = useState({
        latency: 420,
        load: 12,
        regions: 4,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setPerformanceData({
                latency: Math.floor(380 + Math.random() * 100),
                load: Math.floor(8 + Math.random() * 8),
                regions: 4,
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (activeWorkspace) setWorkspaceName(activeWorkspace.name);
    }, [activeWorkspace]);

    const handleSave = () => {
        toast.success(`Workspace "${workspaceName}" settings saved`);
    };

    const copyId = () => {
        navigator.clipboard.writeText(activeWorkspace?.slug || activeWorkspace?.id || '');
        toast.success('Workspace handle copied');
    };

    if (!activeWorkspace) return null;

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">Workspace</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Workspace_Configuration</p>
                </div>
            </div>

            {/* System Telemetry */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Activity size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">System Telemetry</span>
                    <div className="ml-auto flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-emerald-500/80">LIVE</span>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Zap size={10} className="text-primary" />
                                <span className="text-[8px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">Latency</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[28px] font-bold text-foreground tracking-tight font-mono">{performanceData.latency}</span>
                                <span className="text-[10px] font-mono text-muted-foreground/40">ms</span>
                            </div>
                            <div className="h-1 w-full bg-muted/20 overflow-hidden">
                                <div className="h-full bg-primary/60 transition-all duration-1000" style={{ width: `${(performanceData.latency / 600) * 100}%` }} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Cpu size={10} className="text-primary" />
                                <span className="text-[8px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">Load</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[28px] font-bold text-foreground tracking-tight font-mono">{performanceData.load}</span>
                                <span className="text-[10px] font-mono text-muted-foreground/40">%</span>
                            </div>
                            <div className="h-1 w-full bg-muted/20 overflow-hidden">
                                <div className="h-full bg-primary/60 transition-all duration-1000" style={{ width: `${performanceData.load}%` }} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Globe size={10} className="text-primary" />
                                <span className="text-[8px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">Regions</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[28px] font-bold text-foreground tracking-tight font-mono">0{performanceData.regions}</span>
                                <span className="text-[10px] font-mono text-emerald-500/80">SYNC</span>
                            </div>
                            <div className="flex gap-1">
                                {[1, 1, 1, 1, 0, 0].map((v, i) => (
                                    <div key={i} className={`h-1 flex-1 transition-all duration-500 ${v ? 'bg-primary/40' : 'bg-muted/20'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workspace Details */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Settings size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Workspace Identity</span>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Workspace Name</label>
                            <input
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] px-3 outline-none focus:border-primary border-b-2 transition-colors"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Workspace Handle</label>
                            <div className="flex items-center h-9 bg-muted/10 border border-border/40 border-b-2 border-border/20">
                                <code className="flex-1 text-[12px] font-mono text-foreground/80 px-3 truncate">
                                    {activeWorkspace.slug ? `@${activeWorkspace.slug}` : activeWorkspace.id}
                                </code>
                                <button
                                    onClick={copyId}
                                    className="h-full px-3 text-muted-foreground/40 hover:text-primary transition-colors border-l border-border/40"
                                >
                                    <Copy size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Voice */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <PenLine size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Brand Voice Default</span>
                </div>
                <div className="p-6">
                    <p className="text-[10px] text-muted-foreground/60 mb-4">Set the default tone for AI-generated content across this workspace.</p>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'professional', label: 'Professional', desc: 'Clear, concise, and authoritative.' },
                            { id: 'casual', label: 'Casual', desc: 'Friendly, relaxed, and conversational.' },
                            { id: 'academic', label: 'Academic', desc: 'Detailed, objective, and structured.' },
                        ].map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setVoiceMode(mode.id)}
                                className={`
                                    p-3 border text-left transition-all
                                    ${voiceMode === mode.id
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'border-border/40 bg-muted/10 hover:bg-muted/20 hover:border-border/60'
                                    }
                                `}
                            >
                                <span className="text-[11px] font-bold block mb-0.5">{mode.label}</span>
                                <span className="text-[9px] opacity-60 leading-tight block">{mode.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Module Visibility */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Terminal size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Module Visibility</span>
                </div>
                <div className="p-6">
                    <p className="text-[10px] text-muted-foreground/60 mb-4">Toggle which modules are visible in the sidebar navigation.</p>
                    <div className="grid grid-cols-2 gap-2">
                        {tabOrder.map((tabId) => (
                            <button
                                key={tabId}
                                onClick={() => toggleTabVisibility(tabId)}
                                className={`
                                    flex items-center justify-between px-3 py-2 border transition-all
                                    ${visibleTabs[tabId]
                                        ? 'border-primary/40 bg-primary/5'
                                        : 'border-border/40 bg-muted/10 opacity-50'
                                    }
                                `}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-wider">{tabId}</span>
                                <div className={`w-2 h-2 ${visibleTabs[tabId] ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Manifest */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Terminal size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">System Manifest</span>
                    <span className="ml-auto text-[8px] font-mono text-primary/60 bg-primary/5 px-2 py-0.5">v4.3.0</span>
                </div>
                <div className="p-6">
                    <div className="space-y-3">
                        {[
                            { label: 'UI Core', version: '4.3.0', status: 'Optimal' },
                            { label: 'DNA Engine', version: '3.1.b', status: 'Active' },
                            { label: 'Auditor', version: '2.5.0', status: 'Secure' },
                            { label: 'Canvas RT', version: '1.8.2', status: 'Active' },
                        ].map((v, i) => (
                            <div key={i} className="flex items-center justify-between text-[11px] py-1.5 border-b border-border/10 last:border-0">
                                <span className="font-medium text-foreground/70">{v.label}</span>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-muted-foreground/40 text-[10px]">{v.version}</span>
                                    <div className={`w-1.5 h-1.5 ${v.status === 'Optimal' ? 'bg-emerald-500' : v.status === 'Active' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-destructive/20 bg-destructive/[0.02]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-destructive/10 bg-destructive/5">
                    <AlertTriangle size={12} className="text-destructive/60" />
                    <span className="text-[9px] font-mono font-bold text-destructive/60 uppercase tracking-[0.15em]">Danger Zone</span>
                </div>
                <div className="p-6">
                    <p className="text-[10px] text-muted-foreground/60 mb-4">
                        Deleting your workspace is irreversible. All brands, assets, and history will be permanently removed.
                    </p>
                    <button className="h-8 px-4 text-[10px] font-bold border border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/10 transition-colors">
                        <Trash2 size={12} className="inline mr-2" />
                        Delete Workspace
                    </button>
                </div>
            </div>

            {/* Save Bar */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">WORKSPACE::SAVE_STATE</span>
                <Button onClick={handleSave} size="sm" className="gap-2 px-6 h-8 text-[11px]">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};
