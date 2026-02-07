import React, { useState } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { ShieldCheck, Upload, ChevronRight, BarChart, AlertTriangle, CheckCircle2, Search, Trash2, Scale, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { BrandProfile } from '@/types';
import { toast } from 'sonner';

interface AuditViewProps {
    brand: BrandProfile;
}

interface AuditResult {
    score: number;
    gaps: string[];
    advantages: string[];
    recommendations: string[];
}

export const AuditView = React.memo<AuditViewProps>(({ brand }) => {
    const [competitorImage, setCompetitorImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCompetitorImage(reader.result as string);
                setAuditResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const runAudit = () => {
        if (!competitorImage) return;
        setIsAnalyzing(true);

        // Simulating AI analysis of competitor asset vs brand DNA
        setTimeout(() => {
            setAuditResult({
                score: 42,
                gaps: [
                    "Competitor uses centered compositions, while your DNA mandates off-center spatial hierarchy.",
                    "Their palette incorporates forbidden 'bright_red', creating a more aggressive emotional trigger.",
                    "Minimal use of negative space (approx 15%) compared to your 65% requirement."
                ],
                advantages: [
                    "Your brand maintains higher perceived luxury through spatial tension.",
                    "Doctrine-aligned shadows create more depth than the competitor's flat lighting."
                ],
                recommendations: [
                    "Lean harder into the 'mysterious' emotional tag to further differentiate from their generic clarity.",
                    "Maintain the 80% negative space protocol in next campaign to emphasize the 'Noir' premium feel."
                ]
            });
            setIsAnalyzing(false);
            toast.success('Market Gap Analysis Complete');
        }, 2500);
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
                icon={ShieldCheck}
                title={brand.name}
                subtitle="Market Audit"
                badge="Strategic Protocol"
                rightContent={
                    <>
                        <div className="text-right hidden md:block">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Market Surveillance</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Global Feed Active</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Doctrine Integrity</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase">Alpha Channel // High</p>
                        </div>
                    </>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Upload Section */}
                    <Card className="p-10 bg-card/40 border-border/60 space-y-10 rounded-none backdrop-blur-sm shadow-2xl">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-foreground mb-4">
                                <div className="p-2 bg-primary/10 border border-primary/20 text-primary">
                                    <Upload size={18} />
                                </div>
                                <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.3em]">Competitor Asset</h3>
                            </div>

                            <div
                                className={`relative aspect-video rounded-none border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-6 ${competitorImage ? 'border-primary/20 bg-primary/[0.02]' : 'border-border/20 hover:border-primary/40 bg-muted/5'
                                    }`}
                            >
                                {competitorImage ? (
                                    <>
                                        <img src={competitorImage} className="w-full h-full object-contain rounded-none shadow-2xl" alt="Competitor" />
                                        <button
                                            onClick={() => setCompetitorImage(null)}
                                            className="absolute top-6 right-6 p-3 bg-black/80 rounded-none text-muted-foreground hover:text-primary backdrop-blur-xl border border-white/10 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center space-y-6 group pointer-events-none">
                                        <div className="w-20 h-20 bg-card border border-border/20 rounded-none flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-500">
                                            <Upload size={32} className="text-muted-foreground/40 group-hover:text-primary transition-colors" strokeWidth={1} />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-foreground/60">Drop competitor creative</p>
                                            <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em]">RAW SYNTHESIS // MULTIFORMAT SUPPORT</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6 pt-10 border-t border-border/10">
                            <div className="flex items-center gap-4 text-foreground mb-4">
                                <div className="p-2 bg-primary/10 border border-primary/20 text-primary">
                                    <Search size={18} />
                                </div>
                                <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.3em]">Brand Reference</h3>
                            </div>
                            <div className="p-6 rounded-none bg-primary/[0.04] border border-primary/20 flex items-center gap-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-primary group-hover:opacity-[0.08] transition-opacity">
                                    <Sparkles size={64} strokeWidth={0.5} />
                                </div>
                                <div className="w-14 h-14 rounded-none bg-primary flex items-center justify-center text-white shadow-2xl relative z-10">
                                    <Search size={24} />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-[11px] font-mono font-black uppercase tracking-widest text-primary">{brand.name} Doctrine</h4>
                                    <p className="text-[9px] text-muted-foreground/60 font-mono mt-1 uppercase tracking-tight line-clamp-1 italic">{brand.doctrine}</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full rounded-none h-16 text-sm font-mono font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/20 bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all"
                            disabled={!competitorImage || isAnalyzing}
                            onClick={runAudit}
                        >
                            {isAnalyzing ? (
                                <div className="flex items-center gap-4">
                                    <RefreshCw className="animate-spin" size={20} /> SYNCING DATA...
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Scale size={20} /> Execute Audit
                                </div>
                            )}
                        </Button>
                    </Card>

                    {/* Analysis Results */}
                    <div className="relative">
                        {auditResult ? (
                            <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                                {/* Score Card */}
                                <Card className="p-10 bg-card/40 border-border/60 relative overflow-hidden rounded-none shadow-2xl backdrop-blur-sm">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-none -mr-32 -mt-32 blur-[100px] animate-pulse" />
                                    <div className="absolute bottom-0 left-0 p-4 opacity-[0.03] text-primary">
                                        <BarChart size={120} strokeWidth={0.5} />
                                    </div>

                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <h3 className="text-[10px] font-mono font-black text-muted-foreground/60 uppercase tracking-[0.4em] mb-4">Differentiation Index</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-8xl font-display font-black text-primary tracking-tighter">{auditResult.score}</span>
                                                <span className="text-2xl font-display font-black text-primary/40">%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="text-right p-3 bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                                                <div className="flex items-center gap-3 justify-end text-emerald-500 mb-1">
                                                    <CheckCircle2 size={14} />
                                                    <p className="text-[10px] font-mono font-black tracking-widest uppercase">High Integrity</p>
                                                </div>
                                                <p className="text-[8px] font-mono text-emerald-500/40 uppercase tracking-widest">Protocol Compliant</p>
                                            </div>
                                            <div className="text-right p-3 bg-amber-500/5 border border-amber-500/10 backdrop-blur-sm">
                                                <div className="flex items-center gap-3 justify-end text-amber-500 mb-1">
                                                    <AlertTriangle size={14} />
                                                    <p className="text-[10px] font-mono font-black tracking-widest uppercase">Segment Alpha</p>
                                                </div>
                                                <p className="text-[8px] font-mono text-amber-500/40 uppercase tracking-widest">Zero Overlap Detected</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Gaps */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-foreground/40 px-2">
                                        <AlertTriangle size={14} />
                                        <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">Synapse Deviations</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {auditResult.gaps.map((gap, i) => (
                                            <div key={i} className="p-6 rounded-none bg-destructive/[0.03] border border-destructive/10 flex gap-6 group hover:border-destructive/30 transition-all">
                                                <div className="w-8 h-8 rounded-none border border-destructive/20 flex items-center justify-center text-destructive bg-destructive/5 shrink-0">
                                                    <AlertTriangle size={14} />
                                                </div>
                                                <p className="text-[11px] text-muted-foreground leading-relaxed font-mono uppercase tracking-tight">{gap}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-foreground/40 px-2">
                                        <Sparkles size={14} />
                                        <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">Optimization Matrix</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {auditResult.recommendations.map((rec, i) => (
                                            <div key={i} className="p-6 rounded-none bg-primary/[0.03] border border-primary/10 flex gap-6 group hover:border-primary/30 transition-all">
                                                <div className="w-8 h-8 rounded-none border border-primary/20 flex items-center justify-center text-primary bg-primary/5 shrink-0">
                                                    <Sparkles size={14} />
                                                </div>
                                                <p className="text-[11px] text-muted-foreground leading-relaxed font-mono uppercase tracking-tight">{rec}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Card className="h-full flex flex-col items-center justify-center p-12 text-center border border-dashed border-border/20 bg-muted/[0.02] rounded-none opacity-40 group hover:opacity-100 transition-opacity duration-700">
                                <div className="relative mb-10">
                                    <BarChart size={80} className="text-muted-foreground group-hover:text-primary transition-colors duration-700" strokeWidth={0.5} />
                                    <div className="absolute -inset-8 border border-dashed border-primary/10 rounded-full animate-spin-slow opacity-20" />
                                </div>
                                <h3 className="text-sm font-mono font-black uppercase tracking-[0.4em] text-foreground/60 mb-4">Awaiting Signal</h3>
                                <p className="text-[10px] max-w-xs mx-auto text-muted-foreground/40 font-mono uppercase tracking-widest leading-relaxed">
                                    INITIALIZE MARKET SURVEILLANCE BY UPLOADING COMPETITIVE TELEMETRY TO BEGIN SEGMENT DIFFERENTIATION ANALYSIS.
                                </p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
