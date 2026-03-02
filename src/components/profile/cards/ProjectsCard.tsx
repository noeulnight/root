import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type ProjectsCardProps = {
  order: number;
};

export function ProjectsCard({ order }: ProjectsCardProps) {
  return (
    <InteractiveCardLink
      mode="internal"
      to="/projects"
      className="block w-full h-full aspect-2/1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-8"
      ariaLabel="Projects"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            진행했던 주요 프로젝트를 정리했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            프로젝트 목록 보기
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
