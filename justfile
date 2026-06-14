set shell := ["bash", "-euo", "pipefail", "-c"]

alias i := install
alias d := dev
alias b := build
alias k := knip
alias tc := typecheck
alias l := lint
alias t := test
alias c := check
alias u := upgrade
alias ui := upgrade-interactive

# List available recipes.
default:
    @just --list

# Install JS dependencies.
install:
    bun install

# Serve the web app with the Vite dev server (HMR).
dev *args:
    bun run dev {{ args }}

# Build the web app — produces apps/web/dist consumed by `wrangler deploy`.
build:
    bun run build

# Find unused files, dependencies, and exports across the workspace.
knip:
    bun run knip

# Typecheck every workspace package.
typecheck:
    bun run typecheck

# Lint and format every workspace package: eslint --fix + prettier --write.
lint:
    uv run rumdl check --fix
    bun run lint:fix
    bun run format

# Run all workspace tests with bun test.
test:
    bun run test

# Full gate: install, knip, typecheck, lint, build, test — autofix throughout.
check: install knip typecheck lint test

# Reproduce the GitHub Actions CI run locally inside the same Bun container.
# An anonymous volume masks node_modules so the host install is left untouched.
ci:
    podman run --rm \
        -v {{ justfile_directory() }}:/work \
        -v /work/node_modules \
        -w /work \
        oven/bun:1.3.14-debian \
        sh -euc 'apt-get update && apt-get install -y --no-install-recommends git ca-certificates && bun install --frozen-lockfile && bun run build && bun run knip && bun run typecheck && bun run lint && bunx prettier --check . && bun run test'

# Deploy the web app to Cloudflare (vite build + wrangler deploy).
deploy:
    bun --filter @zyplux/web deploy

# Render the social share card to apps/web/og-preview.png for a quick visual check.
# The deployed image (dist/og.png) is generated automatically by the Vite build.
og:
    bun --filter @zyplux/web og

# Upgrade JS dependencies across the workspace via ncu (catalog-aware). Forwards extra args (e.g. `just u -i`).
upgrade *args='':
    bun run upgrade -- {{ args }}

# Interactively select and apply upgrades, then reinstall.
upgrade-interactive:
    bun run upgrade -- -i
    bun install

clone repo ref="":
    scripts/clone_reference.py {{ repo }} {{ ref }}
