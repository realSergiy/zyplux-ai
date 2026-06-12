export const Paragraphs = ({ children }: { children: string[] }) =>
  children.map(paragraph => <p key={paragraph}>{paragraph}</p>);
