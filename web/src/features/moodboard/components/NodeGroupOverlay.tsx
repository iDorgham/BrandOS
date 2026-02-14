import React from 'react';
import { useReactFlow } from '@xyflow/react';
import { ChevronDown, ChevronRight, Layers, Edit3, Ungroup, Trash2 } from 'lucide-react';
import { NodeGroup } from '../types';

interface NodeGroupOverlayProps {
    groups: NodeGroup[];
    onToggleCollapse: (groupId: string) => void;
    onUngroupNodes: (groupId: string) => void;
    onUpdateGroup: (groupId: string, updates: Partial<NodeGroup>) => void;
    onDeleteGroup: (groupId: string) => void;
}

const GroupOverlayItem: React.FC<{
    group: NodeGroup;
    onToggleCollapse: (groupId: string) => void;
    onUngroupNodes: (groupId: string) => void;
    onUpdateGroup: (groupId: string, updates: Partial<NodeGroup>) => void;
    onDeleteGroup: (groupId: string) => void;
}> = ({ group, onToggleCollapse, onUngroupNodes, onUpdateGroup, onDeleteGroup }) => {
    const { getViewport } = useReactFlow();
    const viewport = getViewport();

    if (!group.position || !group.size) return null;

    // Transform group coordinates to screen coordinates
    const screenX = group.position.x * viewport.zoom + viewport.x;
    const screenY = group.position.y * viewport.zoom + viewport.y;
    const screenWidth = group.size.width * viewport.zoom;
    const screenHeight = group.size.height * viewport.zoom;

    const colorMap: Record<string, string> = {
        'bg-blue-500': 'border-blue-500/40 text-blue-500',
        'bg-emerald-500': 'border-emerald-500/40 text-emerald-500',
        'bg-amber-500': 'border-amber-500/40 text-amber-500',
        'bg-purple-500': 'border-purple-500/40 text-purple-500',
        'bg-rose-500': 'border-rose-500/40 text-rose-500',
        'bg-cyan-500': 'border-cyan-500/40 text-cyan-500',
        'bg-orange-500': 'border-orange-500/40 text-orange-500',
    };

    const colorClasses = colorMap[group.color] || 'border-primary/40 text-primary';
    const borderColor = colorClasses.split(' ')[0];
    const textColor = colorClasses.split(' ')[1];

    const bgColorMap: Record<string, string> = {
        'bg-blue-500': 'bg-blue-500/5',
        'bg-emerald-500': 'bg-emerald-500/5',
        'bg-amber-500': 'bg-amber-500/5',
        'bg-purple-500': 'bg-purple-500/5',
        'bg-rose-500': 'bg-rose-500/5',
        'bg-cyan-500': 'bg-cyan-500/5',
        'bg-orange-500': 'bg-orange-500/5',
    };

    const bgColor = bgColorMap[group.color] || 'bg-primary/5';

    if (group.isCollapsed) {
        // Collapsed view: compact card
        return (
            <div
                className={`absolute pointer-events-auto z-[5] ${bgColor} border-2 border-dashed ${borderColor} transition-all duration-300`}
                style={{
                    left: screenX,
                    top: screenY,
                    width: Math.max(200 * viewport.zoom, 160),
                    height: Math.max(80 * viewport.zoom, 60),
                }}
            >
                <div className="flex items-center justify-between p-2 h-full">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${group.color}`} />
                        <div>
                            <div className={`text-[10px] font-mono font-bold uppercase tracking-widest ${textColor}`}>
                                {group.name}
                            </div>
                            <div className="text-[8px] font-mono text-muted-foreground/50">
                                {group.nodeIds.length} nodes
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => onToggleCollapse(group.id)}
                        className={`p-1 hover:bg-foreground/10 transition-colors ${textColor}`}
                        title="Expand group"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        );
    }

    // Expanded view: bounding box overlay
    return (
        <div
            className={`absolute pointer-events-none z-[5] border-2 border-dashed ${borderColor} transition-all duration-300 ${bgColor}`}
            style={{
                left: screenX,
                top: screenY,
                width: screenWidth,
                height: screenHeight,
            }}
        >
            {/* Header bar */}
            <div className="pointer-events-auto flex items-center justify-between px-2 h-7 border-b border-inherit bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${group.color}`} />
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${textColor}`}>
                        {group.name}
                    </span>
                    <span className="text-[7px] font-mono text-muted-foreground/40 ml-1">
                        ({group.nodeIds.length})
                    </span>
                </div>
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => {
                            const newName = prompt('Rename group:', group.name);
                            if (newName) onUpdateGroup(group.id, { name: newName });
                        }}
                        className="p-0.5 text-muted-foreground/40 hover:text-foreground transition-colors"
                        title="Rename"
                    >
                        <Edit3 size={10} />
                    </button>
                    <button
                        onClick={() => onToggleCollapse(group.id)}
                        className={`p-0.5 hover:bg-foreground/10 transition-colors ${textColor}`}
                        title="Collapse"
                    >
                        <ChevronDown size={12} />
                    </button>
                    <button
                        onClick={() => onUngroupNodes(group.id)}
                        className="p-0.5 text-muted-foreground/40 hover:text-foreground transition-colors"
                        title="Ungroup"
                    >
                        <Ungroup size={10} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const NodeGroupOverlay: React.FC<NodeGroupOverlayProps> = ({
    groups,
    onToggleCollapse,
    onUngroupNodes,
    onUpdateGroup,
    onDeleteGroup,
}) => {
    if (groups.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-[5]">
            {groups.map(group => (
                <GroupOverlayItem
                    key={group.id}
                    group={group}
                    onToggleCollapse={onToggleCollapse}
                    onUngroupNodes={onUngroupNodes}
                    onUpdateGroup={onUpdateGroup}
                    onDeleteGroup={onDeleteGroup}
                />
            ))}
        </div>
    );
};
