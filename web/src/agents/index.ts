// Creative Agency Team - Complete Agent System
// This file exports all specialized agents and provides agency team management

// Import all agent definitions
export { CreativeDirectorAgent, CreativeDirectorWorkflows, CreativeDirectorTemplates, CreativeDirectorMetrics } from './creative-director';
export { ArtDirectorAgent, ArtDirectorWorkflows, ArtDirectorCritiqueFramework, ArtDirectorTemplates, ArtDirectorSpecializations } from './art-director';
export { BrandStrategistAgent, BrandStrategistWorkflows, BrandStrategistFrameworks, BrandStrategistDeliverables } from './brand-strategist';
export { SeniorDesignerAgent, SeniorDesignerWorkflows, SeniorDesignerExpertise, SeniorDesignerTemplates, SeniorDesignerQualityFramework } from './senior-designer';
export { SocialMediaManagerAgent, SocialMediaManagerWorkflows, SocialMediaPlatformExpertise, SocialMediaContentTemplates, SocialMediaAnalyticsFramework } from './social-media-manager';
export { CopywriterAgent, CopywriterWorkflows, CopywritingExpertise, CopywritingTemplates, CopywritingOptimizationFramework } from './copywriter';
export { MotionDesignerAgent, MotionDesignerWorkflows, MotionDesignerTechniques, MotionDesignerTechnicalSpecs, MotionDesignerProjectTemplates } from './motion-designer';
export { ProductionManagerAgent, ProductionManagerWorkflows, ProductionManagerFrameworks, ProductionManagerCommunication, ProductionManagerTemplates } from './production-manager';

// Agency team structure and organization
export const CreativeAgencyTeam = {
  leadership: {
    name: 'Leadership Team',
    description: 'Strategic vision and creative direction',
    roles: ['Creative Director', 'Brand Strategist'],
    responsibilities: ['Strategic planning', 'Creative vision', 'Brand strategy', 'Client relationships']
  },
  creative: {
    name: 'Creative Team',
    description: 'Visual execution and creative development',
    roles: ['Art Director', 'Senior Designer', 'Motion Designer'],
    responsibilities: ['Visual design', 'Creative execution', 'Animation', 'Brand implementation']
  },
  content: {
    name: 'Content Team',
    description: 'Content creation and messaging',
    roles: ['Copywriter', 'Social Media Manager'],
    responsibilities: ['Copywriting', 'Content strategy', 'Social media', 'Brand messaging']
  },
  operations: {
    name: 'Operations Team',
    description: 'Project management and production',
    roles: ['Production Manager'],
    responsibilities: ['Project coordination', 'Resource management', 'Quality control', 'Timeline management']
  }
};

// Extended agent types for creative agency
export const ExtendedAgentTypes = {
  ...AgentType,
  CREATIVE_DIRECTOR: 'creative_director' as any,
  ART_DIRECTOR: 'art_director' as any,
  BRAND_STRATEGIST: 'brand_strategist' as any,
  SENIOR_DESIGNER: 'senior_designer' as any,
  SOCIAL_MEDIA_MANAGER: 'social_media_manager' as any,
  COPYWRITER: 'copywriter' as any,
  MOTION_DESIGNER: 'motion_designer' as any,
  PRODUCTION_MANAGER: 'production_manager' as any
};

// Agent capabilities and skills mapping
export const AgencyAgentCapabilities = {
  creative_director: {
    capabilities: [
      AgentCapability.BRAND_EVOLUTION,
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.PERFORMANCE_OPTIMIZATION
    ],
    skills: ['brand-strategy', 'creative-direction', 'client-communication'],
    teamRole: 'Leadership',
    reporting: 'Executive level'
  },
  art_director: {
    capabilities: [
      AgentCapability.ASSET_ANALYSIS,
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.PERFORMANCE_OPTIMIZATION
    ],
    skills: ['visual-design', 'art-direction', 'design-systems'],
    teamRole: 'Creative Lead',
    reporting: 'Creative Director'
  },
  brand_strategist: {
    capabilities: [
      AgentCapability.TREND_ANALYSIS,
      AgentCapability.BRAND_EVOLUTION,
      AgentCapability.ASSET_ANALYSIS
    ],
    skills: ['market-analysis', 'brand-positioning', 'consumer-insights'],
    teamRole: 'Strategy Lead',
    reporting: 'Creative Director'
  },
  senior_designer: {
    capabilities: [
      AgentCapability.ASSET_ANALYSIS,
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.PROMPT_GENERATION
    ],
    skills: ['graphic-design', 'brand-implementation', 'creative-execution'],
    teamRole: 'Creative Execution',
    reporting: 'Art Director'
  },
  social_media_manager: {
    capabilities: [
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.PROMPT_GENERATION,
      AgentCapability.ASSET_ANALYSIS
    ],
    skills: ['social-strategy', 'content-creation', 'community-management'],
    teamRole: 'Content Specialist',
    reporting: 'Brand Strategist / Art Director'
  },
  copywriter: {
    capabilities: [
      AgentCapability.PROMPT_GENERATION,
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.PERFORMANCE_OPTIMIZATION
    ],
    skills: ['brand-copywriting', 'creative-concept', 'content-optimization'],
    teamRole: 'Content Creator',
    reporting: 'Art Director / Brand Strategist'
  },
  motion_designer: {
    capabilities: [
      AgentCapability.PROMPT_GENERATION,
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.ASSET_ANALYSIS
    ],
    skills: ['motion-graphics', 'brand-animation', 'video-production'],
    teamRole: 'Creative Specialist',
    reporting: 'Art Director'
  },
  production_manager: {
    capabilities: [
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.ASSET_ANALYSIS,
      AgentCapability.PERFORMANCE_OPTIMIZATION
    ],
    skills: ['project-management', 'quality-control', 'resource-optimization'],
    teamRole: 'Operations',
    reporting: 'Creative Director / Operations Director'
  }
};

// Agency project workflows
export const AgencyProjectWorkflows = {
  strategyFirst: {
    name: 'Strategy-First Approach',
    description: 'Begin with comprehensive brand and market strategy',
    phases: [
      'Discovery and research',
      'Strategy development',
      'Creative direction',
      'Execution planning'
    ],
    duration: '2-4 weeks',
    teamInvolvement: ['Brand Strategist', 'Creative Director', 'Client stakeholders']
  },
  collaborativeCreation: {
    name: 'Collaborative Creation Process',
    description: 'Cross-functional team collaboration for optimal results',
    phases: [
      'Creative brief and strategy',
      'Concept development',
      'Design and content creation',
      'Review and refinement',
      'Production and delivery'
    ],
    duration: '4-8 weeks',
    teamInvolvement: ['All team members', 'Client feedback', 'Iterative reviews']
  },
  agileDelivery: {
    name: 'Agile Delivery Method',
    description: 'Iterative delivery with regular feedback loops',
    sprints: ['2-week sprints', 'Sprint planning', 'Sprint review', 'Retrospective'],
    deliverables: ['MVP release', 'Iterative improvements', 'Final delivery'],
    teamInvolvement: ['Cross-functional teams', 'Daily standups', 'Sprint reviews']
  }
};

// Agency service offerings
export const AgencyServiceOfferings = {
  brandStrategy: {
    name: 'Brand Strategy & Identity',
    services: ['Brand positioning', 'Visual identity', 'Brand guidelines', 'Brand architecture'],
    team: ['Brand Strategist', 'Creative Director', 'Art Director', 'Senior Designer'],
    deliverables: ['Brand strategy document', 'Logo and visual identity', 'Comprehensive brand guidelines']
  },
  contentCreation: {
    name: 'Content Creation',
    services: ['Copywriting', 'Visual design', 'Video production', 'Social media content'],
    team: ['Copywriter', 'Senior Designer', 'Motion Designer', 'Social Media Manager'],
    deliverables: ['Campaign content', 'Social media assets', 'Video content', 'Copy and messaging']
  },
  digitalMarketing: {
    name: 'Digital Marketing',
    services: ['Social media management', 'Digital advertising', 'Email marketing', 'Content marketing'],
    team: ['Social Media Manager', 'Copywriter', 'Senior Designer', 'Brand Strategist'],
    deliverables: ['Social media strategy', 'Campaign assets', 'Performance reports', 'Content calendar']
  },
  creativeProduction: {
    name: 'Creative Production',
    services: ['Graphic design', 'Motion graphics', 'Video production', 'Interactive experiences'],
    team: ['Senior Designer', 'Motion Designer', 'Art Director', 'Production Manager'],
    deliverables: ['Design assets', 'Video content', 'Animations', 'Interactive experiences']
  }
};

// Client engagement models
export const AgencyClientEngagement = {
  projectBased: {
    name: 'Project-Based Engagement',
    description: 'Fixed-scope projects with clear deliverables',
    characteristics: ['Defined scope', 'Fixed timeline', 'Clear deliverables', 'Milestone payments'],
    bestFor: ['Specific campaigns', 'Limited scope projects', 'First-time clients']
  },
  retainer: {
    name: 'Monthly Retainer',
    description: 'Ongoing creative partnership with monthly deliverables',
    characteristics: ['Continuous relationship', 'Monthly deliverables', 'Strategic partnership', 'Flexible scope'],
    bestFor: ['Long-term partnerships', 'Ongoing content needs', 'Strategic support']
  },
  agencyOfRecord: {
    name: 'Agency of Record',
    description: 'Complete creative agency partnership',
    characteristics: ['Full-service partnership', 'Strategic integration', 'Dedicated team', 'Performance-based'],
    bestFor: ['Large organizations', 'Comprehensive needs', 'Strategic partnerships']
  }
};

// Utility functions for agency team management
export class AgencyTeamUtils {
  static getAgentByRole(role: string) {
    const agentMap = {
      'creative-director': CreativeDirectorAgent,
      'art-director': ArtDirectorAgent,
      'brand-strategist': BrandStrategistAgent,
      'senior-designer': SeniorDesignerAgent,
      'social-media-manager': SocialMediaManagerAgent,
      'copywriter': CopywriterAgent,
      'motion-designer': MotionDesignerAgent,
      'production-manager': ProductionManagerAgent
    };
    return agentMap[role as keyof typeof agentMap] || null;
  }

  static getTeamForService(serviceType: string) {
    return AgencyServiceOfferings[serviceType as keyof typeof AgencyServiceOfferings]?.team || [];
  }

  static getProjectWorkflow(methodology: string) {
    return AgencyProjectWorkflows[methodology as keyof typeof AgencyProjectWorkflows] || null;
  }

  static calculateTeamComposition(projectScope: any) {
    // Logic to determine optimal team composition based on project scope
    const requiredSkills = projectScope?.requiredSkills || [];
    const teamMembers = [];

    if (requiredSkills.includes('brand-strategy')) {
      teamMembers.push('brand-strategist');
    }
    if (requiredSkills.includes('creative-direction')) {
      teamMembers.push('creative-director');
    }
    if (requiredSkills.includes('design')) {
      teamMembers.push('art-director', 'senior-designer');
    }
    if (requiredSkills.includes('content')) {
      teamMembers.push('copywriter', 'social-media-manager');
    }
    if (requiredSkills.includes('motion')) {
      teamMembers.push('motion-designer');
    }
    if (requiredSkills.includes('production')) {
      teamMembers.push('production-manager');
    }

    return [...new Set(teamMembers)];
  }

  static estimateProjectTimeline(projectComplexity: 'simple' | 'moderate' | 'complex', teamSize: number): number {
    const baseDays = {
      simple: 5,
      moderate: 15,
      complex: 30
    };

    const teamEfficiency = Math.max(0.5, Math.min(1.5, teamSize / 4));
    return Math.round(baseDays[projectComplexity] / teamEfficiency);
  }
}

// Import harmony system
import AgencyHarmonySystem from '../integration/agency-harmony';

// Export complete agency team system
export const CreativeAgencySystem = {
  team: CreativeAgencyTeam,
  agents: {
    CreativeDirectorAgent,
    ArtDirectorAgent,
    BrandStrategistAgent,
    SeniorDesignerAgent,
    SocialMediaManagerAgent,
    CopywriterAgent,
    MotionDesignerAgent,
    ProductionManagerAgent
  },
  workflows: AgencyProjectWorkflows,
  services: AgencyServiceOfferings,
  engagement: AgencyClientEngagement,
  capabilities: AgencyAgentCapabilities,
  harmony: AgencyHarmonySystem,
  utils: AgencyTeamUtils
};
