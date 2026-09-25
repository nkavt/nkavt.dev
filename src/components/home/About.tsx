import Section from '../Section';
import Window from '../Window';

const stack: Record<string, string[]> = {
  backend: ['rails', 'node.js', 'laravel', 'rest apis'],
  frontend: ['react', 'typescript', 'next.js', 'hotwire'],
  data: ['mysql', 'firestore'],
  testing: ['capybara', 'jest', 'phpunit'],
  cloud: ['gcp', 'docker', 'gitlab ci'],
  ai: ['claude code', 'mcp'],
  speaks: ['georgian', 'english'],
};

const keys = Object.keys(stack);
const pad = Math.max(...keys.map((k) => k.length)) + 3;

export default function About() {
  return (
    <Section id="about" number="03" title="About and stack">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5 text-base leading-[1.7] text-fg-2 md:text-lg">
          <p>
            I like owning a problem from the first question to the last deploy. In my last role I found the
            issues, designed the solutions and made the technical decisions in my area.
          </p>
          <p>
            I switch stacks fast (I was shipping Rails code within a week of starting with it) and I care about
            the unglamorous parts: tests, performance and clean handovers. I have also mentored teammates through
            onboarding and probation.
          </p>
        </div>

        <Window title="stack.json" meta="json">
          <pre className="overflow-x-auto p-4 text-xs leading-[1.85] text-fg md:p-6 md:text-sm">
            {'{\n'}
            {keys.map((key, i) => (
              <span key={key}>
                {'  '}
                <span className="text-blue">"{key}"</span>
                {':'}
                {' '.repeat(pad - key.length)}
                {'['}
                {stack[key].map((v, j) => (
                  <span key={v}>
                    {j > 0 && ', '}
                    <span className="text-blue-light">"{v}"</span>
                  </span>
                ))}
                {']'}
                {i < keys.length - 1 ? ',' : ''}
                {'\n'}
              </span>
            ))}
            {'}'}
          </pre>
        </Window>
      </div>
    </Section>
  );
}
