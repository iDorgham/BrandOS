import React from 'react';
import { Card } from '@/components/ui';
import { Monitor, Moon, Sun, Zap, Move, Maximize2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const AppearanceSettings = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col gap-0.5 mb-1">
                <h2 className="text-xl font-display font-black tracking-tighter">Appearance</h2>
                <p className="text-muted-foreground text-[10px] font-medium opacity-60">Customize the visual interface density and theme.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Theme Selection */}
                <div className="md:col-span-8">
                    <Card className="p-6 bg-card border-border h-full rounded-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Monitor size={16} className="text-primary" />
                            <h3 className="text-sm font-bold">Interface Theme</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'light', label: 'Light', icon: Sun, bg: 'bg-[#f4f4f4]' },
                                { id: 'dark', label: 'Dark', icon: Moon, bg: 'bg-[#161616]' },
                                { id: 'system', label: 'System', icon: Monitor, bg: 'bg-gradient-to-br from-[#f4f4f4] to-[#161616]' }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id as any)}
                                    className={`
                                        relative overflow-hidden rounded-lg border transition-all duration-300 group text-left
                                        ${theme === t.id
                                            ? 'border-primary ring-1 ring-primary shadow-sm'
                                            : 'border-border hover:border-primary/50'
                                        }
                                    `}
                                >
                                    <div className={`aspect-[16/9] w-full ${t.bg} opacity-50 relative`}>
                                        {theme === t.id && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg">
                                                    <Zap size={12} fill="currentColor" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 flex items-center gap-2 bg-card border-t border-border">
                                        <t.icon size={14} className={theme === t.id ? 'text-primary' : 'text-muted-foreground'} />
                                        <span className={`text-xs font-bold ${theme === t.id ? 'text-primary' : 'text-foreground'}`}>
                                            {t.label}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Interface Customization */}
                <div className="md:col-span-4">
                    <Card className="p-6 bg-card border-border h-full space-y-6 rounded-xl">
                        {/* Density */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Maximize2 size={12} /> Density
                                </label>
                            </div>
                            <div className="flex bg-muted/20 p-1 rounded-md border border-border">
                                <button className="flex-1 py-1.5 text-[10px] font-bold bg-background shadow-sm rounded border border-border/50 text-foreground transition-all">
                                    Comfortable
                                </button>
                                <button className="flex-1 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Compact
                                </button>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-tight">
                                Adjust the information density of lists and tables.
                            </p>
                        </div>

                        <div className="w-full h-px bg-border/50" />

                        {/* Motion */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Move size={12} /> Motion
                                </label>
                                <div className="w-8 h-4 bg-muted/40 rounded-full relative cursor-pointer border border-border">
                                    <div className="w-2.5 h-2.5 bg-muted-foreground/30 rounded-full absolute top-0.5 left-0.5" />
                                </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-tight">
                                Reduce animation intensity for accessibility.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
