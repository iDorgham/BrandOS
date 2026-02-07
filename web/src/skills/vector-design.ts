import { SkillDefinition } from '../types';

export const VectorDesignSkill: SkillDefinition = {
  id: 'vector-design',
  name: 'Vector Design & Illustration',
  description: 'Master the creation of scalable vector graphics, illustrations, and precise geometric designs',
  category: 'technical' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['vector-design', 'illustration', 'vector-graphics', 'geometric-design', 'scalable-graphics'],
  requirements: ['design-fundamentals', 'digital-art', 'typography'],
  capabilities: [
    'vector-illustration',
    'geometric-design',
    'path-manipulation',
    'gradient-mastery',
    'pattern-creation',
    'icon-design',
    'technical-illustration',
    'vector-animation',
    'precision-design',
    'scalable-graphics'
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

// Vector design principles
export const VectorDesignPrinciples = {
  scalability: {
    description: 'Creating designs that work at any size',
    techniques: [
      'Bezier curve precision',
      'Anchor point optimization',
      'Path simplification',
      'Stroke vs fill decisions',
      'No raster dependencies',
      'Mathematical precision'
    ],
    applications: ['Logos', 'Icons', 'Infographics', 'Technical illustrations'],
    testing: ['Business card to billboard', 'Mobile to desktop', 'Print to web']
  },
  precision: {
    description: 'Achieving mathematical accuracy in design',
    tools: [
      'Grid systems',
      'Smart guides',
      'Snap to point',
      'Numeric input',
      'Align and distribute',
      'Transform panel'
    ],
    applications: ['Technical drawings', 'Architectural illustrations', 'Pattern design'],
    standards: ['Pixel perfection', 'Angle accuracy', 'Spacing consistency']
  },
  efficiency: {
    description: 'Optimizing files for performance and editability',
    techniques: [
      'Path simplification',
      'Compound paths',
      'Clipping masks',
      'Symbol usage',
      'Layer organization',
      'File optimization'
    ],
    benefits: ['Faster rendering', 'Smaller file sizes', 'Easier editing', 'Better collaboration']
  },
  versatility: {
    description: 'Creating adaptable vector assets',
    considerations: [
      'Multiple format exports',
      'Color variation systems',
      'Component-based design',
      'Modular elements',
      'Style consistency',
      'Platform adaptation'
    ]
  }
};

// Vector tools and techniques
export const VectorToolsAndTechniques = {
  pathCreation: {
    penTool: {
      description: 'Master of precision path creation',
      techniques: [
        'Click and drag curves',
        'Corner to smooth transitions',
        'Point manipulation',
        'Path direction control',
        'Closed path creation',
        'Complex shapes'
      ],
      exercises: ['Basic shapes', 'Letter tracing', 'Complex illustrations', 'Logo creation'],
      mastery: ['Speed and accuracy', 'Minimal points', 'Smooth curves', 'Clean intersections']
    },
    shapeTools: {
      description: 'Geometric shape creation and manipulation',
      tools: ['Rectangle', 'Ellipse', 'Polygon', 'Star', 'Line', 'Custom shapes'],
      operations: ['Union', 'Subtract', 'Intersect', 'Exclude', 'Divide'],
      applications: ['Geometric patterns', 'Technical drawings', 'Icon design']
    },
    brushTools: {
      description: 'Artistic vector brush creation and usage',
      types: ['Art brushes', 'Scatter brushes', 'Pattern brushes', 'Bristle brushes'],
      creation: ['Custom brush design', 'Pressure sensitivity', 'Texture integration'],
      applications: ['Organic illustrations', 'Textured effects', 'Hand-drawn styles']
    }
  },
  advancedTechniques: {
    gradientMastery: {
      description: 'Complex gradient creation and application',
      types: ['Linear', 'Radial', 'Mesh gradients', 'Free-form gradients'],
      techniques: [
        'Multiple color stops',
        'Transparency integration',
        'Gradient on stroke',
        'Mesh gradient precision',
        'Color harmony application'
      ],
      applications: ['Realistic illustrations', '3D effects', 'Light simulation', 'Backgrounds']
    },
    meshGradients: {
      description: 'Advanced color blending with mesh gradients',
      concepts: ['Mesh point placement', 'Color blending', 'Warp effects', 'Realistic shading'],
      applications: ['Photorealistic illustrations', 'Product visualization', 'Character rendering'],
      techniques: ['Grid planning', 'Strategic color placement', 'Blending optimization']
    },
    patternCreation: {
      description: 'Seamless pattern design and implementation',
      types: ['Geometric patterns', 'Organic patterns', 'Illustrative patterns', 'Technical patterns'],
      techniques: ['Tile creation', 'Seamless edges', 'Complex repetition', 'Color variations'],
      applications: ['Textile design', 'Backgrounds', 'Packaging', 'Web graphics']
    }
  },
  precisionTechniques: {
    technicalIllustration: {
      description: 'Accurate technical and scientific illustrations',
      applications: ['Diagrams', 'Infographics', 'Instructions', 'Technical documentation'],
      requirements: ['Accuracy', 'Clarity', 'Consistency', 'Professional appearance'],
      elements: ['Dimensions', 'Annotations', 'Cross-sections', 'Exploded views']
    },
    isometricDesign: {
      description: '3D representation in 2D vector format',
      principles: ['30-degree angles', 'Equal scaling', 'No perspective distortion'],
      applications: ['Technical drawings', 'Infographics', 'Icon design', 'Game assets'],
      techniques: ['Grid setup', 'Shape transformation', 'Lighting simulation']
    }
  }
};

// Vector file formats and optimization
export const VectorFileFormats = {
  ai: {
    description: 'Adobe Illustrator native format',
    advantages: ['Full editing capability', 'Layer preservation', 'Effect support', 'Version compatibility'],
    useCases: ['Design work', 'Collaboration', 'Archive', 'Complex illustrations'],
    considerations: ['File size', 'Software dependency', 'Version compatibility']
  },
  eps: {
    description: 'Encapsulated PostScript format',
    advantages: ['Wide compatibility', 'Print readiness', 'Vector preservation', 'Cross-platform'],
    useCases: ['Print production', 'Professional printing', 'Logo distribution'],
    considerations: ['Limited editing', 'Version issues', 'Font embedding']
  },
  svg: {
    description: 'Scalable Vector Graphics for web',
    advantages: ['Web optimization', 'Small file size', 'Browser support', 'Animation capability'],
    useCases: ['Web graphics', 'Icons', 'Interactive graphics', 'Responsive design'],
    optimization: ['Path simplification', 'Code cleanup', 'Compression', 'Browser testing']
  },
  pdf: {
    description: 'Portable Document Format with vector support',
    advantages: ['Universal viewing', 'Print ready', 'Security options', 'Cross-platform'],
    useCases: ['Client presentations', 'Print production', 'Document distribution'],
    considerations: ['Editing limitations', 'Version compatibility', 'Font embedding']
  }
};

// Icon design specialization
export const IconDesign = {
  principles: {
    clarity: {
      description: 'Instant recognition and understanding',
      techniques: ['Simple forms', 'Clear metaphors', 'High contrast', 'Minimal details'],
      testing: ['Small size testing', 'Quick recognition', 'User feedback']
    },
    consistency: {
      description: 'Harmonious design across icon sets',
      elements: ['Visual weight', 'Line weight', 'Corner radius', 'Optical balance', 'Style consistency'],
      systems: ['Grid systems', 'Style guides', 'Optical adjustment', 'Size testing']
    },
    scalability: {
      description: 'Clear representation at all sizes',
      considerations: ['16x16 pixels', '32x32 pixels', '64x64 pixels', 'Larger formats'],
      techniques: ['Detail reduction', 'Contrast adjustment', 'Simplified versions']
    }
  },
  styles: {
    outline: {
      characteristics: ['Line-based design', 'Consistent stroke width', 'Minimal fills'],
      applications: ['UI design', 'Modern interfaces', 'Minimal brands'],
      techniques: ['Stroke optimization', 'Corner radius consistency', 'Endpoint design']
    },
    filled: {
      characteristics: ['Solid shapes', 'Bold appearance', 'High contrast'],
      applications: ['Mobile apps', 'Clear communication', 'Colorful interfaces'],
      techniques: ['Shape optimization', 'Color application', 'Shadow integration']
    },
    glyph: {
      characteristics: ['Monoline design', 'Technical precision', 'Typography integration'],
      applications: ['Technical interfaces', 'Corporate design', 'System icons'],
      techniques: ['Precise curves', 'Consistent proportions', 'Grid alignment']
    },
    illustrated: {
      characteristics: ['Detailed design', 'Artistic expression', 'Brand personality'],
      applications: ['Consumer apps', 'Creative brands', 'Marketing materials'],
      techniques: ['Detail optimization', 'Color harmony', 'Style consistency']
    }
  },
  process: {
    research: ['Use case analysis', 'User expectations', 'Platform conventions', 'Competitive analysis'],
    sketching: ['Thumbnail exploration', 'Metaphor development', 'Style testing', 'Concept refinement'],
    vectorization: ['Precise path creation', 'Consistency checking', 'Size optimization', 'Format preparation'],
    testing: ['Size verification', 'Context testing', 'User feedback', 'Final refinement']
  }
};

// Level progression
export const VectorDesignLevels = {
  1: {
    title: 'Vector Design Novice',
    description: 'Understanding vector basics and tool familiarity',
    requirements: ['Basic design knowledge', 'Tool familiarity'],
    skills: ['Basic vector creation', 'Shape manipulation', 'Simple illustrations'],
    experienceNeeded: 0
  },
  2: {
    title: 'Vector Design Apprentice',
    description: 'Creating precise vector graphics and illustrations',
    requirements: ['Vector projects', 'Technical proficiency'],
    skills: ['Precision design', 'Complex shapes', 'Gradient usage'],
    experienceNeeded: 200
  },
  3: {
    title: 'Vector Design Practitioner',
    description: 'Advanced vector techniques and specialization',
    requirements: ['Complex illustrations', 'Icon design', 'Pattern creation'],
    skills: ['Advanced techniques', 'Specialization', 'File optimization'],
    experienceNeeded: 500
  },
  4: {
    title: 'Vector Design Specialist',
    description: 'Master vector designer with technical expertise',
    requirements: ['Technical illustrations', 'Complex patterns', 'Icon systems'],
    skills: ['Technical expertise', 'System design', 'Innovation'],
    experienceNeeded: 1200
  },
  5: {
    title: 'Vector Design Expert',
    description: 'Industry-leading vector artist and technical innovator',
    requirements: ['Industry recognition', 'Innovative techniques'],
    skills: ['Industry innovation', 'Technical leadership', 'Artistic mastery'],
    experienceNeeded: 2500
  }
};

// Practical exercises
export const VectorDesignExercises = {
  1: [
    {
      title: 'Basic Shapes and Paths',
      description: 'Master basic vector tools and path creation',
      experienceReward: 30,
      estimatedTime: 90
    },
    {
      title: 'Precision Drawing',
      description: 'Create precise geometric designs using guides and grids',
      experienceReward: 25,
      estimatedTime: 120
    }
  ],
  2: [
    {
      title: 'Icon Design Set',
      description: 'Create a cohesive set of 20 icons in a consistent style',
      experienceReward: 45,
      estimatedTime: 180
    },
    {
      title: 'Gradient Masterpiece',
      description: 'Create a complex illustration using advanced gradient techniques',
      experienceReward: 40,
      estimatedTime: 150
    }
  ],
  3: [
    {
      title: 'Seamless Pattern Design',
      description: 'Design 3 different seamless patterns with perfect tiling',
      experienceReward: 60,
      estimatedTime: 200
    },
    {
      title: 'Technical Illustration',
      description: 'Create a detailed technical illustration with annotations',
      experienceReward: 55,
      estimatedTime: 220
    }
  ],
  4: [
    {
      title: 'Icon System Design',
      description: 'Design a complete icon system with multiple weights and styles',
      experienceReward: 80,
      estimatedTime: 250
    },
    {
      title: 'Complex Vector Artwork',
      description: 'Create a complex vector artwork with advanced techniques',
      experienceReward: 75,
      estimatedTime: 280
    }
  ],
  5: [
    {
      title: 'Vector Innovation',
      description: 'Develop new vector techniques or methodologies',
      experienceReward: 125,
      estimatedTime: 350
    },
    {
      title: 'Industry Contribution',
      description: 'Create educational content or tools for vector designers',
      experienceReward: 110,
      estimatedTime: 300
    }
  ]
};
