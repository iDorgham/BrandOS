import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui';
import {
    User,
    Settings,
    LogOut,
    CreditCard,
    Bell,
    ChevronRight,
    Shield,
    Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface UserMenuProps {
    onNavigate?: (tab: string) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onNavigate }) => {
    const { user, userProfile, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const userInitial = userProfile?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
    const userName = userProfile?.name || user?.email?.split('@')[0] || 'User';
    const avatarUrl = userProfile?.avatarUrl;

    const menuSelection = (action: string) => {
        setIsOpen(false);
        if (action === 'logout') {
            signOut();
        } else if (action === 'profile' && onNavigate) {
            onNavigate('profile');
        } else if (action === 'settings' && onNavigate) {
            onNavigate('settings');
        } else {
            toast.info(`${action} module coming soon`);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 rounded-full brand-gradient flex items-center justify-center text-[10px] font-black text-primary-foreground cursor-pointer hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background transition-all shadow-xl group overflow-hidden"
            >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {avatarUrl ? (
                    <img src={avatarUrl} alt={userName} className="w-full h-full object-cover rounded-full" />
                ) : (
                    <span className="relative z-10">{userInitial}{userInitial === 'U' ? '' : userInitial}</span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <Card className="absolute top-full right-0 mt-3 w-72 p-0 z-50 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden bg-secondary/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        {/* Profile Header */}
                        <div className="p-5 border-b border-white/5 bg-gradient-to-br from-primary/5 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-sm font-black text-primary-foreground shadow-2xl overflow-hidden">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={userName} className="w-full h-full object-cover rounded-2xl" />
                                    ) : (
                                        userInitial
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black uppercase tracking-tight truncate">{userName}</p>
                                    <p className="text-[10px] text-muted-foreground truncate opacity-60">{user?.email}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 px-2 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
                                <Shield size={10} className="text-primary" />
                                <span className="text-[9px] font-medium tracking-normal text-primary">Art Director Protocol</span>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2 space-y-1">
                            <button
                                onClick={() => menuSelection('profile')}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-bold text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <User size={16} className="group-hover:text-primary transition-colors" />
                                    <span className="tracking-normal text-[10px]">Identity Profile</span>
                                </div>
                                <ChevronRight size={12} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <button
                                onClick={() => menuSelection('settings')}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-bold text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <Settings size={16} className="group-hover:text-primary transition-colors" />
                                    <span className="tracking-normal text-[10px]">System Settings</span>
                                </div>
                                <ChevronRight size={12} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <button
                                onClick={() => menuSelection('billing')}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-bold text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <CreditCard size={16} className="group-hover:text-primary transition-colors" />
                                    <span className="tracking-normal text-[10px]">Brand OS Subscription</span>
                                </div>
                                <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[8px] font-medium">Pro</div>
                            </button>

                            <button
                                onClick={() => menuSelection('notifications')}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-bold text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <Bell size={16} className="group-hover:text-primary transition-colors" />
                                    <span className="tracking-normal text-[10px]">Neural Alerts</span>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </button>
                        </div>

                        {/* Footer Action */}
                        <div className="p-2 border-t border-white/5 bg-white/[0.01]">
                            <button
                                onClick={() => menuSelection('logout')}
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-500/10 transition-all group"
                            >
                                <LogOut size={16} />
                                Terminate Session
                            </button>
                        </div>

                        {/* DNA Badge Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                            <Sparkles size={80} />
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
};
