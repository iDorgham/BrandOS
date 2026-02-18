
import React, { useState } from 'react';
import { Node } from '@xyflow/react';
import { MoodNodeData } from '../../../types';
import {
    Edit3, Copy, Trash2, ArrowUpToLine, ArrowDownToLine,
    Lock, Unlock, Eye, EyeOff, Group, Ungroup,
    AlignLeft, AlignCenter, AlignRight, AlignStartVertical, AlignCenterVertical, AlignEndVertical
} from 'lucide-react';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { MenuItem, MenuSection, MenuDivider } from '../../shared/MenuItem';
import { MoodBoardContextMenuProps } from '../ContextMenu'; // Correct import path to type definition
import { toast } from 'sonner';
import { generateId } from '@/utils';

interface NodeContextMenuProps extends MoodBoardContextMenuProps {
    node: Node<MoodNodeData>;
    onClose: () => void;
}

export const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
    contextMenu,
    onClose,
    node,
    nodes,
    setNodes,
    updateNodeData,
    onNodesDelete,
    onAlignNodes,
    onCreateGroup,
    onUngroupNodes,
    groups = []
}) => {
    const [isRenameMode, setIsRenameMode] = useState(false);
    const selectedNodes = nodes.filter(n => n.selected);
    const multiSelect = selectedNodes.length > 1;

    // Node state
    const isLocked = node.data.isLocked;
    const isHidden = (node.style?.opacity as number || 1) <= 0;
    const nodeGroupId = node.data.groupId as string | undefined;
    const nodeGroup = nodeGroupId ? groups.find(g => g.id === nodeGroupId) : undefined;

    const handleDuplicate = () => {
        const nodesToDuplicate = multiSelect ? selectedNodes : [node];
        nodesToDuplicate.forEach(n => {
            const newNode: Node<MoodNodeData> = {
                ...n,
                id: generateId(),
                position: { x: n.position.x + 30, y: n.position.y + 30 },
                selected: true,
                data: { ...n.data } // Deep copy needed in real app
            };
            setNodes(nds => [...nds.map(node => ({ ...node, selected: false })), newNode]);
        });
        toast.success(`Duplicated ${nodesToDuplicate.length} items`);
        onClose();
    };

    const handleLayer = (action: 'front' | 'back') => {
        setNodes(nds => {
            if (action === 'front') {
                const maxZ = Math.max(...nds.map(n => n.zIndex || 0));
                return nds.map(n => n.selected ? { ...n, zIndex: maxZ + 1 } : n);
            } else {
                const minZ = Math.min(...nds.map(n => n.zIndex || 0));
                return nds.map(n => n.selected ? { ...n, zIndex: minZ - 1 } : n);
            }
        });
        onClose();
    };

    return (
        <DropdownMenu
            isOpen={!!contextMenu}
            onClose={onClose}
            position={contextMenu ? { x: contextMenu.x, y: contextMenu.y } : undefined}
            width={240}
        >
            <MenuSection label={multiSelect ? `${selectedNodes.length} Selected` : (node.data.label || 'Node Operations')} />

            <MenuItem
                icon={<Edit3 size={14} />}
                label="Rename"
                shortcut="F2"
                onClick={() => {
                    const newName = prompt("Rename node:", node.data.label);
                    if (newName) updateNodeData(node.id, { label: newName });
                    onClose();
                }}
            />
            <MenuItem
                icon={<Copy size={14} />}
                label="Duplicate"
                shortcut="Ctrl+D"
                onClick={handleDuplicate}
            />
            <MenuItem
                icon={<Copy size={14} />}
                label="Copy"
                shortcut="Ctrl+C"
                onClick={() => onClose()}
            />
            <MenuItem
                icon={<Trash2 size={14} />}
                label="Delete"
                shortcut="Del"
                variant="danger"
                onClick={() => {
                    onNodesDelete(multiSelect ? selectedNodes : [node]);
                    onClose();
                }}
            />

            <MenuDivider />
            <MenuSection label="Layer Management" />
            <MenuItem icon={<ArrowUpToLine size={14} />} label="Bring to Front" onClick={() => handleLayer('front')} />
            <MenuItem icon={<ArrowDownToLine size={14} />} label="Send to Back" onClick={() => handleLayer('back')} />
            <MenuItem
                icon={isLocked ? <Unlock size={14} /> : <Lock size={14} />}
                label={isLocked ? "Unlock" : "Lock"}
                onClick={() => {
                    if (multiSelect) {
                        selectedNodes.forEach(n => updateNodeData(n.id, { isLocked: !n.data.isLocked }));
                    } else {
                        updateNodeData(node.id, { isLocked: !isLocked });
                    }
                    onClose();
                }}
            />
            <MenuItem
                icon={isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
                label={isHidden ? "Show" : "Hide"}
                onClick={() => {
                    // Style update logic would go here
                    onClose();
                }}
            />

            {multiSelect && (
                <>
                    <MenuDivider />
                    <MenuSection label="Alignment" />
                    <div className="flex justify-between px-2">
                        <button onClick={() => onAlignNodes('left')} className="p-1 hover:bg-[#393939] rounded"><AlignLeft size={14} /></button>
                        <button onClick={() => onAlignNodes('center')} className="p-1 hover:bg-[#393939] rounded"><AlignCenter size={14} /></button>
                        <button onClick={() => onAlignNodes('right')} className="p-1 hover:bg-[#393939] rounded"><AlignRight size={14} /></button>
                        <div className="w-px h-4 bg-gray-700 mx-1" />
                        <button onClick={() => onAlignNodes('top')} className="p-1 hover:bg-[#393939] rounded"><AlignStartVertical size={14} /></button>
                        <button onClick={() => onAlignNodes('middle')} className="p-1 hover:bg-[#393939] rounded"><AlignCenterVertical size={14} /></button>
                        <button onClick={() => onAlignNodes('bottom')} className="p-1 hover:bg-[#393939] rounded"><AlignEndVertical size={14} /></button>
                    </div>
                </>
            )}

            {multiSelect && onCreateGroup && (
                <>
                    <MenuDivider />
                    <MenuItem
                        icon={<Group size={14} />}
                        label="Group Selected"
                        shortcut="Ctrl+G"
                        onClick={() => {
                            onCreateGroup(selectedNodes.map(n => n.id));
                            onClose();
                        }}
                    />
                </>
            )}

            {nodeGroup && onUngroupNodes && (
                <>
                    <MenuDivider />
                    <MenuSection label={`In Group: ${nodeGroup.name}`} />
                    <MenuItem
                        icon={<Ungroup size={14} />}
                        label="Ungroup"
                        onClick={() => {
                            onUngroupNodes(nodeGroup.id);
                            onClose();
                        }}
                    />
                </>
            )}

            <MenuDivider />
            <MenuSection label="Brand Settings" />
            <div className="flex gap-2 px-4 py-1">
                {['#0F62FE', '#24A148', '#FF832B', '#DA1E28', '#8D8D8D'].map(color => (
                    <button
                        key={color}
                        className="w-4 h-4 rounded-full border border-white/10 hover:scale-125 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                            updateNodeData(node.id, { color });
                            onClose();
                        }}
                    />
                ))}
            </div>
        </DropdownMenu>
    );
};
