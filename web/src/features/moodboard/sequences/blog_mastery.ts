import { WorkflowTemplate } from './types';

export const blog_mastery: WorkflowTemplate = {
    id: 'blog_mastery',
    label: 'Blog_Mastery',
    description: 'Ultra-complex pipeline: Research -> Copy -> Image AI -> Cloud Distribution.',
    category: 'Content Engine',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 100 }, data: { label: 'Manual_Start', type: 'trigger' } },
        { id: 'w1', type: 'web_ref', position: { x: 300, y: 0 }, data: { label: 'Competitor_Research', type: 'web_ref' } },
        { id: 'e1', type: 'engine', position: { x: 650, y: 0 }, data: { label: 'Title_Architect', type: 'engine' } },
        { id: 'c1', type: 'content', position: { x: 1000, y: 0 }, data: { label: 'SEO_Blog_Writer', type: 'content' } },
        { id: 'm1', type: 'midjourney', position: { x: 1350, y: 150 }, data: { label: 'Featured_Image', type: 'midjourney' } },
        { id: 's1', type: 'switch', position: { x: 1700, y: 150 }, data: { label: 'Distro_Switch', type: 'switch', mode: 'Broadcaster' } },
        { id: 'em1', type: 'emitter', position: { x: 2050, y: 0 }, data: { label: 'G_Drive_Backup', type: 'emitter' } },
        { id: 'em2', type: 'emitter', position: { x: 2050, y: 300 }, data: { label: 'Telegram_Publish', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'w1' },
        { id: 'e2', source: 'w1', target: 'e1' },
        { id: 'e3', source: 'e1', target: 'c1' },
        { id: 'e4', source: 'c1', target: 'm1' },
        { id: 'e5', source: 'm1', target: 's1' },
        { id: 'e6', source: 's1', target: 'em1', sourceHandle: 'source-0' },
        { id: 'e7', source: 's1', target: 'em2', sourceHandle: 'source-1' },
    ],
};
