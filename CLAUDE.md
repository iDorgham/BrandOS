# CLAUDE.md - Brand OS

This file provides guidance for AI assistants working with the Brand OS codebase.

## Project Overview

Brand OS is a cloud-native SaaS platform that transforms static brand guidelines into AI-driven creative systems. It enables designers, brand teams, and agencies to generate on-brand visual assets while maintaining brand adherence. The platform uses an AI agent architecture with 8 specialized agents (Creative Director, Art Director, Brand Strategist, Senior Designer, Social Media Manager, Copywriter, Motion Designer, Production Manager).

## Tech Stack

- **Frontend**: React 19, TypeScript 5.8, Vite 6
- **Styling**: Tailwind CSS 3.4, CSS variables (Carbon Design System tokens), Framer Motion
- **State**: React Context API (AuthContext, SettingsContext, ThemeContext) - no Redux/Zustand
- **Backend**: Supabase (PostgreSQL with Row-Level Security, Realtime, Storage)
- **Auth**: Google OAuth 2.0 via Supabase Auth
- **AI**: Google Gemini (`@google/genai`), multi-model routing (Gemini, Anthropic, OpenAI)
- **Canvas**: `@xyflow/react` for node-based moodboard editor
- **Optimization**: Debounced search/sliders, throttled resize handlers
- **Deployment**: Vercel (static SPA with rewrites)

## Repository Structure

```
BrandOS/
├── web/                        # Main application (all dev happens here)
│   ├── src/
│   │   ├── App.tsx             # Root component, tab-based routing (no react-router)
│   │   ├── ...
│   │   ├── services/           # Service layer
│   │   ├── ...
│   │   └── test/               # Test setup (vitest)
├── .agents/                    # Unified AI Workspace (Source of Truth)
│   ├── agents/                 # Specialized agent personas (Markdown)
│   ├── skills/                 # Atomic agent capabilities (SKILL.md)
│   ├── rules/                  # Governance and safety rules
│   ├── workflows/              # Multi-agent orchestration
│   ├── docs/                   # AI protocols and documentation
│   └── config/                 # Governance matrix and tool configs
├── .agent/                     # Junction to .agents (for Antigravity)
├── .claude/                    # Junction to .agents (for Claude Code)
├── supabase/                   # Migrations and security-audit
├── database/                   # Schema definitions
├── docs/                       # Project documentation (moved from root)
├── Trash/                      # Temporary storage for redundant files
├── AGENTS.md                   # AI Agent entry point (Context & Rules)
├── vercel.json                 # Vercel deployment config
├── CONTRIBUTING.md             # Contributing guidelines
└── README.md
```

## Development Commands

All commands run from the `web/` directory:

```bash
cd web
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build (Terser minification, console.log removal)
npm run preview      # Preview production build locally
npm run test         # Run tests (vitest)
npm run test:ui      # Run tests with browser UI
```

Bundle analysis: `ANALYZE=true npm run build` (opens rollup-plugin-visualizer report).

## Architecture Patterns

### Routing

The app uses **tab-based routing via React state** (`activeTab` in `App.tsx`), not react-router. Navigation is handled by `setActiveTab()`. All feature views are lazy-loaded with `React.lazy` and wrapped in `React.Suspense`.

### Data Flow

```
Components -> Services -> Supabase
     ↑                       |
     └── Context Providers ←─┘ (real-time subscriptions)
```

- **No direct Supabase calls from components** - always go through services or hooks
- `AuthContext` holds user, brands, assets, prompt history, and active workspace
- Real-time updates via Supabase Realtime WebSocket subscriptions

### Component Patterns

- **Functional components only** (no class components)
- Props interfaces defined inline as `interface Props { ... }`
- Named exports for page components, default exports for lazy-loaded views
- `ErrorBoundary` wraps all feature views

### Design System

The project uses a **Carbon Design System-inspired** token system with CSS custom properties:
- Colors: `var(--cds-ui-background)`, `var(--cds-interactive-01)`, `var(--cds-text-primary)`, etc.
- Tailwind maps to HSL CSS variables: `bg-background`, `text-foreground`, `bg-primary`
- Fonts: IBM Plex Sans (body), IBM Plex Mono (code)
- Border radius: Intentionally flat (all mapped to `4px`, no rounded corners)
- Box shadows: Intentionally disabled (all `none`) - the design uses borders and background contrast
- Dark mode: via `class` strategy on Tailwind

## File Naming Conventions

- **Components**: PascalCase (`BrandCard.tsx`)
- **Services**: camelCase with `.service.ts` suffix (`brand.service.ts`)
- **Hooks**: camelCase with `use` prefix (`usePresence.ts`)
- **Types**: camelCase with `.types.ts` or in `types/` directory
- **Agents**: kebab-case (`creative-director.ts`)
- **Feature views**: PascalCase with `View` suffix (`DashboardView.tsx`)

## Commit Message Format

```
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Examples:
```
feat(studio): add batch generation with 4-10 variations
fix(sidebar): resolve toggle button alignment issue
perf(database): add indexes for brand queries
```

## Environment Variables

Required in `web/.env` (see `web/.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GOOGLE_AI_API_KEY=your-gemini-key  # or configured via AI Studio extension
```

Optional:
```
VITE_OPENAI_API_KEY=...
VITE_ANTHROPIC_API_KEY=...
VITE_APP_ENV=production
```

All client-side env vars must be prefixed with `VITE_`.

## Database

- **Supabase PostgreSQL** with Row-Level Security (RLS) on all tables
- Core tables: `profiles`, `brands`, `assets`, `prompt_history`, `moodboards`, `workspaces`, `comments`, `deployments`
- UUID primary keys, JSONB metadata fields, automatic `updated_at` triggers
- RLS policies based on `auth.uid()` and `workspace_id`
- Migrations in `supabase/migrations/` (ordered by date prefix)
- Schema definitions in `database/`

## Key Conventions for AI Assistants

1. **Working directory**: Most code changes happen under `web/src/`. Always `cd web` before running npm commands.
2. **No react-router**: Navigation is state-driven. To add a new view, add a lazy import in `App.tsx` and a corresponding `activeTab` case.
3. **Service layer**: Never make direct Supabase calls from components. Use or create services in `web/src/services/`.
4. **TypeScript**: Use explicit types. Avoid `any`. Define interfaces for component props.
5. **Styling**: Use Tailwind utilities with CSS variable tokens. Prefer `var(--cds-*)` tokens for colors in custom CSS. No box shadows or rounded corners by design.
6. **Path alias**: Use `@/` to import from `web/src/`.
7. **AI Workspace**: Use `.agents/` for all agent personas (MD), skills (SKILL.md), and workflows.
8. **Lazy loading**: New feature views should be lazy-loaded with `React.lazy()` in `App.tsx`.
9. **No linter config**: There is no ESLint or Prettier configuration. Follow existing code style.
10. **Build validation**: Run `npm run build` from `web/` to verify changes compile.
11. **Testing**: Vitest is configured but test coverage is minimal.
12. **Performance**: Use `useDebounce` for search inputs and `useThrottle` for window resize events to minimize re-renders.
13. **Security**: Never commit `.env` files. Supabase RLS is the primary security boundary.
14. **Deployment**: Vercel deploys from `web/dist`. The `vercel.json` at root handles build commands and SPA rewrites.
