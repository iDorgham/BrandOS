import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Brand Strategist Agent - The strategic planner
export const BrandStrategistAgent: Agent = {
  id: 'brand-strategist',
  name: 'Brand Strategist',
  type: AgentType.BRAND_STRATEGIST,
  status: 'active' as any,
  description: 'Strategic mastermind responsible for brand positioning, market analysis, and competitive intelligence. Develops comprehensive brand strategies that drive business growth.',
  avatar: 'brand-strategist.svg',
  config: {
    model: 'claude-3-opus',
    temperature: 0.5,
    maxTokens: 4096,
    systemPrompt: `You are a seasoned Brand Strategist with 14+ years of experience in brand development, market analysis, and strategic planning. You excel at transforming business objectives into powerful brand strategies.

Your responsibilities:
- Conduct comprehensive market and competitor analysis
- Develop brand positioning and differentiation strategies
- Create brand architecture and portfolio strategies
- Define target audiences and consumer insights
- Analyze brand performance and market trends
- Provide strategic recommendations for brand growth

Your expertise includes:
- Market research and competitive analysis
- Brand positioning and differentiation
- Consumer behavior and insights
- Brand architecture and portfolio management
- Strategic planning and business acumen
- Data analysis and market intelligence
- Brand health monitoring and optimization

Communication style: Analytical, insightful, data-driven, and strategic. You back recommendations with research and clear business rationale.`,
    skills: [
      {
        id: 'market-analysis',
        name: 'Market Analysis',
        description: 'Comprehensive market research and competitive intelligence',
        capability: AgentCapability.TREND_ANALYSIS,
        level: 10,
        isActive: true,
        config: {
          methodologies: ['primary-research', 'secondary-research', 'competitive-intelligence', 'trend-analysis'],
          tools: ['market-databases', 'analytics-platforms', 'social-listening', 'survey-tools'],
          focus: ['market-opportunities', 'competitive-landscape', 'consumer-behavior', 'industry-trends']
        }
      },
      {
        id: 'brand-positioning',
        name: 'Brand Positioning',
        description: 'Develop powerful brand positioning and differentiation strategies',
        capability: AgentCapability.BRAND_EVOLUTION,
        level: 10,
        isActive: true,
        config: {
          frameworks: ['positioning-maps', 'perceptual-mapping', 'brand-essence', 'value-proposition'],
          deliverables: ['positioning-statements', 'brand-pyramids', 'competitive-advantage', 'messaging-frameworks'],
          considerations: ['target-audience', 'market-gaps', 'brand-differentiation', 'sustainability']
        }
      },
      {
        id: 'consumer-insights',
        name: 'Consumer Insights',
        description: 'Deep understanding of consumer behavior and preferences',
        capability: AgentCapability.ASSET_ANALYSIS,
        level: 9,
        isActive: true,
        config: {
          research: ['qualitative', 'quantitative', 'ethnographic', 'behavioral'],
          analysis: ['persona-development', 'journey-mapping', 'need-identification', 'motivational-drivers'],
          application: ['strategy-development', 'messaging', 'product-development', 'experience-design']
        }
      }
    ],
    personality: {
      tone: 'analytical',
      verbosity: 'comprehensive'
    }
  },
  createdAt: Date.now(),
  lastActive: Date.now(),
  performance: {
    tasksCompleted: 0,
    successRate: 96,
    averageResponseTime: 200
  }
};

// Brand strategist specific workflows
export const BrandStrategistWorkflows = {
  strategicPlanning: {
    name: 'Strategic Brand Planning',
    phases: [
      {
        phase: 'Market Intelligence',
        duration: '3-5 days',
        activities: ['Market size analysis', 'Growth trends', 'Competitive landscape', 'Regulatory environment'],
        deliverables: ['Market overview', 'Competitive analysis', 'Opportunity assessment', 'Risk analysis']
      },
      {
        phase: 'Consumer Research',
        duration: '3-5 days',
        activities: ['Target audience definition', 'Consumer interviews', 'Surveys', 'Behavioral analysis'],
        deliverables: ['Audience personas', 'Insight reports', 'Journey maps', 'Need identification']
      },
      {
        phase: 'Strategy Formulation',
        duration: '2-4 days',
        activities: ['Brand positioning', 'Value proposition', 'Strategic objectives', 'Implementation roadmap'],
        deliverables: ['Brand strategy', 'Positioning platform', 'Strategic roadmap', 'KPI framework']
      }
    ],
    researchMethods: ['Surveys', 'Focus groups', 'Interviews', 'Social listening', 'Data analytics', 'Ethnographic research']
  },
  competitiveIntelligence: {
    name: 'Competitive Intelligence',
    analysisAreas: [
      'Brand positioning and messaging',
      'Product/service offerings',
      'Pricing strategies',
      'Marketing and communication tactics',
      'Customer experience and service',
      'Digital presence and engagement',
      'Market share and performance'
    ],
    intelligenceTools: ['Competitor monitoring', 'Social listening', 'Market research databases', 'Web analytics', 'Customer feedback analysis'],
    deliverables: ['Competitive landscape', 'Positioning maps', 'SWOT analysis', 'Strategic recommendations']
  },
  brandPerformance: {
    name: 'Brand Performance Monitoring',
    metrics: [
      'Brand awareness and recognition',
      'Brand consideration and preference',
      'Customer satisfaction and loyalty',
      'Market share and growth',
      'Digital engagement metrics',
      'Revenue and profitability'
    ],
    monitoringTools: ['Brand tracking studies', 'Social listening', 'Web analytics', 'Sales data', 'Customer surveys'],
    reportingFrequency: 'Monthly brand health reports with quarterly deep-dive analysis'
  }
};

// Strategic frameworks
export const BrandStrategistFrameworks = {
  brandArchitecture: {
    models: [
      {
        name: 'Monolithic (Branded House)',
        description: 'Single master brand umbrella',
        examples: ['Google', 'Apple', 'FedEx'],
        advantages: ['Brand equity focus', 'Cost efficiency', 'Clear identity'],
        bestFor: ['Single industry focus', 'Strong master brand']
      },
      {
        name: 'Endorsed (House of Brands)',
        description: 'Master brand endorses sub-brands',
        examples: ['Marriott', 'Kellogg\'s', 'Nestlé'],
        advantages: ['Market segmentation', 'Risk diversification', 'Targeted positioning'],
        bestFor: ['Multiple segments', 'Different product categories']
      },
      {
        name: 'Portfolio (Independent Brands)',
        description: 'Independent brand portfolio',
        examples: ['P&G', 'Unilever', 'L\'Oréal'],
        advantages: ['Market coverage', 'Crisis isolation', 'Flexibility'],
        bestFor: ['Diverse markets', 'Acquisition strategy']
      }
    ],
    selectionCriteria: ['Business strategy', 'Target markets', 'Brand equity', 'Growth plans', 'Resource allocation']
  },
  positioningStrategy: {
    frameworks: [
      {
        name: 'Attribute Positioning',
        focus: 'Specific product or service attributes',
        example: 'Volvo = Safety',
        application: ['Functional benefits', 'Technical superiority', 'Unique features']
      },
      {
        name: 'Benefit Positioning',
        focus: 'Consumer benefits and outcomes',
        example: 'Nike = Performance achievement',
        application: ['Emotional benefits', 'Problem solutions', 'Life improvement']
      },
      {
        name: 'Value Positioning',
        focus: 'Price-quality relationship',
        example: 'Walmart = Everyday low prices',
        application: ['Value leadership', 'Premium positioning', 'Accessibility']
      },
      {
        name: 'Competitor-Based',
        focus: 'Positioning relative to competitors',
        example: '7UP = The un-cola',
        application: ['Differentiation', 'Market gaps', 'Direct comparison']
      }
    ]
  },
  consumerJourney: {
    stages: [
      'Awareness - How consumers discover the brand',
      'Consideration - How consumers evaluate options',
      'Purchase - Decision and transaction process',
      'Experience - Product/service usage',
      'Loyalty - Repeat business and advocacy'
    ],
    touchpoints: ['Digital', 'Physical', 'Social', 'Personal', 'Community'],
    insights: ['Pain points', 'Motivations', 'Barriers', 'Opportunities', 'Moments of truth']
  }
};

// Strategic deliverables
export const BrandStrategistDeliverables = {
  brandStrategy: {
    name: 'Comprehensive Brand Strategy',
    components: [
      'Executive summary and strategic overview',
      'Market and competitive analysis',
      'Target audience and personas',
      'Brand positioning and differentiation',
      'Brand architecture and portfolio strategy',
      'Value proposition and messaging framework',
      'Implementation roadmap and timeline',
      'Success metrics and KPIs'
    ],
    format: ['Strategic presentation', 'Detailed report', 'Implementation guide', 'Executive summary']
  },
  marketResearch: {
    name: 'Market Research Report',
    sections: [
      'Market size and growth trends',
      'Competitive landscape analysis',
      'Consumer insights and preferences',
      'Opportunity and gap analysis',
      'Strategic implications',
      'Recommendations and next steps'
    ],
    methodologies: ['Quantitative research', 'Qualitative insights', 'Secondary research', 'Expert interviews']
  },
  brandGuidelines: {
    name: 'Strategic Brand Guidelines',
    elements: [
      'Brand strategy and positioning',
      'Brand essence and personality',
      'Target audience definition',
      'Messaging framework',
      'Brand voice and tone',
      'Visual identity direction',
      'Application guidelines',
      'Usage principles and examples'
    ]
  }
};
