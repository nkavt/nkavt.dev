// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nkavt.dev',
  // Fetch a page into the cache on hover so the click feels instant; cards use the viewport strategy.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [react()],
  // Markdown images get a srcset, so README screenshots stay sharp on retina screens without sending phones the full-size file.
  image: { layout: 'constrained' },
  // Fonts are downloaded at build time and served from our own domain, with metric-matched fallbacks to avoid layout shift.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-geist',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});