import { WorkflowTemplate } from './types';

export const brand_dna_audit_flow: WorkflowTemplate = {
    id: 'brand_dna_audit',
    label: 'Global Brand Intelligence',
    description: 'Deep market analysis and site-wide auditing for data-driven brand strategies.',
    category: 'Brand Architecture',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 300 }, data: { label: 'Audit_Start', type: 'trigger' } },
        { id: 'w1', type: 'web_ref', position: { x: 300, y: 150 }, data: { label: 'Current_Site_Audit', type: 'web_ref' } },
        { id: 'comp1', type: 'competitor', position: { x: 300, y: 450 }, data: { label: 'Market_Benchmark', type: 'competitor' } },

        { id: 'e1', type: 'engine', position: { x: 700, y: 300 }, data: { label: 'DNA_Analyzer', type: 'engine' } },
        { id: 'c1', type: 'content', position: { x: 1050, y: 300 }, data: { label: 'Style_Guide_Author', type: 'content' } },

        { id: 'm1', type: 'midjourney', position: { x: 1400, y: 150 }, data: { label: 'Visual_Baseline', type: 'midjourney' } },
        { id: 'e2', type: 'engine', position: { x: 1400, y: 450 }, data: { label: 'Tone_Validator', type: 'engine' } },

        { id: 'r1', type: 'receiver', position: { x: 1800, y: 300 }, data: { label: 'Audit_Report_Pack', type: 'receiver' } },
        { id: 'em1', type: 'emitter', position: { x: 2150, y: 300 }, data: { label: 'Cloud_Archive', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'w1' },
        { id: 'e2', source: 't1', target: 'comp1' },
        { id: 'e3', source: 'w1', target: 'e1' },
        { id: 'e4', source: 'comp1', target: 'e1' },
        { id: 'e5', source: 'e1', target: 'c1' },
        { id: 'e6', source: 'c1', target: 'm1' },
        { id: 'e7', source: 'c1', target: 'e2' },
        { id: 'e8', source: 'm1', target: 'r1' },
        { id: 'e9', source: 'e2', target: 'r1' },
        { id: 'e10', source: 'r1', target: 'em1' },
    ],
};
