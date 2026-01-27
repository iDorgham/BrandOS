# Brand OS - Implementation Tasks

## 🟢 Phase 1: MVP Core (Current Status: ~95% Complete)

### ✅ Completed
- **Brand Profile Engine**: DNA capture, Palette, Doctrine.
- **Creative Studio**: Asset generation, Prompt Orchestration.
- **Brand Grammar**: Logic nodes (IF/THEN), Spatial Tension.
- **Library**: Asset vault, Export 8K (mock).
- **Compliance Audit**: Basic scoring + AI textual feedback.
- **Architecture**: Modular feature-based structure.
- **Error UI**: Integrated `sonner` Toasts.
- **UI Components**: Skeleton loaders ready.

### 🚧 Outstanding Polish
- [ ] **Mobile Responsiveness**: Refine Studio & Doctrine views for smaller screens.

---

## 🟡 Phase 1.5: Intelligence Loop (High Priority)

### 1. Iterative Prompt Refinement
**Goal**: The system should allow users to "Auto-Fix" a prompt based on compliance feedback.
- [ ] Action button in Library: "Refine Prompt based on Feedback".
- [ ] Logic: Feed `auditDetails.feedback` back into `generateBrandAlignedPrompt`.

### 2. Reference Analysis V2
**Goal**: Make the "Sync DNA Reference" more powerful.
- [ ] Visualize the extracted palette/patterns before applying them.
- [ ] Allow users to select *which* traits to import (e.g. only colors, but not doctrine).

### 3. Data Persistence
**Goal**: Move beyond `localStorage`.
- [ ] Define backend API schema (Supabase or Node/Postgres).
- [ ] Implement sync logic.

---

## 🔵 Phase 2: Advanced Workflows (Q3 2026)

### 1. Node-Based Mood Board
**Tech**: `reactflow` or `xyflow`.
**Goal**: Visual canvas to drag-and-drop inspiration → connect to Grammar Rules.
- [ ] Install React Flow.
- [ ] Create `MoodBoardView`.
- [ ] Node Types: Image Reference, Text Attribute, Logic Gate.

### 2. Multi-Model Routing
**Goal**: Use different models for different asset types.
- [ ] Abstract `GeminiService` into `AIService`.
- [ ] Add `ModelSelector` in Studio Settings (Gemini / Claude / Meta).
- [ ] Router logic: Vector = Gemini, Texture = Diffusion model (future).

### 3. Deployment Hub
**Goal**: "One-click publish".
- [ ] Create `DeploymentView`.
- [ ] Mock integrations for Instagram/LinkedIn/CMS.
- [ ] Approval workflow (Designer → Art Director → Publish).
