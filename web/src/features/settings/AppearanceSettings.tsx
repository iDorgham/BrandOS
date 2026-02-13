import React, { useState } from 'react';
import { Palette, Sun, Moon, Monitor, Maximize2, Move, Type, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui';

export const AppearanceSettings = () => {
    const { theme, setTheme } = useTheme();
    const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
    const [reduceMotion, setReduceMotion] = useState(false);
    const [fontSize, setFontSize] = useState<'small' | 'default' | 'large'>('default');

    const themes = [
        { id: 'light' as const, label: 'Light', icon: Sun, desc: 'Clean white interface', preview: 'bg-zinc-100' },
        { id: 'dark' as const, label: 'Dark', icon: Moon, desc: 'Dark carbon interface', preview: 'bg-zinc-900' },
        { id: 'system' as const, label: 'System', icon: Monitor, desc: 'Match OS preference', preview: 'bg-gradient-to-br from-zinc-100 to-zinc-900' },
    ];

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">Appearance</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Visual_Configuration</p>
                </div>
            </div>

            {/* Theme Selection */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Palette size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Interface Theme</span>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-3 gap-3">
                        {themes.map((t) => {
                            const Icon = t.icon;
                            const isActive = theme === t.id;
                            return (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    className={`
                                        border text-left transition-all overflow-hidden
                                        ${isActive
                                            ? 'border-primary ring-1 ring-primary/30'
                                            : 'border-border/40 hover:border-border/60'
                                        }
                                    `}
                                >
                                    <div className={`aspect-[16/9] w-full ${t.preview} relative`}>
                                        {isActive && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-5 h-5 bg-primary flex items-center justify-center">
                                                    <Zap size={10} className="text-primary-foreground" fill="currentColor" />
                                                </div>
                                            </div>
                                        )}
                                        {/* Mock UI elements */}
                                        <div className="absolute inset-3 flex gap-1">
                                            <div className={`w-4 h-full ${t.id === 'light' ? 'bg-zinc-200' : t.id === 'dark' ? 'bg-zinc-800' : 'bg-zinc-500/30'}`} />
                                            <div className="flex-1 flex flex-col gap-1">
                                                <div className={`h-2 w-full ${t.id === 'light' ? 'bg-zinc-200' : t.id === 'dark' ? 'bg-zinc-800' : 'bg-zinc-500/30'}`} />
                                                <div className={`flex-1 ${t.id === 'light' ? 'bg-zinc-50' : t.id === 'dark' ? 'bg-zinc-950' : 'bg-zinc-500/10'}`} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 border-t border-border/20 bg-card/50">
                                        <div className="flex items-center gap-2">
                                            <Icon size={12} className={isActive ? 'text-primary' : 'text-muted-foreground/60'} />
                                            <span className={`text-[11px] font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>{t.label}</span>
                                        </div>
                                        <p className="text-[8px] text-muted-foreground/40 mt-0.5 pl-5">{t.desc}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Interface Density */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Maximize2 size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Interface Density</span>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex gap-2">
                        {(['comfortable', 'compact'] as const).map((d) => (
                            <button
                                key={d}
                                onClick={() => setDensity(d)}
                                className={`
                                    flex-1 h-9 text-[10px] font-bold uppercase tracking-wider border transition-all
                                    ${density === d
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'border-border/40 bg-muted/10 hover:bg-muted/20 text-muted-foreground'
                                    }
                                `}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                    <p className="text-[9px] text-muted-foreground/60">Adjust information density of lists, tables, and interface elements.</p>
                </div>
            </div>

            {/* Font Size */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Type size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Font Scale</span>
                </div>
                <div className="p-6">
                    <div className="flex gap-2">
                        {[
                            { id: 'small' as const, label: 'Small', sample: 'text-[10px]' },
                            { id: 'default' as const, label: 'Default', sample: 'text-[12px]' },
                            { id: 'large' as const, label: 'Large', sample: 'text-[14px]' },
                        ].map((size) => (
                            <button
                                key={size.id}
                                onClick={() => setFontSize(size.id)}
                                className={`
                                    flex-1 p-3 border text-left transition-all
                                    ${fontSize === size.id
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border/40 bg-muted/10 hover:bg-muted/20'
                                    }
                                `}
                            >
                                <span className={`${size.sample} font-bold text-foreground block mb-1`}>Aa</span>
                                <span className="text-[9px] font-mono text-muted-foreground/60">{size.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Accessibility */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Move size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Accessibility</span>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-foreground block">Reduce Motion</span>
                            <span className="text-[9px] text-muted-foreground/60">Minimize animations and transitions</span>
                        </div>
                        <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">APPEARANCE::CONFIG_STATE</span>
            </div>
        </div>
    );
};
