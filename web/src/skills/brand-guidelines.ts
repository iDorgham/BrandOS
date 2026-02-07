import { SkillDefinition } from '../types';

export const BrandGuidelinesSkill: SkillDefinition = {
  id: 'brand-guidelines',
  name: 'Brand Guidelines Development',
  description: 'Master the creation of comprehensive brand guidelines that ensure consistency across all touchpoints',
  category: 'strategic' as any,
  level: 'advanced' as any,
  status: 'active' as any,
  tags: ['brand-guidelines', 'brand-systems', 'documentation', 'brand-consistency', 'brand-governance'],
  requirements: ['branding', 'design-fundamentals', 'color-theory', 'typography'],
  capabilities: [
    'guideline-creation',
    'brand-systems-design',
    'documentation-writing',
    'brand-governance',
    'consistency-enforcement',
    'template-creation',
    'brand-education',
    'guideline-implementation',
    'version-management',
    'cross-platform-adaptation'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 145,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Brand guideline components
export const BrandGuidelineComponents = {
  strategyFoundation: {
    brandEssence: {
      description: 'Core brand identity and positioning',
      elements: [
        'Brand mission and vision',
        'Brand values and principles',
        'Brand personality and voice',
        'Value proposition',
        'Target audience definition',
        'Market positioning'
      ],
      deliverables: ['Strategy document', 'Brand pyramid', 'Voice guidelines', 'Target personas']
    },
    brandArchitecture: {
      description: 'Structure of brand portfolio and relationships',
      elements: [
        'Brand architecture model',
        'Sub-brand relationships',
        'Endorsement strategies',
        'Portfolio organization',
        'Naming conventions',
        'Hierarchy systems'
      ],
      deliverables: ['Architecture diagram', 'Naming system', 'Hierarchy guidelines']
    }
  },
  visualIdentity: {
    logoSystem: {
      description: 'Complete logo usage and variations',
      elements: [
        'Primary logo versions',
        'Secondary logos',
        'Icon/symbol variations',
        'Lockups and configurations',
        'Clear space requirements',
        'Minimum size guidelines',
        'Color variations',
        'Black and white versions'
      ],
      applications: ['Digital', 'Print', 'Merchandise', 'Environmental'],
      restrictions: ['Color modifications', 'Distortion prevention', 'Background limitations']
    },
    colorSystem: {
      description: 'Comprehensive color palette and usage rules',
      elements: [
        'Primary brand colors',
        'Secondary colors',
        'Accent colors',
        'Neutral palette',
        'Extended color system',
        'Color psychology notes',
        'Cultural considerations',
        'Accessibility compliance'
      ],
      specifications: [
        'HEX, RGB, CMYK values',
        'Pantone equivalents',
        'Web safe colors',
        'Accessibility ratios',
        'Usage percentages',
        'Color hierarchy'
      ]
    },
    typographySystem: {
      description: 'Complete typography guidelines and specifications',
      elements: [
        'Primary typefaces',
        'Secondary typefaces',
        'Display fonts',
        'Fallback fonts',
        'Hierarchy system',
        'Spacing guidelines',
        'Weight variations',
        'Character sets'
      ],
      specifications: [
        'Font files and licensing',
        'Web font implementations',
        'Sizing scales',
        'Line height ratios',
        'Letter spacing',
        'Paragraph spacing',
        'Readibility guidelines'
      ]
    },
    imageryStyle: {
      description: 'Photography and illustration guidelines',
      elements: [
        'Photography style',
        'Illustration style',
        'Icon system',
        'Graphic elements',
        'Treatment techniques',
        'Color overlays',
        'Composition rules',
        'Subject matter guidelines'
      ],
      applications: ['Marketing', 'Editorial', 'Product', 'Lifestyle', 'Corporate']
    }
  },
  applicationSystems: {
    marketingMaterials: {
      description: 'Guidelines for marketing communications',
      templates: [
        'Business cards',
        'Letterheads',
        'Brochures',
        'Presentations',
        'Social media',
        'Email signatures',
        'Advertisements',
        'Direct mail'
      ],
      specifications: ['Layout grids', 'Content hierarchy', 'Brand integration', 'Usage examples']
    },
    digitalProducts: {
      description: 'Digital application guidelines',
      systems: [
        'Website design',
        'Mobile applications',
        'User interface',
        'Email templates',
        'Digital advertising',
        'Social media assets',
        'Video graphics',
        'Motion graphics'
      ],
      considerations: ['Responsive design', 'User experience', 'Performance', 'Accessibility']
    },
    environmentalDesign: {
      description: 'Physical space and environmental applications',
      applications: [
        'Retail spaces',
        'Office environments',
        'Trade show booths',
        'Vehicle graphics',
        'Signage systems',
        'Packaging',
        'Uniforms',
        'Merchandise'
      ],
      considerations: ['Material specifications', 'Production methods', 'Installation guidelines']
    }
  },
  governanceAndUsage: {
    usageGuidelines: {
      description: 'Rules and best practices for brand application',
      sections: [
        'Dos and don\'ts',
        'Common mistakes',
        'Brand misuse examples',
        'Co-branding rules',
        'Third-party usage',
        'Licensing requirements',
        'Quality standards',
        'Approval processes'
      ],
      enforcement: ['Compliance checking', 'Quality control', 'Training programs', 'Audit procedures']
    },
    assetManagement: {
      description: 'Digital asset management and distribution',
      systems: [
        'Asset library structure',
        'File naming conventions',
        'Version control',
        'Access permissions',
        'Download formats',
        'Quality standards',
        'Backup procedures',
        'Update workflows'
      ],
      tools: ['DAM systems', 'Cloud storage', 'Distribution platforms', 'Quality assurance']
    }
  }
};

// Guideline documentation structures
export const GuidelineDocumentation = {
  executiveSummary: {
    purpose: 'Quick overview for executives and stakeholders',
    contents: [
      'Brand mission and vision',
      'Key brand values',
      'Market positioning',
      'Target audience',
      'Key differentiators',
      'Visual identity overview'
    ],
    format: ['Concise language', 'Visual examples', 'Key metrics', 'Strategic context']
  },
  completeGuidelines: {
    purpose: 'Comprehensive reference for all brand users',
    structure: [
      'Table of contents',
      'Introduction and purpose',
      'Brand strategy foundation',
      'Visual identity systems',
      'Application guidelines',
      'Usage rules and restrictions',
      'Asset library access',
      'Contact information',
      'Version history'
    ],
    features: ['Searchable content', 'Downloadable assets', 'Interactive examples', 'Printable sections']
  },
  quickReference: {
    purpose: 'Essential information for daily use',
    contents: [
      'Logo variations and usage',
      'Color palette',
      'Typography hierarchy',
      'Common templates',
      'Quick do\'s and don\'ts',
      'Asset download links'
    ],
    formats: ['Print poster', 'PDF reference', 'Digital dashboard', 'Mobile app']
  },
  sectorSpecific: {
    purpose: 'Tailored guidelines for different departments',
    adaptations: [
      'Marketing team guidelines',
      'Sales enablement materials',
      'Product development',
      'Customer service',
      'Human resources',
      'Partners and suppliers',
      'Franchise locations',
      'International markets'
    ],
    customizations: ['Sector-specific examples', 'Relevant templates', 'Special requirements']
  }
};

// Implementation and training strategies
export const GuidelineImplementation = {
  launchStrategy: {
    phases: [
      'Pre-launch preparation',
      'Internal launch',
      'External rollout',
      'Ongoing reinforcement'
    ],
    activities: [
      'Stakeholder buy-in',
      'Training program development',
      'Asset preparation',
      'Communication plan',
      'Feedback collection',
      'Continuous improvement'
    ]
  },
  trainingPrograms: {
    audiences: [
      'Executive leadership',
      'Marketing team',
      'Design team',
      'Sales team',
      'Customer service',
      'External partners',
      'New employees'
    ],
    formats: [
      'Workshops and seminars',
      'Online courses',
      'Video tutorials',
      'Reference materials',
      'One-on-one coaching',
      'Team training',
      'Self-paced learning'
    ],
    content: [
      'Brand story and strategy',
      'Visual identity training',
      'Practical application',
      'Tool usage',
      'Quality standards',
      'Problem solving',
      'Best practices'
    ]
  },
  qualityAssurance: {
    monitoring: [
      'Brand compliance audits',
      'Regular reviews',
      'Feedback collection',
      'Performance metrics',
      'Issue identification',
      'Continuous improvement'
    ],
    tools: [
      'Compliance checklists',
      'Review workflows',
      'Approval systems',
      'Analytics tracking',
      'Issue reporting',
      'Training reminders'
    ],
    metrics: [
      'Compliance rates',
      'Quality scores',
      'Training effectiveness',
      'Issue resolution',
      'User satisfaction'
    ]
  }
};

// Level progression
export const BrandGuidelinesLevels = {
  1: {
    title: 'Guidelines Novice',
    description: 'Understanding basic brand guideline concepts',
    requirements: ['Brand knowledge', 'Documentation skills'],
    skills: ['Basic guideline creation', 'Documentation writing', 'Brand consistency'],
    experienceNeeded: 0
  },
  2: {
    title: 'Guidelines Apprentice',
    description: 'Creating effective brand guidelines for small brands',
    requirements: ['Complete guideline projects', 'Template creation'],
    skills: ['Guideline development', 'Template design', 'Basic systems'],
    experienceNeeded: 250
  },
  3: {
    title: 'Guidelines Practitioner',
    description: 'Developing comprehensive brand systems',
    requirements: ['Complex guideline projects', 'Implementation experience'],
    skills: ['System design', 'Implementation strategy', 'Training development'],
    experienceNeeded: 600
  },
  4: {
    title: 'Guidelines Specialist',
    description: 'Advanced brand systems and governance',
    requirements: ['Enterprise guidelines', 'Governance systems'],
    skills: ['Advanced systems', 'Governance design', 'Change management'],
    experienceNeeded: 1500
  },
  5: {
    title: 'Guidelines Expert',
    description: 'Master brand systems architect and consultant',
    requirements: ['Industry recognition', 'Innovative systems'],
    skills: ['System innovation', 'Industry leadership', 'Strategic consulting'],
    experienceNeeded: 3000
  }
};

// Practical exercises
export const BrandGuidelinesExercises = {
  1: [
    {
      title: 'Basic Guidelines Creation',
      description: 'Create basic brand guidelines for a small business',
      experienceReward: 35,
      estimatedTime: 120
    },
    {
      title: 'Template Development',
      description: 'Design brand templates for common business materials',
      experienceReward: 30,
      estimatedTime: 100
    }
  ],
  2: [
    {
      title: 'Comprehensive Guidelines',
      description: 'Develop complete brand guidelines for a startup',
      experienceReward: 50,
      estimatedTime: 200
    },
    {
      title: 'Brand System Design',
      description: 'Create a visual identity system with multiple components',
      experienceReward: 45,
      estimatedTime: 180
    }
  ],
  3: [
    {
      title: 'Guideline Implementation',
      description: 'Implement brand guidelines across multiple touchpoints',
      experienceReward: 70,
      estimatedTime: 250
    },
    {
      title: 'Training Program Creation',
      description: 'Develop a training program for brand guidelines usage',
      experienceReward: 65,
      estimatedTime: 220
    }
  ],
  4: [
    {
      title: 'Enterprise Guidelines',
      description: 'Create comprehensive guidelines for a multi-division company',
      experienceReward: 90,
      estimatedTime: 300
    },
    {
      title: 'Brand Governance System',
      description: 'Design a complete brand governance and compliance system',
      experienceReward: 85,
      estimatedTime: 280
    }
  ],
  5: [
    {
      title: 'Innovation Project',
      description: 'Develop an innovative brand system or methodology',
      experienceReward: 140,
      estimatedTime: 350
    },
    {
      title: 'Industry Framework',
      description: 'Create a brand guidelines framework that benefits the industry',
      experienceReward: 120,
      estimatedTime: 300
    }
  ]
};
