import { Node, Edge, XYPosition } from '@xyflow/react';
import { WORKFLOW_TEMPLATES } from './templates';
import { generateId } from '@/utils';
import { MoodNodeData } from '../types';

export const prepareTemplate = (templateId: string, center: XYPosition): { nodes: Node<MoodNodeData>[], edges: Edge[] } | null => {
    const template = WORKFLOW_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
        console.error(`Template ${templateId} not found`);
        return null;
    }

    // Calculate center of template to offset relative to viewport center
    const xPositions = template.nodes.map(n => n.position?.x || 0);
    const yPositions = template.nodes.map(n => n.position?.y || 0);
    const minX = Math.min(...xPositions);
    const maxX = Math.max(...xPositions);
    const minY = Math.min(...yPositions);
    const maxY = Math.max(...yPositions);

    const templateCenterX = (minX + maxX) / 2;
    const templateCenterY = (minY + maxY) / 2;

    const offsetX = center.x - templateCenterX;
    const offsetY = center.y - templateCenterY;

    // ID Mapping to ensure unique IDs on every instantiation
    const idMap: Record<string, string> = {};

    const newNodes = template.nodes.map(node => {
        const newId = generateId();
        if (node.id) idMap[node.id] = newId;

        return {
            ...node,
            id: newId,
            position: {
                x: (node.position?.x || 0) + offsetX,
                y: (node.position?.y || 0) + offsetY
            },
            data: {
                ...node.data,
                // Ensure unique labels if needed, or keep as is
            }
        } as Node<MoodNodeData>;
    });

    const newEdges = template.edges.map(edge => {
        return {
            ...edge,
            id: generateId(),
            source: idMap[edge.source || ''] || edge.source,
            target: idMap[edge.target || ''] || edge.target,
        } as Edge;
    });

    return { nodes: newNodes, edges: newEdges };
};
