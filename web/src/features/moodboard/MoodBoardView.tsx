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
  type ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Button, Card, Input } from '@/components/ui';
import { NodesMarketView } from '@/features/settings/NodesMarketView';
import { MoodboardSelector } from './MoodboardSelector';
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
  X,
  Maximize2,
  Minimize2,
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
  Search,
  Undo2,
  Redo2,
  CircleDot,
  Globe,
  Chrome
} from 'lucide-react';
import { BrandProfile } from '@/types';
import { generateId } from '@/utils';
import { toast } from 'sonner';
import { usePresence, type PresenceState } from '@/hooks/usePresence';
import { useNodeManager } from '@/hooks/useNodeManager';

// Custom node types
interface MoodNodeData extends Record<string, unknown> {
  label: string;
  type: 'image' | 'text' | 'attribute' | 'logic' | 'preset' | 'palette' | 'texture' | 'negative' | 'title' | 'paragraph' | 'typography' | 'grid' | 'tone' | 'competitor' | 'mood_gauge' | 'icons' | 'reference';
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
  onChange?: (id: string, newData: Partial<MoodNodeData>, newStyle?: React.CSSProperties) => void;
}

const CustomHandle = ({ type, position, id, className, nodeColor }: { type: 'source' | 'target', position: Position, id?: string, className?: string, nodeColor?: string }) => {
  const colorClass = nodeColor ? nodeColor.replace('bg-', '') : 'primary';
  return (
    <div className={`absolute z-50 group/handle ${position === Position.Top || position === Position.Bottom ? 'w-full h-6 left-0' : 'h-full w-6 top-0'} flex items-center justify-center pointer-events-none ${position === Position.Top ? '-top-3' : position === Position.Bottom ? '-bottom-3' : position === Position.Left ? '-left-3' : '-right-3'}`}>
      <Handle
        type={type}
        position={position}
        id={id}
        className={`
          !w-3 !h-3 !border-[3px] !bg-background hover:!scale-125 transition-all duration-300 ease-out
          !opacity-30 group-hover/node:!opacity-60 group-hover/handle:!opacity-100 pointer-events-auto
          ${nodeColor ? `!border-${colorClass} hover:!bg-${colorClass} hover:!border-${colorClass}` : '!border-primary/40 hover:!bg-primary hover:!border-primary'}
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



const NodeContainer = ({ children, selected, title, icon: Icon, typeColor, onEdit, isEditing, handles, resizer, data, id }: any) => {
  const isActive = data?.isActive !== false;

  return (
    <div className={`
      relative rounded-none border transition-all duration-700 group/node
      ${selected
        ? 'border-primary/60 shadow-[0_0_50px_rgba(15,98,254,0.15)] bg-card/95 ring-1 ring-primary/30 z-30 scale-[1.02]'
        : 'border-border/40 bg-card/80 hover:border-primary/40 hover:bg-card/95 hover:shadow-2xl hover:scale-[1.01] z-10'}
      backdrop-blur-2xl min-w-[200px] h-full w-full flex flex-col overflow-visible
      after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/5 after:to-transparent after:pointer-events-none
      ${!isActive ? 'opacity-40 grayscale-[0.8]' : ''}
    `}>
      {/* Utility Layers (Handles & Resizers) positioned relative to the window boundary */}
      {isActive && resizer}
      {isActive && handles}

      {/* Top Header - Color coded from map */}
      <div className={`
        h-1.5 w-full bg-opacity-80 transition-opacity duration-300
        ${data.customColor || typeColor}
      `} />

      {/* Window Title Bar */}
      <div className={`
        flex items-center justify-between px-3 py-2 border-b border-border/20
        ${selected ? 'bg-primary/10' : 'bg-muted/5'}
        transition-colors duration-500
      `}>
        <div className="flex-1 flex items-center gap-2.5 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onChange?.(id, { isActive: !isActive });
            }}
            className={`
              p-1 rounded-none transition-all duration-300 group/power shrink-0
              ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted/20 text-muted-foreground/40 border border-border/20 grayscale-0'}
              hover:scale-110 active:scale-95
            `}
            title={isActive ? 'Deactivate Module' : 'Activate Module'}
          >
            <Power size={8} strokeWidth={3} className={isActive ? 'drop-shadow-[0_0_5px_rgba(15,98,254,0.5)]' : ''} />
          </button>

          <div className="flex flex-col flex-1 min-w-0">
            <input
              value={data.label}
              onChange={(e) => data.onChange?.(id, { label: e.target.value })}
              className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-[0.15em] text-foreground/90 font-display leading-tight w-full hover:bg-foreground/5 focus:bg-foreground/10 px-1 -ml-1 transition-colors"
              onClick={(e) => e.stopPropagation()}
            />
            {data?.type && (
              <span className="text-[6px] font-mono font-bold text-primary/30 group-hover/node:text-primary/60 transition-colors uppercase px-1">
                MOD::{data.type}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className={`
            p-1 rounded-none ${typeColor} bg-opacity-10 ring-1 ring-inset ring-black/5 dark:ring-white/5 
             shadow-sm transition-transform duration-500 group-hover/node:scale-110
          `}>
            <Icon className={typeColor.replace('bg-', 'text-')} size={10} strokeWidth={2.5} />
          </div>
          {isActive && (
            <button
              onClick={onEdit}
              className="p-1 hover:bg-primary/10 rounded-none transition-all text-muted-foreground/30 hover:text-primary opacity-0 group-hover/node:opacity-100 ml-1"
              title="Adjust Parameters"
            >
              <Edit3 size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Window Body & Interaction Layer */}
      <div className={`
        flex-1 flex flex-col relative overflow-visible z-10 bg-gradient-to-b from-transparent to-black/5 shadow-inner
        ${!isActive ? 'pointer-events-none select-none' : ''}
      `}>
        {/* Main Content Area - removed default p-4 to allow edge-to-edge content */}
        <div className="relative z-10 flex-1 flex flex-col h-full text-[10px] text-muted-foreground/80 leading-relaxed font-medium">
          {children}
        </div>

        {/* Advanced Metadata Footer (Visible on Hover) - adjusted padding */}
        <div className="mt-auto px-4 pb-2 pt-2 border-t border-border/10 flex items-center justify-between opacity-0 group-hover/node:opacity-100 transition-all duration-500 delay-100 translate-y-1 group-hover/node:translate-y-0">
          <div className="flex gap-1.5">
            <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-primary/40 animate-pulse' : 'bg-muted-foreground/20'}`} />
            <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-primary/20' : 'bg-muted-foreground/10'}`} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-mono text-muted-foreground/20 uppercase tracking-[0.2em]">
              sys_id::{data?.id?.substring(0, 8) || 'xxxx'}
            </span>
            <div className="w-2 h-[1px] bg-primary/20" />
            <span className={`text-[7px] font-mono uppercase font-black ${isActive ? 'text-primary/40' : 'text-muted-foreground/20'}`}>
              {isActive ? 'ACTIVE' : 'OFFLINE'}
            </span>
          </div>
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
          lineClassName="!border-primary/30"
          handleClassName="!w-1.5 !h-1.5 !bg-primary/40 !border-background !rounded-none"
        />
      }
    >
      {isEditing && (
        <input
          type="text"
          value={tempLabel}
          onChange={(e) => setTempLabel(e.target.value)}
          onBlur={() => { data.onChange?.(id, { label: tempLabel }); setIsEditing(false); }}
          className="w-full bg-accent/20 rounded-none px-2 py-1 text-[10px] mb-2 outline-none border border-primary/20 font-medium"
          autoFocus
        />
      )}
      <div
        className="relative flex-1 bg-muted/20 rounded-none overflow-hidden group/img cursor-pointer border border-border/50 hover:border-primary/30 transition-all min-h-0 flex flex-col justify-center shadow-inner"
        onClick={() => fileInputRef.current?.click()}
      >
        {data.imageUrl ? (
          <>
            <img src={data.imageUrl} alt={data.label} className="w-full h-full object-cover opacity-90 group-hover/img:opacity-50 transition-opacity duration-700 blur-[0px] group-hover/img:blur-[2px]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
              <div className="bg-popover/90 backdrop-blur-xl px-3 py-1.5 rounded-none border border-border flex items-center gap-2 transform translate-y-1 group-hover/img:translate-y-0 transition-transform shadow-2xl">
                <Upload size={10} className="text-primary" />
                <span className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase">Update_Asset</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity">
              <div className="flex justify-between items-center text-[6px] font-mono text-white/70">
                <span>ANALYSIS: ACTIVE</span>
                <span>RES: {String(data.width)}x{String(data.height)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 opacity-30 group-hover/img:opacity-100 transition-all py-8">
            <div className="w-8 h-8 rounded-none bg-muted/30 flex items-center justify-center border border-border group-hover/img:border-primary/30 transition-colors shadow-sm">
              <Upload size={12} className="text-primary/60" />
            </div>
            <div className="text-center">
              <span className="text-[8px] font-black tracking-[0.2em] block uppercase text-primary/40">Inject_Visual</span>
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
          isVisible={selected}
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
          className="w-full h-full bg-muted/20 rounded-none p-4 text-[11px] leading-relaxed font-medium outline-none border border-primary/20 min-h-[120px] resize-none text-foreground/90 placeholder:text-muted-foreground/30 font-mono shadow-inner"
          placeholder="INJECT BRAND NARRATIVE..."
          autoFocus
        />
      ) : (
        <div className="p-4 h-full flex flex-col group/text cursor-text overflow-y-auto scrollbar-thin scrollbar-thumb-white/10" onClick={() => setIsEditing(true)}>
          <div className="flex items-center gap-1 mb-2 opacity-30 group-hover/text:opacity-80 transition-opacity">
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
          isVisible={selected}
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
          className="w-full bg-muted/20 rounded-none px-4 py-3 text-xl font-bold outline-none border border-primary/20 text-foreground/80 font-display shadow-inner"
          autoFocus
        />
      ) : (
        <div className="p-6 h-full flex flex-col justify-center cursor-text group/title" onClick={() => setIsEditing(true)}>
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
          isVisible={selected}
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
          className="w-full h-full bg-muted/20 rounded-none p-4 text-[11px] leading-relaxed font-medium outline-none border border-primary/20 min-h-[120px] resize-none text-foreground/80 shadow-inner"
          placeholder="Enter comprehensive narrative detail..."
          autoFocus
        />
      ) : (
        <div className="p-4 h-full cursor-text overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-2" onClick={() => setIsEditing(true)}>
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
      title="Type Spec"
      icon={CaseUpper}
      typeColor="bg-blue-600"
      handles={<NodeHandles nodeColor="bg-blue-600" />}
      data={{ ...data, id, type: 'typography' }}
      id={id}
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <select
            value={data.fontFamily}
            onChange={(e) => data.onChange?.(id, { fontFamily: e.target.value })}
            className="w-full bg-muted border border-border/50 rounded-none px-2 py-1.5 text-[10px] font-bold outline-none focus:border-primary/50 transition-all font-mono text-foreground"
          >
            {families.map(f => <option key={f} value={f} className="bg-background text-foreground">{f.toUpperCase()}</option>)}
          </select>
          <div className="flex gap-2">
            <select
              value={data.fontWeight}
              onChange={(e) => data.onChange?.(id, { fontWeight: e.target.value })}
              className="flex-1 bg-muted border border-border/50 rounded-none px-2 py-1 text-[9px] font-medium outline-none text-foreground"
            >
              {weights.map(w => <option key={w} value={w} className="bg-background text-foreground">{w}</option>)}
            </select>
            <input
              type="number"
              value={data.fontSize || 16}
              onChange={(e) => data.onChange?.(id, { fontSize: parseInt(e.target.value) })}
              className="w-12 bg-muted/40 border border-border/50 rounded-none px-2 py-1 text-[9px] font-mono outline-none"
            />
          </div>
        </div>

        <div className="p-4 bg-muted/10 border border-border/30 rounded-none min-h-[60px] flex items-center justify-center overflow-hidden">
          <span style={{
            fontFamily: data.fontFamily || 'Inter',
            fontWeight: (data.fontWeight?.toLowerCase() === 'black' ? 900 : data.fontWeight?.toLowerCase() === 'bold' ? 700 : data.fontWeight?.toLowerCase() === 'medium' ? 500 : 400),
            fontSize: `${Math.min(data.fontSize || 16, 40)}px`
          }} className="text-foreground transition-all duration-700 truncate w-full text-center">
            AaBbCc
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[8px] font-mono opacity-40">
          <div className="flex flex-col">
            <span>L_SPACING</span>
            <span className="text-primary">{data.letterSpacing || '0.02em'}</span>
          </div>
          <div className="flex flex-col items-end">
            <span>L_HEIGHT</span>
            <span className="text-primary">{data.lineHeight || '1.4'}</span>
          </div>
        </div>
      </div>
    </NodeContainer>
  );
};

const GridSysNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Grid Sys"
    icon={Grid3X3}
    typeColor="bg-blue-600"
    handles={<NodeHandles nodeColor="bg-blue-600" />}
    data={{ ...data, id, type: 'grid' }}
    id={id}
  >
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="text-[8px] uppercase tracking-widest opacity-40 font-black">Columns</span>
          <input
            type="number"
            value={data.gridCols || 12}
            onChange={(e) => data.onChange?.(id, { gridCols: parseInt(e.target.value) })}
            className="w-full bg-muted/40 border border-border/50 rounded-none px-2 py-1 text-[10px] font-mono outline-none"
          />
        </div>
        <div className="space-y-1">
          <span className="text-[8px] uppercase tracking-widest opacity-40 font-black">Gap_PX</span>
          <input
            type="number"
            value={data.gap || 24}
            onChange={(e) => data.onChange?.(id, { gap: parseInt(e.target.value) })}
            className="w-full bg-muted/40 border border-border/50 rounded-none px-2 py-1 text-[10px] font-mono outline-none"
          />
        </div>
      </div>

      <div className="aspect-square bg-muted/5 border border-border/30 rounded-none relative p-2 overflow-hidden group/gridview">
        <div
          className="w-full h-full grid gap-1 opacity-20 group-hover/gridview:opacity-50 transition-opacity duration-700"
          style={{ gridTemplateColumns: `repeat(${data.gridCols || 12}, 1fr)` }}
        >
          {Array.from({ length: (data.gridCols || 12) }).map((_, i) => (
            <div key={i} className="h-full bg-primary/40 border-x border-primary/20" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[9px] font-mono bg-popover/80 backdrop-blur-sm px-2 py-0.5 border border-border/50 shadow-2xl">
            SYSTEM_ACTIVE
          </span>
        </div>
      </div>
    </div>
  </NodeContainer>
);

const ToneNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
  <NodeContainer
    selected={selected}
    title="Vibration"
    icon={SlidersHorizontal}
    typeColor="bg-amber-500"
    handles={<NodeHandles nodeColor="bg-amber-500" />}
    data={{ ...data, id, type: 'tone' }}
    id={id}
  >
    <div className="flex flex-col gap-4">
      <div className="space-y-4 py-2">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest px-1">
            <span className="text-muted-foreground/40">Clinical</span>
            <span className="text-primary">{data.toneValue || 50}%</span>
            <span className="text-muted-foreground/40">Visceral</span>
          </div>
          <div className="relative h-6 flex items-center group/slider">
            <input
              type="range" min="0" max="100"
              value={data.toneValue || 50}
              onChange={(e) => data.onChange?.(id, { toneValue: parseInt(e.target.value) })}
              className="w-full h-1 bg-muted/40 rounded-none appearance-none cursor-pointer accent-primary relative z-10"
            />
            <div className="absolute h-full w-[1px] bg-primary/20 left-1/2 -translate-x-1/2 z-0" />
          </div>
        </div>
      </div>

      <div className="p-3 bg-primary/5 border border-primary/10 rounded-none space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[8px] font-bold uppercase tracking-widest text-primary/80">TONAL_ANALYSIS</span>
        </div>
        <p className="text-[8px] leading-tight text-muted-foreground italic font-medium">
          {(data.toneValue || 50) < 30 && "Profile optimized for precision, clarity, and architectural silence."}
          {(data.toneValue || 50) >= 30 && (data.toneValue || 50) <= 70 && "Balanced frequency. Hybrid resonance between structure and emotion."}
          {(data.toneValue || 50) > 70 && "Raw aesthetic energy. High visceral impact and organic displacement."}
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
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={data.competitorName || ''}
        placeholder="COMP_ID_NAME"
        onChange={(e) => data.onChange?.(id, { competitorName: e.target.value.toUpperCase() })}
        className="w-full bg-muted/40 border border-border/50 rounded-none px-3 py-2 text-[10px] font-black outline-none placeholder:opacity-20 font-mono tracking-widest"
      />

      <div className="space-y-2">
        <div className="flex justify-between items-center text-[7px] font-bold uppercase opacity-40 px-1">
          <span>MARKET_SATURATION</span>
          <span>{data.marketShare || 20}%</span>
        </div>
        <div className="h-1.5 bg-muted/40 rounded-none overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="h-full bg-stone-500 transition-all duration-1000" style={{ width: `${data.marketShare || 20}%` }} />
        </div>
        <input
          type="range" min="1" max="100"
          value={data.marketShare || 20}
          onChange={(e) => data.onChange?.(id, { marketShare: parseInt(e.target.value) })}
          className="w-full h-1 bg-transparent rounded-none appearance-none cursor-pointer accent-stone-500"
        />
      </div>

      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 h-[1px] bg-border/20" />
        <Chrome size={10} className="text-stone-500 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
        <div className="flex-1 h-[1px] bg-border/20" />
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
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="relative w-20 h-20 group/gauge">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" strokeWidth="4" className="stroke-muted/20" />
          <circle
            cx="40" cy="40" r="34" fill="none" strokeWidth="4"
            className="stroke-lime-500 transition-all duration-1000 ease-out"
            strokeDasharray={213}
            strokeDashoffset={213 - (213 * (data.moodLevel || 50)) / 100}
            strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-black tracking-tighter text-lime-500">{data.moodLevel || 50}%</span>
          <span className="text-[6px] font-mono uppercase tracking-[0.2em] opacity-40">ENRG_FLOW</span>
        </div>
      </div>

      <input
        type="range" min="0" max="100"
        value={data.moodLevel || 50}
        onChange={(e) => data.onChange?.(id, { moodLevel: parseInt(e.target.value) })}
        className="w-full h-1 bg-muted/40 rounded-none appearance-none cursor-pointer accent-lime-500"
      />

      <div className="w-full grid grid-cols-4 gap-1 h-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`h-full ${i < (data.moodLevel || 50) / 8 ? 'bg-lime-500/40' : 'bg-muted/10'} rounded-none transition-colors duration-500`} />
        ))}
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
          <div key={i} className="aspect-square bg-muted/20 border border-border/40 rounded-none flex items-center justify-center hover:bg-sky-500/10 hover:border-sky-500/30 transition-all cursor-pointer group/sym">
            <Icon size={12} className="text-muted-foreground/40 group-hover/sym:text-sky-500" />
          </div>
        ))}
      </div>
      <div className="border-t border-border/10 pt-3 flex flex-col gap-1.5">
        <span className="text-[7px] font-black tracking-widest uppercase opacity-40">GLYPH_WEIGHT</span>
        <div className="h-1 bg-muted/40 rounded-none flex">
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
          className="w-full bg-muted/40 border border-border/50 rounded-none px-2 py-1.5 text-[10px] font-black outline-none tracking-widest font-mono"
        />
        <div className="flex items-center gap-2 p-2 bg-blue-500/5 border border-blue-500/20 rounded-none group/link">
          <div className="p-2 bg-blue-500/10 rounded-none shadow-inner">
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
        <div className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 rounded-none px-3 py-2 w-full group/attr">
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
      <div className="text-[11px] font-bold tracking-tight bg-violet-500/10 border border-violet-500/20 p-2 rounded-none text-violet-400 font-mono italic">IF::BRAND_FLOW â†’ {data.label.toUpperCase()}</div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[7px] font-black uppercase opacity-40">
          <span>Signal_Resonance</span>
          <span className="text-violet-500 text-[8px]">98.4%</span>
        </div>
        <div className="h-0.5 bg-violet-500/10 relative overflow-hidden">
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
      <div className="p-2 border border-sky-400/20 bg-sky-400/5 flex items-center gap-2 group/preset">
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-card/50 border border-border/50 p-2 group/pal">
          <div className="w-10 h-10 rounded-none shadow-2xl transition-transform group-hover/pal:scale-[1.05] duration-500" style={{ backgroundColor: data.color || '#fff' }} />
          <div className="flex flex-col justify-center">
            <span className="text-[12px] font-mono font-black tracking-tight text-foreground uppercase">{data.color}</span>
            <div className="text-[6px] font-mono opacity-40 uppercase tracking-widest mt-0.5">HEX_CHROM_ID</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-2 bg-muted/5 border border-border/20">
          {brand.palette.map(c => (
            <button
              key={c.id}
              onClick={() => data.onChange?.(id, { color: c.hex, label: c.label })}
              className={`aspect-square rounded-none flex-shrink-0 border transition-all ${data.color === c.hex ? 'border-primary scale-110 z-10' : 'border-border/30 opacity-60 hover:opacity-100 hover:scale-105'}`}
              style={{ backgroundColor: c.hex }}
              title={c.label}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1 px-1">
          <div className="flex justify-between items-center text-[6px] font-mono opacity-30">
            <span>RGB_SPEC</span>
            <span>{data.color ? hexToRgbForDisplay(data.color) : '---'}</span>
          </div>
          <div className="w-full h-[1px] bg-pink-500/10" />
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
            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Intensity</span>
            <span className="text-[9px] font-mono text-primary/60">{data.intensity || 50}%</span>
          </div>
          <input
            type="range" min="0" max="100"
            value={data.intensity || 50}
            onChange={(e) => data.onChange?.(id, { intensity: parseInt(e.target.value) })}
            className="w-full h-1 bg-muted/40 rounded-none appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="aspect-[2/1] bg-muted/10 border border-border/20 rounded-none overflow-hidden relative group/material">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${data.variant === 'grainy' ? 'opacity-30' : 'opacity-10'}`} style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/60-lines.png")' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[7px] font-mono tracking-widest uppercase opacity-20 group-hover/material:opacity-60 transition-opacity underline decoration-primary/40 underline-offset-4">Physical_Preview</span>
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
        className="h-10 text-[11px] font-black bg-muted/40 border-border/50 rounded-none font-mono tracking-widest shadow-inner placeholder:italic placeholder:opacity-20"
      />
      <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-none space-y-2 group/neg">
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

const MoodBoardViewContent = React.memo<MoodBoardViewProps>(({ brand, setHeaderActions }) => {
  const { presences, updateCursor } = usePresence(`moodboard:${brand.id}`);
  const { getInstalledNodes } = useNodeManager();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MoodNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [connectionMode, setConnectionMode] = useState<ConnectionMode>('loose' as ConnectionMode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  const [quickAddMenu, setQuickAddMenu] = useState<{ x: number; y: number } | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set(['Orchestration', 'Generative', 'Utility', 'External']));
  const [isModulesManagerOpen, setIsModulesManagerOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetConfirmName, setResetConfirmName] = useState('');


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
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };



  // Track the currently loaded moodboard ID to prevent overwriting local state on updates
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

    if (nodes.length > 0 || edges.length > 0) {
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

  const onPaneClick = useCallback(() => {
    setContextMenu(null);
    setQuickAddMenu(null);
  }, []);

  const onPaneContextMenu = useCallback((event: any) => {
    event.preventDefault();
    setQuickAddMenu(null);
  }, []);

  const onPaneDoubleClick = useCallback((event: React.MouseEvent) => {
    // We only want to trigger on the pane itself, not on nodes
    if ((event.target as HTMLElement).classList.contains('react-flow__pane')) {
      setQuickAddMenu({ x: event.clientX, y: event.clientY });
    }
  }, []);

  const addNode = useCallback((type: MoodNodeData['type'], position?: { x: number, y: number }) => {
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
        default: return { width: 260, height: 180 };
      }
    };

    const dims = getInitialDimensions(type);

    const newNode: Node<MoodNodeData> = {
      id: generateId(),
      type,
      position: position || { x: Math.random() * 400, y: Math.random() * 300 },
      style: { width: dims.width, height: dims.height },
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Module`,
        type,
        ...defaults,
        onChange: updateNodeData,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    toast.success(`${type} module initialized`);
  }, [setNodes, updateNodeData, brand.palette]);

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
      width: 1920,
      height: 1080,
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

  // Set header actions when moodboard is selected
  useEffect(() => {
    if (!selectedMoodboard) {
      setHeaderActions(null);
      return;
    }

    setHeaderActions(
      <div className="flex items-center gap-2">
        {/* Undo Button */}
        <Button
          variant="ghost"
          onClick={undo}
          disabled={!canUndo}
          className="gap-2 text-[9px] font-bold tracking-widest h-8 px-3 disabled:opacity-30"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={12} /> UNDO
        </Button>

        {/* Redo Button */}
        <Button
          variant="ghost"
          onClick={redo}
          disabled={!canRedo}
          className="gap-2 text-[9px] font-bold tracking-widest h-8 px-3 disabled:opacity-30"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={12} /> REDO
        </Button>

        {/* Save Button with Status */}
        <Button
          onClick={handleManualSave}
          disabled={!hasUnsavedChanges || isSaving}
          className="gap-2 text-[9px] font-bold tracking-widest h-8 px-4 disabled:opacity-50"
          title="Save (Ctrl+S)"
        >
          {isSaving ? (
            <>
              <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              SAVING
            </>
          ) : (
            <>
              <Save size={12} />
              {hasUnsavedChanges && <CircleDot size={8} className="animate-pulse" />}
              SAVE
            </>
          )}
        </Button>

        <div className="h-4 w-[1px] bg-border mx-1.5" />

        <Button onClick={generateBrandPrompt} className="gap-2 text-[9px] font-bold tracking-widest h-8 px-6 shadow-[0_0_15px_rgba(15,98,254,0.25)]">
          <Zap size={12} className="fill-current" /> SYNTHESIZE
        </Button>
      </div>
    );
  }, [selectedMoodboard, undo, redo, handleManualSave, canUndo, canRedo, hasUnsavedChanges, isSaving, generateBrandPrompt, setHeaderActions]);

  // Separate cleanup effect to avoid render loops
  useEffect(() => {
    return () => setHeaderActions(null);
  }, [setHeaderActions]);

  return (
    <div className="w-full h-full bg-background overflow-hidden font-mono relative">
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
          {/* Moodboard Header - Carbon Design System */}
          <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
            {/* Back Button - Carbon style */}
            <button
              onClick={() => selectMoodboard(null)}
              className="flex items-center gap-2 h-8 px-3 bg-background/80 backdrop-blur-sm border border-border/60 hover:bg-card hover:border-border transition-all duration-150 text-[10px] font-mono font-medium tracking-wider uppercase"
            >
              <ChevronLeft size={12} className="opacity-60" />
              <span>Back</span>
            </button>

            {/* Moodboard Name Badge - Carbon style */}
            <div className="h-8 px-4 flex items-center bg-card/60 backdrop-blur-sm border border-border/40 text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-foreground/80">
              {selectedMoodboard.name}
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

          {/* Modules Manager Modal */}
          {isModulesManagerOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => setIsModulesManagerOpen(false)}
              />
              {/* Modal Content */}
              <div className="relative w-[90vw] max-w-5xl h-[85vh] bg-card border border-border rounded-sm shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-300">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-none">
                      <Grid3X3 size={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest">Modules Manager</span>
                  </div>
                  <button
                    onClick={() => setIsModulesManagerOpen(false)}
                    className="p-2 hover:bg-muted/40 transition-colors rounded-sm"
                  >
                    <X size={16} />
                  </button>
                </div>
                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  <NodesMarketView />
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
          <div className="absolute inset-0" onPointerMove={handlePointerMove}>
            {/* Floating Sidebar (Tools) - Carbon Design System */}
            <div className={`
          absolute left-3 top-16 bottom-3 w-56 z-20 
          transition-all duration-300 ease-out
          ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-64 opacity-0 pointer-events-none'}
        `}>
              <div className="h-full bg-card/40 backdrop-blur-xl border border-border/60 flex flex-col">

                {/* Categories and Nodes - Carbon Design System */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 p-3">
                  {['Foundation', 'Orchestration', 'Generative', 'Utility', 'External'].map(category => {
                    const categoryNodes = getInstalledNodes().filter(n => n.category.toLowerCase() === category.toLowerCase());
                    if (categoryNodes.length === 0) return null;

                    const isCollapsed = collapsedCategories.has(category);

                    return (
                      <div key={category} className="mb-2">
                        {/* Category Header - Carbon style */}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between h-8 px-3 text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-muted-foreground/60 hover:text-foreground/80 border-b border-border/20 transition-colors duration-150"
                        >
                          <span>{category}</span>
                          {isCollapsed ? <ChevronRight size={10} /> : <ChevronDown size={10} />}
                        </button>

                        {/* Node Buttons - Carbon style */}
                        {!isCollapsed && (
                          <div className="mt-1">
                            {categoryNodes.map((tool) => (
                              <button
                                key={tool.id}
                                onClick={() => addNode(tool.id as any)}
                                className="w-full flex items-center gap-3 h-9 px-3 text-muted-foreground/70 hover:text-foreground hover:bg-muted/20 border-l-2 border-transparent hover:border-primary/40 transition-all duration-150 group"
                              >
                                <div className="w-7 h-7 flex items-center justify-center bg-background/60 border border-border/40 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all duration-150">
                                  <tool.icon size={12} className="group-hover:text-primary" />
                                </div>
                                <span className="text-[9px] font-mono font-medium tracking-[0.1em] uppercase">{tool.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer Section - Carbon Design System */}
                <div className="mt-auto">
                  {/* Color Palette */}
                  <div className="p-3 border-t border-border/40">
                    <h3 className="text-[8px] font-mono font-bold tracking-[0.2em] uppercase text-muted-foreground/60 mb-3">
                      Color Palette
                    </h3>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {brand.palette.map(color => (
                        <div
                          key={color.id}
                          className="w-full aspect-square border border-border/60 hover:border-primary/40 hover:scale-105 transition-all duration-150 cursor-pointer"
                          style={{ backgroundColor: color.hex }}
                          title={color.label}
                        />
                      ))}
                    </div>

                    {/* Secondary Actions - Icons only row */}
                    <div className="flex items-center gap-2 pt-3 border-t border-border/20 px-1">
                      <button
                        onClick={onShare}
                        className="flex-1 flex items-center justify-center h-8 bg-muted/20 hover:bg-muted/30 border border-border/40 hover:border-primary/40 transition-all text-muted-foreground/60 hover:text-primary"
                        title="Share Moodboard"
                      >
                        <Share2 size={12} />
                      </button>
                      <button
                        onClick={onExport}
                        className="flex-1 flex items-center justify-center h-8 bg-muted/20 hover:bg-muted/30 border border-border/40 hover:border-primary/40 transition-all text-muted-foreground/60 hover:text-primary"
                        title="Export Matrix"
                      >
                        <Download size={12} />
                      </button>
                      <button
                        onClick={() => setIsResetModalOpen(true)}
                        className="flex-1 flex items-center justify-center h-8 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all text-rose-500/60 hover:text-rose-500"
                        title="Reset Canvas"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Modules Manager Button */}
                  <button
                    onClick={() => setIsModulesManagerOpen(true)}
                    className="w-full flex items-center justify-between h-10 px-3 bg-muted/10 hover:bg-muted/20 border-t border-border/40 hover:border-primary/20 transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-background/60 border border-border/40 group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-150">
                        <Grid3X3 size={10} className="group-hover:text-primary" />
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase">Modules Manager</span>
                    </div>
                    <Maximize2 size={10} className="opacity-40 group-hover:opacity-100" />
                  </button>
                </div>
              </div>
            </div>


            {/* Floating Sidebar Toggle - Carbon Design System */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`
            absolute left-3 top-1/2 -translate-y-1/2 z-30
            w-6 h-10
            bg-card/60 backdrop-blur-md
            border border-border/60
            flex items-center justify-center
            transition-all duration-300
            hover:bg-card hover:border-primary/40
            ${isSidebarOpen ? 'translate-x-[224px]' : 'translate-x-0'}
          `}
            >
              {isSidebarOpen ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
            </button>

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
                onPaneContextMenu={onPaneContextMenu}
                onDoubleClick={onPaneDoubleClick}
                onEdgeDoubleClick={(_, edge) => onEdgesDelete([edge])}
                nodeTypes={nodeTypes}
                connectionMode={connectionMode as ConnectionMode}
                defaultViewport={{ x: 0, y: 0, zoom: 0.92 }}
                snapToGrid
                snapGrid={[16, 16]}
                attributionPosition="bottom-right"
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  animated: true,
                  style: { stroke: 'hsl(var(--primary))', strokeWidth: 2, opacity: 0.8 },
                }}
              >
                <Background color="#111" gap={20} size={1} />
                <Controls className="!bg-card/80 !backdrop-blur-md !border-border !shadow-2xl opacity-40 hover:opacity-100 transition-opacity" />
                <MiniMap
                  className="!bg-card/40 !backdrop-blur-md !border-border !rounded-none !opacity-20 hover:!opacity-100 transition-opacity overflow-hidden"
                  nodeColor={(node) => {
                    switch (node.data.type) {
                      // Foundation
                      case 'image':
                      case 'text':
                      case 'title':
                      case 'paragraph':
                      case 'typography':
                      case 'grid':
                      case 'icons':
                      case 'preset':
                      case 'palette': return '#2563eb';
                      // Orchestration
                      case 'attribute':
                      case 'texture':
                      case 'logic':
                      case 'tone':
                      case 'negative': return '#f59e0b';
                      // External
                      case 'competitor':
                      case 'reference': return '#059669';
                      // Generative
                      case 'mood_gauge': return '#c026d3';
                      default: return '#6b7280';
                    }
                  }}
                  maskColor="rgba(0,0,0,0.5)"
                />

              </ReactFlow>
            </div>

            {/* Context Menu */}
            {contextMenu && (
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
                      toast.success('Moodboard duplicated');
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
            )}
          </div>
        </>
      )}
    </div>
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