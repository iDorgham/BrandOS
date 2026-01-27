import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, RefreshCw, Zap, ChevronRight, Wand2 } from 'lucide-react';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { BrandProfile, GeneratedAsset, PromptHistoryItem, AssetType } from '@/types';
import { ASSET_TYPES } from '@/constants';
import { generateBrandAlignedPrompt, generateImage, auditCompliance } from '@/services/gemini.service';
import { generateId } from '@/utils';

interface StudioViewProps {
    brand: BrandProfile;
    onAssetGenerated: (asset: GeneratedAsset) => void;
    promptHistory: PromptHistoryItem[];
    onUpdateHistory: (history: PromptHistoryItem[]) => void;
    initialContext?: { subject: string, feedback: string } | null;
}

export const StudioView: React.FC<StudioViewProps> = ({
    brand,
    onAssetGenerated,
    promptHistory,
    onUpdateHistory,
    initialContext
}) => {
    const [selectedAssetType, setSelectedAssetType] = useState<AssetType | null>(null);
    const [promptSubject, setPromptSubject] = useState(initialContext?.subject || '');
    const [orchestratedPrompt, setOrchestratedPrompt] = useState('');
    const [intensities, setIntensities] = useState({ energy: 50, warmth: 30, sophistication: 80 });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStatus, setGenerationStatus] = useState<string>('');

    React.useEffect(() => {
        if (initialContext?.subject) {
            setPromptSubject(initialContext.subject);
        }
    }, [initialContext]);

    const handleOrchestrate = async () => {
        if (!promptSubject || !selectedAssetType) return;
        setIsGenerating(true);
        setGenerationStatus('Synthesizing DNA...');
        try {
            const refined = await generateBrandAlignedPrompt(
                promptSubject,
                brand,
                intensities,
                selectedAssetType.label,
                initialContext?.feedback
            );
            setOrchestratedPrompt(refined);
            toast.success('DNA Synthesis Complete');

            const newHistoryItem: PromptHistoryItem = {
                id: generateId(),
                subject: promptSubject,
                orchestrated: refined,
                brandId: brand.id,
                timestamp: Date.now()
            };
            onUpdateHistory([newHistoryItem, ...promptHistory].slice(0, 30));
        } catch (err) {
            console.error(err);
            toast.error('Synthesis Failed');
        } finally {
            setIsGenerating(false);
            setGenerationStatus('');
        }
    };

    const handleFinalRender = async () => {
        if (!orchestratedPrompt || !selectedAssetType) return;
        setIsGenerating(true);
        setGenerationStatus('Rendering 8K Master...');
        try {
            const imageUrl = await generateImage(orchestratedPrompt, selectedAssetType.aspectRatio);
            if (imageUrl) {
                setGenerationStatus('Auditing Adherence...');
                const audit = await auditCompliance(imageUrl, brand);
                const newAsset: GeneratedAsset = {
                    id: generateId(),
                    url: imageUrl,
                    prompt: orchestratedPrompt,
                    subject: promptSubject,
                    complianceScore: Math.round((audit.colorMatch + audit.spatialCompliance + audit.vibeCheck) / 3),
                    brandId: brand.id,
                    timestamp: Date.now(),
                    auditDetails: audit
                };

                onAssetGenerated(newAsset);
                toast.success('Asset Generated & Audited', { description: `Compliance Score: ${newAsset.complianceScore}%` });

                // Reset form
                setOrchestratedPrompt('');
                setPromptSubject('');
                setSelectedAssetType(null);
            } else {
                toast.error('Generation returned empty result');
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Generation Failed');
        } finally {
            setIsGenerating(false);
            setGenerationStatus('');
        }
    };

    return (
        <div className="animate-in fade-in duration-500 h-full flex flex-col gap-8">
            {!selectedAssetType ? (
                // Asset Type Selection
                <div className="flex-1 flex flex-col justify-center items-center py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tighter uppercase">Select Asset Target</h1>
                    <p className="text-muted-foreground mb-12 max-w-sm">Choose the output format to initialize DNA orchestration</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
                        {ASSET_TYPES.map(type => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedAssetType(type)}
                                className="group border border-border bg-card p-6 rounded-xl hover:border-primary transition-all flex flex-col items-center gap-4 text-center"
                            >
                                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                    <type.icon size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{type.label}</h4>
                                    <p className="text-[10px] text-muted-foreground uppercase">{type.aspectRatio} Ratio</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : orchestratedPrompt ? (
                // Orchestrated Prompt Review & Render
                <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" onClick={() => setOrchestratedPrompt('')}>
                                <ArrowLeft size={16} className="mr-2" /> Back to Parameters
                            </Button>
                            <h2 className="text-xl font-bold">DNA Synthesis Results</h2>
                        </div>
                    </div>
                    <Card className="p-8 space-y-6">
                        <div className="p-6 rounded-lg bg-accent/20 border border-border min-h-[200px]">
                            <Textarea
                                className="bg-transparent border-none p-0 focus-visible:ring-0 text-lg leading-relaxed h-full"
                                value={orchestratedPrompt}
                                onChange={(e) => setOrchestratedPrompt(e.target.value)}
                                rows={8}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                className="rounded-full px-12 py-8 text-xl font-black gap-3 shadow-primary/20 shadow-2xl"
                                onClick={handleFinalRender}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw size={24} className="animate-spin" />
                                        <span className="text-sm font-bold ml-2 tracking-widest uppercase">{generationStatus}</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap size={24} /> RENDER 8K MASTER
                                    </>
                                )}
                            </Button>
                        </div>
                    </Card>
                </div>
            ) : (
                // Prompt Input & Orchestration
                <div className="flex-1 flex flex-col justify-center items-center max-w-2xl mx-auto w-full text-center space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-display font-black tracking-tight leading-none">
                            Orchestrate <br />
                            <span className="text-primary">Liquid DNA.</span>
                        </h1>
                        <p className="text-muted-foreground text-sm uppercase tracking-widest">Target: {selectedAssetType.label}</p>
                    </div>
                    <div className="w-full space-y-8">
                        {initialContext?.feedback && (
                            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start gap-3 text-left">
                                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                                <div>
                                    <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Active Refinement Protocol</h4>
                                    <p className="text-xs text-muted-foreground">{initialContext.feedback}</p>
                                </div>
                            </div>
                        )}
                        <div className="relative group">
                            <Input
                                placeholder="Enter creative subject..."
                                className="h-20 text-2xl font-display text-center border-2 border-border focus-visible:border-primary transition-all"
                                value={promptSubject}
                                onChange={(e) => setPromptSubject(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleOrchestrate()}
                            />
                            <Wand2 className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={24} />
                        </div>

                        {/* Intensity Sliders */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {['energy', 'warmth', 'sophistication'].map(key => (
                                <div key={key} className="space-y-3 text-left">
                                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        <span>{key}</span>
                                        <span>{(intensities as any)[key]}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        className="w-full accent-primary h-1.5 bg-accent rounded-full appearance-none cursor-pointer"
                                        value={(intensities as any)[key]}
                                        onChange={(e) => setIntensities({ ...intensities, [key]: parseInt(e.target.value) })}
                                    />
                                </div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            className="rounded-full w-full py-8 text-xl font-black gap-3"
                            onClick={handleOrchestrate}
                            disabled={!promptSubject || isGenerating}
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" /> : <ChevronRight size={24} />} ORCHESTRATE DNA
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
