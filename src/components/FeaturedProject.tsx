import type { Project } from '../lib/content';
import Window from './Window';
import ProjectIcon from './ProjectIcon';
import FolderIcon from './FolderIcon';

interface Props {
  project: Project;
  /** Ordinal shown in the meta row on the projects page, e.g. "01" */
  index?: string;
  /** "chips" (home) or "table" (projects page) for the facts row */
  facts?: 'chips' | 'table';
}

export default function FeaturedProject({ project, index, facts = 'chips' }: Props) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-line-2 bg-surface lg:grid-cols-[660px_1fr]">
      <div className="border-b border-line-2 bg-surface-deep md:bg-surface-2 md:p-7 lg:border-r lg:border-b-0">
        <Window title={project.cover ? `${project.slug} · app` : `${project.slug} · zsh`} dots deep className="max-md:rounded-none max-md:border-0">
          {project.cover ? (
            <img
              src={project.cover.src}
              width={project.cover.width}
              height={project.cover.height}
              alt={project.cover.alt}
              loading="lazy"
              className="block aspect-3/2 w-full object-cover object-top-left"
            />
          ) : (
            <div className="relative flex h-[200px] flex-col items-center justify-center gap-3 md:h-[340px] md:gap-4">
              <ProjectIcon name={project.icon} size={64} className="max-md:size-11" />
              <div className="font-mono text-[40px] leading-none font-semibold tracking-[-0.04em] md:text-[56px]">{project.slug}</div>
              {project.installCommand && (
                <div className="hidden rounded-lg border border-line-3 bg-surface-2 px-3.5 py-2 font-mono text-[13px] text-fg-2 md:block">
                  <span className="prompt">$</span> {project.installCommand}
                </div>
              )}
            </div>
          )}
        </Window>
      </div>

      <div className="flex flex-col gap-3 p-[22px] md:gap-5 md:p-11">
        <div className="flex items-center justify-between font-mono text-xs md:text-[13px]">
          <span className="inline-flex items-center gap-2.5 text-fg-3">
            {index ? (
              <>
                {index} · {project.category}
              </>
            ) : (
              <>
                <FolderIcon />
                projects/{project.slug}
              </>
            )}
          </span>
          <span className="status-pill">
            <span className="status-dot" />
            {project.status}
          </span>
        </div>

        <h3 className="text-[28px] leading-none font-semibold tracking-[-0.03em] md:text-[44px]">
          <a href={project.href} className="hover:text-fg">
            {project.name}
          </a>
        </h3>
        <p className="text-[15px] leading-relaxed text-fg-2 md:text-[17px]">{project.blurb}</p>

        {facts === 'chips' ? (
          <div className="flex flex-wrap gap-2">
            <span className="chip">{project.status}</span>
            <span className="chip">{project.language}</span>
            {project.license && <span className="chip">{project.license}</span>}
            <span className="chip">{project.started}</span>
          </div>
        ) : (
          <dl className="grid grid-cols-[90px_1fr] gap-y-2.5 border-y border-line-2 py-4 font-mono text-[13px] [&_dd]:text-fg-2 [&_dt]:text-muted">
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
        )}

        <div className="mt-auto flex gap-6 font-mono text-[13px] md:text-sm">
          <a href={project.href} className="text-accent hover:underline">
            read more →
          </a>
          {project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-fg-3">
              github ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
