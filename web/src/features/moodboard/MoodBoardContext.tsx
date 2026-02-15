import { createContext, useContext } from 'react';
import { BrandProfile } from '@/types';

// MoodBoard Context for Node Access to Brand Profile
export interface MoodBoardContextType {
    brand: BrandProfile;
    isShiftPressed: boolean;
    onToggleCollapse?: (groupId: string) => void;
}

export const MoodBoardContext = createContext<MoodBoardContextType | null>(null);

export const useMoodBoard = () => {
    const context = useContext(MoodBoardContext);
    if (!context) throw new Error('useMoodBoard must be used within MoodBoard');
    return context;
};
