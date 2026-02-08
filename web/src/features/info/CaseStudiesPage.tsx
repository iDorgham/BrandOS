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
        <div className="min-h-screen bg-[#000000] text-white pt-24 pb-24 px-8 relative overflow-hidden">
            <div className="cinematic-noise" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-12 hover:bg-white/5 text-[#525252] hover:text-white uppercase tracking-[0.3em] font-black text-[10px] gap-3"
                >
                    <ArrowLeft size={16} /> [ Back_to_Interface ]
                </Button>

                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-4 bg-[#161616] border border-[#393939] px-6 py-2 mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#24a148] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c6c6c6]">Verified_Results // live_data</span>
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
                                className={`p-8 border cursor-pointer transition-all duration-300 relative group overflow-hidden ${activeStudy === i ? 'bg-[#1a1a1a] border-white' : 'bg-transparent border-[#333] hover:border-[#666]'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs font-mono uppercase tracking-widest text-[#666]">{study.industry}</div>
                                    {activeStudy === i && <ArrowRight size={14} className="text-white" />}
                                </div>
                                <h3 className={`text-2xl font-black uppercase tracking-tighter ${activeStudy === i ? 'text-white' : 'text-[#666]'}`}>
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
                                className="border border-[#393939] bg-[#0c0c0c] p-8 md:p-12 relative"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                    <div className="text-[100px] font-black text-white leading-none">{studies[activeStudy].logo}</div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#24a148] mb-4">Primary_Outcome</div>
                                        <div className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2">{studies[activeStudy].metric}</div>
                                        <div className="text-lg text-[#c6c6c6] font-light italic">{studies[activeStudy].metricLabel}</div>
                                    </div>
                                    <div className="relative">
                                        <Quote className="absolute -top-4 -left-4 text-[#333] opacity-50" size={48} />
                                        <p className="text-xl md:text-2xl font-light leading-relaxed text-[#c6c6c6] relative z-10 mb-4">
                                            "{studies[activeStudy].quote}"
                                        </p>
                                        <div className="text-xs font-black uppercase tracking-widest text-[#666]">— {studies[activeStudy].author}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#333] pt-8">
                                    <div className="bg-[#1a0000] border border-red-900/30 p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2 text-[10px] font-black uppercase text-red-700 tracking-widest">Before</div>
                                        <ul className="space-y-3">
                                            {studies[activeStudy].before.map((item, j) => (
                                                <li key={j} className="flex items-start gap-3 text-red-200/60 text-sm">
                                                    <span className="mt-1 w-1.5 h-1.5 bg-red-800 rounded-full shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-[#001a00] border border-green-900/30 p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2 text-[10px] font-black uppercase text-green-700 tracking-widest">After</div>
                                        <ul className="space-y-3">
                                            {studies[activeStudy].after.map((item, j) => (
                                                <li key={j} className="flex items-start gap-3 text-green-200/80 text-sm font-bold">
                                                    <span className="mt-1 w-1.5 h-1.5 bg-[#24a148] rounded-full shrink-0" />
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

                <div className="bg-[#161616] border border-[#393939] p-16 md:p-24 text-center">
                    <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-8">
                        Join the Elite.
                    </h2>
                    <p className="text-xl text-[#c6c6c6] font-light max-w-2xl mx-auto mb-12">
                        Start your own success story today. Calculate your potential ROI or start a free trial.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Button onClick={onLoginClick} className="bg-white text-black hover:bg-white/90 h-16 px-12 rounded-none text-lg font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            Start Free Trial
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
