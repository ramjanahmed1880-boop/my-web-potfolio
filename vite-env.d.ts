/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_TELEGRAM_USERNAME?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_YOUTUBE_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_ABOUT_BIO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
