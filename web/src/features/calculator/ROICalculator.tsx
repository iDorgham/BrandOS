import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, TrendingDown, ArrowRight, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

interface CalculatorInputs {
    marketingBudget: number;
    revisionRounds: number;
    reviewHours: number;
    hourlyRate: number;
    consistencyScore: number;
}

interface ROICalculatorProps {
    onSignup: () => void;
    onBack: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onSignup, onBack }) => {
    const [inputs, setInputs] = useState<CalculatorInputs>({
        marketingBudget: 15000,
        revisionRounds: 4,
        reviewHours: 10,
        hourlyRate: 65,
        consistencyScore: 60
    });

    const [results, setResults] = useState({
        monthlyWasted: 0,
        yearlyWasted: 0,
        hoursLost: 0,
        efficiencyRate: 0,
        savings: 0,
        roiDays: 0
    });

    useEffect(() => {
        calculateROI();
    }, [inputs]);

    const calculateROI = () => {
        // 1. Revision Cost: (Rounds - 1) * 3 hours per round * Hourly Rate * 2 (Team size factor? Let's keep simple)
        // Assumption: 1 round is normal. Extra rounds are waste.
        const excessRounds = Math.max(0, inputs.revisionRounds - 1);
        const revisionCost = excessRounds * 4 * inputs.hourlyRate * 4; // 4 campaigns/mo avg

        // 2. Manual Review Cost: Hours * Rate * 4 weeks
        const reviewCost = inputs.reviewHours * inputs.hourlyRate * 4;

        // 3. Inconsistency Impact: Budget * (1 - Consistency/100) * 0.3 (Impact factor)
        // If consistency is 60%, 40% is drift. 30% of that drift causes revenue loss/inefficiency.
        const inconsistencyCost = inputs.marketingBudget * ((100 - inputs.consistencyScore) / 100) * 0.4;

        const monthlyWasted = revisionCost + reviewCost + inconsistencyCost;

        // Brand OS Cost = $49
        const netSavings = monthlyWasted - 49;

        // ROI Days = ($49 / Daily Savings)
        const dailySavings = netSavings / 30;
        const roiDays = 49 / dailySavings;

        setResults({
            monthlyWasted,
            yearlyWasted: monthlyWasted * 12,
            hoursLost: (inputs.reviewHours * 4) + (excessRounds * 4 * 4),
            efficiencyRate: inputs.consistencyScore, // Rough proxy
            savings: netSavings,
            roiDays: Math.max(0, roiDays)
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const handleSignup = () => {
        localStorage.setItem('brand_os_roi_data', JSON.stringify(results));
        onSignup();
    };

    return (
        <div className="min-h-screen bg-[var(--cds-ui-background)] text-[var(--cds-text-primary)] pt-32 pb-24 px-8">
            <div className="max-w-7xl mx-auto">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-8 hover:bg-[var(--cds-layer-02)] text-[var(--cds-text-secondary)] hover:text-[var(--cds-text-primary)] uppercase tracking-[0.3em] font-black text-[10px] gap-3"
                >
                    <ArrowLeft size={16} /> [ Back_to_Interface ]
                </Button>

                <motion.div {...fadeInUp} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-[var(--cds-interactive-01)] bg-[var(--cds-interactive-01)]/10 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <Calculator size={14} /> ROI Engine_V1.0
                    </div>
                    <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase leading-none mb-6">
                        Calculate Your <br /> <span className="text-[var(--cds-support-error)]">Brand Leakage.</span>
                    </h1>
                    <p className="text-xl text-[var(--cds-text-secondary)] font-light max-w-3xl mx-auto">
                        Inconsistent branding costs the average company <span className="text-foreground font-bold">$4,200/month</span>.
                        Find out exactly how much you're losing in 30 seconds.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* INPUTS */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-4 space-y-8 bg-[var(--cds-layer-01)] p-8 border border-[var(--cds-layer-02)] h-fit"
                    >
                        <h3 className="text-sm font-black uppercase tracking-widest text-[var(--cds-text-secondary)] border-b border-[var(--cds-layer-02)] pb-4 mb-8">
                            Input Parameters
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wide mb-2 flex justify-between">
                                    Monthly Marketing Budget
                                    <span className="text-[var(--cds-interactive-01)]">${inputs.marketingBudget.toLocaleString()}</span>
                                </label>
                                <input
                                    type="range"
                                    name="marketingBudget"
                                    min="1000" max="100000" step="1000"
                                    value={inputs.marketingBudget}
                                    onChange={handleInputChange}
                                    className="w-full accent-[var(--cds-interactive-01)] cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wide mb-2 flex justify-between">
                                    Design Revisions (Avg Rounds)
                                    <span className="text-[var(--cds-interactive-01)]">{inputs.revisionRounds}</span>
                                </label>
                                <input
                                    type="range"
                                    name="revisionRounds"
                                    min="1" max="10" step="1"
                                    value={inputs.revisionRounds}
                                    onChange={handleInputChange}
                                    className="w-full accent-[var(--cds-interactive-01)] cursor-pointer"
                                />
                                <p className="text-xs text-[var(--cds-text-secondary)] mt-2">Before final approval.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wide mb-2 flex justify-between">
                                    Review Hours / Week
                                    <span className="text-[var(--cds-interactive-01)]">{inputs.reviewHours}h</span>
                                </label>
                                <input
                                    type="range"
                                    name="reviewHours"
                                    min="1" max="40" step="1"
                                    value={inputs.reviewHours}
                                    onChange={handleInputChange}
                                    className="w-full accent-[var(--cds-interactive-01)] cursor-pointer"
                                />
                                <p className="text-xs text-[var(--cds-text-secondary)] mt-2">Time spent enforcing guidelines.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wide mb-2 flex justify-between">
                                    Avg Hourly Rate (Team)
                                    <span className="text-[var(--cds-interactive-01)]">${inputs.hourlyRate}</span>
                                </label>
                                <input
                                    type="range"
                                    name="hourlyRate"
                                    min="20" max="200" step="5"
                                    value={inputs.hourlyRate}
                                    onChange={handleInputChange}
                                    className="w-full accent-[var(--cds-interactive-01)] cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wide mb-2 flex justify-between">
                                    Current Consistency Score
                                    <span className={`text-[var(--cds-interactive-01)] ${inputs.consistencyScore < 70 ? 'text-[var(--cds-support-error)]' : ''}`}>
                                        {inputs.consistencyScore}%
                                    </span>
                                </label>
                                <input
                                    type="range"
                                    name="consistencyScore"
                                    min="0" max="100" step="5"
                                    value={inputs.consistencyScore}
                                    onChange={handleInputChange}
                                    className={`w-full cursor-pointer ${inputs.consistencyScore < 70 ? 'accent-[var(--cds-support-error)]' : 'accent-[var(--cds-interactive-01)]'}`}
                                />
                                <p className="text-xs text-[var(--cds-text-secondary)] mt-2">Honest estimate of brand alignment.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* RESULTS */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-[var(--cds-support-error)]/10 border border-[var(--cds-support-error)]/30 p-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <TrendingDown size={100} className="text-[var(--cds-support-error)]" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-[var(--cds-support-error)] mb-2">Your Monthly Loss</h3>
                                <div className="text-6xl font-black text-[var(--cds-support-error)] tracking-tighter mb-2">
                                    ${Math.round(results.monthlyWasted).toLocaleString()}
                                </div>
                                <p className="text-[var(--cds-text-primary)] font-bold mb-6">
                                    ${Math.round(results.yearlyWasted).toLocaleString()} / Year
                                </p>
                                <div className="flex items-center gap-2 text-sm text-[var(--cds-support-error)] font-medium">
                                    <Clock size={16} />
                                    <span>{Math.round(results.hoursLost)} hours wasted / month</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-[var(--cds-interactive-01)] text-white p-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Shield size={100} className="text-white" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white/80 mb-2">With Brand OS ($49/mo)</h3>
                                <div className="text-6xl font-black text-white tracking-tighter mb-2">
                                    ${Math.round(results.savings).toLocaleString()}
                                </div>
                                <p className="text-white font-bold mb-6">
                                    Net Monthly Savings
                                </p>
                                <div className="flex items-center gap-2 text-sm text-white/90 font-medium bg-white/20 w-fit px-3 py-1 rounded-full">
                                    <CheckCircle size={14} />
                                    <span>ROI in {results.roiDays.toFixed(1)} days</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Breakdown */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[var(--cds-layer-01)] border border-[var(--cds-layer-02)] p-8"
                        >
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Where You Are Losing Money</h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-[var(--cds-layer-02)]">
                                    <div>
                                        <div className="font-bold text-lg mb-1">Excessive Revisions</div>
                                        <div className="text-sm text-[var(--cds-text-secondary)]">Cost of {inputs.revisionRounds} rounds instead of 1</div>
                                    </div>
                                    <div className="text-2xl font-mono font-bold text-[var(--cds-support-error)]">
                                        -${Math.round((inputs.revisionRounds - 1) * 4 * inputs.hourlyRate * 4).toLocaleString()}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pb-4 border-b border-[var(--cds-layer-02)]">
                                    <div>
                                        <div className="font-bold text-lg mb-1">Manual Policing</div>
                                        <div className="text-sm text-[var(--cds-text-secondary)]">Cost of {inputs.reviewHours} hours/week enforcement</div>
                                    </div>
                                    <div className="text-2xl font-mono font-bold text-[var(--cds-support-error)]">
                                        -${Math.round(inputs.reviewHours * inputs.hourlyRate * 4).toLocaleString()}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pb-4 border-b border-[var(--cds-layer-02)]">
                                    <div>
                                        <div className="font-bold text-lg mb-1">Brand Dilution</div>
                                        <div className="text-sm text-[var(--cds-text-secondary)]">Impact of {100 - inputs.consistencyScore}% inconsistency</div>
                                    </div>
                                    <div className="text-2xl font-mono font-bold text-[var(--cds-support-error)]">
                                        -${Math.round(inputs.marketingBudget * ((100 - inputs.consistencyScore) / 100) * 0.4).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 bg-[#f4f4f4] dark:bg-[#161616] p-8 border border-[var(--cds-layer-03)] flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">Stop the bleeding.</h4>
                                    <p className="text-[var(--cds-text-secondary)]">Start your 14-day free trial and fix this today.</p>
                                </div>
                                <Button onClick={handleSignup} className="h-16 px-12 text-lg font-black uppercase tracking-widest bg-[var(--cds-interactive-01)] text-white hover:bg-[var(--cds-interactive-01)]/90">
                                    Start Recovery <ArrowRight className="ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
