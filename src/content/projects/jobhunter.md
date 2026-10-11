---
name: Jobhunter
blurb: An AI job hunter for your terminal. It reads your CV, checks remote job boards, scores every new job against your profile, and tracks them all in a Google Sheet in your own Drive.
category: cli tool
status: open source
active: true
language: typescript
license: MIT
started: "2026"
topics: [cli, node, claude, google-sheets]
installCommand: "npm install -g jobhunter"
github: https://github.com/nkavt/jobhunter
docs: { label: "npm package", href: "https://www.npmjs.com/package/jobhunter" }
terminal:
  - "$ jobhunter hunt"
  - "✔ Remotive: 18 jobs"
  - "✔ Remote OK: 99 jobs"
  - "✔ We Work Remotely: 89 jobs"
  - "✔ Checked your sheet"
  - "✔ Scored 35 jobs"
  - ""
  - "Best matches:"
  - " 92  Senior Full-Stack Engineer · Acme (Remotive)"
  - "     Strong match: 6 years of React and Node.js, fully remote."
  - " 85  Product Engineer · Globex (We Work Remotely)"
  - "     Good fit for TypeScript and Rails; EU timezones only."
  - " 71  Frontend Engineer · Initech (Remote OK)"
  - "     Solid React overlap; asks for 2 years of Vue."
  - ""
  - "✔ 206 jobs · 171 ignored · 12 To apply · 23 Skipped"
icon: target
order: 2
---

## What it does

Jobhunter is a command-line tool that finds jobs worth applying to. It turns your CV into a short candidate profile, fetches Remotive, Remote OK and We Work Remotely, and asks an AI to score each new job from 0 to 100 with a short note on fit, gaps and things to watch for. Everything goes into a Google Sheet with status tabs, so you never see the same job twice.

## Getting started

```shell
# install (Node 22.12+)
$ npm install -g jobhunter

# one-time setup: AI key, CV, preferences, Google sign-in, tracking sheet
$ jobhunter init

# find new jobs and add them to your sheet
$ jobhunter hunt
```

## How it works

A TypeScript CLI that keeps your keys and profile on your machine and talks to Google only through the files it created.

1. **CV as the source of truth** PDF, DOCX or Markdown CVs become a candidate profile, refined with a few preferences the CV can't answer: work mode, countries, visa, salary floor.
2. **Cheap filters first, AI second** Code drops jobs that clearly don't fit (role, age, employment type, salary, companies to avoid). Only what's left is sent to Claude, so a daily hunt costs a few cents.
3. **Declarative feed mappings** Each job board is described by a mapping of fields and transforms rather than custom parser code, so adding a feed is data, not a new scraper.
4. **Your sheet, your Drive** The `drive.file` scope means Jobhunter can only see the folder and sheet it created. Jobs already in any tab, including ones you added by hand, are skipped.

## Contributing

Early version (0.1) and in active development: more AI providers, more boards, and AI-assisted feed discovery are next. Issues and ideas are welcome on GitHub. Tests run with `npm test` and never touch your real config or the network.
