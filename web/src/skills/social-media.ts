import { SkillDefinition } from '../types';

export const SocialMediaSkill: SkillDefinition = {
  id: 'social-media',
  name: 'Social Media Design',
  description: 'Master the creation of engaging content optimized for social media platforms and audiences',
  category: 'collaborative' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['social-media', 'content-creation', 'engagement', 'platform-optimization', 'visual-storytelling'],
  requirements: ['design-fundamentals', 'color-theory', 'typography'],
  capabilities: [
    'platform-optimization',
    'content-strategy',
    'engagement-optimization',
    'social-media-branding',
    'visual-storytelling',
    'trend-adaptation',
    'community-design',
    'analytics-driven-design',
    'cross-platform-consistency'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 125,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// Platform-specific specifications
export const SocialMediaPlatforms = {
  instagram: {
    dimensions: {
      post: ['1080x1080 (Square)', '1080x1350 (Portrait)', '1080x566 (Landscape)'],
      story: ['1080x1920 (Portrait)'],
      reel: ['1080x1920 (Portrait)', '1920x1080 (Landscape)'],
      igtv: ['1080x1920 (Portrait)'],
      carousel: ['1080x1080 (Square per slide)']
    },
    bestPractices: [
      'High-quality visuals',
      'Engaging thumbnails',
      'Consistent aesthetic',
      'Mobile-first design',
      'Vertical preference'
    ],
    contentTypes: ['Photos', 'Videos', 'Carousels', 'Reels', 'Stories'],
    engagement: ['Hashtags', 'Stories', 'Reels', 'Interactive stickers'],
    designTrends: ['Bold colors', 'Authentic imagery', 'Carousel storytelling']
  },
  facebook: {
    dimensions: {
      post: ['1200x630 (Link preview)', '1200x900 (Photo)'],
      cover: ['851x315 (Desktop)', '640x360 (Mobile)'],
      story: ['1080x1920 (Portrait)'],
      ad: ['1200x628 (Feed)', '1080x1080 (Square)'],
      event: ['1920x1080 (Cover)']
    },
    bestPractices: [
      'Text overlay considerations',
      'Link preview optimization',
      'Mobile responsive design',
      'A/B testing friendly',
      'Community engagement focus'
    ],
    contentTypes: ['Posts', 'Stories', 'Ads', 'Events', 'Groups'],
    engagement: ['Comments', 'Shares', 'Reactions', 'Page interactions'],
    designTrends: ['Clean layouts', 'Information hierarchy', 'Call-to-action focus']
  },
  twitter: {
    dimensions: {
      tweet: ['1200x675 (Image)', '1200x1200 (Square)'],
      header: ['1500x500 (Header)'],
      profile: ['400x400 (Profile pic)'],
      card: ['1200x600 (Card preview)']
    },
    bestPractices: [
      'Text-overlay friendly',
      'Quick visual impact',
      'Mobile optimization',
      'GIF compatibility',
      'Accessibility consideration'
    ],
    contentTypes: ['Tweets', 'Threads', 'Cards', 'Headers', 'Profile pictures'],
    engagement: ['Retweets', 'Likes', 'Replies', 'Quote tweets'],
    designTrends: ['Bold typography', 'Meme culture', 'Infographics', 'Thread storytelling']
  },
  linkedin: {
    dimensions: {
      post: ['1200x627 (Image)', '1080x1080 (Square)'],
      cover: ['1584x396 (Cover)', '1536x768 (Mobile)'],
      article: ['1200x627 (Featured image)'],
      video: ['1920x1080 (Landscape)'],
      ad: ['1200x627 (Sponsored content)']
    },
    bestPractices: [
      'Professional aesthetic',
      'Corporate branding',
      'Text-friendly designs',
      'Information hierarchy',
      'Industry-appropriate content'
    ],
    contentTypes: ['Posts', 'Articles', 'Videos', 'Ads', 'Company pages'],
    engagement: ['Comments', 'Shares', 'Reactions', 'Professional networking'],
    designTrends: ['Clean professional', 'Data visualization', 'Corporate branding']
  },
  tiktok: {
    dimensions: {
      video: ['1080x1920 (Portrait)'],
      profile: ['200x200 (Profile pic)'],
      cover: ['1080x1920 (Video thumbnail)']
    },
    bestPractices: [
      'Vertical-first design',
      'Motion graphics focus',
      'Sound integration',
      'Trend adaptation',
      'Authentic aesthetics'
    ],
    contentTypes: ['Short videos', 'Effects', 'Duets', 'Challenges'],
    engagement: ['Likes', 'Comments', 'Shares', 'Sound usage'],
    designTrends: ['Motion graphics', 'Trend-driven', 'Authentic content', 'Sound design']
  },
  pinterest: {
    dimensions: {
      pin: ['1000x1500 (Portrait)', '1000x1000 (Square)'],
      story: ['1080x1920 (Portrait)'],
      board: ['222x150 (Board cover)'],
      video: ['1000x562 (Standard), 1000x1500 (Vertical)']
    },
    bestPractices: [
      'Vertical format preference',
      'High-quality visuals',
      'Text overlay integration',
      'SEO-friendly descriptions',
      'Category optimization'
    ],
    contentTypes: ['Pins', 'Boards', 'Stories', 'Videos', 'Idea Pins'],
    engagement: ['Saves', 'Clicks', 'Comments', 'Shares'],
    designTrends: ['Infographics', 'DIY content', 'Inspirational quotes', 'How-to guides']
  }
};

// Content strategy frameworks
export const ContentStrategyFrameworks = {
  pillarCluster: {
    description: 'Hub and spoke content model for comprehensive coverage',
    structure: {
      pillarContent: ['Comprehensive guides', 'Resource hubs', 'Brand stories'],
      clusterContent: ['Specific topics', 'How-to guides', 'Quick tips'],
      supportingContent: ['Infographics', 'Quotes', 'Behind the scenes']
    },
    benefits: ['SEO optimization', 'Authority building', 'Audience retention'],
    implementation: ['Content mapping', 'Internal linking', 'Cross-promotion']
  },
  storytellingArc: {
    description: 'Narrative-based content creation for engagement',
    structures: {
      hero: ['Problem introduction', 'Solution discovery', 'Transformation story'],
      journey: ['Beginning', 'Challenge', 'Resolution', 'Growth'],
      education: ['Hook', 'Teaching', 'Application', 'Results']
    },
    elements: ['Characters', 'Conflict', 'Resolution', 'Emotional connection'],
    platforms: ['Instagram stories', 'Facebook', 'LinkedIn', 'YouTube']
  },
  trendJacking: {
    description: 'Leveraging current trends for brand relevance',
    strategies: [
      'Early trend identification',
      'Authentic brand integration',
      'Timely content creation',
      'Platform-specific adaptation'
    ],
    risks: ['Brand misalignment', 'Timing issues', 'Over-saturation'],
    rewards: ['Viral potential', 'Reach expansion', 'Cultural relevance']
  }
};

// Engagement optimization strategies
export const EngagementOptimization = {
  visual: {
    techniques: [
      'Color psychology application',
      'Pattern interruption',
      'Human face inclusion',
      'Motion and animation',
      'Text overlay optimization'
    ],
    metrics: ['View duration', 'Share rate', 'Save rate', 'Comment engagement'],
    abTesting: ['Thumbnail variations', 'Color schemes', 'Text placement', 'Format types']
  },
  timing: {
    optimization: [
      'Peak posting times',
      'Day-of-week analysis',
      'Audience timezone consideration',
      'Content type timing',
      'Seasonal adaptation'
    ],
    tools: ['Platform analytics', 'Third-party schedulers', 'Audience insights'],
    strategies: ['Content batching', 'Automated posting', 'Manual engagement windows']
  },
  interaction: {
    methods: [
      'Question prompts',
      'Call-to-action inclusion',
      'Poll and quiz integration',
      'Tagging strategies',
      'User-generated content'
    ],
    types: ['Comments', 'Shares', 'Saves', 'Clicks', 'Mentions'],
    measurement: ['Engagement rate', 'Reach', 'Impressions', 'Click-through rate']
  }
};

// Level progression
export const SocialMediaLevels = {
  1: {
    title: 'Social Media Novice',
    description: 'Understanding platform basics and content creation',
    requirements: ['Platform knowledge', 'Basic design skills'],
    skills: ['Platform specs', 'Basic content creation', 'Community awareness'],
    experienceNeeded: 0
  },
  2: {
    title: 'Social Media Apprentice',
    description: 'Creating engaging content for multiple platforms',
    requirements: ['20 social media posts', 'Cross-platform consistency'],
    skills: ['Multi-platform design', 'Engagement basics', 'Brand consistency'],
    experienceNeeded: 200
  },
  3: {
    title: 'Social Media Practitioner',
    description: 'Developing comprehensive social media strategies',
    requirements: ['Campaign development', 'Analytics understanding'],
    skills: ['Strategy development', 'Analytics interpretation', 'Audience targeting'],
    experienceNeeded: 500
  },
  4: {
    title: 'Social Media Specialist',
    description: 'Advanced social media marketing and optimization',
    requirements: ['Successful campaigns', 'Audience growth'],
    skills: ['Advanced strategy', 'Optimization techniques', 'Community management'],
    experienceNeeded: 1200
  },
  5: {
    title: 'Social Media Expert',
    description: 'Master social media strategist and thought leader',
    requirements: ['Industry recognition', 'Innovative campaigns'],
    skills: ['Strategic innovation', 'Industry leadership', 'Platform mastery'],
    experienceNeeded: 2500
  }
};

// Practical exercises
export const SocialMediaExercises = {
  1: [
    {
      title: 'Platform Specification Mastery',
      description: 'Create content optimized for 5 different platforms',
      experienceReward: 30,
      estimatedTime: 120
    },
    {
      title: 'Brand Consistency Challenge',
      description: 'Maintain brand consistency across 10 different posts',
      experienceReward: 35,
      estimatedTime: 150
    }
  ],
  2: [
    {
      title: 'Engagement Optimization',
      description: 'A/B test different design elements and analyze results',
      experienceReward: 45,
      estimatedTime: 180
    },
    {
      title: 'Content Calendar Creation',
      description: 'Develop a 30-day content calendar with varied content types',
      experienceReward: 40,
      estimatedTime: 200
    }
  ],
  3: [
    {
      title: 'Campaign Development',
      description: 'Create a complete social media campaign from strategy to execution',
      experienceReward: 65,
      estimatedTime: 250
    },
    {
      title: 'Analytics-Driven Optimization',
      description: 'Use analytics data to improve content performance over time',
      experienceReward: 60,
      estimatedTime: 220
    }
  ],
  4: [
    {
      title: 'Multi-Platform Campaign',
      description: 'Execute a coordinated campaign across 4+ platforms',
      experienceReward: 85,
      estimatedTime: 300
    },
    {
      title: 'Community Building Design',
      description: 'Create designs that foster community engagement and growth',
      experienceReward: 80,
      estimatedTime: 280
    }
  ],
  5: [
    {
      title: 'Innovation Project',
      description: 'Develop a new social media content format or strategy',
      experienceReward: 130,
      estimatedTime: 350
    },
    {
      title: 'Industry Leadership',
      description: 'Create educational content that helps other social media designers',
      experienceReward: 120,
      estimatedTime: 300
    }
  ]
};

// Social media design trends and predictions
export const SocialMediaTrends = {
  current: [
    {
      trend: 'Authentic User-Generated Content',
      description: 'Real, unpolished content that builds trust',
      platforms: ['Instagram Stories', 'TikTok', 'Reels'],
      implementation: ['Real photography', 'Behind the scenes', 'Customer spotlights']
    },
    {
      trend: 'Short-Form Video Dominance',
      description: 'Vertical, engaging video content under 60 seconds',
      platforms: ['TikTok', 'Reels', 'Shorts'],
      implementation: ['Motion graphics', 'Quick tutorials', 'Entertainment content']
    },
    {
      trend: 'Carousel Storytelling',
      description: 'Multi-slide visual narratives and guides',
      platforms: ['Instagram', 'LinkedIn'],
      implementation: ['Step-by-step guides', 'Story arcs', 'Information sequences']
    }
  ],
  emerging: [
    {
      trend: 'Interactive Content',
      description: 'Polls, quizzes, and engaging formats',
      platforms: ['Instagram Stories', 'LinkedIn Polls'],
      implementation: ['Interactive infographics', 'Engaging questions', 'Participation prompts']
    },
    {
      trend: 'AR Integration',
      description: 'Augmented reality filters and effects',
      platforms: ['Instagram', 'Snapchat', 'TikTok'],
      implementation: ['Brand filters', 'Virtual try-ons', 'Interactive experiences']
    }
  ]
};
