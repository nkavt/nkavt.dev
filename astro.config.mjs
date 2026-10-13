// @ts-check
import { defineConfig } from 'astro/config';

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

  vite: {
    plugins: [tailwindcss()]
  }
});