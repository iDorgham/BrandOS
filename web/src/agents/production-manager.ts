import { Agent, AgentType, AgentCapability, AgentSkill } from '../types';

// Production Manager Agent - The project execution coordinator
export const ProductionManagerAgent: Agent = {
  id: 'production-manager',
  name: 'Production Manager',
  type: AgentType.PRODUCTION_MANAGER,
  status: 'active' as any,
  description: 'Project execution specialist responsible for coordinating resources, timelines, and deliverables. Ensures smooth production workflows and quality delivery of all creative projects.',
  avatar: 'production-manager.svg',
  config: {
    model: 'claude-3-sonnet',
    temperature: 0.4,
    maxTokens: 3072,
    systemPrompt: `You are an experienced Production Manager with 12+ years in project management, resource coordination, and production workflow optimization. You excel at ensuring smooth execution of creative projects while maintaining quality and meeting deadlines.

Your responsibilities:
- Coordinate project timelines and resource allocation
- Manage production workflows and quality control
- Ensure deliverable specifications and technical requirements are met
- Liaise between creative team, clients, and vendors
- Monitor project progress and resolve issues
- Optimize production processes for efficiency

Your expertise includes:
- Project management and timeline coordination
- Resource planning and allocation
- Quality assurance and control processes
- Vendor management and negotiation
- Technical specifications and production requirements
- Budget management and cost control
- Workflow optimization and automation

Communication style: Organized, detailed, proactive, and solution-focused. You ensure projects run smoothly and deliver exceptional results.`,
    skills: [
      {
        id: 'project-management',
        name: 'Project Management',
        description: 'Expert project coordination and timeline management',
        capability: AgentCapability.WORKFLOW_AUTOMATION,
        level: 10,
        isActive: true,
        config: {
          methodologies: ['agile', 'waterfall', 'hybrid-approaches', 'resource-allocation'],
          tools: ['project-management-software', 'timeline-tools', 'resource-planning', 'quality-systems'],
          focus: ['delivery-excellence', 'team-coordination', 'client-satisfaction', 'efficiency-optimization']
        }
      },
      {
        id: 'quality-control',
        name: 'Quality Control',
        description: 'Comprehensive quality assurance and control processes',
        capability: AgentCapability.ASSET_ANALYSIS,
        level: 9,
        isActive: true,
        config: {
          processes: ['quality-standards', 'review-checkpoints', 'technical-specifications', 'brand-compliance'],
          deliverables: ['quality-reports', 'checklists', 'approval-workflows', 'improvement-plans'],
          metrics: ['quality-scores', 'error-rates', 'client-satisfaction', 'delivery-accuracy']
        }
      },
      {
        id: 'resource-optimization',
        name: 'Resource Optimization',
        description: 'Efficient resource planning and utilization',
        capability: AgentCapability.PERFORMANCE_OPTIMIZATION,
        level: 8,
        isActive: true,
        config: {
          resources: ['team-members', 'budget', 'tools', 'vendors', 'time'],
          optimization: ['workload-balancing', 'cost-reduction', 'efficiency-improvement', 'bottleneck-elimination'],
          strategies: ['resource-forecasting', 'capacity-planning', 'skill-matching', 'vendor-management']
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
    successRate: 97,
    averageResponseTime: 110
  }
};

// Production manager specific workflows
export const ProductionManagerWorkflows = {
  projectCoordination: {
    name: 'Project Coordination Workflow',
    phases: [
      {
        phase: 'Project Initiation',
        duration: '4-8 hours',
        activities: ['Requirements gathering', 'Resource assessment', 'Timeline development', 'Budget planning'],
        deliverables: ['Project brief', 'Resource plan', 'Timeline', 'Budget estimate']
      },
      {
        phase: 'Production Planning',
        duration: '1-2 days',
        activities: ['Workshop planning', 'Quality standards definition', 'Vendor coordination', 'Risk assessment'],
        deliverables: ['Production schedule', 'Quality plan', 'Vendor contracts', 'Risk mitigation']
      },
      {
        phase: 'Execution Management',
        duration: 'Project duration',
        activities: ['Progress monitoring', 'Quality control', 'Issue resolution', 'Change management'],
        deliverables: ['Progress reports', 'Quality updates', 'Change orders', 'Issue resolutions']
      },
      {
        phase: 'Delivery & Review',
        duration: '1-2 days',
        activities: ['Final quality check', 'Client delivery', 'Post-project review', 'Lessons learned'],
        deliverables: ['Final deliverables', 'Quality report', 'Client feedback', 'Project summary']
      }
    ],
    coordinationPoints: ['Daily check-ins', 'Weekly reviews', 'Milestone reviews', 'Client updates']
  },
  qualityAssurance: {
    name: 'Quality Assurance Process',
    checkpoints: [
      {
        name: 'Pre-Production Quality',
        checks: ['Requirements clarity', 'Resource availability', 'Technical specifications', 'Timeline feasibility'],
        tools: ['Checklists', 'Review meetings', 'Technical audits']
      },
      {
        name: 'In-Progress Quality',
        checks: ['Work-in-progress reviews', 'Brand compliance', 'Technical standards', 'Timeline adherence'],
        tools: ['Progress reviews', 'Quality audits', 'Performance metrics']
      },
      {
        name: 'Final Quality',
        checks: ['Final deliverables', 'Client requirements', 'Technical specifications', 'File formats'],
        tools: ['Final inspection', 'Client review', 'Technical testing']
      }
    ],
    qualityMetrics: ['Accuracy', 'Completeness', 'Timeliness', 'Client satisfaction', 'Technical compliance']
  },
  resourceManagement: {
    name: 'Resource Management Strategy',
    resourceTypes: [
      {
        type: 'Human Resources',
        management: ['Skill assessment', 'Workload balancing', 'Training planning', 'Performance monitoring'],
        optimization: ['Efficient allocation', 'Skill matching', 'Team development', 'Burnout prevention']
      },
      {
        type: 'Financial Resources',
        management: ['Budget planning', 'Cost control', 'Vendor negotiation', 'ROI analysis'],
        optimization: ['Cost efficiency', 'Value maximization', 'Risk mitigation', 'Budget adherence']
      },
      {
        type: 'Technical Resources',
        management: ['Tool assessment', 'Software licensing', 'Equipment maintenance', 'System optimization'],
        optimization: ['Tool efficiency', 'Automation opportunities', 'Technical support', 'Future planning']
      }
    ]
  }
};

// Project management frameworks
export const ProductionManagerFrameworks = {
  projectLifecycle: {
    name: 'Project Lifecycle Management',
    stages: [
      {
        stage: 'Initiation',
        activities: ['Project charter', 'Stakeholder identification', 'Requirements gathering', 'Feasibility study'],
        deliverables: ['Project brief', 'Stakeholder map', 'Requirements document', 'Feasibility report']
      },
      {
        stage: 'Planning',
        activities: ['Work breakdown', 'Timeline development', 'Resource allocation', 'Risk planning'],
        deliverables: ['Project plan', 'Schedule', 'Resource plan', 'Risk register']
      },
      {
        stage: 'Execution',
        activities: ['Task management', 'Team coordination', 'Quality control', 'Progress monitoring'],
        deliverables: ['Work products', 'Progress reports', 'Quality records', 'Issue logs']
      },
      {
        stage: 'Monitoring & Control',
        activities: ['Performance measurement', 'Change management', 'Quality assurance', 'Stakeholder communication'],
        deliverables: ['Performance reports', 'Change requests', 'Quality reports', 'Communication logs']
      },
      {
        stage: 'Closure',
        activities: ['Final delivery', 'Project evaluation', 'Lessons learned', 'Resource release'],
        deliverables: ['Final products', 'Project evaluation', 'Lessons learned', 'Closeout report']
      }
    ]
  },
  riskManagement: {
    name: 'Risk Management Framework',
    process: [
      'Risk Identification - Potential project risks',
      'Risk Assessment - Impact and probability analysis',
      'Risk Response - Mitigation and contingency plans',
      'Risk Monitoring - Ongoing risk tracking and review'
    ],
    riskCategories: ['Technical risks', 'Resource risks', 'Timeline risks', 'Budget risks', 'Quality risks'],
    mitigation: ['Preventive measures', 'Contingency planning', 'Risk transfer', 'Risk acceptance']
  },
  qualityManagement: {
    name: 'Quality Management System',
    components: [
      'Quality Planning - Defining quality standards',
      'Quality Assurance - Process compliance',
      'Quality Control - Product verification',
      'Continuous Improvement - Process optimization'
    ],
    tools: ['Checklists', 'Audits', 'Metrics', 'Reviews', 'Testing'],
    objectives: ['Customer satisfaction', 'Process efficiency', 'Continuous improvement', 'Defect prevention']
  }
};

// Communication and reporting
export const ProductionManagerCommunication = {
  stakeholderCommunication: {
    name: 'Stakeholder Communication Plan',
    stakeholders: [
      {
        group: 'Clients',
        needs: ['Progress updates', 'Quality assurance', 'Issue notification', 'Delivery information'],
        frequency: ['Weekly updates', 'Milestone reviews', 'Immediate for issues', 'Final delivery'],
        format: ['Email updates', 'Progress reports', 'Review meetings', 'Presentations']
      },
      {
        group: 'Creative Team',
        needs: ['Clear requirements', 'Resource information', 'Timeline updates', 'Feedback'],
        frequency: ['Daily check-ins', 'Weekly reviews', 'Change notifications', 'Project briefs'],
        format: ['Team meetings', 'Project management tools', 'Briefing sessions', 'Feedback sessions']
      },
      {
        group: 'Management',
        needs: ['Progress metrics', 'Budget status', 'Resource utilization', 'Risk information'],
        frequency: ['Weekly dashboards', 'Monthly reports', 'Quarterly reviews', 'Issue escalation'],
        format: ['Dashboards', 'Reports', 'Review meetings', 'Executive summaries']
      }
    ]
  },
  reportingFramework: {
    name: 'Project Reporting System',
    reports: [
      {
        type: 'Daily Progress',
        content: ['Task completion', 'Resource utilization', 'Issues identified', 'Next day priorities'],
        audience: ['Project team', 'Project manager']
      },
      {
        type: 'Weekly Status',
        content: ['Milestone progress', 'Budget status', 'Quality metrics', 'Risk updates'],
        audience: ['Stakeholders', 'Management', 'Clients']
      },
      {
        type: 'Monthly Dashboard',
        content: ['Portfolio status', 'Resource performance', 'Quality trends', 'Strategic updates'],
        audience: ['Executive management', 'Department heads']
      }
    ]
  }
};

// Templates and tools
export const ProductionManagerTemplates = {
  projectBrief: {
    sections: [
      'Project overview and objectives',
      'Scope and deliverables',
      'Timeline and milestones',
      'Budget and resources',
      'Quality requirements',
      'Risk assessment',
      'Success criteria',
      'Stakeholder identification'
    ]
  },
  qualityChecklist: {
    categories: [
      'Requirements compliance',
      'Brand guidelines adherence',
      'Technical specifications',
      'File format requirements',
      'Delivery standards',
      'Client approval process'
    ]
  },
  riskRegister: {
    fields: [
      'Risk identification',
      'Risk category',
      'Impact assessment',
      'Probability rating',
      'Risk level',
      'Mitigation strategy',
      'Contingency plan',
      'Risk owner',
      'Review frequency'
    ]
  }
};
