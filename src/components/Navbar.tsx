import { useEffect, useState } from 'react';
import { navLinks, site } from '../data/site';

interface Props {
  currentPath?: string;
}

function isActive(href: string, currentPath: string) {
  const path = href.split('#')[0];
  return path !== '/' && path !== '' && currentPath.startsWith(path);
}

/** The home-page section a nav link points at: "/#about" and "/projects" both map to a section id. */
function sectionId(href: string) {
  const [path, hash] = href.split('#');
  return hash || path.replace(/^\//, '') || null;
}

/** On the home page, track which section is under the reader and report its id. */
function useScrollSpy(enabled: boolean, ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  // Join the ids so the effect depends on their content, not on a fresh array each render.
  const idList = ids.join(',');
  useEffect(() => {
    if (!enabled) return;
    const sections = idList
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight / 3;
      let current: string | null = null;
      for (const el of sections) if (el.offsetTop <= line) current = el.id;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, idList]);
  return active;
}

const linkClass = 'aria-[current=page]:text-accent';

export default function Navbar({ currentPath = '/' }: Props) {
  const [open, setOpen] = useState(false);
  const onHome = currentPath === '/';
  const activeSection = useScrollSpy(
    onHome,
    navLinks.map((l) => sectionId(l.href)).filter((id): id is string => !!id),
  );
  const current = (href: string) => (onHome ? sectionId(href) === activeSection : isActive(href, currentPath));

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-line bg-bg/92 gutter font-mono backdrop-blur-sm md:h-[72px]">
      <a href="/" className="flex items-center gap-0.5 py-3 text-[15px] font-semibold hover:text-fg md:text-base" aria-label="Home">
        <span className="text-accent">~/</span>
        <span>{site.handle}</span>
        <span className="ml-1 h-4 w-2 animate-blink bg-accent md:h-[18px] md:w-[9px]" aria-hidden="true" />
      </a>

      <div className="hidden items-center gap-1 text-sm md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`px-3.5 py-3 ${linkClass}`}
            aria-current={current(link.href) ? 'page' : undefined}
          >
            <span className="text-muted">./</span>
            {link.label}
          </a>
        ))}
        {site.available && (
          <a href="/#contact" className="ml-4 inline-flex items-center gap-2.5 rounded-lg border border-line-3 px-4 py-2.5 text-[13px]">
            <span className="size-2 rounded-full bg-green shadow-[0_0_0_4px_rgba(63,185,80,0.18)]" />
            available for work
          </a>
        )}
      </div>

      <button
        type="button"
        className="flex size-11 cursor-pointer items-center justify-center rounded-[10px] border border-line-3 bg-surface md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-bg gutter pt-2 pb-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 border-b border-line py-3.5 text-[15px] ${linkClass}`}
              onClick={() => setOpen(false)}
              aria-current={current(link.href) ? 'page' : undefined}
            >
              <span className="text-muted">./</span>
              {link.label}
            </a>
          ))}
          {site.available && (
            <a href="/#contact" className="flex items-center gap-2.5 py-3.5 text-[15px]" onClick={() => setOpen(false)}>
              <span className="size-2 rounded-full bg-green shadow-[0_0_0_4px_rgba(63,185,80,0.18)]" />
              available for work
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
