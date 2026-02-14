import { WorkflowTemplate } from './types';

export const brand_multi_shot: WorkflowTemplate = {
    id: 'brand_multi_shot',
    label: 'Brand Aesthetics Multi-Shot',
    description: 'Rapid generation of multi-variant branded visuals for diverse marketing assets.',
    category: 'Brand Architecture',
    nodes: [
        { id: 't2', type: 'trigger', position: { x: 100, y: 300 }, data: { label: 'Cron', type: 'trigger' } },
        { id: 'p1', type: 'model_profile', position: { x: 100, y: 550 }, data: { label: 'Identity', type: 'model_profile' } },
        { id: 's1', type: 'switch', position: { x: 450, y: 250 }, data: { label: 'Router', type: 'switch', mode: 'Broadcaster' } },
        { id: 'e2', type: 'engine', position: { x: 800, y: 150 }, data: { label: 'Engine_A', type: 'engine' } },
        { id: 'e3', type: 'engine', position: { x: 800, y: 450 }, data: { label: 'Engine_B', type: 'engine' } },
        { id: 's2', type: 'switch', position: { x: 1200, y: 250 }, data: { label: 'Collector', type: 'switch', mode: 'Aggregator' } },
        { id: 'r1', type: 'receiver', position: { x: 1550, y: 300 }, data: { label: 'QC_Hub', type: 'receiver' } },
        { id: 'en2', type: 'encoder', position: { x: 1950, y: 300 }, data: { label: 'Bulk_Export', type: 'encoder' } },
    ],
    edges: [
        { id: 'e-t-s', source: 't2', target: 's1' },
        { id: 'e-p-e2', source: 'p1', target: 'e2' },
        { id: 'e-p-e3', source: 'p1', target: 'e3' },
        { id: 'e-s1-e2', source: 's1', target: 'e2', sourceHandle: 'source-0' },
        { id: 'e-s1-e3', source: 's1', target: 'e3', sourceHandle: 'source-1' },
        { id: 'e-e2-s2', source: 'e2', target: 's2', targetHandle: 'target-0' },
        { id: 'e-e3-s2', source: 'e3', target: 's2', targetHandle: 'target-1' },
        { id: 'e-s2-r1', source: 's2', target: 'r1' },
        { id: 'e-r1-en2', source: 'r1', target: 'en2' },
    ],
};
