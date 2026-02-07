import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Copywriter Agent - The creative wordsmith
export const CopywriterAgent: Agent = {
  id: 'copywriter',
  name: 'Copywriter',
  type: AgentType.COPYWRITER,
  status: 'active' as any,
  description: 'Creative copywriting expert responsible for crafting compelling brand messages, campaign copy, and storytelling content. Transforms brand strategy into powerful written communication.',
  avatar: 'copywriter.svg',
  config: {
    model: 'claude-3-opus',
    temperature: 0.8,
    maxTokens: 3072,
    systemPrompt: `You are a talented Copywriter with 10+ years of experience in brand messaging, creative copywriting, and storytelling. You excel at crafting compelling copy that captures brand essence and drives action.

Your responsibilities:
- Develop brand voice and messaging frameworks
- Write compelling copy for all marketing channels
- Create engaging storytelling content
- Adapt tone and style for different platforms and audiences
- Collaborate with creative team on integrated campaigns
- Ensure consistency in brand messaging

Your expertise includes:
- Brand voice development and copywriting
- Campaign concept development
- Storytelling and narrative crafting
- SEO and performance copywriting
- Social media copywriting
- Long-form content creation
- Call-to-action optimization
- Headline and tagline development

Communication style: Creative, persuasive, adaptable, and strategic. You understand how words connect with audiences and drive brand engagement.`,
    skills: [
      {
        id: 'brand-copywriting',
        name: 'Brand Copywriting',
        description: 'Craft compelling brand-aligned copy across all channels',
        capability: AgentCapability.PROMPT_GENERATION,
        level: 10,
        isActive: true,
        config: {
          specialties: ['brand-voice', 'messaging-frameworks', 'tagline-development', 'storytelling'],
          channels: ['advertising', 'social-media', 'website', 'email', 'packaging', 'content-marketing'],
          styles: ['persuasive', 'emotional', 'informational', 'entertaining', 'inspirational']
        }
      },
      {
        id: 'creative-concept',
        name: 'Creative Concept Development',
        description: 'Develop creative concepts and campaign ideas',
        capability: AgentCapability.WORKFLOW_AUTOMATION,
        level: 9,
        isActive: true,
        config: {
          processes: ['ideation', 'concept-development', 'campaign-structure', 'storytelling-arcs'],
          deliverables: ['creative-concepts', 'campaign-themes', 'storyboards', 'narrative-frameworks'],
          collaboration: ['art-direction', 'brand-strategy', 'client-feedback', 'team-ideation']
        }
      },
      {
        id: 'content-optimization',
        name: 'Content Optimization',
        description: 'Optimize copy for engagement and performance',
        capability: AgentCapability.PERFORMANCE_OPTIMIZATION,
        level: 8,
        isActive: true,
        config: {
          techniques: ['seo-optimization', 'a-b-testing', 'engagement-optimization', 'conversion-optimization'],
          metrics: ['engagement-rates', 'conversion-rates', 'readability-scores', 'search-rankings'],
          tools: ['analytics', 'testing-platforms', 'seo-tools', 'readability-checkers']
        }
      }
    ],
    personality: {
      tone: 'creative',
      verbosity: 'comprehensive'
    }
  },
  createdAt: Date.now(),
  lastActive: Date.now(),
  performance: {
    tasksCompleted: 0,
    successRate: 93,
    averageResponseTime: 140
  }
};

// Copywriter specific workflows
export const CopywriterWorkflows = {
  copywritingProcess: {
    name: 'Strategic Copywriting Process',
    phases: [
      {
        phase: 'Brief Analysis & Research',
        duration: '2-4 hours',
        activities: ['Brand brief review', 'Target audience research', 'Competitor messaging analysis', 'Objective clarification'],
        deliverables: ['Research insights', 'Messaging opportunities', 'Direction brief']
      },
      {
        phase: 'Creative Ideation',
        duration: '3-6 hours',
        activities: ['Brainstorming sessions', 'Concept development', 'Message frameworks', 'Headline exploration'],
        deliverables: ['Creative concepts', 'Message frameworks', 'Headline options', 'Story ideas']
      },
      {
        phase: 'Copy Development',
        duration: '1-2 days',
        activities: ['Copywriting', 'Message refinement', 'Call-to-action crafting', 'Format adaptation'],
        deliverables: ['Final copy', 'Variations', 'CTA options', 'Format-specific versions']
      },
      {
        phase: 'Review & Optimization',
        duration: '4-8 hours',
        activities: ['Proofreading', 'Testing', 'Feedback incorporation', 'Final optimization'],
        deliverables: ['Polished copy', 'Test results', 'Optimization recommendations']
      }
    ],
    qualityStandards: ['Brand alignment', 'Clarity and persuasiveness', 'Actionability', 'Audience relevance']
  },
  brandVoiceDevelopment: {
    name: 'Brand Voice Development',
    components: [
      'Brand personality traits and characteristics',
      'Language style and vocabulary',
      'Tone variations for different contexts',
      'Messaging principles and guidelines',
      'Storytelling approach and narrative style',
      'Dos and don\'ts for brand communication'
    ],
    applications: ['All customer touchpoints', 'Marketing materials', 'Internal communications', 'Customer service'],
    consistency: ['Voice guidelines', 'Training materials', 'Quality control', 'Regular reviews']
  },
  multiChannelAdaptation: {
    name: 'Multi-Channel Copy Adaptation',
    channels: [
      {
        channel: 'Social Media',
        characteristics: ['Concise', 'Conversational', 'Hashtag-friendly', 'Emoji-appropriate'],
        optimization: ['Platform-specific length', 'Engagement hooks', 'Visual copy integration']
      },
      {
        channel: 'Website',
        characteristics: ['Informative', 'SEO-optimized', 'Scannable', 'Conversion-focused'],
        optimization: ['Headline hierarchy', 'Clear CTAs', 'User journey flow', 'Mobile readability']
      },
      {
        channel: 'Email Marketing',
        characteristics: ['Personal', 'Value-driven', 'Action-oriented', 'Mobile-friendly'],
        optimization: ['Subject lines', 'Personalization', 'CTA placement', 'Preview text']
      },
      {
        channel: 'Advertising',
        characteristics: ['Attention-grabbing', 'Persuasive', 'Memorable', 'Brand-focused'],
        optimization: ['Headline impact', 'Unique selling proposition', 'Visual copy harmony']
      }
    ]
  }
};

// Copywriting expertise
export const CopywritingExpertise = {
  brandMessaging: {
    name: 'Brand Messaging Excellence',
    elements: [
      'Brand positioning statement',
      'Value proposition',
      'Key messages and pillars',
      'Brand story and narrative',
      'Taglines and slogans',
      'Proof points and credibility'
    ],
    development: ['Research', 'Strategic thinking', 'Creative writing', 'Audience testing', 'Brand alignment'],
    applications: ['All marketing channels', 'Internal communications', 'Sales materials', 'Customer service']
  },
  storytelling: {
    name: 'Brand Storytelling',
    techniques: [
      'Hero\'s journey narrative',
      'Problem-solution framework',
      'Transformation stories',
      'Customer success stories',
      'Brand origin stories',
      'Vision and future stories'
    ],
    elements: ['Characters', 'Conflict', 'Resolution', 'Emotion', 'Authenticity', 'Relevance'],
    platforms: ['Brand videos', 'Website stories', 'Social media narratives', 'Content marketing']
  },
  persuasion: {
    name: 'Persuasive Copywriting',
    principles: [
      'Social proof and testimonials',
      'Scarcity and urgency',
      'Authority and credibility',
      'Reciprocity and value',
      'Consistency and commitment',
      'Emotional connection'
    ],
    techniques: ['AIDA framework', 'PAS formula', 'Feature-benefit conversion', 'Objection handling'],
    applications: ['Sales copy', 'Landing pages', 'Email campaigns', 'Advertising']
  }
};

// Copy templates and frameworks
export const CopywritingTemplates = {
  brandVoiceGuide: {
    structure: [
      'Brand personality overview',
      'Core values and beliefs',
      'Voice characteristics',
      'Language style guidelines',
      'Tone variations by context',
      'Vocabulary and terminology',
      'Do\'s and don\'ts',
      'Examples across channels'
    ]
  },
  campaignConcept: {
    components: [
      'Big idea and creative concept',
      'Key message and headline',
      'Story narrative arc',
      'Channel adaptations',
      'Visual copy integration',
      'Call-to-action framework',
      'Measurement and success criteria'
    ]
  },
  contentFramework: {
    elements: [
      'Hook/grabber',
      'Problem identification',
      'Solution presentation',
      'Benefits and value',
      'Social proof',
      'Call-to-action',
      'Brand reinforcement'
    ]
  }
};

// Testing and optimization
export const CopywritingOptimizationFramework = {
  testing: {
    aBTesting: {
      variables: ['Headlines', 'Call-to-actions', 'Message framing', 'Tone', 'Length'],
      platforms: ['Email', 'Landing pages', 'Ads', 'Social media', 'Website'],
      metrics: ['Open rates', 'Click-through rates', 'Conversion rates', 'Engagement', 'Time on page'],
      process: ['Hypothesis', 'Test setup', 'Execution', 'Analysis', 'Implementation']
    },
    readabilityTesting: {
      metrics: ['Reading level', 'Sentence length', 'Paragraph structure', 'Word complexity'],
      tools: ['Readability scores', 'User testing', 'Eye tracking', 'Heat maps'],
      optimization: ['Simplification', 'Structure improvement', 'Clarity enhancement']
    }
  },
  performance: {
    keyMetrics: [
      'Engagement rates (likes, comments, shares)',
      'Conversion rates (leads, sales, sign-ups)',
      'Readability scores (Flesch-Kincaid, Gunning Fog)',
      'SEO performance (rankings, traffic)',
      'Brand alignment scores',
      'A/B test results'
    ],
    analysis: ['Regular performance reviews', 'Trend identification', 'Optimization opportunities', 'Channel comparison'],
    improvement: ['Iterative testing', 'Content refresh', 'Strategy adjustment', 'Skill development']
  }
};
