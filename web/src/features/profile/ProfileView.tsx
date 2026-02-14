import React, { useState, useEffect } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Camera,
    LayoutGrid,
    Users,
    Plus,
    Settings,
    Shield,
    ChevronRight,
    Database,
    Bell,
    Trash2,
    Check,
    Briefcase,
    Key,
    Layers,
    Sparkles,
    Terminal,
    Fingerprint
} from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { userService, organizationService } from '@/services/persistence.service';
import { toast } from 'sonner';
import { Workspace } from '@/types';

export const ProfileView = React.memo(() => {
    const { user } = useAuth();
    const { workspaces, setActiveWorkspace, activeWorkspace, refreshData, userRole } = useData();
    const isAdmin = userRole === 'admin';
    const [isEditing, setIsEditing] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // In a real app we'd fetch the profile, for now we derive from user email or dummy
        setProfileName(user?.email?.split('@')[0].toUpperCase() || 'ART DIRECTOR');
    }, [user]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            await userService.updateProfile({ name: profileName });
            toast.success('Identity sequence updated');
            setIsEditing(false);
            refreshData();
        } catch (error) {
            toast.error('Identity update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="w-full space-y-0 relative antialiased"
        >
            <ViewHeader
                icon={User}
                title={profileName}
                subtitle="Agent Profile"
                badge="Identity Authorization"
                rightContent={
                    <div className="px-5 py-3 bg-primary/5 border border-primary/10 flex flex-col items-end">
                        <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Authorization Matrix</p>
                        <div className="flex items-center gap-2 text-primary">
                            <Shield size={12} className="opacity-60" />
                            <p className="text-xs font-mono font-black tracking-widest uppercase">
                                {userRole === 'admin' ? 'System Admin' : userRole === 'art_director' ? 'Art Director' : 'Designer'}
                            </p>
                        </div>
                    </div>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Account Details */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Left Column: Workspaces */}
                        <Card className="p-8 bg-card border-border space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <LayoutGrid size={16} className="text-primary" /> Workspace Management
                                </h2>
                                {isAdmin && (
                                    <Button size="sm" className="rounded-xl text-[9px] font-black px-4 bg-primary/10 text-primary border border-primary/20">
                                        <Plus size={14} className="mr-2" /> NEW WORKSPACE
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {workspaces.map((ws) => (
                                    <div
                                        key={ws.id}
                                        onClick={() => setActiveWorkspace(ws)}
                                        className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${activeWorkspace?.id === ws.id ? 'bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(15,98,254,0.05)]' : 'bg-muted/20 border-border hover:border-border/80'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeWorkspace?.id === ws.id ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted/40 text-muted-foreground'}`}>
                                                <Briefcase size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-tight">{ws.name}</p>
                                                <p className="text-[9px] text-muted-foreground uppercase font-bold opacity-40">Owner ID: {ws.ownerId.slice(0, 8)}...</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setActiveWorkspace(ws)}
                                                className="rounded-xl text-[9px] font-black tracking-widest h-9"
                                            >
                                                {activeWorkspace?.id === ws.id ? 'ACTIVE' : 'SWITCH'}
                                            </Button>
                                            {isAdmin && (
                                                <button className="p-2 transition-colors text-muted-foreground hover:text-red-500">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-8 bg-card border-border space-y-6">
                                <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Bell size={16} className="text-primary" /> Notifications
                                </h2>
                                <div className="space-y-5">
                                    {[
                                        { label: 'System Alerts', active: true },
                                        { label: 'Sync Completion', active: true },
                                        { label: 'Team Activity', active: false }
                                    ].map((pref, i) => (
                                        <div key={i} className="flex items-center justify-between pt-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{pref.label}</span>
                                            <div className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${pref.active ? 'bg-primary/20' : 'bg-muted/40'}`}>
                                                <div className={`w-3 h-3 rounded-full bg-primary shadow-sm transition-all ${pref.active ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-8 bg-card border-border space-y-6 text-center flex flex-col items-center justify-center">
                                <div className="p-4 rounded-full bg-primary/10 mb-2">
                                    <Key size={32} className="text-primary" />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Curator Protocol</h3>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase leading-relaxed max-w-[160px]">
                                    Your identity is secured with enterprise-grade DNA hashing.
                                </p>
                                <Button variant="secondary" className="mt-4 rounded-xl border-border text-[9px] font-black uppercase tracking-widest">
                                    View Security Logs
                                </Button>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Mini Stats/Activity */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="p-8 bg-primary/5 border border-primary/20 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-3">
                                Activity Pulse
                            </h3>
                            <div className="space-y-6 font-display">
                                {[
                                    { action: 'SYNTHESIZED DNA', target: 'AETHER LUX', time: '2H AGO' },
                                    { action: 'DEFERRED DEPLOY', target: 'SLACK BRIDGE', time: '5H AGO' },
                                    { action: 'COMMITTED AUDIT', target: 'GAP_ANALYSIS', time: '1D AGO' }
                                ].map((item, i) => (
                                    <div key={i} className="relative pl-6 border-l border-primary/20">
                                        <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-primary" />
                                        <p className="text-[10px] font-black uppercase tracking-tight">{item.action}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-[9px] text-muted-foreground font-bold uppercase">{item.target}</span>
                                            <span className="text-[8px] text-primary/40 font-black">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Activity Feed */}
                        <Card className="p-8 bg-card border-border space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Layers size={14} className="text-primary" /> RECENT ACTIVITY
                            </h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <Sparkles size={16} />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-black uppercase tracking-tight">SYNTHESIZED DNA</p>
                                                <p className="text-[9px] text-muted-foreground font-bold uppercase opacity-60">AETHER LUX</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={12} className="text-muted-foreground opacity-20" />
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-8 bg-card border-border space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Connected Services</h3>
                            <div className="space-y-3">
                                {['Adobe CC', 'Figma', 'Slack', 'Zapier'].map((service, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-tight">{service}</span>
                                        </div>
                                        <ChevronRight size={12} className="text-muted-foreground opacity-20" />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
