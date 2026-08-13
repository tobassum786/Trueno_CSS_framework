# Getting Started

This guide walks you through installing Trueno CSS, building the framework from source, and integrating it into your project.

---

## Prerequisites

Trueno CSS is built with **Sass**, so you need a working Node.js environment to compile the source.

| Tool | Minimum Version | Notes |
| --- | --- | --- |
| Node.js | 14.x or newer | Required for npm scripts |
| npm | 6.x or newer | Ships with Node.js |
| Sass | 1.77.0+ | Installed automatically as a devDependency |

The core framework compiles to pure CSS. An optional, dependency-free JavaScript file
(`trueno-css-framework.min.js`) powers the interactive components — modals, navbar toggles,
dismissible alerts, dropdowns, and the theme switcher.

---

## 1. Installation

Choose your preferred method:

### Option A: CDN (fastest — no build step)

Add the stylesheet to your HTML `<head>` and the JavaScript just before the closing `</body>`
tag (only needed when using the interactive components):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/trueno-css-framework@1.0.0/dist/trueno-css-framework.min.css">
<script src="https://cdn.jsdelivr.net/npm/trueno-css-framework@1.0.0/dist/trueno-css-framework.min.js"></script>
```

> **Note:** Pin an exact version (e.g., `@1.0.0`) for production so your app never changes under
> you. Available from any major CDN — jsDelivr (npm), jsDelivr (GitHub:
> `https://cdn.jsdelivr.net/gh/tobassum786/Trueno_CSS_framework@main/dist/...`), and unpkg
> (`https://unpkg.com/trueno-css-framework@1.0.0/dist/...`).

### Option B: npm (recommended for production apps)

```bash
npm install trueno-css-framework
```

Then import the CSS and optional JS in your entry point:

```js
import 'trueno-css-framework/dist/trueno-css-framework.min.css';
import 'trueno-css-framework/dist/trueno-css-framework.min.js';
```

### Option C: Clone & Build (for contributing or customizing)

Clone the repository (recommended for contributing or customizing the source):

```bash
git clone https://github.com/tobassum786/Trueno_CSS_framework.git
cd Trueno_CSS_framework
```

Install the dependencies:

```bash
npm install
```

This installs **sass** (the compiler), **esbuild** (the JS bundler/minifier), and the small set
of watcher dependencies declared in `package.json`.

---

## 2. Build the Framework

The build pipeline is fully driven by `package.json` scripts.

| Script | Command | Description |
| --- | --- | --- |
| `npm run clean` | `rm -rf dist/*` | Wipe the previous build |
| `npm run sass:compile` | `sass src/main.scss:dist/trueno-css-framework.css --style expanded --no-source-map` | Generate the expanded CSS |
| `npm run sass:minify` | `sass src/main.scss:dist/trueno-css-framework.min.css --style compressed --no-source-map` | Generate the minified CSS |
| `npm run js:build` | `esbuild src/trueno.js --bundle --format=iife --target=es2017 --outfile=dist/trueno-css-framework.js` | Generate the expanded JavaScript |
| `npm run js:minify` | `esbuild src/trueno.js --bundle --format=iife --target=es2017 --minify --outfile=dist/trueno-css-framework.min.js` | Generate the minified JavaScript |
| `npm run build` | `npm run clean && npm run sass:compile && npm run sass:minify && npm run js:build && npm run js:minify` | Run the full production build |
| `npm run dev` | `concurrently … sass --watch … esbuild --watch …` | Recompile CSS and JS on every save |

### Production build

```bash
npm run build
```

After running, the `dist/` folder will contain:

- `trueno-css-framework.css` — expanded, human-readable CSS for development
- `trueno-css-framework.min.css` — minified CSS for production
- `trueno-css-framework.js` — expanded, readable JavaScript for development
- `trueno-css-framework.min.js` — minified JavaScript for production

### Watch mode (development)

```bash
npm run dev
```

Sass watches `src/main.scss` and every partial it imports, while esbuild watches
`src/trueno.js`. On every save, the expanded CSS and JavaScript are regenerated automatically.

---

## 3. Use the Compiled CSS

Link the stylesheet (and the JavaScript for interactive components) in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Trueno Project</title>
    <link rel="stylesheet" href="path/to/trueno-css-framework.min.css">
</head>
<body>
    <div class="container">
        <h1 class="u-text-center">Hello, Trueno!</h1>
        <button class="btn btn--primary" data-trueno-open="#exampleModal">Open Modal</button>
    </div>

    <div class="modal" id="exampleModal" aria-hidden="true">
        <div class="modal__dialog">
            <div class="modal__header">
                <h3 class="modal__title">Example</h3>
                <button class="modal__close-btn" type="button" aria-label="Close">×</button>
            </div>
            <div class="modal__body">Modal content</div>
        </div>
    </div>

    <script src="path/to/trueno-css-framework.min.js"></script>
</body>
</html>
```

> ⚠️ The CSS is fully dependency-free. The JavaScript is only required for the **interactive**
> components (modals, navbar collapse, dismissible alerts, dropdowns, theme toggle) and is
> entirely optional — skip it if you only need static styling.

---

## 4. Use the Sass Source Directly

For full control, `@use` the framework's Sass source from your own stylesheet:

```scss
// your-app.scss
@use 'trueno/src/main';
```

Or import only the partials you need:

```scss
// your-app.scss
@use 'trueno/src/abstract/variables' as *;
@use 'trueno/src/abstract/mixins' as *;
@use 'trueno/src/base/typography';
@use 'trueno/src/components/button';
```

> 💡 When consuming partials individually, remember to load `vendors`, `base`, `layout`, and `themes` first — components and utilities depend on the variables and mixins from `abstract/`.

---

## 5. Basic Example

A complete starter page using the major Trueno CSS primitives:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trueno CSS — Demo</title>
    <link rel="stylesheet" href="trueno-css-framework.min.css">
</head>
<body>

    <header class="main-header">
        <div class="container">
            <div class="main-header__logo">
                <a href="#">⚡ Trueno</a>
            </div>
            <nav class="main-nav">
                <ul class="main-nav__list">
                    <li class="main-nav__item"><a href="#">Home</a></li>
                    <li class="main-nav__item"><a href="#">Docs</a></li>
                    <li class="main-nav__item"><a href="#">About</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container py-xl">
        <h1 class="u-text-center">Welcome to Trueno CSS</h1>
        <p class="u-text-center u-text-muted">A modular, mobile-first CSS framework.</p>

        <div class="row mt-lg">
            <div class="col-12 col-md-6 mb-md">
                <div class="card">
                    <div class="card__body">
                        <h2 class="card__title">Modular</h2>
                        <p class="card__text">Import only what you need.</p>
                        <button class="btn btn--primary">Learn more</button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 mb-md">
                <div class="card">
                    <div class="card__body">
                        <h2 class="card__title">Responsive</h2>
                        <p class="card__text">Mobile-first breakpoints out of the box.</p>
                        <button class="btn btn--outline-primary">Read docs</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

</body>
</html>
```

---

## 6. JavaScript Components & Framework Bindings

### Interactive components

When you load `trueno-css-framework.min.js`, the interactive components auto-initialize on
`DOMContentLoaded` — no setup required. Every component is also exposed globally as `Trueno`:

```js
Trueno.Modal.open(document.getElementById('myModal'));
Trueno.Modal.close(document.getElementById('myModal'));
Trueno.Alert.dismiss(document.querySelector('.alert'));
Trueno.Navbar.toggle(document.querySelector('[data-trueno-toggle]'));
Trueno.Theme.toggle();          // flip light/dark
Trueno.Theme.set(true);         // force dark
Trueno.init();                  // re-bind after dynamic DOM changes
```

Markup hooks (auto-bound):

| Component | Markup | Notes |
| --- | --- | --- |
| Modal | `data-trueno-open="#id"` / `data-trueno-close` | Close via button, backdrop, or Escape |
| Navbar | `data-trueno-toggle="#collapse"` | Syncs `aria-expanded` / `aria-controls` |
| Alert | `.alert__close` button | Fades out and removes the alert |
| Dropdown | `data-trueno-dropdown` on `.navbar__has-dropdown` | Click toggle, closes on outside click |
| Theme | `data-trueno-theme-toggle` | Persists to `localStorage`, honors `prefers-color-scheme` |

### React & Vue bindings

Official wrapper packages render the same BEM markup with managed state for your framework:

```bash
npm install trueno-css-react
npm install trueno-css-vue
```

```jsx
// React
import { TruenoModal, TruenoNavbar, TruenoButton } from 'trueno-css-react';
```

```js
// Vue 3 — register once, use everywhere
import { TruenoPlugin } from 'trueno-css-vue';
app.use(TruenoPlugin);
```

The wrappers own modal/navbar/alert state and stay in sync with the framework's JS bundle when
it is present (delegating scroll-lock and focus management), and fall back gracefully when it is
not. See the package READMEs for the full component API.

---

## 7. Browser Support

Trueno CSS targets the two latest versions of every major browser:

| Browser | Desktop | Mobile |
| --- | --- | --- |
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | — |
| iOS Safari | — | ✅ |
| Android Chrome | — | ✅ |

The framework uses modern CSS (CSS Grid, Flexbox, custom properties) — Internet Explorer is **not** supported.

---

## 8. Project Layout (Top Level)

```
Trueno_CSS_framework/
├── dist/                  # Compiled output (CSS + JS)
├── docs/                  # This documentation
├── examples/              # Example projects
├── wrappers/              # Official React & Vue bindings
├── src/                   # Sass source (7-1 architecture) + trueno.js
│   ├── abstract/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── themes/
│   ├── utilities/
│   ├── vendors/
│   ├── main.scss
│   └── trueno.js          # Interactive component logic
├── package.json
├── README.md
└── Home.png / Logo.png    # Brand assets
```

For a deep dive into the source layout, see [Architecture](./architecture.md).

---

## 9. Next Steps

- Read [Architecture](./architecture.md) to understand the 7-1 folder structure.
- Explore the [Abstract layer](./abstract.md) to learn the design tokens.
- Browse [Components](./components.md), [Layout](./layout.md), and [Utilities](./utilities.md) for the consumable surface.
- Customize the framework through [Customization & Design Tokens](./customization.md).
