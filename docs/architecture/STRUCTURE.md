# Brand OS - Project Structure

## 📁 Folder Organization

```
brand-dna/
├── web/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI components (Button, Card, Input)
│   │   │   ├── brand/          # Brand visualizers (NegativeSpaceVisualizer)
│   │   │   └── layout/         # Layout (Sidebar, Header)
│   │   │
│   │   ├── features/           # Feature Modules
│   │   │   ├── analytics/      # Performance & Usage Analytics
│   │   │   ├── audit/          # Compliance Audit Logs
│   │   │   ├── dashboard/      # Main Command Center
│   │   │   ├── deployment/     # Deployment Hub & Approvals
│   │   │   ├── doctrine/       # Brand Rules Engine
│   │   │   ├── identity/       # Visual Identity Management
│   │   │   ├── library/        # Asset Vault
│   │   │   ├── moodboard/      # Node-Based Creative Canvas
│   │   │   ├── profile/        # User Profile
│   │   │   ├── settings/       # System Config & Team Mgmt
│   │   │   ├── studio/         # AI Generation Studio
│   │   │   ├── team/           # Collaboration
│   │   │   └── training/       # AI Model Fine-tuning
│   │   │
│   │   ├── services/           # Service Layer
│   │   │   ├── agent.service.ts        # AI Agent orchestration
│   │   │   ├── ai.service.ts           # Multi-model AI router
│   │   │   ├── brand.service.ts        # Brand CRUD
│   │   │   ├── gemini.service.ts       # Google Gemini integration
│   │   │   ├── persistence.service.ts  # State sustainability
│   │   │   ├── promptBatch.service.ts  # Batch generation
│   │   │   ├── rules.service.ts        # Business logic & compliance
│   │   │   ├── skills.service.ts       # Agent capability manager
│   │   │   └── supabase.service.ts     # DB Client
│   │   │
│   │   ├── hooks/              # Custom React Logic
│   │   ├── types/              # TypeScript Definitions
│   │   ├── utils/              # Shared Utilities
│   │   ├── constants/          # App Constraints
│   │   └── styles/             # Global CSS & Tailwind
│   │
│   ├── public/                 # Static Assets
│   └── ...config files         # Vite, Tailwind, TSConfig
│
├── supabase/
│   ├── migrations/             # SQL Migration History
│   │   └── fixes/              # Hotfixes & Security Patches
│   └── security/               # Security Reports & Policies
│
└── docs/                       # Project Documentation
    ├── architecture/           # Technical Specs
    ├── product/                # PRD & Requirements
    └── ...
```

## 🎯 Architecture Principles

### 1. **Feature-Sliced Design (Modified)**
Each major feature is encapsulated in `src/features/`. A feature folder typically contains:
- `[Feature]View.tsx`: The main page/view component.
- Internal components specific to that feature.
- Feature-specific hooks or utilities.

### 2. **Service Layer Abstraction**
All external side-effects (API calls, DB interactions, AI generation) are abstracted into `src/services/`. UI components never call `fetch` directly; they use service methods.
- **Example**: `ai.service.ts` handles the complexity of routing prompts to Gemini, Claude, or DALL-E based on the task type.

### 3. **Database-First Security**
- **Row Level Security (RLS)**: Enforced at the Supabase level.
- **Policies**: Strict access control based on `workspace_id` and `user_id`.
- **Migrations**: All schema changes are versioned in `supabase/migrations/`.

## 🚀 Import Patterns

We use `@/` alias for cleaner imports.

```typescript
// Components
import { Button } from '@/components/ui';
import { Sidebar } from '@/components/layout';

// Features
import { DeploymentView } from '@/features/deployment/DeploymentView';

// Services
import { aiService } from '@/services/ai.service';
```

## 📝 File Naming

- **React Components**: `PascalCase.tsx`
- **Services/Utils**: `camelCase.ts` or `camelCase.service.ts`
- **Constants**: `UPPER_SNAKE_CASE` inside `constants/index.ts`

## 🛠️ Development Workflow

1.  **New Feature**: Create directory in `features/` -> Add View Component -> Add Route in `App.tsx`.
2.  **Database Change**: Create SQL migration in `supabase/migrations/` -> Apply locally -> Update Types.
3.  **UI Component**: Add to `components/ui` using Carbon Design System principles.

## 📦 Key Subsystems

-   **Creative Engine**: `studio/` + `moodboard/` backed by `ai.service.ts` and `gemini.service.ts`.
-   **Brand Governance**: `doctrine/` + `library/` backed by `rules.service.ts`.
-   **Enterprise Core**: `settings/` + `team/` + `audit/` + `deployment/`.
