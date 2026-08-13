import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { cx } from './classNames';
import { FOCUSABLE_SELECTOR, mergeRefs, useTruenoId } from './utils';

const TruenoModal = forwardRef(function TruenoModal(
  {
    open = false,
    onClose,
    onOpen,
    title,
    children,
    footer,
    closeButton = true,
    className,
    headerClassName,
    bodyClassName,
    footerClassName,
    ...rest
  },
  ref
) {
  const nodeRef = useRef(null);
  const prevFocusRef = useRef(null);
  const closingRef = useRef(false);
  const titleId = useTruenoId('tr-modal-title');
  const setRefs = useMemo(() => mergeRefs(ref, nodeRef), [ref]);

  useEffect(() => {
    const modal = nodeRef.current;
    if (!modal) return;

    if (open) {
      prevFocusRef.current = document.activeElement;
      if (window.Trueno && window.Trueno.Modal) {
        window.Trueno.Modal.open(modal);
      } else {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      const focusable = modal.querySelector(FOCUSABLE_SELECTOR);
      if (focusable) focusable.focus();
      if (typeof onOpen === 'function') onOpen();
    } else {
      closingRef.current = true;
      if (window.Trueno && window.Trueno.Modal) {
        window.Trueno.Modal.close(modal);
      } else {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        if (!document.querySelector('.modal.is-open')) {
          document.body.style.overflow = '';
        }
      }
      closingRef.current = false;
      if (prevFocusRef.current && prevFocusRef.current.focus) {
        prevFocusRef.current.focus();
      }
    }
  }, [open, onOpen]);

  const requestClose = useCallback(() => {
    if (nodeRef.current && !nodeRef.current.classList.contains('is-open')) return;
    if (typeof onClose === 'function') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open || (window.Trueno && window.Trueno.Modal)) return;
    const onKey = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) requestClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, requestClose]);

  useEffect(() => {
    if (!(window.Trueno && window.Trueno.Modal)) return;
    const onClosed = (event) => {
      if (closingRef.current) return;
      if (event.detail && event.detail.modal === nodeRef.current && typeof onClose === 'function') {
        onClose();
      }
    };
    document.addEventListener('trueno:modal:close', onClosed);
    return () => document.removeEventListener('trueno:modal:close', onClosed);
  }, [onClose]);

  const handleBackdrop = useCallback(
    (event) => {
      if (event.target === nodeRef.current) requestClose();
    },
    [requestClose]
  );

  return (
    <div
      ref={setRefs}
      className={cx('modal', className)}
      aria-hidden={open ? 'false' : 'true'}
      onClick={handleBackdrop}
      {...rest}
    >
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined}>
        {(title || closeButton) && (
          <header className={cx('modal__header', headerClassName)}>
            {title ? (
              <h3 className="modal__title" id={titleId}>
                {title}
              </h3>
            ) : (
              <span />
            )}
            {closeButton && (
              <button type="button" className="modal__close-btn" aria-label="Close" onClick={requestClose}>
                ×
              </button>
            )}
          </header>
        )}
        {children && <div className={cx('modal__body', bodyClassName)}>{children}</div>}
        {footer && <footer className={cx('modal__footer', footerClassName)}>{footer}</footer>}
      </div>
    </div>
  );
});

export default TruenoModal;
