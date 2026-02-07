import { SkillDefinition } from '../types';

export const ColorTheorySkill: SkillDefinition = {
  id: 'color-theory',
  name: 'Color Theory & Application',
  description: 'Master the psychology, harmony, and strategic application of color in design',
  category: 'creative' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['color', 'theory', 'psychology', 'harmony', 'palette-design', 'brand-colors'],
  requirements: ['design-fundamentals'],
  capabilities: [
    'color-psychology',
    'palette-creation',
    'color-harmony',
    'accessibility-compliance',
    'brand-color-systems',
    'color-mood-mapping',
    'gradient-design',
    'color-trend-analysis'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 120,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Color psychology mapping
export const ColorPsychology = {
  red: {
    emotions: ['passion', 'energy', 'urgency', 'excitement', 'love', 'anger'],
    industries: ['food', 'entertainment', 'automotive', 'sports'],
    useCases: ['call-to-action buttons', 'warning signs', 'sale announcements'],
    brands: ['Coca-Cola', 'Netflix', 'Red Bull']
  },
  blue: {
    emotions: ['trust', 'calm', 'professional', 'secure', 'reliable', 'peaceful'],
    industries: ['technology', 'finance', 'healthcare', 'corporate'],
    useCases: ['corporate branding', 'financial services', 'healthcare'],
    brands: ['Facebook', 'IBM', 'Ford']
  },
  green: {
    emotions: ['growth', 'nature', 'health', 'wealth', 'harmony', 'freshness'],
    industries: ['environmental', 'health', 'finance', 'organic products'],
    useCases: ['eco-friendly products', 'health services', 'financial growth'],
    brands: ['Starbucks', 'Whole Foods', 'John Deere']
  },
  yellow: {
    emotions: ['happiness', 'optimism', 'warmth', 'creativity', 'attention'],
    industries: ['food', 'entertainment', 'energy', 'children products'],
    useCases: ['highlighting important elements', 'youth-oriented brands'],
    brands: ['McDonald\'s', 'IKEA', 'Snapchat']
  },
  purple: {
    emotions: ['luxury', 'creativity', 'wisdom', 'royalty', 'mystery'],
    industries: ['fashion', 'beauty', 'luxury', 'creative services'],
    useCases: ['premium products', 'creative agencies', 'beauty brands'],
    brands: ['Cadbury', 'Hallmark', 'Twitch']
  },
  orange: {
    emotions: ['enthusiasm', 'energy', 'warmth', 'confidence', 'fun'],
    industries: ['food', 'entertainment', 'sports', 'creative'],
    useCases: ['calls to action', 'youth markets', 'energy drinks'],
    brands: ['Nickelodeon', 'Fanta', 'Home Depot']
  },
  black: {
    emotions: ['luxury', 'sophistication', 'power', 'elegance', 'authority'],
    industries: ['luxury', 'fashion', 'technology', 'automotive'],
    useCases: ['premium positioning', 'minimalist design', 'luxury goods'],
    brands: ['Apple', 'Chanel', 'Nike']
  },
  white: {
    emotions: ['purity', 'simplicity', 'cleanliness', 'minimalism', 'clarity'],
    industries: ['healthcare', 'technology', 'minimalist brands'],
    useCases: ['minimalist design', 'healthcare', 'tech products'],
    brands: ['Apple', ' Wikipedia', 'Adidas']
  }
};

// Color harmony systems
export const ColorHarmonies = {
  monochromatic: {
    description: 'Different shades and tints of a single color',
    formula: 'Base color + variations in lightness/saturation',
    useCase: 'Sophisticated, unified design systems',
    example: '#3498db, #2980b9, #5dade2, #85c1e9'
  },
  analogous: {
    description: 'Colors adjacent on the color wheel',
    formula: 'Base color + 2-3 neighboring colors',
    useCase: 'Harmonious, comfortable designs',
    example: '#3498db, #2ecc71, #e74c3c'
  },
  complementary: {
    description: 'Colors opposite on the color wheel',
    formula: 'Base color + direct opposite',
    useCase: 'High contrast, attention-grabbing designs',
    example: '#3498db, #e74c3c'
  },
  splitComplementary: {
    description: 'Base color + two colors adjacent to its complement',
    formula: 'Base color + complement ± 1 position',
    useCase: 'Strong contrast with less tension',
    example: '#3498db, #e74c3c, #f39c12'
  },
  triadic: {
    description: 'Three colors equally spaced on color wheel',
    formula: 'Base color + colors at ±120°',
    useCase: 'Balanced, vibrant color schemes',
    example: '#3498db, #e74c3c, #f1c40f'
  },
  tetradic: {
    description: 'Four colors in two complementary pairs',
    formula: 'Two complementary pairs',
    useCase: 'Rich, complex color schemes',
    example: '#3498db, #e74c3c, #2ecc71, #f39c12'
  }
};

// Level progression
export const ColorTheoryLevels = {
  1: {
    title: 'Color Novice',
    description: 'Understanding basic color concepts',
    requirements: ['Learn primary/secondary colors', 'Basic color wheel knowledge'],
    skills: ['Color identification', 'Basic harmonies', 'Emotional associations'],
    experienceNeeded: 0
  },
  2: {
    title: 'Color Apprentice',
    description: 'Creating effective color combinations',
    requirements: ['Create 10 color palettes', 'Understand color psychology'],
    skills: ['Palette creation', 'Harmony application', 'Mood matching'],
    experienceNeeded: 180
  },
  3: {
    title: 'Color Practitioner',
    description: 'Strategic color application in branding',
    requirements: ['Brand color systems', 'Accessibility compliance'],
    skills: ['Brand palettes', 'Accessibility', 'Color systems'],
    experienceNeeded: 450
  },
  4: {
    title: 'Color Specialist',
    description: 'Advanced color theory and trend integration',
    requirements: ['Trend forecasting', 'Complex harmonies', 'Cultural considerations'],
    skills: ['Trend analysis', 'Cultural color meaning', 'Advanced systems'],
    experienceNeeded: 1000
  },
  5: {
    title: 'Color Expert',
    description: 'Master color strategist and consultant',
    requirements: ['Lead color strategy', 'Develop color frameworks'],
    skills: ['Color strategy', 'Framework development', 'Innovation'],
    experienceNeeded: 2000
  }
};

// Practical exercises
export const ColorTheoryExercises = {
  1: [
    {
      title: 'Color Wheel Creation',
      description: 'Create a detailed color wheel with all primary, secondary, and tertiary colors',
      experienceReward: 25,
      estimatedTime: 60
    },
    {
      title: 'Emotion-Color Matching',
      description: 'Match 10 emotions with appropriate colors and justify choices',
      experienceReward: 30,
      estimatedTime: 45
    }
  ],
  2: [
    {
      title: 'Harmony Exploration',
      description: 'Create 5 different harmony schemes for the same brand concept',
      experienceReward: 40,
      estimatedTime: 90
    },
    {
      title: 'Brand Color Palette',
      description: 'Develop a complete color palette for a fictional brand',
      experienceReward: 45,
      estimatedTime: 120
    }
  ],
  3: [
    {
      title: 'Accessibility Audit',
      description: 'Audit and fix color contrast issues in 3 existing designs',
      experienceReward: 50,
      estimatedTime: 100
    },
    {
      title: 'Cultural Color Research',
      description: 'Research color meanings in 3 different cultures and create adapted palettes',
      experienceReward: 55,
      estimatedTime: 120
    }
  ],
  4: [
    {
      title: 'Trend Forecasting',
      description: 'Research and predict color trends for the next 2 years',
      experienceReward: 75,
      estimatedTime: 180
    },
    {
      title: 'Color System Design',
      description: 'Create a comprehensive color system for a multi-platform brand',
      experienceReward: 80,
      estimatedTime: 200
    }
  ],
  5: [
    {
      title: 'Color Innovation',
      description: 'Develop a new color harmony system or methodology',
      experienceReward: 120,
      estimatedTime: 240
    },
    {
      title: 'Color Strategy Project',
      description: 'Lead a complete color strategy rebrand for an organization',
      experienceReward: 150,
      estimatedTime: 300
    }
  ]
};

// Brand color system template
export const BrandColorSystemTemplate = {
  primary: {
    description: 'Main brand colors used most frequently',
    colors: ['Primary', 'Primary Light', 'Primary Dark'],
    usage: ['Logos', 'Header elements', 'CTA buttons', 'Brand highlights']
  },
  secondary: {
    description: 'Supporting colors that complement the palette',
    colors: ['Secondary', 'Secondary Light', 'Secondary Dark'],
    usage: ['Supporting elements', 'Backgrounds', 'Illustrations']
  },
  neutral: {
    description: 'Grayscale palette for text and backgrounds',
    colors: ['White', 'Light Gray', 'Medium Gray', 'Dark Gray', 'Black'],
    usage: ['Text', 'Backgrounds', 'Borders', 'Shadows']
  },
  semantic: {
    description: 'Colors with specific meanings',
    colors: ['Success', 'Warning', 'Error', 'Info'],
    usage: ['Status messages', 'Notifications', 'Validation states']
  },
  accessibility: {
    description: 'Accessibility-compliant ratios for each color combination',
    requirements: ['WCAG AA compliance minimum', 'AAA compliance preferred'],
    testing: ['Contrast ratios tested', 'Color blindness considerations']
  }
};
