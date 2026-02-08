import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Shield, Layers, Cpu, Activity, ChevronDown,
    Book, Terminal, Server, Lock, Users, Mail, Globe
} from 'lucide-react';
import { Button, ThemeToggle } from '@/components/ui';

interface SiteHeaderProps {
    onLoginClick?: () => void;
    onProductClick?: (slug: 'identity' | 'doctrine' | 'studio' | 'audit') => void;
    onResourcesClick?: (slug: 'documentation' | 'api' | 'status' | 'security') => void;
    onIndustriesClick?: () => void;
    onCaseStudiesClick?: () => void;
    onPricingClick?: () => void;
    onCompanyClick?: (slug: 'manifesto' | 'careers' | 'contact' | 'press') => void;
    dark?: boolean;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
    onLoginClick,
    onProductClick = () => { },
    onResourcesClick = () => { },
    onIndustriesClick = () => { },
    onCaseStudiesClick = () => { },
    onPricingClick = () => { },
    onCompanyClick = () => { },
    dark = false
}) => {
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    return (
        <nav className={`fixed top-0 w-full z-50 border-b transition-colors h-16 ${dark
            ? 'bg-[var(--cds-ui-background)]/80 border-[var(--cds-layer-03)] text-[var(--cds-text-primary)] backdrop-blur-md'
            : 'bg-[var(--cds-ui-background)]/80 border-[var(--cds-layer-02)] text-[var(--cds-text-primary)] backdrop-blur-2xl'
            }`}>
            <div className="max-w-[1584px] mx-auto px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-12 h-full">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-[var(--cds-interactive-01)] flex items-center justify-center aura-glow">
                            <Zap className="text-white" size={20} fill="currentColor" />
                        </div>
                        <span className="text-[18px] font-black tracking-tighter uppercase mr-4">Brand OS</span>
                    </motion.div>

                    <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] h-full">

                        {/* Products Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setHoveredNav('products')}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            <button className={`transition-colors flex items-center gap-1 ${hoveredNav === 'products' ? 'text-[var(--cds-interactive-01)]' : 'hover:text-[var(--cds-interactive-01)]'
                                } ${!dark ? 'text-[var(--cds-text-secondary)]' : 'text-[#888]'}`}>
                                Products <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredNav === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {hoveredNav === 'products' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 pt-0 w-64"
                                    >
                                        <div className={`
                                            border shadow-2xl p-2 grid gap-1 relative z-50
                                            ${dark
                                                ? 'bg-[var(--cds-layer-01)] border-[var(--cds-layer-03)]'
                                                : 'bg-[var(--cds-ui-background)] border-[var(--cds-layer-02)]'
                                            }
                                        `}>
                                            <div className={`absolute top-0 left-6 -translate-y-2 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent ${dark ? 'border-b-[var(--cds-layer-03)]' : 'border-b-[var(--cds-layer-02)]'
                                                }`} />
                                            {[
                                                { id: 'identity', label: 'Identity Core', icon: <Shield size={14} /> },
                                                { id: 'doctrine', label: 'Doctrine Engine', icon: <Cpu size={14} /> },
                                                { id: 'studio', label: 'Creative Studio', icon: <Layers size={14} /> },
                                                { id: 'audit', label: 'Audit Protocol', icon: <Activity size={14} /> }
                                            ].map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        onProductClick(item.id as any);
                                                        setHoveredNav(null);
                                                    }}
                                                    className={`
                                                        flex items-center gap-3 w-full p-4 text-left group/item transition-colors relative overflow-hidden rounded-sm
                                                        ${dark ? 'hover:bg-[var(--cds-layer-hover)]' : 'hover:bg-[var(--cds-layer-01)]'}
                                                    `}
                                                >
                                                    <div className="text-[var(--cds-interactive-01)]">{item.icon}</div>
                                                    <span className={`transition-colors font-black tracking-wider text-[10px] ${dark
                                                        ? 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        : 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        }`}>
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Solutions Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setHoveredNav('solutions')}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            <button className={`transition-colors flex items-center gap-1 ${hoveredNav === 'solutions' ? 'text-[var(--cds-interactive-01)]' : 'hover:text-[var(--cds-interactive-01)]'
                                } ${!dark ? 'text-[var(--cds-text-secondary)]' : 'text-[#888]'}`}>
                                Solutions <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredNav === 'solutions' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {hoveredNav === 'solutions' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 pt-0 w-64"
                                    >
                                        <div className={`
                                            border shadow-2xl p-2 grid gap-1 relative z-50
                                            ${dark
                                                ? 'bg-[var(--cds-layer-01)] border-[var(--cds-layer-03)]'
                                                : 'bg-[var(--cds-ui-background)] border-[var(--cds-layer-02)]'
                                            }
                                        `}>
                                            <div className={`absolute top-0 left-6 -translate-y-2 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent ${dark ? 'border-b-[var(--cds-layer-03)]' : 'border-b-[var(--cds-layer-02)]'
                                                }`} />
                                            {[
                                                { id: 'industries', label: 'Industries', onClick: onIndustriesClick, icon: <Activity size={14} /> },
                                                { id: 'results', label: 'Case Studies', onClick: onCaseStudiesClick, icon: <Layers size={14} /> }
                                            ].map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        item.onClick();
                                                        setHoveredNav(null);
                                                    }}
                                                    className={`
                                                        flex items-center gap-3 w-full p-4 text-left group/item transition-colors relative overflow-hidden rounded-sm
                                                        ${dark ? 'hover:bg-[var(--cds-layer-hover)]' : 'hover:bg-[var(--cds-layer-01)]'}
                                                    `}
                                                >
                                                    <div className="text-[var(--cds-interactive-01)]">{item.icon}</div>
                                                    <span className={`transition-colors font-black tracking-wider text-[10px] ${dark
                                                        ? 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        : 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        }`}>
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button onClick={onPricingClick} className={`transition-colors ${!dark ? 'text-[var(--cds-text-secondary)] hover:text-[var(--cds-interactive-01)]' : 'text-[#888] hover:text-[var(--cds-interactive-01)]'}`}>
                            Pricing
                        </button>

                        {/* Resources Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setHoveredNav('resources')}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            <button className={`transition-colors flex items-center gap-1 ${hoveredNav === 'resources' ? 'text-[var(--cds-interactive-01)]' : 'hover:text-[var(--cds-interactive-01)]'
                                } ${!dark ? 'text-[var(--cds-text-secondary)]' : 'text-[#888]'}`}>
                                Resources <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredNav === 'resources' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {hoveredNav === 'resources' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 pt-0 w-64"
                                    >
                                        <div className={`
                                            border shadow-2xl p-2 grid gap-1 relative z-50
                                            ${dark
                                                ? 'bg-[var(--cds-layer-01)] border-[var(--cds-layer-03)]'
                                                : 'bg-[var(--cds-ui-background)] border-[var(--cds-layer-02)]'
                                            }
                                        `}>
                                            <div className={`absolute top-0 left-6 -translate-y-2 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent ${dark ? 'border-b-[var(--cds-layer-03)]' : 'border-b-[var(--cds-layer-02)]'
                                                }`} />
                                            {[
                                                { id: 'documentation', label: 'Documentation', icon: <Book size={14} /> },
                                                { id: 'api', label: 'API Reference', icon: <Terminal size={14} /> },
                                                { id: 'status', label: 'System Status', icon: <Server size={14} /> },
                                                { id: 'security', label: 'Security', icon: <Lock size={14} /> }
                                            ].map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        onResourcesClick(item.id as any);
                                                        setHoveredNav(null);
                                                    }}
                                                    className={`
                                                        flex items-center gap-3 w-full p-4 text-left group/item transition-colors relative overflow-hidden rounded-sm
                                                        ${dark ? 'hover:bg-[var(--cds-layer-hover)]' : 'hover:bg-[var(--cds-layer-01)]'}
                                                    `}
                                                >
                                                    <div className="text-[var(--cds-interactive-01)]">{item.icon}</div>
                                                    <span className={`transition-colors font-black tracking-wider text-[10px] ${dark
                                                        ? 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        : 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        }`}>
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Company Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setHoveredNav('company')}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            <button className={`transition-colors flex items-center gap-1 ${hoveredNav === 'company' ? 'text-[var(--cds-interactive-01)]' : 'hover:text-[var(--cds-interactive-01)]'
                                } ${!dark ? 'text-[var(--cds-text-secondary)]' : 'text-[#888]'}`}>
                                Company <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredNav === 'company' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {hoveredNav === 'company' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 pt-0 w-64"
                                    >
                                        <div className={`
                                            border shadow-2xl p-2 grid gap-1 relative z-50
                                            ${dark
                                                ? 'bg-[var(--cds-layer-01)] border-[var(--cds-layer-03)]'
                                                : 'bg-[var(--cds-ui-background)] border-[var(--cds-layer-02)]'
                                            }
                                        `}>
                                            <div className={`absolute top-0 left-6 -translate-y-2 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent ${dark ? 'border-b-[var(--cds-layer-03)]' : 'border-b-[var(--cds-layer-02)]'
                                                }`} />
                                            {[
                                                { id: 'manifesto', label: 'Manifesto', icon: <Zap size={14} /> },
                                                { id: 'careers', label: 'Careers', icon: <Users size={14} /> },
                                                { id: 'contact', label: 'Contact', icon: <Mail size={14} /> },
                                                { id: 'press', label: 'Press', icon: <Globe size={14} /> }
                                            ].map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        onCompanyClick(item.id as any);
                                                        setHoveredNav(null);
                                                    }}
                                                    className={`
                                                        flex items-center gap-3 w-full p-4 text-left group/item transition-colors relative overflow-hidden rounded-sm
                                                        ${dark ? 'hover:bg-[var(--cds-layer-hover)]' : 'hover:bg-[var(--cds-layer-01)]'}
                                                    `}
                                                >
                                                    <div className="text-[var(--cds-interactive-01)]">{item.icon}</div>
                                                    <span className={`transition-colors font-black tracking-wider text-[10px] ${dark
                                                        ? 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        : 'text-[var(--cds-text-primary)] group-hover/item:text-[var(--cds-interactive-01)]'
                                                        }`}>
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <Button onClick={onLoginClick} variant="ghost" className="font-bold tracking-widest text-[10px] uppercase">
                        Login
                    </Button>
                    <Button
                        onClick={onLoginClick}
                        className="bg-[var(--cds-interactive-01)] text-white hover:bg-[var(--cds-interactive-01)]/90 h-10 px-6 font-black uppercase tracking-widest text-[10px]"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
};
