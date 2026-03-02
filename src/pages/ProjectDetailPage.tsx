import { ChevronLeft, Globe, Github } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
          <h3 className="text-sm font-semibold text-foreground">
            프로젝트 개요
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.overview}
          </p>

          <h3 className="mt-4 text-sm font-semibold text-foreground">
            기술 스택
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={`${project.slug}-${tech}`}
                className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <h3 className="mt-4 text-sm font-semibold text-foreground">
            문제 인식
          </h3>
          <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
            {project.problem.map((item) => (
              <li
                key={`${project.slug}-problem-${item}`}
                className="flex gap-2"
              >
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-foreground">
            구현 내용
          </h3>
          <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
            {project.implementation.map((item) => (
              <li
                key={`${project.slug}-implementation-${item}`}
                className="flex gap-2"
              >
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-foreground">성과</h3>
          <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
            {project.outcomes.map((item) => (
              <li
                key={`${project.slug}-outcome-${item}`}
                className="flex gap-2"
              >
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-foreground">
            핵심 요약
          </h3>
          <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
            {project.highlights.map((highlight) => (
              <li key={`${project.slug}-${highlight}`} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

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
