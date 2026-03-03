import { startOfDay } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export type CalendarUnit = "day" | "week" | "monthly";

export type CalendarItem = {
  id: string;
  startDate: Date;
  endDate: Date;
  unit: CalendarUnit;
  title: string;
  description: string;
};

export const calendar: CalendarItem[] = [
  {
    id: "life",
    startDate: fromZonedTime("2005-10-12", "Asia/Seoul"),
    endDate: fromZonedTime("2105-10-12", "Asia/Seoul"),
    unit: "week",
    title: "Life",
    description: "100세 캘린더",
  },
  {
    id: "discharge",
    startDate: fromZonedTime("2025-01-08", "Asia/Seoul"),
    endDate: fromZonedTime("2027-11-07", "Asia/Seoul"),
    unit: "day",
    title: "Discharge",
    description: "산업기능요원 복무 만료",
  },
];

export function getCalendarById(id: string) {
  return calendar.find((item) => item.id === id);
}

export function getCalendarProgressRatio(
  startDate: Date,
  endDate: Date,
  baseDate: Date = new Date(),
) {
  const start = startOfDay(startDate).getTime();
  const end = startOfDay(endDate).getTime();
  const current = startOfDay(baseDate).getTime();

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
