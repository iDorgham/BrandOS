import React, { useState } from 'react';
import { Monitor, Grid, Layers, Zap, Download, Share2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { ScrubbableInput } from './ScrubbableInput';

interface CanvasSettingsProps {
    canvasSettings: { width: number; height: number; name: string };
    setCanvasSettings: React.Dispatch<React.SetStateAction<{ width: number; height: number; name: string }>>;
    snapToGrid: boolean;
    setSnapToGrid: (v: boolean) => void;
}

export const CanvasSettings: React.FC<CanvasSettingsProps> = ({
    canvasSettings,
    setCanvasSettings,
    snapToGrid,
    setSnapToGrid
}) => {
    const [sections, setSections] = useState({
        dimensions: true,
        view: true,
        execution: true
    });

    const toggleSection = (section: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/5">
                <div className="flex items-center gap-2">
                    <Monitor size={14} className="text-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                        Canvas Settings
                    </span>
                </div>
            </div>

            {/* Resolution */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('dimensions')}
                    className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted/10 transition-colors border-b border-border/10"
                >
                    {sections.dimensions ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span className="text-[12px] font-medium text-foreground">Dimensions</span>
                </button>

                {sections.dimensions && (
                    <div className="p-4 space-y-4 border-b border-border/10 animate-in fade-in duration-200">
                        <div className="space-y-2">
                            <span className="text-[12px] text-muted-foreground">Presets</span>
                            <div className="flex flex-wrap gap-1">
                                {[
                                    { name: '16:9', w: 1920, h: 1080, label: 'FHD' },
                                    { name: '1:1', w: 1080, h: 1080, label: 'SQ' },
                                    { name: '9:16', w: 1080, h: 1920, label: 'POR' },
                                    { name: '3:2', w: 1620, h: 1080, label: 'PHT' },
                                    { name: '4:3', w: 1440, h: 1080, label: 'STD' },
                                    { name: '21:9', w: 2520, h: 1080, label: 'UW' }
                                ].map((ratio) => (
                                    <Button
                                        key={ratio.name}
                                        variant="ghost"
                                        className={`h-8 px-3 text-[11px] font-mono border rounded-none ${canvasSettings.name === ratio.name ? 'bg-primary text-primary-foreground border-primary' : 'border-border/40 bg-muted/10 hover:bg-muted/20'}`}
                                        onClick={() => setCanvasSettings({ width: ratio.w, height: ratio.h, name: ratio.name })}
                                    >
                                        {ratio.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <ScrubbableInput
                                label="Width"
                                value={canvasSettings.width}
                                onChange={(val) => setCanvasSettings(p => ({ ...p, width: val, name: 'Custom' }))}
                                min={100}
                                max={8192}
                                unit="px"
                            />
                            <ScrubbableInput
                                label="Height"
                                value={canvasSettings.height}
                                onChange={(val) => setCanvasSettings(p => ({ ...p, height: val, name: 'Custom' }))}
                                min={100}
                                max={8192}
                                unit="px"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="h-px bg-border/20" />

            {/* Grid & Snap */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('view')}
                    className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted/10 transition-colors border-b border-border/10"
                >
                    {sections.view ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span className="text-[12px] font-medium text-foreground">Viewport System</span>
                </button>

                {sections.view && (
                    <div className="p-4 space-y-2 border-b border-border/10 animate-in fade-in duration-200">
                        <button
                            onClick={() => setSnapToGrid(!snapToGrid)}
                            className="w-full flex items-center justify-between p-2 hover:bg-muted/20 transition-all group/toggle"
                        >
                            <div className="flex items-center gap-3">
                                <Grid size={14} className={snapToGrid ? "text-primary" : "text-muted-foreground/50"} />
                                <span className={`text-[12px] ${snapToGrid ? "text-foreground font-medium" : "text-muted-foreground"}`}>Snap to Grid</span>
                            </div>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${snapToGrid ? "bg-primary" : "bg-muted-foreground/30"}`}>
                                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${snapToGrid ? "left-4.5" : "left-0.5"}`} />
                            </div>
                        </button>

                        <div className="w-full flex items-center justify-between p-2 opacity-40 cursor-not-allowed">
                            <div className="flex items-center gap-3">
                                <Layers size={14} className="text-muted-foreground" />
                                <span className="text-[12px] text-muted-foreground">Show Rulers</span>
                            </div>
                            <div className="w-8 h-4 rounded-full bg-muted-foreground/20 relative">
                                <div className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white/50" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
