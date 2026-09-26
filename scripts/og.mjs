// Renders scripts/og-template.html to public/og.png (400x400 square, so messengers use the thumbnail-left layout) using a local Chrome.
// Run: npm run og   (set CHROME_PATH if Chrome is somewhere else)
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 400, height: 400, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(here, 'og-template.html'), { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(here, '..', 'public', 'og.png') });
await browser.close();
console.log('wrote public/og.png');
