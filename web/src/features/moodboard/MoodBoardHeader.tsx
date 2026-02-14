import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Node, useViewport } from '@xyflow/react';
import { MoodNodeData } from './types';
import {
  ChevronDown, Pencil, Copy, Download, Trash2,
  Grid3X3, LayoutGrid, Lock, Unlock, ToggleLeft, ToggleRight,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  Group, Undo2, Redo2, Library, Play, Square, Save, Check, Loader2
} from 'lucide-react';

// ─── Props ───────────────────────────────────────────────────────────────────

interface MoodBoardHeaderProps {
  // Flow identity
  flowName: string;
  onRenameFlow: (name: string) => void;
  onDuplicateFlow: () => void;
  onDeleteFlow: () => void;
  onExportJSON: () => void;

  // Contextual controls
  selectedNode: Node<MoodNodeData> | null;
  selectedNodesCount: number;
  updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
  onDeleteNode: (ids: string[]) => void;
  onDuplicateNode: (nodes: Node<MoodNodeData>[]) => void;
  onAlignNodes: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onCreateGroup: (nodeIds: string[]) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  onReorganizeNodes: (config: { type: 'rows' | 'cols'; count: number }) => void;
  allNodes: Node<MoodNodeData>[];

  // Global actions
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenWorkflowLibrary: () => void;
  onRun: () => void;
  isRunning: boolean;
  onSave: () => void;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// ─── Flow Name Dropdown (Left Section) ───────────────────────────────────────

const FlowNameDropdown: React.FC<{
  name: string;
  onRename: (name: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onExport: () => void;
}> = ({ name, onRename, onDuplicate, onDelete, onExport }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditValue(name);
  }, [name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const commitRename = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== name) {
      onRename(trimmed);
    } else {
      setEditValue(name);
    }
    setIsEditing(false);
  }, [editValue, name, onRename]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitRename();
    if (e.key === 'Escape') { setEditValue(name); setIsEditing(false); }
  };

  const menuItems = [
    { label: 'Rename', icon: Pencil, action: () => { setIsOpen(false); setIsEditing(true); } },
    { label: 'Duplicate', icon: Copy, action: () => { setIsOpen(false); onDuplicate(); } },
    { label: 'Export JSON', icon: Download, action: () => { setIsOpen(false); onExport(); } },
    { label: 'Delete', icon: Trash2, action: () => { setIsOpen(false); onDelete(); }, danger: true },
  ];

  return (
    <div className="relative flex items-center gap-1 min-w-0" ref={dropdownRef}>
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={handleKeyDown}
          className="text-[13px] font-medium bg-transparent border border-primary/40 px-1.5 py-0.5 outline-none text-foreground w-[180px]"
        />
      ) : (
        <button
          className="flex items-center gap-1 min-w-0 hover:bg-muted/40 px-2 py-1 transition-colors"
          onDoubleClick={() => setIsEditing(true)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[13px] font-medium text-foreground truncate max-w-[200px]">
            {name || 'Untitled Flow'}
          </span>
          <ChevronDown size={12} className="text-muted-foreground shrink-0" />
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border/40 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-1.5 text-[11px] transition-colors",
                (item as any).danger
                  ? "text-destructive hover:bg-destructive/10"
                  : "text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon size={12} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Contextual Controls (Center Section) ────────────────────────────────────

const ContextualControls: React.FC<{
  selectedNode: Node<MoodNodeData> | null;
  selectedNodesCount: number;
  updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
  onDeleteNode: (ids: string[]) => void;
  onDuplicateNode: (nodes: Node<MoodNodeData>[]) => void;
  onAlignNodes: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onCreateGroup: (nodeIds: string[]) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  onReorganizeNodes: (config: { type: 'rows' | 'cols'; count: number }) => void;
  allNodes: Node<MoodNodeData>[];
}> = ({
  selectedNode,
  selectedNodesCount,
  updateNodeData,
  onDeleteNode,
  onDuplicateNode,
  onAlignNodes,
  onCreateGroup,
  snapToGrid,
  setSnapToGrid,
  onReorganizeNodes,
  allNodes,
}) => {
  const { zoom } = useViewport();
  const selectedNodes = allNodes.filter(n => n.selected);

  // ── Multi-select (2+) ──
  if (selectedNodesCount >= 2) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-mono text-muted-foreground bg-primary/10 text-primary px-1.5 py-0.5 mr-1">
          {selectedNodesCount} selected
        </span>

        <div className="h-4 w-px bg-border/30 mx-1" />

        {/* Align buttons */}
        {([
          { dir: 'left' as const, icon: AlignStartVertical, tip: 'Left' },
          { dir: 'center' as const, icon: AlignCenterVertical, tip: 'Center H' },
          { dir: 'right' as const, icon: AlignEndVertical, tip: 'Right' },
          { dir: 'top' as const, icon: AlignStartHorizontal, tip: 'Top' },
          { dir: 'middle' as const, icon: AlignCenterHorizontal, tip: 'Middle' },
          { dir: 'bottom' as const, icon: AlignEndHorizontal, tip: 'Bottom' },
        ]).map(({ dir, icon: Icon, tip }) => (
          <button
            key={dir}
            onClick={() => onAlignNodes(dir)}
            className="p-1 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            title={`Align ${tip}`}
          >
            <Icon size={13} />
          </button>
        ))}

        <div className="h-4 w-px bg-border/30 mx-1" />

        <button
          onClick={() => onCreateGroup(selectedNodes.map(n => n.id))}
          className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <Group size={12} /> Group
        </button>

        <button
          onClick={() => onDeleteNode(selectedNodes.map(n => n.id))}
          className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Delete selected"
        >
          <Trash2 size={13} />
        </button>
      </div>
    );
  }

  // ── Single node selected ──
  if (selectedNode) {
    const nodeData = selectedNode.data;
    const isLocked = nodeData.isLocked ?? false;
    const isActive = nodeData.isActive !== false; // default true

    return (
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-1.5 py-0.5 uppercase tracking-wider">
          {selectedNode.type || 'node'}
        </span>

        <div className="h-4 w-px bg-border/30 mx-1" />

        <button
          onClick={() => onDuplicateNode([selectedNode])}
          className="p-1 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          title="Duplicate"
        >
          <Copy size={13} />
        </button>

        <button
          onClick={() => updateNodeData(selectedNode.id, { isLocked: !isLocked })}
          className={cn(
            "p-1 hover:bg-muted/50 transition-colors",
            isLocked ? "text-amber-500" : "text-muted-foreground hover:text-foreground"
          )}
          title={isLocked ? 'Unlock' : 'Lock'}
        >
          {isLocked ? <Lock size={13} /> : <Unlock size={13} />}
        </button>

        <button
          onClick={() => updateNodeData(selectedNode.id, { isActive: !isActive })}
          className={cn(
            "p-1 hover:bg-muted/50 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground/50"
          )}
          title={isActive ? 'Disable' : 'Enable'}
        >
          {isActive ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
        </button>

        <button
          onClick={() => onDeleteNode([selectedNode.id])}
          className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    );
  }

  // ── Nothing selected — canvas controls ──
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
        {Math.round(zoom * 100)}%
      </span>

      <div className="h-4 w-px bg-border/30 mx-1" />

      <button
        onClick={() => setSnapToGrid(!snapToGrid)}
        className={cn(
          "flex items-center gap-1 px-1.5 py-0.5 text-[10px] transition-colors",
          snapToGrid
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
        title="Snap to grid"
      >
        <Grid3X3 size={12} />
        <span className="hidden sm:inline">Snap</span>
      </button>

      <button
        onClick={() => onReorganizeNodes({ type: 'rows', count: 3 })}
        className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        title="Auto-layout"
      >
        <LayoutGrid size={12} />
        <span className="hidden sm:inline">Auto-layout</span>
      </button>
    </div>
  );
};

// ─── Global Actions (Right Section) ──────────────────────────────────────────

const GlobalActions: React.FC<{
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenWorkflowLibrary: () => void;
  onRun: () => void;
  isRunning: boolean;
  onSave: () => void;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
}> = ({ undo, redo, canUndo, canRedo, onOpenWorkflowLibrary, onRun, isRunning, onSave, hasUnsavedChanges, isSaving }) => {
  return (
    <div className="flex items-center gap-1">
      {/* History */}
      <button
        onClick={undo}
        disabled={!canUndo}
        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-25 disabled:pointer-events-none transition-colors"
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={14} />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-25 disabled:pointer-events-none transition-colors"
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo2 size={14} />
      </button>

      <div className="h-4 w-px bg-border/30 mx-0.5" />

      {/* Library */}
      <button
        onClick={onOpenWorkflowLibrary}
        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        title="Workflow Library"
      >
        <Library size={14} />
      </button>

      <div className="h-4 w-px bg-border/30 mx-0.5" />

      {/* Run */}
      <button
        onClick={onRun}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium border transition-colors",
          isRunning
            ? "border-destructive/40 text-destructive hover:bg-destructive/10"
            : "border-border/40 text-foreground hover:bg-muted/50"
        )}
      >
        {isRunning ? <Square size={11} /> : <Play size={11} />}
        {isRunning ? 'Stop' : 'Run'}
      </button>

      {/* Save */}
      <button
        onClick={onSave}
        disabled={isSaving || !hasUnsavedChanges}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium transition-colors",
          hasUnsavedChanges && !isSaving
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted/30 text-muted-foreground border border-border/30"
        )}
      >
        {isSaving ? (
          <Loader2 size={11} className="animate-spin" />
        ) : hasUnsavedChanges ? (
          <Save size={11} />
        ) : (
          <Check size={11} />
        )}
        {isSaving ? 'Saving' : hasUnsavedChanges ? 'Save' : 'Saved'}
      </button>
    </div>
  );
};

// ─── Main Header Component ───────────────────────────────────────────────────

export const MoodBoardHeader: React.FC<MoodBoardHeaderProps> = (props) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 h-11 bg-card/95 backdrop-blur-xl border-b border-border/40 flex items-center px-2 transition-all duration-300 ease-out">
      {/* Left — Flow Identity */}
      <div className="shrink-0">
        <FlowNameDropdown
          name={props.flowName}
          onRename={props.onRenameFlow}
          onDuplicate={props.onDuplicateFlow}
          onDelete={props.onDeleteFlow}
          onExport={props.onExportJSON}
        />
      </div>

      {/* Center — Contextual Controls */}
      <div className="flex-1 flex items-center justify-center min-w-0">
        <ContextualControls
          selectedNode={props.selectedNode}
          selectedNodesCount={props.selectedNodesCount}
          updateNodeData={props.updateNodeData}
          onDeleteNode={props.onDeleteNode}
          onDuplicateNode={props.onDuplicateNode}
          onAlignNodes={props.onAlignNodes}
          onCreateGroup={props.onCreateGroup}
          snapToGrid={props.snapToGrid}
          setSnapToGrid={props.setSnapToGrid}
          onReorganizeNodes={props.onReorganizeNodes}
          allNodes={props.allNodes}
        />
      </div>

      {/* Right — Global Actions */}
      <div className="shrink-0">
        <GlobalActions
          undo={props.undo}
          redo={props.redo}
          canUndo={props.canUndo}
          canRedo={props.canRedo}
          onOpenWorkflowLibrary={props.onOpenWorkflowLibrary}
          onRun={props.onRun}
          isRunning={props.isRunning}
          onSave={props.onSave}
          hasUnsavedChanges={props.hasUnsavedChanges}
          isSaving={props.isSaving}
        />
      </div>
    </div>
  );
};
