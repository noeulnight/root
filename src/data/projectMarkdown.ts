const projectMarkdownFiles = import.meta.glob<string>(
  "../content/projects/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  },
);

const projectMarkdownBySlug = new Map(
  Object.entries(projectMarkdownFiles).map(([path, markdown]) => {
    const fileName = path.split("/").at(-1) ?? "";
    const slug = fileName.replace(/\.md$/, "");

    return [slug, markdown] as const;
  }),
);

export function getProjectMarkdown(slug: string) {
  return projectMarkdownBySlug.get(slug);
}
