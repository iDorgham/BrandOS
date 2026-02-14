# Rule: Service Layer

All business logic and external API calls must go through service layer. Components should not make direct API calls.

## Pattern

```
UI Component → Service Method → External API (Supabase/AI/etc.)
```

## Bad Practice
```tsx
// In a component
useEffect(() => {
  fetch('/api/brands').then(setBrands);
}, []);
```

## Good Practice
```tsx
// service/brand.service.ts
export const brandService = {
  getBrands: async () => supabase.from('brands').select('*')
};

// Component
useEffect(() => {
  brandService.getBrands().then(setBrands);
}, []);
```
