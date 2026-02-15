import { WorkflowTemplate } from './types';

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
    {
        id: 'brand_identity_starter',
        label: 'Brand Identity Starter',
        description: 'Define core traits, colors, and generate initial visual concepts.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 100 }, data: { label: 'Brand Traits' } },
            { id: '2', type: 'palette', position: { x: 100, y: 300 }, data: { label: 'Core Colors' } },
            { id: '3', type: 'midjourney', position: { x: 500, y: 200 }, data: { label: 'Logo Concept Gen' } },
            { id: '4', type: 'image', position: { x: 900, y: 200 }, data: { label: 'Visual Result' } }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'social_content_engine',
        label: 'Social Content Engine',
        description: 'Automate trend research, caption writing, and posting.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'trigger', position: { x: 100, y: 200 }, data: { label: 'Daily Schedule' } },
            { id: '2', type: 'research', position: { x: 400, y: 200 }, data: { label: 'Trend Analysis' } },
            { id: '3', type: 'content_gen', position: { x: 700, y: 200 }, data: { label: 'Caption Writer' } },
            { id: '4', type: 'social_poster', position: { x: 1000, y: 200 }, data: { label: 'Multi-Platform Post' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'ad_campaign_generator',
        label: 'Ad Campaign Generator',
        description: 'Create targeted ad hooks and visuals for Meta Ads.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 100 }, data: { label: 'Target Audience' } },
            { id: '2', type: 'headline_gen', position: { x: 400, y: 100 }, data: { label: 'Ad Hooks' } },
            { id: '3', type: 'midjourney', position: { x: 400, y: 300 }, data: { label: 'Creative Visuals' } },
            { id: '4', type: 'meta_ads', position: { x: 800, y: 200 }, data: { label: 'Campaign Setup' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'seo_blog_pipeline',
        label: 'SEO Blog Pipeline',
        description: 'End-to-end blog post creation from keyword to CMS publish.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'research', position: { x: 100, y: 200 }, data: { label: 'Keyword Research' } },
            { id: '2', type: 'title', position: { x: 400, y: 200 }, data: { label: 'Article Outline' } },
            { id: '3', type: 'content_gen', position: { x: 700, y: 200 }, data: { label: 'Draft Writer' } },
            { id: '4', type: 'seo_optimizer', position: { x: 700, y: 400 }, data: { label: 'SEO Check' } },
            { id: '5', type: 'cms_sync', position: { x: 1000, y: 200 }, data: { label: 'Publish to CMS' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' },
            { id: 'e3-5', source: '3', target: '5' } // Publishing draft, optimizer is side-check
        ]
    },
    {
        id: 'email_newsletter',
        label: 'Email Newsletter',
        description: 'Compose and dispatch newsletters with custom visuals.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'content_plan', position: { x: 100, y: 200 }, data: { label: 'Topic Strategy' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 100 }, data: { label: 'Body Copy' } },
            { id: '3', type: 'image', position: { x: 400, y: 300 }, data: { label: 'Header Image' } },
            { id: '4', type: 'email_sender', position: { x: 800, y: 200 }, data: { label: 'Broadcast' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'market_intelligence',
        label: 'Market Intelligence',
        description: 'Analyze competitors and generate strategic summaries.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'competitor', position: { x: 100, y: 100 }, data: { label: 'Competitor List' } },
            { id: '2', type: 'web_ref', position: { x: 100, y: 300 }, data: { label: 'Competitor Site' } },
            { id: '3', type: 'research', position: { x: 500, y: 200 }, data: { label: 'SWOT Analysis' } },
            { id: '4', type: 'text', position: { x: 900, y: 200 }, data: { label: 'Strategic Summary' } }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'video_scripting',
        label: 'Video Scripting',
        description: 'Develop video concepts into scripts and storyboards.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'text', position: { x: 100, y: 200 }, data: { label: 'Video Concept' } },
            { id: '2', type: 'story_creator', position: { x: 400, y: 200 }, data: { label: 'Script Breakdown' } },
            { id: '3', type: 'midjourney', position: { x: 700, y: 100 }, data: { label: 'Storyboard Frames' } },
            { id: '4', type: 'paragraph', position: { x: 700, y: 300 }, data: { label: 'Final Script' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    {
        id: 'logo_design_lab',
        label: 'Logo Design Lab',
        description: 'Iterative logo design process with vector generation.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 100 }, data: { label: 'Style Guide' } },
            { id: '2', type: 'palette', position: { x: 100, y: 300 }, data: { label: 'Brand Colors' } },
            { id: '3', type: 'midjourney', position: { x: 500, y: 200 }, data: { label: 'Vector Generator' } },
            { id: '4', type: 'image', position: { x: 900, y: 200 }, data: { label: 'Mockups' } }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'feedback_analysis',
        label: 'Feedback Analysis',
        description: 'Process user feedback and alert team on sentiment.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 200 }, data: { label: 'Inbound Feedback' } },
            { id: '2', type: 'mood_gauge', position: { x: 400, y: 200 }, data: { label: 'Sentiment Analysis' } },
            { id: '3', type: 'text', position: { x: 700, y: 200 }, data: { label: 'Summary' } },
            { id: '4', type: 'slack', position: { x: 1000, y: 200 }, data: { label: 'Team Alert' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'global_distro',
        label: 'Global Distribution Hub',
        description: 'Centralized hub for multi-channel distribution via Webhooks.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 300 }, data: { label: 'Asset Intake' } },
            { id: '2', type: 'switch', position: { x: 400, y: 300 }, data: { label: 'Channel Router' } },
            { id: '3', type: 'social_poster', position: { x: 700, y: 100 }, data: { label: 'Social Post' } },
            { id: '4', type: 'email_sender', position: { x: 700, y: 300 }, data: { label: 'Email blast' } },
            { id: '5', type: 'cms_sync', position: { x: 700, y: 500 }, data: { label: 'Sync CMS' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e2-5', source: '2', target: '5' }
        ]
    },
    {
        id: 'ai_storyboarder',
        label: 'AI Storyboarder',
        description: 'Transform video concepts into visual storyboards using Midjourney.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'text', position: { x: 100, y: 200 }, data: { label: 'Concept' } },
            { id: '2', type: 'story_creator', position: { x: 400, y: 200 }, data: { label: 'Shot List' } },
            { id: '3', type: 'midjourney', position: { x: 700, y: 200 }, data: { label: 'Visual Ref' } },
            { id: '4', type: 'image', position: { x: 1000, y: 200 }, data: { label: 'Storyboard Frame' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'color_sync',
        label: 'Color Context Sync',
        description: 'Sync brand palettes with emotional attributes and style guides.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 200 }, data: { label: 'Brand Emotion' } },
            { id: '2', type: 'palette', position: { x: 400, y: 200 }, data: { label: 'Color Sync' } },
            { id: '3', type: 'typography', position: { x: 700, y: 200 }, data: { label: 'Style Pairing' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'trend_watcher',
        label: 'Trend Watcher',
        description: 'Monitor viral topics and triggers rapid content planning.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'trigger', position: { x: 100, y: 200 }, data: { label: 'Monitor Cycle' } },
            { id: '2', type: 'research', position: { x: 400, y: 200 }, data: { label: 'Viral Trends' } },
            { id: '3', type: 'content_plan', position: { x: 700, y: 200 }, data: { label: 'Quick Response' } },
            { id: '4', type: 'slack', position: { x: 1000, y: 200 }, data: { label: 'Alert Creative' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'voice_of_customer',
        label: 'Voice of Customer',
        description: 'Convert raw feedback into empathetic brand messaging.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 200 }, data: { label: 'Raw Feedback' } },
            { id: '2', type: 'research', position: { x: 400, y: 200 }, data: { label: 'Analyze Need' } },
            { id: '3', type: 'content_gen', position: { x: 700, y: 200 }, data: { label: 'Empathic Copy' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'archetype_lab',
        label: 'Brand Archetype Lab',
        description: 'Iterative logo generation based on archetype traits.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 200 }, data: { label: 'Archetype' } },
            { id: '2', type: 'midjourney', position: { x: 400, y: 200 }, data: { label: 'Logo Archetype' } },
            { id: '3', type: 'palette', position: { x: 400, y: 400 }, data: { label: 'Archetype Palette' } },
            { id: '4', type: 'image', position: { x: 800, y: 300 }, data: { label: 'Identity Concept' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'dynamic_web',
        label: 'Dynamic Web Experience',
        description: 'Adapt CMS content based on real-time environmental data.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'weather', position: { x: 100, y: 200 }, data: { label: 'Local Weather' } },
            { id: '2', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Condition Logic' } },
            { id: '3', type: 'cms_sync', position: { x: 700, y: 200 }, data: { label: 'Update Site' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'musical_mood',
        label: 'Musical Mood Matcher',
        description: 'Generate visual palettes and moods inspired by Spotify tracks.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'spotify', position: { x: 100, y: 200 }, data: { label: 'Track Context' } },
            { id: '2', type: 'palette', position: { x: 400, y: 100 }, data: { label: 'Rhythm Palette' } },
            { id: '3', type: 'midjourney', position: { x: 400, y: 300 }, data: { label: 'Melody Visualizer' } },
            { id: '4', type: 'image', position: { x: 800, y: 200 }, data: { label: 'Audio-Visual Kit' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'omnichannel_broadcaster',
        label: 'Omnichannel Broadcaster',
        description: 'Distributes unified messaging across Ads, Social, and Email.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'content_gen', position: { x: 100, y: 200 }, data: { label: 'Core Message' } },
            { id: '2', type: 'social_poster', position: { x: 400, y: 100 }, data: { label: 'Meta Post' } },
            { id: '3', type: 'meta_ads', position: { x: 400, y: 250 }, data: { label: 'Meta Ad' } },
            { id: '4', type: 'email_sender', position: { x: 400, y: 400 }, data: { label: 'Newsletter' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e1-4', source: '1', target: '4' }
        ]
    },
    {
        id: 'lead_nurture',
        label: 'Personalized Lead Nurture',
        description: 'Individualized WhatsApp messaging based on Google Sheet data.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'google_sheet', position: { x: 100, y: 200 }, data: { label: 'Read Leads' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 200 }, data: { label: 'Personalize' } },
            { id: '3', type: 'whatsapp', position: { x: 700, y: 200 }, data: { label: 'WhatsApp Send' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'hook_lab',
        label: 'A/B Hook Laboratory',
        description: 'Test and refine advertising hooks via Telegram feedback.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'headline_gen', position: { x: 100, y: 200 }, data: { label: 'Variant Gen' } },
            { id: '2', type: 'telegram', position: { x: 400, y: 200 }, data: { label: 'Poll Team' } },
            { id: '3', type: 'logic', position: { x: 700, y: 200 }, data: { label: 'Winner Logic' } },
            { id: '4', type: 'meta_ads', position: { x: 1000, y: 200 }, data: { label: 'Best Hook Ad' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'multi_language_engine',
        label: 'Multi-Language Content Engine',
        description: 'Scale content across languages with automated rewriting.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'research', position: { x: 100, y: 200 }, data: { label: 'Base Research' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 200 }, data: { label: 'Master Copy' } },
            { id: '3', type: 'content_gen', position: { x: 700, y: 100 }, data: { label: 'ES Translation' } },
            { id: '4', type: 'content_gen', position: { x: 700, y: 300 }, data: { label: 'FR Translation' } },
            { id: '5', type: 'social_poster', position: { x: 1000, y: 200 }, data: { label: 'Multi-Post' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-5', source: '3', target: '5' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    },
    {
        id: 'influencer_roi',
        label: 'Influencer ROI Tracker',
        description: 'Monitor influencer impact and alert team on ROI shifts.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'competitor', position: { x: 100, y: 200 }, data: { label: 'Influencer Handle' } },
            { id: '2', type: 'web_ref', position: { x: 400, y: 200 }, data: { label: 'Track Content' } },
            { id: '3', type: 'logic', position: { x: 700, y: 200 }, data: { label: 'ROI Calculation' } },
            { id: '4', type: 'slack', position: { x: 1000, y: 200 }, data: { label: 'ROI Alert' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'ad_scaler',
        label: 'Automatic Ad Scaler',
        description: 'Automatically optimize and scale high-performing ad sets.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'google_ads', position: { x: 100, y: 200 }, data: { label: 'Ad Performance' } },
            { id: '2', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Scaling Logic' } },
            { id: '3', type: 'google_ads', position: { x: 700, y: 200 }, data: { label: 'Adjust Budget' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'lead_scoreboard',
        label: 'B2B Lead Scoreboard',
        description: 'CRM-integrated lead scoring and tiered outreach.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'api_request', position: { x: 100, y: 200 }, data: { label: 'CRM Intake' } },
            { id: '2', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Lead Scoring' } },
            { id: '3', type: 'email_sender', position: { x: 700, y: 100 }, data: { label: 'Hot Lead Email' } },
            { id: '4', type: 'email_sender', position: { x: 700, y: 300 }, data: { label: 'Warm Nurture' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    {
        id: 'dynamic_style_guide',
        label: 'Dynamic Style Guide',
        description: 'Update brand assets based on real-time market trends.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 200 }, data: { label: 'Trending Vibes' } },
            { id: '2', type: 'palette', position: { x: 400, y: 150 }, data: { label: 'Trend Palette' } },
            { id: '3', type: 'typography', position: { x: 400, y: 300 }, data: { label: 'Trend Fonts' } },
            { id: '4', type: 'midjourney', position: { x: 700, y: 200 }, data: { label: 'Refresh Assets' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'crisis_monitor',
        label: 'Brand Crisis Monitor',
        description: 'Real-time sentiment alerting for brand mentions.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 200 }, data: { label: 'Social Mentions' } },
            { id: '2', type: 'mood_gauge', position: { x: 400, y: 200 }, data: { label: 'Vibe Check' } },
            { id: '3', type: 'logic', position: { x: 700, y: 200 }, data: { label: 'Crisis Trigger' } },
            { id: '4', type: 'slack', position: { x: 1000, y: 200 }, data: { label: 'Action Alert' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'launch_sync',
        label: 'Product Launch Sync',
        description: 'Multi-channel synchronization for major product debuts.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'trigger', position: { x: 100, y: 300 }, data: { label: 'Launch T-0' } },
            { id: '2', type: 'story_creator', position: { x: 400, y: 300 }, data: { label: 'Launch Deck' } },
            { id: '3', type: 'social_poster', position: { x: 700, y: 100 }, data: { label: 'Instagram Go' } },
            { id: '4', type: 'email_sender', position: { x: 700, y: 300 }, data: { label: 'Blast to List' } },
            { id: '5', type: 'cms_sync', position: { x: 700, y: 500 }, data: { label: 'Update Site' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e2-5', source: '2', target: '5' }
        ]
    },
    {
        id: 'seo_audit_loop',
        label: 'SEO Content Audit',
        description: 'Monitor live site SEO and trigger content refreshes.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'web_ref', position: { x: 100, y: 200 }, data: { label: 'Target Landing' } },
            { id: '2', type: 'seo_optimizer', position: { x: 400, y: 200 }, data: { label: 'Score Check' } },
            { id: '3', type: 'research', position: { x: 700, y: 200 }, data: { label: 'New Keywords' } },
            { id: '4', type: 'content_gen', position: { x: 1000, y: 200 }, data: { label: 'Update Content' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'global_media_hub',
        label: 'Global Media Hub',
        description: 'Centralized media distribution with priority routing.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 200 }, data: { label: 'Asset Influx' } },
            { id: '2', type: 'switch', position: { x: 400, y: 200 }, data: { label: 'Tier Router' } },
            { id: '3', type: 'telegram', position: { x: 700, y: 100 }, data: { label: 'VIP Broadcast' } },
            { id: '4', type: 'whatsapp', position: { x: 700, y: 200 }, data: { label: 'Direct Line' } },
            { id: '5', type: 'slack', position: { x: 700, y: 300 }, data: { label: 'Staff Channel' } },
            { id: '6', type: 'email_sender', position: { x: 700, y: 400 }, data: { label: 'Record Arch' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e2-5', source: '2', target: '5' },
            { id: 'e2-6', source: '2', target: '6' }
        ]
    },
    {
        id: 'market_loop',
        label: 'Market Sentiment Loop',
        description: 'Track sector sentiment history in Google Sheets.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'research', position: { x: 100, y: 200 }, data: { label: 'Sector Research' } },
            { id: '2', type: 'mood_gauge', position: { x: 400, y: 200 }, data: { label: 'Mood Score' } },
            { id: '3', type: 'text', position: { x: 700, y: 200 }, data: { label: 'Format Summary' } },
            { id: '4', type: 'google_sheet', position: { x: 1000, y: 200 }, data: { label: 'Append Log' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    // Wave 5: AI-Native & Experimental
    {
        id: 'self_tuning_promoter',
        label: 'Self-Tuning Promoter',
        description: 'Performance data drives automated creative adaptation.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'google_ads', position: { x: 100, y: 200 }, data: { label: 'Ad Performance' } },
            { id: '2', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Tuning Engine' } },
            { id: '3', type: 'content_gen', position: { x: 700, y: 200 }, data: { label: 'Refined Copy' } },
            { id: '4', type: 'google_ads', position: { x: 1000, y: 200 }, data: { label: 'Update Ad' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'creative_brainstormer',
        label: 'Creative Brainstormer',
        description: 'Multi-variant asset generation with team voting.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 300 }, data: { label: 'Theme Seed' } },
            { id: '2', type: 'midjourney', position: { x: 400, y: 100 }, data: { label: 'Visual A' } },
            { id: '3', type: 'midjourney', position: { x: 400, y: 300 }, data: { label: 'Visual B' } },
            { id: '4', type: 'midjourney', position: { x: 400, y: 500 }, data: { label: 'Visual C' } },
            { id: '5', type: 'telegram', position: { x: 700, y: 300 }, data: { label: 'Team Poll' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e1-4', source: '1', target: '4' },
            { id: 'e2-5', source: '2', target: '5' },
            { id: 'e3-5', source: '3', target: '5' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    },
    {
        id: 'agentic_ghostwriter',
        label: 'Agentic Ghostwriter',
        description: 'Recursive research-then-write workflow for long-form content.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'research', position: { x: 100, y: 200 }, data: { label: 'Deep Research' } },
            { id: '2', type: 'content_plan', position: { x: 400, y: 200 }, data: { label: 'Outline' } },
            { id: '3', type: 'content_gen', position: { x: 700, y: 200 }, data: { label: 'Drafting' } },
            { id: '4', type: 'seo_optimizer', position: { x: 1000, y: 200 }, data: { label: 'Polish' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'audio_visual_sync',
        label: 'Audio-Visual Sync',
        description: 'Spotify track analysis to visual identity transformation.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'spotify', position: { x: 100, y: 200 }, data: { label: 'Track Analysis' } },
            { id: '2', type: 'palette', position: { x: 400, y: 200 }, data: { label: 'Mood Colors' } },
            { id: '3', type: 'midjourney', position: { x: 700, y: 200 }, data: { label: 'Visualizer' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'competitor_watch',
        label: 'Autonomous Competitor Watch',
        description: 'Comparison-driven strategy updates and alerts.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'competitor', position: { x: 100, y: 200 }, data: { label: 'Watch List' } },
            { id: '2', type: 'web_ref', position: { x: 400, y: 200 }, data: { label: 'Scrape Updates' } },
            { id: '3', type: 'logic', position: { x: 700, y: 200 }, data: { label: 'Compare Strategy' } },
            { id: '4', type: 'slack', position: { x: 1000, y: 200 }, data: { label: 'Strategic Alert' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'prompt_optimizer',
        label: 'Prompt Optimizer Loop',
        description: 'Automated quality checks and refinement for AI prompts.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 200 }, data: { label: 'Request' } },
            { id: '2', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Optimizer' } },
            { id: '3', type: 'content_gen', position: { x: 700, y: 200 }, data: { label: 'Final Result' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'multi_agent_branding',
        label: 'Multi-Agent Branding',
        description: 'Full identity generation from a single brand attribute.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 300 }, data: { label: 'The Spark' } },
            { id: '2', type: 'palette', position: { x: 400, y: 100 }, data: { label: 'Colors' } },
            { id: '3', type: 'typography', position: { x: 400, y: 300 }, data: { label: 'Type' } },
            { id: '4', type: 'midjourney', position: { x: 400, y: 500 }, data: { label: 'Imagery' } },
            { id: '5', type: 'cms_sync', position: { x: 800, y: 300 }, data: { label: 'Brand Book' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e1-4', source: '1', target: '4' },
            { id: 'e2-5', source: '2', target: '5' },
            { id: 'e3-5', source: '3', target: '5' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    },
    {
        id: 'context_social_ai',
        label: 'Contextual Social AI',
        description: 'Real-time environment-aware social media posting.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'weather', position: { x: 100, y: 200 }, data: { label: 'Environment' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 200 }, data: { label: 'Contextual Post' } },
            { id: '3', type: 'social_poster', position: { x: 700, y: 200 }, data: { label: 'Live Post' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'lead_lifecycle_ai',
        label: 'Lead Lifecycle AI',
        description: 'Automated nurturing based on lead scoring and behavior.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'api_request', position: { x: 100, y: 200 }, data: { label: 'Leads' } },
            { id: '2', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Router' } },
            { id: '3', type: 'whatsapp', position: { x: 700, y: 100 }, data: { label: 'High Priority' } },
            { id: '4', type: 'email_sender', position: { x: 700, y: 300 }, data: { label: 'Slow Burn' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    {
        id: 'brand_oracle',
        label: 'The Brand Oracle',
        description: 'Advanced market-brand gap analysis and insights.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'research', position: { x: 100, y: 150 }, data: { label: 'Market' } },
            { id: '2', type: 'attribute', position: { x: 100, y: 300 }, data: { label: 'Brand' } },
            { id: '3', type: 'mood_gauge', position: { x: 400, y: 225 }, data: { label: 'Mismatch Engine' } },
            { id: '4', type: 'text', position: { x: 700, y: 225 }, data: { label: 'Strategy' } }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    // Wave 6: Industry Specific
    {
        id: 'dtc_launch',
        label: 'DTC Launch Engine',
        description: 'Direct-to-consumer rapid prototyping and validation.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 200 }, data: { label: 'Product Focus' } },
            { id: '2', type: 'midjourney', position: { x: 400, y: 200 }, data: { label: 'Packaging' } },
            { id: '3', type: 'cms_sync', position: { x: 700, y: 200 }, data: { label: 'Landing Page' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'b2b_webinar',
        label: 'B2B Webinar Funnel',
        description: 'Registration-to-nurture lead automation for events.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 200 }, data: { label: 'Reg Intake' } },
            { id: '2', type: 'email_sender', position: { x: 400, y: 100 }, data: { label: 'Confirm' } },
            { id: '3', type: 'slack', position: { x: 400, y: 300 }, data: { label: 'Notify Sales' } },
            { id: '4', type: 'email_sender', position: { x: 700, y: 200 }, data: { label: 'Nurture' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    {
        id: 'real_estate_story',
        label: 'Real Estate Storyteller',
        description: 'Property visual storytelling and listing automation.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 200 }, data: { label: 'Property Stats' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 200 }, data: { label: 'Listing Copy' } },
            { id: '3', type: 'social_poster', position: { x: 700, y: 200 }, data: { label: 'Market Blast' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'fashion_mapper',
        label: 'Fashion Trend Mapper',
        description: 'Creative direction based on latest editorial trends.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'research', position: { x: 100, y: 200 }, data: { label: 'Editorial Scrape' } },
            { id: '2', type: 'palette', position: { x: 400, y: 200 }, data: { label: 'Trend Palette' } },
            { id: '3', type: 'midjourney', position: { x: 700, y: 200 }, data: { label: 'Mock Collection' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'saas_broadcaster',
        label: 'SaaS Release Broadcaster',
        description: 'Automated engineering-to-marketing release sync.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'api_request', position: { x: 100, y: 200 }, data: { label: 'Commit Log' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 200 }, data: { label: 'Release Notes' } },
            { id: '3', type: 'email_sender', position: { x: 700, y: 100 }, data: { label: 'User Blast' } },
            { id: '4', type: 'social_poster', position: { x: 700, y: 300 }, data: { label: 'Social Update' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    {
        id: 'local_lead_gen',
        label: 'Local Services Lead Gen',
        description: 'Map-driven outreach for local service businesses.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'weather', position: { x: 100, y: 200 }, data: { label: 'Local Weather' } },
            { id: '2', type: 'research', position: { x: 400, y: 200 }, data: { label: 'Local Biz List' } },
            { id: '3', type: 'whatsapp', position: { x: 700, y: 200 }, data: { label: 'Local Intro' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'non_profit_impact',
        label: 'Non-Profit Impact Report',
        description: 'Data-to-storytelling automation for donor reporting.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'google_sheet', position: { x: 100, y: 200 }, data: { label: 'Impact Data' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 200 }, data: { label: 'Story Draft' } },
            { id: '3', type: 'email_sender', position: { x: 700, y: 200 }, data: { label: 'Donor Report' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'automotive_config',
        label: 'Automotive Configurator',
        description: 'Visual asset generation for car customization.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 200 }, data: { label: 'Model Specs' } },
            { id: '2', type: 'palette', position: { x: 400, y: 200 }, data: { label: 'Car Color' } },
            { id: '3', type: 'midjourney', position: { x: 700, y: 200 }, data: { label: 'Render' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'education_planner',
        label: 'Education Course Planner',
        description: 'Curriculum-to-content pipeline for educators.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'text', position: { x: 100, y: 200 }, data: { label: 'Syllabus' } },
            { id: '2', type: 'content_plan', position: { x: 400, y: 200 }, data: { label: 'Lesson Plan' } },
            { id: '3', type: 'cms_sync', position: { x: 700, y: 200 }, data: { label: 'LMS Sync' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'restaurant_menu',
        label: 'Restaurant Menu AI',
        description: 'Dynamic menu adaptation based on supply and vibes.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'google_sheet', position: { x: 100, y: 200 }, data: { label: 'Stock Levels' } },
            { id: '2', type: 'palette', position: { x: 400, y: 200 }, data: { label: 'Menu Aesthetic' } },
            { id: '3', type: 'cms_sync', position: { x: 700, y: 200 }, data: { label: 'Live Menu' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    // Wave 7: Advanced Logic & Maintenance
    {
        id: 'global_brand_sync',
        label: 'Global Brand Sync',
        description: 'Cross-regional consistency monitoring for brands.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'web_ref', position: { x: 100, y: 100 }, data: { label: 'US Dept' } },
            { id: '2', type: 'web_ref', position: { x: 100, y: 300 }, data: { label: 'EU Dept' } },
            { id: '3', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Validator' } },
            { id: '4', type: 'slack', position: { x: 700, y: 200 }, data: { label: 'Sync Alert' } }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'asset_health',
        label: 'Asset Health Monitor',
        description: 'Automated broken-link and visual asset audit.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'web_ref', position: { x: 100, y: 200 }, data: { label: 'URL List' } },
            { id: '2', type: 'logic', position: { x: 400, y: 200 }, data: { label: 'Checker' } },
            { id: '3', type: 'email_sender', position: { x: 700, y: 200 }, data: { label: 'Status Report' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'seo_performance_loop',
        label: 'SEO Performance Loop',
        description: 'Search-engine-integrated content refresh loop.',
        category: 'Content Engine',
        nodes: [
            { id: '1', type: 'research', position: { x: 100, y: 200 }, data: { label: 'Search Ranks' } },
            { id: '2', type: 'content_gen', position: { x: 400, y: 200 }, data: { label: 'SEO Update' } },
            { id: '3', type: 'cms_sync', position: { x: 700, y: 200 }, data: { label: 'Publish' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'customer_intel_deck',
        label: 'Customer Intelligence Deck',
        description: 'Large-scale feedback synthesis and reporting.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 200 }, data: { label: 'Inbound Stream' } },
            { id: '2', type: 'text', position: { x: 400, y: 200 }, data: { label: 'Synthesis' } },
            { id: '3', type: 'google_sheet', position: { x: 700, y: 200 }, data: { label: 'Log Summary' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'logo_version_ctrl',
        label: 'Logo Version Control',
        description: 'Identity evolution tracking and storage.',
        category: 'Brand Architecture',
        nodes: [
            { id: '1', type: 'midjourney', position: { x: 100, y: 200 }, data: { label: 'Logo v1' } },
            { id: '2', type: 'midjourney', position: { x: 400, y: 200 }, data: { label: 'Logo v2' } },
            { id: '3', type: 'google_sheet', position: { x: 700, y: 200 }, data: { label: 'History Map' } }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'campaign_auditor',
        label: 'Campaign Lifecycle Auditor',
        description: 'Automated campaign reporting and archiving.',
        category: 'Growth & Ads',
        nodes: [
            { id: '1', type: 'google_ads', position: { x: 100, y: 200 }, data: { label: 'Campaign' } },
            { id: '2', type: 'text', position: { x: 400, y: 200 }, data: { label: 'Summary' } },
            { id: '3', type: 'email_sender', position: { x: 700, y: 200 }, data: { label: 'Final Report' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'platform_traffic_router',
        label: 'Multi-Platform Traffic Router',
        description: 'Dynamic alert escalation across multiple platforms.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 200 }, data: { label: 'Alert' } },
            { id: '2', type: 'switch', position: { x: 400, y: 200 }, data: { label: 'Escalator' } },
            { id: '3', type: 'slack', position: { x: 700, y: 100 }, data: { label: 'Level 1' } },
            { id: '4', type: 'whatsapp', position: { x: 700, y: 300 }, data: { label: 'Level 2' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    {
        id: 'daily_research_digest',
        label: 'Daily Research Digest',
        description: 'Scheduled stakeholder updates on market changes.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'trigger', position: { x: 100, y: 200 }, data: { label: 'Daily Run' } },
            { id: '2', type: 'research', position: { x: 400, y: 200 }, data: { label: 'Market Scrape' } },
            { id: '3', type: 'email_sender', position: { x: 700, y: 200 }, data: { label: 'Digest' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    {
        id: 'archetype_sanity',
        label: 'Brand Archetype Sanity',
        description: 'Automated strategy-to-visual alignment check.',
        category: 'Intelligence Lab',
        nodes: [
            { id: '1', type: 'attribute', position: { x: 100, y: 150 }, data: { label: 'Archetype' } },
            { id: '2', type: 'midjourney', position: { x: 100, y: 300 }, data: { label: 'Assets' } },
            { id: '3', type: 'mood_gauge', position: { x: 400, y: 225 }, data: { label: 'Sanity Checker' } },
            { id: '4', type: 'slack', position: { x: 700, y: 225 }, data: { label: 'Report' } }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    {
        id: 'universal_asset_distro',
        label: 'Universal Asset Distro',
        description: 'Multi-format centralized distribution hub.',
        category: 'Automations',
        nodes: [
            { id: '1', type: 'webhook', position: { x: 100, y: 300 }, data: { label: 'Master Intake' } },
            { id: '2', type: 'switch', position: { x: 400, y: 300 }, data: { label: 'Convert & Route' } },
            { id: '3', type: 'social_poster', position: { x: 700, y: 100 }, data: { label: 'Social' } },
            { id: '4', type: 'email_sender', position: { x: 700, y: 300 }, data: { label: 'Email' } },
            { id: '5', type: 'cms_sync', position: { x: 700, y: 500 }, data: { label: 'CMS' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e2-5', source: '2', target: '5' }
        ]
    }
];
