import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="min-h-screen bg-[#161616] text-white selection:bg-[#0f62fe]/30 font-sans relative overflow-x-hidden">
            <div className="cinematic-noise" />

            {/* Structural Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

            {/* Navigation (Carbon UI Shell) */}
            <nav className="fixed top-0 w-full z-50 border-b border-[#393939] bg-[#161616]/90 backdrop-blur-xl h-12">
                <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#0f62fe] flex items-center justify-center">
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
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="text-[#0f62fe] text-[13px] font-bold uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                            <span className="w-12 h-px bg-[#0f62fe]" />
                            Enterprise Creative Protocol v2.5
                        </div>

                        <h1 className="text-[clamp(3.5rem,10vw,10rem)] font-semibold tracking-tighter leading-[0.9] uppercase mb-12">
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
                                    <Button onClick={onLoginClick} size="lg" className="bg-[#0f62fe] text-white hover:bg-[#0043ce] h-16 px-12 rounded-none text-[14px] font-bold uppercase tracking-widest group">
                                        Initialize Protocol <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" size={18} />
                                    </Button>
                                    <button className="h-16 px-12 border border-[#393939] text-[#f4f4f4] hover:bg-[#393939] text-[14px] font-bold uppercase tracking-widest transition-colors">
                                        View Architecture
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-span-6 flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-[11px] font-mono text-[#525252] uppercase tracking-[0.3em] mb-4">
                                    <Activity size={12} className="text-[#0f62fe]" /> Real-time Compliance Feed
                                </div>
                                <div className="space-y-2">
                                    {[98.2, 94.7, 99.8].map((score, i) => (
                                        <div key={i} className="h-8 border border-[#393939] bg-[#262626]/20 flex items-center justify-between px-4">
                                            <div className="flex gap-2 items-center">
                                                <div className="w-1.5 h-1.5 bg-[#0f62fe]" />
                                                <span className="text-[10px] font-mono text-[#c6c6c6]">ASSET_DNA_AUDIT_{i}</span>
                                            </div>
                                            <span className="text-[10px] font-mono text-[#0f62fe]">{score}% COMPLIANT</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section: The Crisis (The Drift) */}
            <section id="problem" className="py-48 px-6 bg-[#161616] border-b border-[#393939]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <h2 className="text-6xl font-semibold tracking-tighter leading-none uppercase mb-12">
                                YOUR BRAND <br /> GUIDELINES <br /> ARE <span className="italic font-light text-[#525252]">DEAD.</span>
                            </h2>
                            <p className="text-xl text-[#c6c6c6] leading-relaxed font-light mb-8">
                                Traditional manuals are static PDFs that humans ignore and AI can't read.
                                This leads to **Brand Drift**—the slow, expensive erosion of your visual equity
                                across thousands of touchpoints.
                            </p>
                            <div className="p-8 border border-[#393939] bg-[#262626]/30">
                                <div className="text-[11px] font-bold text-[#0f62fe] uppercase tracking-widest mb-4">The Impact</div>
                                <div className="text-4xl font-semibold mb-2">$2.4M</div>
                                <div className="text-[12px] text-[#525252] uppercase font-medium">Avg. Annual Loss Due to Inconsistent Creative Execution</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-7 space-y-32">
                        {[
                            {
                                head: "Fragmented Intelligence",
                                sub: "Your brand lives in Slack threads and sub-folders. It needs to live in an executable engine.",
                                icon: <Cpu className="text-[#0f62fe]" size={48} strokeWidth={1} />
                            },
                            {
                                head: "Generative Chaos",
                                sub: "95% of AI-generated content fails brand compliance on the first pass. We fix this at the source.",
                                icon: <AlertTriangle className="text-[#0f62fe]" size={48} strokeWidth={1} />
                            },
                            {
                                head: "Manual Audit Atrophy",
                                sub: "Review cycles are the graveyard of velocity. Brand OS automates the audit in milliseconds.",
                                icon: <Shield className="text-[#0f62fe]" size={48} strokeWidth={1} />
                            }
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeIn} className="flex gap-12 items-start max-w-2xl">
                                <div className="shrink-0 pt-4">{item.icon}</div>
                                <div>
                                    <h3 className="text-4xl font-semibold tracking-tight mb-6 uppercase">{item.head}</h3>
                                    <p className="text-lg text-[#c6c6c6] font-light leading-snug">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section: Infrastructure (Feature Deep Dives) */}
            <section id="infrastructure" className="py-48 px-6 bg-[#262626]">
                <div className="max-w-[1600px] mx-auto flex flex-col items-center mb-32">
                    <div className="text-center max-w-4xl">
                        <div className="text-[#0f62fe] text-[13px] font-bold uppercase tracking-[0.4em] mb-8">System Components</div>
                        <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter uppercase mb-12">
                            PRECISION **INFRASTRUCTURE**
                        </h2>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Feature Card: AI Studio */}
                    <div className="p-16 border border-[#393939] bg-[#161616] group hover:border-[#0f62fe] transition-colors">
                        <div className="text-[#0f62fe] mb-12"><Cpu size={40} /></div>
                        <h3 className="text-5xl font-semibold tracking-tight mb-8 uppercase">AI STUDIO</h3>
                        <p className="text-[#c6c6c6] text-xl font-light leading-relaxed mb-12">
                            One interface to orchestrate Gemini, Claude, and DALL-E through
                            the lens of your Brand DNA. No more trial and error.
                            Just brand-aligned assets on the first try.
                        </p>
                        <div className="space-y-6">
                            {[
                                { label: "Multi-Model Prompt Routing", value: 100 },
                                { label: "Semantic Vibe Control", value: 85 },
                                { label: "Iterative Refinement Logic", value: 92 }
                            ].map((spec, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-mono text-[#525252] uppercase tracking-widest">
                                        <span>{spec.label}</span>
                                        <span>{spec.value}% Capability</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#393939]">
                                        <div className="h-full bg-[#0f62fe]" style={{ width: `${spec.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature Card: Moodboard */}
                    <div className="p-16 border border-[#393939] bg-[#161616] group hover:border-[#0f62fe] transition-colors">
                        <div className="text-[#0f62fe] mb-12"><Layers size={40} /></div>
                        <h3 className="text-5xl font-semibold tracking-tight mb-8 uppercase">MOODBOARD CANVAS</h3>
                        <p className="text-[#c6c6c6] text-xl font-light leading-relaxed mb-12">
                            A node-based workflow designer where you assemble visual logic gates.
                            Connect reference images to style attributes and let the engine
                            calculate your creative trajectory.
                        </p>
                        <div className="relative border border-[#393939] aspect-video bg-[#262626]/20 overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'linear-gradient(#393939 1px, transparent 1px), linear-gradient(90deg, #393939 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            <div className="flex gap-4 items-center z-10">
                                <div className="w-24 h-32 border border-[#0f62fe] bg-[#161616] flex flex-col p-2">
                                    <div className="flex-1 bg-[#393939]/30" />
                                    <div className="h-4 w-full bg-primary/20 mt-2" />
                                </div>
                                <ArrowRight className="text-[#525252]" />
                                <div className="w-12 h-12 rounded-full border border-[#0f62fe] flex items-center justify-center animate-pulse">
                                    <Cpu size={16} className="text-[#0f62fe]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Comparison & Economics */}
            <section id="pricing" className="py-48 px-6 border-b border-[#393939]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-32">
                        <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter uppercase mb-8">THE **PRECISION** ADVANTAGE.</h2>
                        <p className="text-2xl text-[#c6c6c6] font-light max-w-3xl">Why global enterprises are switching from manual approvals to executable governance.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse border border-[#393939]">
                            <thead>
                                <tr className="bg-[#262626] border-b border-[#393939]">
                                    <th className="p-8 text-[11px] font-bold uppercase tracking-widest text-[#525252]">METRIC_DEFINITION</th>
                                    <th className="p-8 text-[11px] font-bold uppercase tracking-widest text-[#525252]">GENERAL_AI</th>
                                    <th className="p-8 text-[11px] font-bold uppercase tracking-widest text-white border-x border-[#0f62fe]">BRAND_OS_PROTOCOL</th>
                                    <th className="p-8 text-[11px] font-bold uppercase tracking-widest text-[#525252]">CREATIVE_AGENCY</th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px] font-medium uppercase tracking-wider">
                                {[
                                    { label: "Compliance Accuracy", ai: "⚠️ ~15%", bos: "💎 99.8%", agency: "✅ 95.0%" },
                                    { label: "Revision Latency", ai: "⚡ Seconds (Manual)", bos: "⚡ Milliseconds (Auto)", agency: "🐌 Days/Weeks" },
                                    { label: "Protocol Governance", ai: "❌ None", bos: "🛡️ RLS-Enforced", agency: "✅ Manual Oversight" },
                                    { label: "Deployment Velocity", ai: "Fast", bos: "Instant", agency: "Variable" }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[#393939] hover:bg-[#262626]/50">
                                        <td className="p-8 font-semibold">{row.label}</td>
                                        <td className="p-8 text-[#525252]">{row.ai}</td>
                                        <td className="p-8 text-[#0f62fe] bg-[#0f62fe]/5 border-x border-[#0f62fe]/50">{row.bos}</td>
                                        <td className="p-8 text-[#525252]">{row.agency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Section: Enterprise FAQ (Accordion) */}
            <section className="py-48 px-6 bg-[#161616]">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-5xl font-semibold tracking-tight uppercase mb-24 text-center">TECHNICAL **SPECIFICATIONS**</h2>
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
                            <div key={i} className="border-b border-[#393939]">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full py-10 flex items-center justify-between text-left group"
                                >
                                    <span className="text-xl font-medium tracking-tight uppercase">{faq.q}</span>
                                    <ChevronDown className={`text-[#525252] group-hover:text-white transition-all ${openFaq === i ? 'rotate-180 text-white' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-10 text-lg text-[#c6c6c6] font-light leading-relaxed max-w-3xl">
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
            <section className="py-64 px-6 bg-[#0f62fe] text-white text-center">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-semibold tracking-tighter uppercase leading-[0.9] mb-12">
                        READY TO **DECODE** <br /> YOUR IDENTITY?
                    </h2>
                    <p className="text-2xl font-light mb-16 opacity-90 max-w-2xl mx-auto">
                        Join the world's most innovative brands and transform your creative workflow into a high-performance protocol.
                    </p>
                    <Button onClick={onLoginClick} size="lg" className="bg-white text-[#0f62fe] hover:bg-white/90 h-20 px-16 rounded-none text-lg font-bold uppercase tracking-widest shadow-2xl">
                        Request Protocol Access
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-[#393939]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-[#0f62fe] flex items-center justify-center">
                                <Zap className="text-white" size={16} fill="currentColor" />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">Brand OS</span>
                        </div>
                        <p className="text-[#525252] text-[10px] max-w-xs leading-loose uppercase tracking-[0.2em]">
                            Carbon-Ready Creative Infrastructure <br />
                            Engineered for Precision Governance. <br />
                            V2.5 Stable Release.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 col-span-1 md:col-span-2">
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#c6c6c6] mb-8">Protocol</h4>
                            <div className="flex flex-col gap-4 text-[13px] text-[#525252] font-medium font-mono uppercase">
                                <a href="#" className="hover:text-white transition-colors">Documentation_v2</a>
                                <a href="#" className="hover:text-white transition-colors">Infrastructure_API</a>
                                <a href="#" className="hover:text-white transition-colors">Security_Whitepaper</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#c6c6c6] mb-8">Network</h4>
                            <div className="flex gap-8 text-[#525252]">
                                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                                <a href="#" className="hover:text-white transition-colors"><Code size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1600px] mx-auto mt-48 pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-[#393939] uppercase tracking-[0.4em]">
                    <div>© 2026 Brand OS — All Protocols Enforced</div>
                    <div>Precision in Creative Governance</div>
                </div>
            </footer>
        </div>
    );
};
