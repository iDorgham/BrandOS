
import React from 'react';
import { Node } from '@xyflow/react';
import { NodeGroup, MoodNodeData } from '../../types';
import { CanvasContextMenu } from './menus/CanvasContextMenu';
import { NodeContextMenu } from './menus/NodeContextMenu';
import { GroupContextMenu } from './menus/GroupContextMenu';
import { ConnectionContextMenu } from './menus/ConnectionContextMenu';

export interface MoodBoardContextMenuProps {
    contextMenu: { id: string; x: number; y: number } | null;
    setContextMenu: (menu: { id: string; x: number; y: number } | null) => void;
    nodes: Node<MoodNodeData>[];
    setNodes: React.Dispatch<React.SetStateAction<Node<MoodNodeData>[]>>;
    updateNodeData: (id: string, data: Partial<MoodNodeData>) => void;
    onNodesDelete: (nodes: Node<MoodNodeData>[]) => void;
    onAlignNodes: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
    groups?: NodeGroup[];
    onCreateGroup?: (nodeIds: string[], name?: string) => void;
    onUngroupNodes?: (groupId: string) => void;
    onToggleCollapse?: (groupId: string) => void;
    onUpdateGroup?: (groupId: string, updates: Partial<NodeGroup>) => void;
    onDeleteGroup?: (groupId: string) => void;
    // Canvas actions
    onAddNode?: (type: string) => void;
    onClearCanvas?: () => void;
    onPaste?: () => void;
    canPaste?: boolean;
}

export const MoodBoardContextMenu: React.FC<MoodBoardContextMenuProps> = (props) => {
    const { contextMenu, setContextMenu, nodes, groups = [] } = props;

    if (!contextMenu) return null;

    // Identify context
    const isCanvasMenu = contextMenu.id === 'pane';
    const isConnectionMenu = contextMenu.id.startsWith('e-');
    const groupTarget = groups.find(g => g.id === contextMenu.id);
    const targetNode = nodes.find(n => n.id === contextMenu.id);

    // Common close handler
    const onClose = () => setContextMenu(null);

    // Render appropriate menu
    if (isCanvasMenu) {
        return <CanvasContextMenu {...props} onClose={onClose} />;
    }

    if (groupTarget) {
        return <GroupContextMenu {...props} group={groupTarget} onClose={onClose} />;
    }

    if (isConnectionMenu) {
        // We'll need to pass the edge ID if we had edge data, for now passing ID
        return <ConnectionContextMenu {...props} connectionId={contextMenu.id} onClose={onClose} />;
    }

    if (targetNode) {
        return <NodeContextMenu {...props} node={targetNode} onClose={onClose} />;
    }

    return null;
};
