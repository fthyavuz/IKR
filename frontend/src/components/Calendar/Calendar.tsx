import { useEffect, useState } from "react";
import { Container, Table, ButtonGroup, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Calendar.css";
import EventScheduler from "./EventScheduler";
import { getDayClassName, getMonthArray } from "../dateUtils";
import { EventItem } from "../interfaces";
import "./Calendar.css";
import { getAllEvents, getEvents } from "../dataUtils";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [allEventList, setAllEventList] = useState<EventItem[]>([]);
  const [eventList, setEventList] = useState<EventItem[]>([]);
  const [activeDay, setActiveDay] = useState(new Date().getDate() + 1);
  const fetchEvents = async (date: Date) => {
    try {
      const formattedDate = date.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const events = await getEvents(formattedDate);
      setEventList(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEventList([]); // Clear event list on error
    }
  };

  const fetchAllEvents = async () => {
    try {
      const allEvents = await getAllEvents();
      setAllEventList(allEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEventList([]); // Clear event list on error
    }
  };

  // Use useEffect to fetch events whenever currentDate changes
  useEffect(() => {
    fetchEvents(currentDate);
    fetchAllEvents();
  }, [currentDate]);
  // Function to handle day click
  const handleDayClick = (hasEvent: boolean, clickedDate: Date) => {
    setCurrentDate(clickedDate);
    setActiveDay(clickedDate.getDate() + 1); // Assuming setActiveDay updates some state related to the active day
  };
  return (
    <Container className="my-3 xl-calendar">
      {/** The div covers the navigation buttons and the current date. */}
      <div className="d-flex justify-content-between align-items-center">
        {/**  The text showing the current date*/}
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        {/** The navigation button for changing month.*/}
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
          {getMonthArray(currentDate, allEventList, activeDay).map(
            (row, rowIndex) => (
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
            )
          )}
        </tbody>
      </Table>
      <EventScheduler
        targetDate={currentDate.toLocaleString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        eventList={eventList}
      />
    </Container>
  );
}
