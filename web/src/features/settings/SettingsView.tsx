import React from 'react';
import { Key, ShieldCheck, Lock } from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface SettingsViewProps {
    onAuth: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onAuth }) => {
    return (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
            <div className="space-y-2">
                <h1 className="text-3xl font-display font-bold">System Settings</h1>
                <p className="text-muted-foreground text-sm">Manage core configuration and system vitals.</p>
            </div>
            <div className="space-y-4">
                <Card className="p-6 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Key size={16} className="text-primary" /> API & Engine Control
                    </h3>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent/30 border border-border">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={20} className="text-primary" />
                            <div className="text-xs font-bold uppercase">Primary Engine Key</div>
                        </div>
                        <Button variant="outline" size="sm" onClick={onAuth}>ROTATE KEY</Button>
                    </div>
                </Card>

                <Card className="p-6 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Lock size={16} className="text-primary" /> Privacy & Security
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold">Brand Isolation Mode</p>
                                <p className="text-[10px] text-muted-foreground">Assets are encrypted per tenant protocol</p>
                            </div>
                            <div className="w-10 h-5 bg-primary rounded-full relative p-0.5"><div className="w-4 h-4 bg-primary-foreground rounded-full ml-auto" /></div>
                        </div>
                    </div>
                </Card>

                <Button variant="destructive" className="w-full rounded-xl">PURGE ALL CACHED DNA DATA</Button>
            </div>
        </div>
    );
};
