import { forwardRef, useRef, useState } from 'react';
import { cx } from './classNames';
import { mergeRefs } from './utils';

const TruenoAlert = forwardRef(function TruenoAlert(
  {
    variant = 'primary',
    solid,
    outline,
    dismissible,
    size,
    title,
    icon,
    onDismiss,
    className,
    children,
    ...rest
  },
  ref
) {
  const nodeRef = useRef(null);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const setRefs = mergeRefs(ref, nodeRef);

  if (gone) return null;

  const handleDismiss = () => {
    if (leaving) return;
    setLeaving(true);
    const node = nodeRef.current;
    if (node) {
      node.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      node.style.opacity = '0';
      node.style.transform = 'translateY(-8px)';
    }
    if (typeof onDismiss === 'function') onDismiss();
    window.setTimeout(() => setGone(true), 200);
  };

  const classes = cx(
    'alert',
    variant && (solid ? `alert--solid-${variant}` : outline ? `alert--outline-${variant}` : `alert--${variant}`),
    dismissible && 'alert--dismissible',
    size && `alert--${size}`,
    className
  );

  return (
    <div ref={setRefs} className={classes} role="alert" {...rest}>
      {icon && <span className="alert__icon">{icon}</span>}
      {title && <p className="alert__title">{title}</p>}
      {children}
      {dismissible && (
        <button type="button" className="alert__close" aria-label="Close" onClick={handleDismiss}>
          ×
        </button>
      )}
    </div>
  );
});

export default TruenoAlert;
