import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";

type MarkdownRendererProps = {
  markdown: string;
};

type MermaidDiagramProps = {
  chart: string;
};

function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const reactId = useId();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const diagramId = `mermaid-${reactId.replace(/:/g, "")}`;

    async function renderDiagram() {
      try {
        const { default: mermaid } = await import("mermaid");

        mermaid.initialize({
          securityLevel: "strict",
          startOnLoad: false,
          theme: "neutral",
        });

        const rendered = await mermaid.render(diagramId, chart);

        if (isActive) {
          setSvg(rendered.svg);
          setError(null);
        }
      } catch (reason) {
        if (isActive) {
          setSvg(null);
          setError(reason instanceof Error ? reason.message : "Invalid diagram");
        }
      }
    }

    void renderDiagram();

    return () => {
      isActive = false;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <pre className="mt-3 overflow-x-auto rounded-md border border-destructive/30 bg-muted p-3 text-xs leading-5 text-muted-foreground">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="mt-3 rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      className="mt-3 overflow-x-auto rounded-md border border-border bg-background p-3 [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokenPattern =
    /(\*\*[^*]+\*\*|`[^`]+`|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${match.index}-${token}`;

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-muted px-1.5 py-0.5 text-[0.85em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(
        <a
          key={key}
          href={match[3]}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-foreground underline underline-offset-4"
        >
          {match[2]}
        </a>,
      );
    }

    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const lines = markdown.trim().split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim().toLowerCase();
      const codeLines: string[] = [];

      index += 1;

      while (index < lines.length) {
        const codeLine = lines[index] ?? "";

        if (codeLine.trim() === "```") {
          index += 1;
          break;
        }

        codeLines.push(codeLine);
        index += 1;
      }

      const code = codeLines.join("\n");

      blocks.push(
        language === "mermaid" ? (
          <MermaidDiagram key={`mermaid-${index}`} chart={code} />
        ) : (
          <pre
            key={`code-${index}`}
            className="mt-3 overflow-x-auto rounded-md border border-border bg-muted p-3 text-xs leading-5 text-muted-foreground"
          >
            <code>{code}</code>
          </pre>
        ),
      );
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2
          key={`heading-${index}`}
          className="mt-5 text-sm font-semibold text-foreground first:mt-0"
        >
          {renderInline(line.slice(3))}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length) {
        const item = lines[index]?.trim() ?? "";

        if (!item.startsWith("- ")) {
          break;
        }

        items.push(item.slice(2));
        index += 1;
      }

      blocks.push(
        <ul
          key={`list-${index}`}
          className="mt-2 grid gap-1 text-sm text-muted-foreground"
        >
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index]?.trim() ?? "";

      if (
        !nextLine ||
        nextLine.startsWith("```") ||
        nextLine.startsWith("## ") ||
        nextLine.startsWith("- ")
      ) {
        break;
      }

      paragraphLines.push(nextLine);
      index += 1;
    }

    blocks.push(
      <p
        key={`paragraph-${index}`}
        className="mt-2 text-sm leading-6 text-muted-foreground first:mt-0"
      >
        {renderInline(paragraphLines.join(" "))}
      </p>,
    );
  }

  return <div>{blocks}</div>;
}
