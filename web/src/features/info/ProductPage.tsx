import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap, ArrowLeft, Shield, Box, Code,
    Cpu, Activity, Target, ChevronRight,
    Search, Layers, Database, Lock, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui';

export type ProductSlug = 'identity' | 'doctrine' | 'studio' | 'audit';

interface ProductPageProps {
    slug: ProductSlug;
    onBack: () => void;
    onLoginClick: () => void;
    onNavigate: (slug: ProductSlug) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ slug, onBack, onLoginClick, onNavigate }) => {
    // ... content logic ...

    const order: ProductSlug[] = ['identity', 'doctrine', 'studio', 'audit'];
    const currentIndex = order.indexOf(slug);
    const nextSlug = order[(currentIndex + 1) % order.length];
    const nextContent = {
        identity: "IDENTITY_CORE",
        doctrine: "DOCTRINE_ENGINE",
        studio: "STUDIO_API",
        audit: "AUDIT_PROTOCOL"
    }[nextSlug];

    interface ProductContent {
        id: string;
        title: string;
        subtitle: string;
        desc: string;
        mainIcon: React.ReactNode;
        impact: string;
        features: { title: string; desc: string; }[];
        stats: { label: string; value: string; }[];
        processSteps?: { title: string; desc: string; }[];
        demoComponent?: React.ReactNode;
        technicalSpecs?: { label: string; value: string; }[];
    }

    const getContent = (): ProductContent | null => {
        // ... switch slug ...
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
                    ],
                    processSteps: [
                        { title: 'Ingestion', desc: 'Drag-and-drop your legacy PDF guidelines or sync directly from Figma variables.' },
                        { title: 'Tokenization', desc: 'AI extracts atomic design tokens (H1 size, primary color, corner radius) into JSON.' },
                        { title: 'Distribution', desc: 'Tokens are pushed to a global CDN edge, available via API or NPM package.' },
                        { title: 'Synchronization', desc: 'Connected apps (Web, iOS, React) pull the latest styles instantly.' }
                    ],
                    demoComponent: (
                        <div className="bg-[#1e1e1e] border border-[#393939] p-6 font-mono text-xs overflow-hidden relative group">
                            <div className="flex items-center justify-between mb-4 border-b border-[#393939] pb-2">
                                <span className="text-[#c6c6c6]">design-tokens.json</span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                            </div>
                            <pre className="text-[#a8a8a8] leading-relaxed">
                                <span className="text-[#f1c21b]">{`{`}</span>{`
  `}<span className="text-[#42be65]">"brand"</span>: <span className="text-[#fa7f7f]">"Acme Global"</span>,{`
  `}<span className="text-[#42be65]">"version"</span>: <span className="text-[#4589ff]">3.0.1</span>,{`
  `}<span className="text-[#42be65]">"tokens"</span>: <span className="text-[#f1c21b]">{`{`}</span>{`
    `}<span className="text-[#42be65]">"primary"</span>: <span className="text-[#fa7f7f]">"#0F62FE"</span>,{`
    `}<span className="text-[#42be65]">"spacing"</span>: <span className="text-[#f1c21b]">{`{`}</span>{`
      `}<span className="text-[#42be65]">"sm"</span>: <span className="text-[#fa7f7f]">"0.5rem"</span>,{`
      `}<span className="text-[#42be65]">"md"</span>: <span className="text-[#fa7f7f]">"1rem"</span>{`
    `}<span className="text-[#f1c21b]">{`}`}</span>,{`
    `}<span className="text-[#42be65]">"font"</span>: <span className="text-[#fa7f7f]">"IBM Plex Sans"</span>{`
  `}<span className="text-[#f1c21b]">{`}`}</span>{`
`} <span className="text-[#f1c21b]">{`}`}</span>
                            </pre>
                            <div className="absolute top-4 right-4 text-[10px] bg-[#0f62fe] text-white px-2 py-0.5 uppercase tracking-wider">JSON</div>
                        </div>
                    ),
                    technicalSpecs: [
                        { label: 'API Protocols', value: 'REST, GraphQL, gRPC' },
                        { label: 'Token Formats', value: 'JSON, CSS, SCSS, Swift, XML' },
                        { label: 'Up-time SLA', value: '99.99%' },
                        { label: 'Encryption', value: 'AES-256 (At Rest + Transit)' }
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
                    ],
                    processSteps: [
                        { title: 'Definition', desc: 'Author rules using natural language (e.g., "Logos must always have safe space").' },
                        { title: 'Translation', desc: 'LLM translates semantic rules into executable logic code (Python/WASM).' },
                        { title: 'Integration', desc: 'Drop the Doctrine SDK into your CI/CD pipeline or Design Tools.' },
                        { title: 'Enforcement', desc: 'Block commits or exports that violate the visual doctrine logic.' }
                    ],
                    demoComponent: (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#6f6f6f] mb-2">
                                <span>Audit_Sequence</span>
                                <span>Status: <span className="text-[#f1c21b]">RUNNING</span></span>
                            </div>
                            {[
                                { step: "Syntax Check", status: "PASS", color: "text-[#24a148]" },
                                { step: "Spatial Rules", status: "PASS", color: "text-[#24a148]" },
                                { step: "Color Contrast", status: "Computing...", color: "text-[#f1c21b] animate-pulse" },
                                { step: "Legal Disc.", status: "PENDING", color: "text-[#525252]" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${item.status === 'PASS' ? 'bg-[#24a148]' : item.status === 'Computing...' ? 'bg-[#f1c21b]' : 'bg-[#525252]'}`} />
                                    <div className="flex-1 h-[1px] bg-[#393939]" />
                                    <span className={`text-xs font-mono font-bold ${item.color}`}>{item.step}</span>
                                </div>
                            ))}
                        </div>
                    ),
                    technicalSpecs: [
                        { label: 'Logic Engine', value: 'Custom WASM Runtime' },
                        { label: 'Rule Types', value: 'Spatial, Semantic, Color, Typo' },
                        { label: 'Latency', value: '< 50ms per check' },
                        { label: 'Environment', value: 'Edge + Client-Side' }
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
                    ],
                    processSteps: [
                        { title: 'Contextualize', desc: 'Select a campaign (e.g., "Summer Sale") to load specific assets and vibes.' },
                        { title: 'Compose', desc: 'Describe the asset. AI uses your visual tokens to compose the layout.' },
                        { title: 'Refine', desc: 'Use "Temperature" and "Strictness" sliders to explore variations safely.' },
                        { title: 'Export', desc: 'Download ready-to-use PNG/SVG/MP4 files with metadata embedded.' }
                    ],
                    demoComponent: (
                        <div className="space-y-8 p-2">
                            {[
                                { label: "Creativity Temp", val: 70 },
                                { label: "Brand Strictness", val: 95 },
                                { label: "Vibe Intensity", val: 40 }
                            ].map((control, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#c6c6c6] mb-3">
                                        <span>{control.label}</span>
                                        <span>{control.val}%</span>
                                    </div>
                                    <div className="h-1 bg-[#393939] w-full relative">
                                        <div className="absolute top-0 left-0 h-full bg-[#0f62fe]" style={{ width: `${control.val}%` }} />
                                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white cursor-pointer hover:scale-125 transition-transform" style={{ left: `${control.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ),
                    technicalSpecs: [
                        { label: 'AI Models', value: 'Gemini Pro Vision, DALL-E 3 (Custom LoRA)' },
                        { label: 'Output Formats', value: 'Raster, Vector, HTML5' },
                        { label: 'Max Res', value: '8K Ultra HD' },
                        { label: 'Concurrency', value: 'Unlimited Parallel Jobs' }
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
                    ],
                    processSteps: [
                        { title: 'Scan', desc: 'Crawler visits your web properties, social feeds, and DAM folders.' },
                        { title: 'Analyze', desc: 'Computer Vision compares live pixels against the Identity Core truth.' },
                        { title: 'Score', desc: 'Assigns a text compliance score (0-100) and highlights violations.' },
                        { title: 'Remediate', desc: 'Auto-generates tickets (Jira/Linear) for creative teams to fix issues.' }
                    ],
                    demoComponent: (
                        <div className="overflow-hidden border border-[#393939] text-[10px] font-mono">
                            <table className="w-full text-left">
                                <thead className="bg-[#161616] text-[#6f6f6f]">
                                    <tr>
                                        <th className="p-3 uppercase tracking-wider font-normal border-b border-[#393939]">Asset_ID</th>
                                        <th className="p-3 uppercase tracking-wider font-normal border-b border-[#393939]">Rule</th>
                                        <th className="p-3 uppercase tracking-wider font-normal border-b border-[#393939]">Status</th>
                                        <th className="p-3 uppercase tracking-wider font-normal border-b border-[#393939] text-right">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#393939]">
                                    {[
                                        { id: "IMG_001", rule: "Logo_Safe_Space", status: "PASS", score: "100" },
                                        { id: "IMG_002", rule: "Color_Contrast", status: "FAIL", score: "42" },
                                        { id: "IMG_003", rule: "Typography_H1", status: "PASS", score: "98" }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-[#1a1a1a]">
                                            <td className="p-3 text-[#c6c6c6]">{row.id}</td>
                                            <td className="p-3 text-[#c6c6c6]">{row.rule}</td>
                                            <td className="p-3">
                                                <span className={`px-1.5 py-0.5 ${row.status === 'PASS' ? 'bg-[#24a148]/20 text-[#24a148]' : 'bg-[#da1e28]/20 text-[#da1e28]'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right font-bold text-white">{row.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ),
                    technicalSpecs: [
                        { label: 'Scan Freq', value: 'Real-time / Scheduled' },
                        { label: 'Integrations', value: 'Slack, Jira, Linear, DAMs' },
                        { label: 'Compliance Std', value: 'SOC2 Type II, GDPR' },
                        { label: 'Storage', value: 'Cold Immutable Ledger' }
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

                {/* VISUAL DEMO COMPONENT */}
                {content.demoComponent && (
                    <div className="mb-48 border border-[#393939] bg-[#161616] p-4 lg:p-12 relative overflow-hidden group">
                        <div className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#666]">
                            Interactive_Module // {content.id}
                        </div>
                        <div className="mt-12 lg:mt-6 bg-black border border-[#393939] p-4 lg:p-8 max-w-3xl mx-auto shadow-2xl relative z-10">
                            {content.demoComponent}
                        </div>
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f62fe]/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#f1c21b]/5 to-transparent pointer-events-none" />
                    </div>
                )}

                {/* DEEP DIVE: PROCESS STEPS */}
                {content.processSteps && (
                    <div className="mb-48">
                        <div className="inline-flex items-center gap-4 bg-[#161616] border border-[#393939] px-6 py-2 mb-16">
                            <div className="w-2 h-2 rounded-full bg-[#f1c21b] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c6c6c6]">System_Architecture // FLOW</span>
                        </div>
                        <h2 className="text-[clamp(3rem,6vw,6rem)] font-black tracking-tighter uppercase leading-[0.9] mb-24">
                            Execution Protocol.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {content.processSteps.map((step, i) => (
                                <div key={i} className="relative group">
                                    <div className="text-[100px] font-black text-[#1a1a1a] leading-none absolute -top-12 -left-4 z-0 group-hover:text-[#222] transition-colors select-none">
                                        0{i + 1}
                                    </div>
                                    <div className="relative z-10 border-t-2 border-[#333] pt-8 group-hover:border-[#0f62fe] transition-colors">
                                        <h3 className="text-xl font-black uppercase mb-4 tracking-wider">{step.title}</h3>
                                        <p className="text-[#6f6f6f] text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TECHNICAL SPECS */}
                {content.technicalSpecs && (
                    <div className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 border-t border-[#1a1a1a] pt-24">
                        <div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Technical Specifications</h2>
                            <p className="text-[#6f6f6f] text-lg max-w-md">
                                Enterprise-grade infrastructure built for scale, security, and millisecond-latency enforcement.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {content.technicalSpecs.map((spec, i) => (
                                <div key={i} className="flex justify-between items-baseline border-b border-[#1a1a1a] pb-4">
                                    <span className="text-[#6f6f6f] font-mono text-xs uppercase tracking-widest">{spec.label}</span>
                                    <span className="text-white font-mono text-xs font-bold">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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

            {/* Next Module Navigation */}
            <div
                className="max-w-[1600px] mx-auto w-full mb-32 group cursor-pointer border-t border-[#393939] pt-12 mt-32"
                onClick={() => onNavigate(nextSlug)}
            >
                <div className="flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#666]">Next_Module</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#666] flex items-center gap-2">
                        [ SYSTEM_LINK ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
                <div className="text-[clamp(2rem,5vw,5rem)] font-black uppercase tracking-tighter text-[#333] group-hover:text-white transition-colors mt-4">
                    {nextContent}
                </div>
            </div>

            <footer className="mt-auto pt-32 max-w-[1600px] mx-auto w-full flex justify-between items-center text-[10px] font-mono text-[#333] font-black tracking-[0.4em] uppercase border-t border-[#1a1a1a]">
                <div className="flex gap-12">
                    <span>© 2026 Brand OS Inc. All Systems Operational.</span>
                    <span className="opacity-0 lg:opacity-100">TXID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
                <span>Status: [ ONLINE_STABLE ]</span>
            </footer>
        </div >
    );
};
