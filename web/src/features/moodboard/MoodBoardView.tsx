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
  type ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Button, Card, Input, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { NodesMarketView } from '@/features/settings/NodesMarketView';
import { MoodboardSelector } from './MoodboardSelector';
import { MoodBoardSettingsPanel } from './MoodBoardSettingsPanel';
import { useMoodboards } from '@/hooks/useMoodboards';
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
import { usePresence, type PresenceState } from '@/hooks/usePresence';
import { useNodeManager } from '@/hooks/useNodeManager';
import { useTheme } from '@/contexts/ThemeContext';

// Custom node types
export interface MoodNodeData extends Record<string, unknown> {
  label: string;
  type: 'image' | 'text' | 'attribute' | 'logic' | 'preset' | 'palette' | 'texture' | 'negative' | 'title' | 'paragraph' | 'typography' | 'grid' | 'tone' | 'competitor' | 'mood_gauge' | 'icons' | 'reference' | 'label' | 'section' | 'midjourney' | 'weather' | 'spotify' | 'web_ref' | 'cms_sync';
  content?: string;
  imageUrl?: string;
  color?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: number;
  letterSpacing?: string;
  lineHeight?: string;
  gridRows?: number;
  gridCols?: number;
  gap?: number;
  toneValue?: number;
  competitorName?: string;
  marketShare?: number;
  moodLevel?: number;
  iconSet?: string[];
  linkUrl?: string;
  linkTitle?: string;
  variant?: string;
  intensity?: number;
  isActive?: boolean;
  isLocked?: boolean;
  onChange?: (id: string, newData: Partial<MoodNodeData>, newStyle?: React.CSSProperties) => void;
}

const CustomHandle = ({ type, position, id, className, nodeColor }: { type: 'source' | 'target', position: Position, id?: string, className?: string, nodeColor?: string }) => {
  const colorClass = nodeColor ? nodeColor.replace('bg-', '') : 'primary';
  return (
    <div className={`absolute z-50 group/handle ${position === Position.Top || position === Position.Bottom ? 'w-full h-8 left-0' : 'h-full w-8 top-0'} flex items-center justify-center pointer-events-none ${position === Position.Top ? '-top-4' : position === Position.Bottom ? '-bottom-4' : position === Position.Left ? '-left-4' : '-right-4'}`}>
      <Handle
        type={type}
        position={position}
        id={id}
        className={`
          !w-2.5 !h-2.5 !border-[2px] !bg-background hover:!scale-150 transition-all duration-300 ease-in-out
          !opacity-20 group-hover/node:!opacity-50 group-hover/handle:!opacity-100 pointer-events-auto
          ${nodeColor ? `!border-${colorClass} hover:!bg-${colorClass} hover:!border-${colorClass}` : '!border-primary/60 hover:!bg-primary hover:!border-primary'}
          !rounded-none !shadow-[0_0_10px_rgba(0,0,0,0.5)]
          ${className}
        `}
      />
    </div>
  );
};

const NodeHandles = ({ nodeColor }: { nodeColor?: string }) => (
  <>
    <CustomHandle type="target" position={Position.Top} id="t" nodeColor={nodeColor} />
    <CustomHandle type="source" position={Position.Bottom} id="b" nodeColor={nodeColor} />
    <CustomHandle type="source" position={Position.Left} id="l" nodeColor={nodeColor} />
    <CustomHandle type="source" position={Position.Right} id="r" nodeColor={nodeColor} />
  </>
);

const hexToRgbForDisplay = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '---';
};



const NodeContainer = ({ children, selected, title, icon: Icon, typeColor, onEdit, isEditing, handles, resizer, data, id, hideHeaderBar }: any) => {
  const isActive = data?.isActive !== false;

  return (
    <div className={`
      relative rounded-none border transition-all duration-300 group/node
      ${selected
        ? 'border-primary shadow-[0_4px_20px_-10px_rgba(var(--primary-rgb),0.5)] z-30 ring-1 ring-primary brightness-110'
        : 'border-border bg-card/95 hover:border-primary/60 hover:shadow-lg z-10'}
      min-w-[200px] h-full w-full flex flex-col overflow-visible
      ${!isActive ? 'opacity-40 grayscale blur-[1px]' : ''}
      ${data?.isLocked ? 'cursor-default' : ''}
    `}>
      {/* CAD Corner Accents - Technical Detail */}
      <div className={`absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-primary transition-opacity duration-300 pointer-events-none z-50 ${selected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-50'}`} />
      <div className={`absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-primary transition-opacity duration-300 pointer-events-none z-50 ${selected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-50'}`} />
      <div className={`absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-primary transition-opacity duration-300 pointer-events-none z-50 ${selected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-50'}`} />
      <div className={`absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-primary transition-opacity duration-300 pointer-events-none z-50 ${selected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-50'}`} />

      {/* Internal Grid/Scanlines Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02] z-0 mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>

      {isActive && resizer}
      {isActive && handles}

      {/* Top Color Bar - Prominent Identification */}
      {!hideHeaderBar && (
        <div className={`
          h-[2px] w-full transition-all duration-300 relative overflow-hidden
          ${data.customColor || (typeColor ? typeColor : 'bg-primary')}
          ${selected ? 'opacity-100 shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]' : 'opacity-90'}
        `}>
          {selected && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
        </div>
      )}

      {/* Window Title Bar - Glassmorphic & Technical */}
      <div className={`
        flex items-center justify-between px-2 py-1.5 border-b border-border/10
        ${selected ? 'bg-primary/5' : 'bg-muted/10'}
        backdrop-blur-[1px]
        transition-colors duration-300 relative z-10
      `}>
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onChange?.(id, { isActive: !isActive });
            }}
            className={`
              p-0.5 transition-all duration-200 group/power shrink-0
              ${isActive ? 'text-primary opacity-80 hover:opacity-100' : 'text-muted-foreground/40 hover:text-muted-foreground'}
              ${data?.isLocked ? 'opacity-30 cursor-not-allowed' : ''}
            `}
            disabled={data?.isLocked}
            title={data?.isLocked ? 'Locked' : (isActive ? 'System::Deactivate' : 'System::Initialize')}
          >
            <Power size={10} strokeWidth={2.5} />
          </button>

          <div className="flex flex-col flex-1 min-w-0">
            <input
              value={data.label}
              disabled={data?.isLocked}
              onChange={(e) => data.onChange?.(id, { label: e.target.value })}
              className={`bg-transparent border-none outline-none text-[9px] font-black uppercase tracking-[0.15em] text-foreground/90 font-mono leading-tight w-full transition-colors ${data?.isLocked ? 'cursor-default' : 'hover:text-primary focus:text-primary'}`}
              onClick={(e) => e.stopPropagation()}
            />
            {selected && (
              <div className="flex items-center gap-1.5 animate-in fade-in duration-300">
                <span className="text-[5px] font-mono font-bold text-primary/60 uppercase tracking-[0.1em]">
                  MOD::{data.type?.substring(0, 3).toUpperCase() || 'SYS'}
                </span>
                <span className="text-[5px] font-mono text-muted-foreground/30 uppercase tracking-tighter">
                  ACTIVE
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className={`
            w-4 h-4 flex items-center justify-center bg-card/50 border border-border/20 shadow-sm
          `}>
            {Icon ? <Icon className={typeColor ? typeColor.replace('bg-', 'text-') : 'text-primary'} size={8} strokeWidth={2} /> : <div className="w-1 h-1 bg-primary rounded-full" />}
          </div>
          {data?.isLocked && (
            <Lock size={8} className="text-muted-foreground/40" />
          )}
          {isActive && !data?.isLocked && (
            <button
              onClick={onEdit}
              className="hover:bg-primary/10 rounded-sm transition-all text-muted-foreground/40 hover:text-primary opacity-0 group-hover/node:opacity-100"
              title="Edit"
            >
              <Edit3 size={10} />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className={`
        flex-1 flex flex-col relative overflow-visible z-10 
        ${!isActive ? 'opacity-30 pointer-events-none select-none' : ''}
      `} style={{
          fontFamily: data.fontFamily || 'inherit',
          fontSize: data.fontSize ? `${data.fontSize}px` : 'inherit',
          color: data.color || 'inherit'
        }}>
        <div className="relative z-10 flex-1 flex flex-col h-full text-[10px] text-muted-foreground/90 leading-relaxed px-0">
          {children}
        </div>

        {/* Tactical Footer - Minimized Status Bar */}
        <div className="mt-auto px-2 py-1 border-t border-border/5 flex items-center justify-between opacity-60 group-hover/node:opacity-100 transition-opacity duration-300 bg-background/30 backdrop-blur-[1px]">
          <div className="flex items-center gap-1.5">
            <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-primary animate-pulse' : 'bg-muted-foreground/20'}`} />
            <span className="text-[5px] font-mono text-muted-foreground/50 uppercase tracking-[0.1em]">
              {data.type?.toUpperCase() || 'UNKNOWN'}
            </span>
          </div>
          <span className="text-[5px] font-mono text-muted-foreground/30 uppercase tracking-[0.2em]">
            ID::{data?.id?.substring(0, 4) || 'NULL'}
          </span>
        </div>
      </div>
    </div>
  );
};

// MoodBoard Context for Node Access to Brand Profile
interface MoodBoardContextType {
  brand: BrandProfile;
}
const MoodBoardContext = createContext<MoodBoardContextType | null>(null);

const useMoodBoard = () => {
  const context = useContext(MoodBoardContext);
  if (!context) throw new Error("useMoodBoard must be used within a MoodBoardProvider");
  return context;
};

interface MoodBoardViewProps {
  brand: BrandProfile;
  setHeaderActions: (actions: React.ReactNode) => void;
  setIsAppSidebarCollapsed?: (collapsed: boolean) => void;
}

const ImageNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(data.label);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const img = new Image();
        img.onload = () => {
          const maxWidth = 500;
          const aspectRatio = img.height / img.width;
          const width = Math.min(img.width, maxWidth);
          const height = width * aspectRatio;
          const finalWidth = width;
          const finalHeight = height + 40 + 20;

          data.onChange?.(id, {
            imageUrl,
            width: img.width,
            height: img.height
          }, {
            width: finalWidth,
            height: finalHeight
          });
        };
        img.src = imageUrl;
        toast.success('DNA visual reference captured');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <NodeContainer
      selected={selected}
      title={data.label}
      icon={ImageIcon}
      typeColor="bg-blue-600"
      onEdit={() => setIsEditing(!isEditing)}
      isEditing={isEditing}
      handles={<NodeHandles nodeColor="bg-blue-600" />}
      data={{ ...data, id, type: 'image' }}
      id={id}
      resizer={
        <NodeResizer
          minWidth={120}
          minHeight={100}
          isVisible={selected}
          lineClassName="!border-primary/40"
          handleClassName="!w-2 !h-2 !bg-primary !border-background !rounded-none shadow-xl"
        />
      }
    >
      {isEditing && (
        <div className="px-3 pt-2">
          <input
            type="text"
            value={tempLabel}
            onChange={(e) => setTempLabel(e.target.value)}
            onBlur={() => { data.onChange?.(id, { label: tempLabel }); setIsEditing(false); }}
            className="w-full bg-muted/40 border-b border-primary/40 text-[10px] font-mono font-black outline-none py-1 uppercase tracking-widest"
            autoFocus
          />
        </div>
      )}
      <div
        className="relative flex-1 bg-muted overflow-hidden group/img cursor-crosshair transition-all min-h-0 flex flex-col justify-center"
        onClick={() => fileInputRef.current?.click()}
      >
        {data.imageUrl ? (
          <>
            <img src={data.imageUrl} alt={data.label} className="w-full h-full object-cover transition-all duration-700 contrast-[1.1] saturate-[0.9]" />
            {/* Viewport Overlay UI - Clean Technical */}
            <div className="absolute inset-0 border border-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300">
              <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 border border-primary/30 flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform shadow-sm">
                <Upload size={10} className="text-primary" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-foreground uppercase">INFUSE_DNA</span>
              </div>
            </div>

            {/* Technical Metadata Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/90 backdrop-blur-md border-t border-border/20 opacity-0 group-hover/img:opacity-100 transition-opacity">
              <div className="flex justify-between items-center text-[7px] font-mono text-muted-foreground tracking-widest">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span>ANALYSIS::ACTIVE_V2</span>
                </div>
                <div className="px-1.5 py-0.5 border border-border/40 bg-card/50">
                  {String(data.width)}x{String(data.height)}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 transition-all py-8">
            <div className="w-10 h-10 bg-muted/20 flex items-center justify-center border border-border/40 group-hover/img:border-primary/50 transition-all relative">
              <Upload size={14} className="text-muted-foreground/40 group-hover/img:text-primary/60" strokeWidth={1.5} />
              <div className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l border-primary/40" />
              <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r border-primary/40" />
            </div>
            <div className="space-y-0.5 text-center">
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] block uppercase text-muted-foreground/60 group-hover/img:text-primary/80 transition-colors">Capture_Ref</span>
              <span className="text-[5px] font-mono text-muted-foreground/30 block tracking-widest uppercase">Input_Stream_Ready</span>
            </div>
          </div>
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>
    </NodeContainer>
  );
});

const TextNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(data.content || '');

  return (
    <NodeContainer
      selected={selected}
      title={data.label}
      icon={Type}
      typeColor="bg-blue-600"
      onEdit={() => setIsEditing(!isEditing)}
      isEditing={isEditing}
      handles={<NodeHandles nodeColor="bg-blue-600" />}
      data={{ ...data, id, type: 'text' }}
      id={id}
      resizer={
        <NodeResizer
          minWidth={150}
          minHeight={100}
          isVisible={selected && !data.isLocked}
          lineClassName="!border-primary/30"
          handleClassName="!w-1.5 !h-1.5 !bg-primary/40 !border-background !rounded-none"
        />
      }
    >
      {isEditing ? (
        <textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={() => { data.onChange?.(id, { content: tempContent }); setIsEditing(false); }}
          className="w-full h-full bg-muted/30 rounded-none p-3 text-[10px] leading-relaxed font-medium outline-none border border-primary/20 min-h-[120px] resize-none text-foreground font-mono shadow-sm focus:bg-background/80 transition-colors"
          placeholder="INJECT BRAND NARRATIVE..."
          autoFocus
        />
      ) : (
        <div className={`p-4 h-full flex flex-col group/text overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 ${data.isLocked ? 'cursor-default' : 'cursor-text'}`} onClick={() => !data.isLocked && setIsEditing(true)}>
          <div className="flex items-center gap-1 mb-2 opacity-60 group-hover/text:opacity-90 transition-opacity">
            <div className="w-1 h-3 bg-primary" />
            <span className="text-[7px] font-mono tracking-tighter">BLOCK_TYPE::NARRATIVE</span>
          </div>
          <p className={`text-[11px] leading-relaxed transition-colors ${data.content ? 'text-foreground/80' : 'text-muted-foreground/30 italic uppercase tracking-[0.1em]'}`}>
            {data.content || 'Awaiting doctrinal flow components...'}
          </p>
          {data.content && (
            <div className="mt-4 pt-4 border-t border-border/5 flex justify-between items-center opacity-40 group-hover/text:opacity-100 transition-opacity">
              <span className="text-[6px] font-mono uppercase">Characters: {data.content.length}</span>
              <span className="text-[6px] font-mono uppercase tracking-widest text-primary">Status: Validated</span>
            </div>
          )}
        </div>
      )}
    </NodeContainer>
  );
});

const TitleNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(data.content || '');

  return (
    <NodeContainer
      selected={selected}
      title="Section"
      icon={Heading1}
      typeColor="bg-blue-600"
      onEdit={() => setIsEditing(!isEditing)}
      isEditing={isEditing}
      handles={<NodeHandles nodeColor="bg-blue-600" />}
      data={{ ...data, id, type: 'title' }}
      id={id}
      resizer={
        <NodeResizer
          minWidth={150}
          minHeight={60}
          isVisible={selected && !data.isLocked}
          lineClassName="!border-primary/30"
          handleClassName="!w-1.5 !h-1.5 !bg-primary/40 !border-background !rounded-none"
        />
      }
    >
      {isEditing ? (
        <input
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={() => { data.onChange?.(id, { content: tempContent }); setIsEditing(false); }}
          className="w-full bg-muted/30 rounded-none px-3 py-2 text-xl font-bold outline-none border border-primary/20 text-foreground font-display shadow-sm focus:bg-background/80 transition-colors uppercase"
          autoFocus
        />
      ) : (
        <div className={`p-6 h-full flex flex-col justify-center group/title ${data.isLocked ? 'cursor-default' : 'cursor-text'}`} onClick={() => !data.isLocked && setIsEditing(true)}>
          <div className="text-[7px] font-mono tracking-[0.3em] uppercase text-primary/40 mb-2 opacity-0 group-hover/title:opacity-100 transition-opacity">TITLE_ELEMENT</div>
          <h1 className={`text-2xl font-black tracking-tighter transition-all duration-500 uppercase ${data.content ? 'text-foreground' : 'text-muted-foreground/20 italic'}`}>
            {data.content || 'ADD_TITLE'}
          </h1>
          {data.content && <div className="h-0.5 w-12 bg-primary mt-4 transform origin-left scale-x-50 group-hover/title:scale-x-100 transition-transform duration-500" />}
        </div>
      )}
    </NodeContainer>
  );
});

const ParagraphNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(data.content || '');

  return (
    <NodeContainer
      selected={selected}
      title="Copy"
      icon={AlignLeft}
      typeColor="bg-blue-600"
      onEdit={() => setIsEditing(!isEditing)}
      isEditing={isEditing}
      handles={<NodeHandles nodeColor="bg-blue-600" />}
      data={{ ...data, id, type: 'paragraph' }}
      id={id}
      resizer={
        <NodeResizer
          minWidth={200}
          minHeight={120}
          isVisible={selected && !data.isLocked}
          lineClassName="!border-primary/30"
          handleClassName="!w-1.5 !h-1.5 !bg-primary/40 !border-background !rounded-none"
        />
      }
    >
      {isEditing ? (
        <textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={() => { data.onChange?.(id, { content: tempContent }); setIsEditing(false); }}
          className="w-full h-full bg-muted/30 rounded-none p-3 text-[10px] leading-relaxed font-medium outline-none border border-primary/20 min-h-[120px] resize-none text-foreground/90 shadow-sm focus:bg-background/80 transition-colors font-mono"
          placeholder="Enter comprehensive narrative detail..."
          autoFocus
        />
      ) : (
        <div className={`p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-2 ${data.isLocked ? 'cursor-default' : 'cursor-text'}`} onClick={() => !data.isLocked && setIsEditing(true)}>
          <div className="flex gap-1 mb-3 opacity-20">
            <div className="w-1 h-3 bg-slate-500" />
            <div className="w-1 h-3 bg-slate-500" />
            <div className="w-1 h-3 bg-slate-500" />
          </div>
          <p className={`text-[11px] leading-relaxed transition-all duration-500 ${data.content ? 'text-foreground/70' : 'text-muted-foreground/20 italic'}`}>
            {data.content || 'Inject detailed brand narrative and secondary messaging descriptions here to seed the linguistic generator...'}
          </p>
        </div>
      )}
    </NodeContainer>
  );
});

const TypographyNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  const families = ['IBM Plex Sans', 'IBM Plex Mono', 'Inter', 'Roboto', 'Playfair Display', 'Space Grotesk'];
  const weights = ['Regular', 'Medium', 'Bold', 'Black'];

  return (
    <NodeContainer
      selected={selected}
      title="Specimen"
      icon={CaseUpper}
      typeColor="bg-blue-600"
      handles={<NodeHandles nodeColor="bg-blue-600" />}
      data={{ ...data, id, type: 'typography' }}
      id={id}
    >
      <div className="flex flex-col gap-4 p-4 bg-muted/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 opacity-30 mb-1">
            <div className="w-1 h-3 bg-primary" />
            <span className="text-[7px] font-mono font-black uppercase tracking-[0.2em]">Font_Family_Selector</span>
          </div>
          <select
            value={data.fontFamily}
            onChange={(e) => data.onChange?.(id, { fontFamily: e.target.value })}
            className="w-full bg-background border border-border/40 px-3 py-2 text-[10px] font-mono font-black outline-none focus:border-primary/60 transition-all text-foreground uppercase tracking-widest shadow-inner"
          >
            {families.map(f => <option key={f} value={f} className="text-foreground bg-background">{f}</option>)}
          </select>
          <div className="flex gap-2">
            <select
              value={data.fontWeight}
              onChange={(e) => data.onChange?.(id, { fontWeight: e.target.value })}
              className="flex-1 bg-background border border-border/40 px-3 py-1.5 text-[9px] font-mono font-bold outline-none text-foreground uppercase tracking-wider"
            >
              {weights.map(w => <option key={w} value={w} className="text-foreground bg-background">{w}</option>)}
            </select>
            <div className="relative w-16 group/fs">
              <input
                type="number"
                value={data.fontSize || 16}
                onChange={(e) => data.onChange?.(id, { fontSize: parseInt(e.target.value) })}
                className="w-full bg-background border border-border/40 px-3 py-1.5 text-[9px] font-mono font-black outline-none text-primary"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[6px] font-mono opacity-20 pointer-events-none group-hover/fs:opacity-50 transition-opacity">PX</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card border border-border/20 relative overflow-hidden group/specimen">
          <div className="absolute top-1 left-1 w-1 h-1 bg-primary/20" />
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-primary/20" />

          <div className="flex items-center justify-center min-h-[80px] overflow-hidden">
            <span style={{
              fontFamily: data.fontFamily || 'Inter',
              fontWeight: (data.fontWeight?.toLowerCase() === 'black' ? 900 : data.fontWeight?.toLowerCase() === 'bold' ? 700 : data.fontWeight?.toLowerCase() === 'medium' ? 500 : 400),
              fontSize: `${Math.min(data.fontSize || 16, 48)}px`
            }} className="text-foreground transition-all duration-700 truncate w-full text-center tracking-tighter hover:scale-110">
              AaBbCc123
            </span>
          </div>

          <div className="absolute bottom-1 left-2 opacity-0 group-hover/specimen:opacity-100 transition-opacity">
            <span className="text-[6px] font-mono text-primary/40 uppercase">Spec_Preview_Active</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[7px] font-mono p-1">
          <div className="flex flex-col gap-1 border-l border-primary/20 pl-2">
            <span className="opacity-40 uppercase">Kerning</span>
            <span className="text-primary font-black">{data.letterSpacing || 'AUTO_OPTIMIZED'}</span>
          </div>
          <div className="flex flex-col gap-1 border-l border-primary/20 pl-2">
            <span className="opacity-40 uppercase">Leading</span>
            <span className="text-primary font-black">{data.lineHeight || '1.4_GRID'}</span>
          </div>
        </div>
      </div>
    </NodeContainer>
  );
};

const GridSysNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Grid_Array"
    icon={Grid3X3}
    typeColor="bg-blue-600"
    handles={<NodeHandles nodeColor="bg-blue-600" />}
    data={{ ...data, id, type: 'grid' }}
    id={id}
  >
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 opacity-40">
            <span className="text-[7px] uppercase font-black tracking-widest">Cols_Int</span>
          </div>
          <input
            type="number"
            value={data.gridCols || 12}
            onChange={(e) => data.onChange?.(id, { gridCols: parseInt(e.target.value) })}
            className="w-full bg-background border border-border/40 px-3 py-2 text-[10px] font-mono font-black outline-none focus:border-primary/40 shadow-inner"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 opacity-40">
            <span className="text-[7px] uppercase font-black tracking-widest">Gap_Value</span>
          </div>
          <input
            type="number"
            value={data.gap || 24}
            onChange={(e) => data.onChange?.(id, { gap: parseInt(e.target.value) })}
            className="w-full bg-background border border-border/40 px-3 py-2 text-[10px] font-mono font-black outline-none focus:border-primary/40 shadow-inner text-primary"
          />
        </div>
      </div>

      <div className="aspect-square bg-card border border-border/20 relative p-3 overflow-hidden group/gridview">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.2)_1px,transparent_1px)] bg-[length:10px_10px]" />
        </div>

        <div
          className="w-full h-full grid gap-1 relative z-10"
          style={{ gridTemplateColumns: `repeat(${data.gridCols || 12}, 1fr)` }}
        >
          {Array.from({ length: (data.gridCols || 12) }).map((_, i) => (
            <div key={i} className="h-full bg-primary/10 border-x border-primary/5 group-hover/gridview:bg-primary/20 transition-colors duration-500" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover/gridview:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono font-black bg-background/90 backdrop-blur-md px-3 py-1 border border-primary/30 shadow-2xl tracking-[0.2em] transform scale-90 group-hover/gridview:scale-100 transition-transform">
            SYSTEM_SYNC_ACTIVE
          </span>
        </div>
      </div>
    </div>
  </NodeContainer>
);

const ToneNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Frequency"
    icon={SlidersHorizontal}
    typeColor="bg-amber-500"
    handles={<NodeHandles nodeColor="bg-amber-500" />}
    data={{ ...data, id, type: 'tone' }}
    id={id}
  >
    <div className="flex flex-col gap-5 p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[7px] font-mono font-black uppercase tracking-[0.2em] px-1 opacity-50">
            <span>Precision</span>
            <span>Resonance</span>
          </div>
          <div className="relative h-8 flex items-center group/slider bg-background p-1 border border-border/20 shadow-inner">
            <input
              type="range" min="0" max="100"
              value={data.toneValue || 50}
              onChange={(e) => data.onChange?.(id, { toneValue: parseInt(e.target.value) })}
              className="w-full h-[2px] bg-muted appearance-none cursor-crosshair accent-primary relative z-10"
            />
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className={`h-1.5 w-[1px] ${i === 5 ? 'h-3 bg-primary' : 'bg-border/40'}`} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-[12px] font-mono font-black text-primary">{data.toneValue || 50}%</span>
            <span className="text-[6px] font-mono text-muted-foreground/40 uppercase tracking-tighter">OS_TONAL_BIAS</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-primary/5 border-l-2 border-primary/40 relative overflow-hidden group/analysis">
        <div className="absolute top-0 right-0 w-8 h-8 opacity-5">
          <Zap size={32} className="text-primary" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-primary/80">TONAL_HEURISTICS</span>
        </div>
        <p className="text-[9px] leading-tight text-muted-foreground font-medium uppercase tracking-tight">
          {(data.toneValue || 50) < 30 && ">> CLARITY_MODE: MINIMALIST_RESTRAINT_ACTIVE"}
          {(data.toneValue || 50) >= 30 && (data.toneValue || 50) <= 70 && ">> BALANCED_MODE: DYNAMIC_EQUILIBRIUM_FOUND"}
          {(data.toneValue || 50) > 70 && ">> HIGH_ENERGY: VISCERAL_MOMENTUM_MAX"}
        </p>
      </div>
    </div>
  </NodeContainer>
);

const CompetitorNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Comparison"
    icon={Swords}
    typeColor="bg-emerald-600"
    handles={<NodeHandles nodeColor="bg-emerald-600" />}
    data={{ ...data, id, type: 'competitor' }}
    id={id}
  >
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-1.5 px-1 border-l border-emerald-500/30">
        <span className="text-[7px] font-mono font-black uppercase opacity-40">Comp_Entity_ID</span>
        <input
          type="text"
          value={data.competitorName || ''}
          placeholder="AWAITING_ID..."
          onChange={(e) => data.onChange?.(id, { competitorName: e.target.value.toUpperCase() })}
          className="w-full bg-background border border-border/40 px-3 py-2 text-[10px] font-black outline-none placeholder:opacity-20 font-mono tracking-widest text-emerald-500 shadow-inner"
        />
      </div>

      <div className="space-y-3 bg-card border border-border/20 p-3 relative overflow-hidden">
        <div className="flex justify-between items-center text-[7px] font-mono font-bold uppercase opacity-60">
          <span>Market_Satur_Data</span>
          <span className="text-emerald-500 underline underline-offset-2">{data.marketShare || 20}%</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-background border border-border/40 overflow-hidden relative p-[1px]">
            <div className="h-full bg-emerald-500/60 relative transition-all duration-1000" style={{ width: `${data.marketShare || 20}%` }}>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px]" />
            </div>
          </div>
          <input
            type="range" min="1" max="100"
            value={data.marketShare || 20}
            onChange={(e) => data.onChange?.(id, { marketShare: parseInt(e.target.value) })}
            className="w-full h-1 appearance-none cursor-crosshair accent-emerald-500 bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 opacity-30 hover:opacity-100 transition-opacity">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        <Chrome size={12} className="text-emerald-500 cursor-pointer hover:scale-125 transition-transform" />
        <div className="flex-1 h-[1px] bg-gradient-to-r from-border via-border to-transparent" />
      </div>
    </div>
  </NodeContainer>
);

const MoodGaugeNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Pressure"
    icon={Gauge}
    typeColor="bg-fuchsia-600"
    handles={<NodeHandles nodeColor="bg-fuchsia-600" />}
    data={{ ...data, id, type: 'mood_gauge' }}
    id={id}
  >
    <div className="flex flex-col items-center gap-5 p-4 py-3">
      <div className="relative w-24 h-24 group/gauge">
        {/* Advanced Gauge Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-16 h-16 border border-fuchsia-500 rounded-full animate-[ping_3s_infinite]" />
        </div>

        <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(217,70,239,0.3)]">
          <circle cx="48" cy="48" r="40" fill="none" strokeWidth="6" className="stroke-muted/10" strokeDasharray="1, 8" />
          <circle
            cx="48" cy="48" r="40" fill="none" strokeWidth="6"
            className="stroke-fuchsia-500 transition-all duration-1000 ease-out"
            strokeDasharray={251}
            strokeDashoffset={251 - (251 * (data.moodLevel || 50)) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-mono font-black tracking-tighter text-fuchsia-500">{data.moodLevel || 50}%</span>
          <div className="flex items-center gap-1 opacity-40">
            <span className="text-[6px] font-mono uppercase tracking-[0.2em]">Flux_Cap</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <div className="flex justify-between items-center text-[7px] font-mono font-black uppercase tracking-[0.2em] opacity-40 px-1">
          <span>Static</span>
          <span>Kinetic</span>
        </div>
        <input
          type="range" min="0" max="100"
          value={data.moodLevel || 50}
          onChange={(e) => data.onChange?.(id, { moodLevel: parseInt(e.target.value) })}
          className="w-full h-1 appearance-none cursor-crosshair accent-fuchsia-500 bg-muted/20 border border-border/10"
        />

        <div className="w-full grid grid-cols-12 gap-[1px] h-3 border border-border/20 p-[1px] bg-background/50">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`h-full transition-all duration-300 ${i < Math.floor((data.moodLevel || 50) / 8) ? 'bg-fuchsia-500/80 shadow-[0_0_5px_rgba(217,70,239,0.3)]' : 'bg-muted-foreground/5'}`} />
          ))}
        </div>
      </div>
    </div>
  </NodeContainer>
);

const IconsNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Symbols"
    icon={Shapes}
    typeColor="bg-blue-600"
    handles={<NodeHandles nodeColor="bg-blue-600" />}
    data={{ ...data, id, type: 'icons' }}
    id={id}
  >
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2 py-1">
        {[Zap, Sparkles, Activity, ShieldCheck, Target, Heart].map((Icon, i) => (
          <div key={i} className="aspect-square bg-muted/30 border border-border/40 rounded-none flex items-center justify-center hover:bg-sky-500/10 hover:border-sky-500/40 transition-all cursor-pointer group/sym relative">
            <Icon size={12} className="text-muted-foreground/60 group-hover/sym:text-sky-500 transition-colors" strokeWidth={1.5} />
            <div className="absolute inset-0 opacity-0 group-hover/sym:opacity-100 pointer-events-none border-[0.5px] border-sky-500/20" />
          </div>
        ))}
      </div>
      <div className="border-t border-border/10 pt-3 flex flex-col gap-1.5">
        <span className="text-[7px] font-black tracking-widest uppercase opacity-40">GLYPH_WEIGHT</span>
        <div className="h-1 bg-muted rounded-none flex">
          <div className="h-full bg-sky-500 w-2/3" />
        </div>
      </div>
    </div>
  </NodeContainer>
);

const ReferenceNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Metadata"
    icon={Link2}
    typeColor="bg-emerald-600"
    handles={<NodeHandles nodeColor="bg-emerald-600" />}
    data={{ ...data, id, type: 'reference' }}
    id={id}
  >
    <div className="flex flex-col gap-3">
      <div className="space-y-2">
        <input
          type="text"
          value={data.linkTitle || ''}
          placeholder="REFERENCE_LABEL"
          onChange={(e) => data.onChange?.(id, { linkTitle: e.target.value.toUpperCase() })}
          className="w-full bg-muted border border-border/50 rounded-none px-2 py-1.5 text-[10px] font-black outline-none tracking-widest font-mono"
        />
        <div className="flex items-center gap-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded-none group/link">
          <div className="p-2 bg-blue-500/20 rounded-none shadow-inner">
            <Globe size={14} className="text-blue-500" />
          </div>
          <div className="flex-1 truncate">
            <input
              type="text"
              value={data.linkUrl || ''}
              placeholder="https://dna.ref.vault..."
              onChange={(e) => data.onChange?.(id, { linkUrl: e.target.value })}
              className="w-full bg-transparent border-none text-[9px] font-mono outline-none text-blue-400"
            />
          </div>
          <ExternalLink size={10} className="text-blue-500 opacity-40 group-hover/link:opacity-100 transition-opacity cursor-pointer" />
        </div>
      </div>

      <div className="p-2 bg-muted/10 border border-border/20 space-y-2 group/meta">
        <div className="flex justify-between items-center px-1">
          <span className="text-[6px] font-mono opacity-30">CRAWL_STATUS</span>
          <span className="text-[6px] font-mono text-emerald-500">INDEXED_V2</span>
        </div>
        <div className="flex gap-0.5 overflow-hidden h-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 bg-blue-500/20" />
          ))}
        </div>
      </div>
    </div>
  </NodeContainer>
);

const AttributeNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Trait"
    icon={Sparkles}
    typeColor="bg-amber-500"
    handles={<NodeHandles nodeColor="bg-amber-500" />}
    data={{ ...data, id, type: 'attribute' }}
    id={id}
  >
    <div className="flex flex-col gap-3">
      <div className="text-[11px] font-black tracking-tight uppercase group-hover/node:text-amber-500 transition-colors">{data.label}</div>
      {data.color && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-none px-3 py-2 w-full group/attr">
          <div className="w-4 h-4 rounded-none shadow-2xl group-hover/attr:scale-110 transition-transform" style={{ backgroundColor: data.color }} />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono font-black tracking-widest text-foreground/80">{data.color.toUpperCase()}</span>
            <span className="text-[6px] font-mono opacity-40 uppercase">Chrom_Vib: Active</span>
          </div>
        </div>
      )}
      <div className="flex gap-1.5 opacity-20 mt-1">
        <div className="w-3 h-[1px] bg-amber-500" />
        <div className="w-1 h-[1px] bg-amber-500" />
        <div className="w-1 h-[1px] bg-amber-500" />
      </div>
    </div>
  </NodeContainer>
);

const LogicNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Logic Gate"
    icon={GitBranch}
    typeColor="bg-amber-500"
    handles={<NodeHandles nodeColor="bg-amber-500" />}
    data={{ ...data, id, type: 'logic' }}
    id={id}
  >
    <div className="flex flex-col gap-4">
      <div className="text-[11px] font-bold tracking-tight bg-violet-500/20 border border-violet-500/40 p-2 rounded-none text-violet-400 font-mono italic">IF::BRAND_FLOW → {data.label.toUpperCase()}</div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[7px] font-black uppercase opacity-40">
          <span>Signal_Resonance</span>
          <span className="text-violet-500 text-[8px]">98.4%</span>
        </div>
        <div className="h-0.5 bg-violet-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-violet-500 w-4/5 animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-2 group/gate cursor-pointer">
        <Maximize size={10} className="text-violet-500 opacity-40 group-hover/gate:opacity-100 transition-opacity" />
        <span className="text-[7px] font-mono uppercase tracking-[0.2em] opacity-40 group-hover/gate:opacity-100 transition-opacity">Exp_Gate_Logic</span>
      </div>
    </div>
  </NodeContainer>
);

const PresetNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Aesthetic"
    icon={Zap}
    typeColor="bg-blue-600"
    handles={<NodeHandles nodeColor="bg-blue-600" />}
    data={{ ...data, id, type: 'preset' }}
    id={id}
  >
    <div className="flex flex-col gap-4 py-1">
      <div className="space-y-1.5">
        <span className="text-[7px] font-black tracking-[0.3em] uppercase opacity-40 ml-1">Preset_ID</span>
        <select
          value={data.variant}
          onChange={(e) => data.onChange?.(id, { variant: e.target.value })}
          className="w-full bg-muted border border-border/50 rounded-none px-2 py-1.5 text-[10px] font-bold outline-none font-mono text-foreground"
        >
          <option value="cinematic" className="bg-background text-foreground">CINEMATIC</option>
          <option value="minimalist" className="bg-background text-foreground">MINIMALIST</option>
          <option value="noir" className="bg-background text-foreground">NOIR_PROTOCOL</option>
          <option value="vogue" className="bg-background text-foreground">VOGUE_SYSTEM</option>
          <option value="industrial" className="bg-background text-foreground">INDUSTRIAL_V4</option>
        </select>
      </div>
      <div className="p-2 border border-sky-400/40 bg-sky-400/10 flex items-center gap-2 group/preset">
        <div className="w-1.5 h-6 bg-sky-400 group-hover:scale-y-110 transition-transform" />
        <div className="flex flex-col">
          <span className="text-[9px] font-black tracking-tighter opacity-80 uppercase">{data.variant}</span>
          <span className="text-[6px] font-mono opacity-40 italic tracking-widest">RAPID_AESTHETIC_SYNC</span>
        </div>
      </div>
    </div>
  </NodeContainer>
);

const PaletteNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  const { brand } = useMoodBoard();
  return (
    <NodeContainer
      selected={selected}
      title="Chromatic"
      icon={Palette}
      typeColor="bg-blue-600"
      handles={<NodeHandles nodeColor="bg-blue-600" />}
      data={{ ...data, id, type: 'palette' }}
      id={id}
    >
      <div className="flex flex-col gap-5 p-4">
        <div className="relative group/pal_preview">
          <div className="flex items-center gap-4 bg-muted border border-border/20 p-3 relative overflow-hidden">
            {/* Swatch Background Detail */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 rotate-45 translate-x-6 -translate-y-6 border border-primary/10" />

            <div className="w-14 h-14 rounded-none shadow-2xl transition-all duration-500 group-hover/pal_preview:rotate-3 group-hover/pal_preview:scale-110 relative z-10 border border-white/20" style={{ backgroundColor: data.color || '#fff' }} />
            <div className="flex flex-col justify-center gap-1 z-10">
              <span className="text-[14px] font-mono font-black tracking-tight text-foreground uppercase">{data.color}</span>
              <div className="flex items-center gap-2">
                <span className="text-[7px] font-mono font-bold bg-primary text-primary-foreground px-1 tracking-widest uppercase">ID::{data.color?.substring(1)}</span>
                <span className="text-[7px] font-mono text-muted-foreground/40 uppercase tracking-tighter">{hexToRgbForDisplay(data.color || '#ffffff')}</span>
              </div>
            </div>
          </div>
          {/* Decorative Corner */}
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-primary/40" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center opacity-40">
            <span className="text-[7px] font-mono font-black uppercase tracking-[0.2em]">Brand_Matrix_Sync</span>
            <div className="w-2 h-2 border border-primary/20 animate-spin" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {brand.palette.map(c => (
              <button
                key={c.id}
                onClick={() => data.onChange?.(id, { color: c.hex, label: c.label })}
                className={`
                  aspect-square border transition-all duration-200 relative
                  ${data.color === c.hex
                    ? 'border-primary ring-1 ring-primary/40 z-10 scale-105'
                    : 'border-border/20 opacity-60 hover:opacity-100 hover:border-primary/40'}
                `}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              >
                {data.color === c.hex && (
                  <div className="absolute inset-0 border-2 border-white/20 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="grid grid-cols-2 gap-4 text-[7px] font-mono opacity-40 uppercase tracking-widest">
            <div className="flex flex-col">
              <span>CONTRAST_RATIO</span>
              <span className="text-primary/70">PASSED::AA</span>
            </div>
            <div className="flex flex-col items-end">
              <span>COLOR_ENGINE</span>
              <span className="text-primary/70">MOOD_DNA_V3</span>
            </div>
          </div>
        </div>
      </div>
    </NodeContainer>
  );
};

const TextureNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Material"
    icon={Layers}
    typeColor="bg-amber-500"
    handles={<NodeHandles nodeColor="bg-amber-500" />}
    data={{ ...data, id, type: 'texture' }}
    id={id}
  >
    <div className="flex flex-col gap-4 py-1">
      <select
        value={data.variant}
        onChange={(e) => data.onChange?.(id, { variant: e.target.value })}
        className="w-full bg-muted border border-border/50 rounded-none px-2 py-1.5 text-[10px] font-bold outline-none font-mono text-foreground"
      >
        <option value="grainy" className="bg-background text-foreground">FILM_GRAIN</option>
        <option value="glossy" className="bg-background text-foreground">HIGH_GLOSS</option>
        <option value="matte" className="bg-background text-foreground">SOFT_MATTE</option>
        <option value="organic" className="bg-background text-foreground">ORGANIC_V3</option>
        <option value="chrome" className="bg-background text-foreground">CHROME_POLISH</option>
      </select>

      <div className="space-y-4 pt-1">
        <div className="space-y-1.5 px-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-70">Intensity</span>
            <span className="text-[9px] font-mono text-primary/60">{data.intensity || 50}%</span>
          </div>
          <input
            type="range" min="0" max="100"
            value={data.intensity || 50}
            onChange={(e) => data.onChange?.(id, { intensity: parseInt(e.target.value) })}
            className="w-full h-1 bg-muted rounded-none appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="aspect-[2/1] bg-muted/30 border border-border/20 rounded-none overflow-hidden relative group/material">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${data.variant === 'grainy' ? 'opacity-30' : 'opacity-10'}`} style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/60-lines.png")' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[7px] font-mono tracking-widest uppercase opacity-30 group-hover/material:opacity-80 transition-opacity decoration-primary/40 underline-offset-4">Physical_Preview</span>
        </div>
      </div>
    </div>
  </NodeContainer>
);

const NegativeNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Anti_DNA"
    icon={X}
    typeColor="bg-amber-500"
    handles={<NodeHandles nodeColor="bg-amber-500" />}
    data={{ ...data, id, type: 'negative' }}
    id={id}
  >
    <div className="space-y-4">
      <Input
        value={data.content}
        placeholder="FORBIDDEN_PROTOCOL"
        onChange={(e) => data.onChange?.(id, { content: e.target.value.toUpperCase() })}
        className="h-10 text-[11px] font-black bg-muted/30 border-border/50 rounded-none font-mono tracking-widest shadow-sm focus:border-rose-500/50 transition-colors placeholder:italic placeholder:opacity-20"
      />
      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-none space-y-2 group/neg">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-rose-500 animate-pulse" />
          <span className="text-[8px] font-black tracking-widest text-rose-500 uppercase">Constraint_Active</span>
        </div>
        <p className="text-[8px] leading-tight text-muted-foreground/60 italic font-medium">
          Explicit exclusion parameter in the generative aesthetic pipeline.
        </p>
      </div>
    </div>
  </NodeContainer>
);

const WeatherNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Atmosphere"
    icon={CloudRain}
    typeColor="bg-cyan-500"
    handles={<NodeHandles nodeColor="bg-cyan-500" />}
    data={{ ...data, id, type: 'weather' }}
    id={id}
  >
    <div className="flex flex-col gap-2 p-4 h-full">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[32px] font-black tracking-tighter text-cyan-500 leading-none">18°</span>
          <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">London, UK</span>
        </div>
        <CloudRain size={24} className="text-cyan-500/80" />
      </div>
      <div className="mt-auto space-y-2 border-t border-border/10 pt-2">
        <div className="flex justify-between text-[7px] font-mono uppercase opacity-40">
          <span>Humidity</span>
          <span>82%</span>
        </div>
        <div className="flex justify-between text-[7px] font-mono uppercase opacity-40">
          <span>Wind</span>
          <span>12km/h NW</span>
        </div>
        <div className="h-1 w-full bg-cyan-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/60 w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  </NodeContainer>
);

const SpotifyNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Sonic_Stream"
    icon={Music}
    typeColor="bg-green-500"
    handles={<NodeHandles nodeColor="bg-green-500" />}
    data={{ ...data, id, type: 'spotify' }}
    id={id}
  >
    <div className="flex flex-col h-full bg-black/20">
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden group/art bg-black/40">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center relative">
          <Music size={24} className="text-green-500/80 animate-pulse" />
          <div className="absolute inset-0 border-[0.5px] border-green-500/20 m-1" />
        </div>
        <div className="absolute bottom-2 right-2 flex gap-0.5 items-end h-4 opacity-60">
          {[1, 3, 2, 4, 2, 3, 1].map((h, i) => (
            <div key={i} className="w-0.5 bg-green-500" style={{ height: `${h * 20}%`, animation: `pulse 1s infinite ${i * 0.1}s` }} />
          ))}
        </div>
      </div>
      <div className="p-3 bg-card border-t border-border/10 space-y-1">
        <div className="h-1 bg-muted rounded-none w-full overflow-hidden">
          <div className="h-full bg-green-500 w-1/3" />
        </div>
        <div className="flex justify-between items-center text-[7px] font-mono uppercase tracking-widest opacity-60">
          <span>0:42</span>
          <span>3:14</span>
        </div>
        <div className="text-[9px] font-bold text-foreground truncate mt-1">NOCTURNAL_RHYTHMS_V2</div>
        <div className="text-[7px] font-mono text-muted-foreground uppercase opacity-60">Safe_Ty_Protocol</div>
      </div>
    </div>
  </NodeContainer>
);

const WebRefNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Web_Portal"
    icon={Globe}
    typeColor="bg-indigo-500"
    handles={<NodeHandles nodeColor="bg-indigo-500" />}
    data={{ ...data, id, type: 'web_ref' }}
    id={id}
  >
    <div className="flex flex-col h-full bg-black/10">
      <div className="flex items-center gap-2 p-2 border-b border-border/10 bg-black/20">
        <div className="flex gap-1.5 opacity-40">
          <div className="w-1 h-1 rounded-full bg-red-500" />
          <div className="w-1 h-1 rounded-full bg-yellow-500" />
          <div className="w-1 h-1 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-black/20 h-4 rounded-none border border-white/5 px-2 flex items-center text-[6px] font-mono text-muted-foreground/60 truncate">
          https://source.design.sys/ref/8821
        </div>
      </div>
      <div className="flex-1 relative group/iframe bg-black/20">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2 opacity-60 group-hover/iframe:opacity-100 transition-opacity">
          <Globe size={24} className="text-indigo-500/60" />
          <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">Active_Link_Connection</span>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.05)_50%,transparent_75%,transparent)] bg-[length:4px_4px]" />
      </div>
    </div>
  </NodeContainer>
);

const MidjourneyNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Generative_AI"
    icon={Cpu}
    typeColor="bg-fuchsia-600"
    handles={<NodeHandles nodeColor="bg-fuchsia-600" />}
    data={{ ...data, id, type: 'midjourney' }}
    id={id}
  >
    <div className="flex flex-col gap-3 p-4">
      <div className="space-y-1">
        <div className="flex justify-between text-[7px] font-mono font-black uppercase tracking-[0.2em] text-fuchsia-500 opacity-80">
          <span>Prompt_Injection</span>
          <span>Mode::V6</span>
        </div>
        <textarea
          className="w-full h-16 bg-black/20 border border-fuchsia-500/20 text-[9px] font-mono p-2 outline-none text-fuchsia-100 placeholder:text-fuchsia-900/40 resize-none focus:border-fuchsia-500/40 transition-colors"
          placeholder="/imagine prompt: a futuristic interface..."
          value={data.prompt as string || ''}
          onChange={(e) => data.onChange?.(id, { prompt: e.target.value })}
        />
      </div>
      <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-[9px] font-bold uppercase tracking-widest py-1.5 transition-colors flex items-center justify-center gap-2 group/btn">
        <Sparkles size={10} className="group-hover/btn:animate-spin" />
        <span>Execute_Generation</span>
      </button>
      <div className="text-[6px] font-mono text-center opacity-30 uppercase">
        Est. Compute Cost: 0.02 Credit
      </div>
    </div>
  </NodeContainer>
);

const CMSSyncNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Data_Sync"
    icon={Database}
    typeColor="bg-orange-500"
    handles={<NodeHandles nodeColor="bg-orange-500" />}
    data={{ ...data, id, type: 'cms_sync' }}
    id={id}
  >
    <div className="flex flex-col gap-4 p-4 items-center justify-center h-full">
      <div className="relative">
        <Database size={24} className="text-orange-500 opacity-80" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-background rounded-full border border-orange-500 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center text-[7px] font-mono uppercase opacity-60">
          <span>Sync_Status</span>
          <span className="text-green-500 font-bold">LIVE</span>
        </div>
        <div className="h-1 w-full bg-orange-500/20 overflow-hidden">
          <div className="h-full bg-orange-500 w-full animate-[progress_2s_ease-in-out_infinite]" />
        </div>
        <div className="flex justify-between items-center text-[7px] font-mono uppercase opacity-40">
          <span>Last_Packet</span>
          <span>0.02s ago</span>
        </div>
      </div>
    </div>
  </NodeContainer>
);



const LabelNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(data.label);

  return (
    <div className={`relative group/label transition-all ${selected ? 'z-50' : 'z-10'} ${data.isLocked ? 'cursor-default' : ''}`}>
      <NodeResizer
        isVisible={selected && !data.isLocked}
        minWidth={40}
        minHeight={20}
        lineClassName="!border-primary/30"
        handleClassName="!w-1.5 !h-1.5 !bg-primary/40 !border-background !rounded-none"
      />
      {isEditing ? (
        <input
          value={tempLabel}
          onChange={(e) => setTempLabel(e.target.value)}
          onBlur={() => { data.onChange?.(id, { label: tempLabel }); setIsEditing(false); }}
          className="bg-transparent border-none outline-none text-[14px] font-black uppercase tracking-[0.2em] text-foreground font-mono w-full text-center"
          autoFocus
        />
      ) : (
        <div
          className={`px-4 py-2 transition-colors text-center ${data.isLocked ? 'cursor-default' : 'cursor-text hover:bg-muted'}`}
          onDoubleClick={() => !data.isLocked && setIsEditing(true)}
        >
          <span className={`text-[14px] font-black uppercase tracking-[0.2em] font-mono ${data.label ? 'text-foreground' : 'text-muted-foreground/20 italic'}`}>
            {data.label || 'ADD_LABEL'}
          </span>
          {data.isLocked && <Lock size={10} className="inline-block ml-2 text-primary opacity-40" />}
        </div>
      )}
    </div>
  );
});

const SectionNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
  return (
    <div className={`
      w-full h-full border relative transition-all duration-500
      ${selected ? 'border-primary/60 scale-[1.002]' : 'border-border/20'}
      ${data.customColor || 'bg-card'}
      ${data.isLocked ? 'cursor-default' : ''}
    `}>
      <NodeResizer
        isVisible={selected && !data.isLocked}
        minWidth={100}
        minHeight={100}
        lineClassName="!border-primary/40"
        handleClassName="!w-2 !h-2 !bg-primary !border-background !rounded-none"
      />

      {/* Label for the section */}
      <div className="absolute -top-6 left-0 flex items-center gap-2">
        <div className={`w-1 h-3 ${(data.customColor as string)?.replace('bg-', 'bg-') || 'bg-primary/40'}`} />
        <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-muted-foreground/60">{data.label || 'Group'}</span>
      </div>

      {/* Internal Grid or Texture for Sections */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.2)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      {/* Background handles (we allow moving by clicking the area) */}
    </div>
  );
});

const MoodBoardViewContent = React.memo<MoodBoardViewProps>(({ brand, setHeaderActions, setIsAppSidebarCollapsed }) => {
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

  // Derived State
  const selectedNode = useMemo(() => nodes.find(n => n.selected), [nodes]);
  const isTextSelected = selectedNode && ['text', 'title', 'paragraph', 'label', 'typography'].includes(selectedNode.data.type);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

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

  const { screenToFlowPosition } = useReactFlow();

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

  const toggleCategory = (category: string) => {
    if (category === 'Orchestration') return;
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };



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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleManualSave]);





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
        case 'title': return { width: 300, height: 100 };
        case 'image': return { width: 260, height: 240 };
        case 'text': return { width: 260, height: 200 };
        case 'paragraph': return { width: 300, height: 220 };
        case 'attribute': return { width: 220, height: 120 };
        case 'palette': return { width: 240, height: 200 };
        case 'typography': return { width: 260, height: 260 };
        case 'grid': return { width: 240, height: 280 };
        case 'mood_gauge': return { width: 220, height: 240 };
        case 'logic': return { width: 240, height: 160 };
        case 'negative': return { width: 260, height: 160 };
        case 'label': return { width: 200, height: 40 };
        case 'section': return { width: 400, height: 300 };
        // Missing types added below
        case 'competitor': return { width: 260, height: 280 };
        case 'reference': return { width: 260, height: 120 };
        case 'icons': return { width: 260, height: 180 };
        case 'texture': return { width: 260, height: 220 };
        case 'preset': return { width: 240, height: 160 };
        case 'tone': return { width: 260, height: 240 };
        case 'midjourney': return { width: 300, height: 220 };
        case 'weather': return { width: 220, height: 180 };
        case 'spotify': return { width: 240, height: 260 };
        case 'web_ref': return { width: 400, height: 300 };
        case 'cms_sync': return { width: 240, height: 180 };
        default: return { width: 260, height: 180 };
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
    logic: LogicNode,
    preset: PresetNode,
    palette: PaletteNode,
    texture: TextureNode,
    negative: NegativeNode,
    label: LabelNode,
    section: SectionNode,
    midjourney: MidjourneyNode,
    weather: WeatherNode,
    spotify: SpotifyNode,
    web_ref: WebRefNode,
    cms_sync: CMSSyncNode,
  }), []);

  const onNodesChangeCustom = useCallback((changes: any) => {
    onNodesChange(changes);
    // Add custom logic here if needed (e.g. syncing to backend)
  }, [onNodesChange]);

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
  }, [brand.name]);

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
          <div className="absolute top-0 left-0 right-0 z-30 h-10 bg-card/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 transition-all duration-300 ease-out">
            {/* Left: Navigation Core & Tooling */}
            <div className="flex items-center gap-1">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => selectMoodboard(null)}
                className="h-8 gap-2 px-2 hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground/60 transition-colors"
              >
                <ChevronLeft size={14} />
                <span className="text-[10px] font-black tracking-widest uppercase">BACK</span>
              </Button>

              <div className="w-[1px] h-4 bg-border/40 mx-2" />

              {/* History Controls */}
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo} className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-20 hover:bg-muted/20">
                  <Undo2 size={14} />
                </Button>
                <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo} className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-20 hover:bg-muted/20">
                  <Redo2 size={14} />
                </Button>
              </div>

              <div className="w-[1px] h-4 bg-border/40 mx-2" />

              {/* Save Status */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleManualSave}
                disabled={!hasUnsavedChanges || isSaving}
                className={`h-8 gap-2 px-2 transition-all ${hasUnsavedChanges ? 'text-primary hover:text-primary hover:bg-primary/10' : 'text-muted-foreground/40 hover:text-foreground'}`}
              >
                {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={14} />}
                <span className="text-[9px] font-mono uppercase tracking-widest opacity-80">
                  {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Unsaved' : 'Saved'}
                </span>
              </Button>

              <div className="w-[1px] h-4 bg-border/40 mx-2" />

              {/* Organization Tools - Left Aligned */}
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'pointer' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                  title="Navigation Mode"
                  onClick={() => setActiveTool('pointer')}
                >
                  <Navigation size={14} className="rotate-[270deg]" fill={activeTool === 'pointer' ? "currentColor" : "none"} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'hand' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                  title="Move Tool"
                  onClick={() => setActiveTool('hand')}
                >
                  <Move size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'text' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                  title="Text Injection"
                  onClick={() => setActiveTool('text')}
                >
                  <Type size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-none transition-all duration-300 ${activeTool === 'section' ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                  title="Area Selection"
                  onClick={() => setActiveTool('section')}
                >
                  <BoxSelect size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-none transition-all duration-300 ${snapToGrid ? 'text-primary bg-primary/10' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                  title="Grid Alignment"
                  onClick={() => setSnapToGrid(!snapToGrid)}
                >
                  <Hash size={14} />
                </Button>

                <div className="w-[1px] h-4 bg-border/40 mx-1" />

                {/* Media & Stickers */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none text-muted-foreground/60 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  title="Import Image"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon size={14} />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                    onChange={handleImageUpload}
                  />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none text-muted-foreground/60 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                      title="Drop Sticker / Emoji"
                    >
                      <Smile size={14} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2" sideOffset={8}>
                    <div className="grid grid-cols-6 gap-1">
                      {['👍', '👎', '🔥', '💡', '⚠️', '✅', '❌', '🚀', '🎨', '🖌️', '📝', '📊', '🔗', '📂', '❤️', '⭐', '🎉', '👀', '🧠', '⚡', '💣', '💎', '🚩', '🏁'].map(emoji => (
                        <button
                          key={emoji}
                          className="aspect-square flex items-center justify-center text-lg hover:bg-muted rounded-sm transition-colors"
                          onClick={() => {
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
                            };
                            setNodes((nds) => nds.concat(newNode));
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Center: Contextual Tools (Floating) - REMOVED (Moved to Inspector) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-full pointer-events-none">
            </div>

          </div>

          {/* Quick Add Menu */}
          {quickAddMenu && (
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
          )}

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
          {isModulesManagerOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              {/* Subtle Backdrop */}
              <div
                className="absolute inset-0 bg-background/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setIsModulesManagerOpen(false)}
              />

              {/* Window Frame */}
              <div className="relative w-full max-w-5xl h-[80vh] bg-[var(--cds-layer-01)] border border-[var(--carbon-table-border)] shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
                {/* Minimal Integrated Header (Gray Outside) */}
                <div className="flex items-center justify-between h-12 bg-[var(--cds-layer-01)] border-b border-[var(--carbon-table-border)] px-6 select-none">
                  <div className="flex items-center gap-3">
                    <Blocks size={16} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground">Modules Manager</span>
                  </div>

                  <button
                    onClick={() => setIsModulesManagerOpen(false)}
                    className="p-1.5 hover:bg-[var(--cds-layer-hover)] transition-colors text-[var(--cds-text-secondary)] hover:text-[var(--cds-text-primary)]"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Window Body */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
                    <NodesMarketView />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reset Confirmation Modal */}
          {isResetModalOpen && (
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
          )}

          {/* Background Decor */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* Cursors Layer */}
          {Object.values(presences).map((presence: PresenceState) => (
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
          ))}

          {/* Canvas Area (Removed internal header) */}
          <div className={`
            absolute inset-0 
            ${activeTool === 'hand' ? 'cursor-grab active:cursor-grabbing' : ''}
            ${activeTool === 'text' ? 'cursor-text' : ''}
            ${activeTool === 'section' ? 'cursor-crosshair' : ''}
            ${activeTool === 'pointer' ? 'cursor-default' : ''}
          `} onPointerMove={handlePointerMove}>
            {/* Floating Sidebar (Tools) - Carbon Design System */}
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
                    const categoryNodes = getInstalledNodes().filter(n => n.category.toLowerCase() === category.toLowerCase());
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
                            {categoryNodes.map((tool) => (
                              <button
                                key={tool.id}
                                onClick={() => addNode(tool.id as any)}
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

            {/* Flow Canvas */}
            <div className="absolute inset-0 cursor-crosshair">
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
                connectionMode={connectionMode as ConnectionMode}
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
                  style: { stroke: 'hsl(var(--primary))', strokeWidth: 2, opacity: 0.8 },
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
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <MoodBoardContext.Provider value={{ brand: props.brand }}>
          <MoodBoardViewContent {...props} />
        </MoodBoardContext.Provider>
      </ReactFlowProvider>
    </div>
  );
});

export default MoodBoardView;