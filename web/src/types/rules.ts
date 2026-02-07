// Brand Rules Engine Types

export enum RuleType {
  VALIDATION = 'validation',
  TRANSFORMATION = 'transformation',
  AUTOMATION = 'automation',
  COMPLIANCE = 'compliance',
  GUARDRAIL = 'guardrail'
}

export enum RuleTrigger {
  ON_ASSET_GENERATION = 'on_asset_generation',
  ON_PROMPT_CREATE = 'on_prompt_create',
  ON_BRAND_UPDATE = 'on_brand_update',
  ON_DEPLOYMENT = 'on_deployment',
  SCHEDULED = 'scheduled',
  MANUAL = 'manual'
}

export enum RuleStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  ARCHIVED = 'archived'
}

export interface RuleCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'not_equals' | 'matches' | 'in' | 'not_in';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface RuleAction {
  type: 'validate' | 'transform' | 'notify' | 'block' | 'modify' | 'create_task' | 'update_field';
  parameters: Record<string, any>;
}

export interface BrandRule {
  id: string;
  name: string;
  description: string;
  type: RuleType;
  trigger: RuleTrigger;
  status: RuleStatus;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number; // 1-10
  workspaceId?: string;
  brandId?: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  version: number;
}

export interface RuleExecution {
  id: string;
  ruleId: string;
  triggerType: RuleTrigger;
  inputData: any;
  outputData?: any;
  status: 'pending' | 'executing' | 'success' | 'failed' | 'blocked';
  error?: string;
  executionTime: number;
  timestamp: number;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template: Omit<BrandRule, 'id' | 'createdBy' | 'createdAt' | 'updatedAt' | 'version'>;
  isPublic: boolean;
}

export interface RuleViolation {
  id: string;
  ruleId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  context: any;
  resolvedAt?: number;
  resolvedBy?: string;
  createdAt: number;
}
