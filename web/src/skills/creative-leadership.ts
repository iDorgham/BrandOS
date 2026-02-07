import { SkillDefinition } from '../types';

export const CreativeLeadershipSkill: SkillDefinition = {
  id: 'creative-leadership',
  name: 'Creative Leadership',
  description: 'Master the art of leading creative teams, fostering innovation, and driving creative excellence.',
  category: 'strategic' as any,
  level: 'advanced' as any,
  status: 'active' as any,
  tags: ['creative-leadership', 'team-management', 'innovation', 'creative-excellence', 'motivation'],
  requirements: ['branding', 'design-fundamentals', 'account-management'],
  capabilities: [
    'team-leadership',
    'creative-direction',
    'innovation-management',
    'talent-development',
    'conflict-resolution',
    'performance-coaching',
    'creative-culture-building',
    'vision-alignment',
    'quality-standards',
    'inspiration-motivation'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 155,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

export const CreativeLeadershipLevels = {
  1: {
    title: 'Creative Leadership Novice',
    description: 'Understanding basic leadership principles in creative context',
    requirements: ['Basic leadership knowledge', 'Team experience'],
    skills: ['Basic leadership', 'Creative motivation', 'Simple team coordination'],
    experienceNeeded: 0
  },
  2: {
    title: 'Creative Leadership Apprentice',
    description: 'Leading small creative teams effectively',
    requirements: ['Team leadership experience', 'Creative project guidance'],
    skills: ['Team motivation', 'Creative guidance', 'Basic performance management'],
    experienceNeeded: 350
  },
  3: {
    title: 'Creative Leadership Practitioner',
    description: 'Developing creative teams and fostering innovation',
    requirements: ['Creative team development', 'Innovation initiatives'],
    skills: ['Creative development', 'Innovation management', 'Team building'],
    experienceNeeded: 800
  },
  4: {
    title: 'Creative Leadership Specialist',
    description: 'Leading creative departments and strategic initiatives',
    requirements: ['Department leadership', 'Creative strategy'],
    skills: ['Strategic leadership', 'Creative innovation', 'Talent development'],
    experienceNeeded: 1800
  },
  5: {
    title: 'Creative Leadership Expert',
    description: 'Master creative leader and industry thought leader',
    requirements: ['Industry recognition', 'Creative innovation'],
    skills: ['Industry leadership', 'Creative innovation', 'Talent cultivation'],
    experienceNeeded: 3500
  }
};

export const CreativeLeadershipFramework = {
  visionSetting: {
    name: 'Creative Vision Setting',
    elements: [
      'Creative direction and brand alignment',
      'Innovation goals and objectives',
      'Quality standards and excellence criteria',
      'Team purpose and mission',
      'Strategic priorities and focus areas'
    ],
    techniques: ['Vision workshops', 'Goal setting frameworks', 'Innovation sessions', 'Alignment meetings'],
    deliverables: ['Creative vision statement', 'Innovation roadmap', 'Quality framework', 'Team charter']
  },
  teamDevelopment: {
    name: 'Creative Team Development',
    components: [
      'Talent assessment and skill mapping',
      'Individual development plans',
      'Team building and cohesion',
      'Creative collaboration systems',
      'Performance coaching and feedback',
      'Career path development'
    ],
    methods: ['Skill assessments', '360 feedback', 'Coaching sessions', 'Team workshops', 'Mentorship programs'],
    outcomes: ['High-performing teams', 'Skill growth', 'Innovation capacity', 'Retention and satisfaction']
  },
  innovationManagement: {
    name: 'Innovation Management',
    processes: [
      'Idea generation and capture',
      'Creative brainstorming facilitation',
      'Concept evaluation and selection',
      'Innovation project management',
      'Learning and iteration',
      'Knowledge sharing and documentation'
    ],
    techniques: ['Design thinking', 'Creative problem solving', 'Rapid prototyping', 'Agile innovation'],
    metrics: ['Innovation pipeline', 'Success rates', 'Team participation', 'Business impact']
  }
};

export const CreativeLeadershipExercises = {
  1: [
    {
      title: 'Team Motivation Workshop',
      description: 'Design and conduct creative team motivation workshop',
      experienceReward: 40,
      estimatedTime: 150
    },
    {
      title: 'Creative Vision Development',
      description: 'Create comprehensive creative vision for a team or project',
      experienceReward: 35,
      estimatedTime: 120
    }
  ],
  2: [
    {
      title: 'Talent Development Plan',
      description: 'Create individual development plans for creative team members',
      experienceReward: 55,
      estimatedTime: 180
    },
    {
      title: 'Innovation Process Design',
      description: 'Design and implement innovation process for creative team',
      experienceReward: 50,
      estimatedTime: 160
    }
  ],
  3: [
    {
      title: 'Creative Conflict Resolution',
      description: 'Develop and apply conflict resolution framework for creative disagreements',
      experienceReward: 70,
      estimatedTime: 200
    },
    {
      title: 'Team Building Innovation',
      description: 'Create innovative team building program for creative teams',
      experienceReward: 65,
      estimatedTime: 180
    }
  ],
  4: [
    {
      title: 'Creative Culture Transformation',
      description: 'Lead transformation of team creative culture and practices',
      experienceReward: 90,
      estimatedTime: 250
    },
    {
      title: 'Innovation Strategy Implementation',
      description: 'Implement comprehensive innovation strategy within creative department',
      experienceReward: 85,
      estimatedTime: 220
    }
  ],
  5: [
    {
      title: 'Creative Leadership Innovation',
      description: 'Develop innovative leadership methodology for creative teams',
      experienceReward: 140,
      estimatedTime: 350
    },
    {
      title: 'Industry Leadership Contribution',
      description: 'Create thought leadership content advancing creative leadership field',
      experienceReward: 125,
      estimatedTime: 300
    }
  ]
};

export const CreativeLeadershipTechniques = {
  motivation: {
    name: 'Creative Motivation Techniques',
    methods: [
      'Autonomy and ownership',
      'Mastery and skill development',
      'Purpose and meaningful work',
      'Recognition and celebration',
      'Creative challenges and growth',
      'Collaboration and community'
    ],
    applications: ['Daily motivation', 'Project inspiration', 'Career development', 'Team building']
  },
  feedback: {
    name: 'Creative Feedback Framework',
    principles: [
      'Specific and actionable feedback',
      'Growth-focused approach',
      'Creative solution orientation',
      'Balanced critique and praise',
      'Regular and consistent timing',
      'Two-way communication'
    ],
    methods: ['Design critiques', 'Performance reviews', 'Project retrospectives', '360 feedback']
  },
  innovation: {
    name: 'Creative Innovation Catalysts',
    techniques: [
      'Psychological safety and trust',
      'Diverse perspectives inclusion',
      'Time and resources for experimentation',
      'Learning from failure culture',
      'Cross-pollination of ideas',
      'External inspiration and trends'
    ],
    systems: ['Idea management', 'Innovation time', 'Learning programs', 'Recognition systems']
  }
};
