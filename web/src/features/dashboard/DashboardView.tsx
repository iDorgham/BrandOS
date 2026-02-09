import React, { useState } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Fingerprint, Plus, X, ArrowUpRight, Activity, Shield, Zap, LayoutGrid, Clock, Users, History, MousePointerClick, Search, Terminal } from 'lucide-react';
import { Card, Button, Input, Textarea } from '@/components/ui';
import { BrandProfile } from '@/types';
import { generateId } from '@/utils';
import { DNAVisualization } from '@/components/brand';
import { DEFAULT_GRAMMAR_RULES } from '@/constants';

interface DashboardViewProps {
    brands: BrandProfile[];
    selectedBrand: BrandProfile;
    onSelectBrand: (brand: BrandProfile) => void;
    onAddBrand: (brand: Omit<BrandProfile, 'id'>) => Promise<BrandProfile | void>;
    onViewDoctrine?: () => void;
    onInviteTeam?: () => void;
    onViewAudit?: () => void;
    workspaceId?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = React.memo(({
    brands,
    selectedBrand,
    onSelectBrand,
    onAddBrand,
    onViewDoctrine,
    onInviteTeam,
    onViewAudit,
    workspaceId = 'default'
}) => {
    // Ensure brands have brandId for DNAVisualization and other components
    const brandsWithBrandId = React.useMemo(() => brands.map(brand => ({
        ...brand,
        brandId: brand.id || (brand as any).brandId || generateId() // Ensure brandId exists
    })), [brands]);

    // Find the selected brand in the mapped list, or use the selected brand passed in
    const selectedBrandWithId = React.useMemo(() => selectedBrand.id
        ? (brandsWithBrandId.find(b => b.id === selectedBrand.id) || { ...selectedBrand, brandId: selectedBrand.id })
        : { ...selectedBrand, brandId: '' }, [selectedBrand.id, brandsWithBrandId, selectedBrand]);

    const isBrandEmpty = !selectedBrand.id;
    const [isNewBrandModalOpen, setIsNewBrandModalOpen] = useState(false);
    const [newBrandName, setNewBrandName] = useState('');
    const [newBrandDoctrine, setNewBrandDoctrine] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Default intensities for visualization
    const intensities = {
        energy: 78,
        warmth: 42,
        sophistication: 94
    };

    const handleCreateBrand = async () => {
        if (!newBrandName) {
            toast.error('Protocol Identifier required');
            return;
        }

        setIsCreating(true);
        try {
            const brandPayload: Omit<BrandProfile, 'id'> = {
                name: newBrandName.trim(),
                doctrine: newBrandDoctrine?.trim() || 'New brand doctrine',
                palette: [
                    { id: generateId(), label: 'Primary', hex: '#0a0e17' },
                    { id: generateId(), label: 'Secondary', hex: '#1a1a1a' },
                    { id: generateId(), label: 'Accent', hex: '#10b981' }
                ],
                background: '#262626',
                negativeSpace: 65,
                safeZones: ['bottom_25%', 'top_right_10%'],
                emotionalTags: [],
                forbiddenElements: [],
                grammarRules: [...DEFAULT_GRAMMAR_RULES],
                extractedPatterns: [],
                stylisticSignatures: [],
                dnaSpectrum: {
                    energy: Math.floor(Math.random() * (95 - 60) + 60), // Simulate analysis for now - replace with real logic if color analysis is available
                    warmth: Math.floor(Math.random() * (90 - 20) + 20),
                    sophistication: Math.floor(Math.random() * (98 - 70) + 70)
                },
                ...(workspaceId && workspaceId !== 'default' ? { workspaceId } : {})
            };

            // Simple Analysis heuristic based on doctrine keywords (if provided)
            if (newBrandDoctrine) {
                const text = newBrandDoctrine.toLowerCase();
                if (text.includes('urgent') || text.includes('bold') || text.includes('power')) {
                    brandPayload.dnaSpectrum!.energy += 10;
                }
                if (text.includes('friendly') || text.includes('human') || text.includes('community')) {
                    brandPayload.dnaSpectrum!.warmth += 15;
                }
                if (text.includes('minimal') || text.includes('luxury') || text.includes('exclusive')) {
                    brandPayload.dnaSpectrum!.sophistication += 10;
                }
                // Clamp values
                brandPayload.dnaSpectrum!.energy = Math.min(100, brandPayload.dnaSpectrum!.energy);
                brandPayload.dnaSpectrum!.warmth = Math.min(100, brandPayload.dnaSpectrum!.warmth);
                brandPayload.dnaSpectrum!.sophistication = Math.min(100, brandPayload.dnaSpectrum!.sophistication);
            }
            const newBrand = await onAddBrand(brandPayload);
            if (newBrand) {
                setIsNewBrandModalOpen(false);
                setNewBrandName('');
                setNewBrandDoctrine('');
                onSelectBrand(newBrand);
            }
        } catch (error: any) {
            console.error('Brand creation exception:', error);
            const msg = error?.message || 'Failed to communicate with DNA core.';
            toast.error(msg === 'User not authenticated' ? 'Please sign in again' : 'Initialization Failed', {
                description: msg === 'User not authenticated' ? 'Your session may have expired.' : msg
            });
        } finally {
            setIsCreating(false);
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
            className="w-full space-y-0 relative antialiased"
        >
            <ViewHeader
                icon={LayoutGrid}
                title="Brand OS"
                subtitle="Dashboard"
                badge="Brand OS Command"
                rightContent={
                    <>
                        <div className="text-right hidden md:block">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Cluster status</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Nodes Online</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Authorization</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase">Alpha Access</p>
                        </div>
                    </>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[260px]">
                    {/* 1. Compact Active Identity Card (4/12) */}
                    <Card className="lg:col-span-4 p-5 bg-card/80 backdrop-blur-xl border border-border relative overflow-hidden flex flex-col justify-between group transition-all hover:border-primary/20 rounded-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-sm bg-primary/5 border border-primary/20 flex items-center justify-center text-primary">
                                    <Shield size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <span className="text-[12px] text-muted-foreground/80 font-normal leading-none h-4 block">Active Profile</span>
                                    <h2 className="text-[20px] font-medium tracking-tight text-foreground mt-0.5">{selectedBrand?.name}</h2>
                                </div>
                            </div>

                            <div className="flex gap-1.5 p-1 bg-muted/20 rounded-sm border border-border/40 w-fit">
                                {selectedBrand.palette.slice(0, 5).map(c => (
                                    <div key={c.id} className="w-5 h-5 rounded-[1px] border border-black/10 shadow-sm" style={{ backgroundColor: c.hex }} title={c.hex} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between relative z-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-normal text-muted-foreground/60">Asset Complexity</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className={`h-1 w-3 rounded-sm ${i <= 4 ? 'bg-primary' : 'bg-muted-foreground/10'}`} />
                                    ))}
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onViewDoctrine}
                                className="text-[12px] font-medium h-8 px-3 hover:bg-primary/5 hover:text-primary transition-all rounded-sm"
                            >
                                Orchestrate <ArrowUpRight size={14} className="ml-1.5 opacity-60" />
                            </Button>
                        </div>

                        <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <Fingerprint size={280} strokeWidth={1} />
                        </div>
                    </Card>

                    {/* 2. Quick Actions (4/12) */}
                    <Card className="lg:col-span-4 p-5 bg-card backdrop-blur-sm border border-border space-y-4 flex flex-col justify-between rounded-sm">
                        <div className="flex items-center justify-between border-b border-border pb-3">
                            <div className="flex items-center gap-2">
                                <MousePointerClick size={16} className="text-primary" />
                                <h3 className="text-[10px] font-medium text-muted-foreground/80">Action Hub</h3>
                            </div>
                            <span className="text-[9px] font-mono text-primary animate-pulse font-bold">READY</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 h-full">
                            <button className="flex flex-col items-center justify-center p-3 rounded-sm bg-accent/50 border border-border hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                                <Zap size={16} className="mb-1.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-[9px] font-medium">Create</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-sm bg-accent/50 border border-border hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                                <History size={16} className="mb-1.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-[9px] font-medium">History</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-sm bg-accent/50 border border-border hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                                <Search size={16} className="mb-1.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-[9px] font-medium">Audit Asset</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-sm bg-accent/50 border border-border hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                                <Plus size={16} className="mb-1.5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                                <span className="text-[9px] font-medium">New Profile</span>
                            </button>
                        </div>
                    </Card>

                    {/* 3. Real-Time Telemetry & Visual Analysis (4/12) */}
                    <Card className="lg:col-span-4 p-5 bg-card backdrop-blur-sm border border-border flex flex-col justify-between rounded-sm relative overflow-hidden">
                        {selectedBrand.doctrine?.match(/\[ROI_GOAL: (.*?)\]/) && (
                            <div className="absolute top-4 left-4 z-10 bg-[var(--cds-layer-01)]/80 backdrop-blur px-3 py-1.5 rounded-sm border border-[var(--cds-support-success)]/30 flex items-center gap-2">
                                <span className="text-[9px] uppercase tracking-wider text-[var(--cds-support-success)] font-black">Target</span>
                                <span className="text-[11px] font-mono font-bold">{selectedBrand.doctrine.match(/\[ROI_GOAL: (.*?)\]/)![1]}</span>
                            </div>
                        )}
                        <div className="h-full w-full">
                            <DNAVisualization
                                brand={selectedBrand}
                                intensities={selectedBrand.dnaSpectrum || intensities}
                                className="h-full"
                            />
                        </div>
                    </Card>
                </div>

                {/* Middle Row: Grid of Identities */}
                <div className="mt-20 pt-8 border-t border-border flex-1 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-primary uppercase tracking-tight">Active Profiles</h4>
                            <p className="text-xs text-muted-foreground font-medium opacity-70">Brand Management Hub</p>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => setIsNewBrandModalOpen(true)}
                            className="rounded-sm bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-medium px-6 h-10"
                        >
                            <Plus size={16} className="mr-2" /> New Profile
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 overflow-y-auto pt-2 pr-2 pb-2">
                        {brandsWithBrandId.map(brand => (
                            <Card
                                key={brand.brandId}
                                onClick={() => onSelectBrand(brand)}
                                className={`group cursor-pointer transition-all hover:border-primary/40 relative overflow-hidden h-40 flex flex-col p-5 bg-card hover:-translate-y-0.5 active:scale-[0.98] rounded-sm ${selectedBrand?.id === brand.id ? 'border-primary/40 bg-primary/10 ring-1 ring-primary/20' : 'border-border'}`}
                            >
                                <div className="flex items-start justify-between relative z-10">
                                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all ${selectedBrand?.id === brand.id ? 'bg-primary text-primary-foreground' : 'bg-accent text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                        <Fingerprint size={20} />
                                    </div>
                                </div>

                                <div className="mt-auto space-y-2 relative z-10">
                                    <h5 className="font-display font-medium text-sm tracking-tight truncate group-hover:text-primary transition-colors">{brand.name}</h5>
                                    <div className="flex gap-1">
                                        {brand.palette.slice(0, 4).map(c => (
                                            <div key={c.id} className="w-1.5 h-1.5 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}

                        <button
                            onClick={() => setIsNewBrandModalOpen(true)}
                            className="group h-40 border border-dashed border-border rounded-sm flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all bg-muted/30"
                        >
                            <Plus size={24} className="text-muted-foreground/60 group-hover:text-primary" />
                            <span className="text-xs font-medium text-muted-foreground/80">Add Brand</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* System Status Bar - High Density Sticky Footer - CLEANER */}
            <div className="sticky bottom-0 z-50 pointer-events-none">
                <div className="max-w-full mx-auto pointer-events-auto">
                    <div className="px-4 h-[45px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border flex items-center justify-between shadow-lg">
                        {/* Collaborative Strip */}
                        <div className="flex items-center gap-3 border-r border-border pr-4">
                            <div className="flex -space-x-1.5">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-5 h-5 rounded-none border border-border bg-primary/20 flex items-center justify-center text-[7px] font-medium text-primary">
                                        {i === 1 ? 'JD' : i === 2 ? 'TS' : 'ML'}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[9px] font-medium text-muted-foreground/80">3 Active</span>
                        </div>

                        {/* Minimal Status Indicators */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-medium text-muted-foreground">Systems Core Online</span>
                            </div>
                            <div className="h-3 w-[1px] bg-border" />
                            <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-medium text-muted-foreground/60">Latency</span>
                                <span className="text-[9px] font-mono text-primary font-bold">12ms</span>
                            </div>
                            <div className="h-3 w-[1px] bg-border" />
                            <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-medium text-muted-foreground/60">Region</span>
                                <span className="text-[9px] font-mono text-muted-foreground">EU-West-1</span>
                            </div>
                        </div>

                        {/* Invite Action */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onInviteTeam}
                            className="h-6 px-2 rounded-sm hover:bg-muted/50 text-[9px] font-medium text-primary hover:text-primary border border-transparent hover:border-border transition-all"
                        >
                            <Users size={10} className="mr-1.5" /> Invite Team
                        </Button>
                    </div>
                </div>
            </div>

            {/* New Brand Modal */}
            {isNewBrandModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-background/80">
                    <Card className="w-full max-w-lg p-8 bg-card/95 border border-border rounded-2xl shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                    <Plus size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-medium tracking-tight">Initialize Protocol</h3>
                                    <p className="text-[11px] text-muted-foreground font-medium opacity-60">Brand DNA Sequence</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsNewBrandModalOpen(false)} className="hover:bg-muted rounded-xl">
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-primary/80">Identity Name</label>
                                <Input
                                    placeholder="Enter brand codename..."
                                    className="h-14 bg-muted/30 border-border rounded-xl px-4 font-mono text-sm focus:ring-primary/20"
                                    value={newBrandName}
                                    onChange={(e) => setNewBrandName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-primary/80">Brand Doctrine</label>
                                <Textarea
                                    placeholder="DEFINE THE NEURAL FOUNDATION..."
                                    className="min-h-[140px] bg-muted/30 border-border rounded-xl py-4 px-4 font-mono text-sm focus:ring-primary/20"
                                    value={newBrandDoctrine}
                                    onChange={(e) => setNewBrandDoctrine(e.target.value)}
                                />
                            </div>
                            <Button
                                className="w-full rounded-2xl h-16 font-medium transition-transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                onClick={handleCreateBrand}
                                disabled={isCreating || !newBrandName}
                            >
                                <Zap size={20} className={`mr-2 ${isCreating ? 'animate-pulse' : ''}`} />
                                {isCreating ? 'Initializing Sequence...' : 'Confirm DNA Sequence'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </motion.div>
    );
});
