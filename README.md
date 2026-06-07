# Getting Started

## Prerequisites

- [bun](https://bun.sh) 1.3+
- [just](https://just.systems)

## Install

```bash
just install
```

## Development

```bash
just dev
```

Starts the Vite dev server on port 5173.

## Quality Gate

```bash
just check
```

Runs install, knip, typecheck, lint, and test with autofix throughout.

## Build and Deploy

```bash
just build
just deploy
```

Builds `apps/web/dist` and deploys it to Cloudflare via wrangler.
