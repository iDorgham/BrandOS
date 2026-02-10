import { WorkflowTemplate } from './types';

export const signature_render: WorkflowTemplate = {
    id: 'signature_render',
    label: 'Signature_Render',
    description: 'Linear high-fidelity branded art pipeline.',
    category: 'Brand Architecture',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Start', type: 'trigger' } },
        { id: 'e1', type: 'engine', position: { x: 450, y: 100 }, data: { label: 'Synthesizer', type: 'engine' } },
        { id: 'en1', type: 'encoder', position: { x: 850, y: 100 }, data: { label: 'Finalizer', type: 'encoder' } },
    ],
    edges: [
        { id: 'edge-1', source: 't1', target: 'e1' },
        { id: 'edge-2', source: 'e1', target: 'en1' },
    ],
};
