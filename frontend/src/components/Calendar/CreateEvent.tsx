import { Col, Container, Row } from "react-bootstrap";
import EventList from "./EventList";
import { NewEventForm } from "./NewEventForm";

export default function CreateEvent(hasEvent: boolean, targetDate: Date) {
  return (
    <Container>
      <Row>
        <Col className="col-12 col-lg-6 ">
          <EventList
            eventList={[
              { title: "Ski for Kids" },
              { title: "New Year Celebration" },
            ]}
          />
        </Col>
        <Col className="col-12 col-lg-6">
          <NewEventForm />
        </Col>
      </Row>
    </Container>
  );
}
