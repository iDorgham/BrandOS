# Brand OS - Project Structure

## 📁 Folder Organization

```
web/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Button, Card, Input, Textarea)
│   │   ├── brand/          # Brand-specific components (NegativeSpaceVisualizer, Tooltip)
│   │   ├── creative/       # Creative studio components (placeholder for future)
│   │   └── layout/         # Layout components (Sidebar, Header)
│   │
│   ├── features/           # Feature-based modules
│   │   ├── dashboard/      # Dashboard view and logic
│   │   ├── doctrine/       # Brand doctrine configuration
│   │   ├── studio/         # Creative studio for asset generation
│   │   ├── library/        # Asset library/vault
│   │   └── settings/       # Settings and configuration
│   │
│   ├── services/           # API and external services
│   │   └── gemini.service.ts  # Google Gemini AI integration
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── useLocalStorage.ts # localStorage management hook
│   │
│   ├── types/              # TypeScript types and interfaces
│   │   └── index.ts        # All type definitions
│   │
│   ├── utils/              # Utility functions
│   │   └── index.ts        # Helper functions (ID generation, file handling, etc.)
│   │
│   ├── constants/          # Constants and configuration
│   │   └── index.ts        # App constants (ASSET_TYPES, INITIAL_BRANDS, etc.)
│   │
│   ├── styles/             # Global styles
│   │   └── index.css       # Global CSS and animations
│   │
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
│
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── .env.local              # Environment variables
```

## 🎯 Architecture Principles

### 1. **Feature-Based Organization**
Each major feature (Dashboard, Doctrine, Studio, Library, Settings) has its own folder under `features/`. This makes it easy to:
- Find related code
- Scale features independently
- Remove or add features without affecting others

### 2. **Component Hierarchy**
- **ui/**: Primitive, reusable UI components (Button, Card, Input)
- **brand/**: Domain-specific components (NegativeSpaceVisualizer)
- **layout/**: App-level layout components (Sidebar, Header)
- **creative/**: Creative-specific components (future expansion)

### 3. **Separation of Concerns**
- **services/**: External API calls and integrations
- **hooks/**: Reusable React logic
- **utils/**: Pure utility functions
- **types/**: TypeScript definitions
- **constants/**: Static configuration

## 🚀 Import Patterns

### Using Path Aliases
The project is configured with `@` alias pointing to `src/`:

```typescript
// Instead of:
import { Button } from '../../components/ui';

// You can use:
import { Button } from '@/components/ui';
```

### Recommended Import Order
```typescript
// 1. External dependencies
import React, { useState } from 'react';
import { Box, Zap } from 'lucide-react';

// 2. Components
import { Button, Card } from '@/components/ui';
import { Sidebar, Header } from '@/components/layout';

// 3. Features
import { DashboardView } from '@/features/dashboard/DashboardView';

// 4. Services & Hooks
import { checkApiKeyStatus } from '@/services/gemini.service';
import { useLocalStorage } from '@/hooks';

// 5. Types & Constants
import { BrandProfile } from '@/types';
import { INITIAL_BRANDS } from '@/constants';

// 6. Utils
import { generateId } from '@/utils';
```

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `DashboardView.tsx`, `Sidebar.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- **Services**: camelCase with `.service` suffix (e.g., `gemini.service.ts`)
- **Utils**: camelCase (e.g., `index.ts`)
- **Types**: PascalCase for interfaces/types (e.g., `BrandProfile`)

## 🔄 Migration from Old Structure

The old flat structure has been reorganized:

| Old Location | New Location |
|--------------|--------------|
| `types.ts` | `src/types/index.ts` |
| `geminiService.ts` | `src/services/gemini.service.ts` |
| `App.tsx` (monolithic) | `src/App.tsx` + `src/features/*` |
| `index.tsx` | `src/main.tsx` |

## 🛠️ Development Workflow

### Adding a New Feature
1. Create folder in `src/features/[feature-name]/`
2. Create `[FeatureName]View.tsx` component
3. Add any feature-specific components in the same folder
4. Import and use in `src/App.tsx`

### Adding a New UI Component
1. Create in `src/components/ui/[ComponentName].tsx`
2. Export from `src/components/ui/index.tsx`
3. Import where needed: `import { ComponentName } from '@/components/ui'`

### Adding a New Service
1. Create `src/services/[service-name].service.ts`
2. Export functions
3. Import: `import { functionName } from '@/services/[service-name].service'`

## 📦 Benefits of This Structure

✅ **Scalability**: Easy to add new features without cluttering  
✅ **Maintainability**: Related code is grouped together  
✅ **Testability**: Each module can be tested independently  
✅ **Reusability**: Components and utilities are easy to find and reuse  
✅ **Team Collaboration**: Clear boundaries reduce merge conflicts  
✅ **Performance**: Easier to implement code-splitting by feature  

## 🔧 Next Steps

1. **Complete Feature Views**: Migrate full logic from old `App.tsx` to feature views
2. **Add Tests**: Create `__tests__` folders alongside components
3. **Add Storybook**: Document components in isolation
4. **Implement Code Splitting**: Use React.lazy() for feature views
5. **Add Error Boundaries**: Wrap features in error boundaries

## 📚 Resources

- [React Project Structure Best Practices](https://react.dev/learn/thinking-in-react)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Vite Path Aliases](https://vitejs.dev/config/shared-options.html#resolve-alias)
