import {
  format,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export type CalendarUnit = "day" | "week" | "monthly" | "minute";

export type CalendarItem = {
  id: string;
  startDate: Date;
  endDate: Date;
  unit: CalendarUnit;
  title: string;
  description?: string;
};

const isWeekdays = (date: Date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
};

export function getCalendar(baseDate: Date = new Date()): CalendarItem[] {
  return [
    ...(isWeekdays(baseDate)
      ? [
          {
            id: "getoffwork",
            startDate: fromZonedTime(
              setMilliseconds(
                setSeconds(setMinutes(setHours(baseDate, 8), 0), 0),
                0,
              ),
              "Asia/Seoul",
            ),
            endDate: fromZonedTime(
              setMilliseconds(
                setSeconds(setMinutes(setHours(baseDate, 17), 0), 0),
                0,
              ),
              "Asia/Seoul",
            ),
            unit: "minute" as const,
            title: "근무",
          },
        ]
      : []),
  {
    id: "discharge",
    startDate: fromZonedTime("2025-01-08", "Asia/Seoul"),
    endDate: fromZonedTime("2027-11-07", "Asia/Seoul"),
    unit: "day",
    title: "산업기능요원 복무 만료",
  },
  {
    id: "life",
    startDate: fromZonedTime("2005-10-12", "Asia/Seoul"),
    endDate: fromZonedTime("2105-10-12", "Asia/Seoul"),
    unit: "week",
    title: "Life Calendar",
  },
  ];
}

export const calendar = getCalendar();

export function getCalendarById(id: string, baseDate: Date = new Date()) {
  return getCalendar(baseDate).find((item) => item.id === id);
}

export function getCalendarProgressRatio(
  startDate: Date,
  endDate: Date,
  baseDate: Date = new Date(),
) {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const current = baseDate.getTime();

  if (end <= start) {
    return current >= end ? 1 : 0;
  }

  if (current <= start) {
    return 0;
  }

  if (current >= end) {
    return 1;
  }

  return (current - start) / (end - start);
}

export function getCalendarProgressPercent(
  startDate: Date,
  endDate: Date,
  baseDate: Date = new Date(),
) {
  return getCalendarProgressRatio(startDate, endDate, baseDate) * 100;
}

export function getCalendarDateRange(item: CalendarItem) {
  const dateFormat = item.unit === "minute" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
  return `${format(item.startDate, dateFormat)} - ${format(item.endDate, dateFormat)}`;
}
