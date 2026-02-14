---
name: create-component
description: Creates a new React component with props, styling, and tests
---

# SKILL.md

Automates the creation of a standardized React component with boilerplate.

## Parameters
- `name`: Name of the component (PascalCase).
- `path`: Target directory relative to `web/src/`.
- `props`: Object-style string defining the props interface.
- `style`: Preferred CSS approach or Tailwind classes.

## Examples
### Navigation Bar
```bash
create-component --name NavBar --path features/navigation --props "{ items: NavItem[] }" --style "sticky top-0 bg-white"
```
