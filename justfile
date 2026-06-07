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
    bun run lint:fix
    bun run format

# Run all workspace tests with bun test.
test:
    bun run test

# Full gate: install, knip, typecheck, lint, test — autofix throughout.
check: install knip typecheck lint test

# Deploy the web app to Cloudflare (vite build + wrangler deploy).
deploy:
    bun --filter @zyplux/web deploy

# Regenerate the social share image (apps/web/public/og.png) from apps/web/og-image.html.
og-image:
    chromium --headless --disable-gpu --hide-scrollbars --force-color-profile=srgb --window-size=1200,630 --virtual-time-budget=10000 --screenshot=apps/web/public/og.png "file://$(pwd)/apps/web/og-image.html"

# Upgrade JS dependencies across the workspace via ncu (catalog-aware). Forwards extra args (e.g. `just u -i`).
upgrade *args='':
    bun run upgrade -- {{ args }}

# Interactively select and apply upgrades, then reinstall.
upgrade-interactive:
    bun run upgrade -- -i
    bun install
