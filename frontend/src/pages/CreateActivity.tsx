import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface Activity {
  title: string;
  date: string;
  description: string;
  photo: string;
}

export function CreateActivity() {
  const [activity, setActivity] = useState<Activity>({
    title: "",
    date: "",
    description: "",
    photo: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted:", activity);
    try {
      const response = await fetch("http://localhost:5081/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      });

      if (response.ok) {
        console.log("Activity submitted successfully");
      } else {
        console.log("Failed to submit activty");
      }
    } catch (error) {
      console.log("Activity submitting activity:", error);
    }
  };

  return (
    <div className="border">
      <h1>Create activity!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="id-title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            value={activity.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-photo">
          <Form.Label>Photo URL:</Form.Label>
          <Form.Control
            required
            type="text"
            name="photo"
            value={activity.photo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="id-date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            type="text"
            name="date"
            value={activity.date}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
