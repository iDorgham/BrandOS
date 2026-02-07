import { BrandRule, RuleExecution, RuleViolation, RuleType, RuleTrigger, RuleStatus, RuleCondition, RuleAction } from '../types';

export class RulesService {
  private rules: Map<string, BrandRule> = new Map();
  private executions: Map<string, RuleExecution> = new Map();
  private violations: Map<string, RuleViolation> = new Map();

  // Rule management
  async createRule(rule: Omit<BrandRule, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Promise<BrandRule> {
    const newRule: BrandRule = {
      ...rule,
      id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1
    };

    this.rules.set(newRule.id, newRule);
    return newRule;
  }

  async getRule(id: string): Promise<BrandRule | null> {
    return this.rules.get(id) || null;
  }

  async getRulesByWorkspace(workspaceId: string): Promise<BrandRule[]> {
    return Array.from(this.rules.values()).filter(rule => rule.workspaceId === workspaceId);
  }

  async getRulesByBrand(brandId: string): Promise<BrandRule[]> {
    return Array.from(this.rules.values()).filter(rule => rule.brandId === brandId);
  }

  async getActiveRulesByTrigger(trigger: RuleTrigger): Promise<BrandRule[]> {
    return Array.from(this.rules.values()).filter(rule => 
      rule.status === RuleStatus.ACTIVE && rule.trigger === trigger
    );
  }

  async updateRule(id: string, updates: Partial<BrandRule>): Promise<BrandRule | null> {
    const rule = this.rules.get(id);
    if (!rule) return null;

    const updatedRule = {
      ...rule,
      ...updates,
      updatedAt: Date.now(),
      version: rule.version + 1
    };

    this.rules.set(id, updatedRule);
    return updatedRule;
  }

  async deleteRule(id: string): Promise<boolean> {
    return this.rules.delete(id);
  }

  // Rule execution
  async executeRules(trigger: RuleTrigger, inputData: any, context?: { userId?: string, workspaceId?: string }): Promise<RuleExecution[]> {
    const relevantRules = await this.getActiveRulesByTrigger(trigger);
    
    // Filter rules by workspace/brand if context provided
    const filteredRules = relevantRules.filter(rule => {
      if (context?.workspaceId && rule.workspaceId && rule.workspaceId !== context.workspaceId) {
        return false;
      }
      if (context?.workspaceId && rule.brandId) {
        // Additional logic to check if brand belongs to workspace
        return true; // Simplified for now
      }
      return true;
    });

    const executions: RuleExecution[] = [];

    for (const rule of filteredRules) {
      const execution = await this.executeRule(rule, inputData, context);
      executions.push(execution);
    }

    return executions;
  }

  private async executeRule(rule: BrandRule, inputData: any, context?: { userId?: string }): Promise<RuleExecution> {
    const startTime = Date.now();

    const execution: RuleExecution = {
      id: `execution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ruleId: rule.id,
      triggerType: rule.trigger,
      inputData,
      status: 'executing',
      executionTime: 0,
      timestamp: startTime,
      userId: context?.userId
    };

    this.executions.set(execution.id, execution);

    try {
      // Check conditions
      const conditionsMet = await this.evaluateConditions(rule.conditions, inputData);
      
      if (conditionsMet) {
        // Execute actions
        const results = await this.executeActions(rule.actions, inputData, context);
        
        execution.outputData = results;
        execution.status = 'success';
      } else {
        execution.status = 'pending'; // Conditions not met
      }
    } catch (error) {
      execution.status = 'failed';
      execution.error = error instanceof Error ? error.message : 'Unknown error';
    }

    execution.executionTime = Date.now() - startTime;
    this.executions.set(execution.id, execution);

    return execution;
  }

  private async evaluateConditions(conditions: RuleCondition[], inputData: any): Promise<boolean> {
    if (conditions.length === 0) return true;

    let result = true;
    let currentOperator: 'AND' | 'OR' = 'AND';

    for (const condition of conditions) {
      const conditionResult = this.evaluateCondition(condition, inputData);
      
      if (condition.logicalOperator) {
        currentOperator = condition.logicalOperator;
      }

      if (currentOperator === 'AND') {
        result = result && conditionResult;
      } else {
        result = result || conditionResult;
      }
    }

    return result;
  }

  private evaluateCondition(condition: RuleCondition, inputData: any): boolean {
    const fieldValue = this.getFieldValue(inputData, condition.field);
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'not_equals':
        return fieldValue !== condition.value;
      case 'contains':
        return String(fieldValue).includes(String(condition.value));
      case 'greater_than':
        return Number(fieldValue) > Number(condition.value);
      case 'less_than':
        return Number(fieldValue) < Number(condition.value);
      case 'matches':
        return new RegExp(condition.value).test(String(fieldValue));
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(fieldValue);
      case 'not_in':
        return Array.isArray(condition.value) && !condition.value.includes(fieldValue);
      default:
        return false;
    }
  }

  private getFieldValue(obj: any, fieldPath: string): any {
    return fieldPath.split('.').reduce((current, key) => current?.[key], obj);
  }

  private async executeActions(actions: RuleAction[], inputData: any, context?: { userId?: string }): Promise<any[]> {
    const results: any[] = [];

    for (const action of actions) {
      try {
        const result = await this.executeAction(action, inputData, context);
        results.push(result);
      } catch (error) {
        console.error(`Failed to execute action ${action.type}:`, error);
        results.push({ error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }

    return results;
  }

  private async executeAction(action: RuleAction, inputData: any, context?: { userId?: string }): Promise<any> {
    switch (action.type) {
      case 'validate':
        return this.validateData(inputData, action.parameters);
      
      case 'transform':
        return this.transformData(inputData, action.parameters);
      
      case 'notify':
        return this.sendNotification(action.parameters, context);
      
      case 'block':
        throw new Error(action.parameters.message || 'Action blocked by rule');
      
      case 'modify':
        return this.modifyData(inputData, action.parameters);
      
      case 'create_task':
        return this.createTask(action.parameters, context);
      
      case 'update_field':
        return this.updateField(inputData, action.parameters);
      
      default:
        return { message: `Unknown action type: ${action.type}` };
    }
  }

  private validateData(data: any, parameters: any): any {
    return {
      valid: true,
      score: Math.random() * 100,
      violations: [],
      parameters
    };
  }

  private transformData(data: any, parameters: any): any {
    return {
      ...data,
      transformed: true,
      parameters
    };
  }

  private sendNotification(parameters: any, context?: { userId?: string }): any {
    console.log(`Notification sent to ${context?.userId}:`, parameters.message);
    return {
      sent: true,
      recipient: context?.userId,
      message: parameters.message
    };
  }

  private modifyData(data: any, parameters: any): any {
    const { field, value } = parameters;
    return {
      ...data,
      [field]: value
    };
  }

  private createTask(parameters: any, context?: { userId?: string }): any {
    return {
      taskId: `task_${Date.now()}`,
      created: true,
      parameters,
      createdBy: context?.userId
    };
  }

  private updateField(data: any, parameters: any): any {
    const { field, value } = parameters;
    return {
      ...data,
      [field]: value
    };
  }

  // Violation management
  async createViolation(ruleId: string, severity: 'low' | 'medium' | 'high' | 'critical', message: string, context: any): Promise<RuleViolation> {
    const violation: RuleViolation = {
      id: `violation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ruleId,
      severity,
      message,
      context,
      createdAt: Date.now()
    };

    this.violations.set(violation.id, violation);
    return violation;
  }

  async getViolationsByRule(ruleId: string): Promise<RuleViolation[]> {
    return Array.from(this.violations.values()).filter(violation => violation.ruleId === ruleId);
  }

  async resolveViolation(violationId: string, resolvedBy: string): Promise<RuleViolation | null> {
    const violation = this.violations.get(violationId);
    if (!violation) return null;

    const resolvedViolation = {
      ...violation,
      resolvedAt: Date.now(),
      resolvedBy
    };

    this.violations.set(violationId, resolvedViolation);
    return resolvedViolation;
  }

  // Execution history
  async getExecutionsByRule(ruleId: string): Promise<RuleExecution[]> {
    return Array.from(this.executions.values())
      .filter(execution => execution.ruleId === ruleId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  async getExecutionsByTimeRange(start: number, end: number): Promise<RuleExecution[]> {
    return Array.from(this.executions.values())
      .filter(execution => execution.timestamp >= start && execution.timestamp <= end)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
}
