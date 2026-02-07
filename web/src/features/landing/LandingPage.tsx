import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Layout, Sparkles, ArrowRight, Github, Twitter, Layers } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

export const LandingPage: React.FC = () => {
    const { signIn } = useAuth();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans relative overflow-x-hidden">
            <div className="cinematic-noise" />

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
                            <Zap className="text-primary-foreground" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Brand OS</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#studio" className="hover:text-primary transition-colors">Studio</a>
                        <a href="#security" className="hover:text-primary transition-colors">Security</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button onClick={signIn} variant="ghost" className="hidden sm:inline-flex text-xs uppercase tracking-widest font-bold">
                            Login
                        </Button>
                        <Button onClick={signIn} className="text-xs uppercase tracking-widest font-bold rounded-none h-11 px-6">
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                            <Sparkles size={12} />
                            AI-Powered Creative Protocol
                        </div>
                        <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.95] mb-8">
                            The Identity <br />
                            <span className="font-bold italic text-primary">Orchestration</span> OS
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                            Transform static brand guidelines into an executable DNA.
                            Orchestrate high-fidelity creative at scale with multi-model AI logic.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button onClick={signIn} size="lg" className="h-14 px-10 rounded-none text-sm font-bold uppercase tracking-widest group">
                                Initialize Workflow <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="secondary" size="lg" className="h-14 px-10 rounded-none text-sm font-bold uppercase tracking-widest border-border/60 hover:bg-muted">
                                View Documentation
                            </Button>
                        </div>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-24 relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full scale-90" />
                        <div className="border border-border/40 bg-card rounded-xl overflow-hidden shadow-2xl skew-x-[-1deg] skew-y-[1deg]">
                            <div className="h-10 border-b border-border/40 bg-muted/30 flex items-center px-4 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                <div className="ml-4 h-4 w-40 bg-muted/40 rounded-full" />
                            </div>
                            <div className="aspect-video bg-background/50 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4 opacity-40">
                                    <Layout size={48} className="text-primary" />
                                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Visual DNA Loaded</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6 bg-muted/30 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">Core Infrastructure</h2>
                        <div className="w-20 h-1 bg-primary" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap size={24} />,
                                title: "Creative Studio",
                                description: "Multi-model orchestration engine. Generate brand-aligned assets with precise DNA injection."
                            },
                            {
                                icon: <Layers size={24} />,
                                title: "Visual Moodboard",
                                description: "Node-based canvas for mapping visual relationships and creating creative briefs."
                            },
                            {
                                icon: <Shield size={24} />,
                                title: "Compliance Hub",
                                description: "AI-powered brand adherence analysis. Instant feedback on color, spatial rules, and vibe."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 border border-border/40 bg-background hover:border-primary/40 transition-all">
                                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 text-center overflow-hidden">
                <div className="max-w-3xl mx-auto relative">
                    <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10 rounded-full" />
                    <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Ready to evolve your <br /><span className="font-bold italic">Brand DNA</span>?</h2>
                    <p className="text-muted-foreground mb-12 leading-relaxed">
                        Join elite creative teams orchestrating the future of brand identity.
                        Free for individuals. Enterprise security for teams.
                    </p>
                    <Button onClick={signIn} size="lg" className="h-16 px-12 rounded-none text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/20">
                        Initial Protocol Registration
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-border/40 bg-muted/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 flex items-center justify-center text-primary rounded-sm">
                            <Zap size={16} />
                        </div>
                        <span className="font-bold tracking-tight">Brand OS</span>
                    </div>

                    <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github size={18} /></a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto text-center mt-20 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/40">
                    © 2026 Brand OS Protocol • Designed for Creativity
                </div>
            </footer>
        </div>
    );
};
