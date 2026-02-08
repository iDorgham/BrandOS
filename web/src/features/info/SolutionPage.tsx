import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, Layers, Activity, Check, X, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui';

interface SolutionPageProps {
    initialTab?: 'dna' | 'generate' | 'audit';
    onBack: () => void;
    onLoginClick: () => void;
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ initialTab = 'dna', onBack, onLoginClick }) => {
    const [activeTab, setActiveTab] = useState<'dna' | 'generate' | 'audit'>(initialTab);

    const tabs = {
        dna: {
            id: 'dna',
            title: "Lock Your Brand DNA",
            icon: <Shield size={24} />,
            color: "text-[#0f62fe]",
            borderColor: "border-[#0f62fe]",
            bg: "bg-[#0f62fe]",
            problem: "Paying for endless subjective debates.",
            solution: "Codified, enforceable visual rules.",
            roi: "$3,200/month in saved meetings",
            demoTitle: "Interactive DNA Extraction",
            content: (
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border border-[#393939] bg-[#1a1a1a]">
                        <div className="w-8 h-8 rounded-full bg-[#0f62fe]/20 flex items-center justify-center text-[#0f62fe]">
                            <Shield size={16} />
                        </div>
                        <div>
                            <div className="text-xs text-[#6f6f6f] uppercase tracking-widest">Input</div>
                            <div className="text-white font-mono text-sm">Brand_Guidelines_V4.pdf</div>
                        </div>
                        <ArrowRight className="ml-auto text-[#6f6f6f]" size={16} />
                    </div>
                    <div className="h-8 flex justify-center">
                        <div className="w-[1px] h-full bg-[#393939]" />
                    </div>
                    <div className="p-6 border border-[#24a148] bg-[#24a148]/5 relative">
                        <div className="absolute -top-3 left-4 bg-[#000] px-2 text-[10px] text-[#24a148] font-black uppercase tracking-widest">
                            Output: DNA_Protocol
                        </div>
                        <pre className="font-mono text-xs text-[#c6c6c6] leading-relaxed">
                            <span className="text-[#f1c21b]">tokens</span>: {'{'}<br />
                            &nbsp;&nbsp;<span className="text-[#42be65]">"primary"</span>: <span className="text-[#fa7f7f]">"#0F62FE"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#42be65]">"font"</span>: <span className="text-[#fa7f7f]">"DMSans"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#42be65]">"spacing"</span>: <span className="text-[#4589ff]">"2rem"</span><br />
                            {'}'}
                        </pre>
                    </div>
                </div>
            )
        },
        generate: {
            id: 'generate',
            title: "Generate Perfect Assets",
            icon: <Layers size={24} />,
            color: "text-[#f1c21b]",
            borderColor: "border-[#f1c21b]",
            bg: "bg-[#f1c21b]",
            problem: "45 min/asset, 2 weeks/campaign.",
            solution: "10 seconds, 5-20 variations.",
            roi: "$50K/month in assets",
            demoTitle: "Live Generation Interface",
            content: (
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-[#1a1a1a] border border-[#393939] relative group overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-[#333] font-black text-4xl opacity-20">GEN_{i}</div>
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-black/80 backdrop-blur-sm text-[8px] font-mono text-[#f1c21b] border-t border-[#f1c21b]/20">
                                SCORE: 99.8%
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        audit: {
            id: 'audit',
            title: "Audit & Prevent Drift",
            icon: <Activity size={24} />,
            color: "text-[#fa4d56]",
            borderColor: "border-[#fa4d56]",
            bg: "bg-[#fa4d56]",
            problem: "No early warning system.",
            solution: "Pre/post-generation compliance scoring.",
            roi: "$10K+/year in prevented disasters",
            demoTitle: "Health Dashboard",
            content: (
                <div className="space-y-2">
                    {[
                        { label: "Logo_Safety", status: "PASS", val: 100 },
                        { label: "Color_Contrast", status: "PASS", val: 98 },
                        { label: "Tone_Voice", status: "WARN", val: 82 },
                        { label: "Img_Resolution", status: "PASS", val: 100 },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-[#393939] bg-[#1a1a1a]">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${item.status === 'PASS' ? 'bg-[#24a148]' : 'bg-[#f1c21b]'}`} />
                                <span className="text-xs font-mono text-[#c6c6c6]">{item.label}</span>
                            </div>
                            <div className="font-bold text-xs tabular-nums text-white">{item.val}%</div>
                        </div>
                    ))}
                </div>
            )
        }
    };

    const activeContent = tabs[activeTab];

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
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c6c6c6]">System_Overview // V3.0</span>
                    </div>
                    <h1 className="text-[clamp(3.5rem,7vw,9rem)] font-black tracking-tighter uppercase leading-[0.9] mb-8">
                        The End of <br /> Inconsistent Branding.
                    </h1>
                </div>

                {/* 3-TAB FEATURE GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-48">
                    {/* TABS */}
                    <div className="lg:col-span-4 space-y-4">
                        {(Object.keys(tabs) as Array<keyof typeof tabs>).map((key) => {
                            const tab = tabs[key];
                            const isActive = activeTab === key;
                            return (
                                <div
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`p-8 border cursor-pointer transition-all duration-300 relative group overflow-hidden ${isActive ? `border-white bg-[#1a1a1a]` : 'border-[#333] bg-transparent hover:border-[#666]'}`}
                                >
                                    <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-300 ${isActive ? tab.bg : 'bg-transparent'}`} />
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`${isActive ? tab.color : 'text-[#666]'} transition-colors`}>{tab.icon}</div>
                                        {isActive && <ArrowRight size={16} className="text-white" />}
                                    </div>
                                    <h3 className={`text-xl font-black uppercase tracking-tighter mb-2 ${isActive ? 'text-white' : 'text-[#666]'}`}>
                                        {tab.title}
                                    </h3>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-sm text-[#c6c6c6] mt-4"
                                        >
                                            <div className="mb-2"><span className="text-[#6f6f6f] uppercase text-[10px] tracking-widest">Problem:</span> <br /> {tab.problem}</div>
                                            <div className="mb-4"><span className="text-[#6f6f6f] uppercase text-[10px] tracking-widest">Solution:</span> <br /> {tab.solution}</div>
                                            <div className={`text-xs font-bold uppercase tracking-wider ${tab.color}`}>ROI: {tab.roi}</div>
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* CONTENT AREA */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full border border-[#393939] bg-[#0c0c0c] p-12 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                    <div className={`text-[200px] leading-none font-black ${activeContent.color}`}>
                                        {activeTab === 'dna' ? '01' : activeTab === 'generate' ? '02' : '03'}
                                    </div>
                                </div>

                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
                                    <div className="flex flex-col justify-center">
                                        <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 ${activeContent.color}`}>
                                            Demo_Module
                                        </div>
                                        <h3 className="text-4xl font-black uppercase mb-8 tracking-tighter">
                                            {activeContent.demoTitle}
                                        </h3>
                                        <Button onClick={onLoginClick} variant="ghost" className="w-fit border border-white text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs font-black px-8 py-6">
                                            Try It Live
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {activeContent.content}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* BATTLE CARD (Simplified from Home) */}
                <div className="mb-48 border-t border-[#1a1a1a] pt-24">
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tighter uppercase leading-none mb-16 text-center">
                        Total Market Superiority.
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-[#333]">
                                    <th className="p-6 text-[#6f6f6f] font-mono text-xs uppercase tracking-widest w-1/4">Metric</th>
                                    <th className="p-6 text-white font-black text-xl uppercase tracking-tighter w-1/4 bg-[#1a1a1a] border-t-4 border-[#0f62fe]">Brand OS</th>
                                    <th className="p-6 text-[#6f6f6f] font-bold w-1/4 opacity-50">Manual PDF</th>
                                    <th className="p-6 text-[#6f6f6f] font-bold w-1/4 opacity-50">Agencies</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1a1a1a]">
                                <tr>
                                    <td className="p-6 font-bold text-[#c6c6c6]">Setup Time</td>
                                    <td className="p-6 font-black text-[#0f62fe] bg-[#161616]">60 Seconds</td>
                                    <td className="p-6 text-[#666]">2-4 Weeks</td>
                                    <td className="p-6 text-[#666]">2+ Weeks</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#c6c6c6]">Cost</td>
                                    <td className="p-6 font-black text-[#0f62fe] bg-[#161616]">$49/mo</td>
                                    <td className="p-6 text-[#666]">$0 (Hidden labor)</td>
                                    <td className="p-6 text-[#666]">$5K+/mo</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#c6c6c6]">Consistency</td>
                                    <td className="p-6 font-black text-[#0f62fe] bg-[#161616]">92%+ Guaranteed</td>
                                    <td className="p-6 text-[#666]">40-60%</td>
                                    <td className="p-6 text-[#666]">60-80%</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#c6c6c6]">Speed</td>
                                    <td className="p-6 font-black text-[#0f62fe] bg-[#161616]">10 Seconds</td>
                                    <td className="p-6 text-[#666]">N/A</td>
                                    <td className="p-6 text-[#666]">2-3 Days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FINAL CTA */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-[clamp(3rem,6vw,6rem)] font-black tracking-tighter uppercase leading-none mb-12">
                        Build Your <br /> Operating System.
                    </h2>
                    <Button onClick={onLoginClick} className="bg-[#0f62fe] text-white hover:bg-[#0f62fe]/90 h-20 px-16 rounded-none text-xl font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(15,98,254,0.4)]">
                        Start Free Trial
                    </Button>
                </div>
            </div>
        </div>
    );
};
