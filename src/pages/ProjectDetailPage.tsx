import { ChevronLeft, Globe, Github } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { getProjectMarkdown } from "../data/projectMarkdown";
import { projects } from "../data/projects";

function getProjectLinkIcon(label: string) {
  if (label.toLowerCase().includes("github")) {
    return <Github className="h-3.5 w-3.5" />;
  }

  return <Globe className="h-3.5 w-3.5" />;
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const markdown = getProjectMarkdown(project.slug);

  return (
    <div className="grid gap-2 sm:grid-cols-12">
      <div className="sm:col-span-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          프로젝트 목록으로
        </Link>
      </div>

      <Card className="sm:col-span-12">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>
            {project.period} · {project.summary}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {markdown ? (
            <MarkdownRenderer markdown={markdown} />
          ) : (
            <p className="text-sm text-muted-foreground">
              프로젝트 본문이 아직 준비되지 않았습니다.
            </p>
          )}

          {project.links?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={`${project.slug}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {getProjectLinkIcon(link.label)}
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
