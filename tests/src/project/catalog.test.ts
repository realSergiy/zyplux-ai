import { existsSync, readdirSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

const SPEC_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];

const CATALOG_OR_WORKSPACE = /^(?:catalog|workspace):/u;

const toEntries = (value: unknown) =>
  typeof value === 'object' && value !== null
    ? new Map<string, unknown>(Object.entries(value))
    : new Map<string, unknown>();

const readManifest = async (relativePath: string) => {
  const parsed: unknown = JSON.parse(await readFile(path.join(REPO_ROOT, relativePath), 'utf8'));
  return toEntries(parsed);
};

const manifestName = (manifest: Map<string, unknown>, fallback: string) => {
  const name = manifest.get('name');
  return typeof name === 'string' ? name : fallback;
};

const collectSpecs = (manifest: Map<string, unknown>) => {
  const specs = new Map<string, string>();
  for (const field of SPEC_FIELDS) {
    for (const [dependency, spec] of toEntries(manifest.get(field))) {
      if (typeof spec === 'string') {
        specs.set(`${field} "${dependency}"`, spec);
      }
    }
  }
  return specs;
};

const expandWorkspace = (pattern: string) => {
  if (!pattern.endsWith('/*')) {
    return [pattern];
  }
  const parent = pattern.slice(0, -2);
  return readdirSync(path.join(REPO_ROOT, parent))
    .map(entry => `${parent}/${entry}`)
    .filter(relativeDir => statSync(path.join(REPO_ROOT, relativeDir)).isDirectory());
};

const findManifestPaths = async () => {
  const root = await readManifest('package.json');
  const workspaces = toEntries(root.get('workspaces'));

  const paths = ['package.json'];
  for (const pattern of toEntries(workspaces.get('packages')).values()) {
    if (typeof pattern === 'string') {
      for (const relativeDir of expandWorkspace(pattern)) {
        const manifestPath = `${relativeDir}/package.json`;
        if (existsSync(path.join(REPO_ROOT, manifestPath))) {
          paths.push(manifestPath);
        }
      }
    }
  }
  return paths.toSorted();
};

const manifests: { name: string; specs: Map<string, string> }[] = [];
for (const relativePath of await findManifestPaths()) {
  const manifest = await readManifest(relativePath);
  manifests.push({ name: manifestName(manifest, relativePath), specs: collectSpecs(manifest) });
}

describe('every workspace manifest sources dependencies from the catalog', () => {
  for (const manifest of manifests) {
    for (const [where, spec] of manifest.specs) {
      it(`${manifest.name} · ${where}`, () => {
        expect(spec).toMatch(CATALOG_OR_WORKSPACE);
      });
    }
  }
});
