import React from 'react';
import { TOOLBAR_REGISTRY } from './ToolbarRegistry';
import { ToolbarButton, ToolbarGroup, ToolbarSeparator, ToolbarSelect } from './ToolbarComponents';

interface TopBarCenterProps {
    toolbar: any;
    activeTool: string;
    setActiveTool: (tool: any) => void;
    snapToGrid: boolean;
    setSnapToGrid: (enabled: boolean) => void;
    onAddNode: (type: string) => void;
    onAlignNodes: (dir: any) => void;
    onImportImage: () => void;
}

export const TopBarCenter: React.FC<TopBarCenterProps> = ({
    toolbar,
    onAlignNodes,
}) => {
    const { state, activeToolId, onHoverStart, onHoverEnd, onToolClick } = toolbar;
    const showLabels = state === 'VISIBLE_HOVER' || state === 'VISIBLE_ACTIVE';

    // Filter tools for Group 3 (FORMAT)
    const formatTools = TOOLBAR_REGISTRY.filter(t => t.groupId === 'FORMAT');

    const handleAction = (actionId: string) => {
        onToolClick(actionId);
        switch (actionId) {
            case 'align_left': onAlignNodes('left'); break;
            case 'align_center': onAlignNodes('center'); break;
            case 'align_right': onAlignNodes('right'); break;
            // Add more formatting actions as they are implemented in parent
            default: console.log(`Formatting action ${actionId} triggered`);
        }
    };

    return (
        <div className="flex justify-center h-full">
            {/* GROUP 3: FORMAT OPERATIONS */}
            <ToolbarGroup className="bg-white/[0.03]">
                {formatTools.map((tool, index) => (
                    <React.Fragment key={tool.id}>
                        {/* Add internal separators for sub-grouping (optional based on visual spec) */}
                        {index > 0 && ['align_left', 'text_color'].includes(tool.id) && (
                            <div className="w-px h-4 bg-white/10 mx-1 self-center" />
                        )}

                        {tool.type === 'dropdown' && tool.id === 'typography' ? (
                             <ToolbarSelect
                                value={"Inter"} // Placeholder, would need actual state prop
                                onChange={(val) => console.log('Font change:', val)}
                                options={[
                                    { label: 'Inter', value: 'Inter', style: { fontFamily: 'Inter' } },
                                    { label: 'Roboto', value: 'Roboto', style: { fontFamily: 'Roboto' } },
                                    { label: 'Playfair', value: 'Playfair Display', style: { fontFamily: 'Playfair Display' } },
                                    { label: 'Space Mono', value: 'Space Grotesk', style: { fontFamily: 'Space Grotesk' } },
                                ]}
                                placeholder="Font"
                                width="w-28"
                            />
                        ) : (
                            <ToolbarButton
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
                        )}
                    </React.Fragment>
                ))}
            </ToolbarGroup>
        </div>
    );
};
