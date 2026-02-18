import React from 'react';
import { TopBarLeft } from './TopBarLeft';
import { TopBarCenter } from './TopBarCenter';
import { TopBarRight } from './TopBarRight';
import { useToolbarState } from '../../hooks/useToolbarState';

// Re-export specific props if needed
export interface MoodboardTopBarProps {
    // State
    flowName: string;
    activeTool: string;
    snapToGrid: boolean;
    complianceScore?: number;
    syncStatus?: 'synced' | 'syncing' | 'offline';
    runState?: 'ready' | 'running' | 'error' | 'disabled';
    canUndo: boolean;
    canRedo: boolean;
    hasUnsavedChanges: boolean;
    isSaving: boolean;

    // Actions
    onRenameFlow: (name: string) => void;
    setActiveTool: (tool: any) => void;
    setSnapToGrid: (enabled: boolean) => void;
    onAddNode: (type: string) => void;
    onAlignNodes: (dir: any) => void;
    onImportImage: () => void;
    onSave: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onExport: () => void;
    onOpenLibrary: () => void;
    onRun: () => void;
    searchQuery?: string;
    onSearch?: (query: string) => void;
    isSidebarOpen?: boolean;
    isSidebarMini?: boolean;
    selectedNodes?: any[];
    onToggleCommandPalette: () => void;
    onGroup?: () => void;
    onUngroup?: () => void;
    onLock?: () => void;
    onDelete?: () => void;
}

export const MoodboardTopBar: React.FC<MoodboardTopBarProps> = ({
    flowName,
    activeTool,
    snapToGrid,
    complianceScore = 95,
    syncStatus = 'synced',
    runState = 'ready',
    canUndo,
    canRedo,
    hasUnsavedChanges,
    isSaving,
    onRenameFlow,
    setActiveTool,
    setSnapToGrid,
    onAddNode,
    onAlignNodes,
    onImportImage,
    onSave,
    onUndo,
    onRedo,
    onExport,
    onOpenLibrary,
    onRun,
    searchQuery,
    onSearch,
    isSidebarOpen,
    isSidebarMini,
    selectedNodes = [],
    onToggleCommandPalette,
    onGroup,
    onUngroup,
    onLock,
    onDelete
}) => {
    const toolbar = useToolbarState();

    return (
        <header
            role="toolbar"
            className="
                absolute top-0 left-0 right-0 z-50 h-[48px] bg-card/80 border-b border-border/40 backdrop-blur-xl shadow-sm select-none
                flex items-center justify-between px-4 gap-4
            "
        >
            {/* Left Section: FILE (Group 1) & EDIT (Group 2) */}
            <div className="flex items-center gap-4 flex-1">
                <TopBarLeft
                    toolbar={toolbar}
                    onSave={onSave}
                    onUndo={onUndo}
                    onRedo={onRedo}
                    onExport={onExport}
                    onOpenLibrary={onOpenLibrary}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    hasUnsavedChanges={hasUnsavedChanges}
                    isSaving={isSaving}
                    onToggleCommandPalette={onToggleCommandPalette}
                    onDelete={onDelete}
                    searchQuery={searchQuery}
                    onSearch={onSearch}
                />
            </div>

            {/* Center Section: FORMAT (Group 3) */}
            <div className="flex justify-center flex-1">
                <TopBarCenter
                    toolbar={toolbar}
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    snapToGrid={snapToGrid}
                    setSnapToGrid={setSnapToGrid}
                    onAddNode={onAddNode}
                    onAlignNodes={onAlignNodes}
                    onImportImage={onImportImage}
                />
            </div>

            {/* Right Section: VIEW (Group 4) & USER (Group 5) */}
            <div className="flex justify-end items-center gap-4 flex-1">
                <TopBarRight
                    toolbar={toolbar}
                    workflowName={flowName}
                    onRename={onRenameFlow}
                    onRun={onRun}
                    runState={runState}
                    syncStatus={syncStatus}
                    complianceScore={complianceScore}
                    selectedNodes={selectedNodes}
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    onAddNode={onAddNode}
                    onImportImage={onImportImage}
                    onAlignNodes={onAlignNodes}
                    onGroup={onGroup}
                    onUngroup={onUngroup}
                    onLock={onLock}
                    onDelete={onDelete}
                />
            </div>
        </header>
    );
};
