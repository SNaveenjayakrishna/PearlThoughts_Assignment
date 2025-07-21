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
  }// If user selected repeat option(daily or weekly or monthly or Yearly) this part executes
  else if (interval && unit) {
    interval = Number(interval);
    const lowerUnit = unit.toLowerCase();
    while (current <= end) {
      recurringDates.push(format(current, "yyyy-MM-dd"));
      if (lowerUnit === "days") current = addDays(current, interval);
      if (lowerUnit === "weeks") current = addWeeks(current, interval);
      if (lowerUnit === "months") current = addMonths(current, interval);
      if (lowerUnit === "years") current = addYears(current, interval);
    }
  }// if user selected repeat every custom option this part executes
}

  return (
    
     <GenerateCalendar datesArray={recurringDates} initialDate={startDate}/> 

  );
}
