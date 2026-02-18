
import React from 'react';
import {
    Edit3, Copy, Trash2, ArrowRight
} from 'lucide-react';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { MenuItem, MenuSection, MenuDivider } from '../../shared/MenuItem';
import { MoodBoardContextMenuProps } from '../ContextMenu';

interface ConnectionContextMenuProps extends MoodBoardContextMenuProps {
    connectionId: string;
    onClose: () => void;
}

export const ConnectionContextMenu: React.FC<ConnectionContextMenuProps> = ({
    contextMenu,
    onClose,
    connectionId,
    // We would need an onEdgeUpdate prop normally
}) => {
    return (
        <DropdownMenu
            isOpen={!!contextMenu}
            onClose={onClose}
            position={contextMenu ? { x: contextMenu.x, y: contextMenu.y } : undefined}
            width={240}
        >
            <MenuSection label="Connection Operations" />

            <MenuItem
                icon={<Edit3 size={14} />}
                label="Edit Connection"
                onClick={() => onClose()}
            />
            <MenuItem
                icon={<Copy size={14} />}
                label="Duplicate Connection"
                onClick={() => onClose()}
            />
            <MenuItem
                icon={<Trash2 size={14} />}
                label="Delete Connection"
                shortcut="Del"
                variant="danger"
                onClick={() => {
                    // Logic to delete edge would go here
                    onClose();
                }}
            />

            <MenuDivider />
            <MenuSection label="Style" />
            <MenuItem icon={<ArrowRight size={14} />} label="Line Style" onClick={() => onClose()} />
        </DropdownMenu>
    );
};
