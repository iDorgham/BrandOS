import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, Share2, FileOutput, Package, Search, Star, Clock, List, LayoutGrid, Grid3X3, ChevronUp, ArrowUpDown, Palette, PenTool, Cpu, Target, Layers } from 'lucide-react';
import { useNodeManager } from '@/hooks/useNodeManager';
import { MoodNodeDefinition, NODE_REGISTRY } from './NodeRegistry';

type SidebarProfile = 'ALL' | 'DESIGN' | 'CONTENT' | 'AUTOMATION' | 'MARKETING';

const SIDEBAR_PROFILES: Record<SidebarProfile, { label: string; icon: any; nodeIds?: string[] }> = {
    ALL: { label: 'All', icon: Grid3X3 },
    DESIGN: {
        label: 'Design',
        icon: Palette,
        nodeIds: ['image', 'text', 'palette', 'typography', 'texture', 'icons', 'preset', 'attribute', 'section', 'midjourney']
    },
    CONTENT: {
        label: 'Content',
        icon: PenTool,
        nodeIds: ['image', 'text', 'title', 'content_gen', 'headline_gen', 'seo_optimizer', 'hashtag_gen', 'content_rewriter', 'paragraph', 'story_creator']
    },
    AUTOMATION: {
        label: 'Auto',
        icon: Cpu,
        nodeIds: ['image', 'text', 'trigger', 'engine', 'switch', 'receiver', 'logic', 'webhook', 'api_request', 'slack', 'telegram', 'whatsapp', 'google_sheet', 'cms_sync']
    },
    MARKETING: {
        label: 'Market',
        icon: Target,
        nodeIds: ['image', 'text', 'meta_ads', 'google_ads', 'social_poster', 'scheduler', 'research', 'content_plan', 'competitor', 'web_ref', 'email_sender']
    }
};

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
    isZenMode?: boolean;
    // Node browser props
    browserViewMode?: 'list' | 'grid' | 'compact';
    setBrowserViewMode?: (mode: 'list' | 'grid' | 'compact') => void;
    browserActiveTab?: 'all' | 'favorites' | 'recent';
    setBrowserActiveTab?: (tab: 'all' | 'favorites' | 'recent') => void;
    browserSearchQuery?: string;
    setBrowserSearchQuery?: (query: string) => void;
    browserSortBy?: 'name' | 'category' | 'recent';
    setBrowserSortBy?: (sort: 'name' | 'category' | 'recent') => void;
    favorites?: string[];
    toggleFavorite?: (nodeId: string) => void;
    favoriteNodes?: MoodNodeDefinition[];
    recentNodes?: MoodNodeDefinition[];
    filteredNodes?: MoodNodeDefinition[];
}

const SIDEBAR_WIDTH_KEY = 'brand_os_sidebar_width';
const CATEGORIES = ['CORE', 'REFINEMENT', 'AI_GEN', 'SIGNAL', 'SYSTEM', 'EXTRAS', 'TEXT_PROCESSING', 'SOCIAL_MEDIA', 'INTEGRATIONS'];

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
    isZenMode = false,
    browserViewMode = 'list',
    setBrowserViewMode,
    browserActiveTab = 'all',
    setBrowserActiveTab,
    browserSearchQuery = '',
    setBrowserSearchQuery,
    browserSortBy = 'category',
    setBrowserSortBy,
    favorites = [],
    toggleFavorite,
    favoriteNodes = [],
    recentNodes = [],
    filteredNodes = [],
}) => {
    const { getInstalledNodes } = useNodeManager();
    const [activeProfile, setActiveProfile] = useState<SidebarProfile>('ALL');

    // Resizable sidebar
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        try {
            const stored = localStorage.getItem(SIDEBAR_WIDTH_KEY);
            return stored ? parseInt(stored, 10) : 224;
        } catch { return 224; }
    });
    const isResizing = useRef(false);
    const startX = useRef(0);
    const startWidth = useRef(224);

    const handleResizeStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
        startX.current = e.clientX;
        startWidth.current = sidebarWidth;

        const handleResizeMove = (ev: MouseEvent) => {
            if (!isResizing.current) return;
            const delta = ev.clientX - startX.current;
            const newWidth = Math.max(180, Math.min(400, startWidth.current + delta));
            setSidebarWidth(newWidth);
        };

        const handleResizeEnd = () => {
            isResizing.current = false;
            try { localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth)); } catch { }
            document.removeEventListener('mousemove', handleResizeMove);
            document.removeEventListener('mouseup', handleResizeEnd);
        };

        document.addEventListener('mousemove', handleResizeMove);
        document.addEventListener('mouseup', handleResizeEnd);
    }, [sidebarWidth]);

    // Save width when it changes
    useEffect(() => {
        if (!isResizing.current) {
            try { localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth)); } catch { }
        }
    }, [sidebarWidth]);

    const renderNodeButton = (tool: MoodNodeDefinition, showFavorite = true) => (
        <button
            key={tool.id}
            onClick={() => addNode(tool.id)}
            draggable={true}
            onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow/type', tool.id);
                e.dataTransfer.effectAllowed = 'move';
            }}
            className={`
                w-full flex items-center h-10 border-l-2 border-transparent hover:border-primary/40 transition-all duration-200 group/tool text-muted-foreground/60 hover:text-foreground
                ${isSidebarMini ? 'justify-center px-0' : 'gap-3 px-1 hover:bg-primary/5'}
            `}
            title={isSidebarMini ? tool.label : undefined}
        >
            <div className="w-8 h-8 flex items-center justify-center bg-card border border-border/40 transition-all duration-300 group-hover/tool:border-primary/50 group-hover/tool:bg-primary/10 shrink-0">
                <tool.icon size={14} className="group-hover/tool:text-primary transition-colors" strokeWidth={2.5} />
            </div>
            {!isSidebarMini && (
                <>
                    <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase flex-1 text-left">{tool.label}</span>
                    {showFavorite && toggleFavorite && (
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }}
                            className="opacity-0 group-hover/tool:opacity-100 transition-opacity p-0.5"
                            title={favorites.includes(tool.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Star size={10} className={favorites.includes(tool.id) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/40'} />
                        </button>
                    )}
                </>
            )}
        </button>
    );

    const renderGridNode = (tool: MoodNodeDefinition) => (
        <button
            key={tool.id}
            onClick={() => addNode(tool.id)}
            draggable={true}
            onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow/type', tool.id);
                e.dataTransfer.effectAllowed = 'move';
            }}
            className="flex flex-col items-center gap-1.5 p-2 border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all group/tool relative"
            title={tool.description}
        >
            {toggleFavorite && (
                <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }}
                    className="absolute top-0.5 right-0.5 opacity-0 group-hover/tool:opacity-100 transition-opacity p-0.5"
                >
                    <Star size={8} className={favorites.includes(tool.id) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/40'} />
                </button>
            )}
            <div className="w-8 h-8 flex items-center justify-center bg-card border border-border/40 group-hover/tool:border-primary/50 group-hover/tool:bg-primary/10 transition-all">
                <tool.icon size={14} className="group-hover/tool:text-primary transition-colors text-muted-foreground/60" strokeWidth={2.5} />
            </div>
            <span className="text-[8px] font-mono font-bold tracking-[0.1em] uppercase text-muted-foreground/60 group-hover/tool:text-foreground transition-colors text-center leading-tight">{tool.label}</span>
        </button>
    );

    const renderCompactNode = (tool: MoodNodeDefinition) => (
        <button
            key={tool.id}
            onClick={() => addNode(tool.id)}
            draggable={true}
            onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow/type', tool.id);
                e.dataTransfer.effectAllowed = 'move';
            }}
            className="w-8 h-8 flex items-center justify-center bg-card border border-border/40 hover:border-primary/50 hover:bg-primary/10 transition-all group/tool"
            title={`${tool.label} — ${tool.description}`}
        >
            <tool.icon size={14} className="text-muted-foreground/60 group-hover/tool:text-primary transition-colors" strokeWidth={2.5} />
        </button>
    );

    const renderNodeList = (nodes: MoodNodeDefinition[], grouped = false) => {
        // Filter by logic: If it's a profile other than ALL, only show nodes in that profile's ID list
        const profileNodeIds = SIDEBAR_PROFILES[activeProfile].nodeIds;
        const profileFilteredNodes = profileNodeIds
            ? nodes.filter(n => profileNodeIds.includes(n.id))
            : nodes;

        if (browserViewMode === 'grid') {
            return (
                <div className="grid grid-cols-2 gap-1 p-1">
                    {profileFilteredNodes.map(tool => renderGridNode(tool))}
                </div>
            );
        }

        if (browserViewMode === 'compact') {
            return (
                <div className="flex flex-wrap gap-1 p-1">
                    {profileFilteredNodes.map(tool => renderCompactNode(tool))}
                </div>
            );
        }

        // List mode (default)
        if (grouped) {
            return CATEGORIES.map(category => {
                const categoryNodes = profileFilteredNodes.filter(n => n.category.toLowerCase() === category.toLowerCase());
                if (categoryNodes.length === 0) return null;

                const isCollapsed = collapsedCategories.has(category);

                return (
                    <div key={category} className="mb-2">
                        {!isSidebarMini && (
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between h-8 px-1 text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-muted-foreground/60 hover:text-foreground/80 border-b border-border/20 transition-colors duration-150"
                            >
                                <span>{category}</span>
                                {isCollapsed ? <ChevronRight size={14} strokeWidth={2.5} /> : <ChevronDown size={14} strokeWidth={2.5} />}
                            </button>
                        )}
                        {!isCollapsed && (
                            <div className="mt-1">
                                {categoryNodes.map(tool => renderNodeButton(tool as MoodNodeDefinition))}
                            </div>
                        )}
                    </div>
                );
            });
        }

        return (
            <div className="mt-1">
                {profileFilteredNodes.map(tool => renderNodeButton(tool as MoodNodeDefinition))}
            </div>
        );
    };

    return (
        <div
            className={`
                absolute left-0 top-10 bottom-6 z-20
                transition-all duration-300 ease-out
                ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
            `}
            style={{ width: isSidebarMini ? 56 : sidebarWidth }}
        >
            <div className="h-full bg-card/90 backdrop-blur-xl border-r border-border/40 flex flex-col relative overflow-visible group/sidebar">
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
                </div>

                {/* Profile Selector */}
                <div className={`p-1.5 border-b border-border/20 bg-muted/10 flex gap-1 ${isSidebarMini ? 'flex-col items-center' : ''}`}>
                    {(Object.keys(SIDEBAR_PROFILES) as SidebarProfile[]).map(profileKey => {
                        const profile = SIDEBAR_PROFILES[profileKey];
                        const isActive = activeProfile === profileKey;
                        return (
                            <button
                                key={profileKey}
                                onClick={() => setActiveProfile(profileKey)}
                                className={`
                                    flex items-center justify-center rounded-sm transition-all duration-300 relative overflow-hidden group/prof
                                    ${isSidebarMini ? 'w-8 h-8' : 'flex-1 py-2 px-1 gap-1'}
                                    ${isActive
                                        ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground border border-border/40 shadow-sm shadow-black/20'
                                        : 'text-muted-foreground/30 hover:text-muted-foreground/60 hover:bg-muted/30 border border-transparent'}
                                `}
                                title={profile.label}
                            >
                                {isActive && (
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-primary animate-in fade-in slide-in-from-top-1 duration-500" />
                                )}
                                <profile.icon size={isSidebarMini ? 14 : 11} className={`transition-colors duration-300 ${isActive ? 'text-primary' : ''}`} strokeWidth={isActive ? 2.5 : 1.5} />
                                {!isSidebarMini && (
                                    <span className={`text-[7.5px] font-mono font-black uppercase tracking-[0.1em] transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-0.5'}`}>
                                        {profile.label}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Header: View mode + Tabs */}
                {!isSidebarMini && (
                    <div className="border-b border-border/20">
                        {/* View mode controls */}
                        <div className="px-2 py-1.5 flex items-center justify-between">
                            <div className="flex items-center gap-0.5">
                                <button
                                    onClick={() => setBrowserViewMode?.('list')}
                                    className={`p-1 transition-colors ${browserViewMode === 'list' ? 'text-primary bg-primary/10' : 'text-muted-foreground/40 hover:text-foreground'}`}
                                    title="List view"
                                >
                                    <List size={12} />
                                </button>
                                <button
                                    onClick={() => setBrowserViewMode?.('grid')}
                                    className={`p-1 transition-colors ${browserViewMode === 'grid' ? 'text-primary bg-primary/10' : 'text-muted-foreground/40 hover:text-foreground'}`}
                                    title="Grid view"
                                >
                                    <LayoutGrid size={12} />
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    const sorts: Array<'name' | 'category' | 'recent'> = ['category', 'name', 'recent'];
                                    const idx = sorts.indexOf(browserSortBy);
                                    setBrowserSortBy?.(sorts[(idx + 1) % sorts.length]);
                                }}
                                className="flex items-center gap-0.5 p-1 text-muted-foreground/40 hover:text-foreground transition-colors"
                                title={`Sort: ${browserSortBy}`}
                            >
                                <ArrowUpDown size={10} />
                                <span className="text-[7px] font-mono font-bold uppercase tracking-widest">{browserSortBy}</span>
                            </button>
                        </div>

                        {/* Tabs: All / Favorites / Recent */}
                        <div className="flex border-t border-border/10">
                            {([
                                { id: 'all' as const, label: 'All', icon: List },
                                { id: 'favorites' as const, label: 'Favs', icon: Star },
                                { id: 'recent' as const, label: 'Recent', icon: Clock },
                            ]).map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setBrowserActiveTab?.(tab.id)}
                                    className={`flex items-center gap-1 px-2 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex-1 justify-center ${browserActiveTab === tab.id
                                        ? 'text-primary border-primary'
                                        : 'text-muted-foreground/40 border-transparent hover:text-foreground'
                                        }`}
                                >
                                    <tab.icon size={10} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Node List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pt-1">
                    {browserActiveTab === 'all' && (
                        browserSearchQuery.trim() || browserSortBy !== 'category'
                            ? renderNodeList(filteredNodes, false)
                            : renderNodeList(getInstalledNodes() as MoodNodeDefinition[], true)
                    )}
                    {browserActiveTab === 'favorites' && (
                        favoriteNodes.length > 0
                            ? renderNodeList(favoriteNodes, false)
                            : !isSidebarMini && (
                                <div className="p-4 text-center">
                                    <Star size={16} className="mx-auto text-muted-foreground/20 mb-2" />
                                    <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">No favorites yet</p>
                                    <p className="text-[8px] font-mono text-muted-foreground/30 mt-1">Hover a node and click the star</p>
                                </div>
                            )
                    )}
                    {browserActiveTab === 'recent' && (
                        recentNodes.length > 0
                            ? renderNodeList(recentNodes, false)
                            : !isSidebarMini && (
                                <div className="p-4 text-center">
                                    <Clock size={16} className="mx-auto text-muted-foreground/20 mb-2" />
                                    <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">No recent nodes</p>
                                    <p className="text-[8px] font-mono text-muted-foreground/30 mt-1">Add nodes to see them here</p>
                                </div>
                            )
                    )}
                </div>

                {/* Resize Handle */}
                {!isSidebarMini && (
                    <div
                        className="absolute top-0 -right-[2px] bottom-0 w-[4px] cursor-col-resize hover:bg-primary/30 active:bg-primary/50 transition-colors z-50"
                        onMouseDown={handleResizeStart}
                    />
                )}

                {/* Collapse Toggle */}
                <button
                    onClick={() => {
                        if (!isSidebarMini) {
                            setIsSidebarMini(true);
                            setIsAppSidebarCollapsed?.(true);
                        } else {
                            setIsSidebarMini(false);
                        }
                    }}
                    className="absolute -right-3 bottom-12 z-50 w-3 h-8 rounded-r-md bg-card border-y border-r border-border/40 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:w-4 group/toggle"
                    title={isSidebarMini ? "Expand Sidebar" : "Focus Mode (Minimize Everything)"}
                >
                    <ChevronRight size={14} strokeWidth={2.5} className={`transition-transform duration-300 ${!isSidebarMini ? 'rotate-180' : ''}`} />
                </button>

                {/* Footer */}
                <div className="mt-auto">
                    {!isSidebarMini && (
                        <div className="p-2 border-t border-border/40 flex items-center justify-between gap-2">
                            <div className="flex w-full items-center gap-1">
                                <button
                                    onClick={onShare}
                                    className="flex items-center justify-center flex-1 h-8 rounded-sm bg-muted/20 hover:bg-muted/30 border border-border/40 hover:border-primary/40 transition-all text-muted-foreground/60 hover:text-primary"
                                    title="Share Moodboard"
                                >
                                    <Share2 size={14} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={onExport}
                                    className="flex items-center justify-center flex-1 h-8 rounded-sm bg-muted/20 hover:bg-muted/30 border border-border/40 hover:border-primary/40 transition-all text-muted-foreground/60 hover:text-primary"
                                    title="Export Matrix"
                                >
                                    <FileOutput size={14} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={() => setIsModulesManagerOpen(true)}
                                    className="flex items-center justify-center flex-1 h-8 rounded-sm bg-primary/5 hover:bg-primary/10 border border-transparent hover:border-primary/40 transition-all text-primary/60 hover:text-primary"
                                    title="Modules_Vault"
                                >
                                    <Package size={14} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    )}

                    {isSidebarMini && (
                        <button
                            onClick={() => setIsModulesManagerOpen(true)}
                            className="w-full flex items-center justify-center h-12 hover:bg-primary/10 transition-colors border-t border-transparent hover:border-primary/20"
                            title="Modules_Vault"
                        >
                            <Package size={14} strokeWidth={2.5} className="text-primary/60 hover:text-primary" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
