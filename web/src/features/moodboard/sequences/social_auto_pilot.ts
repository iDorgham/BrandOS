import { WorkflowTemplate } from './types';

export const social_auto_pilot: WorkflowTemplate = {
    id: 'social_auto_pilot',
    label: 'Automated Social Presence',
    description: 'Multi-channel content scheduling and generation for effortless social growth.',
    category: 'Automations',
    nodes: [
        { id: 't3', type: 'trigger', position: { x: 100, y: 1000 }, data: { label: 'Daily_Pulse', type: 'trigger' } },
        { id: 'e4', type: 'engine', position: { x: 450, y: 1000 }, data: { label: 'Creative_Generator', type: 'engine' } },
        { id: 's3', type: 'switch', position: { x: 800, y: 1000 }, data: { label: 'Format_Splitter', type: 'switch', mode: 'Broadcaster' } },
        { id: 'en3', type: 'encoder', position: { x: 1150, y: 850 }, data: { label: 'Story_Encoder', type: 'encoder' } },
        { id: 'en4', type: 'encoder', position: { x: 1150, y: 1150 }, data: { label: 'Feed_Encoder', type: 'encoder' } },
    ],
    edges: [
        { id: 'e-t3-e4', source: 't3', target: 'e4' },
        { id: 'e-e4-s3', source: 'e4', target: 's3' },
        { id: 'e-s3-en3', source: 's3', target: 'en3', sourceHandle: 'source-0' },
        { id: 'e-s3-en4', source: 's3', target: 'en4', sourceHandle: 'source-1' },
    ],
};
