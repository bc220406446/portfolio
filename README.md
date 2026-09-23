# Muhammad Kamran — Portfolio

A full stack developer portfolio built with **Next.js 16 (Turbopack)**, **TypeScript**,
**Tailwind CSS v4** and **Framer Motion**. Dark, editorial, sharp-edged — every label,
tag and control is a rectangle; there are no pill-shaped badges anywhere.

Live content is drawn from the owner's LinkedIn profile and the public GitHub API.

## Highlights

- **Motion primitives built in-house** — mask-based text reveals, seamless CSS-keyframe
  marquee with hover pause, pointer-magnetic buttons, scroll-linked parallax, spotlight
  cards with 3D tilt, and viewport-triggered counters. Everything honours
  `prefers-reduced-motion`.
- **Editorial design system** — Tailwind v4 `@theme` tokens, a blueprint grid backdrop,
  Geist + Instrument Serif typography, and monospace section indices.
- **Full stack, not a static page** — a validated enquiry API route and a server
  component that reads live GitHub data at request time.
- **Accessibility** — skip link, landmark structure, focus-visible rings, `aria-live`
  form status, and a keyboard-accessible project filter.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script              | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Dev server with Turbopack and HMR          |
| `npm run build`     | Production build                           |
| `npm run start`     | Serve the production build                 |
| `npm run lint`      | ESLint                                     |
| `npm run typecheck` | `tsc --noEmit`                             |

## Project structure

```
src/
  app/
    layout.tsx              Fonts, metadata, structured data, chrome
    page.tsx                Section composition
    globals.css             Tailwind v4 theme tokens + keyframes
    api/contact/route.ts    Validated enquiry endpoint
  components/
    layout/                 Header, footer, smooth scroll, ambient backdrop
    motion/                 Reveal, TextReveal, Marquee, Magnetic, Parallax, Counter
    sections/               Hero, About, Capabilities, Experience, Work, …
    ui/                     Section shell, buttons, square tags
  data/profile.ts           Single source of truth for all content
  lib/                      Schema and helpers
```

## Contact form

`POST /api/contact` validates with Zod, throttles by IP (5 requests / 10 minutes) and
includes a hidden honeypot field. Delivery is optional: set the following environment
variables to send enquiries through [Resend](https://resend.com):

```bash
RESEND_API_KEY=...
CONTACT_TO=you@example.com
CONTACT_FROM="Portfolio <onboarding@resend.dev>"
```

Without them the endpoint still validates and accepts submissions, which keeps local
development and preview deployments working.

## Credits

The animated-component registries referenced during design (`Skipper UI`, `Vengeance UI`)
are distribution sites rather than installable packages — none of them publish to npm.
Their signature effects are reproduced here directly with Framer Motion so the project
depends only on maintained libraries.
