import type { Project } from '../../lib/content';
import Section from '../Section';
import FeaturedProject from '../FeaturedProject';
import FolderIcon from '../FolderIcon';

interface Props {
  projects: Project[];
}

export default function Projects({ projects }: Props) {
  const [featured, ...others] = projects;
  if (!featured) return null;

  return (
    <Section
      id="projects"
      number="01"
      title="Personal projects"
      noBorder
      aside={
        <a href="/projects">
          ls ./projects <span className="text-fg">({projects.length})</span> →
        </a>
      }
    >
      <FeaturedProject project={featured} />

      {others.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {others.map((p) => (
            <a
              key={p.slug}
              href={p.href}
              className="flex flex-col gap-3.5 rounded-[14px] border border-line-2 bg-surface p-5 text-fg hover:border-line-3 hover:text-fg md:p-7"
            >
              <div className="flex items-center gap-2.5 font-mono text-[13px] text-fg-3">
                <FolderIcon size={16} />
                projects/{p.slug}
              </div>
              <div className="text-[22px] font-semibold tracking-[-0.02em]">{p.name}</div>
              <div className="text-[15px] leading-[1.55] text-fg-2">{p.blurb}</div>
              <div className="font-mono text-xs text-muted">
                {p.language} · {p.started}
              </div>
            </a>
          ))}
        </div>
      )}
    </Section>
  );
}
