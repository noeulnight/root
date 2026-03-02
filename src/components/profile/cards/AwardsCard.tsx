import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type AwardsCardProps = {
  order: number;
};

export function AwardsCard({ order }: AwardsCardProps) {
  return (
    <InteractiveCardLink
      mode="internal"
      to="/awards"
      className="block h-full w-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Awards"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Awards</CardTitle>
          <CardDescription>수상 이력과 대회 기록입니다.</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            수상 이력 보기
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
