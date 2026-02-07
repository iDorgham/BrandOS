import React, { useState } from 'react';
import { X, Check, Eye, EyeOff, Palette, Zap, Target, Sparkles, Terminal } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { BrandProfile, BrandColor } from '@/types';

interface ReferenceAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    extractedData: {
        palette?: BrandColor[];
        background?: string;
        extractedPatterns?: string[];
        stylisticSignatures?: string[];
        moodTags?: string[];
        typography?: { fontFamily: string; weightScale: string[]; letterSpacing: string };
        lighting?: { setup: string; contrastRatio: string; colorTemperature: string };
        grid?: { type: string; gutterRatio: number };
    };
    currentBrand: BrandProfile;
    onApplySelected: (updates: Partial<BrandProfile>) => void;
}

const ReferenceAnalysisModal: React.FC<ReferenceAnalysisModalProps> = ({
    isOpen,
    onClose,
    extractedData,
    currentBrand,
    onApplySelected
}) => {
    const [selectedItems, setSelectedItems] = useState({
        palette: extractedData.palette?.map(c => c.hex) || [],
        background: true,
        extractedPatterns: extractedData.extractedPatterns || [],
        stylisticSignatures: extractedData.stylisticSignatures || [],
        moodTags: extractedData.moodTags || [],
        typography: true,
        lighting: true,
        grid: true
    });

    if (!isOpen) return null;

    const handleApply = () => {
        const updates: Partial<BrandProfile> = {};

        if (selectedItems.palette.length > 0 && extractedData.palette) {
            const selectedPalette = extractedData.palette.filter(c => selectedItems.palette.includes(c.hex));
            updates.palette = [...currentBrand.palette.slice(0, 2), ...selectedPalette].slice(0, 8);
        }
        if (selectedItems.background && extractedData.background) {
            updates.background = extractedData.background;
        }
        if (selectedItems.extractedPatterns.length > 0) {
            updates.extractedPatterns = [...(currentBrand.extractedPatterns || []), ...selectedItems.extractedPatterns];
        }
        if (selectedItems.stylisticSignatures.length > 0) {
            updates.stylisticSignatures = [...(currentBrand.stylisticSignatures || []), ...selectedItems.stylisticSignatures];
        }
        if (selectedItems.moodTags.length > 0) {
            updates.emotionalTags = [...currentBrand.emotionalTags, ...selectedItems.moodTags];
        }
        if (selectedItems.typography && extractedData.typography) {
            updates.typography = extractedData.typography;
        }
        if (selectedItems.lighting && extractedData.lighting) {
            updates.lighting = extractedData.lighting as any;
        }
        if (selectedItems.grid && extractedData.grid) {
            updates.grid = extractedData.grid as any;
        }

        onApplySelected(updates);
        onClose();
    };

    const toggleItem = (category: keyof typeof selectedItems, value: string | boolean) => {
        setSelectedItems(prev => {
            if (typeof value === 'boolean') {
                return { ...prev, [category]: !prev[category] };
            }
            const currentList = prev[category] as string[];
            const newList = currentList.includes(value)
                ? currentList.filter(v => v !== value)
                : [...currentList, value];
            return { ...prev, [category]: newList };
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl bg-card border border-border">
                {/* Header */}
                <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-display font-black flex items-center gap-3">
                            <Eye className="text-primary" /> DNA Analysis Results
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Select which traits to import into {currentBrand.name}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                    {/* Color Palette */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                            <div className="flex items-center gap-3">
                                <Palette size={18} className="text-primary" />
                                <div>
                                    <h4 className="font-bold text-sm">Color Palette</h4>
                                    <p className="text-xs text-muted-foreground">Select individual colors to import</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                {selectedItems.palette.length} Selected
                            </div>
                        </div>

                        {extractedData.palette && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-4 bg-background/50 rounded-lg border border-border/50">
                                {extractedData.palette.map(color => {
                                    const isSelected = selectedItems.palette.includes(color.hex);
                                    return (
                                        <button
                                            key={color.hex}
                                            onClick={() => toggleItem('palette', color.hex)}
                                            className={`group relative space-y-1 text-left transition-all ${isSelected ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
                                        >
                                            <div
                                                className={`aspect-square rounded-lg border-2 shadow-sm transition-all ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
                                                style={{ backgroundColor: color.hex }}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                                        <Check size={10} className="text-primary-foreground font-black" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[9px] text-center text-muted-foreground truncate font-bold uppercase">{color.label}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Background Color */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                            <div className="flex items-center gap-3">
                                <Target size={18} className="text-primary" />
                                <div>
                                    <h4 className="font-bold text-sm">Background Color</h4>
                                    <p className="text-xs text-muted-foreground">Primary canvas background</p>
                                </div>
                            </div>
                            <Button
                                variant={selectedItems.background ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleItem('background', !selectedItems.background)}
                                className="gap-2"
                            >
                                {selectedItems.background ? <Check size={14} /> : <EyeOff size={14} />}
                                {selectedItems.background ? "Selected" : "Select"}
                            </Button>
                        </div>

                        {selectedItems.background && extractedData.background && (
                            <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/50">
                                <div
                                    className="w-16 h-16 rounded-lg border border-border shadow-sm"
                                    style={{ backgroundColor: extractedData.background }}
                                />
                                <div>
                                    <p className="text-sm font-mono font-bold">{extractedData.background.toUpperCase()}</p>
                                    <p className="text-xs text-muted-foreground">Extracted background</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Compositional Patterns */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                            <div className="flex items-center gap-3">
                                <Zap size={18} className="text-primary" />
                                <div>
                                    <h4 className="font-bold text-sm">Compositional Patterns</h4>
                                    <p className="text-xs text-muted-foreground">Toggle specific spatial rules</p>
                                </div>
                            </div>
                        </div>

                        {extractedData.extractedPatterns && (
                            <div className="space-y-2 p-2 bg-background/50 rounded-lg border border-border/50">
                                {extractedData.extractedPatterns.map((pattern, index) => {
                                    const isSelected = selectedItems.extractedPatterns.includes(pattern);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => toggleItem('extractedPatterns', pattern)}
                                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${isSelected ? 'bg-primary/5 border-primary/20 text-foreground' : 'bg-transparent border-transparent text-muted-foreground opacity-50'}`}
                                        >
                                            <div className="flex items-center gap-3 text-sm font-medium">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-muted-foreground'}`} />
                                                {pattern}
                                            </div>
                                            {isSelected ? <Check size={14} className="text-primary" /> : <div className="w-3.5 h-3.5 border border-muted-foreground/30 rounded" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Stylistic Signatures */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                            <div className="flex items-center gap-3">
                                <Sparkles size={18} className="text-primary" />
                                <div>
                                    <h4 className="font-bold text-sm">Stylistic Signatures</h4>
                                    <p className="text-xs text-muted-foreground">Artistic characteristics to adopt</p>
                                </div>
                            </div>
                        </div>

                        {extractedData.stylisticSignatures && (
                            <div className="space-y-2 p-2 bg-background/50 rounded-lg border border-border/50">
                                {extractedData.stylisticSignatures.map((signature, index) => {
                                    const isSelected = selectedItems.stylisticSignatures.includes(signature);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => toggleItem('stylisticSignatures', signature)}
                                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${isSelected ? 'bg-primary/5 border-primary/20 text-foreground' : 'bg-transparent border-transparent text-muted-foreground opacity-50'}`}
                                        >
                                            <div className="flex items-center gap-3 text-sm font-medium">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-muted-foreground'}`} />
                                                {signature}
                                            </div>
                                            {isSelected ? <Check size={14} className="text-primary" /> : <div className="w-3.5 h-3.5 border border-muted-foreground/30 rounded" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Typography DNA */}
                    {extractedData.typography && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                                <div className="flex items-center gap-3">
                                    <Terminal size={18} className="text-primary" />
                                    <div>
                                        <h4 className="font-bold text-sm">Typography DNA</h4>
                                        <p className="text-xs text-muted-foreground">Captured font architecture</p>
                                    </div>
                                </div>
                                <Button
                                    variant={selectedItems.typography ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleItem('typography', !selectedItems.typography)}
                                >
                                    {selectedItems.typography ? <Check size={14} /> : "Select"}
                                </Button>
                            </div>
                            {selectedItems.typography && (
                                <div className="p-4 bg-background/50 rounded-lg border border-border/50 text-xs space-y-1">
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Family:</span> {extractedData.typography.fontFamily}</p>
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Weights:</span> {extractedData.typography.weightScale.join(', ')}</p>
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Spacing:</span> {extractedData.typography.letterSpacing}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Lighting DNA */}
                    {extractedData.lighting && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                                <div className="flex items-center gap-3">
                                    <Zap size={18} className="text-amber-500" />
                                    <div>
                                        <h4 className="font-bold text-sm">Lighting Protocol</h4>
                                        <p className="text-xs text-muted-foreground">Atmospheric characteristics</p>
                                    </div>
                                </div>
                                <Button
                                    variant={selectedItems.lighting ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleItem('lighting', !selectedItems.lighting)}
                                >
                                    {selectedItems.lighting ? <Check size={14} /> : "Select"}
                                </Button>
                            </div>
                            {selectedItems.lighting && (
                                <div className="p-4 bg-background/50 rounded-lg border border-border/50 text-xs space-y-1">
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Setup:</span> {extractedData.lighting.setup}</p>
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Contrast:</span> {extractedData.lighting.contrastRatio}</p>
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Temp:</span> {extractedData.lighting.colorTemperature}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Structural Grid */}
                    {extractedData.grid && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                                <div className="flex items-center gap-3">
                                    <Target size={18} className="text-blue-500" />
                                    <div>
                                        <h4 className="font-bold text-sm">Structural Grid</h4>
                                        <p className="text-xs text-muted-foreground">Spatial arrangement logic</p>
                                    </div>
                                </div>
                                <Button
                                    variant={selectedItems.grid ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleItem('grid', !selectedItems.grid)}
                                >
                                    {selectedItems.grid ? <Check size={14} /> : "Select"}
                                </Button>
                            </div>
                            {selectedItems.grid && (
                                <div className="p-4 bg-background/50 rounded-lg border border-border/50 text-xs space-y-1">
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Type:</span> {extractedData.grid.type}</p>
                                    <p><span className="text-muted-foreground uppercase font-black text-[9px]">Gutter Ratio:</span> {extractedData.grid.gutterRatio}x</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mood Tags */}
                    {extractedData.moodTags && extractedData.moodTags.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={18} className="text-primary" />
                                    <div>
                                        <h4 className="font-bold text-sm">Mood Tags</h4>
                                        <p className="text-xs text-muted-foreground">Emotional descriptors</p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                    {selectedItems.moodTags.length} Selected
                                </div>
                            </div>

                            {extractedData.moodTags && (
                                <div className="flex flex-wrap gap-2 p-4 bg-background/50 rounded-lg border border-border/50">
                                    {extractedData.moodTags.map((tag, index) => {
                                        const isSelected = selectedItems.moodTags.includes(tag);
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => toggleItem('moodTags', tag)}
                                                className={`px-3 py-1 text-xs font-bold uppercase rounded-full border transition-all ${isSelected ? 'bg-primary/10 text-primary border-primary/20' : 'bg-transparent text-muted-foreground border-border opacity-50'}`}
                                            >
                                                {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 flex gap-3">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button onClick={handleApply} className="flex-1 gap-2">
                        <Check size={16} /> Apply Selected DNA
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ReferenceAnalysisModal;
