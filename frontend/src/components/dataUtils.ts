import { convertTheDateFormat } from "./dateUtils";
import { EventItem } from "./interfaces";
import { v4 as uuidv4 } from "uuid";

export const readEvent = (id: string | null): EventItem => {
  // Dummy event data
  const fakeEvent: EventItem = {
    id: id !== null ? id : "",
    title: "Sample Event",
    organizer: "John Doe",
    description: "This is a sample event description.",
    location: "Sample Location",
    evDate: "2024-12-31",
    evTime: "16:00",
  };
  if (id == null) {
    return {
      id: "",
      title: "",
      organizer: "",
      description: "",
      location: "",
      evDate: "",
      evTime: "",
    };
  } else {
    return fakeEvent;
  }
};

export const getEvents = async (date: string): Promise<EventItem[]> => {
  let theDate = convertTheDateFormat(date);
  try {
    const response = await fetch(
      `http://localhost:5081/Event/filter?date=${theDate}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    return data as EventItem[]; // Assuming the response data is an array of EventItems
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return an empty array in case of an error
  }
};

export const getAllEvents = async (): Promise<EventItem[]> => {
  try {
    const response = await fetch("http://localhost:5081/Event");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    return data as EventItem[]; // Assuming the response data is an array of EventItems
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return an empty array in case of an error
  }
};

export const updateEvent = (id: string): EventItem => {
  // Dummy event data
  const fakeEvent: EventItem = {
    id: id,
    title: "Sample Event",
    organizer: "John Doe",
    description: "This is a sample event description.",
    location: "Sample Location",
    evDate: "2024-12-31",
    evTime: "12:00 PM",
  };

  return fakeEvent;
};

export const deleteEvent = async (id: string) => {
  console.log("Deleting event with ID:", id);
  try {
    const response = await fetch(`http://localhost:5081/Event/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete event");
    }

    console.log("The event has been removed!");
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

export const addEvent = async (event: EventItem) => {
  event.id = uuidv4();
  console.log(event);
  try {
    const response = await fetch("http://localhost:5081/Event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error("Failed to add event");
    }

    console.log("The event has been saved!");
  } catch {
    console.error("Error adding event");
  }
};
