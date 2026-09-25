import type { Project } from '../../lib/content';
import { site } from '../../data/site';
import FeaturedProject from '../FeaturedProject';
import Footer from '../Footer';

interface Props {
  projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
  const [featured, ...others] = projects;
  const count = String(projects.length).padStart(2, '0');

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col md:min-h-[calc(100vh-72px)]">
      <header className="flex flex-col items-start gap-6 border-b border-line grid-bg gutter pt-12 pb-10 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-[88px] md:pb-14">
        <div className="flex flex-col gap-[22px]">
          <div className="font-mono text-[15px] text-fg-3">
            <span className="prompt">$</span> ls -la ./projects
          </div>
          <h1 className="text-[52px] leading-none font-semibold tracking-[-0.04em] md:text-[88px]">Projects</h1>
          <p className="max-w-[600px] text-base/relaxed text-fg-2 md:text-[19px]">
            Things I build outside of work, mostly open source and mostly for fun.
          </p>
        </div>
        <div className="flex items-baseline gap-2.5 font-mono md:flex-col md:items-end md:gap-1.5">
          <div className="text-4xl leading-none font-semibold text-accent md:text-[64px]">{count}</div>
          <div className="text-[13px] text-fg-3">{projects.length === 1 ? 'project' : 'projects'}</div>
        </div>
      </header>

      <main className="flex flex-col gap-5 gutter pt-10 pb-12 md:pt-14 md:pb-24">
        {featured && <FeaturedProject project={featured} index="01" facts="table" />}

        {others.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((p, i) => (
              <a
                key={p.slug}
                href={p.href}
                className="flex flex-col overflow-hidden rounded-[14px] border border-line-2 bg-surface text-fg hover:border-line-3 hover:text-fg"
              >
                <div className="flex h-[180px] items-center justify-center overflow-hidden border-b border-line-2 bg-surface-2 font-mono text-xs text-muted">
                  {p.cover ? (
                    <img src={p.cover.src} width={p.cover.width} height={p.cover.height} alt={p.cover.alt} loading="lazy" className="size-full object-cover object-top-left" />
                  ) : (
                    '[screenshot]'
                  )}
                </div>
                <div className="flex flex-col gap-2.5 p-6">
                  <div className="font-mono text-xs text-muted">
                    {String(i + 2).padStart(2, '0')} · {p.category}
                  </div>
                  <div className="text-[22px] font-semibold tracking-[-0.02em]">{p.name}</div>
                  <div className="text-[15px] leading-[1.55] text-fg-2">{p.blurb}</div>
                  <div className="font-mono text-xs text-fg-3">
                    {p.language} · {p.started}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8 rounded-[14px] border border-dashed border-line-3 p-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-7">
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[15px] text-fg-3">
                <span className="prompt">$</span> mkdir ./projects/next
                <span className="ml-1 inline-block h-4 w-2 -translate-y-0.5 bg-fg-3 align-middle" aria-hidden="true" />
              </div>
              <div className="text-base text-fg-2">
                More projects land here as they ship. Until then, my day job work is on the home page.
              </div>
            </div>
            <a href="/#experience" className="btn shrink-0 btn-ghost">
              cd ~/work →
            </a>
          </div>
        )}
      </main>

      <Footer right={<a href={`mailto:${site.email}`}>{site.email}</a>} />
    </div>
  );
}
