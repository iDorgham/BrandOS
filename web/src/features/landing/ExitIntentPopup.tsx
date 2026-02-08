import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui';

interface ExitIntentPopupProps {
    onStay: () => void;
    onLeave: () => void;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onStay, onLeave }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasTriggered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="modal-backdrop"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--cds-overlay)] backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        key="modal-content"
                        className="bg-[var(--cds-ui-background)] border border-[var(--cds-layer-02)] max-w-lg w-full relative overflow-hidden shadow-2xl"
                    >
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-[var(--cds-text-placeholder)] hover:text-[var(--cds-text-primary)] transition-colors z-50"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-12 text-center relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--cds-interactive-01)]/10 text-[var(--cds-interactive-01)] mb-6">
                                <Zap size={32} fill="currentColor" />
                            </div>

                            <h2 className="text-3xl font-black uppercase tracking-tighter text-[var(--cds-text-primary)] mb-4 leading-tight">
                                Maximize Your <br /> Brand Velocity.
                            </h2>

                            <p className="text-[var(--cds-text-secondary)] mb-8 text-lg font-light leading-relaxed">
                                Don't let your visual identity drift. Lock in 92%+ consistency with your personalized brand audit report.
                            </p>

                            <div className="space-y-4">
                                <Button
                                    onClick={onStay}
                                    className="w-full h-14 bg-[var(--cds-interactive-01)] hover:bg-[var(--cds-interactive-01)]/90 text-[var(--cds-text-on-color)] font-black uppercase tracking-widest text-xs rounded-none transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Unlock My Audit Report <ArrowRight className="ml-2" size={16} />
                                </Button>

                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-[10px] text-[var(--cds-text-placeholder)] hover:text-[var(--cds-text-primary)] uppercase tracking-[0.2em] font-bold transition-colors"
                                >
                                    Continue to site
                                </button>
                            </div>
                        </div>

                        {/* Background decorations */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--cds-support-warning)] to-[var(--cds-interactive-01)]" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--cds-interactive-01)]/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--cds-support-warning)]/5 rounded-full blur-3xl pointer-events-none" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
