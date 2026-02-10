
import React, { useMemo, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MiniMap, Node, useNodes, useReactFlow } from '@xyflow/react';
import {
    Settings,
    Palette,
    Type,
    Keyboard,
    Grid,
    Download,
    Share2,
    Zap,
    Layers,
    AlignLeft,
    Type as TypeIcon,
    MousePointer2,
    Lock,
    Unlock,
    Trash2,
    Link,
    Unlink,
    Monitor,
    ChevronRight,
    ChevronLeft,
    PanelRightOpen,
    PanelRightClose
} from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { MoodNodeData } from './MoodBoardView';
import { BrandProfile } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface MoodBoardSettingsPanelProps {
    brand: BrandProfile;
    canvasSettings: { width: number; height: number; name: string };
    setCanvasSettings: React.Dispatch<React.SetStateAction<{ width: number; height: number; name: string }>>;
    snapToGrid: boolean;
    setSnapToGrid: (v: boolean) => void;
    onExport: () => void;
    onGeneratePrompt: () => void;
    updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
    onDeleteNode: (id: string) => void;
}

export const MoodBoardSettingsPanel = React.memo(({
    brand,
    canvasSettings,
    setCanvasSettings,
    snapToGrid,
    setSnapToGrid,
    onExport,
    onGeneratePrompt,
    updateNodeData,
    onDeleteNode
}: MoodBoardSettingsPanelProps) => {
    const [activeTab, setActiveTab] = useState<'assets' | 'guide' | 'settings'>('settings');
    const { assets } = useAuth();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const nodes = useNodes();
    // We can use the store or just filter nodes passed implicitly? 
    // Ideally useNodes() from ReactFlowProvider gives us latest state if updated correctly.

    const selectedNode = useMemo(() => nodes.find((n) => n.selected) as Node<MoodNodeData> | undefined, [nodes]);

    // Auto-switch to settings if a node is selected
    React.useEffect(() => {
        if (selectedNode) {
            setActiveTab('settings');
        }
    }, [selectedNode?.id]);

    const [width, setWidth] = useState(260);
    const [isResizing, setIsResizing] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const startResizing = React.useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback((mouseMoveEvent: globalThis.MouseEvent) => {
        if (isResizing) {
            const newWidth = window.innerWidth - mouseMoveEvent.clientX;
            if (newWidth > 240 && newWidth < 600) {
                setWidth(newWidth);
            }
        }
    }, [isResizing]);

    React.useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <>
            <aside
                className={`absolute right-0 top-0 bottom-0 bg-card/95 backdrop-blur-xl border-l border-border/40 z-20 flex flex-col shadow-2xl transition-all duration-300 ease-in-out ${!isOpen ? 'translate-x-full opacity-0 pointer-events-none' : ''}`}
                style={{ width: width }}
            >
                {/* Resize Handle */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 transition-colors z-50 transform -translate-x-1/2"
                    onMouseDown={startResizing}
                />
                {/* Tabs Header */}
                <div className="flex items-center border-b border-border/40 bg-muted/20">
                    <button
                        onClick={() => setActiveTab('assets')}
                        className={`flex-1 flex items-center justify-center gap-1.5 h-8 text-[8px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'assets' ? 'bg-background text-primary border-t-2 border-primary' : 'text-muted-foreground/60 hover:text-foreground hover:bg-background/40'}`}
                    >
                        <Palette size={10} /> Assets
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex-1 flex items-center justify-center gap-1.5 h-8 text-[8px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'settings' ? 'bg-background text-primary border-t-2 border-primary' : 'text-muted-foreground/60 hover:text-foreground hover:bg-background/40'}`}
                    >
                        <Settings size={10} /> Inspector
                    </button>
                    <button
                        onClick={() => setActiveTab('guide')}
                        className={`flex-1 flex items-center justify-center gap-1.5 h-8 text-[8px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'bg-background text-primary border-t-2 border-primary' : 'text-muted-foreground/60 hover:text-foreground hover:bg-background/40'}`}
                    >
                        <Keyboard size={10} /> Guide
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-0">

                    {/* ASSETS TAB */}
                    {activeTab === 'assets' && (
                        <div className="p-3 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Brand Colors */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Brand Palette</span>
                                    <span className="text-[8px] font-mono text-primary/60">{brand.palette.length} COLORS</span>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {brand.palette.map((color: any, i: number) => (
                                        <button
                                            key={i}
                                            title={`${color.label} (${color.hex})`}
                                            className="aspect-square rounded-sm border border-border/40 relative group/color hover:scale-110 transition-transform cursor-copy"
                                            style={{ backgroundColor: color.hex }}
                                            onClick={() => {
                                                // Copy to clipboard or something?
                                                navigator.clipboard.writeText(color.hex);
                                            }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 bg-black/20 text-white text-[8px] font-mono">
                                                COPY
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-border/40" />

                            {/* Typography */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Typography</span>
                                </div>
                                <div className="space-y-2">
                                    {/* Primary Font */}
                                    <div className="p-2 bg-muted/20 border border-border/40 rounded-sm space-y-1">
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground/60 block">Primary Display</span>
                                        <div className="text-xl font-bold" style={{ fontFamily: brand.typography?.fontFamily || 'Inter' }}>
                                            {brand.typography?.fontFamily || 'Inter'}
                                        </div>
                                        <div className="text-xs opacity-60 truncate">The quick brown fox jumps over the lazy dog.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-border/40" />

                            {/* Library / Assets Browser */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Library</span>
                                    <span className="text-[8px] font-mono text-primary/60">{assets.length} ASSETS</span>
                                </div>

                                {assets.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-2">
                                        {assets.map((asset) => (
                                            <div
                                                key={asset.id}
                                                className="aspect-square bg-muted/20 rounded-sm overflow-hidden border border-border/40 hover:border-primary/60 group/asset cursor-grab active:cursor-grabbing relative"
                                                draggable
                                                onDragStart={(e) => {
                                                    e.dataTransfer.setData('application/reactflow/type', 'image');
                                                    e.dataTransfer.setData('application/reactflow/url', asset.url);
                                                    e.dataTransfer.effectAllowed = 'copy';
                                                }}
                                            >
                                                <img
                                                    src={asset.url}
                                                    alt={asset.prompt || 'Asset'}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/asset:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/asset:bg-black/20 transition-colors" />
                                                <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover/asset:opacity-100 transition-opacity">
                                                    <div className="bg-background/90 backdrop-blur-sm px-1.5 py-0.5 rounded-[1px] border border-border/20">
                                                        <span className="text-[6px] font-mono font-bold uppercase truncate block text-foreground">
                                                            {asset.assetType || 'IMG'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 border border-dashed border-border/40 rounded-sm bg-muted/10 flex flex-col items-center justify-center text-center gap-2">
                                        <Layers size={16} className="text-muted-foreground/40" />
                                        <span className="text-[8px] font-mono uppercase text-muted-foreground/60">No generated assets found</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* GUIDE TAB */}
                    {activeTab === 'guide' && (
                        <div className="p-3 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block border-b border-border/40 pb-2">Shortcuts</span>

                                <div className="grid gap-2">
                                    {[
                                        { keys: ['V'], label: 'Pointer Tool' },
                                        { keys: ['H', 'Space'], label: 'Hand / Pan' },
                                        { keys: ['T'], label: 'Insert Text' },
                                        { keys: ['S'], label: 'Section Tool' },
                                        { keys: ['Ctrl', 'D'], label: 'Duplicate' },
                                        { keys: ['Del'], label: 'Delete' },
                                        { keys: ['Ctrl', 'Z'], label: 'Undo' },
                                        { keys: ['Ctrl', 'Y'], label: 'Redo' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-sm transition-colors">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">{s.label}</span>
                                            <div className="flex gap-1">
                                                {s.keys.map(k => (
                                                    <kbd key={k} className="h-5 px-1.5 min-w-[20px] bg-muted border border-border flex items-center justify-center text-[9px] font-mono rounded-sm text-foreground">
                                                        {k}
                                                    </kbd>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block border-b border-border/40 pb-2">Canvas Tips</span>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">
                                    Use <span className="text-foreground font-bold">Sections</span> to group related nodes together. Double-click the canvas to quickly add a label. Right-click nodes for advanced options like <span className="text-primary">Locking</span> or <span className="text-primary">Layering</span>.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* SETTINGS INSPECTOR TAB */}
                    {activeTab === 'settings' && (
                        <div className="p-3 animate-in fade-in slide-in-from-right-4 duration-300">
                            {selectedNode ? (
                                <div className="space-y-6">
                                    {/* Node Header */}
                                    <div className="flex items-center justify-between border-b border-border/40 pb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                                <Settings size={14} />
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest text-primary">
                                                    {selectedNode.data.type || 'Node'}
                                                </div>
                                                <div className="text-[8px] font-mono text-muted-foreground opacity-60">
                                                    ID::{selectedNode.id.slice(0, 8)}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-rose-500 hover:bg-rose-500/10"
                                            onClick={() => onDeleteNode(selectedNode.id)}
                                            title="Delete Node"
                                        >
                                            <Trash2 size={12} />
                                        </Button>
                                    </div>

                                    {/* Common Properties */}
                                    <div className="space-y-2">
                                        <span className="text-[8px] font-mono font-bold uppercase text-muted-foreground/60 block">Layout & Transform</span>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-muted/20 border border-border/40 p-2">
                                                <span className="text-[8px] uppercase tracking-widest text-muted-foreground/40 block mb-1">Position X</span>
                                                <div className="font-mono text-[10px]">{Math.round(selectedNode.position.x)}</div>
                                            </div>
                                            <div className="bg-muted/20 border border-border/40 p-2">
                                                <span className="text-[8px] uppercase tracking-widest text-muted-foreground/40 block mb-1">Position Y</span>
                                                <div className="font-mono text-[10px]">{Math.round(selectedNode.position.y)}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                                            <div className="bg-muted/20 border border-border/40 p-2">
                                                <span className="text-[8px] uppercase tracking-widest text-muted-foreground/40 block mb-1">Width (px)</span>
                                                <Input
                                                    type="number"
                                                    value={Math.round((selectedNode as any).measured?.width ?? (selectedNode as any).width ?? parseInt(selectedNode.style?.width as string) ?? 0)}
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        if (isNaN(val)) return;
                                                        if (selectedNode.data.isRatioLocked) {
                                                            const currentWidth = (selectedNode as any).measured?.width ?? (selectedNode as any).width ?? parseInt(selectedNode.style?.width as string) ?? 1;
                                                            const currentHeight = (selectedNode as any).measured?.height ?? (selectedNode as any).height ?? parseInt(selectedNode.style?.height as string) ?? 1;
                                                            const ratio = currentHeight / currentWidth;
                                                            updateNodeData(selectedNode.id, {}, { width: val, height: Math.round(val * ratio) });
                                                        } else {
                                                            updateNodeData(selectedNode.id, {}, { width: val });
                                                        }
                                                    }}
                                                    className="h-6 text-[10px] font-mono bg-transparent border-none p-0 focus-visible:ring-0"
                                                />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => updateNodeData(selectedNode.id, { isRatioLocked: !selectedNode.data.isRatioLocked })}
                                                className={`h-10 w-8 border border-border/40 hover:bg-primary/5 mb-0.5 ${selectedNode.data.isRatioLocked ? 'text-primary bg-primary/10 border-primary/20' : 'text-muted-foreground/40'}`}
                                                title="Lock Aspect Ratio"
                                            >
                                                {selectedNode.data.isRatioLocked ? <Link size={12} /> : <Unlink size={12} />}
                                            </Button>
                                            <div className="bg-muted/20 border border-border/40 p-2">
                                                <span className="text-[8px] uppercase tracking-widest text-muted-foreground/40 block mb-1">Height (px)</span>
                                                <Input
                                                    type="number"
                                                    value={Math.round((selectedNode as any).measured?.height ?? (selectedNode as any).height ?? parseInt(selectedNode.style?.height as string) ?? 0)}
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        if (isNaN(val)) return;
                                                        if (selectedNode.data.isRatioLocked) {
                                                            const currentWidth = (selectedNode as any).measured?.width ?? (selectedNode as any).width ?? parseInt(selectedNode.style?.width as string) ?? 1;
                                                            const currentHeight = (selectedNode as any).measured?.height ?? (selectedNode as any).height ?? parseInt(selectedNode.style?.height as string) ?? 1;
                                                            const ratio = currentWidth / currentHeight;
                                                            updateNodeData(selectedNode.id, {}, { height: val, width: Math.round(val * ratio) });
                                                        } else {
                                                            updateNodeData(selectedNode.id, {}, { height: val });
                                                        }
                                                    }}
                                                    className="h-6 text-[10px] font-mono bg-transparent border-none p-0 focus-visible:ring-0"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => updateNodeData(selectedNode.id, { isLocked: !selectedNode.data.isLocked })}
                                                className={`flex-1 h-8 text-[9px] font-bold uppercase tracking-widest ${selectedNode.data.isLocked ? 'bg-primary/10 text-primary border-primary/30' : ''}`}
                                            >
                                                {selectedNode.data.isLocked ? <Lock size={10} className="mr-2" /> : <Unlock size={10} className="mr-2" />}
                                                {selectedNode.data.isLocked ? 'Locked' : 'Unlocked'}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="h-px bg-border/40" />

                                    {/* Dynamic Content Controls Based on Type */}

                                    {/* Visual / Text Controls */}
                                    {(['text', 'title', 'paragraph', 'label', 'typography'].includes(selectedNode.data.type)) && (
                                        <div className="space-y-3">
                                            <span className="text-[9px] font-mono font-bold uppercase text-muted-foreground/60 block">Typography</span>
                                            <div className="space-y-2">
                                                <label className="text-[9px] uppercase tracking-wider text-muted-foreground">Content</label>
                                                <Input
                                                    value={selectedNode.data.content || selectedNode.data.label || ''}
                                                    onChange={(e) => updateNodeData(selectedNode.id, selectedNode.data.content ? { content: e.target.value } : { label: e.target.value })}
                                                    className="h-8 text-[10px] font-mono bg-muted/20"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="text-[9px] uppercase tracking-wider text-muted-foreground">Font Family</label>
                                                    <select
                                                        className="w-full h-8 bg-muted/20 border border-border/40 text-[10px] px-2 outline-none focus:border-primary/50"
                                                        value={selectedNode.data.fontFamily || 'Inter'}
                                                        onChange={(e) => updateNodeData(selectedNode.id, { fontFamily: e.target.value })}
                                                    >
                                                        {['Inter', 'IBM Plex Mono', 'Space Grotesk', 'Roboto', 'Playfair Display', 'Outfit'].map(f => (
                                                            <option key={f} value={f}>{f}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-[9px] uppercase tracking-wider text-muted-foreground">Size (px)</label>
                                                    <Input
                                                        type="number"
                                                        className="h-8 text-[10px] font-mono bg-muted/20"
                                                        value={selectedNode.data.fontSize || 16}
                                                        onChange={(e) => updateNodeData(selectedNode.id, { fontSize: parseInt(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Color Controls */}
                                    <div className="space-y-3">
                                        <span className="text-[9px] font-mono font-bold uppercase text-muted-foreground/60 block">Styling</span>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-sm border border-border/40 shadow-inner"
                                                style={{ backgroundColor: selectedNode.data.color || '#ffffff' }}
                                            />
                                            <div className="flex-1 space-y-1">
                                                <label className="text-[9px] uppercase tracking-wider text-muted-foreground">Hex Color</label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        className="h-7 text-[10px] font-mono bg-muted/20"
                                                        value={selectedNode.data.color || ''}
                                                        placeholder="#FFFFFF"
                                                        onChange={(e) => updateNodeData(selectedNode.id, { color: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                // CANVAS GLOBAL SETTINGS (No Selection)
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-border/40 pb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary-foreground">
                                                <Monitor size={14} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-foreground">
                                                    Canvas Global
                                                </div>
                                                <div className="text-[9px] font-mono text-muted-foreground opacity-60">
                                                    ACTIVE_SESSION
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resolution */}
                                    <div className="space-y-3">
                                        <span className="text-[9px] font-mono font-bold uppercase text-muted-foreground/60 block">Dimensions</span>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                variant={canvasSettings.name === 'FHD (16:9)' ? 'secondary' : 'ghost'}
                                                className={`h-8 text-[9px] font-mono border border-dashed ${canvasSettings.name === 'FHD (16:9)' ? 'border-solid border-primary/40 bg-primary/5 text-primary' : 'border-border/40'}`}
                                                onClick={() => setCanvasSettings({ width: 1920, height: 1080, name: 'FHD (16:9)' })}
                                            >
                                                1920x1080
                                            </Button>
                                            <Button
                                                variant={canvasSettings.name === 'Square (1:1)' ? 'secondary' : 'ghost'}
                                                className={`h-8 text-[9px] font-mono border border-dashed ${canvasSettings.name === 'Square (1:1)' ? 'border-solid border-primary/40 bg-primary/5 text-primary' : 'border-border/40'}`}
                                                onClick={() => setCanvasSettings({ width: 1080, height: 1080, name: 'Square (1:1)' })}
                                            >
                                                1080x1080
                                            </Button>
                                        </div>

                                        <div className="flex gap-2 items-center pt-1">
                                            <div className="flex-1">
                                                <span className="text-[8px] uppercase tracking-widest text-muted-foreground/50 block mb-1">W</span>
                                                <Input
                                                    className="h-7 text-[10px] font-mono bg-muted/20"
                                                    type="number"
                                                    value={canvasSettings.width}
                                                    onChange={(e) => setCanvasSettings(p => ({ ...p, width: parseInt(e.target.value), name: 'Custom' }))}
                                                />
                                            </div>
                                            <span className="text-[10px] text-muted-foreground/30 pt-4">x</span>
                                            <div className="flex-1">
                                                <span className="text-[8px] uppercase tracking-widest text-muted-foreground/50 block mb-1">H</span>
                                                <Input
                                                    className="h-7 text-[10px] font-mono bg-muted/20"
                                                    type="number"
                                                    value={canvasSettings.height}
                                                    onChange={(e) => setCanvasSettings(p => ({ ...p, height: parseInt(e.target.value), name: 'Custom' }))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-border/40" />

                                    {/* Grid & Snap */}
                                    <div className="space-y-3">
                                        <span className="text-[9px] font-mono font-bold uppercase text-muted-foreground/60 block">View Options</span>
                                        <button
                                            onClick={() => setSnapToGrid(!snapToGrid)}
                                            className={`w-full flex items-center justify-between p-2 border ${snapToGrid ? 'border-primary/40 bg-primary/5' : 'border-border/40 bg-muted/10'} rounded-sm transition-all`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Grid size={12} className={snapToGrid ? "text-primary" : "text-muted-foreground"} />
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${snapToGrid ? "text-primary" : "text-muted-foreground"}`}>Snap to Grid</span>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${snapToGrid ? "bg-primary" : "bg-muted-foreground/30"}`} />
                                        </button>

                                        <button
                                            className="w-full flex items-center justify-between p-2 border border-border/40 bg-muted/10 rounded-sm opacity-50 cursor-not-allowed"
                                            title="Coming Soon"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Layers size={12} className="text-muted-foreground" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Show Rulers</span>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="h-px bg-border/40" />

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <span className="text-[9px] font-mono font-bold uppercase text-muted-foreground/60 block">Execution</span>
                                        <Button
                                            onClick={onGeneratePrompt}
                                            className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(15,98,254,0.3)] border border-primary/20 text-[10px] font-black uppercase tracking-widest"
                                        >
                                            <Zap size={12} className="mr-2 fill-current" /> Initialize Run
                                        </Button>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                variant="secondary"
                                                onClick={onExport}
                                                className="h-8 text-[9px] font-bold uppercase tracking-widest hover:bg-muted/50"
                                            >
                                                <Download size={10} className="mr-2" /> Export
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => { }}
                                                className="h-8 text-[9px] font-bold uppercase tracking-widest hover:bg-muted/50"
                                            >
                                                <Share2 size={10} className="mr-2" /> Share
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* MiniMap Container - Fixed Bottom */}
                <div className="h-36 border-t border-border/40 relative bg-muted/20 overflow-hidden group/minimap">

                    <MiniMap
                        style={{ height: '100%', width: '100%', margin: 0 }}
                        maskColor={isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.1)"}
                        maskStrokeColor={isDark ? "rgba(15,98,254,1)" : "rgba(15,98,254,0.8)"}
                        maskStrokeWidth={2}
                        className="!bg-transparent"
                        nodeColor="#0f62fe"
                        nodeStrokeColor="transparent"
                        zoomable
                        pannable
                    />
                </div>
            </aside>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute bottom-4 z-30 flex items-center justify-center w-8 h-8 rounded-full border shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${isOpen
                    ? 'right-[270px] bg-background border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50'
                    : 'right-4 bg-primary text-primary-foreground border-primary shadow-primary/25'
                    }`}
                style={isOpen ? { right: width + 16 } : {}}
                title={isOpen ? "Collapse Panel" : "Open Settings"}
            >
                {isOpen ? <PanelRightClose size={14} /> : <PanelRightOpen size={14} />}
            </button>
        </>
    );
});
