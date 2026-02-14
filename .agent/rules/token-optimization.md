# Rule: Token Optimization (CRITICAL)

**Token minimization is the highest priority.** Every unnecessary token costs money and reduces the effectiveness of AI operations.

---

## Golden Rules

1. **Grep-first protocol**: NEVER read files without searching first
2. **Max 5 files** in any context window
3. **Reference patterns** instead of regenerating code
4. **Cache aggressively** with TTL
5. **Batch where possible**

---

## Grep-First Protocol

```bash
# ❌ BAD: Read directory to find components
ls src/components/ui/
read src/components/ui/Button.tsx

# ✅ GOOD: Grep for pattern, then read specific file
grep -r "interface ButtonProps" src/
read src/components/ui/Button.tsx
```

### Grep Patterns by Task

| Task | Grep Pattern |
|------|--------------|
| Find service | `brandService` |
| Find component | `export function.*Button` |
| Find hook | `use[A-Z]` |
| Find type | `interface.*Props` |
| Find style | `className=` |

---

## Context Management

### Max 5 Files Rule

- Read only 3-5 files maximum per operation
- Prefer specific line ranges over full files
- Use `limit` and `offset` parameters

### File Selection Priority

1. **Primary file** - The one you're modifying
2. **Pattern files** - 1-2 examples to reference
3. **Type files** - Only if needed for typing
4. **Never**: full directories, multiple similar files

---

## Reference Over Regenerate

### ❌ BAD
```
Write a new Button component following this pattern:
[copies entire 100-line Button component]
```

### ✅ GOOD
```
Create Button in components/ui/ using existing pattern
from BrandCard.tsx (props interface, Tailwind classes)
```

---

## Tool-Specific Strategies

| Tool | Strategy | Best For |
|------|----------|----------|
| **Gemini** | Fast & cheap | High volume, simple tasks |
| **KiloCode** | Context preservation | Long sessions, iterative work |
| **OpenCode** | Bulk operations | File generation, refactoring |
| **Claude** | Deep reasoning | Complex analysis ONLY |

---

## Token Cost Multipliers

| Model | Cost | Use When |
|-------|------|----------|
| Gemini | 1x | Simple fixes, content drafts |
| KiloCode | 0.5x | Development sessions |
| OpenCode | 0.8x | Bulk operations |
| Claude | 5x | Architecture, security |

---

## Caching Strategy

```typescript
// Cache file hashes
const fileCache = new Map<string, {hash: string, content: string, ttl: number}>()

// Cache skill outputs
const skillCache = new Map<string, {result: any, timestamp: number}>()

// TTL: 1 hour for files, 10 minutes for skills
```

---

## Batch Operations

### ❌ BAD - Multiple calls
```
read file1.ts
read file2.ts
read file3.ts
```

### ✅ GOOD - Single batch
```
read [file1.ts, file2.ts, file3.ts]
```

---

## Expression Syntax Reference

Reference variables without repeating:
- `{{variable}}` - Insert value
- `{{file.path}}` - Read file
- `{{glob.**}}` - List files
- `{{env.VAR}}` - Environment variable

---

## Risk-Based Routing

Route to cheapest tool that can do the job:

| Risk | Tool | Example |
|------|------|---------|
| < 0.3 | Gemini | UI fixes, content |
| 0.3-0.7 | KiloCode | Features, hooks |
| > 0.7 | Claude | Architecture, security |

---

## Enforcement

1. Check token usage after each operation
2. If > 50% budget used, summarize and continue
3. If > 80% budget used, stop and report
4. Always prefer reference over regeneration
