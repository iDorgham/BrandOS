import React, { useState, useCallback, useMemo, useRef, useEffect, createContext, useContext } from 'react';
import { toPng } from 'html-to-image';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
  Panel,
  NodeResizer,
  useViewport,
  useReactFlow,
  ReactFlowProvider,
  SelectionMode,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Button, Card, Input, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { NodesMarketView } from '@/features/settings/NodesMarketView';
import { MoodboardSelector } from './MoodboardSelector';
import { MoodBoardSettingsPanel } from './MoodBoardSettingsPanel';
import { useMoodboards } from '@/hooks/useMoodboards';
import { MoodBoardViewProps } from './types';
import { useAuth } from '@/contexts/AuthContext';
import {
  Plus,
  Image as ImageIcon,
  Type,
  Sparkles,
  GitBranch,
  Trash2,
  Upload,
  Edit3,
  Save,
  Settings,
  X,
  Maximize2,
  Minimize2,
  Minus,
  MousePointer2,
  Zap,
  Palette,
  Layers,
  Download,
  Share2,
  Copy,
  Heading1,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignVerticalJustifyStart as AlignTop,
  AlignVerticalJustifyCenter as AlignMiddle,
  AlignVerticalJustifyEnd as AlignBottom,
  CaseUpper,
  Grid3X3,
  SlidersHorizontal,
  Swords,
  Gauge,
  Shapes,
  Link2,
  ExternalLink,
  Activity,
  Maximize,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Target,
  Heart,
  Power,
  Lock,
  Unlock,
  Search,
  Terminal,
  Navigation,
  Hash,
  Move,
  Undo2,
  Redo2,
  CircleDot,
  Globe,
  Chrome,
  Blocks,
  Loader2,
  LogOut,
  Play,
  Square,
  BoxSelect,
  Hand,
  Music,
  CloudRain,
  Cpu,
  Database,
  Code,
  Share,
  Link,
  Smile
} from 'lucide-react';
import { BrandProfile } from '@/types';
import { generateId } from '@/utils';
import { toast } from 'sonner';

const STANDARD_NODE_WIDTH = 340;

import { usePresence, type PresenceState } from '@/hooks/usePresence';
import { useNodeManager } from '@/hooks/useNodeManager';
import { useTheme } from '@/contexts/ThemeContext';

// Custom node types
import { MoodNodeData } from './types';
import { MoodBoardContext } from './MoodBoardContext';
import { MoodBoardSidebar } from './MoodBoardSidebar';
import { MoodBoardHeader } from './MoodBoardHeader';
import {
  ImageNode, TextNode, TitleNode, ParagraphNode, TypographyNode, GridSysNode, ToneNode, CompetitorNode,
  MoodGaugeNode, IconsNode, ReferenceNode, AttributeNode, LogicNode, PresetNode, PaletteNode, TextureNode,
  NegativeNode, WeatherNode, SpotifyNode, WebRefNode, MidjourneyNode, CMSSyncNode, LabelNode, SectionNode
} from './nodes/index';
import { ModulesManager } from './components/ModulesManager';

const MoodBoardViewContent = React.memo<MoodBoardViewProps>(({ brand, setHeaderActions, setIsAppSidebarCollapsed }) => {
  const { isAuthInitialized, activeWorkspace } = useAuth();
  const { presences, updateCursor } = usePresence(`moodboard:${brand.id}`);
  const { getInstalledNodes } = useNodeManager();
  const { resolvedTheme } = useTheme();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MoodNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [connectionMode, setConnectionMode] = useState<ConnectionMode>('loose' as ConnectionMode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarMini, setIsSidebarMini] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  const [quickAddMenu, setQuickAddMenu] = useState<{ x: number; y: number } | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set(['Generative', 'Utility', 'External']));
  const [isModulesManagerOpen, setIsModulesManagerOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetConfirmName, setResetConfirmName] = useState('');

  const { selectedNode, isTextSelected } = useMemo(() => {
    const node = nodes.find(n => n.selected);
    return {
      selectedNode: node,
      isTextSelected: node && ['text', 'title', 'paragraph', 'label', 'typography'].includes(node.data.type)
    };
  }, [nodes]);

  const { screenToFlowPosition, zoomIn, zoomOut, fitView } = useReactFlow();

  // Tool System State
  const [activeTool, setActiveTool] = useState<'pointer' | 'hand' | 'text' | 'section'>('pointer');
  const [drawingState, setDrawingState] = useState<{ active: boolean; start: { x: number; y: number }; current: { x: number; y: number } }>({
    active: false,
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 }
  });
  const [snapToGrid, setSnapToGrid] = useState(true);


  const updateNodeData = useCallback((id: string, newData: Partial<MoodNodeData>, newStyle?: React.CSSProperties) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const updatedNode = { ...node, data: { ...node.data, ...newData } };
          if (newStyle) {
            updatedNode.style = { ...node.style, ...newStyle };
          }
          return updatedNode;
        }
        return node;
      })
    );
  }, [setNodes]);
  // --- Handlers ---

  // File Upload Handling
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const center = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        const newNode: Node<MoodNodeData> = {
          id: generateId(),
          type: 'image',
          position: center,
          data: {
            label: file.name,
            type: 'image',
            imageUrl: result,
            width: 300,
            height: 200,
            isLocked: false
          } as MoodNodeData,
        };
        setNodes((nds) => nds.concat(newNode));
      };
      reader.readAsDataURL(file);
    }
  }, [screenToFlowPosition, setNodes]);

  const onAddEmoji = useCallback((emoji: string) => {
    const center = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const newNode: Node<MoodNodeData> = {
      id: generateId(),
      type: 'text',
      position: center,
      data: {
        label: emoji,
        content: emoji,
        fontSize: 64,
        color: '#ffffff',
        isLocked: false,
        type: 'text'
      } as MoodNodeData,
      style: { width: 100, height: 100 },
    };
    setNodes((nds) => nds.concat(newNode));
    toast.success('Sticker added');
  }, [screenToFlowPosition, setNodes]);

  const onNodesDelete = useCallback((nodesToDelete: Node[]) => {
    setNodes((nds) => nds.filter((node) => !nodesToDelete.some((deletedNode) => deletedNode.id === node.id)));
    toast.success('Element removed from moodboard');
  }, [setNodes]);


  // Moodboard management
  const {
    moodboards,
    loading: moodboardsLoading,
    selectedMoodboard,
    createMoodboard,
    updateMoodboard,
    toggleActive,
    deleteMoodboard,
    selectMoodboard,
  } = useMoodboards(brand.id);

  // History management for undo/redo
  const [history, setHistory] = useState<Array<{ nodes: Node<MoodNodeData>[]; edges: Edge[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyIndexRef = useRef(-1);
  const isApplyingHistoryRef = useRef(false);
  const [isApplyingHistory, setIsApplyingHistory] = useState(false);

  // Sync ref with state
  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);

  useEffect(() => {
    isApplyingHistoryRef.current = isApplyingHistory;
  }, [isApplyingHistory]);

  // Manual save state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Computed states for undo/redo
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const lastSavedStateRef = useRef<string>('');

  // Save current state to history
  const saveToHistory = useCallback(() => {
    if (isApplyingHistoryRef.current) return;

    const cleanNodes = nodes.map(node => ({
      ...node,
      selected: false,
    }));

    // Check if state actually changed to prevent infinite loops/redundancy
    const currentStateString = JSON.stringify({ nodes: cleanNodes, edges });
    if (currentStateString === lastSavedStateRef.current) return;
    lastSavedStateRef.current = currentStateString;

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndexRef.current + 1);
      newHistory.push({ nodes: cleanNodes, edges: [...edges] });
      return newHistory.slice(-200);
    });

    setHistoryIndex(prev => {
      const nextIndex = prev + 1;
      return Math.min(nextIndex, 199);
    });
  }, [nodes, edges]); // Stabilized identity by using refs instead of state deps

  // Undo function
  const undo = useCallback(() => {
    if (!canUndo) return;

    const newIndex = historyIndex - 1;
    const state = history[newIndex];

    setIsApplyingHistory(true);
    // Re-inject onChange handlers so nodes remain interactive
    const restoredNodes = state.nodes.map(node => ({
      ...node,
      data: { ...node.data, onChange: updateNodeData }
    }));

    // Update ref to prevent saveToHistory from re-saving this restored state
    lastSavedStateRef.current = JSON.stringify({ nodes: state.nodes, edges: state.edges });

    setNodes(restoredNodes);
    setEdges(state.edges);
    setHistoryIndex(newIndex);
    setHasUnsavedChanges(true);

    setTimeout(() => setIsApplyingHistory(false), 500); // Wait for debounce period
  }, [canUndo, history, historyIndex, setNodes, setEdges, updateNodeData]);

  // Redo function
  /* Drag and Drop Handlers for Asset Browser */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const url = event.dataTransfer.getData('application/reactflow/url');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node<MoodNodeData> = {
        id: generateId(),
        type,
        position,
        data: {
          label: type === 'image' ? 'Dropped Asset' : `${type} node`,
          type: type as any,
          isActive: true,
          imageUrl: url
        },
      };

      setNodes((nds) => nds.concat(newNode));
      toast.success('Asset added to canvas');
    },
    [screenToFlowPosition, setNodes],
  );

  const redo = useCallback(() => {
    if (!canRedo) return;

    const newIndex = historyIndex + 1;
    const state = history[newIndex];

    setIsApplyingHistory(true);
    // Re-inject onChange handlers so nodes remain interactive
    const restoredNodes = state.nodes.map(node => ({
      ...node,
      data: { ...node.data, onChange: updateNodeData }
    }));

    // Update ref to prevent saveToHistory from re-saving this restored state
    lastSavedStateRef.current = JSON.stringify({ nodes: state.nodes, edges: state.edges });

    setNodes(restoredNodes);
    setEdges(state.edges);
    setHistoryIndex(newIndex);
    setHasUnsavedChanges(true);

    setTimeout(() => setIsApplyingHistory(false), 500); // Wait for debounce period
  }, [canRedo, history, historyIndex, setNodes, setEdges, updateNodeData]);

  // Manual save function
  const handleManualSave = useCallback(async () => {
    if (!selectedMoodboard || !hasUnsavedChanges || isSaving) return;

    try {
      setIsSaving(true);

      const nodesToSave = nodes.map(node => {
        const { onChange, ...rest } = node.data;
        return {
          ...node,
          data: rest,
          selected: false,
        };
      });

      const edgesToSave = edges.map(edge => ({
        ...edge,
        selected: false,
      }));

      await updateMoodboard({
        ...selectedMoodboard,
        nodes: nodesToSave,
        edges: edgesToSave,
        updatedAt: Date.now(),
      });

      lastSavedStateRef.current = JSON.stringify({ nodes: nodesToSave, edges: edgesToSave });
      setHasUnsavedChanges(false);
      toast.success('Moodboard saved!');
    } catch (error) {
      console.error('Failed to save moodboard:', error);
      toast.error('Failed to save moodboard');
    } finally {
      setIsSaving(false);
    }
  }, [selectedMoodboard, hasUnsavedChanges, isSaving, nodes, edges, updateMoodboard]);

  const toggleCategory = useCallback((category: string) => {
    if (category === 'Orchestration') return;
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }, []);



  // Track the currently loaded moodboard ID to prevent overwriting local state on updates
  const [canvasSettings, setCanvasSettings] = useState({ width: 1920, height: 1080, name: 'FHD (16:9)' });
  const [loadedMoodboardId, setLoadedMoodboardId] = useState<string | null>(null);

  // Load nodes/edges/history when a NEW moodboard is selected
  useEffect(() => {
    if (selectedMoodboard?.id !== loadedMoodboardId) {
      if (selectedMoodboard) {
        const initialNodes = selectedMoodboard.nodes.map((node: any) => ({
          ...node,
          data: { ...node.data, onChange: updateNodeData },
          selected: false,
        }));
        const initialEdges = selectedMoodboard.edges || [];

        setNodes(initialNodes);
        setEdges(initialEdges);

        // Initialize history and sync refs
        const serialState = JSON.stringify({ nodes: initialNodes, edges: initialEdges });
        setHistory([{ nodes: initialNodes, edges: initialEdges }]);
        setHistoryIndex(0);
        historyIndexRef.current = 0;
        lastSavedStateRef.current = serialState;

        setHasUnsavedChanges(false);
        setLoadedMoodboardId(selectedMoodboard.id);
      } else {
        setNodes([]);
        setEdges([]);
        setHistory([]);
        setHistoryIndex(-1);
        historyIndexRef.current = -1;
        lastSavedStateRef.current = '';
        setLoadedMoodboardId(null);
      }
    }
  }, [selectedMoodboard, loadedMoodboardId, setNodes, setEdges, updateNodeData]);

  // Track changes and mark as unsaved
  useEffect(() => {
    if (!selectedMoodboard || isApplyingHistory) return;

    const currentState = JSON.stringify({ nodes, edges });
    if (currentState !== lastSavedStateRef.current) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges, selectedMoodboard, isApplyingHistory]);

  // Save to history when nodes/edges change (debounced)
  useEffect(() => {
    if (!selectedMoodboard || isApplyingHistory) return;

    const timer = setTimeout(() => {
      saveToHistory();
    }, 500);

    return () => clearTimeout(timer);
  }, [nodes, edges, selectedMoodboard, isApplyingHistory]); // Removed saveToHistory from deps to break loop



  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z for undo
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl+Y or Ctrl+Shift+Z for redo
      else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        redo();
      }
      // Ctrl+S for save
      else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleManualSave();
      }
      else if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        zoomIn({ duration: 300 });
      }
      else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        zoomOut({ duration: 300 });
      }
      else if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        fitView({ duration: 300, padding: 0.2 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleManualSave, zoomIn, zoomOut, fitView]);





  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const selectedNodes = nodes.filter(n => n.selected);
        if (selectedNodes.length > 0) {
          onNodesDelete(selectedNodes);
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const selectedNode = nodes.find(n => n.selected);
        if (selectedNode) {
          const newNode: Node<MoodNodeData> = {
            ...selectedNode,
            id: generateId(),
            position: { x: selectedNode.position.x + 40, y: selectedNode.position.y + 40 },
            selected: true,
          };
          setNodes((nds) => [...nds.map(n => ({ ...n, selected: false })), newNode]);
          toast.success('Node duplicated');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, onNodesDelete, setNodes]);

  const addNode = useCallback((type: MoodNodeData['type'], position?: { x: number, y: number }, dimensions?: { width: number, height: number }) => {
    const defaults: Partial<MoodNodeData> = { isActive: true };
    if (type === 'preset') defaults.variant = 'cinematic';
    if (type === 'texture') { defaults.variant = 'grainy'; defaults.intensity = 50; }
    if (type === 'palette' && brand.palette.length > 0) {
      defaults.color = brand.palette[0].hex;
      defaults.label = brand.palette[0].label;
    }
    if (type === 'negative') defaults.content = '';

    const getInitialDimensions = (nodeType: MoodNodeData['type']) => {
      switch (nodeType) {
        // Headers & Layout
        case 'title': return { width: STANDARD_NODE_WIDTH, height: 180 };
        case 'label': return { width: STANDARD_NODE_WIDTH, height: 80 };
        case 'section': return { width: STANDARD_NODE_WIDTH * 2, height: STANDARD_NODE_WIDTH };

        // Standard 1:1 Content Modules
        case 'image':
        case 'text':
        case 'negative':
        case 'spotify':
        case 'weather':
        case 'reference':
        case 'cms_sync':
        case 'logic':
        case 'tone':
        case 'texture':
        case 'icons':
        case 'grid':
        case 'mood_gauge':
          return { width: STANDARD_NODE_WIDTH, height: STANDARD_NODE_WIDTH };

        // Specialized Overflow Modules (Tall)
        case 'competitor': return { width: STANDARD_NODE_WIDTH, height: 420 };
        case 'web_ref': return { width: STANDARD_NODE_WIDTH, height: 420 };
        case 'midjourney': return { width: STANDARD_NODE_WIDTH, height: 480 };
        case 'typography': return { width: STANDARD_NODE_WIDTH, height: 460 };
        case 'palette': return { width: STANDARD_NODE_WIDTH, height: 420 };
        case 'paragraph': return { width: STANDARD_NODE_WIDTH, height: 480 };
        case 'preset': return { width: STANDARD_NODE_WIDTH, height: 200 };
        case 'attribute': return { width: STANDARD_NODE_WIDTH, height: 240 };

        default: return { width: STANDARD_NODE_WIDTH, height: STANDARD_NODE_WIDTH };
      }
    };

    const dims = dimensions || getInitialDimensions(type);

    const newNode: Node<MoodNodeData> = {
      id: generateId(),
      type,
      position: position || { x: Math.random() * 400, y: Math.random() * 300 },
      style: { width: dims.width, height: dims.height },
      zIndex: type === 'section' ? 1 : 10,
      draggable: true,
      selectable: true,
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Module`,
        type,
        ...defaults,
        isLocked: false,
        onChange: updateNodeData,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    toast.success(`${type} module initialized`);
  }, [setNodes, updateNodeData, brand.palette]);

  const onAlignNodes = useCallback((direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    const selectedNodes = nodes.filter(n => n.selected);
    if (selectedNodes.length <= 1) return;

    // Get current node dimensions for calculations
    const nodeRects = selectedNodes.map(node => {
      const width = (node as any).measured?.width ?? (node as any).width ?? parseInt(node.style?.width as string) ?? 260;
      const height = (node as any).measured?.height ?? (node as any).height ?? parseInt(node.style?.height as string) ?? 300;
      return {
        id: node.id,
        x: node.position.x,
        y: node.position.y,
        width,
        height,
        right: node.position.x + width,
        bottom: node.position.y + height,
        centerX: node.position.x + width / 2,
        centerY: node.position.y + height / 2
      };
    });

    const minX = Math.min(...nodeRects.map(r => r.x));
    const maxX = Math.max(...nodeRects.map(r => r.right));
    const minY = Math.min(...nodeRects.map(r => r.y));
    const maxY = Math.max(...nodeRects.map(r => r.bottom));
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    setNodes((nds) => nds.map(node => {
      if (!node.selected) return node;

      const rect = nodeRects.find(r => r.id === node.id);
      if (!rect) return node;

      let newPos = { ...node.position };

      switch (direction) {
        case 'left': newPos.x = minX; break;
        case 'right': newPos.x = maxX - rect.width; break;
        case 'center': newPos.x = midX - rect.width / 2; break;
        case 'top': newPos.y = minY; break;
        case 'bottom': newPos.y = maxY - rect.height; break;
        case 'middle': newPos.y = midY - rect.height / 2; break;
      }

      return { ...node, position: newPos };
    }));

    toast.info(`Aligned ${selectedNodes.length} nodes ${direction}`);
    setHasUnsavedChanges(true);
  }, [nodes, setNodes]);

  const onReorganizeNodes = useCallback((config: { type: 'rows' | 'cols', count: number }) => {
    const selectedNodes = nodes.filter(n => n.selected);
    const targetNodes = selectedNodes.length > 0 ? selectedNodes : nodes;

    if (targetNodes.length === 0) return;

    // Sort nodes: Top to Bottom, then Left to Right
    const sorted = [...targetNodes].sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x);

    const MARGIN = 40;
    const startX = sorted[0].position.x;
    const startY = sorted[0].position.y;

    // Get dimensions for all target nodes with safety fallbacks
    const nodeData = sorted.map(node => {
      const w = (node as any).measured?.width ?? (node as any).width ?? parseInt(node.style?.width as string);
      const h = (node as any).measured?.height ?? (node as any).height ?? parseInt(node.style?.height as string);
      return {
        id: node.id,
        width: !isNaN(w) && w > 0 ? w : 260,
        height: !isNaN(h) && h > 0 ? h : 300
      };
    });

    // Calculate Grid
    const numItems = sorted.length;
    let numCols = config.type === 'cols' ? config.count : Math.ceil(numItems / config.count);
    numCols = Math.max(1, numCols); // Prevent division by zero

    setNodes((nds) => {
      const newNodes = [...nds];
      let currentX = !isNaN(startX) ? startX : 0;
      let currentY = !isNaN(startY) ? startY : 0;
      let maxRowHeight = 0;

      sorted.forEach((node, index) => {
        const data = nodeData.find(d => d.id === node.id);
        const nodeIdx = newNodes.findIndex(n => n.id === node.id);

        if (nodeIdx !== -1 && data) {
          newNodes[nodeIdx] = {
            ...newNodes[nodeIdx],
            position: { x: currentX, y: currentY },
            style: { ...newNodes[nodeIdx].style, width: STANDARD_NODE_WIDTH } // Enforce standard width during reorganization
          };

          maxRowHeight = Math.max(maxRowHeight, data.height);

          // Move to next cell
          if ((index + 1) % numCols === 0) {
            currentX = !isNaN(startX) ? startX : 0;
            currentY += maxRowHeight + MARGIN;
            maxRowHeight = 0;
          } else {
            currentX += data.width + MARGIN;
          }
        }
      });

      return newNodes;
    });

    toast.info(`Reorganized ${targetNodes.length} nodes into ${config.count} ${config.type}`);
    setHasUnsavedChanges(true);
  }, [nodes, setNodes]);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu({
        id: node.id,
        x: event.clientX,
        y: event.clientY,
      });
    },
    [setContextMenu]
  );

  const onPaneContextMenu = useCallback((event: any) => {
    event.preventDefault();
    setQuickAddMenu(null);
  }, []);

  const onPaneDoubleClick = useCallback((event: React.MouseEvent) => {
    // We only want to trigger on the pane itself, not on nodes
    if ((event.target as HTMLElement).classList.contains('react-flow__pane')) {
      const flowPos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      addNode('label', flowPos);
    }
  }, [screenToFlowPosition, addNode]);

  const onPaneClick = useCallback((e: React.MouseEvent) => {
    setContextMenu(null);
    setQuickAddMenu(null);

    if (activeTool === 'text') {
      const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      addNode('label', flowPos);
      setActiveTool('pointer');
    }
  }, [activeTool, screenToFlowPosition, addNode]);

  const onPaneMouseDown = useCallback((e: React.MouseEvent) => {
    if (activeTool === 'section' && (e.target as HTMLElement).classList.contains('react-flow__pane')) {
      const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      setDrawingState({ active: true, start: flowPos, current: flowPos });
    }
  }, [activeTool, screenToFlowPosition]);

  const onPaneMouseMove = useCallback((e: React.MouseEvent) => {
    if (drawingState.active) {
      const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      setDrawingState(prev => ({ ...prev, current: flowPos }));
    }
  }, [drawingState.active, screenToFlowPosition]);

  const onPaneMouseUp = useCallback(() => {
    if (drawingState.active) {
      const { start, current } = drawingState;
      const x = Math.min(start.x, current.x);
      const y = Math.min(start.y, current.y);
      const width = Math.abs(current.x - start.x);
      const height = Math.abs(current.y - start.y);

      if (width > 20 && height > 20) {
        addNode('section', { x, y }, { width, height });
      }

      setDrawingState({ active: false, start: { x: 0, y: 0 }, current: { x: 0, y: 0 } });
      setActiveTool('pointer');
    }
  }, [drawingState, addNode]);

  // Node types configuration
  const nodeTypes = useMemo(() => ({
    image: ImageNode,
    text: TextNode,
    title: TitleNode,
    paragraph: ParagraphNode,
    typography: TypographyNode,
    grid: GridSysNode,
    tone: ToneNode,
    competitor: CompetitorNode,
    mood_gauge: MoodGaugeNode,
    icons: IconsNode,
    reference: ReferenceNode,
    attribute: AttributeNode,
    texture: TextureNode,
    logic: LogicNode,
    negative: NegativeNode,
    palette: PaletteNode,
    preset: PresetNode,
    weather: WeatherNode,
    spotify: SpotifyNode,
    web_ref: WebRefNode,
    midjourney: MidjourneyNode,
    cms_sync: CMSSyncNode,
    section: SectionNode,
    label: LabelNode
  }), []);

  const onNodesChangeCustom = useCallback((changes: any) => {
    onNodesChange(changes);

    // Sync dimensions back into style property when resized via handle
    changes.forEach((change: any) => {
      if (change.type === 'dimensions' && change.dimensions) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === change.id) {
              return {
                ...node,
                style: {
                  ...node.style,
                  width: change.dimensions.width,
                  height: change.dimensions.height,
                }
              };
            }
            return node;
          })
        );
      }
    });
  }, [onNodesChange, setNodes]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  }, [setEdges]);

  const onEdgesDelete = useCallback((edgesToDelete: Edge[]) => {
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.some((deletedEdge) => deletedEdge.id === edge.id)));
    toast.success('Logic stream severed');
  }, [setEdges]);

  const generateBrandPrompt = useCallback(() => {
    // Filter active nodes for synthesis
    const activeNodes = nodes.filter(n => n.data.isActive !== false);

    const getConnectedNodes = (nodeId: string) => {
      const connected = new Set<string>();
      const queue = [nodeId];
      while (queue.length > 0) {
        const current = queue.shift()!;
        edges.forEach(edge => {
          if (edge.source === current && !connected.has(edge.target)) {
            connected.add(edge.target);
            queue.push(edge.target);
          }
          if (edge.target === current && !connected.has(edge.source)) {
            connected.add(edge.source);
            queue.push(edge.source);
          }
        });
      }
      return Array.from(connected).map(id => activeNodes.find(n => n.id === id)).filter(Boolean) as Node<MoodNodeData>[];
    };

    const visited = new Set<string>();
    const relationalGroups: string[] = [];

    activeNodes.forEach(node => {
      if (!visited.has(node.id)) {
        const cluster = getConnectedNodes(node.id);
        if (cluster.length > 0) {
          cluster.forEach(n => visited.add(n.id));
          visited.add(node.id); // Also mark seeds
          const groupDesc = [node, ...cluster].map(n => {
            const d = n.data;
            if (d.type === 'preset') return `Preset(${d.variant})`;
            if (d.type === 'texture') return `Surface(${d.variant}, ${d.intensity}%)`;
            if (d.type === 'palette') return `Color(${d.color})`;
            if (d.type === 'negative') return `FORBIDDEN(${d.content})`;
            return d.label;
          }).join(' â†” ');
          relationalGroups.push(`[Relational DNA Group]: ${groupDesc}`);
        }
      }
    });

    const solitaryNodes = nodes.filter(n => !visited.has(n.id));

    const promptContent = `
      Brand Synthesis: ${brand.name}
      Doctrine: ${brand.doctrine}
      
      Relational DNA Logic:
      ${relationalGroups.join('\n')}

      Global Context:
      ${solitaryNodes.map(n => {
      const d = n.data;
      if (d.type === 'image') return `- ${d.label}: Image analysis injected`;
      if (d.type === 'text') return `- Narrative: ${d.content || d.label}`;
      if (d.type === 'attribute') return `- Trait: ${d.color || d.style || d.label}`;
      if (d.type === 'logic') return `- Logic Gate: ${d.label}`;
      if (d.type === 'preset') return `- Aesthetic: ${d.variant}`;
      if (d.type === 'texture') return `- Material: ${d.variant} (${d.intensity}%)`;
      if (d.type === 'palette') return `- Color Anchor: ${d.color}`;
      if (d.type === 'negative') return `- DNA Constraint: ${d.content}`;
      if (d.type === 'title') return `- Heading: ${d.content}`;
      if (d.type === 'paragraph') return `- Detail: ${d.content}`;
      if (d.type === 'typography') return `- Typography: ${d.fontFamily} (${d.fontWeight}, ${d.fontSize}px)`;
      if (d.type === 'grid') return `- Grid System: ${d.gridCols} columns, ${d.gap}px gap`;
      if (d.type === 'tone') return `- Brand Tone: ${d.toneValue}% (Clinical to Visceral)`;
      if (d.type === 'competitor') return `- Competitor: ${d.competitorName} (Market Share: ${d.marketShare}%)`;
      if (d.type === 'mood_gauge') return `- Aesthetic Energy: ${d.moodLevel}% intensity`;
      if (d.type === 'icons') return `- Iconography: Glyph set active with weighted profiles`;
      if (d.type === 'reference') return `- Reference: ${d.linkTitle} (${d.linkUrl})`;
      return `- ${d.label}`;
    }).join('\n')}
    `;

    localStorage.setItem('moodBoardPrompt', promptContent);
    toast.success('Prompt synthesized! Head to Studio for deployment.', {
      icon: <Zap className="text-primary fill-primary" />
    });
  }, [nodes, brand]);

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    toast.success('Moodboard reset');
  }, [setNodes, setEdges]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateCursor(e.clientX - rect.left, e.clientY - rect.top);
  }, [updateCursor]);

  const onExport = useCallback(() => {
    // Select the flow container
    const flowElement = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!flowElement) return;

    toPng(flowElement, {
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background').trim() ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--background')})` : '#background',
      width: canvasSettings.width,
      height: canvasSettings.height,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      }
    }).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `moodboard-${brand.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Export downloaded');
    }).catch((err) => {
      console.error(err);
      toast.error('Export matrix failed');
    });
  }, [brand.name, canvasSettings.width, canvasSettings.height]);

  const onExportJSON = useCallback(() => {
    const exportData = {
      brand: brand.name,
      exportedAt: new Date().toISOString(),
      canvas: {
        width: canvasSettings.width,
        height: canvasSettings.height,
      },
      workflow: {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
          // Use measured dimensions for final layout accuracy
          width: Math.round((node as any).measured?.width || node.style?.width || (node as any).width || 260),
          height: Math.round((node as any).measured?.height || node.style?.height || (node as any).height || 300),
          zIndex: node.zIndex,
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type,
          animated: edge.animated,
        })),
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `moodboard-workflow-${brand.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Workflow JSON exported');
  }, [brand.name, nodes, edges, canvasSettings]);

  const onShare = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Moodboard state copied to clipboard', {
      icon: <Share2 size={14} />
    });
  }, []);

  // Header actions are now handled locally in the ActionToolbar
  useEffect(() => {
    setHeaderActions(null);
    return () => setHeaderActions(null);
  }, [setHeaderActions]);

  // Header actions are now rendered locally in the canvas area
  useEffect(() => {
    return () => setHeaderActions(null);
  }, [setHeaderActions]);



  return (
    <div className="w-full h-full bg-background overflow-hidden font-mono relative">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=IBM+Plex+Mono:wght@400;700&family=Space+Grotesk:wght@400;700&family=Roboto:wght@400;700&family=Playfair+Display:wght@400;900&family=Outfit:wght@400;700&display=swap');
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(var(--primary-rgb), 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(var(--primary-rgb), 0.3);
          }
        `}
      </style>
      {/* Show MoodboardSelector when no moodboard is selected */}
      {!selectedMoodboard ? (
        <MoodboardSelector
          moodboards={moodboards}
          loading={moodboardsLoading}
          onSelect={selectMoodboard}
          onCreate={createMoodboard}
          onToggleActive={toggleActive}
          onDelete={deleteMoodboard}
        />
      ) : (


        <>




          {/* Integrated Agency Top Bar - The "Unified Chrome" */}
          {/* Integrated Agency Top Bar - The "Unified Chrome" */}
          <MoodBoardHeader
            onBack={() => selectMoodboard(null)}
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            onSave={handleManualSave}
            hasUnsavedChanges={hasUnsavedChanges}
            isSaving={isSaving}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            snapToGrid={snapToGrid}
            setSnapToGrid={setSnapToGrid}
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            onAddEmoji={onAddEmoji}
            onExportJSON={onExportJSON}
            selectedNodesCount={nodes.filter(n => n.selected).length}
            onAlignNodes={onAlignNodes}
            onReorganizeNodes={onReorganizeNodes}
          />

          {/* Quick Add Menu */}
          {
            quickAddMenu && (
              <div
                className="fixed z-[100] w-64 bg-card/95 backdrop-blur-xl border border-border/40 shadow-2xl p-1 animate-in fade-in zoom-in-95 duration-200"
                style={{ left: quickAddMenu.x, top: quickAddMenu.y }}
              >
                <div className="px-3 py-2 border-b border-border/20 flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Quick_Add_Injector</span>
                  <Search size={10} className="opacity-40" />
                </div>
                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                  {['Foundation', 'Orchestration', 'Generative', 'Utility', 'External'].map(category => {
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
                            <div className="w-6 h-6 flex items-center justify-center bg-card border border-border/20 group-hover:border-primary/40 transition-colors">
                              <tool.icon size={10} className="group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest group-hover:text-foreground transition-colors">{tool.label}</span>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          }

          {/* Right-Side Settings Panel (Inspector) */}
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
          />

          {/* Modules Manager Window (Integrated SaaS Aesthetic) */}
          <ModulesManager
            isOpen={isModulesManagerOpen}
            onClose={() => setIsModulesManagerOpen(false)}
          />

          {/* Reset Confirmation Modal */}
          {
            isResetModalOpen && (
              <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                  onClick={() => setIsResetModalOpen(false)}
                />
                <div className="relative w-full max-w-md bg-card border border-rose-500/30 rounded-none shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                  {/* Warning Header */}
                  <div className="bg-rose-500/10 border-b border-rose-500/20 px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-rose-500/20 border border-rose-500/40">
                      <Trash2 size={16} className="text-rose-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-rose-500">Critical_Warning</h3>
                      <p className="text-[10px] font-mono text-rose-500/60 uppercase">Canvas Protocol Termination</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <p className="text-[11px] text-muted-foreground leading-relaxed uppercase tracking-tight">
                        You are about to <span className="text-foreground font-bold">PURGE</span> all nodes and edges from this moodboard. This action cannot be undone by normal means.
                      </p>
                      <div className="p-3 bg-muted/30 border-l-2 border-rose-500/50">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase leading-tight">
                          Type <span className="text-foreground font-black tracking-widest select-all">{selectedMoodboard?.name}</span> below to authorize the reset.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Input
                        autoFocus
                        value={resetConfirmName}
                        onChange={(e) => setResetConfirmName(e.target.value)}
                        placeholder="ENTER MOODBOARD NAME"
                        className="h-11 bg-muted/40 border-border/50 rounded-none font-mono text-xs tracking-widest shadow-inner placeholder:opacity-20 uppercase"
                      />

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsResetModalOpen(false);
                            setResetConfirmName('');
                          }}
                          className="flex-1 h-10 text-[9px] font-black tracking-widest uppercase border-transparent"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={resetConfirmName !== selectedMoodboard?.name}
                          onClick={() => {
                            clearCanvas();
                            setIsResetModalOpen(false);
                            setResetConfirmName('');
                          }}
                          className="flex-[1.5] h-10 text-[9px] font-black tracking-widest uppercase shadow-[0_0_20px_rgba(244,63,94,0.15)] disabled:opacity-20"
                        >
                          Authorize Purge
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Footer Decor */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
                </div>
              </div>
            )
          }

          {/* Background Decor */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* Cursors Layer */}
          {
            Object.values(presences).map((presence: PresenceState) => (
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
            ))
          }

          {/* Canvas Area (Removed internal header) */}
          <div className={`
            absolute inset-0 
            ${activeTool === 'hand' ? 'cursor-grab active:cursor-grabbing' : ''}
            ${activeTool === 'text' ? 'cursor-text' : ''}
            ${activeTool === 'section' ? 'cursor-crosshair' : ''}
            ${activeTool === 'pointer' ? 'cursor-default' : ''}
          `} onPointerMove={handlePointerMove}>
            {/* Floating Sidebar (Tools) - Carbon Design System */}
            <MoodBoardSidebar
              isSidebarOpen={isSidebarOpen}
              isSidebarMini={isSidebarMini}
              setIsSidebarMini={setIsSidebarMini}
              setIsAppSidebarCollapsed={setIsAppSidebarCollapsed}
              collapsedCategories={collapsedCategories}
              toggleCategory={toggleCategory}
              addNode={(type) => addNode(type)}
              setIsModulesManagerOpen={setIsModulesManagerOpen}
              onShare={onShare}
              onExport={onExport}
            />
            {/* Flow Canvas */}
            <div className="absolute inset-0 cursor-crosshair">
              {(!isAuthInitialized || !activeWorkspace) ? (
                <div className="flex items-center justify-center h-full w-full bg-muted/10 backdrop-blur-sm">
                  <Loader2 className="animate-spin text-primary opacity-50" size={32} />
                </div>
              ) : (
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChangeCustom}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onNodesDelete={onNodesDelete}
                  onEdgesDelete={onEdgesDelete}
                  onNodeContextMenu={onNodeContextMenu}
                  onPaneClick={onPaneClick}
                  onMouseDown={onPaneMouseDown}
                  onMouseMove={onPaneMouseMove}
                  onMouseUp={onPaneMouseUp}
                  onPaneContextMenu={onPaneContextMenu}
                  onDoubleClick={onPaneDoubleClick}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onEdgeDoubleClick={(_, edge) => onEdgesDelete([edge])}
                  nodeTypes={nodeTypes}
                  connectionMode={ConnectionMode.Loose}
                  selectionOnDrag={activeTool === 'pointer'}
                  panOnDrag={activeTool === 'hand' ? [0, 1, 2] : false}
                  selectionMode={SelectionMode.Full}
                  defaultViewport={{ x: 0, y: 0, zoom: 0.92 }}
                  snapToGrid={snapToGrid}
                  snapGrid={[16, 16]}
                  proOptions={{ hideAttribution: true }}
                  defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: 'hsl(var(--primary))', strokeWidth: 3, opacity: 1 },
                    markerEnd: { type: 'arrowclosed', color: 'hsl(var(--primary))' },
                  }}
                >
                  <Background
                    color={resolvedTheme === 'dark' ? '#525252' : '#8d8d8d'}
                    gap={20}
                    size={1}
                  />
                  <Controls className="!bg-card/80 !backdrop-blur-md !border-border !shadow-2xl opacity-40 hover:opacity-100 transition-opacity" />

                  {/* Drawing Preview Overlay */}
                  {drawingState.active && (
                    <Panel position="top-left" style={{ pointerEvents: 'none', width: '100%', height: '100%', zIndex: 1000, margin: 0 }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: Math.min(drawingState.start.x, drawingState.current.x),
                          top: Math.min(drawingState.start.y, drawingState.current.y),
                          width: Math.abs(drawingState.current.x - drawingState.start.x),
                          height: Math.abs(drawingState.current.y - drawingState.start.y),
                          border: '1px solid var(--cds-link-01)',
                          backgroundColor: 'rgba(15, 98, 254, 0.1)',
                          pointerEvents: 'none',
                          boxShadow: '0 0 20px rgba(15, 98, 254, 0.2)',
                          backdropFilter: 'blur(1px)',
                        }}
                      />
                    </Panel>
                  )}
                </ReactFlow>
              )}
            </div>
          </div>

          {/* Context Menu */}
          {
            contextMenu && (
              <div
                className="fixed z-[1000] bg-secondary border border-border rounded-sm p-1 min-w-[140px] animate-in fade-in duration-200"
                style={{ top: contextMenu.y, left: contextMenu.x }}
              >
                <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Thematic Override</div>
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/20">
                  {[
                    { id: 'blue', color: 'bg-blue-600' },
                    { id: 'amber', color: 'bg-amber-500' },
                    { id: 'emerald', color: 'bg-emerald-600' },
                    { id: 'fuchsia', color: 'bg-fuchsia-600' },
                    { id: 'slate', color: 'bg-slate-500' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        const node = nodes.find(n => n.id === contextMenu.id);
                        if (node) updateNodeData(node.id, { customColor: c.color });
                        setContextMenu(null);
                      }}
                      className={`w-4 h-4 rounded-full ${c.color} border border-white/10 hover:scale-125 transition-transform`}
                    />
                  ))}
                </div>

                <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Layering</div>
                <button
                  onClick={() => {
                    setNodes((nds) => {
                      const maxZ = Math.max(...nds.map((n) => n.zIndex || 0));
                      return nds.map((node) => {
                        if (node.id === contextMenu.id) {
                          return { ...node, zIndex: maxZ + 1 };
                        }
                        return node;
                      });
                    });
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
                >
                  <Maximize2 size={12} /> Bring to Front
                </button>
                <button
                  onClick={() => {
                    setNodes((nds) => {
                      const minZ = Math.min(...nds.map((n) => n.zIndex || 0));
                      return nds.map((node) => {
                        if (node.id === contextMenu.id) {
                          return { ...node, zIndex: minZ - 1 };
                        }
                        return node;
                      });
                    });
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
                >
                  <Minimize2 size={12} /> Send to Back
                </button>

                {nodes.filter(n => n.selected).length > 1 && (
                  <>
                    <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Alignment</div>
                    <div className="grid grid-cols-6 gap-1 px-3 py-2">
                      <button onClick={() => { onAlignNodes('left'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Left"><AlignLeft size={12} /></button>
                      <button onClick={() => { onAlignNodes('center'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Center"><AlignCenter size={12} /></button>
                      <button onClick={() => { onAlignNodes('right'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Right"><AlignRight size={12} /></button>
                      <button onClick={() => { onAlignNodes('top'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Top"><AlignTop size={12} /></button>
                      <button onClick={() => { onAlignNodes('middle'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Middle"><AlignMiddle size={12} /></button>
                      <button onClick={() => { onAlignNodes('bottom'); setContextMenu(null); }} className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-sm border border-border/10" title="Align Bottom"><AlignBottom size={12} /></button>
                    </div>
                  </>
                )}

                <button
                  onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                      const newLocked = !node.data.isLocked;
                      setNodes((nds) =>
                        nds.map((n) => {
                          if (n.id === contextMenu.id) {
                            return {
                              ...n,
                              draggable: !newLocked,
                              selectable: true, // Always selectable so we can unlock it
                              data: { ...n.data, isLocked: newLocked }
                            };
                          }
                          return n;
                        })
                      );
                      toast.info(newLocked ? 'Layer Locked' : 'Layer Unlocked');
                    }
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
                >
                  {nodes.find(n => n.id === contextMenu.id)?.data.isLocked ? <Unlock size={12} /> : <Lock size={12} />}
                  {nodes.find(n => n.id === contextMenu.id)?.data.isLocked ? "Unlock Layer" : "Lock Layer"}
                </button>
                <div className="px-3 py-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest border-t border-border/20 mt-1 pt-1">Operations</div>

                <button
                  onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                      const newName = prompt("Rename Module Logic:", node.data.label);
                      if (newName) updateNodeData(node.id, { label: newName });
                    }
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
                >
                  <Edit3 size={12} /> Rename
                </button>
                <button
                  onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                      updateNodeData(node.id, { isActive: node.data.isActive === false ? true : false });
                    }
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
                >
                  <Power size={12} className={nodes.find(n => n.id === contextMenu.id)?.data.isActive === false ? "text-rose-500" : "text-emerald-500"} />
                  {nodes.find(n => n.id === contextMenu.id)?.data.isActive === false ? "Enable System" : "Disable System"}
                </button>
                <button
                  onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) {
                      const newNode: Node<MoodNodeData> = {
                        ...node,
                        id: generateId(),
                        position: { x: node.position.x + 30, y: node.position.y + 30 },
                        selected: true,
                      };
                      setNodes((nds) => [...nds.map(n => ({ ...n, selected: false })), newNode]);
                      toast.success('System module duplicated');
                    }
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-[11px] font-normal"
                >
                  <Copy size={12} /> Duplicate
                </button>
                <button
                  onClick={() => {
                    const node = nodes.find(n => n.id === contextMenu.id);
                    if (node) onNodesDelete([node]);
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-none text-rose-500 hover:bg-rose-500/10 transition-colors text-[11px] font-normal"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            )
          }
        </>
      )
      }
    </div >
  );
});


const MoodBoardView = React.memo<MoodBoardViewProps>((props) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <MoodBoardContext.Provider value={{ brand: props.brand, isShiftPressed }}>
          <MoodBoardViewContent {...props} />
        </MoodBoardContext.Provider>
      </ReactFlowProvider>
    </div>
  );
});

export default MoodBoardView;
