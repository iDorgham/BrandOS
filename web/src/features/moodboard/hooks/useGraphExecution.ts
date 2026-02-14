import { useState, useCallback, useRef } from 'react';
import { Node, Edge } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { GraphRunner } from '../execution/graphRunner';
import { ExecutionEvent, ExecutionResult } from '../execution/types';
// Import all executors (registers them on first load)
import '../execution/executors/index';

export function useGraphExecution(
    nodes: Node<MoodNodeData>[],
    edges: Edge[],
    updateNodeData: (id: string, data: Partial<MoodNodeData>) => void,
    brandId: string,
    workspaceId: string
) {
    const [isRunning, setIsRunning] = useState(false);
    const [executionLog, setExecutionLog] = useState<ExecutionEvent[]>([]);
    const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
    const runnerRef = useRef<GraphRunner | null>(null);

    const execute = useCallback(async () => {
        if (isRunning) return;

        setIsRunning(true);
        setExecutionLog([]);

        const runner = new GraphRunner(nodes, edges);
        runnerRef.current = runner;

        const result = await runner.execute(
            { brandId, workspaceId, nodeSettings: {} },
            (event) => {
                setExecutionLog(prev => [...prev, event]);
            },
            (nodeId, status) => {
                updateNodeData(nodeId, { executionStatus: status });
            }
        );

        setLastResult(result);
        setIsRunning(false);
        runnerRef.current = null;

        return result;
    }, [nodes, edges, updateNodeData, brandId, workspaceId, isRunning]);

    const abort = useCallback(() => {
        runnerRef.current?.abort();
        setIsRunning(false);

        // Reset all nodes to idle
        for (const node of nodes) {
            updateNodeData(node.id, { executionStatus: 'idle' });
        }
    }, [nodes, updateNodeData]);

    const resetStatuses = useCallback(() => {
        for (const node of nodes) {
            if (node.data.executionStatus && node.data.executionStatus !== 'idle') {
                updateNodeData(node.id, { executionStatus: 'idle' });
            }
        }
    }, [nodes, updateNodeData]);

    return {
        isRunning,
        execute,
        abort,
        executionLog,
        lastResult,
        resetStatuses,
    };
}
