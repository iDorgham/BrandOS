import React from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import {
    Palette,
    Type,
    Image as ImageIcon,
    Copy,
    ChevronRight,
    Download,
    Eye,
    Maximize2,
    Info,
    Fingerprint,
    Signal,
    Activity,
    Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { BrandProfile } from '@/types';
import { toast } from 'sonner';

interface IdentityViewProps {
    brand: BrandProfile;
}

export const IdentityView = React.memo<IdentityViewProps>(({ brand }) => {
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`, {
            description: `Value: ${text}`,
            className: "font-mono text-[10px] uppercase tracking-widest",
        });
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="w-full space-y-0 relative antialiased"
        >
            <ViewHeader
                icon={Fingerprint}
                title={brand.name}
                subtitle="Identity Registry"
                badge="Identity Protocol"
                rightContent={
                    <>
                        <div className="flex flex-col items-end">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Signal Security</p>
                            <div className="flex items-center gap-2 text-primary">
                                <Lock size={12} className="opacity-60" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Encrypted_v8.4</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Node Integrity</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Stable</p>
                            </div>
                        </div>
                    </>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Technical Specs */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Chromatic Spectrum */}
                        <section className="space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/10 border border-primary/20 rounded-none">
                                        <Palette size={18} className="text-primary" strokeWidth={1.5} />
                                    </div>
                                    <h2 className="text-[11px] font-mono font-black tracking-[0.3em] uppercase text-foreground/80">Chromatic Spec</h2>
                                </div>
                                <div className="flex items-center gap-4 text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                                    <span>Total Nodes: {brand.palette.length}</span>
                                    <div className="w-1 h-1 bg-primary/20 rounded-full" />
                                    <span>Encoding: sRGB</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {brand.palette.map((color) => {
                                    const rgb = hexToRgb(color.hex);
                                    const hsl = hexToHsl(color.hex);
                                    return (
                                        <Card key={color.id} className="p-0 bg-transparent border-none group relative overflow-hidden rounded-none shadow-none">
                                            <div className="flex bg-card/40 border border-border/40 group-hover:border-primary/40 transition-all duration-300">
                                                {/* Color Swatch Panel */}
                                                <div
                                                    className="w-32 h-32 cursor-pointer relative group/swatch"
                                                    style={{ backgroundColor: color.hex }}
                                                    onClick={() => copyToClipboard(color.hex, 'HEX')}
                                                >
                                                    <div className="absolute inset-0 bg-black/0 group-hover/swatch:bg-black/10 transition-colors flex items-center justify-center">
                                                        <Copy size={16} className="text-white opacity-0 group-hover/swatch:opacity-100 transition-opacity drop-shadow-md" />
                                                    </div>
                                                </div>

                                                {/* Technical Data Panel */}
                                                <div className="flex-1 p-5 flex flex-col justify-between font-mono">
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-0.5">
                                                            <p className="text-[9px] font-black text-primary uppercase tracking-widest leading-none mb-1 opacity-60">
                                                                {color.label}
                                                            </p>
                                                            <h3 className="text-xl font-medium tracking-tighter uppercase">
                                                                {color.hex}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-border/20">
                                                        <div className="space-y-0.5">
                                                            <p className="text-[7px] text-muted-foreground uppercase tracking-widest">RGB Sequence</p>
                                                            <p className="text-[10px] text-foreground font-bold">{rgb}</p>
                                                        </div>
                                                        <div className="space-y-0.5 text-right">
                                                            <p className="text-[7px] text-muted-foreground uppercase tracking-widest">HSL Offset</p>
                                                            <p className="text-[10px] text-foreground font-bold">{hsl}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Kinetic Typography Specimen */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 border border-primary/20 rounded-none">
                                    <Type size={18} className="text-primary" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-[11px] font-mono font-black tracking-[0.3em] uppercase text-foreground/80">Typographic Flow</h2>
                            </div>

                            <div className="space-y-6">
                                <Card className="p-10 bg-card/20 border-border/40 rounded-none relative overflow-hidden group">
                                    {/* Decor Background Lines */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i} className="h-[1px] w-full bg-primary mb-6" />
                                        ))}
                                    </div>

                                    <div className="relative z-10 space-y-12">
                                        {/* Specimen A: Primary Display */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-[8px] font-mono text-primary/40 uppercase tracking-[0.3em]">
                                                <span>Display Header // IBM Plex Sans</span>
                                                <div className="flex-1 h-[1px] bg-primary/10" />
                                                <span>64px // -0.05em</span>
                                            </div>
                                            <div className="relative">
                                                <h3 className="text-7xl font-display font-black tracking-tighter leading-none hover:text-primary transition-colors cursor-default">
                                                    DNA ORCHESTRATION
                                                </h3>
                                                <div className="absolute -left-4 top-0 h-full w-[2px] bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>

                                        {/* Specimen B: Character Set */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-[8px] font-mono text-primary/40 uppercase tracking-[0.3em]">
                                                <span>Character Set // A-Z 0-9</span>
                                                <div className="flex-1 h-[1px] bg-primary/10" />
                                            </div>
                                            <p className="text-2xl font-mono tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-default leading-tight">
                                                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                                                abcdefghijklmnopqrstuvwxyz<br />
                                                0123456789!@#$%^&*()
                                            </p>
                                        </div>

                                        {/* Specimen C: Contextual Text */}
                                        <div className="grid grid-cols-2 gap-12">
                                            <div className="space-y-2">
                                                <p className="text-[13px] leading-relaxed text-foreground/80 font-medium">
                                                    Synthesis of brand DNA requires absolute precision in every typographic interaction. Kinetic flow protocols are active and monitored for consistency.
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-end text-right">
                                                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                                                    Protocol ID: 0x294F<br />
                                                    Kern Offset: Optical<br />
                                                    Weight Map: 400-900
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: HUD & Marks */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Protocol Marks HUD */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 border border-primary/20 rounded-none">
                                    <ImageIcon size={18} className="text-primary" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-[11px] font-mono font-black tracking-[0.3em] uppercase text-foreground/80">Identity Marks</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <Card className="p-1.5 bg-card/20 border-border/40 rounded-none group relative overflow-hidden">
                                    <div className="aspect-square bg-muted/5 border border-border/20 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
                                        {/* HUD Scan Line */}
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 animate-scan pointer-events-none" />

                                        <Fingerprint size={160} className="text-primary opacity-5 group-hover:opacity-15 transition-all duration-1000 rotate-12 group-hover:rotate-0" strokeWidth={1} />

                                        <div className="absolute bottom-6 left-6 text-left">
                                            <p className="text-[7px] font-mono font-bold uppercase tracking-[0.4em] text-primary mb-1">Mark A // Primary</p>
                                            <p className="text-xs font-black uppercase tracking-widest">{brand.name}</p>
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/40 backdrop-blur-md">
                                            <div className="flex gap-3">
                                                <Button size="icon" variant="ghost" className="rounded-none border border-primary/40 bg-background/80 hover:bg-primary hover:text-white">
                                                    <Maximize2 size={16} />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="rounded-none border border-primary/40 bg-background/80 hover:bg-primary hover:text-white">
                                                    <Download size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-video bg-card/40 border border-border/40 p-4 flex flex-col justify-between hover:bg-primary/5 transition-colors cursor-pointer group/mark">
                                        <p className="text-[6px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Mark B // Secondary</p>
                                        <Fingerprint size={24} className="text-primary/20 group-hover/mark:text-primary/40 transition-colors" />
                                    </div>
                                    <div className="aspect-video bg-foreground border border-border/40 p-4 flex flex-col justify-between hover:opacity-90 transition-opacity cursor-pointer group/mark">
                                        <p className="text-[6px] font-mono font-black text-background/40 uppercase tracking-[0.2em]">Mark C // Inverted</p>
                                        <Fingerprint size={24} className="text-background/20 group-hover/mark:text-background/40 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Engine HUD Insights */}
                        <Card className="p-8 bg-primary/5 border border-primary/10 rounded-none relative overflow-hidden overflow-hidden">
                            {/* Static Pattern */}
                            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:16px_16px] pointer-events-none" />

                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">Intelligence HUD</h3>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed uppercase">
                                        <span className="text-primary font-bold">{"> "}</span>
                                        Identity profile synchronized. Generative compliance confirmed at <span className="text-foreground font-bold">98.4%</span>. Typographic tension balanced within stylistic parameters.
                                    </p>

                                    <div className="space-y-2 pt-4 border-t border-primary/10">
                                        <div className="flex justify-between items-center text-[8px] font-mono font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                                            <span>DNA Complexity // High</span>
                                            <span>Active</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-primary/10">
                                            <div className="h-full bg-primary/60 w-4/5 shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Reference Matrix */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground/30">Reference Archive</h4>
                                <div className="h-[1px] flex-1 mx-4 bg-border/20" />
                            </div>
                            <div className="space-y-1.5">
                                {['Brand System v1.pdf', 'Asset Matrix.sketch', 'Style Sheet.css'].map((file, i) => (
                                    <button key={i} className="w-full h-12 flex items-center justify-between px-5 bg-card/20 border border-border/30 hover:border-primary/40 hover:bg-primary/[0.03] transition-all group overflow-hidden relative">
                                        <div className="absolute left-0 top-0 h-full w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                                        <span className="text-[10px] font-mono font-bold text-foreground/60 group-hover:text-primary transition-colors tracking-widest uppercase">
                                            {file}
                                        </span>
                                        <ChevronRight size={14} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

// Helper for Technical specs
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
        '255, 255, 255';
}

function hexToHsl(hex: string) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}
