import React, { useState } from 'react';
import { Shield, Key, Smartphone, Lock, Monitor, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Switch } from '@/components/ui';

export const SecuritySettings = () => {
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
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
        toast.success('Password updated successfully');
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
        toast.success('Two-factor authentication enabled');
    };

    const sessions = [
        { device: 'Chrome on Windows', location: 'New York, US', active: true, ip: '192.168.1.1', time: 'Now' },
        { device: 'Safari on iPhone', location: 'New York, US', active: false, ip: '10.0.0.42', time: '2h ago' },
        { device: 'Firefox on macOS', location: 'San Francisco, US', active: false, ip: '172.16.0.5', time: '3d ago' },
    ];

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">Security</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Security_&_Access</p>
                </div>
            </div>

            {/* Password */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Key size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Change Password</span>
                </div>
                <div className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Current Password</label>
                        <input
                            type="password"
                            value={passwords.current}
                            onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                            className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] px-3 outline-none focus:border-primary border-b-2 transition-colors"
                            placeholder="Enter current password"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">New Password</label>
                            <input
                                type="password"
                                value={passwords.new}
                                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                                className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] px-3 outline-none focus:border-primary border-b-2 transition-colors"
                                placeholder="Min 8 characters"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Confirm Password</label>
                            <input
                                type="password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                                className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] px-3 outline-none focus:border-primary border-b-2 transition-colors"
                                placeholder="Retype new password"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handlePasswordChange} variant="secondary" size="sm" className="h-8 px-4 text-[10px]">
                            Update Password
                        </Button>
                    </div>
                </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Smartphone size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Two-Factor Authentication</span>
                </div>
                <div className="p-6">
                    {!showTwoFactorSetup ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 border border-border/40 bg-muted/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 ${isTwoFactorEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
                                    <div>
                                        <span className="text-[11px] font-bold text-foreground block">
                                            {isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                        <span className="text-[9px] text-muted-foreground/60">
                                            {isTwoFactorEnabled ? 'Your account is protected with 2FA' : 'Add an extra layer of security'}
                                        </span>
                                    </div>
                                </div>
                                <Switch checked={isTwoFactorEnabled} onCheckedChange={toggle2FA} />
                            </div>
                            <p className="text-[9px] text-muted-foreground/60 leading-relaxed">
                                Protect your account by requiring a verification code from your authenticator app when signing in from a new device.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Lock size={12} className="text-primary" />
                                <span className="text-[10px] font-bold text-foreground">Scan QR Code</span>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-32 h-32 border border-border/40 bg-white flex items-center justify-center">
                                    <div className="w-24 h-24 bg-zinc-900 opacity-80" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
                                        Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.), then enter the verification code below.
                                    </p>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Verification Code</label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            className="w-full h-9 bg-muted/20 border border-border/40 text-[14px] font-mono tracking-[0.5em] px-3 outline-none focus:border-primary border-b-2 transition-colors text-center"
                                            placeholder="000000"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() => setShowTwoFactorSetup(false)}
                                    className="h-8 px-4 text-[10px] font-bold border border-border/40 bg-muted/10 hover:bg-muted/20 text-muted-foreground transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirm2FA}
                                    className="h-8 px-4 text-[10px] font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Sessions */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Monitor size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Active Sessions</span>
                    <span className="ml-auto text-[8px] font-mono text-muted-foreground/40">{sessions.length} devices</span>
                </div>
                <div className="divide-y divide-border/10">
                    {sessions.map((session, i) => (
                        <div key={i} className="flex items-center justify-between px-6 py-3 group hover:bg-muted/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center bg-muted/10 border border-border/40">
                                    <Monitor size={14} className="text-muted-foreground/60" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-foreground">{session.device}</p>
                                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground/60">
                                        <span>{session.location}</span>
                                        <span className="text-muted-foreground/20">|</span>
                                        <span className="font-mono">{session.ip}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {session.active ? (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                                        <span className="text-[8px] font-mono font-bold text-emerald-500 uppercase">Current</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-[9px] text-muted-foreground/40 flex items-center gap-1">
                                            <Clock size={8} />
                                            {session.time}
                                        </span>
                                        <button className="text-[9px] text-destructive font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                                            Revoke
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security Score */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Shield size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Security Score</span>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-[36px] font-bold font-mono text-foreground">
                            {isTwoFactorEnabled ? '92' : '64'}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="h-2 bg-muted/20 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${isTwoFactorEnabled ? 'bg-emerald-500 w-[92%]' : 'bg-amber-500 w-[64%]'}`}
                                />
                            </div>
                            <span className={`text-[9px] font-mono font-bold uppercase ${isTwoFactorEnabled ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {isTwoFactorEnabled ? 'Strong' : 'Moderate'}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[
                            { label: 'Email verified', done: true },
                            { label: 'Strong password set', done: true },
                            { label: 'Two-factor authentication', done: isTwoFactorEnabled },
                            { label: 'Recovery codes generated', done: false },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div className={`w-2 h-2 ${item.done ? 'bg-emerald-500' : 'bg-muted-foreground/20'}`} />
                                <span className={`text-[10px] ${item.done ? 'text-foreground/80' : 'text-muted-foreground/40'}`}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">SECURITY::CONFIG_STATE</span>
            </div>
        </div>
    );
};
