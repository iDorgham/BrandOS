# Brand OS Contributing Guide

**Version:** 2.0  
**Last Updated:** February 7, 2026

Thank you for your interest in contributing to Brand OS! This guide will help you get started.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Requirements](#testing-requirements)
8. [Documentation](#documentation)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and considerate
- Welcome newcomers and help them succeed
- Focus on what is best for the community
- Show empathy towards other contributors

---

## Getting Started

### Prerequisites

- Node.js v20.x or higher
- npm v10.x or higher
- Git
- GitHub account

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/BrandOS.git
cd BrandOS

# Add upstream remote
git remote add upstream https://github.com/iDorgham/BrandOS.git
```

### Install Dependencies

```bash
cd web
npm install
```

### Start Development

```bash
npm run dev
```

---

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Branch Naming Conventions

- **Features**: `feature/feature-name`
- **Bugs**: `fix/bug-name`
- **Documentation**: `docs/what-you-changed`
- **Performance**: `perf/optimization-name`
- **Refactor**: `refactor/what-you-refactored`

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build to verify
npm run build
```

---

## Coding Standards

### TypeScript

```typescript
// ✅ Good: Explicit types, clear naming
interface BrandProfile {
  id: string;
  name: string;
  doctrine: string;
}

function createBrand(data: Partial<BrandProfile>): Promise<BrandProfile> {
  // Implementation
}

// ❌ Bad: No types, unclear naming
function create(d: any) {
  // Implementation
}
```

### React Components

```typescript
// ✅ Good: Functional component with TypeScript
interface Props {
  brand: BrandProfile;
  onUpdate: (id: string) => void;
}

export function BrandCard({ brand, onUpdate }: Props) {
  return (
    <Card>
      <h3>{brand.name}</h3>
      <Button onClick={() => onUpdate(brand.id)}>Update</Button>
    </Card>
  );
}

// ❌ Bad: Class component, no types
export class BrandCard extends React.Component {
  render() {
    return <div>{this.props.brand.name}</div>;
  }
}
```

### File Naming

- **Components**: PascalCase (e.g., `BrandCard.tsx`)
- **Utilities**: camelCase (e.g., `colorUtils.ts`)
- **Types**: camelCase with `.types.ts` (e.g., `brand.types.ts`)
- **Services**: camelCase with `.service.ts` (e.g., `brand.service.ts`)

### Code Organization

```
web/src/
├── components/
│   ├── ui/            # Base components
│   └── brand/         # Domain-specific components
├── features/          # Feature modules/views
├── services/          # API and external services
├── hooks/             # Custom React hooks
├── types/             # TypeScript definitions
└── utils/             # Helper functions
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples

```bash
# Good commits
feat(studio): add batch generation with 4-10 variations
fix(sidebar): resolve toggle button alignment issue
docs(api): update authentication flow documentation
perf(database): add indexes for brand queries

# Bad commits
fixed stuff
update
wip
```

---

## Pull Request Process

### 1. Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Tests pass
- [ ] Build succeeds

### 2. Create Pull Request

1. Push your branch to your fork
2. Go to the original repository on GitHub
3. Click "New Pull Request"
4. Select your branch
5. Fill in the PR template

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] Build passes
```

### 3. Code Review

- Respond to feedback promptly
- Make requested changes
- Push updates to your branch
- Request re-review when ready

### 4. After Approval

Once approved, a maintainer will merge your PR.

---

## Testing Requirements

### Unit Tests (Future)

```typescript
// Example test structure
import { describe, it, expect } from 'vitest';
import { calculateComplianceScore } from './compliance';

describe('calculateComplianceScore', () => {
  it('should return 100 for perfect compliance', () => {
    const result = calculateComplianceScore({
      colorMatch: 100,
      spatialCompliance: 100,
      vibeCheck: 100,
    });
    expect(result).toBe(100);
  });
});
```

### Manual Testing

Before submitting, test:
- [ ] All affected features work
- [ ] No console errors
- [ ] UI looks correct
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark/light mode works

---

## Documentation

### Code Comments

```typescript
// ✅ Good: Explains why, not what
// Use exponential backoff to avoid rate limiting
const delay = Math.pow(2, retryCount) * 1000;

// ❌ Bad: States the obvious
// Set delay variable
const delay = 1000;
```

### JSDoc for Complex Functions

```typescript
/**
 * Generates a brand-aligned prompt by injecting brand DNA constraints.
 *
 * @param basePrompt - The original user prompt
 * @param brand - The brand profile with grammar rules
 * @param intensities - DNA intensity modulations (energy, warmth, sophistication)
 * @returns Enhanced prompt with brand constraints
 */
export function generateBrandAlignedPrompt(
  basePrompt: string,
  brand: BrandProfile,
  intensities: DNAIntensities
): string {
  // Implementation
}
```

### Updating Documentation

When changing functionality:
1. Update relevant `.md` files in `/docs`
2. Update inline code comments
3. Update user-facing help text

---

## Getting Help

- **Questions?** Open a [GitHub Discussion](https://github.com/iDorgham/BrandOS/discussions)
- **Bug found?** Open an [Issue](https://github.com/iDorgham/BrandOS/issues)
- **Need guidance?** Tag maintainers in your PR

---

## Recognition

Contributors will be acknowledged in:
- GitHub contributors page
- Release notes for significant contributions
- Project README (for major features)

---

Thank you for contributing to Brand OS! 🎨✨
