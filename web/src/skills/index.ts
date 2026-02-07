// Comprehensive Skills Index for Brand OS
// This file exports all available skills and provides utility functions for skill management

// Import all skill definitions
export { DesignFundamentalsSkill, DesignFundamentalsLevels, DesignFundamentalsExercises } from './design-fundamentals';
export { PromptEngineeringSkill, PromptEngineeringLevels, PromptEngineeringExercises, BrandPromptTemplates, AdvancedPromptingTechniques } from './prompt-engineering';
export { ColorTheorySkill, ColorTheoryLevels, ColorTheoryExercises, ColorPsychology, ColorHarmonies, BrandColorSystemTemplate } from './color-theory';
export { TypographySkill, TypographyLevels, TypographyExercises, TypefaceClassifications, TypographyHierarchy, FontPairingStrategies, WebTypographyGuidelines } from './typography';
export { DigitalArtSkill, DigitalArtLevels, DigitalArtExercises, DigitalArtStyles, DrawingFundamentals, DigitalArtSpecializations } from './digital-art';
export { SocialMediaSkill, SocialMediaLevels, SocialMediaExercises, SocialMediaPlatforms, ContentStrategyFrameworks, EngagementOptimization, SocialMediaTrends } from './social-media';
export { BrandingSkill, BrandingLevels, BrandingExercises, BrandArchitecture, BrandPositioning, BrandIdentityElements, BrandAuditFramework } from './branding';
export { BrandGuidelinesSkill, BrandGuidelinesLevels, BrandGuidelinesExercises, BrandGuidelineComponents, GuidelineDocumentation, GuidelineImplementation } from './brand-guidelines';
export { LogoDesignSkill, LogoDesignLevels, LogoDesignExercises, LogoDesignPrinciples, LogoTypes, LogoDesignProcess, LogoTechnicalSpecifications } from './logo-design';
export { VectorDesignSkill, VectorDesignLevels, VectorDesignExercises, VectorDesignPrinciples, VectorToolsAndTechniques, IconDesign } from './vector-design';
export { PDFExportSkill, PDFExportLevels, PDFExportExercises, PDFTypes, PrintProductionStandards, PDFOptimization, InteractivePDFFeatures } from './pdf-export';

// Import agency-specific skills
export { AccountManagementSkill, AccountManagementLevels, AccountManagementExercises } from './account-management';
export { ProjectScopingSkill, ProjectScopingLevels, ProjectScopingFramework, ProjectScopingExercises, ProjectScopingTemplates } from './project-scoping';
export { CreativeLeadershipSkill, CreativeLeadershipLevels, CreativeLeadershipFramework, CreativeLeadershipExercises, CreativeLeadershipTechniques } from './creative-leadership';

// Import agency skills integration
export { AgencySpecificSkills, AgencySkillCategories, AgencySkillPaths, AgencySkillIntegration } from './agency-skills';

// Skills categorization
export const SkillCategories = {
  fundamentals: {
    name: 'Design Fundamentals',
    description: 'Core design principles and foundational skills',
    skills: ['design-fundamentals'],
    icon: 'foundations',
    color: '#3498db'
  },
  creative: {
    name: 'Creative Skills',
    description: 'Artistic and creative expression capabilities',
    skills: ['digital-art', 'color-theory', 'typography', 'vector-design'],
    icon: 'palette',
    color: '#e74c3c'
  },
  technical: {
    name: 'Technical Skills',
    description: 'Technical execution and production capabilities',
    skills: ['prompt-engineering', 'vector-design', 'pdf-export'],
    icon: 'gear',
    color: '#f39c12'
  },
  strategic: {
    name: 'Strategic Skills',
    description: 'Brand strategy and planning capabilities',
    skills: ['branding', 'brand-guidelines'],
    icon: 'strategy',
    color: '#9b59b6'
  },
  collaborative: {
    name: 'Collaborative Skills',
    description: 'Communication and platform-specific skills',
    skills: ['social-media', 'logo-design'],
    icon: 'network',
    color: '#2ecc71'
  }
};

// Learning paths for different roles
export const LearningPaths = {
  juniorDesigner: {
    name: 'Junior Designer Path',
    description: 'Essential skills for entry-level designers',
    skills: [
      'design-fundamentals',
      'color-theory',
      'typography',
      'vector-design'
    ],
    estimatedDuration: 400,
    difficulty: 'beginner'
  },
  brandDesigner: {
    name: 'Brand Designer Path',
    description: 'Comprehensive brand identity and strategy',
    skills: [
      'design-fundamentals',
      'color-theory',
      'typography',
      'vector-design',
      'logo-design',
      'branding',
      'brand-guidelines'
    ],
    estimatedDuration: 800,
    difficulty: 'intermediate'
  },
  digitalArtist: {
    name: 'Digital Artist Path',
    description: 'Master digital art and illustration',
    skills: [
      'design-fundamentals',
      'color-theory',
      'typography',
      'digital-art',
      'vector-design',
      'prompt-engineering'
    ],
    estimatedDuration: 900,
    difficulty: 'intermediate'
  },
  socialMediaSpecialist: {
    name: 'Social Media Specialist Path',
    description: 'Social media content and platform expertise',
    skills: [
      'design-fundamentals',
      'color-theory',
      'typography',
      'digital-art',
      'social-media'
    ],
    estimatedDuration: 600,
    difficulty: 'intermediate'
  },
  brandStrategist: {
    name: 'Brand Strategist Path',
    description: 'Advanced brand strategy and consulting',
    skills: [
      'design-fundamentals',
      'branding',
      'brand-guidelines',
      'social-media',
      'logo-design'
    ],
    estimatedDuration: 1000,
    difficulty: 'advanced'
  },
  technicalDesigner: {
    name: 'Technical Designer Path',
    description: 'Technical design and production expertise',
    skills: [
      'design-fundamentals',
      'vector-design',
      'pdf-export',
      'prompt-engineering',
      'typography'
    ],
    estimatedDuration: 700,
    difficulty: 'intermediate'
  },
  aICreative: {
    name: 'AI Creative Specialist Path',
    description: 'Master AI-powered creative workflows',
    skills: [
      'design-fundamentals',
      'prompt-engineering',
      'digital-art',
      'color-theory',
      'social-media'
    ],
    estimatedDuration: 800,
    difficulty: 'advanced'
  }
};

// Skill relationships and prerequisites
export const SkillRelationships = {
  'design-fundamentals': {
    unlocks: ['color-theory', 'typography', 'digital-art', 'branding', 'social-media'],
    requiredBy: ['All advanced skills'],
    synergy: ['prompt-engineering', 'vector-design']
  },
  'color-theory': {
    unlocks: ['branding', 'brand-guidelines', 'logo-design', 'social-media'],
    requiredBy: ['All visual design skills'],
    synergy: ['digital-art', 'vector-design']
  },
  'typography': {
    unlocks: ['brand-guidelines', 'logo-design', 'social-media', 'pdf-export'],
    requiredBy: ['All communication skills'],
    synergy: ['branding', 'vector-design']
  },
  'digital-art': {
    unlocks: ['social-media', 'logo-design'],
    requiredBy: ['Creative production skills'],
    synergy: ['prompt-engineering', 'color-theory']
  },
  'vector-design': {
    unlocks: ['logo-design', 'pdf-export'],
    requiredBy: ['Technical design skills'],
    synergy: ['digital-art', 'color-theory']
  },
  'branding': {
    unlocks: ['brand-guidelines'],
    requiredBy: ['Strategic skills'],
    synergy: ['logo-design', 'social-media']
  },
  'prompt-engineering': {
    unlocks: ['social-media'],
    requiredBy: ['AI-powered skills'],
    synergy: ['digital-art', 'color-theory']
  }
};

// Utility functions for skill management
export class SkillUtils {
  static getSkillById(skillId: string) {
    const allSkills = {
      'design-fundamentals': { DesignFundamentalsSkill, levels: DesignFundamentalsLevels, exercises: DesignFundamentalsExercises },
      'prompt-engineering': { PromptEngineeringSkill, levels: PromptEngineeringLevels, exercises: PromptEngineeringExercises },
      'color-theory': { ColorTheorySkill, levels: ColorTheoryLevels, exercises: ColorTheoryExercises },
      'typography': { TypographySkill, levels: TypographyLevels, exercises: TypographyExercises },
      'digital-art': { DigitalArtSkill, levels: DigitalArtLevels, exercises: DigitalArtExercises },
      'social-media': { SocialMediaSkill, levels: SocialMediaLevels, exercises: SocialMediaExercises },
      'branding': { BrandingSkill, levels: BrandingLevels, exercises: BrandingExercises },
      'brand-guidelines': { BrandGuidelinesSkill, levels: BrandGuidelinesLevels, exercises: BrandGuidelinesExercises },
      'logo-design': { LogoDesignSkill, levels: LogoDesignLevels, exercises: LogoDesignExercises },
      'vector-design': { VectorDesignSkill, levels: VectorDesignLevels, exercises: VectorDesignExercises },
      'pdf-export': { PDFExportSkill, levels: PDFExportLevels, exercises: PDFExportExercises }
    };
    
    return allSkills[skillId as keyof typeof allSkills] || null;
  }

  static getSkillsByCategory(category: string) {
    const categorySkills = SkillCategories[category as keyof typeof SkillCategories];
    return categorySkills ? categorySkills.skills : [];
  }

  static getLearningPath(pathName: string) {
    return LearningPaths[pathName as keyof typeof LearningPaths] || null;
  }

  static calculatePathProgress(completedSkills: string[], pathSkills: string[]) {
    const completedInPath = completedSkills.filter(skill => pathSkills.includes(skill));
    return {
      completed: completedInPath.length,
      total: pathSkills.length,
      percentage: Math.round((completedInPath.length / pathSkills.length) * 100)
    };
  }

  static getPrerequisites(skillId: string): string[] {
    const skill = this.getSkillById(skillId);
    return skill?.PromptEngineeringSkill?.requirements || [];
  }

  static getUnlockedSkills(completedSkills: string[]): string[] {
    const unlocked: string[] = [];
    
    Object.entries(SkillRelationships).forEach(([skillId, relationship]) => {
      if (completedSkills.includes(skillId)) {
        unlocked.push(...relationship.unlocks);
      }
    });
    
    return [...new Set(unlocked)].filter(skill => !completedSkills.includes(skill));
  }

  static getRecommendedSkills(currentLevel: string[], interests: string[] = []): string[] {
    // Simple recommendation algorithm based on level and interests
    const recommendations: string[] = [];
    
    // If user is complete beginner, recommend fundamentals
    if (currentLevel.length === 0) {
      recommendations.push('design-fundamentals');
      return recommendations;
    }
    
    // Get unlocked skills based on current level
    const unlocked = this.getUnlockedSkills(currentLevel);
    
    // Prioritize skills that match interests
    const interestMatch = unlocked.filter(skill => 
      interests.some(interest => 
        SkillCategories[interest as keyof typeof SkillCategories]?.skills.includes(skill)
      )
    );
    
    recommendations.push(...interestMatch);
    
    // Add general recommendations if no specific interests
    if (recommendations.length === 0) {
      recommendations.push(...unlocked.slice(0, 3));
    }
    
    return [...new Set(recommendations)];
  }

  static getSkillDifficulty(skillId: string): 'beginner' | 'intermediate' | 'advanced' {
    const skill = this.getSkillById(skillId);
    return skill?.PromptEngineeringSkill?.level as any || 'beginner';
  }

  static getSkillDuration(skillId: string): number {
    const skill = this.getSkillById(skillId);
    const experienceNeeded = skill?.levels?.[1]?.experienceNeeded || 0;
    // Rough estimate: 100 experience points = 1 hour of learning
    return Math.round(experienceNeeded / 100);
  }
}

// Export skill registry for easy integration
export const SkillRegistry = {
  allSkills: [
    // Core Design Skills
    'design-fundamentals',
    'prompt-engineering',
    'color-theory',
    'typography',
    'digital-art',
    'social-media',
    'branding',
    'brand-guidelines',
    'logo-design',
    'vector-design',
    'pdf-export',
    // Agency-Specific Skills
    'account-management',
    'project-scoping',
    'creative-leadership',
    'agency-business-development',
    'client-presentation',
    'quality-assurance',
    'financial-management',
    'agency-operations',
    'client-success'
  ],
  categories: {
    ...SkillCategories,
    ...AgencySkillCategories
  },
  learningPaths: {
    ...LearningPaths,
    ...AgencySkillPaths
  },
  relationships: SkillRelationships,
  integration: AgencySkillIntegration,
  utils: SkillUtils
};
