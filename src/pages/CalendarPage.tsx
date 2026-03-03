import {
  calendar,
  getCalendarProgressPercent,
  getCalendarProgressRatio,
} from "@/data/calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function CalendarPage() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-2 sm:grid-cols-12">
      {calendar.map((cal) => {
        const progressPercent = getCalendarProgressPercent(
          cal.startDate,
          cal.endDate,
        );
        const progressWidth = (getCalendarProgressRatio(
          cal.startDate,
          cal.endDate,
        ) * 100).toFixed(2);

        return (
          <Card
            key={cal.id}
            role="link"
            tabIndex={0}
            onClick={() => navigate(`/calendar/${cal.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(`/calendar/${cal.id}`);
              }
            }}
            className="cursor-pointer sm:col-span-12"
          >
            <CardHeader>
              <CardTitle>{cal.title}</CardTitle>
              <CardDescription>
                {cal.description} ({format(cal.startDate, "yyyy-MM-dd")} -{" "}
                {format(cal.endDate, "yyyy-MM-dd")})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-muted-foreground">
                    Progress
                  </span>
                  <span className="font-semibold text-foreground">
                    {progressPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground transition-all"
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
