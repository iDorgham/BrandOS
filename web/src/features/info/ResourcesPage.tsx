import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Book, Terminal, Server, Lock, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui';

export type ResourcesSlug = 'documentation' | 'api' | 'status' | 'security';

interface ResourcesPageProps {
    slug: ResourcesSlug;
    onBack: () => void;
    onNavigate: (slug: ResourcesSlug) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ slug, onBack, onNavigate }) => {
    interface ResourcesContent {
        id: string;
        title: string;
        subtitle: string;
        desc: string;
        mainIcon: React.ReactNode;
        stats: { label: string; value: string; }[];
        interactiveElement?: React.ReactNode;
    }

    const getContent = (): ResourcesContent | null => {
        switch (slug) {
            case 'documentation':
                return {
                    id: 'RES_01',
                    title: 'SYSTEM_DOCS',
                    subtitle: 'Knowledge Base',
                    desc: 'Comprehensive guides for integrating Brand OS into your existing workflow. From basic style tokens to complex logic gates.',
                    mainIcon: <Book className="text-[#0f62fe]" size={48} />,
                    stats: [
                        { label: 'Articles', value: '450+' },
                        { label: 'Updated', value: 'NOW' },
                        { label: 'Version', value: '3.0' }
                    ],
                    interactiveElement: (
                        <div className="border border-[var(--cds-layer-02)] bg-[var(--cds-layer-01)] p-1 flex h-64 font-mono text-xs shadow-lg">
                            <div className="w-1/3 border-r border-[var(--cds-layer-02)] p-4 space-y-3 bg-[var(--cds-ui-background)]">
                                <div className="text-[10px] uppercase tracking-widest text-[var(--cds-text-secondary)] opacity-50 mb-2">Structure</div>
                                <div className="text-[var(--cds-text-primary)] font-bold cursor-pointer hover:text-[var(--cds-interactive-01)] transition-colors">{'>'} Get_Started</div>
                                <div className="text-[var(--cds-text-secondary)] cursor-pointer hover:text-[var(--cds-text-primary)] pl-2 transition-colors">Install_CLI</div>
                                <div className="text-[var(--cds-text-secondary)] cursor-pointer hover:text-[var(--cds-text-primary)] pl-2 transition-colors">Auth_Token</div>
                                <div className="text-[var(--cds-text-secondary)] cursor-pointer hover:text-[var(--cds-text-primary)] pl-2 transition-colors">First_Audit</div>
                            </div>
                            <div className="w-2/3 p-6 space-y-4 overflow-hidden relative">
                                <div className="text-[10px] uppercase tracking-widest text-[var(--cds-interactive-01)] font-bold">Quickstart</div>
                                <h3 className="text-xl font-bold text-[var(--cds-text-primary)]">Initializing the Core</h3>
                                <p className="text-[var(--cds-text-secondary)] leading-relaxed">Run the initialization command to generate your local configuration file. This will sync your repo with the Brand OS identity ledger.</p>
                                <div className="bg-[var(--cds-ui-background)] p-3 border border-[var(--cds-layer-03)] text-[var(--cds-support-success)] font-mono shadow-inner">
                                    $ npx brand-os init --force
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[var(--cds-layer-01)] to-transparent" />
                            </div>
                        </div>
                    )
                };
            case 'api':
                return {
                    id: 'RES_02',
                    title: 'API_REFERENCE',
                    subtitle: 'Headless Protocol',
                    desc: 'Direct access to the DNA engine. Generate assets, validate compliance, and sync tokens programmatically via our REST and GraphQL endpoints.',
                    mainIcon: <Terminal className="text-[#f1c21b]" size={48} />,
                    stats: [
                        { label: 'Uptime', value: '99.9%' },
                        { label: 'Latency', value: '12ms' },
                        { label: 'Rate', value: 'UNLTD' }
                    ],
                    interactiveElement: (
                        <div className="bg-[var(--cds-layer-01)] border border-[var(--cds-layer-02)] overflow-hidden shadow-lg">
                            <div className="flex bg-[var(--cds-layer-03)] px-4 py-2 text-[10px] font-mono font-bold text-[var(--cds-text-primary)] gap-4">
                                <span className="text-[var(--cds-interactive-01)]">POST</span>
                                <span>/v3/audit/image</span>
                            </div>
                            <div className="p-6 font-mono text-xs text-[var(--cds-text-secondary)] leading-relaxed">
                                <div className="mb-2"><span className="text-[var(--cds-text-primary)]">curl</span> -X POST https://api.brand-os.com/v3/audit \</div>
                                <div className="mb-2 pl-4">-H <span className="text-[var(--cds-support-error)]">'Authorization: Bearer DNA_KEY_...'</span> \</div>
                                <div className="mb-2 pl-4">-H <span className="text-[var(--cds-support-error)]">'Content-Type: application/json'</span> \</div>
                                <div className="mb-2 pl-4">-d <span className="text-[var(--cds-support-warning)]">{`'{`}</span></div>
                                <div className="pl-8"><span className="text-[var(--cds-support-success)]">"asset_url"</span>: <span className="text-[var(--cds-support-error)]">"https://s3.aws.../banner.png"</span>,</div>
                                <div className="pl-8"><span className="text-[var(--cds-support-success)]">"strictness"</span>: <span className="text-[var(--cds-interactive-01)]">0.95</span></div>
                                <div className="pl-4"><span className="text-[var(--cds-support-warning)]">{`}'`}</span></div>
                            </div>
                        </div>
                    )
                };
            case 'status':
                return {
                    id: 'RES_03',
                    title: 'SYSTEM_STATUS',
                    subtitle: 'Operational Health',
                    desc: 'Real-time metrics on our global node network. We believe in radical transparency regarding our uptime and performance.',
                    mainIcon: <Server className="text-[#0f62fe]" size={48} />,
                    stats: [
                        { label: 'Global', value: 'OPERATIONAL' },
                        { label: 'Incidents', value: '0' },
                        { label: 'Nodes', value: '128' }
                    ],
                    interactiveElement: (
                        <div className="space-y-4">
                            {[
                                { name: "Identity_Core_API", status: "Operational", lat: "12ms" },
                                { name: "Doctrine_Engine_V2", status: "Operational", lat: "45ms" },
                                { name: "Generative_GPU_Cluster", status: "High Load", lat: "120ms", warn: true },
                                { name: "Asset_CDN_Global", status: "Operational", lat: "24ms" }
                            ].map((service, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-[var(--cds-layer-02)] pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${service.warn ? 'bg-[var(--cds-support-warning)] animate-pulse' : 'bg-[var(--cds-support-success)]'}`} />
                                        <span className="text-[var(--cds-text-primary)] font-mono text-sm font-bold uppercase tracking-wider">{service.name}</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-[var(--cds-text-secondary)] opacity-50 uppercase tracking-[0.2em]">{service.status} // {service.lat}</div>
                                </div>
                            ))}
                        </div>
                    )
                };
            case 'security':
                return {
                    id: 'RES_04',
                    title: 'SEC_PROTOCOL',
                    subtitle: 'Enterprise Grade',
                    desc: 'Your brand assets are your most valuable IP. We protect them with military-grade encryption, SOC 2 Type II compliance, and continuous auditing.',
                    mainIcon: <Lock className="text-[#f1c21b]" size={48} />,
                    stats: [
                        { label: 'Encrypt', value: 'AES-256' },
                        { label: 'Audit', value: 'SOC2' },
                        { label: 'Privacy', value: 'GDPR' }
                    ],
                    interactiveElement: (
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "SOC2 Type II", date: "Verified 2026", id: "SOC-2" },
                                { label: "GDPR Compliant", date: "EU Region", id: "EU-24" },
                                { label: "ISO 27001", date: "InfoSec Std", id: "ISO-27" },
                                { label: "CCPA Ready", date: "US Region", id: "CA-25" }
                            ].map((cert, i) => (
                                <div key={i} className="border border-[var(--cds-layer-02)] p-4 bg-[var(--cds-layer-01)] flex flex-col items-center text-center hover:border-[var(--cds-support-warning)] transition-colors group shadow-sm">
                                    <Shield className="mb-3 text-[var(--cds-text-secondary)] opacity-30 group-hover:text-[var(--cds-support-warning)] group-hover:opacity-100 transition-all" size={24} />
                                    <div className="text-[var(--cds-text-primary)] font-black uppercase text-xs tracking-wider mb-1">{cert.label}</div>
                                    <div className="text-[10px] text-[var(--cds-text-secondary)] opacity-50 font-mono">{cert.date}</div>
                                    <div className="mt-2 text-[8px] bg-[var(--cds-layer-03)] px-2 py-0.5 rounded text-[var(--cds-text-secondary)] font-mono">{cert.id}</div>
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

    const order: ResourcesSlug[] = ['documentation', 'api', 'status', 'security'];
    const currentIndex = order.indexOf(slug);
    const nextSlug = order[(currentIndex + 1) % order.length];
    const nextContent = {
        documentation: "SYSTEM_DOCS",
        api: "API_REFERENCE",
        status: "SYSTEM_STATUS",
        security: "SEC_PROTOCOL"
    }[nextSlug];

    return (
        <div className="min-h-screen bg-[var(--cds-ui-background)] text-[var(--cds-text-primary)] relative overflow-hidden flex flex-col pt-32 px-8 pb-32 transition-colors duration-300">
            <div className="cinematic-noise" />

            {/* Background Data Layer */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none select-none font-mono text-[80px] font-black leading-none break-all flex items-center justify-center p-24 text-center text-[var(--cds-text-primary)]">
                {content.title}_{content.id}_{content.id}_{content.title}
            </div>

            <div className="max-w-[1600px] mx-auto w-full relative z-10 flex-1">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-16 -ml-4 hover:bg-[var(--cds-layer-hover)] text-[var(--cds-text-secondary)] hover:text-[var(--cds-text-primary)] uppercase tracking-[0.3em] font-black text-[10px] gap-3"
                >
                    <ArrowLeft size={16} /> [ Back_to_Interface ]
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-48">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-4 bg-[var(--cds-layer-01)] border border-[var(--cds-layer-02)] px-6 py-2 mb-8 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[var(--cds-interactive-01)] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--cds-text-secondary)] font-mono">{content.id} // KNOWLEDGE_BASE</span>
                        </div>
                        <h1 className="text-[clamp(4rem,10vw,12rem)] font-black tracking-tighter uppercase leading-[0.85] mb-8">
                            {content.title.replace('_', ' ')}
                        </h1>
                        <p className="text-3xl md:text-5xl font-light text-[var(--cds-text-secondary)] mb-12 leading-tight max-w-2xl italic">
                            {content.subtitle}.
                        </p>
                        <p className="text-xl text-[var(--cds-text-secondary)] opacity-80 mb-16 max-w-xl leading-relaxed font-normal">
                            {content.desc}
                        </p>
                        <div className="flex flex-wrap gap-8 mb-16">
                            {content.stats.map((stat, i) => (
                                <div key={i} className="border-l-2 border-[var(--cds-layer-03)] pl-6 py-2">
                                    <div className="text-[10px] font-black text-[var(--cds-text-secondary)] opacity-50 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                                    <div className="text-3xl font-black italic tabular-nums text-[var(--cds-text-primary)]">{stat.value}</div>
                                </div>
                            ))}
                        </div>

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
                        <div className="aspect-square bg-gradient-to-br from-[var(--cds-layer-01)] to-[var(--cds-ui-background)] border border-[var(--cds-layer-02)] p-24 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-[var(--cds-interactive-01)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-1000">
                                {content.mainIcon}
                            </div>
                            {/* Technical Decorations */}
                            <div className="absolute top-8 left-8 text-[8px] font-mono text-[var(--cds-text-secondary)] opacity-30 tracking-[0.4em] uppercase">SYS_OP: [ ONLINE ]</div>
                            <div className="absolute bottom-8 right-8 text-[8px] font-mono text-[var(--cds-text-secondary)] opacity-30 tracking-[0.4em] uppercase">ENCRYPTION: [ VALID ]</div>
                            <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-[var(--cds-layer-03)] to-transparent" />
                            <div className="absolute bottom-0 left-0 w-px h-32 bg-gradient-to-t from-[var(--cds-layer-03)] to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Next Module Navigation */}
            <div
                className="max-w-[1600px] mx-auto w-full mb-32 group cursor-pointer border-t border-[var(--cds-layer-02)] pt-12 mt-32"
                onClick={() => onNavigate(nextSlug)}
            >
                <div className="flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--cds-text-secondary)]">Next_Section</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--cds-text-secondary)] flex items-center gap-2">
                        [ SYSTEM_LINK ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
                <div className="text-[clamp(2rem,5vw,5rem)] font-black uppercase tracking-tighter text-[var(--cds-text-secondary)] opacity-30 group-hover:text-[var(--cds-text-primary)] group-hover:opacity-100 transition-all mt-4">
                    {nextContent.replace('_', ' ')}
                </div>
            </div>

            <footer className="mt-auto pt-32 max-w-[1600px] mx-auto w-full flex justify-between items-center text-[10px] font-mono text-[var(--cds-text-secondary)] opacity-30 font-black tracking-[0.4em] uppercase border-t border-[var(--cds-layer-01)]">
                <div className="flex gap-12">
                    <span>© 2026 DNA_SYSTEMS_GLOBAL</span>
                    <span className="opacity-0 lg:opacity-100">TXID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
                <span>Status: [ ONLINE_STABLE ]</span>
            </footer>
        </div>
    );
};
