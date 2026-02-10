import { WorkflowTemplate } from './types';

export const omnichannel_blast: WorkflowTemplate = {
    id: 'omnichannel_blast',
    label: 'Omnichannel_Blast',
    description: 'Post/Story + SEO Blog + Art + Caption -> Parallel Global Distro.',
    category: 'Content Engine',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 400 }, data: { label: 'Launch_Signal', type: 'trigger' } },
        { id: 's1', type: 'switch', position: { x: 350, y: 400 }, data: { label: 'Channel_Split', type: 'switch', mode: 'Broadcaster' } },

        // Social Path
        { id: 'c1', type: 'content', position: { x: 700, y: 200 }, data: { label: 'Social_Strategist', type: 'content' } },
        { id: 'e1', type: 'engine', position: { x: 1050, y: 100 }, data: { label: 'Caption_Forge', type: 'engine' } },
        { id: 'm1', type: 'midjourney', position: { x: 1050, y: 300 }, data: { label: 'Visual_Assets', type: 'midjourney' } },

        // Blog Path
        { id: 'c2', type: 'content', position: { x: 700, y: 600 }, data: { label: 'Blog_Architect', type: 'content' } },
        { id: 'e2', type: 'engine', position: { x: 1050, y: 600 }, data: { label: 'SEO_Optimizer', type: 'engine' } },

        // Convergence
        { id: 'r1', type: 'receiver', position: { x: 1450, y: 400 }, data: { label: 'QA_Receiver', type: 'receiver' } },
        { id: 'em1', type: 'emitter', position: { x: 1800, y: 400 }, data: { label: 'Global_Publisher', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 's1' },
        { id: 'e2', source: 's1', target: 'c1', sourceHandle: 'source-0' },
        { id: 'e3', source: 's1', target: 'c2', sourceHandle: 'source-1' },
        { id: 'e4', source: 'c1', target: 'e1' },
        { id: 'e5', source: 'c1', target: 'm1' },
        { id: 'e6', source: 'c2', target: 'e2' },
        { id: 'e7', source: 'e1', target: 'r1', targetHandle: 'target-0' },
        { id: 'e8', source: 'm1', target: 'r1', targetHandle: 'target-1' },
        { id: 'e9', source: 'e2', target: 'r1', targetHandle: 'target-2' },
        { id: 'e10', source: 'r1', target: 'em1' },
    ],
};
