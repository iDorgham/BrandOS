import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Social Media Manager Agent - The social content expert
export const SocialMediaManagerAgent: Agent = {
  id: 'social-media-manager',
  name: 'Social Media Manager',
  type: AgentType.SOCIAL_MEDIA_MANAGER,
  status: 'active' as any,
  description: 'Social media expert responsible for content strategy, platform management, and community engagement. Creates compelling social content that drives engagement and builds brand communities.',
  avatar: 'social-media-manager.svg',
  config: {
    model: 'claude-3-sonnet',
    temperature: 0.7,
    maxTokens: 3072,
    systemPrompt: `You are a dynamic Social Media Manager with 7+ years of experience in social media strategy, content creation, and community management. You excel at creating engaging content that builds brand communities and drives measurable results.

Your responsibilities:
- Develop comprehensive social media strategies and content plans
- Create engaging platform-specific content and campaigns
- Manage social media communities and engagement
- Analyze performance metrics and optimize strategies
- Stay current with social media trends and algorithm changes
- Coordinate with creative team for visual content development

Your expertise includes:
- Social media platform expertise (Instagram, Facebook, TikTok, LinkedIn, Twitter, Pinterest)
- Content strategy and calendar planning
- Community management and engagement
- Social media analytics and optimization
- Trend awareness and platform algorithm knowledge
- Copywriting and visual content creation
- Influencer partnership management

Communication style: Engaging, trend-aware, data-driven, and community-focused. You understand social media culture and create authentic brand connections.`,
    skills: [
      {
        id: 'social-strategy',
        name: 'Social Media Strategy',
        description: 'Develop comprehensive social media strategies and content plans',
        capability: AgentCapability.WORKFLOW_AUTOMATION,
        level: 9,
        isActive: true,
        config: {
          platforms: ['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'Twitter', 'Pinterest'],
          activities: ['content-strategy', 'campaign-planning', 'audience-growth', 'engagement-optimization'],
          deliverables: ['social-strategy', 'content-calendar', 'campaign-plans', 'performance-reports']
        }
      },
      {
        id: 'content-creation',
        name: 'Social Content Creation',
        description: 'Create engaging platform-specific content and campaigns',
        capability: AgentCapability.PROMPT_GENERATION,
        level: 8,
        isActive: true,
        config: {
          contentTypes: ['posts', 'stories', 'reels', 'videos', 'carousels', 'lives'],
          platforms: ['visual-heavy', 'professional', 'trend-focused', 'community-driven'],
          formats: ['static-images', 'videos', 'stories', 'interactive-content', 'user-generated']
        }
      },
      {
        id: 'community-management',
        name: 'Community Management',
        description: 'Build and engage online communities around brands',
        capability: AgentCapability.ASSET_ANALYSIS,
        level: 9,
        isActive: true,
        config: {
          activities: ['engagement', 'moderation', 'customer-service', 'relationship-building'],
          skills: ['conversation-management', 'crisis-handling', 'community-building', 'influencer-outreach'],
          metrics: ['engagement-rate', 'community-growth', 'sentiment-analysis', 'response-time']
        }
      }
    ],
    personality: {
      tone: 'friendly',
      verbosity: 'detailed'
    }
  },
  createdAt: Date.now(),
  lastActive: Date.now(),
  performance: {
    tasksCompleted: 0,
    successRate: 91,
    averageResponseTime: 100
  }
};

// Social media manager specific workflows
export const SocialMediaManagerWorkflows = {
  strategyDevelopment: {
    name: 'Social Media Strategy Development',
    phases: [
      {
        phase: 'Audience Research',
        duration: '2-3 days',
        activities: ['Target audience analysis', 'Platform preference research', 'Competitor analysis', 'Content gap identification'],
        deliverables: ['Audience personas', 'Platform analysis', 'Competitive insights', 'Opportunity identification']
      },
      {
        phase: 'Strategy Formulation',
        duration: '2-3 days',
        activities: ['Platform selection', 'Content pillars development', 'Voice and tone definition', 'KPI setting'],
        deliverables: ['Social media strategy', 'Content pillars', 'Platform-specific approaches', 'Success metrics']
      },
      {
        phase: 'Content Planning',
        duration: '3-5 days',
        activities: ['Content calendar creation', 'Campaign planning', 'Hashtag strategy', 'Engagement plan'],
        deliverables: ['Content calendar', 'Campaign schedules', 'Hashtag lists', 'Engagement tactics']
      }
    ],
    considerations: ['Brand consistency', 'Platform optimization', 'Audience preferences', 'Resource allocation']
  },
  contentCreation: {
    name: 'Social Content Creation',
    platformSpecialization: [
      {
        platform: 'Instagram',
        content: ['High-quality visuals', 'Stories with interactive elements', 'Reels with trending audio', 'Carousel storytelling'],
        bestPractices: ['Visual consistency', 'Strategic hashtag use', 'Engaging captions', 'Story highlights'],
        optimalTimes: ['Weekday evenings', 'Weekend afternoons']
      },
      {
        platform: 'TikTok',
        content: ['Short-form videos', 'Trend participation', 'Educational content', 'Behind-the-scenes'],
        bestPractices: ['Trending audio', 'Quick hooks', 'Authentic content', 'Clear calls-to-action'],
        optimalTimes: ['Evenings', 'Weekends', 'Trend peaks']
      },
      {
        platform: 'LinkedIn',
        content: ['Professional insights', 'Industry expertise', 'Company news', 'Thought leadership'],
        bestPractices: ['Professional tone', 'Value-driven content', 'Industry discussions', 'Networking engagement'],
        optimalTimes: ['Business hours', 'Tuesday-Thursday mornings']
      }
    ]
  },
  communityEngagement: {
    name: 'Community Management',
    activities: [
      'Daily monitoring and response',
      'Proactive engagement with followers',
      'User-generated content curation',
      'Influencer relationship management',
      'Crisis management and moderation',
      'Community growth initiatives'
    ],
    engagementTypes: ['Comments', 'Direct messages', 'Mentions', 'Shares', 'Reviews', 'Community groups'],
    responseTimes: ['Standard: 2-4 hours', 'Priority: 30-60 minutes', 'Crisis: 15-30 minutes']
  }
};

// Platform expertise
export const SocialMediaPlatformExpertise = {
  instagram: {
    name: 'Instagram Mastery',
    features: ['Posts', 'Stories', 'Reels', 'IGTV', 'Shopping', 'Guides', 'Collaboration posts'],
    contentStrategy: ['Visual-first', 'Storytelling', 'Behind-the-scenes', 'User-generated content', 'Influencer partnerships'],
    growthTactics: ['Hashtag optimization', 'Engagement pods', 'Consistent posting', 'Story highlights', 'Cross-promotion'],
    analytics: ['Reach', 'Engagement rate', 'Story views', 'Saves', 'Shares', 'Profile visits']
  },
  tiktok: {
    name: 'TikTok Expertise',
    features: ['Short videos', 'Duet', 'Stitch', 'Live streaming', 'Shopping integration'],
    contentStrategy: ['Trend participation', 'Educational content', 'Entertainment', 'Challenges', 'Behind-the-scenes'],
    growthTactics: ['Trending audio', 'Hashtag challenges', 'Consistency', 'Cross-platform promotion', 'Creator collaborations'],
    analytics: ['Views', 'Likes', 'Comments', 'Shares', 'Completion rate', 'Follower growth']
  },
  linkedin: {
    name: 'LinkedIn Professional Strategy',
    features: ['Posts', 'Articles', 'Stories', 'Live video', 'Groups', 'Company pages'],
    contentStrategy: ['Thought leadership', 'Industry insights', 'Company news', 'Professional development', 'Networking content'],
    growthTactics: ['Consistent posting', 'Engagement with others', 'Group participation', 'Article publishing', 'Employee advocacy'],
    analytics: ['Impressions', 'Engagement', 'Click-through rate', 'Follower growth', 'Post virality']
  }
};

// Content calendar templates
export const SocialMediaContentTemplates = {
  contentCalendar: {
    structure: [
      'Date and platform',
      'Content pillar/topic',
      'Content type/format',
      'Visual design requirements',
      'Copy and hashtags',
      'Publishing time',
      'Engagement strategy',
      'Performance metrics',
      'Budget allocation'
    ],
    planningHorizons: ['Weekly detailed', 'Monthly overview', 'Quarterly themes']
  },
  campaignPlan: {
    components: [
      'Campaign objectives and KPIs',
      'Target audience segments',
      'Creative concept and messaging',
      'Platform-specific adaptations',
      'Influencer partnerships',
      'Paid promotion strategy',
      'Timeline and milestones',
      'Budget allocation',
      'Success measurement'
    ]
  },
  contentPillar: {
    definition: ['Topic focus', 'Value proposition', 'Target audience', 'Content types', 'Frequency'],
    examples: [
      'Educational content (industry insights)',
      'Behind-the-scenes (company culture)',
      'Product highlights (features/benefits)',
      'User-generated content (community stories)',
      'Industry news (thought leadership)'
    ]
  }
};

// Analytics and optimization
export const SocialMediaAnalyticsFramework = {
  keyMetrics: {
    awareness: ['Reach', 'Impressions', 'Follower growth', 'Mentions', 'Share of voice'],
    engagement: ['Likes', 'Comments', 'Shares', 'Saves', 'Clicks', 'Engagement rate'],
    conversion: ['Website clicks', 'Lead generation', 'Sales', 'App downloads', 'Conversion rate'],
    loyalty: ['Repeat engagement', 'Advocacy', 'User-generated content', 'Community growth']
  },
  reporting: {
    frequency: ['Daily monitoring', 'Weekly reports', 'Monthly deep-dive', 'Quarterly strategy review'],
    format: ['Dashboard', 'Executive summary', 'Detailed analysis', 'Actionable insights'],
    stakeholders: ['Marketing team', 'Management', 'Clients', 'Creative team']
  },
  optimization: {
    aBTesting: ['Content types', 'Posting times', 'Hashtags', 'Visual styles', 'Call-to-actions'],
    algorithmAdaptation: ['Platform changes', 'Feature utilization', 'Trend integration', 'Format experimentation'],
    contentIteration: ['Performance analysis', 'Audience feedback', 'Competitive insights', 'Industry trends']
  }
};
