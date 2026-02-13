import {
    Image,
    StickyNote,
    Sparkles,
    Shapes,
    Link2,
    Zap,
    Cpu,
    Split,
    Terminal,
    User,
    Clock,
    Palette,
    Layers,
    X,
    CloudRain,
    Music,
    Globe,
    HardDrive,
    Heading1,
    AlignLeft,
    Baseline,
    Grid3X3,
    SlidersHorizontal,
    Swords,
    Gauge,
    Radio,
    Layout,
    Activity,
    BrainCircuit,
    FileCheck2,
    Workflow,
    LayoutGrid,
    Type,
    Box,
    GitBranch
} from 'lucide-react';

export type NodeCategory = 'CORE' | 'AI_GEN' | 'SIGNAL' | 'SYSTEM' | 'REFINEMENT' | 'EXTRAS';

export interface MoodNodeDefinition {
    id: string;
    label: string;
    description: string;
    icon: any;
    category: NodeCategory;
    defaultColor: string;
    isCore: boolean;
    isBeta?: boolean;
}

export const NODE_REGISTRY: MoodNodeDefinition[] = [
    // --- CORE (Essential Foundation) ---
    {
        id: 'image',
        label: 'Ref',
        description: 'Visual anchors and mood images.',
        icon: Image,
        category: 'CORE',
        defaultColor: 'bg-emerald-500',
        isCore: true
    },
    {
        id: 'text',
        label: 'Note',
        description: 'Quick thoughts and narrative blocks.',
        icon: StickyNote,
        category: 'CORE',
        defaultColor: 'bg-blue-500',
        isCore: true
    },
    {
        id: 'title',
        label: 'Heading',
        description: 'Large labels for board sections.',
        icon: Type,
        category: 'CORE',
        defaultColor: 'bg-indigo-600',
        isCore: true
    },
    {
        id: 'palette',
        label: 'Colors',
        description: 'Brand color swatches and codes.',
        icon: Palette,
        category: 'CORE',
        defaultColor: 'bg-pink-500',
        isCore: true
    },
    {
        id: 'typography',
        label: 'Fonts',
        description: 'Typeface and hierarchy definitions.',
        icon: Baseline,
        category: 'CORE',
        defaultColor: 'bg-violet-600',
        isCore: true
    },
    {
        id: 'paragraph',
        label: 'Copy',
        description: 'Detailed narrative and copy blocks.',
        icon: AlignLeft,
        category: 'CORE',
        defaultColor: 'bg-blue-500',
        isCore: false
    },
    {
        id: 'icons',
        label: 'Symbols',
        description: 'Symbol and glyph collections.',
        icon: Shapes,
        category: 'CORE',
        defaultColor: 'bg-blue-500',
        isCore: false
    },
    {
        id: 'reference',
        label: 'Link',
        description: 'Metadata links and external refs.',
        icon: Link2,
        category: 'CORE',
        defaultColor: 'bg-emerald-600',
        isCore: false
    },

    // --- REFINEMENT (Brand Details) ---
    {
        id: 'attribute',
        label: 'Trait',
        description: 'Key brand keywords and DNA.',
        icon: Sparkles,
        category: 'REFINEMENT',
        defaultColor: 'bg-amber-500',
        isCore: true
    },
    {
        id: 'texture',
        label: 'Surface',
        description: 'Material feel and finish details.',
        icon: Layers,
        category: 'REFINEMENT',
        defaultColor: 'bg-slate-400',
        isCore: true
    },
    {
        id: 'tone',
        label: 'Vibe',
        description: 'Communication and energy levels.',
        icon: SlidersHorizontal,
        category: 'REFINEMENT',
        defaultColor: 'bg-orange-600',
        isCore: true
    },
    {
        id: 'negative',
        label: 'Void',
        description: 'Items strictly forbidden for brand.',
        icon: X,
        category: 'REFINEMENT',
        defaultColor: 'bg-rose-600',
        isCore: true
    },
    {
        id: 'logic',
        label: 'Gate',
        description: 'Conditional logic branching.',
        icon: GitBranch,
        category: 'REFINEMENT',
        defaultColor: 'bg-amber-500',
        isCore: false
    },
    {
        id: 'preset',
        label: 'Aesthetic',
        description: 'Style presets and visual modes.',
        icon: Zap,
        category: 'REFINEMENT',
        defaultColor: 'bg-blue-500',
        isCore: false
    },

    // --- AI GEN (Generative Engine) ---
    {
        id: 'midjourney',
        label: 'MJ Prompt',
        description: 'Inject prompts to Midjourney bot.',
        icon: Sparkles,
        category: 'AI_GEN',
        defaultColor: 'bg-fuchsia-600',
        isCore: false
    },
    {
        id: 'checkpoint',
        label: 'Model',
        description: 'Load AI Checkpoints (SDXL, Flux).',
        icon: HardDrive,
        category: 'AI_GEN',
        defaultColor: 'bg-blue-600',
        isCore: true
    },
    {
        id: 'ksampler',
        label: 'Sampler',
        description: 'The core generative engine.',
        icon: Cpu,
        category: 'AI_GEN',
        defaultColor: 'bg-purple-600',
        isCore: true
    },
    {
        id: 'vae',
        label: 'Decoder',
        description: 'Convert latent data to pixels.',
        icon: Layers,
        category: 'AI_GEN',
        defaultColor: 'bg-red-500',
        isCore: true
    },
    {
        id: 'mood_gauge',
        label: 'Intensity',
        description: 'Measure aesthetic vibration levels.',
        icon: Gauge,
        category: 'AI_GEN',
        defaultColor: 'bg-lime-500',
        isCore: false
    },
    {
        id: 'model_profile',
        label: 'Character',
        description: 'Identity rig and character profile.',
        icon: User,
        category: 'AI_GEN',
        defaultColor: 'bg-fuchsia-500',
        isCore: false
    },

    // --- SIGNAL (Logic & Routing) ---
    {
        id: 'trigger',
        label: 'Start',
        description: 'Initiate workflow via event.',
        icon: Zap,
        category: 'SIGNAL',
        defaultColor: 'bg-yellow-500',
        isCore: false
    },
    {
        id: 'engine',
        label: 'Brain',
        description: 'Apply AI logic to brand data.',
        icon: BrainCircuit,
        category: 'SIGNAL',
        defaultColor: 'bg-violet-600',
        isCore: false
    },
    {
        id: 'switch',
        label: 'Router',
        description: 'Multiplex and branch signals.',
        icon: Split,
        category: 'SIGNAL',
        defaultColor: 'bg-blue-600',
        isCore: false
    },
    {
        id: 'receiver',
        label: 'Validator',
        description: 'Verify and organize final data.',
        icon: FileCheck2,
        category: 'SIGNAL',
        defaultColor: 'bg-emerald-600',
        isCore: false
    },
    {
        id: 'encoder',
        label: 'Export',
        description: 'Process and render final assets.',
        icon: Workflow,
        category: 'SIGNAL',
        defaultColor: 'bg-slate-700',
        isCore: false
    },
    {
        id: 'emitter',
        label: 'Distro',
        description: 'Send assets to external channels.',
        icon: Radio,
        category: 'SIGNAL',
        defaultColor: 'bg-indigo-500',
        isCore: false
    },

    // --- SYSTEM (Layout) ---
    {
        id: 'section',
        label: 'Group',
        description: 'Container for related nodes.',
        icon: Box,
        category: 'SYSTEM',
        defaultColor: 'bg-slate-800',
        isCore: true
    },
    {
        id: 'label',
        label: 'Tag',
        description: 'Sticky note for organization.',
        icon: StickyNote,
        category: 'SYSTEM',
        defaultColor: 'bg-amber-400',
        isCore: true
    },
    {
        id: 'grid',
        label: 'System',
        description: 'Structural grid and guidelines.',
        icon: LayoutGrid,
        category: 'SYSTEM',
        defaultColor: 'bg-slate-700',
        isCore: false
    },
    {
        id: 'content',
        label: 'Content',
        description: 'Content architecture and formats.',
        icon: Layout,
        category: 'SYSTEM',
        defaultColor: 'bg-rose-500',
        isCore: false
    },

    // --- EXTRAS (Connected) ---
    {
        id: 'spotify',
        label: 'Audio',
        description: 'Link playlists to set the mood.',
        icon: Music,
        category: 'EXTRAS',
        defaultColor: 'bg-green-500',
        isCore: false
    },
    {
        id: 'weather',
        label: 'Ambience',
        description: 'Dynamic local weather data.',
        icon: CloudRain,
        category: 'EXTRAS',
        defaultColor: 'bg-cyan-500',
        isCore: false
    },
    {
        id: 'web_ref',
        label: 'IFrame',
        description: 'Embed live website previews.',
        icon: Globe,
        category: 'EXTRAS',
        defaultColor: 'bg-indigo-500',
        isCore: false,
        isBeta: true
    },
    {
        id: 'competitor',
        label: 'Rivals',
        description: 'Competitive landscape analysis.',
        icon: Swords,
        category: 'EXTRAS',
        defaultColor: 'bg-stone-600',
        isCore: false
    },
    {
        id: 'cms_sync',
        label: 'Sync',
        description: 'Connect with Headless CMS data.',
        icon: HardDrive,
        category: 'EXTRAS',
        defaultColor: 'bg-orange-500',
        isCore: false
    }
];
