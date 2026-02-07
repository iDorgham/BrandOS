// Skills Framework Types

export enum SkillCategory {
  CREATIVE = 'creative',
  ANALYTICAL = 'analytical', 
  TECHNICAL = 'technical',
  COLLABORATIVE = 'collaborative',
  STRATEGIC = 'strategic'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
  MASTER = 'master'
}

export enum SkillStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEVELOPMENT = 'development',
  DEPRECATED = 'deprecated'
}

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  level: SkillLevel;
  status: SkillStatus;
  icon?: string;
  tags: string[];
  requirements: string[]; // prerequisite skill IDs
  capabilities: string[];
  config: {
    maxLevel: number;
    experiencePoints: number;
    learningCurve: 'linear' | 'exponential' | 'logarithmic';
  };
  metadata: {
    createdBy: string;
    createdAt: number;
    updatedAt: number;
    version: string;
  };
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  currentLevel: number;
  experiencePoints: number;
  hoursPracticed: number;
  completedTasks: number;
  badges: string[];
  achievements: string[];
  lastUsed: number;
  createdAt: number;
  updatedAt: number;
}

export interface SkillProgress {
  skillId: string;
  userId: string;
  currentLevel: number;
  progressToNext: number; // 0-100 percentage
  totalExperience: number;
  recentActivities: SkillActivity[];
  nextMilestone?: {
    level: number;
    requirements: string[];
    rewards: string[];
  };
}

export interface SkillActivity {
  id: string;
  userId: string;
  skillId: string;
  type: 'task_completed' | 'training_completed' | 'mentorship' | 'certification' | 'project_contribution';
  experienceGained: number;
  context: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface SkillPath {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  requiredSkills: string[];
  optionalSkills: string[];
  estimatedDuration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  outcomes: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: number;
}

export interface SkillBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  criteria: {
    skillId?: string;
    level?: number;
    tasks?: number;
    experience?: number;
    specialRequirements?: string[];
  };
  rewards?: {
    points?: number;
    titles?: string[];
    privileges?: string[];
  };
}

export interface AgentSkillMapping {
  agentId: string;
  skillId: string;
  proficiencyLevel: number; // 1-10
  isActive: boolean;
  config?: Record<string, any>;
  lastValidated: number;
  performanceScore: number;
}
