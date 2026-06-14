declare module 'virtual:insights-frontmatter' {
  type InsightsFrontmatter = {
    date: string;
    description: string;
    draft?: boolean;
    title: string;
  };
  const frontmatter: Record<string, InsightsFrontmatter>;
  export default frontmatter;
}
