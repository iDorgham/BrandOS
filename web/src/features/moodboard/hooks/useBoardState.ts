import { useCallback, useState, useRef } from 'react';
import { useNodesState, useEdgesState, Node, Edge } from '@xyflow/react';
import { MoodNodeData } from '../types';

export const useBoardState = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<MoodNodeData>>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const lastSavedStateRef = useRef<string>('');
    const isApplyingHistoryRef = useRef(false);

    const updateNodeData = useCallback((id: string, newData: Partial<MoodNodeData>, newStyle?: React.CSSProperties) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    const updatedNode = { ...node, data: { ...node.data, ...newData } };
                    if (newStyle) {
                        updatedNode.style = { ...node.style, ...newStyle };
                    }
                    return updatedNode;
                }
                return node;
            })
        );
        setHasUnsavedChanges(true);
    }, [setNodes]);

    return {
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        lastSavedStateRef,
        isApplyingHistoryRef,
        updateNodeData,
    };
};
