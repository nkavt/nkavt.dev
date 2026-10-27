---
name: Jobhunter
blurb: An AI job hunter for your terminal. It reads your CV, checks remote job boards and companies' own careers pages, scores every new job against your profile with Claude, Gemini or any OpenAI-compatible model, and tracks them all in a spreadsheet on your computer or in Google Sheets.
category: cli tool
status: open source
active: true
language: typescript
license: MIT
started: "2026"
topics: [cli, node, claude, gemini, openai, xlsx, google-sheets]
installCommand: "npm install -g jobhunter"
github: https://github.com/nkavt/jobhunter
docs: { label: "npm package", href: "https://www.npmjs.com/package/jobhunter" }
terminal:
  - "$ jobhunter hunt"
  - "✔ Remotive: 18 jobs"
  - "✔ Remote OK: 99 jobs"
  - "✔ We Work Remotely: 89 jobs"
  - "✔ Company job boards: 41 jobs from 12 boards"
  - "✔ Checked your sheet"
  - "✔ Scored 35 jobs"
  - ""
  - "Best matches:"
  - " 92  Senior Full-Stack Engineer · Acme (Remotive)"
  - "     Strong match: 6 years of React and Node.js, fully remote."
  - " 88  Frontend Engineer · Initech (Greenhouse)"
  - "     React and design-system work fits; remote in Europe."
  - " 85  Product Engineer · Globex (We Work Remotely)"
  - "     Good fit for TypeScript and Rails; EU timezones only."
  - ""
  - "✔ 247 jobs · 212 ignored · 12 To apply · 23 Skipped"
icon: target
order: 2
---

## What it does

Jobhunter is a command-line tool that finds jobs worth applying to. It turns your CV into a short candidate profile, fetches Remotive, Remote OK and We Work Remotely plus the Greenhouse, Lever, Ashby and Workable boards of companies hiring for your roles, and asks an AI (Claude, Gemini, or any OpenAI-compatible API such as OpenAI, OpenRouter or a local Ollama) to score each new job from 0 to 100 with a short note on fit, gaps and things to watch for. Everything goes into a tracking spreadsheet with status tabs, so you never see the same job twice. By default it's an `.xlsx` file on your computer, with no Google account needed; a Google Sheet in your Drive is the alternative.

## Getting started

```shell
# install (Node 22.12+)
$ npm install -g jobhunter

# one-time setup: AI key, CV, preferences, tracking sheet, web search
$ jobhunter init

# find new jobs and add them to your sheet
$ jobhunter hunt

# about once a week: find companies' own job boards
$ jobhunter companies find
```

## How it works

A TypeScript CLI that keeps your keys, profile and, by default, your tracking sheet on your machine.

1. **CV as the source of truth** PDF, DOCX or Markdown CVs become a candidate profile, refined with a few preferences the CV can't answer: work mode, countries, visa, salary floor.
2. **Cheap filters first, AI second** Code drops jobs that clearly don't fit (role, age, employment type, salary, companies to avoid). Only what's left is sent to the AI, scored in parallel batches, so a daily hunt is quick and costs a few cents.
3. **Jobs straight from the companies** Many companies post only on their own careers page. `jobhunter companies find` runs `site:` searches for your roles on Greenhouse, Lever, Ashby and Workable through SerpApi, Brave, your AI's own web search or keyless DuckDuckGo, remembers the boards, and every `hunt` reads them. Progress is saved after each search, so a rate limit or Ctrl+C just resumes next run.
4. **Pluggable AI providers** Claude, Gemini (free tier works) or any OpenAI-compatible endpoint, behind one interface with structured output and per-run token usage.
5. **Declarative feed mappings** Each job board is described by a mapping of fields and transforms rather than custom parser code, so adding a feed is data, not a new scraper.
6. **A local sheet, or your Drive** The default `.xlsx` file is written by a small built-in reader/writer, with the same tabs, dropdowns and status colours as the Google Sheet, live view tabs in LibreOffice and Excel, and a backup on every write. With Google Sheets, the `drive.file` scope means Jobhunter can only see the folder and sheet it created. Either way, jobs already in any tab, including ones you added by hand, are skipped.

## Contributing

Early version (0.5) and in active development: AI-assisted feed discovery, adding your own feeds, and a built-in Google sign-in are next. Issues and ideas are welcome on GitHub. Tests run with `npm test` and never touch your real config or the network.
