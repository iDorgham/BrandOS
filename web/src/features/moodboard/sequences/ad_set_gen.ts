import { WorkflowTemplate } from './types';

export const ad_set_generator: WorkflowTemplate = {
    id: 'ad_set_gen',
    label: 'Rapid Ad Forge',
    description: 'Fast-track creative generation and architectural framing for multi-variant ad testing.',
    category: 'Growth & Ads',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Campaign_Start', type: 'trigger' } },
        { id: 'c1', type: 'content', position: { x: 450, y: 100 }, data: { label: 'Ad_Architect', type: 'content' } },
        { id: 'e1', type: 'engine', position: { x: 800, y: 100 }, data: { label: 'Variant_Gen', type: 'engine' } },
        { id: 'em1', type: 'emitter', position: { x: 1150, y: 100 }, data: { label: 'Ads_Manager', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'c1' },
        { id: 'e2', source: 'c1', target: 'e1' },
        { id: 'e3', source: 'e1', target: 'em1' },
    ],
};
