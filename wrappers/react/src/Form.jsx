import { forwardRef } from 'react';
import { cx } from './classNames';
import { useTruenoId } from './utils';

export const TruenoFormGroup = forwardRef(function TruenoFormGroup(
  { label, htmlFor, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx('form-group', className)} {...rest}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
    </div>
  );
});

export const TruenoFormRow = forwardRef(function TruenoFormRow({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={cx('form-row', className)} {...rest}>
      {children}
    </div>
  );
});

export const TruenoFormGrid = forwardRef(function TruenoFormGrid(
  { columns, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx('form-grid', columns === 3 && 'form-grid--3', className)} {...rest}>
      {children}
    </div>
  );
});

export const TruenoFormInline = forwardRef(function TruenoFormInline({ className, children, ...rest }, ref) {
  return (
    <form ref={ref} className={cx('form-inline', className)} {...rest}>
      {children}
    </form>
  );
});

export const TruenoFormControl = forwardRef(function TruenoFormControl(
  { as: Tag = 'input', size, invalid, valid, className, children, ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cx(
        'form-control',
        size && `form-control--${size}`,
        invalid && 'form-control--invalid',
        valid && 'form-control--valid',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export const TruenoFormFeedback = forwardRef(function TruenoFormFeedback(
  { type, className, children, ...rest },
  ref
) {
  return (
    <small ref={ref} className={cx('form-feedback', type && `form-feedback--${type}`, className)} {...rest}>
      {children}
    </small>
  );
});

export const TruenoFormCheck = forwardRef(function TruenoFormCheck(
  { type = 'checkbox', label, inline, className, id, ...rest },
  ref
) {
  const uid = useTruenoId('tr-check');
  const controlId = id || uid;
  return (
    <div className={cx('form-check', inline && 'form-check--inline', className)}>
      <input ref={ref} id={controlId} type={type} {...rest} />
      {label && <label htmlFor={controlId}>{label}</label>}
    </div>
  );
});

export const TruenoSwitch = forwardRef(function TruenoSwitch(
  { label, color, size, className, ...rest },
  ref
) {
  const uid = useTruenoId('tr-switch');
  return (
    <label className={cx('switch', color && `switch--${color}`, size && `switch--${size}`, className)}>
      <input ref={ref} id={uid} type="checkbox" {...rest} />
      <span className="switch__track" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
});

export const TruenoInputGroup = forwardRef(function TruenoInputGroup(
  { position = 'prepend', className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx('input-group', position === 'append' ? 'input-group--append' : 'input-group--prepend', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const TruenoInputGroupAddon = forwardRef(function TruenoInputGroupAddon(
  { className, children, ...rest },
  ref
) {
  return (
    <span ref={ref} className={cx('input-group__addon', className)} {...rest}>
      {children}
    </span>
  );
});
