export type FooterLink = { label: string; href: string }

// Flat list used by mobile footer grid
export const FOOTER_LINKS: FooterLink[] = [
  { label: 'About', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Advertising', href: '#' },
  { label: 'Small Business', href: '#' },
  { label: 'Talent Solutions', href: '#' },
  { label: 'Marketing Solutions', href: '#' },
  { label: 'Sales Solutions', href: '#' },
  { label: 'Safety Center', href: '#' },
  { label: 'Community Guidelines', href: '#' },
  { label: 'Privacy & Terms', href: '#' },
  { label: 'Mobile App', href: '#' },
]

// 3-column layout used by desktop footer navigation
export const FOOTER_NAV_COLUMNS: FooterLink[][] = [
  [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Advertising', href: '#' },
    { label: 'Small Business', href: '#' },
  ],
  [
    { label: 'Talent Solutions', href: '#' },
    { label: 'Marketing Solutions', href: '#' },
    { label: 'Sales Solutions', href: '#' },
    { label: 'Safety Center', href: '#' },
  ],
  [
    { label: 'Community Guidelines', href: '#' },
    { label: 'Privacy & Terms', href: '#' },
    { label: 'Mobile App', href: '#' },
  ],
]

export const LANGUAGES = ['English', '简体中文', 'Español', '日本語']

