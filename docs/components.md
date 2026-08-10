# Components

Components are reusable, self-contained UI patterns. Each one follows **BEM** (Block–Element–Modifier) naming, depends only on the abstract layer, and ships with sane defaults you can override per instance.

Source: `src/components/`

```
components/
├── _button.scss
├── _card.scss
├── _modal.scss
├── _navbar.scss
├── _alert.scss
├── _badge.scss
├── _pagination.scss
└── _breadcrumb.scss
```

---

## 1. Button

Source: `src/components/_button.scss`

The button system is built on a shared `button-base` mixin (from `abstract/_mixins.scss`) that defines padding, border, transition, focus ring, and disabled state. Modifier classes add color and size variants.

### Block / Element / Modifier

| Type | Class | Purpose |
| --- | --- | --- |
| Block | `.btn` | Base button. Applies padding, border, transition, focus ring. |
| Modifier | `.btn--primary` | Primary call-to-action (blue). |
| Modifier | `.btn--secondary` | Secondary action (gray). |
| Modifier | `.btn--outline-primary` | Outlined primary — transparent fill, colored border. |
| Modifier | `.btn--sm` | Small button. |
| Modifier | `.btn--lg` | Large button. |
| Modifier | `.btn--hero` | Hero button — large, solid primary fill with white text. |

### Default button

```html
<button class="btn">Default</button>
```

The `.btn` class is the minimum required for the button to render correctly. It is meant to be combined with **one** color modifier and **optionally** one size modifier.

### Color modifiers

```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--outline-primary">Outline Primary</button>
```

`.btn--primary` and `.btn--secondary` set a solid background and white text. On hover, the background darkens by 7% via `color.adjust($color-primary, $lightness: -7%)`.

`.btn--outline-primary` has a transparent background, colored border, and colored text. On hover, the background fills with the primary color and the text becomes white.

`.btn--hero` is designed for hero sections — a large primary button with white text that stands out against dark backgrounds. It combines a bigger size with a solid primary fill:

```html
<button class="btn btn--hero">Get started</button>
```

### Size modifiers

```html
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary">Default</button>
<button class="btn btn--primary btn--lg">Large</button>
```

| Class | Padding | Font size |
| --- | --- | --- |
| `.btn--sm` | `$spacing-xs $spacing-sm` | `rem(14px)` |
| (default) | `$spacing-sm $spacing-md` | `$font-size-base` |
| `.btn--lg` | `$spacing-md $spacing-xl` | `rem(20px)` |

### States

Disabled buttons are handled with the native `disabled` attribute. The `button-base` mixin applies `opacity: 0.6` and `cursor: not-allowed`:

```html
<button class="btn btn--primary" disabled>Disabled</button>
```

### Buttons as links

Apply `.btn` to an `<a>` element to get a link styled as a button:

```html
<a href="/signup" class="btn btn--primary">Sign up</a>
```

### Accessibility

- Always use `<button>` for actions and `<a>` for navigation. Trueno CSS relies on the native semantics.
- The `button-base` mixin includes a `:focus` rule that adds a soft ring (`box-shadow: 0 0 0 0.2rem rgba($color-primary, 0.25)`) for keyboard users.
- The `:disabled` state visibly communicates the inactive state.

### Code reference

```scss
.btn {
  @include button-base;
}

.btn--primary {
  background-color: $color-primary;
  border-color: $color-primary;
  color: $color-white;

  &:hover {
    background-color: color.adjust($color-primary, $lightness: -7%);
    border-color: color.adjust($color-primary, $lightness: -7%);
  }
}

.btn--secondary {
  background-color: $color-secondary;
  border-color: $color-secondary;
  color: $color-white;

  &:hover {
    background-color: color.adjust($color-secondary, $lightness: -7%);
    border-color: color.adjust($color-secondary, $lightness: -7%);
  }
}

.btn--outline-primary {
  background-color: transparent;
  border-color: $color-primary;
  color: $color-primary;

  &:hover {
    background-color: $color-primary;
    color: $color-white;
  }
}

.btn--sm {
  padding: $spacing-xs $spacing-sm;
  font-size: rem(14px);
}

.btn--lg {
  padding: $spacing-md $spacing-xl;
  font-size: rem(20px);
}

.btn--hero {
  padding: $spacing-md $spacing-xxl;
  font-size: rem(22px);
  color: $color-white;
  background-color: $color-primary;
  border-color: $color-primary;

  &:hover {
    background-color: color.adjust($color-primary, $lightness: -7%);
    border-color: color.adjust($color-primary, $lightness: -7%);
  }
}
```

---

## 2. Card

Source: `src/components/_card.scss`

Cards are flexible content containers with optional header, body, and footer sections. The default card has a thin border, a subtle shadow, and a slightly rounded corner.

### Block / Element structure

| Class | Purpose |
| --- | --- |
| `.card` | Outer container — white background, border, shadow, rounded corners. |
| `.card__header` | Top section with a light background and bottom border. |
| `.card__body` | Main content area with comfortable padding. |
| `.card__footer` | Bottom section with a light background and top border. |
| `.card__title` | Heading style for the card title. |
| `.card__text` | Body text style. |

### Basic card

```html
<div class="card">
  <div class="card__body">
    <h2 class="card__title">Card title</h2>
    <p class="card__text">A short description of the card's content.</p>
  </div>
</div>
```

### Full card with header and footer

```html
<div class="card">
  <div class="card__header">Featured</div>
  <div class="card__body">
    <h2 class="card__title">Card title</h2>
    <p class="card__text">Supporting copy goes here.</p>
    <button class="btn btn--primary">Go somewhere</button>
  </div>
  <div class="card__footer">Last updated 3 mins ago</div>
</div>
```

### Image card

The default `.card` clips its children with `overflow: hidden`, so an image at the top sits flush against the rounded corner:

```html
<div class="card">
  <img src="path/to/image.jpg" alt="..." style="width: 100%;">
  <div class="card__body">
    <h2 class="card__title">Card with image</h2>
    <p class="card__text">A short description.</p>
  </div>
</div>
```

### Card grid

Cards are commonly placed in a grid:

```html
<div class="row">
  <div class="col-12 col-md-4 mb-md">
    <div class="card">
      <div class="card__body">
        <h2 class="card__title">One</h2>
        <p class="card__text">First card.</p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-4 mb-md">
    <div class="card">
      <div class="card__body">
        <h2 class="card__title">Two</h2>
        <p class="card__text">Second card.</p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-4 mb-md">
    <div class="card">
      <div class="card__body">
        <h2 class="card__title">Three</h2>
        <p class="card__text">Third card.</p>
      </div>
    </div>
  </div>
</div>
```

### Code reference

```scss
.card {
  background-color: $color-white;
  border: $border-width-base solid $border-color-base;
  border-radius: $border-radius-base;
  box-shadow: 0 2px 4px rgba($color-black, 0.05);
  overflow: hidden;
}

.card__header {
  padding: $spacing-md;
  border-bottom: $border-width-base solid $border-color-base;
  background-color: $color-light;
  font-weight: bold;
}

.card__body {
  padding: $spacing-md;

  > *:last-child {
    margin-bottom: 0;
  }
}

.card__footer {
  padding: $spacing-md;
  border-top: $border-width-base solid $border-color-base;
  background-color: $color-light;
  font-size: rem(14px);
  color: $text-color-muted;
}

.card__title {
  font-size: $h5-font-size;
  margin-bottom: $spacing-sm;
  color: $text-color-base;
}

.card__text {
  font-size: $font-size-base;
  color: $text-color-light;
}
```

### Theming

The dark theme overrides `.card`, `.card__header`, `.card__footer`, `.card__title`, and `.card__text` so cards render correctly when an ancestor has `.theme--dark`. See [Themes](./themes.md).

---

## 3. Modal

Source: `src/components/_modal.scss`

Modals are overlay dialogs. Trueno CSS ships the **styles** for a fully responsive modal. The **open/close behavior is up to you** — toggle the `.is-open` class on `.modal` via JavaScript.

### Block / Element structure

| Class | Purpose |
| --- | --- |
| `.modal` | Full-screen overlay (fixed position). Hidden by default. |
| `.modal.is-open` | When present, the modal becomes visible. |
| `.modal__dialog` | Centered dialog box. |
| `.modal__header` | Top bar of the dialog. |
| `.modal__title` | Heading inside the header. |
| `.modal__close-btn` | Close button. |
| `.modal__body` | Content area. |
| `.modal__footer` | Action area. |

### Default state

The default `.modal` is hidden via `opacity: 0` and `visibility: hidden`. The dialog is translated up by 50px and animates back to `translateY(0)` once the modal is open.

### Example markup

```html
<div class="modal" id="exampleModal" role="dialog" aria-modal="true" aria-labelledby="exampleModalTitle">
  <div class="modal__dialog">
    <div class="modal__header">
      <h2 class="modal__title" id="exampleModalTitle">Modal title</h2>
      <button type="button" class="modal__close-btn" aria-label="Close" data-modal-close>×</button>
    </div>
    <div class="modal__body">
      <p>Modal content goes here.</p>
    </div>
    <div class="modal__footer">
      <button type="button" class="btn btn--secondary" data-modal-close>Cancel</button>
      <button type="button" class="btn btn--primary">Confirm</button>
    </div>
  </div>
</div>
```

### Open / close with JavaScript

Add `.is-open` to the `.modal` element to show it. Remove the class to hide it.

```js
const modal = document.getElementById('exampleModal');

document.querySelectorAll('[data-modal-close]').forEach((btn) => {
  btn.addEventListener('click', () => modal.classList.remove('is-open'));
});

document.getElementById('openModal').addEventListener('click', () => {
  modal.classList.add('is-open');
});

// Optional: close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('is-open');
});

// Optional: close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('is-open');
});
```

### Animation

The dialog is animated using:

- `opacity` and `visibility` on `.modal` — fades the backdrop in/out.
- `transform: translateY(-50px)` on `.modal__dialog` — slides down into place when the parent gains `.is-open`.

Both transitions take `0.3s ease`.

### Accessibility

Recommended attributes and behaviors:

- `role="dialog"` on the dialog container.
- `aria-modal="true"` to signal modal mode to screen readers.
- `aria-labelledby` referencing the title's `id`.
- Focus management: move focus into the dialog when it opens, return focus to the trigger when it closes.
- `aria-label="Close"` on the close button.
- Closing the modal with the `Escape` key (see the JS example above).
- Ensure the rest of the page is `inert` or hidden from assistive tech while the modal is open.

### Code reference

```scss
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @include flex-center;
  background-color: rgba($color-black, 0.5);
  z-index: $z-index-modal-backdrop;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.is-open {
    opacity: 1;
    visibility: visible;
    z-index: $z-index-modal;
  }
}

.modal__dialog {
  background-color: $color-white;
  border-radius: $border-radius-base;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba($color-black, 0.3);
  transform: translateY(-50px);
  transition: transform 0.3s ease;

  .is-open & {
    transform: translateY(0);
  }
}

.modal__header {
  @include flex-align(center);
  justify-content: space-between;
  padding: $spacing-md;
  border-bottom: $border-width-base solid $border-color-base;
}

.modal__title {
  font-size: $h5-font-size;
  margin: 0;
}

.modal__close-btn {
  background: none;
  border: none;
  font-size: $h4-font-size;
  cursor: pointer;
  color: $text-color-muted;
  padding: $spacing-xs;

  &:hover {
    color: $text-color-base;
  }
}

.modal__body {
  padding: $spacing-md;
}

.modal__footer {
  @include flex-justify(flex-end);
  gap: $spacing-sm;
  padding: $spacing-md;
  border-top: $border-width-base solid $border-color-base;
}
```

---

## 4. Navbar

Source: `src/components/_navbar.scss`

The navbar is a flexible, responsive header block. It composes three parts: a brand, a collapsible area, and an optional mobile toggle. The collapse container is hidden below the `md` breakpoint and revealed by adding `.is-open` to either the `.navbar` or the `.navbar__collapse`. From `md` up the collapse is always visible and the toggle is hidden.

### Block / Element structure

| Class | Purpose |
| --- | --- |
| `.navbar` | Outer container — flex, white background, bottom border. |
| `.navbar__brand` | Logo / brand link. |
| `.navbar__nav` | `ul` of navigation links. |
| `.navbar__item` | `li` wrapper for each link. |
| `.navbar__link` | Individual nav link; `.is-active` / `aria-current="page"` marks the current page. |
| `.navbar__collapse` | Container for nav + controls; collapsed on mobile via `.is-open`. |
| `.navbar__toggle` | Mobile hamburger button (hidden at `md +`). |
| `.navbar--primary` | Primary-colored navbar with white text. |
| `.navbar--dark` | Dark navbar with light text. |

### Basic markup

```html
<nav class="navbar" aria-label="Primary navigation">
  <a class="navbar__brand" href="/">Trueno CSS</a>
  <div class="navbar__collapse">
    <ul class="navbar__nav">
      <li class="navbar__item"><a class="navbar__link is-active" href="/">Home</a></li>
      <li class="navbar__item"><a class="navbar__link" href="/about">About</a></li>
      <li class="navbar__item"><a class="navbar__link" href="/docs">Docs</a></li>
    </ul>
  </div>
  <button class="navbar__toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarCollapse">☰</button>
</nav>
```

### Collapse behavior

The `.navbar__collapse` and the `.navbar__toggle` work together:

- Below `md`, the collapse is hidden. Add `.is-open` (to `.navbar` or `.navbar__collapse`) to show it and set `aria-expanded="true"` on the toggle.
- At `md` and above, the collapse is always displayed and `.navbar__toggle` is hidden.

```js
const navbar = document.querySelector('.navbar');
const toggle = navbar.querySelector('.navbar__toggle');
const collapse = navbar.querySelector('.navbar__collapse');

toggle?.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('is-open');
  collapse.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});
```

### Color variants

```html
<nav class="navbar navbar--primary" aria-label="Primary navigation">
  <a class="navbar__brand" href="/">Brand</a>
  <div class="navbar__collapse">
    <ul class="navbar__nav">
      <li class="navbar__item"><a class="navbar__link is-active" href="/">Home</a></li>
    </ul>
  </div>
</nav>
```

Replace `.navbar--primary` with `.navbar--dark` for the dark variant. Both tint the brand, links, and toggle; active links and hover states use the `$color-primary`.

### Accessibility

- Use the native `nav` element with an `aria-label`.
- Mark the current page with `aria-current="page"` (Trueno styles both `[aria-current="page"]` and `.is-active`).
- Keep `aria-expanded` and `aria-controls` in sync when toggling the collapse.

### Code reference

```scss
.navbar {
  @include flex-align(center);
  flex-wrap: wrap;
  justify-content: space-between;
  padding: $spacing-sm $spacing-md;
  background-color: $color-white;
  border-bottom: $border-width-base solid $border-color-base;
}

.navbar__collapse {
  flex-basis: 100%;
  display: none;

  &.is-open,
  .navbar.is-open & {
    display: block;
  }

  @include media-md {
    display: flex !important;
    justify-content: space-between;
  }
}

.navbar__toggle {
  @include flex-center;
  width: $control-height;
  height: $control-height;
  border: $border-width-base solid $border-color-base;
  border-radius: $border-radius-sm;
  color: $text-color-base;

  @include media-md {
    display: none;
  }
}
```

---

## 5. Alert

Source: `src/components/_alert.scss`

Alerts surface short, important feedback — success, errors, warnings, or info. Each variant uses a clearly computed light background, colored border, and readable text. All derived from `$color-*` tokens with `color.adjust()`, so they re-theme automatically.

### Block / Element structure

| Class | Purpose |
| --- | --- |
| `.alert` | Alert container — padding, border, radius. |
| `.alert__title` | Optional bold heading inside the alert. |
| `.alert__body` | Main message text. |
| `.alert__close` | Optional dismiss button. |
| `.alert--primary` / `.alert--secondary` / `.alert--success` / `.alert--danger` / `.alert--warning` / `.alert--info` | Color variants. |

### Basic alert

```html
<div class="alert alert--success" role="alert">
  <div class="alert__body">Operation completed successfully.</div>
</div>
```

### With title and close button

```html
<div class="alert alert--danger" role="alert">
  <div class="alert__body">
    <p class="alert__title">Something went wrong</p>
    <p>Please check your input and try again.</p>
  </div>
  <button class="alert__close" type="button" aria-label="Close">×</button>
</div>
```

### Dismiss behavior

The close button style is supplied; the behavior is yours:

```js
document.querySelectorAll('.alert__close').forEach((btn) => {
  btn.addEventListener('click', () => btn.closest('.alert')?.remove());
});
```

### Stacking

Consecutive alerts automatically gain `margin-top: $spacing-sm`:

```html
<div class="alert alert--warning" role="alert">Short notice.</div>
<div class="alert alert--danger" role="alert">Another notice.</div>
```

### Code reference

```scss
@mixin alert-variant($base-color) {
  background-color: color.adjust($base-color, $lightness: 42%);
  border-color: color.adjust($base-color, $lightness: 25%);
  color: color.adjust($base-color, $lightness: -28%);
}

.alert--success {
  @include alert-variant($color-success);
}
```

---

## 6. Badge

Source: `src/components/_badge.scss`

Badges are small, compact labels for counts, tags, statuses, or metadata. Two families exist: solid (filled) and soft (light background, colored text). Optionally make a badge a pill with `.badge--pill`. Putting a `href` on a badge makes it interactive and adds a hover state.

### Classes

| Class | Purpose |
| --- | --- |
| `.badge` | Base inline label. |
| `.badge--primary` … `.badge--info`, `.badge--dark` | Solid color badges (white text). |
| `.badge--soft-primary` … `.badge--soft-info` | Soft badges — light background, colored text. |
| `.badge--pill` | Fully rounded (pill) shape. |

### Examples

```html
<span class="badge badge--primary">Primary</span>
<span class="badge badge--success">5 new</span>
<span class="badge badge--danger">Error</span>
<span class="badge badge--warning">Pending</span>
<span class="badge badge--soft-info">Beta</span>
<span class="badge badge--soft-success badge--pill">Verified</span>
```

### With a button or link

```html
<a href="/notifications" class="badge badge--primary badge--pill">3 unread</a>
<button class="badge badge--danger">Clear all</button>
```

### Code reference

```scss
@mixin badge-solid($base-color) {
  background-color: $base-color;
  color: $color-white;

  &[href]:hover {
    background-color: color.adjust($base-color, $lightness: -10%);
  }
}

.badge--success {
  @include badge-solid($color-success);
}

.badge--soft-info {
  @include badge-soft($color-info);
}

.badge--pill {
  border-radius: $border-radius-pill;
}
```

---

## 7. Pagination

Source: `src/components/_pagination.scss`

Pagination pages large result sets. It is a `ul.nav`-style list rendered with `.pagination__link` items. Alignment and sizing are modifiers on the `.pagination` block; an item can be active or disabled.

### Classes

| Class | Purpose |
| --- | --- |
| `.pagination` | Unordered list of page links. |
| `.pagination__link` | A single page control (also used for prev/next). |
| `.pagination--centered` / `.pagination--right` | Alignment of the whole list. |
| `.pagination--sm` / `.pagination--lg` | Size variants (also `pagination__link--sm` / `--lg`). |
| `.is-active` / `[aria-current="page"]` | Current page — filled primary. |
| `.is-disabled` / `[aria-disabled="true"]` | Disabled state. |

### Basic example

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li><a class="pagination__link" href="?page=1" aria-label="Previous">‹</a></li>
    <li><a class="pagination__link is-active" href="?page=1" aria-current="page">1</a></li>
    <li><a class="pagination__link" href="?page=2">2</a></li>
    <li><a class="pagination__link" href="?page=3">3</a></li>
    <li><a class="pagination__link" href="?page=3" aria-label="Next">›</a></li>
  </ul>
</nav>
```

### Sizes and alignment

```html
<ul class="pagination pagination--centered">
  <li><a class="pagination__link" href="?page=1">1</a></li>
  <li><a class="pagination__link is-active" aria-current="page" href="?page=2">2</a></li>
</ul>

<ul class="pagination pagination--sm pagination--right">
  <li><a class="pagination__link" href="?page=1">1</a></li>
</ul>
```

### Disabled control

Use `aria-disabled="true"` on the `<li>` (or the link). The style lives on `.pagination__link`:

```html
<li aria-disabled="true"><span class="pagination__link is-disabled">Previous</span></li>
```

### Code reference

```scss
.pagination__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: $control-height;
  min-height: $control-height;
  border: $border-width-base solid $border-color-base;
  border-radius: $border-radius-sm;
  color: $color-primary;

  &.is-active,
  &[aria-current='page'] {
    background-color: $color-primary;
    border-color: $color-primary;
    color: $color-white;
  }

  &.is-disabled,
  &[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.6;
  }
}
```

---

## 8. Breadcrumb

Source: `src/components/_breadcrumb.scss`

Breadcrumbs communicate hierarchy. The last item is the current page and is styled muted and non-interactive; preceding items are links with a `/` separator inserted between them.

### Classes

| Class | Purpose |
| --- | --- |
| `.breadcrumb` | `ol` / `ul` container — light background, rounded. |
| `.breadcrumb__item` | Wrapper for each crumb. |
| `.breadcrumb__link` | Non-current crumb link. |
| `.breadcrumb__item--active` | Current page crumb (muted, not a link). |

### Example

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/">Home</a></li>
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/docs">Docs</a></li>
    <li class="breadcrumb__item breadcrumb__item--active" aria-current="page">Components</li>
  </ol>
</nav>
```

The separator is purely decorative; the `aria-current="page"` attribute names the final crumb for assistive tech.

### Code reference

```scss
.breadcrumb__item + .breadcrumb__item::before {
  content: '/';
  color: $text-color-muted;
}

.breadcrumb__item--active {
  color: $text-color-muted;
}
```

---

## Component Best Practices

1. **Compose, don't duplicate.** Cards contain headings, paragraphs, and buttons — never redefine the styles of `h2` or `.btn` inside `.card`.
2. **Use semantic HTML.** Buttons should be `<button>` (or `<a>` for navigation), not `<div>`.
3. **Follow BEM when extending.** If you add a custom card variant, name it `.card--featured`, not `.featured-card`.
4. **Override variables, not selectors.** Change `$color-primary` rather than writing `.btn--primary { background: red; }` everywhere.
