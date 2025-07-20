import React, { useMemo } from "react";
import { format, addDays, addWeeks, addMonths, addYears, isBefore } from "date-fns";
import GenerateCalendar from "./GenerateCalendar";

export default function RecurringDateGenerator({ startDate, endDate, repeatType, interval, unit }) {
  // Convert input strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

 let recurringDates = [];
if (startDate && endDate) {
  let current = new Date(startDate);
  const end = new Date(endDate);

  if (repeatType) {
    while (current <= end) {
      recurringDates.push(format(current, "yyyy-MM-dd"));
      if (repeatType === "Daily") current = addDays(current, 1);
      if (repeatType === "Weekly") current = addWeeks(current, 1);
      if (repeatType === "Monthly") current = addMonths(current, 1);
      if (repeatType === "Yearly") current = addYears(current, 1);
    }
  } else if (interval && unit) {
    interval = Number(interval);
    const lowerUnit = unit.toLowerCase();
    while (current <= end) {
      recurringDates.push(format(current, "yyyy-MM-dd"));
      if (lowerUnit === "days") current = addDays(current, interval);
      if (lowerUnit === "weeks") current = addWeeks(current, interval);
      if (lowerUnit === "months") current = addMonths(current, interval);
      if (lowerUnit === "years") current = addYears(current, interval);
    }
  }
}

  return (
    
     <GenerateCalendar datesArray={recurringDates} initialDate={startDate}/> 

  );
}
/*    while (isBefore(current, addDays(end, 1))) {
        dates.push(format(current, "yyyy-MM-dd"));
        if (unit === "days") current = addDays(current, interval);
        if (unit === "weeks") current = addWeeks(current, interval);
        if (unit === "months") current = addMonths(current, interval);
        if (unit === "years") current = addYears(current, interval);
      }*/