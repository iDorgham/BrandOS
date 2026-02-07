// Agency-Specific Skills for Complete Creative Operations
import { SkillCategory, SkillLevel, SkillStatus } from '../types';

// Enhanced skill definitions for agency operations
export const AgencySpecificSkills = [
  // Account Management
  {
    id: 'account-management',
    name: 'Account Management',
    description: 'Strategic client relationship management and business development for creative agencies',
    category: SkillCategory.COLLABORATIVE,
    level: SkillLevel.ADVANCED,
    status: SkillStatus.ACTIVE,
    tags: ['account-management', 'client-relationships', 'business-development', 'agency-growth'],
    requirements: ['branding', 'social-media'],
    capabilities: [
      'client-relationship-management',
      'strategic-account-planning',
      'business-development',
      'revenue-growth',
      'client-retention',
      'upselling-cross-selling'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 150,
      learningCurve: 'exponential' as const
    }
  },

  // Project Scoping & Planning
  {
    id: 'project-scoping',
    name: 'Project Scoping & Planning',
    description: 'Comprehensive project definition, scope management, and requirements gathering',
    category: SkillCategory.STRATEGIC,
    level: SkillLevel.ADVANCED,
    status: SkillStatus.ACTIVE,
    tags: ['project-scoping', 'requirements-gathering', 'scope-management', 'project-planning'],
    requirements: ['design-fundamentals', 'branding'],
    capabilities: [
      'requirements-elicitation',
      'scope-definition',
      'stakeholder-analysis',
      'work-breakdown-structure',
      'risk-assessment',
      'resource-planning'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 140,
      learningCurve: 'exponential' as const
    }
  },

  // Creative Leadership
  {
    id: 'creative-leadership',
    name: 'Creative Leadership',
    description: 'Leading creative teams, fostering innovation, and driving creative excellence',
    category: SkillCategory.STRATEGIC,
    level: SkillLevel.ADVANCED,
    status: SkillStatus.ACTIVE,
    tags: ['creative-leadership', 'team-management', 'innovation', 'creative-excellence'],
    requirements: ['branding', 'account-management'],
    capabilities: [
      'team-leadership',
      'creative-direction',
      'innovation-management',
      'talent-development',
      'conflict-resolution',
      'creative-culture-building'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 155,
      learningCurve: 'exponential' as const
    }
  },

  // Client Presentation Skills
  {
    id: 'client-presentation',
    name: 'Client Presentation & Pitching',
    description: 'Master the art of presenting creative work and pitching ideas to clients',
    category: SkillCategory.COLLABORATIVE,
    level: SkillLevel.INTERMEDIATE,
    status: SkillStatus.ACTIVE,
    tags: ['presentation', 'pitching', 'client-communication', 'storytelling'],
    requirements: ['branding', 'design-fundamentals', 'typography'],
    capabilities: [
      'presentation-design',
      'storytelling',
      'persuasive-communication',
      'qa-handling',
      'objection-handling',
      'value-demonstration'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 120,
      learningCurve: 'exponential' as const
    }
  },

  // Quality Assurance
  {
    id: 'quality-assurance',
    name: 'Creative Quality Assurance',
    description: 'Comprehensive quality control and assurance processes for creative deliverables',
    category: SkillCategory.ANALYTICAL,
    level: SkillLevel.INTERMEDIATE,
    status: SkillStatus.ACTIVE,
    tags: ['quality-assurance', 'quality-control', 'creative-standards', 'review-processes'],
    requirements: ['design-fundamentals', 'brand-guidelines', 'branding'],
    capabilities: [
      'quality-standards-development',
      'review-processes',
      'defect-detection',
      'metrics-tracking',
      'continuous-improvement',
      'quality-reporting'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 110,
      learningCurve: 'exponential' as const
    }
  },

  // Agency Business Development
  {
    id: 'agency-business-development',
    name: 'Agency Business Development',
    description: 'Strategic business development and growth strategies for creative agencies',
    category: SkillCategory.STRATEGIC,
    level: SkillLevel.ADVANCED,
    status: SkillStatus.ACTIVE,
    tags: ['business-development', 'agency-growth', 'lead-generation', 'sales-strategy'],
    requirements: ['account-management', 'branding', 'creative-leadership'],
    capabilities: [
      'lead-generation',
      'sales-strategy',
      'proposal-development',
      'negotiation',
      'market-analysis',
      'partnership-development'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 165,
      learningCurve: 'exponential' as const
    }
  },

  // Financial Management
  {
    id: 'financial-management',
    name: 'Agency Financial Management',
    description: 'Financial planning, budgeting, and profitability management for creative agencies',
    category: SkillCategory.ANALYTICAL,
    level: SkillLevel.ADVANCED,
    status: SkillStatus.ACTIVE,
    tags: ['financial-management', 'budgeting', 'profitability', 'agency-finance'],
    requirements: ['project-scoping', 'account-management'],
    capabilities: [
      'budgeting-forecasting',
      'profitability-analysis',
      'resource-allocation',
      'cost-control',
      'financial-reporting',
      'pricing-strategy'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 145,
      learningCurve: 'exponential' as const
    }
  },

  // Agency Operations
  {
    id: 'agency-operations',
    name: 'Agency Operations Management',
    description: 'Comprehensive operations management for efficient agency workflows',
    category: SkillCategory.TECHNICAL,
    level: SkillLevel.INTERMEDIATE,
    status: SkillStatus.ACTIVE,
    tags: ['agency-operations', 'workflow-optimization', 'process-improvement', 'efficiency'],
    requirements: ['project-scoping', 'quality-assurance'],
    capabilities: [
      'workflow-design',
      'process-optimization',
      'resource-planning',
      'technology-management',
      'vendor-management',
      'compliance-management'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 125,
      learningCurve: 'exponential' as const
    }
  },

  // Client Success Management
  {
    id: 'client-success',
    name: 'Client Success Management',
    description: 'Proactive client relationship management and success measurement',
    category: SkillCategory.COLLABORATIVE,
    level: SkillLevel.INTERMEDIATE,
    status: SkillStatus.ACTIVE,
    tags: ['client-success', 'relationship-management', 'satisfaction', 'retention'],
    requirements: ['account-management', 'client-presentation'],
    capabilities: [
      'success-planning',
      'relationship-building',
      'satisfaction-measurement',
      'value-demonstration',
      'issue-resolution',
      'growth-opportunities'
    ],
    config: {
      maxLevel: 10,
      experiencePoints: 115,
      learningCurve: 'exponential' as const
    }
  }
];

// Agency skill categories and relationships
export const AgencySkillCategories = {
  leadership: {
    name: 'Leadership & Management',
    skills: ['creative-leadership', 'account-management', 'financial-management'],
    description: 'Skills for leading teams and managing agency operations'
  },
  clientFacing: {
    name: 'Client-Facing Skills',
    skills: ['client-presentation', 'account-management', 'client-success'],
    description: 'Skills for managing client relationships and presentations'
  },
  strategic: {
    name: 'Strategic Skills',
    skills: ['project-scoping', 'agency-business-development'],
    description: 'Skills for strategic planning and business growth'
  },
  operational: {
    name: 'Operational Skills',
    skills: ['agency-operations', 'quality-assurance'],
    description: 'Skills for efficient agency operations and quality'
  },
  creative: {
    name: 'Creative Foundation',
    skills: ['design-fundamentals', 'branding', 'typography', 'digital-art'],
    description: 'Core creative and design skills'
  }
};

// Skill progression paths for agency roles
export const AgencySkillPaths = {
  accountManager: {
    title: 'Account Manager Path',
    description: 'Complete skill progression for successful account management',
    coreSkills: ['account-management', 'client-presentation', 'project-scoping'],
    supportingSkills: ['branding', 'creative-leadership', 'client-success'],
    experienceTotal: 2000,
    specializationOptions: ['strategic-accounts', 'enterprise-accounts', 'key-account-management']
  },
  creativeDirector: {
    title: 'Creative Director Path',
    description: 'Complete skill progression for creative leadership excellence',
    coreSkills: ['creative-leadership', 'account-management', 'quality-assurance'],
    supportingSkills: ['branding', 'design-fundamentals', 'financial-management'],
    experienceTotal: 2500,
    specializationOptions: ['brand-creative', 'digital-creative', 'integrated-campaigns']
  },
  productionManager: {
    title: 'Production Manager Path',
    description: 'Complete skill progression for production management excellence',
    coreSkills: ['agency-operations', 'project-scoping', 'quality-assurance'],
    supportingSkills: ['financial-management', 'client-success', 'creative-leadership'],
    experienceTotal: 1800,
    specializationOptions: ['digital-production', 'print-production', 'integrated-workflows']
  },
  agencyOwner: {
    title: 'Agency Owner Path',
    description: 'Complete skill progression for agency ownership and growth',
    coreSkills: ['agency-business-development', 'financial-management', 'creative-leadership'],
    supportingSkills: ['account-management', 'quality-assurance', 'agency-operations'],
    experienceTotal: 3500,
    specializationOptions: ['growth-agency', 'boutique-agency', 'enterprise-agency']
  }
};

// Skill integration matrix
export const AgencySkillIntegration = {
  projectWorkflow: {
    'project-scoping': ['project-kickoff', 'requirements-gathering', 'scope-definition'],
    'creative-leadership': ['team-alignment', 'creative-direction', 'quality-standards'],
    'account-management': ['client-communication', 'expectation-management', 'relationship-building'],
    'quality-assurance': ['quality-gates', 'review-processes', 'standards-enforcement'],
    'agency-operations': ['workflow-optimization', 'resource-allocation', 'process-monitoring']
  },
  clientEngagement: {
    'client-presentation': ['pitch-preparation', 'storytelling', 'value-demonstration'],
    'account-management': ['relationship-management', 'strategic-planning', 'growth-opportunities'],
    'client-success': ['success-metrics', 'proactive-support', 'value-delivery'],
    'creative-leadership': ['creative-vision', 'quality-assurance', 'team-coordination']
  },
  businessDevelopment: {
    'agency-business-development': ['lead-generation', 'proposal-development', 'negotiation'],
    'account-management': ['existing-client-growth', 'upselling', 'retention'],
    'financial-management': ['profitability-analysis', 'pricing-strategy', 'budget-forecasting'],
    'creative-leadership': ['capability-demonstration', 'case-study-development']
  }
};
