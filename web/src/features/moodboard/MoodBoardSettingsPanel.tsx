import React, { useMemo, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MiniMap, Node, useNodes } from '@xyflow/react';
import { PanelRightOpen, PanelRightClose } from 'lucide-react';
import { MoodNodeData } from './types';
import { BrandProfile } from '@/types';
import { SettingsPanelFrame } from './components/settings/SettingsPanelFrame';
import { AssetsTab } from './components/settings/AssetsTab';
import { GuideTab } from './components/settings/GuideTab';
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
    isOpen: propIsOpen,
    onToggle
}: MoodBoardSettingsPanelProps) => {
    const [activeTab, setActiveTab] = useState<'assets' | 'guide' | 'settings'>('settings');
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const nodes = useNodes();

    const selectedNode = useMemo(() => nodes.find((n) => n.selected) as Node<MoodNodeData> | undefined, [nodes]);

    // Auto-switch to settings if a node is selected
    React.useEffect(() => {
        if (selectedNode) {
            setActiveTab('settings');
        }
    }, [selectedNode?.id]);

    const [width, setWidth] = useState(260);
    const [localIsOpen, setLocalIsOpen] = useState(true);

    const isPanelOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
    const handleToggle = onToggle || (() => setLocalIsOpen(prev => !prev));

    return (
        <>
            <SettingsPanelFrame
                isOpen={isPanelOpen}
                width={width}
                setWidth={setWidth}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            >
                {activeTab === 'assets' && (
                    <AssetsTab brand={brand} />
                )}

                {activeTab === 'guide' && (
                    <GuideTab />
                )}

                {activeTab === 'settings' && (
                    <div className="p-4 pt-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        {selectedNode ? (
                            <NodeInspector
                                selectedNode={selectedNode}
                                updateNodeData={updateNodeData}
                                onDeleteNode={onDeleteNode}
                            />
                        ) : (
                            <CanvasSettings
                                canvasSettings={canvasSettings}
                                setCanvasSettings={setCanvasSettings}
                                snapToGrid={snapToGrid}
                                setSnapToGrid={setSnapToGrid}
                            />
                        )}
                    </div>
                )}

            </SettingsPanelFrame>

            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className={`absolute bottom-4 z-30 flex items-center justify-center w-8 h-8 rounded-full border shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${isPanelOpen
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
