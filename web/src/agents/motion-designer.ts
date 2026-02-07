import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Motion Designer Agent - The animation specialist
export const MotionDesignerAgent: Agent = {
  id: 'motion-designer',
  name: 'Motion Designer',
  type: AgentType.MOTION_DESIGNER,
  status: 'active' as any,
  description: 'Animation and motion graphics expert responsible for creating engaging animated content, visual effects, and interactive motion experiences. Brings static designs to life through compelling motion.',
  avatar: 'motion-designer.svg',
  config: {
    model: 'claude-3-sonnet',
    temperature: 0.6,
    maxTokens: 3072,
    systemPrompt: `You are a skilled Motion Designer with 6+ years of experience in animation, motion graphics, and visual effects. You excel at creating compelling motion that enhances brand storytelling and user engagement.

Your responsibilities:
- Create engaging motion graphics and animations
- Design animated logos and brand identities
- Develop video content for marketing and social media
- Create interactive motion experiences
- Ensure motion consistency with brand guidelines
- Optimize motion for various platforms and formats

Your expertise includes:
- Motion graphics and animation principles
- Video editing and post-production
- Character animation and rigging
- Visual effects and compositing
- Interactive animation and prototyping
- 3D modeling and animation
- Software expertise (After Effects, Cinema 4D, Blender, etc.)

Communication style: Creative, technical, visual-thinking, and detail-oriented. You understand how motion enhances brand communication and user experience.`,
    skills: [
      {
        id: 'motion-graphics',
        name: 'Motion Graphics',
        description: 'Create compelling motion graphics and animated content',
        capability: AgentCapability.PROMPT_GENERATION,
        level: 9,
        isActive: true,
        config: {
          techniques: ['2D-animation', 'motion-typography', 'infographic-animation', 'logo-animation'],
          tools: ['After Effects', 'Cinema 4D', 'Blender', 'Premiere Pro', 'Final Cut Pro'],
          deliverables: ['animated-logos', 'social-media-videos', 'explainer-videos', 'advertising-animations']
        }
      },
      {
        id: 'brand-animation',
        name: 'Brand Animation',
        description: 'Develop animated brand identities and motion systems',
        capability: AgentCapability.WORKFLOW_AUTOMATION,
        level: 8,
        isActive: true,
        config: {
          elements: ['animated-logos', 'motion-guidelines', 'brand-transitions', 'loading-animations'],
          principles: ['brand-consistency', 'motion-branding', 'user-experience', 'technical-optimization'],
          applications: ['websites', 'apps', 'social-media', 'presentations', 'advertisements']
        }
      },
      {
        id: 'video-production',
        name: 'Video Production',
        description: 'Complete video production from concept to final edit',
        capability: AgentCapability.ASSET_ANALYSIS,
        level: 8,
        isActive: true,
        config: {
          workflow: ['storyboarding', 'filming', 'editing', 'sound-design', 'color-grading', 'final-export'],
          types: ['promotional-videos', 'product-demonstrations', 'interviews', 'event-coverage'],
          platforms: ['social-media', 'website', 'presentations', 'broadcast', 'internal-communications']
        }
      }
    ],
    personality: {
      tone: 'creative',
      verbosity: 'detailed'
    }
  },
  createdAt: Date.now(),
  lastActive: Date.now(),
  performance: {
    tasksCompleted: 0,
    successRate: 90,
    averageResponseTime: 160
  }
};

// Motion designer specific workflows
export const MotionDesignerWorkflows = {
  animationProduction: {
    name: 'Animation Production Pipeline',
    phases: [
      {
        phase: 'Concept & Storyboard',
        duration: '1-2 days',
        activities: ['Concept development', 'Storyboard creation', 'Style frames', 'Timing planning'],
        deliverables: ['Concept sketches', 'Storyboards', 'Style frames', 'Animatics']
      },
      {
        phase: 'Asset Creation',
        duration: '2-4 days',
        activities: ['Illustration', 'Asset preparation', 'Rigging', 'Setup'],
        deliverables: ['Illustrated assets', 'Rigged characters', 'Scene elements', 'Asset library']
      },
      {
        phase: 'Animation',
        duration: '3-5 days',
        activities: ['Keyframing', 'Timing refinement', 'Motion polish', 'Effects integration'],
        deliverables: ['Rough animation', 'Polished motion', 'Effects passes', 'Integration tests']
      },
      {
        phase: 'Post-Production',
        duration: '1-2 days',
        activities: ['Compositing', 'Color grading', 'Sound design', 'Export optimization'],
        deliverables: ['Final animations', 'Various formats', 'Sound effects', 'Quality checks']
      }
    ],
    qualityStandards: ['Visual appeal', 'Brand consistency', 'Technical quality', 'Optimization']
  },
  brandMotionSystems: {
    name: 'Brand Motion System Development',
    components: [
      'Animated logo variations and transitions',
      'Motion principles and guidelines',
      'Loading and micro-interactions',
      'Typography animation styles',
      'Transition and overlay animations',
      'Error and success animations'
    ],
    applications: ['Websites', 'Mobile apps', 'Presentations', 'Social media', 'Digital advertising'],
    considerations: ['Brand personality', 'User experience', 'Performance optimization', 'Platform guidelines']
  },
  multiPlatformOptimization: {
    name: 'Multi-Platform Video Optimization',
    platforms: [
      {
        platform: 'Social Media (Instagram/TikTok)',
        specs: ['9:16 vertical', '15-60 seconds', 'Mobile-first', 'Trending audio'],
        optimizations: ['Quick hooks', 'Vertical framing', 'Text overlays', 'Engagement pacing']
      },
      {
        platform: 'Website/Digital',
        specs: ['16:9 or 1:1', '5-120 seconds', 'Auto-play ready', 'Looping'],
        optimizations: ['Compression', 'Loading optimization', 'Bandwidth consideration', 'Accessibility']
      },
      {
        platform: 'Presentations',
        specs: ['16:9 standard', 'Various lengths', 'Professional tone', 'Brand alignment'],
        optimizations: ['Clean visuals', 'Clear messaging', 'Professional polish', 'Export quality']
      }
    ]
  }
};

// Animation techniques and styles
export const MotionDesignerTechniques = {
  animationStyles: {
    name: 'Animation Style Expertise',
    styles: [
      {
        name: '2D Motion Graphics',
        description: 'Flat design animation with focus on typography and shapes',
        applications: ['Explainer videos', 'Logo animations', 'Infographics', 'Social media content'],
        tools: ['After Effects', 'Animate', 'Lottie', 'Spine']
      },
      {
        name: 'Character Animation',
        description: 'Animated characters with personality and storytelling',
        applications: ['Brand mascots', 'Storytelling', 'Educational content', 'Entertainment'],
        tools: ['After Effects', 'Cinema 4D', 'Blender', 'Toon Boom']
      },
      {
        name: '3D Animation',
        description: 'Three-dimensional animation with depth and realism',
        applications: ['Product visualization', 'Architectural visualization', 'Complex animations'],
        tools: ['Cinema 4D', 'Blender', 'Maya', '3ds Max']
      },
      {
        name: 'Stop Motion',
        description: 'Frame-by-frame physical animation',
        applications: ['Hand-crafted content', 'Unique brand expression', 'Artistic projects'],
        tools: ['Dragonframe', 'Camera equipment', 'Physical materials']
      }
    ]
  },
  motionPrinciples: {
    name: '12 Principles of Animation',
    principles: [
      'Squash and Stretch - Adding flexibility and weight',
      'Anticipation - Preparing for action',
      'Staging - Clear presentation of ideas',
      'Straight Ahead and Pose to Pose - Animation approaches',
      'Follow Through and Overlapping Action - Natural movement',
      'Slow In and Slow Out - Realistic acceleration',
      'Arcs - Natural curved paths',
      'Secondary Action - Supporting movements',
      'Timing - Speed and rhythm control',
      'Exaggeration - Emphasizing actions',
      'Solid Drawing - Three-dimensional form',
      'Appeal - Character design and personality'
    ]
  }
};

// Technical specifications
export const MotionDesignerTechnicalSpecs = {
  videoFormats: {
    socialMedia: {
      instagram: ['1:1 (1080x1080)', '4:5 (1080x1350)', '9:16 (1080x1920)'],
      tiktok: ['9:16 (1080x1920)', '1:1 (1080x1080)'],
      facebook: ['16:9 (1280x720)', '1:1 (1080x1080)', '4:5 (1080x1350)'],
      linkedin: ['16:9 (1920x1080)', '1:1 (1080x1080)']
    },
    web: {
      standard: ['16:9 (1920x1080)', '1:1 (1080x1080)', '9:16 (1080x1920)'],
      adaptive: ['Responsive video containers', 'Multiple resolutions', 'Loading optimization']
    },
    broadcast: {
      television: ['1920x1080 (Full HD)', '3840x2160 (4K)'],
      cinema: ['1998x1080 (2K)', '3996x2160 (4K)', '7980x4320 (8K)']
    }
  },
  compression: {
    codecs: ['H.264', 'H.265', 'VP9', 'AV1'],
    formats: ['MP4', 'MOV', 'WebM', 'GIF'],
    optimization: ['File size vs quality', 'Platform requirements', 'Loading speed', 'Compatibility']
  },
  accessibility: {
    features: ['Captions and subtitles', 'Audio descriptions', 'Visual indicators', 'Alternative formats'],
    standards: ['WCAG compliance', 'Keyboard navigation', 'Screen reader compatibility'],
    tools: ['Captioning software', 'Accessibility testing', 'User testing']
  }
};

// Project templates
export const MotionDesignerProjectTemplates = {
  animationBrief: {
    structure: [
      'Project overview and objectives',
      'Target audience and platform',
      'Animation style and mood',
      'Duration and format requirements',
      'Brand guidelines integration',
      'Technical specifications',
      'Deliverables and timeline',
      'Success criteria'
    ]
  },
  storyboardTemplate: {
    elements: [
      'Scene number and description',
      'Visual frame sketch',
      'Animation notes and timing',
      'Audio and sound notes',
      'Text and overlay elements',
      'Technical considerations'
    ]
  },
  productionChecklist: {
    preProduction: ['Concept approval', 'Storyboards completed', 'Assets prepared', 'Technical specs defined'],
    production: ['Animation quality', 'Timing optimization', 'Brand consistency', 'Technical standards'],
    postProduction: ['Audio mix', 'Color grading', 'Export optimization', 'Format conversion', 'Quality testing']
  }
};
