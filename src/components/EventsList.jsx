import { Flex, Box } from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import { Link } from "react-router-dom";

export const EventsList = ({ events, onClick }) => {
  console.log(events);
  return (
    <>
      <Box>
        <Flex gap={4} justifyContent="center" wrap="wrap">
          {events.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <EventCard event={event} onClick={onClick}></EventCard>
            </Link>
          ))}
        </Flex>
      </Box>
    </>
  );
};
