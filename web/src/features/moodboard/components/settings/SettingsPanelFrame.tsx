import React, { useState, useEffect, useCallback } from 'react';
import { Palette, Settings, Keyboard } from 'lucide-react';

interface SettingsPanelFrameProps {
    isOpen: boolean;
    width: number;
    setWidth: (w: number) => void;
    activeTab: 'assets' | 'guide' | 'settings';
    setActiveTab: (tab: 'assets' | 'guide' | 'settings') => void;
    children: React.ReactNode;
}

export const SettingsPanelFrame: React.FC<SettingsPanelFrameProps> = ({
    isOpen,
    width,
    setWidth,
    activeTab,
    setActiveTab,
    children
}) => {
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((mouseMoveEvent: globalThis.MouseEvent) => {
        if (isResizing) {
            const newWidth = window.innerWidth - mouseMoveEvent.clientX;
            if (newWidth > 240 && newWidth < 600) {
                setWidth(newWidth);
            }
        }
    }, [isResizing, setWidth]);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <aside
            className={`absolute right-0 top-0 bottom-0 bg-card/98 backdrop-blur-2xl border-l border-border/40 z-20 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] ${!isOpen ? 'translate-x-full' : ''}`}
            style={{ width: width }}
        >
            {/* Resize Handle */}
            <div
                className="absolute left-0 top-0 bottom-0检测 w-1 cursor-col-resize group z-50 transform -translate-x-1/2"
                onMouseDown={startResizing}
            >
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-border/20 group-hover:bg-primary transition-colors" />
            </div>

            {/* Tabs Header - Carbon Style */}
            <div className="flex bg-muted/20 border-b border-border/40">
                {[
                    { id: 'assets' as const, icon: Palette, label: 'Assets' },
                    { id: 'settings' as const, icon: Settings, label: 'Inspector' },
                    { id: 'guide' as const, icon: Keyboard, label: 'Guide' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            relative flex-1 h-10 flex items-center justify-center gap-2 transition-all duration-200
                            ${activeTab === tab.id
                                ? 'text-primary bg-background/50'
                                : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-background/20'
                            }
                        `}
                    >
                        <tab.icon size={12} className={activeTab === tab.id ? 'opacity-100' : 'opacity-60'} />
                        <span className="text-[10px] font-bold tracking-wide">{tab.label}</span>

                        {/* Carbon Active Indicator */}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary animate-in fade-in slide-in-from-bottom-1 duration-300" />
                        )}
                    </button>
                ))}
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {children}
            </div>
        </aside>
    );
};
