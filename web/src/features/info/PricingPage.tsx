import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, HelpCircle, ArrowRight, Shield, Zap, Building2, Globe } from 'lucide-react';
import { Button } from '@/components/ui';

interface PricingPageProps {
    onBack: () => void;
    onLoginClick: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onBack, onLoginClick }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const tiers = [
        {
            name: "Free",
            price: "$0",
            period: "/forever",
            desc: "Prove the value before you pay.",
            features: [
                "1 Brand Identity",
                "20 Generated Assets/mo",
                "Basic Compliance Check",
                "Community Support"
            ],
            cta: "Start Free Now",
            variant: "outline",
            highlight: false
        },
        {
            name: "Pro",
            price: "$49",
            period: "/month",
            desc: "The Brand Consistency Guarantee.",
            features: [
                "Unlimited Brands",
                "Unlimited Generations",
                "92%+ Consistency Guarantee",
                "Priority Support",
                "Commercial License",
                "1hr Onboarding Call"
            ],
            cta: "Start 14-Day Trial",
            variant: "primary",
            highlight: true,
            badge: "Most Popular"
        },
        {
            name: "Agency",
            price: "$249",
            period: "/month",
            desc: "Scale your revenue & services.",
            features: [
                "10 Client Workspaces",
                "White-labeled Reports",
                "API Access",
                "Client Dashboard",
                "Custom Domain",
                "Dedicate Account Manager"
            ],
            cta: "Start Agency Trial",
            variant: "outline",
            highlight: false
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            desc: "Global governance at scale.",
            features: [
                "SSO & SAML",
                "SLA 99.99%",
                "Custom Integrations",
                "On-premise Deployment",
                "Audit Logs (Unlimited)",
                "24/7 Phone Support"
            ],
            cta: "Contact Sales",
            variant: "outline",
            highlight: false
        }
    ];

    const comparisonFeatures = [
        {
            category: "Core Features", items: [
                { name: "Artificial Intelligence Models", free: "Gemini Pro", pro: "Gemini Ultra + DALL-E 3", agency: "Custom LoRA", ent: "Custom Fine-tune" },
                { name: "Brand Guidelines Enforcement", free: "Basic", pro: "Advanced", agency: "Advanced", ent: "Enterprise Grade" },
                { name: "Asset Generation Limit", free: "20/mo", pro: "Unlimited", agency: "Unlimited", ent: "Unlimited" },
            ]
        },
        {
            category: "Governance", items: [
                { name: "Audit History", free: "7 Days", pro: "30 Days", agency: "1 Year", ent: "Unlimited" },
                { name: "Approval Workflows", free: false, pro: true, agency: true, ent: true },
                { name: "SSO / SAML", free: false, pro: false, agency: false, ent: true },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#000000] text-white pt-24 pb-24 px-8 relative overflow-hidden">
            <div className="cinematic-noise" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-12 hover:bg-white/5 text-[#525252] hover:text-white uppercase tracking-[0.3em] font-black text-[10px] gap-3"
                >
                    <ArrowLeft size={16} /> [ Back_to_Interface ]
                </Button>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-4 bg-[#161616] border border-[#393939] px-6 py-2 mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#0f62fe] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c6c6c6]">Investment_Protocol // ROI_Positive</span>
                    </div>
                    <h1 className="text-[clamp(3.5rem,7vw,9rem)] font-black tracking-tighter uppercase leading-[0.9] mb-8">
                        Simple, Transparant <br /> Pricing.
                    </h1>
                    <p className="text-xl text-[#c6c6c6] font-light max-w-2xl mx-auto mb-12">
                        Stop losing money on inconsistent branding. Start scaling today.
                    </p>

                    {/* Billing Toggle (Visual only for now) */}
                    <div className="inline-flex items-center bg-[#1a1a1a] rounded-full p-1 border border-[#333]">
                        <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-[#333] text-white' : 'text-[#666]'}`}>
                            Monthly
                        </button>
                        <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${billingCycle === 'yearly' ? 'bg-[#333] text-white' : 'text-[#666]'}`}>
                            Yearly (-20%)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
                    {tiers.map((tier, i) => (
                        <div key={i} className={`p-8 border flex flex-col relative group hover:scale-[1.02] transition-transform duration-300 ${tier.highlight ? 'bg-[#161616] border-[#0f62fe] shadow-[0_0_50px_rgba(15,98,254,0.1)]' : 'bg-[#0c0c0c] border-[#333]'}`}>
                            {tier.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0f62fe] text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
                                    {tier.badge}
                                </div>
                            )}
                            <div className="mb-4">
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{tier.name}</h3>
                                <p className="text-[#666] text-xs h-8">{tier.desc}</p>
                            </div>
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-black tracking-tighter">{tier.price}</span>
                                <span className="text-[#666] text-sm font-mono">{tier.period}</span>
                            </div>

                            <Button
                                onClick={onLoginClick}
                                variant={tier.variant === 'primary' ? 'primary' : 'secondary'}
                                className={`w-full mb-8 h-12 uppercase tracking-widest font-bold text-xs ${tier.variant === 'primary' ? 'bg-[#0f62fe] hover:bg-[#0f62fe]/90' : 'bg-[#333] hover:bg-[#444] text-white'}`}
                            >
                                {tier.cta}
                            </Button>

                            <div className="space-y-4 flex-1">
                                {tier.features.map((feat, j) => (
                                    <div key={j} className="flex items-start gap-3 text-sm text-[#c6c6c6]">
                                        <Check size={14} className={`mt-1 shrink-0 ${tier.highlight ? 'text-[#0f62fe]' : 'text-[#666]'}`} />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FEATURE COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto mb-32">
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center">Detailed Comparison</h3>
                    <div className="border border-[#333] bg-[#0c0c0c]">
                        {comparisonFeatures.map((category, i) => (
                            <React.Fragment key={i}>
                                <div className="px-6 py-4 bg-[#161616] border-b border-[#333] text-[10px] font-black uppercase tracking-[0.2em] text-[#666]">
                                    {category.category}
                                </div>
                                {category.items.map((item, j) => (
                                    <div key={j} className="grid grid-cols-12 border-b border-[#333] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                                        <div className="col-span-4 p-4 text-sm font-bold text-[#c6c6c6] flex items-center gap-2">
                                            {item.name} <HelpCircle size={10} className="text-[#333]" />
                                        </div>
                                        <div className="col-span-2 p-4 text-xs text-[#666] flex items-center justify-center border-l border-[#393939] text-center">
                                            {typeof item.free === 'boolean' ? (item.free ? <Check size={14} className="text-[#24a148]" /> : <X size={14} className="text-[#333]" />) : item.free}
                                        </div>
                                        <div className="col-span-2 p-4 text-xs text-white font-bold flex items-center justify-center border-l border-[#393939] bg-[#0f62fe]/5 border-r border-r-[#0f62fe]/30 text-center">
                                            {typeof item.pro === 'boolean' ? (item.pro ? <Check size={14} className="text-[#0f62fe]" /> : <X size={14} className="text-[#333]" />) : item.pro}
                                        </div>
                                        <div className="col-span-2 p-4 text-xs text-[#c6c6c6] flex items-center justify-center border-l border-[#393939] text-center">
                                            {typeof item.agency === 'boolean' ? (item.agency ? <Check size={14} className="text-[#24a148]" /> : <X size={14} className="text-[#333]" />) : item.agency}
                                        </div>
                                        <div className="col-span-2 p-4 text-xs text-[#c6c6c6] flex items-center justify-center border-l border-[#393939] text-center">
                                            {typeof item.ent === 'boolean' ? (item.ent ? <Check size={14} className="text-[#24a148]" /> : <X size={14} className="text-[#333]" />) : item.ent}
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center text-center">
                    <p className="text-[#666] uppercase tracking-widest text-xs mb-8">
                        Risk Free. 30-Day Money Back Guarantee. Cancel Anytime.
                    </p>
                    <Button onClick={onLoginClick} className="bg-white text-black hover:bg-white/90 h-16 px-12 rounded-none text-lg font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                        Get Started Today
                    </Button>
                </div>
            </div>
        </div>
    );
};
