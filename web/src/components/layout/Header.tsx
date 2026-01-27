import React from 'react';

interface HeaderProps {
    activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
    return (
        <header className="h-16 flex items-center justify-between px-8 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-40">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{activeTab}</h2>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border text-[10px] font-bold text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    CORE READY
                </div>
                <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-xs font-black text-primary-foreground cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
                    AD
                </div>
            </div>
        </header>
    );
};
