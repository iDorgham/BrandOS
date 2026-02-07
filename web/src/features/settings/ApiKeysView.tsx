import React, { useState } from 'react';
import { Card, Button, Input, EmptyState } from '@/components/ui';
import { Shield, Key, Copy, Trash2, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { generateId } from '@/utils';

interface ApiKey {
    id: string;
    name: string;
}

export const ApiKeysView = () => {
    const [keys, setKeys] = useState<ApiKey[]>([
        { id: 'key_live_8x923...', name: 'Production Bridge' },
        { id: 'key_test_2a411...', name: 'Staging Environment' }
    ]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [newKeyName, setNewKeyName] = useState('New API Key');

    const generateKey = () => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            const newKey = {
                id: `key_${Math.random() > 0.5 ? 'live' : 'test'}_${generateId().substring(0, 8)}...`,
                name: newKeyName
            };
            setKeys([...keys, newKey]);
            setIsGenerating(false);
            setNewKeyName('New API Key');
            toast.success('API Key generated successfully');
        }, 800);
    };

    const revokeKey = (id: string) => {
        if (confirm('Are you sure you want to revoke this key? This action cannot be undone.')) {
            setKeys(keys.filter(k => k.id !== id));
            toast.success('API Key revoked');
        }
    };

    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key);
        toast.success('Key copied to clipboard');
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col gap-0.5 mb-1">
                <h2 className="text-xl font-display font-black tracking-tighter">API Management</h2>
                <p className="text-muted-foreground text-[10px] font-medium opacity-60">Manage access tokens for external integrations and pipeline bridges.</p>
            </div>

            <Card className="p-6 bg-card border-border space-y-6 rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-md text-primary">
                            <Key size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Active Keys</h3>
                            <p className="text-[10px] text-muted-foreground">These keys have full access to your workspace.</p>
                        </div>
                    </div>
                    <Button onClick={generateKey} disabled={isGenerating} size="sm" className="gap-2 h-8 text-xs px-3">
                        {isGenerating ? 'Generating...' : <><Plus size={12} /> Generate Key</>}
                    </Button>
                </div>

                <div className="space-y-3">
                    {keys.map((key) => (
                        <div key={key.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border group hover:border-primary/20 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-background border border-border">
                                    <Shield size={14} className="text-emerald-500" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold text-foreground">{key.name}</p>
                                    <p className="text-[10px] font-mono text-muted-foreground">{key.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" onClick={() => copyKey(key.id)} className="h-7 w-7 p-0 hover:bg-background/80 hover:text-primary">
                                    <Copy size={12} />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => revokeKey(key.id)} className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive">
                                    <Trash2 size={12} />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {keys.length === 0 && (
                        <div className="py-8">
                            <EmptyState
                                icon={Key}
                                title="No Active API Keys"
                                description="Generate a secure access token to authenticate external services."
                                actionLabel="Generate Key"
                                onAction={generateKey}
                            />
                        </div>
                    )}
                </div>
            </Card>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-500">Security Notice</h4>
                    <p className="text-[10px] text-muted-foreground/80 leading-relaxed max-w-2xl">
                        API keys grant full access to your Brand OS workspace. Never share keys in public repositories or client-side code.
                        If you suspect a key has been compromised, revoke it immediately.
                    </p>
                </div>
            </div>
        </div>
    );
};
