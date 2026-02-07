import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/services/supabase.service';
import { useAuth } from '@/contexts/AuthContext';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface PresenceState {
    userId: string;
    userName: string;
    cursor: { x: number; y: number } | null;
    lastActive: number;
}

export const usePresence = (channelName: string) => {
    const { user, activeWorkspace } = useAuth();
    const [presences, setPresences] = useState<Record<string, PresenceState>>({});
    const [isSubscribed, setIsSubscribed] = useState(false);
    const channelRef = useRef<RealtimeChannel | null>(null);

    useEffect(() => {
        if (!user || !activeWorkspace) return;

        const channel = supabase.channel(`presence:${channelName}`, {
            config: {
                presence: {
                    key: user.id,
                },
            },
        });

        channelRef.current = channel;

        const onSync = () => {
            const state = channel.presenceState();
            const formattedPresences: Record<string, PresenceState> = {};

            Object.keys(state).forEach((key) => {
                const presence = state[key][0] as any;
                if (presence.userId !== user.id) {
                    formattedPresences[key] = presence;
                }
            });

            setPresences(formattedPresences);
        };

        channel
            .on('presence', { event: 'sync' }, onSync)
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    setIsSubscribed(true);
                    await channel.track({
                        userId: user.id,
                        userName: user.email?.split('@')[0] || 'Anonymous',
                        cursor: null,
                        lastActive: Date.now(),
                    });
                }
            });

        return () => {
            channel.unsubscribe();
            channelRef.current = null;
            setIsSubscribed(false);
        };
    }, [user, activeWorkspace, channelName]);

    const updateCursor = useCallback((x: number, y: number) => {
        if (!channelRef.current || !user || !isSubscribed) return;

        channelRef.current.track({
            userId: user.id,
            userName: user.email?.split('@')[0] || 'Anonymous',
            cursor: { x, y },
            lastActive: Date.now(),
        });
    }, [user, isSubscribed]);

    return { presences, updateCursor };
};
