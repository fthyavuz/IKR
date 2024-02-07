// Event interface
export interface Event {
  eventName: string;
  startDateTime: string; // Date and time in ISO 8601 format, e.g., "2022-01-01T16:00:00";
  endDateTime: string; // Date and time in ISO 8601 format, e.g., "2022-01-01T18:00:00";
  eventLocation: string;
  eventDescription: string;
  organizerName: string;
}

// CalendarDay interface
export interface CalendarDay {
  dayOfMonth: number | null;
  scheduledEvent: Event[] | undefined; // Represents the event scheduled for the day
  isToday: boolean;
}
