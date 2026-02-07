import React, { useState } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, RefreshCw, Zap, ChevronRight, Wand2, Check, Layers, Play, Sparkles, Sliders, Monitor, Cpu, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { ModelSelectorButton } from '@/components/ai/ModelSelector';
import { BrandProfile, GeneratedAsset, PromptHistoryItem, AssetType } from '@/types';
import { ASSET_TYPES } from '@/constants';
import { generateBrandAlignedPrompt, generateImage, auditCompliance } from '@/services/ai.service';
import { generateId } from '@/utils';
import AIPromptGenerator from './AIPromptGenerator';

interface StudioViewProps {
    brand: BrandProfile;
    onAssetGenerated: (asset: GeneratedAsset) => void;
    promptHistory: PromptHistoryItem[];
    onUpdateHistory: (history: PromptHistoryItem[]) => void;
    initialContext?: { subject: string, feedback: string } | null;
}

interface BatchItem {
    type: AssetType;
    orchestratedPrompt: string;
    status: 'pending' | 'orchestrating' | 'rendering' | 'auditing' | 'complete' | 'failed';
    result?: GeneratedAsset;
}

interface IntensityMatrixProps {
    intensities: { energy: number; warmth: number; sophistication: number };
    onChange: (key: string, value: number) => void;
}

const IntensityMatrix = React.memo<IntensityMatrixProps>(({ intensities, onChange }) => {
    return (
        <div className="grid grid-cols-1 gap-14 relative">
            <div className="absolute inset-y-0 left-0 w-[1px] bg-border/20" />
            {['energy', 'warmth', 'sophistication'].map(key => (
                <div key={key} className="space-y-6 relative pl-6">
                    <div className="absolute left-0 top-1.5 w-1.5 h-[1px] bg-primary/50" />
                    <div className="flex justify-between items-end">
                        <span className="flex items-center gap-3 text-[10px] font-mono font-black text-foreground/80 uppercase tracking-[0.2em]">
                            {key === 'energy' && <Zap size={14} className="text-primary" />}
                            {key === 'warmth' && <Monitor size={14} className="text-primary" />}
                            {key === 'sophistication' && <Cpu size={14} className="text-primary" />}
                            {key}
                        </span>
                        <div className="flex items-baseline gap-1 font-mono text-primary">
                            <span className="text-xl font-bold">{(intensities as any)[key]}</span>
                            <span className="text-[9px] opacity-60">/ 100</span>
                        </div>
                    </div>

                    <div className="relative h-8 group">
                        {/* Track */}
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-muted/30 -translate-y-1/2 overflow-hidden">
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_5px)] text-muted-foreground/10" />
                        </div>
                        <div className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 transition-all" style={{ width: `${(intensities as any)[key]}%` }} />

                        {/* Thumb */}
                        <input
                            type="range"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            value={(intensities as any)[key]}
                            onChange={(e) => onChange(key, parseInt(e.target.value))}
                        />
                        <div
                            className="absolute top-1/2 w-4 h-6 bg-background border border-primary z-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                            style={{ left: `${(intensities as any)[key]}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary -translate-x-1/2 -translate-y-1/2 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

export const StudioView = React.memo<StudioViewProps>(({
    brand,
    onAssetGenerated,
    promptHistory,
    onUpdateHistory,
    initialContext
}) => {
    const { userRole } = useAuth();
    const [selectedAssetTypes, setSelectedAssetTypes] = useState<AssetType[]>([]);
    const [promptSubject, setPromptSubject] = useState(initialContext?.subject || '');
    const [intensities, setIntensities] = useState({ energy: 50, warmth: 30, sophistication: 80 });
    const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [view, setView] = useState<'selection' | 'parameters' | 'batch_review'>('selection');
    const [refinementFeedback, setRefinementFeedback] = useState(initialContext?.feedback || '');
    const [showAIGenerator, setShowAIGenerator] = useState(false);

    const handleIntensityChange = (key: string, value: number) => {
        setIntensities(prev => ({ ...prev, [key]: value }));
    };

    React.useEffect(() => {
        if (initialContext?.subject) {
            setPromptSubject(initialContext.subject);
            setRefinementFeedback(initialContext.feedback);
        }
    }, [initialContext]);

    const toggleAssetType = (type: AssetType) => {
        setSelectedAssetTypes(prev =>
            prev.find(t => t.id === type.id)
                ? prev.filter(t => t.id !== type.id)
                : [...prev, type]
        );
    };

    const handleStartOrchestration = async () => {
        if (!promptSubject || selectedAssetTypes.length === 0) return;

        const initialBatch: BatchItem[] = selectedAssetTypes.map(type => ({
            type,
            orchestratedPrompt: '',
            status: 'pending'
        }));

        setBatchItems(initialBatch);
        setView('batch_review');
        setIsGenerating(true);

        try {
            for (let i = 0; i < initialBatch.length; i++) {
                setBatchItems(prev => prev.map((item, idx) =>
                    idx === i ? { ...item, status: 'orchestrating' } : item
                ));

                const refined = await generateBrandAlignedPrompt(
                    promptSubject,
                    brand,
                    intensities,
                    initialBatch[i].type.label,
                    refinementFeedback || initialContext?.feedback
                );

                setBatchItems(prev => prev.map((item, idx) =>
                    idx === i ? { ...item, orchestratedPrompt: refined, status: 'complete' } : item
                ));

                if (i === 0) {
                    const newHistoryItem: PromptHistoryItem = {
                        id: generateId(),
                        subject: promptSubject,
                        orchestrated: refined,
                        brandId: brand.id,
                        timestamp: Date.now()
                    };
                    onUpdateHistory([newHistoryItem, ...promptHistory].slice(0, 30));
                }
            }
            toast.success('Batch Creation Matrix Complete');
        } catch (err) {
            console.error(err);
            toast.error('Batch Synthesis Failed');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRunBatchRender = async () => {
        setIsGenerating(true);
        try {
            for (let i = 0; i < batchItems.length; i++) {
                const item = batchItems[i];
                if (item.status === 'failed' || item.result) continue;

                setBatchItems(prev => prev.map((it, idx) =>
                    idx === i ? { ...it, status: 'rendering' } : it
                ));

                const imageUrl = await generateImage(item.orchestratedPrompt, item.type.aspectRatio);

                if (imageUrl) {
                    setBatchItems(prev => prev.map((it, idx) =>
                        idx === i ? { ...it, status: 'auditing' } : it
                    ));

                    const audit = await auditCompliance(imageUrl, brand);
                    const newAsset: GeneratedAsset = {
                        id: generateId(),
                        url: imageUrl,
                        prompt: item.orchestratedPrompt,
                        subject: promptSubject,
                        assetType: item.type.id,
                        complianceScore: Math.round((audit.colorMatch + audit.spatialCompliance + audit.vibeCheck) / 3),
                        brandId: brand.id,
                        timestamp: Date.now(),
                        auditDetails: audit
                    };

                    onAssetGenerated(newAsset);

                    setBatchItems(prev => prev.map((it, idx) =>
                        idx === i ? { ...it, status: 'complete', result: newAsset } : it
                    ));
                } else {
                    setBatchItems(prev => prev.map((it, idx) =>
                        idx === i ? { ...it, status: 'failed' } : it
                    ));
                }
            }
            toast.success('Batch Rendering Sequence Finished');
        } catch (err) {
            console.error(err);
            toast.error('Batch Render Interrupted');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="space-y-0 w-full relative antialiased"
        >
            <ViewHeader
                icon={Layers}
                title={brand.name}
                subtitle="Studio"
                badge="Creative Engine"
                rightContent={
                    <>
                        <div className="text-right hidden md:block">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Synthesis Authorization</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Channel Active</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Engine Latency</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase">12ms // Cluster_A</p>
                        </div>
                    </>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                {initialContext && (
                    <div className="sticky top-0 z-50 -mt-6 -mx-6 px-6 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border flex items-center justify-between animate-in slide-in-from-top duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-sm bg-primary/20 flex items-center justify-center text-primary shadow-sm">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <h3 className="text-[12px] font-medium text-foreground">Refinement Protocol</h3>
                                <p className="text-[11px] text-muted-foreground font-normal opacity-80">Optimizing asset synthesis</p>
                            </div>
                        </div>
                        <div className="flex-1 max-w-lg mx-6">
                            <div className="relative group">
                                <Input
                                    value={refinementFeedback}
                                    onChange={(e) => setRefinementFeedback(e.target.value)}
                                    className="bg-muted/40 border-border focus-visible:border-primary text-[12px] h-8 px-3 rounded-sm font-medium pr-8"
                                    placeholder="Refinement instructions..."
                                />
                                <Wand2 size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                            </div>
                        </div>
                    </div>
                )}
                {view === 'selection' && (
                    <div className="flex-1 flex flex-col justify-center items-center py-6 text-center px-4 max-w-5xl mx-auto w-full">
                        <div className="mb-8 space-y-2">
                            <div className="flex justify-center mb-6 gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-none">
                                    <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                                    <span className="text-[9px] font-mono font-bold text-primary tracking-[0.2em] uppercase">Phase 01: Target Selection</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-muted/10 border border-border/40 rounded-none relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.03)_3px)] opacity-50" />
                                    <span className="text-[9px] font-mono font-bold text-muted-foreground tracking-[0.2em] uppercase relative z-10">Operator: {userRole}</span>
                                </div>
                            </div>
                            <div className="h-4" />
                        </div>

                        <div className="flex justify-between items-center w-full max-w-5xl mb-6 px-4">
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedAssetTypes(ASSET_TYPES)}
                                    className="text-[11px] font-medium text-muted-foreground hover:text-primary rounded-sm h-8"
                                >
                                    <Check size={14} className="mr-1.5" /> Select All
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedAssetTypes([])}
                                    disabled={selectedAssetTypes.length === 0}
                                    className="text-[11px] font-medium text-muted-foreground hover:text-destructive transition-colors rounded-sm h-8"
                                >
                                    <RefreshCw size={12} className="mr-1.5" /> Clear
                                </Button>
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground/80">
                                {selectedAssetTypes.length} Selected
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mb-24 max-w-7xl">
                            {ASSET_TYPES.map(type => {
                                const isSelected = selectedAssetTypes.find(t => t.id === type.id);
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => toggleAssetType(type)}
                                        className={`group relative transition-all duration-300 flex flex-col items-center gap-6 text-center p-8 rounded-none overflow-hidden h-64 justify-center ${isSelected
                                            ? 'bg-primary/5 shadow-[inset_0_0_40px_rgba(var(--primary-rgb),0.1)]'
                                            : 'bg-card/20 hover:bg-primary/[0.02]'
                                            }`}
                                    >
                                        {/* HUD Corner Markers */}
                                        <div className={`absolute top-0 left-0 w-3 h-3 border-l file:border-t border-primary/30 transition-all duration-300 ${isSelected ? 'w-full h-full border-primary/50' : 'group-hover:border-primary/80 group-hover:w-4 group-hover:h-4'}`} style={{ clipPath: isSelected ? 'none' : 'polygon(0 0, 0 100%, 1px 100%, 1px 1px, 100% 1px, 100% 0)' }} />
                                        <div className={`absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />
                                        <div className={`absolute top-0 right-0 w-3 h-3 border-r border-t border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />
                                        <div className={`absolute bottom-0 left-0 w-3 h-3 border-l border-b border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />
                                        <div className={`absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />

                                        {/* Selection Scanline */}
                                        {isSelected && (
                                            <div className="absolute inset-x-0 top-0 h-[1px] bg-primary shadow-[0_0_10px_#00ff00] animate-[scan_2s_ease-in-out_infinite]" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-[-200%] group-hover:translate-y-[200%] transition-transform duration-1000" />

                                        <div className={`w-16 h-16 flex items-center justify-center transition-all duration-500 relative ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            <div className={`absolute inset-0 border border-primary/20 rotate-45 transition-all duration-700 ${isSelected ? 'scale-100 opacity-100 rotate-90' : 'scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`} />
                                            <type.icon size={28} strokeWidth={1} className={`relative z-10 transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                                        </div>

                                        <div className="space-y-3 relative z-10">
                                            <h4 className={`font-mono font-black text-[12px] tracking-[0.2em] uppercase transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                                {type.label}
                                            </h4>
                                            <div className="flex items-center justify-center gap-2 opacity-60">
                                                <span className="w-1 h-1 bg-primary/50 rounded-full" />
                                                <p className="text-[9px] text-muted-foreground font-mono tracking-widest uppercase">
                                                    {type.aspectRatio}
                                                </p>
                                                <span className="w-1 h-1 bg-primary/50 rounded-full" />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Static Action Bar */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
                            className="w-full max-w-xl px-4 mt-12 mb-12"
                        >
                            <div className="p-1 px-1 rounded-none bg-background/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-1 group/bar">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowAIGenerator(!showAIGenerator)}
                                    className="flex-1 rounded-none h-14 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden group/btn"
                                >
                                    <div className="flex items-center gap-2 relative z-10">
                                        <Wand2 size={14} className="text-primary group-hover/btn:animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Auto-Select</span>
                                    </div>
                                    <span className="text-[7px] font-mono text-muted-foreground/40 mt-1 uppercase tracking-widest group-hover/btn:text-primary transition-colors">OS_LAYER_SYNTH_04</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={selectedAssetTypes.length === 0}
                                    onClick={() => setView('parameters')}
                                    className="flex-[2] rounded-none h-14 bg-primary text-primary-foreground flex flex-col items-center justify-center relative overflow-hidden disabled:opacity-50 disabled:grayscale group/init"
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
                                    <div className="flex items-center gap-3 relative z-10 px-6">
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Initialize Protocol</span>
                                        <ChevronRight size={16} className="group-hover/init:translate-x-1 transition-transform" />
                                    </div>
                                    <span className="text-[7px] font-mono text-black/40 mt-0.5 uppercase tracking-widest relative z-10">ENCRYPT_HANDSHAKE_READY</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {view === 'parameters' && (
                    <div className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full space-y-8 px-4 animate-in slide-in-from-right duration-500 py-6">
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" onClick={() => setView('selection')} className="text-[12px] font-medium text-muted-foreground hover:text-foreground h-8 rounded-sm">
                                <ArrowLeft size={14} className="mr-2" /> Back
                            </Button>
                            <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-sm text-[10px] font-medium text-primary uppercase tracking-wide">
                                Phase 02: Asset Synthesis
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left: Input & Subject (7 cols) */}
                            <div className="lg:col-span-7 space-y-8">
                                <div className="space-y-4">
                                    <div className="h-4" />
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAssetTypes.map(t => (
                                            <span key={t.id} className="px-2 py-1 bg-muted/30 border border-border rounded-sm text-[10px] font-mono text-muted-foreground uppercase">
                                                {t.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Card className="p-10 bg-card/40 border-border/60 space-y-10 rounded-none backdrop-blur-sm shadow-2xl">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-none shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                                            <label className="text-[10px] font-mono font-black text-primary/40 uppercase tracking-[0.3em]">Creative Subject Axis</label>
                                        </div>
                                        <div className="relative group">
                                            <Input
                                                placeholder="ENTER SYNTHESIS TARGET..."
                                                className="h-16 text-xl font-display font-black border-border/40 bg-card/60 focus-visible:border-primary transition-all px-6 rounded-none tracking-tight uppercase"
                                                value={promptSubject}
                                                onChange={(e) => setPromptSubject(e.target.value)}
                                            />
                                            <Wand2 className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within:text-primary transition-all group-focus-within:scale-110" size={24} />
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-none bg-primary/[0.03] border-l-4 border-primary/40 flex items-start gap-6 shadow-xl">
                                        <div className="p-3 bg-primary/10 border border-primary/20 text-primary">
                                            <Sparkles size={20} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">Active Doctrine Source</h3>
                                            <p className="text-[13px] font-mono font-bold text-muted-foreground leading-relaxed italic opacity-80">
                                                "{brand.doctrine}"
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Right: Parameters & Action (5 cols) */}
                            <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                                <Card className="p-10 bg-card/40 border-border/60 space-y-10 rounded-none backdrop-blur-sm shadow-2xl">
                                    <div className="flex items-center gap-4 text-foreground mb-4">
                                        <div className="p-2 bg-primary/10 border border-primary/20 text-primary">
                                            <Sliders size={18} />
                                        </div>
                                        <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.3em]">Intensity Matrix</h3>
                                    </div>

                                    <IntensityMatrix
                                        intensities={intensities}
                                        onChange={handleIntensityChange}
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="rounded-none w-full h-20 text-sm font-mono font-black uppercase tracking-[0.4em] shadow-[0_10px_40px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_15px_60px_rgba(var(--primary-rgb),0.5)] transition-all bg-primary text-primary-foreground relative overflow-hidden group/synth"
                                        onClick={handleStartOrchestration}
                                        disabled={!promptSubject || isGenerating}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full group-hover/synth:translate-x-full transition-transform duration-1000" />
                                        <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                                            <div className="flex items-center gap-3">
                                                {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Layers size={22} className="group-hover/synth:rotate-12 transition-transform" />}
                                                <span>Start Batch Synthesis</span>
                                            </div>
                                            <span className="text-[8px] opacity-40 tracking-[0.5em] font-mono mt-1">SYST_PROC_ALGO_BETA_9</span>
                                        </div>
                                    </motion.button>
                                </Card>

                                <div className="p-8 rounded-none bg-primary/[0.02] border border-primary/20 flex items-center gap-6 shadow-lg relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    <div className="w-12 h-12 border border-primary/20 flex items-center justify-center bg-card shadow-inner">
                                        <Cpu size={24} className="text-primary opacity-40 animate-pulse" strokeWidth={1} />
                                    </div>
                                    <p className="text-[11px] font-mono font-black text-primary leading-relaxed opacity-90 uppercase tracking-widest">
                                        Orchestration will generate {selectedAssetTypes.length} unique nodes tailored to the active brand manifold.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'batch_review' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500 max-w-[1400px] mx-auto w-full px-4 py-6">
                        <div className="flex items-center justify-between border-b border-border pb-6">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" onClick={() => setView('parameters')} disabled={isGenerating} className="text-[12px] font-medium h-8 rounded-sm">
                                    <ArrowLeft size={14} className="mr-2" /> Back
                                </Button>
                                <div>
                                    <h2 className="text-[20px] font-medium tracking-tight text-foreground">Batch Matrix</h2>
                                    <p className="text-[12px] text-muted-foreground font-normal">Reviewing {batchItems.length} parallel threads</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-muted/30 border border-border text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                                    <Monitor size={12} /> GPU Cluster: Ready
                                </div>
                                <ModelSelectorButton />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {batchItems.map((item, idx) => (
                                <Card key={idx} className={`p-5 border-border bg-card transition-all relative overflow-hidden group rounded-sm ${item.status === 'orchestrating' ? 'ring-1 ring-primary/50' : ''}`}>
                                    {item.status === 'complete' && !item.result && (
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 blur-2xl rounded-full -mr-6 -mt-6" />
                                    )}
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-primary/10 rounded-none text-primary border border-primary/20">
                                                <item.type.icon size={12} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">{item.type.label}</h4>
                                                <p className="text-[9px] text-muted-foreground opacity-60 font-mono tracking-widest">PID: {generateId().slice(0, 4).toUpperCase()} // {item.type.aspectRatio}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 px-2 py-1 bg-background/50 rounded-full border border-border/50">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'complete' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                                item.status === 'failed' ? 'bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                                    item.status === 'pending' ? 'bg-muted-foreground' :
                                                        'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                                }`} />
                                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="h-32 bg-black/40 border border-border/40 rounded-none p-4 overflow-hidden relative group-hover:bg-black/50 transition-colors font-mono text-[10px]">
                                        {/* Scanline overlay */}
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.03)_2px)] pointer-events-none" />

                                        {item.status === 'orchestrating' ? (
                                            <div className="flex flex-col items-center justify-center h-full gap-4">
                                                <div className="w-full max-w-[80%] space-y-2">
                                                    <div className="flex justify-between text-[9px] text-muted-foreground uppercase tracking-widest">
                                                        <span>Synthesizing</span>
                                                        <span>42%</span>
                                                    </div>
                                                    <div className="h-0.5 w-full bg-muted/20 relative overflow-hidden">
                                                        <div className="absolute inset-y-0 left-0 bg-primary w-1/2 animate-[shimmer_1s_infinite]" />
                                                    </div>
                                                </div>
                                                <p className="text-[9px] text-primary/60 animate-pulse">Running Neural Handshake...</p>
                                            </div>
                                        ) : (
                                            <Textarea
                                                className="bg-transparent border-none p-0 focus-visible:ring-0 text-[10px] leading-relaxed h-full resize-none font-mono text-muted-foreground/80 hover:text-primary/90 transition-colors selection:bg-primary/20 placeholder:text-muted-foreground/20"
                                                value={item.orchestratedPrompt}
                                                onChange={(e) => {
                                                    const newBatch = [...batchItems];
                                                    newBatch[idx].orchestratedPrompt = e.target.value;
                                                    setBatchItems(newBatch);
                                                }}
                                                placeholder="// AWAITING_INPUT_SIGNAL..."
                                                rows={3}
                                            />
                                        )}
                                    </div>

                                    {item.result && (
                                        <div className="mt-5 aspect-video rounded-sm overflow-hidden border border-border group/img relative shadow-sm">
                                            <img src={item.result.url} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                                            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md border border-border px-2 py-1 rounded-sm text-[9px] font-medium text-primary shadow-sm">
                                                {item.result.complianceScore}% DNA MATCH
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-full max-w-md px-4 mx-auto mt-12 mb-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-none w-full py-6 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] bg-primary text-primary-foreground border border-white/20 transition-all h-20 uppercase relative overflow-hidden group/exec"
                                onClick={handleRunBatchRender}
                                disabled={isGenerating || batchItems.some(item => !item.orchestratedPrompt)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/exec:translate-x-full transition-transform duration-1000" />
                                <div className="flex flex-col items-center justify-center relative z-10">
                                    <div className="flex items-center gap-4">
                                        {isGenerating ? (
                                            <>
                                                <RefreshCw size={24} className="animate-spin" />
                                                <span className="text-sm font-black tracking-[0.3em]">Executing Seq...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Play size={20} className="fill-current group-hover/exec:scale-110 transition-transform" />
                                                <span className="text-sm font-black tracking-[0.4em]">Execute Render Matrix</span>
                                            </>
                                        )}
                                    </div>
                                    <span className="text-[8px] font-mono opacity-40 mt-1 tracking-[0.5em]">AUTH_KEY_VERIFIED // NO_FAIL_MODE</span>
                                </div>
                            </motion.button>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
});
