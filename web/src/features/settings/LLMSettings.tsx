import React, { useState } from 'react';
import { Brain, Key, Thermometer, Hash, MessageSquare, Zap, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Switch, Button } from '@/components/ui';
import { toast } from 'sonner';

interface ModelProvider {
    id: string;
    name: string;
    models: string[];
    color: string;
    status: 'connected' | 'disconnected' | 'error';
    apiKeySet: boolean;
}

export const LLMSettings = () => {
    const [activeProvider, setActiveProvider] = useState('gemini');
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [apiKeys, setApiKeys] = useState<Record<string, string>>({
        gemini: '',
        openai: '',
        anthropic: '',
    });

    const [modelConfig, setModelConfig] = useState({
        primaryModel: 'gemini-2.0-flash',
        fallbackModel: 'gemini-1.5-pro',
        temperature: 0.7,
        maxTokens: 4096,
        topP: 0.95,
        streamResponses: true,
        safetyFiltering: true,
    });

    const providers: ModelProvider[] = [
        {
            id: 'gemini',
            name: 'Google Gemini',
            models: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
            color: 'bg-blue-500',
            status: 'connected',
            apiKeySet: true,
        },
        {
            id: 'openai',
            name: 'OpenAI',
            models: ['gpt-4o', 'gpt-4o-mini', 'dall-e-3'],
            color: 'bg-emerald-500',
            status: apiKeys.openai ? 'connected' : 'disconnected',
            apiKeySet: !!apiKeys.openai,
        },
        {
            id: 'anthropic',
            name: 'Anthropic',
            models: ['claude-opus-4-6', 'claude-sonnet-4-5-20250929'],
            color: 'bg-orange-500',
            status: apiKeys.anthropic ? 'connected' : 'disconnected',
            apiKeySet: !!apiKeys.anthropic,
        },
    ];

    const toggleKeyVisibility = (providerId: string) => {
        setShowKeys(prev => ({ ...prev, [providerId]: !prev[providerId] }));
    };

    const saveApiKey = (providerId: string) => {
        toast.success(`${providerId} API key saved`);
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">LLMs / AI Models</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">AI_Model_Configuration</p>
                </div>
            </div>

            {/* Provider Status Grid */}
            <div className="grid grid-cols-3 gap-3">
                {providers.map((provider) => (
                    <button
                        key={provider.id}
                        onClick={() => setActiveProvider(provider.id)}
                        className={`
                            border p-4 text-left transition-all relative overflow-hidden
                            ${activeProvider === provider.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border/40 bg-card/80 hover:border-border/60'
                            }
                        `}
                    >
                        <div className={`absolute top-0 left-0 w-full h-[2px] ${provider.color}`} />
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold text-foreground">{provider.name}</span>
                            <div className="flex items-center gap-1.5">
                                {provider.status === 'connected' ? (
                                    <CheckCircle2 size={10} className="text-emerald-500" />
                                ) : (
                                    <AlertCircle size={10} className="text-muted-foreground/40" />
                                )}
                                <span className={`text-[8px] font-mono font-bold uppercase tracking-wider ${
                                    provider.status === 'connected' ? 'text-emerald-500' : 'text-muted-foreground/40'
                                }`}>
                                    {provider.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Sparkles size={10} className="text-muted-foreground/40" />
                            <span className="text-[9px] font-mono text-muted-foreground/60">{provider.models.length} models</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* API Key Configuration */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Key size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">API Keys</span>
                </div>
                <div className="p-6 space-y-4">
                    {providers.map((provider) => (
                        <div key={provider.id} className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 ${provider.color}`} />
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                                    {provider.name} API Key
                                </label>
                                {provider.apiKeySet && (
                                    <span className="text-[8px] font-mono text-emerald-500/80 ml-auto">CONFIGURED</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 flex items-center h-9 bg-muted/20 border border-border/40 border-b-2">
                                    <input
                                        type={showKeys[provider.id] ? 'text' : 'password'}
                                        value={apiKeys[provider.id]}
                                        onChange={(e) => setApiKeys(prev => ({ ...prev, [provider.id]: e.target.value }))}
                                        className="flex-1 h-full bg-transparent text-[12px] font-mono px-3 outline-none"
                                        placeholder={provider.apiKeySet ? '••••••••••••••••' : `Enter ${provider.name} API key`}
                                    />
                                    <button
                                        onClick={() => toggleKeyVisibility(provider.id)}
                                        className="h-full px-2 text-muted-foreground/40 hover:text-primary transition-colors"
                                    >
                                        {showKeys[provider.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                                    </button>
                                </div>
                                <button
                                    onClick={() => saveApiKey(provider.id)}
                                    className="h-9 px-3 text-[10px] font-bold border border-border/40 bg-muted/10 hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="p-3 border border-dashed border-border/40 bg-muted/5 mt-4">
                        <div className="flex items-start gap-2">
                            <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-[9px] text-muted-foreground/60 leading-relaxed">
                                API keys are encrypted at rest and never exposed in client-side code. Keys are only used server-side for model inference requests.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Model Selection */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Brain size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Model Selection</span>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Primary Model</label>
                            <select
                                value={modelConfig.primaryModel}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, primaryModel: e.target.value }))}
                                className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] px-2 outline-none focus:border-primary border-b-2 transition-colors"
                            >
                                {providers.flatMap(p => p.models.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                )))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Fallback Model</label>
                            <select
                                value={modelConfig.fallbackModel}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, fallbackModel: e.target.value }))}
                                className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] px-2 outline-none focus:border-primary border-b-2 transition-colors"
                            >
                                <option value="">None</option>
                                {providers.flatMap(p => p.models.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                )))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inference Parameters */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Thermometer size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Inference Parameters</span>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Temperature</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={modelConfig.temperature}
                                    onChange={(e) => setModelConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                                    className="flex-1 accent-primary h-1"
                                />
                                <span className="text-[11px] font-mono font-bold text-foreground w-8 text-right">{modelConfig.temperature.toFixed(1)}</span>
                            </div>
                            <p className="text-[8px] font-mono text-muted-foreground/40">Creativity vs Precision</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Max Tokens</label>
                            <div className="flex items-center h-9 bg-muted/20 border border-border/40 border-b-2">
                                <input
                                    type="number"
                                    value={modelConfig.maxTokens}
                                    onChange={(e) => setModelConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                                    className="flex-1 h-full bg-transparent text-[12px] font-mono px-3 outline-none"
                                />
                                <Hash size={10} className="text-muted-foreground/40 mr-3" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Top P</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={modelConfig.topP}
                                    onChange={(e) => setModelConfig(prev => ({ ...prev, topP: parseFloat(e.target.value) }))}
                                    className="flex-1 accent-primary h-1"
                                />
                                <span className="text-[11px] font-mono font-bold text-foreground w-8 text-right">{modelConfig.topP.toFixed(2)}</span>
                            </div>
                            <p className="text-[8px] font-mono text-muted-foreground/40">Nucleus sampling</p>
                        </div>
                    </div>

                    <div className="h-px bg-border/20" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap size={12} className="text-muted-foreground/60" />
                                <div>
                                    <span className="text-[10px] font-bold text-foreground block">Stream Responses</span>
                                    <span className="text-[8px] text-muted-foreground/40">Show tokens as they are generated</span>
                                </div>
                            </div>
                            <Switch checked={modelConfig.streamResponses} onCheckedChange={(v) => setModelConfig(prev => ({ ...prev, streamResponses: v }))} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={12} className="text-muted-foreground/60" />
                                <div>
                                    <span className="text-[10px] font-bold text-foreground block">Safety Filtering</span>
                                    <span className="text-[8px] text-muted-foreground/40">Apply content safety filters to outputs</span>
                                </div>
                            </div>
                            <Switch checked={modelConfig.safetyFiltering} onCheckedChange={(v) => setModelConfig(prev => ({ ...prev, safetyFiltering: v }))} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">LLM::CONFIG_STATE</span>
                <Button size="sm" className="gap-2 px-6 h-8 text-[11px]">
                    Save Configuration
                </Button>
            </div>
        </div>
    );
};
