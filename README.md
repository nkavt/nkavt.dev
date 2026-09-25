# Nikoloz Kavtaradze · Portfolio

Personal site of Nikoloz Kavtaradze, senior full-stack engineer. A static site built with [Astro](https://astro.build), React components and Tailwind 4, styled as a terminal: monospace accents, a code card in the hero, a `README.md` layout for project pages.

All copy lives in content files. Adding a project or a job means adding a markdown file, not touching a component.

## Stack

- **Astro 7** renders everything to static HTML at build time. Only the navbar ships JavaScript, for the mobile menu and the scroll spy.
- **React 19** for every component. Sections of the home page are separate components composed by `src/pages/index.astro`.
- **Tailwind 4** with the design tokens in `src/styles/global.css`. No per-component CSS files.
- **Content collections** for projects, work history and the hero copy, defined in `src/content.config.ts`.

Requires Node 22 or newer.

## Commands

```sh
npm install
npm run dev        # dev server on http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

If an agent runs the dev server, use `astro dev --background` and manage it with `astro dev stop`, `astro dev status` and `astro dev logs` (see `AGENTS.md`).

Changes to `src/content.config.ts` need a dev server restart. Content files and media update live.

## Editing content

### Projects: `src/content/projects/<slug>.md`

The file name becomes the URL, so `locket.md` is served at `/projects/locket`. Frontmatter holds the facts, the markdown body is the README shown on the project page.

```yaml
---
name: Locket
blurb: One or two sentences shown on cards.
category: desktop app
status: open source        # or private
active: true
language: typescript
license: MIT               # optional
started: "2026"
topics: [electron, react, sqlite, mcp]
installCommand: "claude mcp add --transport http locket http://127.0.0.1:7821/mcp"
github: https://github.com/nkavt/Locket
docs: { label: Documentation, href: https://example.com }   # optional
icon: lock                 # see src/components/ProjectIcon.tsx
cover: ./locket-cover.png  # screenshot beside this file
demo: ./locket-demo.gif    # optional animated fallback
demoVideo: ./locket-demo.mp4   # optional, played muted on loop
order: 1                   # lowest is the featured project
---
```

Media sits next to the markdown file. Images go through Astro's image pipeline, the video is copied as is. In the body, `##` headings, numbered lists and fenced code blocks are styled to match the design.

### Experience: `src/content/experience/<company>.md`

One file per role. The body is the one-paragraph summary.

```yaml
---
company: OnTheGoSystems
title: senior full-stack developer
location: Remote           # optional
from: "2024"
to: "now"
tags: [rails, react, typescript]
current: true              # green marker and accent title
order: 1                   # lowest first
---
```

### Home page: `src/content/home/hero.md`

Headline, role, buttons, the `engineer.rb` code card and the four stats under it. The body is the lede paragraph. Inside `{ ... }` YAML values, quote anything containing a comma.

### Site-wide: `src/data/site.ts`

Name, email, location, GitHub and LinkedIn links, nav items and the "available for work" flag.

## Layout

```
src/
  components/
    Navbar.tsx          shared nav, mobile menu, scroll spy
    Section.tsx         numbered section wrapper (01. Title)
    Window.tsx          terminal / editor chrome
    FeaturedProject.tsx project card used on home and /projects
    home/               Hero, Projects, Experience, About, Contact
    projects/           ProjectsIndex, ProjectReadme
  content/              markdown + media, see above
  content.config.ts     collection schemas
  data/site.ts          site-wide info
  layouts/BaseLayout.astro
  lib/content.ts        loads collections, resolves images and video
  pages/
    index.astro
    projects.astro
    projects/[slug].astro
  styles/global.css     Tailwind theme tokens and shared classes
public/                 favicon, downloadable CV
```

## Design

The design source is a Claude Design canvas with desktop, mobile, projects and project-page artboards. The "Selected work" section from the mockup was intentionally left out.
