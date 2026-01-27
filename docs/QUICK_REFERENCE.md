# Brand OS - Quick Reference

## 🗂️ New Folder Structure

```
web/src/
├── 📁 components/
│   ├── ui/              → Button, Card, Input, Textarea
│   ├── brand/           → NegativeSpaceVisualizer, Tooltip  
│   ├── creative/        → (Future: Asset generation components)
│   └── layout/          → Sidebar, Header
│
├── 📁 features/         → Feature-based views
│   ├── dashboard/       → Brand overview & selection
│   ├── doctrine/        → Brand configuration
│   ├── studio/          → Asset generation
│   ├── library/         → Asset vault
│   └── settings/        → App settings
│
├── 📁 services/         → External integrations
│   └── gemini.service.ts
│
├── 📁 hooks/            → Custom React hooks
│   └── useLocalStorage.ts
│
├── 📁 types/            → TypeScript definitions
│   └── index.ts
│
├── 📁 utils/            → Helper functions
│   └── index.ts
│
├── 📁 constants/        → App configuration
│   └── index.ts
│
├── 📁 styles/           → Global CSS
│   └── index.css
│
├── App.tsx              → Main app orchestrator
└── main.tsx             → Entry point
```

## 🎯 Key Changes

| What | Before | After |
|------|--------|-------|
| **Entry Point** | `/index.tsx` | `/src/main.tsx` |
| **Main App** | `/App.tsx` (870 lines) | `/src/App.tsx` (modular) |
| **Types** | `/types.ts` | `/src/types/index.ts` |
| **Services** | `/geminiService.ts` | `/src/services/gemini.service.ts` |
| **Components** | Inline in App.tsx | `/src/components/*` |
| **Features** | All in App.tsx | `/src/features/*` |

## 📝 Import Examples

```typescript
// UI Components
import { Button, Card, Input } from '@/components/ui';

// Layout
import { Sidebar, Header } from '@/components/layout';

// Brand Components
import { NegativeSpaceVisualizer, Tooltip } from '@/components/brand';

// Services
import { generateImage } from '@/services/gemini.service';

// Hooks
import { useLocalStorage } from '@/hooks';

// Types
import { BrandProfile, GeneratedAsset } from '@/types';

// Constants
import { INITIAL_BRANDS, ASSET_TYPES } from '@/constants';

// Utils
import { generateId, downloadFile } from '@/utils';
```

## ✅ Benefits

- ✨ **Cleaner Code**: No more 870-line App.tsx
- 🔍 **Easy to Find**: Logical grouping by purpose
- 🚀 **Scalable**: Add features without cluttering
- 🧪 **Testable**: Each module can be tested independently
- 👥 **Team-Friendly**: Clear boundaries, less conflicts
- ⚡ **Performance**: Ready for code-splitting

## 🚦 Status

✅ Folder structure created  
✅ Base components extracted  
✅ Layout components separated  
✅ Services organized  
✅ Types centralized  
✅ Constants extracted  
✅ Utils created  
✅ Hooks implemented  
⏳ Feature views (basic placeholders - ready for full migration)  

## 📋 Next Steps

1. Migrate full logic from old `App.tsx` to feature views
2. Add comprehensive tests
3. Implement remaining creative studio features
4. Add error boundaries
5. Set up code splitting
