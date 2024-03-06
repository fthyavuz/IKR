import { useState } from "react";
import { Container, Table, ButtonGroup, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Calendar.css";
import { IkrEvent, CalendarDay, DayInfo } from "../interfaces";
import CreateEvent from "./CreateEvent";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showNewEventForm, setShowNewEventForm] = useState<Boolean>(false);
  const [ikrEvent, setIkrEvent] = useState<IkrEvent[]>([
    {
      eventName: "New Year Celebration",
      startDateTime: "2024-02-29T16:00:00",
      endDateTime: "2024-02-28T18:00:00",
      eventLocation: "bahnofstrasse 45",
      eventDescription: "We will celebrate new year",
      organizerName: "John Doe",
    },
    {
      eventName: "New Year Celebration",
      startDateTime: "2024-02-10T16:00:00",
      endDateTime: "2024-02-10T18:00:00",
      eventLocation: "bahnofstrasse 45",
      eventDescription: "We will celebrate new year",
      organizerName: "John Doe",
    },
  ]);

  const getFakeData = (currentDate: Date) => {
    fetch("http://localhost:5081/fakedata")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        var listOfEvents = data as IkrEvent[];
        const filtered = listOfEvents.filter((event) => {
          const eventDate = new Date(event.startDateTime);
          const currentDateMidnight = new Date(currentDate);
          currentDateMidnight.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)
          eventDate.setHours(0, 0, 0, 0);
          console.log(eventDate, currentDateMidnight);
          return eventDate.getTime() === currentDateMidnight.getTime();
        });

        setIkrEvent(filtered);
        console.log(filtered);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleDayClick = (hasEvent: boolean, currentDate: Date) => {
    setShowNewEventForm(hasEvent);
    getFakeData(currentDate);
  };

  // This month is 28,29,30 or 31. It gets this.
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // how many days after sunday does that day start?
  const getStartingDay = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const calculateDayInfo = (
    todayDate: Date,
    targetDate: Date,
    ikrEventList: IkrEvent[],
    isNonMonth: boolean
  ): DayInfo => {
    const eventOnTargetDate = ikrEventList.find((evnt) =>
      isSameDay(new Date(evnt.startDateTime), targetDate)
    );

    return {
      isToday: isSameDay(todayDate, targetDate),
      hasEvent: eventOnTargetDate !== undefined,
      isNonMonthDay: isNonMonth,
    };
  };

  const getDayClassName = (dayInfo: DayInfo): string => {
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

    if (dayInfo.isNonMonthDay && dayInfo.hasEvent) {
      className = "bg-light text-primary";
    }

    return className.trim(); // Trim any leading/trailing spaces
  };

  const getMonthArray = (): CalendarDay[][] => {
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
        isSpecificDay: calculateDayInfo(today, currentDate, ikrEvent, true),
        currentDate: currentDate,
      });
    }

    // Add current month days
    for (let i = 0; i < daysInMonth; i++) {
      const currentDate = new Date(year, month, dayCounter);

      const calendarDay: CalendarDay = {
        dayOfMonth: dayCounter++,
        isSpecificDay: calculateDayInfo(today, currentDate, ikrEvent, false),
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
        isSpecificDay: calculateDayInfo(today, currentDate, ikrEvent, true),
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
  const isSameDay = (dateOne: Date, dateTwo: Date): boolean => {
    return (
      dateOne.getFullYear() === dateTwo.getFullYear() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getDate() === dateTwo.getDate()
    );
  };
  return (
    <Container className="mt-3 xl-calendar">
      <div className="d-flex justify-content-between align-items-center">
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <ButtonGroup aria-label="Navigation buttons">
          <Button
            variant="light"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
          >
            <i className="bi bi-caret-left-fill"></i>
          </Button>
          <Button
            variant="light"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
          >
            <i className="bi bi-caret-right-fill"></i>
          </Button>
        </ButtonGroup>
      </div>
      <Table bordered className="mt-3">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getMonthArray().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, index) => (
                <td
                  key={index}
                  className={`${getDayClassName(item.isSpecificDay)} days`}
                  onClick={() =>
                    handleDayClick(
                      item.isSpecificDay.hasEvent,
                      item.currentDate
                    )
                  }
                >
                  {item.dayOfMonth}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {showNewEventForm && <CreateEvent />}
    </Container>
  );
}
