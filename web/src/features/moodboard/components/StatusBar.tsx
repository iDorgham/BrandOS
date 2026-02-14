import React from 'react';
import { useViewport } from '@xyflow/react';
import { Circle, GitBranch, Magnet, Save } from 'lucide-react';

interface StatusBarProps {
    nodeCount: number;
    edgeCount: number;
    groupCount: number;
    canvasName: string;
    snapToGrid: boolean;
    hasUnsavedChanges: boolean;
    isSaving: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
    nodeCount,
    edgeCount,
    groupCount,
    canvasName,
    snapToGrid,
    hasUnsavedChanges,
    isSaving,
}) => {
    const viewport = useViewport();
    const zoomPercent = Math.round(viewport.zoom * 100);

    return (
        <div className="absolute bottom-0 left-0 right-0 z-30 h-6 bg-card/90 backdrop-blur-xl border-t border-border/40 flex items-center justify-between px-3 font-mono select-none">
            {/* Left: Counts */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground/50">
                    <Circle size={8} className="fill-current" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{nodeCount} nodes</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground/50">
                    <GitBranch size={8} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{edgeCount} edges</span>
                </div>
                {groupCount > 0 && (
                    <div className="flex items-center gap-1.5 text-muted-foreground/50">
                        <span className="text-[8px] font-bold uppercase tracking-widest">{groupCount} groups</span>
                    </div>
                )}
            </div>

            {/* Center: Canvas Name */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">{canvasName}</span>
            </div>

            {/* Right: Status indicators */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground/50">
                    <span className="text-[8px] font-bold uppercase tracking-widest">{zoomPercent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Magnet size={8} className={snapToGrid ? 'text-primary' : 'text-muted-foreground/30'} />
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${snapToGrid ? 'text-primary/60' : 'text-muted-foreground/30'}`}>
                        Snap
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isSaving ? 'bg-amber-500 animate-pulse' : hasUnsavedChanges ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50">
                        {isSaving ? 'Saving' : hasUnsavedChanges ? 'Modified' : 'Saved'}
                    </span>
                </div>
            </div>
        </div>
    );
};
