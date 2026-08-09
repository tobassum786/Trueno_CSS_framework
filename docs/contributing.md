# Contributing

Thank you for your interest in improving **Trueno CSS**! Whether you're reporting a bug, suggesting a feature, or submitting a pull request, your help is appreciated.

This guide covers the workflow, code standards, and development setup for contributing to the framework.

---

## Code of Conduct

By participating in this project, you agree to be respectful and constructive. Be kind to other contributors — especially those who are new to the project or to open source in general.

---

## How to Contribute

### 1. Reporting Bugs

Open an issue on [GitHub](https://github.com/tobassum786/Trueno_CSS_framework/issues) with:

- A clear, descriptive title.
- Steps to reproduce the issue.
- The expected behavior and the actual behavior.
- A minimal code sample or live demo (CodePen, JSFiddle, etc.).
- Screenshots or GIFs when relevant.
- Your environment (browser, OS, framework version).

### 2. Suggesting Features

Open an issue with:

- A clear description of the feature.
- The problem it solves and who benefits.
- A proposed API (class names, mixin signatures, etc.).
- Alternatives you've considered and why they're not sufficient.

### 3. Improving Documentation

Documentation PRs are very welcome. If you spot a typo, an unclear example, or a missing page, send a fix!

### 4. Submitting Pull Requests

1. **Fork** the repository.
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-name
   ```
3. **Make your changes.** Follow the [Code Standards](#code-standards) below.
4. **Test** the build locally:
   ```bash
   npm run build
   ```
5. **Update documentation** if your change affects public behavior.
6. **Commit** with a descriptive message:
   ```bash
   git commit -m "feat: add .btn--ghost modifier"
   git commit -m "fix: correct card__footer padding in dark theme"
   ```
7. **Push** your branch and open a Pull Request against `main`.

---

## Development Setup

### Prerequisites

| Tool | Version |
| --- | --- |
| Node.js | 14+ |
| npm | 6+ |
| Git | latest |

### Clone and install

```bash
git clone https://github.com/tobassum786/Trueno_CSS_framework.git
cd Trueno_CSS_framework
npm install
```

### Run the build

```bash
npm run build
```

This cleans the `dist/` folder and produces both expanded and minified CSS.

### Watch mode

```bash
npm run dev
```

Sass watches `src/main.scss` and recompiles on every save.

### Verify your changes

Before opening a PR, make sure:

- [ ] `npm run build` runs without errors.
- [ ] The expanded and minified CSS files are generated.
- [ ] You haven't introduced any new SCSS errors or warnings.
- [ ] Documentation is updated if you added or changed a public class, mixin, function, or token.

---

## Code Standards

### Sass Style

- Use **Sass modules** (`@use`, `@forward`, `as *`) — never `@import`.
- Order `@use` statements at the top of every file.
- Indent with **2 spaces**. No tabs.
- Use **kebab-case** for file names (e.g., `_button-base.scss`).
- Use **BEM** for component class names (`.card__title`, `.btn--primary`).
- Prefix utility classes with `u-` (`.u-text-center`).
- Use `!important` **only** inside utility files.
- Prefer Sass variables, mixins, and functions over hard-coded values.

### Naming Conventions

| Pattern | Example | Used for |
| --- | --- | --- |
| Block | `.card` | The component itself |
| Element | `.card__title` | A child of a block |
| Modifier | `.btn--primary` | A variant of a block |
| Utility | `.u-d-flex` | Single-purpose helpers |
| State | `.is-open` | State classes (e.g., modal open) |
| Theme | `.theme--dark` | Theme scope class |

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
| --- | --- |
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, missing semicolons, etc. — no code change |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `test:` | Adding or correcting tests |
| `chore:` | Build process, tooling, dependencies |

Examples:

```bash
git commit -m "feat: add new .card--featured modifier"
git commit -m "fix: prevent text overflow in .modal__title"
git commit -m "docs: clarify dark theme activation in themes.md"
```

### File Organization

When adding a new component:

1. Create a partial in `src/components/_your-component.scss`.
2. Follow the existing BEM and `@use` conventions.
3. Register the partial in `src/main.scss`.
4. Add documentation under `docs/components.md`.

When adding a new utility:

1. Add it to the appropriate file in `src/utilities/` (or create a new one if it's a different concern).
2. Prefix every class with `u-`.
3. Use `!important`.
4. Document the utility in `docs/utilities.md`.

---

## Project Structure

```
Trueno_CSS_framework/
├── dist/                  # Compiled CSS output (generated)
├── docs/                  # Documentation site
├── examples/              # Example projects
├── src/                   # Sass source
│   ├── abstract/          # Sass toolkit
│   ├── base/              # Element defaults
│   ├── components/        # UI components
│   ├── layout/            # Layout primitives
│   ├── themes/            # Theme overrides
│   ├── utilities/         # Helper classes
│   ├── vendors/           # Third-party styles
│   └── main.scss          # Single entry file
├── package.json
└── README.md
```

See [Architecture](./architecture.md) for a deeper walkthrough.

---

## Release Process

Releases are managed by the maintainers. The process is:

1. Update `CHANGELOG.md` (see [Changelog](./changelog.md)).
2. Bump the version in `package.json` following [Semantic Versioning](https://semver.org/).
3. Run a full build: `npm run build`.
4. Tag the release: `git tag vX.Y.Z`.
5. Push the tag: `git push --tags`.
6. Publish to npm (when applicable) and create a GitHub release.

### Versioning

Trueno CSS follows **semver**:

- **Major** (`1.0.0` → `2.0.0`) — breaking changes (renamed classes, removed features, restructured files).
- **Minor** (`1.0.0` → `1.1.0`) — new features that are backwards compatible.
- **Patch** (`1.0.0` → `1.0.1`) — bug fixes and small improvements.

---

## Review Process

Pull requests are reviewed by the maintainers. The review focuses on:

- **Correctness** — does it do what it claims?
- **Consistency** — does it follow the existing patterns?
- **Performance** — does it keep the compiled CSS small?
- **Accessibility** — does it preserve or improve the user experience for assistive tech?
- **Documentation** — is the change documented?

Expect feedback — it's a normal part of the process. Address comments by pushing new commits to the same branch.

---

## Getting Help

- **Questions / discussion:** open a GitHub issue with the `question` label.
- **Bugs / feature requests:** open a GitHub issue.
- **Security issues:** please email the maintainers directly rather than opening a public issue.

---

## License

By contributing, you agree that your contributions will be licensed under the **MIT License** — the same license as the rest of the project.
