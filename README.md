![trueno logo](logo-alt.png)

# **⚡Trueno CSS Documentation**

Welcome to the official documentation for Trueno CSS!

Trueno CSS is a modern, responsive, and highly customizable CSS framework designed to accelerate web development and ensure design consistency across projects. Built with a mobile-first approach, it provides a comprehensive set of reusable components, flexible layout systems, and utility classes, all optimized for performance and accessibility.

---

## **I. Getting Started**

This section will guide you through the process of integrating Trueno CSS into your project, from installation to basic usage.

### **1. Introduction**

Trueno CSS empowers developers to build beautiful, responsive, and accessible user interfaces with speed and efficiency. It achieves this by offering:

* **Modularity:** Use only what you need, reducing bundle size.
* **Mobile-First Responsiveness:** Designed for all screen sizes.
* **Theming with CSS Variables:** Easy, real-time customization.
* **Robust Grid System:** Flexible layouts using Flexbox or CSS Grid.
* **Essential UI Components:** Ready-to-use buttons, forms, navigation, and more.
* **Accessibility (A11y) Focus:** Built with best practices for all users.

### **2. Installation**

Choose the method that best suits your project:

#### **a. Via NPM (Recommended for modern workflows)**

```
npm install truno-css
# or
yarn add truno-css
```

Then, you can import the framework’s CSS and (if applicable) JavaScript into your project’s entry files (e.g., `main.js` or `app.scss`):

```
// main.js or app.js
import 'trueno/dist/css/trueno.min.css';
// If your framework includes JS components:
// import 'trueno/dist/js/trueno.min.js';
```

```
// app.scss
@use 'trueno/src/scss/main.scss'; // For full customization
// or
@import 'trueno/dist/css/trueno.css'; // For pre-compiled
```

#### **b. Via CDN**

For quick prototyping or projects without a build tool, you can link directly to the CDN:

```
<!-- In your <head> section -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/trueno/dist/css/[your-framework-name].min.css">

<!-- Before closing </body> tag, if your framework has JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/trueno/dist/js/trueno.min.js"></script>
```

#### **c. Direct Download**

Download the compiled CSS and JavaScript files directly from our GitHub releases page or website.

### **3. Basic Usage**

Once installed, you can start using [Your Framework Name]'s classes in your HTML.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My trueno Project</title>
    <!-- Link to your framework's CSS -->
    <link rel="stylesheet" href="path/to/trueno.min.css">
</head>
<body>

    <div class="container my-5">
        <h1 class="text-primary text-center">Hello, trueno!</h1>
        <p class="lead text-muted">This is a simple example demonstrating the framework's power.</p>

        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-primary btn-lg">Primary Button</button>
            </div>
            <div class="col-md-6">
                <button class="btn btn-outline-secondary">Secondary Button</button>
            </div>
        </div>
    </div>

    <!-- Link to your framework's JavaScript (if any) -->
    <script src="path/to/trueno.min.js"></script>
</body>
</html>
```

### **4. Browser Support**

Trueno CSS aims to support all modern browsers.

* **Desktop:** Chrome, Firefox, Safari, Edge (latest 2 versions)
* **Mobile:** iOS Safari, Android Chrome (latest 2 versions)
* *(Optional: List any specific IE support or fallbacks if applicable)*

### **5. Dependencies**

Trueno CSS is built with minimal external dependencies.

* **CSS:** Pure CSS (or compiled from Sass/Less).
* **JavaScript:** (Optional) Vanilla JavaScript. *([Or] If using, list any specific micro-libraries or requirements, e.g., “Requires jQuery if using certain interactive components.”)*
* **Icons:** (Optional) We recommend using Font Awesome, Bootstrap Icons, or your preferred SVG icon library.

---

## **II. Customization**

Trueno CSS is designed for ultimate flexibility. Learn how to tailor it to your project’s unique design system.

### **1. Theming with CSS Variables**

The easiest way to customize your framework is by overriding CSS Custom Properties (variables). These variables are defined at the `:root` level and can be changed globally or for specific sections.

```
/* Custom styles in your project's CSS file */
:root {
  --primary-color: #6c5ce7; /* Your custom brand color */
  --secondary-color: #00b894;
  --font-family-base: 'Inter', sans-serif;
  --space-md: 1.5rem;
}

/* Example: Change button radius */
.btn {
  --btn-border-radius: 0.25rem; /* Default */
  border-radius: var(--btn-border-radius);
}

/* Override for specific button style */
.btn-primary {
  --btn-border-radius: 0.5rem; /* More rounded primary button */
}
```

Refer to the [Design Tokens / CSS Variables Reference](http://tauri.localhost/core/record#_design-tokens-css-variables-reference) section for a full list of available variables.

### **2. Overriding Styles**

You can always override any framework style with your own custom CSS by targeting elements directly or by using more specific selectors.

```
/* Override a framework style */
.btn-primary {
  background-color: darkblue !important; /* Not recommended, but possible */
  padding: 1.5rem 3rem; /* Custom padding */
}
```

**Best Practice:** Prefer overriding CSS variables and extending existing classes over aggressive `!important` declarations.

### **3. Build Process Customization (Advanced)**

If you’re using the Sass source files, you have full control over the framework’s compilation.

#### **a. Sass Variable Overrides**

Before compiling, you can override Sass variables to change default values, mixins, or even disable specific components.

1. Create a custom Sass file (e.g., `_custom-variables.scss`).
2. Override desired variables:
   ```
   // _custom-variables.scss
   $grid-columns: 16; // Use a 16-column grid instead of 12
   $primary: #ff6b6b; // New primary color
   $enable-shadows: false; // Disable shadows globally
   ```
3. Import your custom variables *before* importing the framework’s main Sass file:
   ```
   // your-app.scss
   @use 'path/to/your-custom-variables'; // Your overrides
   @use '[your-framework-name]/src/scss/main'; // Framework's main entry
   ```

#### **b. Custom Builds (Tree-shaking CSS)**

Utilize your build tool (Webpack, Vite, Gulp) with tools like `PurgeCSS` to remove unused CSS and create a highly optimized, lean build tailored to your project.

**Example Webpack/PostCSS setup (conceptual):**

```
// webpack.config.js (simplified)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const path = require('path');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  // Only apply PurgeCSS in production builds
                  process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
                    content: [
                      path.join(__dirname, './src/**/*.html'),
                      path.join(__dirname, './src/**/*.js'),
                    ],
                    safelist: {
                      standard: [/^(some-dynamic-class|another-class)$/], // Safelist classes added dynamically
                    },
                  }),
                  require('cssnano')({ preset: 'default' }),
                ].filter(Boolean),
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    // New PurgeCSSPlugin({ paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }) }), // Alternative if using standalone PurgeCSS
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // Already included in PostCSS but good for standalone
    ],
  },
};
```

---

## **III. Layout**

Trueno CSS provides a powerful and flexible grid system to structure your page content responsively.

### **1. Grid System**

Our grid system is built with **CSS Grid** for maximum flexibility and performance, while also offering **Flexbox** utilities for specific alignment needs.

#### **a. Grid Containers**

Use the `.grid-container` class to create a grid wrapper. By default, it creates a 12-column grid.

```
<div class="grid-container">
    <!-- Grid columns go here -->
</div>
```

#### **b. Columns**

Columns are defined by specifying how many grid tracks they span using classes like `col-span-N`. For responsive behavior, combine with breakpoint prefixes (`md-`, `lg-`, etc.).

* `.col-span-N`: Spans N columns (e.g., `col-span-6` for half width).
* `.col-md-N`: Spans N columns on medium screens and up.
* `.col-lg-N`: Spans N columns on large screens and up.

**Example:**

```
<div class="grid-container">
    <div class="col-span-12 col-md-6 col-lg-4">
        <!-- This column will take full width on small, half on medium, one-third on large screens -->
        <div class="p-3 border">Column Content</div>
    </div>
    <div class="col-span-12 col-md-6 col-lg-8">
        <!-- This column will take full width on small, half on medium, two-thirds on large screens -->
        <div class="p-3 border">Column Content</div>
    </div>
</div>
```

#### **c. Gutters**

Gutters are handled elegantly with CSS Grid’s `gap` property. The default gap is `1rem`, controlled by the `--grid-gap` CSS variable.

```
/* Override default grid gap */
.grid-container {
  --grid-gap: 2rem;
}
```

#### **d. Auto-layout Columns**

Use `.col` to create columns that automatically take up available space.

```
<div class="grid-container">
    <div class="col">Auto-sized column</div>
    <div class="col-span-6">Fixed 6-column column</div>
    <div class="col">Another auto-sized column</div>
</div>
```

#### **e. Nesting Grids**

You can nest `grid-container`s within columns to create complex layouts.

```
<div class="grid-container">
    <div class="col-span-12 col-md-6">
        <div class="grid-container"> <!-- Nested grid -->
            <div class="col-span-6">Nested Col 1</div>
            <div class="col-span-6">Nested Col 2</div>
        </div>
    </div>
    <div class="col-span-12 col-md-6">
        <div class="p-3 border">Main Grid Column</div>
    </div>
</div>
```

### **2. Breakpoints**

Our framework follows a mobile-first approach. Breakpoints are defined as follows:


| Breakpoint  | Prefix | Min-width | CSS Variable (for JS) |
| ----------- | ------ | --------- | --------------------- |
| Small       | `sm-`  | 576px     | `--breakpoint-sm`     |
| Medium      | `md-`  | 768px     | `--breakpoint-md`     |
| Large       | `lg-`  | 992px     | `--breakpoint-lg`     |
| Extra Large | `xl-`  | 1200px    | `--breakpoint-xl`     |

Example usage: `d-none d-md-block` (hidden on small screens, block on medium and up).

### **3. Containers**

Use `.container` for a responsive fixed-width container or `.container-fluid` for a full-width container.

```
<div class="container">
    <!-- Content within a max-width container -->
</div>

<div class="container-fluid">
    <!-- Content spanning 100% width -->
</div>
```

---

## **IV. Content**

Basic styling for common HTML elements and content blocks.

### **1. Typography**

Consistent and readable typography is built-in.

* **Headings:** `<h1>` through `<h6>` are styled with proportional sizes and margins.
* **Paragraphs:** Default font size, line height, and margins for `<p>` tags.
* **Lists:** `<ul>`, `<ol>`, and `<dl>` have basic styling. Use `.list-unstyled` to remove default list styles.
* **Blockquotes:** Use `<blockquote>` for quoting blocks of content.
* **Code:** Use `<code>` for inline code and `<pre>` with `<code>` for code blocks.
* **Text Utilities:**
  * `.text-left`, `.text-center`, `.text-right`
  * `.text-primary`, `.text-secondary`, `.text-success`, etc. (using theme colors)
  * `.text-uppercase`, `.text-lowercase`, `.text-capitalize`
  * `.fw-bold`, `.fw-normal`, `.fw-light` (font weights)

### **2. Images**

Make images responsive and add basic styling.

* `.img-fluid`: Makes an image responsive, scaling it to the parent’s width while maintaining aspect ratio.
* `.img-thumbnail`: Adds a rounded 1px border.

```
<img src="path/to/image.jpg" class="img-fluid" alt="Responsive image">
```

### **3. Tables**

Basic styling for `<table>` elements.

* `.table`: Adds basic styling to a table.
* `.table-striped`: Adds zebra-striping to table rows.
* `.table-bordered`: Adds borders on all sides of the table and cells.
* `.table-hover`: Enables a hover state on table rows.
* `.table-responsive`: Wraps the table to make it scroll horizontally on small devices.

```
<div class="table-responsive">
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>#</th>
                <th>First</th>
                <th>Last</th>
                <th>Handle</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <!-- More rows -->
        </tbody>
    </table>
</div>
```

---

## **V. Components**

A collection of pre-designed, reusable UI components. Each component includes HTML examples, available classes, and accessibility notes.

### **1. Buttons**

Highly customizable buttons for various actions.

* **Default:** `<button class="btn">Default</button>`
* **Styles:** `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`, `.btn-warning`, `.btn-info`, `.btn-light`, `.btn-dark`, `.btn-link`
* **Outline Styles:** `.btn-outline-primary`, `.btn-outline-secondary`, etc.
* **Sizes:** `.btn-sm`, `.btn-lg`
* **States:** `.btn-disabled` (for `button` elements) or `disabled` attribute.
* **Accessibility:** Buttons use native `<button>` elements ensuring proper keyboard navigation and semantic meaning.

**Example:**

```
<button class="btn btn-primary">Primary Button</button>
<a href="#" class="btn btn-secondary btn-sm">Small Link Button</a>
<button class="btn btn-outline-success btn-lg" disabled>Large Disabled Button</button>
```

### **2. Forms**

Styled form controls for inputs, textareas, selects, and checkboxes.

* **Form Controls:** `.form-control` for text inputs, textareas, and selects.
* **Input Group:** Use `.input-group` to combine inputs with text or buttons.
* **Checkboxes & Radios:** Custom styled checkboxes (`.form-check-input`) and radio buttons.
* **Validation States:** `.is-valid` and `.is-invalid` with feedback messages.
* **Accessibility:** All form controls are designed with proper `for` attributes for labels, and support ARIA attributes for validation and states.

**Example:**

```
<form>
  <div class="mb-3">
    <label for="exampleInputEmail" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword" class="form-label">Password</label>
    <input type="password" class="form-control is-invalid" id="exampleInputPassword">
    <div class="invalid-feedback">
      Please choose a password.
    </div>
  </div>
  <div class="form-check mb-3">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### **3. Cards**

Flexible and extensible content containers with optional header and footer.

* `.card`: The main container.
* `.card-header`, `.card-body`, `.card-footer`: Optional sections.
* `.card-title`, `.card-subtitle`, `.card-text`: Typography within the card.

**Example:**

```
<div class="card" style="width: 18rem;">
  <img src="path/to/image.jpg" class="card-img-top" alt="Card image">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### **4. Modals (Requires JavaScript)**

Pop-up dialogs for lightboxes, user notifications, or completely custom content.

* **Trigger:** Use a button with `data-bs-toggle="modal"` and `data-bs-target="#yourModalId"`.
* **Structure:** `.modal`, `.modal-dialog`, `.modal-content`, `.modal-header`, `.modal-body`, `.modal-footer`.
* **Sizes:** `.modal-sm`, `.modal-lg`, `.modal-xl` for different modal widths.
* **Accessibility:** Modals implement proper ARIA roles (`role="dialog"`) and attributes (`aria-modal="true"`, `aria-labelledby`, `aria-describedby`) and handle focus trapping within the modal. Keyboard users can close with `Escape`.

**Example:**

```
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

**JavaScript API (Conceptual):**

```
// Manually open/close a modal
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
myModal.show();
myModal.hide();

// Listen for modal events
const myModalElement = document.getElementById('myModal');
myModalElement.addEventListener('shown.bs.modal', function () {
  console.log('Modal is now visible');
});
```

*(Repeat for other components like Navbars, Alerts, Dropdowns, etc., following a similar structure with Description, Examples, Options/Classes, JS API, and Accessibility notes.)*

---

## **VI. Utilities**

Single-purpose, highly composable classes to quickly build custom designs without writing new CSS.

### **1. Spacing**

Modify an element’s margin or padding. Format: `{property}{sides}-{size}` or `{property}{sides}-{breakpoint}-{size}`.

* **Properties:** `m` (margin), `p` (padding)
* **Sides:**
  * `t` (top), `b` (bottom), `l` (left), `r` (right)
  * `x` (left & right), `y` (top & bottom)
  * (blank) for all 4 sides
* **Sizes:** `0`, `1`, `2`, `3`, `4`, `5`, `auto` (based on a spacing scale, e.g., `1` = `0.25rem`, `2` = `0.5rem`, `3` = `1rem`, `4` = `1.5rem`, `5` = `3rem`)

**Examples:**

* `m-0`: `margin: 0 !important;`
* `mt-3`: `margin-top: 1rem !important;`
* `px-4`: `padding-left: 1.5rem !important; padding-right: 1.5rem !important;`
* `pb-lg-5`: `padding-bottom: 3rem !important;` on large screens and up.
* `mx-auto`: `margin-left: auto !important; margin-right: auto !important;` (for centering block elements)

### **2. Display**

Quickly and responsively toggle the `display` property.

* `.d-none`, `.d-inline`, `.d-inline-block`, `.d-block`, `.d-flex`, `.d-grid`, `.d-table`, `.d-table-cell`, `.d-table-row`
* Responsive variations: `.d-md-none`, `.d-lg-flex`, etc.

**Example:**

```
<div class="d-none d-md-block">Hidden on small screens, visible on medium and up.</div>
<div class="d-flex justify-content-center align-items-center">Flexbox container centered items.</div>
```

### **3. Colors**

Apply text or background colors using the theme palette.

* **Text Colors:** `.text-primary`, `.text-secondary`, `.text-success`, `.text-danger`, `.text-warning`, `.text-info`, `.text-light`, `.text-dark`, `.text-muted`, `.text-white`
* **Background Colors:** `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-danger`, `.bg-warning`, `.bg-info`, `.bg-light`, `.bg-dark`, `.bg-white`, `.bg-transparent`

**Example:**

```
<p class="text-primary">This text is the primary color.</p>
<div class="p-3 bg-success text-white">This div has a success background and white text.</div>
```

### **4. Borders & Shadows**

Add borders and box shadows.

* **Borders:** `.border`, `.border-top`, `.border-bottom`, `.border-start`, `.border-end`, `.border-0`
* **Border Colors:** `.border-primary`, `.border-success`, etc.
* **Border Radius:** `.rounded`, `.rounded-top`, `.rounded-bottom`, `.rounded-circle`, `.rounded-pill`, `.rounded-0`
* **Shadows:** `.shadow-sm`, `.shadow`, `.shadow-lg`, `.shadow-none`

**Example:**

```
<div class="p-3 border rounded shadow-sm">A bordered, rounded box with a small shadow.</div>
```

*(List other utilities like Flexbox/Grid Helpers, Sizing, Position, Text alignment, etc.)*

---

## **VII. Design Tokens / CSS Variables Reference**

A complete list of CSS Custom Properties available for customization.


| Variable Name                                                                                | Default Value                       | Description                                  |
| -------------------------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------- |
| `--primary-color`                                                                            | `#007bff`                           | Main brand color for primary elements.       |
| `--secondary-color`                                                                          | `#6c757d`                           | Secondary brand color.                       |
| `--success-color`                                                                            | `#28a745`                           | Color for success states.                    |
| `--danger-color`                                                                             | `#dc3545`                           | Color for danger/error states.               |
| `--body-bg`                                                                                  | `#fff`                              | Default background color for the`<body>`.    |
| `--body-color`                                                                               | `#212529`                           | Default text color for the`<body>`.          |
| `--font-family-base`                                                                         | `sans-serif`                        | Base font stack.                             |
| `--font-size-base`                                                                           | `1rem`                              | Base font size (typically 16px).             |
| `--line-height-base`                                                                         | `1.5`                               | Base line height.                            |
| `--h1-font-size`                                                                             | `2.5rem`                            | Font size for H1 heading.                    |
| `--spacing-1`                                                                                | `0.25rem`                           | Smallest spacing unit.                       |
| `--spacing-2`                                                                                | `0.5rem`                            | Small spacing unit.                          |
| `--spacing-3`                                                                                | `1rem`                              | Medium spacing unit.                         |
| `--grid-columns`                                                                             | `12`                                | Number of columns in the grid.               |
| `--grid-gap`                                                                                 | `1rem`                              | Default gap between grid columns.            |
| `--breakpoint-sm`                                                                            | `576px`                             | Min-width for the ‘small’ breakpoint.      |
| `--border-radius-base`                                                                       | `0.25rem`                           | Default border radius for components.        |
| `--box-shadow-sm`                                                                            | `0 .125rem .25rem rgba(0,0,0,.075)` | Small box shadow.                            |
| `--transition-base`                                                                          | `all .2s ease-in-out`               | Default transition for interactive elements. |
| *(… many more variables for specific components like `--btn-padding-y`, `--card-bg`, etc.)* |                                     |                                              |

---

## **VIII. Accessibility (A11y)**

Trueno CSS is built with accessibility in mind, adhering to WCAG (Web Content Accessibility Guidelines) standards to ensure your applications are usable by everyone.

### **1. Semantic HTML**

We prioritize the use of semantic HTML5 elements (`<nav>`, `<main>`, `<button>`, etc.) to provide inherent meaning to content and improve navigation for assistive technologies.

### **2. ARIA Attributes**

Complex interactive components (Modals, Dropdowns, Tabs, etc.) are enhanced with appropriate ARIA (Accessible Rich Internet Applications) attributes (e.g., `role`, `aria-expanded`, `aria-controls`, `aria-label`) to convey their state, properties, and relationships to assistive technologies like screen readers.

### **3. Keyboard Navigation**

* **Focus Management:** All interactive elements (`<button>`, `<a>`, `<input>`) are keyboard-focusable.
* **Focus Indicators:** Clear visual focus styles (`:focus` outlines) are provided for all interactive elements, allowing users to easily track their keyboard focus.
* **Component-Specific Interaction:** Modals can be closed with the `Escape` key, and complex navigations (like dropdowns) support arrow key navigation.

### **4. Color Contrast**

Our default color palette and component styling meet WCAG 2.1 AA contrast ratios for normal and large text, ensuring readability for users with visual impairments. We recommend checking any custom color combinations you introduce.

### **5. Responsive & Scalable Design**

The framework’s responsive design ensures content reflows logically on different screen sizes. Font sizes use relative units (`rem`, `em`) allowing users to adjust text size through browser settings. Interactive elements are designed with sufficient touch target sizes for mobile users.

---

## **IX. Migration Guide**

(This section will be added for future major versions, detailing breaking changes and steps to upgrade from previous versions of the framework.)

---

## **X. Contributing**

We welcome contributions to Trueno CSS! Whether it’s a bug report, a feature request, or a code contribution, your help is valuable.

### **1. How to Contribute**

* **Report Bugs:** Open an issue on our GitHub repository with a clear description and steps to reproduce.
* **Feature Requests:** Open an issue explaining your idea and its benefits.
* **Pull Requests:**
  1. Fork the repository.
  2. Create a new branch (`git checkout -b feature/your-feature-name` or `bugfix/your-bug-name`).
  3. Make your changes.
  4. Ensure your code adheres to our [Code Standards](http://tauri.localhost/core/record#_code-standards).
  5. Write or update tests as appropriate.
  6. Update documentation if your changes affect existing features or add new ones.
  7. Commit your changes (`git commit -m "feat: Add new component X"` or `fix: Fix bug Y`).
  8. Push your branch (`git push origin feature/your-feature-name`).
  9. Open a Pull Request to our `main` branch.

### **2. Code Standards**

We use [Stylelint](https://stylelint.io/) for CSS/Sass linting and [ESLint](https://eslint.org/) for JavaScript. Please ensure your code passes lint checks before submitting a PR. Our pre-commit hooks typically enforce this automatically.

### **3. Development Setup**

To set up your local development environment:

1. Clone the repository: `git clone https://github.com/tobassum786/trueno_css_framework.git`
2. Navigate into the directory: `cd trueno-css`
3. Install dependencies: `npm install` (or `yarn install`)
4. Run the development server: `npm run dev` (or `yarn dev`) - This will typically open a local server with HMR.
5. Build for production: `npm run build` (or `yarn build`)

---

## **XI. About**

### **1. License**

Trueno CSS is open-source software licensed under the [MIT License / Apache 2.0 License / etc.]. See the `LICENSE` file in the repository for details.

### **2. Version History / Changelog**

For a detailed list of changes in each release, including new features, bug fixes, and deprecations, please refer to our [Changelog](https://github.com/tobassum786) on GitHub.

### **3. Team / Credits**

Trueno CSS is developed and maintained by Tobassum Munir/Code4Mind team. Special thanks to all contributors!

### **4. FAQ / Troubleshooting**

*(This section can include common questions and solutions.)*
