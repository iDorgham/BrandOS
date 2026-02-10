import {
    Image as ImageIcon,
    Type,
    Sparkles,
    GitBranch,
    Zap,
    Palette,
    Layers,
    X,
    CloudRain,
    Music,
    Globe,
    Cpu,
    Database,
    Heading1,
    AlignLeft,
    CaseUpper,
    Grid3X3,
    SlidersHorizontal,
    Swords,
    Gauge,
    Shapes,
    Link2
} from 'lucide-react';

export type NodeCategory = 'Foundation' | 'Orchestration' | 'Utility' | 'External' | 'Generative';

export interface MoodNodeDefinition {
    id: string;
    label: string;
    description: string;
    icon: any;
    category: NodeCategory;
    defaultColor: string;
    isCore: boolean; // Cannot be uninstalled
    isBeta?: boolean;
    cost?: number; // For future marketplace credits
}

export const NODE_REGISTRY: MoodNodeDefinition[] = [
    // --- Foundation (Core) ---
    {
        id: 'image',
        label: 'Ref',
        description: 'Upload or paste images as visual anchors.',
        icon: ImageIcon,
        category: 'Foundation',
        defaultColor: 'bg-emerald-500',
        isCore: true
    },
    {
        id: 'text',
        label: 'Narrative',
        description: 'Text blocks for brand story and doctrine.',
        icon: Type,
        category: 'Foundation',
        defaultColor: 'bg-blue-500',
        isCore: true
    },
    {
        id: 'title',
        label: 'Title',
        description: 'Large heading for board sections.',
        icon: Heading1,
        category: 'Foundation',
        defaultColor: 'bg-indigo-600',
        isCore: true
    },
    {
        id: 'paragraph',
        label: 'Paragraph',
        description: 'Body text for detailed descriptions.',
        icon: AlignLeft,
        category: 'Foundation',
        defaultColor: 'bg-slate-600',
        isCore: true
    },
    {
        id: 'preset',
        label: 'Preset',
        description: 'Quickly apply a cohesive aesthetic style.',
        icon: Zap,
        category: 'Foundation',
        defaultColor: 'bg-sky-400',
        isCore: true
    },
    {
        id: 'palette',
        label: 'Palette',
        description: 'Define primary and secondary color swatches.',
        icon: Palette,
        category: 'Foundation',
        defaultColor: 'bg-pink-500',
        isCore: true
    },

    // --- Orchestration (Core) ---
    {
        id: 'attribute',
        label: 'Trait',
        description: 'Specific brand attributes and keywords.',
        icon: Sparkles,
        category: 'Orchestration',
        defaultColor: 'bg-amber-500',
        isCore: true
    },
    {
        id: 'texture',
        label: 'Texture',
        description: 'Define material properties and finish.',
        icon: Layers,
        category: 'Orchestration',
        defaultColor: 'bg-slate-400',
        isCore: true
    },
    {
        id: 'logic',
        label: 'Logic',
        description: 'Conditional branching for brand rules.',
        icon: GitBranch,
        category: 'Orchestration',
        defaultColor: 'bg-violet-500',
        isCore: true
    },
    {
        id: 'negative',
        label: 'Negative',
        description: 'Explicitly forbidden elements.',
        icon: X,
        category: 'Orchestration',
        defaultColor: 'bg-rose-600',
        isCore: true
    },

    // --- External / Advanced (Marketplace) ---
    {
        id: 'weather',
        label: 'Weather',
        description: 'Dynamic ambience based on location weather data.',
        icon: CloudRain,
        category: 'External',
        defaultColor: 'bg-cyan-500',
        isCore: false
    },
    {
        id: 'spotify',
        label: 'Sonic',
        description: 'Link Spotify playlists to set the mood.',
        icon: Music,
        category: 'External',
        defaultColor: 'bg-green-500',
        isCore: false
    },
    {
        id: 'web_ref',
        label: 'Web',
        description: 'Embed a live website iframe as reference.',
        icon: Globe,
        category: 'Utility',
        defaultColor: 'bg-indigo-500',
        isCore: false,
        isBeta: true
    },
    {
        id: 'midjourney',
        label: 'MJ Link',
        description: 'Direct prompt injection to Midjourney.',
        icon: Cpu,
        category: 'Generative',
        defaultColor: 'bg-fuchsia-600',
        isCore: false,
        cost: 500
    },
    {
        id: 'cms_sync',
        label: 'CMS Sync',
        description: 'Pull content directly from Headless CMS.',
        icon: Database,
        category: 'Utility',
        defaultColor: 'bg-orange-500',
        isCore: false
    },
    // --- Advanced / Pro-Lab (Added) ---
    {
        id: 'typography',
        label: 'Type',
        description: 'Define font families and hierarchy.',
        icon: CaseUpper,
        category: 'Foundation',
        defaultColor: 'bg-violet-600',
        isCore: true
    },
    {
        id: 'grid',
        label: 'Grid',
        description: 'Structural systems and grid settings.',
        icon: Grid3X3,
        category: 'Foundation',
        defaultColor: 'bg-slate-700',
        isCore: false
    },
    {
        id: 'tone',
        label: 'Tone',
        description: 'Define communication vibration.',
        icon: SlidersHorizontal,
        category: 'Orchestration',
        defaultColor: 'bg-orange-600',
        isCore: true
    },
    {
        id: 'competitor',
        label: 'Market',
        description: 'Competitive landscape analysis.',
        icon: Swords,
        category: 'External',
        defaultColor: 'bg-stone-600',
        isCore: false
    },
    {
        id: 'mood_gauge',
        label: 'Gauge',
        description: 'Aesthetic vibration intensity.',
        icon: Gauge,
        category: 'Generative',
        defaultColor: 'bg-lime-500',
        isCore: false
    },
    {
        id: 'icons',
        label: 'Icons',
        description: 'Visual language symbols.',
        icon: Shapes,
        category: 'Foundation',
        defaultColor: 'bg-sky-500',
        isCore: false
    },
    {
        id: 'reference',
        label: 'Link',
        description: 'Rich metadata link preview.',
        icon: Link2,
        category: 'External',
        defaultColor: 'bg-blue-600',
        isCore: false
    }
];
