/* ============================================================
   Trueno CSS — Documentation site scripts
   Theme toggle, mobile nav, sidebar, and copy buttons.
   ============================================================ */

(function () {
    'use strict';

    // ---- Sticky header shadow ----
    var header = document.querySelector('.docs-header');
    if (header) {
        var onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---- Mobile nav toggle ----
    var navToggle = document.getElementById('navToggle');
    var navList = document.getElementById('navList');
    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            var open = navList.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(open));
        });
        navList.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navList.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- Mobile sidebar toggle ----
    var sidebarToggle = document.getElementById('sidebarToggle');
    var sidebar = document.getElementById('docsSidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('is-open');
        });
    }

    // ---- Theme toggle ----
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = document.getElementById('themeIcon');

    function applyTheme(dark) {
        document.body.classList.toggle('theme--dark', dark);
        if (themeIcon) themeIcon.textContent = dark ? '\u2600\uFE0F' : '\uD83C\uDF19';
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        }
        try { localStorage.setItem('trueno-docs-theme', dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
    }

    var saved = (function () {
        try { return localStorage.getItem('trueno-docs-theme'); } catch (e) { return null; }
    })();
    applyTheme(saved === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            applyTheme(!document.body.classList.contains('theme--dark'));
        });
    }

    // ---- Components sub-nav scroll spy ----
    var subnav = document.getElementById('sidebarSubnav');
    if (subnav) {
        var links = Array.prototype.slice.call(subnav.querySelectorAll('a[href^="#"]'));
        var sections = links.map(function (link) {
            return document.getElementById(link.getAttribute('href').slice(1));
        });

        function updateSubnav() {
            var current = '';
            var probe = window.scrollY + 140;
            for (var i = 0; i < sections.length; i++) {
                if (sections[i] && sections[i].offsetTop <= probe) {
                    current = links[i].getAttribute('href');
                }
            }
            links.forEach(function (link) {
                link.classList.toggle('is-active', link.getAttribute('href') === current);
            });
        }

        window.addEventListener('scroll', updateSubnav, { passive: true });
        updateSubnav();
    }

    // ---- Copy code buttons ----
    document.querySelectorAll('.docs-code__copy').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var pre = btn.closest('.docs-code').querySelector('pre');
            var text = pre.textContent.trim();
            function reset() {
                btn.textContent = 'Copy';
                btn.disabled = false;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(function () { btn.textContent = 'Copied \u2713'; setTimeout(reset, 1800); })
                    .catch(function () { btn.textContent = 'Copy failed'; setTimeout(reset, 1800); });
            } else {
                btn.textContent = 'Copy failed';
                setTimeout(reset, 1800);
            }
        });
    });

    // ============================================================
    // Color Plates explorer (colors.html)
    // ------------------------------------------------------------
    // Hover shows a swatch's token; click copies it (hex or token
    // per the segmented toggle) and updates the live preview.
    // ============================================================
    var explorer = document.getElementById('plateExplorer');
    if (explorer) {
        var copyMode = 'hex';
        var segBtns = explorer.querySelectorAll('.seg__btn');
        var swatches = explorer.querySelectorAll('.plate__swatch');
        var preview = document.getElementById('platePreview');
        var previewStep = document.getElementById('previewStep');
        var previewToken = document.getElementById('previewToken');
        var previewHex = document.getElementById('previewHex');

        function setCopyMode(mode) {
            copyMode = mode;
            segBtns.forEach(function (btn) {
                btn.classList.toggle('is-active', btn.getAttribute('data-copy') === mode);
            });
        }

        segBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                setCopyMode(btn.getAttribute('data-copy'));
            });
        });

        function selectSwatch(swatch) {
            var hex = swatch.getAttribute('data-hex');
            var token = swatch.getAttribute('data-token');
            var step = swatch.getAttribute('data-step');

            if (preview) {
                preview.style.backgroundColor = hex;
                preview.style.borderColor = 'transparent';
            }
            if (previewStep) previewStep.textContent = step;
            if (previewToken) previewToken.textContent = token;
            if (previewHex) previewHex.textContent = hex;
        }

        function copyToClipboard(text, swatch, done) {
            function flash() {
                if (swatch) {
                    swatch.classList.add('is-copied');
                    swatch.querySelector('.plate__swatch-token').textContent = 'Copied \u2713';
                    setTimeout(function () {
                        swatch.classList.remove('is-copied');
                        swatch.querySelector('.plate__swatch-token').textContent =
                            swatch.getAttribute('data-token');
                    }, 1200);
                }
                if (done) done();
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(flash, flash);
            } else {
                var ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); } catch (e) { /* ignore */ }
                document.body.removeChild(ta);
                flash();
            }
        }

        swatches.forEach(function (swatch) {
            swatch.addEventListener('click', function () {
                var hex = swatch.getAttribute('data-hex');
                var token = swatch.getAttribute('data-token');
                var text = copyMode === 'token' ? token : hex;
                selectSwatch(swatch);
                copyToClipboard(text, swatch);
            });
            swatch.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    swatch.click();
                }
            });
        });

        if (swatches.length) selectSwatch(swatches[0]);
    }

    // ============================================================
    // Spacing & gap showcase (utilities.html)
    // ------------------------------------------------------------
    // A range slider drives the grid/flex gutter custom properties
    // live, with snap buttons for the framework spacing tokens.
    // ============================================================
    var gapSlider = document.getElementById('gapSlider');
    if (gapSlider) {
        var gridDemo = document.getElementById('gapGridDemo');
        var rowDemo = document.getElementById('gapRowDemo');
        var gapReadout = document.getElementById('gapReadoutPx');
        var gapReadoutRem = document.getElementById('gapReadoutRem');
        var gapReadoutToken = document.getElementById('gapReadoutToken');
        var gapSnaps = document.querySelectorAll('.gap-snap');
        var SPACING_TOKENS = [
            [0, '0'],
            [4, 'xs'],
            [8, 'sm'],
            [16, 'md'],
            [24, 'lg'],
            [32, 'xl'],
            [48, 'xxl']
        ];

        function nearestToken(px) {
            var best = SPACING_TOKENS[0];
            for (var i = 0; i < SPACING_TOKENS.length; i++) {
                if (Math.abs(SPACING_TOKENS[i][0] - px) < Math.abs(best[0] - px)) {
                    best = SPACING_TOKENS[i];
                }
            }
            return best[1];
        }

        function applyGap() {
            var px = Number(gapSlider.value);
            if (gridDemo) gridDemo.style.setProperty('--grid-gutter', px + 'px');
            if (rowDemo) {
                rowDemo.style.setProperty('--gutter-x', px + 'px');
                rowDemo.style.setProperty('--gutter-y', px + 'px');
            }
            if (gapReadout) gapReadout.textContent = px + 'px';
            if (gapReadoutRem) gapReadoutRem.textContent = parseFloat((px / 16).toFixed(3)) + 'rem';
            if (gapReadoutToken) gapReadoutToken.textContent = nearestToken(px);
            gapSnaps.forEach(function (btn) {
                btn.classList.toggle('is-active', Number(btn.getAttribute('data-gap')) === px);
            });
        }

        gapSlider.addEventListener('input', applyGap);

        gapSnaps.forEach(function (btn) {
            btn.addEventListener('click', function () {
                gapSlider.value = btn.getAttribute('data-gap');
                applyGap();
            });
        });

        applyGap();
    }

    // ============================================================
    // Animations & Motion page (animations.html)
    // ------------------------------------------------------------
    // Gallery replay, timing playground, and scroll reveal demo.
    // ============================================================

    // ---- Replay all gallery animations ----
    var replayBtn = document.getElementById('replayAnimations');
    if (replayBtn) {
        var animBoxes = document.querySelectorAll('#animGrid .anim-box');
        replayBtn.addEventListener('click', function () {
            animBoxes.forEach(function (box) {
                var cls = box.getAttribute('data-anim');
                box.classList.remove('u-anim-' + cls);
                void box.offsetWidth; // force reflow so the animation restarts
                box.classList.add('u-anim-' + cls);
            });
        });
    }

    // ---- Timing playground ----
    var animSlider = document.getElementById('animDurationSlider');
    if (animSlider) {
        var playBox = document.getElementById('animPlayBox');
        var animReadout = document.getElementById('animDurationReadout');
        var runBtn = document.getElementById('animRunBtn');

        function applyDuration() {
            var ms = Number(animSlider.value);
            if (playBox) playBox.style.setProperty('--tr-duration', ms + 'ms');
            if (animReadout) animReadout.textContent = parseFloat((ms / 1000).toFixed(3)) + 's';
        }

        function runPlayBox() {
            if (!playBox) return;
            playBox.classList.remove('u-anim-fade-in-up');
            void playBox.offsetWidth;
            playBox.classList.add('u-anim-fade-in-up');
        }

        animSlider.addEventListener('input', applyDuration);
        if (runBtn) runBtn.addEventListener('click', runPlayBox);

        applyDuration();
        runPlayBox();
    }

    // ---- Scroll reveal demo ----
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // ============================================================
    // Gradients (utilities.html)
    // ------------------------------------------------------------
    // Live gradient builder: color pickers, an angle slider, and
    // a stop-3 toggle drive the --tr-grad-stop-* custom properties
    // and --tr-grad-angle on the preview block. The CSS reads
    // those properties, so the live output is the exact
    // .u-bg-gradient-* utility the user can drop into markup.
    // ============================================================
    var gradBuilder = document.getElementById('gradBuilder');
    if (gradBuilder) {
        var preview = gradBuilder.querySelector('.grad-builder__preview');
        var stop1Color = gradBuilder.querySelector('#gradStop1Color');
        var stop1Hex = gradBuilder.querySelector('#gradStop1Hex');
        var stop2Color = gradBuilder.querySelector('#gradStop2Color');
        var stop2Hex = gradBuilder.querySelector('#gradStop2Hex');
        var stop3Color = gradBuilder.querySelector('#gradStop3Color');
        var stop3Hex = gradBuilder.querySelector('#gradStop3Hex');
        var stop3Row = gradBuilder.querySelector('#gradStop3Row');
        var stop3Toggle = gradBuilder.querySelector('#gradStop3Toggle');
        var angleSlider = gradBuilder.querySelector('#gradAngle');
        var angleReadout = gradBuilder.querySelector('#gradAngleValue');
        var presetList = gradBuilder.querySelectorAll('.grad-builder__preset');

        function toHex(input) {
            if (!input) return '#000000';
            input = String(input).trim();
            if (input.charAt(0) === '#') input = input.slice(1);
            if (input.length === 3) {
                input = input.split('').map(function (c) { return c + c; }).join('');
            }
            if (input.length !== 6) return '#000000';
            return '#' + input.toLowerCase();
        }

        function syncHex(colorInput, hexSpan) {
            if (!colorInput || !hexSpan) return;
            hexSpan.textContent = toHex(colorInput.value);
        }

        function applyGradient() {
            if (!preview) return;

            if (stop1Color) preview.style.setProperty('--tr-grad-stop-1', stop1Color.value);
            if (stop2Color) preview.style.setProperty('--tr-grad-stop-2', stop2Color.value);

            var useStop3 = stop3Toggle && stop3Toggle.checked;
            if (useStop3 && stop3Color) {
                if (stop3Row) stop3Row.style.display = '';
                preview.style.setProperty('--tr-grad-stop-3', stop3Color.value);
            } else {
                if (stop3Row) stop3Row.style.display = 'none';
                preview.style.removeProperty('--tr-grad-stop-3');
            }

            var angle = angleSlider ? Number(angleSlider.value) : 135;
            preview.style.setProperty('--tr-grad-angle', angle + 'deg');
            if (angleReadout) angleReadout.textContent = angle + '\u00B0';

            syncHex(stop1Color, stop1Hex);
            syncHex(stop2Color, stop2Hex);
            syncHex(stop3Color, stop3Hex);

            presetList.forEach(function (btn) {
                var isActive = btn.getAttribute('data-stop1') === toHex(stop1Color.value)
                            && btn.getAttribute('data-stop2') === toHex(stop2Color.value)
                            && btn.getAttribute('data-stop3') === (useStop3 && stop3Color ? toHex(stop3Color.value) : '');
                btn.classList.toggle('is-active', isActive);
            });
        }

        function presetStops(p) {
            return {
                stop1: p.getAttribute('data-stop1'),
                stop2: p.getAttribute('data-stop2'),
                stop3: p.getAttribute('data-stop3')
            };
        }

        [stop1Color, stop2Color, stop3Color].forEach(function (input) {
            if (input) input.addEventListener('input', applyGradient);
        });

        if (angleSlider) {
            angleSlider.addEventListener('input', applyGradient);
        }

        if (stop3Toggle) {
            stop3Toggle.addEventListener('change', applyGradient);
        }

        presetList.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var p = presetStops(btn);
                if (p.stop1 && stop1Color) stop1Color.value = p.stop1;
                if (p.stop2 && stop2Color) stop2Color.value = p.stop2;
                if (p.stop3) {
                    if (stop3Toggle) stop3Toggle.checked = true;
                    if (stop3Color) stop3Color.value = p.stop3;
                } else if (stop3Toggle) {
                    stop3Toggle.checked = false;
                }
                applyGradient();
            });
        });

        applyGradient();
    }
})();