import React, { useEffect, useState } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import { Card, Button, EmptyState } from '@/components/ui';
import { Users, UserPlus, Mail, Shield, ShieldAlert, ShieldCheck, MoreVertical, Trash2 } from 'lucide-react';
import { organizationService } from '@/services/persistence.service';
import { WorkspaceMember, UserRole } from '@/types';
import { toast } from 'sonner';

export const TeamView = React.memo(() => {
    const { user } = useAuth();
    const { activeWorkspace, userRole } = useData();
    const isAdmin = userRole === 'admin';
    const [members, setMembers] = useState<(WorkspaceMember & { profile: any })[]>([]);
    const [loading, setLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<UserRole>('designer');

    useEffect(() => {
        if (activeWorkspace) {
            loadMembers();
        }
    }, [activeWorkspace]);

    const loadMembers = async () => {
        if (!activeWorkspace) return;
        try {
            setLoading(true);
            const data = await organizationService.getMembers(activeWorkspace.id);
            setMembers(data);
        } catch (error) {
            console.error('Failed to load members:', error);
            toast.error('Failed to load team members');
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeWorkspace || !inviteEmail) return;

        try {
            await organizationService.addMember(activeWorkspace.id, inviteEmail, inviteRole);
            setInviteEmail('');
            toast.success(`Invite sent to ${inviteEmail}`);
            // In a real app, we would reload members if the invite was successful in creating a record
        } catch (error) {
            console.error('Failed to invite member:', error);
            toast.error('Failed to send invite');
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return <ShieldAlert size={14} className="text-destructive" />;
            case 'art_director': return <ShieldCheck size={14} className="text-primary" />;
            default: return <Shield size={14} className="text-muted-foreground" />;
        }
    };

    const getRoleLabel = (role: string) => {
        return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    if (!activeWorkspace) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10 animate-in fade-in duration-1000">
                <div className="relative">
                    <div className="w-24 h-24 rounded-none border border-primary/20 flex items-center justify-center bg-primary/5">
                        <Users size={48} className="text-primary/40 animate-pulse" strokeWidth={1} />
                    </div>
                    <div className="absolute -inset-4 border border-dashed border-primary/10 rounded-none animate-spin-slow" style={{ animationDuration: '20s' }} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-display font-black tracking-widest uppercase">Isolation Subroutine</h3>
                    <p className="text-[10px] font-mono text-muted-foreground/40 max-w-xs mx-auto uppercase tracking-[0.3em] leading-relaxed">
                        SWITCH TO A MULTI-TENANT WORKSPACE TO INITIALIZE TEAM SYNCHRONIZATION AND PERMISSION MATRICES.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="space-y-0 w-full relative antialiased"
        >
            <ViewHeader
                icon={Users}
                title={activeWorkspace.name}
                subtitle="Personnel"
                badge="Directory Registry"
                rightContent={
                    <>
                        <div className="text-right hidden md:block">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Authorization Layer</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Encryption Active</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Seat Capacity</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase">{members.length} / 12 NODES</p>
                        </div>
                    </>
                }
            />

            <div className="w-full px-8 py-12 space-y-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Invite Section */}
                        {isAdmin && (
                            <Card className="p-8 bg-card border-border/60 rounded-none shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-[0.02] text-primary group-hover:opacity-[0.05] transition-opacity">
                                    <UserPlus size={64} strokeWidth={0.5} />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                    <div>
                                        <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.3em] mb-1">Initialize Invitation</h3>
                                        <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest leading-relaxed">Expand the neural cluster by inviting certified personnel.</p>
                                    </div>
                                    <form onSubmit={handleInvite} className="flex flex-wrap items-center gap-4 bg-muted/5 p-2 border border-border/20 shadow-inner">
                                        <div className="relative group/input">
                                            <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within/input:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                placeholder="IDENTITY_PROTOCOL@CORE.COM"
                                                value={inviteEmail}
                                                onChange={(e) => setInviteEmail(e.target.value)}
                                                className="bg-card border border-border/20 text-[10px] font-mono pl-12 pr-4 py-3 w-64 focus:border-primary focus:ring-0 placeholder:text-muted-foreground/20 rounded-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="h-6 w-[1px] bg-border/20 hidden md:block" />
                                        <select
                                            value={inviteRole}
                                            onChange={(e) => setInviteRole(e.target.value as UserRole)}
                                            className="bg-card border border-border/20 text-[10px] font-mono px-4 py-3 focus:border-primary focus:ring-0 cursor-pointer rounded-none uppercase tracking-widest"
                                        >
                                            <option value="designer">Designer</option>
                                            <option value="art_director">Art Director</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <Button type="submit" className="gap-3 h-11 rounded-none text-[10px] font-mono font-black px-8 bg-primary uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                                            <UserPlus size={14} /> Transmit
                                        </Button>
                                    </form>
                                </div>
                            </Card>
                        )}

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 px-2 mb-6 opacity-40">
                                <Shield size={14} />
                                <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em]">Authorized Registry</h3>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border/20 rounded-none bg-muted/[0.02]">
                                    <div className="w-10 h-10 rounded-none border-2 border-primary/20 border-t-primary animate-spin mb-4" />
                                    <p className="text-[10px] font-mono font-black text-muted-foreground/40 uppercase tracking-widest">Scanning Biosignatures...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {members.map((member) => (
                                        <Card key={member.id} className="p-6 flex items-center justify-between group hover:border-primary/40 transition-all rounded-none bg-card/60 border-border/40 backdrop-blur-sm shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="flex items-center gap-6 relative z-10">
                                                <div className="w-14 h-14 rounded-none brand-gradient flex items-center justify-center text-[12px] font-black text-primary-foreground shadow-2xl relative">
                                                    <div className="absolute inset-0 border border-white/20" />
                                                    {member.profile?.full_name?.substring(0, 2).toUpperCase() || member.userId.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="font-display font-black text-sm uppercase tracking-tight text-foreground">{member.profile?.full_name || 'IDENT_UNKNOWN'}</span>
                                                        {member.userId === user?.id && (
                                                            <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded-none uppercase font-black tracking-[0.2em] border border-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)]">SELF</span>
                                                        )}
                                                    </div>
                                                    <div className="text-[9px] text-muted-foreground/30 font-mono uppercase tracking-[0.2em]">{member.profile?.user_id || member.userId}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-10 relative z-10">
                                                <div className="flex items-center gap-4 px-5 py-2.5 rounded-none bg-muted/[0.03] border border-border/20 group-hover:border-primary/20 transition-all backdrop-blur-sm">
                                                    {getRoleIcon(member.role)}
                                                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/60">{getRoleLabel(member.role)}</span>
                                                </div>

                                                {isAdmin && (
                                                    <button className="text-muted-foreground/20 hover:text-primary transition-all p-3 border border-transparent hover:border-primary/20 bg-transparent hover:bg-primary/5">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {!loading && members.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-32 border border-dashed border-border/20 rounded-none bg-card/40 opacity-40">
                                    <Users size={40} className="mb-6 opacity-20" strokeWidth={1} />
                                    <h3 className="text-sm font-mono font-black uppercase tracking-[0.3em]">Registry Empty</h3>
                                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-2">No synchronized personnel found in this sector.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Permission Matrix Card */}
                        <Card className="p-10 bg-card/40 border-border/60 rounded-none shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-[0.02] text-primary group-hover:opacity-[0.05] transition-opacity">
                                <ShieldCheck size={96} strokeWidth={0.5} />
                            </div>

                            <div className="flex items-center gap-5 mb-10 pb-6 border-b border-border/10 border-dashed relative z-10">
                                <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center border border-primary/20 text-primary shadow-2xl">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-mono font-black text-foreground uppercase tracking-[0.3em]">Protocol Matrix</h4>
                                    <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest mt-1">Hierarchical Permission Tiers</p>
                                </div>
                            </div>

                            <div className="space-y-10 relative z-10">
                                <div className="space-y-4 group/item">
                                    <div className="flex items-center gap-3 text-[10px] font-mono font-black text-destructive tracking-[0.3em] uppercase opacity-70 group-hover/item:opacity-100 transition-opacity">
                                        <ShieldAlert size={14} className="animate-pulse" /> Registry Admin
                                    </div>
                                    <p className="text-[11px] font-mono text-muted-foreground/40 leading-relaxed uppercase tracking-tight group-hover/item:text-muted-foreground transition-colors">
                                        SUPREME OVERRIDE CAPABILITIES. HANDLES BILLING TELEMETRY, PERSONNEL DEPLOYMENT, AND SECTOR ARCHITECTURE.
                                    </p>
                                </div>

                                <div className="space-y-4 group/item">
                                    <div className="flex items-center gap-3 text-[10px] font-mono font-black text-primary tracking-[0.3em] uppercase opacity-70 group-hover/item:opacity-100 transition-opacity">
                                        <ShieldCheck size={14} /> Art Director
                                    </div>
                                    <p className="text-[11px] font-mono text-muted-foreground/40 leading-relaxed uppercase tracking-tight group-hover/item:text-muted-foreground transition-colors">
                                        CREATIVE SYNAPSE APPROVAL. AUTHORIZED TO MODIFY BRAND DOCTRINE AND DEPLOY DNA VARIANTS TO PRODUCTION.
                                    </p>
                                </div>

                                <div className="space-y-4 group/item">
                                    <div className="flex items-center gap-3 text-[10px] font-mono font-black text-foreground/40 tracking-[0.3em] uppercase opacity-70 group-hover/item:opacity-100 transition-opacity">
                                        <Shield size={14} /> Node Designer
                                    </div>
                                    <p className="text-[11px] font-mono text-muted-foreground/40 leading-relaxed uppercase tracking-tight group-hover/item:text-muted-foreground transition-colors">
                                        CORE CONTRIBUTION ACCESS. ABLE TO SYNTHESIZE ASSETS IN THE STUDIO AND CURATE MOODBOARDS.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="p-8 border border-primary/10 bg-primary/[0.02] rounded-none">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <h4 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-primary">System Integrity</h4>
                            </div>
                            <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest leading-relaxed">
                                ALL PERSONNEL ACTIONS ARE LOGGED IN THE IMMUTABLE AUDIT TRAIL. UNAUTHORIZED PRIVILEGE ESCALATION WILL TRIGGER SECTOR LOCKDOWN.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
