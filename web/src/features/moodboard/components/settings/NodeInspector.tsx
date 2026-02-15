import React, { useState, useCallback } from 'react';
import { Node } from '@xyflow/react';
import { MoodNodeData } from '../../types';
import { ScrubbableInput } from './ScrubbableInput';
import { Button, Input } from '@/components/ui';
import {
    Trash2, Link, Unlink, Lock, Unlock,
    ChevronDown, ChevronRight, Palette,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Bold, Italic, Underline, Strikethrough,
    Hash, Type, Eye, EyeOff, Copy,
    Move, Maximize2, LetterText,
    CaseUpper, CaseLower, Baseline,
    RotateCw, Settings2, Image as ImageIcon,
    Upload, Sun, Contrast, Droplets, Sparkles, CloudFog, RefreshCcw,
    Swords, Activity, Layers, Grid3X3, Palette as PaletteIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { SETTINGS_REGISTRY } from '../../execution/settingsRegistry';
import { DynamicSettingsRenderer } from './DynamicSettingsRenderer';
import { useMoodBoard } from '../../MoodBoardContext';

interface NodeInspectorProps {
    selectedNode: Node<MoodNodeData>;
    updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
    onDeleteNode: (id: string) => void;
}

const FONT_LIST = [
    { label: 'Inter', value: 'Inter' },
    { label: 'IBM Plex Sans', value: 'IBM Plex Sans' },
    { label: 'IBM Plex Mono', value: 'IBM Plex Mono' },
    { label: 'Space Grotesk', value: 'Space Grotesk' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Outfit', value: 'Outfit' },
    { label: 'Playfair Display', value: 'Playfair Display' },
];

const FONT_WEIGHTS = [
    { label: 'Light', value: '300' },
    { label: 'Regular', value: '400' },
    { label: 'Medium', value: '500' },
    { label: 'Semibold', value: '600' },
    { label: 'Bold', value: '700' },
    { label: 'Black', value: '900' },
];

const TEXT_NODE_TYPES = ['text', 'title', 'paragraph', 'label', 'typography'];

// Compact section header
const SectionHeader: React.FC<{
    label: string;
    icon?: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}> = ({ label, icon, isOpen, onToggle }) => (
    <button
        onClick={onToggle}
        className="flex items-center gap-1.5 w-full px-3 py-2 text-left hover:bg-muted/10 transition-colors"
    >
        {isOpen ? <ChevronDown size={10} className="text-muted-foreground/40" /> : <ChevronRight size={10} className="text-muted-foreground/40" />}
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">{label}</span>
    </button>
);

// Compact toggle button for inline groups
const ToggleBtn: React.FC<{
    active?: boolean;
    onClick?: () => void;
    title?: string;
    children: React.ReactNode;
}> = ({ active, onClick, title, children }) => (
    <button
        onClick={onClick}
        title={title}
        className={`h-7 w-7 flex items-center justify-center transition-all duration-100 ${active
            ? 'bg-primary/15 text-primary'
            : 'text-muted-foreground/40 hover:text-foreground hover:bg-muted/20'
            }`}
    >
        {children}
    </button>
);

// Inline label + value pair
const PropRow: React.FC<{
    label: string;
    children: React.ReactNode;
    className?: string;
}> = ({ label, children, className = '' }) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider w-10 shrink-0">{label}</span>
        <div className="flex-1 min-w-0">{children}</div>
    </div>
);

export const NodeInspector: React.FC<NodeInspectorProps> = ({
    selectedNode,
    updateNodeData,
    onDeleteNode
}) => {
    const { brand } = useMoodBoard();
    const [sections, setSections] = useState<Record<string, boolean>>({
        transform: true,
        content: true,
        typography: true,
        fill: true,
        image: true,
        values: true,
        nodeSettings: false,
        metadata: false
    });

    const [isDraggingInInspector, setIsDraggingInInspector] = useState(false);

    const toggle = (s: keyof typeof sections) =>
        setSections(prev => ({ ...prev, [s]: !prev[s] }));

    const update = useCallback((data: Partial<MoodNodeData>, style?: React.CSSProperties) => {
        updateNodeData(selectedNode.id, data, style);
    }, [selectedNode.id, updateNodeData]);

    const isTextNode = TEXT_NODE_TYPES.includes(selectedNode.data.type || '');

    // Measured dimensions
    const nodeWidth = Math.round((selectedNode as any).measured?.width ?? (selectedNode as any).width ?? parseInt(selectedNode.style?.width as string) ?? 0);
    const nodeHeight = Math.round((selectedNode as any).measured?.height ?? (selectedNode as any).height ?? parseInt(selectedNode.style?.height as string) ?? 0);
    const posX = Math.round(selectedNode.position?.x ?? 0);
    const posY = Math.round(selectedNode.position?.y ?? 0);

    // Typography values
    const fontFamily = selectedNode.data.fontFamily || 'Inter';
    const fontSize = selectedNode.data.fontSize || 16;
    const fontWeight = selectedNode.data.fontWeight || '400';
    const fontStyle = selectedNode.data.fontStyle || 'normal';
    const textDecoration = selectedNode.data.textDecoration || 'none';
    const textTransform = selectedNode.data.textTransform || 'none';
    const textAlign = selectedNode.data.textAlign || 'left';
    const letterSpacing = parseFloat(selectedNode.data.letterSpacing as string || '0');
    const lineHeight = parseFloat(selectedNode.data.lineHeight as string || '1.4');
    const opacity = Math.round((selectedNode.style?.opacity as any || 1) * 100);

    return (
        <div className="flex flex-col divide-y divide-border/10">

            {/* ── Node Identity ── */}
            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-1 h-4 bg-primary shrink-0" />
                    <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary leading-none truncate">
                            {selectedNode.data.type || 'node'}
                        </span>
                        <span className="text-[8px] font-mono text-muted-foreground/40 leading-none mt-0.5 truncate">
                            {selectedNode.id.slice(0, 12).toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                    <ToggleBtn
                        active={selectedNode.data.isLocked}
                        onClick={() => update({ isLocked: !selectedNode.data.isLocked })}
                        title={selectedNode.data.isLocked ? 'Unlock' : 'Lock'}
                    >
                        {selectedNode.data.isLocked ? <Lock size={11} /> : <Unlock size={11} />}
                    </ToggleBtn>
                    <button
                        className="h-7 w-7 flex items-center justify-center text-muted-foreground/30 hover:text-destructive transition-colors"
                        onClick={() => onDeleteNode(selectedNode.id)}
                        title="Delete Node"
                    >
                        <Trash2 size={11} />
                    </button>
                    {selectedNode.data.linkUrl && (
                        <a
                            href={selectedNode.data.linkUrl as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 w-7 flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
                            title="Open Link"
                        >
                            <Link size={11} />
                        </a>
                    )}
                </div>
            </div>

            {/* ── Transform (Position + Size) ── */}
            <div>
                <SectionHeader
                    label="Transform"
                    icon={<Move size={10} className="text-muted-foreground/30" />}
                    isOpen={sections.transform}
                    onToggle={() => toggle('transform')}
                />
                {sections.transform && (
                    <div className="px-3 pb-3 space-y-2 animate-in fade-in duration-150">
                        {/* Position Row */}
                        <div className="grid grid-cols-2 gap-2">
                            <ScrubbableInput
                                label="X"
                                value={posX}
                                unit=""
                                onChange={(val) => {
                                    // Position is controlled by ReactFlow, update via style
                                    // This is read-only for now as position changes need ReactFlow API
                                }}
                                min={-10000}
                                max={10000}
                                className="opacity-50 pointer-events-none"
                            />
                            <ScrubbableInput
                                label="Y"
                                value={posY}
                                unit=""
                                onChange={() => { }}
                                min={-10000}
                                max={10000}
                                className="opacity-50 pointer-events-none"
                            />
                        </div>

                        {/* Size Row */}
                        <div className="grid grid-cols-2 gap-2">
                            <ScrubbableInput
                                label="W"
                                value={nodeWidth}
                                unit="px"
                                onChange={(val) => {
                                    if (selectedNode.data.isRatioLocked && nodeWidth > 0) {
                                        const ratio = nodeHeight / nodeWidth;
                                        update({}, { width: val, height: Math.round(val * ratio) });
                                    } else {
                                        update({}, { width: val });
                                    }
                                }}
                                min={40}
                                max={4000}
                            />
                            <ScrubbableInput
                                label="H"
                                value={nodeHeight}
                                unit="px"
                                onChange={(val) => {
                                    if (selectedNode.data.isRatioLocked && nodeHeight > 0) {
                                        const ratio = nodeWidth / nodeHeight;
                                        update({}, { height: val, width: Math.round(val * ratio) });
                                    } else {
                                        update({}, { height: val });
                                    }
                                }}
                                min={40}
                                max={4000}
                            />
                        </div>

                        {/* Constraints */}
                        <div className="flex gap-1">
                            <button
                                onClick={() => update({ isRatioLocked: !selectedNode.data.isRatioLocked })}
                                className={`flex-1 h-6 flex items-center justify-center gap-1.5 text-[9px] font-medium uppercase tracking-wider transition-all border ${selectedNode.data.isRatioLocked
                                    ? 'border-primary/30 bg-primary/5 text-primary'
                                    : 'border-border/20 text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/10'
                                    }`}
                            >
                                {selectedNode.data.isRatioLocked ? <Link size={9} /> : <Unlink size={9} />}
                                Ratio
                            </button>
                            <div className="flex-1 h-6 flex items-center justify-center gap-1.5 text-[9px] font-mono text-muted-foreground/30 border border-border/10">
                                <RotateCw size={9} />
                                0°
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Content ── */}
            {(isTextNode || selectedNode.data.type === 'image' || selectedNode.data.type === 'section' || selectedNode.data.type === 'competitor') && (
                <div>
                    <SectionHeader
                        label="Content"
                        icon={selectedNode.data.type === 'competitor' ? <Swords size={10} className="text-muted-foreground/30" /> : <Type size={10} className="text-muted-foreground/30" />}
                        isOpen={sections.content}
                        onToggle={() => toggle('content')}
                    />
                    {sections.content && (
                        <div className="px-3 pb-3 space-y-2 animate-in fade-in duration-150">
                            {selectedNode.data.type !== 'image' && (
                                <div className="space-y-1">
                                    <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">
                                        {selectedNode.data.content !== undefined ? 'Text' : 'Label'}
                                    </span>
                                    {selectedNode.data.content !== undefined ? (
                                        <textarea
                                            value={selectedNode.data.content || ''}
                                            onChange={(e) => update({ content: e.target.value })}
                                            rows={3}
                                            className="w-full bg-muted/10 border border-border/20 px-2.5 py-2 text-[11px] outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/20 resize-none font-sans"
                                            placeholder="Enter content..."
                                        />
                                    ) : (
                                        <Input
                                            value={selectedNode.data.label || ''}
                                            onChange={(e) => update({ label: e.target.value })}
                                            className="h-7 text-[11px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0 focus-visible:border-primary/40"
                                            placeholder="Enter label..."
                                        />
                                    )}
                                </div>
                            )}
                            {selectedNode.data.competitorName !== undefined && (
                                <div className="space-y-1">
                                    <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Entity Name</span>
                                    <Input
                                        value={selectedNode.data.competitorName || ''}
                                        onChange={(e) => update({ competitorName: e.target.value.toUpperCase() })}
                                        className="h-7 text-[11px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0 focus-visible:border-primary/40 font-mono"
                                        placeholder="AWAITING_ID..."
                                    />
                                </div>
                            )}
                            {selectedNode.data.description !== undefined && (
                                <div className="space-y-1">
                                    <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Description</span>
                                    <Input
                                        value={selectedNode.data.description || ''}
                                        onChange={(e) => update({ description: e.target.value })}
                                        className="h-7 text-[11px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0 focus-visible:border-primary/40"
                                        placeholder="Description..."
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ── Typography ── */}
            {isTextNode && (
                <div>
                    <SectionHeader
                        label="Typography"
                        icon={<LetterText size={10} className="text-muted-foreground/30" />}
                        isOpen={sections.typography}
                        onToggle={() => toggle('typography')}
                    />
                    {sections.typography && (
                        <div className="px-3 pb-3 space-y-3 animate-in fade-in duration-150">

                            {/* Font Family */}
                            <div className="space-y-1">
                                <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Family</span>
                                <select
                                    className="w-full h-7 bg-muted/10 border border-border/20 text-[11px] px-2 outline-none focus:border-primary/40 transition-colors cursor-pointer text-foreground"
                                    value={fontFamily}
                                    onChange={(e) => update({ fontFamily: e.target.value })}
                                    style={{ fontFamily }}
                                >
                                    {FONT_LIST.map(f => (
                                        <option key={f.value} value={f.value} style={{ fontFamily: f.value }} className="bg-[#161616] text-[#f4f4f4]">{f.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Weight + Size row */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Weight</span>
                                    <select
                                        className="w-full h-7 bg-muted/10 border border-border/20 text-[11px] px-2 outline-none focus:border-primary/40 transition-colors cursor-pointer text-foreground"
                                        value={fontWeight}
                                        onChange={(e) => update({ fontWeight: e.target.value })}
                                    >
                                        {FONT_WEIGHTS.map(w => (
                                            <option key={w.value} value={w.value} className="bg-[#161616] text-[#f4f4f4]">{w.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <ScrubbableInput
                                    label="Size"
                                    value={fontSize}
                                    unit="pt"
                                    onChange={(val) => update({ fontSize: val })}
                                    min={6}
                                    max={256}
                                />
                            </div>

                            {/* Style toggles: B I U S */}
                            <div className="space-y-1">
                                <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Style</span>
                                <div className="flex border border-border/20 bg-muted/5">
                                    <ToggleBtn
                                        active={Number(fontWeight) >= 700}
                                        onClick={() => update({ fontWeight: Number(fontWeight) >= 700 ? '400' : '700' })}
                                        title="Bold"
                                    >
                                        <Bold size={12} strokeWidth={2.5} />
                                    </ToggleBtn>
                                    <div className="w-px bg-border/10" />
                                    <ToggleBtn
                                        active={fontStyle === 'italic'}
                                        onClick={() => update({ fontStyle: fontStyle === 'italic' ? 'normal' : 'italic' })}
                                        title="Italic"
                                    >
                                        <Italic size={12} strokeWidth={2.5} />
                                    </ToggleBtn>
                                    <div className="w-px bg-border/10" />
                                    <ToggleBtn
                                        active={textDecoration === 'underline'}
                                        onClick={() => update({ textDecoration: textDecoration === 'underline' ? 'none' : 'underline' })}
                                        title="Underline"
                                    >
                                        <Underline size={12} strokeWidth={2.5} />
                                    </ToggleBtn>
                                    <div className="w-px bg-border/10" />
                                    <ToggleBtn
                                        active={textDecoration === 'line-through'}
                                        onClick={() => update({ textDecoration: textDecoration === 'line-through' ? 'none' : 'line-through' })}
                                        title="Strikethrough"
                                    >
                                        <Strikethrough size={12} strokeWidth={2.5} />
                                    </ToggleBtn>
                                </div>
                            </div>

                            {/* Alignment */}
                            <div className="space-y-1">
                                <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Align</span>
                                <div className="flex border border-border/20 bg-muted/5">
                                    {([
                                        { icon: AlignLeft, value: 'left' as const },
                                        { icon: AlignCenter, value: 'center' as const },
                                        { icon: AlignRight, value: 'right' as const },
                                        { icon: AlignJustify, value: 'justify' as const },
                                    ] as const).map((a, i) => (
                                        <React.Fragment key={a.value}>
                                            {i > 0 && <div className="w-px bg-border/10" />}
                                            <ToggleBtn
                                                active={textAlign === a.value}
                                                onClick={() => update({ textAlign: a.value })}
                                                title={`Align ${a.value}`}
                                            >
                                                <a.icon size={12} />
                                            </ToggleBtn>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Text Transform */}
                            <div className="space-y-1">
                                <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Transform</span>
                                <div className="flex border border-border/20 bg-muted/5">
                                    {([
                                        { icon: Baseline, value: 'none', label: 'None' },
                                        { icon: CaseUpper, value: 'uppercase', label: 'AA' },
                                        { icon: CaseLower, value: 'lowercase', label: 'aa' },
                                        { icon: Type, value: 'capitalize', label: 'Aa' },
                                    ]).map((t, i) => (
                                        <React.Fragment key={t.value}>
                                            {i > 0 && <div className="w-px bg-border/10" />}
                                            <ToggleBtn
                                                active={textTransform === t.value}
                                                onClick={() => update({ textTransform: t.value })}
                                                title={t.label}
                                            >
                                                <t.icon size={12} />
                                            </ToggleBtn>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Spacing: Tracking + Leading */}
                            <div className="grid grid-cols-2 gap-2">
                                <ScrubbableInput
                                    label="Tracking"
                                    value={letterSpacing}
                                    unit="px"
                                    onChange={(val) => update({ letterSpacing: `${val}px` })}
                                    min={-10}
                                    max={50}
                                    step={0.5}
                                />
                                <ScrubbableInput
                                    label="Leading"
                                    value={lineHeight}
                                    unit=""
                                    onChange={(val) => update({ lineHeight: `${val}` })}
                                    min={0.5}
                                    max={4}
                                    step={0.1}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── Fill & Appearance ── */}
            <div>
                <SectionHeader
                    label="Fill"
                    icon={<Palette size={10} className="text-muted-foreground/30" />}
                    isOpen={sections.fill}
                    onToggle={() => toggle('fill')}
                />
                {sections.fill && (
                    <div className="px-3 pb-3 space-y-3 animate-in fade-in duration-150">
                        {/* Brand Palette Quick Picker */}
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Brand Palette</span>
                            <div className="grid grid-cols-7 gap-1">
                                {brand.palette.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => update({ color: c.hex, label: c.label })}
                                        className={`aspect-square border border-border/20 transition-all ${selectedNode.data.color === c.hex ? 'ring-1 ring-primary scale-110 z-10' : 'hover:scale-105'}`}
                                        title={c.label}
                                        style={{ backgroundColor: c.hex }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div
                                    className="w-7 h-7 border border-border/30 cursor-pointer hover:border-primary/50 transition-colors shrink-0"
                                    style={{ backgroundColor: selectedNode.data.color || '#3b82f6' }}
                                />
                                <input
                                    type="color"
                                    value={selectedNode.data.color || '#3b82f6'}
                                    onChange={(e) => update({ color: e.target.value })}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                            </div>
                            <Input
                                value={selectedNode.data.color || '#3b82f6'}
                                onChange={(e) => update({ color: e.target.value })}
                                className="h-7 flex-1 font-mono text-[10px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0 focus-visible:border-primary/40 uppercase"
                                placeholder="#000000"
                            />
                        </div>

                        {/* Opacity */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Opacity</span>
                                <span className="text-[9px] font-mono text-muted-foreground/40">{opacity}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={opacity}
                                    onChange={(e) => update({}, { opacity: Number(e.target.value) / 100 })}
                                    className="flex-1 h-1 bg-muted/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                                />
                                <span className="text-[10px] font-mono text-foreground/60 w-8 text-right">{opacity}</span>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* ── Values & Metrics ── */}
            {(selectedNode.data.intensity !== undefined ||
                selectedNode.data.toneValue !== undefined ||
                selectedNode.data.moodLevel !== undefined ||
                selectedNode.data.marketShare !== undefined ||
                selectedNode.data.gridCols !== undefined ||
                selectedNode.data.gap !== undefined) && (
                    <div>
                        <SectionHeader
                            label="Values & Metrics"
                            icon={<Activity size={10} className="text-muted-foreground/30" />}
                            isOpen={sections.values}
                            onToggle={() => toggle('values')}
                        />
                        {sections.values && (
                            <div className="px-3 pb-3 space-y-3 animate-in fade-in duration-150">
                                {/* Intensity Slider */}
                                {selectedNode.data.intensity !== undefined && (
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Intensity</span>
                                            <span className="text-[9px] font-mono text-muted-foreground/40">{selectedNode.data.intensity}%</span>
                                        </div>
                                        <input
                                            type="range" min={0} max={100}
                                            value={Number(selectedNode.data.intensity)}
                                            onChange={(e) => update({ intensity: Number(e.target.value) })}
                                            className="w-full h-1 bg-muted/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-primary"
                                        />
                                    </div>
                                )}

                                {/* Frequency / Tone Slider */}
                                {selectedNode.data.toneValue !== undefined && (
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Frequency (Tone)</span>
                                            <span className="text-[9px] font-mono text-muted-foreground/40">{selectedNode.data.toneValue}%</span>
                                        </div>
                                        <input
                                            type="range" min={0} max={100}
                                            value={Number(selectedNode.data.toneValue)}
                                            onChange={(e) => update({ toneValue: Number(e.target.value) })}
                                            className="w-full h-1 bg-muted/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-orange-500"
                                        />
                                    </div>
                                )}

                                {/* Mood / Pressure Slider */}
                                {selectedNode.data.moodLevel !== undefined && (
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Atmos Pressure</span>
                                            <span className="text-[9px] font-mono text-muted-foreground/40">{selectedNode.data.moodLevel}%</span>
                                        </div>
                                        <input
                                            type="range" min={0} max={100}
                                            value={Number(selectedNode.data.moodLevel)}
                                            onChange={(e) => update({ moodLevel: Number(e.target.value) })}
                                            className="w-full h-1 bg-muted/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-lime-500"
                                        />
                                    </div>
                                )}

                                {/* Market Share Slider */}
                                {selectedNode.data.marketShare !== undefined && (
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Market Saturation</span>
                                            <span className="text-[9px] font-mono text-muted-foreground/40">{selectedNode.data.marketShare}%</span>
                                        </div>
                                        <input
                                            type="range" min={1} max={100}
                                            value={Number(selectedNode.data.marketShare)}
                                            onChange={(e) => update({ marketShare: Number(e.target.value) })}
                                            className="w-full h-1 bg-muted/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-stone-500"
                                        />
                                    </div>
                                )}

                                {/* Grid Configuration */}
                                {selectedNode.data.gridCols !== undefined && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <ScrubbableInput
                                            label="Cols"
                                            value={Number(selectedNode.data.gridCols)}
                                            unit=""
                                            min={1} max={12}
                                            onChange={(val) => update({ gridCols: val })}
                                        />
                                        <ScrubbableInput
                                            label="Gap"
                                            value={Number(selectedNode.data.gap)}
                                            unit="px"
                                            min={0} max={100}
                                            onChange={(val) => update({ gap: val })}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

            {/* ── Image Settings ── */}
            {
                selectedNode.data.type === 'image' && (
                    <div>
                        <SectionHeader
                            label="Image"
                            icon={<ImageIcon size={10} className="text-muted-foreground/30" />}
                            isOpen={sections.image}
                            onToggle={() => toggle('image')}
                        />
                        {sections.image && (
                            <div className="px-3 pb-3 space-y-4 animate-in fade-in duration-150">
                                {/* Source Update */}
                                <div className="space-y-2">
                                    <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Source Asset</span>
                                    <div
                                        className={`relative aspect-video bg-muted/20 border border-border/20 overflow-hidden group/thumb cursor-pointer hover:border-primary/40 transition-all flex items-center justify-center ${isDraggingInInspector ? 'ring-2 ring-primary ring-inset bg-primary/5' : ''}`}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            if (e.dataTransfer.types.includes('Files')) {
                                                setIsDraggingInInspector(true);
                                            }
                                        }}
                                        onDragLeave={() => setIsDraggingInInspector(false)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setIsDraggingInInspector(false);
                                            const file = e.dataTransfer.files?.[0];
                                            if (file && file.type.startsWith('image/')) {
                                                const reader = new FileReader();
                                                reader.onload = (re: any) => {
                                                    const imageUrl = re.target.result;
                                                    const img = new Image();
                                                    img.onload = () => {
                                                        update({ imageUrl, width: img.width, height: img.height });
                                                        toast.success('Inspector asset hot-swapped');
                                                    };
                                                    img.src = imageUrl;
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        onClick={() => {
                                            const input = document.createElement('input');
                                            input.type = 'file';
                                            input.accept = 'image/*';
                                            input.onchange = (e: any) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (re: any) => {
                                                        const imageUrl = re.target.result;
                                                        const img = new Image();
                                                        img.onload = () => {
                                                            update({ imageUrl, width: img.width, height: img.height });
                                                        };
                                                        img.src = imageUrl;
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            };
                                            input.click();
                                        }}
                                    >
                                        {selectedNode.data.imageUrl ? (
                                            <img
                                                src={selectedNode.data.imageUrl as string}
                                                className="w-full h-full object-cover opacity-60 group-hover/thumb:opacity-40 transition-opacity"
                                                style={{
                                                    filter: `contrast(${(selectedNode.data.contrast as number) ?? 100}%) saturate(${(selectedNode.data.saturation as number) ?? 100}%) brightness(${(selectedNode.data.brightness as number) ?? 100}%)`
                                                }}
                                            />
                                        ) : (
                                            <ImageIcon size={20} className="text-muted-foreground/20" />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-background/20 backdrop-blur-sm">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border/40 shadow-xl scale-90 group-hover/thumb:scale-100 transition-transform">
                                                <Upload size={10} className="text-primary" />
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground">Upload</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Filters Grid */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider">Filters</span>
                                        <button
                                            onClick={() => update({
                                                contrast: 100, saturation: 100, brightness: 100,
                                                grayscale: 0, sepia: 0, blur: 0,
                                                hueRotate: 0, invert: 0
                                            })}
                                            className="text-[8px] font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-x-4 gap-y-3">
                                        {[
                                            { label: 'Contrast', key: 'contrast', icon: Contrast, min: 0, max: 200, def: 100, unit: '%' },
                                            { label: 'Saturation', key: 'saturation', icon: Droplets, min: 0, max: 200, def: 100, unit: '%' },
                                            { label: 'Brightness', key: 'brightness', icon: Sun, min: 0, max: 200, def: 100, unit: '%' },
                                            { label: 'Blur', key: 'blur', icon: CloudFog, min: 0, max: 50, def: 0, unit: 'px' },
                                            { label: 'Grayscale', key: 'grayscale', icon: Sparkles, min: 0, max: 100, def: 0, unit: '%' },
                                            { label: 'Hue', key: 'hueRotate', icon: RefreshCcw, min: 0, max: 360, def: 0, unit: '°' },
                                        ].map((f) => (
                                            <div key={f.key} className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        <f.icon size={9} className="text-muted-foreground/40" />
                                                        <span className="text-[8px] font-medium text-muted-foreground/60 uppercase tracking-widest">{f.label}</span>
                                                    </div>
                                                    <span className="text-[9px] font-mono text-muted-foreground/40">{(selectedNode.data[f.key] as number) ?? f.def}{f.unit}</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min={f.min}
                                                    max={f.max}
                                                    value={(selectedNode.data[f.key] as number) ?? f.def}
                                                    onChange={(e) => update({ [f.key]: Number(e.target.value) })}
                                                    className="w-full h-1 bg-muted/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

            {/* ── Node Settings (per-type) ── */}
            {
                SETTINGS_REGISTRY[selectedNode.data.type || ''] && (
                    <div>
                        <SectionHeader
                            label="Node Settings"
                            icon={<Settings2 size={10} className="text-muted-foreground/30" />}
                            isOpen={sections.nodeSettings}
                            onToggle={() => toggle('nodeSettings')}
                        />
                        {sections.nodeSettings && (
                            <div className="pb-3 animate-in fade-in duration-150">
                                <DynamicSettingsRenderer
                                    schema={SETTINGS_REGISTRY[selectedNode.data.type || '']}
                                    values={(selectedNode.data.nodeSettings as Record<string, unknown>) || {}}
                                    onChange={(key, value) => {
                                        const currentSettings = (selectedNode.data.nodeSettings as Record<string, unknown>) || {};
                                        update({ nodeSettings: { ...currentSettings, [key]: value } });
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )
            }

            {/* ── Node Metadata ── */}
            <div>
                <SectionHeader
                    label="Metadata"
                    icon={<Hash size={10} className="text-muted-foreground/30" />}
                    isOpen={sections.advanced}
                    onToggle={() => toggle('advanced')}
                />
                {sections.advanced && (
                    <div className="px-3 pb-3 animate-in fade-in duration-150">
                        <div className="space-y-1.5 text-[9px] font-mono text-muted-foreground/50">
                            <div className="flex justify-between py-0.5">
                                <span className="text-muted-foreground/30">ID</span>
                                <span className="text-foreground/60 select-all">{selectedNode.id}</span>
                            </div>
                            <div className="h-px bg-border/5" />
                            <div className="flex justify-between py-0.5">
                                <span className="text-muted-foreground/30">Type</span>
                                <span className="text-foreground/60">{selectedNode.data.type || selectedNode.type}</span>
                            </div>
                            <div className="h-px bg-border/5" />
                            <div className="flex justify-between py-0.5">
                                <span className="text-muted-foreground/30">Z-Index</span>
                                <span className="text-foreground/60">{selectedNode.zIndex ?? 'auto'}</span>
                            </div>
                            <div className="h-px bg-border/5" />
                            <div className="flex justify-between py-0.5">
                                <span className="text-muted-foreground/30">Position</span>
                                <span className="text-foreground/60">{posX}, {posY}</span>
                            </div>
                            <div className="h-px bg-border/5" />
                            <div className="flex justify-between py-0.5">
                                <span className="text-muted-foreground/30">Size</span>
                                <span className="text-foreground/60">{nodeWidth} x {nodeHeight}</span>
                            </div>
                            {selectedNode.data.groupId && (
                                <>
                                    <div className="h-px bg-border/5" />
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-muted-foreground/30">Group</span>
                                        <span className="text-foreground/60">{selectedNode.data.groupId.slice(0, 8)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
