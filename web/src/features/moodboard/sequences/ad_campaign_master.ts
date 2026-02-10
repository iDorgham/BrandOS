import { WorkflowTemplate } from './types';

export const ad_campaign_master: WorkflowTemplate = {
    id: 'ad_campaign_master',
    label: 'Ad_Campaign_Master',
    description: 'Advanced Research -> Multi-Ad Sets -> Global Platform Emitters.',
    category: 'Growth & Ads',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 300 }, data: { label: 'Campaign_Trigger', type: 'trigger' } },
        { id: 'w1', type: 'web_ref', position: { x: 300, y: 0 }, data: { label: 'Adv_Market_Research', type: 'web_ref' } },
        { id: 'comp1', type: 'competitor', position: { x: 300, y: 400 }, data: { label: 'Comp_Matrix', type: 'competitor' } },

        { id: 's1', type: 'switch', position: { x: 700, y: 300 }, data: { label: 'Research_Merge', type: 'switch', mode: 'Aggregator' } },
        { id: 'c1', type: 'content', position: { x: 1050, y: 300 }, data: { label: 'Creative_Director', type: 'content' } },

        { id: 's2', type: 'switch', position: { x: 1400, y: 300 }, data: { label: 'Platform_Split', type: 'switch', mode: 'Broadcaster' } },

        { id: 'em1', type: 'emitter', position: { x: 1800, y: 0 }, data: { label: 'Meta_Ads', type: 'emitter' } },
        { id: 'em2', type: 'emitter', position: { x: 1800, y: 200 }, data: { label: 'Google_Ads', type: 'emitter' } },
        { id: 'em3', type: 'emitter', position: { x: 1800, y: 400 }, data: { label: 'LinkedIn_Ads', type: 'emitter' } },
        { id: 'em4', type: 'emitter', position: { x: 1800, y: 600 }, data: { label: 'X_Ads', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'w1' },
        { id: 'e2', source: 't1', target: 'comp1' },
        { id: 'e3', source: 'w1', target: 's1', targetHandle: 'target-0' },
        { id: 'e4', source: 'comp1', target: 's1', targetHandle: 'target-1' },
        { id: 'e5', source: 's1', target: 'c1' },
        { id: 'e6', source: 'c1', target: 's2' },
        { id: 'e7', source: 's2', target: 'em1', sourceHandle: 'source-0' },
        { id: 'e8', source: 's2', target: 'em2', sourceHandle: 'source-1' },
        { id: 'e9', source: 's2', target: 'em3', sourceHandle: 'source-2' },
        { id: 'e10', source: 's2', target: 'em4', sourceHandle: 'source-3' },
    ],
};
