import { forwardRef } from 'react';
import { cx } from './classNames';

const TruenoBadge = forwardRef(function TruenoBadge(
  {
    as: Tag = 'span',
    variant = 'secondary',
    soft,
    outline,
    pill,
    dot,
    count,
    size,
    className,
    children,
    ...rest
  },
  ref
) {
  const classes = cx(
    'badge',
    dot && 'badge--dot',
    count && 'badge--count',
    variant && (soft ? `badge--soft-${variant}` : outline ? `badge--outline-${variant}` : `badge--${variant}`),
    pill && 'badge--pill',
    size && `badge--${size}`,
    className
  );
  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
});

export default TruenoBadge;
