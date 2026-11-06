import type { IconName } from '../components/Icon';

/**
 * Site configuration.
 * Nothing here is invented: contact details and profile links come ONLY from
 * environment variables (see .env.example). Anything left empty is simply not shown.
 */
const env = import.meta.env;

const clean = (value: string | undefined): string => (value ?? '').trim();

/** Accepts only well-formed https:// URLs. */
function httpsUrl(value: string | undefined): string {
  const raw = clean(value);
  if (!raw) return '';
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' ? url.toString() : '';
  } catch {
    return '';
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_PATTERN = /^[A-Za-z0-9_]{5,32}$/;

const emailRaw = clean(env.VITE_CONTACT_EMAIL);
const whatsappDigits = clean(env.VITE_WHATSAPP_NUMBER).replace(/\D/g, '');
const telegramRaw = clean(env.VITE_TELEGRAM_USERNAME).replace(/^@/, '');

export const site = {
  name: 'Ramjan Ahmed',
  displayName: 'RAMJAN AHMED',
  role: 'Developer',
  /** Public URL of the deployed site, without trailing slash. Empty if not configured. */
  url: httpsUrl(env.VITE_SITE_URL).replace(/\/+$/, ''),
  defaultDescription:
    'Ramjan Ahmed is a developer offering free websites, Android APK building, bot making, security help, API key guidance, project reviews and PC tools.',
  bio: clean(env.VITE_ABOUT_BIO),
};

export const contact = {
  email: EMAIL_PATTERN.test(emailRaw) ? emailRaw : '',
  whatsapp: whatsappDigits.length >= 7 && whatsappDigits.length <= 15 ? whatsappDigits : '',
  telegram: TELEGRAM_PATTERN.test(telegramRaw) ? telegramRaw : '',
};

export interface ProfileLink {
  id: string;
  label: string;
  url: string;
  icon: IconName;
}

const allProfileLinks: ProfileLink[] = [
  { id: 'github', label: 'GitHub', url: httpsUrl(env.VITE_GITHUB_URL), icon: 'code' },
  { id: 'linkedin', label: 'LinkedIn', url: httpsUrl(env.VITE_LINKEDIN_URL), icon: 'external' },
  { id: 'youtube', label: 'YouTube', url: httpsUrl(env.VITE_YOUTUBE_URL), icon: 'external' },
  { id: 'facebook', label: 'Facebook', url: httpsUrl(env.VITE_FACEBOOK_URL), icon: 'external' },
];

/** Only links that were actually configured. */
export const profileLinks: ProfileLink[] = allProfileLinks.filter((link) => link.url !== '');

export const hasDirectContact = Boolean(contact.email || contact.whatsapp || contact.telegram);
