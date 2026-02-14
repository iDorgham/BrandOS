import { PortDataType } from './portTypes';

export type PortValues = Record<string, unknown>;

export type ExecutionStatus = 'idle' | 'pending' | 'running' | 'success' | 'error';

export interface ExecutionContext {
    brandId: string;
    workspaceId: string;
    abortSignal: AbortSignal;
    nodeSettings: Record<string, unknown>;
}

export interface NodeExecutor {
    execute(
        inputs: PortValues,
        context: ExecutionContext
    ): Promise<PortValues>;
}

export interface ExecutionEvent {
    type: 'node-start' | 'node-complete' | 'node-error' | 'run-start' | 'run-complete' | 'run-error';
    nodeId?: string;
    nodeType?: string;
    outputs?: PortValues;
    error?: string;
    timestamp: number;
}

export interface ExecutionResult {
    success: boolean;
    nodeOutputs: Map<string, PortValues>;
    errors: Map<string, string>;
    log: ExecutionEvent[];
    duration: number;
}
