import { SkillDefinition } from '../types';

export const ProjectScopingSkill: SkillDefinition = {
  id: 'project-scoping',
  name: 'Project Scoping & Planning',
  description: 'Master the art of project definition, scope management, and requirements gathering for creative projects.',
  category: 'strategic' as any,
  level: 'advanced' as any,
  status: 'active' as any,
  tags: ['project-scoping', 'requirements-gathering', 'scope-management', 'project-planning'],
  requirements: ['branding', 'design-fundamentals', 'brand-guidelines'],
  capabilities: [
    'requirements-elicitation',
    'scope-definition',
    'stakeholder-analysis',
    'work-breakdown-structure',
    'risk-assessment',
    'resource-planning',
    'timeline-development',
    'change-management',
    'quality-planning',
    'deliverables-definition'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 140,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

export const ProjectScopingLevels = {
  1: {
    title: 'Project Scoping Novice',
    description: 'Understanding basic project scoping concepts',
    requirements: ['Basic project knowledge', 'Requirements gathering'],
    skills: ['Basic requirements', 'Simple scope definition', 'Initial planning'],
    experienceNeeded: 0
  },
  2: {
    title: 'Project Scoping Apprentice',
    description: 'Scoping small to medium creative projects',
    requirements: ['5 project scopes', 'Stakeholder analysis'],
    skills: ['Requirements gathering', 'Scope definition', 'Basic planning'],
    experienceNeeded: 250
  },
  3: {
    title: 'Project Scoping Practitioner',
    description: 'Comprehensive project scoping and planning',
    requirements: ['Complex project scopes', 'Change management'],
    skills: ['Comprehensive scoping', 'Risk management', 'Resource planning'],
    experienceNeeded: 600
  },
  4: {
    title: 'Project Scoping Specialist',
    description: 'Advanced project scoping and requirements management',
    requirements: ['Enterprise project experience', 'Complex stakeholder management'],
    skills: ['Advanced scoping', 'Complex requirements', 'Strategic planning'],
    experienceNeeded: 1500
  },
  5: {
    title: 'Project Scoping Expert',
    description: 'Master project scoping strategist and consultant',
    requirements: ['Industry recognition', 'Methodology development'],
    skills: ['Strategic scoping', 'Methodology innovation', 'Industry leadership'],
    experienceNeeded: 3000
  }
};

export const ProjectScopingFramework = {
  discovery: {
    name: 'Discovery Phase',
    activities: [
      'Stakeholder identification and analysis',
      'Requirements elicitation workshops',
      'Current state assessment',
      'Competitive landscape analysis',
      'Constraint identification',
      'Success criteria definition'
    ],
    techniques: ['Interviews', 'Workshops', 'Surveys', 'Observation', 'Document analysis'],
    deliverables: ['Stakeholder map', 'Requirements matrix', 'Current state analysis', 'Constraints list']
  },
  scoping: {
    name: 'Scoping Phase',
    activities: [
      'Project boundaries definition',
      'In-scope/out-scope identification',
      'Assumptions documentation',
      'Dependencies identification',
      'Risk assessment',
      'Resource requirements analysis'
    ],
    techniques: ['Work breakdown structure', 'Mind mapping', 'Use case analysis', 'Process modeling'],
    deliverables: ['Scope statement', 'WBS', 'Risk register', 'Resource plan']
  },
  planning: {
    name: 'Planning Phase',
    activities: [
      'Timeline development',
      'Milestone definition',
      'Quality planning',
      'Change management process',
      'Communication planning',
      'Success metrics definition'
    ],
    techniques: ['Critical path analysis', 'Resource leveling', 'Quality function deployment', 'Change control'],
    deliverables: ['Project plan', 'Quality plan', 'Change management plan', 'Success metrics']
  }
};

export const ProjectScopingExercises = {
  1: [
    {
      title: 'Requirements Elicitation Workshop',
      description: 'Conduct and document requirements elicitation workshop for creative project',
      experienceReward: 35,
      estimatedTime: 120
    },
    {
      title: 'Scope Definition Document',
      description: 'Create comprehensive scope definition for medium complexity project',
      experienceReward: 40,
      estimatedTime: 150
    }
  ],
  2: [
    {
      title: 'Stakeholder Analysis Framework',
      description: 'Develop comprehensive stakeholder analysis and management framework',
      experienceReward: 50,
      estimatedTime: 180
    },
    {
      title: 'Risk Assessment Process',
      description: 'Create and apply risk assessment methodology for creative projects',
      experienceReward: 45,
      estimatedTime: 160
    }
  ],
  3: [
    {
      title: 'Work Breakdown Structure Mastery',
      description: 'Develop comprehensive WBS for complex creative project',
      experienceReward: 65,
      estimatedTime: 220
    },
    {
      title: 'Change Management System',
      description: 'Design change management process for creative project execution',
      experienceReward: 60,
      estimatedTime: 200
    }
  ],
  4: [
    {
      title: 'Enterprise Project Scoping',
      description: 'Scope and plan enterprise-level creative initiative',
      experienceReward: 85,
      estimatedTime: 280
    },
    {
      title: 'Requirements Management System',
      description: 'Create comprehensive requirements management system and methodology',
      experienceReward: 80,
      estimatedTime: 250
    }
  ],
  5: [
    {
      title: 'Scoping Methodology Innovation',
      description: 'Develop innovative scoping methodology for creative projects',
      experienceReward: 130,
      estimatedTime: 350
    },
    {
      title: 'Industry Scoping Framework',
      description: 'Create industry-standard scoping framework that benefits broader community',
      experienceReward: 120,
      estimatedTime: 300
    }
  ]
};

export const ProjectScopingTemplates = {
  projectBrief: {
    structure: [
      'Project overview and objectives',
      'Background and context',
      'Stakeholder identification',
      'Scope and boundaries',
      'Assumptions and constraints',
      'Success criteria and KPIs',
      'High-level timeline',
      'Resource requirements',
      'Risk identification',
      'Next steps and approvals'
    ]
  },
  requirementsMatrix: {
    categories: [
      'Functional requirements',
      'Non-functional requirements',
      'Business requirements',
      'Technical requirements',
      'User experience requirements',
      'Brand and creative requirements'
    ],
    attributes: ['Priority', 'Source', 'Verification method', 'Acceptance criteria', 'Dependencies']
  },
  scopeStatement: {
    components: [
      'Project purpose and justification',
      'Project objectives and deliverables',
      'Scope boundaries (in-scope items)',
      'Exclusions (out-of-scope items)',
      'Constraints and assumptions',
      'Success criteria',
      'Change control process',
      'Approval requirements'
    ]
  }
};
