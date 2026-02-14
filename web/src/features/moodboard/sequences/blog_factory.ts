import { WorkflowTemplate } from './types';

export const blog_factory: WorkflowTemplate = {
    id: 'blog_factory',
    label: 'Global Editorial Engine',
    description: 'Scalable content production pipeline for long-form blogs and strategic archives.',
    category: 'Content Engine',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Manual_Start', type: 'trigger' } },
        { id: 'e1', type: 'engine', position: { x: 350, y: 0 }, data: { label: 'Researcher', type: 'engine' } },
        { id: 'c1', type: 'content', position: { x: 700, y: 0 }, data: { label: 'Writer', type: 'content' } },
        { id: 'em1', type: 'emitter', position: { x: 1050, y: 0 }, data: { label: 'G_Drive_Save', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'e1' },
        { id: 'e2', source: 'e1', target: 'c1' },
        { id: 'e3', source: 'c1', target: 'em1' },
    ],
};
