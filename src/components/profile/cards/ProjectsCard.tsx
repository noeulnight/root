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
      className="col-span-2 block h-full w-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Projects"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            만들고 운영해 본 프로젝트를 정리했습니다.
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
