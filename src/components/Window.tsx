import type { ReactNode } from 'react';

interface Props {
  /** Label in the title bar, e.g. "engineer.rb" or "zsh · contact" */
  title: string;
  /** Small label at the right of the title bar, e.g. the language */
  meta?: string;
  /** Show the three traffic-light dots */
  dots?: boolean;
  /** Center the title (used with dots on the hero card) */
  centerTitle?: boolean;
  /** Darker inner surface for terminal previews */
  deep?: boolean;
  shadow?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Window({ title, meta, dots, centerTitle, deep, shadow, className = '', children }: Props) {
  return (
    <div
      className={[
        'min-w-0 overflow-hidden border',
        deep ? 'rounded-[10px] border-line-3 bg-surface-deep' : 'rounded-[14px] border-line-2 bg-surface',
        shadow ? 'shadow-[0_40px_80px_rgba(0,0,0,0.45)]' : '',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'flex items-center gap-3.5 border-b px-3.5 font-mono text-xs text-fg-3',
          deep ? 'h-9 border-line-3 bg-surface-3 md:text-[11px]' : 'border-line-2 bg-surface-2 md:px-4 md:text-[13px]',
          !deep && centerTitle ? 'h-9 md:h-11' : !deep ? 'h-9 md:h-10' : '',
          centerTitle ? 'justify-between' : '',
        ].join(' ')}
      >
        {dots && (
          <div className="flex gap-1.75" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className={deep ? 'size-2.25 rounded-full bg-dot' : 'size-2.75 rounded-full bg-line-3'} />
            ))}
          </div>
        )}
        <span className={centerTitle ? '' : 'grow'}>{title}</span>
        {meta && <span className="ml-auto text-xs text-muted">{meta}</span>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
