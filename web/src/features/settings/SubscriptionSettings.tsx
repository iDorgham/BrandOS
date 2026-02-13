import React from 'react';
import { CreditCard, Zap, HardDrive, Users, TrendingUp, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui';

export const SubscriptionSettings = () => {
    const plan = {
        name: 'Professional',
        price: '$49',
        cycle: 'month',
        nextBilling: 'Mar 15, 2026',
        status: 'active',
    };

    const usage = [
        { label: 'API Calls', used: 12480, limit: 50000, unit: 'calls', icon: Zap },
        { label: 'Storage', used: 2.4, limit: 10, unit: 'GB', icon: HardDrive },
        { label: 'Team Members', used: 4, limit: 10, unit: 'seats', icon: Users },
        { label: 'AI Generations', used: 847, limit: 5000, unit: 'gens', icon: TrendingUp },
    ];

    const features = [
        'Unlimited brands & workspaces',
        'AI-powered generation (5,000/mo)',
        '10 GB asset storage',
        'Team collaboration (10 seats)',
        'Custom brand DNA engine',
        'Priority support',
        'Webhook integrations',
        'Export & deployment pipeline',
    ];

    const invoices = [
        { date: 'Feb 1, 2026', amount: '$49.00', status: 'Paid' },
        { date: 'Jan 1, 2026', amount: '$49.00', status: 'Paid' },
        { date: 'Dec 1, 2025', amount: '$49.00', status: 'Paid' },
    ];

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">Subscription</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Billing_&_Plan</p>
                </div>
            </div>

            {/* Current Plan */}
            <div className="border border-primary/30 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[8px] font-mono font-bold text-primary uppercase tracking-[0.2em]">CURRENT PLAN</span>
                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-mono font-bold text-emerald-500 uppercase">Active</span>
                                </div>
                            </div>
                            <h3 className="text-[24px] font-bold text-foreground tracking-tight">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-[28px] font-bold font-mono text-primary">{plan.price}</span>
                                <span className="text-[10px] font-mono text-muted-foreground/60">/{plan.cycle}</span>
                            </div>
                        </div>
                        <div className="text-right space-y-2">
                            <div className="flex items-center gap-1.5 text-muted-foreground/60">
                                <Clock size={10} />
                                <span className="text-[9px] font-mono">Next billing: {plan.nextBilling}</span>
                            </div>
                            <Button size="sm" className="gap-2 h-8 text-[10px] px-4">
                                <ArrowUpRight size={12} />
                                Upgrade Plan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Metrics */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <TrendingUp size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Usage This Period</span>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                        {usage.map((item) => {
                            const percentage = (item.used / item.limit) * 100;
                            const Icon = item.icon;
                            const isHigh = percentage > 80;
                            return (
                                <div key={item.label} className="p-4 border border-border/40 bg-muted/5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Icon size={12} className="text-muted-foreground/60" />
                                            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">{item.label}</span>
                                        </div>
                                        <span className={`text-[8px] font-mono font-bold uppercase ${isHigh ? 'text-amber-500' : 'text-muted-foreground/40'}`}>
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[18px] font-bold font-mono text-foreground">{typeof item.used === 'number' && item.used > 999 ? `${(item.used / 1000).toFixed(1)}k` : item.used}</span>
                                        <span className="text-[10px] font-mono text-muted-foreground/40">/ {typeof item.limit === 'number' && item.limit > 999 ? `${(item.limit / 1000).toFixed(0)}k` : item.limit} {item.unit}</span>
                                    </div>
                                    <div className="h-1 w-full bg-muted/20 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ${isHigh ? 'bg-amber-500' : 'bg-primary/60'}`}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Plan Features */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <CheckCircle2 size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Plan Features</span>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-2">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 py-1.5">
                                <div className="w-1.5 h-1.5 bg-primary" />
                                <span className="text-[11px] text-foreground/80">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Billing History */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <CreditCard size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Billing History</span>
                </div>
                <div className="divide-y divide-border/10">
                    {invoices.map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-muted/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-emerald-500" />
                                <span className="text-[11px] text-foreground/80">{invoice.date}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[11px] font-mono font-bold text-foreground">{invoice.amount}</span>
                                <span className="text-[8px] font-mono text-emerald-500/80 uppercase tracking-wider">{invoice.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">BILLING::PLAN_STATE</span>
                <button className="text-[9px] font-mono text-muted-foreground/40 hover:text-primary transition-colors underline underline-offset-2">
                    Manage Payment Methods
                </button>
            </div>
        </div>
    );
};
