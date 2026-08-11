# Color Plates

Trueno CSS is built on **color plates** — full tonal scales, one per hue, defined once in `src/abstract/_colors.scss`. Every semantic token (`$color-primary`, `$color-success`, …), every component variant (soft / solid / outline), and both themes are derived **from these plates**. There is a single source of truth for color.

```
abstract/
├── _colors.scss      ← color plates (this is where every hex lives)
├── _variables.scss   ← semantic tokens derived from the plates
└── _functions.scss   ← plate() / get-color() accessors
```

---

## 1. The Plates

Each plate is a 10-step gradient (`50 → 900`) tuned for **WCAG-accessible contrast**, plus the neutral plates (`gray`, `slate`) include a `950` step for near-black dark surfaces.

| Plate | Hue | Used for |
| --- | --- | --- |
| `blue` | Electric blue | **Primary** brand color |
| `indigo` | Indigo | Accent |
| `violet` | Violet ("thunder") | Accent |
| `green` | Green | **Success** |
| `red` | Red | **Danger** |
| `amber` | Amber | **Warning** |
| `cyan` | Cyan | **Info** |
| `gray` | Neutral gray | **Secondary**, surfaces, text, borders |
| `slate` | Cool slate | Dark surfaces, **dark theme** |

### Blue (primary)

| Step | Hex | Step | Hex |
| --- | --- | --- | --- |
| 50 | `#eff4ff` | 600 | `#2563eb` |
| 100 | `#dbe6fe` | 700 | `#1d4ed8` |
| 200 | `#bfd4fe` | 800 | `#1e40af` |
| 300 | `#93b8fd` | 900 | `#1e3a8a` |
| 400 | `#6092fb` | — | — |
| 500 | `#3b82f6` | — | — |

### Gray (neutrals)

| Step | Hex | Step | Hex |
| --- | --- | --- | --- |
| 50 | `#f9fafb` | 600 | `#4b5563` |
| 100 | `#f3f4f6` | 700 | `#374151` |
| 200 | `#e5e7eb` | 800 | `#1f2937` |
| 300 | `#d1d5db` | 900 | `#111827` |
| 400 | `#9ca3af` | 950 | `#030712` |
| 500 | `#6b7280` | — | — |

> The full set of hex values lives in `src/abstract/_colors.scss`. Change a value there and every component, variant, and theme that uses that hue recompiles consistently.

---

## 2. How to Pick a Step (the "600 rule")

The steps aren't random shades — they encode a usage contract:

| Step | Job |
| --- | --- |
| `50`–`100` | Tinted **backgrounds** (soft/soft variant fills) |
| `100`–`200` | **Soft hover** fills, light accents |
| `300` | **Borders** on tinted surfaces |
| `400` | Intermediate, accent on white |
| `500` | The hue's **brand value** (links, outlines) |
| `600` | **Default container fill** — buttons, badges, solid alerts (carries white text) |
| `700` | **Hover** on solid fills; readable **text on 50–200** tints |
| `800` | Active / emphasis text on tints |
| `900` | Deep shade — headings on tinted surfaces |

**The rule:** a solid fill uses `600` (or `500` for a lighter brand tone) with a `700` hover; readable text of the same hue sits at `700`–`800` over a `50`–`200` background.

---

## 3. Consuming Plates in Sass

Import the functions module and call `plate()`:

```scss
@use 'trueno/src/abstract/functions' as *;

.promo {
  background-color: plate(violet, 600);
  color: plate(violet, 50);
  border-color: plate(violet, 300);
}
```

Two anchors are provided for gradient stops — `0` (white) and `1000` (black):

```scss
.promo--gradient {
  background: linear-gradient(plate(violet, 0), plate(violet, 500));
}
```

### Semantic access with `get-color()`

Semantic tokens live in the `$colors` map (`_variables.scss`). `get-color()` looks them up with a guard error:

```scss
@use 'trueno/src/abstract/functions' as *;

.callout {
  color: get-color(primary);
  background-color: get-color(primary-soft);
}
```

---

## 4. Plates as CSS Custom Properties

Every plate is emitted as design-token custom properties on `:root`, so the palettes are available at runtime — including for dynamic theming:

```css
:root {
  --tr-blue-500: #3b82f6;
  --tr-blue-600: #2563eb;
  --tr-gray-100: #f3f4f6;
  --tr-slate-950: #020617;
  /* ...every hue × every step... */
}
```

```css
.component {
  color: var(--tr-amber-700);
  background-color: var(--tr-blue-100);
}
```

> 💡 Component classes (`.btn--primary`, `.badge--soft-*`, …) are compiled from the plates directly — you usually don't need the custom properties unless you're building brand-specific UI at runtime.

---

## 5. Semantic Tokens

`_variables.scss` maps each semantic name to plate steps. The contract is consistent for every color:

| Token | Plate source |
| --- | --- |
| `$color-primary` | `blue 500` |
| `$color-primary-hover` | `blue 600` |
| `$color-primary-soft` | `blue 100` |
| `$color-primary-soft-hover` | `blue 200` |
| `$color-primary-soft-text` | `blue 700` |
| `$color-primary-border` | `blue 300` |
| `$color-primary-contrast` | `#ffffff` |

The same six-slot contract exists for `secondary`, `success`, `danger`, `warning`, `info`, `light`, and `dark`. Contrast colors are chosen for readability: `warning` and `light` use dark text, everything else uses white.

---

## 6. Re-theming the Brand

To re-brand Trueno CSS, edit **only** the plate values — never the components:

```scss
// your-overrides.scss
@use 'trueno/src/abstract/colors' as *;

// Swap primary for a custom violet
$color-plates: map.set($color-plates, "blue",
  (50: #f5f3ff, 100: #ede9fe, 200: #ddd6fe, 300: #c4b5fd, 400: #a78bfa,
   500: #8b5cf6, 600: #7c3aed, 700: #6d28d9, 800: #5b21b6, 900: #4c1d95));
```

Every button, badge, alert, form focus ring, and theme that reads `blue` now uses the new brand color.

---

## 7. Accessible Contrast

The scale steps are anchored so that, at minimum:

- **Solid fills** (`600`) with white text reach **4.5:1** (or 3:1 for large text).
- **Soft fills** (`100`) with the hue's `700`–`800` text reach **4.5:1**.
- **Outline** variants (transparent fill, `500` text) reach **4.5:1** against `#ffffff`.
- Neutral steps follow the same contract (`gray 900` text on `gray 50` far exceeds 4.5:1).
