import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { EventItem } from "../interfaces";
import { addEvent, deleteEvent } from "../dataUtils";

export function NewEventForm({ eventDetails }: { eventDetails: EventItem }) {
  const [eventItem, setEventItem] = useState<EventItem>(eventDetails);
  // This useEffect hook listens for changes in eventDetails prop
  useEffect(() => {
    setEventItem(eventDetails); // Update eventItem when eventDetails changes
  }, [eventDetails]);
  let isUpdatedState = eventDetails.title !== "";
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEventItem((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addEvent(eventItem);
    alert("Event submitted successfully!");
    console.log("Submitted:", eventItem);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted:", eventItem);
  };
  const handleDelete = async (id: string) => {
    deleteEvent(id);
    alert("The event has been removed successfully!");
  };
  const handleClearForm = () => {
    setEventItem({
      id: "",
      title: "",
      organizer: "",
      description: "",
      location: "",
      evDate: "",
      evTime: "",
    });
  };
  return (
    <Container>
      {isUpdatedState ? <h1>Update Event!</h1> : <h1>Create Event!</h1>}
      <Form onSubmit={handleSubmit} className="">
        <Form.Group controlId="id-event-name">
          <Form.Label>Event name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            value={eventItem.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-date">
          <Form.Label>Date of event:</Form.Label>
          <Form.Control
            required
            type="date"
            name="evDate"
            value={eventItem.evDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-time">
          <Form.Label>Time of event:</Form.Label>
          <Form.Control
            required
            type="time"
            name="evTime"
            value={eventItem.evTime}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-location">
          <Form.Label>Location:</Form.Label>
          <Form.Control
            required
            type="text"
            name="location"
            value={eventItem.location}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-event-description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            value={eventItem.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-organizer-name">
          <Form.Label>Organizer Name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="organizer"
            value={eventItem.organizer}
            onChange={handleInputChange}
          />
        </Form.Group>
        {isUpdatedState ? (
          <div className="d-flex justify-content-between align-items-center">
            <Button
              className="mt-3"
              variant="primary"
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button variant="light" className="mt-3" onClick={handleClearForm}>
              <i className="bi bi-x"></i>
            </Button>
          </div>
        ) : (
          <Button
            className="mt-3 mr-3"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </Button>
        )}
      </Form>
    </Container>
  );
}
