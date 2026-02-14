import { WorkflowTemplate } from './types';

// --- Helper for quick positioning ---
const pos = (x: number, y: number) => ({ x, y });

// ============================================================================
// 1. RESEARCH FLOW (Deep Dive)
// ============================================================================
export const research_flow_advanced: WorkflowTemplate = {
    id: 'research_flow_advanced',
    label: 'Competitive Intelligence Protocol',
    category: 'Intelligence Lab',
    description: 'End-to-end market analysis: Competitors, Aesthetics, and Trend Forecasting.',
    nodes: [
        // --- Phase 1: Input & Reference ---
        { id: 'h1', type: 'title', position: pos(0, 0), data: { label: 'Phase 1: Ingestion', content: 'Phase 1: Data Ingestion', fontSize: 48 } },
        { id: 'ref1', type: 'web_ref', position: pos(0, 100), data: { label: 'Market Link 1', linkUrl: 'https://', linkTitle: 'Competitor A' } },
        { id: 'ref2', type: 'web_ref', position: pos(0, 250), data: { label: 'Market Link 2', linkUrl: 'https://', linkTitle: 'Competitor B' } },
        { id: 'ref3', type: 'web_ref', position: pos(0, 400), data: { label: 'Market Link 3', linkUrl: 'https://', linkTitle: 'Trend Report' } },

        // --- Phase 2: Analysis ---
        { id: 'h2', type: 'title', position: pos(400, 0), data: { label: 'Phase 2: Analysis', content: 'Phase 2: Competitive Analysis', fontSize: 48 } },
        { id: 'comp1', type: 'competitor', position: pos(400, 100), data: { label: 'Leader', competitorName: 'Market Leader', marketShare: 45, strengths: ['Distribution', 'Brand'], weaknesses: ['Legacy Tech'] } },
        { id: 'comp2', type: 'competitor', position: pos(400, 500), data: { label: 'Challenger', competitorName: 'Disruptor', marketShare: 15, strengths: ['Speed', 'UX'], weaknesses: ['Trust'] } },

        // --- Phase 3: Synthesis ---
        { id: 'h3', type: 'title', position: pos(800, 0), data: { label: 'Phase 3: Synthesis', content: 'Phase 3: Strategic Synthesis', fontSize: 48 } },
        { id: 'txt1', type: 'paragraph', position: pos(800, 100), data: { label: 'Gap Analysis', content: 'Identifying the white space between the Leader and Challenger to position our brand uniquley.' } },
        { id: 'attr1', type: 'attribute', position: pos(800, 450), data: { label: 'Core Differentiator', content: 'Speed' } },
        { id: 'attr2', type: 'attribute', position: pos(800, 550), data: { label: 'Secondary Trait', content: 'Reliability' } },
    ],
    edges: [
        { id: 'e1', source: 'ref1', target: 'comp1' },
        { id: 'e2', source: 'ref2', target: 'comp1' },
        { id: 'e3', source: 'ref3', target: 'comp2' },
        { id: 'e4', source: 'comp1', target: 'txt1' },
        { id: 'e5', source: 'comp2', target: 'txt1' },
        { id: 'e6', source: 'txt1', target: 'attr1' },
        { id: 'e7', source: 'txt1', target: 'attr2' },
    ]
};

// ============================================================================
// 2. GENERATIVE ENGINE (ComfyUI Visual Wrapper)
// ============================================================================
export const generative_engine_basic: WorkflowTemplate = {
    id: 'generative_engine_basic',
    label: 'Glass Engine (SDXL)',
    category: 'Intelligence Lab',
    description: 'High-precision Stable Diffusion XL pipeline for cinematic output.',
    nodes: [
        { id: 'ckpt', type: 'checkpoint', position: pos(0, 50), data: { label: 'Model Loader', model: 'sd_xl_base_1.0.safetensors' } },
        { id: 'vae', type: 'vae', position: pos(0, 300), data: { label: 'VAE Handler', model: 'sdxl_vae.safetensors' } },

        { id: 'pos', type: 'text', position: pos(400, 0), data: { label: 'Positive Prompt', content: 'cinematic lighting, ultra realistic, 8k, masterpiece', fontSize: 16 } },
        { id: 'neg', type: 'text', position: pos(400, 200), data: { label: 'Negative Prompt', content: 'blur, distortion, ugly, pixelated', fontSize: 16 } },

        { id: 'sampler', type: 'ksampler', position: pos(800, 50), data: { label: 'K_Sampler (Glass)', steps: 30, cfg: 7.0, seed: -1, scheduler: 'euler_ancestral' } },

        { id: 'out', type: 'image', position: pos(1200, 50), data: { label: 'Latent Output', content: 'Output' } },
    ],
    edges: [
        // Conceptual wiring only until real connections are typed
        { id: 'e_m', source: 'ckpt', target: 'sampler' },
        { id: 'e_v', source: 'vae', target: 'sampler' }, // Usually VAE is post-sample decode, but visual flow varies
        { id: 'e_p', source: 'pos', target: 'sampler' },
        { id: 'e_n', source: 'neg', target: 'sampler' },
        { id: 'e_o', source: 'sampler', target: 'out' },
    ]
};

// ============================================================================
// 3. SOCIAL SCHEDULER (7-Day Grid)
// ============================================================================
export const social_scheduler_grid: WorkflowTemplate = {
    id: 'social_scheduler_grid',
    label: 'Social 7-Day Matrix',
    category: 'Growth & Ads',
    description: 'Automated Monday-Sunday content calendar with platform-specific optimization.',
    nodes: [
        // Days Headers
        { id: 'mon', type: 'title', position: pos(0, 0), data: { label: 'Mon', content: 'MONDAY', fontSize: 24 } },
        { id: 'tue', type: 'title', position: pos(360, 0), data: { label: 'Tue', content: 'TUESDAY', fontSize: 24 } },
        { id: 'wed', type: 'title', position: pos(720, 0), data: { label: 'Wed', content: 'WEDNESDAY', fontSize: 24 } },
        { id: 'thu', type: 'title', position: pos(1080, 0), data: { label: 'Thu', content: 'THURSDAY', fontSize: 24 } },
        { id: 'fri', type: 'title', position: pos(1440, 0), data: { label: 'Fri', content: 'FRIDAY', fontSize: 24 } },
        { id: 'sat', type: 'title', position: pos(1800, 0), data: { label: 'Sat', content: 'SATURDAY', fontSize: 24 } },
        { id: 'sun', type: 'title', position: pos(2160, 0), data: { label: 'Sun', content: 'SUNDAY', fontSize: 24 } },

        // Post Slots (Linkedin)
        { id: 'li_mon', type: 'section', position: pos(0, 100), data: { label: 'LI Post', title: 'LinkedIn Concept' } },
        { id: 'li_tue', type: 'section', position: pos(360, 100), data: { label: 'LI Post', title: 'LinkedIn Concept' } },
        { id: 'li_wed', type: 'section', position: pos(720, 100), data: { label: 'LI Post', title: 'LinkedIn Concept' } },
        { id: 'li_thu', type: 'section', position: pos(1080, 100), data: { label: 'LI Post', title: 'LinkedIn Concept' } },
        { id: 'li_fri', type: 'section', position: pos(1440, 100), data: { label: 'LI Post', title: 'LinkedIn Concept' } },

        // Post Slots (Instagram/Visual)
        { id: 'ig_mon', type: 'image', position: pos(0, 500), data: { label: 'Visual 1' } },
        { id: 'ig_tue', type: 'image', position: pos(360, 500), data: { label: 'Visual 2' } },
        { id: 'ig_wed', type: 'image', position: pos(720, 500), data: { label: 'Visual 3' } },
        { id: 'ig_thu', type: 'image', position: pos(1080, 500), data: { label: 'Visual 4' } },
        { id: 'ig_fri', type: 'image', position: pos(1440, 500), data: { label: 'Visual 5' } },
    ],
    edges: []
};

// ============================================================================
// 4. UNIFIED MASTER (The Big Canvas)
// ============================================================================
export const unified_master_canvas: WorkflowTemplate = {
    id: 'unified_master_canvas',
    label: 'unified Master Executive',
    category: 'Systems Architecture',
    description: 'The ultimate BRAND OS command workflow: Research -> Strategy -> Generation -> Distribution.',
    nodes: [
        // --- ZONE 1: STRATEGY (Left) ---
        { id: 's_title', type: 'title', position: pos(0, 0), data: { label: 'STRATEGY CORE', content: 'STRATEGY CORE', fontSize: 64 } },
        { id: 's_doc', type: 'text', position: pos(0, 200), data: { label: 'Doctrine', content: 'Define the core brand belief system here.' } },
        { id: 's_pal', type: 'palette', position: pos(0, 600), data: { label: 'Global Palette' } },

        // --- ZONE 2: GENERATION (Middle) ---
        { id: 'g_title', type: 'title', position: pos(800, 0), data: { label: 'GENERATIVE ENGINE', content: 'GENERATIVE ENGINE', fontSize: 64 } },
        { id: 'g_ckpt', type: 'checkpoint', position: pos(800, 200), data: { label: 'Main Model' } },
        { id: 'g_sampler', type: 'ksampler', position: pos(1200, 200), data: { label: 'Render Core' } },

        // --- ZONE 3: DISTRIBUTION (Right) ---
        { id: 'd_title', type: 'title', position: pos(2000, 0), data: { label: 'DISTRIBUTION GRID', content: 'DISTRIBUTION GRID', fontSize: 64 } },
        { id: 'd_sched', type: 'section', position: pos(2000, 200), data: { label: 'Scheduler', title: 'Campaign Timeline' } },
        { id: 'd_emit', type: 'emitter', position: pos(2000, 600), data: { label: 'Global Publish', channel: 'Multi-Channel' } },
    ],
    edges: [
        { id: 'e_s_g', source: 's_pal', target: 'g_sampler' }, // Strategy feeds Gen
        { id: 'e_g_d', source: 'g_sampler', target: 'd_sched' }, // Gen feeds Distro
    ]
};
