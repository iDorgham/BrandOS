import {
    Search, Plus, Save, Share2, FileOutput,
    Undo2, Redo2, ChevronUp, ChevronDown, Copy, Trash2,
    Type, AlignLeft, AlignCenter, AlignRight, Palette,
    ZoomIn, ZoomOut, Maximize2, Scan,
    Bell, User, Settings,
    Bold, Italic, Underline
} from 'lucide-react';

export type ToolGroupId = 'FILE' | 'EDIT' | 'FORMAT' | 'VIEW' | 'USER';

export interface ToolDefinition {
    id: string;
    groupId: ToolGroupId;
    label: string;
    icon: any;
    shortcut?: string;
    action?: string;
    type?: 'action' | 'toggle' | 'dropdown' | 'color';
    isDisabled?: (context: any) => boolean;
    isActive?: (context: any) => boolean;
}

export const TOOLBAR_REGISTRY: ToolDefinition[] = [
    // GROUP 1: FILE OPERATIONS
    { id: 'search', groupId: 'FILE', label: 'Search', icon: Search, shortcut: 'Ctrl+F', action: 'search' },
    { id: 'new', groupId: 'FILE', label: 'New Board', icon: Plus, shortcut: 'Ctrl+N', action: 'new' },
    { id: 'save', groupId: 'FILE', label: 'Save', icon: Save, shortcut: 'Ctrl+S', action: 'save' },
    { id: 'export', groupId: 'FILE', label: 'Export', icon: FileOutput, shortcut: 'Ctrl+E', action: 'export' },
    { id: 'share', groupId: 'FILE', label: 'Share', icon: Share2, action: 'share' },

    // GROUP 2: EDIT OPERATIONS
    { id: 'undo', groupId: 'EDIT', label: 'Undo', icon: Undo2, shortcut: 'Ctrl+Z', action: 'undo' },
    { id: 'redo', groupId: 'EDIT', label: 'Redo', icon: Redo2, shortcut: 'Ctrl+Y', action: 'redo' },
    { id: 'bring_forward', groupId: 'EDIT', label: 'Bring Forward', icon: ChevronUp, shortcut: 'Ctrl+]', action: 'bring_forward' },
    { id: 'send_backward', groupId: 'EDIT', label: 'Send Backward', icon: ChevronDown, shortcut: 'Ctrl+[', action: 'send_backward' },
    { id: 'duplicate', groupId: 'EDIT', label: 'Duplicate', icon: Copy, shortcut: 'Ctrl+D', action: 'duplicate' },
    { id: 'delete', groupId: 'EDIT', label: 'Delete', icon: Trash2, shortcut: 'Del', action: 'delete' },

    // GROUP 3: FORMAT OPERATIONS
    { id: 'typography', groupId: 'FORMAT', label: 'Font', icon: Type, type: 'dropdown', action: 'font' },
    { id: 'bold', groupId: 'FORMAT', label: 'Bold', icon: Bold, shortcut: 'Ctrl+B', type: 'toggle', action: 'bold' },
    { id: 'italic', groupId: 'FORMAT', label: 'Italic', icon: Italic, shortcut: 'Ctrl+I', type: 'toggle', action: 'italic' },
    { id: 'underline', groupId: 'FORMAT', label: 'Underline', icon: Underline, shortcut: 'Ctrl+U', type: 'toggle', action: 'underline' },
    { id: 'align_left', groupId: 'FORMAT', label: 'Align Left', icon: AlignLeft, type: 'toggle', action: 'align_left' },
    { id: 'align_center', groupId: 'FORMAT', label: 'Align Center', icon: AlignCenter, type: 'toggle', action: 'align_center' },
    { id: 'align_right', groupId: 'FORMAT', label: 'Align Right', icon: AlignRight, type: 'toggle', action: 'align_right' },
    { id: 'text_color', groupId: 'FORMAT', label: 'Text Color', icon: Type, type: 'color', action: 'text_color' },
    { id: 'node_color', groupId: 'FORMAT', label: 'Node Color', icon: Palette, type: 'color', action: 'node_color' },

    // GROUP 4: VIEW OPERATIONS
    { id: 'zoom_in', groupId: 'VIEW', label: 'Zoom In', icon: ZoomIn, shortcut: 'Ctrl++', action: 'zoom_in' },
    { id: 'zoom_out', groupId: 'VIEW', label: 'Zoom Out', icon: ZoomOut, shortcut: 'Ctrl+-', action: 'zoom_out' },
    { id: 'reset_zoom', groupId: 'VIEW', label: 'Reset Zoom', icon: Maximize2, shortcut: 'Ctrl+0', action: 'reset_zoom' },
    { id: 'fit_view', groupId: 'VIEW', label: 'Fit to View', icon: Scan, shortcut: 'Ctrl+Shift+0', action: 'fit_view' },

    // GROUP 5: USER CONTROLS
    { id: 'notifications', groupId: 'USER', label: 'Notifications', icon: Bell, action: 'notifications' },
    { id: 'user_menu', groupId: 'USER', label: 'Account', icon: User, action: 'user_menu' },
    { id: 'settings', groupId: 'USER', label: 'Settings', icon: Settings, action: 'settings' },
];
