# Rule: Test-Driven Development

All features and fixes should be accompanied by tests.

## Testing Stack

- **Unit/Integration**: vitest
- **Component**: @testing-library/react
- **E2E**: Playwright (optional)

## Test Organization

```
component/
├── Component.tsx
└── Component.test.tsx
service/
├── service.ts
└── service.test.ts
```

## What to Test

- Component rendering
- User interactions
- Service methods
- Error handling
- Edge cases
