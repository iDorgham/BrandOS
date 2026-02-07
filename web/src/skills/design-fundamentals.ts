import { SkillDefinition } from '../types';

export const DesignFundamentalsSkill: SkillDefinition = {
  id: 'design-fundamentals',
  name: 'Design Fundamentals',
  description: 'Master the core principles of visual design including balance, contrast, hierarchy, and composition',
  category: 'creative' as any,
  level: 'beginner' as any,
  status: 'active' as any,
  tags: ['design', 'fundamentals', 'visual-design', 'composition'],
  requirements: [],
  capabilities: [
    'visual-hierarchy',
    'color-balance',
    'typography-basics',
    'layout-composition',
    'grid-systems',
    'white-space-management'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 100,
    learningCurve: 'linear' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Level progression definitions
export const DesignFundamentalsLevels = {
  1: {
    title: 'Design Novice',
    description: 'Understanding basic visual concepts',
    requirements: ['Complete basic design theory course'],
    skills: ['Identify basic shapes', 'Understand contrast', 'Basic color recognition'],
    experienceNeeded: 0
  },
  2: {
    title: 'Design Apprentice',
    description: 'Applying fundamental principles',
    requirements: ['Create 5 basic compositions', 'Pass color theory quiz'],
    skills: ['Basic layout creation', 'Color harmony application', 'Simple typography'],
    experienceNeeded: 150
  },
  3: {
    title: 'Design Practitioner',
    description: 'Consistent application of design principles',
    requirements: ['Create 10 portfolio pieces', 'Master grid systems'],
    skills: ['Advanced composition', 'Typography pairing', 'Layout optimization'],
    experienceNeeded: 300
  },
  4: {
    title: 'Design Specialist',
    description: 'Expert application of fundamentals',
    requirements: ['Client work portfolio', 'Design system contribution'],
    skills: ['Complex layouts', 'Brand consistency', 'Design systems'],
    experienceNeeded: 600
  },
  5: {
    title: 'Design Expert',
    description: 'Mastery of design fundamentals',
    requirements: ['Lead design projects', 'Mentor junior designers'],
    skills: ['Creative direction', 'Design strategy', 'Advanced composition'],
    experienceNeeded: 1000
  }
};

// Practical exercises for each level
export const DesignFundamentalsExercises = {
  1: [
    {
      title: 'Shape Studies',
      description: 'Create 10 compositions using only basic shapes',
      experienceReward: 25,
      estimatedTime: 30
    },
    {
      title: 'Color Exploration',
      description: 'Create 5 color palettes with different moods',
      experienceReward: 20,
      estimatedTime: 45
    }
  ],
  2: [
    {
      title: 'Typography Basics',
      description: 'Create 3 text-focused layouts with proper hierarchy',
      experienceReward: 35,
      estimatedTime: 60
    },
    {
      title: 'Grid Layout',
      description: 'Design 6 layouts using different grid systems',
      experienceReward: 40,
      estimatedTime: 90
    }
  ],
  3: [
    {
      title: 'Brand Application',
      description: 'Apply brand guidelines to 5 different mediums',
      experienceReward: 50,
      estimatedTime: 120
    },
    {
      title: 'Responsive Design',
      description: 'Create 3 designs for different screen sizes',
      experienceReward: 45,
      estimatedTime: 100
    }
  ],
  4: [
    {
      title: 'Design System',
      description: 'Create a mini design system with components',
      experienceReward: 75,
      estimatedTime: 180
    },
    {
      title: 'Client Project',
      description: 'Complete a real client design project',
      experienceReward: 100,
      estimatedTime: 300
    }
  ],
  5: [
    {
      title: 'Design Direction',
      description: 'Lead a design team project from concept to completion',
      experienceReward: 150,
      estimatedTime: 400
    },
    {
      title: 'Design Workshop',
      description: 'Create and conduct a design training workshop',
      experienceReward: 125,
      estimatedTime: 250
    }
  ]
};
