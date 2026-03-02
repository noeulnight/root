import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type HomelabCardProps = {
  order: number;
};

export function HomelabCard({ order }: HomelabCardProps) {
  return (
    <InteractiveCardLink
      mode="internal"
      to="/homelab"
      className="block aspect-2/1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-8"
      ariaLabel="Homelab"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Homelab</CardTitle>
          <CardDescription>홈랩에서 운영 중인 앱 목록입니다.</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            홈랩 서비스 보기
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
