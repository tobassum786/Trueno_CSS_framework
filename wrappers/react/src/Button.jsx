import { forwardRef } from 'react';
import { cx } from './classNames';

const TruenoButton = forwardRef(function TruenoButton(
  { as: Tag = 'button', variant, size, className, children, ...rest },
  ref
) {
  return (
    <Tag ref={ref} className={cx('btn', variant && `btn--${variant}`, size && `btn--${size}`, className)} {...rest}>
      {children}
    </Tag>
  );
});

export default TruenoButton;
