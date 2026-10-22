# CLAUDE.md

Personal portfolio of Nikoloz Kavtaradze, served at nkavt.dev. Static Astro site, React components, Tailwind 4, styled as a terminal. `README.md` has the full content-editing guide (frontmatter fields for every collection).

@AGENTS.md

## Stack

- **Astro 7**, static output only. Only the navbar ships JavaScript.
- **React 19** for every component (`.tsx`). Pages are `.astro` files that compose them.
- **Tailwind 4**. Theme tokens and shared utilities (`gutter`, `btn`, `btn-primary`, `btn-ghost`, `chip`, `status-pill`, `status-dot`, `grid-bg`, `prompt`) live in `src/styles/global.css`. No per-component CSS files.
- **Content collections** for projects, experience and hero copy, schemas in `src/content.config.ts`.
- Node 24 (`.nvmrc`).

## Structure

```
src/
  components/
    Navbar.tsx            nav, mobile menu, scroll spy
    Footer.tsx
    Section.tsx           numbered section wrapper (01. Title)
    Window.tsx            terminal / editor window chrome
    Terminal.tsx          terminal output lines
    FeaturedProject.tsx   the project card, used on home and /projects
    ProjectIcon.tsx       project icons (lock, target, bag)
    FolderIcon.tsx
    home/                 Hero, Projects, Experience, About, Contact
    projects/             ProjectsIndex, ProjectReadme
  content/
    projects/<slug>/      index.md + media (cover, screenshots, demo); folder name = URL
    experience/<co>.md    one file per role
    home/hero.md          hero copy, code card, stats
  content.config.ts       collection schemas
  data/site.ts            name, email, links, nav, availability
  layouts/BaseLayout.astro
  lib/content.ts          loads collections, resolves images and video
  pages/                  index.astro, projects.astro, projects/[slug].astro
  styles/global.css       Tailwind theme + shared utilities
scripts/og.mjs            OG image generator (npm run og, puppeteer-core)
public/                   favicon, CV pdf, CNAME
.github/workflows/        deploy.yml: build + GitHub Pages on push to main
```

Content belongs in content files. Adding a project or a role means adding markdown, not editing components or pages. Keep components data-agnostic.

## Running

```sh
npm install
astro dev --background   # dev server on http://localhost:4321 (astro dev stop|status|logs)
npm run build            # static output in dist/
npm run preview          # serve dist/
npm run lint             # eslint (astro, react, hooks, a11y, tailwind)
npm run lint:fix
```

Changes to `src/content.config.ts` need a dev server restart and clearing `.astro/` caches.

## Before every commit

Make sure it works. Never commit unverified changes. Run, in order:

1. `npm run lint` must pass with no errors. Fix warnings you introduced.
2. `npm run build` must complete. This is what CI runs; a broken build breaks the deploy.
3. Tests: there is no test suite yet. If one is added (an `npm test` script), it must pass too.
4. UI changes: check the affected pages in the browser on the dev server, at desktop and mobile widths. Lint and build don't catch layout breakage.

If any step fails, fix it before committing. If you can't fix it, stop and report the failure with its output. Don't commit around it.

## Reuse components

Before writing a new component, look in `src/components/` (including `home/` and `projects/`) and `src/styles/global.css` for something that already does the job.

- **It exists:** use it. Don't define a second version.
- **It almost fits:** extend the existing component with a prop (an optional one with a default that keeps current behaviour, like `FeaturedProject`'s `facts` or `Window`'s `dots`/`deep`/`shadow`). Don't copy it into a new component for a small difference.
- **Repeated Tailwind class strings:** if the same set appears in several places, use or add an `@utility` in `global.css` instead of duplicating it.
- **Genuinely new:** only then create a component. Put shared ones in `src/components/`, page-specific ones in `home/` or `projects/`. Match the existing style: default export, `interface Props`, Tailwind classes.

When extending a shared component, check every place it's used so the change doesn't alter other pages.

## Scope

Change only what was asked. Don't hide, remove or redesign visible parts of the site as a side effect; if a change would remove something visible, say so first.
