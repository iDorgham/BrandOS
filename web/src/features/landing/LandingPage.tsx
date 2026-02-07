import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Layout, Sparkles, ArrowRight, Github, Twitter, Layers, BarChart3, Globe, Code } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

interface LandingPageProps {
    onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
    return (
        <div className="min-h-screen bg-[#161616] text-white selection:bg-[#0f62fe]/30 font-sans relative overflow-x-hidden">
            <div className="cinematic-noise" />

            {/* Minimalist Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-[#393939] bg-[#161616]/80 backdrop-blur-md">
                <div className="max-w-[1600px] mx-auto px-6 h-12 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#0f62fe] flex items-center justify-center">
                            <Zap className="text-white" size={16} fill="currentColor" />
                        </div>
                        <span className="text-sm font-semibold tracking-wider uppercase">Brand OS</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-[#c6c6c6]">
                        <a href="#governance" className="hover:text-white transition-colors">Governance</a>
                        <a href="#intelligence" className="hover:text-white transition-colors">Intelligence</a>
                        <a href="#scale" className="hover:text-white transition-colors">Scale</a>
                    </div>

                    <div className="flex items-center">
                        <Button onClick={onLoginClick} variant="ghost" className="text-[12px] uppercase tracking-widest font-bold px-6 h-12 hover:bg-[#393939] rounded-none border-l border-[#393939]">
                            Log In
                        </Button>
                        <Button onClick={onLoginClick} className="bg-[#0f62fe] text-white text-[12px] uppercase tracking-widest font-bold rounded-none h-12 px-8 hover:bg-[#0043ce] transition-colors">
                            Request Access
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-40 px-6 z-10 border-b border-[#393939]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="text-[#0f62fe] text-[12px] font-bold uppercase tracking-[0.3em] mb-6">
                                Enterprise Creative Protocol v2.4
                            </div>
                            <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-[1.05] mb-8">
                                Scalable <span className="font-semibold italic">Identity</span> <br />
                                Infrastructure.
                            </h1>
                            <p className="text-lg md:text-xl text-[#c6c6c6] max-w-xl mb-12 leading-relaxed font-light">
                                Stop managing assets. Start orchestrating DNA.
                                Brand OS transforms fragmented creative workflows into a single,
                                AI-powered source of truth for global enterprises.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button onClick={onLoginClick} size="lg" className="bg-[#0f62fe] text-white hover:bg-[#0043ce] h-14 px-10 rounded-none text-[13px] font-bold uppercase tracking-widest group">
                                    Initialize Protocol <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />
                                </Button>
                                <Button variant="secondary" size="lg" className="border-[#393939] text-[#f4f4f4] hover:bg-[#393939] h-14 px-10 rounded-none text-[13px] font-bold uppercase tracking-widest">
                                    Technical Specs
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative border border-[#393939] bg-[#262626] aspect-square lg:aspect-[4/5] flex flex-col p-px"
                        >
                            <div className="flex-1 bg-[#161616] p-8 flex flex-col justify-between overflow-hidden">
                                <div className="space-y-6">
                                    <div className="h-px w-full bg-[#393939]" />
                                    <div className="flex justify-between items-center text-[10px] font-mono text-[#525252] uppercase tracking-[0.2em]">
                                        <span>Status: Operational</span>
                                        <span>Sync: 99.8%</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 border border-[#393939] bg-[#262626]/20" />
                                        <div className="h-24 border border-[#393939] bg-[#262626]/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-[#393939]" />
                                        <div className="h-2 w-2/3 bg-[#393939]" />
                                    </div>
                                </div>
                                <div className="mt-8 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="w-24 h-24 border-2 border-[#0f62fe] animate-ping absolute inset-0 opacity-20" />
                                        <div className="w-24 h-24 border border-[#0f62fe] flex items-center justify-center">
                                            <Sparkles className="text-[#0f62fe]" size={32} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-12 bg-[#262626] border-t border-[#393939] flex items-center px-4 justify-between">
                                <div className="text-[10px] font-mono text-[#c6c6c6]">BRAND_DNA_MODEL_LOADED</div>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-[#0f62fe]" />
                                    <div className="w-1.5 h-1.5 bg-[#0f62fe]" />
                                    <div className="w-1.5 h-1.5 bg-[#0f62fe]" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section id="governance" className="py-32 px-6 border-b border-[#393939]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[#393939]">
                    {[
                        {
                            icon: <Shield size={24} />,
                            label: "Governance",
                            title: "Bulletproof Compliance",
                            desc: "Automated brand audit systems that enforce DNA consistency across thousands of AI-generated assets in real-time."
                        },
                        {
                            icon: <BarChart3 size={24} />,
                            label: "Intelligence",
                            title: "Predictive Analytics",
                            desc: "Measure creative velocity and brand sentiment before deployment. Data-driven insights for artistic decisions."
                        },
                        {
                            icon: <Globe size={24} />,
                            label: "Scale",
                            title: "Global Distribution",
                            desc: "One-click deployment to multiple channels. Decentralized orchestration for high-performance localized variants."
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-12 border-r border-b border-[#393939] group hover:bg-[#262626] transition-colors">
                            <div className="text-[#0f62fe] mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <div className="text-[11px] font-bold text-[#525252] uppercase tracking-[0.2em] mb-4">{item.label}</div>
                            <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                            <p className="text-[#c6c6c6] text-sm leading-relaxed font-light">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Content Section - The "Sales" bit */}
            <section className="py-40 px-6 bg-[#262626]">
                <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
                    <div className="max-w-3xl mb-24">
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Creative work at the <br />speed of <span className="font-semibold text-white italic">Logic</span>.</h2>
                        <p className="text-[#c6c6c6] text-lg leading-relaxed font-light">
                            Brand OS isn't just a design tool. It's an enterprise infrastructure
                            that ensures every pixel generated is 100% aligned with your strategic
                            visual doctrine. Reduce creative overhead by 60% while maintaining
                            perfect brand governance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        {[
                            { stat: "80%", label: "Faster Deployment" },
                            { stat: "0%", label: "Brand Drift" },
                            { stat: "10x", label: "Creative Output" },
                            { stat: "$2.4M", label: "Avg. ROI / Year" }
                        ].map((stat, i) => (
                            <div key={i} className="p-10 border border-[#393939] bg-[#161616] flex flex-col items-center">
                                <div className="text-3xl font-semibold text-[#0f62fe] mb-2">{stat.stat}</div>
                                <div className="text-[11px] font-bold text-[#525252] uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-[#393939]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-[#0f62fe] flex items-center justify-center">
                                <Zap className="text-white" size={16} fill="currentColor" />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">Brand OS</span>
                        </div>
                        <p className="text-[#525252] text-xs max-w-xs leading-relaxed uppercase tracking-tighter">
                            Carbon-Ready Creative Infrastructure <br />
                            Built for the next generation of visual production.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#c6c6c6] mb-6">Network</h4>
                        <div className="flex flex-col gap-3 text-[12px] text-[#525252] font-medium">
                            <a href="#" className="hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="hover:text-white transition-colors">Enterprise API</a>
                            <a href="#" className="hover:text-white transition-colors">System Status</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#c6c6c6] mb-6">Connect</h4>
                        <div className="flex gap-6 text-[#525252]">
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Github size={18} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Code size={18} /></a>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1600px] mx-auto mt-32 pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-[10px] font-mono text-[#393939] uppercase tracking-[0.3em]">
                        © 2026 Brand OS Protocol
                    </div>
                    <div className="text-[10px] font-mono text-[#393939] uppercase tracking-[0.3em]">
                        Precision in Creative Governance
                    </div>
                </div>
            </footer>
        </div>
    );
};
