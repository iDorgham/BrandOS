# Rule: Type Safety

Always use TypeScript's type system to ensure code reliability and catch errors early.

## Core Principles

1. **Avoid `any`** - Use explicit types or generics
2. **Use interfaces** - Define clear interfaces for data structures
3. **Type inference** - Let TS infer types when obvious
4. **Strict mode** - Enable strict mode in tsconfig.json

## Type Patterns

```typescript
// Good: Explicit interface
interface Brand {
  id: string;
  name: string;
  palette: string[];
}

// Good: Generic function
function getById<T>(id: string): Promise<T> {
  return db.query<T>('SELECT * WHERE id = ?', [id]);
}

// Bad: Any type
const data: any = fetchData();
```
