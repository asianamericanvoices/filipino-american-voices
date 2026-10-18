// Per-site settings for the Texas Railroad Commission voter guide.
// This file and the site's language edition are the ONLY files in this folder that
// differ between the four sites; page.js, layout.js, index.js, shared.js and en.js
// are identical everywhere.
import tl from './tl';

export const SITE = {
  url: 'https://www.tinigngfilipinoamerikano.us',
  name: 'Tinig ng Filipino Amerikano',
  englishName: 'Filipino American Voices',
  logoLines: ['Tinig ng', 'Filipino', 'Amerikano'],
  logoBg: 'bg-emerald-500',
  logoTextClass: 'text-[7px] leading-none',
  contactEmail: 'contact@tinigngfilipinoamerikano.us',
  language: 'tagalog', // published-articles language, SearchBar site, analytics
  fontClass: 'font-filipino',
  defaultEdition: 'tl',
  ogImage: '/og-logo-filipino-3.png', // swap to slide1.png once uploaded
  theme: {
    contactHover: 'hover:text-emerald-600',
    hubBarGradient: 'from-emerald-50 via-orange-50 to-red-50',
    newsletterBox: 'bg-emerald-50',
    newsletterRing: 'focus:ring-emerald-500',
    newsletterButton: 'bg-emerald-600 hover:bg-emerald-700',
  },
};

export const SITE_EDITIONS = { tl };
