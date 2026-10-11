import type { ReactNode } from 'react';

interface Props {
  /** Output lines from the project's `terminal` frontmatter */
  lines: string[];
  className?: string;
}

/**
 * Renders CLI output as real text, so it stays crisp at any size.
 * Colours by line shape: `$ ` commands, `✔` ticks, `92  Title · meta` score rows, and indented notes.
 */
export default function Terminal({ lines, className = '' }: Props) {
  return (
    <pre className={`m-0 font-mono whitespace-pre text-fg ${className}`}>
      {lines.map((line, i) => (
        <div key={i}>{renderLine(line)}</div>
      ))}
    </pre>
  );
}

function renderLine(line: string): ReactNode {
  if (line === '') return '\u00a0';

  if (line.startsWith('$ ')) {
    return (
      <>
        <span className='text-accent'>$</span>
        {line.slice(1)}
      </>
    );
  }

  if (line.startsWith('✔')) {
    return (
      <>
        <span className='text-accent'>✔</span>
        <span className='text-fg-2'>{line.slice(1)}</span>
      </>
    );
  }

  const score = line.match(/^(\s*)(\d{1,3})(\s+)(.*?)( · .*)?$/);
  if (score) {
    const [, lead, num, gap, title, meta] = score;
    const tone = Number(num) >= 80 ? 'text-accent' : 'text-orange';
    return (
      <>
        {lead}
        <span className={`font-semibold ${tone}`}>{num}</span>
        {gap}
        <span className='font-semibold'>{title}</span>
        {meta && <span className='text-muted'>{meta}</span>}
      </>
    );
  }

  if (/^\s{3,}/.test(line)) return <span className='text-fg-3'>{line}</span>;

  return <span className='font-semibold'>{line}</span>;
}
