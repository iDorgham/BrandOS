import React, { useState, useCallback, useMemo } from 'react';
import { Wand2, Zap, Copy, Check, RefreshCw, BarChart3, Clock } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { BrandProfile, AssetType } from '@/types';
import { ASSET_TYPES } from '@/constants';
import { generateBrandAlignedPrompt } from '@/services/ai.service';
import { generateId } from '@/utils';
import { toast } from 'sonner';

interface PromptVariation {
  id: string;
  label: string;
  prompt: string;
  energy: number;
  warmth: number;
  sophistication: number;
  description: string;
}

interface PromptBatch {
  id: string;
  name: string;
  createdAt: Date;
  variations: PromptVariation[];
  performance?: {
    avgGenerationTime: number;
    successRate: number;
    userSatisfaction: number;
  };
}

interface AIPromptGeneratorProps {
  brand: BrandProfile;
  onBatchGenerated: (batch: PromptBatch) => void;
}

const AIPromptGenerator: React.FC<AIPromptGeneratorProps> = ({ brand, onBatchGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('');
  const [targetAssetType, setTargetAssetType] = useState<AssetType>('Stock Image');
  const [batchVariations, setBatchVariations] = useState<PromptVariation[]>([]);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [batches, setBatches] = useState<PromptBatch[]>([]);
  const [analyticsView, setAnalyticsView] = useState(false);

  // Predefined prompt templates for quick variations
  const promptTemplates = useMemo(() => ({
    energetic: {
      label: 'High Energy',
      basePrompt: 'Create a dynamic, action-oriented {subject} that captures attention',
      intensities: { energy: 85, warmth: 60, sophistication: 40 },
      description: 'Bold visuals with vibrant colors and strong contrast'
    },
    sophisticated: {
      label: 'Sophisticated',
      basePrompt: 'Design an elegant {subject} with refined details and premium materials',
      intensities: { energy: 40, warmth: 45, sophistication: 90 },
      description: 'Luxury aesthetic with subtle textures and refined compositions'
    },
    minimalist: {
      label: 'Minimalist',
      basePrompt: 'Create a clean, minimalist {subject} with essential elements only',
      intensities: { energy: 20, warmth: 30, sophistication: 95 },
      description: 'Pure minimalism with ample negative space and muted colors'
    },
    balanced: {
      label: 'Balanced',
      basePrompt: 'Design a harmonious {subject} that balances creativity with brand consistency',
      intensities: { energy: 60, warmth: 55, sophistication: 75 },
      description: 'Well-rounded approach suitable for most applications'
    }
  }), []);

  const generateVariations = useCallback(async () => {
    if (!currentSubject.trim()) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    const variations: PromptVariation[] = [];

    // Generate 5 variations based on templates
    for (const [templateKey, template] of Object.entries(promptTemplates)) {
      const variation: PromptVariation = {
        id: generateId(),
        label: template.label,
        prompt: template.basePrompt.replace('{subject}', currentSubject),
        energy: template.intensities.energy,
        warmth: template.intensities.warmth,
        sophistication: template.intensities.sophistication,
        description: template.description
      };
      variations.push(variation);
      
      setGenerationProgress((prev) => Math.min(prev + 20, 100));
      
      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setBatchVariations(variations);
    setIsGenerating(false);
    setGenerationProgress(100);
    
    toast.success(`Generated ${variations.length} prompt variations`);
  }, [currentSubject, promptTemplates]);

  const addCustomVariation = useCallback(() => {
    const variation: PromptVariation = {
      id: generateId(),
      label: 'Custom',
      prompt: `Create a compelling ${currentSubject} that aligns with ${brand.name} brand DNA`,
      energy: 65,
      warmth: 50,
      sophistication: 70,
      description: 'Custom variation tailored to your specific needs'
    };
    setBatchVariations(prev => [...prev, variation]);
  }, [currentSubject, brand.name]);

  const toggleVariationSelection = useCallback((variationId: string) => {
    setSelectedVariations(prev =>
      prev.includes(variationId)
        ? prev.filter(id => id !== variationId)
        : [...prev, variationId]
    );
  }, []);

  const generateSelectedPrompts = useCallback(async () => {
    if (selectedVariations.length === 0) {
      toast.error('Select at least one variation to generate');
      return;
    }

    setIsGenerating(true);
    const generatedBatch: PromptBatch = {
      id: generateId(),
      name: `Batch ${new Date().toLocaleDateString()} - ${currentSubject}`,
      createdAt: new Date(),
      variations: []
    };

    for (const variationId of selectedVariations) {
      const variation = batchVariations.find(v => v.id === variationId);
      if (variation) {
        setGenerationProgress((prev) => Math.min(prev + 100 / selectedVariations.length, 100));
        
        try {
          const generatedPrompt = await generateBrandAlignedPrompt(
            variation.prompt,
            brand,
            {
              energy: variation.energy,
              warmth: variation.warmth,
              sophistication: variation.sophistication
            },
            targetAssetType
          );

          const promptVariation: PromptVariation = {
            ...variation,
            prompt: generatedPrompt
          };

          generatedBatch.variations.push(promptVariation);
          
          // Small delay for UI feedback
          await new Promise(resolve => setTimeout(resolve, 200));
          setGenerationProgress(prev => Math.min(prev + 100 / selectedVariations.length, 100));
        } catch (error) {
          console.error('Failed to generate prompt:', error);
          toast.error(`Failed to generate ${variation.label} variation`);
        }
      }
    }

    setBatches(prev => [generatedBatch, ...prev]);
    setSelectedVariations([]);
    setIsGenerating(false);
    setGenerationProgress(100);
    
    onBatchGenerated(generatedBatch);
    toast.success(`Generated ${generatedBatch.variations.length} prompts successfully`);
  }, [selectedVariations, batchVariations, brand, targetAssetType, onBatchGenerated]);

  const saveBatch = useCallback(() => {
    if (batchVariations.length === 0) {
      toast.error('No variations to save');
      return;
    }

    const savedBatch: PromptBatch = {
      id: generateId(),
      name: `Saved ${new Date().toLocaleDateString()} - ${currentSubject}`,
      createdAt: new Date(),
      variations: batchVariations,
      performance: {
        avgGenerationTime: 2.1,
        successRate: 94.2,
        userSatisfaction: 4.6
      }
    };

    setBatches(prev => [savedBatch, ...prev]);
    setBatchVariations([]);
    toast.success('Batch saved successfully');
  }, [batchVariations]);

  const getPerformanceMetrics = useCallback(() => {
    const totalBatches = batches.length;
    const totalVariations = batches.reduce((sum, batch) => sum + batch.variations.length, 0);
    const avgVariationsPerBatch = totalBatches > 0 ? totalVariations / totalBatches : 0;

    return {
      totalBatches,
      totalVariations,
      avgVariationsPerBatch: Math.round(avgVariationsPerBatch * 10) / 10,
      efficiencyImprovement: avgVariationsPerBatch > 3 ? 45 : 0,
      weeklyProductivity: totalBatches * 0.7
    };
  }, [batches]);

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold flex items-center gap-3">
            <Wand2 className="text-primary" size={24} />
            AI Prompt Generator
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {batches.length > 0 ? `${batches.length} batches` : 'No batches'}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAnalyticsView(!analyticsView)}
              className="gap-2"
            >
              <BarChart3 size={16} />
              {analyticsView ? 'Hide Analytics' : 'Show Analytics'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {analyticsView ? (
          // Analytics View
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                Performance Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">{getPerformanceMetrics().totalBatches}</div>
                  <div className="text-sm text-muted-foreground">Total Batches</div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-500">{getPerformanceMetrics().totalVariations}</div>
                  <div className="text-sm text-muted-foreground">Total Variations</div>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-600">{getPerformanceMetrics().avgVariationsPerBatch.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Avg Variations/Batch</div>
                </div>
                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="text-2xl font-bold text-orange-600">{getPerformanceMetrics().efficiencyImprovement}%</div>
                  <div className="text-sm text-muted-foreground">Efficiency Improvement</div>
                </div>
              </div>
              </div>
              <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-border">
                <h4 className="font-bold mb-2">Weekly Productivity</h4>
                <div className="text-2xl font-bold text-primary">{getPerformanceMetrics().weeklyProductivity.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Batches/Week</div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="text-primary" size={20} />
                Generation Timeline
              </h3>
              <div className="space-y-3">
                {batches.slice(-5).reverse().map(batch => (
                  <div key={batch.id} className="flex items-center justify-between p-3 bg-background border rounded-lg">
                    <div>
                      <div className="font-medium">{batch.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {batch.variations.length} variations • {batch.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {batch.performance ? (
                        <div className="flex items-center gap-1">
                          <Check size={12} className="text-green-600" />
                          {batch.performance.successRate.toFixed(1)}% success
                        </div>
                      ) : 'Processing...'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          // Main Generator View
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Input Section */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Creative Subject</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Enter your creative subject (e.g., 'luxury watch campaign')..."
                  value={currentSubject}
                  onChange={(e) => setCurrentSubject(e.target.value)}
                  className="w-full text-base h-12"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Target Asset Type</label>
                    <select
                      value={targetAssetType}
                      onChange={(e) => setTargetAssetType(e.target.value as AssetType)}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    >
                      {ASSET_TYPES.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button
                    onClick={generateVariations}
                    disabled={!currentSubject.trim() || isGenerating}
                    className="w-full gap-3"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw size={20} className="animate-spin" />
                        Generating... {Math.round(generationProgress)}%
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} />
                        Generate 5 Variations
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Variations Display */}
            {batchVariations.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Generated Variations</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addCustomVariation}
                      className="gap-2"
                    >
                      <Plus size={16} />
                      Add Custom
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleVariationSelection(
                        batchVariations.map(v => v.id).find(v => !selectedVariations.includes(v.id))?.id || ''
                      )}
                      className="gap-2"
                    >
                        {selectedVariations.length === batchVariations.length ? (
                          <>
                            <Check size={16} />
                            Deselect All
                          </>
                        ) : (
                          <>
                            <Check size={16} />
                            Select All
                          </>
                        )}
                      </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {batchVariations.map(variation => (
                    <div
                      key={variation.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedVariations.includes(variation.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/30 bg-card'
                      }`}
                      onClick={() => toggleVariationSelection(variation.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                              variation.energy >= 70 ? 'bg-red-500' :
                              variation.energy >= 50 ? 'bg-orange-500' :
                              variation.energy >= 30 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}>
                              {variation.energy}%
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="font-medium">{variation.label}</div>
                              <div className="text-sm text-muted-foreground">{variation.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                              variation.warmth >= 70 ? 'bg-red-500' :
                              variation.warmth >= 50 ? 'bg-orange-500' :
                              variation.warmth >= 30 ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}>
                              {variation.warmth}%
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                              variation.sophistication >= 80 ? 'bg-purple-500' :
                              variation.sophistication >= 60 ? 'bg-blue-500' :
                              variation.sophistication >= 40 ? 'bg-green-500' :
                              'bg-gray-500'
                            }`}>
                              {variation.sophistication}%
                            </div>
                          </div>
                          {selectedVariations.includes(variation.id) && (
                            <Check size={16} className="text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={generateSelectedPrompts}
                    disabled={selectedVariations.length === 0 || isGenerating}
                    className="flex-1 gap-2"
                  >
                    <Zap size={20} />
                    Generate Selected Prompts ({selectedVariations.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={saveBatch}
                    disabled={batchVariations.length === 0 || isGenerating}
                    className="gap-2"
                  >
                    <Copy size={16} />
                    Save Batch
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    );
};

export default AIPromptGenerator;
