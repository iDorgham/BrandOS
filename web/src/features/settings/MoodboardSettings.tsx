import React, { useState } from 'react';
import { Layout, Grid3X3, Magnet, Maximize, Layers, Spline, Timer, Eye, ZoomIn } from 'lucide-react';
import { Switch } from '@/components/ui';

export const MoodboardSettings = () => {
    const [canvasSettings, setCanvasSettings] = useState({
        background: 'dots',
        gridSize: 20,
        snapToGrid: true,
        showMinimap: true,
        showNodeLabels: true,
        defaultZoom: 1.0,
        edgeType: 'smoothstep',
        autoSave: true,
        autoSaveInterval: 30,
        defaultNodeWidth: 200,
        defaultNodeHeight: 150,
        animateEdges: true,
    });

    const update = (key: string, value: unknown) => {
        setCanvasSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">Moodboard</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Canvas_Configuration</p>
                </div>
            </div>

            {/* Canvas Background */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Layout size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Canvas Background</span>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { id: 'dots', label: 'Dots', pattern: 'radial-gradient(circle, currentColor 1px, transparent 1px)' },
                            { id: 'lines', label: 'Lines', pattern: 'repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 20px)' },
                            { id: 'cross', label: 'Cross', pattern: '' },
                            { id: 'none', label: 'None', pattern: '' },
                        ].map((bg) => (
                            <button
                                key={bg.id}
                                onClick={() => update('background', bg.id)}
                                className={`
                                    p-3 border text-center transition-all
                                    ${canvasSettings.background === bg.id
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border/40 bg-muted/10 hover:bg-muted/20 text-muted-foreground'
                                    }
                                `}
                            >
                                <div className="h-12 mb-2 border border-border/20 bg-background/50 flex items-center justify-center">
                                    {bg.id === 'dots' && (
                                        <div className="grid grid-cols-4 gap-2 p-2">
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <div key={i} className="w-1 h-1 bg-muted-foreground/30" />
                                            ))}
                                        </div>
                                    )}
                                    {bg.id === 'lines' && (
                                        <div className="w-full h-full flex flex-col justify-evenly px-2">
                                            {[1, 2, 3].map(i => <div key={i} className="h-px bg-muted-foreground/20" />)}
                                        </div>
                                    )}
                                    {bg.id === 'cross' && (
                                        <div className="grid grid-cols-3 gap-2 p-2">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <div key={i} className="w-2 h-2 flex items-center justify-center text-muted-foreground/30 text-[6px]">+</div>
                                            ))}
                                        </div>
                                    )}
                                    {bg.id === 'none' && (
                                        <span className="text-[8px] font-mono text-muted-foreground/30">BLANK</span>
                                    )}
                                </div>
                                <span className="text-[10px] font-bold">{bg.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid & Snap */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Grid3X3 size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Grid & Alignment</span>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Grid Size</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={canvasSettings.gridSize}
                                    onChange={(e) => update('gridSize', parseInt(e.target.value))}
                                    className="flex-1 accent-primary h-1"
                                />
                                <span className="text-[11px] font-mono font-bold text-foreground w-8 text-right">{canvasSettings.gridSize}</span>
                                <span className="text-[8px] font-mono text-muted-foreground/40">px</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Default Zoom</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0.1"
                                    max="2"
                                    step="0.1"
                                    value={canvasSettings.defaultZoom}
                                    onChange={(e) => update('defaultZoom', parseFloat(e.target.value))}
                                    className="flex-1 accent-primary h-1"
                                />
                                <span className="text-[11px] font-mono font-bold text-foreground w-8 text-right">{canvasSettings.defaultZoom.toFixed(1)}</span>
                                <span className="text-[8px] font-mono text-muted-foreground/40">x</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border/20" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Magnet size={12} className="text-muted-foreground/60" />
                                <span className="text-[10px] font-bold text-foreground">Snap to Grid</span>
                            </div>
                            <Switch checked={canvasSettings.snapToGrid} onCheckedChange={(v) => update('snapToGrid', v)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye size={12} className="text-muted-foreground/60" />
                                <span className="text-[10px] font-bold text-foreground">Show Minimap</span>
                            </div>
                            <Switch checked={canvasSettings.showMinimap} onCheckedChange={(v) => update('showMinimap', v)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Layers size={12} className="text-muted-foreground/60" />
                                <span className="text-[10px] font-bold text-foreground">Show Node Labels</span>
                            </div>
                            <Switch checked={canvasSettings.showNodeLabels} onCheckedChange={(v) => update('showNodeLabels', v)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Edge Type */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Spline size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Edge Configuration</span>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Default Edge Type</label>
                        <div className="flex gap-2">
                            {['smoothstep', 'bezier', 'straight'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => update('edgeType', type)}
                                    className={`
                                        h-8 px-3 text-[10px] font-mono font-bold uppercase border transition-all
                                        ${canvasSettings.edgeType === type
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'border-border/40 bg-muted/10 hover:bg-muted/20 text-muted-foreground'
                                        }
                                    `}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Spline size={12} className="text-muted-foreground/60" />
                            <span className="text-[10px] font-bold text-foreground">Animate Edges</span>
                        </div>
                        <Switch checked={canvasSettings.animateEdges} onCheckedChange={(v) => update('animateEdges', v)} />
                    </div>
                </div>
            </div>

            {/* Default Node Size */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Maximize size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Default Node Dimensions</span>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Width</label>
                            <div className="flex items-center h-9 bg-muted/20 border border-border/40 border-b-2">
                                <input
                                    type="number"
                                    value={canvasSettings.defaultNodeWidth}
                                    onChange={(e) => update('defaultNodeWidth', parseInt(e.target.value))}
                                    className="flex-1 h-full bg-transparent text-[12px] font-mono px-3 outline-none"
                                />
                                <span className="text-[8px] font-mono text-muted-foreground/40 pr-3">px</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Height</label>
                            <div className="flex items-center h-9 bg-muted/20 border border-border/40 border-b-2">
                                <input
                                    type="number"
                                    value={canvasSettings.defaultNodeHeight}
                                    onChange={(e) => update('defaultNodeHeight', parseInt(e.target.value))}
                                    className="flex-1 h-full bg-transparent text-[12px] font-mono px-3 outline-none"
                                />
                                <span className="text-[8px] font-mono text-muted-foreground/40 pr-3">px</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auto-Save */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Timer size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Persistence</span>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-foreground block">Auto-Save</span>
                            <span className="text-[9px] text-muted-foreground/60">Automatically save canvas state</span>
                        </div>
                        <Switch checked={canvasSettings.autoSave} onCheckedChange={(v) => update('autoSave', v)} />
                    </div>

                    {canvasSettings.autoSave && (
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Save Interval</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="10"
                                    max="120"
                                    step="10"
                                    value={canvasSettings.autoSaveInterval}
                                    onChange={(e) => update('autoSaveInterval', parseInt(e.target.value))}
                                    className="flex-1 accent-primary h-1"
                                />
                                <span className="text-[11px] font-mono font-bold text-foreground w-8 text-right">{canvasSettings.autoSaveInterval}</span>
                                <span className="text-[8px] font-mono text-muted-foreground/40">sec</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">CANVAS::CONFIG_STATE</span>
                <div className="flex items-center gap-1.5">
                    <ZoomIn size={10} className="text-muted-foreground/30" />
                    <span className="text-[8px] font-mono text-muted-foreground/30">Changes apply on next canvas load</span>
                </div>
            </div>
        </div>
    );
};
