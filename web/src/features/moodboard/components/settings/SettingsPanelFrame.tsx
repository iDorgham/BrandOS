import React, { useState, useEffect, useCallback } from 'react';
import { Palette, Settings, Layers, ImageUp } from 'lucide-react';

export type PanelTab = 'inspector' | 'layers' | 'assets';

interface SettingsPanelFrameProps {
    isOpen: boolean;
    width: number;
    setWidth: (w: number) => void;
    activeTab: PanelTab;
    setActiveTab: (tab: PanelTab) => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const SettingsPanelFrame: React.FC<SettingsPanelFrameProps> = ({
    isOpen,
    width,
    setWidth,
    activeTab,
    setActiveTab,
    children,
    footer
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

    const tabs: { id: PanelTab; icon: any; label: string }[] = [
        { id: 'inspector', icon: Settings, label: 'Inspector' },
        { id: 'layers', icon: Layers, label: 'Layers' },
        { id: 'assets', icon: Palette, label: 'Assets' },
    ];

    return (
        <aside
            className={`absolute right-0 top-[48px] bottom-6 bg-card/90 backdrop-blur-xl border-l border-border/40 z-20 flex flex-col transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] ${!isOpen ? 'translate-x-[280px] pointer-events-none opacity-0' : 'translate-x-0'}`}
            style={{ width: width }}
        >
            {/* Resize Handle */}
            <div
                className="absolute left-0 top-0 bottom-0 w-2 cursor-col-resize z-50 transform -translate-x-1"
                onMouseDown={startResizing}
            >
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-border/10 transition-colors" />
            </div>

            {/* Tab Bar */}
            <div className="flex bg-muted/10 border-b border-border/40 shrink-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            relative flex-1 h-10 flex items-center justify-center gap-1.5 transition-all duration-200
                            ${activeTab === tab.id
                                ? 'text-primary bg-background/50'
                                : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-background/20'
                            }
                        `}
                        title={tab.label}
                    >
                        <tab.icon size={13} strokeWidth={2.5} className={activeTab === tab.id ? 'opacity-100' : 'opacity-60'} />
                        <span className="text-[9px] font-bold tracking-wide hidden sm:inline">{tab.label}</span>

                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary animate-in fade-in slide-in-from-bottom-1 duration-300" />
                        )}
                    </button>
                ))}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {children}
            </div>

            {/* Sticky Footer */}
            {footer && (
                <div className="shrink-0 border-t border-border/40 bg-muted/5 min-h-0">
                    {footer}
                </div>
            )}
        </aside>
    );
};
