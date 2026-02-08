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
        if (!name) {
            toast.error('Please enter a brand name');
            return;
        }

        setLoading(true);
        try {
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
                // backend handles workspace assignment if not provided, or hook uses activeWorkspace
            };

            await addBrand(newBrand);
            localStorage.removeItem('brand_os_roi_data');

            // Allow time for toast
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            toast.error('Failed to initialize brand protocol');
        } finally {
            setLoading(false);
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
        <div className="min-h-screen bg-[var(--cds-ui-background)] flex items-center justify-center p-8">
            <div className="max-w-xl w-full">
                {/* Progress */}
                <div className="flex gap-2 mb-12 justify-center">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`h-1 w-16 rounded-full transition-colors ${step >= s ? 'bg-[var(--cds-interactive-01)]' : 'bg-[var(--cds-layer-02)]'}`} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" {...fadeInUp} className="space-y-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--cds-interactive-01)]/10 text-[var(--cds-interactive-01)] mb-4">
                                <Target size={40} />
                            </div>

                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Target Acquired.</h1>
                                <p className="text-[var(--cds-text-secondary)] text-lg">
                                    {roiData
                                        ? `We detected your goal to save $${Math.round(roiData.savings).toLocaleString()}/mo.`
                                        : "Welcome to Brand OS. Let's initialize your first workspace."}
                                    <br />First, what should we call this brand?
                                </p>
                            </div>

                            <div className="space-y-4 text-left">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--cds-text-secondary)] block mb-2">Brand Name</label>
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-[var(--cds-layer-01)] border-b-2 border-[var(--cds-layer-02)] focus:border-[var(--cds-interactive-01)] p-4 text-2xl font-bold outline-none transition-colors placeholder-[var(--cds-text-secondary)]/20"
                                        placeholder="Acme Corp"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <Button onClick={nextStep} disabled={!name} className="w-full h-14 text-lg font-bold uppercase tracking-widest">
                                Continue <ArrowRight className="ml-2" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" {...fadeInUp} className="space-y-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--cds-interactive-01)]/10 text-[var(--cds-interactive-01)] mb-4">
                                <Building2 size={40} />
                            </div>

                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Sector Analysis.</h1>
                                <p className="text-[var(--cds-text-secondary)] text-lg">
                                    Defining your industry helps us tune the AI's creative parameters.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-left">
                                {['Technology', 'Fashion', 'Finance', 'Healthcare', 'Agency', 'Other'].map(ind => (
                                    <button
                                        key={ind}
                                        onClick={() => { setIndustry(ind); }}
                                        className={`p-6 border ${industry === ind ? 'border-[var(--cds-interactive-01)] bg-[var(--cds-interactive-01)]/5' : 'border-[var(--cds-layer-02)] hover:border-[var(--cds-text-secondary)]'} transition-all text-left group`}
                                    >
                                        <div className={`font-bold uppercase tracking-wide mb-1 ${industry === ind ? 'text-[var(--cds-interactive-01)]' : ''}`}>{ind}</div>
                                        <div className="text-xs text-[var(--cds-text-secondary)]">Optimized presets</div>
                                    </button>
                                ))}
                            </div>

                            <Button onClick={nextStep} disabled={!industry} className="w-full h-14 text-lg font-bold uppercase tracking-widest">
                                Confirm Sector <ArrowRight className="ml-2" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" {...fadeInUp} className="space-y-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--cds-interactive-01)]/10 text-[var(--cds-interactive-01)] mb-4">
                                <Palette size={40} />
                            </div>

                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Visual Core.</h1>
                                <p className="text-[var(--cds-text-secondary)] text-lg">
                                    Select a primary color to anchor your visual identity.
                                </p>
                            </div>

                            <div className="flex justify-center gap-6">
                                <div className="space-y-2">
                                    <input
                                        type="color"
                                        value={primaryColor}
                                        onChange={e => setPrimaryColor(e.target.value)}
                                        className="w-32 h-32 rounded-full cursor-pointer border-4 border-[var(--cds-layer-02)] p-1 bg-[var(--cds-layer-01)]"
                                    />
                                    <div className="font-mono text-sm">{primaryColor}</div>
                                </div>
                            </div>

                            <Button onClick={handleComplete} disabled={loading} className="w-full h-14 text-lg font-bold uppercase tracking-widest">
                                {loading ? 'Initializing Protocol...' : 'Launch Brand OS'} <Wand2 className="ml-2" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
