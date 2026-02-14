import { Node, Edge } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { PORT_SPECS } from './portSpecs';
import { getExecutor } from './executorRegistry';
import { ExecutionContext, ExecutionEvent, ExecutionResult, PortValues } from './types';

export class GraphRunner {
    private nodes: Node<MoodNodeData>[];
    private edges: Edge[];
    private abortController: AbortController | null = null;

    constructor(nodes: Node<MoodNodeData>[], edges: Edge[]) {
        this.nodes = nodes;
        this.edges = edges;
    }

    async execute(
        context: Omit<ExecutionContext, 'abortSignal'>,
        onEvent: (event: ExecutionEvent) => void,
        onNodeStatus: (nodeId: string, status: MoodNodeData['executionStatus']) => void
    ): Promise<ExecutionResult> {
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        const fullContext: ExecutionContext = { ...context, abortSignal: signal };

        const startTime = Date.now();
        const log: ExecutionEvent[] = [];
        const nodeOutputs = new Map<string, PortValues>();
        const errors = new Map<string, string>();

        onEvent({ type: 'run-start', timestamp: Date.now() });

        // Filter to executable nodes only
        const executableNodes = this.nodes.filter(n => {
            const spec = PORT_SPECS[n.type || ''];
            return spec?.executable && n.data.isActive !== false;
        });

        // Build adjacency for topological sort
        const order = this.topologicalSort(executableNodes);
        if (!order) {
            const err = 'Graph contains a cycle — cannot execute';
            onEvent({ type: 'run-error', error: err, timestamp: Date.now() });
            return { success: false, nodeOutputs, errors: new Map([['_cycle', err]]), log, duration: Date.now() - startTime };
        }

        // Reset all nodes to pending
        for (const node of executableNodes) {
            onNodeStatus(node.id, 'pending');
        }

        // Execute in topological order
        for (const nodeId of order) {
            if (signal.aborted) break;

            const node = this.nodes.find(n => n.id === nodeId);
            if (!node) continue;

            const nodeType = node.type || '';
            const spec = PORT_SPECS[nodeType];
            if (!spec) continue;

            onNodeStatus(nodeId, 'running');
            onEvent({ type: 'node-start', nodeId, nodeType, timestamp: Date.now() });

            try {
                // Gather inputs from upstream connected outputs
                const inputs = this.gatherInputs(nodeId, nodeOutputs);

                // Check required inputs
                const missingRequired = spec.inputs
                    .filter(p => p.required && inputs[p.id] === undefined)
                    .map(p => p.label);

                if (missingRequired.length > 0) {
                    throw new Error(`Missing required inputs: ${missingRequired.join(', ')}`);
                }

                // Fill optional defaults
                for (const port of spec.inputs) {
                    if (inputs[port.id] === undefined && port.defaultValue !== undefined) {
                        inputs[port.id] = port.defaultValue;
                    }
                }

                // Merge node settings into inputs
                const settings = node.data.nodeSettings as Record<string, unknown> | undefined;
                const mergedContext: ExecutionContext = {
                    ...fullContext,
                    nodeSettings: settings || {},
                };

                // Execute
                const executor = getExecutor(nodeType);
                const outputs = await executor.execute(inputs, mergedContext);

                nodeOutputs.set(nodeId, outputs);
                onNodeStatus(nodeId, 'success');
                onEvent({ type: 'node-complete', nodeId, nodeType, outputs, timestamp: Date.now() });
            } catch (err: any) {
                const message = err?.message || 'Unknown error';
                errors.set(nodeId, message);
                onNodeStatus(nodeId, 'error');
                onEvent({ type: 'node-error', nodeId, nodeType, error: message, timestamp: Date.now() });
                // Continue to next node — don't abort the whole run for one failure
            }
        }

        const success = errors.size === 0 && !signal.aborted;
        onEvent({ type: success ? 'run-complete' : 'run-error', timestamp: Date.now() });

        return {
            success,
            nodeOutputs,
            errors,
            log,
            duration: Date.now() - startTime,
        };
    }

    abort() {
        this.abortController?.abort();
    }

    private gatherInputs(nodeId: string, nodeOutputs: Map<string, PortValues>): PortValues {
        const inputs: PortValues = {};

        // Find all edges that target this node
        const incomingEdges = this.edges.filter(e => e.target === nodeId);

        for (const edge of incomingEdges) {
            const sourceOutputs = nodeOutputs.get(edge.source);
            if (!sourceOutputs || !edge.sourceHandle || !edge.targetHandle) continue;

            const value = sourceOutputs[edge.sourceHandle];
            if (value !== undefined) {
                inputs[edge.targetHandle] = value;
            }
        }

        return inputs;
    }

    private topologicalSort(executableNodes: Node<MoodNodeData>[]): string[] | null {
        const nodeIds = new Set(executableNodes.map(n => n.id));
        const inDegree = new Map<string, number>();
        const adj = new Map<string, string[]>();

        for (const id of nodeIds) {
            inDegree.set(id, 0);
            adj.set(id, []);
        }

        // Build adjacency from edges (only between executable nodes)
        for (const edge of this.edges) {
            if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) {
                adj.get(edge.source)!.push(edge.target);
                inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
            }
        }

        // Kahn's algorithm
        const queue: string[] = [];
        for (const [id, deg] of inDegree) {
            if (deg === 0) queue.push(id);
        }

        const sorted: string[] = [];
        while (queue.length > 0) {
            const current = queue.shift()!;
            sorted.push(current);

            for (const neighbor of adj.get(current) || []) {
                const newDeg = (inDegree.get(neighbor) || 1) - 1;
                inDegree.set(neighbor, newDeg);
                if (newDeg === 0) queue.push(neighbor);
            }
        }

        // If sorted doesn't include all nodes, there's a cycle
        return sorted.length === nodeIds.size ? sorted : null;
    }
}
