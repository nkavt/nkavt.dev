import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Personal projects. One markdown file per project in src/content/projects/.
 * Frontmatter holds the facts; the markdown body is the README shown on /projects/<file-name>.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
    name: z.string(),
    blurb: z.string(),
    category: z.string().default('side project'),
    status: z.enum(['open source', 'private']).default('open source'),
    active: z.boolean().default(true),
    language: z.string(),
    license: z.string().optional(),
    started: z.string(),
    topics: z.array(z.string()).default([]),
    installCommand: z.string().optional(),
    github: z.string().default('#'),
    docs: z.object({ label: z.string(), href: z.string() }).optional(),
    icon: z.enum(['lock']).default('lock'),
    /** Screenshot beside this file, e.g. ./locket-cover.png. Shown on cards and the project page. */
    cover: image().optional(),
    coverAlt: z.string().optional(),
    /** Animated demo (GIF) beside this file. Shown in the demo window on the project page instead of the cover. */
    demo: image().optional(),
    demoAlt: z.string().optional(),
    /** MP4 version of the demo beside this file, e.g. ./locket-demo.mp4. Played muted on loop; the GIF is the fallback. */
    demoVideo: z.string().optional(),
    /** Lower comes first. The first project is the featured one. */
    order: z.number().default(100),
  }),
});

/**
 * Work history. One markdown file per role in src/content/experience/.
 * The markdown body is the one-paragraph summary.
 */
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    location: z.string().optional(),
    from: z.string(),
    to: z.string(),
    tags: z.array(z.string()).default([]),
    current: z.boolean().default(false),
    /** Lower comes first (most recent role first). */
    order: z.number(),
  }),
});

/**
 * Home page sections that carry editable copy. One markdown file per section in src/content/home/.
 * hero.md: frontmatter drives the headline, buttons, stats and the code card; the body is the lede paragraph.
 */
const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: z.object({
    prompt: z.string().default('whoami'),
    headline: z.array(z.string()).min(1),
    role: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
    code: z.object({
      file: z.string().default('engineer.rb'),
      lang: z.string().default('ruby'),
      className: z.string().default('Engineer'),
      /** Instance variables rendered inside `initialize`. Values are printed verbatim: "quoted" strings, :symbols, numbers, %i[...] arrays. */
      vars: z.array(z.object({ name: z.string(), value: z.string() })),
    }),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).max(4),
  }),
});

export const collections = { projects, experience, home };
