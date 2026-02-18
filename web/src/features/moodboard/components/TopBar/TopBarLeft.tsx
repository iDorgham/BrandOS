import React from 'react';
import { TOOLBAR_REGISTRY } from './ToolbarRegistry';
import { ToolbarButton, ToolbarGroup, ToolbarSeparator, ToolbarSearchInput } from './ToolbarComponents';

interface TopBarLeftProps {
    toolbar: any;
    onSave: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onExport: () => void;
    onOpenLibrary: () => void;
    canUndo: boolean;
    canRedo: boolean;
    hasUnsavedChanges: boolean;
    isSaving: boolean;
    onToggleCommandPalette: () => void;
    onDelete?: () => void;
    searchQuery?: string;
    onSearch?: (query: string) => void;
}

export const TopBarLeft: React.FC<TopBarLeftProps> = ({
    toolbar,
    onSave,
    onUndo,
    onRedo,
    onExport,
    onOpenLibrary,
    canUndo,
    canRedo,
    hasUnsavedChanges,
    isSaving,
    onToggleCommandPalette,
    onDelete,
    searchQuery = '',
    onSearch
}) => {
    const { state, activeToolId, onHoverStart, onHoverEnd, onToolClick } = toolbar;
    const showLabels = state === 'VISIBLE_HOVER' || state === 'VISIBLE_ACTIVE';

    // Filter tools for Group 1 (FILE) and Group 2 (EDIT)
    // Exclude 'search' from the button list as it's now an input
    const fileTools = TOOLBAR_REGISTRY.filter(t => t.groupId === 'FILE' && t.id !== 'search');
    const editTools = TOOLBAR_REGISTRY.filter(t => t.groupId === 'EDIT');

    const handleAction = (actionId: string) => {
        onToolClick(actionId);
        switch (actionId) {
            case 'search': onToggleCommandPalette(); break;
            case 'new': onOpenLibrary(); break; // Assuming new is related to library for now
            case 'save': onSave(); break;
            case 'undo': onUndo(); break;
            case 'redo': onRedo(); break;
            case 'export': onExport(); break;
            case 'delete': onDelete?.(); break;
            default: console.log(`Unhandled action: ${actionId}`);
        }
    };

    return (
        <div className="flex items-center gap-4 h-full">
            {/* GROUP 1: FILE OPERATIONS */}
            <ToolbarGroup>
                {/* Search Input */}
                {onSearch && (
                  <div className="mr-1">
                    <ToolbarSearchInput 
                      value={searchQuery} 
                      onChange={onSearch} 
                      placeholder="Search brand OS..."
                    />
                  </div>
                )}
                
                {fileTools.map(tool => (
                    <ToolbarButton
                        key={tool.id}
                        id={tool.id}
                        label={tool.label}
                        icon={tool.icon}
                        shortcut={tool.shortcut}
                        onClick={() => handleAction(tool.id)}
                        isActive={activeToolId === tool.id}
                        isDisabled={tool.id === 'save' && !hasUnsavedChanges || isSaving}
                        showLabel={showLabels && activeToolId === tool.id}
                        onHover={onHoverStart}
                        onLeave={onHoverEnd}
                    />
                ))}
            </ToolbarGroup>

            <ToolbarSeparator />

            {/* GROUP 2: EDIT OPERATIONS */}
            <ToolbarGroup>
                {editTools.map(tool => (
                    <ToolbarButton
                        key={tool.id}
                        id={tool.id}
                        label={tool.label}
                        icon={tool.icon}
                        shortcut={tool.shortcut}
                        onClick={() => handleAction(tool.id)}
                        isActive={activeToolId === tool.id}
                        isDisabled={
                            (tool.id === 'undo' && !canUndo) ||
                            (tool.id === 'redo' && !canRedo)
                        }
                        showLabel={showLabels && activeToolId === tool.id}
                        onHover={onHoverStart}
                        onLeave={onHoverEnd}
                    />
                ))}
            </ToolbarGroup>
        </div>
    );
};
