import {
  addDays,
  addMinutes,
  addMonths,
  addWeeks,
  format,
  startOfDay,
  startOfMinute,
} from "date-fns";
import { useMemo } from "react";
import type { CalendarUnit } from "@/data/calendar";
import { cn } from "@/lib/utils";

type CalendarDotGridProps = {
  startDate: Date;
  endDate: Date;
  unit: CalendarUnit;
  className?: string;
};

type CalendarDotPoint = {
  date: Date;
  isFilled: boolean;
};

function stepByUnit(date: Date, unit: CalendarUnit): Date {
  if (unit === "minute") {
    return addMinutes(date, 1);
  }

  if (unit === "day") {
    return addDays(date, 1);
  }

  if (unit === "week") {
    return addWeeks(date, 1);
  }

  return addMonths(date, 1);
}

function createDotPoints(
  startDate: Date,
  endDate: Date,
  unit: CalendarUnit,
): CalendarDotPoint[] {
  const normalize = unit === "minute" ? startOfMinute : startOfDay;
  const normalizedStart = normalize(startDate);
  const normalizedEnd = normalize(endDate);

  if (normalizedStart.getTime() > normalizedEnd.getTime()) {
    return [];
  }

  const current = normalize(new Date());
  const points: CalendarDotPoint[] = [];
  let cursor = normalizedStart;
  let guard = 0;

  while (cursor.getTime() <= normalizedEnd.getTime() && guard < 200000) {
    points.push({
      date: cursor,
      isFilled: cursor.getTime() <= current.getTime(),
    });
    cursor = stepByUnit(cursor, unit);
    guard += 1;
  }

  return points;
}

export function CalendarDotGrid({
  startDate,
  endDate,
  unit,
  className,
}: CalendarDotGridProps) {
  const points = useMemo(
    () => createDotPoints(startDate, endDate, unit),
    [startDate, endDate, unit],
  );

  if (points.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">표시할 기간이 없습니다.</p>
    );
  }

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-2", className)}>
      <p className="text-xs text-muted-foreground">
        {unit} · {points.length.toLocaleString()} points
      </p>
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="flex flex-wrap gap-1">
          {points.map((point, index) => (
            <span
              key={`${point.date.getTime()}-${index}`}
              className={cn(
                "h-2 w-2 rounded-full",
                point.isFilled
                  ? "bg-foreground/80"
                  : "bg-background/40",
              )}
              title={format(point.date, unit === "minute" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
