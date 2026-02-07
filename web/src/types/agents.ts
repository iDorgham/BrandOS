// Agent System Types for Brand OS

export enum AgentType {
  // Original agents
  CREATIVE_ASSISTANT = 'creative_assistant',
  COMPLIANCE_AUDITOR = 'compliance_auditor', 
  BRAND_GUARDIAN = 'brand_guardian',
  WORKFLOW_ORCHESTRATOR = 'workflow_orchestrator',
  TREND_ANALYZER = 'trend_analyzer',
  CONTENT_STRATEGIST = 'content_strategist',
  
  // Creative Agency Team
  CREATIVE_DIRECTOR = 'creative_director',
  ART_DIRECTOR = 'art_director',
  BRAND_STRATEGIST = 'brand_strategist',
  SENIOR_DESIGNER = 'senior_designer',
  SOCIAL_MEDIA_MANAGER = 'social_media_manager',
  COPYWRITER = 'copywriter',
  MOTION_DESIGNER = 'motion_designer',
  PRODUCTION_MANAGER = 'production_manager'
}

export enum AgentStatus {
  ACTIVE = 'active',
  IDLE = 'idle',
  BUSY = 'busy',
  ERROR = 'error',
  DISABLED = 'disabled'
}

export enum AgentCapability {
  PROMPT_GENERATION = 'prompt_generation',
  ASSET_ANALYSIS = 'asset_analysis',
  COMPLIANCE_CHECKING = 'compliance_checking',
  TREND_ANALYSIS = 'trend_analysis',
  BRAND_EVOLUTION = 'brand_evolution',
  WORKFLOW_AUTOMATION = 'workflow_automation',
  PERFORMANCE_OPTIMIZATION = 'performance_optimization'
}

export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  capability: AgentCapability;
  level: number; // 1-10 skill level
  isActive: boolean;
  config?: Record<string, any>;
}

export interface AgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  skills: AgentSkill[];
  personality: {
    tone: 'professional' | 'creative' | 'analytical' | 'friendly';
    verbosity: 'concise' | 'detailed' | 'comprehensive';
  };
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  description: string;
  avatar?: string;
  config: AgentConfig;
  workspaceId?: string;
  createdAt: number;
  lastActive: number;
  performance: {
    tasksCompleted: number;
    successRate: number;
    averageResponseTime: number;
  };
}

export interface AgentTask {
  id: string;
  agentId: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  input: any;
  output?: any;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  error?: string;
  metadata?: Record<string, any>;
}

export interface AgentInteraction {
  id: string;
  agentId: string;
  userId: string;
  type: 'task_assignment' | 'status_query' | 'configuration_change' | 'skill_update';
  message: string;
  response?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}
