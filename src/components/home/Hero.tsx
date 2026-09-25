import { site } from '../../data/site';
import type { Hero as HeroData } from '../../lib/content';
import Window from '../Window';

interface Props {
  hero: HeroData;
}

/** Colour a Ruby literal the way the design's code card does. */
function valueClass(value: string) {
  if (value.startsWith('"') || value.startsWith('%')) return 'text-blue-light';
  if (value.startsWith(':')) return 'text-accent';
  return 'text-blue';
}

export default function Hero({ hero }: Props) {
  const { code, stats } = hero;
  const width = Math.max(...code.vars.map((v) => v.name.length)) + 1;
  const lineCount = code.vars.length + 4;

  return (
    <section className="flex flex-col gap-8 grid-bg gutter pt-12 pb-10 md:gap-[88px] md:pt-28 md:pb-0">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_580px] lg:gap-[72px]">
        <div className="flex flex-col gap-5 md:gap-7">
          {site.available && (
            <span className="inline-flex items-center gap-2 self-start rounded-lg border border-line-3 bg-bg px-3 py-2 font-mono text-xs md:hidden">
              <span className="size-[7px] rounded-full bg-green" />
              available for work
            </span>
          )}
          <div className="font-mono text-sm text-fg-3 md:text-[15px]">
            <span className="prompt">$</span> {hero.prompt}
          </div>
          <h1 className="text-[52px] leading-none font-semibold tracking-[-0.04em] md:text-7xl md:leading-[0.98] lg:text-[92px]">
            {hero.headline.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <div className="font-mono text-[15px] text-accent md:text-lg">{hero.role}</div>
          <p className="max-w-[560px] text-base/relaxed text-fg-2 md:text-[19px]">{hero.lede}</p>
          <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            {hero.secondaryCta && (
              <a href={hero.secondaryCta.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        <Window title={code.file} meta={code.lang} dots centerTitle shadow>
          <div className="flex gap-3.5 overflow-x-auto p-4 text-xs leading-[1.8] md:gap-5 md:px-6 md:pt-6 md:pb-7 md:text-sm md:leading-[1.85]">
            <pre className="text-right text-line-num" aria-hidden="true">
              {Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')}
            </pre>
            <pre className="text-fg">
              <span className="text-red">class</span> <span className="text-orange">{code.className}</span>
              {'\n  '}
              <span className="text-red">def</span> <span className="text-purple">initialize</span>
              {code.vars.map((v) => (
                <span key={v.name}>
                  {'\n    '}
                  <span className="text-blue">@{v.name}</span>
                  {' '.repeat(width - v.name.length)}= <span className={valueClass(v.value)}>{v.value}</span>
                </span>
              ))}
              {'\n  '}
              <span className="text-red">end</span>
              {'\n'}
              <span className="text-red">end</span>
            </pre>
          </div>
        </Window>
      </div>

      <dl className="grid grid-cols-2 border-y border-line bg-bg md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.value}
            className={[
              'flex flex-col gap-1.5 py-5 md:py-7',
              i % 2 === 1 ? 'border-l border-line pl-5' : '',
              i >= 2 ? 'border-t border-line md:border-t-0' : '',
              i > 0 ? 'md:border-l md:border-line md:pl-8' : '',
            ].join(' ')}
          >
            <dt className="text-[26px] font-semibold tracking-[-0.02em] md:text-4xl">{s.value}</dt>
            <dd className="font-mono text-xs text-fg-3 md:text-[13px]">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
