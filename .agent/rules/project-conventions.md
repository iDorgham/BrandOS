# Rule: Project Conventions

All generated code must follow existing project conventions, naming patterns, and architectural decisions.

## Code Style

- Match the surrounding code style
- Use existing utility functions and helpers
- Follow import order conventions

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `BrandCard.tsx` |
| Services/Utils | camelCase.ts | `brand.service.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Types/Interfaces | PascalCase.ts | `Brand interface` |
| Hooks | use prefix | `useDebounce.ts` |

## Architectural Patterns

- **Feature-Sliced Design** - Group by feature, not by type
- **Service Layer** - All API calls in services/
- **Context API** - For global state, not local state
- **Database-First** - Schema changes via migrations only
