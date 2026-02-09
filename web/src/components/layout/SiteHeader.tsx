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

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const products = [
        { id: 'identity', label: 'Identity Core', icon: <Shield size={16} /> },
        { id: 'doctrine', label: 'Doctrine Engine', icon: <Cpu size={16} /> },
        { id: 'studio', label: 'Creative Studio', icon: <Layers size={16} /> },
        { id: 'audit', label: 'Audit Protocol', icon: <Activity size={16} /> }
    ];

    const solutions = [
        { id: 'industries', label: 'Industries', onClick: onIndustriesClick, icon: <Activity size={16} /> },
        { id: 'results', label: 'Case Studies', onClick: onCaseStudiesClick, icon: <Layers size={16} /> }
    ];

    const company = [
        { id: 'manifesto', label: 'Manifesto', icon: <Zap size={16} /> },
        { id: 'careers', label: 'Careers', icon: <Users size={16} /> },
        { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
        { id: 'press', label: 'Press', icon: <Globe size={16} /> }
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 border-b transition-colors h-16 ${dark
            ? 'bg-[var(--cds-ui-background)]/80 border-[var(--cds-layer-03)] text-[var(--cds-text-primary)] backdrop-blur-md'
            : 'bg-[var(--cds-ui-background)]/80 border-[var(--cds-layer-02)] text-[var(--cds-text-primary)] backdrop-blur-2xl'
            }`}>
            <div className="max-w-[1584px] mx-auto px-6 md:px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-12 h-full">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-3 cursor-pointer shrink-0"
                    >
                        <div className="w-9 h-9 bg-[var(--cds-interactive-01)] flex items-center justify-center aura-glow">
                            <Zap className="text-white" size={18} fill="currentColor" />
                        </div>
                        <span className="text-[16px] md:text-[18px] font-black tracking-tighter uppercase">Brand OS</span>
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
                                            {products.map(item => (
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
                                            {solutions.map(item => (
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
                                            {company.map(item => (
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

                <div className="flex items-center gap-3 md:gap-6">
                    <ThemeToggle />
                    <Button
                        onClick={onLoginClick}
                        variant="ghost"
                        className="font-bold tracking-widest text-[9px] md:text-[10px] uppercase hidden sm:flex"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={onLoginClick}
                        className="bg-[var(--cds-interactive-01)] text-white hover:bg-[var(--cds-interactive-01)]/90 h-9 md:h-10 px-4 md:px-6 font-black uppercase tracking-widest text-[9px] md:text-[10px]"
                    >
                        {mobileMenuOpen ? 'Join Now' : 'Get Started'}
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-[var(--cds-text-primary)] hover:bg-[var(--cds-layer-01)] rounded-sm transition-colors"
                    >
                        <div className="w-5 flex flex-col gap-1.5 items-end">
                            <motion.div
                                animate={{ width: mobileMenuOpen ? '100%' : '100%', rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }}
                                className="h-0.5 bg-current w-full shrink-0 origin-center"
                            />
                            <motion.div
                                animate={{ opacity: mobileMenuOpen ? 0 : 1, width: mobileMenuOpen ? '0%' : '70%' }}
                                className="h-0.5 bg-current shrink-0"
                            />
                            <motion.div
                                animate={{ width: mobileMenuOpen ? '100%' : '40%', rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }}
                                className="h-0.5 bg-current shrink-0 origin-center"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'calc(100vh - 64px)' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`
                            fixed top-16 left-0 w-full overflow-y-auto lg:hidden z-50
                            ${dark ? 'bg-[var(--cds-ui-background)]' : 'bg-[var(--cds-ui-background)]'}
                        `}
                    >
                        <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />
                        <div className="p-6 space-y-8 pb-12 relative z-10">
                            <div className="grid gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--cds-text-secondary)] px-2">Products</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {products.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => { onProductClick(item.id as any); setMobileMenuOpen(false); }}
                                                className="flex items-center gap-4 p-4 rounded-sm bg-[var(--cds-layer-01)] active:bg-[var(--cds-layer-02)] transition-colors border border-transparent active:border-[var(--cds-layer-03)]"
                                            >
                                                <div className="text-[var(--cds-interactive-01)]">{item.icon}</div>
                                                <span className="font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--cds-text-secondary)] px-2">Company</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {company.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => { onCompanyClick(item.id as any); setMobileMenuOpen(false); }}
                                                className="flex items-center gap-3 p-3 rounded-sm bg-[var(--cds-layer-01)] transition-colors"
                                            >
                                                <div className="text-[var(--cds-interactive-01)] transition-transform group-active:scale-90">{item.icon}</div>
                                                <span className="font-bold text-[10px] uppercase tracking-wider">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pt-4">
                                    <button onClick={() => { onPricingClick(); setMobileMenuOpen(false); }} className="p-4 rounded-sm border border-[var(--cds-layer-02)] text-center font-black text-[11px] uppercase tracking-[0.2em]">
                                        Pricing
                                    </button>
                                    <button onClick={() => { onLoginClick?.(); setMobileMenuOpen(false); }} className="p-4 rounded-sm bg-[var(--cds-interactive-01)] text-white text-center font-black text-[11px] uppercase tracking-[0.2em]">
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
