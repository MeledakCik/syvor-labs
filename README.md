# PT Sylvor Labs — Next.js Site

Full Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 rebuild of the Sylvor Labs
marketing site: navbar with light/dark toggle, hero, services, portfolio, pricing,
about, and a contact form.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx      Root layout, fonts (Geist + Inter), metadata
  page.tsx         Assembles all sections
  globals.css      Design tokens (light/dark CSS variables), base styles
components/
  Navbar.tsx       Sticky nav + mobile menu
  Hero.tsx         Hero with chrome S icon, headline, stats strip
  Services.tsx     5 service cards
  Portfolio.tsx     6-project grid
  Pricing.tsx      3-tier pricing
  About.tsx        Manifesto + visi/misi cards
  Contact.tsx      Form with project-type selector (client component)
  Footer.tsx
  SylvorIcon.tsx   Shared chrome "S" logo mark
  ThemeProvider.tsx / ThemeToggle.tsx   Light/dark mode state
  Reveal.tsx       Scroll-in-view fade animation
```

## Notes

- **Theme**: defaults to dark mode per brand spec. Toggling adds/removes the `dark`
  class on `<html>`; all colors are driven by CSS variables in `globals.css`.
- **Fonts**: uses the `geist` npm package for Geist Sans (headings) and
  `next/font/google` for Inter (body).
- **Contact form**: currently just shows a local "Terkirim ✓" confirmation. Wire
  `handleSubmit` in `components/Contact.tsx` up to a real endpoint (API route,
  email service like Resend, or a form backend) before going to production.
- **Tailwind v4**: configured via `@import "tailwindcss"` in `globals.css` — no
  separate `tailwind.config.js` is required, but you can add one if you need to
  extend the theme further.

## Deploy

Easiest path is Vercel:

```bash
npm i -g vercel
vercel
```

Or build for any Node host:

```bash
npm run build
npm start
```
