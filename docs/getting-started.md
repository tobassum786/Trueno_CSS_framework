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

No JavaScript runtime is required — Trueno CSS compiles to pure CSS.

---

## 1. Installation

Clone the repository (recommended for contributing or customizing the source):

```bash
git clone https://github.com/tobassum786/Trueno_CSS_framework.git
cd Trueno_CSS_framework
```

Install the dependencies:

```bash
npm install
```

This installs **sass** (the compiler) and the small set of watcher dependencies declared in `package.json`.

---

## 2. Build the Framework

The build pipeline is fully driven by `package.json` scripts.

| Script | Command | Description |
| --- | --- | --- |
| `npm run clean` | `rm -rf dist/*` | Wipe the previous build |
| `npm run sass:compile` | `sass src/main.scss:dist/trueno-css-framework.css --style expanded --no-source-map` | Generate the expanded CSS |
| `npm run sass:minify` | `sass src/main.scss:dist/trueno-css-framework.min.css --style compressed --no-source-map` | Generate the minified CSS |
| `npm run build` | `npm run clean && npm run sass:compile && npm run sass:minify` | Run the full production build |
| `npm run dev` | `sass --watch src/main.scss:dist/trueno-css-framework.css --style expanded --no-source-map` | Recompile on every save |

### Production build

```bash
npm run build
```

After running, the `dist/` folder will contain:

- `trueno-css-framework.css` — expanded, human-readable CSS for development
- `trueno-css-framework.min.css` — minified CSS for production

### Watch mode (development)

```bash
npm run dev
```

Sass watches `src/main.scss` and every partial it imports. On every save, the expanded CSS is regenerated automatically.

---

## 3. Use the Compiled CSS

Link the stylesheet in your HTML:

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
        <button class="btn btn--primary">Get Started</button>
    </div>
</body>
</html>
```

> ⚠️ The compiled CSS file has no JavaScript dependencies. Trueno CSS is CSS-only.

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

## 6. Browser Support

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

## 7. Project Layout (Top Level)

```
Trueno_CSS_framework/
├── dist/                  # Compiled output
├── docs/                  # This documentation
├── examples/              # Example projects
├── src/                   # Sass source (7-1 architecture)
│   ├── abstract/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── themes/
│   ├── utilities/
│   ├── vendors/
│   └── main.scss
├── package.json
├── README.md
└── Home.png / Logo.png    # Brand assets
```

For a deep dive into the source layout, see [Architecture](./architecture.md).

---

## 8. Next Steps

- Read [Architecture](./architecture.md) to understand the 7-1 folder structure.
- Explore the [Abstract layer](./abstract.md) to learn the design tokens.
- Browse [Components](./components.md), [Layout](./layout.md), and [Utilities](./utilities.md) for the consumable surface.
- Customize the framework through [Customization & Design Tokens](./customization.md).
