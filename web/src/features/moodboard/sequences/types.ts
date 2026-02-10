import { Node, Edge } from '@xyflow/react';
import { MoodNodeData } from '../types';

export type SequenceCategory = 'Brand Architecture' | 'Intelligence Lab' | 'Growth & Ads' | 'Content Engine' | 'Systems Architecture' | 'Automations';

export interface WorkflowTemplate {
    id: string;
    label: string;
    description: string;
    category: SequenceCategory;
    nodes: Partial<Node<MoodNodeData>>[];
    edges: Partial<Edge>[];
}
