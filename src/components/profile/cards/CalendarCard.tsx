import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type CalendarCardProps = {
  order: number;
};

export function CalendarCard({ order }: CalendarCardProps) {
  return (
    <InteractiveCardLink
      mode="internal"
      to="/calendar"
      className="block h-full w-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Calendar"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>
            다양한 캘린더와 진행률을 모아놓았습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            캘린더 보기
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
