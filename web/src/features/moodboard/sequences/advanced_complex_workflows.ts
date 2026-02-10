import { WorkflowTemplate } from './types';

export const brand_identity_quantum: WorkflowTemplate = {
    id: 'brand_identity_quantum',
    label: 'Brand Identity Quantum',
    description: 'Deep DNA audit with multi-shot generation and logic gating.',
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
    label: 'Omnichannel Growth Loop',
    description: 'Social sniper + Ad set gen + Newsletter + CMS Sync with feedback.',
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
    label: 'Visual Hierarchy Validator',
    description: 'Section + Title + Palette + Vibe for strict layout consistency.',
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
    label: 'Generative Pipeline Pro',
    description: 'Full ComfyUI-style pipeline with intensity monitoring.',
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
    label: 'Competitive DNA Disruptor',
    description: 'Analyze rivals and re-interpret brand DNA.',
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
    label: 'Sonic Visualizer Sync',
    description: 'Spotify Link -> Mood Gauge -> AI Gen (visualizing audio vibe).',
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
    label: 'Dynamic Ambience Engine',
    description: 'Weather node -> Vibe adjustment -> Visual output shifting.',
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
    label: 'Automated Styleguide Gen',
    description: 'Colors + Fonts + Grid -> Markdown Narrative auto-generation.',
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
    label: 'Lead Gen Nurture Orchestra',
    description: 'Trigger -> Intelligence -> Growth -> Sync.',
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
    label: 'Product Concept Laboratory',
    description: 'Image Ref -> Attributes -> Prompts -> 4x Variants.',
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
    label: 'Creative Ad Strategist',
    description: 'Ad campaign master + Competitive analysis -> Final Ad Ref.',
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
    label: 'Content Velocity Factory',
    description: 'Multi-platform distribution via CMS and Social.',
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
    label: 'Narrative Logic Branch',
    description: 'Different brand stories based on attributes.',
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
    label: 'System Architecture Blueprint',
    description: 'High-level UI/UX system mapping.',
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
    label: 'Market Expansion Terminal',
    description: 'Rivals + Link Ref + CMS Sync + Distro -> New region readiness.',
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
