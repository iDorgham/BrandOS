import React from 'react';
import {
    ChevronLeft, Undo2, Redo2, Save, Loader2, Navigation, Move, Type, BoxSelect, Hash, ImageIcon, Smile,
    AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyStart as AlignTop, AlignVerticalJustifyCenter as AlignMiddle, AlignVerticalJustifyEnd as AlignBottom,
    LayoutGrid, ChevronDown
} from 'lucide-react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

interface MoodBoardHeaderProps {
    onBack: () => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onSave: () => void;
    hasUnsavedChanges: boolean;
    isSaving: boolean;
    activeTool: 'pointer' | 'hand' | 'text' | 'section';
    setActiveTool: (tool: 'pointer' | 'hand' | 'text' | 'section') => void;
    snapToGrid: boolean;
    setSnapToGrid: (snap: boolean) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddEmoji: (emoji: string) => void;
    onExportJSON: () => void;
    selectedNodesCount?: number;
    onAlignNodes?: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
    onReorganizeNodes?: (config: { type: 'rows' | 'cols', count: number }) => void;
}

export const MoodBoardHeader: React.FC<MoodBoardHeaderProps> = ({
    onBack,
    undo,
    redo,
    canUndo,
    canRedo,
    onSave,
    hasUnsavedChanges,
    isSaving,
    activeTool,
    setActiveTool,
    snapToGrid,
    setSnapToGrid,
    fileInputRef,
    handleImageUpload,
    onAddEmoji,
    onExportJSON,
    selectedNodesCount = 0,
    onAlignNodes,
    onReorganizeNodes,
}) => {
    return (
        <div className="absolute top-0 left-0 right-0 z-30 h-10 bg-card/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 transition-all duration-300 ease-out">
            {/* Left: Navigation Core & Tooling */}
            <div className="flex items-center gap-1">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-8 gap-2 px-2 hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground/60 transition-colors"
                >
                    <ChevronLeft size={14} />
                    <span className="text-[10px] font-black tracking-widest uppercase">BACK</span>
                </Button>

                <div className="w-[1px] h-4 bg-border/40 mx-2" />

                {/* History Controls */}
                <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo} className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-20 hover:bg-muted/20">
                        <Undo2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo} className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-20 hover:bg-muted/20">
                        <Redo2 size={14} />
                    </Button>
                </div>

                <div className="w-[1px] h-4 bg-border/40 mx-2" />

                {/* Save Status */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onSave}
                    disabled={!hasUnsavedChanges || isSaving}
                    className={`h-8 gap-2 px-2 transition-all ${hasUnsavedChanges ? 'text-primary hover:text-primary hover:bg-primary/10' : 'text-muted-foreground/40 hover:text-foreground'}`}
                >
                    {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={14} />}
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-80">
                        {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Unsaved' : 'Saved'}
                    </span>
                </Button>

                <div className="w-[1px] h-4 bg-border/40 mx-2" />

                {/* Organization Tools - Left Aligned */}
                <div className="flex items-center gap-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'pointer' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                        title="Navigation Mode"
                        onClick={() => setActiveTool('pointer')}
                    >
                        <Navigation size={14} className="rotate-[270deg]" fill={activeTool === 'pointer' ? "currentColor" : "none"} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'hand' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                        title="Move Tool"
                        onClick={() => setActiveTool('hand')}
                    >
                        <Move size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'text' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                        title="Text Injection"
                        onClick={() => setActiveTool('text')}
                    >
                        <Type size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'section' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                        title="Area Selection"
                        onClick={() => setActiveTool('section')}
                    >
                        <BoxSelect size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-none transition-all duration-300 ${snapToGrid ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                        title="Grid Alignment"
                        onClick={() => setSnapToGrid(!snapToGrid)}
                    >
                        <Hash size={14} />
                    </Button>

                    <div className="w-[1px] h-4 bg-border/40 mx-1" />

                    {/* Media & Stickers */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none text-muted-foreground/60 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                        title="Import Image"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImageIcon size={14} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/png, image/jpeg, image/gif, image/svg+xml"
                            onChange={handleImageUpload}
                        />
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none text-muted-foreground/60 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                                title="Drop Sticker / Emoji"
                            >
                                <Smile size={14} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-2" sideOffset={8}>
                            <div className="grid grid-cols-6 gap-1">
                                {['👍', '👎', '🔥', '💡', '⚠️', '✅', '❌', '🚀', '🎨', '🖌️', '📝', '📊', '🔗', '📂', '❤️', '⭐', '🎉', '👀', '🧠', '⚡', '💣', '💎', '🚩', '🏁'].map(emoji => (
                                    <button
                                        key={emoji}
                                        className="aspect-square flex items-center justify-center text-lg hover:bg-muted rounded-sm transition-colors"
                                        onClick={() => onAddEmoji(emoji)}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="w-[1px] h-4 bg-border/40 mx-1" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none text-muted-foreground/60 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                        title="Export Workflow JSON"
                        onClick={onExportJSON}
                    >
                        <Save size={14} className="text-primary/60" />
                    </Button>
                </div>

                <div className="w-[1px] h-4 bg-border/40 mx-2" />

                {/* Alignment Dropdown */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={selectedNodesCount <= 1}
                            className={`h-8 gap-1 px-2 transition-all ${selectedNodesCount > 1 ? 'text-primary bg-primary/5' : 'text-muted-foreground/30'}`}
                            title="Alignment Tools"
                        >
                            <AlignLeft size={14} />
                            <ChevronDown size={10} className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-1" sideOffset={8}>
                        <div className="grid grid-cols-3 gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Left" onClick={() => onAlignNodes?.('left')}><AlignLeft size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Center X" onClick={() => onAlignNodes?.('center')}><AlignCenter size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Right" onClick={() => onAlignNodes?.('right')}><AlignRight size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Top" onClick={() => onAlignNodes?.('top')}><AlignTop size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Middle Y" onClick={() => onAlignNodes?.('middle')}><AlignMiddle size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Bottom" onClick={() => onAlignNodes?.('bottom')}><AlignBottom size={14} /></Button>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Reorganize Dropdown */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 px-2 text-muted-foreground/60 hover:text-primary hover:bg-primary/10 transition-all"
                            title="Reorganize / Clean Canvas"
                        >
                            <LayoutGrid size={14} />
                            <ChevronDown size={10} className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" sideOffset={8}>
                        <div className="space-y-3">
                            <div>
                                <div className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1 px-1">Rearrange Columns</div>
                                <div className="grid grid-cols-3 gap-1">
                                    {[1, 2, 3].map(c => (
                                        <Button
                                            key={`col-${c}`}
                                            variant="secondary"
                                            size="sm"
                                            className="h-7 text-[10px] border border-border/10"
                                            onClick={() => onReorganizeNodes?.({ type: 'cols', count: c })}
                                        >
                                            {c} Col
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1 px-1">Rearrange Rows</div>
                                <div className="grid grid-cols-3 gap-1">
                                    {[1, 2, 3].map(r => (
                                        <Button
                                            key={`row-${r}`}
                                            variant="secondary"
                                            size="sm"
                                            className="h-7 text-[10px] border border-border/10"
                                            onClick={() => onReorganizeNodes?.({ type: 'rows', count: r })}
                                        >
                                            {r} Row
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-1 border-t border-border/10 mt-1">
                                <p className="text-[8px] text-muted-foreground/50 leading-tight px-1 italic">
                                    {selectedNodesCount > 0 ? `Rearranging ${selectedNodesCount} selected nodes` : "Rearranging all nodes on canvas"}
                                </p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Right Side: Empty for now (can add more later) */}
            <div className="flex items-center gap-1">
            </div>
        </div>
    );
};
