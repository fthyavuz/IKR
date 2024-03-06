import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { IkrEvent } from "../interfaces";

export function NewEventForm() {
  const [ikrEvent, setIkrEvent] = useState<IkrEvent>({
    eventName: "",
    startDateTime: "",
    endDateTime: "",
    eventLocation: "",
    eventDescription: "",
    organizerName: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setIkrEvent((prevIkrEvent) => ({
      ...prevIkrEvent,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted:", ikrEvent);
  };
  return (
    <Container>
      <h1>Create Event!</h1>
      <Form onSubmit={handleSubmit} className="border">
        <Form.Group controlId="id-event-name">
          <Form.Label>Event name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="eventName"
            value={ikrEvent.eventName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-startDateTime">
          <Form.Label>Starting date-time of event:</Form.Label>
          <Form.Control
            required
            type="text"
            name="startDateTime"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-endDateTime">
          <Form.Label>Ending date-time of event:</Form.Label>
          <Form.Control
            required
            type="text"
            name="endDateTime"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-location">
          <Form.Label>Location:</Form.Label>
          <Form.Control
            required
            type="text"
            name="eventLocation"
            value={ikrEvent.eventLocation}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="eventDescription"
            value={ikrEvent.eventDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-organizer-name">
          <Form.Label>Organizer Name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="organizerName"
            value={ikrEvent.organizerName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
