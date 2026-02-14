# AGENTS.md

Welcome, AI Agent. This file provides you with the necessary context to operate within the **Brand OS / DNA Protocol** workspace.

## Project Overview
This project is a sophisticated brand management and automation system built with React 19, Supabase, and a custom DNA protocol for cross-context identity.

## AI Workspace Structure (`.agents/`)
We use a unified structure for all AI agents (Antigravity/Gemini, Claude Code, OpenCode, Kilo Code).

- **`.agents/agents/`**: Performance-optimized agent personas in Markdown.
- **`.agents/skills/`**: Atomic capabilities in native `SKILL.md` format.
- **`.agents/rules/`**: Global governance and operational rules.
- **`.agents/workflows/`**: Multi-agent orchestration sequences.
- **`.agents/protocols/`**: Core specifications (DSL, HITL, Communication).
- **`.agents/docs/`**: Platform-specific documentation and archives.

## Operational Rules
Before performing any task, you must review the rules in `.agents/rules/`. Enforced protocols (located in `.agents/protocols/`):
1.  **Workflow DSL**: Standardized task orchestration.
2.  **Communication Protocol**: Inter-agent handshake and context management.
3.  **HITL Protocol**: Risk-based human-in-the-loop approval gates.

### Core Priorities:
1. **Type Safety**: Maintain strict TypeScript adherence.
2. **Security**: Respect RLS policies and secure data exposure.
3. **Consistency**: Use existing UI components and service patterns.

## Tool Compatibility
- **Antigravity (Gemini)**: Targets `.agent` (junction). Use rules in `.agents/rules/antigravity.md`.
- **Claude Code**: Targets `.claude` (junction). Use rules in `.agents/rules/claude.md`.
- **OpenCode & Kilo Code**: Native `.agents/` support. Use rules in `.agents/rules/opencode.md`.
- **Unified Protocols**: All tools must follow the core protocols in `.agents/docs/`.

## Build & Test Commands
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Test**: `npm run test` or `vitest`
