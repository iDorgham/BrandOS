import { useCallback, useState } from 'react';
import { Node, Edge, useReactFlow } from '@xyflow/react';
import { MoodNodeData } from '../types';
import { BrandProfile } from '@/types';
import { generateId } from '@/utils';
import { toast } from 'sonner';
import { prepareTemplate } from '../WorkflowSequences';

export const STANDARD_NODE_WIDTH = 340;

export const useBoardActions = (
    brand: BrandProfile,
    nodes: Node<MoodNodeData>[],
    setNodes: React.Dispatch<React.SetStateAction<Node<MoodNodeData>[]>>,
    edges: Edge[],
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
    updateNodeData: (id: string, newData: Partial<MoodNodeData>, style?: React.CSSProperties) => void,
    setHasUnsavedChanges: (val: boolean) => void,
    lastSavedStateRef: React.MutableRefObject<string>,
    selectedMoodboard: any,
    updateMoodboard: (data: any) => Promise<void>
) => {
    const { screenToFlowPosition } = useReactFlow();
    const [isSaving, setIsSaving] = useState(false);

    const onNodesDelete = useCallback((nodesToDelete: Node[]) => {
        setNodes((nds) => nds.filter((node) => !nodesToDelete.some((deletedNode) => deletedNode.id === node.id)));
        toast.info('Nodes removed from workspace');
        setHasUnsavedChanges(true);
    }, [setNodes, setHasUnsavedChanges]);

    const onEdgesDelete = useCallback((edgesToDelete: Edge[]) => {
        setEdges((eds) => eds.filter((edge) => !edgesToDelete.some((deletedEdge) => deletedEdge.id === edge.id)));
        toast.success('Logic stream severed');
        setHasUnsavedChanges(true);
    }, [setEdges, setHasUnsavedChanges]);

    const addNode = useCallback((type: MoodNodeData['type'], position?: { x: number, y: number }, dimensions?: { width: number, height: number }) => {
        const defaults: Partial<MoodNodeData> = { isActive: true };
        if (type === 'preset') defaults.variant = 'cinematic';
        if (type === 'texture') { defaults.variant = 'grainy'; defaults.intensity = 50; }
        if (type === 'palette' && brand.palette.length > 0) {
            defaults.color = brand.palette[0].hex;
            defaults.label = brand.palette[0].label;
        }
        if (type === 'negative') defaults.content = '';

        const getInitialDimensions = (nodeType: MoodNodeData['type']) => {
            switch (nodeType) {
                case 'title': return { width: STANDARD_NODE_WIDTH, height: 180 };
                case 'label': return { width: STANDARD_NODE_WIDTH, height: 80 };
                case 'section': return { width: STANDARD_NODE_WIDTH * 2, height: STANDARD_NODE_WIDTH };
                case 'image':
                case 'text':
                case 'negative':
                case 'spotify':
                case 'weather':
                case 'reference':
                case 'cms_sync':
                case 'logic':
                case 'tone':
                case 'texture':
                case 'icons':
                case 'grid':
                case 'mood_gauge':
                    return { width: STANDARD_NODE_WIDTH, height: STANDARD_NODE_WIDTH };
                case 'competitor': return { width: STANDARD_NODE_WIDTH, height: 420 };
                case 'web_ref': return { width: STANDARD_NODE_WIDTH, height: 420 };
                case 'midjourney': return { width: STANDARD_NODE_WIDTH, height: 480 };
                case 'typography': return { width: STANDARD_NODE_WIDTH, height: 460 };
                case 'palette': return { width: STANDARD_NODE_WIDTH, height: 420 };
                case 'paragraph': return { width: STANDARD_NODE_WIDTH, height: 480 };
                case 'preset': return { width: STANDARD_NODE_WIDTH, height: 200 };
                case 'attribute': return { width: STANDARD_NODE_WIDTH, height: 240 };
                case 'content_gen': return { width: STANDARD_NODE_WIDTH, height: 480 };
                case 'content_rewriter': return { width: STANDARD_NODE_WIDTH, height: 480 };
                case 'headline_gen': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'seo_optimizer': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'hashtag_gen': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'social_poster': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'scheduler': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'story_creator': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'email_sender': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'webhook': return { width: STANDARD_NODE_WIDTH, height: 400 };
                case 'api_request': return { width: STANDARD_NODE_WIDTH, height: 400 };
                default: return { width: STANDARD_NODE_WIDTH, height: STANDARD_NODE_WIDTH };
            }
        };

        const dims = dimensions || getInitialDimensions(type);

        const newNode: Node<MoodNodeData> = {
            id: generateId(),
            type,
            position: position || { x: Math.random() * 400, y: Math.random() * 300 },
            style: { width: dims.width, height: dims.height },
            zIndex: type === 'section' ? 1 : 10,
            draggable: true,
            selectable: true,
            data: {
                label: `${type.charAt(0).toUpperCase() + type.slice(1)} Module`,
                type,
                ...defaults,
                isLocked: false,
                onChange: updateNodeData,
            },
        };
        setNodes((nds: any) => [...nds, newNode]);
        toast.success(`${type} module initialized`);
    }, [setNodes, updateNodeData, brand.palette]);

    const duplicateNode = useCallback((node: Node<MoodNodeData>) => {
        const newNode: Node<MoodNodeData> = {
            ...node,
            id: generateId(),
            position: { x: node.position.x + 40, y: node.position.y + 40 },
            selected: true,
        };
        setNodes((nds) => [...nds.map(n => ({ ...n, selected: false })), newNode]);
        toast.success('Node duplicated');
    }, [setNodes]);

    const handleManualSave = useCallback(async () => {
        if (!selectedMoodboard || isSaving) return;

        try {
            setIsSaving(true);

            const nodesToSave = nodes.map(node => {
                const { onChange, ...rest } = node.data;
                return {
                    ...node,
                    data: rest,
                    selected: false,
                };
            });

            const edgesToSave = edges.map(edge => ({
                ...edge,
                selected: false,
            }));

            await updateMoodboard({
                ...selectedMoodboard,
                nodes: nodesToSave,
                edges: edgesToSave,
                updatedAt: Date.now(),
            });

            lastSavedStateRef.current = JSON.stringify({ nodes: nodesToSave, edges: edgesToSave });
            setHasUnsavedChanges(false);
            toast.success('Moodboard saved!');
        } catch (error) {
            console.error('Failed to save moodboard:', error);
            toast.error('Failed to save moodboard');
        } finally {
            setIsSaving(false);
        }
    }, [selectedMoodboard, isSaving, nodes, edges, updateMoodboard, lastSavedStateRef, setHasUnsavedChanges]);

    const clearCanvas = useCallback(() => {
        setNodes([]);
        setEdges([]);
        toast.success('Moodboard reset');
    }, [setNodes, setEdges]);

    const onInjectTemplate = useCallback((templateId: string) => {
        const center = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        const result = prepareTemplate(templateId, center);
        if (result) {
            const newNodes = result.nodes.map(n => ({
                ...n,
                data: { ...n.data, onChange: updateNodeData }
            })) as Node<MoodNodeData>[];

            setNodes((nds) => nds.concat(newNodes));
            setEdges((eds) => eds.concat(result.edges as Edge[]));
            toast.success(`Injected ${templateId} sequence`);
        }
    }, [screenToFlowPosition, updateNodeData, setNodes, setEdges]);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow/type');
            const url = event.dataTransfer.getData('application/reactflow/url');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node<MoodNodeData> = {
                id: generateId(),
                type: type as any,
                position,
                data: {
                    label: type === 'image' ? 'Dropped Asset' : `${type} node`,
                    type: type as any,
                    isActive: true,
                    imageUrl: url,
                    onChange: updateNodeData
                },
            };

            setNodes((nds) => nds.concat(newNode));
            toast.success('Asset added to canvas');
        },
        [screenToFlowPosition, setNodes, updateNodeData],
    );

    const onAlignNodes = useCallback((direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
        const selectedNodes = nodes.filter(n => n.selected);
        if (selectedNodes.length <= 1) return;

        const nodeRects = selectedNodes.map(node => {
            const width = (node as any).measured?.width ?? (node as any).width ?? parseInt(node.style?.width as string) ?? 260;
            const height = (node as any).measured?.height ?? (node as any).height ?? parseInt(node.style?.height as string) ?? 300;
            return {
                id: node.id,
                x: node.position.x,
                y: node.position.y,
                width,
                height,
                right: node.position.x + width,
                bottom: node.position.y + height,
                centerX: node.position.x + width / 2,
                centerY: node.position.y + height / 2
            };
        });

        const minX = Math.min(...nodeRects.map(r => r.x));
        const maxX = Math.max(...nodeRects.map(r => r.right));
        const minY = Math.min(...nodeRects.map(r => r.y));
        const maxY = Math.max(...nodeRects.map(r => r.bottom));
        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;

        setNodes((nds) => nds.map(node => {
            if (!node.selected) return node;

            const rect = nodeRects.find(r => r.id === node.id);
            if (!rect) return node;

            let newPos = { ...node.position };

            switch (direction) {
                case 'left': newPos.x = minX; break;
                case 'right': newPos.x = maxX - rect.width; break;
                case 'center': newPos.x = midX - rect.width / 2; break;
                case 'top': newPos.y = minY; break;
                case 'bottom': newPos.y = maxY - rect.height; break;
                case 'middle': newPos.y = midY - rect.height / 2; break;
            }

            return { ...node, position: newPos };
        }));

        toast.info(`Aligned ${selectedNodes.length} nodes ${direction}`);
        setHasUnsavedChanges(true);
    }, [nodes, setNodes, setHasUnsavedChanges]);

    const onReorganizeNodes = useCallback((config: { type: 'rows' | 'cols', count: number }) => {
        const selectedNodes = nodes.filter(n => n.selected);
        const targetNodes = selectedNodes.length > 0 ? selectedNodes : nodes;

        if (targetNodes.length === 0) return;

        const sorted = [...targetNodes].sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x);

        const MARGIN = 40;
        const startX = sorted[0].position.x;
        const startY = sorted[0].position.y;

        const nodeData = sorted.map(node => {
            const w = (node as any).measured?.width ?? (node as any).width ?? parseInt(node.style?.width as string);
            const h = (node as any).measured?.height ?? (node as any).height ?? parseInt(node.style?.height as string);
            return {
                id: node.id,
                width: !isNaN(w) && w > 0 ? w : 260,
                height: !isNaN(h) && h > 0 ? h : 300
            };
        });

        const numItems = sorted.length;
        let numCols = config.type === 'cols' ? config.count : Math.ceil(numItems / config.count);
        numCols = Math.max(1, numCols);

        setNodes((nds) => {
            const newNodes = [...nds];
            let currentX = !isNaN(startX) ? startX : 0;
            let currentY = !isNaN(startY) ? startY : 0;
            let maxRowHeight = 0;

            sorted.forEach((node, index) => {
                const data = nodeData.find(d => d.id === node.id);
                const nodeIdx = newNodes.findIndex(n => n.id === node.id);

                if (nodeIdx !== -1 && data) {
                    newNodes[nodeIdx] = {
                        ...newNodes[nodeIdx],
                        position: { x: currentX, y: currentY },
                        style: { ...newNodes[nodeIdx].style, width: STANDARD_NODE_WIDTH }
                    };

                    maxRowHeight = Math.max(maxRowHeight, data.height);

                    if ((index + 1) % numCols === 0) {
                        currentX = !isNaN(startX) ? startX : 0;
                        currentY += maxRowHeight + MARGIN;
                        maxRowHeight = 0;
                    } else {
                        currentX += data.width + MARGIN;
                    }
                }
            });

            return newNodes;
        });

        toast.info(`Reorganized ${targetNodes.length} nodes into ${config.count} ${config.type}`);
        setHasUnsavedChanges(true);
    }, [nodes, setNodes, setHasUnsavedChanges]);

    const onExportJSON = useCallback(() => {
        const data = {
            nodes: nodes.map(n => {
                const { onChange, ...rest } = n.data;
                return { ...n, data: rest };
            }),
            edges
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `moodboard-${brand.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('JSON Export downloaded');
    }, [nodes, edges, brand.name]);

    return {
        addNode,
        onNodesDelete,
        onEdgesDelete,
        duplicateNode,
        handleManualSave,
        isSaving,
        clearCanvas,
        onInjectTemplate,
        onDrop,
        onAlignNodes,
        onReorganizeNodes,
        onExportJSON
    };
};
