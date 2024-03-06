// Event interface
export interface IkrEvent {
  eventName: string;
  startDateTime: string; // Date and time in ISO 8601 format, e.g., "2022-01-01T16:00:00";
  endDateTime: string; // Date and time in ISO 8601 format, e.g., "2022-01-01T18:00:00";
  eventLocation: string;
  eventDescription: string;
  organizerName: string;
}

export interface DayInfo {
  isToday: boolean; // Indicates whether the day is today
  hasEvent: boolean; // Indicates whether the day has any event
  isNonMonthDay: boolean; // Indicates whether the day is from a different month
}

// CalendarDay interface
export interface CalendarDay {
  dayOfMonth: number | null;
  currentDate: Date;
  isSpecificDay: DayInfo;
}
