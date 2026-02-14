# Brand DNA Workflow DSL Specification

## Overview

The Brand DNA Workflow DSL (Domain Specific Language) is a YAML-based format for defining executable AI workflows. It enables orchestrating multiple agents and skills into coherent, governed processes.

---

## File Extension

Workflow files use the `.af.yaml` extension (Automation Framework YAML).

---

## Schema

```yaml
version: "1.0.0"           # DSL version
name: "workflow-name"       # Human-readable name
description: "What this workflow does"

# Workflow metadata
metadata:
  author: "agent-name"
  created: "ISO-8601"
  tags: ["tag1", "tag2"]
  estimatedDuration: "minutes"

# Context passed between steps
context:
  brandId: "uuid"
  workspaceId: "uuid"
  userId: "uuid"
  variables:
    KEY: "value"

# Path awareness - where to look for files
paths:
  code: "../web/src/"       # For code operations
  ai: "./"                  # For AI config
  database: "../database/"  # For migrations

# Workflow steps
steps:
  - id: "step-1"
    name: "Step Name"
    description: "What this step does"
    
    # Dependencies - must complete before this runs
    dependsOn: ["step-0"]
    
    # Agent or skill to execute
    agent: "agent-name"
    skill: "skill-name"
    
    # Parameters passed to agent/skill
    parameters:
      key: "value"
    
    # Path awareness for this step
    workingDirectory: "../web/src/components/"
    
    # Gate type (hitl, passive, auto)
    gate: "auto|passive|hitl"
    
    # Validation commands to run after step
    validation:
      - command: "npm run typecheck"
        workingDirectory: "../web/"
        exitCode: 0
      - command: "npm run lint"
        workingDirectory: "../web/"
        exitCode: 0
    
    # Timeout in seconds
    timeout: 300
    
    # Retry configuration
    retry:
      maxAttempts: 3
      backoff: "exponential"
      delay: 1000

    # Success handler
    onSuccess:
      - log: "Step completed"
      - setVariable: "step1Result": "{{result}}"

    # Failure handler
    onFailure:
      - log: "Step failed: {{error}}"
      - notify: "user"
      - abort: true

# Parallel execution groups
parallel:
  - name: "parallel-group-1"
    steps:
      - id: "step-a"
        agent: "agent-a"
      - id: "step-b"
        agent: "agent-b"
    # All must succeed (default) or any (for optional)
    required: "all|any"

# Conditional execution
conditions:
  - if: "{{variable}} == 'value'"
    run: "step-id"
  - if: "{{riskScore}} > 0.7"
    run: "approval-step"

# Variables and expressions
variables:
  step1Result: ""
  riskScore: 0.0
  approved: false

# Expression syntax: {{variable}} or {{expression}}
# Supported: {{var}}, {{var == "val"}}, {{var > 5}}, {{array.length}}

# Output
output:
  artifacts:
    - name: "Component"
      path: "../web/src/components/BrandCard.tsx"
  summary: "Created BrandCard component"
  metrics:
    tokensUsed: 5000
    duration: 120
```

---

## Step Types

### Agent Step

```yaml
- id: "create-button"
  name: "Create Button Component"
  agent: "react-specialist"
  skill: "create-component"
  parameters:
    name: "Button"
    variant: "primary"
  gate: "auto"
```

### Skill Step

```yaml
- id: "write-copy"
  name: "Write Landing Page Copy"
  skill: "write-copy"
  parameters:
    page: "landing"
    tone: "professional"
  gate: "auto"
```

### Validation Step

```yaml
- id: "validate-build"
  name: "Validate Build"
  validation:
    - command: "npm run build"
      workingDirectory: "../web/"
      exitCode: 0
```

### Approval Step

```yaml
- id: "human-approval"
  name: "Get User Approval"
  gate: "hitl"
  parameters:
    message: "Ready to deploy to production"
    riskScore: 0.8
```

---

## Gate Types

| Gate | Symbol | Behavior |
|------|--------|----------|
| auto | 🟢 | Execute immediately |
| passive | 🟡 | 30-second countdown, auto-execute |
| hitl | 🔴 | Wait for explicit approval |

---

## Path Awareness

Paths are relative to the workflow file location:

```yaml
paths:
  code: "../web/src/"       # Goes up to Brand DNA, then into web/src
  ai: "./"                  # Current ai-workspace directory
  database: "../database/"  # Database schemas
  
# Usage in steps
- id: "create-component"
  workingDirectory: "{{paths.code}}components/ui/"
```

---

## Dependencies

Steps can depend on multiple previous steps:

```yaml
steps:
  - id: "step-1"
    name: "First"
    
  - id: "step-2"
    name: "Second"
    dependsOn: ["step-1"]
    
  - id: "step-3"
    name: "Third"
    dependsOn: ["step-1", "step-2"]
```

---

## Parallel Execution

Run multiple steps concurrently:

```yaml
parallel:
  - name: "create-assets"
    steps:
      - id: "write-copy"
        skill: "write-copy"
      - id: "design-ui"
        skill: "design-component"
      - id: "generate-prompts"
        skill: "generate-image-prompt"
```

---

## Error Handling

```yaml
steps:
  - id: "risky-operation"
    retry:
      maxAttempts: 3
      backoff: "exponential"
    onFailure:
      - log: "Operation failed: {{error}}"
      - setVariable: "fallbackExecuted": true
      - runStep: "fallback-step"
```

---

## Variables and Expressions

```yaml
variables:
  brandName: "Acme Corp"
  riskScore: 0.5
  
steps:
  - id: "calculate-risk"
    onSuccess:
      - setVariable: "riskScore": "{{steps.analysis.riskScore}}"
      
  - id: "conditional-step"
    conditions:
      - if: "{{riskScore}} > 0.7"
        run: "approval-step"
```

---

## Built-in Functions

| Function | Description | Example |
|----------|-------------|---------|
| `{{now}}` | Current timestamp | `{{now}}` |
| `{{uuid}}` | Generate UUID | `{{uuid}}` |
| `{{env.VAR}}` | Environment variable | `{{env.NODE_ENV}}` |
| `{{file.contents}}` | Read file | `{{file../web/package.json}}` |
| `{{glob.pattern}}` | Match files | `{{glob.**/*.ts}}` |

---

## Workflow Execution

### CLI Usage

```bash
# Run a workflow
ai-workspace run feature-add.af.yaml

# Run with variables
ai-workspace run feature-add.af.yaml --var brandId=abc123

# Dry run (validate only)
ai-workspace run feature-add.af.yaml --dry-run

# Resume from step
ai-workspace run feature-add.af.yaml --resume step-3
```

### Programmatic

```javascript
import { executeWorkflow } from './workflow-engine';

const result = await executeWorkflow('./workflows/feature-add.af.yaml', {
  context: { brandId: 'uuid' },
  dryRun: false
});
```

---

## Validation

Workflows are validated before execution:

1. **Schema validation**: YAML syntax
2. **Step references**: All dependencies exist
3. **Agent/skills exist**: Verify agent and skill names
4. **Path validation**: Working directories exist
5. **Gate configuration**: HITL steps marked correctly

---

## State Persistence

Workflow state is persisted for recovery:

```yaml
.state/
  workflows/
    feature-add/
      execution-uuid/
        state.json    # Current step, variables
        artifacts/    # Generated files
        log.txt       # Execution log
```

---

## Best Practices

1. **Idempotent steps**: Can run multiple times safely
2. **Clear step names**: Document what each step does
3. **Fail fast**: Validate early, fail early
4. **Atomic operations**: Each step should be atomic
5. **Log everything**: Use onSuccess/onFailure logging
6. **Rollback plans**: Always know how to undo
7. **Small steps**: Prefer many small steps over few large ones
