
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed bottom-0 right-0 z-50 w-full md:w-[28rem] m-0 md:m-6"
                >
                    <div className="bg-[#161616] border border-[#393939] p-6 shadow-xl relative">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold text-[#f4f4f4] tracking-tight">Cookie Policy</h3>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-[#f4f4f4] hover:bg-[#393939] p-1 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-[#c6c6c6] mb-8 leading-relaxed font-sans">
                            We use cookies to enhance your experience, analyze site traffic, and personalize content. By using our site, you agree to our use of cookies.
                        </p>

                        <div className="flex items-center gap-0 w-full">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-[#0f62fe] text-white text-sm font-medium h-[48px] hover:bg-[#0043ce] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f4f4f4] focus:ring-offset-2 focus:ring-offset-[#161616]"
                            >
                                Accept all
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="flex-1 bg-[#393939] text-white text-sm font-medium h-[48px] hover:bg-[#4c4c4c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f4f4f4] focus:ring-offset-2 focus:ring-offset-[#161616] border-l border-[#161616]"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
