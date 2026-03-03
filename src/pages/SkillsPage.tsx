import { Layers3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { skillCategories } from "../data/skills";

export function SkillsPage() {
  return (
    <div className="grid gap-2 sm:grid-cols-12">
      {skillCategories.map((category) => (
        <Card key={category.title} className="sm:col-span-6">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              <Layers3 className="h-4 w-4 text-muted-foreground" />
              <span>{category.title}</span>
            </CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={`${category.title}-${skill}`}
                className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {skill}
              </span>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
