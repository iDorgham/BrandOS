import React, { useState } from 'react';
import { Users, UserPlus, Mail, Shield, MoreHorizontal, Crown, Palette, PenTool, Trash2, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button, Switch } from '@/components/ui';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'art_director' | 'designer';
    avatar?: string;
    status: 'active' | 'pending';
    lastActive: string;
}

export const TeamSettings = () => {
    const { user, userRole } = useAuth();
    const isAdmin = userRole === 'admin';

    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<'designer' | 'art_director'>('designer');

    const [members] = useState<TeamMember[]>([
        {
            id: '1',
            name: user?.user_metadata?.full_name || 'Current User',
            email: user?.email || 'user@example.com',
            role: 'admin',
            status: 'active',
            lastActive: 'Now',
        },
        {
            id: '2',
            name: 'Sarah Chen',
            email: 'sarah@example.com',
            role: 'art_director',
            status: 'active',
            lastActive: '2h ago',
        },
        {
            id: '3',
            name: 'Marcus Rivera',
            email: 'marcus@example.com',
            role: 'designer',
            status: 'active',
            lastActive: '1d ago',
        },
        {
            id: '4',
            name: 'Pending Invite',
            email: 'invited@example.com',
            role: 'designer',
            status: 'pending',
            lastActive: 'Invited 3d ago',
        },
    ]);

    const [teamSettings, setTeamSettings] = useState({
        allowSelfJoin: false,
        requireApproval: true,
        shareAnalytics: true,
    });

    const handleInvite = () => {
        if (!inviteEmail.trim()) {
            toast.error('Enter an email address');
            return;
        }
        toast.success(`Invitation sent to ${inviteEmail}`);
        setInviteEmail('');
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return Crown;
            case 'art_director': return Palette;
            default: return PenTool;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'art_director': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'admin': return 'Admin';
            case 'art_director': return 'Art Director';
            default: return 'Designer';
        }
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">Team</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Team_Management</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Users size={12} className="text-muted-foreground/40" />
                    <span className="text-[10px] font-mono text-muted-foreground/40">{members.filter(m => m.status === 'active').length} active / {members.length} total</span>
                </div>
            </div>

            {/* Invite Member */}
            {isAdmin && (
                <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                        <UserPlus size={12} className="text-muted-foreground/60" />
                        <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Invite Member</span>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 flex items-center h-9 bg-muted/20 border border-border/40 border-b-2">
                                <Mail size={12} className="text-muted-foreground/40 ml-3 mr-2" />
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="flex-1 h-full bg-transparent text-[12px] pr-3 outline-none"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <select
                                value={inviteRole}
                                onChange={(e) => setInviteRole(e.target.value as 'designer' | 'art_director')}
                                className="h-9 bg-muted/20 border border-border/40 text-[11px] px-2 outline-none focus:border-primary border-b-2 transition-colors"
                            >
                                <option value="designer">Designer</option>
                                <option value="art_director">Art Director</option>
                            </select>
                            <button
                                onClick={handleInvite}
                                className="h-9 px-4 text-[10px] font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                            >
                                <UserPlus size={12} />
                                Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Members List */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Users size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Team Members</span>
                </div>
                <div className="divide-y divide-border/10">
                    {members.map((member) => {
                        const RoleIcon = getRoleIcon(member.role);
                        return (
                            <div key={member.id} className="flex items-center justify-between px-6 py-3 group hover:bg-muted/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-muted/20 border border-border/40 flex items-center justify-center relative">
                                        {member.avatar ? (
                                            <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[11px] font-bold text-muted-foreground">
                                                {member.name.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                        {member.status === 'active' && (
                                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-background" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-bold text-foreground">{member.name}</span>
                                            {member.status === 'pending' && (
                                                <span className="text-[8px] font-mono text-amber-500 bg-amber-500/10 px-1.5 py-0.5 border border-amber-500/20">PENDING</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] text-muted-foreground/60">{member.email}</span>
                                            <span className="text-[7px] text-muted-foreground/30">|</span>
                                            <span className="text-[9px] text-muted-foreground/40 flex items-center gap-1">
                                                <Clock size={8} />
                                                {member.lastActive}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`flex items-center gap-1.5 px-2 py-1 border text-[9px] font-bold uppercase tracking-wider ${getRoleColor(member.role)}`}>
                                        <RoleIcon size={10} />
                                        {getRoleLabel(member.role)}
                                    </div>
                                    {isAdmin && member.role !== 'admin' && (
                                        <button className="w-7 h-7 flex items-center justify-center text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Team Policies */}
            {isAdmin && (
                <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                        <Shield size={12} className="text-muted-foreground/60" />
                        <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Team Policies</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-foreground block">Allow Self-Join via Link</span>
                                <span className="text-[9px] text-muted-foreground/60">Members can join with a shared invite link</span>
                            </div>
                            <Switch checked={teamSettings.allowSelfJoin} onCheckedChange={(v) => setTeamSettings(prev => ({ ...prev, allowSelfJoin: v }))} />
                        </div>
                        <div className="h-px bg-border/20" />
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-foreground block">Require Admin Approval</span>
                                <span className="text-[9px] text-muted-foreground/60">New members must be approved by an admin</span>
                            </div>
                            <Switch checked={teamSettings.requireApproval} onCheckedChange={(v) => setTeamSettings(prev => ({ ...prev, requireApproval: v }))} />
                        </div>
                        <div className="h-px bg-border/20" />
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-foreground block">Share Analytics with Team</span>
                                <span className="text-[9px] text-muted-foreground/60">All members can view workspace analytics</span>
                            </div>
                            <Switch checked={teamSettings.shareAnalytics} onCheckedChange={(v) => setTeamSettings(prev => ({ ...prev, shareAnalytics: v }))} />
                        </div>
                    </div>
                </div>
            )}

            {/* Role Permissions */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Shield size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Role Permissions</span>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                            <thead>
                                <tr className="border-b border-border/20">
                                    <th className="text-left py-2 font-mono font-bold text-muted-foreground/60 uppercase tracking-wider">Permission</th>
                                    <th className="text-center py-2 font-mono font-bold text-amber-500 uppercase tracking-wider">Admin</th>
                                    <th className="text-center py-2 font-mono font-bold text-purple-500 uppercase tracking-wider">Art Dir.</th>
                                    <th className="text-center py-2 font-mono font-bold text-blue-500 uppercase tracking-wider">Designer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { perm: 'Manage team members', admin: true, ad: false, designer: false },
                                    { perm: 'Create & edit brands', admin: true, ad: true, designer: true },
                                    { perm: 'Delete brands', admin: true, ad: true, designer: false },
                                    { perm: 'Generate AI assets', admin: true, ad: true, designer: true },
                                    { perm: 'Deploy to production', admin: true, ad: true, designer: false },
                                    { perm: 'View analytics', admin: true, ad: true, designer: false },
                                    { perm: 'Manage billing', admin: true, ad: false, designer: false },
                                    { perm: 'Configure AI models', admin: true, ad: false, designer: false },
                                ].map((row) => (
                                    <tr key={row.perm} className="border-b border-border/10 last:border-0">
                                        <td className="py-2 text-foreground/70">{row.perm}</td>
                                        <td className="text-center py-2">
                                            <div className={`w-2 h-2 mx-auto ${row.admin ? 'bg-emerald-500' : 'bg-muted-foreground/20'}`} />
                                        </td>
                                        <td className="text-center py-2">
                                            <div className={`w-2 h-2 mx-auto ${row.ad ? 'bg-emerald-500' : 'bg-muted-foreground/20'}`} />
                                        </td>
                                        <td className="text-center py-2">
                                            <div className={`w-2 h-2 mx-auto ${row.designer ? 'bg-emerald-500' : 'bg-muted-foreground/20'}`} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">TEAM::CONFIG_STATE</span>
            </div>
        </div>
    );
};
