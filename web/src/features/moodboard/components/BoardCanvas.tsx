import React, { useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    ConnectionMode,
    SelectionMode,
    Node,
    Edge,
    Connection
} from '@xyflow/react';
import { MoodNodeData } from '../types';
import { TypedEdge } from './TypedEdge';

const edgeTypes = { typed: TypedEdge };

interface BoardCanvasProps {
    nodes: Node<MoodNodeData>[];
    edges: Edge[];
    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    onConnect: (params: any) => void;
    onNodesDelete: (nodes: Node[]) => void;
    onEdgesDelete: (edges: Edge[]) => void;
    onNodeContextMenu: (event: React.MouseEvent, node: Node) => void;
    onPaneClick: (e: React.MouseEvent) => void;
    onPaneMouseDown: (e: React.MouseEvent) => void;
    onPaneMouseMove: (e: React.MouseEvent) => void;
    onPaneMouseUp: () => void;
    onPaneContextMenu: (event: any) => void;
    onDragOver: (event: React.DragEvent) => void;
    onDrop: (event: React.DragEvent) => void;
    nodeTypes: any;
    activeTool: string;
    snapToGrid: boolean;
    resolvedTheme: string;
    drawingState: { active: boolean; start: { x: number; y: number }; current: { x: number; y: number } };
    isValidConnection?: (connection: Connection | Edge) => boolean;
    onConnectStart?: (event: any, params: any) => void;
    onConnectEnd?: () => void;
    connectionLineColor?: string;
    onNodeDragStop?: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
    onNodeDrag?: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
    onNodeDragStart?: (event: React.MouseEvent, node: Node) => void;
}

export const BoardCanvas: React.FC<BoardCanvasProps> = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete,
    onEdgesDelete,
    onNodeContextMenu,
    onPaneClick,
    onPaneMouseDown,
    onPaneMouseMove,
    onPaneMouseUp,
    onPaneContextMenu,
    onDragOver,
    onDrop,
    nodeTypes,
    activeTool,
    snapToGrid,
    resolvedTheme,
    drawingState,
    isValidConnection,
    onConnectStart,
    onConnectEnd,
    connectionLineColor,
    onNodeDragStop,
    onNodeDrag,
    onNodeDragStart
}) => {
    const connectionLineStyle = useMemo(() => ({
        stroke: connectionLineColor || 'hsl(var(--primary))',
        strokeWidth: 2.5,
    }), [connectionLineColor]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onNodeContextMenu={onNodeContextMenu}
            onPaneClick={onPaneClick}
            onMouseDown={onPaneMouseDown}
            onMouseMove={onPaneMouseMove}
            onMouseUp={onPaneMouseUp}
            onPaneContextMenu={onPaneContextMenu}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onEdgeDoubleClick={(_, edge) => onEdgesDelete([edge])}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode={ConnectionMode.Strict}
            isValidConnection={isValidConnection}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onNodeDragStop={onNodeDragStop}
            onNodeDrag={onNodeDrag}
            onNodeDragStart={onNodeDragStart}
            connectionLineStyle={connectionLineStyle}
            selectionOnDrag={activeTool === 'pointer'}
            panOnDrag={activeTool === 'hand' ? [0, 1, 2] : false}
            selectionMode={SelectionMode.Full}
            defaultViewport={{ x: 0, y: 0, zoom: 0.92 }}
            snapToGrid={snapToGrid}
            snapGrid={[16, 16]}
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{
                type: 'typed',
                animated: true,
                style: { stroke: 'hsl(var(--primary))', strokeWidth: 2.5, opacity: 1 },
                markerEnd: { type: 'arrowclosed', color: 'hsl(var(--primary))' },
            }}
        >
            <Background
                color={resolvedTheme === 'dark' ? '#525252' : '#8d8d8d'}
                gap={20}
                size={1}
            />
            <Controls className="!bg-card/90 !backdrop-blur-xl !border-border !shadow-2xl opacity-40 hover:opacity-100 transition-opacity hidden sm:flex" />

            {/* Drawing Preview Overlay */}
            {drawingState.active && (
                <Panel position="top-left" style={{ pointerEvents: 'none', width: '100%', height: '100%', zIndex: 1000, margin: 0 }}>
                    <div
                        style={{
                            position: 'absolute',
                            left: Math.min(drawingState.start.x, drawingState.current.x),
                            top: Math.min(drawingState.start.y, drawingState.current.y),
                            width: Math.abs(drawingState.current.x - drawingState.start.x),
                            height: Math.abs(drawingState.current.y - drawingState.start.y),
                            border: '1px solid var(--cds-link-01)',
                            backgroundColor: 'rgba(15, 98, 254, 0.1)',
                            pointerEvents: 'none',
                            boxShadow: '0 0 20px rgba(15, 98, 254, 0.2)',
                            backdropFilter: 'blur(1px)',
                        }}
                    />
                </Panel>
            )}
        </ReactFlow>
    );
};
