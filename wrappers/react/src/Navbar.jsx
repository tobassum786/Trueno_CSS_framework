import { createContext, forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { cx } from './classNames';
import { mergeRefs } from './utils';

const NavbarContext = createContext(null);

export const TruenoNavbar = forwardRef(function TruenoNavbar(
  {
    dark,
    light,
    primary,
    gradient,
    transparent,
    sticky,
    defaultOpen = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const [open, setOpen] = useState(defaultOpen);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  const classes = cx(
    'navbar',
    dark && 'navbar--dark',
    light && 'navbar--light',
    primary && 'navbar--primary',
    gradient && 'navbar--gradient',
    transparent && 'navbar--transparent',
    sticky && 'navbar--sticky',
    className
  );
  return (
    <NavbarContext.Provider value={value}>
      <nav ref={ref} className={classes} {...rest}>
        {children}
      </nav>
    </NavbarContext.Provider>
  );
});

export const TruenoNavbarBrand = forwardRef(function TruenoNavbarBrand(
  { as: Tag = 'a', className, children, ...rest },
  ref
) {
  return (
    <Tag ref={ref} className={cx('navbar__brand', className)} {...rest}>
      {children}
    </Tag>
  );
});

export const TruenoNavbarToggle = forwardRef(function TruenoNavbarToggle(
  { controls, className, children, ...rest },
  ref
) {
  const navbar = useContext(NavbarContext);
  const open = navbar ? navbar.open : false;
  const { onClick, ...restProps } = rest;
  return (
    <button
      ref={ref}
      type="button"
      className={cx('navbar__toggle', className)}
      aria-expanded={open}
      aria-controls={controls}
      onClick={(event) => {
        if (navbar) navbar.setOpen(!open);
        if (typeof onClick === 'function') onClick(event);
      }}
      {...restProps}
    >
      {children}
    </button>
  );
});

export const TruenoNavbarCollapse = forwardRef(function TruenoNavbarCollapse(
  { className, children, ...rest },
  ref
) {
  const navbar = useContext(NavbarContext);
  const open = navbar ? navbar.open : false;
  const { onClick, ...restProps } = rest;
  return (
    <div
      ref={ref}
      className={cx('navbar__collapse', open && 'is-open', className)}
      onClick={(event) => {
        if (navbar && open) navbar.setOpen(false);
        if (typeof onClick === 'function') onClick(event);
      }}
      {...restProps}
    >
      {children}
    </div>
  );
});

export const TruenoNavbarNav = forwardRef(function TruenoNavbarNav({ className, children, ...rest }, ref) {
  return (
    <ul ref={ref} className={cx('navbar__nav', className)} {...rest}>
      {children}
    </ul>
  );
});

export const TruenoNavbarItem = forwardRef(function TruenoNavbarItem(
  { active, hasDropdown, className, children, ...rest },
  ref
) {
  return (
    <li
      ref={ref}
      className={cx(
        'navbar__item',
        active && 'navbar__item--active',
        hasDropdown && 'navbar__has-dropdown',
        className
      )}
      {...rest}
    >
      {children}
    </li>
  );
});

export const TruenoNavbarLink = forwardRef(function TruenoNavbarLink(
  { active, as: Tag = 'a', className, children, ...rest },
  ref
) {
  return (
    <Tag ref={ref} className={cx('navbar__link', active && 'navbar__link--active', className)} {...rest}>
      {children}
    </Tag>
  );
});

export const TruenoNavbarDropdown = forwardRef(function TruenoNavbarDropdown(
  { label, className, children, ...rest },
  ref
) {
  const nodeRef = useRef(null);
  const [open, setOpen] = useState(false);
  const setRefs = mergeRefs(ref, nodeRef);

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  return (
    <li ref={setRefs} className={cx('navbar__item', 'navbar__has-dropdown', open && 'is-open', className)} {...rest}>
      <a
        className="navbar__link"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        {label}
      </a>
      <ul className="navbar__dropdown">{children}</ul>
    </li>
  );
});

export const TruenoNavbarDropdownLink = forwardRef(function TruenoNavbarDropdownLink(
  { className, children, ...rest },
  ref
) {
  return (
    <li>
      <a ref={ref} className={cx('navbar__dropdown-link', className)} {...rest}>
        {children}
      </a>
    </li>
  );
});
