/* ============================================================
   Trueno CSS — Documentation site generator
   Wraps content fragments (pages/*.html) in the shared shell
   template and writes the final static pages.

   Usage: node build-docs.js
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'template.html'), 'utf8');
const PAGES_DIR = path.join(ROOT, 'pages');

const SIDEBAR_TOKEN_BY_KEY = {
    getting_started: 'SIDEBAR_GETTING_STARTED',
    architecture: 'SIDEBAR_ARCHITECTURE',
    abstract: 'SIDEBAR_ABSTRACT',
    colors: 'SIDEBAR_COLORS',
    customization: 'SIDEBAR_CUSTOMIZATION',
    animations: 'SIDEBAR_ANIMATIONS',
    base: 'SIDEBAR_BASE',
    layout: 'SIDEBAR_LAYOUT',
    components: 'SIDEBAR_COMPONENTS',
    utilities: 'SIDEBAR_UTILITIES',
    themes: 'SIDEBAR_THEMES',
    vendors: 'SIDEBAR_VENDORS',
    contributing: 'SIDEBAR_CONTRIBUTING',
    changelog: 'SIDEBAR_CHANGELOG',
};

/* ============================================================
   Color plates explorer
   Reads the compiled framework CSS and rebuilds the interactive
   plate grid from the `--tr-*` custom properties it finds. The
   explorer therefore always matches the compiled output — edit
   a plate in Sass, rebuild, and the page updates itself.
   ============================================================ */
const DIST_CSS = path.join(ROOT, '..', 'dist', 'trueno-css-framework.css');

function generateColorPlates() {
    if (!fs.existsSync(DIST_CSS)) {
        return '<p class="docs-callout docs-callout--info">Build the framework first '
            + '(<code>npm run build</code>) to generate the interactive plate explorer.</p>';
    }

    const css = fs.readFileSync(DIST_CSS, 'utf8');
    const re = /--tr-([a-z]+)-(\d+):\s*(#[0-9a-fA-F]{3,8})/g;
    const plates = [];
    const index = new Map();
    const seen = new Set();

    let m;
    while ((m = re.exec(css)) !== null) {
        const name = m[1];
        const step = Number(m[2]);
        // 0 and 1000 are per-hue gradient anchors (white/black) — skip
        if (step === 0 || step === 1000) continue;
        if (!index.has(name)) {
            index.set(name, plates.length);
            plates.push({ name, steps: [] });
            seen.add(name);
        }
        const plate = plates[index.get(name)];
        if (!plate.steps.find((s) => s.step === step)) {
            plate.steps.push({ step, hex: m[3].toLowerCase() });
        }
    }

    for (const plate of plates) {
        plate.steps.sort((a, b) => a.step - b.step);
    }

    if (plates.length === 0) {
        return '<p class="docs-callout docs-callout--info">No <code>--tr-*</code> tokens found '
            + 'in the compiled CSS.</p>';
    }

    return plates.map((plate) => {
        const swatches = plate.steps.map((s) => {
            const token = `--tr-${plate.name}-${s.step}`;
            return [
                `                <button class="plate__swatch" type="button"`,
                `                        data-hex="${s.hex}" data-token="${token}" data-step="${s.step}"`,
                `                        style="--sw: ${s.hex}"`,
                `                        aria-label="Copy ${token} (${s.hex})">`,
                `                    <span class="plate__swatch-fill" aria-hidden="true"></span>`,
                `                    <span class="plate__swatch-meta">`,
                `                        <span class="plate__swatch-step">${s.step}</span>`,
                `                        <span class="plate__swatch-hex">${s.hex}</span>`,
                `                    </span>`,
                `                    <span class="plate__swatch-token">${token}</span>`,
                `                </button>`,
            ].join('\n');
        }).join('\n');

        return [
            `            <section class="plate" data-plate="${plate.name}">`,
            `                <header class="plate__header">`,
            `                    <h3 class="plate__title">${plate.name}</h3>`,
            `                    <code class="plate__prefix">--tr-${plate.name}-*</code>`,
            `                </header>`,
            `                <div class="plate__steps">`,
            swatches,
            `                </div>`,
            `            </section>`,
        ].join('\n');
    }).join('\n\n');
}

const COMPONENTS_SUBNAV = [
    ['#button', 'Button'],
    ['#card', 'Card'],
    ['#modal', 'Modal'],
    ['#navbar', 'Navbar'],
    ['#alert', 'Alert'],
    ['#badge', 'Badge'],
    ['#pagination', 'Pagination'],
    ['#breadcrumb', 'Breadcrumb'],
    ['#forms', 'Forms'],
].map(([href, label]) =>
    `<li><a class="sidebar-subnav__link" href="components.html${href}">${label}</a></li>`
).join('\n');

const COMPONENTS_SUBNAV_BLOCK = [
    '<ul class="sidebar-subnav" id="sidebarSubnav">',
    COMPONENTS_SUBNAV,
    '</ul>',
].join('\n');

const UTILITIES_SUBNAV = [
    ['#spacing', 'Spacing'],
    ['#gap', 'Gap showcase'],
    ['#helpers', 'Helpers'],
    ['#gradients', 'Gradients'],
    ['#gradient-best-practices', 'Best practices'],
].map(([href, label]) =>
    `<li><a class="sidebar-subnav__link" href="${href}">${label}</a></li>`
).join('\n');

const UTILITIES_SUBNAV_BLOCK = [
    '<ul class="sidebar-subnav" id="sidebarSubnav">',
    UTILITIES_SUBNAV,
    '</ul>',
].join('\n');

const PAGES = [
    {
        file: 'getting-started.html',
        title: 'Getting Started',
        description: 'Getting started with Trueno CSS — installation, build workflow, and basic usage.',
        heroBadge: '🚀 Getting Started',
        heroTitle: 'Getting Started',
        heroLead: 'This guide walks you through installing Trueno CSS, building the framework from source, and integrating it into your project.',
        active: 'getting_started',
        prev: ['index.html', 'Documentation Index'],
        next: ['architecture.html', 'Architecture'],
    },
    {
        file: 'architecture.html',
        title: 'Architecture',
        description: 'Trueno CSS 7-1 Sass architecture — folder structure, loading order, and naming conventions.',
        heroBadge: '🏗️ Architecture',
        heroTitle: 'Architecture',
        heroLead: 'Trueno CSS follows the 7-1 pattern — the most widely adopted Sass architecture for scalable, maintainable CSS frameworks.',
        active: 'architecture',
        prev: ['getting-started.html', 'Getting Started'],
        next: ['abstract.html', 'Abstract Layer'],
    },
    {
        file: 'abstract.html',
        title: 'Abstract Layer',
        description: 'The Sass-only toolkit: variables, mixins, functions, and placeholders that power every layer of Trueno CSS.',
        heroBadge: '🎨 Abstract Layer',
        heroTitle: 'Abstract Layer',
        heroLead: 'The abstract layer is the Sass-only toolkit of the framework. It produces no CSS output on its own — variables, mixins, functions, and placeholders.',
        active: 'abstract',
        prev: ['architecture.html', 'Architecture'],
        next: ['colors.html', 'Color Plates'],
    },
    {
        file: 'customization.html',
        title: 'Customization & Design Tokens',
        description: 'Unlock and retheme every Trueno CSS design token — Sass variables, class-scope overrides, and CSS custom properties.',
        heroBadge: '⚙️ Customization',
        heroTitle: 'Customization &amp; Design Tokens',
        heroLead: 'Trueno CSS is designed to be customized at three levels: Sass variables, class-scope overrides, and CSS custom properties.',
        active: 'customization',
        prev: ['colors.html', 'Color Plates'],
        next: ['animations.html', 'Animations & Motion'],
    },
    {
        file: 'animations.html',
        title: 'Animations & Motion',
        description: 'The Trueno CSS motion system — motion tokens, keyframe library, and animation/transition utilities with live demos.',
        heroBadge: '🎬 Animations &amp; Motion',
        heroTitle: 'Animations &amp; Transitions',
        heroLead: 'A complete motion system: design tokens for duration and easing, a namespaced keyframe library, and utility classes — with a replayable, accessible live gallery.',
        active: 'animations',
        prev: ['customization.html', 'Customization & Tokens'],
        next: ['base.html', 'Base Styles'],
    },
    {
        file: 'base.html',
        title: 'Base Styles',
        description: 'Trueno CSS base layer — CSS resets and typography defaults.',
        heroBadge: '🧱 Base Styles',
        heroTitle: 'Base Styles',
        heroLead: 'The base layer applies element-level styles: resets that normalize cross-browser behavior, and typography defaults for headings, paragraphs, and links.',
        active: 'base',
        prev: ['animations.html', 'Animations & Motion'],
        next: ['layout.html', 'Layout'],
    },
    {
        file: 'layout.html',
        title: 'Layout',
        description: 'Trueno CSS layout layer — the 12-column flexbox grid and the default site header.',
        heroBadge: '📐 Layout',
        heroTitle: 'Layout',
        heroLead: 'The layout layer provides page-level structural primitives: a flexible 12-column grid, a fixed-width container, and the default site header.',
        active: 'layout',
        prev: ['base.html', 'Base Styles'],
        next: ['components.html', 'Components'],
    },
    {
        file: 'components.html',
        title: 'Components',
        description: 'Trueno CSS components — buttons, cards, modals, navbars, alerts, badges, pagination, breadcrumbs, and forms, styled with BEM naming.',
        heroBadge: '🧩 Components',
        heroTitle: 'Components',
        heroLead: 'Components are reusable, self-contained UI patterns. Each one follows BEM naming, depends only on the abstract layer, and ships with sane defaults.',
        active: 'components',
        prev: ['layout.html', 'Layout'],
        next: ['utilities.html', 'Utilities'],
    },
    {
        file: 'utilities.html',
        title: 'Utilities',
        description: 'Trueno CSS utilities — spacing scale and single-purpose helper classes.',
        heroBadge: '🔧 Utilities',
        heroTitle: 'Utilities',
        heroLead: 'Utility classes are single-purpose, composable helpers. They always use !important and are prefixed with u- so they are easy to spot in markup.',
        active: 'utilities',
        prev: ['components.html', 'Components'],
        next: ['themes.html', 'Themes'],
    },
    {
        file: 'themes.html',
        title: 'Themes',
        description: 'Trueno CSS themes — light and dark theme scoped overrides.',
        heroBadge: '🌙 Themes',
        heroTitle: 'Themes',
        heroLead: 'Themes are scoped override files, loaded last in main.scss so theme rules win the cascade against components and utilities.',
        active: 'themes',
        prev: ['utilities.html', 'Utilities'],
        next: ['vendors.html', 'Vendors'],
    },
    {
        file: 'vendors.html',
        title: 'Vendors',
        description: 'Trueno CSS vendors layer — third-party stylesheet integration.',
        heroBadge: '📦 Vendors',
        heroTitle: 'Vendors',
        heroLead: 'The vendors folder is the home for third-party stylesheets — Normalize.css or anything else that should load before the framework base styles.',
        active: 'vendors',
        prev: ['themes.html', 'Themes'],
        next: ['contributing.html', 'Contributing'],
    },
    {
        file: 'customization.html',
        title: 'Customization & Design Tokens',
        description: 'Unlock and retheme every Trueno CSS design token — Sass variables, class-scope overrides, and CSS custom properties.',
        heroBadge: '⚙️ Customization',
        heroTitle: 'Customization &amp; Design Tokens',
        heroLead: 'Trueno CSS is designed to be customized at three levels: Sass variables, class-scope overrides, and CSS custom properties.',
        active: 'customization',
        prev: ['colors.html', 'Color Plates'],
        next: ['base.html', 'Base Styles'],
    },
    {
        file: 'contributing.html',
        title: 'Contributing',
        description: 'Contribution guide for Trueno CSS — code standards, dev setup, and the PR process.',
        heroBadge: '🤝 Contributing',
        heroTitle: 'Contributing',
        heroLead: 'Thank you for your interest in improving Trueno CSS! Whether you are reporting a bug, suggesting a feature, or submitting a PR, your help is appreciated.',
        active: 'contributing',
        prev: ['vendors.html', 'Vendors'],
        next: ['changelog.html', 'Changelog'],
    },
    {
        file: 'changelog.html',
        title: 'Changelog',
        description: 'All notable changes to the Trueno CSS Framework — version history, releases, and roadmap.',
        heroBadge: '📝 Changelog',
        heroTitle: 'Changelog',
        heroLead: 'All notable changes to Trueno CSS Framework, following Keep a Changelog and Semantic Versioning.',
        active: 'changelog',
        prev: ['contributing.html', 'Contributing'],
        next: ['index.html', 'Documentation Index'],
    },
];

function renderPage(page) {
    const content = fs.readFileSync(path.join(PAGES_DIR, page.file), 'utf8');
    const out = path.join(ROOT, page.file);

    let html = TEMPLATE;

    const replacements = {
        '{{TITLE}}': page.title,
        '{{DESCRIPTION}}': page.description,
        '{{HERO_BADGE}}': page.heroBadge,
        '{{HERO_TITLE}}': page.heroTitle,
        '{{HERO_LEAD}}': page.heroLead,
        '{{PREV_HREF}}': page.prev[0],
        '{{PREV_NAME}}': page.prev[1],
        '{{NEXT_HREF}}': page.next[0],
        '{{NEXT_NAME}}': page.next[1],
        '{{CONTENT}}': content,
    };

    for (const [token, value] of Object.entries(replacements)) {
        html = html.split(token).join(value);
    }

    for (const [key, token] of Object.entries(SIDEBAR_TOKEN_BY_KEY)) {
        const marker = key === page.active ? ' sidebar-active' : '';
        html = html.split('{{' + token + '}}').join(marker);
    }

    // Sub-nav: render the active page's block under its sidebar link,
    // and strip the other page's placeholder (only one subnav per page).
    html = html.split('{{COMPONENTS_SUBNAV}}')
        .join(page.active === 'components' ? COMPONENTS_SUBNAV_BLOCK : '');
    html = html.split('{{UTILITIES_SUBNAV}}')
        .join(page.active === 'utilities' ? UTILITIES_SUBNAV_BLOCK : '');

    if (page.active === 'colors') {
        html = html.split('{{COLOR_PLATES}}').join(generateColorPlates());
    }

    fs.writeFileSync(out, html);
    console.log('✔ ' + page.file);
}

let ok = 0;
let skipped = 0;
for (const page of PAGES) {
    const fragment = path.join(PAGES_DIR, page.file);
    if (!fs.existsSync(fragment)) {
        console.warn('⚠ missing content fragment: pages/' + page.file);
        skipped += 1;
        continue;
    }
    renderPage(page);
    ok += 1;
}

console.log('\nGenerated ' + ok + ' pages, skipped ' + skipped + '.');