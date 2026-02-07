// Agency-Specific Rules for Creative Excellence and Operations
import { BrandRule, RuleType, RuleTrigger, RuleCondition, RuleAction } from '../types';

// Project Kickoff Rules
export const ProjectKickoffRules: BrandRule[] = [
  {
    id: 'project-kickoff-completeness',
    name: 'Project Kickoff Completeness Validation',
    description: 'Ensures all project kickoff elements are complete and documented before creative work begins',
    type: RuleType.VALIDATION,
    trigger: RuleTrigger.MANUAL,
    status: 'active' as any,
    conditions: [
      {
        field: 'projectBrief.exists',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      },
      {
        field: 'stakeholders.identified',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      },
      {
        field: 'scope.defined',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      },
      {
        field: 'timeline.approved',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      },
      {
        field: 'budget.allocated',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'kickoff-completeness',
          requiredFields: ['projectBrief', 'stakeholders', 'scope', 'timeline', 'budget'],
          successMessage: 'Project kickoff complete - Ready for creative work'
        }
      }
    ],
    priority: 9,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  },
  {
    id: 'creative-team-assignment',
    name: 'Optimal Creative Team Assignment',
    description: 'Ensures optimal team composition based on project requirements and agent skills',
    type: RuleType.VALIDATION,
    trigger: RuleTrigger.MANUAL,
    status: 'active' as any,
    conditions: [
      {
        field: 'projectRequirements.analyzed',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      },
      {
        field: 'teamComposition.planned',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'team-composition',
          requiredSkills: 'projectRequirements.skills',
          teamMembers: 'teamComposition.members',
          optimizationCriteria: ['skill-coverage', 'workload-balance', 'expertise-level']
        }
      },
      {
        type: 'create_task',
        parameters: {
          taskType: 'team-optimization',
          assignee: 'production-manager',
          deadline: 'within-24-hours',
          description: 'Optimize team composition based on project requirements'
        }
      }
    ],
    priority: 8,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  }
];

// Creative Review Rules
export const CreativeReviewRules: BrandRule[] = [
  {
    id: 'creative-review-standards',
    name: 'Creative Review Quality Standards',
    description: 'Ensures all creative work meets quality standards before client presentation',
    type: RuleType.VALIDATION,
    trigger: RuleTrigger.ON_ASSET_GENERATION,
    status: 'active' as any,
    conditions: [
      {
        field: 'creativeAsset.status',
        operator: 'equals',
        value: 'ready-for-review',
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'creative-quality',
          qualityCriteria: [
            'brand-guidelines-compliance',
            'technical-standards',
            'creative-excellence',
            'strategic-alignment',
            'target-audience-relevance'
          ],
          reviewProcess: ['self-review', 'peer-review', 'art-director-review', 'quality-check']
        }
      },
      {
        type: 'notify',
        parameters: {
          recipients: ['art-director', 'creative-director'],
          message: 'Creative asset ready for quality review',
          urgency: 'normal',
          includeAsset: true
        }
      }
    ],
    priority: 10,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  },
  {
    id: 'brand-consistency-validation',
    name: 'Brand Consistency Validation',
    description: 'Automatically validates brand consistency across all creative assets',
    type: RuleType.COMPLIANCE,
    trigger: RuleTrigger.ON_ASSET_GENERATION,
    status: 'active' as any,
    conditions: [
      {
        field: 'asset.type',
        operator: 'in',
        value: ['logo', 'visual-identity', 'marketing-material', 'social-media', 'website'],
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'brand-consistency',
          brandElements: ['logo-usage', 'color-application', 'typography', 'imagery-style', 'tone-of-voice'],
          toleranceLevel: 'strict',
          autoCorrection: false
        }
      },
      {
        type: 'modify',
        parameters: {
          field: 'asset.brandComplianceScore',
          value: 'calculated-score',
          minThreshold: 90,
          actionOnFailure: 'flag-for-review'
        }
      }
    ],
    priority: 9,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  }
];

// Client Interaction Rules
export const ClientInteractionRules: BrandRule[] = [
  {
    id: 'client-communication-standards',
    name: 'Client Communication Standards',
    description: 'Ensures all client communication meets agency standards',
    type: RuleType.AUTOMATION,
    trigger: RuleTrigger.MANUAL,
    status: 'active' as any,
    conditions: [
      {
        field: 'communication.type',
        operator: 'in',
        value: ['email', 'presentation', 'meeting', 'call'],
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'communication-standards',
          standards: [
            'brand-consistency',
            'professional-tone',
            'clear-objectives',
            'action-items',
            'next-steps',
            'timeliness'
          ]
        }
      },
      {
        type: 'modify',
        parameters: {
          field: 'communication.templateApplied',
          value: true,
          templateType: 'communication.type'
        }
      }
    ],
    priority: 7,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  },
  {
    id: 'client-approval-workflow',
    name: 'Client Approval Workflow',
    description: 'Ensures proper client approval workflow is followed for all deliverables',
    type: RuleType.AUTOMATION,
    trigger: RuleTrigger.MANUAL,
    status: 'active' as any,
    conditions: [
      {
        field: 'deliverable.readyForApproval',
        operator: 'equals',
        value: true,
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'create_task',
        parameters: {
          taskType: 'client-approval',
          assignee: 'account-manager',
          deadline: 'immediate',
          steps: [
            'prepare-approval-presentation',
            'schedule-client-meeting',
            'document-feedback',
            'communicate-decision',
            'update-project-status'
          ]
        }
      },
      {
        type: 'notify',
        parameters: {
          recipients: ['production-manager', 'creative-director'],
          message: 'Client approval workflow initiated',
          urgency: 'high'
        }
      }
    ],
    priority: 8,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  }
];

// Quality Control Rules
export const QualityControlRules: BrandRule[] = [
  {
    id: 'quality-gate-enforcement',
    name: 'Quality Gate Enforcement',
    description: 'Enforces quality gates at key project milestones',
    type: RuleType.GUARDRAIL,
    trigger: RuleTrigger.MANUAL,
    status: 'active' as any,
    conditions: [
      {
        field: 'project.milestone',
        operator: 'in',
        value: ['concept-complete', 'design-review', 'pre-production', 'final-delivery'],
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'quality-gate',
          gate: 'project.milestone',
          requiredApprovals: ['quality-lead', 'creative-director'],
          qualityThreshold: 95,
          blockers: ['quality-issues', 'brand-violations', 'technical-problems']
        }
      },
      {
        type: 'block',
        parameters: {
          message: 'Quality gate not passed - Cannot proceed to next phase',
          requiredActions: 'address-quality-issues',
          escalateTo: 'creative-director'
        }
      }
    ],
    priority: 10,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  },
  {
    id: 'performance-metrics-monitoring',
    name: 'Performance Metrics Monitoring',
    description: 'Monitors key performance metrics across projects and team members',
    type: RuleType.AUTOMATION,
    trigger: RuleTrigger.SCHEDULED,
    status: 'active' as any,
    conditions: [
      {
        field: 'schedule.frequency',
        operator: 'equals',
        value: 'weekly',
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'performance-metrics',
          metrics: [
            'on-time-delivery',
            'quality-scores',
            'client-satisfaction',
            'team-productivity',
            'budget-adherence',
            'scope-creep'
          ],
          thresholds: {
            'on-time-delivery': 90,
            'quality-scores': 85,
            'client-satisfaction': 4.0
          }
        }
      },
      {
        type: 'notify',
        parameters: {
          recipients: ['creative-director', 'production-manager'],
          message: 'Weekly performance metrics report ready',
          includeReport: true
        }
      }
    ],
    priority: 6,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  }
];

// Team Collaboration Rules
export const TeamCollaborationRules: BrandRule[] = [
  {
    id: 'cross-functional-collaboration',
    name: 'Cross-Functional Collaboration Requirements',
    description: 'Ensures proper cross-functional team collaboration on all projects',
    type: RuleType.AUTOMATION,
    trigger: RuleTrigger.ON_BRAND_UPDATE,
    status: 'active' as any,
    conditions: [
      {
        field: 'project.phase',
        operator: 'in',
        value: ['concept-development', 'design-execution', 'content-creation'],
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'collaboration-check',
          requiredParticipants: ['creative', 'strategy', 'content', 'production'],
          collaborationMethods: ['standup-meetings', 'reviews', 'feedback-sessions', 'shared-tools'],
          frequency: 'daily'
        }
      },
      {
        type: 'modify',
        parameters: {
          field: 'project.collaborationScore',
          value: 'calculated-score',
          minScore: 80,
          actionOnLowScore: 'schedule-collaboration-review'
        }
      }
    ],
    priority: 7,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  },
  {
    id: 'knowledge-sharing-requirements',
    name: 'Knowledge Sharing Requirements',
    description: 'Ensures knowledge sharing and documentation across teams',
    type: RuleType.AUTOMATION,
    trigger: RuleTrigger.SCHEDULED,
    status: 'active' as any,
    conditions: [
      {
        field: 'schedule.frequency',
        operator: 'equals',
        value: 'bi-weekly',
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'create_task',
        parameters: {
          taskType: 'knowledge-sharing',
          assignee: 'team-lead',
          activities: [
            'best-practices-documentation',
            'lessons-learned-capture',
            'case-studies-creation',
            'skill-sharing-sessions'
          ]
        }
      },
      {
        type: 'notify',
        parameters: {
          recipients: ['all-teams'],
          message: 'Knowledge sharing session scheduled',
          schedule: 'bi-weekly'
        }
      }
    ],
    priority: 5,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  }
];

// Resource Optimization Rules
export const ResourceOptimizationRules: BrandRule[] = [
  {
    id: 'resource-utilization-optimization',
    name: 'Resource Utilization Optimization',
    description: 'Optimizes resource allocation and utilization across projects',
    type: RuleType.TRANSFORMATION,
    trigger: RuleTrigger.SCHEDULED,
    status: 'active' as any,
    conditions: [
      {
        field: 'schedule.frequency',
        operator: 'equals',
        value: 'daily',
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'resource-utilization',
          metrics: [
            'team-capacity',
            'skill-utilization',
            'workload-distribution',
            'bottleneck-identification'
          ],
          targetUtilization: 85,
          maxOverload: 110
        }
      },
      {
        type: 'modify',
        parameters: {
          field: 'resourcePlan.optimized',
          value: 'true',
          optimizations: ['workload-balancing', 'skill-matching', 'bottleneck-resolution']
        }
      }
    ],
    priority: 6,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  },
  {
    id: 'budget-forecasting-accuracy',
    name: 'Budget Forecasting Accuracy',
    description: 'Monitors and improves budget forecasting accuracy',
    type: RuleType.AUTOMATION,
    trigger: RuleTrigger.SCHEDULED,
    status: 'active' as any,
    conditions: [
      {
        field: 'schedule.frequency',
        operator: 'equals',
        value: 'monthly',
        logicalOperator: 'AND'
      }
    ],
    actions: [
      {
        type: 'validate',
        parameters: {
          validationType: 'budget-accuracy',
          comparison: 'actual-vs-forecasted',
          varianceThreshold: 10,
          trends: 'over/under-budget-patterns'
        }
      },
      {
        type: 'modify',
        parameters: {
          field: 'forecastingModel',
          value: 'updated',
          improvements: ['historical-data', 'project-complexity-factors', 'team-velocity']
        }
      }
    ],
    priority: 5,
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1
  }
];

// Export all agency rules
export const AgencyRules = {
  projectKickoff: ProjectKickoffRules,
  creativeReview: CreativeReviewRules,
  clientInteraction: ClientInteractionRules,
  qualityControl: QualityControlRules,
  teamCollaboration: TeamCollaborationRules,
  resourceOptimization: ResourceOptimizationRules
};

// Rule execution framework
export const AgencyRuleExecution = {
  phases: [
    'trigger-detection',
    'condition-evaluation',
    'action-execution',
    'result-logging',
    'notification-sending'
  ],
  monitoring: [
    'rule-coverage',
    'execution-success',
    'performance-impact',
    'user-compliance',
    'business-value'
  ],
  optimization: [
    'rule-tuning',
    'condition-refinement',
    'action-improvement',
    'workflow-optimization'
  ]
};
