
export enum EmotionalIntent {
  EUPHORIC = 'euphoric',
  MYSTERIOUS = 'mysterious',
  SOPHISTICATED = 'sophisticated',
  MINIMALIST = 'minimalist',
  ENERGIZED = 'energized',
  WARM = 'warm'
}

export type UserRole = 'admin' | 'art_director' | 'designer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    compactMode: boolean;
  };
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  avatarUrl?: string;
  createdAt: number;
}

export type Organization = Workspace;

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: UserRole;
  createdAt: number;
}

export type OrganizationMember = WorkspaceMember;

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

export interface TypographyDNA {
  fontFamily: string;
  weightScale: string[];
  letterSpacing: string;
  lineHeight?: string;
}

export interface LightingDNA {
  setup: string; // e.g. "Rembrandt", "High-key", "Noir"
  contrastRatio: string;
  colorTemperature: string; // e.g. "Warm 3200K", "Neutral"
}

export interface GridDNA {
  type: 'thirds' | 'golden' | 'modular' | 'minimalist';
  gutterRatio: number;
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
  workspaceId?: string;
  userId?: string;
  typography?: TypographyDNA;
  lighting?: LightingDNA;
  grid?: GridDNA;
  // Version control support
  version?: string;
  versionId?: string;
  versionHistory?: {
    currentVersion: string;
    lastUpdated: number;
    versionsCount: number;
  };
  dnaSpectrum?: {
    energy: number;
    warmth: number;
    sophistication: number;
  };
}

export interface Moodboard {
  id: string;
  brandId: string;
  workspaceId?: string;
  userId?: string;
  name: string;
  description?: string;
  isActive: boolean;
  nodes: any[]; // React Flow nodes
  edges: any[]; // React Flow edges
  createdAt: number;
  updatedAt: number;
}

export interface PromptHistoryItem {
  id: string;
  subject: string;
  orchestrated: string;
  brandId: string;
  timestamp: number;
  workspaceId?: string;
  assetType?: string;
  intensities?: any;
}

export interface GeneratedAsset {
  id: string;
  url: string;
  prompt: string;
  subject?: string;
  orchestratedPrompt?: string;
  assetType: string;
  complianceScore: number;
  brandId: string;
  timestamp: number;
  workspaceId?: string;
  metadata?: any;
  auditDetails: {
    colorMatch: number;
    spatialCompliance: number;
    vibeCheck: number;
    feedback?: string;
    suggestedFixes?: string[];
  };
}

export interface Comment {
  id: string;
  assetId: string;
  userId: string;
  content: string;
  createdAt: number;
  profile?: {
    fullName: string;
    avatarUrl: string;
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

// Re-export all agent, rules, and skills types
export * from './agents';
export * from './rules';
export * from './skills';
