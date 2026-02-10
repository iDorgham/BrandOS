import { WorkflowTemplate } from './types';

export const product_launch_kit: WorkflowTemplate = {
    id: 'product_launch',
    label: 'Product_Launch_Kit',
    description: 'Unified campaign trigger -> Email -> Social -> PR -> Art.',
    category: 'Growth & Ads',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 100, y: 500 }, data: { label: 'Launch_T_Minus_0', type: 'trigger' } },
        { id: 's1', type: 'switch', position: { x: 450, y: 500 }, data: { label: 'Asset_Blast', type: 'switch', mode: 'Broadcaster' } },

        { id: 'c1', type: 'content', position: { x: 850, y: 100 }, data: { label: 'Email_Sequence', type: 'content' } },
        { id: 'c2', type: 'content', position: { x: 850, y: 350 }, data: { label: 'Social_Blitz', type: 'content' } },
        { id: 'c3', type: 'content', position: { x: 850, y: 600 }, data: { label: 'Press_Release', type: 'content' } },
        { id: 'm1', type: 'midjourney', position: { x: 850, y: 850 }, data: { label: 'Hero_Visuals', type: 'midjourney' } },

        { id: 'r1', type: 'receiver', position: { x: 1300, y: 500 }, data: { label: 'Kit_Aggregator', type: 'receiver' } },
        { id: 'em1', type: 'emitter', position: { x: 1700, y: 500 }, data: { label: 'Multi_Channel_Push', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 's1' },
        { id: 'e2', source: 's1', target: 'c1', sourceHandle: 'source-0' },
        { id: 'e3', source: 's1', target: 'c2', sourceHandle: 'source-1' },
        { id: 'e4', source: 's1', target: 'c3', sourceHandle: 'source-2' },
        { id: 'e5', source: 's1', target: 'm1', sourceHandle: 'source-3' },
        { id: 'e6', source: 'c1', target: 'r1', targetHandle: 'target-0' },
        { id: 'e7', source: 'c2', target: 'r1', targetHandle: 'target-1' },
        { id: 'e8', source: 'c3', target: 'r1', targetHandle: 'target-2' },
        { id: 'e9', source: 'm1', target: 'r1', targetHandle: 'target-3' },
        { id: 'e10', source: 'r1', target: 'em1' },
    ],
};
