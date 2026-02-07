import { SkillDefinition } from '../types';

export const BrandingSkill: SkillDefinition = {
  id: 'branding',
  name: 'Branding & Brand Strategy',
  description: 'Master the creation of compelling brand identities and strategic brand development',
  category: 'strategic' as any,
  level: 'advanced' as any,
  status: 'active' as any,
  tags: ['branding', 'brand-strategy', 'brand-identity', 'brand-development', 'corporate-design'],
  requirements: ['design-fundamentals', 'color-theory', 'typography', 'digital-art'],
  capabilities: [
    'brand-strategy',
    'brand-identity-design',
    'brand-guidelines',
    'brand-positioning',
    'brand-storytelling',
    'brand-architecture',
    'competitive-analysis',
    'brand-audits',
    'rebranding-strategy',
    'brand-consistency'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 160,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Brand architecture frameworks
export const BrandArchitecture = {
  monolithic: {
    description: 'Single brand umbrella for all products and services',
    characteristics: ['One master brand', 'Unified identity', 'Clear messaging', 'Efficient marketing'],
    examples: ['Google', 'Apple', 'FedEx', 'Virgin'],
    advantages: ['Brand equity focus', 'Cost efficiency', 'Market clarity', 'Customer loyalty'],
    challenges: ['Limited flexibility', 'Risk concentration', 'Innovation constraints']
  },
  endorsed: {
    description: 'Master brand endorses sub-brands with their own identities',
    characteristics: ['Parent brand support', 'Sub-brand autonomy', 'Trust transfer', 'Market flexibility'],
    examples: ['Marriott (Courtyard, Ritz-Carlton)', 'Kellogg\'s (Frosted Flakes, Special K)'],
    advantages: ['Brand extension', 'Market segmentation', 'Risk diversification'],
    challenges: ['Brand dilution risk', 'Resource allocation', 'Management complexity']
  },
  houseOfBrands: {
    description: 'Portfolio of independent brands with minimal parent visibility',
    characteristics: ['Independent brands', 'Market targeting', 'Specialized positioning', 'Brand autonomy'],
    examples: ['P&G (Tide, Pampers, Gillette)', 'Unilever (Dove, Axe, Lipton)'],
    advantages: ['Market coverage', 'Crisis isolation', 'Flexibility', 'Competition capability'],
    challenges: ['Resource duplication', 'Cross-selling difficulty', 'Brand management complexity']
  },
  hybrid: {
    description: 'Combination of different architectural approaches',
    characteristics: ['Mixed approaches', 'Strategic segmentation', 'Flexibility', 'Optimization'],
    examples: ['Microsoft (Windows, Office, Xbox)', 'Coca-Cola (Coke, Diet Coke, Sprite)'],
    advantages: ['Strategic optimization', 'Market adaptability', 'Risk management'],
    challenges: ['Complex management', 'Brand consistency', 'Strategic clarity']
  }
};

// Brand positioning strategies
export const BrandPositioning = {
  strategies: {
    attributeBased: {
      description: 'Positioning based on specific product attributes',
      examples: [
        'Volvo = Safety',
        'BMW = Performance',
        'Dove = Moisturizing',
        'Nike = Athletic performance'
      ],
      process: ['Attribute identification', 'Competitive analysis', 'Unique value proposition', 'Consistent communication']
    },
    benefitBased: {
      description: 'Focus on functional and emotional benefits',
      examples: [
        'Apple - Simplicity and creativity',
        'Disney - Magical experiences',
        'Starbucks - Third place concept',
        'Amazon - Convenience and selection'
      ],
      process: ['Benefit identification', 'Customer insight', 'Emotional connection', 'Experience design']
    },
    valueBased: {
      description: 'Positioning based on value and price relationships',
      examples: [
        'Walmart - Everyday low prices',
        'Rolex - Luxury status',
        'IKEA - Affordable design',
        'Tesla - Premium innovation'
      ],
      process: ['Value analysis', 'Price positioning', 'Market segmentation', 'Value communication']
    },
    competitorBased: {
      description: 'Positioning relative to competitors',
      examples: [
        'Pepsi vs Coke - The choice of a new generation',
        'Avis vs Hertz - We try harder',
        '7UP vs Colas - The un-cola',
        'Burger King vs McDonald\'s - Have it your way'
      ],
      process: ['Competitor analysis', 'Differentiation identification', 'Market opportunity', 'Positioning statement']
    }
  }
};

// Brand identity elements
export const BrandIdentityElements = {
  visual: {
    logo: {
      description: 'Primary brand mark and visual identifier',
      types: ['Wordmark', 'Lettermark', 'Brandmark', 'Combination mark', 'Emblem'],
      considerations: ['Scalability', 'Timelessness', 'Memorability', 'Appropriateness'],
      applications: ['All brand touchpoints', 'Digital and print', 'Variations for different uses']
    },
    colorPalette: {
      description: 'Strategic color system for brand recognition',
      components: ['Primary colors', 'Secondary colors', 'Neutral palette', 'Accent colors'],
      psychology: ['Emotional response', 'Cultural considerations', 'Industry standards', 'Target audience'],
      systems: ['Brand guidelines', 'Usage rules', 'Accessibility compliance', 'Digital specifications']
    },
    typography: {
      description: 'Font selection and usage standards',
      systems: ['Primary typefaces', 'Secondary typefaces', 'Display fonts', 'Fallback fonts'],
      hierarchy: ['Headline styles', 'Body text', 'Caption styles', 'UI typography'],
      applications: ['Marketing materials', 'Digital interfaces', 'Print collateral', 'Brand communications']
    },
    imagery: {
      description: 'Photography and illustration styles',
      styles: ['Photography direction', 'Illustration style', 'Icon system', 'Graphic elements'],
      guidelines: ['Style characteristics', 'Composition rules', 'Color treatment', 'Subject matter'],
      sourcing: ['Custom photography', 'Stock guidelines', 'Illustration briefs', 'Icon design']
    }
  },
  verbal: {
    brandName: {
      description: 'Name that represents the brand essence',
      types: ['Descriptive', 'Suggestive', 'Abstract', 'Evocative'],
      considerations: ['Memorability', 'Pronunciation', 'Availability', 'Cultural sensitivity'],
      process: ['Market research', 'Linguistic analysis', 'Legal clearance', 'Domain availability']
    },
    tagline: {
      description: 'Memorable phrase that captures brand essence',
      functions: ['Brand summary', 'Emotional connection', 'Differentiation', 'Call to action'],
      examples: [
        'Nike - Just Do It',
        'Apple - Think Different',
        'McDonald\'s - I\'m Lovin\' It',
        'Disney - The Happiest Place on Earth'
      ]
    },
    brandVoice: {
      description: 'Personality and tone in all communications',
      dimensions: ['Formality', 'Humor', 'Enthusiasm', 'Respect'],
      applications: ['Marketing copy', 'Customer service', 'Internal communications', 'Social media'],
      guidelines: ['Tone examples', 'Do\'s and don\'ts', 'Word choice', 'Messaging frameworks']
    }
  },
  experiential: {
    customerExperience: {
      description: 'How customers interact with and experience the brand',
      touchpoints: ['Product/service', 'Customer service', 'Digital experience', 'Physical environment'],
      elements: ['User journey', 'Brand moments', 'Service design', 'Environment design'],
      measurement: ['Customer satisfaction', 'Brand perception', 'Loyalty metrics', 'Net Promoter Score']
    },
    brandEnvironment: {
      description: 'Physical and digital environments where brand exists',
      components: ['Retail design', 'Office spaces', 'Digital platforms', 'Packaging'],
      considerations: ['Brand consistency', 'User experience', 'Functional requirements', 'Emotional impact'],
      applications: ['Stores', 'Websites', 'Apps', 'Product packaging', 'Event spaces']
    }
  }
};

// Brand audit and analysis
export const BrandAuditFramework = {
  internalAnalysis: {
    brandVision: {
      questions: [
        'What is our brand purpose?',
        'What are our core values?',
        'Where do we want to be in 5 years?',
        'What makes us unique?'
      ],
      deliverables: ['Vision statement', 'Value proposition', 'Brand essence', 'Differentiators']
    },
    brandPerformance: {
      metrics: ['Brand awareness', 'Brand preference', 'Customer loyalty', 'Market share'],
      tools: ['Surveys', 'Focus groups', 'Analytics', 'Sales data'],
      analysis: ['Strength identification', 'Weakness assessment', 'Opportunity discovery', 'Threat evaluation']
    }
  },
  externalAnalysis: {
    competitiveLandscape: {
      analysis: ['Direct competitors', 'Indirect competitors', 'Market leaders', 'Emerging players'],
      framework: ['SWOT analysis', 'Positioning maps', 'Brand perceptions', 'Marketing strategies'],
      insights: ['Market gaps', 'Competitive advantages', 'Benchmarking opportunities']
    },
    customerPerception: {
      research: ['Customer interviews', 'Social listening', 'Review analysis', 'Brand perception studies'],
      dimensions: ['Brand awareness', 'Brand associations', 'Perceived quality', 'Brand loyalty'],
      methods: ['Surveys', 'Focus groups', 'Social media analysis', 'Review mining']
    }
  },
  brandConsistency: {
    touchpointAudit: {
      categories: ['Digital', 'Print', 'Environmental', 'Communication'],
      evaluation: ['Visual consistency', 'Message consistency', 'Experience quality', 'Brand alignment'],
      scoring: ['Consistency index', 'Quality metrics', 'Compliance rates', 'Gap identification']
    },
    guidelineCompliance: {
      review: ['Logo usage', 'Color application', 'Typography', 'Imagery', 'Messaging'],
      assessment: ['Compliance rates', 'Consistency issues', 'Update needs', 'Training requirements'],
      recommendations: ['Guideline updates', 'Training programs', 'Quality control', 'Brand governance']
    }
  }
};

// Level progression
export const BrandingLevels = {
  1: {
    title: 'Branding Novice',
    description: 'Understanding basic branding concepts and principles',
    requirements: ['Brand fundamentals knowledge', 'Basic design skills'],
    skills: ['Brand basics', 'Logo design', 'Simple brand guidelines'],
    experienceNeeded: 0
  },
  2: {
    title: 'Branding Apprentice',
    description: 'Creating cohesive brand identities for small projects',
    requirements: ['Complete brand identity projects', 'Brand guideline creation'],
    skills: ['Brand identity design', 'Guideline development', 'Basic strategy'],
    experienceNeeded: 300
  },
  3: {
    title: 'Branding Practitioner',
    description: 'Developing comprehensive brand strategies',
    requirements: ['Brand strategy projects', 'Client experience'],
    skills: ['Strategic thinking', 'Brand architecture', 'Competitive analysis'],
    experienceNeeded: 750
  },
  4: {
    title: 'Branding Specialist',
    description: 'Advanced brand development and rebranding projects',
    requirements: ['Complex brand projects', 'Rebranding experience'],
    skills: ['Advanced strategy', 'Rebranding management', 'Brand research'],
    experienceNeeded: 1800
  },
  5: {
    title: 'Branding Expert',
    description: 'Master brand strategist and industry thought leader',
    requirements: ['Industry recognition', 'Innovative brand solutions'],
    skills: ['Brand innovation', 'Industry leadership', 'Strategic consulting'],
    experienceNeeded: 3500
  }
};

// Practical exercises
export const BrandingExercises = {
  1: [
    {
      title: 'Brand Identity Basics',
      description: 'Create a complete brand identity for a local business',
      experienceReward: 40,
      estimatedTime: 180
    },
    {
      title: 'Competitor Analysis',
      description: 'Analyze 3 competitor brands and identify positioning strategies',
      experienceReward: 35,
      estimatedTime: 150
    }
  ],
  2: [
    {
      title: 'Brand Guideline Creation',
      description: 'Develop comprehensive brand guidelines for a startup',
      experienceReward: 55,
      estimatedTime: 250
    },
    {
      title: 'Brand Positioning Exercise',
      description: 'Create positioning strategies for 3 different market segments',
      experienceReward: 50,
      estimatedTime: 220
    }
  ],
  3: [
    {
      title: 'Brand Audit Project',
      description: 'Conduct a complete brand audit for an existing company',
      experienceReward: 75,
      estimatedTime: 300
    },
    {
      title: 'Brand Architecture Design',
      description: 'Design brand architecture for a company with multiple products',
      experienceReward: 70,
      estimatedTime: 280
    }
  ],
  4: [
    {
      title: 'Rebranding Project',
      description: 'Develop a rebranding strategy for an outdated brand',
      experienceReward: 95,
      estimatedTime: 350
    },
    {
      title: 'Brand Research Study',
      description: 'Conduct comprehensive brand research and present findings',
      experienceReward: 90,
      estimatedTime: 320
    }
  ],
  5: [
    {
      title: 'Brand Innovation Project',
      description: 'Develop an innovative brand framework or methodology',
      experienceReward: 150,
      estimatedTime: 400
    },
    {
      title: 'Industry Thought Leadership',
      description: 'Create educational content that advances the branding field',
      experienceReward: 130,
      estimatedTime: 350
    }
  ]
};
