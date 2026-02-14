import React from 'react';
import { PresenceState } from '@/hooks/usePresence';

interface CollaborativeCursorsProps {
    presences: Record<string, PresenceState>;
}

export const CollaborativeCursors: React.FC<CollaborativeCursorsProps> = ({ presences }) => {
    return (
        <>
            {Object.values(presences).map((presence: PresenceState) => (
                presence.cursor && (
                    <div
                        key={presence.userId}
                        className="absolute pointer-events-none z-[100] transition-all duration-75"
                        style={{ left: presence.cursor.x, top: presence.cursor.y }}
                    >
                        <div className="w-4 h-4 text-primary fill-primary drop-shadow-[0_0_10px_rgba(15,98,254,0.5)]">
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500001 16.8829L0.500001 1.19841L11.7841 12.3673H5.65376Z" />
                            </svg>
                        </div>
                        <div className="ml-3 mt-1 px-2 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-xl">
                            {presence.userName}
                        </div>
                    </div>
                )
            ))}
        </>
    );
};
