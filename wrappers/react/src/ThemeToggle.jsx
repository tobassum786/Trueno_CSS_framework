import { forwardRef, useState } from 'react';
import { cx } from './classNames';

const TruenoThemeToggle = forwardRef(function TruenoThemeToggle({ className, children, ...rest }, ref) {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.body.classList.contains('theme--dark')
  );

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (window.Trueno && window.Trueno.Theme) {
      window.Trueno.Theme.set(next);
    } else {
      document.body.classList.toggle('theme--dark', next);
      try {
        localStorage.setItem('trueno-theme', next ? 'dark' : 'light');
      } catch (e) {}
    }
  };

  return (
    <button ref={ref} type="button" className={cx('theme-toggle', className)} aria-pressed={dark} onClick={toggle} {...rest}>
      {children ?? (dark ? '☀️' : '🌙')}
    </button>
  );
});

export default TruenoThemeToggle;
