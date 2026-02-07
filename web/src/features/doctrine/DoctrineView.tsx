import React, { useRef, useState } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import {
    Palette,
    Plus,
    X,
    RefreshCw,
    ScanLine,
    Sparkles,
    Terminal,
    Binary,
    ArrowDownCircle,
    Trash2,
    Cpu,
    MessageSquare,
    Ruler,
    Info,
    Eye,
    ArrowRight,
    Heart,
    Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, Input } from '@/components/ui';
import { NegativeSpaceVisualizer, Tooltip, ReferenceAnalysisModal } from '@/components/brand';
import { BrandProfile, BrandColor, GrammarRule } from '@/types';
import { generateId } from '@/utils';
import { analyzeReferenceAsset } from '@/services/gemini.service';
import { fileToBase64 } from '@/utils';
import { DoctrineWizard } from './DoctrineWizard';

interface DoctrineViewProps {
    brand: BrandProfile;
    onUpdateBrand: (brand: BrandProfile) => void;
}

export const DoctrineView = React.memo<DoctrineViewProps>(({ brand, onUpdateBrand }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAnalyzingReference, setIsAnalyzingReference] = useState(false);
    const [analysisModalOpen, setAnalysisModalOpen] = useState(false);
    const [extractedData, setExtractedData] = useState<any>(null);
    const [showWizard, setShowWizard] = useState(true); // Toggle between wizard and advanced

    const handleUpdateColor = (id: string, updates: Partial<BrandColor>) => {
        onUpdateBrand({ ...brand, palette: brand.palette.map(c => c.id === id ? { ...c, ...updates } : c) });
    };

    const handleAddColor = () => {
        if (brand.palette.length >= 8) return;
        const newColor: BrandColor = { id: generateId(), label: `Swatch ${brand.palette.length + 1}`, hex: '#10b981' };
        onUpdateBrand({ ...brand, palette: [...brand.palette, newColor] });
    };

    const handleRemoveColor = (id: string) => {
        if (brand.palette.length <= 1) return;
        onUpdateBrand({ ...brand, palette: brand.palette.filter(c => c.id !== id) });
    };

    const handleAddGrammarRule = () => {
        const newRule: GrammarRule = { id: generateId(), condition: "", directive: "" };
        onUpdateBrand({ ...brand, grammarRules: [...(brand.grammarRules || []), newRule] });
    };

    const handleUpdateGrammarRule = (id: string, updates: Partial<GrammarRule>) => {
        onUpdateBrand({ ...brand, grammarRules: (brand.grammarRules || []).map(r => r.id === id ? { ...r, ...updates } : r) });
    };

    const handleRemoveGrammarRule = (id: string) => {
        onUpdateBrand({ ...brand, grammarRules: (brand.grammarRules || []).filter(r => r.id !== id) });
    };

    const handleReferenceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsAnalyzingReference(true);
        try {
            const base64Data = await fileToBase64(file);
            const extracted = await analyzeReferenceAsset(base64Data);

            if (
                extracted.palette ||
                extracted.extractedPatterns ||
                extracted.stylisticSignatures ||
                extracted.typography ||
                extracted.lighting ||
                extracted.grid
            ) {
                setExtractedData(extracted);
                setAnalysisModalOpen(true);
            }
        } catch (error) {
            console.error('Reference analysis failed:', error);
        } finally {
            setIsAnalyzingReference(false);
        }
    };

    const handleApplySelectedDNA = (updates: Partial<BrandProfile>) => {
        onUpdateBrand({ ...brand, ...updates });
        setExtractedData(null);
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
                icon={Terminal}
                title={brand.name}
                subtitle="Brand Doctrine"
                badge="Source Protocol"
                rightContent={
                    <>
                        <button
                            onClick={() => setShowWizard(!showWizard)}
                            className="flex flex-col items-end group/btn"
                        >
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1 group-hover/btn:text-primary transition-colors">Interface Mode</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase border-b border-primary/20 pb-0.5">
                                {showWizard ? 'GUIDED_WIZARD' : 'ADVANCED_TERMINAL'}
                            </p>
                        </button>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Logic Status</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Verified</p>
                            </div>
                        </div>
                    </>
                }
            />

            <ReferenceAnalysisModal
                isOpen={analysisModalOpen}
                onClose={() => setAnalysisModalOpen(false)}
                extractedData={extractedData || {}}
                currentBrand={brand}
                onApplySelected={handleApplySelectedDNA}
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                {showWizard ? (
                    <DoctrineWizard brand={brand} onUpdateBrand={onUpdateBrand} />
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                        <div className="xl:col-span-3 space-y-12">
                            {/* Color Swatches */}
                            <Card className="p-10 bg-card border-border/60 rounded-none shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.02] text-primary group-hover:opacity-[0.05] transition-opacity">
                                    <Palette size={96} strokeWidth={0.5} />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 pb-6 border-b border-border/10 border-dashed relative z-10">
                                    <div>
                                        <h3 className="text-[14px] font-mono font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Palette size={18} className="text-primary" /> Chromatic Matrix
                                        </h3>
                                        <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mt-1">Foundational Brand Swatches</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-mono font-black text-primary/40 uppercase tracking-widest">{brand.palette.length} / 8 SLOTS</span>
                                        {brand.palette.length < 8 && (
                                            <Button onClick={handleAddColor} variant="secondary" size="sm" className="h-9 px-4 rounded-none border-primary/20 hover:bg-primary/5 text-[10px] font-mono font-black uppercase tracking-widest shadow-lg">
                                                <Plus size={14} className="mr-2" /> Add Swatch
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6 relative z-10">
                                    {brand.palette.map(c => (
                                        <div key={c.id} className="space-y-3 group/swatch">
                                            <div className="aspect-square relative flex items-center justify-center bg-muted/10 border border-border/40 group-hover/swatch:border-primary/40 transition-all shadow-inner overflow-hidden">
                                                <input
                                                    type="color"
                                                    value={c.hex}
                                                    onChange={(e) => handleUpdateColor(c.id, { hex: e.target.value })}
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                                                />
                                                <div className="w-full h-full transform group-hover/swatch:scale-110 transition-transform duration-700" style={{ backgroundColor: c.hex }} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/swatch:opacity-100 transition-opacity" />

                                                <button
                                                    onClick={() => handleRemoveColor(c.id)}
                                                    className="absolute top-1 right-1 p-1 bg-destructive/80 text-white rounded-none opacity-0 group-hover/swatch:opacity-100 transition-all z-30 hover:bg-destructive"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono font-black text-foreground/80 uppercase tracking-tighter truncate">{c.label}</p>
                                                <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest mt-0.5">{c.hex.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* AI Directives Section */}
                            <div className="space-y-10">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-4">
                                    <div>
                                        <h3 className="text-[14px] font-mono font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Binary size={18} className="text-primary" /> Logic Schematics
                                        </h3>
                                        <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mt-1">Generative Grammar Nodes</p>
                                    </div>
                                    <Button onClick={handleAddGrammarRule} className="h-11 px-8 rounded-none bg-primary text-[10px] font-mono font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                                        <Plus size={16} className="mr-3" /> Insert Logic Node
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                                    {(brand.grammarRules || []).length === 0 ? (
                                        <div className="md:col-span-2 py-32 border border-dashed border-border/20 rounded-none bg-card/40 flex flex-col items-center justify-center opacity-40">
                                            <Binary size={48} className="mb-6 opacity-20" strokeWidth={1} />
                                            <h3 className="text-sm font-mono font-black uppercase tracking-[0.3em]">No Active Nodes</h3>
                                            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-2 text-center max-w-xs leading-relaxed">
                                                The neural core requires logical constraints to maintain brand integrity during synthesis.
                                            </p>
                                        </div>
                                    ) : (
                                        (brand.grammarRules || []).map((rule) => (
                                            <Card key={rule.id} className="p-8 bg-card border-border/40 hover:border-primary/20 transition-all rounded-none shadow-xl relative group overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 text-muted-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ScanLine size={32} />
                                                </div>

                                                <div className="space-y-10">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center text-[9px] font-black tracking-widest">IF</div>
                                                                <p className="text-[9px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Condition Protocol</p>
                                                            </div>
                                                            <button
                                                                onClick={() => handleRemoveGrammarRule(rule.id)}
                                                                className="p-2 text-muted-foreground/20 hover:text-destructive transition-colors"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                        <Input
                                                            value={rule.condition}
                                                            onChange={(e) => handleUpdateGrammarRule(rule.id, { condition: e.target.value })}
                                                            placeholder="E.G. COMPOSITION_DENSITY > 80%"
                                                            className="bg-muted/5 border-border/20 text-[11px] font-mono font-black h-12 rounded-none focus:border-primary focus:ring-0 placeholder:text-muted-foreground/10 uppercase tracking-widest"
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-center group/arrow">
                                                        <div className="h-px flex-1 bg-border/20 group-hover/arrow:bg-primary/20 transition-colors" />
                                                        <div className="w-10 h-10 border border-border/20 group-hover/arrow:border-primary/20 flex items-center justify-center transition-all bg-card shadow-inner">
                                                            <ArrowDownCircle size={16} className="text-muted-foreground/40 group-hover/arrow:text-primary transition-colors" />
                                                        </div>
                                                        <div className="h-px flex-1 bg-border/20 group-hover/arrow:bg-primary/20 transition-colors" />
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-6 bg-primary text-primary-foreground flex items-center justify-center text-[9px] font-black tracking-widest shadow-lg shadow-primary/20">THEN</div>
                                                            <p className="text-[9px] font-mono font-black text-primary/40 uppercase tracking-[0.2em]">Neural Directive</p>
                                                        </div>
                                                        <Input
                                                            value={rule.directive}
                                                            onChange={(e) => handleUpdateGrammarRule(rule.id, { directive: e.target.value })}
                                                            placeholder="E.G. EXECUTE_SPATIAL_CLEANSE"
                                                            className="bg-primary/[0.03] border-primary/10 text-[11px] font-mono font-black h-12 rounded-none text-primary focus:border-primary focus:ring-0 placeholder:text-primary/10 tracking-widest uppercase shadow-inner"
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Spatial Tension Sidebar */}
                        <div className="space-y-8">
                            <Card className="p-10 bg-card/60 backdrop-blur-md border border-border/60 rounded-none shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.02] text-primary group-hover:opacity-[0.05] transition-opacity">
                                    <Ruler size={96} strokeWidth={0.5} />
                                </div>

                                <div className="space-y-10 relative z-10">
                                    <div className="flex items-center justify-between gap-4 pb-6 border-b border-border/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                                                <Ruler size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-mono font-black text-foreground uppercase tracking-[0.3em]">Spatial Flux</h4>
                                                <p className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest mt-1">Empty Space Protocol</p>
                                            </div>
                                        </div>
                                        <span className="text-3xl font-display font-black text-primary tracking-tighter">{brand.negativeSpace}%</span>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="relative pt-6">
                                            <input
                                                type="range" min="10" max="90"
                                                className="w-full h-1.5 bg-muted/20 rounded-none appearance-none cursor-pointer accent-primary"
                                                value={brand.negativeSpace}
                                                onChange={(e) => onUpdateBrand({ ...brand, negativeSpace: parseInt(e.target.value) })}
                                            />
                                            <div className="flex justify-between mt-3 text-[8px] font-mono font-black text-muted-foreground/40 uppercase tracking-widest">
                                                <span>Min Tension</span>
                                                <span>Max Compression</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-center py-6 bg-muted/[0.02] border border-border/10 shadow-inner">
                                            <NegativeSpaceVisualizer percentage={brand.negativeSpace} size="sm" />
                                        </div>

                                        <div className="p-6 bg-primary/[0.02] border border-primary/10 relative group/insight overflow-hidden">
                                            <div className="absolute top-0 left-0 w-[2px] h-full bg-primary/40 group-hover/insight:h-full transition-all" />
                                            <div className="flex items-center gap-3 mb-3">
                                                <Info size={14} className="text-primary" />
                                                <h4 className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-primary">Engine Logic</h4>
                                            </div>
                                            <p className="text-[11px] font-mono text-muted-foreground/60 leading-relaxed uppercase tracking-tight italic">
                                                "MANIPULATING SPATIAL TENSION FORCES THE GENERATIVE ENGINE TO PRIORITIZE VOID OVER CONTENT, AN ESSENTIAL HALLMARK OF HIGH-FIDELITY LUXURY DOCTRINE."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="p-8 border border-border/10 bg-muted/[0.02] rounded-none">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                                    <h4 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-muted-foreground/40">Doctrine Checksum</h4>
                                </div>
                                <p className="text-[10px] font-mono text-muted-foreground/20 uppercase tracking-widest leading-relaxed">
                                    UPDATING DOCTRINE WILL FORCE A GLOBAL RE-SYNTHESIS OF ALL PENDING ASSETS IN THE STUDIO CACHE.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
});
