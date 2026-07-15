# PRINCIPLES.md — Constellation Notes

Read this file at the start of every session. These rules do not change between phases.

## 1. What this is

Constellation Notes is a premium, frontend-only visual note-taking app. Notes are stars in an
infinite galaxy canvas; relationships between notes are constellation lines (edges). No folders,
no lists — spatial organization only.

Reference bar: Obsidian Graph View, Figma Canvas, Linear, Notion, Arc Browser, Apple HIG. The
result should feel like a paid desktop app, not a student CRUD project.

**Is:** a visual knowledge graph / spatial note system / second brain.
**Is not:** a whiteboard, drawing tool, markdown editor, kanban board, or task manager.

## 2. Hard technical constraints

- React 19 + Vite, entirely frontend, no backend/auth/cloud/APIs.
- All persistence via `localStorage` under one root key: `constellation-notes`.
- Canvas/graph rendering: React Flow.
- State: Zustand only. Never Redux, never Context for app state.
- Styling: Tailwind CSS only. Never Bootstrap/MUI/Chakra, never mix design systems.
- Icons: Lucide React. Animation: Framer Motion. Toasts: Sonner. Routing: React Router.
- Functional components + hooks only. No class components, no prop drilling, no inline
  business logic inside presentational components.
- Target: smooth at 500+ notes, search <100ms, 60fps interactions.

## 3. Out of scope for v1 (do not build)

User accounts, cloud sync, real-time collaboration, AI-generated notes, rich media attachments,
PDF export, markdown rendering, multi-user workspaces, encryption, native mobile app.

## 4. Design tokens (use these exact values — never invent new ones)

**Themes** (each has primary / background / surface / accent):
- Deep Space (default): primary `#5B8CFF`, background `#060B17`, surface `#0E1629`, accent `#8AB4FF`
- Purple Nebula: primary `#9D6CFF`, background `#090611`, surface `#141124`
- Aurora: primary `#5BE7C4`, background `#041512`, surface `#0B201D`
- Solar Eclipse: primary `#F7C948`, background `#0C0A08`, surface `#1B1610`

Use semantic Tailwind tokens (`bg-surface`, `text-primary`, etc.), not hardcoded hex in components —
wire the theme values into `tailwind.config` / CSS variables so themes can swap at runtime.

**Typography:** Inter, fallback system-ui/sans-serif.
Scale: Display 48px · Hero 40px · H1 32px · H2 28px · H3 24px · H4 20px · Body-lg 18px · Body 16px ·
Small 14px · Caption 12px · Tiny 10px.
Weights: Regular 400, Medium 500, Semibold 600, Bold 700 (avoid thin weights).
Line height: headings 120%, body 160%, caption 150%.

**Spacing (8px grid — never invent random values):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

**Radius:** small 8px · medium 12px · large 16px · cards 20px · dialogs/floating panels 24px ·
buttons 12px · graph nodes 50% (circular).

**Shadows:** soft/layered only, never harsh. Cards = small shadow, dialogs = medium, floating
panels = large. Selected nodes get a glow, not a shadow.

**Motion durations:** fast 150ms · normal 250ms · slow 400ms · ambient (background effects) 3–8s.
Button hover: background brightens + 1–2px lift, 150ms. Button press: scale 0.98, 100ms.
Allowed motion: fade, scale, slide, opacity, transform, glow, pulse. Never: bouncing, flashing,
spinning, gratuitous motion. Respect `prefers-reduced-motion` / a reduceMotion setting.

**Icons:** Lucide, 2px stroke, rounded ends. Standard 20px, toolbar 22px, large actions 24px.

## 5. Non-negotiable engineering rules

- Single Responsibility Principle; one component = one job.
- Composition over inheritance; no duplicated logic or styling.
- `React.memo` where it earns its keep, `useMemo`/`useCallback` where they prevent real
  re-renders — not reflexively everywhere.
- Multiple focused Zustand stores (see ARCHITECTURE.md), not one mega-store. Stores never
  mutate each other directly. Always use selectors when reading from a store in a component.
- Every interactive element: keyboard support, visible focus indicator, ARIA label where
  needed, semantic HTML, WCAG AA contrast.
- No `TODO`s, no placeholder/fake data, no invented functionality left unresolved. If a spec
  detail is ambiguous, implement the simplest solution consistent with these principles rather
  than guessing at something exotic.

## 6. Definition of done (every feature)

UI complete · logic complete · animations in place · autosave wired · accessible · responsive ·
keyboard shortcuts work · error state handled · loading state handled · empty state handled ·
persists correctly to localStorage · no console errors · no unused imports/dead code.

## 7. If in doubt

Prefer the option that is more modular, more accessible, more performant, and more consistent
with the tokens above. Simplicity beats cleverness.
