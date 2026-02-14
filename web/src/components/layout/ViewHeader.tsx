import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ViewHeaderProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    badge?: string;
    rightContent?: React.ReactNode;
}

export const ViewHeader: React.FC<ViewHeaderProps> = React.memo(({
    icon: Icon,
    title,
    subtitle,
    badge,
    rightContent
}) => {
    return (
        <div className="relative py-6 px-8 bg-card/40 border-y border-primary/20 overflow-hidden group rounded-none shadow-2xl backdrop-blur-md">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:24px_24px]" />

            {/* Animated Scan Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-scan pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    {/* Compact Icon Container */}
                    <div className="w-12 h-12 bg-card border border-primary/20 flex items-center justify-center rounded-none shadow-xl group-hover:scale-105 transition-transform duration-500 shrink-0">
                        <Icon size={20} className="text-primary animate-pulse" strokeWidth={1.5} />
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-[9px] font-mono font-black text-primary tracking-[0.3em] uppercase opacity-60">
                                {badge || 'System Protocol'}
                            </span>
                            <div className="h-[1px] w-6 bg-primary/30" />
                        </div>
                        <h1 className="text-3xl font-display font-black tracking-tighter uppercase leading-none flex items-baseline">
                            {title}
                            <span className="text-muted-foreground font-light text-xl ml-4 lowercase tracking-normal flex items-center h-full opacity-70">
                                // {subtitle}
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Right Side Stats/Status Section */}
                {rightContent && (
                    <div className="flex items-center gap-6">
                        {rightContent}
                    </div>
                )}
            </div>
        </div>
    );
});
