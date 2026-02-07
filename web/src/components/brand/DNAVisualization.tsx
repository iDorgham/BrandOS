import React from 'react';
import { BrandProfile } from '@/types';
import { Sparkles, Zap, Target, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

interface DNAVisualizationProps {
    brand: BrandProfile;
    intensities: { energy: number; warmth: number; sophistication: number };
    className?: string;
}

export const DNAVisualization: React.FC<DNAVisualizationProps> = ({ brand, intensities, className = '' }) => {
    const traits = [
        { label: 'Energy', value: intensities.energy, icon: Zap, color: '#f59e0b', delay: 0 },
        { label: 'Warmth', value: intensities.warmth, icon: Sparkles, color: '#f97316', delay: 0.1 },
        { label: 'Sophistication', value: intensities.sophistication, icon: Target, color: '#10b981', delay: 0.2 },
        { label: 'Spatial Tension', value: brand.negativeSpace, icon: Fingerprint, color: '#3b82f6', delay: 0.3 },
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                    <Fingerprint size={14} className="text-primary" />
                    <h3 className="text-[10px] font-medium text-muted-foreground/80">Spectrum Analysis</h3>
                </div>
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[9px] font-mono text-primary font-bold uppercase"
                >
                    ACTIVE
                </motion.span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {traits.map((trait) => (
                    <div key={trait.label} className="group/trait">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-medium uppercase tracking-tight text-muted-foreground/80 group-hover/trait:text-foreground transition-colors">
                                {trait.label}
                            </span>
                            <span className="text-[10px] font-mono font-bold" style={{ color: trait.color }}>
                                {trait.value}%
                            </span>
                        </div>
                        <div className="relative h-1.5 w-full bg-muted/40 rounded-sm overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${trait.value}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: trait.delay }}
                                className="absolute top-0 left-0 h-full rounded-sm"
                                style={{
                                    backgroundColor: trait.color,
                                    boxShadow: `0 0 8px ${trait.color}30`
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
