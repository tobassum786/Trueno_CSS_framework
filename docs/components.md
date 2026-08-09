# Components

Components are reusable, self-contained UI patterns. Each one follows **BEM** (Block–Element–Modifier) naming, depends only on the abstract layer, and ships with sane defaults you can override per instance.

Source: `src/components/`

```
components/
├── _button.scss
├── _card.scss
└── _modal.scss
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

## Component Best Practices

1. **Compose, don't duplicate.** Cards contain headings, paragraphs, and buttons — never redefine the styles of `h2` or `.btn` inside `.card`.
2. **Use semantic HTML.** Buttons should be `<button>` (or `<a>` for navigation), not `<div>`.
3. **Follow BEM when extending.** If you add a custom card variant, name it `.card--featured`, not `.featured-card`.
4. **Override variables, not selectors.** Change `$color-primary` rather than writing `.btn--primary { background: red; }` everywhere.
