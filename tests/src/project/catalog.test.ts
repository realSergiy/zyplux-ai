import { Glob } from 'bun';
import { describe, expect, it } from 'bun:test';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dir, '../../../..');

const SPEC_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];

const CATALOG_OR_WORKSPACE = /^(?:catalog|workspace):/u;

const toEntries = (value: unknown) =>
  typeof value === 'object' && value !== null
    ? new Map<string, unknown>(Object.entries(value))
    : new Map<string, unknown>();

const readManifest = async (relativePath: string) => {
  const parsed: unknown = await Bun.file(path.join(REPO_ROOT, relativePath)).json();
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

const findManifestPaths = async () => {
  const root = await readManifest('package.json');
  const workspaces = toEntries(root.get('workspaces'));

  const paths = ['package.json'];
  for (const pattern of toEntries(workspaces.get('packages')).values()) {
    if (typeof pattern === 'string') {
      const glob = new Glob(`${pattern}/package.json`);
      for await (const match of glob.scan({ cwd: REPO_ROOT })) {
        paths.push(match);
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
