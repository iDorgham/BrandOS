import React, { useState } from 'react';
import { Fingerprint, Plus, X } from 'lucide-react';
import { Card, Button, Input, Textarea } from '@/components/ui';
import { BrandProfile } from '@/types';
import { generateId } from '@/utils';
import { DEFAULT_GRAMMAR_RULES } from '@/constants';

interface DashboardViewProps {
    brands: BrandProfile[];
    selectedBrand: BrandProfile;
    onSelectBrand: (brand: BrandProfile) => void;
    onAddBrand: (brand: BrandProfile) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
    brands,
    selectedBrand,
    onSelectBrand,
    onAddBrand
}) => {
    const [isNewBrandModalOpen, setIsNewBrandModalOpen] = useState(false);
    const [newBrandName, setNewBrandName] = useState('');
    const [newBrandDoctrine, setNewBrandDoctrine] = useState('');

    const handleCreateBrand = () => {
        if (!newBrandName) return;

        const newBrand: BrandProfile = {
            id: generateId(),
            name: newBrandName,
            doctrine: newBrandDoctrine || 'New brand doctrine',
            palette: [
                { id: generateId(), label: 'Primary', hex: '#000000' },
                { id: generateId(), label: 'Secondary', hex: '#ffffff' }
            ],
            background: '#000000',
            negativeSpace: 50,
            safeZones: [],
            emotionalTags: [],
            forbiddenElements: [],
            grammarRules: [...DEFAULT_GRAMMAR_RULES]
        };

        onAddBrand(newBrand);
        setIsNewBrandModalOpen(false);
        setNewBrandName('');
        setNewBrandDoctrine('');
    };

    return (
        <>
            <div className="space-y-10 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 p-8 flex flex-col justify-between overflow-hidden relative group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-display font-bold mb-1">Active Identity: {selectedBrand.name}</h3>
                            <p className="text-muted-foreground text-sm max-w-md">{selectedBrand.doctrine}</p>
                        </div>
                        <div className="mt-8 flex gap-3 relative z-10">
                            {selectedBrand.palette.map(c => (
                                <div key={c.id} className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} />
                            ))}
                        </div>
                        <div className="absolute right-[-40px] top-[-40px] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                            <Fingerprint size={300} />
                        </div>
                    </Card>
                    <Card className="p-8 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-bold text-muted-foreground uppercase mb-1">DNA Compliance</span>
                        <div className="text-5xl font-display font-black text-primary">98.4%</div>
                        <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">Adherence Stability</p>
                    </Card>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brands.map(brand => (
                        <Card key={brand.id} className="hover:border-primary/50 transition-all cursor-pointer group p-6" onClick={() => onSelectBrand(brand)}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                    <Fingerprint size={24} />
                                </div>
                                <h4 className="font-bold">{brand.name}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{brand.doctrine}</p>
                        </Card>
                    ))}
                    <button
                        onClick={() => setIsNewBrandModalOpen(true)}
                        className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all gap-2"
                    >
                        <Plus size={24} />
                        <span className="text-xs font-bold uppercase">New DNA Protocol</span>
                    </button>
                </div>
            </div>

            {/* New Brand Modal */}
            {isNewBrandModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-lg p-8 shadow-2xl space-y-6 bg-card border border-border">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-display font-black">INITIALIZE DNA</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsNewBrandModalOpen(false)}><X size={20} /></Button>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase">Identity Name</label>
                                <Input
                                    placeholder="e.g. AETHER LUX"
                                    value={newBrandName}
                                    onChange={(e) => setNewBrandName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase">Visual Doctrine</label>
                                <Textarea
                                    placeholder="Core brand philosophy..."
                                    value={newBrandDoctrine}
                                    onChange={(e) => setNewBrandDoctrine(e.target.value)}
                                />
                            </div>
                            <Button className="w-full rounded-xl py-6" onClick={handleCreateBrand}>CONFIRM PROTOCOL</Button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};
