import type { ReactNode } from 'react';
import { site } from '../data/site';

interface Props {
  left?: ReactNode;
  right?: ReactNode;
  /** Render inline inside a section (no gutter padding, top border only) */
  inline?: boolean;
}

export default function Footer({ left, right, inline }: Props) {
  const copyright = (
    <span>
      © {site.year} {site.name}
    </span>
  );
  return (
    <footer
      className={[
        'mt-auto flex flex-col items-start gap-2 border-t border-line font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:gap-4 md:text-[13px]',
        '[&_a]:text-fg-3 [&_a:hover]:text-accent',
        inline ? 'pt-6' : 'gutter py-7',
      ].join(' ')}
    >
      <div>{left ?? copyright}</div>
      <div>{right ?? (left ? copyright : null)}</div>
    </footer>
  );
}
