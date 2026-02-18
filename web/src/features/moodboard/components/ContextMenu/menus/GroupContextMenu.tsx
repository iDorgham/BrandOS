
import React from 'react';
import { NodeGroup } from '../../../types';
import {
    Edit3, Copy, Trash2, Ungroup, ChevronsUpDown,
    ArrowUpToLine, ArrowDownToLine, Lock, Eye
} from 'lucide-react';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { MenuItem, MenuSection, MenuDivider } from '../../shared/MenuItem';
import { MoodBoardContextMenuProps } from '../ContextMenu';

interface GroupContextMenuProps extends MoodBoardContextMenuProps {
    group: NodeGroup;
    onClose: () => void;
}

export const GroupContextMenu: React.FC<GroupContextMenuProps> = ({
    contextMenu,
    onClose,
    group,
    onUngroupNodes,
    onToggleCollapse,
    onUpdateGroup,
    onDeleteGroup
}) => {
    return (
        <DropdownMenu
            isOpen={!!contextMenu}
            onClose={onClose}
            position={contextMenu ? { x: contextMenu.x, y: contextMenu.y } : undefined}
            width={240}
        >
            <MenuSection label="Group Operations" />

            <MenuItem
                icon={<Edit3 size={14} />}
                label="Rename Group"
                onClick={() => {
                    const newName = prompt("Rename group:", group.name);
                    if (newName) onUpdateGroup?.(group.id, { name: newName });
                    onClose();
                }}
            />
            <MenuItem
                icon={<Copy size={14} />}
                label="Duplicate Group"
                onClick={() => onClose()}
            />
            <MenuItem
                icon={<Trash2 size={14} />}
                label="Delete Group"
                variant="danger"
                onClick={() => {
                    if (confirm(`Delete group "${group.name}"?`)) {
                        onDeleteGroup?.(group.id);
                    }
                    onClose();
                }}
            />

            <MenuDivider />
            <MenuSection label="Group Settings" />
            <MenuItem
                icon={<Ungroup size={14} />}
                label="Ungroup"
                shortcut="Ctrl+Shift+G"
                onClick={() => {
                    onUngroupNodes?.(group.id);
                    onClose();
                }}
            />
            <MenuItem
                icon={<ChevronsUpDown size={14} />}
                label={group.isCollapsed ? "Expand Group" : "Collapse Group"}
                onClick={() => {
                    onToggleCollapse?.(group.id);
                    onClose();
                }}
            />

            <MenuDivider />
            <MenuSection label="Visuals" />
            <div className="flex gap-2 px-4 py-1">
                {['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'].map(colorClass => (
                    <button
                        key={colorClass}
                        className={`w-4 h-4 rounded-full border border-white/10 hover:scale-125 transition-transform ${colorClass}`}
                        onClick={() => {
                            onUpdateGroup?.(group.id, { color: colorClass });
                            onClose();
                        }}
                    />
                ))}
            </div>
        </DropdownMenu>
    );
};
