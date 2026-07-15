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



-----------------------------------------------------
# ARCHITECTURE.md — Constellation Notes

Precise reference for folder structure, data shapes, and store contracts. Treat the shapes below
as authoritative — implement them exactly (JS + JSDoc types, or convert to real TS if you'd
rather use TypeScript instead of plain JS).

## 1. Folder structure

```
constellation-notes/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/          # Button, Input, Modal, Card, Badge, Tooltip, Toast, Tabs, etc.
│   │   ├── graph/        # GalaxyCanvas, StarNode, EdgeConnection, MiniMap, CanvasControls,
│   │   │                 # BackgroundStars, BackgroundNebula, SelectionBox
│   │   ├── layout/        # Navbar, Sidebar, InspectorPanel, StatusBar, PageLayout, MobileNavigation
│   │   ├── notes/         # NoteEditor, TagInput, CategorySelector, ColorPicker, FavoriteButton, PinButton
│   │   └── common/        # ConfirmDialog, ErrorState, LoadingState, ShortcutHint, ThemeSwitcher
│   ├── hooks/
│   ├── store/             # notesStore.js, graphStore.js, uiStore.js, searchStore.js,
│   │                       # settingsStore.js, statisticsStore.js, storageStore.js, index.js
│   ├── services/          # localStorage read/write, import/export, validation
│   ├── utils/
│   ├── constants/          # design tokens, shortcut map, route names
│   ├── styles/
│   ├── theme/
│   ├── pages/              # Home, Favorites, Trash, Settings, Help, About
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
```

One responsibility per directory. `components/ui` never imports from `store/` directly — it
receives data and callbacks via props; only `pages/` and a thin set of "connected" wrapper
components read from stores directly.

## 2. Routes

| Path | Page |
|---|---|
| `/` | Home (galaxy canvas) |
| `/favorites` | Favorites |
| `/trash` | Trash |
| `/settings` | Settings |
| `/help` | Help |
| `/about` | About |
| `/*` | 404 |

## 3. Data schemas (localStorage)

Root key: `constellation-notes`

```json
{
  "version": "1.0",
  "notes": [],
  "edges": [],
  "settings": {},
  "categories": [],
  "metadata": {}
}
```

**Note**
```json
{
  "id": "uuid",
  "title": "",
  "content": "",
  "category": "General",
  "tags": [],
  "favorite": false,
  "pinned": false,
  "color": "default",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "deletedAt": null,
  "position": { "x": 0, "y": 0 }
}
```
Note: `deletedAt` isn't in the original spec's schema sample but is required to implement Trash /
restore without a separate parallel array — soft-delete via this field, filter by it everywhere.

**Edge**
```json
{
  "id": "uuid",
  "source": "noteId",
  "target": "noteId",
  "animated": true,
  "type": "smoothstep",
  "createdAt": "ISO-8601"
}
```

**Settings**
```json
{
  "theme": "deep-space",
  "animations": true,
  "reduceMotion": false,
  "showGrid": true,
  "showStars": true,
  "showNebula": true,
  "autosaveDelay": 300
}
```

**Metadata**
```json
{
  "version": "1.0",
  "createdAt": "ISO-8601",
  "lastOpened": "ISO-8601",
  "lastSaved": "ISO-8601",
  "device": "browser"
}
```

## 4. Zustand stores

Each store owns one slice of state. Communicate cross-store via actions/services, never by
reaching into another store's internals.

**`notesStore`** — source of truth for notes.
- State: `notes[]`, `selectedNoteId`, `selectedNoteIds[]`, `loading`, `error`
- Actions: `createNote(partial)`, `updateNote(id, patch)`, `deleteNote(id)` (soft delete, sets
  `deletedAt`), `restoreNote(id)`, `permanentlyDeleteNote(id)`, `duplicateNote(id)`,
  `toggleFavorite(id)`, `togglePin(id)`
- Selectors: `getActiveNotes()`, `getDeletedNotes()`, `getFavoriteNotes()`, `getPinnedNotes()`,
  `getNoteById(id)`

**`graphStore`** — edges + canvas viewport state.
- State: `edges[]`, `viewport { x, y, zoom }`, `draggingNodeId`
- Actions: `createEdge(source, target)`, `deleteEdge(id)`, `setViewport(v)`,
  `updateNodePosition(id, position)` (delegates position write into `notesStore`)

**`uiStore`** — transient UI state (not persisted).
- State: `sidebarCollapsed`, `activeModal`, `activePanel`, `contextMenu`, `isSelecting`

**`searchStore`** — search/filter/sort state.
- State: `query`, `activeFilters`, `sortBy`
- Selectors: `getFilteredNotes()` composed from `notesStore` + current query/filters

**`settingsStore`** — persisted user settings (theme, motion, autosave delay), maps directly to
the Settings schema above.

**`statisticsStore`** — derived counts (total notes, connections, categories) for
dashboard/sidebar display. Purely derived — do not duplicate note data here.

**`storageStore`** — owns the localStorage read/write/import/export pipeline and autosave
debounce (default 300ms per settings). All other stores call through this one to persist;
no store writes to `localStorage` directly except this one.

## 5. Keyboard shortcuts (implement exactly)

| Shortcut | Action |
|---|---|
| Ctrl/Cmd + N | New note |
| Delete | Delete selected |
| Ctrl/Cmd + D | Duplicate |
| Ctrl/Cmd + A | Select all |
| Ctrl/Cmd + F | Search |
| Space + Drag | Pan canvas |
| Ctrl/Cmd + Scroll | Zoom |
| Escape | Clear selection |
| F | Toggle favorite |
| P | Toggle pin |

## 6. Performance rules

- Debounce autosave (300ms default from settings).
- Memoize graph node/edge rendering; avoid re-rendering the whole canvas on unrelated state
  changes (use Zustand selectors, not whole-store subscriptions, inside `StarNode`/`EdgeConnection`).
- Search should filter client-side against an in-memory index, not re-scan on every keystroke
  without debounce.
