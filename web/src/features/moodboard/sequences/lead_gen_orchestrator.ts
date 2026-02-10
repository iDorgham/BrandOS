import { WorkflowTemplate } from './types';

export const lead_gen_orchestrator: WorkflowTemplate = {
    id: 'lead_gen',
    label: 'Lead_Gen_Orch',
    description: 'Lead Magnet -> Landing Page -> 5-Day Email Seq -> CRM Sync.',
    category: 'Automations',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Offer_Ideation', type: 'trigger' } },
        { id: 'c1', type: 'content', position: { x: 350, y: -150 }, data: { label: 'Lead_Magnet_Gen', type: 'content' } },
        { id: 'c2', type: 'content', position: { x: 350, y: 150 }, data: { label: 'Landing_Copy', type: 'content' } },

        { id: 'r1', type: 'receiver', position: { x: 750, y: 0 }, data: { label: 'Funnel_Validator', type: 'receiver' } },
        { id: 'c3', type: 'content', position: { x: 1100, y: 0 }, data: { label: 'Email_Nurture_Seq', type: 'content' } },

        { id: 'em1', type: 'emitter', position: { x: 1450, y: -100 }, data: { label: 'ESP_Push', type: 'emitter' } },
        { id: 'em2', type: 'emitter', position: { x: 1450, y: 100 }, data: { label: 'CRM_Zapier', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'c1' },
        { id: 'e2', source: 't1', target: 'c2' },
        { id: 'e3', source: 'c1', target: 'r1' },
        { id: 'e4', source: 'c2', target: 'r1' },
        { id: 'e5', source: 'r1', target: 'c3' },
        { id: 'e6', source: 'c3', target: 'em1' },
        { id: 'e7', source: 'c3', target: 'em2' },
    ],
};
