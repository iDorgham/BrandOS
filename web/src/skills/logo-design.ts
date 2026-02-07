import { SkillDefinition } from '../types';

export const LogoDesignSkill: SkillDefinition = {
  id: 'logo-design',
  name: 'Logo Design & Identity',
  description: 'Master the art and science of creating memorable, effective logos that capture brand essence',
  category: 'creative' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['logo-design', 'brand-identity', 'visual-mark', 'symbol-design', 'brand-mark'],
  requirements: ['design-fundamentals', 'color-theory', 'typography'],
  capabilities: [
    'conceptual-development',
    'logo-sketching',
    'digital-refinement',
    'typography-integration',
    'symbol-design',
    'logo-systems',
    'adaptation-design',
    'logo-animation',
    'logo-presentation',
    'brand-expression'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 135,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Logo design principles and theory
export const LogoDesignPrinciples = {
  memorability: {
    description: 'Creating logos that are easily remembered and recognized',
    techniques: [
      'Simplicity over complexity',
      'Unique visual hooks',
      'Emotional connection',
      'Cognitive patterns',
      'Cultural relevance',
      'Pattern interruption'
    ],
    examples: ['Apple (simplicity)', 'Nike (dynamic movement)', 'McDonald\'s (arches)', 'Twitter (bird)'],
    metrics: ['Instant recognition', 'Memory recall', 'Sketch reproduction']
  },
  simplicity: {
    description: 'Maximum impact with minimum elements',
    guidelines: [
      'Use essential shapes only',
      'Limit color palette',
      'Avoid complex details',
      'Focus on core message',
      'Ensure scalability',
      'Test in small sizes'
    ],
    benefits: ['Scalability', 'Versatility', 'Memorability', 'Timelessness', 'Application flexibility']
  },
  versatility: {
    description: 'Logo must work across all media and contexts',
    testConditions: [
      'Black and white reproduction',
      'Small size (1 inch)',
      'Large scale (billboard)',
      'Various backgrounds',
      'Digital and print',
      'Different materials'
    ],
    considerations: ['Reverse applications', 'Color variations', 'Size adaptations', 'Context relevance']
  },
  timelessness: {
    description: 'Avoiding trends for lasting relevance',
    strategies: [
      'Focus on brand essence',
      'Avoid trendy effects',
      'Use classic proportions',
      'Consider future growth',
      'Maintain cultural neutrality',
      'Test for longevity'
    ],
    examples: ['Coca-Cola (script)', 'IBM (geometric)', 'Mercedes (symbol)', 'Ford (typography)']
  },
  appropriateness: {
    description: 'Logo must reflect brand industry and values',
    considerations: [
      'Industry context',
      'Target audience',
      'Brand personality',
      'Cultural sensitivity',
      'Geographic relevance',
      'Future applications'
    ],
    balance: ['Professional vs creative', 'Traditional vs modern', 'Serious vs approachable']
  }
};

// Logo types and classifications
export const LogoTypes = {
  wordmarks: {
    description: 'Typography-based logos using the company name',
    characteristics: ['Focus on typography', 'Custom lettering', 'Name recognition', 'Elegance'],
    considerations: ['Name length', 'Pronunciation', 'Readability', 'Distinctiveness'],
    examples: ['Google', 'Coca-Cola', 'Sony', 'Disney', 'Facebook'],
    bestFor: ['Unique names', 'Established brands', 'Service companies', 'Luxury brands'],
    designProcess: ['Font selection', 'Letter customization', 'Kerning adjustment', 'Weight optimization']
  },
  lettermarks: {
    description: 'Logos using initials or abbreviations',
    characteristics: ['Concise representation', 'Monogram design', 'Space efficiency', 'Professional appeal'],
    considerations: ['Initial recognition', 'Memorability', 'Legal uniqueness', 'Expansion potential'],
    examples: ['IBM', 'NASA', 'HP', 'HBO', 'CNN'],
    bestFor: ['Long company names', 'Professional services', 'Established institutions', 'Global brands'],
    designProcess: ['Initial selection', 'Monogram creation', 'Balance optimization', 'Integration design']
  },
  brandmarks: {
    description: 'Symbol-based logos without text',
    characteristics: ['Visual symbolism', 'Universal appeal', 'Iconic potential', 'Simplicity'],
    considerations: ['Meaning clarity', 'Cultural interpretation', 'Memorability', 'Uniqueness'],
    examples: ['Apple', 'Nike (swoosh)', 'Target', 'Twitter (bird)', 'Mercedes'],
    bestFor: ['Global brands', 'Visual products', 'Iconic status', 'Brand recognition'],
    designProcess: ['Concept development', 'Symbol research', 'Form refinement', 'Meaning testing']
  },
  combinationMarks: {
    description: 'Combination of wordmark and symbol',
    characteristics: ['Brand flexibility', 'Dual recognition', 'Versatile applications', 'Complete identity'],
    variations: ['Integrated', 'Side-by-side', 'Stacked', 'Emblem style'],
    examples: ['Adidas', 'Pizza Hut', 'Burger King', 'Pringles', 'Starbucks'],
    bestFor: ['Most businesses', 'Brand growth', 'Versatile needs', 'Complete identity'],
    designProcess: ['Symbol creation', 'Typography design', 'Integration planning', 'Variation development']
  },
  emblems: {
    description: 'Text contained within a symbol or border',
    characteristics: ['Traditional feel', 'Official appearance', 'Integrated design', 'Compact format'],
    considerations: ['Scalability', 'Detail complexity', 'Modern adaptation', 'Flexibility'],
    examples: ['Harley-Davidson', 'Starbucks (original)', 'Harvard University', 'NFL'],
    bestFor: ['Traditional institutions', 'Organizations', 'Premium brands', 'Official entities'],
    designProcess: ['Frame design', 'Text integration', 'Symbol development', 'Balance optimization']
  },
  dynamicMarks: {
    description: 'Logos with variations or animated elements',
    characteristics: ['Adaptive design', 'Interactive elements', 'Modern appeal', 'Engagement potential'],
    variations: ['Color changes', 'Form adaptations', 'Animated versions', 'Context variations'],
    examples: ['MTV', 'Google (doodles)', 'AOL (historical)', 'NBC (peacock)'],
    bestFor: ['Digital brands', 'Entertainment', 'Modern companies', 'Interactive applications'],
    designProcess: ['Base design', 'Variation planning', 'Animation development', 'Implementation guidelines']
  }
};

// Logo design process workflow
export const LogoDesignProcess = {
  discovery: {
    objective: 'Understanding brand, market, and requirements',
    activities: [
      'Client interview and brief',
      'Market research',
      'Competitor analysis',
      'Target audience study',
      'Brand values clarification',
      'Application requirements',
      'Constraint identification'
    ],
    deliverables: ['Creative brief', 'Research findings', 'Mood board', 'Direction strategy'],
    duration: '1-2 weeks'
  },
  conceptualization: {
    objective: 'Generating and exploring design concepts',
    activities: [
      'Mind mapping and word association',
      'Thumbnail sketching (50-100 concepts)',
      'Symbol research and inspiration',
      'Typography exploration',
      'Concept refinement (10-20 concepts)',
      'Initial digital sketches',
      'Color direction exploration'
    ],
    deliverables: ['Concept boards', 'Sketch pages', 'Initial directions'],
    duration: '1-2 weeks'
  },
  design: {
    objective: 'Developing and refining selected concepts',
    activities: [
      'Digital vector creation',
      'Typography refinement',
      'Color palette development',
      'Variation exploration',
      'Application testing',
      'Feedback integration',
      'Detail optimization'
    ],
    deliverables: ['Logo variations', 'Color studies', 'Application mockups'],
    duration: '2-3 weeks'
  },
  presentation: {
    objective: 'Presenting and justifying design decisions',
    activities: [
      'Final design refinement',
      'Presentation preparation',
      'Mockup creation',
      'Guideline documentation',
      'Client presentation',
      'Feedback collection',
      'Revision planning'
    ],
    deliverables: ['Presentation boards', 'Guideline draft', 'Final designs'],
    duration: '1 week'
  },
  finalization: {
    objective: 'Delivering final assets and documentation',
    activities: [
      'Final revisions',
      'File preparation',
      'Guideline completion',
      'Asset organization',
      'Delivery package creation',
      'Client training',
      'Follow-up support'
    ],
    deliverables: ['Complete asset package', 'Brand guidelines', 'Usage documentation'],
    duration: '1 week'
  }
};

// Technical specifications and file preparation
export const LogoTechnicalSpecifications = {
  fileFormats: {
    vector: {
      formats: ['AI (Illustrator)', 'EPS', 'SVG', 'PDF'],
      characteristics: ['Scalable', 'Editable', 'Print-ready', 'Web-compatible'],
      usage: ['Print production', 'Large scale', 'Professional design'],
      specifications: ['CMYK for print', 'RGB for web', 'Outlines converted', 'Embedded fonts']
    },
    raster: {
      formats: ['PNG', 'JPG', 'TIFF', 'GIF'],
      characteristics: ['Fixed resolution', 'Compression', 'Web optimization', 'Compatibility'],
      usage: ['Web applications', 'Digital presentations', 'Office documents'],
      specifications: ['Multiple resolutions', 'Transparent backgrounds', 'Optimized compression']
    }
  },
  colorSpecifications: {
    print: {
      systems: ['CMYK', 'Pantone Matching System', 'Spot colors'],
      considerations: ['Color accuracy', 'Printing method', 'Material compatibility', 'Cost optimization'],
      deliverables: ['CMYK values', 'Pantone numbers', 'Color breakdowns', 'Print separations']
    },
    digital: {
      systems: ['RGB', 'HEX', 'Web-safe colors'],
      considerations: ['Screen consistency', 'Brand colors', 'Accessibility compliance', 'Performance'],
      deliverables: ['HEX codes', 'RGB values', 'Web color palettes', 'Accessibility data']
    },
    mono: {
      variations: ['Black on white', 'White on black', 'Single color', 'Grayscale versions'],
      applications: ['Fax documents', 'Single-color printing', 'Embossing', 'Special applications'],
      considerations: ['Readability', 'Impact', 'Application versatility']
    }
  },
  usageGuidelines: {
    clearSpace: {
      principle: 'Maintaining breathing room around the logo',
      calculation: ['Height/width based', 'Fixed measurement', 'Proportional spacing'],
      applications: ['Print design', 'Web layout', 'Environmental design'],
      enforcement: ['Template rules', 'Design guides', 'Review processes']
    },
    minimumSize: {
      principle: 'Ensuring legibility at small sizes',
      specifications: ['Print minimum', 'Digital minimum', 'Application-specific'],
      testing: ['Production testing', 'Screen testing', 'Application review'],
      alternatives: ['Simplified versions', 'Symbol-only versions', 'Abbreviated forms']
    }
  }
};

// Level progression
export const LogoDesignLevels = {
  1: {
    title: 'Logo Design Novice',
    description: 'Understanding logo design fundamentals',
    requirements: ['Design basics', 'Typography knowledge'],
    skills: ['Basic logo concepts', 'Simple typography', 'Sketching skills'],
    experienceNeeded: 0
  },
  2: {
    title: 'Logo Design Apprentice',
    description: 'Creating effective logos for small businesses',
    requirements: ['Logo projects', 'Portfolio development'],
    skills: ['Logo creation', 'Typography integration', 'Color application'],
    experienceNeeded: 200
  },
  3: {
    title: 'Logo Design Practitioner',
    description: 'Developing comprehensive logo systems',
    requirements: ['Brand identity projects', 'Logo systems experience'],
    skills: ['Logo systems', 'Brand integration', 'Complex typography'],
    experienceNeeded: 500
  },
  4: {
    title: 'Logo Design Specialist',
    description: 'Advanced logo design and brand identity',
    requirements: ['Major brand projects', 'Logo innovation'],
    skills: ['Advanced concepts', 'Brand strategy', 'Logo animation'],
    experienceNeeded: 1200
  },
  5: {
    title: 'Logo Design Expert',
    description: 'Master logo designer and brand identity consultant',
    requirements: ['Industry recognition', 'Iconic logo work'],
    skills: ['Design innovation', 'Brand consulting', 'Industry leadership'],
    experienceNeeded: 2500
  }
};

// Practical exercises
export const LogoDesignExercises = {
  1: [
    {
      title: 'Logo Type Study',
      description: 'Analyze and replicate 10 different logo types',
      experienceReward: 30,
      estimatedTime: 120
    },
    {
      title: 'Wordmark Creation',
      description: 'Create 5 wordmark logos using only typography',
      experienceReward: 35,
      estimatedTime: 150
    }
  ],
  2: [
    {
      title: 'Brand Identity Project',
      description: 'Create a complete logo system for a startup',
      experienceReward: 50,
      estimatedTime: 200
    },
    {
      title: 'Logo Redesign',
      description: 'Redesign an existing logo with modern principles',
      experienceReward: 45,
      estimatedTime: 180
    }
  ],
  3: [
    {
      title: 'Logo System Development',
      description: 'Create a comprehensive logo system with variations',
      experienceReward: 70,
      estimatedTime: 250
    },
    {
      title: 'Animated Logo',
      description: 'Design and animate a logo for digital use',
      experienceReward: 65,
      estimatedTime: 220
    }
  ],
  4: [
    {
      title: 'Corporate Brand Identity',
      description: 'Design a logo system for a large corporation',
      experienceReward: 90,
      estimatedTime: 300
    },
    {
      title: 'Logo Innovation Project',
      description: 'Create an innovative logo concept with unique methodology',
      experienceReward: 85,
      estimatedTime: 280
    }
  ],
  5: [
    {
      title: 'Iconic Logo Design',
      description: 'Design a potential iconic logo that could become timeless',
      experienceReward: 140,
      estimatedTime: 350
    },
    {
      title: 'Logo Framework Development',
      description: 'Create a comprehensive logo design framework or methodology',
      experienceReward: 120,
      estimatedTime: 300
    }
  ]
};
