import { Globe, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { projectsByStartDateDesc } from "../data/projects";

function getProjectLinkIcon(label: string) {
  if (label.toLowerCase().includes("github")) {
    return <Github className="h-3.5 w-3.5" />;
  }

  return <Globe className="h-3.5 w-3.5" />;
}

export function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-2 sm:grid-cols-12">
      {projectsByStartDateDesc.map((project) => (
        <Card
          key={project.slug}
          role="link"
          tabIndex={0}
          onClick={() => navigate(`/projects/${project.slug}`)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              navigate(`/projects/${project.slug}`);
            }
          }}
          className="cursor-pointer sm:col-span-12"
        >
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>
              {project.period} · {project.summary}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={`${project.slug}-${tech}`}
                  className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">
              {project.highlights.map((highlight) => (
                <li key={`${project.slug}-${highlight}`} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.links?.map((link) => (
                <a
                  key={`${project.slug}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {getProjectLinkIcon(link.label)}
                  {link.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
