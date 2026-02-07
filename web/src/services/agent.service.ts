import { Agent, AgentTask, AgentInteraction, AgentType, AgentStatus, AgentCapability, AgentSkill } from '../types';

export class AgentService {
  private agents: Map<string, Agent> = new Map();
  private tasks: Map<string, AgentTask> = new Map();
  private interactions: Map<string, AgentInteraction> = new Map();

  // Default agent configurations
  private getDefaultAgentConfig(type: AgentType) {
    switch (type) {
      case AgentType.CREATIVE_ASSISTANT:
        return {
          model: 'gemini-pro',
          temperature: 0.8,
          maxTokens: 2048,
          systemPrompt: 'You are a creative assistant specialized in brand-consistent content generation.',
          skills: [
            {
              id: 'prompt-crafting',
              name: 'Prompt Crafting',
              description: 'Generate detailed, brand-aligned prompts',
              capability: AgentCapability.PROMPT_GENERATION,
              level: 8,
              isActive: true
            }
          ],
          personality: {
            tone: 'creative',
            verbosity: 'detailed'
          }
        };
      
      case AgentType.COMPLIANCE_AUDITOR:
        return {
          model: 'gemini-pro',
          temperature: 0.2,
          maxTokens: 1024,
          systemPrompt: 'You are a compliance auditor ensuring brand guideline adherence.',
          skills: [
            {
              id: 'compliance-checking',
              name: 'Compliance Analysis',
              description: 'Analyze assets against brand guidelines',
              capability: AgentCapability.COMPLIANCE_CHECKING,
              level: 9,
              isActive: true
            }
          ],
          personality: {
            tone: 'professional',
            verbosity: 'concise'
          }
        };
      
      default:
        return {
          model: 'gemini-pro',
          temperature: 0.7,
          maxTokens: 1024,
          systemPrompt: 'You are a helpful AI assistant.',
          skills: [],
          personality: {
            tone: 'friendly',
            verbosity: 'detailed'
          }
        };
    }
  }

  // Agent management
  async createAgent(name: string, type: AgentType, description: string, workspaceId?: string): Promise<Agent> {
    const agent: Agent = {
      id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      type,
      status: AgentStatus.IDLE,
      description,
      config: this.getDefaultAgentConfig(type),
      workspaceId,
      createdAt: Date.now(),
      lastActive: Date.now(),
      performance: {
        tasksCompleted: 0,
        successRate: 100,
        averageResponseTime: 0
      }
    };

    this.agents.set(agent.id, agent);
    return agent;
  }

  async getAgent(id: string): Promise<Agent | null> {
    return this.agents.get(id) || null;
  }

  async getAgentsByWorkspace(workspaceId: string): Promise<Agent[]> {
    return Array.from(this.agents.values()).filter(agent => agent.workspaceId === workspaceId);
  }

  async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | null> {
    const agent = this.agents.get(id);
    if (!agent) return null;

    const updatedAgent = { ...agent, ...updates, updatedAt: Date.now() };
    this.agents.set(id, updatedAgent);
    return updatedAgent;
  }

  async deleteAgent(id: string): Promise<boolean> {
    return this.agents.delete(id);
  }

  // Task management
  async createTask(agentId: string, type: string, input: any, priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'): Promise<AgentTask> {
    const task: AgentTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentId,
      type,
      priority,
      input,
      status: 'pending',
      createdAt: Date.now()
    };

    this.tasks.set(task.id, task);
    
    // Update agent status
    const agent = await this.getAgent(agentId);
    if (agent) {
      await this.updateAgent(agentId, { status: AgentStatus.BUSY });
    }

    return task;
  }

  async getTask(id: string): Promise<AgentTask | null> {
    return this.tasks.get(id) || null;
  }

  async getTasksByAgent(agentId: string): Promise<AgentTask[]> {
    return Array.from(this.tasks.values()).filter(task => task.agentId === agentId);
  }

  async updateTask(id: string, updates: Partial<AgentTask>): Promise<AgentTask | null> {
    const task = this.tasks.get(id);
    if (!task) return null;

    const updatedTask = { ...task, ...updates };
    this.tasks.set(id, updatedTask);

    // Update agent status if task is completed or failed
    if (updates.status === 'completed' || updates.status === 'failed') {
      const agent = await this.getAgent(task.agentId);
      if (agent) {
        await this.updateAgent(task.agentId, { 
          status: AgentStatus.IDLE,
          lastActive: Date.now(),
          performance: {
            ...agent.performance,
            tasksCompleted: agent.performance.tasksCompleted + 1,
            successRate: updates.status === 'completed' ? 
              ((agent.performance.successRate * agent.performance.tasksCompleted + 100) / (agent.performance.tasksCompleted + 1)) :
              ((agent.performance.successRate * agent.performance.tasksCompleted) / (agent.performance.tasksCompleted + 1))
          }
        });
      }
    }

    return updatedTask;
  }

  // Agent interactions
  async recordInteraction(agentId: string, userId: string, type: string, message: string, response?: string): Promise<AgentInteraction> {
    const interaction: AgentInteraction = {
      id: `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentId,
      userId,
      type: type as any,
      message,
      response,
      timestamp: Date.now()
    };

    this.interactions.set(interaction.id, interaction);
    return interaction;
  }

  async getAgentInteractions(agentId: string): Promise<AgentInteraction[]> {
    return Array.from(this.interactions.values())
      .filter(interaction => interaction.agentId === agentId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  // Agent execution
  async executeTask(taskId: string): Promise<AgentTask> {
    const task = await this.getTask(taskId);
    if (!task) throw new Error('Task not found');

    const agent = await this.getAgent(task.agentId);
    if (!agent) throw new Error('Agent not found');

    // Update task status to in_progress
    await this.updateTask(taskId, { status: 'in_progress', startedAt: Date.now() });

    try {
      // Execute task based on type and agent capabilities
      const result = await this.processTask(agent, task);
      
      // Update task with result
      return await this.updateTask(taskId, {
        status: 'completed',
        output: result,
        completedAt: Date.now()
      }) || task;

    } catch (error) {
      // Update task with error
      return await this.updateTask(taskId, {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        completedAt: Date.now()
      }) || task;
    }
  }

  private async processTask(agent: Agent, task: AgentTask): Promise<any> {
    // This would integrate with the AI service
    // For now, return a mock response based on task type
    switch (task.type) {
      case 'prompt_generation':
        return {
          prompt: `Generated brand-aligned prompt for: ${task.input.subject}`,
          confidence: 0.85
        };
      
      case 'compliance_check':
        return {
          score: Math.random() * 100,
          violations: [],
          recommendations: ['Increase brand color usage', 'Improve typography alignment']
        };
      
      default:
        return {
          result: `Task processed by ${agent.name}`,
          timestamp: Date.now()
        };
    }
  }

  // Skill management for agents
  async addSkillToAgent(agentId: string, skill: AgentSkill): Promise<Agent | null> {
    const agent = await this.getAgent(agentId);
    if (!agent) return null;

    const updatedConfig = {
      ...agent.config,
      skills: [...agent.config.skills, skill]
    };

    return await this.updateAgent(agentId, { config: updatedConfig });
  }

  async removeSkillFromAgent(agentId: string, skillId: string): Promise<Agent | null> {
    const agent = await this.getAgent(agentId);
    if (!agent) return null;

    const updatedConfig = {
      ...agent.config,
      skills: agent.config.skills.filter(skill => skill.id !== skillId)
    };

    return await this.updateAgent(agentId, { config: updatedConfig });
  }
}
