import React from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import {
    BarChart3,
    TrendingUp,
    Activity,
    Zap,
    Target,
    ShieldCheck,
    Clock,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    ChevronRight,
    Instagram,
    Layers,
    Brain
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { BrandProfile, GeneratedAsset } from '@/types';

interface AnalyticsViewProps {
    brand: BrandProfile;
    assets: GeneratedAsset[];
}

export const AnalyticsView = React.memo<AnalyticsViewProps>(({ brand, assets }) => {
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Simulated data for trends
    const stats = React.useMemo(() => [
        { label: 'Creative Velocity', value: '24.8', unit: 'assets/day', trend: '+12%', positive: true, icon: Zap },
        { label: 'Avg Compliance', value: '94.2', unit: '%', trend: '+2.4%', positive: true, icon: ShieldCheck },
        { label: 'Market Variance', value: '3.1', unit: 'σ', trend: '-0.5%', positive: true, icon: Target },
        { label: 'Team Engagement', value: '88', unit: '%', trend: '+5%', positive: true, icon: Users },
    ], []);

    const complianceHistory = React.useMemo(() => [82, 85, 84, 88, 91, 93, 94], []);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-0 w-full relative antialiased"
        >
            <ViewHeader
                icon={BarChart3}
                title={brand.name}
                subtitle="Performance"
                badge="Intelligence Hub"
                rightContent={
                    <>
                        <div className="text-right hidden md:block">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Datalayer Connection</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Live Pulse</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Synthesis Variance</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase">Alpha 0.9.4</p>
                        </div>
                    </>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                {/* Top Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <Card key={i} className="p-6 bg-card/40 border-border/60 relative overflow-hidden group hover:border-primary/40 transition-all rounded-none backdrop-blur-sm shadow-xl">
                            {/* Background Icon Detail */}
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <stat.icon size={64} strokeWidth={0.5} />
                            </div>

                            <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-mono font-black text-primary/40 uppercase tracking-[0.2em]">{stat.label}</span>
                                    <div className="h-[1px] w-6 bg-primary/20" />
                                </div>
                                <div className="flex items-end justify-between w-full">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-display font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">{stat.value}</span>
                                        <span className="text-[10px] font-mono font-black text-muted-foreground/40 uppercase tracking-widest">{stat.unit}</span>
                                    </div>
                                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-none border text-[9px] font-mono font-black ${stat.positive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                        {stat.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                        {stat.trend}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Trend Chart */}
                    <Card className="lg:col-span-2 p-8 bg-card/40 border-border/60 space-y-8 rounded-none backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between border-b border-border/20 pb-6">
                            <div className="flex items-center gap-6">
                                <div className="p-3 bg-card border border-border/40 text-primary">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono font-black uppercase tracking-widest text-foreground">Compliance Stability Trend</h3>
                                    <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] mt-1">Matrix Cycle Persistence: Last 7 Intervals</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-none bg-primary" />
                                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-muted-foreground">Active DNA</span>
                                </div>
                                <div className="flex items-center gap-2 opacity-30">
                                    <div className="w-2 h-2 rounded-none bg-border" />
                                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-muted-foreground">Sector Avg</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-72 flex items-end justify-between gap-4 px-4 border-b border-border/10 pb-6">
                            {complianceHistory.map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end relative">
                                    <div className="relative w-full flex flex-col items-center justify-end h-full">
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 border-x border-border/5 pointer-events-none" />

                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${val}%` }}
                                            transition={{ duration: 1, ease: 'circOut', delay: i * 0.1 }}
                                            className="w-full max-w-[40px] bg-primary/10 group-hover:bg-primary/20 transition-all border-x border-t border-primary/30 relative shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)]"
                                        >
                                            {/* Gloss Detail */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/60" />

                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-card border border-primary/40 px-3 py-2 rounded-none text-[10px] font-mono font-black text-primary z-20 whitespace-nowrap shadow-2xl translate-y-2 group-hover:translate-y-0">
                                                VAL: {val}.0%
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-[9px] font-mono font-black text-muted-foreground/20 uppercase tracking-widest">W.0{i + 1}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <div className="flex gap-12">
                                <div className="space-y-1">
                                    <h4 className="text-[8px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Peak Adherence</h4>
                                    <p className="text-2xl font-display font-black tracking-tight text-foreground">98.4<span className="text-primary text-sm ml-1">%</span></p>
                                </div>
                                <div className="space-y-1 text-center">
                                    <h4 className="text-[8px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Stability Index</h4>
                                    <p className="text-2xl font-display font-black tracking-tight text-primary">A<span className="text-muted-foreground/40 font-mono text-sm inline-block ml-1">+</span></p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-3 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-primary hover:text-white border border-border/40 rounded-none px-6 h-9 transition-all active:scale-95">
                                Access Deep Metrics <ChevronRight size={14} className="opacity-40" />
                            </Button>
                        </div>
                    </Card>

                    {/* AI Performance Predictions */}
                    <div className="space-y-6">
                        <Card className="p-8 bg-primary/[0.03] border border-primary/30 relative overflow-hidden h-full rounded-none backdrop-blur-md shadow-2xl">
                            {/* HUD Background Decorations */}
                            <div className="absolute top-0 right-0 p-12 text-primary opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                                <Sparkles size={160} strokeWidth={0.5} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-5 mb-10 pb-6 border-b border-primary/10">
                                    <div className="p-3 bg-primary/10 border border-primary/20 text-primary shadow-[inset_0_0_15px_rgba(var(--primary-rgb),0.2)]">
                                        <Activity size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-mono font-black uppercase tracking-widest text-foreground">Performance Intel</h3>
                                        <p className="text-[8px] font-mono text-primary/40 uppercase tracking-[0.4em] mt-1">Predictive Protocol v4.0</p>
                                    </div>
                                </div>

                                <div className="space-y-10 flex-1">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-widest">
                                            <span className="text-muted-foreground/60">Market Resonance</span>
                                            <span className="text-primary bg-primary/10 px-3 py-1 border border-primary/20 shadow-sm">CRITICAL HIGH</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted/20 border border-primary/10 rounded-none overflow-hidden group shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '88%' }}
                                                transition={{ duration: 1.5, ease: 'circOut' }}
                                                className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-widest">
                                            <span className="text-muted-foreground/60">Attention Retention</span>
                                            <span className="text-primary bg-primary/10 px-3 py-1 border border-primary/20">92.4 <span className="text-[8px] text-primary/40">%</span></span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted/20 border border-primary/10 rounded-none overflow-hidden group shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '92%' }}
                                                transition={{ duration: 1.5, ease: 'circOut', delay: 0.2 }}
                                                className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-primary/10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <Zap size={14} className="text-primary opacity-60" />
                                        <h4 className="text-[9px] font-mono font-black text-primary uppercase tracking-[0.3em]">AI Synthesis Directive</h4>
                                    </div>
                                    <div className="relative p-5 bg-card border-l-4 border-primary/40 shadow-xl group/msg">
                                        <div className="absolute top-0 right-0 p-2 opacity-20"><Target size={12} /></div>
                                        <p className="text-[12px] font-mono font-bold text-muted-foreground leading-relaxed italic opacity-80">
                                            "TRAJECTORY ANALYSIS DETECTS <span className="text-primary px-1 bg-primary/5 font-black uppercase underline decoration-primary/40 underline-offset-4 tracking-wider">14.2% LIFT</span> IN RECALL IF 'NOIR' SPECTRA IS RETAINED ACROSS NEXT 4 EPOCHS."
                                        </p>
                                    </div>
                                </div>

                                <Button className="w-full mt-10 rounded-none h-14 font-mono font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary">
                                    Execute Protocol Optimizer
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Bottom Row: Activity Feed & Health */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                    <Card className="p-8 bg-card/40 border-border/60 rounded-none shadow-xl backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8 border-b border-border/20 pb-4">
                            <h3 className="text-[10px] font-mono font-black text-foreground/60 flex items-center gap-3 uppercase tracking-[0.3em]">
                                <Clock size={16} className="text-primary" /> Event Log
                            </h3>
                            <span className="text-[8px] font-mono font-black opacity-30">HEX.7012.SYL</span>
                        </div>
                        <div className="space-y-6">
                            {[
                                { event: 'Batch Rendering Matrix Success', time: '2m ago', type: 'system' },
                                { event: 'Art Director approved V3 Assets', time: '14m ago', type: 'user' },
                                { event: 'Compliance Audit: 98% Stability', time: '2h ago', type: 'audit' },
                                { event: 'New DNA Variant Synchronized', time: '5h ago', type: 'dna' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 items-start group">
                                    <div className={`mt-2 w-2 h-2 rounded-none ${i === 0 ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : 'bg-border/40'} shrink-0`} />
                                    <div className="space-y-1.5 flex-1 border-b border-border/5 pb-4 group-last:border-none">
                                        <p className="text-[11px] font-mono font-black leading-tight uppercase tracking-widest group-hover:text-primary transition-colors text-foreground">{item.event}</p>
                                        <p className="text-[9px] text-muted-foreground/30 font-mono tracking-widest">{item.time.toUpperCase()} // PROTOCOL.{item.type.toUpperCase()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-8 bg-card/40 border-border/60 md:col-span-2 rounded-none shadow-xl backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8 border-b border-border/20 pb-4">
                            <h3 className="text-[10px] font-mono font-black text-foreground/60 uppercase tracking-[0.3em]">Velocity Distribution Matrix</h3>
                            <span className="text-[8px] font-mono font-black opacity-30">UNIT: ASSET_CORE</span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Social', value: '142', unit: 'assets', icon: Instagram },
                                { label: 'Print', value: '45', unit: 'assets', icon: Layers },
                                { label: 'Studio', value: '286', unit: 'renders', icon: Sparkles },
                                { label: 'Training', value: '12', unit: 'epochs', icon: Brain },
                            ].map((metric, i) => (
                                <div key={i} className="p-5 rounded-none bg-card border border-border/40 flex flex-col justify-between h-32 hover:border-primary/40 hover:bg-primary/[0.02] transition-all cursor-default group shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-[9px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.2em]">{metric.label}</h4>
                                        <metric.icon size={14} className="opacity-10 group-hover:opacity-40 transition-opacity text-primary" />
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-display font-black text-foreground group-hover:text-primary transition-colors">{metric.value}</span>
                                        <span className="text-[8px] font-mono font-black text-muted-foreground/30 uppercase tracking-widest">{metric.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </motion.div >
    );
});
