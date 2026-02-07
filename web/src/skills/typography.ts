import { SkillDefinition } from '../types';

export const TypographySkill: SkillDefinition = {
  id: 'typography',
  name: 'Typography & Type Design',
  description: 'Master the art and science of letterforms, font pairing, and expressive typography',
  category: 'creative' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['typography', 'fonts', 'letterforms', 'font-pairing', 'hierarchy', 'type-design'],
  requirements: ['design-fundamentals'],
  capabilities: [
    'font-selection',
    'type-hierarchy',
    'font-pairing',
    'readability-optimization',
    'expressive-typography',
    'custom-lettering',
    'variable-fonts',
    'web-typography',
    'accessibility-typography'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 130,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Typography classification system
export const TypefaceClassifications = {
  serif: {
    description: 'Typefaces with small decorative strokes (serifs) at the ends of letterforms',
    characteristics: ['Traditional', 'Elegant', 'Readable in print', 'Classic feel'],
    categories: {
      oldStyle: ['Garamond', 'Caslon', 'Palatino'],
      transitional: ['Baskerville', 'Times New Roman', 'Georgia'],
      modern: ['Bodoni', 'Didot', 'Fenice'],
      slab: ['Rockwell', 'Clarendon', 'Courier'],
      egyptian: ['Memphis', 'Betty', 'Lubalin Graph']
    },
    bestFor: ['Books', 'Newspapers', 'Traditional branding', 'Editorial design']
  },
  sansSerif: {
    description: 'Typefaces without serifs, clean and modern appearance',
    characteristics: ['Modern', 'Clean', 'Versatile', 'Screen-friendly'],
    categories: {
      grotesque: ['Helvetica', 'Arial', 'Univers'],
      neoGrotesque: ['Roboto', 'Open Sans', 'Inter'],
      geometric: ['Futura', 'Century Gothic', 'Avant Garde'],
      humanist: ['Gill Sans', 'Optima', 'Myriad Pro']
    },
    bestFor: ['Web design', 'Modern branding', 'UI/UX', 'Information design']
  },
  script: {
    description: 'Typefaces that mimic handwriting or calligraphic styles',
    characteristics: ['Personal', 'Elegant', 'Decorative', 'Expressive'],
    categories: {
      formal: ['Zapfino', 'Bickham Script', 'Lobster'],
      casual: ['Comic Sans', 'Kristen ITC', 'Handwriting'],
      brush: ['Pacifico', 'Satisfy', 'Allura'],
      calligraphic: ['Brush Script', 'Edwardian Script', 'Scriptina']
    },
    bestFor: ['Invitations', 'Logos', 'Decorative headings', 'Personal brands']
  },
  display: {
    description: 'Decorative typefaces designed for large sizes and special uses',
    characteristics: ['Expressive', 'Unique', 'Attention-grabbing', 'Theme-specific'],
    categories: {
      decorative: ['Cooper Black', 'Playbill', 'Bebas Neue'],
      grunge: ['Dirtyclassic', 'Nihilist', 'Graffiti'],
      stencil: ['Gunmetal', 'Stencil', 'Viva'],
      retroVintage: ['Bazar', 'Moon', 'Retro']
    },
    bestFor: ['Posters', 'Logos', 'Headlines', 'Event promotion']
  },
  monospaced: {
    description: 'Typefaces where every character occupies the same horizontal space',
    characteristics: ['Technical', 'Consistent', 'Programmatic', 'Clean'],
    categories: {
      technical: ['Courier New', 'Lucida Console', 'Monaco'],
      programming: ['Fira Code', 'JetBrains Mono', 'Source Code Pro'],
      display: ['Space Mono', 'IBM Plex Mono', 'Anonymous Pro']
    },
    bestFor: ['Code', 'Technical documents', 'Forms', 'Tabular data']
  }
};

// Typography hierarchy levels
export const TypographyHierarchy = {
  levels: {
    h1: {
      purpose: 'Main page title or section header',
      characteristics: ['Largest size', 'Highest weight', 'Strongest presence'],
      guidelines: {
        size: '2.5x - 4x base size',
        weight: 'Bold (700+)',
        lineHeight: '1.1 - 1.3',
        letterSpacing: '-0.02em to -0.05em'
      }
    },
    h2: {
      purpose: 'Section subtitles or major subsections',
      characteristics: ['Large size', 'Strong weight', 'Clear hierarchy'],
      guidelines: {
        size: '2x - 2.5x base size',
        weight: 'Semibold (600-700)',
        lineHeight: '1.2 - 1.4',
        letterSpacing: '-0.01em to -0.03em'
      }
    },
    h3: {
      purpose: 'Subsection titles within main sections',
      characteristics: ['Medium-large size', 'Medium weight', 'Clear separation'],
      guidelines: {
        size: '1.5x - 2x base size',
        weight: 'Semibold (600)',
        lineHeight: '1.3 - 1.5',
        letterSpacing: '0em'
      }
    },
    body: {
      purpose: 'Main paragraph text',
      characteristics: ['Comfortable reading size', 'Regular weight', 'Optimal readability'],
      guidelines: {
        size: '1x base size (16-18px)',
        weight: 'Regular (400)',
        lineHeight: '1.5 - 1.8',
        letterSpacing: '0em to 0.01em'
      }
    },
    small: {
      purpose: 'Secondary information, captions, metadata',
      characteristics: ['Smaller size', 'Regular weight', 'Legible but subdued'],
      guidelines: {
        size: '0.875x base size (14px)',
        weight: 'Regular (400)',
        lineHeight: '1.4 - 1.6',
        letterSpacing: '0.01em to 0.02em'
      }
    }
  }
};

// Font pairing strategies
export const FontPairingStrategies = {
  contrast: {
    description: 'Pair typefaces with strong contrast for visual interest',
    principle: 'Opposite characteristics create dynamic tension',
    examples: [
      { heading: 'Playfair Display (Serif)', body: 'Inter (Sans-serif)' },
      { heading: 'Bebas Neue (Display)', body: 'Roboto (Sans-serif)' },
      { heading: 'Futura (Geometric Sans)', body: 'Merriweather (Serif)' }
    ],
    bestFor: ['Modern brands', 'Editorial design', 'Web interfaces']
  },
  concordance: {
    description: 'Use typefaces from the same family or similar classification',
    principle: 'Similar characteristics create harmony',
    examples: [
      { heading: 'Roboto Bold', body: 'Roboto Regular' },
      { heading: 'Open Sans Bold', body: 'Open Sans Light' },
      { heading: 'Montserrat Bold', body: 'Montserrat Regular' }
    ],
    bestFor: ['Corporate design', 'Minimalist brands', 'Consistent systems']
  },
  conflictAvoidance: {
    description: 'Avoid pairing typefaces that compete for attention',
    principle: 'Ensure clear distinction and harmony',
    avoid: [
      'Two decorative display fonts',
      'Similar sans-serif faces',
      'Overly ornate combinations',
      'Similar x-heights and weights'
    ]
  }
};

// Level progression
export const TypographyLevels = {
  1: {
    title: 'Typography Novice',
    description: 'Understanding basic typographic concepts',
    requirements: ['Learn typeface classifications', 'Basic hierarchy knowledge'],
    skills: ['Font identification', 'Basic hierarchy', 'Readability basics'],
    experienceNeeded: 0
  },
  2: {
    title: 'Typography Apprentice',
    description: 'Effective font pairing and hierarchy',
    requirements: ['Create 5 font pairings', 'Establish readable hierarchies'],
    skills: ['Font pairing', 'Hierarchy creation', 'Readability optimization'],
    experienceNeeded: 200
  },
  3: {
    title: 'Typography Practitioner',
    description: 'Advanced typography systems and web typography',
    requirements: ['Typography systems', 'Web font optimization', 'Accessibility'],
    skills: ['Typography systems', 'Web typography', 'Accessibility compliance'],
    experienceNeeded: 500
  },
  4: {
    title: 'Typography Specialist',
    description: 'Custom typography and expressive design',
    requirements: ['Custom lettering', 'Variable fonts', 'Advanced hierarchy'],
    skills: ['Custom lettering', 'Variable fonts', 'Experimental typography'],
    experienceNeeded: 1200
  },
  5: {
    title: 'Typography Expert',
    description: 'Master typographer and type consultant',
    requirements: ['Type design projects', 'Typography frameworks', 'Innovation'],
    skills: ['Type design', 'Typography strategy', 'System architecture'],
    experienceNeeded: 2500
  }
};

// Practical exercises
export const TypographyExercises = {
  1: [
    {
      title: 'Typeface Classification',
      description: 'Categorize 20 different fonts into their proper classifications',
      experienceReward: 30,
      estimatedTime: 60
    },
    {
      title: 'Basic Hierarchy Creation',
      description: 'Create a typographic hierarchy system for a simple website',
      experienceReward: 35,
      estimatedTime: 90
    }
  ],
  2: [
    {
      title: 'Font Pairing Challenge',
      description: 'Create 10 successful font pairings with justification',
      experienceReward: 45,
      estimatedTime: 120
    },
    {
      title: 'Readability Optimization',
      description: 'Optimize typography for readability across different contexts',
      experienceReward: 40,
      estimatedTime: 100
    }
  ],
  3: [
    {
      title: 'Typography System Design',
      description: 'Design a complete typography system for a multi-platform brand',
      experienceReward: 60,
      estimatedTime: 180
    },
    {
      title: 'Web Typography Optimization',
      description: 'Optimize web typography for performance and accessibility',
      experienceReward: 55,
      estimatedTime: 150
    }
  ],
  4: [
    {
      title: 'Custom Lettering Project',
      description: 'Create custom lettering for a logo or headline',
      experienceReward: 75,
      estimatedTime: 200
    },
    {
      title: 'Variable Font Implementation',
      description: 'Implement variable fonts in an interactive web project',
      experienceReward: 70,
      estimatedTime: 180
    }
  ],
  5: [
    {
      title: 'Type Design Innovation',
      description: 'Design and create a custom typeface',
      experienceReward: 120,
      estimatedTime: 300
    },
    {
      title: 'Typography Framework',
      description: 'Develop a comprehensive typography framework for designers',
      experienceReward: 100,
      estimatedTime: 250
    }
  ]
};

// Web typography best practices
export const WebTypographyGuidelines = {
  performance: {
    fontLoading: ['WOFF2 format', 'Font display: swap', 'Subset fonts'],
    optimization: ['Variable fonts', 'Icon fonts vs SVG', 'Critical font inlining'],
    fallbacks: ['System font stacks', 'Graceful degradation', 'Loading states']
  },
  accessibility: {
    contrast: ['WCAG AA compliance (4.5:1)', 'AAA preference (7:1)', 'Color independence'],
    sizing: ['Responsive units (rem/em)', 'Minimum 16px base', 'Zoom compatibility'],
    readability: ['Line height 1.5+', 'Letter spacing optimization', 'Paragraph spacing']
  },
  responsive: {
    breakpoints: ['Mobile-first approach', 'Fluid typography', 'Container queries'],
    scaling: ['Modular scale', 'Viewport units', 'Clamp functions'],
    optimization: ['Touch targets', 'Reading comfort', 'Contextual sizing']
  }
};
