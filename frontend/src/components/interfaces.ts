// Event interface
export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  description: string;
  location: string;
  evDate: string;
  evTime: string;
}

export interface DayInfo {
  isToday: boolean; // Indicates whether the day is today
  hasEvent: boolean; // Indicates whether the day has any event
  isNonMonthDay: boolean; // Indicates whether the day is from a different month
  isActiveDay: boolean;
}

// CalendarDay interface
export interface CalendarDay {
  dayOfMonth: number | null;
  currentDate: Date;
  isSpecificDay: DayInfo;
}
