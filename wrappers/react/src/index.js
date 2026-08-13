export { default as TruenoButton } from './Button';
export { default as TruenoBadge } from './Badge';
export { default as TruenoAlert } from './Alert';
export { default as TruenoModal } from './Modal';
export { default as TruenoThemeToggle } from './ThemeToggle';
export {
  TruenoNavbar,
  TruenoNavbarBrand,
  TruenoNavbarToggle,
  TruenoNavbarCollapse,
  TruenoNavbarNav,
  TruenoNavbarItem,
  TruenoNavbarLink,
  TruenoNavbarDropdown,
  TruenoNavbarDropdownLink,
} from './Navbar';
export {
  TruenoCard,
  TruenoCardHeader,
  TruenoCardBody,
  TruenoCardFooter,
  TruenoCardTitle,
  TruenoCardText,
} from './Card';
export {
  TruenoPagination,
  TruenoPaginationItem,
  TruenoPaginationLink,
} from './Pagination';
export {
  TruenoBreadcrumb,
  TruenoBreadcrumbItem,
  TruenoBreadcrumbLink,
} from './Breadcrumb';
export {
  TruenoFormGroup,
  TruenoFormRow,
  TruenoFormGrid,
  TruenoFormInline,
  TruenoFormControl,
  TruenoFormFeedback,
  TruenoFormCheck,
  TruenoSwitch,
  TruenoInputGroup,
  TruenoInputGroupAddon,
} from './Form';
export { cx } from './classNames';

const CDN_BASE = {
  jsdelivr: 'https://cdn.jsdelivr.net/npm/trueno-css-framework@1.0.0/dist/trueno-css-framework.min.css',
  unpkg: 'https://unpkg.com/trueno-css-framework@1.0.0/dist/trueno-css-framework.min.css',
  github:
    'https://cdn.jsdelivr.net/gh/tobassum786/Trueno_CSS_framework@main/dist/trueno-css-framework.min.css',
};

export function loadTruenoFromCDN(provider = 'jsdelivr') {
  const cssUrl = CDN_BASE[provider] || CDN_BASE.jsdelivr;
  if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);
  }
  if (!window.Trueno) {
    const script = document.createElement('script');
    script.src = cssUrl.replace('min.css', 'min.js');
    script.async = true;
    document.body.appendChild(script);
  }
}
