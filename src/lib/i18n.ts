export type Language = 'en' | 'tl' | 'ceb';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'tl', label: 'Tagalog', nativeLabel: 'Tagalog' },
  { code: 'ceb', label: 'Bisaya', nativeLabel: 'Bisaya' },
];

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login
    'login.title': 'Welcome to HOAConnect',
    'login.subtitle': 'Sign in to your community account',
    'login.email': 'Email Address',
    'login.email.placeholder': 'Enter your email',
    'login.password': 'Password',
    'login.password.placeholder': 'Enter your password',
    'login.role': 'I am a...',
    'login.role.homeowner': 'Homeowner',
    'login.role.admin': 'HOA Admin',
    'login.role.collector': 'Collector',
    'login.remember': 'Remember me',
    'login.submit': 'Sign In',
    'login.signing_in': 'Signing in...',
    'login.error.invalid': 'Invalid email or password. Please try again.',
    'login.error.required': 'Please fill in all fields.',
    'login.demo_hint': 'Demo: Use any email with password "password123"',
    'login.language': 'Language',
    // General
    'nav.dashboard': 'Dashboard',
    'nav.waste': 'Waste Schedule',
    'nav.payments': 'Payments',
    'nav.announcements': 'Announcements',
    'nav.reports': 'My Reports',
    'nav.settings': 'Settings',
    'nav.signout': 'Sign Out',
    'nav.switch_view': 'Switch View',
    'nav.admin_view': 'HOA Admin View',
    'nav.collector_view': 'Collector View',
    'nav.homeowner_view': 'Homeowner View',
    // Dashboard
    'dashboard.greeting': 'Good day',
    'dashboard.subtitle': 'Here is your community overview',
  },
  tl: {
    // Login
    'login.title': 'Maligayang Pagdating sa HOAConnect',
    'login.subtitle': 'Mag-sign in sa iyong community account',
    'login.email': 'Email Address',
    'login.email.placeholder': 'Ilagay ang iyong email',
    'login.password': 'Password',
    'login.password.placeholder': 'Ilagay ang iyong password',
    'login.role': 'Ako ay isang...',
    'login.role.homeowner': 'May-ari ng Bahay',
    'login.role.admin': 'HOA Admin',
    'login.role.collector': 'Tagakolekta',
    'login.remember': 'Tandaan ako',
    'login.submit': 'Mag-sign In',
    'login.signing_in': 'Nag-sign in...',
    'login.error.invalid': 'Mali ang email o password. Subukan muli.',
    'login.error.required': 'Pakipunan ang lahat ng field.',
    'login.demo_hint': 'Demo: Gumamit ng anumang email na may password na "password123"',
    'login.language': 'Wika',
    // General
    'nav.dashboard': 'Dashboard',
    'nav.waste': 'Iskedyul ng Basura',
    'nav.payments': 'Mga Bayad',
    'nav.announcements': 'Mga Anunsyo',
    'nav.reports': 'Aking mga Ulat',
    'nav.settings': 'Mga Setting',
    'nav.signout': 'Mag-sign Out',
    'nav.switch_view': 'Palitan ang View',
    'nav.admin_view': 'HOA Admin View',
    'nav.collector_view': 'Collector View',
    'nav.homeowner_view': 'Homeowner View',
    // Dashboard
    'dashboard.greeting': 'Magandang araw',
    'dashboard.subtitle': 'Narito ang iyong community overview',
  },
  ceb: {
    // Login
    'login.title': 'Maayong Pag-abot sa HOAConnect',
    'login.subtitle': 'Mag-sign in sa imong community account',
    'login.email': 'Email Address',
    'login.email.placeholder': 'Isulod ang imong email',
    'login.password': 'Password',
    'login.password.placeholder': 'Isulod ang imong password',
    'login.role': 'Ako usa ka...',
    'login.role.homeowner': 'Tag-iya sa Balay',
    'login.role.admin': 'HOA Admin',
    'login.role.collector': 'Tigkolekta',
    'login.remember': 'Hinumdumi ako',
    'login.submit': 'Mag-sign In',
    'login.signing_in': 'Nag-sign in...',
    'login.error.invalid': 'Sayop ang email o password. Sulayi pag-usab.',
    'login.error.required': 'Palihug pun-a ang tanan nga field.',
    'login.demo_hint': 'Demo: Gamita ang bisan unsang email nga adunay password nga "password123"',
    'login.language': 'Pinulongan',
    // General
    'nav.dashboard': 'Dashboard',
    'nav.waste': 'Iskedyul sa Basura',
    'nav.payments': 'Mga Bayad',
    'nav.announcements': 'Mga Pahibalo',
    'nav.reports': 'Akong mga Taho',
    'nav.settings': 'Mga Setting',
    'nav.signout': 'Mag-sign Out',
    'nav.switch_view': 'Usba ang View',
    'nav.admin_view': 'HOA Admin View',
    'nav.collector_view': 'Collector View',
    'nav.homeowner_view': 'Homeowner View',
    // Dashboard
    'dashboard.greeting': 'Maayong adlaw',
    'dashboard.subtitle': 'Ania ang imong community overview',
  },
};

export function getTranslations(language: Language): (key: string) => string {
  return (key: string) => translations[language]?.[key] ?? translations['en']?.[key] ?? key;
}
