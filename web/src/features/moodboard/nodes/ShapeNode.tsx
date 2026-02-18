import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { useMoodBoard } from '../MoodBoardContext';

const getShapePath = (type: string, width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const rx = width / 2;
    const ry = height / 2;

    switch (type) {
        case 'circle':
            // Ellipse path
            return `M ${cx} 0 A ${rx} ${ry} 0 1 1 ${cx} ${height} A ${rx} ${ry} 0 1 1 ${cx} 0 Z`;
        case 'triangle':
            return `M ${cx} 0 L ${width} ${height} L 0 ${height} Z`;
        case 'hexagon':
            // Pointy top hexagon approximation fitting box
            return `M ${width * 0.5} 0 L ${width} ${height * 0.25} L ${width} ${height * 0.75} L ${width * 0.5} ${height} L 0 ${height * 0.75} L 0 ${height * 0.25} Z`;
        case 'diamond':
            return `M ${cx} 0 L ${width} ${cy} L ${cx} ${height} L 0 ${cy} Z`;
        case 'square':
        default:
            return `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;
    }
};

interface ShapeNodeProps {
    id: string;
    data: MoodNodeData;
    selected: boolean;
    width?: number;
    height?: number;
}

export const ShapeNode = memo(({ id, data, selected, width, height }: ShapeNodeProps) => {
    const { isShiftPressed } = useMoodBoard();

    // Default dimensions if not yet measured or set (fallback)
    const w = width ?? 200;
    const h = height ?? 200;

    // Determine shape type from data.type or specific shape property, stripping 'Node' suffix if present
    const rawType = data.type || 'square';
    const shapeType = rawType.replace('Node', '').toLowerCase();

    const path = getShapePath(shapeType, w, h);
    const fillColor = data.customColor ? String(data.customColor) : '#27272a';
    const strokeColor = selected ? '#3b82f6' : (data.borderColor ? String(data.borderColor) : '#52525b');

    return (
        <div className="w-full h-full relative group/shape" style={{ minWidth: 50, minHeight: 50 }}>
            <NodeResizer
                isVisible={selected && !data.isLocked}
                minWidth={50}
                minHeight={50}
                keepAspectRatio={isShiftPressed || shapeType === 'circle' || !!data.isRatioLocked}
                lineClassName="!border-primary/40"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-125 transition-transform"
            />

            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${w} ${h}`}
                className={`overflow-visible transition-all duration-300 ${selected ? 'drop-shadow-md' : ''}`}
                style={{ overflow: 'visible' }} // Ensure strokes don't get clipped
            >
                <path
                    d={path}
                    fill={fillColor}
                    fillOpacity={0.8}
                    stroke={strokeColor}
                    strokeWidth={selected ? 3 : 2}
                    className="transition-colors duration-300"
                />
            </svg>

            {/* Center Label */}
            {(data.label && data.label !== `${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} Module`) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs font-mono font-bold text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-sm shadow-sm">
                        {data.label}
                    </span>
                </div>
            )}

            <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-primary/50 opacity-0 group-hover/shape:opacity-100 transition-opacity" />
            <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-primary/50 opacity-0 group-hover/shape:opacity-100 transition-opacity" />
            <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-primary/50 opacity-0 group-hover/shape:opacity-100 transition-opacity" />
            <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-primary/50 opacity-0 group-hover/shape:opacity-100 transition-opacity" />
        </div>
    );
});
