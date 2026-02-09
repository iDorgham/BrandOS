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
import { GrammarRule, EmotionalIntent, BrandProfile, AssetType, Workspace } from '../types';

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
 * Initial mock brand profiles (Empty to ensure new workspaces start fresh)
 */
export const INITIAL_BRANDS: BrandProfile[] = [];

/**
 * Mock Workspace data for demonstration
 */
export const MOCK_WORKSPACES: Workspace[] = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Brand OS Alpha',
        slug: 'brand-os-alpha',
        ownerId: '123e4567-e89b-12d3-a456-426614174001',
        createdAt: Date.now() - 86400000 * 30
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'Creative Studio',
        slug: 'creative-studio',
        ownerId: '123e4567-e89b-12d3-a456-426614174001',
        createdAt: Date.now() - 86400000 * 5
    }
];

/**
 * Mock User Profile for demonstration
 */
export const MOCK_USER_PROFILE = {
    id: 'demo-user',
    name: 'Art Director',
    email: 'director@brand-os.ai',
    role: 'art_director',
    avatarUrl: '',
    preferences: {
        notifications: true,
        theme: 'dark',
        compactMode: false
    }
};
