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

  vite: {
    plugins: [tailwindcss()]
  }
});