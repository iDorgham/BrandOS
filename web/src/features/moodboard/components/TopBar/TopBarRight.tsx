import React, { useState } from 'react';
import { TOOLBAR_REGISTRY } from './ToolbarRegistry';
import { ToolbarButton, ToolbarGroup, ToolbarSeparator } from './ToolbarComponents';
import { useReactFlow, useViewport } from '@xyflow/react';
import { Play, RotateCw, AlertCircle, CheckCircle2, Cloud } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../../../components/ui/tooltip";

interface TopBarRightProps {
    toolbar: any;
    workflowName: string;
    onRename: (name: string) => void;
    onRun: () => void;
    runState?: 'ready' | 'running' | 'error' | 'disabled';
    syncStatus?: 'synced' | 'syncing' | 'offline';
    complianceScore: number;
    selectedNodes?: any[];
    activeTool?: string;
    setActiveTool?: (tool: any) => void;
    onAddNode?: (type: string) => void;
    onImportImage?: () => void;
    onAlignNodes?: (dir: any) => void;
    onGroup?: () => void;
    onUngroup?: () => void;
    onLock?: () => void;
    onDelete?: () => void;
}

export const TopBarRight: React.FC<TopBarRightProps> = ({
    toolbar,
    workflowName,
    onRename,
    onRun,
    runState = 'ready',
    syncStatus = 'synced',
    complianceScore,
}) => {
    const { state, activeToolId, onHoverStart, onHoverEnd, onToolClick } = toolbar;
    const showLabels = state === 'VISIBLE_HOVER' || state === 'VISIBLE_ACTIVE';
    const { zoomIn, zoomOut, fitView, zoomTo } = useReactFlow();
    const { zoom } = useViewport();

    // Filter tools for Group 4 (VIEW) and Group 5 (USER)
    const viewTools = TOOLBAR_REGISTRY.filter(t => t.groupId === 'VIEW');
    const userTools = TOOLBAR_REGISTRY.filter(t => t.groupId === 'USER');

    const handleAction = (actionId: string) => {
        onToolClick(actionId);
        switch (actionId) {
            case 'zoom_in': zoomIn(); break;
            case 'zoom_out': zoomOut(); break;
            case 'reset_zoom': zoomTo(1); break;
            case 'fit_view': fitView({ duration: 400, padding: 0.2 }); break;
            default: console.log(`User/View action ${actionId} triggered`);
        }
    };

    // Run Button Configuration
    const runConfig = {
        disabled: { bg: 'bg-[var(--cds-interactive-02)] text-[var(--cds-text-placeholder)] cursor-not-allowed', icon: Play, text: 'Run', animate: false },
        ready: { bg: 'bg-[var(--cds-interactive-01)] text-[var(--cds-text-on-color)] hover:bg-[var(--cds-link-primary-hover)] shadow-sm', icon: Play, text: 'Run', animate: false },
        running: { bg: 'bg-[var(--cds-interactive-01)] text-[var(--cds-text-on-color)] cursor-wait', icon: RotateCw, text: 'Running...', animate: true },
        error: { bg: 'bg-[var(--cds-support-error)] text-[var(--cds-text-on-color)]', icon: AlertCircle, text: 'Retry', animate: false }
    };
    const currentRunConfig = runConfig[runState];
    const RunIcon = currentRunConfig.icon;

    return (
        <div className="flex items-center gap-4 h-full">
            {/* GROUP 4: VIEW OPERATIONS */}
            <ToolbarGroup>
                {viewTools.map(tool => (
                    <ToolbarButton
                        key={tool.id}
                        id={tool.id}
                        label={tool.label}
                        icon={tool.icon}
                        shortcut={tool.shortcut}
                        onClick={() => handleAction(tool.id)}
                        isActive={activeToolId === tool.id}
                        showLabel={showLabels && activeToolId === tool.id}
                        onHover={onHoverStart}
                        onLeave={onHoverEnd}
                    />
                ))}

                {/* Fixed percentage display (hidden zoom slider as per requirement) */}
                <span className="text-[10px] font-mono w-10 text-center text-[var(--cds-text-secondary)] opacity-60">
                    {Math.round(zoom * 100)}%
                </span>
            </ToolbarGroup>

            <ToolbarSeparator />

            {/* Workflow Info (Renamed centered in requirement, but we keep it functional) */}
            <div className="flex flex-col items-center gap-0.5 min-w-[120px]">
                <input
                    value={workflowName}
                    onChange={(e) => onRename(e.target.value)}
                    placeholder="Untitled Workflow"
                    className="bg-transparent text-[12px] font-medium text-center text-[var(--cds-text-primary)] placeholder:text-[var(--cds-text-placeholder)] border-b border-transparent hover:border-[var(--cds-layer-03)] focus:border-[var(--cds-interactive-01)] outline-none transition-colors w-full"
                />
                <div className="flex items-center gap-2 opacity-40">
                    {syncStatus === 'synced' && <CheckCircle2 size={10} className="text-[var(--cds-support-success)]" />}
                    <span className="text-[8px] font-mono tracking-tighter uppercase">{syncStatus}</span>
                </div>
            </div>

            <ToolbarSeparator />

            {/* GROUP 5: USER CONTROLS */}
            <div className="flex items-center gap-2">
                <ToolbarGroup>
                    {userTools.map(tool => (
                        <ToolbarButton
                            key={tool.id}
                            id={tool.id}
                            label={tool.label}
                            icon={tool.icon}
                            onClick={() => handleAction(tool.id)}
                            isActive={activeToolId === tool.id}
                            showLabel={showLabels && activeToolId === tool.id}
                            onHover={onHoverStart}
                            onLeave={onHoverEnd}
                        />
                    ))}
                </ToolbarGroup>

                {/* Status Indicators */}
                <div className="flex items-center gap-3 ml-2">
                    <TooltipProvider>
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <div className={`
                                    w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold cursor-help
                                    ${complianceScore >= 90 ? 'bg-[var(--cds-support-success)]/10 text-[var(--cds-support-success)] border border-[var(--cds-support-success)]/20 shadow-[0_0_10px_rgba(36,161,72,0.1)]' : 'bg-[var(--cds-support-warning)]/10 text-[var(--cds-support-warning)]'}
                                `}>
                                    {complianceScore}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Brand Compliance: {complianceScore}%</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <button
                        onClick={onRun}
                        disabled={runState === 'disabled'}
                        className={`
                            flex items-center gap-2 h-8 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200
                            ${currentRunConfig.bg}
                            ${runState === 'ready' ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}
                        `}
                    >
                        <RunIcon size={14} className={currentRunConfig.animate ? 'animate-spin' : ''} />
                        <span>{currentRunConfig.text}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
