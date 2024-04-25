import { CalendarDay, DayInfo, EventItem } from "./interfaces";

// This returns how many days are there in specific month. For example the number for december is 31.

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Returns a number indicating how many days after Sunday this special day is,. For example monday 1, friday 5 etc.
// But attention number of month 0 represents January, 1 => February etc.
export const getStartingDay = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

// Returns true or false depend on whether the day is today

export const isSameDay = (dateOne: Date, dateTwo: Date): boolean => {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getDate() === dateTwo.getDate()
  );
};

// Returns what kind of feauture the day has. the day is today or the day has event etc. Returns a specific data type DayInfo.
export const calculateDayInfo = (
  todayDate: Date,
  targetDate: Date,
  eventList: EventItem[] | undefined,
  isNonMonth: boolean,
  isActiveDay: boolean
): DayInfo => {
  let eventOnTargetDate = undefined;
  if (eventList !== undefined) {
    eventOnTargetDate = eventList.find((evnt) =>
      isSameDay(new Date(evnt.evDate), targetDate)
    );
  }
  return {
    isToday: isSameDay(todayDate, targetDate),
    hasEvent: eventOnTargetDate !== undefined,
    isNonMonthDay: isNonMonth,
    isActiveDay: isActiveDay,
  };
};

export const getDayClassName = (dayInfo: DayInfo): string => {
  let className = "";

  if (dayInfo.isToday) {
    className += " border-5 border-dark"; // Add 'today' class if it's today
  }

  if (dayInfo.hasEvent) {
    className += " bg-primary text-white"; // Add 'has-event' class if it has an event
  }

  if (dayInfo.isNonMonthDay) {
    className += " bg-light"; // Add 'non-month-day' class if it's a non-month day
  }

  if (dayInfo.isActiveDay) {
    className += "border-3 border-info";
  }

  if (dayInfo.isNonMonthDay && dayInfo.hasEvent) {
    className = "bg-light text-primary";
  }

  return className.trim(); // Trim any leading/trailing spaces
};

export const getMonthArray = (
  currentDate: Date,
  eventItem: EventItem[] | undefined,
  activeDay: number
): CalendarDay[][] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const daysPrevMonth = getDaysInMonth(year, month - 1);
  const startingDay = getStartingDay(year, month);
  const today = new Date();

  let calendarArray: CalendarDay[] = [];
  let dayCounter = 1;

  // Add previous month days
  for (let i = startingDay - 1; i >= 0; i--) {
    let currentDate = new Date(year, month - 1, daysPrevMonth - i);
    calendarArray.push({
      dayOfMonth: daysPrevMonth - i,
      isSpecificDay: calculateDayInfo(
        today,
        currentDate,
        eventItem,
        true,
        activeDay === daysPrevMonth - i
      ),
      currentDate: currentDate,
    });
  }

  // Add current month days
  for (let i = 0; i < daysInMonth; i++) {
    const currentDate = new Date(year, month, dayCounter);

    const calendarDay: CalendarDay = {
      dayOfMonth: dayCounter++,
      isSpecificDay: calculateDayInfo(
        today,
        currentDate,
        eventItem,
        false,
        activeDay === dayCounter
      ),
      currentDate: currentDate,
    };

    calendarArray.push(calendarDay);
  }

  let nextMonthDay = 1;
  // Add next month days to fill up the row
  while (calendarArray.length % 7 !== 0) {
    let currentDate = new Date(year, month + 1, nextMonthDay);
    calendarArray.push({
      dayOfMonth: nextMonthDay,
      isSpecificDay: calculateDayInfo(
        today,
        currentDate,
        eventItem,
        true,
        activeDay === nextMonthDay
      ),
      currentDate: currentDate,
    });
    nextMonthDay++;
  }
  // Split the array into rows
  const rows: CalendarDay[][] = [];
  for (let i = 0; i < calendarArray.length; i += 7) {
    rows.push(calendarArray.slice(i, i + 7));
  }
  return rows;
};

export const parseTimeFromString = (timeString: string): Date => {
  const timeParts = timeString.split(":"); // Split the string by ":" to get hours and minutes
  const hours = parseInt(timeParts[0]); // Parse hours as integer
  const minutes = parseInt(timeParts[1].split(" ")[0]); // Parse minutes as integer, removing "AM" or "PM"
  const isPM = timeParts[1].includes("PM"); // Check if it's PM

  // Adjust hours for PM times if necessary
  const adjustedHours = isPM ? hours + 12 : hours;

  // Create a new Date object with the adjusted hours and minutes
  const eventTime = new Date();
  eventTime.setHours(adjustedHours);
  eventTime.setMinutes(minutes);
  eventTime.setSeconds(0);

  return eventTime;
};

export const convertTheDateFormat = (date: string): string => {
  // Split the string into month, day, and year
  const [month, day, year] = date.split(/,?\s+/);

  // Create a Date object with the parsed values, setting the time zone to UTC
  const dateObj = new Date(`${month} ${day}, ${year} UTC`);

  // Get the ISO string format (YYYY-MM-DD)
  const isoDateString = dateObj.toISOString().split("T")[0];
  return isoDateString;
};
