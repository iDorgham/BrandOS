import React from 'react';
import { Search } from 'lucide-react';
import { MoodNodeDefinition } from '../NodeRegistry';

interface QuickAddMenuProps {
    quickAddMenu: { x: number; y: number } | null;
    setQuickAddMenu: (menu: { x: number; y: number } | null) => void;
    getInstalledNodes: () => MoodNodeDefinition[];
    addNode: (type: string, position?: { x: number, y: number }) => void;
    screenToFlowPosition: (position: { x: number, y: number }) => { x: number, y: number };
}

export const QuickAddMenu: React.FC<QuickAddMenuProps> = ({
    quickAddMenu,
    setQuickAddMenu,
    getInstalledNodes,
    addNode,
    screenToFlowPosition
}) => {
    if (!quickAddMenu) return null;

    return (
        <div
            className="fixed z-[100] w-64 bg-card/90 backdrop-blur-xl border border-border/40 shadow-2xl p-1 animate-in fade-in zoom-in-95 duration-200"
            style={{ left: quickAddMenu.x, top: quickAddMenu.y }}
        >
            <div className="px-3 py-2 border-b border-border/20 flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Quick_Add_Injector</span>
                <Search size={14} strokeWidth={2.5} className="opacity-40" />
            </div>
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                {['CORE', 'REFINEMENT', 'AI_GEN', 'SIGNAL', 'SYSTEM', 'EXTRAS'].map(category => {
                    const categoryNodes = getInstalledNodes().filter(n => n.category.toLowerCase() === category.toLowerCase());
                    if (categoryNodes.length === 0) return null;

                    return (
                        <div key={category} className="mb-2">
                            <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">{category}</div>
                            {categoryNodes.map(tool => (
                                <button
                                    key={tool.id}
                                    onClick={() => {
                                        const flowPos = screenToFlowPosition({ x: quickAddMenu.x, y: quickAddMenu.y });
                                        addNode(tool.id as any, flowPos);
                                        setQuickAddMenu(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-1.5 hover:bg-primary/5 group transition-colors"
                                >
                                    <div className="w-8 h-8 flex items-center justify-center bg-card border border-border/20 group-hover:border-primary/40 transition-colors">
                                        <tool.icon size={14} strokeWidth={2.5} className="group-hover:text-primary transition-colors" />
                                    </div>

                                    <span className="text-[9px] font-bold uppercase tracking-widest group-hover:text-foreground transition-colors">{tool.label}</span>
                                </button>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
