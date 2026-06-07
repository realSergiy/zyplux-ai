# @totvibe/ui

Shared UI components and utilities for the TotVibe monorepo.

## Exports

- `@totvibe/ui/lib/utils` - Utility functions (`cn()` for className merging)
- `@totvibe/ui/components/*` - UI components (Button, etc.)

## Usage

Import components directly from their source:

```typescript
import { Button } from '@totvibe/ui/components/button';
import { cn } from '@totvibe/ui/lib/utils';
```

## Stack

- **React 19** - Latest React
- **Tailwind CSS** - Utility-first styling
- **CVA** - Class Variance Authority for component variants
- **clsx + tailwind-merge** - Smart className composition

## Development

This package exports source TypeScript files directly (no build step). Consuming applications handle transpilation via Vite.
