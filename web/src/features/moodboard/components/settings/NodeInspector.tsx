import React, { useState } from 'react';
import { Node } from '@xyflow/react';
import { MoodNodeData } from '../../types';
import { ScrubbableInput } from './ScrubbableInput';
import { Button, Input } from '@/components/ui';
import {
    Settings, Trash2, Link, Unlink, Lock, Unlock,
    ChevronDown, ChevronRight, Palette, Layout,
    Type as TypeIcon, AlignLeft, AlignCenter, AlignRight,
    Hash, Eye, Zap, Type
} from 'lucide-react';

interface NodeInspectorProps {
    selectedNode: Node<MoodNodeData>;
    updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
    onDeleteNode: (id: string) => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
    selectedNode,
    updateNodeData,
    onDeleteNode
}) => {
    const [sections, setSections] = useState({
        layout: true,
        content: true,
        typography: true,
        style: true,
        advanced: false
    });

    const toggleSection = (section: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const nodeWidth = Math.round((selectedNode as any).measured?.width ?? (selectedNode as any).width ?? parseInt(selectedNode.style?.width as string) ?? 0);
    const nodeHeight = Math.round((selectedNode as any).measured?.height ?? (selectedNode as any).height ?? parseInt(selectedNode.style?.height as string) ?? 0);

    return (
        <div className="space-y-4">
            {/* Node Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-6 bg-primary" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {selectedNode.data.type}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground">
                            {selectedNode.id.toUpperCase()}
                        </span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => onDeleteNode(selectedNode.id)}
                >
                    <Trash2 size={14} />
                </Button>
            </div>

            {/* Layout Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('layout')}
                    className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted/10 transition-colors border-b border-border/10"
                >
                    {sections.layout ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span className="text-[12px] font-medium text-foreground">Layout & Transform</span>
                </button>

                {sections.layout && (
                    <div className="p-4 space-y-4 border-b border-border/10 animate-in fade-in duration-200">
                        <div className="grid grid-cols-2 gap-4">
                            <ScrubbableInput
                                label="Width"
                                value={nodeWidth}
                                unit="PX"
                                onChange={(val) => {
                                    if (selectedNode.data.isRatioLocked) {
                                        const ratio = nodeHeight / nodeWidth;
                                        updateNodeData(selectedNode.id, {}, { width: val, height: Math.round(val * ratio) });
                                    } else {
                                        updateNodeData(selectedNode.id, {}, { width: val });
                                    }
                                }}
                                min={40}
                                max={4000}
                            />
                            <ScrubbableInput
                                label="Height"
                                value={nodeHeight}
                                unit="PX"
                                onChange={(val) => {
                                    if (selectedNode.data.isRatioLocked) {
                                        const ratio = nodeWidth / nodeHeight;
                                        updateNodeData(selectedNode.id, {}, { height: val, width: Math.round(val * ratio) });
                                    } else {
                                        updateNodeData(selectedNode.id, {}, { height: val });
                                    }
                                }}
                                min={40}
                                max={4000}
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                className="flex-1 h-8 text-[11px] gap-2 border border-border/40 hover:bg-muted/20"
                                onClick={() => updateNodeData(selectedNode.id, { isRatioLocked: !selectedNode.data.isRatioLocked })}
                            >
                                {selectedNode.data.isRatioLocked ? <Link size={12} className="text-primary" /> : <Unlink size={12} />}
                                Ratio Lock
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex-1 h-8 text-[11px] gap-2 border border-border/40 hover:bg-muted/20"
                                onClick={() => updateNodeData(selectedNode.id, { isLocked: !selectedNode.data.isLocked })}
                            >
                                {selectedNode.data.isLocked ? <Lock size={12} className="text-primary" /> : <Unlock size={12} />}
                                {selectedNode.data.isLocked ? 'Locked' : 'Unlocked'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="h-px bg-border/20" />

            {/* Content Section */}
            {(['text', 'title', 'paragraph', 'label', 'typography', 'image'].includes(selectedNode.data.type)) && (
                <div className="space-y-2">
                    <button
                        onClick={() => toggleSection('content')}
                        className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted/10 transition-colors border-b border-border/10"
                    >
                        {sections.content ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        <span className="text-[12px] font-medium text-foreground">Content Context</span>
                    </button>

                    {sections.content && (
                        <div className="p-4 space-y-3 border-b border-border/10 animate-in fade-in duration-200">
                            {selectedNode.data.type !== 'image' && (
                                <div className="space-y-1">
                                    <span className="text-[12px] text-muted-foreground">Label</span>
                                    <Input
                                        value={selectedNode.data.content || selectedNode.data.label || ''}
                                        onChange={(e) => updateNodeData(selectedNode.id, selectedNode.data.content ? { content: e.target.value } : { label: e.target.value })}
                                        className="h-9 text-[13px] rounded-none bg-muted/20 border-border/40 focus-visible:ring-0 focus-visible:border-primary border-b-2"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="h-px bg-border/20" />

            {/* Typography Section */}
            {(['text', 'title', 'paragraph', 'label', 'typography'].includes(selectedNode.data.type)) && (
                <div className="space-y-2">
                    <button
                        onClick={() => toggleSection('typography')}
                        className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted/10 transition-colors border-b border-border/10"
                    >
                        {sections.typography ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        <span className="text-[12px] font-medium text-foreground">Typography Engine</span>
                    </button>

                    {sections.typography && (
                        <div className="p-4 space-y-4 border-b border-border/10 animate-in fade-in duration-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-muted-foreground">Family</span>
                                    <select
                                        className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] px-2 outline-none focus:border-primary border-b-2 transition-colors rounded-none"
                                        value={selectedNode.data.fontFamily || 'Inter'}
                                        onChange={(e) => updateNodeData(selectedNode.id, { fontFamily: e.target.value })}
                                    >
                                        {['Inter', 'IBM Plex Mono', 'Space Grotesk', 'Roboto', 'Playfair Display', 'Outfit'].map(f => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
                                </div>
                                <ScrubbableInput
                                    label="Size"
                                    value={selectedNode.data.fontSize || 16}
                                    unit="pt"
                                    onChange={(val) => updateNodeData(selectedNode.id, { fontSize: val })}
                                    min={8}
                                    max={256}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <ScrubbableInput
                                    label="Tracking"
                                    value={parseFloat(selectedNode.data.letterSpacing as string || '0')}
                                    unit="px"
                                    onChange={(val) => updateNodeData(selectedNode.id, { letterSpacing: `${val}px` })}
                                    min={-10}
                                    max={50}
                                    step={0.1}
                                />
                                <ScrubbableInput
                                    label="Leading"
                                    value={parseFloat(selectedNode.data.lineHeight as string || '1.2')}
                                    unit="em"
                                    onChange={(val) => updateNodeData(selectedNode.id, { lineHeight: `${val}` })}
                                    min={0.5}
                                    max={3}
                                    step={0.1}
                                />
                            </div>

                            <div className="space-y-1">
                                <span className="text-[12px] text-muted-foreground">Alignment</span>
                                <div className="flex border border-border/40">
                                    {[
                                        { icon: AlignLeft, value: 'left' },
                                        { icon: AlignCenter, value: 'center' },
                                        { icon: AlignRight, value: 'right' }
                                    ].map((align) => (
                                        <Button
                                            key={align.value}
                                            variant="ghost"
                                            size="sm"
                                            className={`h-9 flex-1 rounded-none border-x border-transparent ${selectedNode.data.textAlign === align.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/20'}`}
                                            onClick={() => updateNodeData(selectedNode.id, { textAlign: align.value as any })}
                                        >
                                            <align.icon size={14} />
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="h-px bg-border/20" />

            {/* Styling Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('style')}
                    className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted/10 transition-colors border-b border-border/10"
                >
                    {sections.style ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span className="text-[12px] font-medium text-foreground">Visual Appearance</span>
                </button>

                {sections.style && (
                    <div className="p-4 space-y-4 border-b border-border/10 animate-in fade-in duration-200">
                        <div className="space-y-2">
                            <span className="text-[12px] text-muted-foreground">Color Palette</span>
                            <div className="flex gap-2 p-3 bg-muted/10 border border-border/40">
                                <Palette size={14} className="text-muted-foreground mt-1.5" />
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-8 h-8 rounded-none border border-border/60 cursor-pointer shadow-sm hover:border-primary transition-colors"
                                            style={{ backgroundColor: selectedNode.data.color || '#3b82f6' }}
                                        />
                                        <Input
                                            value={selectedNode.data.color || '#3b82f6'}
                                            onChange={(e) => updateNodeData(selectedNode.id, { color: e.target.value })}
                                            className="h-8 font-mono text-[11px] rounded-none bg-background border-b-2 border-border/40 focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {selectedNode.data.intensity !== undefined && (
                                <ScrubbableInput
                                    label="Synthesis"
                                    value={selectedNode.data.intensity}
                                    unit="%"
                                    onChange={(val) => updateNodeData(selectedNode.id, { intensity: val })}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            )}
                            <ScrubbableInput
                                label="Opacity"
                                value={Math.round((selectedNode.style?.opacity as any || 1) * 100)}
                                unit="%"
                                onChange={(val) => updateNodeData(selectedNode.id, {}, { opacity: val / 100 })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="h-px bg-border/20" />

            {/* Advanced Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('advanced')}
                    className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted/10 transition-colors border-b border-border/10"
                >
                    {sections.advanced ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span className="text-[12px] font-medium text-foreground">Advanced Node Logic</span>
                </button>

                {sections.advanced && (
                    <div className="p-4 space-y-2 border-b border-border/10 animate-in fade-in duration-200 opacity-80">
                        <div className="p-3 border border-dashed border-border/40 bg-muted/5 rounded-none overflow-hidden">
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/20">
                                <Hash size={12} className="text-primary" />
                                <span className="text-[9px] font-bold tracking-[0.2em] font-mono text-primary">NODE_SIGNATURE::EXT_1.2</span>
                            </div>
                            <div className="grid grid-cols-2 gap-y-2 text-[10px] font-mono text-muted-foreground leading-relaxed">
                                <span className="opacity-50 text-[8px]">ID:</span>
                                <span>{selectedNode.id.toUpperCase()}</span>
                                <span className="opacity-50 text-[8px]">LEVEL:</span>
                                <span>{selectedNode.zIndex || 0}</span>
                                <span className="opacity-50 text-[8px]">CONTEXT:</span>
                                <span className="truncate">MB_NODE_{selectedNode.id.slice(0, 4)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
