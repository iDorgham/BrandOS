---
name: refactor-code
description: Refactors code to improve readability, performance, or maintainability
---

# SKILL.md

Transforms existing code into a more structured or efficient version without changing behavior.

## Parameters
- `file`: The path to the file to refactor.
- `target`: The specific code block or function.
- `pattern`: The refactoring pattern to apply (e.g., "DRY", "Strategy Pattern").

## Examples
### Component Cleanup
```bash
refactor-code --file "MoodBoard.tsx" --target "large handleResize function" --pattern "extract to custom hook"
```
