---
name: Locket
blurb: A local-first task planner for you and your AI agents. Projects and tickets in one SQLite file, with a built-in MCP server so agents work the same board you do.
category: desktop app
status: open source
active: true
language: typescript
license: MIT
started: "2026"
topics: [electron, react, sqlite, mcp]
installCommand: "claude mcp add --transport http locket http://127.0.0.1:7821/mcp"
github: https://github.com/nkavt/Locket
cover: ./locket-cover.png
coverAlt: Locket showing a Portfolio project with tickets grouped by status
demo: ./locket-demo.gif
demoVideo: ./locket-demo.mp4
demoAlt: Opening a ticket in Locket, moving it to In Progress and leaving a comment
icon: lock
order: 1
---

## What it does

Locket is a desktop app for planning work in projects and tickets. Everything is stored in a SQLite database on your machine: no account, no sync, no network calls. It also runs a built-in MCP server, so any MCP-capable agent can read and update the same tickets you see in the app, and their changes show up immediately.

## Getting started

```shell
# start the MCP server from Settings, then point Claude Code at it
$ claude mcp add --transport http locket http://127.0.0.1:7821/mcp

# develop
$ npm install && npm run dev
```

## How it works

Electron main process with SQLite through TypeORM, a React renderer, and one service layer shared by the renderer IPC and the MCP server.

1. **Local only** One SQLite file holds projects, tickets, labels and comments. Nothing leaves the machine.
2. **One service layer** The MCP tools and the app's IPC handlers call the same services, so agents and humans get identical behaviour.
3. **Streamable HTTP MCP** Ten tools and two resources, exposed on localhost so any client can attach without extra config.

## Contributing

Issues and pull requests are welcome on GitHub. Requires Node 22. Tests run through Electron's node so SQLite loads, with `npm test`.
