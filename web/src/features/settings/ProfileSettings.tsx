import React, { useState, useRef } from 'react';
import { User, Camera, Mail, AtSign, FileText, Save, MapPin, Link2, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';

export const ProfileSettings = () => {
    const { user, userProfile, updateProfile, userRole } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profileData, setProfileData] = useState({
        displayName: userProfile?.name || user?.user_metadata?.full_name || '',
        username: userProfile?.id?.substring(0, 8) || user?.user_metadata?.username || '',
        email: userProfile?.email || user?.email || '',
        bio: userProfile?.bio || user?.user_metadata?.bio || '',
        location: '',
        website: '',
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        userProfile?.avatarUrl || user?.user_metadata?.avatar_url || null
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Avatar image too large. Max size 1MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                toast.success('Avatar selected');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            await updateProfile({
                name: profileData.displayName,
                bio: profileData.bio,
                avatarUrl: avatarPreview || '',
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const roleLabel = userRole === 'admin' ? 'Administrator' : userRole === 'art_director' ? 'Art Director' : 'Designer';

    return (
        <div className="max-w-4xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <div className="w-1 h-6 bg-primary" />
                <div>
                    <h2 className="text-[14px] font-bold text-foreground tracking-tight">Profile</h2>
                    <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em]">Identity_Configuration</p>
                </div>
            </div>

            {/* Avatar + Identity Card */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <Camera size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Avatar & Identity</span>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="relative group shrink-0">
                            <div className="w-24 h-24 bg-muted/20 border border-border/40 overflow-hidden">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                                        <User size={32} />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                <Camera size={18} className="text-primary" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Identity Summary */}
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="text-[16px] font-bold text-foreground">{profileData.displayName || 'Unnamed User'}</h3>
                                <p className="text-[11px] font-mono text-muted-foreground/60">@{profileData.username || 'user'}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Briefcase size={10} className="text-muted-foreground/40" />
                                    <span className="text-[10px] font-mono text-muted-foreground/60">{roleLabel}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Mail size={10} className="text-muted-foreground/40" />
                                    <span className="text-[10px] font-mono text-muted-foreground/60">{profileData.email}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-7 px-3 text-[10px] font-bold border border-border/40 bg-muted/10 hover:bg-muted/20 text-foreground transition-colors"
                                >
                                    Upload Photo
                                </button>
                                <button
                                    onClick={() => setAvatarPreview(null)}
                                    className="h-7 px-3 text-[10px] font-bold border border-border/40 bg-muted/10 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Details */}
            <div className="border border-border/40 bg-card/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-muted/5">
                    <FileText size={12} className="text-muted-foreground/60" />
                    <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">Personal Details</span>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Display Name</label>
                            <div className="relative">
                                <input
                                    name="displayName"
                                    value={profileData.displayName}
                                    onChange={handleInputChange}
                                    className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] pl-8 pr-3 outline-none focus:border-primary border-b-2 transition-colors"
                                    placeholder="Your name"
                                />
                                <User size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Username</label>
                            <div className="relative">
                                <input
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleInputChange}
                                    className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] pl-8 pr-3 font-mono outline-none focus:border-primary border-b-2 transition-colors"
                                    placeholder="@handle"
                                />
                                <AtSign size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                        <div className="relative">
                            <input
                                name="email"
                                value={profileData.email}
                                disabled
                                className="w-full h-9 bg-muted/10 border border-border/40 text-[12px] pl-8 pr-3 outline-none opacity-60 cursor-not-allowed border-b-2 border-border/20"
                            />
                            <Mail size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                        </div>
                        <p className="text-[8px] font-mono text-muted-foreground/40">Managed by authentication provider</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Location</label>
                            <div className="relative">
                                <input
                                    name="location"
                                    value={profileData.location}
                                    onChange={handleInputChange}
                                    className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] pl-8 pr-3 outline-none focus:border-primary border-b-2 transition-colors"
                                    placeholder="City, Country"
                                />
                                <MapPin size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Website</label>
                            <div className="relative">
                                <input
                                    name="website"
                                    value={profileData.website}
                                    onChange={handleInputChange}
                                    className="w-full h-9 bg-muted/20 border border-border/40 text-[12px] pl-8 pr-3 outline-none focus:border-primary border-b-2 transition-colors"
                                    placeholder="https://"
                                />
                                <Link2 size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Bio</label>
                        <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full bg-muted/20 border border-border/40 text-[12px] p-3 outline-none focus:border-primary border-b-2 transition-colors resize-none"
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>
            </div>

            {/* Save Bar */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">PROFILE::SAVE_STATE</span>
                <Button onClick={handleSave} disabled={isLoading} size="sm" className="gap-2 px-6 h-8 text-[11px]">
                    {isLoading ? (
                        <div className="w-3 h-3 border border-primary-foreground border-t-transparent animate-spin" />
                    ) : (
                        <Save size={12} />
                    )}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};
