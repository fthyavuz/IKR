import { Card, Button } from "react-bootstrap";
import { EventItem } from "../interfaces";
import { useState } from "react";
import "./EventCard.css";
import { deleteEvent } from "../dataUtils";

interface EventCardProps {
  evnt: EventItem;
  onUpdate: (id: string) => void;
}

export default function EventCard({ evnt, onUpdate }: EventCardProps) {
  const [showButtons, setShowButtons] = useState(false);

  const handleCardClick = () => {
    setShowButtons(true);
  };

  const handleUpdate = () => {
    // Call onUpdate function to handle update action

    onUpdate(evnt.id);
    setShowButtons(false);
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
    alert(`The event which has ${id} has been removed succesfully!`);
    setShowButtons(false);
  };
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Body className="event-card-body" onClick={handleCardClick}>
        <Card.Title>{evnt.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {evnt.organizer}
        </Card.Subtitle>
        <Card.Text>{evnt.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          <i className="bi bi-geo-alt"></i> : {evnt.location}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <i className="bi bi-calendar2-date"></i> : {evnt.evDate}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <i className="bi bi-clock"></i> : {evnt.evTime}
        </Card.Subtitle>
      </Card.Body>
      {showButtons && (
        <Card.Footer className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="danger" onClick={() => handleDelete(evnt.id)}>
            Delete
          </Button>
          <Button variant="light" onClick={() => setShowButtons(false)}>
            <i className="bi bi-x"></i>
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
