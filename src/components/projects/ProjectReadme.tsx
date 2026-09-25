import type { ReactNode } from 'react';
import type { Project } from '../../lib/content';
import Window from '../Window';
import Footer from '../Footer';
import ProjectIcon from '../ProjectIcon';

interface Props {
  project: Project;
  /** The rendered markdown body of the project's content file */
  children: ReactNode;
}

export default function ProjectReadme({ project, children }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col md:min-h-[calc(100vh-72px)]">
      <nav
        className="border-b border-line gutter py-5 font-mono text-xs text-muted md:text-sm [&_a]:text-fg-3 [&_a:hover]:text-accent"
        aria-label="Breadcrumb"
      >
        <a href="/">~</a> / <a href="/projects">projects</a> / <span className="text-fg-3">{project.slug}</span> /{' '}
        <span className="text-fg">README.md</span>
      </nav>

      <div className="grid items-start gap-10 gutter pt-10 pb-12 lg:grid-cols-[1fr_320px] lg:gap-16 lg:pt-16 lg:pb-24">
        <article className="flex min-w-0 flex-col gap-8 md:gap-11">
          <div className="flex flex-col gap-4.5">
            <div className="flex items-center gap-5">
              <ProjectIcon name={project.icon} size={64} />
              <h1 className="text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[80px]">{project.name}</h1>
            </div>
            <p className="max-w-190 text-[17px] leading-[1.55] text-fg-2 md:text-[21px]">{project.blurb}</p>
            <div className="flex flex-wrap gap-2">
              <span className="chip">{project.language}</span>
              {project.license && <span className="chip">{project.license}</span>}
              {project.topics.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {(() => {
            const media = project.demo ?? project.cover;
            const kind = project.demoVideo || project.demo ? 'demo' : project.cover ? 'app' : 'demo';
            return (
              <Window title={`${project.slug} · ${kind}`} dots deep>
                {project.demoVideo && media ? (
                  <video
                    className="block w-full"
                    width={media.width}
                    height={media.height}
                    poster={project.cover?.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={media.alt}
                  >
                    <source src={project.demoVideo} type="video/mp4" />
                    <img src={media.src} width={media.width} height={media.height} alt={media.alt} loading="lazy" className="block w-full" />
                  </video>
                ) : media ? (
                  <img src={media.src} width={media.width} height={media.height} alt={media.alt} loading="lazy" className="block w-full" />
                ) : (
                  <div className="flex h-60 items-center justify-center px-5 text-center font-mono text-[13px] text-muted md:h-115">
                    [terminal recording, GIF or screenshot of {project.name} in action]
                  </div>
                )}
              </Window>
            );
          })()}

          <div className="readme">{children}</div>
        </article>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-[14px] border border-line-2 bg-surface">
            <div className="border-b border-line-2 bg-surface-2 px-5 py-3.5 font-mono text-[13px] text-fg-3">meta.yml</div>
            <dl className="grid grid-cols-[90px_1fr] gap-y-3.5 p-5 font-mono text-[13px] [&_dd]:text-blue-light [&_dt]:text-blue">
              <dt>status</dt>
              <dd className={`inline-flex items-center gap-2 ${project.active ? 'text-green-2!' : 'text-muted!'}`}>
                <span className={`status-dot ${project.active ? '' : 'bg-muted'}`} />
                {project.active ? 'active' : 'archived'}
              </dd>
              <dt>type</dt>
              <dd>{project.status}</dd>
              <dt>language</dt>
              <dd>{project.language}</dd>
              {project.license && (
                <>
                  <dt>license</dt>
                  <dd>{project.license}</dd>
                </>
              )}
              <dt>started</dt>
              <dd>{project.started}</dd>
            </dl>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between rounded-[10px] bg-accent px-5 py-4 font-mono text-sm font-semibold text-bg hover:text-bg hover:brightness-108"
          >
            <span>view on github</span>
            <span>↗</span>
          </a>
          {project.docs && (
            <a href={project.docs.href} target="_blank" rel="noopener noreferrer" className="flex justify-between rounded-[10px] border border-line-3 px-5 py-4 font-mono text-sm">
              <span>{project.docs.label}</span>
              <span>↗</span>
            </a>
          )}
        </aside>
      </div>

      <Footer
        left={
          <a href="/projects" className="text-base text-fg!">
            <span className="prompt">$</span> cd ../projects
          </a>
        }
      />
    </div>
  );
}
