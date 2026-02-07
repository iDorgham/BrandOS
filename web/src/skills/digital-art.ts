import { SkillDefinition } from '../types';

export const DigitalArtSkill: SkillDefinition = {
  id: 'digital-art',
  name: 'Digital Art & Illustration',
  description: 'Master the creation of original digital artwork, illustrations, and artistic expressions',
  category: 'creative' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['digital-art', 'illustration', 'drawing', 'painting', 'artistic-expression', 'creative-design'],
  requirements: ['design-fundamentals', 'color-theory', 'typography'],
  capabilities: [
    'digital-drawing',
    'digital-painting',
    'vector-illustration',
    'photo-manipulation',
    'artistic-styles',
    'concept-art',
    'character-design',
    'environment-design',
    'texture-creation',
    'digital-sketching'
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

// Digital art styles and techniques
export const DigitalArtStyles = {
  realism: {
    description: 'Photorealistic digital painting and illustration',
    characteristics: ['High detail', 'Accurate lighting', 'Realistic textures', 'Natural colors'],
    techniques: [
      'Layer-by-layer rendering',
      'Custom brush creation',
      'Color sampling',
      'Reference studies',
      'Texture overlay'
    ],
    tools: ['Procreate', 'Photoshop', 'Krita', 'Corel Painter'],
    applications: ['Portraits', 'Product visualization', 'Concept art', 'Fine art']
  },
  stylized: {
    description: 'Simplified and exaggerated artistic styles',
    characteristics: ['Simplified forms', 'Expressive colors', 'Stylized proportions', 'Artistic interpretation'],
    techniques: [
      'Shape simplification',
      'Exaggerated proportions',
      'Limited color palettes',
      'Bold linework',
      'Stylized shading'
    ],
    tools: ['Procreate', 'Illustrator', 'Clip Studio Paint', 'Affinity Designer'],
    applications: ['Character design', 'Cartoons', 'Brand illustration', 'Children\'s books']
  },
  abstract: {
    description: 'Non-representational artistic expression',
    characteristics: ['Geometric shapes', 'Color expression', 'Emotional focus', 'Experimental techniques'],
    techniques: [
      'Color field painting',
      'Geometric composition',
      'Texture experiments',
      'Digital collage',
      'Generative art'
    ],
    tools: ['Photoshop', 'Processing', 'TouchDesigner', 'Custom scripts'],
    applications: ['Background art', 'Experimental design', 'Artistic expression', 'Pattern design']
  },
  mixedMedia: {
    description: 'Combination of traditional and digital techniques',
    characteristics: ['Texture integration', 'Organic elements', 'Digital enhancement', 'Layer complexity'],
    techniques: [
      'Traditional scanning',
      'Digital overpainting',
      'Texture blending',
      'Photo integration',
      'Mixed layering'
    ],
    tools: ['Photoshop', 'Scanner', 'Procreate', 'Mixed media software'],
    applications: ['Editorial illustration', 'Art journals', 'Experimental art', 'Fine art prints']
  }
};

// Drawing fundamentals progression
export const DrawingFundamentals = {
  lines: {
    description: 'Mastering line quality and control',
    exercises: [
      'Straight line exercises',
      'Curve practice',
      'Pressure sensitivity',
      'Line weight variation',
      'Gesture drawing'
    ],
    tools: ['Digital pen', 'Pressure sensitivity', 'Brush settings'],
    metrics: ['Line consistency', 'Confidence', 'Speed', 'Control']
  },
  shapes: {
    description: 'Understanding and drawing basic forms',
    exercises: [
      'Geometric shapes',
      'Organic shapes',
      'Form construction',
      'Perspective basics',
      'Shape combination'
    ],
    tools: ['Shape tools', 'Selection tools', 'Transform tools'],
    metrics: ['Accuracy', 'Proportion', 'Spatial awareness', 'Construction']
  },
  values: {
    description: 'Mastering light, shadow, and value relationships',
    exercises: [
      'Value scales',
      'Shading techniques',
      'Light studies',
      'Shadow casting',
      'Texture values'
    ],
    tools: ['Gradient tools', 'Blend modes', 'Custom brushes'],
    metrics: ['Value accuracy', 'Lighting consistency', 'Texture rendering', 'Depth']
  },
  colors: {
    description: 'Applying color theory in digital art',
    exercises: [
      'Color mixing',
      'Palette creation',
      'Color harmony',
      'Temperature studies',
      'Emotional coloring'
    ],
    tools: ['Color picker', 'Palette management', 'Color adjustment'],
    metrics: ['Color harmony', 'Emotional impact', 'Consistency', 'Technical accuracy']
  }
};

// Specialization paths
export const DigitalArtSpecializations = {
  characterDesign: {
    description: 'Creating compelling characters and personalities',
    skills: [
      'Anatomy understanding',
      'Expression design',
      'Costume design',
      'Character storytelling',
      'Style consistency'
    ],
    portfolio: ['Character sheets', 'Expression studies', 'Turnarounds', 'Action poses'],
    careerPaths: ['Animation', 'Game design', 'Illustration', 'Comic art']
  },
  environmentDesign: {
    description: 'Creating immersive worlds and settings',
    skills: [
      'Perspective mastery',
      'Architecture knowledge',
      'Natural elements',
      'Atmospheric effects',
      'World-building'
    ],
    portfolio: ['Landscapes', 'Cityscapes', 'Interior scenes', 'Fantasy worlds'],
    careerPaths: ['Game development', 'Film concept art', 'Architectural visualization']
  },
  conceptArt: {
    description: 'Visualizing ideas and concepts for production',
    skills: [
      'Rapid visualization',
      'Iterative design',
      'Technical accuracy',
      'Stylized realism',
      'Production knowledge'
    ],
    portfolio: ['Concept sketches', 'Design iterations', 'Final concepts', 'Technical drawings'],
    careerPaths: ['Film industry', 'Game development', 'Product design', 'Advertising']
  },
  editorialIllustration: {
    description: 'Creating artwork for publications and media',
    skills: [
      'Conceptual thinking',
      'Visual storytelling',
      'Deadline management',
      'Client communication',
      'Style adaptation'
    ],
    portfolio: ['Magazine covers', 'Article illustrations', 'Infographics', 'Brand illustrations'],
    careerPaths: ['Publishing', 'Advertising', 'Corporate design', 'Freelance illustration']
  }
};

// Level progression
export const DigitalArtLevels = {
  1: {
    title: 'Digital Art Novice',
    description: 'Understanding digital tools and basic techniques',
    requirements: ['Tool familiarity', 'Basic drawing skills'],
    skills: ['Tool mastery', 'Basic shapes', 'Simple compositions'],
    experienceNeeded: 0
  },
  2: {
    title: 'Digital Art Apprentice',
    description: 'Creating foundational digital artwork',
    requirements: ['10 digital drawings', 'Style exploration'],
    skills: ['Drawing fundamentals', 'Basic coloring', 'Simple compositions'],
    experienceNeeded: 250
  },
  3: {
    title: 'Digital Art Practitioner',
    description: 'Developing personal style and technique',
    requirements: ['Portfolio development', 'Style consistency'],
    skills: ['Personal style', 'Advanced techniques', 'Complex compositions'],
    experienceNeeded: 600
  },
  4: {
    title: 'Digital Art Specialist',
    description: 'Mastery of specific digital art areas',
    requirements: ['Specialization project', 'Professional quality work'],
    skills: ['Specialized techniques', 'Professional workflow', 'Advanced concepts'],
    experienceNeeded: 1500
  },
  5: {
    title: 'Digital Art Expert',
    description: 'Industry-leading digital artist and innovator',
    requirements: ['Industry recognition', 'Innovative techniques'],
    skills: ['Artistic innovation', 'Industry leadership', 'Advanced methodologies'],
    experienceNeeded: 3000
  }
};

// Practical exercises
export const DigitalArtExercises = {
  1: [
    {
      title: 'Digital Tool Mastery',
      description: 'Complete 20 exercises covering all basic digital tools',
      experienceReward: 35,
      estimatedTime: 90
    },
    {
      title: 'Shape and Form Studies',
      description: 'Create 10 digital studies of basic shapes and forms',
      experienceReward: 30,
      estimatedTime: 120
    }
  ],
  2: [
    {
      title: 'Style Exploration',
      description: 'Create 5 pieces in different digital art styles',
      experienceReward: 45,
      estimatedTime: 180
    },
    {
      title: 'Character Basics',
      description: 'Design and draw 10 basic character concepts',
      experienceReward: 50,
      estimatedTime: 200
    }
  ],
  3: [
    {
      title: 'Themed Series Creation',
      description: 'Create a cohesive series of 5 illustrations',
      experienceReward: 70,
      estimatedTime: 250
    },
    {
      title: 'Environmental Studies',
      description: 'Create 3 detailed environmental pieces',
      experienceReward: 65,
      estimatedTime: 220
    }
  ],
  4: [
    {
      title: 'Professional Portfolio Piece',
      description: 'Create a portfolio-ready illustration with professional quality',
      experienceReward: 90,
      estimatedTime: 300
    },
    {
      title: 'Client Project Simulation',
      description: 'Complete a mock client project with revisions and delivery',
      experienceReward: 85,
      estimatedTime: 280
    }
  ],
  5: [
    {
      title: 'Innovation Project',
      description: 'Develop a new digital art technique or style',
      experienceReward: 150,
      estimatedTime: 400
    },
    {
      title: 'Industry Contribution',
      description: 'Create tutorials or resources for the digital art community',
      experienceReward: 125,
      estimatedTime: 350
    }
  ]
};

// Digital art workflow optimization
export const DigitalArtWorkflow = {
  planning: {
    steps: [
      'Concept development',
      'Reference gathering',
      'Sketch exploration',
      'Composition planning',
      'Color palette selection'
    ],
    tools: ['Mood boards', 'Reference libraries', 'Sketching apps', 'Color tools'],
    timeAllocation: '20% of project time'
  },
  execution: {
    steps: [
      'Base layer creation',
      'Major shapes blocking',
      'Detail development',
      'Refinement and polish',
      'Final adjustments'
    ],
    tools: ['Layer management', 'Custom brushes', 'Selection tools', 'Adjustment layers'],
    timeAllocation: '60% of project time'
  },
  finishing: {
    steps: [
      'Quality assessment',
      'Color correction',
      'Export optimization',
      'Backup and organization',
      'Portfolio preparation'
    ],
    tools: ['Color correction', 'Export presets', 'File management', 'Portfolio platforms'],
    timeAllocation: '20% of project time'
  }
};
