---
name: create-hook
description: Creates a custom React hook with proper typing and error handling
---

# SKILL.md

Generates a custom React hook to encapsulate reusable logic.

## Parameters
- `name`: The name of the hook (must start with `use`).
- `deps`: Any external variables or state the hook depends on.

## Examples
### LocalStorage Hook
```bash
create-hook --name useLocalStorage --deps "key, initialValue"
```
