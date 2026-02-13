import React, { useState } from 'react';
import { Key, Shield, Copy, Trash2, Plus, Webhook, Bell, AlertTriangle, Link2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateId } from '@/utils';
import { Button, Switch } from '@/components/ui';

interface ApiKey {
    id: string;
    name: string;
    created: string;
    lastUsed: string;
}

interface WebhookEndpoint {
    id: string;
    url: string;
    events: string[];
    active: boolean;
    lastTriggered: string;
}

export const ApiWebhookSettings = () => {
    const [keys, setKeys] = useState<ApiKey[]>([
        { id: 'key_live_8x923...', name: 'Production Bridge', created: 'Jan 15, 2026', lastUsed: '2h ago' },
        { id: 'key_test_2a411...', name: 'Staging Environment', created: 'Feb 1, 2026', lastUsed: '5d ago' },
    ]);

    const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
        { id: '1', url: 'https://api.example.com/hooks/brandos', events: ['asset.created', 'brand.updated'], active: true, lastTriggered: '1h ago' },
    ]);

    const [newKeyName, setNewKeyName] = useState('');
    const [newWebhookUrl, setNewWebhookUrl] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const generateKey = () => {
        if (!newKeyName.trim()) {
            toast.error('Enter a key name');
            return;
        }
        setIsGenerating(true);
        setTimeout(() => {
            const newKey: ApiKey = {
                id: `key_${Math.random() > 0.5 ? 'live' : 'test'}_${generateId().substring(0, 8)}...`,
                name: newKeyName,
                created: 'Just now',
                lastUsed: 'Never',
            };
            setKeys(prev => [...prev, newKey]);
            setIsGenerating(false);
            setNewKeyName('');
            toast.success('API key generated');
        }, 800);
    };

    const revokeKey = (id: string) => {
        setKeys(prev => prev.filter(k => k.id !== id));
        toast.success('API key revoked');
    };

    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key);
        toast.success('Key copied');
    };

    const addWebhook = () => {
        if (!newWebhookUrl.trim()) {
            toast.error('Enter a webhook URL');
            return;
        }
        const webhook: WebhookEndpoint = {
            id: generateId(),
            url: newWebhookUrl,
            events: ['asset.created'],
            active: true,
            lastTriggered: 'Never',
        };
        setWebhooks(prev => [...prev, webhook]);
        setNewWebhookUrl('');
        toast.success('Webhook endpoint added');
    };

    const toggleWebhook = (id: string) => {
        setWebhooks(prev => prev.map(w => w.id === id ? { ...w, active: !w.active } : w));
    };

    const removeWebhook = (id: string) => {
        setWebhooks(prev => prev.filter(w => w.id !== id));
        toast.success('Webhook removed');
    };

    const availableEvents = [
        'asset.created', 'asset.deleted', 'brand.updated', 'brand.created',
        'generation.complete', 'deployment.triggered', 'team.member_added',
    ];

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">API & Webhooks</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Integration_Configuration</p>
                </div>
            </div>

            {/* API Keys */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Key size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">API Keys</span>
                    <span className="ml-auto text-[8px] font-mono text-muted-foreground/40">{keys.length} active</span>
                </div>
                <div className="p-6 space-y-4">
                    {/* Generate New Key */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center h-9 bg-muted/20 border border-border/40 border-b-2">
                            <input
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                className="flex-1 h-full bg-transparent text-[12px] px-3 outline-none"
                                placeholder="Key name (e.g. Production)"
                            />
                        </div>
                        <button
                            onClick={generateKey}
                            disabled={isGenerating}
                            className="h-9 px-4 text-[10px] font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <div className="w-3 h-3 border border-primary-foreground border-t-transparent animate-spin" />
                            ) : (
                                <Plus size={12} />
                            )}
                            Generate
                        </button>
                    </div>

                    {/* Key List */}
                    <div className="space-y-2">
                        {keys.map((key) => (
                            <div key={key.id} className="flex items-center justify-between p-3 border border-border/40 bg-muted/5 group hover:border-border/60 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center bg-background border border-border/40">
                                        <Shield size={12} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-foreground">{key.name}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-mono text-muted-foreground/60">{key.id}</span>
                                            <span className="text-[7px] text-muted-foreground/30">|</span>
                                            <span className="text-[9px] text-muted-foreground/40">Created {key.created}</span>
                                            <span className="text-[7px] text-muted-foreground/30">|</span>
                                            <span className="text-[9px] text-muted-foreground/40">Last used {key.lastUsed}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => copyKey(key.id)} className="w-7 h-7 flex items-center justify-center hover:bg-muted/20 hover:text-primary transition-colors text-muted-foreground">
                                        <Copy size={12} />
                                    </button>
                                    <button onClick={() => revokeKey(key.id)} className="w-7 h-7 flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Webhooks */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Webhook size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Webhook Endpoints</span>
                    <span className="ml-auto text-[8px] font-mono text-muted-foreground/40">{webhooks.filter(w => w.active).length} active</span>
                </div>
                <div className="p-6 space-y-4">
                    {/* Add Webhook */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center h-9 bg-muted/20 border border-border/40 border-b-2">
                            <Link2 size={12} className="text-muted-foreground/40 ml-3 mr-2" />
                            <input
                                value={newWebhookUrl}
                                onChange={(e) => setNewWebhookUrl(e.target.value)}
                                className="flex-1 h-full bg-transparent text-[12px] font-mono pr-3 outline-none"
                                placeholder="https://your-api.com/webhook"
                            />
                        </div>
                        <button
                            onClick={addWebhook}
                            className="h-9 px-4 text-[10px] font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                            <Plus size={12} />
                            Add
                        </button>
                    </div>

                    {/* Webhook List */}
                    <div className="space-y-2">
                        {webhooks.map((webhook) => (
                            <div key={webhook.id} className="border border-border/40 bg-muted/5">
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className={`w-2 h-2 ${webhook.active ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-mono text-foreground truncate">{webhook.url}</p>
                                            <span className="text-[9px] text-muted-foreground/40">Last triggered: {webhook.lastTriggered}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-3">
                                        <Switch checked={webhook.active} onCheckedChange={() => toggleWebhook(webhook.id)} />
                                        <button onClick={() => removeWebhook(webhook.id)} className="w-7 h-7 flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                                <div className="px-3 pb-3 flex flex-wrap gap-1">
                                    {webhook.events.map((event) => (
                                        <span key={event} className="text-[8px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 border border-primary/20">
                                            {event}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Available Events */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Bell size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Available Events</span>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-2">
                        {availableEvents.map((event) => (
                            <div key={event} className="flex items-center gap-2 px-3 py-2 border border-border/40 bg-muted/5">
                                <CheckCircle2 size={10} className="text-primary/60" />
                                <span className="text-[10px] font-mono text-foreground/80">{event}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Security Notice */}
            <div className="border border-amber-500/20 bg-amber-500/[0.02] p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Security Notice</h4>
                        <p className="text-[9px] text-muted-foreground/60 leading-relaxed">
                            API keys grant full access to your Brand OS workspace. Never share keys in public repositories or client-side code.
                            Webhook endpoints should use HTTPS and validate the signature header.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
