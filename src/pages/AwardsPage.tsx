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
          key={`${award.date}-${award.title}`}
          className={cn(
            "aspect-square sm:col-span-4",
            award.highlight && "border-2 border-amber-500",
          )}
        >
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span>{award.title}</span>
            </CardTitle>
            <CardDescription>{award.date}</CardDescription>
          </CardHeader>
          {award.organization ? (
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {award.organization}
              </p>
            </CardContent>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
