
import React from 'react';
import {
    Maximize2, Edit3, AlignLeft, Copy, Trash2,
    Grid, Magnet, ZoomIn, ZoomOut
} from 'lucide-react';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { MenuItem, MenuSection, MenuDivider } from '../../shared/MenuItem';
import { MoodBoardContextMenuProps } from '../ContextMenu';

interface CanvasContextMenuProps extends MoodBoardContextMenuProps {
    onClose: () => void;
}

export const CanvasContextMenu: React.FC<CanvasContextMenuProps> = ({
    contextMenu,
    onClose,
    onAddNode,
    onPaste,
    canPaste,
    onClearCanvas
}) => {
    return (
        <DropdownMenu
            isOpen={!!contextMenu}
            onClose={onClose}
            position={contextMenu ? { x: contextMenu.x, y: contextMenu.y } : undefined}
            width={240}
        >
            <MenuSection label="Add Content" />
            <MenuItem
                icon={<Edit3 size={14} />}
                label="Add Note"
                shortcut="T"
                onClick={() => { onAddNode?.('note'); onClose(); }}
            />
            <MenuItem
                icon={<Maximize2 size={14} />}
                label="Add Ref Image"
                shortcut="I"
                onClick={() => { onAddNode?.('ref'); onClose(); }}
            />
            <MenuItem
                icon={<AlignLeft size={14} />}
                label="Add Label"
                shortcut="L"
                onClick={() => { onAddNode?.('label'); onClose(); }}
            />

            <MenuDivider />
            <MenuItem
                icon={<Copy size={14} />}
                label="Paste"
                shortcut="Ctrl+V"
                disabled={!canPaste}
                onClick={() => { onPaste?.(); onClose(); }}
            />

            <MenuDivider />
            <MenuSection label="Canvas Operations" />
            <MenuItem
                icon={<Maximize2 size={14} />}
                label="Fit to View"
                shortcut="F"
                onClick={() => { /* Fit view logic triggered via hook/shortcut usually, or passed down */ onClose(); }}
            />
            <MenuItem icon={<ZoomIn size={14} />} label="Zoom In" onClick={() => onClose()} />
            <MenuItem icon={<ZoomOut size={14} />} label="Zoom Out" onClick={() => onClose()} />
            <MenuDivider />
            <MenuItem icon={<Grid size={14} />} label="Grid Toggle" onClick={() => onClose()} />
            <MenuItem icon={<Magnet size={14} />} label="Snap to Grid" onClick={() => onClose()} />

            <MenuDivider />
            <MenuItem
                icon={<Trash2 size={14} />}
                label="Clear Canvas"
                variant="danger"
                onClick={() => { onClearCanvas?.(); onClose(); }}
            />
        </DropdownMenu>
    );
};
