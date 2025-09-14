export type NavLink = {
  icon: string
  label: string
  to: string
  badge?: number
}

export const NAV_ITEMS: NavLink[] = [
  { icon: 'rss', label: 'FEED', to: '/feed' },
  { icon: 'users', label: 'NETWORK', to: '/network' },
  { icon: 'briefcase', label: 'JOBS', to: '/jobs' },
  { icon: 'message-square', label: 'CHAT', to: '/chat', badge: 1 },
  { icon: 'bell', label: 'NOTICES', to: '/notices' },
]

