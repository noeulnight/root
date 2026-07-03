import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useTraccarLocation } from "@/hooks/useTraccarLocation";
import { InteractiveCardLink } from "./InteractiveCardLink";

type LocationCardProps = {
  order: number;
};

export function LocationCard({ order }: LocationCardProps) {
  const { location, isLoading, error } = useTraccarLocation();

  const currentGeofenceNames =
    location?.currentGeofenceNames.join(", ") ?? "";
  const primaryText = isLoading
    ? "조회 중"
    : error
      ? "정보 없음."
      : currentGeofenceNames || "이동 중";

  return (
    <InteractiveCardLink
      mode="none"
      className="col-span-2 block h-full w-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Location"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>현재 위치</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xl font-semibold tracking-tight text-foreground">
            {primaryText}
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
