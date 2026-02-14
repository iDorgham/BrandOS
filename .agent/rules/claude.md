# Claude Operational Rules

This rule defines how Claude (CLI/Extension) must operate within the Brand DNA workspace.

## Required Protocols
You MUST strictly adhere to the protocols in `.agents/protocols/`:
1.  **Workflow DSL (`workflow-dsl.md`)**: Use the YAML-based orchestration patterns for multi-step tasks.
2.  **Communication Protocol (`agent-communication-protocol.md`)**: Maintain agent IDs and domain-specific context.
3.  **HITL Protocol (`hitl-protocol.md`)**: Adhere to risk-based gates:
    - **GREEN**: Continue.
    - **YELLOW**: Summarize and wait for interruption (or 30s).
    - **RED**: Stop and request explicit approval.

## Context Entry
Always check `AGENTS.md` in the root directory for project-level mission and constraints.
