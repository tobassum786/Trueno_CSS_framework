(function (global) {
    'use strict';

    var FOCUSABLE = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    var THEME_KEY = 'trueno-theme';
    var DARK_CLASS = 'theme--dark';

    function $1(sel, ctx) {
        return (ctx || document).querySelector(sel);
    }

    function $all(sel, ctx) {
        return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
    }

    function emit(name, detail) {
        try {
            document.dispatchEvent(new CustomEvent(name, { detail: detail }));
        } catch (e) {
            var evt = document.createEvent('Event');
            evt.initEvent(name, false, false);
            evt.detail = detail;
            document.dispatchEvent(evt);
        }
    }

    function lockScroll(lock) {
        var style = document.body.style;
        if (lock) {
            style.overflow = 'hidden';
        } else {
            style.removeProperty('overflow');
        }
    }

    // ============================================================
    // Modal
    // ============================================================
    var Modal = {
        open: function (modal) {
            if (!modal || modal.classList.contains('is-open')) return;
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            modal._lastFocused = document.activeElement;
            lockScroll(true);
            var focusable = $all(FOCUSABLE, modal)[0];
            if (focusable) focusable.focus();
            emit('trueno:modal:open', { modal: modal });
        },

        close: function (modal) {
            if (!modal || !modal.classList.contains('is-open')) return;
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            if (modal._lastFocused && modal._lastFocused.focus) {
                modal._lastFocused.focus();
            }
            if (!$all('.modal.is-open').length) {
                lockScroll(false);
            }
            emit('trueno:modal:close', { modal: modal });
        },

        toggle: function (modal) {
            if (modal.classList.contains('is-open')) {
                this.close(modal);
            } else {
                this.open(modal);
            }
        }
    };

    function bindModals() {
        $all('[data-trueno-open]').forEach(function (trigger) {
            if (trigger._truenoModalBound) return;
            trigger._truenoModalBound = true;
            trigger.addEventListener('click', function () {
                var target = $1(trigger.getAttribute('data-trueno-open'));
                if (target && target.classList.contains('modal')) {
                    Modal.open(target);
                }
            });
        });

        $all('[data-trueno-close]').forEach(function (trigger) {
            if (trigger._truenoModalCloseBound) return;
            trigger._truenoModalCloseBound = true;
            trigger.addEventListener('click', function () {
                var modal = trigger.closest('.modal');
                if (modal) Modal.close(modal);
            });
        });

        $all('.modal').forEach(function (modal) {
            if (modal._truenoModalBackdropBound) return;
            modal._truenoModalBackdropBound = true;
            modal.addEventListener('click', function (event) {
                if (event.target === modal) Modal.close(modal);
            });
        });

        $all('.modal__close-btn').forEach(function (btn) {
            if (btn._truenoModalCloseBound) return;
            btn._truenoModalCloseBound = true;
            btn.addEventListener('click', function () {
                var modal = btn.closest('.modal');
                if (modal) Modal.close(modal);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                $all('.modal.is-open').forEach(Modal.close);
            }
        });
    }

    // ============================================================
    // Navbar (mobile collapse + dropdown)
    // ============================================================
    var Navbar = {
        toggle: function (toggle) {
            var target = $1(toggle.getAttribute('data-trueno-toggle'));
            if (!target) return;
            var open = target.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
            if (!toggle.getAttribute('aria-controls') && target.id) {
                toggle.setAttribute('aria-controls', target.id);
            }
            emit(open ? 'trueno:navbar:open' : 'trueno:navbar:close', { toggle: toggle, target: target });
        }
    };

    function bindNavbars() {
        $all('[data-trueno-toggle]').forEach(function (toggle) {
            if (toggle._truenoToggleBound) return;
            toggle._truenoToggleBound = true;
            toggle.addEventListener('click', function () {
                Navbar.toggle(toggle);
            });
            var target = $1(toggle.getAttribute('data-trueno-toggle'));
            if (target && target.id && !toggle.getAttribute('aria-controls')) {
                toggle.setAttribute('aria-controls', target.id);
            }
        });

        $all('.navbar__collapse a').forEach(function (link) {
            if (link._truenoNavLinkBound) return;
            link._truenoNavLinkBound = true;
            link.addEventListener('click', function () {
                var collapse = link.closest('.navbar__collapse');
                if (!collapse) return;
                collapse.classList.remove('is-open');
                var toggle = $all('[data-trueno-toggle]').filter(function (t) {
                    return $1(t.getAttribute('data-trueno-toggle')) === collapse;
                })[0];
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        });

        $all('[data-trueno-dropdown]').forEach(function (item) {
            if (item._truenoDropdownBound) return;
            item._truenoDropdownBound = true;
            item.addEventListener('click', function (event) {
                event.stopPropagation();
                item.classList.toggle('is-open');
            });
        });

        document.addEventListener('click', function () {
            $all('[data-trueno-dropdown].is-open').forEach(function (item) {
                item.classList.remove('is-open');
            });
        });
    }

    // ============================================================
    // Alert (dismissible)
    // ============================================================
    var Alert = {
        dismiss: function (alert) {
            if (!alert) return;
            alert.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-8px)';
            emit('trueno:alert:dismiss', { alert: alert });
            setTimeout(function () {
                alert.remove();
            }, 200);
        }
    };

    function bindAlerts() {
        $all('.alert__close').forEach(function (btn) {
            if (btn._truenoAlertBound) return;
            btn._truenoAlertBound = true;
            btn.addEventListener('click', function () {
                Alert.dismiss(btn.closest('.alert'));
            });
        });
    }

    // ============================================================
    // Theme toggle
    // ============================================================
    var Theme = {
        get: function () {
            return document.body.classList.contains(DARK_CLASS);
        },

        set: function (dark) {
            document.body.classList.toggle(DARK_CLASS, dark);
            try {
                global.localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
            } catch (e) {}
            $all('[data-trueno-theme-toggle]').forEach(function (btn) {
                btn.setAttribute('aria-pressed', String(dark));
            });
            emit('trueno:theme:' + (dark ? 'dark' : 'light'));
        },

        toggle: function () {
            this.set(!this.get());
        },

        init: function () {
            var saved = null;
            try {
                saved = global.localStorage.getItem(THEME_KEY);
            } catch (e) {}
            if (saved === null) {
                saved = global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
            }
            this.set(saved === 'dark');
        }
    };

    function bindThemeToggles() {
        $all('[data-trueno-theme-toggle]').forEach(function (btn) {
            if (btn._truenoThemeBound) return;
            btn._truenoThemeBound = true;
            btn.addEventListener('click', function () {
                Theme.toggle();
            });
        });
    }

    // ============================================================
    // Init
    // ============================================================
    function init() {
        bindModals();
        bindNavbars();
        bindAlerts();
        bindThemeToggles();
        Theme.init();
    }

    var Trueno = {
        version: '1.0.0',
        Modal: Modal,
        Navbar: Navbar,
        Alert: Alert,
        Theme: Theme,
        init: init
    };

    global.Trueno = Trueno;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(typeof window !== 'undefined' ? window : this);