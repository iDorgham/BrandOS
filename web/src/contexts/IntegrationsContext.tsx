import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface TelegramCredentials {
    botToken: string;
    chatId: string;
    enabled: boolean;
}

export interface GoogleDriveCredentials {
    accessToken: string;
    folderId: string;
    enabled: boolean;
}

export interface SMTPCredentials {
    host: string;
    port: number;
    username: string;
    password: string;
    fromAddress: string;
    enabled: boolean;
}

export interface SendGridCredentials {
    apiKey: string;
    fromAddress: string;
    enabled: boolean;
}

export interface IntegrationCredentials {
    telegram: TelegramCredentials;
    googleDrive: GoogleDriveCredentials;
    smtp: SMTPCredentials;
    sendgrid: SendGridCredentials;
}

type IntegrationKey = keyof IntegrationCredentials;

interface ConnectionTestResult {
    success: boolean;
    message: string;
}

interface IntegrationsContextValue {
    credentials: IntegrationCredentials;
    updateCredential: <K extends IntegrationKey>(key: K, value: Partial<IntegrationCredentials[K]>) => void;
    testConnection: (key: IntegrationKey) => Promise<ConnectionTestResult>;
    isConnected: (key: IntegrationKey) => boolean;
}

const STORAGE_KEY = 'brandos_integrations_v1';

const DEFAULT_CREDENTIALS: IntegrationCredentials = {
    telegram: { botToken: '', chatId: '', enabled: false },
    googleDrive: { accessToken: '', folderId: '', enabled: false },
    smtp: { host: '', port: 587, username: '', password: '', fromAddress: '', enabled: false },
    sendgrid: { apiKey: '', fromAddress: '', enabled: false },
};

function loadCredentials(): IntegrationCredentials {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return { ...DEFAULT_CREDENTIALS, ...JSON.parse(stored) };
        }
    } catch { /* ignore */ }
    return DEFAULT_CREDENTIALS;
}

const IntegrationsContext = createContext<IntegrationsContextValue | null>(null);

export const IntegrationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [credentials, setCredentials] = useState<IntegrationCredentials>(loadCredentials);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
        } catch { /* ignore */ }
    }, [credentials]);

    const updateCredential = useCallback(<K extends IntegrationKey>(key: K, value: Partial<IntegrationCredentials[K]>) => {
        setCredentials(prev => ({
            ...prev,
            [key]: { ...prev[key], ...value },
        }));
    }, []);

    const testConnection = useCallback(async (key: IntegrationKey): Promise<ConnectionTestResult> => {
        const cred = credentials[key];

        try {
            switch (key) {
                case 'telegram': {
                    const tg = cred as TelegramCredentials;
                    if (!tg.botToken) return { success: false, message: 'Bot token required' };
                    const res = await fetch(`https://api.telegram.org/bot${tg.botToken}/getMe`);
                    const data = await res.json();
                    if (data.ok) return { success: true, message: `Connected as @${data.result.username}` };
                    return { success: false, message: data.description || 'Invalid token' };
                }
                case 'googleDrive': {
                    const gd = cred as GoogleDriveCredentials;
                    if (!gd.accessToken) return { success: false, message: 'Access token required' };
                    return { success: true, message: 'Token saved (validation on use)' };
                }
                case 'smtp': {
                    const s = cred as SMTPCredentials;
                    if (!s.host || !s.username) return { success: false, message: 'Host and username required' };
                    return { success: true, message: `SMTP configured: ${s.host}:${s.port}` };
                }
                case 'sendgrid': {
                    const sg = cred as SendGridCredentials;
                    if (!sg.apiKey) return { success: false, message: 'API key required' };
                    return { success: true, message: 'SendGrid API key saved' };
                }
                default:
                    return { success: false, message: 'Unknown integration' };
            }
        } catch (err: any) {
            return { success: false, message: err?.message || 'Connection failed' };
        }
    }, [credentials]);

    const isConnected = useCallback((key: IntegrationKey): boolean => {
        const cred = credentials[key];
        if (!cred.enabled) return false;
        switch (key) {
            case 'telegram': return !!(cred as TelegramCredentials).botToken;
            case 'googleDrive': return !!(cred as GoogleDriveCredentials).accessToken;
            case 'smtp': return !!(cred as SMTPCredentials).host;
            case 'sendgrid': return !!(cred as SendGridCredentials).apiKey;
            default: return false;
        }
    }, [credentials]);

    return (
        <IntegrationsContext.Provider value={{ credentials, updateCredential, testConnection, isConnected }}>
            {children}
        </IntegrationsContext.Provider>
    );
};

export function useIntegrations() {
    const ctx = useContext(IntegrationsContext);
    if (!ctx) throw new Error('useIntegrations must be used within IntegrationsProvider');
    return ctx;
}
