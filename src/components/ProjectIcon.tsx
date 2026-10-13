import type { ReactNode } from 'react';
import type { Project } from '../lib/content';

interface Props {
  name: Project['icon'];
  size?: number;
  className?: string;
}

/** Add a new icon here and to the `icon` enum in src/content.config.ts. */
const icons: Record<Project['icon'], ReactNode> = {
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 11V6a3 3 0 0 1 6 0v5" />
    </>
  ),
};

export default function ProjectIcon({ name, size = 64, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-accent ${className}`}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
