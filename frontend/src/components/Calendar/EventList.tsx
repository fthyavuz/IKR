import { Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function EventList({ eventList }) {
  return (
    <Container>
      <Row>
        <h1>Events</h1>
      </Row>
      <Row className="border justify-content-around ">
        {eventList.map((evnt: any) => (
          <Col className="col-12 col-lg-6 mt-2">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{evnt.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Organized by Sport Comission
                </Card.Subtitle>
                <Card.Text>
                  Dear parents, Lets meet and have fun with our children.Lokking
                  forward to you in this event.
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  <i className="bi bi-geo-alt"></i> : Laax
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  <i className="bi bi-calendar2-date"></i> : 10.02.2024
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  <i className="bi bi-clock"></i> : 12.00 - 16.00
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
