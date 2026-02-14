import React, { useState } from 'react';
import { MessageSquare, HardDrive, Mail, Send, Check, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { useIntegrations, IntegrationCredentials } from '@/contexts/IntegrationsContext';

type IntegrationKey = keyof IntegrationCredentials;

interface IntegrationCardProps {
    id: IntegrationKey;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    fields: { key: string; label: string; type?: 'text' | 'password' | 'number'; placeholder?: string }[];
}

const CARDS: IntegrationCardProps[] = [
    {
        id: 'telegram',
        title: 'Telegram Bot',
        description: 'Send messages and media via Telegram Bot API',
        icon: MessageSquare,
        color: 'text-sky-500',
        fields: [
            { key: 'botToken', label: 'Bot Token', type: 'password', placeholder: '123456:ABC-DEF...' },
            { key: 'chatId', label: 'Chat ID', placeholder: '-1001234567890' },
        ],
    },
    {
        id: 'googleDrive',
        title: 'Google Drive',
        description: 'Upload assets to Google Drive folders',
        icon: HardDrive,
        color: 'text-emerald-500',
        fields: [
            { key: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'ya29.a0...' },
            { key: 'folderId', label: 'Folder ID', placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms' },
        ],
    },
    {
        id: 'smtp',
        title: 'SMTP Email',
        description: 'Send emails via SMTP server',
        icon: Mail,
        color: 'text-amber-500',
        fields: [
            { key: 'host', label: 'SMTP Host', placeholder: 'smtp.gmail.com' },
            { key: 'port', label: 'Port', type: 'number', placeholder: '587' },
            { key: 'username', label: 'Username', placeholder: 'user@example.com' },
            { key: 'password', label: 'Password', type: 'password', placeholder: 'app-password' },
            { key: 'fromAddress', label: 'From Address', placeholder: 'noreply@brand.com' },
        ],
    },
    {
        id: 'sendgrid',
        title: 'SendGrid',
        description: 'Send transactional emails via SendGrid API',
        icon: Send,
        color: 'text-blue-500',
        fields: [
            { key: 'apiKey', label: 'API Key', type: 'password', placeholder: 'SG.xxxxxxxxx...' },
            { key: 'fromAddress', label: 'From Address', placeholder: 'noreply@brand.com' },
        ],
    },
];

const IntegrationCard: React.FC<{ card: IntegrationCardProps }> = ({ card }) => {
    const { credentials, updateCredential, testConnection, isConnected } = useIntegrations();
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
    const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());

    const cred = credentials[card.id] as any;
    const connected = isConnected(card.id);
    const Icon = card.icon;

    const handleTest = async () => {
        setTesting(true);
        setTestResult(null);
        const result = await testConnection(card.id);
        setTestResult(result);
        setTesting(false);
    };

    const toggleVisibility = (key: string) => {
        setVisibleFields(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    return (
        <div className="border border-border/40 bg-card/60 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
                <div className="flex items-center gap-3">
                    <Icon size={18} className={card.color} />
                    <div>
                        <h3 className="text-[12px] font-bold uppercase tracking-wider text-foreground">{card.title}</h3>
                        <p className="text-[9px] font-mono text-muted-foreground/60 mt-0.5">{card.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 text-[8px] font-mono font-bold uppercase tracking-widest ${connected ? 'text-emerald-500' : 'text-muted-foreground/40'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-500' : 'bg-muted-foreground/20'}`} />
                        {connected ? 'Connected' : 'Disconnected'}
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={cred.enabled}
                            onChange={(e) => updateCredential(card.id, { enabled: e.target.checked } as any)}
                            className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-muted/30 border border-border/40 peer-checked:bg-primary peer-checked:border-primary transition-colors relative">
                            <div className={`absolute top-0.5 w-3 h-3 bg-background border border-border/40 transition-transform ${cred.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </div>
                    </label>
                </div>
            </div>

            {/* Fields */}
            <div className="px-5 py-4 space-y-3">
                {card.fields.map(field => {
                    const isSecret = field.type === 'password';
                    const isVisible = visibleFields.has(field.key);

                    return (
                        <div key={field.key}>
                            <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">
                                {field.label}
                            </label>
                            <div className="relative">
                                <input
                                    type={isSecret && !isVisible ? 'password' : field.type === 'number' ? 'number' : 'text'}
                                    value={cred[field.key] ?? ''}
                                    onChange={(e) => {
                                        const val = field.type === 'number' ? Number(e.target.value) : e.target.value;
                                        updateCredential(card.id, { [field.key]: val } as any);
                                    }}
                                    placeholder={field.placeholder}
                                    className="w-full h-8 px-3 text-[11px] font-mono bg-muted/10 border border-border/40 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                                />
                                {isSecret && (
                                    <button
                                        onClick={() => toggleVisibility(field.key)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                                    >
                                        {isVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border/20 bg-muted/5">
                {testResult && (
                    <div className={`flex items-center gap-1.5 text-[9px] font-mono ${testResult.success ? 'text-emerald-500' : 'text-red-500'}`}>
                        {testResult.success ? <Check size={10} /> : <X size={10} />}
                        {testResult.message}
                    </div>
                )}
                {!testResult && <div />}
                <button
                    onClick={handleTest}
                    disabled={testing}
                    className="flex items-center gap-2 px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 disabled:opacity-40 transition-colors"
                >
                    {testing ? <Loader2 size={10} className="animate-spin" /> : null}
                    Test Connection
                </button>
            </div>
        </div>
    );
};

export const IntegrationsSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[14px] font-bold uppercase tracking-wider text-foreground">Integrations</h2>
                <p className="text-[10px] font-mono text-muted-foreground/60 mt-1">
                    Configure external service credentials for moodboard nodes
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {CARDS.map(card => (
                    <IntegrationCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};
