
import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookiesPolicyPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookies_accepted');
        if (!cookiesAccepted) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 30000); // 30 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookies_accepted', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="fixed top-0 left-0 right-0 z-[60] w-full flex justify-center p-4 pointer-events-none"
                >
                    <div className="w-full max-w-4xl bg-[var(--cds-layer-01)] backdrop-blur-md border border-[var(--cds-ui-03)] p-4 md:p-6 shadow-2xl relative pointer-events-auto flex flex-col md:flex-row items-center gap-6 rounded-sm">
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="w-10 h-10 bg-[var(--cds-interactive-01)] flex items-center justify-center rounded-sm">
                                <Cookie className="text-[var(--cds-text-on-color)]" size={20} />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-[var(--cds-text-primary)] tracking-tight mb-1">Cookie Policy</h3>
                            <p className="text-xs text-[var(--cds-text-secondary)] leading-relaxed font-sans">
                                We use cookies to enhance your experience, analyze site traffic, and personalize content. By using our site, you agree to our use of cookies.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                            <button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none px-8 bg-[var(--cds-interactive-01)] text-[var(--cds-text-on-color)] text-xs font-medium h-[40px] hover:opacity-90 transition-all focus:outline-none flex items-center justify-center"
                            >
                                Accept all
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="flex-1 md:flex-none px-8 bg-[var(--cds-layer-03)] text-[var(--cds-text-primary)] text-xs font-medium h-[40px] border border-[var(--cds-ui-03)] hover:bg-[var(--cds-layer-hover-03)] transition-all focus:outline-none flex items-center justify-center"
                            >
                                Decline
                            </button>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-2 right-2 text-[var(--cds-text-secondary)] hover:text-[var(--cds-text-primary)] p-1 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
