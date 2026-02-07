import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import {
    Zap, Shield, ArrowRight, Github, Twitter,
    Layers, Code, ChevronDown, Activity, Cpu,
    Target, Command, Globe, Info, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui';

interface LandingPageProps {
    onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { scrollYProgress } = useScroll();

    // High-speed spring progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30,
        restDelta: 0.001
    });

    const [auditLogs, setAuditLogs] = useState([
        { id: '822', status: 'OK', score: 98.2, task: 'DNA_SYNC' },
        { id: '144', status: 'OK', score: 94.7, task: 'VISUAL_AUDIT' },
        { id: '091', status: 'OK', score: 99.8, task: 'PALETTE_LOCK' },
        { id: '042', status: 'OK', score: 96.5, task: 'RULE_ENFORCE' },
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
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as any }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-[#f4f4f4] selection:bg-[#0f62fe]/30 font-sans relative overflow-x-hidden">
            <div className="cinematic-noise" />

            {/* Global Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#0f62fe] origin-left z-[70]" style={{ scaleX }} />

            {/* Gradient Mesh (Refined for Higher Visibility) */}
            <div className="mesh-gradient opacity-50 pointer-events-none" />

            {/* Technical Grid Overlay */}
            <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }} />

            {/* Top Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-[#1a1a1a] bg-[#000000]/80 backdrop-blur-2xl h-16">
                <div className="max-w-[1800px] mx-auto px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="w-10 h-10 bg-[#0f62fe] flex items-center justify-center aura-glow">
                                <Zap className="text-white" size={20} fill="currentColor" />
                            </div>
                            <span className="text-[18px] font-black tracking-tighter uppercase mr-4">Brand OS</span>
                        </motion.div>

                        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold text-[#6f6f6f] uppercase tracking-[0.2em]">
                            <a href="#problem" className="hover:text-white transition-colors">Problem</a>
                            <a href="#solution" className="hover:text-white transition-colors">Protocol</a>
                            <a href="#control" className="hover:text-white transition-colors">Control</a>
                            <a href="#pricing" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    <div className="flex items-center h-full gap-4">
                        <Button
                            onClick={onLoginClick}
                            variant="ghost"
                            className="text-[12px] uppercase tracking-widest font-black px-8 h-12 hover:bg-[#1a1a1a] rounded-none text-white transition-all"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={onLoginClick}
                            className="bg-[#0f62fe] text-white text-[12px] uppercase tracking-widest font-black rounded-none h-12 px-10 hover:bg-[#0043ce] transition-all aura-glow"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* 1. HERO: BOLD & SIMPLE */}
            <section className="relative min-h-screen flex flex-col justify-center pt-32 px-8 z-10">
                <div className="max-w-[1800px] mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#0f62fe]/10 border border-[#0f62fe]/20 rounded-full mb-12">
                            <div className="w-2 h-2 rounded-full bg-[#0f62fe] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0f62fe]">Next Gen AI Protocol Enabled</span>
                        </div>

                        <h1 className="text-[clamp(4rem,12vw,14rem)] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-16 text-glow">
                            AI that <span className="italic font-light text-[#525252]">knows</span> <br />
                            your brand.
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                            <div className="lg:col-span-7">
                                <p className="text-2xl md:text-4xl text-[#c6c6c6] max-w-3xl leading-[1.1] font-light mb-16">
                                    Stop writing manuals. Start running code. <br />
                                    Brand OS is the first system that teaches AI how to look,
                                    speak, and act exactly like your brand.
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    <Button onClick={onLoginClick} className="bg-[#0f62fe] text-white hover:bg-[#0043ce] h-20 px-16 rounded-none text-[16px] font-black uppercase tracking-widest group aura-glow transition-all hover:scale-105">
                                        Launch System <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={24} />
                                    </Button>
                                    <Button onClick={onLoginClick} variant="secondary" className="h-20 px-16 border-[#393939] text-white hover:bg-[#1a1a1a] rounded-none text-[16px] font-black uppercase tracking-widest transition-all">
                                        View Demo
                                    </Button>
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex flex-col justify-end pt-20 lg:pt-0">
                                <div className="p-8 border-l border-t border-[#393939] bg-[#161616]/40 backdrop-blur-xl">
                                    <div className="text-[10px] font-black text-[#525252] uppercase tracking-[0.4em] mb-4">Core Statistics</div>
                                    <div className="grid grid-cols-2 gap-12">
                                        <div>
                                            <div className="text-5xl font-black mb-1">99.8%</div>
                                            <div className="text-[10px] font-bold text-[#0f62fe] uppercase tracking-widest">Accuracy</div>
                                        </div>
                                        <div>
                                            <div className="text-5xl font-black mb-1">3.5s</div>
                                            <div className="text-[10px] font-bold text-[#0f62fe] uppercase tracking-widest">Turnaround</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

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
            <section id="problem" className="py-64 px-8 border-t border-[#1a1a1a] relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <motion.div {...fastFadeIn}>
                        <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-black tracking-tighter leading-[0.9] uppercase mb-12">
                            The Mess.
                        </h2>
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="w-1 px-1 bg-[#f1c21b] h-full" />
                                <div>
                                    <h3 className="text-3xl font-bold uppercase mb-4 text-[#f1c21b]">Manual Speed</h3>
                                    <p className="text-xl text-[#c6c6c6] font-light max-w-lg">
                                        Humans are too slow for the AI era. Review loops kill momentum.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8 group">
                                <div className="w-1 px-1 bg-[#f1c21b] h-full" />
                                <div>
                                    <h3 className="text-3xl font-bold uppercase mb-4 text-[#f1c21b]">AI Drift</h3>
                                    <p className="text-xl text-[#c6c6c6] font-light max-w-lg">
                                        Raw AI doesn't know your style. It creates junk that dilutes your brand.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="aspect-square bg-[#161616] border border-[#393939] relative flex items-center justify-center aura-glow"
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

            {/* 3. THE SOLUTION: THE 2026 WAY */}
            <section id="solution" className="py-64 px-8 bg-[#0f62fe] text-white">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div {...fastFadeIn} className="mb-48">
                        <h2 className="text-[clamp(4rem,10vw,12rem)] font-black tracking-tighter leading-[0.85] uppercase mb-12">
                            One Protocol. <br /> Total Control.
                        </h2>
                        <p className="text-3xl md:text-5xl font-light leading-tight max-w-5xl">
                            We bridge the gap between human guidelines and AI execution.
                            Your brand DNA becomes the operating system for everything you create.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/20 border border-white/20">
                        {[
                            {
                                num: "01",
                                title: "Ingest DNA",
                                desc: "Upload 5 assets. Our AI learns your colors, patterns, and soul instantly."
                            },
                            {
                                num: "02",
                                title: "Enforce Rules",
                                desc: "Define rigid 'Grammar Rules' that AI can never break. Ever."
                            },
                            {
                                num: "03",
                                title: "Automate Output",
                                desc: "Generate thousands of perfectly branded assets in milliseconds."
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-16 bg-[#0f62fe] hover:bg-[#0043ce] transition-colors group cursor-default"
                            >
                                <div className="text-xl font-mono font-black mb-12 opacity-50 group-hover:opacity-100 transition-opacity">[{step.num}]</div>
                                <h3 className="text-5xl font-black uppercase mb-8 leading-none tracking-tighter">{step.title}</h3>
                                <p className="text-xl font-light leading-snug text-white/80">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. REAL-TIME DEMO: THE CONTROL CENTER */}
            <section id="control" className="py-64 px-8 relative border-t border-[#1a1a1a]">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
                        <motion.div className="lg:col-span-4" {...fastFadeIn}>
                            <h2 className="text-7xl font-black tracking-tighter leading-none uppercase mb-12">
                                THE CONTROL <br /> CENTER.
                            </h2>
                            <p className="text-xl text-[#c6c6c6] font-light leading-relaxed mb-12">
                                Stop guessing. Watch the system audit every pixel in real-time.
                                Secure, compliant, and lightning fast.
                            </p>
                            <Button onClick={onLoginClick} size="lg" className="bg-white text-[#000] hover:bg-[#f4f4f4] h-16 px-12 rounded-none text-[14px] font-black uppercase tracking-widest transition-all w-full">
                                Initialize Audit
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-8 bg-[#161616] border border-[#393939] p-2 aura-glow"
                        >
                            <div className="h-12 bg-[#262626] border-b border-[#393939] flex items-center px-6 justify-between">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#f1c21b]" />
                                    <div className="w-2 h-2 rounded-full bg-[#f1c21b]" />
                                    <div className="w-2 h-2 rounded-full bg-[#24a148]" />
                                </div>
                                <div className="text-[10px] font-mono font-black text-[#525252] uppercase tracking-[0.4em]">system_active_v2.5</div>
                            </div>
                            <div className="p-12 space-y-6 min-h-[500px] flex flex-col justify-end">
                                <AnimatePresence mode="popLayout">
                                    {auditLogs.map((log) => (
                                        <motion.div
                                            key={log.id}
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 1.05, y: -10 }}
                                            className="p-6 border border-[#393939] bg-[#000] flex flex-wrap items-center justify-between gap-8 group hover:border-[#0f62fe] transition-colors"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="w-10 h-10 border border-[#393939] flex items-center justify-center font-mono text-[10px] text-[#525252]">0{log.id}</div>
                                                <div>
                                                    <div className="text-[10px] font-black text-[#0f62fe] uppercase tracking-widest">{log.task}</div>
                                                    <div className="text-xl font-black uppercase tracking-tighter">PROTOCOL_CHECK</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-12">
                                                <div className="text-right">
                                                    <div className="text-[10px] font-black text-[#525252] uppercase tracking-[0.2em]">Match Score</div>
                                                    <div className="text-3xl font-black text-white">{log.score}%</div>
                                                </div>
                                                <div className="px-4 py-2 bg-[#24a148]/10 border border-[#24a148]/20 text-[#24a148] text-[10px] font-black uppercase tracking-[0.2em]">
                                                    {log.status}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div className="mt-8 flex justify-between items-center text-[#525252] font-mono text-[10px] uppercase tracking-[0.3em] font-black">
                                    <span>[SCANNING_ALL_NODES...]</span>
                                    <span className="animate-pulse">STREAMING_LIVE</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. TRUST & PRICING: THE NEW STANDARD */}
            <section id="pricing" className="py-64 px-8 border-t border-[#1a1a1a]">
                <div className="max-w-[1800px] mx-auto flex flex-col items-center">
                    <motion.div {...fastFadeIn} className="text-center mb-32">
                        <h2 className="text-[clamp(3rem,8vw,10rem)] font-black tracking-tighter uppercase leading-none mb-12">
                            The New Standard.
                        </h2>
                        <p className="text-2xl text-[#c6c6c6] font-light max-w-4xl mx-auto">
                            Used by forward-thinking teams to eliminate manual overhead and build the future of branding.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#393939] border border-[#393939] w-full">
                        {[
                            { name: "Creator", price: "Free", desc: "Build your personal DNA.", color: "white" },
                            { name: "Pro", price: "$49", desc: "For teams who want speed.", color: "#0f62fe" },
                            { name: "Enterprise", price: "Custom", desc: "Total governance at scale.", color: "#f1c21b" }
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                className="p-20 bg-[#000] flex flex-col h-full relative overflow-hidden group"
                            >
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#525252] mb-12">Protocol_Tier_0{i + 1}</div>
                                <h3 className="text-5xl font-black uppercase mb-4 tracking-tighter">{plan.name}</h3>
                                <div className="text-7xl font-black mb-12 tracking-tighter">{plan.price}<span className="text-lg opacity-30">/mo</span></div>
                                <p className="text-xl font-light text-[#c6c6c6] mb-20 flex-1 leading-tight">{plan.desc}</p>
                                <Button
                                    onClick={onLoginClick}
                                    style={{ backgroundColor: i === 1 ? '#0f62fe' : 'transparent', border: i === 1 ? 'none' : '1px solid #393939' }}
                                    className="w-full h-16 rounded-none text-sm font-black uppercase tracking-widest"
                                >
                                    Select Access
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-80 px-8 relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute inset-0 bg-[#0f62fe] aura-glow z-0" />
                <div className="mesh-gradient opacity-100 rotate-12 scale-150 relative z-0" />

                <div className="relative z-10 max-w-[1200px]">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[clamp(4rem,12vw,15rem)] font-black tracking-[-0.04em] leading-[0.8] uppercase mb-16 italic">
                            ACTIVATE <br /> THE DNA.
                        </h2>
                        <p className="text-3xl md:text-5xl font-light mb-24 opacity-90 max-w-4xl mx-auto leading-tight">
                            The future doesn't have PDFs. <br /> It has Brand OS.
                        </p>
                        <Button onClick={onLoginClick} size="lg" className="bg-white text-black hover:bg-white/90 h-24 px-24 rounded-none text-2xl font-black uppercase tracking-widest shadow-[0_0_100px_rgba(255,255,255,0.4)] transition-all hover:scale-110 active:scale-95">
                            Initialize Now
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-32 px-8 border-t border-[#1a1a1a] bg-[#000] relative z-20">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-24">
                    <div className="md:col-span-6">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 bg-[#0f62fe] flex items-center justify-center aura-glow">
                                <Zap className="text-white" size={24} fill="currentColor" />
                            </div>
                            <span className="font-black tracking-tighter uppercase text-3xl">Brand OS</span>
                        </div>
                        <p className="text-[#525252] text-sm max-w-md leading-loose uppercase tracking-[0.2em] font-black">
                            Engineered in 2026. <br />
                            Optimized for Maximum Precision. <br />
                            V3.0.0_STABLE_BUILD.
                        </p>
                    </div>

                    <div className="md:col-span-6 grid grid-cols-2 gap-20">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-12">Security</h4>
                            <div className="flex flex-col gap-6 text-[12px] text-[#525252] font-mono uppercase tracking-[0.2em] font-black">
                                <a href="#" className="hover:text-white transition-colors">Privacy_Protocol</a>
                                <a href="#" className="hover:text-white transition-colors">Audit_Logs</a>
                                <a href="#" className="hover:text-white transition-colors">Compliance</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <div className="flex gap-10 text-[#525252]">
                                <a href="#" className="hover:text-white transition-all"><Twitter size={28} strokeWidth={1} /></a>
                                <a href="#" className="hover:text-white transition-all"><Github size={28} strokeWidth={1} /></a>
                            </div>
                            <div className="text-[10px] font-mono text-[#333] font-black letter-spacing-[0.5em] text-right">
                                © 2026 DNA_SYSTEMS_GLOBAL
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
