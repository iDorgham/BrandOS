# Rule: Component-Based UI

Build reusable, composable UI components following React best practices.

## Component Structure

- Small, focused components (single responsibility)
- Props interface for all component inputs
- Memoize expensive computations with `useMemo`/`useCallback`
- Lazy load with `React.lazy()` for route components

## Component Organization

```
components/
├── ui/           # Reusable, UI-agnostic components
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
├── layout/       # Layout components (Header, Sidebar)
└── features/     # Feature-specific components
    └── brand/
        └── BrandCard/
```

## State Management

- **Local state**: `useState` for component-specific state
- **Context**: For cross-component state (theme, auth)
- **Services**: For server state (API calls)
