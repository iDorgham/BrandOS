import React from 'react';
import { ChevronRight, ChevronDown, Share2, Download, Blocks } from 'lucide-react';
import { useNodeManager } from '@/hooks/useNodeManager';

interface MoodBoardSidebarProps {
    isSidebarOpen: boolean;
    isSidebarMini: boolean;
    setIsSidebarMini: (value: boolean) => void;
    setIsAppSidebarCollapsed?: (value: boolean) => void;
    collapsedCategories: Set<string>;
    toggleCategory: (category: string) => void;
    addNode: (nodeType: any) => void;
    setIsModulesManagerOpen: (isOpen: boolean) => void;
    onShare?: () => void;
    onExport: () => void;
}

export const MoodBoardSidebar: React.FC<MoodBoardSidebarProps> = ({
    isSidebarOpen,
    isSidebarMini,
    setIsSidebarMini,
    setIsAppSidebarCollapsed,
    collapsedCategories,
    toggleCategory,
    addNode,
    setIsModulesManagerOpen,
    onShare,
    onExport,
}) => {
    const { getInstalledNodes } = useNodeManager();

    return (
        <div className={`
      absolute left-0 top-10 bottom-0 z-20 
      transition-all duration-300 ease-out
      ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
      ${isSidebarMini ? 'w-14' : 'w-56'}
    `}>
            <div className="h-full bg-card/80 backdrop-blur-xl border-r border-border/40 flex flex-col relative overflow-visible group/sidebar">
                {/* Advanced Tactical Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
                </div>

                {/* Categories and Nodes - Carbon Design System */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                    {['Foundation', 'Orchestration', 'Generative', 'Utility', 'External'].map(category => {
                        const categoryNodes = getInstalledNodes().filter((n: any) => n.category.toLowerCase() === category.toLowerCase());
                        if (categoryNodes.length === 0) return null;

                        const isCollapsed = collapsedCategories.has(category);

                        return (
                            <div key={category} className="mb-2">
                                {/* Category Header - Carbon style */}
                                {!isSidebarMini && (
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full flex items-center justify-between h-8 px-3 text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-muted-foreground/60 hover:text-foreground/80 border-b border-border/20 transition-colors duration-150"
                                    >
                                        <span>{category}</span>
                                        {isCollapsed ? <ChevronRight size={10} /> : <ChevronDown size={10} />}
                                    </button>
                                )}

                                {/* Node Buttons - Carbon style */}
                                {!isCollapsed && (
                                    <div className="mt-1">
                                        {categoryNodes.map((tool: any) => (
                                            <button
                                                key={tool.id}
                                                onClick={() => addNode(tool.id)}
                                                className={`
                          w-full flex items-center h-10 border-l-2 border-transparent hover:border-primary/40 transition-all duration-200 group/tool
                          ${isSidebarMini ? 'justify-center px-0' : 'gap-3 px-3 hover:bg-primary/5 text-muted-foreground/60 hover:text-foreground'}
                        `}
                                                title={isSidebarMini ? tool.label : undefined}
                                            >
                                                <div className={`
                          w-8 h-8 flex items-center justify-center bg-card border border-border/40 transition-all duration-300
                          group-hover/tool:border-primary/50 group-hover/tool:bg-primary/10 group-hover/tool:shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]
                          ${isSidebarMini ? 'shadow-inner' : ''}
                        `}>
                                                    <tool.icon size={13} className="group-hover/tool:text-primary transition-colors" strokeWidth={isSidebarMini ? 2.5 : 2} />
                                                </div>
                                                {!isSidebarMini && <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase">{tool.label}</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => {
                        if (!isSidebarMini) {
                            // Collapsing: Minimize Both
                            setIsSidebarMini(true);
                            setIsAppSidebarCollapsed?.(true);
                        } else {
                            // Expanding: Maximize Moodboard Only
                            setIsSidebarMini(false);
                            // We don't restore the app sidebar per user request
                        }
                    }}
                    className={`
            absolute -right-3 bottom-12 z-50
            w-3 h-8 rounded-r-md
            bg-card border-y border-r border-border/40
            flex items-center justify-center
            transition-all duration-300
            hover:bg-primary hover:text-primary-foreground hover:border-primary hover:w-4
            group/toggle
          `}
                    title={isSidebarMini ? "Expand Sidebar" : "Focus Mode (Minimize Everything)"}
                >
                    <ChevronRight size={10} className={`transition-transform duration-300 ${!isSidebarMini ? 'rotate-180' : ''}`} />
                </button>

                {/* Footer Section - Carbon Design System */}
                <div className="mt-auto">
                    {!isSidebarMini && (
                        <div className="p-2 border-t border-border/40 flex items-center justify-between gap-2">
                            {/* Right: Actions */}
                            <div className="flex w-full items-center gap-1">
                                <button
                                    onClick={onShare}
                                    className="flex items-center justify-center flex-1 h-8 rounded-sm bg-muted/20 hover:bg-muted/30 border border-border/40 hover:border-primary/40 transition-all text-muted-foreground/60 hover:text-primary"
                                    title="Share Moodboard"
                                >
                                    <Share2 size={12} />
                                </button>
                                <button
                                    onClick={onExport}
                                    className="flex items-center justify-center flex-1 h-8 rounded-sm bg-muted/20 hover:bg-muted/30 border border-border/40 hover:border-primary/40 transition-all text-muted-foreground/60 hover:text-primary"
                                    title="Export Matrix"
                                >
                                    <Download size={12} />
                                </button>
                                <button
                                    onClick={() => setIsModulesManagerOpen(true)}
                                    className="flex items-center justify-center flex-1 h-8 rounded-sm bg-primary/5 hover:bg-primary/10 border border-transparent hover:border-primary/40 transition-all text-primary/60 hover:text-primary"
                                    title="Modules_Vault"
                                >
                                    <Blocks size={12} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Minimized Modules Manager (Only visible in Mini Mode) */}
                    {isSidebarMini && (
                        <button
                            onClick={() => setIsModulesManagerOpen(true)}
                            className="w-full flex items-center justify-center h-12 hover:bg-primary/10 transition-colors border-t border-transparent hover:border-primary/20"
                            title="Modules_Vault"
                        >
                            <Blocks size={12} className="text-primary/60 hover:text-primary" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
