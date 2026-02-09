import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { brandService, assetService, promptHistoryService } from '../services/persistence.service';
import { BrandProfile, GeneratedAsset, PromptHistoryItem } from '../types';

// Hook to replace localStorage for brands
export const useSupabaseBrands = () => {
  const { brands, refreshData, activeWorkspace } = useAuth();
  const [loading, setLoading] = useState(false);

  const addBrand = useCallback(async (brand: Omit<BrandProfile, 'id'>) => {
    try {
      setLoading(true);
      const newBrand = await brandService.createBrand(brand, activeWorkspace?.id);
      await refreshData();
      toast.success('Brand created successfully!');
      return newBrand;
    } catch (error) {
      console.error('Failed to create brand:', error);
      toast.error('Failed to create brand');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  const updateBrand = useCallback(async (brand: BrandProfile) => {
    try {
      setLoading(true);
      await brandService.updateBrand(brand);
      await refreshData();
      toast.success('Brand updated successfully!');
    } catch (error) {
      console.error('Failed to update brand:', error);
      toast.error('Failed to update brand');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  const deleteBrand = useCallback(async (brandId: string) => {
    try {
      setLoading(true);
      await brandService.deleteBrand(brandId);
      await refreshData();
      toast.success('Brand deleted successfully!');
    } catch (error) {
      console.error('Failed to delete brand:', error);
      toast.error('Failed to delete brand');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  return React.useMemo(() => ({
    brands,
    loading,
    addBrand,
    updateBrand,
    deleteBrand,
  }), [brands, loading, addBrand, updateBrand, deleteBrand]);
};

// Hook to replace localStorage for assets
export const useSupabaseAssets = () => {
  const { assets, refreshData, activeWorkspace } = useAuth();
  const [loading, setLoading] = useState(false);

  const addAsset = useCallback(async (asset: Omit<GeneratedAsset, 'id' | 'timestamp'>) => {
    try {
      setLoading(true);
      const newAsset = await assetService.createAsset(asset, activeWorkspace?.id);
      await refreshData();
      toast.success('Asset created successfully!');
      return newAsset;
    } catch (error) {
      console.error('Failed to create asset:', error);
      toast.error('Failed to create asset');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [activeWorkspace?.id, refreshData]);

  const deleteAsset = useCallback(async (assetId: string) => {
    try {
      setLoading(true);
      await assetService.deleteAsset(assetId);
      await refreshData();
      toast.success('Asset deleted successfully!');
    } catch (error) {
      console.error('Failed to delete asset:', error);
      toast.error('Failed to delete asset');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  const getAssetsByBrand = useCallback(async (brandId: string): Promise<GeneratedAsset[]> => {
    try {
      setLoading(true);
      return await assetService.getAssetsByBrand(brandId);
    } catch (error) {
      console.error('Failed to get assets by brand:', error);
      toast.error('Failed to load assets');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return React.useMemo(() => ({
    assets,
    loading,
    addAsset,
    deleteAsset,
    getAssetsByBrand,
  }), [assets, loading, addAsset, deleteAsset, getAssetsByBrand]);
};

// Hook to replace localStorage for prompt history
export const useSupabasePromptHistory = () => {
  const { promptHistory, refreshData, activeWorkspace } = useAuth();
  const [loading, setLoading] = useState(false);

  const addToHistory = useCallback(async (prompt: Omit<PromptHistoryItem, 'id' | 'timestamp'>) => {
    try {
      setLoading(true);
      const newPrompt = await promptHistoryService.addPromptToHistory(prompt, activeWorkspace?.id);
      await refreshData();
      return newPrompt;
    } catch (error) {
      console.error('Failed to add prompt to history:', error);
      toast.error('Failed to save prompt to history');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [activeWorkspace?.id, refreshData]);

  const clearHistory = useCallback(async () => {
    try {
      setLoading(true);
      await promptHistoryService.clearPromptHistory();
      await refreshData();
      toast.success('Prompt history cleared!');
    } catch (error) {
      console.error('Failed to clear prompt history:', error);
      toast.error('Failed to clear prompt history');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  const getHistoryByBrand = useCallback(async (brandId: string): Promise<PromptHistoryItem[]> => {
    try {
      setLoading(true);
      return await promptHistoryService.getPromptHistoryByBrand(brandId);
    } catch (error) {
      console.error('Failed to get prompt history by brand:', error);
      toast.error('Failed to load prompt history');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return React.useMemo(() => ({
    promptHistory,
    loading,
    addToHistory,
    clearHistory,
    getHistoryByBrand,
  }), [promptHistory, loading, addToHistory, clearHistory, getHistoryByBrand]);
};
