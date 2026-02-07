import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { moodboardService } from '../services/persistence.service';
import { Moodboard } from '../types';

export const useMoodboards = (brandId: string) => {
    const [moodboards, setMoodboards] = useState<Moodboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMoodboard, setSelectedMoodboard] = useState<Moodboard | null>(null);

    // Load moodboards for the brand
    const loadMoodboards = useCallback(async () => {
        if (!brandId) {
            setMoodboards([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await moodboardService.getMoodboards(brandId);
            setMoodboards(data);
        } catch (error) {
            console.error('Failed to load moodboards:', error);
            setMoodboards([]);
        } finally {
            setLoading(false);
        }
    }, [brandId]);

    // Load on mount and when brandId changes
    useEffect(() => {
        loadMoodboards();
    }, [loadMoodboards]);

    // Create a new moodboard
    const createMoodboard = useCallback(async (name: string, description?: string) => {
        try {
            const newMoodboard = await moodboardService.createMoodboard({
                brandId,
                name,
                description,
                isActive: true,
                nodes: [],
                edges: [],
            });
            setMoodboards(prev => [newMoodboard, ...prev]);
            toast.success('Moodboard created!');
            return newMoodboard;
        } catch (error) {
            console.error('Failed to create moodboard:', error);
            toast.error('Failed to create moodboard');
            throw error;
        }
    }, [brandId]);

    // Update moodboard (including nodes/edges)
    const updateMoodboard = useCallback(async (moodboard: Moodboard) => {
        try {
            const updated = await moodboardService.updateMoodboard(moodboard);
            setMoodboards(prev => prev.map(m => m.id === updated.id ? updated : m));
            if (selectedMoodboard?.id === updated.id) {
                setSelectedMoodboard(updated);
            }
            return updated;
        } catch (error) {
            console.error('Failed to update moodboard:', error);
            toast.error('Failed to save moodboard');
            throw error;
        }
    }, [selectedMoodboard]);

    // Toggle active status
    const toggleActive = useCallback(async (moodboardId: string, isActive: boolean) => {
        try {
            await moodboardService.toggleActive(moodboardId, isActive);
            setMoodboards(prev => prev.map(m =>
                m.id === moodboardId ? { ...m, isActive } : m
            ));
            toast.success(isActive ? 'Moodboard activated' : 'Moodboard deactivated');
        } catch (error) {
            console.error('Failed to toggle moodboard:', error);
            toast.error('Failed to update moodboard');
            throw error;
        }
    }, []);

    // Delete moodboard
    const deleteMoodboard = useCallback(async (moodboardId: string) => {
        try {
            await moodboardService.deleteMoodboard(moodboardId);
            setMoodboards(prev => prev.filter(m => m.id !== moodboardId));
            if (selectedMoodboard?.id === moodboardId) {
                setSelectedMoodboard(null);
            }
            toast.success('Moodboard deleted');
        } catch (error) {
            console.error('Failed to delete moodboard:', error);
            toast.error('Failed to delete moodboard');
            throw error;
        }
    }, [selectedMoodboard]);

    // Select a moodboard to work on
    const selectMoodboard = useCallback((moodboard: Moodboard | null) => {
        setSelectedMoodboard(moodboard);
    }, []);

    return {
        moodboards,
        loading,
        selectedMoodboard,
        createMoodboard,
        updateMoodboard,
        toggleActive,
        deleteMoodboard,
        selectMoodboard,
        refresh: loadMoodboards,
    };
};
