# Trueno CSS — React

Official React wrapper components for the [Trueno CSS framework](https://github.com/tobassum786/Trueno_CSS_framework).
Zero extra runtime dependencies — every component renders the framework's exact BEM markup.

## Requirements

- React `>= 17`
- Trueno CSS loaded (see [Loading the framework](#loading-the-framework))

## Install

```
npm install trueno-css-react
```

### Loading the framework

Load Trueno CSS (CSS + the optional JS bundle) via CDN in your entry file:

```jsx
import { loadTruenoFromCDN } from 'trueno-css-react';

loadTruenoFromCDN('jsdelivr'); // 'jsdelivr' | 'unpkg' | 'github'
```

Or skip the helper and add the tags yourself:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/trueno-css-framework@1.0.0/dist/trueno-css-framework.min.css">
<script src="https://cdn.jsdelivr.net/npm/trueno-css-framework@1.0.0/dist/trueno-css-framework.min.js"></script>
```

## Quick start

```jsx
import {
  TruenoButton, TruenoModal, TruenoAlert, TruenoNavbar,
  TruenoNavbarBrand, TruenoNavbarToggle, TruenoNavbarCollapse,
  TruenoNavbarNav, TruenoNavbarItem, TruenoNavbarLink,
} from 'trueno-css-react';
import { useState } from 'react';

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TruenoNavbar dark sticky>
        <TruenoNavbarBrand href="#">⚡ Trueno</TruenoNavbarBrand>
        <TruenoNavbarToggle controls="mainNav">☰</TruenoNavbarToggle>
        <TruenoNavbarCollapse id="mainNav">
          <TruenoNavbarNav>
            <TruenoNavbarItem active><TruenoNavbarLink href="#">Home</TruenoNavbarLink></TruenoNavbarItem>
            <TruenoNavbarItem><TruenoNavbarLink href="#">Docs</TruenoNavbarLink></TruenoNavbarItem>
          </TruenoNavbarNav>
        </TruenoNavbarCollapse>
      </TruenoNavbar>

      <TruenoButton variant="primary" size="lg" onClick={() => setOpen(true)}>
        Open modal
      </TruenoButton>

      <TruenoModal open={open} onClose={() => setOpen(false)} title="Hello" closeButton>
        <p>Controlled modal — Escape, backdrop click, and the close button all call <code>onClose</code>.</p>
      </TruenoModal>

      <TruenoAlert variant="success" dismissible title="Well done!">
        Dismissible alerts fade out and unmount themselves.
      </TruenoAlert>
    </>
  );
}
```

## Components

| Component | Framework classes | Notes |
| --- | --- | --- |
| `TruenoButton` | `.btn`, `btn--<variant>`, `btn--<size>` | `variant="primary"` \| `"secondary"` \| `"outline-primary"`, `size="sm"` \| `"lg"` \| `"hero"`, `as` prop for links |
| `TruenoBadge` | `.badge--*` | `variant`, `soft`, `outline`, `pill`, `dot`, `count`, `size` |
| `TruenoCard` | `.card` | plus `TruenoCardHeader/Body/Footer/Title/Text` |
| `TruenoAlert` | `.alert--*` | `variant`, `solid`, `outline`, `size`, `dismissible`, `onDismiss` |
| `TruenoModal` | `.modal` | **Controlled**: `open`, `onClose`, `title`, `footer`, `closeButton` |
| `TruenoNavbar` | `.navbar--*` | `dark/light/primary/gradient/transparent/sticky`; toggle + collapse share state automatically |
| `TruenoPagination` | `.pagination` | plus `Item`, `Link` (`active/disabled/prev/next`) |
| `TruenoBreadcrumb` | `.breadcrumb` | `separator="chevron"\|"bullet"\|"custom"`, `size`, `plain` |
| `TruenoFormGroup/Row/Grid/Inline` | `.form-*` | form scaffolding |
| `TruenoFormControl` | `.form-control` | `as="input"\|"select"\|"textarea"`, `size`, `valid`, `invalid` |
| `TruenoFormCheck` | `.form-check` | checkbox / radio, `inline` |
| `TruenoSwitch` | `.switch` | `color="secondary"\|"success"\|"danger"`, `size` |
| `TruenoInputGroup` | `.input-group` | `position="prepend"\|"append"` + `TruenoInputGroupAddon` |
| `TruenoThemeToggle` | `.theme-toggle` | toggles `theme--dark`, persists to `localStorage` |

All presentational components forward `ref`, spread extra props onto the root element, and
merge `className` with the framework classes.

## How interactive components work

The framework's JS only auto-binds at `DOMContentLoaded`, so components mounted later by React
would miss their listeners. The wrappers therefore own the interaction:

- **Modal** is fully controlled. When the Trueno JS bundle is present it delegates scroll-locking
  and focus management to `Trueno.Modal`, listens for `trueno:modal:close` (so the framework's
  global Escape handler stays in sync), and handles backdrop clicks itself.
- **Navbar** toggle/collapse share state through React context; links close the menu on tap.
- **Alert** animates out via inline styles, then unmounts through React (it never lets the
  framework remove the DOM node directly).
- **ThemeToggle** calls `Trueno.Theme` when loaded, otherwise falls back to class + localStorage.

## License

MIT
