# Layout

The **layout layer** provides page-level structural primitives: a flexible 12-column grid, a fixed-width container, and the default site header.

Source: `src/layout/`

```
layout/
├── _grid.scss
└── _header.scss
```

---

## 1. `_grid.scss`

A 12-column responsive grid built with **Flexbox**. The grid is mobile-first — every column class is full-width by default and you opt-in to spans at larger breakpoints.

### Container

`.container` is a centered, max-width wrapper.

```css
.container {
  max-width: 1200px; /* $breakpoint-xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;  /* $spacing-md */
  padding-right: 1rem; /* $spacing-md */
}
```

Usage:

```html
<div class="container">
  <!-- page content -->
</div>
```

### Rows and columns

- `.row` is a horizontal flex container that wraps. It uses negative margins to align with column padding.
- `.col` is an auto-sizing column (flex-grow: 1).
- `.col-{n}` is a fixed column that takes `n` of 12 tracks.
- `.col-{breakpoint}-{n}` applies the span **at that breakpoint and up**.

### Generated column classes

| Breakpoint | Min-width | Generated classes |
| --- | --- | --- |
| (none) | 0px | `.col-1` through `.col-12` |
| `sm` | 576px | `.col-sm-1` through `.col-sm-12` |
| `md` | 768px | `.col-md-1` through `.col-md-12` |
| `lg` | 992px | `.col-lg-1` through `.col-lg-12` |
| `xl` | 1200px | `.col-xl-1` through `.col-xl-12` |

Each column uses `flex: 0 0 calc(100% / 12 * n)` and the same `max-width`, so columns sit on a single line until the row wraps.

### Example

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Full width on small, half on md, one-third on lg -->
    </div>
    <div class="col-12 col-md-6 col-lg-8">
      <!-- Full width on small, half on md, two-thirds on lg -->
    </div>
  </div>
</div>
```

### Auto-layout columns

Use `.col` to let columns share remaining space:

```html
<div class="row">
  <div class="col">Auto</div>
  <div class="col-6">Half</div>
  <div class="col">Auto</div>
</div>
```

### Gutters

The default horizontal gutter is `$spacing-sm` (0.5rem / 8px) on each side of every column. The row's negative margin compensates for the first and last column, so content lines up with the container edges.

To change gutters, override the padding in your own stylesheet:

```css
.row { margin-left: -1rem; margin-right: -1rem; }
.row > [class*="col-"] { padding-left: 1rem; padding-right: 1rem; }
```

### Nesting

You can nest a `.row` inside any column to create complex layouts:

```html
<div class="row">
  <div class="col-md-6">
    <div class="row">
      <div class="col-6">Nested 1</div>
      <div class="col-6">Nested 2</div>
    </div>
  </div>
  <div class="col-md-6">
    Main column
  </div>
</div>
```

### Code reference

```scss
.container {
  max-width: $breakpoint-xl;
  margin-left: auto;
  margin-right: auto;
  padding-left: $spacing-md;
  padding-right: $spacing-md;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -$spacing-sm;
  margin-right: -$spacing-sm;
}

.col {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  padding-left: $spacing-sm;
  padding-right: $spacing-sm;
}

@for $i from 1 through 12 {
  .col-#{$i} {
    flex: 0 0 calc(100% / 12 * #{$i});
    max-width: calc(100% / 12 * #{$i});
  }
}

@include media-sm { @for $i from 1 through 12 { .col-sm-#{$i} { ... } } }
@include media-md { @for $i from 1 through 12 { .col-md-#{$i} { ... } } }
@include media-lg { @for $i from 1 through 12 { .col-lg-#{$i} { ... } } }
@include media-xl { @for $i from 1 through 12 { .col-xl-#{$i} { ... } } }
```

---

## 2. `_header.scss`

The default site header pattern. Use it as-is for a quick branded top bar, or extend the classes for a more complex navigation.

### Block structure

```
.main-header
├── .main-header__logo
│   └── a
└── nav.main-nav
    └── .main-nav__list
        └── .main-nav__item
            └── a
```

### Class reference

| Class | Purpose |
| --- | --- |
| `.main-header` | Dark background, white text, vertical padding, bottom border. |
| `.main-header .container` | Flex container that aligns logo and nav with `space-between`. |
| `.main-header__logo` | Heading font, large size, bold. |
| `.main-header__logo a` | White link, no underline, primary color on hover. |
| `.main-nav__list` | Flex list (no default `<ul>` styling, thanks to `%list-reset`). |
| `.main-nav__item` | Spacing between items via `margin-left`. |
| `.main-nav__item a` | Light gray link, primary color on hover. |

### Example

```html
<header class="main-header">
  <div class="container">
    <div class="main-header__logo">
      <a href="/">⚡ Trueno</a>
    </div>
    <nav class="main-nav">
      <ul class="main-nav__list">
        <li class="main-nav__item"><a href="/">Home</a></li>
        <li class="main-nav__item"><a href="/docs">Docs</a></li>
        <li class="main-nav__item"><a href="/about">About</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### Code reference

```scss
.main-header {
  background-color: $color-dark;
  color: $color-white;
  padding: $spacing-md 0;
  border-bottom: $border-width-base solid color.adjust($color-dark, $lightness: 10%);

  .container {
    @include flex-align(center);
    justify-content: space-between;
  }
}

.main-header__logo {
  font-family: $font-family-heading;
  font-size: $h3-font-size;
  font-weight: bold;

  a {
    color: $color-white;
    text-decoration: none;

    &:hover {
      color: $color-primary;
      text-decoration: none;
    }
  }
}

.main-nav__list {
  @include flex-align(center);
}

.main-nav__item {
  margin-left: $spacing-lg;

  a {
    color: $color-light;
    font-size: $font-size-base;
    padding: $spacing-xs 0;

    &:hover {
      color: $color-primary;
      text-decoration: none;
    }
  }
}
```

### Theming

The dark theme (`themes/_dark-theme.scss`) provides `.theme--dark .main-header` overrides that lighten the background and tweak link colors. See [Themes](./themes.md) for details.

---

## Layout Best Practices

1. **Always use `.container` for page content.** A naked `.row` will span the full viewport width.
2. **Combine column classes for responsive layouts.** `.col-12 col-md-6 col-lg-4` is the canonical "stack on mobile, half on tablet, third on desktop" pattern.
3. **Do not add `display: flex` to `.row` in your own CSS.** The grid already provides it — overriding it will break the negative-margin gutter trick.
4. **Use `.main-header` as a starting point.** It is designed to be extended: add a search box, dropdowns, or a mobile menu as children.
