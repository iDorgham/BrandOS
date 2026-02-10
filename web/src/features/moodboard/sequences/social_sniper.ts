import { WorkflowTemplate } from './types';

export const social_sniper: WorkflowTemplate = {
    id: 'social_sniper',
    label: 'Social_Sniper',
    description: 'Multi-platform social post generation and planning.',
    category: 'Content Engine',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Daily_Pulse', type: 'trigger' } },
        { id: 'c1', type: 'content', position: { x: 350, y: 0 }, data: { label: 'Planner', type: 'content' } },
        { id: 'e1', type: 'engine', position: { x: 700, y: -150 }, data: { label: 'Caption_Gen', type: 'engine' } },
        { id: 'e2', type: 'engine', position: { x: 700, y: 150 }, data: { label: 'Image_Gen', type: 'engine' } },
        { id: 'em1', type: 'emitter', position: { x: 1100, y: 0 }, data: { label: 'Telegram_Push', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'c1' },
        { id: 'e2', source: 'c1', target: 'e1' },
        { id: 'e3', source: 'c1', target: 'e2' },
        { id: 'e4', source: 'e1', target: 'em1' },
        { id: 'e5', source: 'e2', target: 'em1' },
    ],
};
