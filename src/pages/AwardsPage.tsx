import { Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { cn } from "../lib/utils";
import { awards } from "../data/awards";

export function AwardsPage() {
  return (
    <div className="grid gap-2 sm:grid-cols-12">
      {awards.map((award) => (
        <Card
          key={award.slug}
          className={cn(
            "sm:col-span-12",
            award.highlight && "border border-amber-300/60",
          )}
        >
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span>{award.title}</span>
            </CardTitle>
            <CardDescription>
              {award.date} · {award.summary}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {award.organization ? (
              <p className="text-sm text-muted-foreground">
                {award.organization}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
