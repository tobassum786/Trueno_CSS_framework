import { forwardRef } from 'react';
import { cx } from './classNames';

export const TruenoCard = forwardRef(function TruenoCard({ hoverable, className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={cx('card', hoverable && 'card--hoverable', className)} {...rest}>
      {children}
    </div>
  );
});

export const TruenoCardHeader = forwardRef(function TruenoCardHeader({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={cx('card__header', className)} {...rest}>
      {children}
    </div>
  );
});

export const TruenoCardBody = forwardRef(function TruenoCardBody({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={cx('card__body', className)} {...rest}>
      {children}
    </div>
  );
});

export const TruenoCardFooter = forwardRef(function TruenoCardFooter({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={cx('card__footer', className)} {...rest}>
      {children}
    </div>
  );
});

export const TruenoCardTitle = forwardRef(function TruenoCardTitle(
  { as: Tag = 'h5', className, children, ...rest },
  ref
) {
  return (
    <Tag ref={ref} className={cx('card__title', className)} {...rest}>
      {children}
    </Tag>
  );
});

export const TruenoCardText = forwardRef(function TruenoCardText({ className, children, ...rest }, ref) {
  return (
    <p ref={ref} className={cx('card__text', className)} {...rest}>
      {children}
    </p>
  );
});
