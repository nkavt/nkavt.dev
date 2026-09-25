export const site = {
  name: 'Nikoloz Kavtaradze',
  handle: 'nikoloz',
  role: 'senior full-stack engineer',
  tagline: 'Senior full-stack engineer. Over ten years shipping web software across Laravel, Node.js and Ruby on Rails.',
  email: 'nikoloz@kavtaradze.me',
  location: 'Tbilisi, GE · UTC+4',
  github: { label: 'github.com/nkavt', href: 'https://github.com/nkavt' },
  linkedin: { label: 'linkedin.com/in/nikoloz-kavtaradze', href: 'https://linkedin.com/in/nikoloz-kavtaradze-012139166' },
  available: true,
  year: 2026,
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'projects', href: '/projects' },
  { label: 'experience', href: '/#experience' },
  { label: 'about', href: '/#about' },
  { label: 'contact', href: '/#contact' },
];
