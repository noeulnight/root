import { ChevronLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CalendarDotGrid } from "@/components/calendar/CalendarDotGrid";
import {
  getCalendarById,
  getCalendarProgressPercent,
  getCalendarProgressRatio,
  getCalendarDateRange,
} from "@/data/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function CalendarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const calendarItem = id ? getCalendarById(id) : undefined;

  if (!calendarItem) {
    return <Navigate to="/calendar" replace />;
  }

  const progressPercent = getCalendarProgressPercent(
    calendarItem.startDate,
    calendarItem.endDate,
  );
  const progressWidth = (getCalendarProgressRatio(
    calendarItem.startDate,
    calendarItem.endDate,
  ) * 100).toFixed(2);

  return (
    <div className="grid gap-2 sm:grid-cols-12">
      <div className="sm:col-span-12">
        <Link
          to="/calendar"
          className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          캘린더 목록으로
        </Link>
      </div>

      <Card className="sm:col-span-12">
        <CardHeader>
          <CardTitle>{calendarItem.title}</CardTitle>
          <CardDescription>
            {calendarItem.description} ({getCalendarDateRange(calendarItem)})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">Progress</span>
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

          <CalendarDotGrid
            startDate={calendarItem.startDate}
            endDate={calendarItem.endDate}
            unit={calendarItem.unit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
