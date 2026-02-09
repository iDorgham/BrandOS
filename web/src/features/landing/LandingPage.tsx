import React, { useState, useEffect } from 'react';
import { ExitIntentPopup } from './ExitIntentPopup';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Shield, ArrowRight, Github, Twitter,
    Layers, Code, ChevronDown, Activity, Cpu,
    Target, Command, Globe, Info, Menu, X, ChevronRight,
    Users, Mail, Book, Terminal, Lock, Server
} from 'lucide-react';
import { Button, ThemeToggle } from '@/components/ui';
import { useTheme } from '@/contexts/ThemeContext';



interface LandingPageProps {
    onLoginClick: () => void;
    onInfoClick: (topic: 'terms' | 'privacy' | 'faq' | 'help' | 'cookies' | 'licenses') => void;
    onProductClick: (slug: 'identity' | 'doctrine' | 'studio' | 'audit') => void;
    onCompanyClick: (slug: 'manifesto' | 'careers' | 'contact' | 'press') => void;
    onResourcesClick: (slug: 'documentation' | 'api' | 'status' | 'security') => void;
    onCalculatorClick: () => void;
    onIndustriesClick: () => void;
    onCaseStudiesClick: () => void;
    onPricingClick: () => void;
}

const LiveAuditTerminal: React.FC = () => {
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
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[var(--cds-layer-02)] pt-12">
            {[
                { label: "Growth", value: "30% Faster", sub: "For 1,247 brands" },
                { label: "Efficiency", value: "8 Hours/Wk", sub: "Saved on reviews" },
                { label: "Accuracy", value: "92% Guaranteed", sub: "Visual consistency" },
                { label: "Output", value: "$50K/Month", sub: "Assets generated" }
            ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--cds-text-secondary)] mb-2">{stat.label}</span>
                    <span className="text-3xl font-black uppercase tracking-tighter text-foreground overflow-visible whitespace-nowrap">{stat.value}</span>
                    <span className="text-sm text-[var(--cds-text-secondary)] mt-1">{stat.sub}</span>
                </div>
            ))}
        </div>
    );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onInfoClick, onProductClick, onCompanyClick, onResourcesClick, onCalculatorClick, onIndustriesClick, onCaseStudiesClick, onPricingClick }) => {
    const fastFadeIn = {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    };

    return (
        <div className="min-h-screen selection:bg-[var(--cds-interactive-01)]/30 font-sans relative overflow-x-hidden">
            <ExitIntentPopup
                onStay={onCalculatorClick}
                onLeave={() => { }}
            />
            <div className="cinematic-noise" />


            {/* Gradient Mesh (Refined for Higher Visibility) */}
            <div className="mesh-gradient opacity-50 pointer-events-none" />

            {/* Technical Grid Overlay */}
            <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(var(--cds-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--cds-text-primary) 1px, transparent 1px)',
                    backgroundSize: '128px 128px'
                }} />



            {/* 1. HERO: SALES-FOCUSED & URGENT */}
            <section className="min-h-screen flex flex-col justify-center px-8 relative overflow-hidden pt-32">
                <motion.div
                    {...fastFadeIn}
                    className="max-w-[1800px] mx-auto w-full relative z-10 will-change-transform"
                >
                    <div className="inline-flex items-center gap-4 bg-[var(--cds-support-warning)]/10 border border-[var(--cds-support-warning)]/20 px-6 py-2 mb-12">
                        <div className="w-2 h-2 rounded-full bg-[var(--cds-support-warning)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--cds-support-warning)]">SYSTEM_UPDATE: BRAND_EQUITY_OPTIMIZATION_ACTIVE</span>
                    </div>

                    <h1 className="text-[clamp(3.5rem,8vw,9rem)] font-black tracking-tighter leading-[0.9] uppercase mb-12">
                        Your Brand Looks <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cds-support-warning)] to-[var(--cds-interactive-01)]">Different Every Time.</span> <br />
                        You're Losing Velocity.
                    </h1>

                    <p className="text-xl md:text-3xl font-light text-[var(--cds-text-secondary)] max-w-4xl leading-tight mb-16">
                        Brand OS guarantees <span className="text-foreground font-bold">92%+ visual consistency</span> across every asset—automatically.
                        Stop confusing customers. Start building trust that converts.
                    </p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-24">
                        <Button onClick={onCalculatorClick} variant="primary" size="lg" className="bg-[var(--cds-interactive-01)] hover:bg-[var(--cds-interactive-01)]/90 text-[var(--cds-text-on-color)] h-16 px-8 rounded-none text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(15,98,254,0.4)] transition-all hover:scale-105 active:scale-95">
                            Calculate Your Brand Velocity <ArrowRight className="ml-2" />
                        </Button>
                        <Button
                            onClick={() => window.location.href = '/demo'}
                            variant="ghost"
                            className="h-20 px-12 rounded-none text-xl font-black uppercase tracking-widest border border-[var(--cds-text-primary)]/20 hover:bg-[var(--cds-text-primary)] hover:text-[var(--cds-ui-background)] transition-all"
                        >
                            Watch 60-Second Demo
                        </Button>
                    </div>

                    {/* Trust Bar */}
                    <LiveAuditTerminal />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[var(--cds-text-secondary)]"
                >
                    <ChevronDown size={32} strokeWidth={1} />
                </motion.div>
            </section>

            {/* TRUST / SOCIAL PROOF */}
            <section className="py-12 border-b border-[var(--cds-layer-02)] bg-[var(--cds-layer-01)]">
                <div className="max-w-[1800px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--cds-text-secondary)] whitespace-nowrap">
                        Trusted by Engineering Teams at
                    </span>
                    <div className="flex items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto w-full md:w-auto">
                        {/* Placeholder Logos */}
                        {['ACME Corp', 'Globex', 'Soylent', 'Umbrella', 'Massive Dynamic'].map((brand, i) => (
                            <span key={i} className="text-lg font-black uppercase tracking-tighter">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. PAIN POINTS: QUANTIFIED LOSS */}
            <section id="problem" className="py-24 px-8 border-t border-[var(--cds-layer-02)] bg-[var(--cds-layer-01)] relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div {...fastFadeIn} className="mb-20 text-center">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-6">
                            Inconsistent Branding <br />
                            <span className="text-[var(--cds-interactive-01)]">Is Diluting Your Market Impact.</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Activity size={32} className="text-[var(--cds-interactive-01)]" />,
                                title: "Revenue Loss",
                                stat: "-23%",
                                desc: "Revenue when customers don't recognize your brand (Forbes)."
                            },
                            {
                                icon: <Layers size={32} className="text-[var(--cds-interactive-01)]" />,
                                title: "Wasted Budget",
                                stat: "$48K/Yr",
                                desc: "Lost on endless design debates and subjective reviews."
                            },
                            {
                                icon: <Users size={32} className="text-[var(--cds-interactive-01)]" />,
                                title: "Operational Drag",
                                stat: "15 Hrs/Wk",
                                desc: " wasted on manual enforcement. Your team is drowning."
                            },
                            {
                                icon: <Target size={32} className="text-[var(--cds-interactive-01)]" />,
                                title: "Competitive Disadvantage",
                                stat: "-40% CTR",
                                desc: "Compared to consistent brands that build trust instantly."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 border border-[var(--cds-layer-02)] bg-[var(--cds-ui-background)] hover:border-[var(--cds-interactive-01)] transition-colors group"
                            >
                                <div className="mb-6 p-4 bg-[var(--cds-interactive-01)]/10 w-fit rounded-full group-hover:bg-[var(--cds-interactive-01)]/20 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{item.title}</h3>
                                <div className="text-4xl font-black text-[var(--cds-interactive-01)] mb-4 tracking-tighter">{item.stat}</div>
                                <p className="text-[var(--cds-text-secondary)] leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SOLUTION: ACCORDION DEMOS */}
            <section id="solution" className="py-24 px-8 bg-[var(--cds-ui-background)]">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div {...fastFadeIn} className="mb-20">
                        <h2 className="text-[clamp(3rem,6vw,7rem)] font-black tracking-tighter uppercase leading-none mb-4">
                            How Brand OS Solves <br /> Your #1 Marketing Problem.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-4">
                            {[
                                {
                                    id: 'dna',
                                    title: "Lock Your Brand DNA",
                                    benefit: "Eliminate design debates forever.",
                                    roi: "Saves 15 hours/week ($3,200/mo)",
                                    proof: "\"Reduced approval time from 3 days to 20 minutes\" - Sarah, Acme SaaS"
                                },
                                {
                                    id: 'generate',
                                    title: "Generate Perfect Assets",
                                    benefit: "Launch campaigns 10x faster.",
                                    roi: "$50K/month in assets generated",
                                    proof: "\"300% engagement increase\" - Mike, StartupXYZ"
                                },
                                {
                                    id: 'audit',
                                    title: "Audit & Prevent Drift",
                                    benefit: "Catch violations before they cost you.",
                                    roi: "Prevents $10K+/year in rebranding",
                                    proof: "\"Caught 47 issues before $15K ad spend\" - Jessica, E-commerce"
                                }
                            ].map((item, i) => (
                                <div key={i} className="group border border-[var(--cds-layer-02)] p-8 hover:border-[var(--cds-interactive-01)] transition-colors cursor-pointer bg-[var(--cds-layer-01)]">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h3>
                                        <ChevronDown className="group-hover:rotate-180 transition-transform text-[var(--cds-interactive-01)]" />
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-xl text-[var(--cds-text-secondary)]">{item.benefit}</p>
                                        <div className="flex gap-4 text-sm font-bold uppercase tracking-wider">
                                            <span className="text-[var(--cds-interactive-01)]">ROI: {item.roi}</span>
                                        </div>
                                        <div className="text-sm italic text-[var(--cds-text-secondary)] border-l-2 border-[var(--cds-layer-03)] pl-4">
                                            {item.proof}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Demo Placeholder */}
                        <div className="aspect-square bg-[var(--cds-layer-01)] border border-[var(--cds-layer-02)] relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[var(--cds-interactive-01)]/5" />
                            <div className="text-center p-8">
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--cds-interactive-01)] mb-4">Live_Preview</div>
                                <h3 className="text-4xl font-black uppercase mb-4">Generative Studio</h3>
                                <p className="text-[var(--cds-text-secondary)] max-w-sm mx-auto mb-8">
                                    Drag, drop, and watch Brand OS generate 50 on-brand variations in real-time.
                                </p>
                                <Button variant="primary" className="h-12 px-8 uppercase tracking-widest text-xs font-black">
                                    Try Interactive Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. HOW IT WORKS: 3-STEP FLOW */}
            <section className="py-24 px-8 bg-[var(--cds-interactive-01)] text-[var(--cds-text-on-color)]">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div {...fastFadeIn} className="mb-20 text-center">
                        <h2 className="text-[clamp(3rem,6vw,7rem)] font-black tracking-tighter uppercase leading-none mb-6">
                            Three Steps to <br /> Perfection.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Upload & Extract",
                                desc: "Upload your existing assets. AI extracts your DNA (fonts, colors, vibe) in 60 seconds."
                            },
                            {
                                step: "02",
                                title: "Generate & Scale",
                                desc: "Create perfect social posts, ads, and emails instantly. 10x your output."
                            },
                            {
                                step: "03",
                                title: "Audit & Optimize",
                                desc: "Every pixel is scored. Track 92%+ consistency forever with automated guardrails."
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative p-12 border border-[var(--cds-text-on-color)]/20 hover:bg-[var(--cds-text-on-color)]/10 transition-colors group">
                                <div className="text-[80px] font-black text-[var(--cds-text-on-color)]/10 absolute top-4 right-8 select-none leading-none">
                                    {item.step}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-wide mb-6">{item.title}</h3>
                                    <p className="text-[var(--cds-text-on-color)]/80 text-lg leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="mt-8 w-12 h-1 bg-[var(--cds-text-on-color)]/20 group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SOCIAL PROOF: RESULTS */}
            <section className="py-24 px-8 border-t border-[var(--cds-layer-02)]">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div {...fastFadeIn} className="mb-20 text-center">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-6">
                            Verified Results.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            {
                                type: "SaaS Company",
                                quote: "We were losing $8K/mo on design agency retainers. Brand OS replaced them in 2 weeks.",
                                result: "$7,951/mo Saved",
                                metric: "96% Consistency"
                            },
                            {
                                type: "Marketing Agency",
                                quote: "We now charge clients 30% more for 'Guaranteed Brand Consistency'. It's a no-brainer.",
                                result: "+30% Revenue",
                                metric: "8 New Clients"
                            },
                            {
                                type: "FinTech Startup",
                                quote: "Our Series A investors specifically praised our cohesive brand presence. We look like a unicorn.",
                                result: "Series A Funded",
                                metric: "Zero Brand Drift"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-[var(--cds-layer-01)] p-8 border border-[var(--cds-layer-02)] relative group hover:border-[var(--cds-text-primary)] transition-colors">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--cds-text-secondary)] mb-6">{item.type}</div>
                                <p className="text-xl font-light italic mb-8 opacity-80">"{item.quote}"</p>
                                <div className="mt-auto border-t border-[var(--cds-layer-02)] pt-6">
                                    <div className="text-2xl font-black uppercase text-[var(--cds-interactive-01)] mb-1">{item.result}</div>
                                    <div className="text-sm font-bold text-[var(--cds-text-secondary)]">{item.metric}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. COMPARISON: BATTLE CARD */}
            <section className="py-24 px-8 bg-[var(--cds-layer-01)] border-t border-[var(--cds-layer-02)]">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div {...fastFadeIn} className="mb-20 text-center">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-6">
                            Brand OS vs. The Old Way.
                        </h2>
                    </motion.div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-[var(--cds-text-primary)]">
                                    <th className="text-left py-6 px-4 text-sm font-black uppercase tracking-widest text-[var(--cds-text-secondary)]">Solution</th>
                                    <th className="text-left py-6 px-4 text-sm font-black uppercase tracking-widest text-[var(--cds-text-secondary)]">Setup Time</th>
                                    <th className="text-left py-6 px-4 text-sm font-black uppercase tracking-widest text-[var(--cds-text-secondary)]">Cost</th>
                                    <th className="text-left py-6 px-4 text-sm font-black uppercase tracking-widest text-[var(--cds-text-secondary)]">Consistency</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-[var(--cds-interactive-01)]/10 border-b border-[var(--cds-text-primary)]">
                                    <td className="py-8 px-4 font-black uppercase text-xl text-[var(--cds-interactive-01)]">Brand OS</td>
                                    <td className="py-8 px-4 font-bold">60 Seconds</td>
                                    <td className="py-8 px-4 font-bold">$49/mo</td>
                                    <td className="py-8 px-4 font-black text-[var(--cds-interactive-01)]">92%+ Guaranteed</td>
                                </tr>
                                <tr className="border-b border-[var(--cds-layer-02)] opacity-60 hover:opacity-100 transition-opacity">
                                    <td className="py-6 px-4 font-bold">Manual Guidelines (PDF)</td>
                                    <td className="py-6 px-4">2-4 Weeks</td>
                                    <td className="py-6 px-4">$3K - $5K</td>
                                    <td className="py-6 px-4">40-60% (Drift)</td>
                                </tr>
                                <tr className="border-b border-[var(--cds-layer-02)] opacity-60 hover:opacity-100 transition-opacity">
                                    <td className="py-6 px-4 font-bold">Design Tools (Canva/Figma)</td>
                                    <td className="py-6 px-4">Ongoing</td>
                                    <td className="py-6 px-4">$30/user/mo</td>
                                    <td className="py-6 px-4">50-70% (Manual)</td>
                                </tr>
                                <tr className="opacity-60 hover:opacity-100 transition-opacity">
                                    <td className="py-6 px-4 font-bold">Creative Agency</td>
                                    <td className="py-6 px-4">2+ Weeks</td>
                                    <td className="py-6 px-4">$5K+/mo</td>
                                    <td className="py-6 px-4">60-80% (Slow)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* NEW: ROI / IMPACT SECTION */}
            <section className="py-64 px-8 border-t border-[var(--cds-layer-02)]">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="bg-[var(--cds-support-warning)] p-12 text-black relative overflow-hidden group">
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
                                <div className="text-xl font-bold uppercase tracking-widest mb-8 border-b-2 border-foreground/10 pb-4 inline-block">Consistency</div>
                                <p className="font-medium text-lg leading-tight opacity-60">Eliminate "Brand Drift" across all channels and external partners.</p>
                            </div>
                        </div>
                        <div className="bg-[var(--cds-layer-02)] p-12 text-[var(--cds-text-primary)] relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-6xl font-black tracking-tighter mb-4">$2.4M</h3>
                                <div className="text-xl font-bold uppercase tracking-widest mb-8 border-b-2 border-foreground/10 pb-4 inline-block">Savings</div>
                                <p className="font-medium text-lg leading-tight opacity-80">Recovered annual revenue lost to fragmented creative workflows.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PRICING: VALUE-BASED TEASER */}
            <section id="pricing" className="py-24 px-8 border-t border-[var(--cds-layer-02)] transition-colors">
                <div className="max-w-[1800px] mx-auto flex flex-col items-center">
                    <motion.div {...fastFadeIn} className="text-center mb-20">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-4">
                            Pays for Itself in 11 Days.
                        </h2>
                        <p className="text-xl text-[var(--cds-text-secondary)] font-light max-w-4xl mx-auto">
                            Average customer saves <span className="text-foreground font-bold">$3,700/month</span>. Stop leaking revenue today.
                        </p>
                    </motion.div>

                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--cds-layer-03)]/20 dark:bg-[var(--cds-layer-03)] border border-[var(--cds-layer-03)]/20 dark:border-[var(--cds-layer-03)] w-full"
                    >
                        {[
                            { name: "Free", price: "Free", desc: "Proof it works. 1 brand, 20 assets/mo.", color: "var(--cds-text-primary)" },
                            { name: "Pro", price: "$49", desc: "Costs less than 1 hour of agency time.", color: "var(--cds-interactive-01)", popular: true },
                            { name: "Agency", price: "$249", desc: "Charge clients $1,000/mo for consistency.", color: "var(--cds-interactive-02)" }
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                {...fastFadeIn}
                                whileHover={{ y: -10, zIndex: 10 }}
                                className="p-12 bg-background flex flex-col h-full relative overflow-hidden group hover:bg-foreground/5 will-change-transform hardware-accelerated transition-colors duration-500"
                            >
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-foreground/10 group-hover:bg-[#f1c21b] transition-colors duration-500" style={{ backgroundColor: plan.color === 'var(--cds-text-primary)' ? 'var(--cds-text-primary)' : plan.color + '40' }} />
                                <div className="absolute top-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" style={{ backgroundColor: plan.color }} />

                                {plan.popular && (
                                    <div className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-widest bg-[var(--cds-interactive-01)] text-white px-3 py-1">Most Popular</div>
                                )}

                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--cds-text-placeholder)] mb-8 group-hover:text-foreground transition-colors duration-500">Tier_0{i + 1}</div>
                                <h3 className="text-4xl font-black uppercase mb-2 tracking-tighter group-hover:translate-x-1 transition-transform duration-500">{plan.name}</h3>
                                <div className="text-6xl font-black mb-10 tracking-tighter tabular-nums">{plan.price}<span className="text-sm opacity-30 tracking-normal font-normal">/mo</span></div>
                                <p className="text-lg font-light text-[var(--cds-text-secondary)] mb-12 flex-1 leading-tight group-hover:text-foreground transition-colors duration-500">{plan.desc}</p>
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

            {/* 8. FINAL CTA: RISK REVERSAL */}
            <section className="py-80 px-8 relative overflow-hidden flex flex-col items-center text-center hardware-accelerated">
                <div className="absolute inset-0 bg-[var(--cds-interactive-01)] aura-glow z-0" />
                <div className="mesh-gradient opacity-100 rotate-12 scale-150 relative z-0" />

                <div className="relative z-10 max-w-[1200px]">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[clamp(4rem,10vw,12rem)] font-black tracking-[-0.04em] leading-[0.8] uppercase mb-12 italic text-[var(--cds-text-on-color)]">
                            Stop Losing <br /> Money.
                        </h2>
                        <p className="text-3xl md:text-5xl font-light mb-16 opacity-90 max-w-4xl mx-auto leading-tight text-[var(--cds-text-on-color)]/90">
                            Start Scaling Your Brand Today.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                            <Button onClick={onCalculatorClick} variant="primary" size="lg" className="bg-[var(--cds-ui-background)] !text-[var(--cds-text-primary)] hover:bg-[var(--cds-ui-background)]/90 h-20 px-12 rounded-none text-xl font-black uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95">
                                Calculate ROI (Free)
                            </Button>
                            <Button onClick={onLoginClick} variant="ghost" size="lg" className="border-2 border-[var(--cds-text-on-color)] text-[var(--cds-text-on-color)] hover:bg-[var(--cds-text-on-color)] hover:text-[var(--cds-interactive-01)] h-20 px-12 rounded-none text-xl font-black uppercase tracking-widest transition-all">
                                Start Free Trial
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-[var(--cds-text-on-color)]/80 text-sm font-medium tracking-wide">
                            <Shield size={16} />
                            <span>30-Day Money-Back Guarantee. Save 10 hours or full refund.</span>
                        </div>
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
                                                        if (col.isAction && link === 'Cookies') onInfoClick('cookies');
                                                        if (col.isAction && link === 'Licenses') onInfoClick('licenses');
                                                        // Product Links
                                                        if (col.title === 'Product') {
                                                            const slug = link.toLowerCase().split(' ')[0] as any;
                                                            if (['identity', 'doctrine', 'studio', 'audit'].includes(slug)) {
                                                                onProductClick(slug);
                                                            }
                                                        }
                                                        // Company Links
                                                        if (col.title === 'Company') {
                                                            const slug = link.toLowerCase() as any;
                                                            if (['manifesto', 'careers', 'contact', 'press'].includes(slug)) {
                                                                onCompanyClick(slug);
                                                            }
                                                        }
                                                        // Resources Links
                                                        if (col.title === 'Resources') {
                                                            let slug = link.toLowerCase();
                                                            if (slug === 'api reference') slug = 'api';
                                                            if (slug === 'system status') slug = 'status';
                                                            if (['documentation', 'api', 'status', 'security'].includes(slug)) {
                                                                onResourcesClick(slug as any);
                                                            }
                                                        }
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
