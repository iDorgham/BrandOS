import { SkillDefinition } from '../types';

export const PromptEngineeringSkill: SkillDefinition = {
  id: 'prompt-engineering',
  name: 'Prompt Engineering',
  description: 'Master the art of crafting effective AI prompts for consistent, high-quality design output',
  category: 'technical' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['ai', 'prompts', 'generation', 'prompt-crafting', 'ai-interaction'],
  requirements: ['design-fundamentals'],
  capabilities: [
    'prompt-crafting',
    'ai-interaction',
    'content-generation',
    'brand-aligned-prompting',
    'iterative-refinement',
    'negative-prompting',
    'parameter-tuning',
    'style-transfer',
    'batch-generation'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 150,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Level progression with AI-specific milestones
export const PromptEngineeringLevels = {
  1: {
    title: 'Prompt Novice',
    description: 'Basic AI interaction and simple prompts',
    requirements: ['Generate first AI image', 'Learn basic prompt structure'],
    skills: ['Simple text descriptions', 'Basic parameter usage'],
    experienceNeeded: 0
  },
  2: {
    title: 'Prompt Apprentice',
    description: 'Structured prompting with basic modifiers',
    requirements: ['Create 20 AI-generated assets', 'Master weighting'],
    skills: ['Weighted keywords', 'Negative prompts', 'Style references'],
    experienceNeeded: 200
  },
  3: {
    title: 'Prompt Practitioner',
    description: 'Brand-aligned prompt creation',
    requirements: ['Generate brand-consistent assets', 'Create prompt templates'],
    skills: ['Brand DNA integration', 'Prompt templates', 'Iterative refinement'],
    experienceNeeded: 500
  },
  4: {
    title: 'Prompt Specialist',
    description: 'Advanced prompting techniques',
    requirements: ['Batch generation workflows', 'Complex scene prompting'],
    skills: ['Complex compositions', 'Batch operations', 'Fine-tuning parameters'],
    experienceNeeded: 1200
  },
  5: {
    title: 'Prompt Expert',
    description: 'Mastery of AI prompting strategies',
    requirements: ['Develop prompt frameworks', 'Train others'],
    skills: ['Prompt architecture', 'Custom models', 'Advanced techniques'],
    experienceNeeded: 2500
  }
};

// Brand-specific prompt templates
export const BrandPromptTemplates = {
  logo: [
    {
      name: 'Minimalist Logo',
      template: 'Create a minimalist logo for {brand_name}, featuring {key_elements} in the style of {style_reference}. Use {color_palette} with clean lines and {vibe} aesthetic. --no text, --style minimal --ar 1:1',
      category: 'logo-design',
      difficulty: 2
    },
    {
      name: 'Brand Logo System',
      template: 'Design a comprehensive logo system for {brand_name} including primary logo, secondary variations, and icon marks. Maintain {brand_values} throughout all variations. Use {color_palette} and {typography_style}. --style corporate --ar 16:9',
      category: 'branding',
      difficulty: 4
    }
  ],
  socialMedia: [
    {
      name: 'Instagram Post',
      template: 'Create an Instagram post for {brand_name} promoting {campaign}. Visual style should reflect {brand_aesthetic} with {color_scheme} colors. Include space for {text_elements} and maintain {visual_hierarchy}. --style {style_preference} --ar 4:5',
      category: 'social-media',
      difficulty: 2
    },
    {
      name: 'Story Series',
      template: 'Design a 3-panel Instagram story series for {brand_name} featuring {product_service}. Each panel should progress through {story_arc} with consistent {brand_elements}. Use {brand_colors} and maintain {engagement_focus}. --style dynamic --ar 9:16',
      category: 'social-media',
      difficulty: 3
    }
  ],
  marketing: [
    {
      name: 'Product Mockup',
      template: 'Create a realistic product mockup of {product} for {brand_name}. Place in {environment} with {lighting_style} lighting. Showcase {key_features} while maintaining {brand_aesthetic}. --style photorealistic --ar 16:9',
      category: 'product-design',
      difficulty: 3
    },
    {
      name: 'Campaign Visuals',
      template: 'Design campaign visuals for {brand_name} {campaign_type}. Create {number_of_assets} variations showcasing {message}. Use {emotional_tone} imagery with {brand_colors} and {composition_style}. --style commercial --ar 16:9',
      category: 'marketing',
      difficulty: 4
    }
  ]
};

// Practical exercises and challenges
export const PromptEngineeringExercises = {
  1: [
    {
      title: 'Basic Prompt Generation',
      description: 'Generate 10 images using simple text descriptions only',
      experienceReward: 30,
      estimatedTime: 45,
      successCriteria: ['All images generated successfully', 'Variety in outputs']
    },
    {
      title: 'Parameter Exploration',
      description: 'Create 5 images experimenting with different parameters (style, aspect ratio, quality)',
      experienceReward: 25,
      estimatedTime: 30,
      successCriteria: ['Demonstrate parameter understanding', 'Show clear differences']
    }
  ],
  2: [
    {
      title: 'Brand Color Integration',
      description: 'Generate 5 images using specific brand color palettes',
      experienceReward: 40,
      estimatedTime: 60,
      successCriteria: ['Consistent brand colors', 'Professional output']
    },
    {
      title: 'Style Consistency',
      description: 'Create a series of 3 images with consistent artistic style',
      experienceReward: 45,
      estimatedTime: 75,
      successCriteria: ['Style consistency across all images', 'Cohesive collection']
    }
  ],
  3: [
    {
      title: 'Template Creation',
      description: 'Create 5 reusable prompt templates for different use cases',
      experienceReward: 60,
      estimatedTime: 90,
      successCriteria: ['Usable templates', 'Clear documentation', 'Brand integration']
    },
    {
      title: 'Negative Prompting',
      description: 'Generate 3 images with effective negative prompting to avoid common issues',
      experienceReward: 50,
      estimatedTime: 60,
      successCriteria: ['Improved output quality', 'Problem avoidance']
    }
  ],
  4: [
    {
      title: 'Batch Generation',
      description: 'Create and execute a batch generation workflow for 20+ variations',
      experienceReward: 80,
      estimatedTime: 120,
      successCriteria: ['Consistent quality', 'Time efficiency', 'Variation management']
    },
    {
      title: 'Complex Scene Prompting',
      description: 'Generate detailed scenes with multiple elements and specific compositions',
      experienceReward: 75,
      estimatedTime: 100,
      successCriteria: ['Complex composition', 'Element integration', 'Visual harmony']
    }
  ],
  5: [
    {
      title: 'Custom Prompt Framework',
      description: 'Design and document a comprehensive prompting framework',
      experienceReward: 120,
      estimatedTime: 180,
      successCriteria: ['Complete framework', 'Documentation', 'Test cases']
    },
    {
      title: 'Mentorship Project',
      description: 'Teach prompt engineering to 3 junior designers and document their progress',
      experienceReward: 100,
      estimatedTime: 240,
      successCriteria: ['Student progress', 'Teaching materials', 'Outcome metrics']
    }
  ]
};

// Advanced techniques and strategies
export const AdvancedPromptingTechniques = {
  iterativeRefinement: {
    description: 'Progressively refine prompts based on output analysis',
    steps: [
      'Generate initial output',
      'Analyze results against goals',
      'Identify specific improvements needed',
      'Modify prompt with precise adjustments',
      'Repeat until desired quality achieved'
    ],
    difficulty: 3
  },
  chainOfThought: {
    description: 'Break complex requests into sequential logical steps',
    example: 'First establish composition, then add lighting, finally apply color treatment',
    difficulty: 4
  },
  crossReference: {
    description: 'Use multiple reference styles and blend them strategically',
    technique: 'Combine elements from different artistic influences while maintaining coherence',
    difficulty: 4
  },
  negativeOptimization: {
    description: 'Strategic use of negative prompts to shape output',
    strategies: [
      'Eliminate common AI artifacts',
      'Avoid unwanted artistic styles',
      'Prevent composition issues',
      'Control element placement'
    ],
    difficulty: 3
  }
};
