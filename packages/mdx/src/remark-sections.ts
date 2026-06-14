import type { BlockContent, DefinitionContent, Heading, Paragraph, Root, RootContent } from 'mdast';
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { Plugin, Transformer } from 'unified';

import { parse } from 'yaml';

const HEADING_ATTR_SUFFIX = /^(?<title>.*\S)\s+\[(?<tokens>[^\]]+)\]$/;

const isSectionsDocument = (tree: Root) => {
  const frontmatterNode = tree.children.find(node => node.type === 'yaml');
  if (!frontmatterNode) return false;
  const meta: unknown = parse(frontmatterNode.value);
  return typeof meta === 'object' && meta !== null && 'sections' in meta && meta.sections === true;
};

const transformSections: Transformer<Root> = (tree, file) => {
  if (!isSectionsDocument(tree)) return;

  const blockOf = (node: RootContent) => {
    switch (node.type) {
      case 'blockquote':
      case 'code':
      case 'definition':
      case 'footnoteDefinition':
      case 'heading':
      case 'html':
      case 'list':
      case 'mdxFlowExpression':
      case 'mdxJsxFlowElement':
      case 'paragraph':
      case 'table':
      case 'thematicBreak': {
        return node;
      }
      default: {
        return file.fail(`a "${node.type}" block cannot appear inside a section`, { place: node.position });
      }
    }
  };

  const sectionAttributes = (heading: Heading) => {
    const raw = heading.children
      .map(child =>
        child.type === 'text'
          ? child.value
          : file.fail('section headings must be plain text', { place: heading.position }),
      )
      .join('');
    const match = HEADING_ATTR_SUFFIX.exec(raw);
    const attributes: MdxJsxAttribute[] = [
      { name: 'heading', type: 'mdxJsxAttribute', value: match?.groups?.['title'] ?? raw },
    ];
    for (const token of match?.groups?.['tokens']?.split(/\s+/) ?? []) {
      if (token.startsWith('#')) {
        attributes.push({ name: 'id', type: 'mdxJsxAttribute', value: token.slice(1) });
      } else if (token === '.centered') {
        attributes.push({ name: 'centered', type: 'mdxJsxAttribute' });
      } else if (token === '.narrow' || token === '.slim') {
        attributes.push({ name: 'width', type: 'mdxJsxAttribute', value: token.slice(1) });
      } else {
        file.fail(`unknown section attribute "${token}" — expected #id, .narrow, .slim, or .centered`, {
          place: heading.position,
        });
      }
    }
    return attributes;
  };

  const sectionOf = (heading: Heading, body: RootContent[]) => {
    const intro: Paragraph[] = [];
    for (const node of body) {
      if (node.type !== 'paragraph') break;
      intro.push(node);
    }
    const rest = body.slice(intro.length).map(node => blockOf(node));
    const children: (BlockContent | DefinitionContent)[] =
      intro.length === 0
        ? rest
        : [
            {
              attributes: intro.length === 1 ? [{ name: 'centered', type: 'mdxJsxAttribute' }] : [],
              children: intro,
              name: 'Intro',
              type: 'mdxJsxFlowElement',
            },
            ...rest,
          ];
    const section: MdxJsxFlowElement = {
      attributes: sectionAttributes(heading),
      children,
      name: 'Section',
      type: 'mdxJsxFlowElement',
    };
    return section;
  };

  const grouped: RootContent[] = [];
  let openHeading: Heading | undefined;
  let openBody: RootContent[] = [];

  const flushSection = () => {
    if (openHeading === undefined) return;
    grouped.push(sectionOf(openHeading, openBody));
    openHeading = undefined;
    openBody = [];
  };

  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth === 2) {
      flushSection();
      openHeading = node;
    } else if (openHeading === undefined) {
      grouped.push(node);
    } else {
      openBody.push(node);
    }
  }
  flushSection();
  tree.children = grouped;
};

export const remarkSections: Plugin<[], Root> = () => transformSections;
