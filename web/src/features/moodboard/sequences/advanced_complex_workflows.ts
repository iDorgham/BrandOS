import { WorkflowTemplate } from './types';

export const brand_identity_quantum: WorkflowTemplate = {
    id: 'brand_identity_quantum',
    label: 'Brand Identity Quantum Protocol',
    description: 'Deep DNA audit with multi-shot generation and advanced logic gating for brand evolution.',
    category: 'Brand Architecture',
    nodes: [
        { id: 'n1', type: 'attribute', position: { x: 0, y: 0 }, data: { label: 'Core Archetype' } },
        { id: 'n2', type: 'attribute', position: { x: 0, y: 100 }, data: { label: 'Visual Tonality' } },
        { id: 'n3', type: 'engine', position: { x: 250, y: 50 }, data: { label: 'DNA Analyzer' } },
        { id: 'n4', type: 'checkpoint', position: { x: 500, y: 0 }, data: { label: 'Model' } },
        { id: 'n5', type: 'ksampler', position: { x: 750, y: 50 }, data: { label: 'Sampler' } },
        { id: 'n6', type: 'vae', position: { x: 1000, y: 50 }, data: { label: 'Decoder' } },
        { id: 'n7', type: 'image', position: { x: 1250, y: 0 }, data: { label: 'Variant A' } },
        { id: 'n8', type: 'image', position: { x: 1250, y: 150 }, data: { label: 'Variant B' } },
        { id: 'n9', type: 'switch', position: { x: 1500, y: 75 }, data: { label: 'Logic Gate' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n3' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n5' },
        { id: 'e4', source: 'n4', target: 'n5' },
        { id: 'e5', source: 'n5', target: 'n6' },
        { id: 'e6', source: 'n6', target: 'n7' },
        { id: 'e7', source: 'n6', target: 'n8' },
        { id: 'e8', source: 'n7', target: 'n9' },
        { id: 'e9', source: 'n8', target: 'n9' }
    ]
};

export const omnichannel_growth_loop: WorkflowTemplate = {
    id: 'omnichannel_growth_loop',
    label: 'Omnichannel Growth Accelerator',
    description: 'High-velocity growth loop: Social precision + Ad orchestration + Newsletter automation.',
    category: 'Growth & Ads',
    nodes: [
        { id: 'n1', type: 'trigger', position: { x: 0, y: 100 }, data: { label: 'Campaign Start' } },
        { id: 'n2', type: 'engine', position: { x: 250, y: 100 }, data: { label: 'Copy Engine' } },
        { id: 'n3', type: 'switch', position: { x: 500, y: 100 }, data: { label: 'Channel Router' } },
        { id: 'n4', type: 'emitter', position: { x: 750, y: 0 }, data: { label: 'Social Post' } },
        { id: 'n5', type: 'emitter', position: { x: 750, y: 100 }, data: { label: 'Ad Account' } },
        { id: 'n6', type: 'emitter', position: { x: 750, y: 200 }, data: { label: 'Newsletter' } },
        { id: 'n7', type: 'cms_sync', position: { x: 1000, y: 100 }, data: { label: 'Sync State' } },
        { id: 'n8', type: 'receiver', position: { x: 1250, y: 100 }, data: { label: 'Validator' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n3', target: 'n6' },
        { id: 'e6', source: 'n4', target: 'n7' },
        { id: 'e7', source: 'n5', target: 'n7' },
        { id: 'e8', source: 'n6', target: 'n7' },
        { id: 'e9', source: 'n7', target: 'n8' }
    ]
};

export const visual_hierarchy_validator: WorkflowTemplate = {
    id: 'visual_hierarchy_validator',
    label: 'Visual Hierarchy Architect',
    description: 'Structural sectioning + Paletted titles + Tone validation for layout consistency.',
    category: 'Systems Architecture',
    nodes: [
        { id: 'n1', type: 'section', position: { x: 0, y: 0 }, data: { label: 'Layout Area' } },
        { id: 'n2', type: 'title', position: { x: 50, y: 50 }, data: { label: 'Main Header' } },
        { id: 'n3', type: 'palette', position: { x: 50, y: 150 }, data: { label: 'Color Specs' } },
        { id: 'n4', type: 'typography', position: { x: 50, y: 250 }, data: { label: 'Font Matrix' } },
        { id: 'n5', type: 'tone', position: { x: 350, y: 150 }, data: { label: 'Energy Vibe' } },
        { id: 'n6', type: 'receiver', position: { x: 600, y: 150 }, data: { label: 'Compliance' } }
    ],
    edges: [
        { id: 'e1', source: 'n2', target: 'n5' },
        { id: 'e2', source: 'n3', target: 'n5' },
        { id: 'e3', source: 'n4', target: 'n5' },
        { id: 'e4', source: 'n5', target: 'n6' }
    ]
};

export const generative_pipeline_pro: WorkflowTemplate = {
    id: 'generative_pipeline_pro',
    label: 'Glass Generation Pipeline Pro',
    description: 'Full-stack generative infrastructure with LoRA refinement and intensity monitoring.',
    category: 'Intelligence Lab',
    nodes: [
        { id: 'n1', type: 'checkpoint', position: { x: 0, y: 0 }, data: { label: 'Base Model' } },
        { id: 'n2', type: 'checkpoint', position: { x: 0, y: 150 }, data: { label: 'LoRA Refiner' } },
        { id: 'n3', type: 'ksampler', position: { x: 300, y: 75 }, data: { label: 'Sampler' } },
        { id: 'n4', type: 'mood_gauge', position: { x: 300, y: -50 }, data: { label: 'Vibe Intensity' } },
        { id: 'n5', type: 'vae', position: { x: 600, y: 75 }, data: { label: 'Decoder' } },
        { id: 'n6', type: 'encoder', position: { x: 900, y: 75 }, data: { label: 'Upscaler' } },
        { id: 'n7', type: 'image', position: { x: 1200, y: 75 }, data: { label: 'Final Asset' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n3' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n4', target: 'n3' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n5', target: 'n6' },
        { id: 'e6', source: 'n6', target: 'n7' }
    ]
};

export const competitive_dna_disruptor: WorkflowTemplate = {
    id: 'competitive_dna_disruptor',
    label: 'Strategic DNA Disruptor',
    description: 'Competitive market analysis and strategic re-interpretation of core brand DNA.',
    category: 'Brand Architecture',
    nodes: [
        { id: 'n1', type: 'competitor', position: { x: 0, y: 0 }, data: { label: 'Rival A' } },
        { id: 'n2', type: 'competitor', position: { x: 0, y: 150 }, data: { label: 'Rival B' } },
        { id: 'n3', type: 'engine', position: { x: 250, y: 75 }, data: { label: 'Gap Analysis' } },
        { id: 'n4', type: 'attribute', position: { x: 500, y: 0 }, data: { label: 'Our Edge' } },
        { id: 'n5', type: 'negative', position: { x: 500, y: 150 }, data: { label: 'Avoidance' } },
        { id: 'n6', type: 'midjourney', position: { x: 800, y: 75 }, data: { label: 'Visual Pivot' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n3' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n4', target: 'n6' },
        { id: 'e6', source: 'n5', target: 'n6' }
    ]
};

export const sonic_visualizer_sync: WorkflowTemplate = {
    id: 'sonic_visualizer_sync',
    label: 'Sonic-to-Visual Synesthesia',
    description: 'Audio source analysis -> Vibe detection -> Generative visual synthesis.',
    category: 'Intelligence Lab',
    nodes: [
        { id: 'n1', type: 'spotify', position: { x: 0, y: 50 }, data: { label: 'Music Source' } },
        { id: 'n2', type: 'mood_gauge', position: { x: 250, y: 50 }, data: { label: 'Audio Vibes' } },
        { id: 'n3', type: 'texture', position: { x: 500, y: 0 }, data: { label: 'Surface Feel' } },
        { id: 'n4', type: 'tone', position: { x: 500, y: 150 }, data: { label: 'Energy' } },
        { id: 'n5', type: 'midjourney', position: { x: 800, y: 75 }, data: { label: 'Audio AI Gen' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n2', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n4', target: 'n5' }
    ]
};

export const dynamic_ambience_engine: WorkflowTemplate = {
    id: 'dynamic_ambience_engine',
    label: 'Adaptive Ambience Reactor',
    description: 'Environmental data triggering -> Tone adjustment -> Dynamic visual state shifting.',
    category: 'Intelligence Lab',
    nodes: [
        { id: 'n1', type: 'weather', position: { x: 0, y: 50 }, data: { label: 'Local Sky' } },
        { id: 'n2', type: 'tone', position: { x: 250, y: 50 }, data: { label: 'Vibe Shift' } },
        { id: 'n3', type: 'palette', position: { x: 500, y: 50 }, data: { label: 'Adaptive Colors' } },
        { id: 'n4', type: 'ksampler', position: { x: 750, y: 50 }, data: { label: 'Live Sampler' } },
        { id: 'n5', type: 'image', position: { x: 1050, y: 50 }, data: { label: 'Live Ambience' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n4', target: 'n5' }
    ]
};

export const automated_styleguide_gen: WorkflowTemplate = {
    id: 'automated_styleguide_gen',
    label: 'Automated Style System Generator',
    description: 'Color/Type/Grid mapping -> Narrative structure and brand documentation generation.',
    category: 'Systems Architecture',
    nodes: [
        { id: 'n1', type: 'palette', position: { x: 0, y: 0 }, data: { label: 'Brand Palette' } },
        { id: 'n2', type: 'typography', position: { x: 0, y: 150 }, data: { label: 'Typography' } },
        { id: 'n3', type: 'grid', position: { x: 300, y: 75 }, data: { label: 'Layout Grid' } },
        { id: 'n4', type: 'engine', position: { x: 600, y: 75 }, data: { label: 'Documentor' } },
        { id: 'n5', type: 'text', position: { x: 900, y: 75 }, data: { label: 'Narrative PDF' } },
        { id: 'n6', type: 'emitter', position: { x: 1200, y: 75 }, data: { label: 'Dribbble/Behance' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n4' },
        { id: 'e2', source: 'n2', target: 'n4' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n4', target: 'n5' },
        { id: 'e5', source: 'n5', target: 'n6' }
    ]
};

export const lead_gen_nurture_orchestra: WorkflowTemplate = {
    id: 'lead_gen_nurture_orchestra',
    label: 'Lead Nurture Lifecycle Orchestrator',
    description: 'Lead capture -> Profile intelligence -> Multi-path automated engagement sequences.',
    category: 'Growth & Ads',
    nodes: [
        { id: 'n1', type: 'trigger', position: { x: 0, y: 50 }, data: { label: 'New Lead' } },
        { id: 'n2', type: 'engine', position: { x: 250, y: 50 }, data: { label: 'Profile Agent' } },
        { id: 'n3', type: 'switch', position: { x: 500, y: 50 }, data: { label: 'Nurture Path' } },
        { id: 'n4', type: 'emitter', position: { x: 750, y: -50 }, data: { label: 'High Priority' } },
        { id: 'n5', type: 'emitter', position: { x: 750, y: 150 }, data: { label: 'Auto Nurture' } },
        { id: 'n6', type: 'cms_sync', position: { x: 1000, y: 50 }, data: { label: 'CRM Sync' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n4', target: 'n6' },
        { id: 'e6', source: 'n5', target: 'n6' }
    ]
};

export const product_concept_laboratory: WorkflowTemplate = {
    id: 'product_concept_laboratory',
    label: 'Product Concept Synthesizer',
    description: 'Visual inspiration -> Attribute extraction -> Conceptual generation with variant output.',
    category: 'Content Engine',
    nodes: [
        { id: 'n1', type: 'image', position: { x: 0, y: 50 }, data: { label: 'Inspiration' } },
        { id: 'n2', type: 'attribute', position: { x: 250, y: 0 }, data: { label: 'Feature A' } },
        { id: 'n3', type: 'attribute', position: { x: 250, y: 100 }, data: { label: 'Feature B' } },
        { id: 'n4', type: 'midjourney', position: { x: 500, y: 50 }, data: { label: 'Concept Gen' } },
        { id: 'n5', type: 'section', position: { x: 750, y: -100 }, data: { label: 'Output Matrix' } },
        { id: 'n6', type: 'image', position: { x: 800, y: -50 }, data: { label: 'Var 1' } },
        { id: 'n7', type: 'image', position: { x: 800, y: 50 }, data: { label: 'Var 2' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n4' },
        { id: 'e2', source: 'n2', target: 'n4' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n4', target: 'n6' },
        { id: 'e5', source: 'n4', target: 'n7' }
    ]
};

export const creative_ad_strategist: WorkflowTemplate = {
    id: 'creative_ad_strategist',
    label: 'Tactical Ad Strategist',
    description: 'Omnichannel campaign mastery fused with competitive intelligence for high-impact ads.',
    category: 'Growth & Ads',
    nodes: [
        { id: 'n1', type: 'competitor', position: { x: 0, y: 0 }, data: { label: 'Rival Ad' } },
        { id: 'n2', type: 'web_ref', position: { x: 0, y: 150 }, data: { label: 'Market Feed' } },
        { id: 'n3', type: 'engine', position: { x: 300, y: 75 }, data: { label: 'Strategy AI' } },
        { id: 'n4', type: 'attribute', position: { x: 600, y: 0 }, data: { label: 'Hook' } },
        { id: 'n5', type: 'midjourney', position: { x: 600, y: 150 }, data: { label: 'Visual Ref' } },
        { id: 'n6', type: 'encoder', position: { x: 900, y: 75 }, data: { label: 'Asset Bake' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n3' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n4', target: 'n6' },
        { id: 'e6', source: 'n5', target: 'n6' }
    ]
};

export const content_velocity_factory: WorkflowTemplate = {
    id: 'content_velocity_factory',
    label: 'Narrative Velocity Engine',
    description: 'Multi-platform content distribution via synchronized CMS and social broadcasting.',
    category: 'Content Engine',
    nodes: [
        { id: 'n1', type: 'text', position: { x: 0, y: 50 }, data: { label: 'Master Story' } },
        { id: 'n2', type: 'engine', position: { x: 250, y: 50 }, data: { label: 'Mutator' } },
        { id: 'n3', type: 'switch', position: { x: 500, y: 50 }, data: { label: 'Destinations' } },
        { id: 'n4', type: 'cms_sync', position: { x: 750, y: -50 }, data: { label: 'Blog Post' } },
        { id: 'n5', type: 'emitter', position: { x: 750, y: 50 }, data: { label: 'Twitter' } },
        { id: 'n6', type: 'emitter', position: { x: 750, y: 150 }, data: { label: 'Insta Ad' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n3', target: 'n6' }
    ]
};

export const narrative_logic_branch: WorkflowTemplate = {
    id: 'narrative_logic_branch',
    label: 'Narrative Logic Transformer',
    description: 'Dynamic audience-aware story branching based on specific psychographic attributes.',
    category: 'Brand Architecture',
    nodes: [
        { id: 'n1', type: 'attribute', position: { x: 0, y: 50 }, data: { label: 'Audience Segment' } },
        { id: 'n2', type: 'switch', position: { x: 250, y: 50 }, data: { label: 'Logic Split' } },
        { id: 'n3', type: 'text', position: { x: 500, y: -50 }, data: { label: 'Professional Tone' } },
        { id: 'n4', type: 'text', position: { x: 500, y: 150 }, data: { label: 'Playful Tone' } },
        { id: 'n5', type: 'receiver', position: { x: 750, y: 50 }, data: { label: 'Draft Bin' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n2', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n4', target: 'n5' }
    ]
};

export const system_architecture_blueprint: WorkflowTemplate = {
    id: 'system_architecture_blueprint',
    label: 'Master System Blueprint',
    description: 'High-level UX/UI architectural mapping and functional block synchronization.',
    category: 'Systems Architecture',
    nodes: [
        { id: 'n1', type: 'grid', position: { x: 0, y: 0 }, data: { label: 'Layout Grid' } },
        { id: 'n2', type: 'section', position: { x: 250, y: 0 }, data: { label: 'Header Block' } },
        { id: 'n3', type: 'section', position: { x: 250, y: 150 }, data: { label: 'Body Block' } },
        { id: 'n4', type: 'label', position: { x: 500, y: 0 }, data: { label: 'Nav Specs' } },
        { id: 'n5', type: 'link', position: { x: 500, y: 100 }, data: { label: 'CTA Protocol' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
        { id: 'e2', source: 'n1', target: 'n3' },
        { id: 'e3', source: 'n2', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' }
    ]
};

export const market_expansion_terminal: WorkflowTemplate = {
    id: 'market_expansion_terminal',
    label: 'Regional Expansion Terminal',
    description: 'Localized intelligence + CMS sync -> Multi-region market readiness and distribution.',
    category: 'Growth & Ads',
    nodes: [
        { id: 'n1', type: 'competitor', position: { x: 0, y: 50 }, data: { label: 'Local Rival' } },
        { id: 'n2', type: 'web_ref', position: { x: 0, y: 150 }, data: { label: 'Locale Feed' } },
        { id: 'n3', type: 'engine', position: { x: 300, y: 100 }, data: { label: 'Localization AI' } },
        { id: 'n4', type: 'cms_sync', position: { x: 600, y: 50 }, data: { label: 'Local CMS' } },
        { id: 'n5', type: 'emitter', position: { x: 600, y: 150 }, data: { label: 'Local Media' } },
        { id: 'n6', type: 'receiver', position: { x: 900, y: 100 }, data: { label: 'Regional Hub' } }
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n3' },
        { id: 'e2', source: 'n2', target: 'n3' },
        { id: 'e3', source: 'n3', target: 'n4' },
        { id: 'e4', source: 'n3', target: 'n5' },
        { id: 'e5', source: 'n4', target: 'n6' },
        { id: 'e6', source: 'n5', target: 'n6' }
    ]
};

export const ADVANCED_COMPLEX_WORKFLOWS: WorkflowTemplate[] = [
    brand_identity_quantum,
    omnichannel_growth_loop,
    visual_hierarchy_validator,
    generative_pipeline_pro,
    competitive_dna_disruptor,
    sonic_visualizer_sync,
    dynamic_ambience_engine,
    automated_styleguide_gen,
    lead_gen_nurture_orchestra,
    product_concept_laboratory,
    creative_ad_strategist,
    content_velocity_factory,
    narrative_logic_branch,
    system_architecture_blueprint,
    market_expansion_terminal
];
