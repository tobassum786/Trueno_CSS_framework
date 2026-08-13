import { forwardRef } from 'react';
import { cx } from './classNames';

export const TruenoBreadcrumb = forwardRef(function TruenoBreadcrumb(
  { separator, size, plain, className, children, ...rest },
  ref
) {
  return (
    <ol
      ref={ref}
      className={cx(
        'breadcrumb',
        separator === 'chevron' && 'breadcrumb--chevron',
        separator === 'bullet' && 'breadcrumb--bullet',
        separator === 'custom' && 'breadcrumb--custom',
        size && `breadcrumb--${size}`,
        plain && 'breadcrumb--plain',
        className
      )}
      {...rest}
    >
      {children}
    </ol>
  );
});

export const TruenoBreadcrumbItem = forwardRef(function TruenoBreadcrumbItem(
  { active, disabled, className, children, ...rest },
  ref
) {
  return (
    <li
      ref={ref}
      className={cx(
        'breadcrumb__item',
        active && 'breadcrumb__item--active',
        disabled && 'breadcrumb__item--disabled',
        className
      )}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {children}
    </li>
  );
});

export const TruenoBreadcrumbLink = forwardRef(function TruenoBreadcrumbLink(
  { className, children, ...rest },
  ref
) {
  return (
    <a ref={ref} className={cx('breadcrumb__link', className)} {...rest}>
      {children}
    </a>
  );
});
