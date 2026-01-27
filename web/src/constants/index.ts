import {
    Box,
    Grid3X3,
    Camera,
    Smartphone,
    Printer,
    Monitor,
    Layout,
    Instagram,
    FileText,
    Image as ImageIcon,
    Tablet
} from 'lucide-react';
import { GrammarRule, EmotionalIntent, BrandProfile, AssetType } from '../types';

/**
 * Initial set of grammar rules for brand alignment
 */
export const DEFAULT_GRAMMAR_RULES: GrammarRule[] = [
    { id: '1', condition: "subject includes 'event'", directive: "add neon gold highlights to top quadrant" },
    { id: '2', condition: "style is 'minimalist'", directive: "enforce 80% negative space protocol" }
];

/**
 * Supported asset generation types
 */
export const ASSET_TYPES: AssetType[] = [
    // Core Formats
    { id: 'vector', label: 'Vector Asset', icon: Box, aspectRatio: '1:1' },
    { id: 'icon', label: 'App Icon', icon: Grid3X3, aspectRatio: '1:1' },

    // Social Media
    { id: 'social_post', label: 'Social Post', icon: Instagram, aspectRatio: '1:1' },
    { id: 'social_story', label: 'Social Story', icon: Smartphone, aspectRatio: '9:16' },
    { id: 'social_cover', label: 'Social Cover', icon: ImageIcon, aspectRatio: '16:9' },

    // Print & Marketing
    { id: 'flyer', label: 'Event Flyer', icon: FileText, aspectRatio: '3:4' },
    { id: 'poster', label: 'Print Poster', icon: Printer, aspectRatio: '3:4' },

    // Screens
    { id: 'wallpaper_desktop', label: 'Desktop Wall', icon: Monitor, aspectRatio: '16:9' },
    { id: 'wallpaper_mobile', label: 'Mobile Wall', icon: Tablet, aspectRatio: '9:16' },

    // Web
    { id: 'web_banner', label: 'Web Hero', icon: Layout, aspectRatio: '16:9' },
    { id: 'stock', label: 'Stock Photo', icon: Camera, aspectRatio: '16:9' },
];

/**
 * Initial mock brand profiles
 */
export const INITIAL_BRANDS: BrandProfile[] = [
    {
        id: 'noir-01',
        name: 'NOIR Nightlife',
        doctrine: 'High-contrast luxury minimalism with wabi-sabi textures. Focus on deep shadows and emerald highlights.',
        palette: [
            { id: '1', label: 'Primary', hex: '#0a0e17' },
            { id: '2', label: 'Secondary', hex: '#1a1a1a' },
            { id: '3', label: 'Accent', hex: '#10b981' }
        ],
        background: '#050505',
        negativeSpace: 65,
        safeZones: ['bottom_25%', 'top_right_10%'],
        emotionalTags: [EmotionalIntent.MYSTERIOUS, EmotionalIntent.SOPHISTICATED],
        forbiddenElements: ['gradients', 'centered_logos', 'bright_red'],
        extractedPatterns: ['Shadow-heavy compositions', 'Off-center subject focus'],
        stylisticSignatures: ['Brutalist typography zones', 'Film grain texture'],
        grammarRules: [...DEFAULT_GRAMMAR_RULES]
    }
];
