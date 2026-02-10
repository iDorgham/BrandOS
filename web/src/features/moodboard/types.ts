import { CSSProperties } from 'react';

export interface MoodNodeData extends Record<string, unknown> {
    label: string;
    content?: string;
    color?: string; // Hex color for palette/attribute
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    gridCols?: number;
    gap?: number;
    toneValue?: number; // 0-100
    competitorName?: string;
    marketShare?: number; // 0-100
    moodLevel?: number; // 0-100
    prompt?: string;
    iconSet?: string[];
    linkUrl?: string;
    linkTitle?: string;
    variant?: string; // For presets/textures
    intensity?: number;
    isActive?: boolean;
    isLocked?: boolean;
    type?: string;
    imageUrl?: string;
    description?: string;
    subtitle?: string;
    tags?: string[];

    // Aspect Ratio Control
    isRatioLocked?: boolean;
    aspectRatio?: number;

    // Technical Metadata (Grid, Typography, etc.)
    letterSpacing?: string;
    lineHeight?: string;

    onChange?: (id: string, newData: Partial<MoodNodeData>, newStyle?: CSSProperties) => void;
}

import { BrandProfile } from '@/types';

export interface MoodBoardViewProps {
    brand: BrandProfile;
    setHeaderActions: (actions: React.ReactNode) => void;
    setIsAppSidebarCollapsed?: (collapsed: boolean) => void;
}
