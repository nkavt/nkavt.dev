import type { Project } from '../../lib/content';
import { site } from '../../data/site';
import FeaturedProject from '../FeaturedProject';
import Footer from '../Footer';

interface Props {
  projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
  const count = String(projects.length).padStart(2, '0');

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col md:min-h-[calc(100vh-72px)]">
      <header className="flex flex-col items-start gap-6 border-b border-line grid-bg gutter pt-12 pb-10 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-22 md:pb-14">
        <div className="flex flex-col gap-5.5">
          <div className="font-mono text-[15px] text-fg-3">
            <span className="prompt">$</span> ls -la ./projects
          </div>
          <h1 className="text-[52px] leading-none font-semibold tracking-[-0.04em] md:text-[88px]">Projects</h1>
          <p className="max-w-150 text-base/relaxed text-fg-2 md:text-[19px]">
            Things I build outside of work, mostly open source and mostly for fun.
          </p>
        </div>
        <div className="flex items-baseline gap-2.5 font-mono md:flex-col md:items-end md:gap-1.5">
          <div className="text-4xl leading-none font-semibold text-accent md:text-[64px]">{count}</div>
          <div className="text-[13px] text-fg-3">{projects.length === 1 ? 'project' : 'projects'}</div>
        </div>
      </header>

      <main className="flex flex-col gap-5 gutter pt-10 pb-12 md:pt-14 md:pb-24">
        {projects.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} index={String(i + 1).padStart(2, '0')} facts="table" />
        ))}

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
      </main>

      <Footer right={<a href={`mailto:${site.email}`}>{site.email}</a>} />
    </div>
  );
}
