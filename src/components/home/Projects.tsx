import type { Project } from '../../lib/content';
import Section from '../Section';
import FeaturedProject from '../FeaturedProject';

interface Props {
  projects: Project[];
}

export default function Projects({ projects }: Props) {
  if (projects.length === 0) return null;

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
      <div className="flex flex-col gap-5">
        {projects.map((p) => (
          <FeaturedProject key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
