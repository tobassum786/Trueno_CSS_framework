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
})();