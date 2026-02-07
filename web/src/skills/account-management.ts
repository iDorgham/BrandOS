import { SkillDefinition } from '../types';

export const AccountManagementSkill: SkillDefinition = {
  id: 'account-management',
  name: 'Account Management',
  description: 'Master the art of client relationship management, strategic planning, and business development for creative agencies.',
  category: 'collaborative' as any,
  level: 'advanced' as any,
  status: 'active' as any,
  tags: ['account-management', 'client-relationships', 'business-development', 'agency-growth'],
  requirements: ['branding', 'social-media', 'brand-guidelines'],
  capabilities: [
    'client-relationship-management',
    'strategic-account-planning',
    'business-development',
    'revenue-growth',
    'client-retention',
    'upselling-cross-selling',
    'account-strategy',
    'client-communication',
    'conflict-resolution'
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

export const AccountManagementLevels = {
  1: {
    title: 'Account Management Novice',
    description: 'Understanding basic client management principles',
    requirements: ['Client communication basics', 'Account tracking'],
    skills: ['Client communication', 'Basic account planning', 'Service delivery'],
    experienceNeeded: 0
  },
  2: {
    title: 'Account Management Apprentice',
    description: 'Managing smaller client accounts effectively',
    requirements: ['10 client meetings', 'Basic account planning'],
    skills: ['Account planning', 'Client needs assessment', 'Service delivery coordination'],
    experienceNeeded: 300
  },
  3: {
    title: 'Account Management Practitioner',
    description: 'Strategic account management and growth',
    requirements: ['Strategic account plans', 'Revenue growth tracking'],
    skills: ['Strategic planning', 'Revenue growth', 'Client relationship building'],
    experienceNeeded: 800
  },
  4: {
    title: 'Account Management Specialist',
    description: 'Complex multi-stakeholder account management',
    requirements: ['Major account experience', 'Multi-stakeholder management'],
    skills: ['Complex account management', 'Stakeholder alignment', 'Strategic consulting'],
    experienceNeeded: 2000
  },
  5: {
    title: 'Account Management Expert',
    description: 'Master account manager and business developer',
    requirements: ['Industry recognition', 'Business development success'],
    skills: ['Strategic partnership', 'Business development', 'Industry leadership'],
    experienceNeeded: 4000
  }
};

export const AccountManagementExercises = {
  1: [
    {
      title: 'Client Assessment Framework',
      description: 'Create comprehensive client assessment and planning framework',
      experienceReward: 40,
      estimatedTime: 150
    },
    {
      title: 'Communication Mastery',
      description: 'Develop client communication templates and best practices',
      experienceReward: 35,
      estimatedTime: 120
    }
  ],
  2: [
    {
      title: 'Strategic Account Plan',
      description: 'Create detailed strategic plan for a major client account',
      experienceReward: 60,
      estimatedTime: 200
    },
    {
      title: 'Revenue Growth Initiative',
      description: 'Develop and execute revenue growth strategy for existing client',
      experienceReward: 55,
      estimatedTime: 180
    }
  ],
  3: [
    {
      title: 'Multi-Stakeholder Management',
      description: 'Manage complex account with multiple stakeholders and priorities',
      experienceReward: 80,
      estimatedTime: 250
    },
    {
      title: 'Business Development Campaign',
      description: 'Create and execute business development campaign targeting specific industry',
      experienceReward: 75,
      estimatedTime: 220
    }
  ],
  4: [
    {
      title: 'Strategic Partnership Development',
      description: 'Develop strategic partnership with major client',
      experienceReward: 110,
      estimatedTime: 300
    },
    {
      title: 'Account Management Innovation',
      description: 'Develop innovative account management methodology or system',
      experienceReward: 100,
      estimatedTime: 280
    }
  ],
  5: [
    {
      title: 'Industry Leadership Project',
      description: 'Create thought leadership content that advances account management field',
      experienceReward: 150,
      estimatedTime: 400
    },
    {
      title: 'Mentorship Program',
      description: 'Create and lead account management mentorship program',
      experienceReward: 130,
      estimatedTime: 350
    }
  ]
};
