import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Lock } from 'lucide-react';
import { PORT_SPECS } from '../execution/portSpecs';
import { PORT_TYPE_COLORS, PORT_TYPE_ICONS, PortDataType } from '../execution/portTypes';

// Helper function
export const hexToRgbForDisplay = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `RGB(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
        : 'RGB(0, 0, 0)';
};

export const CustomHandle = React.memo(({ type, position, id, className, nodeColor }: { type: 'source' | 'target', position: Position, id?: string, className?: string, nodeColor?: string }) => (
    <Handle
        type={type}
        position={position}
        id={id}
        className={`
            !w-3 !h-3 !bg-orange-500 !dark:bg-zinc-950 border border-transparent
            transition-all duration-200 flex items-center justify-center
            ${className}
            hover:scale-150 z-50 shadow-md group/handle rounded-full
        `}
    >
        <div className={`w-1 h-1 rounded-full !bg-zinc-100 !dark:${nodeColor?.replace('bg-', 'bg-') || 'bg-primary'} transition-transform duration-300 group-hover/handle:scale-110`} />
    </Handle>
));

// Legacy handles — kept for backward compat
export const NodeHandles = React.memo(({ nodeColor }: { nodeColor?: string }) => (
    <>
        <CustomHandle type="target" position={Position.Left} id="l" className="top-1/2 -translate-y-1/2 !-left-[7px]" nodeColor={nodeColor} />
        <CustomHandle type="source" position={Position.Right} id="r" className="top-1/2 -translate-y-1/2 !-right-[7px]" nodeColor={nodeColor} />
        <CustomHandle type="target" position={Position.Top} id="t" className="left-1/2 -translate-x-1/2 !-top-[7px]" nodeColor={nodeColor} />
        <CustomHandle type="source" position={Position.Bottom} id="b" className="left-1/2 -translate-x-1/2 !-bottom-[7px]" nodeColor={nodeColor} />
    </>
));

// ── Typed Handle (redesigned) ──
const TypedHandle = React.memo(({
    type,
    position,
    id,
    portType,
    label,
    required,
    offset,
    total,
}: {
    type: 'source' | 'target';
    position: Position;
    id: string;
    portType: PortDataType;
    label: string;
    required: boolean;
    offset: number;
    total: number;
}) => {
    const color = PORT_TYPE_COLORS[portType];
    const icon = PORT_TYPE_ICONS[portType];
    const isVertical = position === Position.Left || position === Position.Right;
    const pct = total <= 1 ? 50 : 20 + (offset / (total - 1)) * 60;
    const isInput = type === 'target';

    const posStyle: React.CSSProperties = isVertical
        ? { top: `${pct}%`, [position === Position.Left ? 'left' : 'right']: -5 }
        : { left: `${pct}%`, [position === Position.Top ? 'top' : 'bottom']: -5 };

    // Label positioning: inputs get label to the right, outputs to the left
    const labelStyle: React.CSSProperties = isVertical
        ? {
            position: 'absolute' as const,
            top: '50%',
            transform: 'translateY(-50%)',
            ...(isInput ? { left: 16 } : { right: 16 }),
            whiteSpace: 'nowrap' as const,
        }
        : {
            position: 'absolute' as const,
            left: '50%',
            transform: 'translateX(-50%)',
            ...(position === Position.Top ? { bottom: 16 } : { top: 16 }),
            whiteSpace: 'nowrap' as const,
        };

    return (
        <div
            style={{
                ...posStyle,
                position: 'absolute',
                zIndex: 50,
                transform: 'translate(-50%, -50%)',
            }}
            data-port-type={portType}
            data-port-id={id}
        >
            {/* Invisible hit area (20x20) */}
            <Handle
                type={type}
                position={position}
                id={id}
                style={{
                    width: 20,
                    height: 20,
                    background: 'transparent',
                    border: 'none',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 51,
                }}
                title={`${label} (${portType})`}
            />
            {/* Visual dot (10px) */}
            <div
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: required ? color : 'transparent',
                    border: required ? `2px solid var(--background, #fff)` : `2px solid ${color}`,
                    boxShadow: `0 0 0 1px ${color}40`,
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    pointerEvents: 'none',
                }}
                className="hover-target"
            />
            {/* Port label */}
            <span
                style={labelStyle}
                className="text-[7px] font-mono uppercase tracking-widest text-muted-foreground/70 select-none pointer-events-none"
            >
                <span style={{ color: color + 'cc', marginRight: isInput ? 2 : 0, marginLeft: isInput ? 0 : 2, fontSize: '6px', fontWeight: 800 }}>
                    {icon}
                </span>
                {isInput ? '' : ' '}{label}
            </span>
        </div>
    );
});

// ── TypedHandles ──
export const TypedHandles = React.memo(({ nodeType }: { nodeType: string }) => {
    const spec = PORT_SPECS[nodeType];
    if (!spec || !spec.executable) return null;

    const { inputs, outputs } = spec;

    return (
        <>
            {inputs.map((port, i) => (
                <TypedHandle
                    key={port.id}
                    type="target"
                    position={Position.Left}
                    id={port.id}
                    portType={port.type}
                    label={port.label}
                    required={port.required ?? false}
                    offset={i}
                    total={inputs.length}
                />
            ))}
            {outputs.map((port, i) => (
                <TypedHandle
                    key={port.id}
                    type="source"
                    position={Position.Right}
                    id={port.id}
                    portType={port.type}
                    label={port.label}
                    required={false}
                    offset={i}
                    total={outputs.length}
                />
            ))}
        </>
    );
});

export const NodeContainer = React.memo(({ children, selected, title, icon: Icon, typeColor, onEdit, isEditing, handles, resizer, data, id, hideHeaderBar }: any) => {
    return (
        <div className={`
            relative group/node w-full h-full
            ${selected ? 'z-50' : 'z-10'}
            transition-all duration-200
        `}>
            {resizer}

            <div className={`
                relative h-full flex flex-col transition-all duration-200
                bg-card/80 backdrop-blur-xl
                border shadow-sm
                ${selected
                    ? 'border-primary shadow-[0_0_0_1px_rgba(var(--primary-rgb),1)] ring-4 ring-primary/10'
                    : 'border-border/40 hover:border-border/60'}
            `}>
                {/* Carbon Style Grid Indicator (Optional/Subtle) */}
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/40 opacity-50" />

                {/* Execution status indicator */}
                {data?.executionStatus && data.executionStatus !== 'idle' && (
                    <div className={`absolute top-1 right-1 w-2 h-2 rounded-full z-50 ${
                        data.executionStatus === 'running' ? 'bg-blue-500 animate-pulse' :
                        data.executionStatus === 'success' ? 'bg-emerald-500' :
                        data.executionStatus === 'error' ? 'bg-red-500' :
                        'bg-yellow-500'
                    }`} title={`Status: ${data.executionStatus}`} />
                )}

                {/* Header Bar */}
                {!hideHeaderBar && (
                    <div className={`
                        h-8 px-2 flex items-center justify-between border-b relative
                        ${selected ? 'bg-primary/20 border-primary/30' : 'bg-transparent border-border/20'}
                    `}>
                        <div className={`absolute top-0 left-0 right-0 h-[2px] ${typeColor}`} />

                        <div className="flex items-center gap-2 overflow-hidden">
                            <Icon size={13} className={`${typeColor?.replace('bg-', 'text-')} dark:${typeColor?.replace('bg-', 'text-')}`} strokeWidth={2} />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 truncate">
                                {title}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {data?.isLocked && <Lock size={10} className="text-zinc-500" />}
                            <span className="text-[8px] font-mono font-bold text-zinc-400 opacity-40">
                                {id?.slice(-4).toUpperCase()}
                            </span>
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="relative flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>

                {/* Handles — always visible */}
                {handles}
            </div>
        </div>
    );
});
