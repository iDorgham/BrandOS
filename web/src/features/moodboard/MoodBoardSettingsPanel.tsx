import React, { useMemo, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MiniMap, Node, useNodes, useEdges, useViewport, useReactFlow } from '@xyflow/react';
import { PanelRightOpen, PanelRightClose } from 'lucide-react';
import { MoodNodeData } from './types';
import { BrandProfile } from '@/types';
import { SettingsPanelFrame, PanelTab } from './components/settings/SettingsPanelFrame';
import { AssetsTab } from './components/settings/AssetsTab';
import { GuideTab } from './components/settings/GuideTab';
import { LayersTab } from './components/settings/LayersTab';
import { NodeInspector } from './components/settings/NodeInspector';
import { CanvasSettings } from './components/settings/CanvasSettings';

interface MoodBoardSettingsPanelProps {
    brand: BrandProfile;
    canvasSettings: { width: number; height: number; name: string };
    setCanvasSettings: React.Dispatch<React.SetStateAction<{ width: number; height: number; name: string }>>;
    snapToGrid: boolean;
    setSnapToGrid: (v: boolean) => void;
    onExport: () => void;
    onGeneratePrompt: () => void;
    updateNodeData: (id: string, data: Partial<MoodNodeData>, style?: React.CSSProperties) => void;
    onDeleteNode: (id: string) => void;
    onDuplicateNode?: (nodeId: string) => void;
    onAddNode?: (type: string) => void;
    onImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export const MoodBoardSettingsPanel = React.memo(({
    brand,
    canvasSettings,
    setCanvasSettings,
    snapToGrid,
    setSnapToGrid,
    onExport,
    onGeneratePrompt,
    updateNodeData,
    onDeleteNode,
    onDuplicateNode,
    onAddNode,
    onImageUpload,
    isOpen: propIsOpen,
    onToggle
}: MoodBoardSettingsPanelProps) => {
    const [activeTab, setActiveTab] = useState<PanelTab>('inspector');
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const nodes = useNodes();
    const edges = useEdges();
    const { setNodes } = useReactFlow();

    const selectedNode = useMemo(() => nodes.find((n) => n.selected) as Node<MoodNodeData> | undefined, [nodes]);

    // Auto-switch to inspector if a node is selected
    React.useEffect(() => {
        if (selectedNode) {
            setActiveTab('inspector');
        }
    }, [selectedNode?.id]);

    const [width, setWidth] = useState(260);
    const [localIsOpen, setLocalIsOpen] = useState(true);

    const isPanelOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
    const handleToggle = onToggle || (() => setLocalIsOpen(prev => !prev));

    // Select a node by ID (for Layers tab)
    const handleSelectNode = useCallback((nodeId: string) => {
        setNodes(nds => nds.map(n => ({
            ...n,
            selected: n.id === nodeId
        })));
        setActiveTab('inspector');
    }, [setNodes]);

    return (
        <>
            <SettingsPanelFrame
                isOpen={isPanelOpen}
                width={width}
                setWidth={setWidth}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                footer={
                    <div className="flex border-t border-border/20 bg-muted/5 min-h-[120px]">
                        <div className="flex-1 min-w-0 h-32 relative overflow-hidden group/minimap">
                            <MiniMap
                                zoomable
                                pannable
                                className="!bg-transparent !m-0 !w-full !h-full"
                                maskColor={isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)"}
                                maskStrokeColor={isDark ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.1)"}
                                maskStrokeWidth={1}
                                nodeColor={(node) => {
                                    if (node.selected) return '#2563eb';
                                    if (node.type === 'section') return isDark ? '#1e293b' : '#f1f5f9';
                                    return isDark ? '#334155' : '#cbd5e1';
                                }}
                                nodeStrokeWidth={0}
                                nodeBorderRadius={1}
                            />
                        </div>
                    </div>
                }
            >
                {activeTab === 'inspector' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        {selectedNode ? (
                            <NodeInspector
                                selectedNode={selectedNode}
                                updateNodeData={updateNodeData}
                                onDeleteNode={onDeleteNode}
                            />
                        ) : (
                            <div className="p-3">
                                <CanvasSettings
                                    canvasSettings={canvasSettings}
                                    setCanvasSettings={setCanvasSettings}
                                    snapToGrid={snapToGrid}
                                    setSnapToGrid={setSnapToGrid}
                                />
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'layers' && (
                    <LayersTab
                        nodes={nodes as Node<MoodNodeData>[]}
                        onSelectNode={handleSelectNode}
                        onDeleteNode={onDeleteNode}
                        updateNodeData={updateNodeData}
                        onDuplicateNode={onDuplicateNode}
                        onAddNode={onAddNode}
                        onImageUpload={onImageUpload}
                    />
                )}

                {activeTab === 'assets' && (
                    <AssetsTab brand={brand} />
                )}

                {activeTab === 'guide' && (
                    <GuideTab />
                )}

            </SettingsPanelFrame>

            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className={`absolute bottom-10 z-30 flex items-center justify-center w-8 h-8 rounded-full border shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${isPanelOpen
                    ? 'right-[270px] bg-background border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50'
                    : 'right-4 bg-primary text-primary-foreground border-primary shadow-primary/25'
                    }`}
                style={isPanelOpen ? { right: width + 16 } : {}}
                title={isPanelOpen ? "Collapse Panel" : "Open Settings"}
            >
                {isPanelOpen ? <PanelRightClose size={14} /> : <PanelRightOpen size={14} />}
            </button>
        </>
    );
});
