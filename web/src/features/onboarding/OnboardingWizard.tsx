import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Palette, Target, Building2, Wand2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui';
import { useSupabaseBrands } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { BrandProfile, EmotionalIntent } from '@/types';
import { toast } from 'sonner';

export const OnboardingWizard: React.FC = () => {
    const { user } = useAuth();
    const { addBrand } = useSupabaseBrands();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const [primaryColor, setPrimaryColor] = useState('#0F62FE');
    const [roiData, setRoiData] = useState<any>(null);

    useEffect(() => {
        const savedRoi = localStorage.getItem('brand_os_roi_data');
        if (savedRoi) {
            try {
                setRoiData(JSON.parse(savedRoi));
            } catch (e) {
                console.error('Failed to parse ROI data', e);
            }
        }
    }, []);

    const handleComplete = async () => {
        console.log('DEBUG: handleComplete triggered', { name, industry, primaryColor });
        if (!name) {
            console.error('DEBUG: Name is missing');
            toast.error('Please enter a brand name');
            return;
        }

        setLoading(true);
        try {
            console.log('DEBUG: Initializing brand protocol data...');
            const newBrand: Omit<BrandProfile, 'id'> = {
                name,
                doctrine: `Visual doctrine for ${name} (${industry}). \n\nCore Identity: ${industry} company focusing on ${roiData ? 'efficiency and brand consistency' : 'modern aesthetics'}.\n${roiData ? `[ROI_GOAL: $${Math.round(roiData.savings).toLocaleString()}/mo]` : ''}`,
                palette: [
                    { id: '1', label: 'Primary', hex: primaryColor }
                ],
                background: '#ffffff',
                negativeSpace: 20,
                safeZones: [],
                emotionalTags: [EmotionalIntent.SOPHISTICATED],
                forbiddenElements: [],
            };

            console.log('DEBUG: Calling addBrand...', newBrand);
            await addBrand(newBrand);
            console.log('DEBUG: addBrand successful');

            localStorage.removeItem('brand_os_roi_data');

            toast.success('Protocol Initialized. Launching...');

            // Allow time for toast
            setTimeout(() => {
                console.log('DEBUG: Reloading window');
                window.location.reload();
            }, 1000);

        } catch (error: any) {
            console.error('DEBUG: Failed to initialize brand protocol:', error);
            toast.error(`Failed to initialize brand protocol: ${error?.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
            console.log('DEBUG: handleComplete finally block reached');
        }
    };

    const nextStep = () => setStep(p => p + 1);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 }
    };

    return (
        <div className="min-h-screen bg-[var(--cds-ui-background)] flex items-center justify-center p-12 relative overflow-hidden">
            {/* Background elements - more subtle */}
            <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />

            <div className="max-w-md w-full relative z-10">
                {/* Progress bars - cleaner spacing */}
                <div className="flex gap-4 mb-20 justify-center">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="relative">
                            <div className={`h-1 w-16 rounded-full transition-all duration-500 ${step >= s ? 'bg-[var(--cds-interactive-01)] shadow-[0_0_10px_rgba(15,98,254,0.3)]' : 'bg-[var(--cds-layer-02)]'}`} />
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" {...fadeInUp} className="space-y-12 text-center">
                            <div className="flex flex-col items-center gap-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--cds-interactive-01)]/5 text-[var(--cds-interactive-01)] relative">
                                    <Target size={36} strokeWidth={1.2} />
                                </div>

                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold tracking-tight leading-tight">New Brand.</h1>
                                    <p className="text-[var(--cds-text-secondary)] text-lg font-normal leading-relaxed text-center">
                                        Let's set up your first workspace.
                                        <br /><span className="text-[var(--cds-text-primary)]">What is your brand's name?</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 text-left">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--cds-text-secondary)] block opacity-70">Brand Name</label>
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-transparent border-b border-[var(--cds-layer-02)] focus:border-[var(--cds-interactive-01)] pb-3 pt-2 text-2xl font-bold outline-none transition-all placeholder-[var(--cds-text-secondary)]/20"
                                        placeholder="e.g. Acme Corp"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <Button onClick={nextStep} disabled={!name} className="w-full h-14 text-base font-bold tracking-wide transition-all rounded-md group">
                                Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" {...fadeInUp} className="space-y-12 text-center">
                            <div className="flex flex-col items-center gap-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--cds-interactive-01)]/5 text-[var(--cds-interactive-01)] relative">
                                    <Building2 size={36} strokeWidth={1.2} />
                                </div>

                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold tracking-tight leading-tight">Industry.</h1>
                                    <p className="text-[var(--cds-text-secondary)] text-lg font-normal leading-relaxed">
                                        Pick your industry to help the AI understand your style.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-left">
                                {['Technology', 'Fashion', 'Finance', 'Healthcare', 'Agency', 'Other'].map(ind => (
                                    <button
                                        key={ind}
                                        onClick={() => { setIndustry(ind); }}
                                        className={`p-5 border relative overflow-hidden transition-all rounded-md ${industry === ind ? 'border-[var(--cds-interactive-01)] bg-[var(--cds-interactive-01)]/5' : 'border-[var(--cds-layer-02)] hover:border-[var(--cds-text-secondary)]/30'}`}
                                    >
                                        <div className={`font-bold transition-colors ${industry === ind ? 'text-[var(--cds-interactive-01)]' : 'text-[var(--cds-text-primary)]'}`}>{ind}</div>
                                        {industry === ind && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-1 h-1 bg-[var(--cds-interactive-01)] rounded-full" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <Button onClick={nextStep} disabled={!industry} className="w-full h-14 text-base font-bold tracking-wide transition-all rounded-md group">
                                Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </Button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" {...fadeInUp} className="space-y-12 text-center">
                            <div className="flex flex-col items-center gap-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--cds-interactive-01)]/5 text-[var(--cds-interactive-01)] relative">
                                    <Palette size={36} strokeWidth={1.2} />
                                </div>

                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold tracking-tight leading-tight">Brand Color.</h1>
                                    <p className="text-[var(--cds-text-secondary)] text-lg font-normal leading-relaxed">
                                        Pick a main color for your brand identity.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-8">
                                <div className="relative group">
                                    {/* Cleaner circular color element */}
                                    <div
                                        className="w-32 h-32 rounded-full border-4 border-[var(--cds-layer-02)] transition-all duration-300 relative cursor-pointer hover:border-[var(--cds-interactive-01)]/30"
                                        style={{ backgroundColor: primaryColor }}
                                        onClick={() => document.getElementById('onboarding-color-picker')?.click()}
                                    >
                                        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]" />
                                    </div>

                                    <input
                                        id="onboarding-color-picker"
                                        type="color"
                                        value={primaryColor}
                                        onChange={e => setPrimaryColor(e.target.value)}
                                        className="absolute opacity-0 w-0 h-0 pointer-events-none"
                                    />

                                    <div className="mt-6 font-mono text-sm font-bold tracking-widest uppercase py-1.5 px-3 bg-[var(--cds-layer-01)] rounded border border-[var(--cds-layer-02)]">
                                        {primaryColor}
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleComplete} disabled={loading} className="w-full h-14 text-base font-bold tracking-wide transition-all rounded-md group bg-[var(--cds-interactive-01)]">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Wand2 className="animate-spin" size={18} /> Setting up...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Launch <Wand2 size={18} />
                                    </span>
                                )}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
