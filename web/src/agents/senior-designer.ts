import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Senior Designer Agent - The design execution expert
export const SeniorDesignerAgent: Agent = {
  id: 'senior-designer',
  name: 'Senior Designer',
  type: AgentType.SENIOR_DESIGNER,
  status: 'active' as any,
  description: 'Design execution specialist with expertise in multiple design disciplines. Creates stunning visual assets with precision, creativity, and brand consistency.',
  avatar: 'senior-designer.svg',
  config: {
    model: 'claude-3-sonnet',
    temperature: 0.6,
    maxTokens: 3072,
    systemPrompt: `You are a talented Senior Designer with 8+ years of experience across multiple design disciplines. You excel at creating exceptional visual assets while maintaining brand consistency and pushing creative boundaries.

Your responsibilities:
- Execute high-quality design work across multiple media
- Ensure brand consistency in all design deliverables
- Collaborate with creative team to develop concepts
- Mentor junior designers and share expertise
- Adapt designs for various platforms and formats
- Stay current with design trends and technologies

Your expertise includes:
- Graphic design and visual communication
- Digital design and interactive experiences
- Typography and layout design
- Color theory and application
- Brand identity implementation
- Design software mastery (Adobe Creative Suite, Figma, Sketch)
- Print and digital production

Communication style: Creative, precise, collaborative, and solution-oriented. You focus on excellent execution while maintaining creative vision.`,
    skills: [
      {
        id: 'graphic-design',
        name: 'Graphic Design',
        description: 'Expert graphic design and visual communication',
        capability: AgentCapability.ASSET_ANALYSIS,
        level: 9,
        isActive: true,
        config: {
          specialties: ['print-design', 'digital-design', 'typography', 'layout', 'brand-identity'],
          tools: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Sketch', 'After Effects'],
          deliverables: ['logos', 'brochures', 'websites', 'social-media', 'packaging', 'advertisements']
        }
      },
      {
        id: 'brand-implementation',
        name: 'Brand Implementation',
        description: 'Expert application of brand guidelines and identity',
        capability: AgentCapability.WORKFLOW_AUTOMATION,
        level: 8,
        isActive: true,
        config: {
          activities: ['guideline-application', 'brand-consistency', 'visual-identity', 'multi-platform-adaptation'],
          considerations: ['brand-essence', 'target-audience', 'platform-requirements', 'production-constraints'],
          quality: ['accuracy', 'consistency', 'creativity', 'technical-excellence']
        }
      },
      {
        id: 'creative-execution',
        name: 'Creative Execution',
        description: 'Transform concepts into exceptional visual designs',
        capability: AgentCapability.PROMPT_GENERATION,
        level: 9,
        isActive: true,
        config: {
          process: ['concept-development', 'visual-exploration', 'design-refinement', 'final-production'],
          focus: ['creative-excellence', 'brand-alignment', 'user-experience', 'technical-quality'],
          collaboration: ['art-direction', 'creative-feedback', 'team-collaboration', 'client-presentation']
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
    successRate: 92,
    averageResponseTime: 120
  }
};

// Senior designer specific workflows
export const SeniorDesignerWorkflows = {
  designExecution: {
    name: 'Design Project Execution',
    phases: [
      {
        phase: 'Concept Development',
        duration: '4-8 hours',
        activities: ['Brief analysis', 'Research and mood boarding', 'Initial sketches', 'Creative exploration'],
        deliverables: ['Concept sketches', 'Mood boards', 'Initial ideas']
      },
      {
        phase: 'Design Development',
        duration: '1-3 days',
        activities: ['Digital execution', 'Layout refinement', 'Typography application', 'Color development'],
        deliverables: ['Design concepts', 'Layout variations', 'Typography studies', 'Color applications']
      },
      {
        phase: 'Refinement & Production',
        duration: '1-2 days',
        activities: ['Design refinement', 'Client feedback incorporation', 'Production preparation', 'Quality assurance'],
        deliverables: ['Final designs', 'Production files', 'Design specifications', 'Usage guidelines']
      }
    ],
    qualityStandards: ['Brand consistency', 'Visual excellence', 'Technical precision', 'Creative innovation']
  },
  multiPlatformDesign: {
    name: 'Multi-Platform Design Adaptation',
    platforms: [
      {
        platform: 'Web Design',
        considerations: ['Responsive layouts', 'User experience', 'Loading optimization', 'Browser compatibility'],
        deliverables: ['Web layouts', 'Mobile designs', 'Interactive elements', 'Design systems']
      },
      {
        platform: 'Print Design',
        considerations: ['Print specifications', 'Color management', 'Bleed and margins', 'Production requirements'],
        deliverables: ['Print ads', 'Brochures', 'Packaging', 'Signage']
      },
      {
        platform: 'Social Media',
        considerations: ['Platform specifications', 'Engagement optimization', 'Trend awareness', 'Brand consistency'],
        deliverables: ['Instagram posts', 'Facebook ads', 'Twitter graphics', 'LinkedIn content']
      },
      {
        platform: 'Environmental Design',
        considerations: ['Large scale applications', 'Material considerations', 'Viewing distance', 'Installation requirements'],
        deliverables: ['Trade show graphics', 'Retail displays', 'Vehicle graphics', 'Signage']
      }
    ]
  },
  mentorshipAndLeadership: {
    name: 'Design Mentorship and Leadership',
    responsibilities: [
      'Mentor junior designers in technical skills',
      'Share design best practices and techniques',
      'Lead design reviews and critique sessions',
      'Contribute to design system development',
      'Participate in creative brainstorming',
      'Represent design quality standards'
    ],
    mentoringAreas: ['Technical skills', 'Creative thinking', 'Brand understanding', 'Professional development', 'Client communication']
  }
};

// Design expertise areas
export const SeniorDesignerExpertise = {
  graphicDesign: {
    name: 'Graphic Design Mastery',
    specializations: [
      'Brand identity and logo design',
      'Print design and production',
      'Digital design and interfaces',
      'Marketing and advertising design',
      'Package design',
      'Editorial and publication design'
    ],
    technicalSkills: [
      'Typography and typesetting',
      'Color theory and application',
      'Layout and composition',
      'Image editing and manipulation',
      'Illustration and vector graphics',
      'Design software mastery'
    ],
    creativeSkills: [
      'Concept development',
      'Visual storytelling',
      'Creative problem-solving',
      'Trend awareness',
      'Brand interpretation'
    ]
  },
  digitalDesign: {
    name: 'Digital Design Excellence',
    platforms: ['Web', 'Mobile', 'Social media', 'Email', 'Digital advertising'],
    skills: [
      'Responsive design',
      'User interface design',
      'Interactive elements',
      'Animation and motion',
      'Digital illustration',
      'Asset optimization'
    ],
    tools: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects'],
    considerations: ['User experience', 'Platform guidelines', 'Loading optimization', 'Accessibility']
  },
  brandImplementation: {
    name: 'Brand Implementation Expertise',
    activities: [
      'Brand guideline application',
      'Consistency across touchpoints',
      'Brand expression adaptation',
      'Quality assurance',
      'Brand evolution support'
    ],
    brandElements: ['Logo usage', 'Color application', 'Typography implementation', 'Imagery style', 'Design patterns'],
    adaptation: ['Platform-specific', 'Campaign-specific', 'Target audience adaptation', 'Market localization']
  }
};

// Design project templates
export const SeniorDesignerTemplates = {
  projectKickoff: {
    structure: [
      'Project overview and objectives',
      'Brand guidelines and constraints',
      'Target audience and context',
      'Technical specifications',
      'Deliverables and timeline',
      'Success criteria and quality standards',
      'Communication plan',
      'Creative approach and initial ideas'
    ]
  },
  designPresentation: {
    structure: [
      'Project context and objectives',
      'Design concept and rationale',
      'Visual execution examples',
      'Technical considerations',
      'Brand consistency verification',
      'Multi-platform applications',
      'Next steps and implementation'
    ],
    presentationStyle: 'Professional, visual, persuasive, brand-aligned'
  },
  productionHandoff: {
    components: [
      'Final design files',
      'Technical specifications',
      'Color and font specifications',
      'Usage guidelines',
      'File organization',
      'Quality checklists',
      'Contact information for questions'
    ]
  }
};

// Quality assurance framework
export const SeniorDesignerQualityFramework = {
  preProduction: {
    checks: [
      'Brand guideline compliance',
      'Technical specifications review',
      'Typography accuracy',
      'Color verification',
      'Resolution and scaling',
      'File preparation',
      'Cross-platform testing'
    ],
    tools: ['Adobe Creative Suite', 'Figma', 'Quality check software', 'Brand guideline tools']
  },
  creativeReview: {
    criteria: [
      'Concept strength and originality',
      'Visual hierarchy and flow',
      'Composition and balance',
      'Brand consistency',
      'Target audience relevance',
      'Technical excellence',
      'Innovation and creativity'
    ],
    reviewProcess: ['Self-review', 'Peer review', 'Art director review', 'Brand strategist review']
  },
  productionReadiness: {
    verification: [
      'File format compliance',
      'Color profile accuracy',
      'Resolution requirements',
      'Bleed and margin settings',
      'Font embedding',
      'Layer organization',
      'Export settings optimization'
    ],
    testing: ['Print proof', 'Digital testing', 'Cross-browser testing', 'Mobile testing']
  }
};
