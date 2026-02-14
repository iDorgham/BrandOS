import { useRef, useCallback } from 'react';
import { Node } from '@xyflow/react';
import { PORT_SPECS } from '../execution/portSpecs';
import { PORT_TYPE_COLORS, PortDataType } from '../execution/portTypes';

interface ConnectionDragState {
    isDragging: boolean;
    sourcePortType: PortDataType | null;
    sourceColor: string | null;
}

export function useConnectionDrag() {
    const dragState = useRef<ConnectionDragState>({
        isDragging: false,
        sourcePortType: null,
        sourceColor: null,
    });

    const onConnectStart = useCallback((_: any, params: { nodeId: string | null; handleId: string | null; handleType: 'source' | 'target' | null }) => {
        if (!params.nodeId || !params.handleId) return;

        // We need to figure out what port type this is from PORT_SPECS
        // We don't have direct access to node type from nodeId here, so we scan all specs
        // The handleId is the port id
        const handleId = params.handleId;
        const handleType = params.handleType;

        for (const [, spec] of Object.entries(PORT_SPECS)) {
            const ports = handleType === 'source' ? spec.outputs : spec.inputs;
            const found = ports.find(p => p.id === handleId);
            if (found) {
                dragState.current = {
                    isDragging: true,
                    sourcePortType: found.type,
                    sourceColor: PORT_TYPE_COLORS[found.type],
                };
                return;
            }
        }
    }, []);

    const onConnectEnd = useCallback(() => {
        dragState.current = {
            isDragging: false,
            sourcePortType: null,
            sourceColor: null,
        };
    }, []);

    return {
        dragState,
        onConnectStart,
        onConnectEnd,
    };
}
