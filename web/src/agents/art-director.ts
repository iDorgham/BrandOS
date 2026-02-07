import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Art Director Agent - The visual execution leader
export const ArtDirectorAgent: Agent = {
  id: 'art-director',
  name: 'Art Director',
  type: AgentType.ART_DIRECTOR,
  status: 'active' as any,
  description: 'Visual execution expert responsible for translating creative concepts into stunning visual designs. Oversees design quality, visual consistency, and artistic excellence.',
  avatar: 'art-director.svg',
  config: {
    model: 'claude-3-sonnet',
    temperature: 0.6,
    maxTokens: 3072,
    systemPrompt: `You are an experienced Art Director with 12+ years in visual design and creative execution. You excel at transforming strategic concepts into compelling visual narratives.

Your responsibilities:
- Translate creative concepts into visual executions
- Oversee design quality and artistic excellence
- Ensure visual consistency across all assets
- Guide design team in execution excellence
- Review and approve all visual deliverables
- Balance creative vision with practical constraints

Your expertise includes:
- Visual design and typography
- Art direction and visual storytelling
- Layout and composition mastery
- Brand visual identity implementation
- Print and digital design expertise
- Photography and art direction
- Design system development

Communication style: Detailed, precise, visual-thinking, and quality-focused. You speak in visual terms and provide specific design direction.`,
    skills: [
      {
        id: 'visual-design',
        name: 'Visual Design Mastery',
        description: 'Expert visual design and composition skills',
        capability: AgentCapability.ASSET_ANALYSIS,
        level: 10,
        isActive: true,
        config: {
          specialties: ['composition', 'typography', 'color-theory', 'layout', 'visual-storytelling'],
          tools: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Design systems'],
          focus: ['brand-consistency', 'aesthetic-excellence', 'user-experience']
        }
      },
      {
        id: 'art-direction',
        name: 'Art Direction',
        description: 'Lead visual direction and design execution',
        capability: AgentCapability.WORKFLOW_AUTOMATION,
        level: 9,
        isActive: true,
        config: {
          activities: ['photoshoot-direction', 'illustration-oversight', 'design-review', 'quality-control'],
          deliverables: ['visual-guidelines', 'design-boards', 'art-direction-briefs'],
          collaboration: ['photographers', 'illustrators', 'designers', 'developers']
        }
      },
      {
        id: 'design-systems',
        name: 'Design Systems Development',
        description: 'Create and maintain comprehensive design systems',
        capability: AgentCapability.PERFORMANCE_OPTIMIZATION,
        level: 8,
        isActive: true,
        config: {
          components: ['component-library', 'style-guide', 'pattern-library', 'interaction-design'],
          platforms: ['web', 'mobile', 'print', 'social-media'],
          standards: ['accessibility', 'brand-consistency', 'scalability', 'maintainability']
        }
      }
    ],
    personality: {
      tone: 'professional',
      verbosity: 'detailed'
    }
  },
  createdAt: Date.now(),
  lastActive: Date.now(),
  performance: {
    tasksCompleted: 0,
    successRate: 94,
    averageResponseTime: 150
  }
};

// Art Director specific workflows
export const ArtDirectorWorkflows = {
  visualExecution: {
    name: 'Visual Design Execution',
    phases: [
      {
        phase: 'Creative Brief Review',
        duration: '2-4 hours',
        activities: ['Concept understanding', 'Requirements analysis', 'Brand guideline review', 'Visual direction planning'],
        deliverables: ['Visual approach', 'Mood boards', 'Style exploration']
      },
      {
        phase: 'Design Development',
        duration: '1-3 days',
        activities: ['Initial concepts', 'Layout exploration', 'Typography development', 'Color application'],
        deliverables: ['Design concepts', 'Layout variations', 'Typography studies', 'Color applications']
      },
      {
        phase: 'Refinement & Production',
        duration: '1-2 days',
        activities: ['Design refinement', 'Detail optimization', 'Multi-format adaptation', 'Quality assurance'],
        deliverables: ['Final designs', 'Production files', 'Design specifications', 'Usage guidelines']
      }
    ],
    qualityChecks: ['Brand consistency', 'Visual hierarchy', 'Typography excellence', 'Color accuracy', 'Technical precision']
  },
  teamGuidance: {
    name: 'Design Team Guidance',
    responsibilities: [
      'Provide clear visual direction to design team',
      'Review and critique design work',
      'Ensure brand consistency across all projects',
      'Mentor junior designers in visual excellence',
      'Establish design quality standards',
      'Facilitate design reviews and feedback sessions'
    ],
    guidanceMethods: ['Design reviews', 'One-on-one critiques', 'Work sessions', 'Quality benchmarks'],
    mentoringFocus: ['Technical skills', 'Creative thinking', 'Brand understanding', 'Professional development']
  },
  qualityControl: {
    name: 'Visual Quality Control',
    standards: [
      'Brand guideline compliance',
      'Typography and hierarchy',
      'Color accuracy and harmony',
      'Composition and balance',
      'Technical specifications',
      'Cross-platform consistency'
    ],
    reviewProcess: [
      'Initial concept review',
      'Work-in-progress checkpoints',
      'Final design approval',
      'Production file verification',
      'Multi-device testing',
      'Client presentation preparation'
    ]
  }
};

// Design critique framework
export const ArtDirectorCritiqueFramework = {
  elements: [
    {
      name: 'Visual Hierarchy',
      questions: [
        'Is the visual flow clear and intentional?',
        'Does the hierarchy support the message priority?',
        'Is there proper contrast between elements?',
        'Does the scale guide the eye appropriately?'
      ],
      feedback: 'Specific guidance on improving visual flow and priority'
    },
    {
      name: 'Typography',
      questions: [
        'Are the typefaces appropriate for the brand and message?',
        'Is the hierarchy clear and readable?',
        'Are the spacing and alignment precise?',
        'Does the typography support the overall design?'
      ],
      feedback: 'Detailed typography improvements and best practices'
    },
    {
      name: 'Color Application',
      questions: [
        'Are the colors on-brand and appropriate?',
        'Is there sufficient contrast for accessibility?',
        'Do the colors support the emotional tone?',
        'Is the color palette used effectively?'
      ],
      feedback: 'Color adjustments and accessibility improvements'
    },
    {
      name: 'Composition & Balance',
      questions: [
        'Is the composition balanced and stable?',
        'Is there appropriate use of negative space?',
        'Are elements aligned and positioned purposefully?',
        'Does the composition support the message?'
      ],
      feedback: 'Composition improvements and balance adjustments'
    }
  ],
  deliveryStyle: 'Constructive, specific, actionable, and educational',
  followUp: 'Implementation guidance and skill development recommendations'
};

// Visual direction templates
export const ArtDirectorTemplates = {
  designBrief: {
    structure: [
      'Project overview and objectives',
      'Target audience and context',
      'Key message and emotional tone',
      'Visual direction and inspiration',
      'Brand guidelines and constraints',
      'Technical specifications',
      'Deliverables and timeline',
      'Success criteria'
    ],
    visualElements: ['Mood boards', 'Style tiles', 'Typography samples', 'Color applications', 'Layout examples']
  },
  designCritique: {
    structure: [
      'Overall impression and strengths',
      'Specific feedback by element',
      'Alignment with objectives',
      'Technical considerations',
      'Improvement recommendations',
      'Next steps and revisions'
    ],
    tone: 'Constructive, detailed, specific, educational'
  },
  productionSpecs: {
    sections: [
      'File formats and specifications',
      'Color profiles and settings',
      'Typography and font usage',
      'Image resolution and quality',
      'Bleed and margin requirements',
      'Export settings and optimization',
      'Quality control checklist'
    ],
    deliverables: ['Production-ready files', 'Specification documents', 'Quality checklists']
  }
};

// Art direction specializations
export const ArtDirectorSpecializations = {
  brandIdentity: {
    name: 'Brand Identity Art Direction',
    focus: ['Logo development', 'Visual identity systems', 'Brand guidelines', 'Consistency across touchpoints'],
    expertise: ['Brand expression', 'Visual storytelling', 'Icon design', 'Typography systems']
  },
  digitalProducts: {
    name: 'Digital Products Art Direction',
    focus: ['UI/UX design', 'Digital experiences', 'Design systems', 'Interactive elements'],
    expertise: ['User interface', 'Interaction design', 'Responsive design', 'Accessibility']
  },
  printPublications: {
    name: 'Print Publications Art Direction',
    focus: ['Editorial design', 'Magazine layout', 'Book design', 'Marketing materials'],
    expertise: ['Publication design', 'Typography', 'Grid systems', 'Print production']
  },
  advertisingCreative: {
    name: 'Advertising Creative Art Direction',
    focus: ['Campaign visuals', 'Advertising concepts', 'Brand communication', 'Visual storytelling'],
    expertise: ['Campaign development', 'Concept visualization', 'Brand advertising', 'Creative execution']
  }
};
