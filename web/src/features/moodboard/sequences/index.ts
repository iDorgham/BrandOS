import { signature_render } from './signature_render';
import { brand_multi_shot } from './brand_multi_shot';
import { social_auto_pilot } from './social_auto_pilot';
import { blog_factory } from './blog_factory';
import { social_sniper } from './social_sniper';
import { ad_set_generator } from './ad_set_gen';
import { multi_channel_distro } from './multi_channel';
import { blog_mastery } from './blog_mastery';
import { omnichannel_blast } from './omnichannel_blast';
import { ad_campaign_master } from './ad_campaign_master';
import { product_launch_kit } from './product_launch_kit';
import { brand_dna_audit_flow } from './brand_dna_audit_flow';
import { vocal_to_video_pipeline } from './vocal_to_video_pipeline';
import { lead_gen_orchestrator } from './lead_gen_orchestrator';
import { newsletter_automation } from './newsletter_automation';
// Advanced Workflows
import { research_flow_advanced, generative_engine_basic, social_scheduler_grid, unified_master_canvas } from './advanced_workflows';
import { ADVANCED_COMPLEX_WORKFLOWS } from './advanced_complex_workflows';
import { WorkflowTemplate } from './types';
import { generateId } from '@/utils';

export * from './types';

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
    signature_render,
    brand_multi_shot,
    social_auto_pilot,
    blog_factory,
    social_sniper,
    ad_set_generator,
    multi_channel_distro,
    blog_mastery,
    omnichannel_blast,
    ad_campaign_master,
    product_launch_kit,
    brand_dna_audit_flow,
    vocal_to_video_pipeline,
    lead_gen_orchestrator,
    newsletter_automation,
    // Advanced
    research_flow_advanced,
    generative_engine_basic,
    social_scheduler_grid,
    unified_master_canvas,
    // Complex Overhaul Workflows
    ...ADVANCED_COMPLEX_WORKFLOWS
];

export const prepareTemplate = (templateId: string, basePosition: { x: number, y: number }) => {
    const template = WORKFLOW_TEMPLATES.find(t => t.id === templateId);
    if (!template) return null;

    const idMap: Record<string, string> = {};

    // Process nodes with unique IDs and adjusted positions
    const nodes = template.nodes.map(node => {
        const newId = generateId();
        idMap[node.id!] = newId;
        return {
            ...node,
            id: newId,
            position: {
                x: (node.position?.x || 0) + basePosition.x,
                y: (node.position?.y || 0) + basePosition.y
            }
        };
    });

    // Process edges with remapped IDs
    const edges = template.edges.map(edge => ({
        ...edge,
        id: generateId(),
        source: idMap[edge.source!],
        target: idMap[edge.target!]
    }));

    return { nodes, edges };
};
