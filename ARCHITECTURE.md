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
