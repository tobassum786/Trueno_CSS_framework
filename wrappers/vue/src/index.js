import Button from './Button.vue';
import Badge from './Badge.vue';
import Card from './Card.vue';
import CardHeader from './CardHeader.vue';
import CardBody from './CardBody.vue';
import CardFooter from './CardFooter.vue';
import CardTitle from './CardTitle.vue';
import CardText from './CardText.vue';
import Alert from './Alert.vue';
import Modal from './Modal.vue';
import Navbar from './Navbar.vue';
import NavbarBrand from './NavbarBrand.vue';
import NavbarToggle from './NavbarToggle.vue';
import NavbarCollapse from './NavbarCollapse.vue';
import NavbarNav from './NavbarNav.vue';
import NavbarItem from './NavbarItem.vue';
import NavbarLink from './NavbarLink.vue';
import NavbarDropdown from './NavbarDropdown.vue';
import NavbarDropdownLink from './NavbarDropdownLink.vue';
import Pagination from './Pagination.vue';
import PaginationItem from './PaginationItem.vue';
import PaginationLink from './PaginationLink.vue';
import Breadcrumb from './Breadcrumb.vue';
import BreadcrumbItem from './BreadcrumbItem.vue';
import BreadcrumbLink from './BreadcrumbLink.vue';
import FormGroup from './FormGroup.vue';
import FormRow from './FormRow.vue';
import FormGrid from './FormGrid.vue';
import FormInline from './FormInline.vue';
import FormControl from './FormControl.vue';
import FormFeedback from './FormFeedback.vue';
import FormCheck from './FormCheck.vue';
import Switch from './Switch.vue';
import InputGroup from './InputGroup.vue';
import InputGroupAddon from './InputGroupAddon.vue';
import ThemeToggle from './ThemeToggle.vue';

export const components = {
  TruenoButton: Button,
  TruenoBadge: Badge,
  TruenoCard: Card,
  TruenoCardHeader: CardHeader,
  TruenoCardBody: CardBody,
  TruenoCardFooter: CardFooter,
  TruenoCardTitle: CardTitle,
  TruenoCardText: CardText,
  TruenoAlert: Alert,
  TruenoModal: Modal,
  TruenoNavbar: Navbar,
  TruenoNavbarBrand: NavbarBrand,
  TruenoNavbarToggle: NavbarToggle,
  TruenoNavbarCollapse: NavbarCollapse,
  TruenoNavbarNav: NavbarNav,
  TruenoNavbarItem: NavbarItem,
  TruenoNavbarLink: NavbarLink,
  TruenoNavbarDropdown: NavbarDropdown,
  TruenoNavbarDropdownLink: NavbarDropdownLink,
  TruenoPagination: Pagination,
  TruenoPaginationItem: PaginationItem,
  TruenoPaginationLink: PaginationLink,
  TruenoBreadcrumb: Breadcrumb,
  TruenoBreadcrumbItem: BreadcrumbItem,
  TruenoBreadcrumbLink: BreadcrumbLink,
  TruenoFormGroup: FormGroup,
  TruenoFormRow: FormRow,
  TruenoFormGrid: FormGrid,
  TruenoFormInline: FormInline,
  TruenoFormControl: FormControl,
  TruenoFormFeedback: FormFeedback,
  TruenoFormCheck: FormCheck,
  TruenoSwitch: Switch,
  TruenoInputGroup: InputGroup,
  TruenoInputGroupAddon: InputGroupAddon,
  TruenoThemeToggle: ThemeToggle,
};

export const TruenoPlugin = {
  install(app) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }
  },
};

export { cn } from './classNames.js';

export const CDN_BASE = {
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

export default TruenoPlugin;
