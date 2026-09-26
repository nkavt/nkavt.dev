import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';

/** Videos placed beside content entries. Vite copies them into the build and gives each a hashed URL. */
const videos = import.meta.glob<string>('/src/content/**/*.{mp4,webm}', { eager: true, query: '?url', import: 'default' });

export interface Cover {
  src: string;
  width: number;
  height: number;
  alt: string;
}

type ProjectData = CollectionEntry<'projects'>['data'];
type ImageInput = NonNullable<ProjectData['cover']>;

/** A project as the React components consume it: frontmatter plus slug, page URL and resolved media. */
export type Project = Omit<ProjectData, 'cover' | 'demo' | 'demoVideo'> & {
  slug: string;
  href: string;
  cover?: Cover;
  demo?: Cover;
  demoVideo?: string;
  /** PNG version of the cover for social share previews (WebP is not universally supported there). */
  share?: Cover;
};

/** A role as the React components consume it: frontmatter plus the plain-text summary. */
export type Role = CollectionEntry<'experience'>['data'] & { summary: string };

/** The hero section's copy: frontmatter plus the lede paragraph from the body. */
export type Hero = CollectionEntry<'home'>['data'] & { lede: string };

async function resolveImage(
  src: ImageInput | undefined,
  alt: string,
  opts: { width?: number; format?: 'png' } = {},
): Promise<Cover | undefined> {
  if (!src) return undefined;
  const format = opts.format ?? (src.format === 'gif' ? 'gif' : 'webp');
  const img = await getImage({ src, width: opts.width ?? 1320, format });
  return { src: img.src, width: img.attributes.width as number, height: img.attributes.height as number, alt };
}

/** Resolve a `./file.mp4` reference in frontmatter against the entry's own folder. */
function resolveVideo(entryFilePath: string | undefined, ref: string | undefined): string | undefined {
  if (!ref) return undefined;
  if (!entryFilePath) throw new Error(`Cannot resolve demoVideo "${ref}": entry has no file path`);
  const dir = entryFilePath.replace(/[^/]+$/, '');
  const key = '/' + (dir + ref.replace(/^\.\//, '')).replace(/^\.?\//, '');
  const url = videos[key];
  if (!url) throw new Error(`demoVideo "${ref}" not found next to ${entryFilePath} (looked for ${key})`);
  return url;
}

export async function toProject(entry: CollectionEntry<'projects'>): Promise<Project> {
  const { cover, demo, demoVideo, ...data } = entry.data;
  return {
    ...data,
    slug: entry.id,
    href: `/projects/${entry.id}`,
    cover: await resolveImage(cover, data.coverAlt ?? `${data.name} screenshot`),
    demo: await resolveImage(demo, data.demoAlt ?? `${data.name} demo`),
    demoVideo: resolveVideo(entry.filePath, demoVideo),
    share: await resolveImage(cover, data.coverAlt ?? `${data.name} screenshot`, { width: 1200, format: 'png' }),
  };
}

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');
  entries.sort((a, b) => a.data.order - b.data.order);
  return Promise.all(entries.map(toProject));
}

export async function getExperience(): Promise<Role[]> {
  const entries = await getCollection('experience');
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map((e) => ({ ...e.data, summary: (e.body ?? '').trim() }));
}

export async function getHero(): Promise<Hero> {
  const entry = await getEntry('home', 'hero');
  if (!entry) throw new Error('Missing src/content/home/hero.md');
  return { ...entry.data, lede: (entry.body ?? '').trim() };
}
