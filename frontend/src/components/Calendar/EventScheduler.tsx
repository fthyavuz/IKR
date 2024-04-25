import { Col, Container, Row } from "react-bootstrap";
import EventList from "./EventList";
import { NewEventForm } from "./NewEventForm";
import { readEvent } from "../dataUtils";
import { useEffect, useState } from "react";
import { EventItem } from "../interfaces";
interface EventSchedulerProps {
  targetDate: string;
  eventList: EventItem[];
}

export default function EventScheduler(props: EventSchedulerProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null); // State to store the selected event ID
  const [events, setEvents] = useState<EventItem[]>(props.eventList);
  useEffect(() => {
    setEvents(props.eventList); // Update events when eventList changes
  }, [props.eventList]);
  const handleUpdateEvent = (id: string | null) => {
    setSelectedEventId(id);
    console.log("Update event:", id);
  };

  return (
    <Container>
      <Row className="">
        <div>
          <h2>{props.targetDate}</h2>
        </div>
      </Row>
      <Row>
        <Col className="">
          <EventList eventList={events} onUpdate={handleUpdateEvent} />
        </Col>
        <Col className="">
          <NewEventForm eventDetails={readEvent(selectedEventId)} />
        </Col>
      </Row>
    </Container>
  );
}
