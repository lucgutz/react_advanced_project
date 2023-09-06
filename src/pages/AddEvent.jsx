import { AddEventForm } from "../components/AddEventForm";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const AddEvent = () => {
  const [events, setEvents] = useState([]);

  const message = useToast();

  const createEvent = async (event) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      event.id = (await response.json()).id;
      setEvents(events.concat(event));
      message({
        title: "Event added",
        description: "Event added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("The following error occured:", error);
      message({
        title: "Error",
        description:
          "An error occurred while updating the event. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <AddEventForm createEvent={createEvent}></AddEventForm>
    </>
  );
};
