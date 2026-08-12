# Animations & Transitions

Trueno CSS ships a complete motion system — design tokens, a keyframe library, and utility classes — so animations stay fast, accessible, and on-brand.

```
base/          keyframe library (namespaced `tr-*`) + reduced-motion safety
utilities/     `.u-anim-*`, `.u-transition*`, `.u-hover-*`, `.reveal`
abstract/      motion tokens (durations, easings) + CSS custom properties
```

---

## 1. Motion Tokens

All durations and easings are defined once in `abstract/_variables.scss` and exposed as CSS custom properties on `:root`:

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `$duration-instant` | `0ms` | `$ease-linear` | `linear` |
| `$duration-fast` | `150ms` | `$ease-base` | `cubic-bezier(.25,.1,.25,1)` |
| `$duration-base` | `250ms` | `$ease-in` | `cubic-bezier(.42,0,1,1)` |
| `$duration-slow` | `400ms` | `$ease-out` | `cubic-bezier(0,0,.58,1)` |
| `$duration-slower` | `600ms` | `$ease-in-out` | `cubic-bezier(.42,0,.58,1)` |
| | | `$ease-bounce` | `cubic-bezier(.34,1.56,.64,1)` |
| | | `$ease-elastic` | `cubic-bezier(.68,-.6,.32,1.6)` |

Runtime equivalents (`--tr-duration-*`, `--tr-ease-*`) are emitted so you can retune motion without recompiling.

**How to pick:** `fast` for micro-interactions (hover, focus), `base` for color/opacity swaps, `slow` for reveals and modals, `slower` for attention-grabbing or decorative motion. Prefer `ease-out` for anything entering and `ease-in-out` for continuous motion.

---

## 2. Animation utilities — `.u-anim-*`

Apply a keyframe with a single class. Timing is overridable per element via custom properties:

```html
<div class="u-anim-fade-in-up" style="--tr-duration: .6s; --tr-delay: .2s">
```

| Class | Effect | Class | Effect |
| --- | --- | --- | --- |
| `.u-anim-fade-in` | fade in | `.u-anim-slide-in-up` | slide in (100% travel) |
| `.u-anim-fade-in-up` | fade + rise | `.u-anim-slide-in-down` | slide in from top |
| `.u-anim-fade-in-down` | fade + sink | `.u-anim-slide-in-left` | slide in from right |
| `.u-anim-fade-in-left` | fade from left | `.u-anim-slide-in-right` | slide in from left |
| `.u-anim-fade-in-right` | fade from right | `.u-anim-bounce` | attention bounce |
| `.u-anim-zoom-in` | zoom in | `.u-anim-pulse` | gentle pulse |
| `.u-anim-zoom-out` | zoom out | `.u-anim-shake` | error shake |
| `.u-anim-spin` | rotate 360° | `.u-anim-flash` | opacity flash |
| `.u-anim-float` | floating bob | `.u-anim-glow` | pulsing focus ring |

### Modifiers

| Class | Overrides | Class | Overrides |
| --- | --- | --- | --- |
| `.u-anim-instant` / `fast` / `slow` / `slower` | `--tr-duration` | `.u-anim-delay-sm` / `md` / `lg` | `--tr-delay` |
| `.u-anim-repeat` | iterations: infinite | `.u-anim-2` / `-3` | iterations count |
| `.u-anim-ease-bounce` / `-elastic` | `--tr-easing` | `.u-anim-reverse` | reversed direction |

```html
<!-- Spinner (or a live-pulse dot) -->
<span class="badge badge--primary u-anim-pulse u-anim-repeat">LIVE</span>

<!-- Repeating decorative float -->
<img class="u-anim-float u-anim-repeat" src="…" alt="">

<!-- Staggered card entrance -->
<div class="card u-anim-fade-in-up u-anim-delay-sm">…</div>
```

---

## 3. Transition utilities

| Class | Effect |
| --- | --- |
| `.u-transition` | Smoothly transitions `all` (duration/easing from `--tr-duration` / `--tr-easing`) |
| `.u-transition--fast` / `--slow` / `--slower` | Duration override |
| `.u-transition--colors` | `background-color, border-color, color, box-shadow` |
| `.u-transition--transform` | `transform` only |
| `.u-transition--opacity` | `opacity, visibility` |
| `.u-transition--shadow` | `box-shadow` only |

---

## 4. Hover interactions

Drop-in micro-interactions that work with any component:

| Class | Effect |
| --- | --- |
| `.u-hover-lift` | translateY up + deeper shadow |
| `.u-hover-grow` | scale up 5% |
| `.u-hover-shadow` | shadow only |
| `.u-hover-brighten` | brightness up |
| `.u-hover-fade` | starts at 82% opacity → full on hover |

Cards also ship an interactive modifier, `.card--hoverable`, that lifts with a primary border on hover/focus.

---

## 5. Scroll reveal

The `.reveal` helper hides an element and fades/slides it in when `.is-visible` is added. Wire it with `IntersectionObserver`:

```html
<div class="reveal is-visible">…</div>
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

---

## 6. Accessibility & `prefers-reduced-motion`

Motion is **off by default for users who ask for it.** The framework includes a global rule that collapses animation and transition durations to ~0 when `prefers-reduced-motion: reduce` is set, and `.reveal` snaps straight to visible. Do not override these rules with decoration — they are an accessibility guarantee, not a preference.
