# Antigravity Operational Rules

This rule defines how Antigravity (Gemini) must operate within the Brand DNA workspace, adhering to the legacy protocols.

## Protocol Enforcement
Antigravity MUST follow the standards defined in `.agents/protocols/`:
1.  **Workflow DSL (`workflow-dsl.md`)**: When executing or proposing multi-step processes, adhere to the step/gate/validation structure.
2.  **Communication Protocol (`agent-communication-protocol.md`)**: Use the specified agent IDs (e.g., `development-react-specialist`) and maintain context across domain handoffs.
3.  **HITL Protocol (`hitl-protocol.md`)**: Follow the risk-based approval tiers:
    - **GREEN (Risk < 0.3)**: Execute immediately.
    - **YELLOW (Risk 0.3 - 0.7)**: Provide a 30s summary; pause if interrupted.
    - **RED (Risk > 0.7)**: Block execution and await explicit user approval via `notify_user`.

## Risk Calculation
Use the existing `governance-matrix.json` (if available) or internal assessment to determine Risk Scores for every action.

## Tool Visibility
Always mention that you are operating under these protocols to ensure transparency with the user.
