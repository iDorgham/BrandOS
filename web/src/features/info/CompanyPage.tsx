import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Target, Users, Globe, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';

export type CompanySlug = 'manifesto' | 'careers' | 'contact' | 'press';

interface CompanyPageProps {
    slug: CompanySlug;
    onBack: () => void;
    onNavigate: (slug: CompanySlug) => void;
}

export const CompanyPage: React.FC<CompanyPageProps> = ({ slug, onBack, onNavigate }) => {
    interface CompanyContent {
        id: string;
        title: string;
        subtitle: string;
        desc: string;
        mainIcon: React.ReactNode;
        stats: { label: string; value: string; }[];
        interactiveElement?: React.ReactNode;
    }

    const getContent = (): CompanyContent | null => {
        switch (slug) {
            case 'manifesto':
                return {
                    id: 'CORP_01',
                    title: 'THE_MANIFESTO',
                    subtitle: 'Why We Exist',
                    desc: 'We believe that brand consistency is not a design problem—it is an infrastructure problem. In a world of infinite content, the only way to scale identity is to verify it with code.',
                    mainIcon: <Target className="text-[#0f62fe]" size={48} />,
                    stats: [
                        { label: 'Founded', value: '2024' },
                        { label: 'Mission', value: 'SCALE_DNA' },
                        { label: 'Global', value: 'TRUE' }
                    ],
                    interactiveElement: (
                        <div className="border border-[#393939] bg-[#161616] p-8">
                            <div className="flex border-b border-[#393939] mb-8">
                                <button className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] bg-[#393939] text-white">Abstract_View</button>
                                <button className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#6f6f6f] hover:bg-[#393939]/50 transition-colors">Concrete_View</button>
                            </div>
                            <div className="font-mono text-sm leading-relaxed text-[#c6c6c6] space-y-4">
                                <p>01. DESIGN_IS_Code. If it cannot be compiled, it cannot be governed.</p>
                                <p>02. DRIFT_IS_ENTROPY. Systems must actively fight against the degradation of identity.</p>
                                <p>03. SPEED_REQUIRES_TRUST. Automation is the only path to high-velocity creativity.</p>
                            </div>
                        </div>
                    )
                };
            case 'careers':
                return {
                    id: 'CORP_02',
                    title: 'JOIN_THE_CORE',
                    subtitle: 'Build the Future of Branding',
                    desc: 'We are looking for engineers, designers, and futurists who are tired of manual work and want to build the operating system for the next generation of creative output.',
                    mainIcon: <Users className="text-[#f1c21b]" size={48} />,
                    stats: [
                        { label: 'Open Roles', value: '12' },
                        { label: 'Remote', value: '100%' },
                        { label: 'Equity', value: 'HIGH' }
                    ],
                    interactiveElement: (
                        <div className="border-t border-[#393939]">
                            {[
                                { title: "Senior Brand Engineer (Rust/WASM)", loc: "Remote", dept: "Doctrine" },
                                { title: "Generative AI Artist", loc: "New York / Hybrid", dept: "Studio" },
                                { title: "Solutions Architect", loc: "London", dept: "Sales" }
                            ].map((job, i) => (
                                <div key={i} className="group border-b border-[#393939] py-6 cursor-pointer hover:bg-[#1a1a1a] transition-colors px-4 -mx-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-black text-[#0f62fe] uppercase tracking-[0.2em] mb-1">{job.dept}</div>
                                            <h3 className="text-xl font-bold uppercase">{job.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className="text-sm font-mono text-[#6f6f6f]">{job.loc}</span>
                                            <ChevronRight className="text-[#393939] group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                };
            case 'contact':
                return {
                    id: 'CORP_03',
                    title: 'SIGNAL_UPLINK',
                    subtitle: 'Establish Connection',
                    desc: 'Whether you are an enterprise looking to scale or a partner wanting to integrate, our channels are open. Expect a response metric of < 2 hours.',
                    mainIcon: <Mail className="text-[#0f62fe]" size={48} />,
                    stats: [
                        { label: 'Support', value: '24/7' },
                        { label: 'Sales', value: 'GLOBAL' },
                        { label: 'HQ', value: 'CLOUD' }
                    ],
                    interactiveElement: (
                        <div className="bg-[#161616] border border-[#393939] p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f6f6f]">Identity_ID (Name)</label>
                                    <input type="text" className="w-full bg-black border-b border-[#393939] p-3 text-white focus:border-[#0f62fe] outline-none transition-colors rounded-none placeholder:text-[#333]" placeholder="J. Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f6f6f]">Signal_Source (Email)</label>
                                    <input type="email" className="w-full bg-black border-b border-[#393939] p-3 text-white focus:border-[#0f62fe] outline-none transition-colors rounded-none placeholder:text-[#333]" placeholder="j.doe@corp.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f6f6f]">Transmission_Data (Message)</label>
                                <textarea className="w-full h-32 bg-black border-b border-[#393939] p-3 text-white focus:border-[#0f62fe] outline-none transition-colors rounded-none resize-none placeholder:text-[#333]" placeholder="Initializing handshake protocol..." />
                            </div>
                            <Button className="w-full bg-[#f4f4f4] text-black hover:bg-white font-black uppercase tracking-widest h-14 rounded-none">
                                Transmit
                            </Button>
                        </div>
                    )
                };
            case 'press':
                return {
                    id: 'CORP_04',
                    title: 'MEDIA_RELATIONS',
                    subtitle: 'The Narrative',
                    desc: 'Access our official brand assets, leadership bios, and latest press releases. We value transparency and precise communication.',
                    mainIcon: <Globe className="text-[#f1c21b]" size={48} />,
                    stats: [
                        { label: 'Assets', value: 'v3.0' },
                        { label: 'Contact', value: 'PR_TEAM' },
                        { label: 'Kit', value: 'ZIP' }
                    ],
                    interactiveElement: (
                        <div className="space-y-4">
                            {[
                                { name: "Brand_OS_Media_Kit_2026.zip", size: "128 MB", type: "ASSETS" },
                                { name: "Executive_Bios_Headsnaps.pdf", size: "4.2 MB", type: "DOCS" },
                                { name: "Brand_OS_Logo_Suite.svg", size: "1.8 MB", type: "VECTOR" }
                            ].map((file, i) => (
                                <div key={i} className="flex items-center justify-between bg-[#161616] border border-[#393939] p-6 hover:border-[#0f62fe] group cursor-pointer transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#333] flex items-center justify-center text-white">
                                            <Zap size={16} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-[#6f6f6f] uppercase tracking-[0.2em] mb-1">{file.type}</div>
                                            <div className="text-white font-mono text-sm">{file.name}</div>
                                        </div>
                                    </div>
                                    <span className="text-[#0f62fe] opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">[ DOWNLOAD ]</span>
                                </div>
                            ))}
                        </div>
                    )
                };
            default:
                return null;
        }
    };

    const content = getContent();
    if (!content) return null;

    const order: CompanySlug[] = ['manifesto', 'careers', 'contact', 'press'];
    const currentIndex = order.indexOf(slug);
    const nextSlug = order[(currentIndex + 1) % order.length];
    const nextContent = {
        manifesto: "THE_MANIFESTO",
        careers: "JOIN_THE_CORE",
        contact: "SIGNAL_UPLINK",
        press: "MEDIA_RELATIONS"
    }[nextSlug];

    return (
        <div className="min-h-screen bg-[#000000] text-white relative overflow-hidden flex flex-col pt-32 px-8 pb-32">
            <div className="cinematic-noise" />

            {/* Background Data Layer */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none select-none font-mono text-[80px] font-black leading-none break-all flex items-center justify-center p-24 text-center">
                {content.title}_{content.id}_{content.id}_{content.title}
            </div>

            <div className="max-w-[1600px] mx-auto w-full relative z-10 flex-1">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-16 -ml-4 hover:bg-white/5 text-[#525252] hover:text-white uppercase tracking-[0.3em] font-black text-[10px] gap-3"
                >
                    <ArrowLeft size={16} /> [ Back_to_Interface ]
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-48">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-4 bg-[#161616] border border-[#393939] px-6 py-2 mb-8">
                            <div className="w-2 h-2 rounded-full bg-[#0f62fe] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c6c6c6]">{content.id} // CORPORATE_MODULE</span>
                        </div>
                        <h1 className="text-[clamp(4rem,10vw,12rem)] font-black tracking-tighter uppercase leading-[0.85] mb-8">
                            {content.title.replace('_', ' ')}
                        </h1>
                        <p className="text-3xl md:text-5xl font-light text-[#c6c6c6] mb-12 leading-tight max-w-2xl italic">
                            {content.subtitle}.
                        </p>
                        <p className="text-xl text-[#6f6f6f] mb-16 max-w-xl leading-relaxed font-normal">
                            {content.desc}
                        </p>
                        <div className="flex flex-wrap gap-8 mb-16">
                            {content.stats.map((stat, i) => (
                                <div key={i} className="border-l-2 border-[#393939] pl-6 py-2">
                                    <div className="text-[10px] font-black text-[#525252] uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                                    <div className="text-3xl font-black italic tabular-nums">{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        {content.interactiveElement && (
                            <div className="mt-12 w-full">
                                {content.interactiveElement}
                            </div>
                        )}

                        {content.interactiveElement && (
                            <div className="mt-12 w-full">
                                {content.interactiveElement}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative hidden lg:block"
                    >
                        <div className="aspect-square bg-gradient-to-br from-[#161616] to-[#000] border border-[#393939] p-24 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[#0f62fe]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-1000">
                                {content.mainIcon}
                            </div>
                            {/* Technical Decorations */}
                            <div className="absolute top-8 left-8 text-[8px] font-mono text-[#333] tracking-[0.4em] uppercase">CORP_STATE: [ OPTIMAL ]</div>
                            <div className="absolute bottom-8 right-8 text-[8px] font-mono text-[#333] tracking-[0.4em] uppercase">ENCRYPTION: [ AES_256 ]</div>
                            <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-[#393939] to-transparent" />
                            <div className="absolute bottom-0 left-0 w-px h-32 bg-gradient-to-t from-[#393939] to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Next Module Navigation */}
            <div
                className="max-w-[1600px] mx-auto w-full mb-32 group cursor-pointer border-t border-[#393939] pt-12 mt-32"
                onClick={() => onNavigate(nextSlug)}
            >
                <div className="flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#666]">Next_Section</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#666] flex items-center gap-2">
                        [ SYSTEM_LINK ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
                <div className="text-[clamp(2rem,5vw,5rem)] font-black uppercase tracking-tighter text-[#333] group-hover:text-white transition-colors mt-4">
                    {nextContent.replace('_', ' ')}
                </div>
            </div>

            <footer className="mt-auto pt-32 max-w-[1600px] mx-auto w-full flex justify-between items-center text-[10px] font-mono text-[#333] font-black tracking-[0.4em] uppercase border-t border-[#1a1a1a]">
                <div className="flex gap-12">
                    <span>© 2026 DNA_SYSTEMS_GLOBAL</span>
                    <span className="opacity-0 lg:opacity-100">TXID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
                <span>Status: [ ONLINE_STABLE ]</span>
            </footer>
        </div>
    );
};
