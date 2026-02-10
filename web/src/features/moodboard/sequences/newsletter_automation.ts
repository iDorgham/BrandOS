import { WorkflowTemplate } from './types';

export const newsletter_automation: WorkflowTemplate = {
    id: 'newsletter_auto',
    label: 'Newsletter_Auto',
    description: 'Curation -> AI Summary -> Branded Visual -> Distribution.',
    category: 'Automations',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Topic_Trigger', type: 'trigger' } },
        { id: 'w1', type: 'web_ref', position: { x: 350, y: 0 }, data: { label: 'News_Aggregator', type: 'web_ref' } },
        { id: 'e1', type: 'engine', position: { x: 700, y: 0 }, data: { label: 'AI_Summarizer', type: 'engine' } },
        { id: 'm1', type: 'midjourney', position: { x: 1050, y: 150 }, data: { label: 'Header_Art', type: 'midjourney' } },
        { id: 'c1', type: 'content', position: { x: 1050, y: -150 }, data: { label: 'Newsletter_Layout', type: 'content' } },
        { id: 'em1', type: 'emitter', position: { x: 1450, y: 0 }, data: { label: 'Beehiiv_Push', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'w1' },
        { id: 'e2', source: 'w1', target: 'e1' },
        { id: 'e3', source: 'e1', target: 'm1' },
        { id: 'e4', source: 'e1', target: 'c1' },
        { id: 'e5', source: 'm1', target: 'em1' },
        { id: 'e6', source: 'c1', target: 'em1' },
    ],
};
