# RAMJAN AHMED — Personal Developer Website

A dark navy and electric-blue, glassmorphism developer website built with
**React 18, Vite, TypeScript, React Router and plain CSS**.

Pages: Home, Free Website, APK Building, Bot Making, Security, API Key,
Review Project, PC Tools, About, Contact.

## Principles

- No demo data: no fake statistics, reviews, users, testimonials or prices.
- No invented social links. Contact details and profile links come **only** from
  environment variables and are hidden when not set.
- No secrets in the code. `VITE_*` variables are bundled into the public site, so
  only put **public** contact details in them, never API keys or tokens.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Check types and build:

```bash
npx tsc -b
npm run build      # outputs ./dist
npm run preview    # serve ./dist locally
```

Requires Node.js 18 or newer (20 recommended).

## Configure contact details

Copy `.env.example` to `.env` and fill in only what you want to show:

| Variable | Example | Effect |
| --- | --- | --- |
| `VITE_SITE_URL` | `https://your-site.onrender.com` | canonical URL, `sitemap.xml`, `robots.txt` |
| `VITE_CONTACT_EMAIL` | `you@example.com` | "Send by email" button |
| `VITE_WHATSAPP_NUMBER` | `15551234567` (digits only) | "Send on WhatsApp" button |
| `VITE_TELEGRAM_USERNAME` | `your_username` | "Open Telegram" button |
| `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_YOUTUBE_URL`, `VITE_FACEBOOK_URL` | `https://...` | links in Contact and footer |
| `VITE_ABOUT_BIO` | short plain text | replaces the default About intro |

A button or link only appears when its variable is set and valid. The
"Copy message" button always works.

## Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`.env`, `node_modules` and `dist` are already in `.gitignore`.

## Deploy to Render (Static Site)

**Option A: Blueprint.** In Render choose *New → Blueprint* and select the
repository. `render.yaml` sets everything, including the SPA rewrite.

**Option B: Manual.** *New → Static Site*, connect the repository, then:

| Setting | Value |
| --- | --- |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

Then open *Redirects/Rewrites* and add:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | Rewrite |

This rewrite is what makes direct links such as `/contact` work after a refresh.
Add your `VITE_*` variables under *Environment*.

## Edit the content

- Services, offerings and what each one needs: `src/data/services.ts`
- Contact and profile configuration: `src/config/site.ts` (reads env variables)
- Colours and animation: `src/styles/global.css` (CSS variables at the top)
- If you add a page, also add its path to `ROUTES` in `vite.config.ts` for the sitemap.

## Project structure

```
src/
  components/   Button, Modal, GlowCard, Loader, Background, CustomCursor, Navbar, ...
  pages/        Home, ServicePage, About, Contact, NotFound
  data/         services.ts, navigation.ts
  config/       site.ts
  hooks/        usePrefersReducedMotion.ts
  utils/        pointer.ts, clipboard.ts
  styles/       global.css
```

## Accessibility and performance notes

- `prefers-reduced-motion` is respected: animations are removed, the particle canvas draws one static frame
  and the custom cursor stops lagging.
- The custom cursor and tilt effects only run on devices with a mouse or trackpad.
- Particle count scales with screen size, the animation pauses when the tab is hidden, and the
  canvas resolution is capped at 2x.
- Modals trap focus, lock page scrolling, close with the close button, an outside click or Escape,
  and return focus to the button that opened them.
