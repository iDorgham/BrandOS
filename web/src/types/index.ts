
export enum EmotionalIntent {
  EUPHORIC = 'euphoric',
  MYSTERIOUS = 'mysterious',
  SOPHISTICATED = 'sophisticated',
  MINIMALIST = 'minimalist',
  ENERGIZED = 'energized',
  WARM = 'warm'
}

export interface BrandColor {
  id: string;
  label: string;
  hex: string;
}

export interface GrammarRule {
  id: string;
  condition: string; // e.g. "subject includes 'event'"
  directive: string; // e.g. "add neon gold highlights to top quadrant"
}

export interface BrandProfile {
  id: string;
  name: string;
  doctrine: string;
  palette: BrandColor[];
  background: string; // Hex code for default background
  negativeSpace: number; // percentage
  safeZones: string[];
  emotionalTags: EmotionalIntent[];
  forbiddenElements: string[];
  extractedPatterns?: string[];
  stylisticSignatures?: string[];
  grammarRules?: GrammarRule[];
}

export interface PromptHistoryItem {
  id: string;
  subject: string;
  orchestrated: string;
  brandId: string;
  timestamp: number;
}

export interface GeneratedAsset {
  id: string;
  url: string;
  prompt: string;
  subject?: string;
  complianceScore: number;
  brandId: string;
  timestamp: number;
  auditDetails: {
    colorMatch: number;
    spatialCompliance: number;
    vibeCheck: number;
    feedback?: string;
  };
}

export type NodeType = 'REFERENCE' | 'ENGINE' | 'MODIFIER' | 'OUTPUT';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  data: any;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface AssetType {
  id: string;
  label: string;
  icon: any;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
}
