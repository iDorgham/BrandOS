import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Shield, ArrowRight, Github, Twitter,
    Layers, Code, ChevronDown, Activity, Cpu,
    Target, Command, Globe, Info, Menu, X, ChevronRight
} from 'lucide-react';
import { Button, ThemeToggle } from '@/components/ui';
import { useTheme } from '@/contexts/ThemeContext';

interface LandingPageProps {
    onLoginClick: () => void;
    onInfoClick: (topic: 'terms' | 'privacy' | 'faq' | 'help') => void;
    onProductClick: (slug: 'identity' | 'doctrine' | 'studio' | 'audit') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onInfoClick, onProductClick }) => {
    const { resolvedTheme } = useTheme();

    const [auditLogs, setAuditLogs] = useState([
        { id: '822', status: 'OK', score: 98.2, task: 'HEX_VALIDATION' },
        { id: '144', status: 'OK', score: 94.7, task: 'SPATIAL_CHECK' },
        { id: '091', status: 'OK', score: 99.8, task: 'TONE_ANALYSIS' },
        { id: '042', status: 'OK', score: 96.5, task: 'TYPO_GUARD' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setAuditLogs(prev => {
                const next = [...prev];
                const last = next.shift()!;
                last.id = Math.floor(Math.random() * 900 + 100).toString();
                last.score = (Math.random() * 5 + 95).toFixed(1) as any;
                next.push(last);
                return next;
            });
        }, 1500); // Faster updates for 2026 feel
        return () => clearInterval(interval);
    }, []);

    const fastFadeIn = {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    };


    return (
        <div className="min-h-screen selection:bg-[#0f62fe]/30 font-sans relative overflow-x-hidden">
            <div className="cinematic-noise" />


            {/* Gradient Mesh (Refined for Higher Visibility) */}
            <div className="mesh-gradient opacity-50 pointer-events-none" />

            {/* Technical Grid Overlay */}
            <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(var(--cds-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--cds-text-primary) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }} />

            {/* Top Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-[#1a1a1a]/10 dark:border-[#1a1a1a] bg-background/80 backdrop-blur-2xl h-16 transition-colors">
                <div className="max-w-[1800px] mx-auto px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => window.scrollTo(0, 0)}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="w-10 h-10 bg-[#0f62fe] flex items-center justify-center aura-glow">
                                <Zap className="text-white" size={20} fill="currentColor" />
                            </div>
                            <span className="text-[18px] font-black tracking-tighter uppercase mr-4">Brand OS</span>
                        </motion.div>

                        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold text-[#6f6f6f] uppercase tracking-[0.2em]">
                            <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
                            <a href="#solution" className="hover:text-foreground transition-colors">Technology</a>
                            <a href="#control" className="hover:text-foreground transition-colors">Control</a>
                            <a href="#pricing" className="hover:text-foreground transition-colors">Contact</a>
                        </div>
                    </div>

                    <div className="flex items-center h-full gap-8">
                        <ThemeToggle />
                        <Button
                            onClick={onLoginClick}
                            variant="ghost"
                            className="text-[12px] uppercase tracking-widest font-black px-8 h-12 hover:bg-foreground/5 rounded-none text-foreground transition-all border border-foreground/10"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </nav>

            {/* 1. HERO: BOLD & SIMPLE */}
            <section className="min-h-screen flex flex-col justify-center px-8 relative overflow-hidden pt-48">
                <motion.div
                    {...fastFadeIn}
                    className="max-w-[1800px] mx-auto w-full relative z-10 will-change-transform"
                >
                    <div className="inline-flex items-center gap-4 bg-[var(--cds-interactive-01)]/10 border border-[var(--cds-interactive-01)]/20 px-6 py-2 mb-12">
                        <div className="w-2 h-2 rounded-full bg-[var(--cds-interactive-01)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--cds-interactive-01)]">Brand_OS // Protocol_V3</span>
                    </div>

                    <h1 className="text-[clamp(4rem,11vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase mb-12 italic">
                        Scale Your <br />
                        <span className="text-[var(--cds-interactive-01)] aura-glow">Identity.</span>
                    </h1>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
                        <Button
                            onClick={onLoginClick}
                            variant="ghost"
                            className="bg-[var(--cds-interactive-01)] text-white hover:bg-[var(--cds-link-primary-hover)] hover:text-white h-24 px-16 rounded-none text-2xl font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(15,98,254,0.3)] transition-all"
                        >
                            Initialize Protocol
                        </Button>
                        <p className="text-xl md:text-2xl font-light text-[#6f6f6f] max-w-xl leading-tight italic">
                            Stop managing assets. Start orchestrating DNA. <br />
                            <span className="text-foreground font-black uppercase not-italic">Brand OS</span> transforms fragmented workflows into a single source of truth.
                        </p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#525252]"
                >
                    <ChevronDown size={32} strokeWidth={1} />
                </motion.div>
            </section>

            {/* 2. THE PROBLEM: SIMPLE & HARD-HITTING */}
            <section id="problem" className="py-64 px-8 border-t border-[#1a1a1a]/10 dark:border-[#1a1a1a] relative overflow-hidden transition-colors">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <motion.div {...fastFadeIn}>
                        <h2 className="text-[clamp(3.5rem,6vw,7rem)] font-black tracking-tighter leading-[0.9] uppercase mb-16">
                            Your Brand <br /> Guidelines <br /> are Dead.
                        </h2>
                        <div className="space-y-12">
                            {[
                                { title: "The PDF Problem", desc: "Traditional brand manuals are static documents that designers ignore and AI can't read." },
                                { title: "Brand Drift", desc: "This leads to the slow, expensive erosion of your visual equity across every channel." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="w-1 px-1 bg-[var(--cds-support-warning)] h-full" />
                                    <div>
                                        <h3 className="text-3xl font-bold uppercase mb-4 text-[var(--cds-support-warning)]">{item.title}</h3>
                                        <p className="text-xl text-[#c6c6c6] font-light max-w-lg transition-colors group-hover:text-foreground">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-8 p-6 border border-red-500/20 bg-red-500/5 max-w-xl">
                                <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Market Impact</div>
                                <div className="text-2xl font-mono text-red-400">"Global brands lose up to $2.4M annually due to inconsistent execution."</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="aspect-square bg-[#161616] border border-[#393939] relative flex items-center justify-center aura-glow hardware-accelerated"
                    >
                        <div className="absolute inset-0 opacity-[0.2]"
                            style={{ backgroundImage: 'radial-gradient(#f1c21b 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
                        <div className="relative text-center p-12 z-10">
                            <div className="text-[clamp(10rem,20vw,20rem)] font-black text-[#f1c21b] leading-none mb-4 tracking-tighter">LOST</div>
                            <div className="text-2xl font-black uppercase tracking-[0.5em] text-white">Visual Identity</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. THE SOLUTION: THE PLATFORM HUB */}
            <section id="solution" className="py-64 px-8 bg-[var(--cds-interactive-01)] text-white hardware-accelerated">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div {...fastFadeIn} className="mb-48">
                        <div className="inline-flex items-center gap-4 bg-white/10 border border-white/20 px-6 py-2 mb-12">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">System_Architecture // V3.0</span>
                        </div>
                        <h2 className="text-[clamp(4rem,10vw,12rem)] font-black tracking-tighter leading-[0.85] uppercase mb-16">
                            The Operating System <br /> for Visual Doctrine.
                        </h2>
                        <p className="text-2xl md:text-3xl font-light leading-tight max-w-5xl italic opacity-90">
                            Brand OS ingests your fonts, colors, spatial rules, and 'vibe' to create a living digital twin of your brand identity.
                        </p>
                    </motion.div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/20 border border-white/20"
                    >
                        {[
                            {
                                id: "identity",
                                num: "01",
                                title: "Visual Doctrine",
                                desc: "Spatial logic gates for perfect composition, every time.",
                                icon: <Shield size={24} />
                            },
                            {
                                id: "doctrine",
                                num: "02",
                                title: "Brand Grammar",
                                desc: "IF/THEN rules that AI follows religiously to prevent drift.",
                                icon: <Cpu size={24} />
                            },
                            {
                                id: "studio",
                                num: "03",
                                title: "Emotional Mapping",
                                desc: "Precise semantic control over brand 'energy' and 'sophistication'.",
                                icon: <Layers size={24} />
                            },
                            {
                                id: "audit",
                                num: "04",
                                title: "Audit Protocol",
                                desc: "Automated pixels-to-policy enforcement for total brand safety.",
                                icon: <Activity size={24} />
                            }
                        ].map((product, i) => (
                            <motion.button
                                key={i}
                                {...fastFadeIn}
                                onClick={() => onProductClick(product.id as any)}
                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                className="p-12 flex flex-col items-start bg-transparent text-left group relative overflow-hidden will-change-transform hardware-accelerated"
                            >
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-12 group-hover:text-white">NODE_{product.num}</div>
                                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-10 group-hover:border-white transform group-hover:rotate-90">
                                    {product.icon}
                                </div>
                                <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter group-hover:translate-x-2">{product.title}</h3>
                                <p className="text-xl font-light leading-tight opacity-70 group-hover:opacity-100 mb-12">{product.desc}</p>
                                <div className="mt-auto flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 text-[#f1c21b]">
                                    Initialize_Deep_Dive <ChevronRight size={14} />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: PROCESS SECTION */}
            <section className="py-64 px-8 bg-[var(--cds-ui-background)] border-t border-[var(--cds-layer-02)]">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-32">
                        <div className="lg:w-1/3">
                            <h2 className="text-[clamp(3rem,5vw,6rem)] font-black tracking-tighter uppercase leading-none mb-16 text-white">
                                How It Works.
                            </h2>
                            <p className="text-xl text-[#c6c6c6]">
                                From static PDF to autonomous creative infrastructure in four steps.
                            </p>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                            {[
                                { step: "01", title: "Ingest", desc: "Upload your guidelines. AI extracts rules, styles, and distinct tokens." },
                                { step: "02", title: "Orchestrate", desc: "Design node-based 'Creative Logic' flows for recurring asset types." },
                                { step: "03", title: "Generate", desc: "Produce thousands of on-brand assets via Gemini 3 & DALL-E 4." },
                                { step: "04", title: "Audit", desc: "Every pixel is scored against your Visual Doctrine before export." }
                            ].map((item, i) => (
                                <div key={i} className="border-l-2 border-[var(--cds-layer-02)] pl-8 py-2">
                                    <div className="text-[10px] font-black text-[var(--cds-interactive-01)] mb-2">STEP_{item.step}</div>
                                    <h3 className="text-3xl font-black text-[var(--cds-text-primary)] uppercase mb-4">{item.title}</h3>
                                    <p className="text-[var(--cds-text-secondary)]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. REAL-TIME DEMO: THE CONTROL CENTER */}
            <section id="control" className="py-64 px-8 relative border-t border-[#1a1a1a]/10 dark:border-[#1a1a1a] transition-colors">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
                        <motion.div className="lg:col-span-4" {...fastFadeIn}>
                            <div className="text-[10px] font-black text-[var(--cds-support-warning)] uppercase tracking-[0.4em] mb-6 font-mono">[ MODULE_TRX_04 ]</div>
                            <h2 className="text-[clamp(4rem,7vw,9rem)] font-black tracking-tighter leading-[0.85] uppercase mb-16">
                                Compliance <br /> Scoring.
                            </h2>
                            <p className="text-xl text-[#c6c6c6] font-light leading-relaxed mb-12 max-w-md group-hover:text-foreground transition-colors">
                                Stop revisions before they start. Watch the system audit every pixel against your Visual Doctrine in real-time.
                            </p>
                            <Button
                                onClick={onLoginClick}
                                variant="ghost"
                                size="lg"
                                className="bg-transparent border border-foreground/20 text-foreground hover:bg-foreground hover:text-background h-20 px-12 rounded-none text-[16px] font-black uppercase tracking-[0.2em] transition-all w-full relative group overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    Initialize Audit <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                                </span>
                                <div className="absolute inset-0 bg-foreground translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] mix-blend-difference" />
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-8 bg-[var(--cds-ui-background)] border border-[var(--cds-layer-03)] p-2 aura-glow relative group overflow-hidden hardware-accelerated"
                        >
                            {/* Technical Overlays */}
                            <div className="scanline-effect opacity-20 pointer-events-none" />
                            <div className="absolute inset-0 border border-[#f1c21b]/10 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="h-14 bg-[#161616] border-b border-[#393939] flex items-center px-6 justify-between relative z-20">
                                <div className="flex gap-3">
                                    <div className="w-2.5 h-2.5 rounded-none bg-[#f1c21b] scale-75" />
                                    <div className="w-2.5 h-2.5 rounded-none bg-[#f1c21b] scale-75 rotate-45" />
                                    <div className="w-2.5 h-2.5 rounded-none bg-[#24a148] scale-75" />
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-[10px] font-mono font-black text-[var(--cds-text-placeholder)] uppercase tracking-[0.4em]">system_active_v3.0.0</div>
                                    <div className="h-4 w-[1px] bg-[var(--cds-layer-03)]" />
                                    <div className="text-[10px] font-mono font-black text-[var(--cds-support-warning)] animate-pulse uppercase tracking-[0.2em]">Live Stream</div>
                                </div>
                            </div>

                            <div className="p-12 space-y-6 min-h-[600px] flex flex-col justify-end relative z-20">
                                <AnimatePresence mode="popLayout">
                                    {auditLogs.map((log) => (
                                        <motion.div
                                            key={log.id}
                                            initial={{ opacity: 0, scale: 0.98, y: 15 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 1.02, y: -15 }}
                                            className="p-8 border border-[var(--cds-layer-03)] bg-[var(--cds-layer-01)]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-8 group/item hover:border-[var(--cds-support-warning)] transition-all relative overflow-hidden will-change-transform"
                                        >
                                            <div className="absolute top-0 left-0 w-[2px] h-0 bg-[var(--cds-support-warning)] group-hover/item:h-full transition-all duration-300" />

                                            <div className="flex items-center gap-8">
                                                <div className="w-12 h-12 border border-[var(--cds-layer-03)] flex items-center justify-center font-mono text-[10px] text-[var(--cds-text-placeholder)] group-hover/item:border-[var(--cds-support-warning)]/50 group-hover/item:text-[var(--cds-support-warning)]">
                                                    ID_{log.id}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="w-1.5 h-1.5 bg-[var(--cds-support-warning)]" />
                                                        <div className="text-[10px] font-black text-[var(--cds-support-warning)] uppercase tracking-[0.3em] font-mono">{log.task}</div>
                                                    </div>
                                                    <div className="text-2xl font-black uppercase tracking-tighter text-[var(--cds-text-primary)]">PROTOCOL_ENFORCEMENT</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-16">
                                                <div className="text-right hidden sm:block">
                                                    <div className="text-[10px] font-black text-[var(--cds-text-placeholder)] uppercase tracking-[0.4em] mb-1">Hash_Key</div>
                                                    <div className="text-[10px] font-mono text-[var(--cds-layer-03)]">SHA_256: 8C4B...77D0</div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-[10px] font-black text-[var(--cds-text-placeholder)] uppercase tracking-[0.4em] mb-1">Match</div>
                                                    <div className="text-4xl font-black text-[var(--cds-text-primary)] tracking-tighter tabular-nums">{log.score}%</div>
                                                </div>

                                                <div className="px-6 py-2 bg-[var(--cds-support-success)]/10 border border-[var(--cds-support-success)]/30 text-[var(--cds-support-success)] text-[10px] font-black uppercase tracking-[0.3em] font-mono shadow-[0_0_15px_rgba(36,161,72,0.1)]">
                                                    {log.status}_OK
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div className="mt-12 flex justify-between items-center text-[var(--cds-text-placeholder)] font-mono text-[10px] uppercase tracking-[0.4em] font-black border-t border-[var(--cds-layer-01)] pt-8">
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="w-1 px-1 h-3 bg-[var(--cds-layer-01)] group-hover/item:bg-[var(--cds-support-warning)] transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />)}
                                        </div>
                                        <span>[ ENCRYPTED_CHANNEL_OPEN ]</span>
                                    </div>
                                    <span className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-[#24a148] animate-ping" />
                                        RE-SYNCING_ALL_NODES... [ v3.0.0 ]
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* NEW: ROI / IMPACT SECTION */}
            <section className="py-64 px-8 border-t border-[#1a1a1a]/10 dark:border-[#1a1a1a]">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="bg-[var(--cds-support-warning)] p-12 text-[var(--cds-layer-01)] relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-6xl font-black tracking-tighter mb-4">60%</h3>
                                <div className="text-xl font-bold uppercase tracking-widest mb-8 border-b-2 border-black/10 pb-4 inline-block">Velocity</div>
                                <p className="font-medium text-lg leading-tight opacity-80">Faster campaign concept-to-delivery time for global teams.</p>
                            </div>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                        </div>
                        <div className="bg-[var(--cds-layer-01)] p-12 text-[var(--cds-text-primary)] relative overflow-hidden group border border-[var(--cds-layer-02)]">
                            <div className="relative z-10">
                                <h3 className="text-6xl font-black tracking-tighter mb-4 text-[var(--cds-interactive-01)]">100%</h3>
                                <div className="text-xl font-bold uppercase tracking-widest mb-8 border-b-2 border-white/10 pb-4 inline-block">Consistency</div>
                                <p className="font-medium text-lg leading-tight opacity-60">Eliminate "Brand Drift" across all channels and external partners.</p>
                            </div>
                        </div>
                        <div className="bg-[#f4f4f4] p-12 text-[#161616] relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-6xl font-black tracking-tighter mb-4">$2.4M</h3>
                                <div className="text-xl font-bold uppercase tracking-widest mb-8 border-b-2 border-black/10 pb-4 inline-block">Savings</div>
                                <p className="font-medium text-lg leading-tight opacity-80">Recovered annual revenue lost to fragmented creative workflows.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. TRUST & PRICING: THE NEW STANDARD */}
            <section id="pricing" className="py-64 px-8 border-t border-[#1a1a1a]/10 dark:border-[#1a1a1a] transition-colors">
                <div className="max-w-[1800px] mx-auto flex flex-col items-center">
                    <motion.div {...fastFadeIn} className="text-center mb-24">
                        <h2 className="text-[clamp(3rem,6vw,8rem)] font-black tracking-tighter uppercase leading-none mb-8">
                            The New Standard.
                        </h2>
                        <p className="text-xl text-[#c6c6c6] font-light max-w-4xl mx-auto">
                            Used by forward-thinking teams to eliminate manual overhead and build the future of branding.
                        </p>
                    </motion.div>

                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#393939]/20 dark:bg-[#393939] border border-[#393939]/20 dark:border-[#393939] w-full"
                    >
                        {[
                            { name: "Creator", price: "Free", desc: "Build your personal DNA.", color: resolvedTheme === 'dark' ? '#ffffff' : 'var(--cds-layer-01)' },
                            { name: "Pro", price: "$49", desc: "For teams who want speed.", color: "var(--cds-interactive-01)" },
                            { name: "Enterprise", price: "Custom", desc: "Total governance at scale.", color: "var(--cds-support-warning)" }
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                {...fastFadeIn}
                                whileHover={{ y: -10, zIndex: 10 }}
                                className="p-12 bg-background flex flex-col h-full relative overflow-hidden group hover:bg-foreground/5 will-change-transform hardware-accelerated transition-colors duration-500"
                            >
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-foreground/10 group-hover:bg-[#f1c21b] transition-colors duration-500" style={{ backgroundColor: plan.color + '40' }} />
                                <div className="absolute top-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" style={{ backgroundColor: plan.color }} />

                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#525252] mb-8 group-hover:text-foreground transition-colors duration-500">Protocol_Tier_0{i + 1}</div>
                                <h3 className="text-4xl font-black uppercase mb-2 tracking-tighter group-hover:translate-x-1 transition-transform duration-500">{plan.name}</h3>
                                <div className="text-6xl font-black mb-10 tracking-tighter tabular-nums">{plan.price}<span className="text-sm opacity-30 tracking-normal font-normal">/mo</span></div>
                                <p className="text-lg font-light text-[#c6c6c6] mb-12 flex-1 leading-tight group-hover:text-foreground transition-colors duration-500">{plan.desc}</p>
                                <Button
                                    onClick={onLoginClick}
                                    style={{
                                        backgroundColor: i === 1 ? '#0f62fe' : 'transparent',
                                        border: i === 1 ? 'none' : '1px solid currentColor',
                                        borderColor: plan.color + '40'
                                    }}
                                    className="w-full h-14 rounded-none text-xs font-black uppercase tracking-widest relative group/btn overflow-hidden transition-colors"
                                >
                                    <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-background">Select Access</span>
                                    <div className="absolute inset-0 bg-foreground translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-80 px-8 relative overflow-hidden flex flex-col items-center text-center hardware-accelerated">
                <div className="absolute inset-0 bg-[var(--cds-interactive-01)] aura-glow z-0" />
                <div className="mesh-gradient opacity-100 rotate-12 scale-150 relative z-0" />

                <div className="relative z-10 max-w-[1200px]">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[clamp(4rem,12vw,15rem)] font-black tracking-[-0.04em] leading-[0.8] uppercase mb-16 italic text-white">
                            ACTIVATE <br /> THE DNA.
                        </h2>
                        <p className="text-3xl md:text-5xl font-light mb-24 opacity-90 max-w-4xl mx-auto leading-tight text-white/90">
                            The future doesn't have PDFs. <br /> It has Brand OS.
                        </p>
                        <Button onClick={onLoginClick} variant="ghost" size="lg" className="bg-white !text-black hover:bg-white/90 hover:!text-black h-24 px-24 rounded-none text-2xl font-black uppercase tracking-widest shadow-[0_0_100px_rgba(255,255,255,0.4)] transition-all hover:scale-110 active:scale-95">
                            Initialize Now
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* 6. FOOTER: MINIMALIST & TECHNICAL */}
            <footer className="py-24 px-8 border-t border-[var(--cds-layer-02)] bg-[var(--cds-ui-background)]">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[var(--cds-interactive-01)] flex items-center justify-center aura-glow">
                                    <Zap className="text-[var(--cds-icon-primary)]" size={20} fill="currentColor" />
                                </div>
                                <span className="text-xl font-black tracking-tighter uppercase mr-4 text-[var(--cds-text-primary)]">Brand OS</span>
                            </div>
                            <p className="text-[var(--cds-text-secondary)] font-light max-w-sm mb-12">
                                The operating system for visual doctrine. <br />
                                Scale your identity, not just your assets.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
                            {[
                                { title: "Product", links: ["Identity", "Doctrine", "Studio", "Audit"] },
                                { title: "Company", links: ["Manifesto", "Careers", "Contact", "Press"] },
                                { title: "Resources", links: ["Documentation", "API Reference", "Status", "Security"] },
                                { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Licenses"], isAction: true }
                            ].map((col, i) => (
                                <div key={i}>
                                    <h4 className="text-[12px] font-bold uppercase tracking-widest text-[var(--cds-text-secondary)] mb-6">{col.title}</h4>
                                    <ul className="space-y-4">
                                        {col.links.map((link, j) => (
                                            <li key={j}>
                                                <button
                                                    onClick={() => {
                                                        if (col.isAction && link === 'Terms') onInfoClick('terms');
                                                        if (col.isAction && link === 'Privacy') onInfoClick('privacy');
                                                    }}
                                                    className="text-[14px] text-[var(--cds-text-secondary)] hover:text-[var(--cds-interactive-01)] transition-colors text-left font-mono tracking-wider"
                                                >
                                                    {link}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-24 pt-8 border-t border-[var(--cds-layer-02)] flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-[var(--cds-text-secondary)] uppercase tracking-wider font-mono">
                        <div>© 2026 Brand OS Inc. All Systems Operational.</div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--cds-support-success)] animate-pulse" />
                            System Status: Nominal
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
