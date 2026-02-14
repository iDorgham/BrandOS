import { useCallback, useState, useRef, useEffect } from 'react';
import { Node, Edge } from '@xyflow/react';
import { MoodNodeData } from '../types';

interface HistoryState {
    nodes: Node<MoodNodeData>[];
    edges: Edge[];
}

export const useBoardHistory = (
    nodes: Node<MoodNodeData>[],
    setNodes: (nds: Node<MoodNodeData>[]) => void,
    edges: Edge[],
    setEdges: (eds: Edge[]) => void,
    updateNodeData: (id: string, newData: Partial<MoodNodeData>) => void,
    lastSavedStateRef: React.MutableRefObject<string>,
    isApplyingHistoryRef: React.MutableRefObject<boolean>,
    setHasUnsavedChanges: (val: boolean) => void
) => {
    const [history, setHistory] = useState<HistoryState[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const historyIndexRef = useRef(-1);
    const [isApplyingHistory, setIsApplyingHistory] = useState(false);

    useEffect(() => {
        historyIndexRef.current = historyIndex;
    }, [historyIndex]);

    const saveToHistory = useCallback(() => {
        if (isApplyingHistoryRef.current) return;

        const cleanNodes = nodes.map(({ data, ...rest }) => ({
            ...rest,
            data: { ...data, onChange: undefined }
        })) as Node<MoodNodeData>[];

        const currentState = JSON.stringify({ nodes: cleanNodes, edges });
        if (currentState === lastSavedStateRef.current) return;

        setHistory(prev => {
            const newHistory = prev.slice(0, historyIndexRef.current + 1);
            newHistory.push({ nodes: cleanNodes, edges: [...edges] });
            return newHistory.slice(-200);
        });

        setHistoryIndex(prev => {
            const nextIndex = prev + 1;
            return Math.min(nextIndex, 199);
        });
        lastSavedStateRef.current = currentState;
    }, [nodes, edges, lastSavedStateRef, isApplyingHistoryRef]);

    const undo = useCallback(() => {
        if (historyIndex <= 0) return;

        const newIndex = historyIndex - 1;
        const state = history[newIndex];

        isApplyingHistoryRef.current = true;
        setIsApplyingHistory(true);

        const restoredNodes = state.nodes.map(node => ({
            ...node,
            data: { ...node.data, onChange: updateNodeData }
        }));

        lastSavedStateRef.current = JSON.stringify({ nodes: state.nodes, edges: state.edges });
        setNodes(restoredNodes);
        setEdges(state.edges);
        setHistoryIndex(newIndex);
        setHasUnsavedChanges(true);

        setTimeout(() => {
            isApplyingHistoryRef.current = false;
            setIsApplyingHistory(false);
        }, 500);
    }, [history, historyIndex, setNodes, setEdges, updateNodeData, lastSavedStateRef, isApplyingHistoryRef, setHasUnsavedChanges]);

    const redo = useCallback(() => {
        if (historyIndex >= history.length - 1) return;

        const newIndex = historyIndex + 1;
        const state = history[newIndex];

        isApplyingHistoryRef.current = true;
        setIsApplyingHistory(true);

        const restoredNodes = state.nodes.map(node => ({
            ...node,
            data: { ...node.data, onChange: updateNodeData }
        }));

        lastSavedStateRef.current = JSON.stringify({ nodes: state.nodes, edges: state.edges });
        setNodes(restoredNodes);
        setEdges(state.edges);
        setHistoryIndex(newIndex);
        setHasUnsavedChanges(true);

        setTimeout(() => {
            isApplyingHistoryRef.current = false;
            setIsApplyingHistory(false);
        }, 500);
    }, [history, historyIndex, setNodes, setEdges, updateNodeData, lastSavedStateRef, isApplyingHistoryRef, setHasUnsavedChanges]);

    return {
        saveToHistory,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1 && history.length > 0,
        isApplyingHistory,
        setHistory,
        setHistoryIndex,
        historyIndexRef
    };
};
