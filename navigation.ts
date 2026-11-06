import { services } from './services';

export interface NavItem {
  label: string;
  to: string;
}

/** Order matches the requested sections: Home, services, About, Contact. */
export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  ...services.map((service) => ({ label: service.title, to: service.path })),
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];
