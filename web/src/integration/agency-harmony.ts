// Creative Agency Harmony System - Integrated Agent-Skill-Rule Framework
// This file creates perfect harmony between agents, skills, and rules for agency operations

import { Agent, AgentType, AgentCapability } from '../types';
import { SkillDefinition } from '../types';
import { BrandRule, RuleType, RuleTrigger } from '../types';

export interface AgentSkillRuleMapping {
  agentId: string;
  requiredSkills: string[];
  applicableRules: string[];
  workflowPhases: string[];
  qualityGates: string[];
  performanceMetrics: string[];
  collaborationNeeds: string[];
}

export interface AgencyWorkflow {
  id: string;
  name: string;
  description: string;
  phases: WorkflowPhase[];
  requiredAgents: string[];
  requiredSkills: string[];
  applicableRules: string[];
  qualityGates: QualityGate[];
  deliverables: string[];
  successMetrics: string[];
}

export interface WorkflowPhase {
  id: string;
  name: string;
  description: string;
  primaryAgent: string;
  supportingAgents: string[];
  requiredSkills: string[];
  entryCriteria: string[];
  exitCriteria: string[];
  qualityChecks: string[];
  deliverables: string[];
  duration: string;
}

export interface QualityGate {
  id: string;
  name: string;
  description: string;
  criteria: QualityCriteria[];
  requiredApprovals: string[];
  blockers: string[];
  autoPass: boolean;
  manualOverride: boolean;
}

export interface QualityCriteria {
  id: string;
  name: string;
  description: string;
  measurement: string;
  threshold: number;
  weight: number;
  category: 'technical' | 'creative' | 'strategic' | 'client';
}

// Complete Agent-Skill-Rule Mapping
export const AgencyHarmonyMappings: AgentSkillRuleMapping[] = [
  {
    agentId: 'creative-director',
    requiredSkills: [
      'branding',
      'creative-leadership',
      'client-presentation',
      'account-management',
      'agency-business-development'
    ],
    applicableRules: [
      'project-kickoff-completeness',
      'creative-review-standards',
      'client-communication-standards',
      'quality-gate-enforcement'
    ],
    workflowPhases: [
      'strategy-development',
      'creative-direction',
      'client-approval',
      'quality-control'
    ],
    qualityGates: [
      'brand-strategy-approval',
      'creative-concept-approval',
      'final-delivery-approval'
    ],
    performanceMetrics: [
      'creative-excellence',
      'strategic-alignment',
      'client-satisfaction',
      'team-performance'
    ],
    collaborationNeeds: [
      'brand-strategist',
      'art-director',
      'account-manager',
      'client-stakeholders'
    ]
  },
  {
    agentId: 'art-director',
    requiredSkills: [
      'design-fundamentals',
      'brand-guidelines',
      'creative-leadership',
      'quality-assurance',
      'vector-design'
    ],
    applicableRules: [
      'creative-review-standards',
      'brand-consistency-validation',
      'quality-gate-enforcement',
      'cross-functional-collaboration'
    ],
    workflowPhases: [
      'visual-direction',
      'design-execution',
      'quality-review',
      'production-handoff'
    ],
    qualityGates: [
      'visual-direction-approval',
      'design-quality-approval',
      'production-readiness-approval'
    ],
    performanceMetrics: [
      'design-quality',
      'brand-consistency',
      'timeliness',
      'team-efficiency'
    ],
    collaborationNeeds: [
      'senior-designer',
      'motion-designer',
      'creative-director',
      'production-manager'
    ]
  },
  {
    agentId: 'brand-strategist',
    requiredSkills: [
      'branding',
      'market-analysis',
      'consumer-insights',
      'project-scoping',
      'agency-business-development'
    ],
    applicableRules: [
      'project-kickoff-completeness',
      'brand-consistency-validation',
      'client-communication-standards'
    ],
    workflowPhases: [
      'research-analysis',
      'strategy-development',
      'positioning-definition',
      'guideline-creation'
    ],
    qualityGates: [
      'research-completeness-approval',
      'strategy-approval',
      'positioning-approval'
    ],
    performanceMetrics: [
      'strategic-accuracy',
      'market-insight-quality',
      'brand-positioning-effectiveness',
      'client-alignment'
    ],
    collaborationNeeds: [
      'creative-director',
      'account-manager',
      'market-research',
      'client-stakeholders'
    ]
  },
  {
    agentId: 'senior-designer',
    requiredSkills: [
      'design-fundamentals',
      'brand-guidelines',
      'vector-design',
      'digital-art',
      'typography'
    ],
    applicableRules: [
      'creative-review-standards',
      'brand-consistency-validation',
      'quality-gate-enforcement'
    ],
    workflowPhases: [
      'concept-development',
      'design-execution',
      'refinement-production',
      'quality-assurance'
    ],
    qualityGates: [
      'concept-approval',
      'design-quality-approval',
      'production-readiness-approval'
    ],
    performanceMetrics: [
      'design-quality',
      'creativity-score',
      'brand-consistency',
      'technical-execution'
    ],
    collaborationNeeds: [
      'art-director',
      'copywriter',
      'creative-director'
    ]
  },
  {
    agentId: 'social-media-manager',
    requiredSkills: [
      'social-media',
      'content-creation',
      'account-management',
      'client-presentation'
    ],
    applicableRules: [
      'brand-consistency-validation',
      'client-communication-standards',
      'performance-metrics-monitoring'
    ],
    workflowPhases: [
      'content-planning',
      'content-creation',
      'community-management',
      'performance-optimization'
    ],
    qualityGates: [
      'content-calendar-approval',
      'content-quality-approval',
      'engagement-targets-approval'
    ],
    performanceMetrics: [
      'engagement-rates',
      'follower-growth',
      'content-quality',
      'brand-consistency'
    ],
    collaborationNeeds: [
      'copywriter',
      'senior-designer',
      'account-manager'
    ]
  },
  {
    agentId: 'copywriter',
    requiredSkills: [
      'branding',
      'creative-leadership',
      'content-creation',
      'client-presentation'
    ],
    applicableRules: [
      'brand-consistency-validation',
      'client-communication-standards',
      'creative-review-standards'
    ],
    workflowPhases: [
      'message-development',
      'copy-creation',
      'review-refinement',
      'final-approval'
    ],
    qualityGates: [
      'messaging-approval',
      'copy-quality-approval',
      'brand-voice-approval'
    ],
    performanceMetrics: [
      'copy-effectiveness',
      'brand-consistency',
      'engagement-rates',
      'conversion-metrics'
    ],
    collaborationNeeds: [
      'creative-director',
      'brand-strategist',
      'art-director'
    ]
  },
  {
    agentId: 'motion-designer',
    requiredSkills: [
      'digital-art',
      'vector-design',
      'design-fundamentals',
      'quality-assurance'
    ],
    applicableRules: [
      'creative-review-standards',
      'brand-consistency-validation',
      'quality-gate-enforcement'
    ],
    workflowPhases: [
      'motion-concept',
      'storyboard-development',
      'animation-production',
      'post-production'
    ],
    qualityGates: [
      'concept-approval',
      'storyboard-approval',
      'animation-quality-approval'
    ],
    performanceMetrics: [
      'animation-quality',
      'brand-consistency',
      'technical-execution',
      'timeline-adherence'
    ],
    collaborationNeeds: [
      'art-director',
      'senior-designer',
      'copywriter'
    ]
  },
  {
    agentId: 'production-manager',
    requiredSkills: [
      'project-scoping',
      'agency-operations',
      'quality-assurance',
      'financial-management'
    ],
    applicableRules: [
      'project-kickoff-completeness',
      'quality-gate-enforcement',
      'resource-utilization-optimization',
      'budget-forecasting-accuracy'
    ],
    workflowPhases: [
      'project-planning',
      'resource-allocation',
      'quality-control',
      'delivery-management'
    ],
    qualityGates: [
      'project-plan-approval',
      'resource-allocation-approval',
      'quality-readiness-approval',
      'delivery-approval'
    ],
    performanceMetrics: [
      'on-time-delivery',
      'budget-adherence',
      'quality-metrics',
      'team-efficiency'
    ],
    collaborationNeeds: [
      'all-team-members',
      'clients',
      'vendors'
    ]
  }
];

// Complete Agency Workflows
export const AgencyWorkflows: AgencyWorkflow[] = [
  {
    id: 'brand-identity-project',
    name: 'Brand Identity Project Workflow',
    description: 'Complete brand identity development from strategy to implementation',
    phases: [
      {
        id: 'discovery',
        name: 'Discovery & Research',
        description: 'Research market, competitors, and audience',
        primaryAgent: 'brand-strategist',
        supportingAgents: ['creative-director', 'account-manager'],
        requiredSkills: ['market-analysis', 'research', 'project-scoping'],
        entryCriteria: ['project-brief-complete', 'team-assigned'],
        exitCriteria: ['research-complete', 'insights-documented'],
        qualityChecks: ['research-validity', 'insight-quality'],
        deliverables: ['market-research', 'competitive-analysis', 'audience-insights'],
        duration: '5-7 days'
      },
      {
        id: 'strategy',
        name: 'Strategy Development',
        description: 'Develop brand positioning and strategy',
        primaryAgent: 'brand-strategist',
        supportingAgents: ['creative-director'],
        requiredSkills: ['brand-strategy', 'positioning', 'messaging'],
        entryCriteria: ['research-approved'],
        exitCriteria: ['strategy-approved', 'positioning-defined'],
        qualityChecks: ['strategic-alignment', 'positioning-clarity'],
        deliverables: ['brand-strategy', 'positioning-platform', 'messaging-framework'],
        duration: '3-5 days'
      },
      {
        id: 'creative-direction',
        name: 'Creative Direction',
        description: 'Translate strategy into creative direction',
        primaryAgent: 'creative-director',
        supportingAgents: ['art-director', 'brand-strategist'],
        requiredSkills: ['creative-direction', 'visual-thinking', 'brand-interpretation'],
        entryCriteria: ['strategy-approved'],
        exitCriteria: ['creative-direction-approved', 'visual-concepts-defined'],
        qualityChecks: ['brand-alignment', 'creative-excellence'],
        deliverables: ['creative-brief', 'mood-boards', 'direction-guidelines'],
        duration: '3-4 days'
      },
      {
        id: 'design-execution',
        name: 'Design Execution',
        description: 'Execute creative concepts and designs',
        primaryAgent: 'art-director',
        supportingAgents: ['senior-designer', 'motion-designer', 'copywriter'],
        requiredSkills: ['design-fundamentals', 'brand-guidelines', 'vector-design', 'digital-art'],
        entryCriteria: ['creative-direction-approved'],
        exitCriteria: ['designs-complete', 'quality-checked'],
        qualityChecks: ['brand-consistency', 'technical-quality', 'creative-excellence'],
        deliverables: ['logo-designs', 'visual-identity', 'brand-applications'],
        duration: '7-10 days'
      },
      {
        id: 'refinement',
        name: 'Refinement & Finalization',
        description: 'Refine designs based on feedback and prepare final deliverables',
        primaryAgent: 'art-director',
        supportingAgents: ['senior-designer', 'creative-director', 'production-manager'],
        requiredSkills: ['design-refinement', 'quality-assurance', 'client-feedback'],
        entryCriteria: ['designs-reviewed'],
        exitCriteria: ['final-deliverables-complete', 'client-approved'],
        qualityChecks: ['final-quality', 'completeness', 'brand-consistency'],
        deliverables: ['final-brand-kit', 'guidelines', 'production-files'],
        duration: '3-5 days'
      }
    ],
    requiredAgents: ['brand-strategist', 'creative-director', 'art-director', 'senior-designer', 'production-manager'],
    requiredSkills: ['branding', 'brand-guidelines', 'design-fundamentals', 'vector-design', 'project-scoping'],
    applicableRules: ['project-kickoff-completeness', 'creative-review-standards', 'brand-consistency-validation', 'quality-gate-enforcement'],
    qualityGates: [
      {
        id: 'research-approval',
        name: 'Research Approval Gate',
        description: 'Ensures research is comprehensive and actionable',
        criteria: [
          {
            id: 'research-completeness',
            name: 'Research Completeness',
            description: 'All required research areas covered',
            measurement: 'coverage-percentage',
            threshold: 95,
            weight: 30,
            category: 'strategic' as const
          },
          {
            id: 'insight-quality',
            name: 'Insight Quality',
            description: 'Actionable and strategic insights',
            measurement: 'insight-rating',
            threshold: 4.0,
            weight: 40,
            category: 'strategic' as const
          }
        ],
        requiredApprovals: ['brand-strategist', 'creative-director'],
        blockers: ['insufficient-research', 'unclear-insights'],
        autoPass: false,
        manualOverride: true
      }
    ],
    deliverables: ['brand-strategy', 'visual-identity', 'brand-guidelines', 'production-files'],
    successMetrics: ['client-satisfaction', 'brand-alignment', 'creative-quality', 'timeline-adherence']
  },
  {
    id: 'campaign-development',
    name: 'Marketing Campaign Development',
    description: 'Complete campaign development from strategy to execution',
    phases: [
      {
        id: 'campaign-strategy',
        name: 'Campaign Strategy',
        description: 'Develop campaign strategy and messaging',
        primaryAgent: 'brand-strategist',
        supportingAgents: ['creative-director', 'account-manager'],
        requiredSkills: ['campaign-strategy', 'messaging', 'audience-targeting'],
        entryCriteria: ['campaign-brief-complete'],
        exitCriteria: ['strategy-approved', 'messaging-defined'],
        qualityChecks: ['strategic-alignment', 'target-audience-fit'],
        deliverables: ['campaign-strategy', 'messaging-framework', 'target-audience-definition'],
        duration: '3-4 days'
      },
      {
        id: 'content-creation',
        name: 'Content Creation',
        description: 'Create campaign content across all channels',
        primaryAgent: 'art-director',
        supportingAgents: ['senior-designer', 'copywriter', 'motion-designer', 'social-media-manager'],
        requiredSkills: ['content-creation', 'multi-channel-design', 'brand-consistency'],
        entryCriteria: ['strategy-approved', 'creative-brief-complete'],
        exitCriteria: ['content-complete', 'quality-checked'],
        qualityChecks: ['brand-consistency', 'channel-optimization', 'creative-quality'],
        deliverables: ['visual-content', 'copy-content', 'social-content', 'video-content'],
        duration: '5-7 days'
      },
      {
        id: 'deployment',
        name: 'Campaign Deployment',
        description: 'Deploy campaign and monitor performance',
        primaryAgent: 'social-media-manager',
        supportingAgents: ['production-manager', 'account-manager'],
        requiredSkills: ['campaign-deployment', 'performance-monitoring', 'optimization'],
        entryCriteria: ['content-approved', 'deployment-plan-ready'],
        exitCriteria: ['campaign-live', 'performance-tracking'],
        qualityChecks: ['deployment-quality', 'monitoring-setup'],
        deliverables: ['deployed-campaign', 'performance-dashboard', 'optimization-plan'],
        duration: '2-3 days'
      }
    ],
    requiredAgents: ['brand-strategist', 'creative-director', 'art-director', 'copywriter', 'senior-designer', 'motion-designer', 'social-media-manager', 'production-manager'],
    requiredSkills: ['campaign-strategy', 'content-creation', 'social-media', 'project-scoping'],
    applicableRules: ['creative-review-standards', 'brand-consistency-validation', 'performance-metrics-monitoring'],
    qualityGates: [
      {
        id: 'campaign-approval',
        name: 'Campaign Approval Gate',
        description: 'Ensures campaign meets strategic and quality standards',
        criteria: [
          {
            id: 'strategic-alignment',
            name: 'Strategic Alignment',
            description: 'Campaign aligns with brand strategy',
            measurement: 'alignment-score',
            threshold: 90,
            weight: 35,
            category: 'strategic' as const
          },
          {
            id: 'creative-quality',
            name: 'Creative Quality',
            description: 'Creative work meets quality standards',
            measurement: 'quality-rating',
            threshold: 85,
            weight: 35,
            category: 'creative' as const
          }
        ],
        requiredApprovals: ['creative-director', 'account-manager'],
        blockers: ['strategic-misalignment', 'quality-issues'],
        autoPass: false,
        manualOverride: true
      }
    ],
    deliverables: ['campaign-strategy', 'multi-channel-content', 'deployment-assets', 'performance-reports'],
    successMetrics: ['campaign-performance', 'engagement-metrics', 'conversion-rates', 'ROI']
  }
];

// Harmony Integration System
export class AgencyHarmonySystem {
  // Get complete agent-skill-rule mapping
  static getAgentMapping(agentId: string): AgentSkillRuleMapping | null {
    return AgencyHarmonyMappings.find(mapping => mapping.agentId === agentId) || null;
  }

  // Get optimal team composition for project
  static getOptimalTeam(projectRequirements: any): string[] {
    const requiredSkills = projectRequirements.requiredSkills || [];
    const teamComposition = new Set<string>();

    // Map skills to primary agents
    requiredSkills.forEach((skill: string) => {
      const mappings = AgencyHarmonyMappings.filter(mapping => 
        mapping.requiredSkills.includes(skill)
      );
      
      // Find the agent with highest relevance score
      let bestAgent = '';
      let maxScore = 0;
      
      mappings.forEach(mapping => {
        const relevanceScore = mapping.requiredSkills.filter((s: string) => 
          requiredSkills.includes(s)
        ).length;
        
        if (relevanceScore > maxScore) {
          maxScore = relevanceScore;
          bestAgent = mapping.agentId;
        }
      });
      
      if (bestAgent && !teamComposition.has(bestAgent)) {
        teamComposition.add(bestAgent);
      }
    });

    return Array.from(teamComposition);
  }

  // Get required rules for agent or project
  static getApplicableRules(agents: string[], projectType: string): string[] {
    const applicableRules = new Set<string>();
    
    agents.forEach(agentId => {
      const mapping = AgencyHarmonyMappings.find(m => m.agentId === agentId);
      if (mapping) {
        mapping.applicableRules.forEach(ruleId => {
          applicableRules.add(ruleId);
        });
      }
    });

    return Array.from(applicableRules);
  }

  // Get quality gates for workflow
  static getQualityGates(workflowId: string, phaseId?: string): QualityGate[] {
    const workflow = AgencyWorkflows.find(w => w.id === workflowId);
    if (!workflow) return [];

    if (phaseId) {
      const phase = workflow.phases.find(p => p.id === phaseId);
      return phase ? [phase.qualityChecks] as any : [];
    }

    return workflow.qualityGates;
  }

  // Validate agent-skill compatibility
  static validateAgentSkillCompatibility(agentId: string, userSkills: string[]): {
    compatible: boolean;
    missingSkills: string[];
    compatibilityScore: number;
  } {
    const mapping = AgencyHarmonyMappings.find(m => m.agentId === agentId);
    if (!mapping) {
      return {
        compatible: false,
        missingSkills: [],
        compatibilityScore: 0
      };
    }

    const requiredSkills = mapping.requiredSkills;
    const userSkillSet = new Set(userSkills);
    const missingSkills = requiredSkills.filter(skill => !userSkillSet.has(skill));
    const compatibilityScore = ((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100;

    return {
      compatible: missingSkills.length === 0,
      missingSkills,
      compatibilityScore
    };
  }

  // Generate workflow for project type
  static generateWorkflow(projectType: string, team: string[], timeline: string): AgencyWorkflow {
    const baseWorkflow = AgencyWorkflows.find(w => w.id === projectType);
    if (!baseWorkflow) {
      throw new Error(`Unknown project type: ${projectType}`);
    }

    // Customize workflow based on team and timeline
    const customizedWorkflow = {
      ...baseWorkflow,
      phases: baseWorkflow.phases.map(phase => ({
        ...phase,
        duration: this.adjustDurationForTimeline(phase.duration, timeline),
        supportingAgents: this.filterAvailableAgents(phase.supportingAgents, team)
      }))
    };

    return customizedWorkflow;
  }

  // Adjust duration based on timeline
  private static adjustDurationForTimeline(baseDuration: string, timeline: string): string {
    const durationMap: { [key: string]: string } = {
      'urgent': this.reduceDuration(baseDuration, 0.7),
      'standard': baseDuration,
      'extended': this.extendDuration(baseDuration, 1.5)
    };

    return durationMap[timeline] || baseDuration;
  }

  // Reduce duration by factor
  private static reduceDuration(duration: string, factor: number): string {
    const match = duration.match(/(\d+)-(\d+)/);
    if (!match) return duration;
    
    const min = Math.round(parseInt(match[1]) * factor);
    const max = Math.round(parseInt(match[2]) * factor);
    return `${min}-${max} days`;
  }

  // Extend duration by factor
  private static extendDuration(duration: string, factor: number): string {
    const match = duration.match(/(\d+)-(\d+)/);
    if (!match) return duration;
    
    const min = Math.round(parseInt(match[1]) * factor);
    const max = Math.round(parseInt(match[2]) * factor);
    return `${min}-${max} days`;
  }

  // Filter available agents from team
  private static filterAvailableAgents(requiredAgents: string[], availableTeam: string[]): string[] {
    return requiredAgents.filter(agent => availableTeam.includes(agent));
  }

  // Get performance metrics for agent
  static getAgentPerformanceMetrics(agentId: string): string[] {
    const mapping = AgencyHarmonyMappings.find(m => m.agentId === agentId);
    return mapping?.performanceMetrics || [];
  }

  // Get collaboration needs for agent
  static getAgentCollaborationNeeds(agentId: string): string[] {
    const mapping = AgencyHarmonyMappings.find(m => m.agentId === agentId);
    return mapping?.collaborationNeeds || [];
  }
}

export default AgencyHarmonySystem;
