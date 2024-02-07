import { useState } from "react";
import { Container, Table, ButtonGroup, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Calendar.css";
import { Event, CalendarDay } from "../interfaces";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      eventName: "New Year Celebration",
      startDateTime: "2024-02-28T16:00:00",
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

  // This month is 28,29,30 or 31. It gets this.
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // how many days after sunday does that day start?
  const getStartingDay = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthArray = (): CalendarDay[][] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startingDay = getStartingDay(year, month);
    const today = new Date();

    let calendarArray: CalendarDay[] = [];
    let dayCounter = 1;

    // Add previous month days
    for (let i = 0; i < startingDay; i++) {
      calendarArray.push({
        dayOfMonth: null,
        scheduledEvent: undefined,
        isToday: false,
      });
    }

    // Add current month days
    for (let i = 0; i < daysInMonth; i++) {
      const currentDate = new Date(year, month, dayCounter);
      const evnt = events.find((evnt) =>
        isSameDay(new Date(evnt.startDateTime), currentDate)
      );

      const calendarDay: CalendarDay = {
        dayOfMonth: dayCounter++,
        scheduledEvent: evnt ? [evnt] : undefined,
        isToday: isSameDay(today, currentDate),
      };

      calendarArray.push(calendarDay);
    }

    // Add next month days to fill up the row
    while (calendarArray.length % 7 !== 0) {
      calendarArray.push({
        dayOfMonth: null,
        scheduledEvent: undefined,
        isToday: false,
      });
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
                  className={`${
                    item.scheduledEvent !== undefined ? "bg-secondary" : ""
                  } ${item.isToday ? "border-5 border-dark" : ""}`}
                >
                  {item.dayOfMonth == null ? "" : item.dayOfMonth}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
