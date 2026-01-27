import React, { useRef, useState } from 'react';
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
    Info
} from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { NegativeSpaceVisualizer, Tooltip } from '@/components/brand';
import { BrandProfile, BrandColor, GrammarRule } from '@/types';
import { generateId } from '@/utils';
import { analyzeReferenceAsset } from '@/services/gemini.service';
import { fileToBase64 } from '@/utils';

interface DoctrineViewProps {
    brand: BrandProfile;
    onUpdateBrand: (brand: BrandProfile) => void;
}

export const DoctrineView: React.FC<DoctrineViewProps> = ({ brand, onUpdateBrand }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAnalyzingReference, setIsAnalyzingReference] = useState(false);

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

            if (extracted.palette) {
                onUpdateBrand({ ...brand, ...extracted });
            }
        } catch (error) {
            console.error('Reference analysis failed:', error);
        } finally {
            setIsAnalyzingReference(false);
        }
    };

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex items-center justify-between gap-6 flex-wrap border-b border-border pb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Doctrine Configuration</h1>
                    <p className="text-muted-foreground text-sm">Editing <span className="text-primary font-bold">{brand.name}</span> immutable identity.</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} disabled={isAnalyzingReference} variant="outline" className="rounded-full gap-2">
                    {isAnalyzingReference ? <RefreshCw size={16} className="animate-spin" /> : <ScanLine size={16} />} Sync DNA Reference
                </Button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleReferenceUpload} accept="image/*" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 p-8 space-y-10 border-none shadow-none bg-transparent px-0">
                    {/* Color Swatches */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Palette size={16} className="text-primary" /> Color Swatches
                            </h3>
                            <span className="text-[10px] text-muted-foreground">{brand.palette.length} / 8 used</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {brand.palette.map(c => (
                                <div key={c.id} className="relative group">
                                    <div className="aspect-square rounded-lg border border-border shadow-sm mb-2 overflow-hidden bg-card">
                                        <input type="color" value={c.hex} onChange={(e) => handleUpdateColor(c.id, { hex: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                                        <div className="w-full h-full" style={{ backgroundColor: c.hex }} />
                                    </div>
                                    <div className="text-[10px] font-bold truncate text-muted-foreground">{c.label}</div>
                                    <button onClick={() => handleRemoveColor(c.id)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><X size={12} /></button>
                                </div>
                            ))}
                            {brand.palette.length < 8 && (
                                <button onClick={handleAddColor} className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
                                    <Plus size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* AI Directives Section */}
                    <div className="pt-10 border-t border-border space-y-8">
                        <div>
                            <h2 className="text-xl font-display font-bold flex items-center gap-3 mb-2">
                                <Sparkles size={20} className="text-primary" /> AI Directives
                            </h2>
                            <p className="text-sm text-muted-foreground">Define precise instructions for the engine to follow during DNA orchestration.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Terminal size={16} className="text-primary" /> Advanced Brand Grammar
                                </h3>
                                <Button variant="outline" size="sm" onClick={handleAddGrammarRule} className="gap-2">
                                    <Plus size={14} /> Add Logic Node
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {(brand.grammarRules || []).length === 0 ? (
                                    <div className="p-8 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground">
                                        <Binary size={32} className="mx-auto mb-4 opacity-20" />
                                        <p className="text-xs font-bold uppercase tracking-widest">No Logic Nodes Defined</p>
                                    </div>
                                ) : (
                                    (brand.grammarRules || []).map((rule, idx) => (
                                        <div key={rule.id} className="relative group p-6 rounded-xl bg-accent/30 border border-border transition-all hover:border-primary/30">
                                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6">
                                                {/* Logic Box: IF */}
                                                <div className="flex-1 space-y-2 relative">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-black bg-foreground text-background px-2 py-0.5 rounded shadow-sm">IF</span>
                                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Condition Match</label>
                                                    </div>
                                                    <Input
                                                        value={rule.condition}
                                                        placeholder="e.g. subject includes 'event'"
                                                        onChange={(e) => handleUpdateGrammarRule(rule.id, { condition: e.target.value })}
                                                        className="bg-background/50 border-border/50 text-xs h-9 focus-visible:ring-primary"
                                                    />
                                                </div>

                                                {/* Visual Flow Indicator */}
                                                <div className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-2 px-2">
                                                    <div className="w-px h-full md:h-10 bg-gradient-to-b from-foreground/20 to-primary/40 hidden md:block" />
                                                    <div className="relative group">
                                                        <div className="w-8 h-8 rounded-full bg-accent border border-border flex items-center justify-center text-primary shadow-sm z-10 relative">
                                                            <ArrowDownCircle size={16} className="md:rotate-0 -rotate-90" />
                                                        </div>
                                                        <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <div className="w-px h-full md:h-10 bg-gradient-to-t from-primary/40 to-foreground/20 hidden md:block" />
                                                </div>

                                                {/* Logic Box: THEN */}
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-black bg-primary text-primary-foreground px-2 py-0.5 rounded shadow-sm">THEN</span>
                                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Directive Injection</label>
                                                    </div>
                                                    <Input
                                                        value={rule.directive}
                                                        placeholder="e.g. add accent color to typography"
                                                        onChange={(e) => handleUpdateGrammarRule(rule.id, { directive: e.target.value })}
                                                        className="bg-primary/5 border-primary/20 text-xs h-9 text-primary font-medium focus-visible:ring-primary"
                                                    />
                                                </div>

                                                {/* Delete Action */}
                                                <button
                                                    onClick={() => handleRemoveGrammarRule(rule.id)}
                                                    className="p-2 rounded-lg text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all self-center opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            {/* Sub-label Logic Visualization */}
                                            <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-3">
                                                <div className="px-3 py-1 rounded-full bg-background/50 border border-border flex items-center gap-2">
                                                    <Cpu size={12} className="text-primary/50" />
                                                    <span className="text-[9px] font-mono text-muted-foreground">Grammar Logic Node #{idx + 1}</span>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 flex items-center gap-2">
                                                    <MessageSquare size={12} className="text-primary/50" />
                                                    <span className="text-[9px] font-mono text-primary/80">Active In-Prompt</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Spatial Tension Sidebar */}
                <div className="space-y-6">
                    <Card className="p-8 space-y-8 h-fit sticky top-24">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <Tooltip content="Spatial tension defines how much breathing room is in a composition. High tension (80%+) is a hallmark of premium luxury minimalism.">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 cursor-help">
                                        <Ruler size={16} className="text-primary" /> Spatial Tension
                                    </h3>
                                </Tooltip>
                                <span className="text-2xl font-display font-bold text-primary">{brand.negativeSpace}%</span>
                            </div>
                            <input
                                type="range" min="10" max="90"
                                className="w-full h-1.5 bg-accent rounded-full appearance-none cursor-pointer accent-primary"
                                value={brand.negativeSpace}
                                onChange={(e) => onUpdateBrand({ ...brand, negativeSpace: parseInt(e.target.value) })}
                            />
                            <div className="mt-6 flex justify-center">
                                <NegativeSpaceVisualizer percentage={brand.negativeSpace} size="md" />
                            </div>
                        </div>
                        <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Info size={14} />
                                <h4 className="text-[10px] font-bold uppercase tracking-widest">Engine Insight</h4>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">"Manipulating spatial tension forces the generative core to prioritize emptiness, essential for high-fidelity luxury brand doctrine."</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
