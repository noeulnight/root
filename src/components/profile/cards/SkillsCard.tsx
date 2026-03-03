import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type SkillsCardProps = {
  order: number;
};

export function SkillsCard({ order }: SkillsCardProps) {
  return (
    <InteractiveCardLink
      mode="internal"
      to="/skills"
      className="block h-full w-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Skills"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>
            핵심 기술 스택과 인프라 운영 경험을 정리했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            기술 스택 보기
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
