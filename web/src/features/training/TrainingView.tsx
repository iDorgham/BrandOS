import React, { useState, useEffect } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { Brain, Cpu, Database, Play, CheckCircle2, AlertCircle, RefreshCw, BarChart3, Layers, Sparkles, ChevronRight, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { GeneratedAsset, BrandProfile } from '@/types';
import { toast } from 'sonner';

interface TrainingViewProps {
    brand: BrandProfile;
    assets: GeneratedAsset[];
    setHeaderActions: (actions: React.ReactNode) => void;
}

interface TrainingSession {
    id: string;
    version: string;
    status: 'idle' | 'preparing' | 'training' | 'validating' | 'completed';
    progress: number;
    log: string[];
}

export const TrainingView = React.memo<TrainingViewProps>(({ brand, assets, setHeaderActions }) => {
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [session, setSession] = useState<TrainingSession | null>(null);
    const [trainedModels, setTrainedModels] = useState<{ id: string, version: string, accuracy: number, date: string }[]>([]);

    const toggleAsset = (id: string) => {
        setSelectedAssets(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const startTraining = () => {
        if (selectedAssets.length < 2) {
            toast.error('Synthesis requires at least 2 high-compliance samples');
            return;
        }

        const newSession: TrainingSession = {
            id: Math.random().toString(36).substr(2, 9),
            version: `DNA-v${trainedModels.length + 1}.0`,
            status: 'preparing',
            progress: 0,
            log: [`[SYSTEM] Initializing Custom Model Weights for ${brand.name}...`]
        };
        setSession(newSession);
    };

    // Update header actions
    useEffect(() => {
        if (session?.status === 'completed') {
            setHeaderActions(
                <Button onClick={() => { setSession(null); setSelectedAssets([]); }} variant="secondary" className="rounded-sm border-border text-[11px] h-7 px-4 font-medium">
                    New Training Session
                </Button>
            );
        } else {
            setHeaderActions(null);
        }

        return () => setHeaderActions(null);
    }, [session?.status, setHeaderActions]);

    useEffect(() => {
        if (!session || session.status === 'completed') return;

        const interval = setInterval(() => {
            setSession(prev => {
                if (!prev) return null;

                const nextProgress = prev.progress + (Math.random() * 5);
                let nextStatus = prev.status;
                let nextLog = [...prev.log];

                if (nextProgress >= 10 && prev.status === 'preparing') {
                    nextStatus = 'training';
                    nextLog.push(`[TRAINING] Extracting high-frequency latent patterns...`);
                } else if (nextProgress >= 70 && prev.status === 'training') {
                    nextStatus = 'validating';
                    nextLog.push(`[VALIDATION] Cross-referencing with Brand Doctrine...`);
                } else if (nextProgress >= 100) {
                    nextStatus = 'completed';
                    nextLog.push(`[SUCCESS] Custom Model ${prev.version} deployed to System.`);

                    // Add to trained models
                    setTrainedModels(tm => [{
                        id: prev.id,
                        version: prev.version,
                        accuracy: 94 + Math.random() * 5,
                        date: new Date().toLocaleDateString()
                    }, ...tm]);

                    toast.success(`DNA Training Complete: ${prev.version} is now active.`);
                    clearInterval(interval);
                    return { ...prev, progress: 100, status: 'completed', log: nextLog };
                }

                // Add random technical logs
                if (Math.random() > 0.7 && nextStatus === 'training') {
                    const techTerms = ['Adjusting spatial attention heads...', 'Optimizing palette embeddings...', 'Tuning stylistic gradients...', 'Pruning non-compliant neurons...'];
                    nextLog.push(`[CORE] ${techTerms[Math.floor(Math.random() * techTerms.length)]}`);
                }

                return { ...prev, progress: nextProgress, status: nextStatus, log: nextLog.slice(-10) };
            });
        }, 800);

        return () => clearInterval(interval);
    }, [session?.status]);

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
                icon={Brain}
                title={brand.name}
                subtitle="Training Lab"
                badge="Neural Synapse"
                rightContent={
                    <>
                        <div className="text-right hidden md:block">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Compute Cluster Status</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Nodes Online</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Matrix Accuracy</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase">98.2% // DNA_v4</p>
                        </div>
                    </>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                {!session ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Asset Selection */}
                        <Card className="lg:col-span-2 p-8 bg-card/40 border-border/60 space-y-8 rounded-none backdrop-blur-sm shadow-2xl">
                            <div className="flex items-center justify-between border-b border-border/10 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/10 border border-primary/20 text-primary">
                                        <Database size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-mono font-black uppercase tracking-widest text-foreground">Synthesis Dataset</h3>
                                        <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] mt-1">Select high-integrity samples for DNA extraction</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono font-black text-primary px-4 py-2 bg-primary/10 border border-primary/20 rounded-none shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.1)]">
                                    {selectedAssets.length} SAMPLES IDENTIFIED
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto pr-2 custom-scrollbar">
                                {assets.filter(a => a.complianceScore >= 80).map(asset => (
                                    <div
                                        key={asset.id}
                                        onClick={() => toggleAsset(asset.id)}
                                        className={`relative aspect-square rounded-none overflow-hidden cursor-pointer border transition-all duration-300 ${selectedAssets.includes(asset.id)
                                            ? 'border-primary ring-1 ring-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]'
                                            : 'border-border/40 opacity-40 hover:opacity-100 hover:border-primary/40'
                                            }`}
                                    >
                                        <img src={asset.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="Sample" />
                                        {selectedAssets.includes(asset.id) && (
                                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                                                <div className="w-10 h-10 bg-primary rounded-none flex items-center justify-center shadow-2xl animate-in zoom-in duration-300">
                                                    <CheckCircle2 size={24} className="text-white" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-md px-2 py-1 rounded-none text-[9px] font-mono font-black text-primary border border-primary/20">
                                            {asset.complianceScore}% DNA
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-10 border-t border-border/10 text-center">
                                <p className="text-[12px] font-mono font-bold text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed italic opacity-80">
                                    "Feed high-compliance assets back into the Neural Synapse to sharpen the model's understanding of your specific visual language and brand manifold."
                                </p>
                                <Button
                                    size="lg"
                                    className="rounded-none px-12 py-8 text-sm font-mono font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 h-16 bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    onClick={startTraining}
                                    disabled={selectedAssets.length < 2}
                                >
                                    <Zap size={20} className="mr-3 fill-current" /> Initiate DNA Synthesis
                                </Button>
                            </div>
                        </Card>

                        {/* History & Models */}
                        <Card className="p-8 bg-card/40 border-border/60 h-full rounded-none backdrop-blur-sm shadow-2xl flex flex-col">
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/10">
                                <Activity size={16} className="text-primary" />
                                <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-foreground/60">Registry List</h3>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="p-5 rounded-none bg-primary/[0.04] border border-primary/20 flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] animate-pulse" />
                                        <div>
                                            <h4 className="text-[11px] font-mono font-black text-primary uppercase tracking-widest">Brand-Base-V1</h4>
                                            <p className="text-[9px] text-muted-foreground/40 font-mono mt-1 uppercase tracking-widest tracking-tighter">Stability Core Standard</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-mono font-black text-primary bg-primary/10 px-2 py-1 border border-primary/20 shadow-sm">ACTIVE</span>
                                </div>

                                {trainedModels.map(model => (
                                    <div key={model.id} className="p-5 rounded-none bg-card border border-border/40 flex items-center justify-between group hover:border-primary/40 transition-all hover:bg-primary/[0.02] shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-muted/40 border border-border/20 text-muted-foreground/40 group-hover:text-primary transition-colors">
                                                <Sparkles size={14} />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-mono font-black text-foreground uppercase tracking-widest">{model.version}</h4>
                                                <p className="text-[9px] text-muted-foreground/30 font-mono mt-1 uppercase tracking-widest tracking-tighter">
                                                    {model.date} // {model.accuracy.toFixed(1)}% FIDELITY
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 px-4 text-[9px] font-mono font-black uppercase tracking-[0.2em] border border-border/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white rounded-none">
                                            Deploy
                                        </Button>
                                    </div>
                                ))}

                                {trainedModels.length === 0 && (
                                    <div className="py-24 text-center opacity-20 border border-dashed border-border/20 rounded-none bg-muted/5">
                                        <Layers size={48} className="mx-auto mb-4 text-muted-foreground" strokeWidth={0.5} />
                                        <p className="text-[9px] font-mono font-black text-muted-foreground uppercase tracking-[0.3em]">No Custom Weights Found</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-10 pt-6 border-t border-border/10">
                                <div className="flex items-center justify-between text-[8px] font-mono font-black text-muted-foreground/20 uppercase tracking-[0.4em]">
                                    <span>Cluster Identity</span>
                                    <span>NEURAL_NODE_7X</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto w-full space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                        <Card className="p-10 bg-card border-border relative overflow-hidden rounded-none shadow-2xl">
                            {/* Background Animation */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" style={{ animation: 'scan 2s linear infinite' }} />
                            </div>

                            <div className="flex flex-col items-center text-center space-y-8 relative z-10">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-none border border-primary/20 flex items-center justify-center bg-primary/5">
                                        <Brain size={32} className={`text-primary ${session.status === 'training' ? 'animate-pulse' : ''}`} />
                                    </div>
                                    <div className="absolute -inset-4 border border-dashed border-primary/20 rounded-none animate-spin-slow" style={{ animationDuration: '10s' }} />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-black tracking-tight text-foreground uppercase">
                                        {session.status === 'preparing' && 'Assembling Matrix...'}
                                        {session.status === 'training' && 'Injecting DNA...'}
                                        {session.status === 'validating' && 'Refining Synapses...'}
                                        {session.status === 'completed' && 'Synthesis Complete'}
                                    </h2>
                                    <p className="text-[10px] text-primary/40 font-mono font-black uppercase tracking-[0.3em]">
                                        Model Variant: {session.version}
                                    </p>
                                </div>

                                <div className="w-full max-w-md space-y-6">
                                    <div className="h-32 bg-black/95 rounded-none border border-primary/10 p-6 overflow-hidden text-left font-mono text-[10px] flex flex-col justify-end shadow-inner">
                                        {session.log.map((line, i) => (
                                            <div key={i} className={`opacity-${Math.max(20, 100 - (session.log.length - i - 1) * 20)} flex items-center gap-3`}>
                                                <span className="text-primary">➜</span> <span className="text-white/60 tracking-wider uppercase">{line}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] font-mono font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
                                        <span>System Load</span>
                                        <span className="text-primary">{(session.progress).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-muted/20 border border-primary/10 rounded-none overflow-hidden group shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${session.progress}%` }}
                                            className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                                        />
                                    </div>
                                </div>

                                {session.status === 'completed' && (
                                    <div className="flex gap-6 w-full max-w-sm pt-8 animate-in zoom-in duration-500">
                                        <Button className="flex-1 rounded-none py-6 font-mono font-black uppercase tracking-widest shadow-2xl shadow-primary/20 h-12 bg-primary">Deploy Version</Button>
                                        <Button variant="secondary" className="flex-1 rounded-none py-6 font-mono font-black uppercase tracking-widest border border-border/40 h-12 hover:bg-muted" onClick={() => setSession(null)}>Back to Hub</Button>
                                    </div>
                                )}
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="p-8 bg-card/40 border-border/60 flex flex-col gap-6 items-center text-center rounded-none backdrop-blur-sm shadow-xl">
                                <div className="p-3 rounded-none bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                    <Database size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Dataset Size</h4>
                                    <p className="text-3xl font-display font-black text-foreground">{selectedAssets.length} <span className="text-sm text-muted-foreground font-mono font-black opacity-20">SMPL</span></p>
                                </div>
                            </Card>
                            <Card className="p-8 bg-card/40 border-border/60 flex flex-col gap-6 items-center text-center rounded-none backdrop-blur-sm shadow-xl">
                                <div className="p-3 rounded-none bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    <Activity size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Est. Fidelity</h4>
                                    <p className="text-3xl font-display font-black text-foreground">96.8<span className="text-primary text-sm ml-1">%</span></p>
                                </div>
                            </Card>
                            <Card className="p-8 bg-card/40 border-border/60 flex flex-col gap-6 items-center text-center rounded-none backdrop-blur-sm shadow-xl">
                                <div className="p-3 rounded-none bg-primary/10 text-primary border border-primary/20">
                                    <Cpu size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Compute Tier</h4>
                                    <p className="text-3xl font-display font-black text-foreground">X-SYL <span className="text-[10px] text-primary/40 font-mono font-black opacity-40">ALPHA</span></p>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
});
