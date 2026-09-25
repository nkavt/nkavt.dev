import type { ReactNode } from 'react';

interface Props {
  /** Ordinal shown before the title, e.g. "01" */
  number: string;
  title: string;
  /** Anchor id for in-page navigation */
  id?: string;
  /** Content placed at the right end of the header row (a link, a hint) */
  aside?: ReactNode;
  /** Remove the top border (for the first section after the hero) */
  noBorder?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Section({ number, title, id, aside, noBorder, className = '', children }: Props) {
  return (
    <section
      id={id}
      className={`flex flex-col gap-6 gutter py-12 md:gap-10 md:py-24 ${noBorder ? 'md:pt-[104px]' : 'border-t border-line'} ${className}`}
    >
      <div className="flex items-center justify-between gap-3 md:justify-start md:gap-6">
        <h2 className="text-[26px] leading-[1.1] font-semibold tracking-[-0.02em] md:text-4xl md:whitespace-nowrap">
          <span className="mr-2 font-mono text-base font-medium text-accent md:mr-3 md:text-xl">{number}.</span>
          {title}
        </h2>
        <div className="hidden h-px grow bg-line-2 md:block" aria-hidden="true" />
        {aside && (
          <div className="font-mono text-[13px] whitespace-nowrap text-fg-3 md:text-sm [&_a]:py-3 [&_a]:text-fg-3 [&_a:hover]:text-accent">
            {aside}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
