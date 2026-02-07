import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Creative Director Agent - The visionary leader
export const CreativeDirectorAgent: Agent = {
  id: 'creative-director',
  name: 'Creative Director',
  type: AgentType.CREATIVE_DIRECTOR,
  status: 'active' as any,
  description: 'Visionary creative leader responsible for brand strategy, creative direction, and team oversight. Sets the creative vision and ensures brand consistency across all projects.',
  avatar: 'creative-director.svg',
  config: {
    model: 'claude-3-opus',
    temperature: 0.7,
    maxTokens: 4096,
    systemPrompt: `You are an experienced Creative Director with 15+ years in leading creative teams and building iconic brands. 

Your responsibilities:
- Set creative vision and brand strategy
- Oversee all creative output for consistency and excellence
- Mentor and guide the creative team
- Present creative concepts to clients
- Ensure brand alignment across all touchpoints
- Balance creativity with business objectives

Your expertise includes:
- Brand strategy and positioning
- Creative direction and campaign development
- Team leadership and creative development
- Client relationship management
- Industry trend analysis and innovation
- Cross-platform brand consistency

Communication style: Inspirational, strategic, confident, and collaborative. You guide with vision but listen to team insights.`,
    skills: [
      {
        id: 'brand-strategy',
        name: 'Brand Strategy',
        description: 'Develop comprehensive brand strategies and positioning',
        capability: AgentCapability.BRAND_EVOLUTION,
        level: 10,
        isActive: true,
        config: {
          specialties: ['positioning', 'architecture', 'brand-audits', 'competitive-analysis'],
          methodology: ['strategic-thinking', 'market-research', 'consumer-insights']
        }
      },
      {
        id: 'creative-direction',
        name: 'Creative Direction',
        description: 'Lead creative vision and campaign development',
        capability: AgentCapability.WORKFLOW_AUTOMATION,
        level: 10,
        isActive: true,
        config: {
          focus: ['campaign-development', 'visual-identity', 'storytelling', 'creative-excellence'],
          leadership: ['team-inspiration', 'client-presentation', 'quality-control']
        }
      },
      {
        id: 'client-communication',
        name: 'Client Communication',
        description: 'Expert client relationship management and presentation',
        capability: AgentCapability.PERFORMANCE_OPTIMIZATION,
        level: 9,
        isActive: true,
        config: {
          skills: ['presentation', 'negotiation', 'relationship-building', 'expectation-management'],
          deliverables: ['creative-pitches', 'strategy-decks', 'progress-reports']
        }
      }
    ],
    personality: {
      tone: 'professional',
      verbosity: 'comprehensive'
    }
  },
  createdAt: Date.now(),
  lastActive: Date.now(),
  performance: {
    tasksCompleted: 0,
    successRate: 95,
    averageResponseTime: 180
  }
};

// Creative Director specific workflows and methods
export const CreativeDirectorWorkflows = {
  brandStrategy: {
    name: 'Brand Strategy Development',
    phases: [
      {
        phase: 'Discovery & Research',
        duration: '2-3 days',
        activities: ['Market analysis', 'Competitor research', 'Stakeholder interviews', 'Brand audit'],
        deliverables: ['Research insights', 'Opportunity analysis', 'Strategic recommendations']
      },
      {
        phase: 'Strategy Formulation',
        duration: '2-3 days',
        activities: ['Brand positioning', 'Value proposition', 'Target audience definition', 'Brand personality'],
        deliverables: ['Brand strategy document', 'Positioning statement', 'Audience personas']
      },
      {
        phase: 'Creative Direction',
        duration: '2-3 days',
        activities: ['Visual direction', 'Tone of voice', 'Brand expression', 'Creative brief development'],
        deliverables: ['Creative brief', 'Visual direction board', 'Brand guidelines framework']
      }
    ],
    tools: ['Research databases', 'Strategy frameworks', 'Presentation tools', 'Collaboration platforms']
  },
  projectOversight: {
    name: 'Project Creative Oversight',
    responsibilities: [
      'Review and approve all creative concepts',
      'Ensure brand consistency across deliverables',
      'Guide creative team in concept development',
      'Present creative work to clients',
      'Provide constructive feedback and direction',
      'Balance creative excellence with client requirements'
    ],
    reviewPoints: ['Initial concepts', 'Design development', 'Final execution', 'Client presentation'],
    qualityMetrics: ['Brand alignment', 'Creative excellence', 'Strategic relevance', 'Client satisfaction']
  },
  teamLeadership: {
    name: 'Creative Team Leadership',
    activities: [
      'Set creative standards and expectations',
      'Mentor team members in creative excellence',
      'Facilitate creative brainstorming sessions',
      'Resolve creative challenges and conflicts',
      'Foster innovative and collaborative culture',
      'Recognize and develop creative talent'
    ],
    leadershipStyle: 'Inspirational and collaborative',
    teamDevelopment: ['Skill assessment', 'Training programs', 'Career development', 'Performance coaching']
  }
};

// Communication templates
export const CreativeDirectorTemplates = {
  clientPresentation: {
    structure: [
      'Situation and opportunity',
      'Strategic insight',
      'Creative concept',
      'Execution plan',
      'Expected outcomes',
      'Next steps'
    ],
    tone: 'Confident, strategic, inspiring',
    visualStyle: 'Professional, compelling, brand-aligned'
  },
  teamDirection: {
    structure: [
      'Project context and objectives',
      'Creative vision and direction',
      'Key requirements and constraints',
      'Brand considerations',
      'Timeline and milestones',
      'Success criteria'
    ],
    tone: 'Clear, motivational, directive',
    delivery: 'Team meetings, creative briefs, one-on-one sessions'
  },
  clientUpdates: {
    structure: [
      'Progress summary',
      'Key achievements',
      'Challenges and solutions',
      'Next deliverables',
      'Resource needs',
      'Timeline updates'
    ],
    frequency: 'Weekly or milestone-based',
    format: 'Email updates, progress reports, status meetings'
  }
};

// Performance indicators
export const CreativeDirectorMetrics = {
  strategic: [
    'Brand strategy effectiveness',
    'Creative innovation index',
    'Brand consistency score',
    'Market impact measurement'
  ],
  team: [
    'Team creative performance',
    'Skill development progress',
    'Collaboration effectiveness',
    'Team satisfaction index'
  ],
  client: [
    'Client satisfaction score',
    'Presentation success rate',
    'Relationship strength',
    'Repeat business rate'
  ],
  project: [
    'Creative quality ratings',
    'On-time delivery',
    'Budget adherence',
    'Strategic alignment'
  ]
};
