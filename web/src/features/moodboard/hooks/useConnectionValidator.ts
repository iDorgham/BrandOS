import { useCallback } from 'react';
import { Connection, Edge } from '@xyflow/react';
import { PORT_SPECS } from '../execution/portSpecs';
import { arePortsCompatible } from '../execution/portTypes';

export function useConnectionValidator() {
    const isValidConnection = useCallback((connection: Connection | Edge): boolean => {
        const { source, target, sourceHandle, targetHandle } = connection;
        if (!source || !target || !sourceHandle || !targetHandle) return false;

        // Prevent self-connections
        if (source === target) return false;

        // Look up port specs for source and target nodes
        // We need the node type, which we extract from the handle naming convention
        // But we don't have node types directly here — we need to look them up from the nodes array.
        // For now, find port definitions by scanning all specs.
        const sourcePort = findPort(sourceHandle, 'output');
        const targetPort = findPort(targetHandle, 'input');

        if (!sourcePort || !targetPort) {
            // Legacy handles (l, r, t, b) — allow any connection for backward compat
            if (['l', 'r', 't', 'b'].includes(sourceHandle) || ['l', 'r', 't', 'b'].includes(targetHandle)) {
                return true;
            }
            return false;
        }

        return arePortsCompatible(sourcePort, targetPort);
    }, []);

    return { isValidConnection };
}

function findPort(handleId: string, direction: 'input' | 'output') {
    for (const spec of Object.values(PORT_SPECS)) {
        const ports = direction === 'input' ? spec.inputs : spec.outputs;
        const port = ports.find(p => p.id === handleId);
        if (port) return port.type;
    }
    return null;
}
