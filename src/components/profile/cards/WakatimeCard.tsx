import { secondsToHours } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";
import { useWakapiAllTime } from "../../../hooks/useWakapiAllTime";

type WakatimeCardProps = {
  order: number;
};

export function WakatimeCard({ order }: WakatimeCardProps) {
  const {
    totalSeconds,
    isLoading: isWakapiLoading,
    error: wakapiError,
  } = useWakapiAllTime();
  const totalText = isWakapiLoading
    ? "불러오는 중..."
    : wakapiError
      ? "데이터를 불러오지 못했습니다."
      : `${secondsToHours(totalSeconds ?? 0).toLocaleString()}시간`;

  return (
    <InteractiveCardLink
      mode="external"
      href="https://wakatime.lth.so"
      className="block w-full h-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Wakatime"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Wakatime</CardTitle>
          <CardDescription>누적 코딩 시간</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xl font-semibold tracking-tight text-foreground">
            {totalText}
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
