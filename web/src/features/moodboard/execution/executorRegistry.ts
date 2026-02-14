import { NodeExecutor, PortValues, ExecutionContext } from './types';

const executors = new Map<string, NodeExecutor>();

export function registerExecutor(nodeType: string, executor: NodeExecutor): void {
    executors.set(nodeType, executor);
}

export function getExecutor(nodeType: string): NodeExecutor {
    const executor = executors.get(nodeType);
    if (executor) return executor;

    // Return a passthrough stub for unimplemented executors
    return {
        async execute(inputs: PortValues): Promise<PortValues> {
            return { ...inputs };
        }
    };
}

export function hasExecutor(nodeType: string): boolean {
    return executors.has(nodeType);
}
