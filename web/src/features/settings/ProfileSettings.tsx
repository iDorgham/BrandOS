import React, { useState, useRef } from 'react';
import { Card, Input, Button } from '@/components/ui';
import { User, Camera, Mail, AtSign, FileText, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

export const ProfileSettings = () => {
    const { user, userProfile, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Local state for form
    const [profileData, setProfileData] = useState({
        displayName: userProfile?.name || user?.user_metadata?.full_name || '',
        username: userProfile?.id?.substring(0, 8) || user?.user_metadata?.username || '', // Fallback username
        email: userProfile?.email || user?.email || '',
        bio: userProfile?.bio || user?.user_metadata?.bio || 'Digital Alchemist & Brand Architect',
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        userProfile?.avatarUrl || user?.user_metadata?.avatar_url || null
    );

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Check file size (limit to 1MB for base64 storage)
            if (file.size > 1024 * 1024) {
                toast.error('Avatar image too large. Max size 1MB.');
                return;
            }

            // Create preview
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
            console.error('Save failed:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col gap-0.5 mb-1">
                <h2 className="text-xl font-display font-black tracking-tighter">Profile Settings</h2>
                <p className="text-muted-foreground text-[10px] font-medium opacity-60">Manage your public profile and personal details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Avatar Section */}
                <div className="md:col-span-4">
                    <Card className="p-6 bg-card border-border flex flex-col items-center text-center h-full rounded-xl">
                        <div className="relative group w-32 h-32 mb-4">
                            <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-background shadow-xl border border-border bg-muted/30">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <User size={48} />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={triggerFileInput}
                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                <Camera size={24} className="text-white" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="space-y-1 mb-4">
                            <h3 className="font-bold text-foreground">{profileData.displayName || 'User'}</h3>
                            <p className="text-xs text-muted-foreground">{profileData.email}</p>
                        </div>

                        <div className="flex gap-2 w-full mt-auto">
                            <Button variant="secondary" size="sm" onClick={triggerFileInput} className="flex-1 text-xs">
                                Upload New
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setAvatarPreview(null)} className="flex-1 text-xs text-muted-foreground hover:text-destructive">
                                Remove
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Details Form Section */}
                <div className="md:col-span-8">
                    <Card className="p-6 bg-card border-border h-full rounded-xl">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Display Name</label>
                                    <div className="relative">
                                        <Input
                                            name="displayName"
                                            value={profileData.displayName}
                                            onChange={handleInputChange}
                                            className="pl-8 h-9 text-sm bg-muted/10 border-border"
                                            placeholder="Your Name"
                                        />
                                        <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Username</label>
                                    <div className="relative">
                                        <Input
                                            name="username"
                                            value={profileData.username}
                                            onChange={handleInputChange}
                                            className="pl-8 h-9 text-sm bg-muted/10 border-border"
                                            placeholder="@username"
                                        />
                                        <AtSign size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                                <div className="relative">
                                    <Input
                                        name="email"
                                        value={profileData.email}
                                        disabled
                                        className="pl-8 h-9 text-sm bg-muted/5 border-border opacity-70"
                                    />
                                    <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Bio</label>
                                <textarea
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full p-3 rounded-md bg-muted/10 border border-border focus:ring-1 focus:ring-primary focus:outline-none text-sm resize-none"
                                    placeholder="Tell us a little about yourself..."
                                />
                            </div>

                            <div className="pt-2 flex justify-end">
                                <Button onClick={handleSave} className="gap-2 px-6" size="sm" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="animate-spin">⟳</span>
                                    ) : (
                                        <Save size={14} />
                                    )}
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
