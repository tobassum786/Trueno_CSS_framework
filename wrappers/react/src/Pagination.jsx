import { forwardRef } from 'react';
import { cx } from './classNames';

export const TruenoPagination = forwardRef(function TruenoPagination(
  { size, rounded, center, right, secondary, className, children, ...rest },
  ref
) {
  return (
    <nav ref={ref} aria-label="Page navigation" {...rest}>
      <ul
        className={cx(
          'pagination',
          size && `pagination--${size}`,
          rounded && 'pagination--rounded',
          center && 'pagination--center',
          right && 'pagination--right',
          secondary && 'pagination--secondary',
          className
        )}
      >
        {children}
      </ul>
    </nav>
  );
});

export const TruenoPaginationItem = forwardRef(function TruenoPaginationItem(
  { active, disabled, className, children, ...rest },
  ref
) {
  return (
    <li
      ref={ref}
      className={cx(
        'pagination__item',
        active && 'pagination__item--active',
        disabled && 'pagination__item--disabled',
        className
      )}
      {...rest}
    >
      {children}
    </li>
  );
});

export const TruenoPaginationLink = forwardRef(function TruenoPaginationLink(
  { prev, next, active, className, children, ...rest },
  ref
) {
  return (
    <a
      ref={ref}
      className={cx(
        'pagination__link',
        prev && 'pagination__link--prev',
        next && 'pagination__link--next',
        active && 'pagination__link--active',
        className
      )}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
});
