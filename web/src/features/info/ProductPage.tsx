import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap, ArrowLeft, Shield, Box, Code,
    Cpu, Activity, Target, ChevronRight,
    Search, Layers, Database, Lock
} from 'lucide-react';
import { Button } from '@/components/ui';

export type ProductSlug = 'identity' | 'doctrine' | 'studio' | 'audit';

interface ProductPageProps {
    slug: ProductSlug;
    onBack: () => void;
    onLoginClick: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ slug, onBack, onLoginClick }) => {
    const getContent = () => {
        switch (slug) {
            case 'identity':
                return {
                    id: 'POD_01',
                    title: 'IDENTITY_CORE',
                    subtitle: 'The Source of Truth',
                    desc: 'Centralize your global brand identity into a single, immutable DNA sequence. No more PDF styleguides—just live, enforceable code.',
                    mainIcon: <Shield className="text-[#0f62fe]" size={48} />,
                    impact: 'Eliminates 100% of brand ambiguity across distributed teams.',
                    features: [
                        { title: 'DNA Master Pulse', desc: 'Real-time synchronization of every color, spacing, and typographic token across all platforms.' },
                        { title: 'Neural Library', desc: 'Self-organizing asset management that tags and categorizes your DNA via computer vision.' },
                        { title: 'Multi-Tenant Sync', desc: 'Push identity updates to every active campaign and application in a single deployment.' }
                    ],
                    stats: [
                        { label: 'Asset Recall', value: '< 0.5s' },
                        { label: 'Sync Latency', value: '12ms' },
                        { label: 'Integrity', value: '100%' }
                    ]
                };
            case 'doctrine':
                return {
                    id: 'POD_02',
                    title: 'DOCTRINE_ENGINE',
                    subtitle: 'Operational Governance',
                    desc: 'Apply logical constraints to your brand. Define the "Grammar" of your visual identity and let the AI enforce it in real-time.',
                    mainIcon: <Cpu className="text-[#f1c21b]" size={48} />,
                    impact: 'Reduces regulatory and brand compliance review time by 90%.',
                    features: [
                        { title: 'Logic Gates', desc: 'Define "Forbidden Elements" and "Emotional Targets" that the AI must respect.' },
                        { title: 'Real-time Guardrails', desc: 'Interactive feedback for creators as they build, preventing brand violations before they happen.' },
                        { title: 'Pattern Recognition', desc: 'Automatically extract stylistic signatures from your winners and codify them into rules.' }
                    ],
                    stats: [
                        { label: 'Rule Enforce', value: '3,500/sec' },
                        { label: 'Policy Drift', value: '0.00%' },
                        { label: 'Audit Speed', value: 'vFAST' }
                    ]
                };
            case 'studio':
                return {
                    id: 'POD_03',
                    title: 'STUDIO_API',
                    subtitle: 'High-Velocity Creative',
                    desc: 'Generate high-fidelity, brand-aligned assets in seconds. The Studio isn\'t a sandbox—it\'s a precision tool for professional creative.',
                    mainIcon: <Layers className="text-[#0f62fe]" size={48} />,
                    impact: 'Scales content production from weeks to minutes while maintaining 1:1 brand fidelity.',
                    features: [
                        { title: 'DNA-Aware Prompting', desc: 'The AI understands your specific Doctrine rules, ensuring every generation is "On Brand".' },
                        { title: 'Iterative Refinement', desc: 'Cinematic slider controls for intensity, vibe, and technical precision.' },
                        { title: 'Batch Deployment', desc: 'Generate entire social packs or campaign sets that are pre-audited for compliance.' }
                    ],
                    stats: [
                        { label: 'Gen Velocity', value: '10x' },
                        { label: 'Asset Quality', value: 'Tier_1' },
                        { label: 'Draft to Prod', value: '60s' }
                    ]
                };
            case 'audit':
                return {
                    id: 'POD_04',
                    title: 'AUDIT_PROTOCOL',
                    subtitle: 'Technical Enforcement',
                    desc: 'Automate your brand review queue. Every asset, every post, every pixel—audited against your DNA in milliseconds.',
                    mainIcon: <Activity className="text-[#f1c21b]" size={48} />,
                    impact: 'Replaces manual brand guardianship with an automated, 24/7 security layer.',
                    features: [
                        { title: 'Pixel-Perfect Scan', desc: 'AI-driven visual audit that detects logo misuse, color drift, and composition errors.' },
                        { title: 'Audit Trail', desc: 'Immutable logs of every brand decision, provide full accountability for enterprise compliance.' },
                        { title: 'Instant Blocking', desc: 'Automatically flag or block off-brand content from being published via API hooks.' }
                    ],
                    stats: [
                        { label: 'Detection Acc', value: '99.9%' },
                        { label: 'Log Immute', value: 'SHA-256' },
                        { label: 'Risk Scale', value: 'Zero' }
                    ]
                };
            default:
                return null;
        }
    };

    const content = getContent();
    if (!content) return null;

    return (
        <div className="min-h-screen bg-[#000000] text-white relative overflow-hidden flex flex-col pt-32 px-8 pb-32">
            <div className="cinematic-noise" />

            {/* Background Data Layer */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none select-none font-mono text-[80px] font-black leading-none break-all flex items-center justify-center p-24 text-center">
                {content.title}_{content.id}_{content.id}_{content.title}
            </div>

            <div className="max-w-[1600px] mx-auto w-full relative z-10">
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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c6c6c6]">{content.id} // SYSTEM_MODULE</span>
                        </div>
                        <h1 className="text-[clamp(4rem,10vw,12rem)] font-black tracking-tighter uppercase leading-[0.85] mb-8">
                            {content.title}
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
                            <div className="absolute top-8 left-8 text-[8px] font-mono text-[#333] tracking-[0.4em] uppercase">SYSTEM_STATE: [ OPTIMAL ]</div>
                            <div className="absolute bottom-8 right-8 text-[8px] font-mono text-[#333] tracking-[0.4em] uppercase">ENCRYPTION: [ AES_256 ]</div>
                            <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-[#393939] to-transparent" />
                            <div className="absolute bottom-0 left-0 w-px h-32 bg-gradient-to-t from-[#393939] to-transparent" />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-48">
                    {content.features.map((feature, i) => (
                        <div key={i} className="p-12 border border-[#1a1a1a] bg-[#080808] hover:bg-[#0f0f0f] transition-all group">
                            <div className="w-10 h-10 bg-[#161616] border border-[#333] flex items-center justify-center mb-10 group-hover:border-[#0f62fe] transition-colors">
                                <ChevronRight className="text-[#333] group-hover:text-[#0f62fe] transition-colors" size={20} />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-6 tracking-tighter">{feature.title}</h3>
                            <p className="text-lg text-[#6f6f6f] font-light leading-snug group-hover:text-white transition-colors">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-[#161616] border border-[#393939] p-16 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 h-full">
                    <div className="max-w-2xl h-full">
                        <h2 className="text-4xl font-black uppercase mb-6 tracking-tighter italic">Operational Impact</h2>
                        <p className="text-xl text-[#c6c6c6] font-light italic opacity-80 mb-0">
                            "{content.impact}"
                        </p>
                    </div>
                    <Button
                        onClick={onLoginClick}
                        className="bg-white text-black hover:bg-white/90 h-20 px-16 rounded-none text-xl font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    >
                        Initialize Protocol
                    </Button>
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
