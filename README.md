# Portfolio

My personal site and project catalogue — **[amithey.vercel.app](https://amithey.vercel.app)**

Most of the projects listed here start inside the page rather than sending you off
to clone a repo.

## How it works

`data/projects.ts` is the single source of truth. Every page, filter, count and
card renders from it — including the line in the hero that says how many projects
run in the browser, which is counted rather than typed, so the copy cannot drift
away from what is actually true.

Two fields in that file are deliberately left empty:

- **`learned`** — first person, so it is written by hand or not at all. The detail
  page omits the section while it is blank rather than filling it with something
  generated.
- **`built`** — only set where a real date is known. Most of these repos were
  pushed in one squashed commit, so their git dates say nothing about when the
  work actually happened, and a guess would read as fact.

## Notable bits

**Demos boot in place.** Clicking *Run this project* mounts an iframe inside the
card instead of navigating away. Nothing loads until asked — ten auto-loading
iframes would wreck the page and hammer free-tier backends. `demo.embeddable` is
only ever set after checking the response headers, because a site sending
`X-Frame-Options: DENY` renders as a blank rectangle.

**Filters are links, not state.** `/projects?category=…&tag=…` is handled on the
server, so filtered views are shareable, the back button behaves, every control is
keyboard-reachable without extra work, and the page still filters with JavaScript
disabled.

**Cover art is drawn, not screenshotted.** Each project has its own SVG scene in
`components/art`, picked at build time by `lib/covers.ts`. Drop a real screenshot
into `public/images/projects/<slug>.webp` and that tile switches over on the next
build with nothing else to change.

**The hero scene** is SVG with CSS-only motion, which keeps it a server component
and lets one `prefers-reduced-motion` rule freeze the whole thing into a still
illustration.

## Running it

```bash
npm install
npm run dev
```

## Stack

Next.js (App Router) · TypeScript · Tailwind v4 · deployed on Vercel

`vercel.json` pins the framework preset. Created through the CLI a project
defaults to preset *Other* with an output directory of `public/`, which builds
without error and then 404s on every route.
