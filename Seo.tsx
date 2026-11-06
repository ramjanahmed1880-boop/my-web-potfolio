import { useEffect } from 'react';
import { site } from '../config/site';

interface SeoProps {
  title?: string;
  description?: string;
  path: string;
}

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Updates document title and meta tags for the current route. Renders nothing. */
export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.role}`;
    const desc = description ?? site.defaultDescription;
    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    if (site.url) {
      const url = `${site.url}${path === '/' ? '/' : path}`;
      setCanonical(url);
      setMeta('property', 'og:url', url);
    }
  }, [title, description, path]);

  return null;
}
