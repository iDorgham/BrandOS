import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Briefcase, Rocket, Building2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

interface IndustriesPageProps {
    onBack: () => void;
    onLoginClick: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onBack, onLoginClick }) => {
    const industries = [
        {
            id: 'marketing',
            icon: <Users size={48} />,
            title: "Marketing Teams",
            subtitle: "Campaign Velocity",
            problem: "Every campaign looks different. Approvals take weeks.",
            solution: "Generate 50+ on-brand assets in 10 minutes.",
            result: "+40% CTR with consistent visuals.",
            color: "text-[#0f62fe]",
            borderColor: "border-[#0f62fe]",
            bg: "bg-[#0f62fe]"
        },
        {
            id: 'agencies',
            icon: <Briefcase size={48} />,
            title: "Agencies",
            subtitle: "Scalable Revenue",
            problem: "Clients complain about inconsistency. Margins are low.",
            solution: "Guarantee consistency & charge 30% more.",
            result: "New recurring revenue stream.",
            color: "text-[#8a3ffc]",
            borderColor: "border-[#8a3ffc]",
            bg: "bg-[#8a3ffc]"
        },
        {
            id: 'startups',
            icon: <Rocket size={48} />,
            title: "Startups",
            subtitle: "Instant Authority",
            problem: "No design team. Amateur look hurts fundraising.",
            solution: "Professional, cohesive branding from day one.",
            result: "Series A success with strong brand equity.",
            color: "text-[#f1c21b]",
            borderColor: "border-[#f1c21b]",
            bg: "bg-[#f1c21b]"
        },
        {
            id: 'enterprises',
            icon: <Building2 size={48} />,
            title: "Enterprises",
            subtitle: "Global Governance",
            problem: "50+ decentralized teams creating off-brand content.",
            solution: "Centralized DNA with distributed enforcement.",
            result: "60% reduction in brand violations.",
            color: "text-[#fa4d56]",
            borderColor: "border-[#fa4d56]",
            bg: "bg-[#fa4d56]"
        }
    ];

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
                        <div className="w-2 h-2 rounded-full bg-[#f1c21b] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c6c6c6]">Target_Sectors // V1.0</span>
                    </div>
                    <h1 className="text-[clamp(3.5rem,7vw,9rem)] font-black tracking-tighter uppercase leading-[0.9] mb-8">
                        Who Needs <br /> Brand OS?
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-32">
                    {industries.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative border border-[#393939] bg-[#0c0c0c] hover:bg-[#1a1a1a] transition-all duration-300 p-12 overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-300 ${item.bg} opacity-50 group-hover:opacity-100`} />

                            <div className="flex justify-between items-start mb-12">
                                <div className={`p-4 rounded-full bg-[#161616] border border-[#333] ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                    {item.icon}
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#333] group-hover:text-white transition-colors">
                                    Sector_0{i + 1}
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${item.color} opacity-80`}>
                                    {item.subtitle}
                                </div>
                                <h3 className="text-4xl font-black uppercase tracking-tighter mb-6">
                                    {item.title}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-1 bg-[#333] self-stretch" />
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-[#666] mb-1">Problem</div>
                                            <p className="text-[#c6c6c6] leading-tight">{item.problem}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className={`w-1 ${item.bg} self-stretch`} />
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-[#666] mb-1">Solution</div>
                                            <p className="text-white leading-tight font-bold">{item.solution}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[#333] flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-[#666] mb-1">Result</div>
                                    <div className={`text-lg font-black uppercase tracking-tight ${item.color}`}>
                                        {item.result}
                                    </div>
                                </div>
                                <Button onClick={onLoginClick} variant="ghost" className="hover:bg-white hover:text-black rounded-full w-10 h-10 p-0 flex items-center justify-center border border-[#333]">
                                    <ArrowRight size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-[#161616] border border-[#393939] p-16 md:p-24 text-center">
                    <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-8">
                        Ready to specialized?
                    </h2>
                    <p className="text-xl text-[#c6c6c6] font-light max-w-2xl mx-auto mb-12">
                        Configure Brand OS for your specific industry requirements in 60 seconds.
                    </p>
                    <Button onClick={onLoginClick} className="bg-white text-black hover:bg-white/90 h-16 px-12 rounded-none text-lg font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                        Select Industry Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};
