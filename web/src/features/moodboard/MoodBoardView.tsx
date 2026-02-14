import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { toPng } from 'html-to-image';
import {
  useViewport,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { MoodboardSelector } from './MoodboardSelector';
import { MoodBoardSettingsPanel } from './MoodBoardSettingsPanel';
import { useMoodboards } from '@/hooks/useMoodboards';
import { MoodBoardViewProps } from './types';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import {
  Zap,
  Share2,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

import { usePresence } from '@/hooks/usePresence';
import { useNodeManager } from '@/hooks/useNodeManager';
import { useTheme } from '@/contexts/ThemeContext';

// Custom components and hooks
import { MoodBoardContext } from './MoodBoardContext';
import { MoodBoardSidebar } from './MoodBoardSidebar';
import { MoodBoardHeader } from './MoodBoardHeader';
import { nodeTypes } from './nodes/index';
import { CommandPalette } from './components/CommandPalette';
import { MoodBoardContextMenu } from './components/MoodBoardContextMenu';
import { QuickAddMenu } from './components/QuickAddMenu';

import { CollaborativeCursors } from './components/CollaborativeCursors';
import { BoardModals } from './components/BoardModals';
import { BoardCanvas } from './components/BoardCanvas';

import { useBoardState } from './hooks/useBoardState';
import { useBoardHistory } from './hooks/useBoardHistory';
import { useBoardActions } from './hooks/useBoardActions';
import { useBoardShortcuts } from './hooks/useBoardShortcuts';
import { useNodeBrowser } from './hooks/useNodeBrowser';
import { useNodeGroups } from './hooks/useNodeGroups';
import { useGraphExecution } from './hooks/useGraphExecution';
import { useConnectionValidator } from './hooks/useConnectionValidator';
import { NodeGroupOverlay } from './components/NodeGroupOverlay';
import { StatusBar } from './components/StatusBar';

const MoodBoardViewContent = React.memo<MoodBoardViewProps>(({
  brand,
  setHeaderActions,
  setIsAppSidebarCollapsed,
  isZenMode,
  onToggleZenMode
}) => {
  const { isAuthInitialized } = useAuth();
  const { activeWorkspace, isDataInitialized } = useData();
  const { presences, updateCursor } = usePresence(`moodboard:${brand.id}`);
  const { getInstalledNodes } = useNodeManager();
  const { resolvedTheme } = useTheme();
  const { screenToFlowPosition } = useReactFlow();

  // 1. Core Board State
  const boardState = useBoardState();
  const {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    hasUnsavedChanges, setHasUnsavedChanges,
    lastSavedStateRef, isApplyingHistoryRef,
    updateNodeData
  } = boardState;

  // 2. History Management
  const boardHistory = useBoardHistory(
    nodes, setNodes,
    edges, setEdges,
    updateNodeData,
    lastSavedStateRef,
    isApplyingHistoryRef,
    setHasUnsavedChanges
  );
  const { undo, redo, canUndo, canRedo, saveToHistory, isApplyingHistory } = boardHistory;

  // 3. Board Persistence (from useMoodboards hook)
  const {
    moodboards,
    selectedMoodboard,
    loading: moodboardsLoading,
    selectMoodboard,
    updateMoodboard,
    createMoodboard,
    toggleActive,
    deleteMoodboard
  } = useMoodboards(brand.id);

  // 4. Board Actions
  const boardActions = useBoardActions(
    brand,
    nodes, setNodes,
    edges, setEdges,
    updateNodeData,
    setHasUnsavedChanges,
    lastSavedStateRef,
    selectedMoodboard,
    updateMoodboard as (data: any) => Promise<any>
  );
  const {
    addNode, onNodesDelete, onEdgesDelete, duplicateNode,
    handleManualSave, isSaving, clearCanvas,
    onInjectTemplate, onDrop, onAlignNodes, onReorganizeNodes, onExportJSON
  } = boardActions;

  // 5. Node Groups
  const nodeGroups = useNodeGroups(nodes, setNodes, edges, setEdges, saveToHistory);
  const { groups, setGroups, createGroup, ungroupNodes, toggleCollapse, updateGroup, deleteGroup, refreshGroupBounds } = nodeGroups;

  // 6. Node Browser
  const nodeBrowser = useNodeBrowser();

  // 6b. Execution Engine
  const graphExecution = useGraphExecution(
    nodes, edges, updateNodeData,
    brand.id, activeWorkspace?.id || ''
  );

  // 6c. Connection Validation
  const { isValidConnection } = useConnectionValidator();

  // 7. Shortcuts (with group support)
  useBoardShortcuts(undo, redo, handleManualSave, onNodesDelete, duplicateNode, nodes, createGroup, ungroupNodes, groups);

  // Wrap addNode to track recently used
  const addNodeWithTracking = useCallback((type: any, position?: any, dimensions?: any) => {
    addNode(type, position, dimensions);
    nodeBrowser.addToRecent(type);
  }, [addNode, nodeBrowser]);

  // Refresh group bounds when nodes move
  useEffect(() => {
    if (groups.length > 0) {
      refreshGroupBounds();
    }
  }, [nodes, groups.length, refreshGroupBounds]);

  // 6. Local UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarMini, setIsSidebarMini] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  const [quickAddMenu, setQuickAddMenu] = useState<{ x: number; y: number } | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set(['Orchestration', 'Utility', 'Signal', 'External', 'System']));
  const [isModulesManagerOpen, setIsModulesManagerOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetConfirmName, setResetConfirmName] = useState('');
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<'pointer' | 'hand' | 'text' | 'section'>('pointer');
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isNewWorkflowOpen, setIsNewWorkflowOpen] = useState(false);
  const [isUserWorkflowsOpen, setIsUserWorkflowsOpen] = useState(false);
  const [isWorkflowLibraryOpen, setIsWorkflowLibraryOpen] = useState(false);
  const [canvasSettings, setCanvasSettings] = useState({ width: 1920, height: 1080, name: 'FHD (16:9)' });
  const [loadedMoodboardId, setLoadedMoodboardId] = useState<string | null>(null);
  const [drawingState, setDrawingState] = useState<{ active: boolean; start: { x: number; y: number }; current: { x: number; y: number } }>({
    active: false,
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 }
  });

  // Performance: Memoize selection lookups
  const selectedNodes = useMemo(() => nodes.filter(n => n.selected), [nodes]);
  const selectedNodesCount = selectedNodes.length;
  const singleSelectedNode = selectedNodes.length === 1 ? selectedNodes[0] : null;

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---

  // Load nodes/edges when a new moodboard is selected
  useEffect(() => {
    if (selectedMoodboard?.id !== loadedMoodboardId) {
      if (selectedMoodboard) {
        const initialNodes = (selectedMoodboard.nodes || []).map((node: any) => ({
          ...node,
          data: { ...node.data, onChange: updateNodeData },
          selected: false,
        }));
        // Migrate old handle IDs (l/r/t/b) to typed port IDs
        const initialEdges = (selectedMoodboard.edges || []).map((edge: any) => {
          const legacySourceMap: Record<string, string> = { r: 'text_out', b: 'text_out' };
          const legacyTargetMap: Record<string, string> = { l: 'text_in', t: 'text_in' };
          return {
            ...edge,
            sourceHandle: legacySourceMap[edge.sourceHandle] ?? edge.sourceHandle,
            targetHandle: legacyTargetMap[edge.targetHandle] ?? edge.targetHandle,
          };
        });

        setNodes(initialNodes);
        setEdges(initialEdges);

        boardHistory.setHistory([{ nodes: initialNodes, edges: initialEdges }]);
        boardHistory.setHistoryIndex(0);
        boardHistory.historyIndexRef.current = 0;
        lastSavedStateRef.current = JSON.stringify({ nodes: initialNodes, edges: initialEdges });

        setHasUnsavedChanges(false);
        setLoadedMoodboardId(selectedMoodboard.id);
      } else {
        setNodes([]);
        setEdges([]);
        boardHistory.setHistory([]);
        boardHistory.setHistoryIndex(-1);
        boardHistory.historyIndexRef.current = -1;
        lastSavedStateRef.current = '';
        setLoadedMoodboardId(null);
      }
    }
  }, [selectedMoodboard, loadedMoodboardId, setNodes, setEdges, updateNodeData, boardHistory, lastSavedStateRef, setHasUnsavedChanges]);

  // Save to history when nodes/edges change (debounced)
  useEffect(() => {
    if (!selectedMoodboard || isApplyingHistory) return;
    const timer = setTimeout(() => saveToHistory(), 500);
    return () => clearTimeout(timer);
  }, [nodes, edges, selectedMoodboard, isApplyingHistory, saveToHistory]);

  // Update unsaved changes status
  useEffect(() => {
    if (!selectedMoodboard || isApplyingHistory) return;
    const currentState = JSON.stringify({ nodes, edges });
    if (currentState !== lastSavedStateRef.current) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges, selectedMoodboard, isApplyingHistory, setHasUnsavedChanges, lastSavedStateRef]);

  // Zen Mode Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZenMode && onToggleZenMode) onToggleZenMode();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode, onToggleZenMode]);

  // Command Palette Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- Specialized Handlers ---

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const center = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      addNodeWithTracking('image', center, { width: 340, height: 340 });
    };
    reader.readAsDataURL(file);
  }, [screenToFlowPosition, addNodeWithTracking]);

  const onAddEmoji = useCallback((emoji: string) => {
    const center = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    addNodeWithTracking('label', center, { width: 100, height: 100 });
  }, [screenToFlowPosition, addNodeWithTracking]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateCursor(e.clientX - rect.left, e.clientY - rect.top);
  }, [updateCursor]);

  const onExport = useCallback(() => {
    const flowElement = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!flowElement) return;

    toPng(flowElement, {
      backgroundColor: 'transparent',
      width: canvasSettings.width,
      height: canvasSettings.height,
      style: { transform: 'scale(1)', transformOrigin: 'top left' }
    }).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `moodboard-${brand.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Export downloaded');
    }).catch((err) => {
      console.error(err);
      toast.error('Export failed');
    });
  }, [brand.name, canvasSettings]);

  const generateBrandPrompt = useCallback(() => {
    const promptContent = `Brand Synthesis: ${brand.name}\nNodes Active: ${nodes.length}`;
    localStorage.setItem('moodBoardPrompt', promptContent);
    toast.success('Prompt synthesized!', {
      icon: <Zap size={14} strokeWidth={2.5} className="text-primary fill-primary" />
    });
  }, [nodes, brand]);

  const onShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard', { icon: <Share2 size={14} /> });
  }, []);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => [...eds, { ...params, id: `e-${params.source}-${params.target}`, animated: true }]);
  }, [setEdges]);

  const onNodesChangeCustom = useCallback((changes: any) => {
    onNodesChange(changes);
    changes.forEach((change: any) => {
      if (change.type === 'dimensions' && change.dimensions) {
        updateNodeData(change.id, {}, { width: change.dimensions.width, height: change.dimensions.height });
      }
    });
  }, [onNodesChange, updateNodeData]);

  if (!isAuthInitialized || !isDataInitialized || !activeWorkspace) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-muted/10 backdrop-blur-sm">
        <Loader2 className="animate-spin text-primary opacity-50" size={14} strokeWidth={2.5} />
      </div>
    );
  }

  if (!selectedMoodboard) {
    return (
      <MoodboardSelector
        moodboards={moodboards}
        loading={moodboardsLoading}
        onSelect={selectMoodboard}
        onCreate={createMoodboard}
        onToggleActive={toggleActive}
        onDelete={deleteMoodboard}
      />
    );
  }

  return (
    <div className="w-full h-full bg-background overflow-hidden font-mono relative" onPointerMove={handlePointerMove}>
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=IBM+Plex+Mono:wght@400;700&family=Space+Grotesk:wght@400;700&family=Roboto:wght@400;700&family=Playfair+Display:wght@400;900&family=Outfit:wght@400;700&display=swap');
                
                .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--primary-rgb), 0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(var(--primary-rgb), 0.3); }
                `}
      </style>

      <MoodBoardHeader
        flowName={selectedMoodboard?.name || 'Untitled Flow'}
        onRenameFlow={(name) => updateMoodboard({ name } as any)}
        onDuplicateFlow={() => {
          if (selectedMoodboard) {
            createMoodboard(`${selectedMoodboard.name} (Copy)`, selectedMoodboard.description);
          }
        }}
        onDeleteFlow={() => {
          if (selectedMoodboard) deleteMoodboard(selectedMoodboard.id);
        }}
        onExportJSON={onExportJSON}

        selectedNode={singleSelectedNode}
        selectedNodesCount={selectedNodesCount}
        updateNodeData={updateNodeData}
        onDeleteNode={(ids) => onNodesDelete(ids.map(id => ({ id }) as any))}
        onDuplicateNode={(nodesToDup) => nodesToDup.forEach(n => duplicateNode(n))}
        onAlignNodes={onAlignNodes}
        onCreateGroup={(nodeIds) => createGroup(nodeIds)}
        snapToGrid={snapToGrid}
        setSnapToGrid={setSnapToGrid}
        onReorganizeNodes={onReorganizeNodes}
        allNodes={nodes}

        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onOpenWorkflowLibrary={() => setIsWorkflowLibraryOpen(true)}
        onRun={() => graphExecution.isRunning ? graphExecution.abort() : graphExecution.execute()}
        isRunning={graphExecution.isRunning}
        onSave={handleManualSave}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
      />

      <BoardCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeCustom}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onNodeContextMenu={(event, node) => {
          event.preventDefault();
          setContextMenu({ id: node.id, x: event.clientX, y: event.clientY });
        }}
        onPaneClick={() => { setContextMenu(null); setQuickAddMenu(null); }}
        onPaneMouseDown={(e) => {
          if (activeTool === 'section') {
            const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
            setDrawingState({ active: true, start: flowPos, current: flowPos });
          }
        }}
        onPaneMouseMove={(e) => {
          if (drawingState.active) {
            const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
            setDrawingState(prev => ({ ...prev, current: flowPos }));
          }
        }}
        onPaneMouseUp={() => {
          if (drawingState.active) {
            const { start, current } = drawingState;
            const x = Math.min(start.x, current.x);
            const y = Math.min(start.y, current.y);
            const width = Math.abs(current.x - start.x);
            const height = Math.abs(current.y - start.y);
            if (width > 20 && height > 20) addNodeWithTracking('section', { x, y }, { width, height });
            setDrawingState({ active: false, start: { x: 0, y: 0 }, current: { x: 0, y: 0 } });
            setActiveTool('pointer');
          }
        }}
        onPaneContextMenu={(e) => { e.preventDefault(); setQuickAddMenu(null); }}
        onPaneDoubleClick={(e) => {
          const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
          addNodeWithTracking('label', flowPos);
        }}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        activeTool={activeTool}
        snapToGrid={snapToGrid}
        resolvedTheme={resolvedTheme}
        drawingState={drawingState}
        isValidConnection={isValidConnection}
      />

      <CollaborativeCursors presences={presences} />

      <NodeGroupOverlay
        groups={groups}
        onToggleCollapse={toggleCollapse}
        onUngroupNodes={ungroupNodes}
        onUpdateGroup={updateGroup}
        onDeleteGroup={deleteGroup}
      />

      <StatusBar
        nodeCount={nodes.length}
        edgeCount={edges.length}
        groupCount={groups.length}
        canvasName={canvasSettings.name}
        snapToGrid={snapToGrid}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
      />

      <MoodBoardSidebar
        isSidebarOpen={isSidebarOpen}
        isSidebarMini={isSidebarMini}
        setIsSidebarMini={setIsSidebarMini}
        isZenMode={isZenMode}
        setIsAppSidebarCollapsed={setIsAppSidebarCollapsed}
        collapsedCategories={collapsedCategories}
        toggleCategory={(category) => setCollapsedCategories(prev => {
          const next = new Set(prev);
          if (next.has(category)) next.delete(category); else next.add(category);
          return next;
        })}
        addNode={(type) => addNodeWithTracking(type)}
        setIsModulesManagerOpen={setIsModulesManagerOpen}
        onShare={onShare}
        onExport={onExport}
        browserViewMode={nodeBrowser.viewMode}
        setBrowserViewMode={nodeBrowser.setViewMode}
        browserActiveTab={nodeBrowser.activeTab}
        setBrowserActiveTab={nodeBrowser.setActiveTab}
        browserSearchQuery={nodeBrowser.searchQuery}
        setBrowserSearchQuery={nodeBrowser.setSearchQuery}
        browserSortBy={nodeBrowser.sortBy}
        setBrowserSortBy={nodeBrowser.setSortBy}
        favorites={nodeBrowser.favorites}
        toggleFavorite={nodeBrowser.toggleFavorite}
        favoriteNodes={nodeBrowser.favoriteNodes}
        recentNodes={nodeBrowser.recentNodes}
        filteredNodes={nodeBrowser.filteredNodes}
      />

      <MoodBoardSettingsPanel
        brand={brand}
        canvasSettings={canvasSettings}
        setCanvasSettings={setCanvasSettings}
        snapToGrid={snapToGrid}
        setSnapToGrid={setSnapToGrid}
        onExport={onExport}
        onGeneratePrompt={generateBrandPrompt}
        updateNodeData={updateNodeData}
        onDeleteNode={(id) => onNodesDelete([{ id } as any])}
        onDuplicateNode={(id) => {
          const node = nodes.find(n => n.id === id);
          if (node) duplicateNode(node);
        }}
        onAddNode={(type) => {
          const center = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
          addNodeWithTracking(type as any, center);
        }}
        onImageUpload={handleImageUpload}
        isOpen={isSettingsPanelOpen}
        onToggle={() => setIsSettingsPanelOpen(prev => !prev)}
      />

      <BoardModals
        isNewWorkflowOpen={isNewWorkflowOpen}
        setIsNewWorkflowOpen={setIsNewWorkflowOpen}
        handleCreateNewWorkflow={(name, desc) => {
          setNodes([]); setEdges([]); setIsSettingsPanelOpen(false);
          console.log(`Workflow created: ${name}`);
        }}
        handleManualSave={handleManualSave}
        hasUnsavedChanges={hasUnsavedChanges}
        isUserWorkflowsOpen={isUserWorkflowsOpen}
        setIsUserWorkflowsOpen={setIsUserWorkflowsOpen}
        isWorkflowLibraryOpen={isWorkflowLibraryOpen}
        setIsWorkflowLibraryOpen={setIsWorkflowLibraryOpen}
        onInjectTemplate={onInjectTemplate}
        isModulesManagerOpen={isModulesManagerOpen}
        setIsModulesManagerOpen={setIsModulesManagerOpen}
        isResetModalOpen={isResetModalOpen}
        setIsResetModalOpen={setIsResetModalOpen}
        clearCanvas={clearCanvas}
        resetConfirmName={resetConfirmName}
        setResetConfirmName={setResetConfirmName}
      />

      <QuickAddMenu
        quickAddMenu={quickAddMenu}
        setQuickAddMenu={setQuickAddMenu}
        getInstalledNodes={getInstalledNodes}
        addNode={addNode}
        screenToFlowPosition={screenToFlowPosition}
      />

      <MoodBoardContextMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        nodes={nodes}
        setNodes={setNodes}
        updateNodeData={updateNodeData}
        onNodesDelete={onNodesDelete}
        onAlignNodes={onAlignNodes}
        groups={groups}
        onCreateGroup={createGroup}
        onUngroupNodes={ungroupNodes}
        onToggleCollapse={toggleCollapse}
        onUpdateGroup={updateGroup}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onAddNode={(type) => {
          const center = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
          addNodeWithTracking(type as any, center);
        }}
        onInjectTemplate={onInjectTemplate}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        onSave={handleManualSave}
        onExport={onExport}
        onToggleZenMode={onToggleZenMode}
      />
    </div>
  );
});

const MoodBoardView = React.memo<MoodBoardViewProps>((props) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Shift') setIsShiftPressed(true); };
    const handleKeyUp = (e: KeyboardEvent) => { if (e.key === 'Shift') setIsShiftPressed(false); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); };
  }, []);

  return (
    <ReactFlowProvider>
      <MoodBoardContext.Provider value={{ brand: props.brand, isShiftPressed }}>
        <MoodBoardViewContent {...props} />
      </MoodBoardContext.Provider>
    </ReactFlowProvider>
  );
});

export default MoodBoardView;
