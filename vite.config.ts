import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Public routes used for sitemap.xml. Keep in sync with src/data/services.ts. */
const ROUTES = [
  '/',
  '/free-website',
  '/apk-building',
  '/bot-making',
  '/security',
  '/api-key',
  '/review-project',
  '/pc-tools',
  '/about',
  '/contact',
];

/**
 * Emits robots.txt and (when VITE_SITE_URL is set) sitemap.xml at build time,
 * so no domain has to be invented in the source code.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl.replace(/\/+$/, '');
      const robots = ['User-agent: *', 'Allow: /'];
      if (base) robots.push(`Sitemap: ${base}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' });

      if (base) {
        const urls = ROUTES.map((r) => `  <url><loc>${base}${r === '/' ? '/' : r}</loc></url>`).join('\n');
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react(), seoFiles(env.VITE_SITE_URL ?? '')],
    build: {
      target: 'es2020',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  };
});
