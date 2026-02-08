import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Clock, DollarSign, Users, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui';

interface CaseStudiesPageProps {
    onBack: () => void;
    onLoginClick: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onBack, onLoginClick }) => {
    const studies = [
        {
            id: 'cloudsync',
            client: "CloudSync",
            industry: "SaaS / Enterprise",
            logo: "CS",
            metric: "$94,000",
            metricLabel: "Saved in Year One",
            before: [
                "$15K/month on design",
                "2 weeks per campaign",
                "58% brand consistency"
            ],
            after: [
                "Same ad spend",
                "3x campaign volume",
                "94% brand consistency"
            ],
            quote: "Brand OS didn't just save us money. It allowed us to scale our content velocity by 300% without hiring a single new designer.",
            author: "Sarah J., CMO"
        },
        {
            id: 'm14',
            client: "M14 Agency",
            industry: "Creative Agency",
            logo: "M14",
            metric: "+30%",
            metricLabel: "Revenue Per Client",
            before: [
                "Client drift issues",
                "Unbillable visual QA",
                "Slow turnarounds"
            ],
            after: [
                "Upsell 'Brand Guard'",
                "Zero drift complaints",
                "Instant asset delivery"
            ],
            quote: "We used to spend hours debating hex codes. Now we sell 'Guaranteed Consistency' as a premium service. It's free money.",
            author: "David K., Founder"
        },
        {
            id: 'velocity',
            client: "Velocity",
            industry: "FinTech Startup",
            logo: "VY",
            metric: "Series A",
            metricLabel: "Fundraising Success",
            before: [
                "Inconsistent deck",
                "Amateur social presence",
                "Zero brand trust"
            ],
            after: [
                "Cohesive narrative",
                "Enterprise-grade look",
                "Trust at first glance"
            ],
            quote: "Investors told us our deck looked like a billion-dollar company. Brand OS gave us that polish from day one.",
            author: "Elena R., CEO"
        }
    ];

    const [activeStudy, setActiveStudy] = useState(0);

    return (
        <div className="min-h-screen bg-[var(--cds-ui-background)] text-[var(--cds-text-primary)] pt-24 pb-24 px-8 relative overflow-hidden transition-colors duration-300">
            <div className="cinematic-noise" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-12 hover:bg-[var(--cds-layer-hover)] text-[var(--cds-text-secondary)] hover:text-[var(--cds-text-primary)] uppercase tracking-[0.3em] font-black text-[10px] gap-3"
                >
                    <ArrowLeft size={16} /> [ Back_to_Interface ]
                </Button>

                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-4 bg-[var(--cds-layer-01)] border border-[var(--cds-layer-02)] px-6 py-2 mb-8 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[var(--cds-support-success)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--cds-text-secondary)]">Verified_Results // live_data</span>
                    </div>
                    <h1 className="text-[clamp(3.5rem,7vw,9rem)] font-black tracking-tighter uppercase leading-[0.9] mb-8">
                        Proof of <br /> Performance.
                    </h1>
                </div>

                {/* FEATURED CASE STUDY CAROUSEL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-48">
                    <div className="lg:col-span-4 space-y-4">
                        {studies.map((study, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveStudy(i)}
                                className={`p-8 border cursor-pointer transition-all duration-300 relative group overflow-hidden ${activeStudy === i ? 'bg-[var(--cds-layer-01)] border-[var(--cds-text-primary)] shadow-lg' : 'bg-transparent border-[var(--cds-layer-03)] hover:border-[var(--cds-text-secondary)]'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs font-mono uppercase tracking-widest text-[var(--cds-text-secondary)] opacity-50">{study.industry}</div>
                                    {activeStudy === i && <ArrowRight size={14} className="text-[var(--cds-text-primary)]" />}
                                </div>
                                <h3 className={`text-2xl font-black uppercase tracking-tighter ${activeStudy === i ? 'text-[var(--cds-text-primary)]' : 'text-[var(--cds-text-secondary)]'}`}>
                                    {study.client}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStudy}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="border border-[var(--cds-layer-02)] bg-[var(--cds-layer-01)] p-8 md:p-12 relative shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                                    <div className="text-[100px] font-black text-[var(--cds-text-primary)] leading-none">{studies[activeStudy].logo}</div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--cds-support-success)] mb-4">Primary_Outcome</div>
                                        <div className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--cds-text-primary)] mb-2">{studies[activeStudy].metric}</div>
                                        <div className="text-lg text-[var(--cds-text-secondary)] font-light italic">{studies[activeStudy].metricLabel}</div>
                                    </div>
                                    <div className="relative">
                                        <Quote className="absolute -top-4 -left-4 text-[var(--cds-interactive-01)] opacity-10" size={48} />
                                        <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--cds-text-secondary)] relative z-10 mb-4">
                                            "{studies[activeStudy].quote}"
                                        </p>
                                        <div className="text-xs font-black uppercase tracking-widest text-[var(--cds-text-secondary)] opacity-50">— {studies[activeStudy].author}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[var(--cds-layer-02)] pt-8">
                                    <div className="bg-[var(--cds-support-error)]/5 border border-[var(--cds-support-error)]/20 p-6 relative overflow-hidden shadow-inner">
                                        <div className="absolute top-0 right-0 p-2 text-[10px] font-black uppercase text-[var(--cds-support-error)] tracking-widest opacity-80">Before</div>
                                        <ul className="space-y-3">
                                            {studies[activeStudy].before.map((item, j) => (
                                                <li key={j} className="flex items-start gap-3 text-[var(--cds-text-secondary)] text-sm">
                                                    <span className="mt-1 w-1.5 h-1.5 bg-[var(--cds-support-error)] rounded-full shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-[var(--cds-support-success)]/5 border border-[var(--cds-support-success)]/20 p-6 relative overflow-hidden shadow-inner">
                                        <div className="absolute top-0 right-0 p-2 text-[10px] font-black uppercase text-[var(--cds-support-success)] tracking-widest opacity-80">After</div>
                                        <ul className="space-y-3">
                                            {studies[activeStudy].after.map((item, j) => (
                                                <li key={j} className="flex items-start gap-3 text-[var(--cds-text-primary)] text-sm font-bold">
                                                    <span className="mt-1 w-1.5 h-1.5 bg-[var(--cds-support-success)] rounded-full shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="bg-[var(--cds-layer-01)] border border-[var(--cds-layer-02)] p-16 md:p-24 text-center shadow-xl">
                    <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-8">
                        Join the Elite.
                    </h2>
                    <p className="text-xl text-[var(--cds-text-secondary)] font-light max-w-2xl mx-auto mb-12">
                        Start your own success story today. Calculate your potential ROI or start a free trial.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Button
                            onClick={onLoginClick}
                            className="bg-[var(--cds-interactive-01)] text-[var(--cds-text-on-color)] hover:bg-[var(--cds-interactive-01)]/90 h-16 px-12 rounded-none text-lg font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(15,98,254,0.3)] transition-all hover:-translate-y-1"
                        >
                            Start Free Trial
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
