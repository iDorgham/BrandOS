import React, { useState } from 'react';
import { Card, Input, Button, Switch } from '@/components/ui';
import { Shield, Key, Smartphone, Lock, AlertTriangle, Monitor, Globe, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const SecuritySettings = () => {
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

    // Password state
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handlePasswordChange = () => {
        if (passwords.new !== passwords.confirm) {
            toast.error('New passwords do not match');
            return;
        }
        if (passwords.new.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }
        toast.success('Password update requested');
        setPasswords({ current: '', new: '', confirm: '' });
    };

    const toggle2FA = () => {
        if (!isTwoFactorEnabled) {
            setShowTwoFactorSetup(true);
        } else {
            setIsTwoFactorEnabled(false);
            toast.info('Two-factor authentication disabled');
        }
    };

    const confirm2FA = () => {
        setIsTwoFactorEnabled(true);
        setShowTwoFactorSetup(false);
        toast.success('Two-factor authentication enabled successfully');
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col gap-0.5 mb-1">
                <h2 className="text-xl font-display font-black tracking-tighter">Security & Access</h2>
                <p className="text-muted-foreground text-[10px] font-medium opacity-60">Manage critical security settings and active sessions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Password Change */}
                <div className="md:col-span-7">
                    <Card className="p-6 bg-card border-border h-full rounded-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                                <Key size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Change Password</h3>
                                <p className="text-[10px] text-muted-foreground">Update your account password</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Password</label>
                                    <Input
                                        type="password"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        className="bg-muted/10 border-border h-9 text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">New Password</label>
                                    <Input
                                        type="password"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        className="bg-muted/10 border-border h-9 text-sm"
                                        placeholder="Min 8 chars"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Confirm</label>
                                    <Input
                                        type="password"
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        className="bg-muted/10 border-border h-9 text-sm"
                                        placeholder="Retype password"
                                    />
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <Button onClick={handlePasswordChange} variant="secondary" size="sm" className="px-6">
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 2FA Section */}
                <div className="md:col-span-5">
                    <Card className="p-6 bg-card border-border h-full relative overflow-hidden flex flex-col rounded-xl">
                        {isTwoFactorEnabled && (
                            <div className="absolute top-0 right-0 p-6 opacity-5 text-emerald-500 pointer-events-none">
                                <Shield size={100} />
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500">
                                <Smartphone size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Two-Factor Auth</h3>
                                <p className="text-[10px] text-muted-foreground">Add an extra layer of security</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center relative z-10">
                            {!showTwoFactorSetup ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${isTwoFactorEnabled ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted-foreground'}`} />
                                            <span className="text-xs font-bold text-foreground">
                                                {isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </div>
                                        <Switch checked={isTwoFactorEnabled} onCheckedChange={toggle2FA} />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                                        Protect your account by requiring an additional code when signing in from a new device.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                    <div className="p-3 bg-white rounded-lg flex items-center justify-center mx-auto w-fit">
                                        <div className="w-24 h-24 bg-stone-900 pattern-grid-lg opacity-80" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="secondary" size="sm" className="flex-1 h-8 text-[10px]" onClick={() => setShowTwoFactorSetup(false)}>Cancel</Button>
                                        <Button size="sm" className="flex-1 h-8 text-[10px]" onClick={confirm2FA}>Verify</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Active Sessions */}
                <div className="md:col-span-12">
                    <Card className="p-6 bg-card border-border space-y-4 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                                <Monitor size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Active Sessions</h3>
                                <p className="text-[10px] text-muted-foreground">Devices currently logged in</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { device: 'Chrome on Windows', location: 'New York, US', active: true, ip: '192.168.1.1', time: 'Now' },
                                { device: 'Safari on iPhone', location: 'New York, US', active: false, ip: '10.0.0.42', time: '2h ago' }
                            ].map((session, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/5 hover:bg-muted/10 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-background rounded-md border border-border">
                                            <Monitor size={14} className="text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-foreground">{session.device}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                <span>{session.location}</span>
                                                <span className="opacity-30">•</span>
                                                <span className="font-mono opacity-50">{session.ip}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        {session.active ? (
                                            <div className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                                Current
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-muted-foreground font-medium">{session.time}</span>
                                        )}
                                        {!session.active && (
                                            <button className="text-[9px] text-destructive hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Revoke</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
