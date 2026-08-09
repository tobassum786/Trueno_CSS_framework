# Themes

Themes are scoped override files. They live in the **themes** layer of the 7-1 architecture and are loaded **last** in `main.scss`, so theme rules win the cascade against components and utilities.

Source: `src/themes/`

```
themes/
├── _light-theme.scss
└── _dark-theme.scss
```

The current framework ships two themes:

| Theme | File | How it's activated |
| --- | --- | --- |
| Light | `_light-theme.scss` | Default — applies automatically. |
| Dark | `_dark-theme.scss` | Activate by adding the `.theme--dark` class to a parent element (typically `<body>` or `<html>`). |

---

## 1. Light Theme — `_light-theme.scss`

The light theme is the framework default. The variables in `abstract/_variables.scss` already encode the light palette (white background, dark text, light grays, etc.).

`_light-theme.scss` is a **scaffold** for any future light-mode-only overrides. By default it only contains commented examples that demonstrate the pattern:

```scss
// Default light theme variables (can override _variables.scss if desired,
// or define theme-specific variables)
// $theme-background: #ffffff;
// $theme-text: #333333;
```

If you want to introduce theme-specific tokens (e.g., `--theme-background`, `--theme-text`), this is the place.

### Adding a new light-theme token

```scss
// src/themes/_light-theme.scss
:root {
  --theme-background: #ffffff;
  --theme-text: #1a1a1a;
  --theme-link: #007bff;
}
```

Then consume the tokens in components:

```scss
.card {
  background-color: var(--theme-background);
  color: var(--theme-text);
}
```

---

## 2. Dark Theme — `_dark-theme.scss`

The dark theme is scoped to the `.theme--dark` class. To enable it, add the class to a parent element — typically `<body>`:

```html
<body class="theme--dark">
  <!-- everything inside inherits the dark theme -->
</body>
```

### What it changes

| Target | Light default | Dark override |
| --- | --- | --- |
| `body` background | inherited | `$color-dark` (#343a40) |
| `body` text | `$text-color-base` | `$color-light` (#f8f9fa) |
| Headings (`h1`–`h6`) | `$text-color-base` | `$color-white` |
| Links (`a`) | `$color-primary` | `$color-info` (#17a2b8) |
| `.main-header` background | `$color-dark` | `color.adjust($color-dark, $lightness: 10%)` |
| `.main-header` border | — | `color.adjust($color-dark, $lightness: 20%)` |
| `.main-header__logo a` | white → primary on hover | white → info on hover |
| `.main-nav__item a` | light → primary on hover | light → info on hover |
| `.card` background | white | `$color-dark` |
| `.card` border | `$border-color-base` | `color.adjust($color-dark, $lightness: 10%)` |
| `.card` shadow | `rgba(0,0,0,0.05)` | `rgba(0,0,0,0.2)` |
| `.card__header`, `.card__footer` | light | `color.adjust($color-dark, $lightness: 5%)` |
| `.card__title` | base | white |
| `.card__text` | light | light |

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dark theme demo</title>
  <link rel="stylesheet" href="trueno-css-framework.min.css">
</head>
<body class="theme--dark">

  <header class="main-header">
    <div class="container">
      <div class="main-header__logo">
        <a href="#">⚡ Trueno</a>
      </div>
      <nav class="main-nav">
        <ul class="main-nav__list">
          <li class="main-nav__item"><a href="#">Home</a></li>
          <li class="main-nav__item"><a href="#">Docs</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="container py-xl">
    <h1>Dark mode</h1>
    <p>The text and background colors are inverted using the dark theme.</p>

    <div class="row">
      <div class="col-12 col-md-6 mb-md">
        <div class="card">
          <div class="card__body">
            <h2 class="card__title">Card title</h2>
            <p class="card__text">The card surface uses a dark color.</p>
          </div>
        </div>
      </div>
    </div>
  </main>

</body>
</html>
```

### Code reference

```scss
.theme--dark {
  background-color: $color-dark;
  color: $color-light;

  h1, h2, h3, h4, h5, h6 {
    color: $color-white;
  }

  a {
    color: $color-info;
  }

  .main-header {
    background-color: color.adjust($color-dark, $lightness: 10%);
    border-color: color.adjust($color-dark, $lightness: 20%);

    .main-header__logo a {
      color: $color-white;
      &:hover { color: $color-info; }
    }

    .main-nav__item a {
      color: $color-light;
      &:hover { color: $color-info; }
    }
  }

  .card {
    background-color: $color-dark;
    border-color: color.adjust($color-dark, $lightness: 10%);
    box-shadow: 0 2px 4px rgba($color-black, 0.2);
  }

  .card__header, .card__footer {
    background-color: color.adjust($color-dark, $lightness: 5%);
    border-color: color.adjust($color-dark, $lightness: 10%);
    color: $color-light;
  }

  .card__title { color: $color-white; }
  .card__text  { color: $color-light; }
}
```

---

## 3. Adding a New Theme

Themes are just Sass partials that scope their overrides to a top-level class. To add a new theme:

### Step 1 — Create the partial

```scss
// src/themes/_high-contrast-theme.scss
.theme--high-contrast {
  background-color: #000000;
  color: #ffffff;

  a {
    color: #ffff00;
    text-decoration: underline;
  }

  .btn {
    border: 2px solid #ffffff;
  }

  .card {
    border-color: #ffffff;
  }
}
```

### Step 2 — Register the partial in `main.scss`

```scss
@use 'themes/_light-theme';
@use 'themes/_dark-theme';
@use 'themes/_high-contrast-theme';  // <-- new theme
```

### Step 3 — Use it in markup

```html
<body class="theme--high-contrast">
  <!-- page content -->
</body>
```

### Best practices for new themes

1. **Always scope to a top-level class.** Themes should never leak into other parts of the page.
2. **Add the partial last.** The cascade depends on themes being last in `main.scss`.
3. **Override variables when possible, not selectors.** A `body.theme--dark { color: $text-color-base }` is less maintainable than introducing a `--theme-text` custom property and changing the variable.
4. **Reuse the existing color tokens.** Reach for `$color-dark`, `$color-light`, `$color-info`, etc., rather than introducing new colors.

---

## 4. Theme Switching with JavaScript

Trueno CSS does not ship a theme switcher. Toggle the `.theme--dark` class with vanilla JavaScript:

```js
const root = document.documentElement;

document.getElementById('themeToggle').addEventListener('click', () => {
  root.classList.toggle('theme--dark');
  localStorage.setItem(
    'theme',
    root.classList.contains('theme--dark') ? 'dark' : 'light'
  );
});

// Restore the saved theme on load
if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('theme--dark');
}
```

> 💡 For more advanced theme systems (e.g., `prefers-color-scheme` auto-switch, multiple themes), prefer driving the class change with JavaScript and persist the choice to `localStorage` or a cookie.

---

## 5. CSS Custom Properties — A More Flexible Pattern

The current dark theme uses Sass variables scoped to a class. A more powerful pattern is to expose your theme tokens as **CSS custom properties** so the same value can be used inside and outside of theme classes.

```scss
// src/themes/_dark-theme.scss (alternative implementation)
.theme--dark {
  --theme-background: #343a40;
  --theme-text: #f8f9fa;
  --theme-link: #17a2b8;
}
```

```scss
// in any component
.card {
  background-color: var(--theme-background, $color-white);
  color: var(--theme-text, $text-color-base);
}
```

This pattern lets you swap themes at runtime without recompiling Sass, and it composes well with system preferences (`@media (prefers-color-scheme: dark)`).

The Trueno CSS dark theme ships with the **class-scoped** approach for simplicity, but every component already uses Sass variables — adopting CSS custom properties is a drop-in change whenever you need it.
