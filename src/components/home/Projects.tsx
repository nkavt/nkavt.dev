import type { Project } from '../../lib/content';
import Section from '../Section';
import FeaturedProject from '../FeaturedProject';

interface Props {
  projects: Project[];
  /** Number of projects on /projects, shown in the "ls ./projects" link. Defaults to the projects shown here. */
  total?: number;
}

export default function Projects({ projects, total = projects.length }: Props) {
  if (projects.length === 0) return null;

  return (
    <Section
      id="projects"
      number="01"
      title="Personal projects"
      noBorder
      aside={
        <a href="/projects">
          ls ./projects <span className="text-fg">({total})</span> →
        </a>
      }
    >
      <div className="flex flex-col gap-5">
        {projects.map((p) => (
          <FeaturedProject key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
