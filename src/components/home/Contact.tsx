import { site } from '../../data/site';
import Section from '../Section';
import Window from '../Window';
import Footer from '../Footer';

export default function Contact() {
  return (
    <Section id="contact" number="04" title="Get in touch" className="pb-7 md:min-h-[60vh] md:pb-10">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-[34px] leading-[1.02] font-semibold tracking-[-0.035em] md:text-[44px] lg:text-[56px]">
            Hiring a senior full-stack engineer?
          </h3>
          <p className="text-base/relaxed text-fg-2 md:text-lg">
            I am open to senior full-stack and backend roles, remote or in Tbilisi. My inbox is open.
          </p>
          <a href={`mailto:${site.email}`} className="btn self-stretch btn-primary md:self-start md:px-6 md:py-4">
            say hello →
          </a>
        </div>

        <Window title="zsh · contact" dots>
          <div className="flex flex-col gap-3 p-5 font-mono text-[13px] md:gap-3.5 md:p-7 md:text-[15px]">
            <div>
              <span className="prompt">$</span> cat contact.txt
            </div>
            <dl className="grid grid-cols-[76px_1fr] gap-y-2.5 md:grid-cols-[110px_1fr] md:gap-y-3.5 md:pl-4.5 [&_dd]:wrap-anywhere [&_dt]:text-muted">
              <dt>email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
              <dt>github</dt>
              <dd>
                <a href={site.github.href} target="_blank" rel="noopener noreferrer">{site.github.label}</a>
              </dd>
              <dt>linkedin</dt>
              <dd>
                <a href={site.linkedin.href} target="_blank" rel="noopener noreferrer">{site.linkedin.label}</a>
              </dd>
              <dt>location</dt>
              <dd>{site.location}</dd>
            </dl>
            <div className="flex items-center gap-2">
              <span className="prompt">$</span>
              <span className="h-4.5 w-2.25 animate-blink bg-fg" aria-hidden="true" />
            </div>
          </div>
        </Window>
      </div>

      <Footer inline right={<span>built with astro · hosted on github pages</span>} />
    </Section>
  );
}
