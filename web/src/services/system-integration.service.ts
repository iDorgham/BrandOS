import { AgentService } from './agent.service';
import { RulesService } from './rules.service';
import { SkillsService } from './skills.service';
import { Agent, BrandRule, SkillDefinition, AgentTask, RuleExecution, UserSkill } from '../types';

export class SystemIntegrationService {
  private agentService: AgentService;
  private rulesService: RulesService;
  private skillsService: SkillsService;

  constructor() {
    this.agentService = new AgentService();
    this.rulesService = new RulesService();
    this.skillsService = new SkillsService();
  }

  // Get service instances
  getAgentService(): AgentService {
    return this.agentService;
  }

  getRulesService(): RulesService {
    return this.rulesService;
  }

  getSkillsService(): SkillsService {
    return this.skillsService;
  }

  // Integrated workflows

  /**
   * Create an agent with relevant skills and auto-generate compliance rules
   */
  async createAgentWithSkills(
    name: string,
    type: any,
    description: string,
    skillIds: string[],
    workspaceId?: string
  ): Promise<{ agent: Agent; skills: UserSkill[]; rules: BrandRule[] }> {
    // Create the agent
    const agent = await this.agentService.createAgent(name, type, description, workspaceId);

    // Assign skills to the agent (through skill mapping)
    const agentSkills = [];
    for (const skillId of skillIds) {
      const mapping = await this.skillsService.mapSkillToAgent(agent.id, skillId, 5);
      agentSkills.push(mapping);
    }

    // Auto-generate relevant rules for the agent type
    const rules = await this.generateAgentRules(agent.id, type, workspaceId);

    return { agent, skills: agentSkills, rules };
  }

  /**
   * Execute a task with automatic rule validation and skill progression
   */
  async executeTaskWithValidation(taskId: string): Promise<{
    task: AgentTask;
    ruleExecutions: RuleExecution[];
    skillProgress: UserSkill[];
  }> {
    // Get the task and agent
    const task = await this.agentService.getTask(taskId);
    if (!task) throw new Error('Task not found');

    const agent = await this.agentService.getAgent(task.agentId);
    if (!agent) throw new Error('Agent not found');

    // Execute relevant rules before task execution
    const ruleExecutions = await this.rulesService.executeRules(
      'on_asset_generation' as any,
      task.input,
      { userId: 'system', workspaceId: agent.workspaceId }
    );

    // Check if any rules blocked the execution
    const blockedExecution = ruleExecutions.find(execution => execution.status === 'blocked');
    if (blockedExecution) {
      throw new Error(`Task blocked by rule: ${blockedExecution.error}`);
    }

    // Execute the task
    const executedTask = await this.agentService.executeTask(taskId);

    // Update agent skills based on task completion
    const agentSkills = await this.skillsService.getAgentSkills(agent.id);
    const skillProgress = [];

    for (const agentSkill of agentSkills) {
      // Award experience for the skill
      const userSkill = await this.skillsService.addExperienceToUserSkill(
        `${agent.id}_${agentSkill.skillId}`,
        50, // Base experience points
        `Completed task: ${task.type}`
      );

      if (userSkill) {
        skillProgress.push(userSkill);
      }
    }

    return {
      task: executedTask,
      ruleExecutions,
      skillProgress
    };
  }

  /**
   * Create a skill-based rule that validates user capabilities
   */
  async createSkillValidationRule(
    skillId: string,
    requiredLevel: number,
    action: string,
    workspaceId?: string
  ): Promise<BrandRule> {
    const rule = await this.rulesService.createRule({
      name: `Skill Validation: ${skillId}`,
      description: `Validates that user has skill ${skillId} at level ${requiredLevel} or higher`,
      type: 'validation' as any,
      trigger: 'on_asset_generation' as any,
      status: 'active' as any,
      conditions: [
        {
          field: 'userSkill.level',
          operator: 'greater_than',
          value: requiredLevel - 1
        }
      ],
      actions: [
        {
          type: action as any,
          parameters: {
            skillId,
            requiredLevel
          }
        }
      ],
      priority: 7,
      workspaceId,
      createdBy: 'system'
    });

    return rule;
  }

  /**
   * Generate compliance rules based on agent type
   */
  private async generateAgentRules(agentId: string, agentType: any, workspaceId?: string): Promise<BrandRule[]> {
    const rules: BrandRule[] = [];

    switch (agentType) {
      case 'creative_assistant':
        // Rule: Validate brand consistency
        rules.push(await this.rulesService.createRule({
          name: 'Brand Consistency Validation',
          description: 'Ensures generated content follows brand guidelines',
          type: 'validation' as any,
          trigger: 'on_asset_generation' as any,
          status: 'active' as any,
          conditions: [
            {
              field: 'asset.brandId',
              operator: 'exists',
              value: null
            }
          ],
          actions: [
            {
              type: 'validate' as any,
              parameters: {
                checkColors: true,
                checkTypography: true,
                checkLayout: true
              }
            }
          ],
          priority: 8,
          workspaceId,
          createdBy: agentId
        }));
        break;

      case 'compliance_auditor':
        // Rule: Auto-flag potential violations
        rules.push(await this.rulesService.createRule({
          name: 'Auto Violation Detection',
          description: 'Automatically detects and flags brand guideline violations',
          type: 'compliance' as any,
          trigger: 'on_asset_generation' as any,
          status: 'active' as any,
          conditions: [
            {
              field: 'asset.complianceScore',
              operator: 'less_than',
              value: 70
            }
          ],
          actions: [
            {
              type: 'create_task' as any,
              parameters: {
                taskType: 'violation_review',
                priority: 'high'
              }
            }
          ],
          priority: 9,
          workspaceId,
          createdBy: agentId
        }));
        break;
    }

    return rules;
  }

  /**
   * Get comprehensive system dashboard data
   */
  async getSystemDashboard(workspaceId?: string): Promise<{
    agents: Agent[];
    activeRules: BrandRule[];
    userSkills: UserSkill[];
    recentExecutions: RuleExecution[];
    systemHealth: {
      totalAgents: number;
      activeAgents: number;
      totalRules: number;
      activeRules: number;
      totalSkillDefinitions: number;
      averageAgentPerformance: number;
    };
  }> {
    // Get agents for workspace
    const agents = workspaceId 
      ? await this.agentService.getAgentsByWorkspace(workspaceId)
      : Array.from((await this.agentService as any).agents.values());

    // Get active rules
    const activeRules = workspaceId
      ? await this.rulesService.getRulesByWorkspace(workspaceId)
      : Array.from((await this.rulesService as any).rules.values());

    // Get all skill definitions
    const skillDefinitions = await this.skillsService.getAllSkillDefinitions();

    // Get recent rule executions (last 24 hours)
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
    const recentExecutions = await this.rulesService.getExecutionsByTimeRange(twentyFourHoursAgo, Date.now());

    // Calculate system health metrics
    const systemHealth = {
      totalAgents: agents.length,
      activeAgents: agents.filter(agent => agent.status === 'active').length,
      totalRules: activeRules.length,
      activeRules: activeRules.filter(rule => rule.status === 'active').length,
      totalSkillDefinitions: skillDefinitions.length,
      averageAgentPerformance: agents.length > 0 
        ? agents.reduce((sum, agent) => sum + agent.performance.successRate, 0) / agents.length 
        : 0
    };

    return {
      agents,
      activeRules,
      userSkills: [], // Would need userId to get user skills
      recentExecutions,
      systemHealth
    };
  }

  /**
   * Create a learning path with associated rules and agent requirements
   */
  async createLearningPath(
    name: string,
    description: string,
    requiredSkills: string[],
    agentType?: any,
    workspaceId?: string
  ): Promise<{
    path: any;
    rules: BrandRule[];
    recommendations: Agent[];
  }> {
    // Create skill path
    const path = await this.skillsService.createSkillPath({
      name,
      description,
      category: 'technical' as any,
      requiredSkills,
      optionalSkills: [],
      estimatedDuration: requiredSkills.length * 10, // 10 hours per skill
      difficulty: 'intermediate',
      outcomes: [`Master ${requiredSkills.join(', ')}`],
      isActive: true,
      createdBy: 'system'
    }, 'system');

    // Create validation rules for each skill
    const rules = [];
    for (const skillId of requiredSkills) {
      const rule = await this.createSkillValidationRule(skillId, 3, 'validate', workspaceId);
      rules.push(rule);
    }

    // Recommend agents based on the path
    const recommendations = [];
    if (agentType) {
      const agents = workspaceId
        ? await this.agentService.getAgentsByWorkspace(workspaceId)
        : Array.from((await this.agentService as any).agents.values());

      recommendations.push(...agents.filter(agent => agent.type === agentType));
    }

    return { path, rules, recommendations };
  }

  /**
   * Perform system-wide backup and restore operations
   */
  async backupSystem(): Promise<{
    timestamp: number;
    agents: Agent[];
    rules: BrandRule[];
    skills: SkillDefinition[];
    version: string;
  }> {
    // Get all data from all services
    const agents = Array.from((await this.agentService as any).agents.values());
    const rules = Array.from((await this.rulesService as any).rules.values());
    const skills = await this.skillsService.getAllSkillDefinitions();

    return {
      timestamp: Date.now(),
      agents,
      rules,
      skills,
      version: '1.0.0'
    };
  }

  async restoreSystem(backup: any): Promise<{ success: boolean; errors?: string[] }> {
    const errors: string[] = [];

    try {
      // Restore agents
      for (const agent of backup.agents) {
        await this.agentService.createAgent(
          agent.name,
          agent.type,
          agent.description,
          agent.workspaceId
        );
      }

      // Restore rules
      for (const rule of backup.rules) {
        await this.rulesService.createRule(rule);
      }

      // Restore skill definitions
      for ( const skill of backup.skills) {
        await this.skillsService.createSkillDefinition(skill, skill.metadata.createdBy);
      }

      return { success: true };
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown error during restore');
      return { success: false, errors };
    }
  }
}
