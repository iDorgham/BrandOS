---
name: debug-issue
description: Identifies and fixes bugs by analyzing errors and code behavior
---

# SKILL.md

A structured approach to diagnosing and resolving code errors.

## Parameters
- `error`: The error message, stack trace, or symptoms.
- `file`: The primary file suspected of causing the issue.
- `context`: Any relevant environmental or state data.

## Examples
### Runtime Error
```bash
debug-issue --error "Cannot read properties of undefined (reading 'map')" --file "BrandList.tsx"
```
