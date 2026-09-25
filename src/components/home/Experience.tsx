import type { Role } from '../../lib/content';
import Section from '../Section';

interface Props {
  roles: Role[];
}

export default function Experience({ roles }: Props) {
  return (
    <Section id="experience" number="02" title="Experience" aside={<span>git log --career</span>}>
      <ol className="ml-[5px] flex flex-col md:ml-0">
        {roles.map((role, i) => {
          const last = i === roles.length - 1;
          const dates = `${role.from} → ${role.to}`;
          return (
            <li key={`${role.company}-${role.from}`} className="grid md:grid-cols-[220px_1fr]">
              <div className={`hidden pt-1 font-mono text-sm text-fg-3 md:block ${last ? '' : 'pb-12'}`}>{dates}</div>
              <div className={`relative flex flex-col gap-1 border-l border-line-3 pl-6 md:gap-2 md:pl-10 ${last ? '' : 'pb-7 md:pb-12'}`}>
                <span
                  className={`absolute top-1.5 -left-1.5 size-[11px] rounded-full border-[1.5px] ${
                    role.current ? 'border-accent bg-accent' : 'border-muted bg-bg'
                  }`}
                  aria-hidden="true"
                />
                <div className="font-mono text-xs text-fg-3 md:hidden">{dates}</div>
                <div className="flex flex-col gap-1 md:flex-row md:flex-wrap md:items-baseline md:gap-3.5">
                  <span className="text-[19px] font-semibold md:text-[22px]">{role.company}</span>
                  <span className={`font-mono text-[13px] md:text-sm ${role.current ? 'text-accent' : 'text-fg-3'}`}>{role.title}</span>
                  {role.location && <span className="font-mono text-xs text-muted md:ml-auto">{role.location}</span>}
                </div>
                <p className="mt-1 max-w-[820px] text-[15px] leading-relaxed text-fg-2 md:mt-0 md:text-base">{role.summary}</p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-fg-3">
                  {role.tags.map((tag, j) => (
                    <span key={tag}>
                      {j > 0 && '· '}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
