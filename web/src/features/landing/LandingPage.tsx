import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    Zap, Shield, Layout, Sparkles, ArrowRight, Github, Twitter,
    Layers, BarChart3, Globe, Code, ChevronDown, Check, AlertTriangle,
    Database, Users, Lock, ChevronRight, Activity, Cpu
} from 'lucide-react';
import { Button } from '@/components/ui';

interface LandingPageProps {
    onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [auditLogs, setAuditLogs] = useState([
        { id: '822', status: 'COMPLIANT', score: 98.2, type: 'COLOR_MATCH' },
        { id: '144', status: 'COMPLIANT', score: 94.7, type: 'SPATIAL_GEN' },
        { id: '091', status: 'COMPLIANT', score: 99.8, type: 'VIBE_CHECK' },
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
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#161616] text-white selection:bg-[#0f62fe]/30 font-sans relative overflow-x-hidden">
            <div className="cinematic-noise" />

            {/* Global Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#0f62fe] origin-left z-[60]" style={{ scaleX }} />

            {/* Gradient Mesh Background */}
            <div className="mesh-gradient opacity-40 pointer-events-none" />

            {/* Structural Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

            {/* Navigation (Carbon UI Shell) */}
            <nav className="fixed top-0 w-full z-50 border-b border-[#393939] bg-[#161616]/90 backdrop-blur-xl h-12">
                <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#0f62fe] flex items-center justify-center aura-glow">
                                <Zap className="text-white" size={16} fill="currentColor" />
                            </div>
                            <span className="text-[14px] font-bold tracking-widest uppercase hidden sm:inline">Brand OS</span>
                        </div>
                        <div className="h-4 w-px bg-[#393939] hidden lg:block" />
                        <div className="hidden lg:flex items-center gap-8 text-[12px] font-medium text-[#c6c6c6] uppercase tracking-wider">
                            <a href="#problem" className="hover:text-white transition-colors">The Crisis</a>
                            <a href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</a>
                            <a href="#governance" className="hover:text-white transition-colors">Governance</a>
                            <a href="#pricing" className="hover:text-white transition-colors">Economics</a>
                        </div>
                    </div>

                    <div className="flex items-center h-full">
                        <div className="hidden sm:flex items-center px-4 text-[10px] font-mono text-[#525252] tracking-widest">
                            [SYSTEM: OPERATIONAL]
                        </div>
                        <Button onClick={onLoginClick} variant="ghost" className="text-[11px] uppercase tracking-widest font-bold px-6 h-12 hover:bg-[#393939] rounded-none border-l border-[#393939]">
                            Log In
                        </Button>
                        <Button onClick={onLoginClick} className="bg-[#0f62fe] text-white text-[11px] uppercase tracking-widest font-bold rounded-none h-12 px-8 hover:bg-[#0043ce] transition-colors border-l border-[#393939]">
                            Request Access
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section: Mega Typography */}
            <section className="relative pt-48 pb-64 px-6 z-10 border-b border-[#393939]">
                <div className="max-w-[1600px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="text-[#0f62fe] text-[13px] font-bold uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                            <span className="w-12 h-px bg-[#0f62fe]" />
                            Enterprise Creative Protocol v2.5
                        </div>

                        <h1 className="text-[clamp(3.5rem,10vw,10rem)] font-semibold tracking-tighter leading-[0.9] uppercase mb-12 text-glow">
                            Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#525252] italic font-light">Identity</span>. <br />
                            Not Just Your Output.
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                            <div className="lg:col-span-6">
                                <p className="text-xl md:text-2xl text-[#c6c6c6] max-w-2xl leading-tight font-light mb-12">
                                    Stop managing assets. Start orchestrating DNA. <br />
                                    Brand OS transforms fragmented workflows into a single,
                                    AI-powered source of truth for the global enterprise.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button onClick={onLoginClick} size="lg" className="bg-[#0f62fe] text-white hover:bg-[#0043ce] h-16 px-12 rounded-none text-[14px] font-bold uppercase tracking-widest group aura-glow">
                                        Initialize Protocol <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" size={18} />
                                    </Button>
                                    <button className="h-16 px-12 border border-[#393939] text-[#f4f4f4] hover:bg-[#393939] text-[14px] font-bold uppercase tracking-widest transition-colors">
                                        View Architecture
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-span-6 flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-[11px] font-mono text-[#525252] uppercase tracking-[0.3em] mb-4">
                                    <Activity size={12} className="text-[#0f62fe] animate-pulse" /> Live Operational Feed
                                </div>
                                <div className="space-y-2">
                                    <AnimatePresence mode="popLayout">
                                        {auditLogs.map((log) => (
                                            <motion.div
                                                key={log.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="h-10 border border-[#393939] bg-[#262626]/20 flex items-center justify-between px-6 backdrop-blur-md"
                                            >
                                                <div className="flex gap-3 items-center">
                                                    <div className="w-1.5 h-1.5 bg-[#0f62fe]" />
                                                    <span className="text-[10px] font-mono text-[#c6c6c6]">{log.type}_{log.id}</span>
                                                </div>
                                                <span className="text-[10px] font-mono text-[#0f62fe]">{log.score}% VALIDATED</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section: The Crisis (The Drift) */}
            <section id="problem" className="py-48 px-6 bg-transparent border-b border-[#393939] relative">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <motion.div className="lg:col-span-5" {...fadeIn}>
                        <div className="sticky top-32">
                            <h2 className="text-6xl font-semibold tracking-tighter leading-none uppercase mb-12">
                                YOUR BRAND <br /> GUIDELINES <br /> ARE <span className="italic font-light text-[#525252]">DEAD.</span>
                            </h2>
                            <p className="text-xl text-[#c6c6c6] leading-relaxed font-light mb-8">
                                Traditional manuals are static PDFs that humans ignore and AI can't read.
                                This leads to **Brand Drift**—the slow, expensive erosion of your visual equity
                                across thousands of touchpoints.
                            </p>
                            <div className="p-8 border border-[#393939] bg-[#262626]/40 backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#0f62fe]" />
                                <div className="text-[11px] font-bold text-[#0f62fe] uppercase tracking-widest mb-4">The Impact</div>
                                <div className="text-5xl font-semibold mb-2">$2,400,000+</div>
                                <div className="text-[12px] text-[#525252] uppercase font-medium tracking-widest">
                                    Annual Resource Leak Due to Fragmented Governance
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="lg:col-span-7 space-y-32 pt-24">
                        {[
                            {
                                head: "Fragmented Intelligence",
                                sub: "Your brand lives in Slack threads and sub-folders. It needs to live in an executable engine.",
                                icon: <Cpu className="text-[#0f62fe]" size={56} strokeWidth={0.5} />
                            },
                            {
                                head: "Generative Chaos",
                                sub: "95% of AI-generated content fails brand compliance on the first pass. We fix this at the source.",
                                icon: <AlertTriangle className="text-[#0f62fe]" size={56} strokeWidth={0.5} />
                            },
                            {
                                head: "Manual Audit Atrophy",
                                sub: "Review cycles are the graveyard of velocity. Brand OS automates the audit in milliseconds.",
                                icon: <Shield className="text-[#0f62fe]" size={56} strokeWidth={0.5} />
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="flex gap-16 items-start max-w-2xl group"
                            >
                                <div className="shrink-0 pt-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{item.icon}</div>
                                <div>
                                    <h3 className="text-4xl font-semibold tracking-tight mb-6 uppercase group-hover:text-[#0f62fe] transition-colors">{item.head}</h3>
                                    <p className="text-lg text-[#c6c6c6] font-light leading-snug">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section: Infrastructure (Feature Deep Dives) */}
            <section id="infrastructure" className="py-48 px-6 bg-[#262626]/50 backdrop-blur-sm relative border-b border-[#393939]">
                <div className="max-w-[1600px] mx-auto flex flex-col items-center mb-48">
                    <motion.div className="text-center max-w-4xl" {...fadeIn}>
                        <div className="text-[#0f62fe] text-[13px] font-bold uppercase tracking-[0.4em] mb-8">System Components</div>
                        <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter uppercase mb-12">
                            PRECISION **INFRASTRUCTURE**
                        </h2>
                    </motion.div>
                </div>

                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#393939] border border-[#393939]">
                    {/* Feature Card: AI Studio */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-16 bg-[#161616] group hover:bg-[#1a1a1a] transition-all duration-700"
                    >
                        <div className="text-[#0f62fe] mb-16 h-12 flex items-end">
                            <Cpu size={48} strokeWidth={0.5} className="group-hover:rotate-90 transition-transform duration-1000" />
                        </div>
                        <h3 className="text-5xl font-semibold tracking-tight mb-8 uppercase">AI STUDIO</h3>
                        <p className="text-[#c6c6c6] text-xl font-light leading-relaxed mb-16 max-w-lg">
                            One interface to orchestrate Gemini, Claude, and DALL-E through
                            the lens of your Brand DNA. No more trial and error.
                        </p>
                        <div className="space-y-8">
                            {[
                                { label: "Multi-Model Prompt Routing", value: 100 },
                                { label: "Semantic Vibe Control", value: 85 },
                                { label: "Iterative Refinement Logic", value: 92 }
                            ].map((spec, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between text-[11px] font-mono text-[#525252] uppercase tracking-[0.3em]">
                                        <span>{spec.label}</span>
                                        <span className="text-[#0f62fe] font-bold">{spec.value}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#262626] relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${spec.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                            className="h-full bg-[#0f62fe] aura-glow"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Feature Card: Moodboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-16 bg-[#161616] group hover:bg-[#1a1a1a] transition-all duration-700"
                    >
                        <div className="text-[#0f62fe] mb-16 h-12 flex items-end">
                            <Layers size={48} strokeWidth={0.5} className="group-hover:translate-x-4 transition-transform duration-1000" />
                        </div>
                        <h3 className="text-5xl font-semibold tracking-tight mb-8 uppercase">MOODBOARD CANVAS</h3>
                        <p className="text-[#c6c6c6] text-xl font-light leading-relaxed mb-16 max-w-lg">
                            A node-based workflow designer where you assemble visual logic gates.
                            Connect reference images to style attributes instantly.
                        </p>
                        <div className="relative border border-[#393939] aspect-video bg-[#262626]/20 overflow-hidden flex items-center justify-center group/canvas shrink-0">
                            <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'linear-gradient(#393939 1px, transparent 1px), linear-gradient(90deg, #393939 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                            <div className="flex gap-8 items-center z-10 scale-125 md:scale-150">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 2, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-20 h-28 border border-[#0f62fe] bg-[#161616] flex flex-col p-2 shadow-2xl aura-glow"
                                >
                                    <div className="flex-1 bg-[#393939]/30" />
                                    <div className="h-3 w-full bg-[#0f62fe]/40 mt-2" />
                                </motion.div>
                                <motion.div
                                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <ArrowRight className="text-[#0f62fe]" size={32} />
                                </motion.div>
                                <motion.div
                                    animate={{
                                        y: [0, 10, 0],
                                        rotate: [0, -2, 0]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-16 h-16 rounded-none border border-[#0f62fe] bg-[#161616] flex items-center justify-center shadow-2xl group-hover/canvas:scale-110 transition-transform duration-700"
                                >
                                    <Cpu size={24} className="text-[#0f62fe]" strokeWidth={1} />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section: Comparison & Economics */}
            <section id="pricing" className="py-48 px-6 border-b border-[#393939]">
                <div className="max-w-[1600px] mx-auto">
                    <motion.div className="mb-32" {...fadeIn}>
                        <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter uppercase mb-8">THE **PRECISION** ADVANTAGE.</h2>
                        <p className="text-2xl text-[#c6c6c6] font-light max-w-3xl leading-snug">Why global enterprises are switching from manual approvals to executable governance.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="overflow-x-auto no-scrollbar border border-[#393939]"
                    >
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#262626] border-b border-[#393939]">
                                    <th className="p-10 text-[11px] font-bold uppercase tracking-[0.3em] text-[#525252]">METRIC_DEFINITION</th>
                                    <th className="p-10 text-[11px] font-bold uppercase tracking-[0.3em] text-[#525252]">GENERAL_AI</th>
                                    <th className="p-10 text-[11px] font-bold uppercase tracking-[0.3em] text-white bg-[#0f62fe]/10 border-x border-[#0f62fe]">BRAND_OS_PROTOCOL</th>
                                    <th className="p-10 text-[11px] font-bold uppercase tracking-[0.3em] text-[#525252]">CREATIVE_AGENCY</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] font-medium uppercase tracking-wider">
                                {[
                                    { label: "Compliance Accuracy", ai: "⚠️ ~15%", bos: "💎 99.8%", agency: "✅ 95.0%" },
                                    { label: "Revision Latency", ai: "⚡ Seconds (Manual)", bos: "⚡ Milliseconds (Auto)", agency: "🐌 Days/Weeks" },
                                    { label: "Protocol Governance", ai: "❌ None", bos: "🛡️ RLS-Enforced", agency: "✅ Manual Oversight" },
                                    { label: "Deployment Velocity", ai: "F-Tier", bos: "S-Tier", agency: "B-Tier" }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[#393939] group hover:bg-[#262626]/30 transition-colors">
                                        <td className="p-10 font-bold border-r border-[#393939] text-[#c6c6c6]">{row.label}</td>
                                        <td className="p-10 text-[#525252]">{row.ai}</td>
                                        <td className="p-10 text-[#0f62fe] bg-[#0f62fe]/5 border-x border-[#0f62fe]/50 font-bold text-glow">{row.bos}</td>
                                        <td className="p-10 text-[#525252]">{row.agency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* Section: Enterprise FAQ (Accordion) */}
            <section className="py-48 px-6 bg-[#161616] relative">
                <div className="max-w-[1200px] mx-auto relative z-10">
                    <motion.div className="text-center mb-32" {...fadeIn}>
                        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter uppercase">TECHNICAL **SPECIFICATIONS**</h2>
                    </motion.div>

                    <div className="border-t border-[#393939]">
                        {[
                            {
                                q: "How does the system ingest legacy brand guidelines?",
                                a: "We ingest 5-10 high-resolution reference assets per brand. Our AI extracts color ratios, compositional patterns, and stylistic signatures into a JSON-based Visual Doctrine profile."
                            },
                            {
                                q: "Is our proprietary brand data isolated?",
                                a: "Yes. Every brand profile is protected by Supabase Row Level Security (RLS) at the infrastructure level. Your models and profiles are never shared between organizations."
                            },
                            {
                                q: "Can we integrate with our existing CMS and Figma?",
                                a: "Brand OS provides direct webhooks for CMS updates and a dedicated API for pushing brand-aligned assets directly to Figma Team Libraries."
                            },
                            {
                                q: "What is the average ROI of implementation?",
                                a: "Enterprises typically see a 60% reduction in total creative revision hours and a 3x increase in cross-channel asset velocity within 90 days."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-[#393939] overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full py-12 flex items-center justify-between text-left group hover:px-4 transition-all duration-500"
                                >
                                    <span className="text-2xl font-semibold tracking-tight uppercase group-hover:text-[#0f62fe] transition-colors">{faq.q}</span>
                                    <div className={`p-2 transition-all duration-500 ${openFaq === i ? 'rotate-180 bg-[#0f62fe] text-white' : 'text-[#525252]'}`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <p className="pb-12 px-4 text-xl text-[#c6c6c6] font-light leading-relaxed max-w-4xl border-l-2 border-[#0f62fe] my-4 ml-2">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-72 px-6 bg-transparent overflow-hidden border-t border-[#393939]">
                <div className="absolute inset-0 bg-[#0f62fe] opacity-90 z-0" />
                <div className="mesh-gradient opacity-100 z-0 scale-150 rotate-45" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-[1600px] mx-auto text-center relative z-10"
                >
                    <h2 className="text-[clamp(3rem,8vw,8rem)] font-semibold tracking-tighter uppercase leading-[0.9] mb-12 text-white">
                        INITIALIZE THE <br /> **FUTURE** PROTOCOL.
                    </h2>
                    <p className="text-2xl md:text-3xl font-light mb-20 text-white/90 max-w-3xl mx-auto leading-tight">
                        Transform your brand management into high-performance executive logic.
                    </p>
                    <Button onClick={onLoginClick} size="lg" className="bg-white text-[#0f62fe] hover:bg-white/90 h-24 px-20 rounded-none text-2xl font-bold uppercase tracking-[0.2em] shadow-[0_0_100px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95">
                        Request Access
                    </Button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-32 px-6 border-t border-[#393939] relative z-10 bg-[#161616]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 bg-[#0f62fe] flex items-center justify-center aura-glow">
                                <Zap className="text-white" size={20} fill="currentColor" />
                            </div>
                            <span className="font-bold tracking-[0.3em] uppercase text-xl">Brand OS</span>
                        </div>
                        <p className="text-[#525252] text-[12px] max-w-sm leading-loose uppercase tracking-[0.3em] font-medium">
                            The Operating System for Visual Doctrine. <br />
                            Engineered for Global Precision. <br />
                            V2.5.0 STABLE_PRODUCTION_BUILD.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-16 col-span-1 md:col-span-2">
                        <div>
                            <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#c6c6c6] mb-12">Protocol</h4>
                            <div className="flex flex-col gap-6 text-[14px] text-[#525252] font-mono uppercase tracking-widest">
                                <a href="#" className="hover:text-white transition-colors">Documentation</a>
                                <a href="#" className="hover:text-white transition-colors">API_Reference</a>
                                <a href="#" className="hover:text-white transition-colors">Security</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#c6c6c6] mb-12">Network</h4>
                            <div className="flex gap-12 text-[#525252]">
                                <a href="#" className="hover:text-white transition-colors"><Twitter size={24} strokeWidth={1} /></a>
                                <a href="#" className="hover:text-white transition-colors"><Github size={24} strokeWidth={1} /></a>
                                <a href="#" className="hover:text-white transition-colors"><Code size={24} strokeWidth={1} /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1600px] mx-auto mt-64 pt-12 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-[#393939] uppercase tracking-[0.5em]">
                    <div>© 2026 BRAND_DNA_ORCHESTRATOR — ALL_RIGHTS_RESERVED</div>
                    <div className="text-[#525252]">INTELLIGENT_CREATIVE_GOVERNANCE</div>
                </div>
            </footer>
        </div>
    );
};
