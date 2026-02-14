import { useEffect } from 'react';
import { useReactFlow, Node } from '@xyflow/react';
import { MoodNodeData, NodeGroup } from '../types';

export const useBoardShortcuts = (
    undo: () => void,
    redo: () => void,
    handleManualSave: () => void,
    onNodesDelete: (nodes: Node[]) => void,
    duplicateNode: (node: Node<MoodNodeData>) => void,
    nodes: Node<MoodNodeData>[],
    createGroup?: (nodeIds: string[], name?: string) => string | null,
    ungroupNodes?: (groupId: string) => void,
    groups?: NodeGroup[]
) => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            // Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z
            if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                undo();
            } else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
                e.preventDefault();
                redo();
            }
            // Ctrl+S
            else if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleManualSave();
            }
            // Ctrl+G: Create group from selected nodes
            else if (e.ctrlKey && e.key === 'g' && !e.shiftKey) {
                e.preventDefault();
                const selectedNodes = nodes.filter(n => n.selected);
                if (selectedNodes.length >= 2 && createGroup) {
                    createGroup(selectedNodes.map(n => n.id));
                }
            }
            // Ctrl+Shift+G: Ungroup
            else if (e.ctrlKey && e.shiftKey && e.key === 'G') {
                e.preventDefault();
                if (ungroupNodes && groups) {
                    const selectedNode = nodes.find(n => n.selected);
                    if (selectedNode?.data.groupId) {
                        ungroupNodes(selectedNode.data.groupId as string);
                    }
                }
            }
            // Zoom: Ctrl+ / Ctrl- / Ctrl0
            else if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
                e.preventDefault();
                zoomIn({ duration: 300 });
            } else if (e.ctrlKey && e.key === '-') {
                e.preventDefault();
                zoomOut({ duration: 300 });
            } else if (e.ctrlKey && e.key === '0') {
                e.preventDefault();
                fitView({ duration: 300, padding: 0.2 });
            }
            // Delete / Backspace
            else if (e.key === 'Delete' || e.key === 'Backspace') {
                const selectedNodes = nodes.filter(n => n.selected);
                if (selectedNodes.length > 0) {
                    onNodesDelete(selectedNodes);
                }
            }
            // Duplicate: Ctrl+D
            else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                const selectedNode = nodes.find(n => n.selected);
                if (selectedNode) {
                    duplicateNode(selectedNode as any);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, handleManualSave, onNodesDelete, duplicateNode, nodes, zoomIn, zoomOut, fitView, createGroup, ungroupNodes, groups]);
};
