import { Col, Container, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import EventCard from "./EventCard";
import { EventItem } from "../interfaces";

interface EventListProps {
  eventList: EventItem[];
  onUpdate: (id: string) => void;
}

export default function EventList({ eventList, onUpdate }: EventListProps) {
  return (
    <Container>
      <Row>
        <h1>Events</h1>
      </Row>
      {eventList.length === 0 ? (
        <h3 className="mt-5">Event not found</h3>
      ) : (
        <Row className="justify-content-around">
          {eventList.map((evnt: EventItem, index) => (
            <Col key={index} className="col-12 col-lg-6 mt-2">
              <EventCard evnt={evnt} onUpdate={onUpdate} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
