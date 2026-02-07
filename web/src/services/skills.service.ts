import { SkillDefinition, UserSkill, SkillProgress, SkillActivity, SkillPath, SkillBadge, AgentSkillMapping, SkillCategory, SkillLevel, SkillStatus } from '../types';

export class SkillsService {
  private skillDefinitions: Map<string, SkillDefinition> = new Map();
  private userSkills: Map<string, UserSkill> = new Map();
  private skillActivities: Map<string, SkillActivity> = new Map();
  private skillPaths: Map<string, SkillPath> = new Map();
  private skillBadges: Map<string, SkillBadge> = new Map();
  private agentSkillMappings: Map<string, AgentSkillMapping> = new Map();

  constructor() {
    this.initializeDefaultSkills();
  }

  // Skill Definitions
  async createSkillDefinition(skill: Omit<SkillDefinition, 'metadata' | 'id'>, createdBy: string): Promise<SkillDefinition> {
    const skillDefinition: SkillDefinition = {
      ...skill,
      id: `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        createdBy,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: '1.0.0'
      }
    };

    this.skillDefinitions.set(skillDefinition.id, skillDefinition);
    return skillDefinition;
  }

  async getSkillDefinition(id: string): Promise<SkillDefinition | null> {
    return this.skillDefinitions.get(id) || null;
  }

  async getAllSkillDefinitions(): Promise<SkillDefinition[]> {
    return Array.from(this.skillDefinitions.values());
  }

  async getSkillsByCategory(category: SkillCategory): Promise<SkillDefinition[]> {
    return Array.from(this.skillDefinitions.values()).filter(skill => skill.category === category);
  }

  async updateSkillDefinition(id: string, updates: Partial<SkillDefinition>): Promise<SkillDefinition | null> {
    const skill = this.skillDefinitions.get(id);
    if (!skill) return null;

    const updatedSkill = {
      ...skill,
      ...updates,
      metadata: {
        ...skill.metadata,
        updatedAt: Date.now()
      }
    };

    this.skillDefinitions.set(id, updatedSkill);
    return updatedSkill;
  }

  // User Skills
  async assignSkillToUser(userId: string, skillId: string): Promise<UserSkill> {
    const existingUserSkill = Array.from(this.userSkills.values())
      .find(us => us.userId === userId && us.skillId === skillId);

    if (existingUserSkill) {
      return existingUserSkill;
    }

    const userSkill: UserSkill = {
      id: `userskill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      skillId,
      currentLevel: 1,
      experiencePoints: 0,
      hoursPracticed: 0,
      completedTasks: 0,
      badges: [],
      achievements: [],
      lastUsed: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.userSkills.set(userSkill.id, userSkill);
    return userSkill;
  }

  async getUserSkills(userId: string): Promise<UserSkill[]> {
    return Array.from(this.userSkills.values()).filter(userSkill => userSkill.userId === userId);
  }

  async getUserSkill(userId: string, skillId: string): Promise<UserSkill | null> {
    return Array.from(this.userSkills.values())
      .find(userSkill => userSkill.userId === userId && userSkill.skillId === skillId) || null;
  }

  async updateUserSkill(userSkillId: string, updates: Partial<UserSkill>): Promise<UserSkill | null> {
    const userSkill = this.userSkills.get(userSkillId);
    if (!userSkill) return null;

    const updatedUserSkill = {
      ...userSkill,
      ...updates,
      updatedAt: Date.now()
    };

    this.userSkills.set(userSkillId, updatedUserSkill);
    return updatedUserSkill;
  }

  async addExperienceToUserSkill(userSkillId: string, experience: number, activity: string): Promise<UserSkill | null> {
    const userSkill = await this.updateUserSkill(userSkillId, {
      experiencePoints: (this.userSkills.get(userSkillId)?.experiencePoints || 0) + experience,
      lastUsed: Date.now()
    });

    if (userSkill) {
      await this.recordSkillActivity(userSkill.userId, userSkill.skillId, 'task_completed', experience, activity);
    }

    return userSkill;
  }

  // Skill Progress
  async getSkillProgress(userId: string, skillId: string): Promise<SkillProgress | null> {
    const userSkill = await this.getUserSkill(userId, skillId);
    if (!userSkill) return null;

    const skillDefinition = await this.getSkillDefinition(skillId);
    if (!skillDefinition) return null;

    const activities = Array.from(this.skillActivities.values())
      .filter(activity => activity.userId === userId && activity.skillId === skillId)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);

    const totalExperience = userSkill.experiencePoints;
    const currentLevel = userSkill.currentLevel;
    const maxLevel = skillDefinition.config.maxLevel;
    
    let progressToNext = 0;
    let nextMilestone;

    if (currentLevel < maxLevel) {
      const expForCurrentLevel = this.getExperienceForLevel(currentLevel, skillDefinition.config);
      const expForNextLevel = this.getExperienceForLevel(currentLevel + 1, skillDefinition.config);
      progressToNext = ((totalExperience - expForCurrentLevel) / (expForNextLevel - expForCurrentLevel)) * 100;
      
      nextMilestone = {
        level: currentLevel + 1,
        requirements: [`Reach ${expForNextLevel} experience points`],
        rewards: ['New badge unlocked', 'Skill level increased']
      };
    }

    return {
      skillId,
      userId,
      currentLevel,
      progressToNext,
      totalExperience,
      recentActivities: activities,
      nextMilestone
    };
  }

  private getExperienceForLevel(level: number, config: any): number {
    const { experiencePoints: basePoints, learningCurve } = config;
    
    switch (learningCurve) {
      case 'linear':
        return basePoints * level;
      case 'exponential':
        return basePoints * Math.pow(1.5, level - 1);
      case 'logarithmic':
        return basePoints * Math.log(level + 1);
      default:
        return basePoints * level;
    }
  }

  // Skill Activities
  async recordSkillActivity(userId: string, skillId: string, type: any, experienceGained: number, context: string, metadata?: Record<string, any>): Promise<SkillActivity> {
    const activity: SkillActivity = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      skillId,
      type,
      experienceGained,
      context,
      timestamp: Date.now(),
      metadata
    };

    this.skillActivities.set(activity.id, activity);
    return activity;
  }

  async getUserActivities(userId: string, limit?: number): Promise<SkillActivity[]> {
    const activities = Array.from(this.skillActivities.values())
      .filter(activity => activity.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);

    return limit ? activities.slice(0, limit) : activities;
  }

  // Skill Paths
  async createSkillPath(path: Omit<SkillPath, 'id' | 'createdAt'>, createdBy: string): Promise<SkillPath> {
    const skillPath: SkillPath = {
      ...path,
      id: `path_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdBy,
      createdAt: Date.now()
    };

    this.skillPaths.set(skillPath.id, skillPath);
    return skillPath;
  }

  async getAllSkillPaths(): Promise<SkillPath[]> {
    return Array.from(this.skillPaths.values());
  }

  async getSkillPath(id: string): Promise<SkillPath | null> {
    return this.skillPaths.get(id) || null;
  }

  // Skill Badges
  async createSkillBadge(badge: Omit<SkillBadge, 'id'>): Promise<SkillBadge> {
    const skillBadge: SkillBadge = {
      ...badge,
      id: `badge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    this.skillBadges.set(skillBadge.id, skillBadge);
    return skillBadge;
  }

  async getAllSkillBadges(): Promise<SkillBadge[]> {
    return Array.from(this.skillBadges.values());
  }

  async getUserBadges(userId: string): Promise<SkillBadge[]> {
    const userSkills = await this.getUserSkills(userId);
    const userBadgeIds = userSkills.flatMap(us => us.badges);
    
    return Array.from(this.skillBadges.values())
      .filter(badge => userBadgeIds.includes(badge.id));
  }

  async awardBadgeToUser(userId: string, badgeId: string): Promise<boolean> {
    const badge = this.skillBadges.get(badgeId);
    if (!badge) return false;

    const userSkills = await this.getUserSkills(userId);
    const relevantUserSkill = userSkills.find(us => 
      badge.criteria.skillId ? us.skillId === badge.criteria.skillId : true
    );

    if (!relevantUserSkill) return false;

    // Check if user meets badge criteria
    const meetsCriteria = await this.checkBadgeCriteria(userId, badge);
    if (!meetsCriteria) return false;

    // Award badge
    const updatedUserSkill = {
      ...relevantUserSkill,
      badges: [...relevantUserSkill.badges, badgeId]
    };

    this.userSkills.set(relevantUserSkill.id, updatedUserSkill);
    return true;
  }

  private async checkBadgeCriteria(userId: string, badge: SkillBadge): Promise<boolean> {
    const { criteria } = badge;

    if (criteria.skillId) {
      const userSkill = await this.getUserSkill(userId, criteria.skillId);
      if (!userSkill) return false;

      if (criteria.level && userSkill.currentLevel < criteria.level) return false;
      if (criteria.experience && userSkill.experiencePoints < criteria.experience) return false;
      if (criteria.tasks && userSkill.completedTasks < criteria.tasks) return false;
    }

    // Check special requirements
    if (criteria.specialRequirements) {
      // This would involve more complex logic based on requirements
      // For now, return true
    }

    return true;
  }

  // Agent Skill Mappings
  async mapSkillToAgent(agentId: string, skillId: string, proficiencyLevel: number): Promise<AgentSkillMapping> {
    const mapping: AgentSkillMapping = {
      agentId,
      skillId,
      proficiencyLevel: Math.max(1, Math.min(10, proficiencyLevel)),
      isActive: true,
      lastValidated: Date.now(),
      performanceScore: 0
    };

    const mappingId = `${agentId}_${skillId}`;
    this.agentSkillMappings.set(mappingId, mapping);
    return mapping;
  }

  async getAgentSkills(agentId: string): Promise<AgentSkillMapping[]> {
    return Array.from(this.agentSkillMappings.values())
      .filter(mapping => mapping.agentId === agentId && mapping.isActive);
  }

  async updateAgentSkillPerformance(agentId: string, skillId: string, performanceScore: number): Promise<AgentSkillMapping | null> {
    const mappingId = `${agentId}_${skillId}`;
    const mapping = this.agentSkillMappings.get(mappingId);
    if (!mapping) return null;

    const updatedMapping = {
      ...mapping,
      performanceScore,
      lastValidated: Date.now()
    };

    this.agentSkillMappings.set(mappingId, updatedMapping);
    return updatedMapping;
  }

  // Initialize comprehensive skill system
  private async initializeDefaultSkills(): Promise<void> {
    // Import all skill definitions from the skills index
    const skills = [
      // Import the skill definitions (this would be async in a real implementation)
      {
        id: 'design-fundamentals',
        name: 'Design Fundamentals',
        description: 'Master the core principles of visual design including balance, contrast, hierarchy, and composition',
        category: SkillCategory.CREATIVE,
        level: SkillLevel.BEGINNER,
        status: SkillStatus.ACTIVE,
        tags: ['design', 'fundamentals', 'visual-design', 'composition'],
        requirements: [],
        capabilities: ['visual-hierarchy', 'color-balance', 'typography-basics', 'layout-composition', 'grid-systems', 'white-space-management'],
        config: {
          maxLevel: 10,
          experiencePoints: 100,
          learningCurve: 'linear' as const
        }
      },
      {
        id: 'prompt-engineering',
        name: 'Prompt Engineering',
        description: 'Master the art of crafting effective AI prompts for consistent, high-quality design output',
        category: SkillCategory.TECHNICAL,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['ai', 'prompts', 'generation', 'prompt-crafting', 'ai-interaction'],
        requirements: ['design-fundamentals'],
        capabilities: ['prompt-crafting', 'ai-interaction', 'content-generation', 'brand-aligned-prompting', 'iterative-refinement', 'negative-prompting', 'parameter-tuning', 'style-transfer', 'batch-generation'],
        config: {
          maxLevel: 10,
          experiencePoints: 150,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'color-theory',
        name: 'Color Theory & Application',
        description: 'Master the psychology, harmony, and strategic application of color in design',
        category: SkillCategory.CREATIVE,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['color', 'theory', 'psychology', 'harmony', 'palette-design', 'brand-colors'],
        requirements: ['design-fundamentals'],
        capabilities: ['color-psychology', 'palette-creation', 'color-harmony', 'accessibility-compliance', 'brand-color-systems', 'color-mood-mapping', 'gradient-design', 'color-trend-analysis'],
        config: {
          maxLevel: 10,
          experiencePoints: 120,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'typography',
        name: 'Typography & Type Design',
        description: 'Master the art and science of letterforms, font pairing, and expressive typography',
        category: SkillCategory.CREATIVE,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['typography', 'fonts', 'letterforms', 'font-pairing', 'hierarchy', 'type-design'],
        requirements: ['design-fundamentals'],
        capabilities: ['font-selection', 'type-hierarchy', 'font-pairing', 'readability-optimization', 'expressive-typography', 'custom-lettering', 'variable-fonts', 'web-typography', 'accessibility-typography'],
        config: {
          maxLevel: 10,
          experiencePoints: 130,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'digital-art',
        name: 'Digital Art & Illustration',
        description: 'Master the creation of original digital artwork, illustrations, and artistic expressions',
        category: SkillCategory.CREATIVE,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['digital-art', 'illustration', 'drawing', 'painting', 'artistic-expression', 'creative-design'],
        requirements: ['design-fundamentals', 'color-theory', 'typography'],
        capabilities: ['digital-drawing', 'digital-painting', 'vector-illustration', 'photo-manipulation', 'artistic-styles', 'concept-art', 'character-design', 'environment-design', 'texture-creation', 'digital-sketching'],
        config: {
          maxLevel: 10,
          experiencePoints: 140,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'social-media',
        name: 'Social Media Design',
        description: 'Master the creation of engaging content optimized for social media platforms and audiences',
        category: SkillCategory.COLLABORATIVE,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['social-media', 'content-creation', 'engagement', 'platform-optimization', 'visual-storytelling'],
        requirements: ['design-fundamentals', 'color-theory', 'typography'],
        capabilities: ['platform-optimization', 'content-strategy', 'engagement-optimization', 'social-media-branding', 'visual-storytelling', 'trend-adaptation', 'community-design', 'analytics-driven-design', 'cross-platform-consistency'],
        config: {
          maxLevel: 10,
          experiencePoints: 125,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'branding',
        name: 'Branding & Brand Strategy',
        description: 'Master the creation of compelling brand identities and strategic brand development',
        category: SkillCategory.STRATEGIC,
        level: SkillLevel.ADVANCED,
        status: SkillStatus.ACTIVE,
        tags: ['branding', 'brand-strategy', 'brand-identity', 'brand-development', 'corporate-design'],
        requirements: ['design-fundamentals', 'color-theory', 'typography', 'digital-art'],
        capabilities: ['brand-strategy', 'brand-identity-design', 'brand-guidelines', 'brand-positioning', 'brand-storytelling', 'brand-architecture', 'competitive-analysis', 'brand-audits', 'rebranding-strategy', 'brand-consistency'],
        config: {
          maxLevel: 10,
          experiencePoints: 160,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'brand-guidelines',
        name: 'Brand Guidelines Development',
        description: 'Master the creation of comprehensive brand guidelines that ensure consistency across all touchpoints',
        category: SkillCategory.STRATEGIC,
        level: SkillLevel.ADVANCED,
        status: SkillStatus.ACTIVE,
        tags: ['brand-guidelines', 'brand-systems', 'documentation', 'brand-consistency', 'brand-governance'],
        requirements: ['branding', 'design-fundamentals', 'color-theory', 'typography'],
        capabilities: ['guideline-creation', 'brand-systems-design', 'documentation-writing', 'brand-governance', 'consistency-enforcement', 'template-creation', 'brand-education', 'guideline-implementation', 'version-management', 'cross-platform-adaptation'],
        config: {
          maxLevel: 10,
          experiencePoints: 145,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'logo-design',
        name: 'Logo Design & Identity',
        description: 'Master the art and science of creating memorable, effective logos that capture brand essence',
        category: SkillCategory.COLLABORATIVE,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['logo-design', 'brand-identity', 'visual-mark', 'symbol-design', 'brand-mark'],
        requirements: ['design-fundamentals', 'color-theory', 'typography'],
        capabilities: ['conceptual-development', 'logo-sketching', 'digital-refinement', 'typography-integration', 'symbol-design', 'logo-systems', 'adaptation-design', 'logo-animation', 'logo-presentation', 'brand-expression'],
        config: {
          maxLevel: 10,
          experiencePoints: 135,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'vector-design',
        name: 'Vector Design & Illustration',
        description: 'Master the creation of scalable vector graphics, illustrations, and precise geometric designs',
        category: SkillCategory.TECHNICAL,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['vector-design', 'illustration', 'vector-graphics', 'geometric-design', 'scalable-graphics'],
        requirements: ['design-fundamentals', 'digital-art', 'typography'],
        capabilities: ['vector-illustration', 'geometric-design', 'path-manipulation', 'gradient-mastery', 'pattern-creation', 'icon-design', 'technical-illustration', 'vector-animation', 'precision-design', 'scalable-graphics'],
        config: {
          maxLevel: 10,
          experiencePoints: 130,
          learningCurve: 'exponential' as const
        }
      },
      {
        id: 'pdf-export',
        name: 'PDF Export & Production',
        description: 'Master the creation of professional PDF files for print, web, and interactive applications',
        category: SkillCategory.TECHNICAL,
        level: SkillLevel.INTERMEDIATE,
        status: SkillStatus.ACTIVE,
        tags: ['pdf-export', 'print-production', 'document-optimization', 'interactive-pdf', 'prepress'],
        requirements: ['design-fundamentals', 'typography', 'vector-design'],
        capabilities: ['print-pdf-creation', 'web-pdf-optimization', 'interactive-pdf-design', 'prepress-standards', 'color-management', 'font-embedding', 'compression-techniques', 'accessibility-compliance', 'automation-workflows', 'quality-control'],
        config: {
          maxLevel: 10,
          experiencePoints: 110,
          learningCurve: 'exponential' as const
        }
      }
    ];

    skills.forEach(skill => {
      this.createSkillDefinition(skill, 'system');
    });
  }
}
