import { useState, useRef } from "react";
import { sendRequest } from "./SendRequest";
import { Stack, Input, Box, Text, Button, useToast } from "@chakra-ui/react";

const ROOT_URL = "http://localhost:3000/";

export const EditDate = ({ event }) => {
  const [startDate, setStartDate] = useState(event.startDate);
  const [startTime, setStartTime] = useState(event.startTime);
  const startDateInputRef = useRef(null);
  const [endDate, setEndDate] = useState(event.endDate);
  const [endTime, setEndTime] = useState(event.endTime);
  const endDateInputRef = useRef(null);
  const message = useToast();

  const handleDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    setEndDate(newStartDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateAndStartTime = new Date(
      `${startDate}T${startTime}Z`
    ).toISOString();
    const dateAndEndTime = new Date(`${endDate}T${endTime}Z`).toISOString();

    const updatedData = {
      startTime: dateAndStartTime,
      endTime: dateAndEndTime,
    };

    try {
      await sendRequest("PATCH", ROOT_URL, `events/${event.id}`, updatedData);
      message({
        title: "Event updated",
        description: "The event has been updated successfully.",
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
    <Stack>
      <form onSubmit={handleSubmit}>
        <Box>
          <Text fontSize="md" fontWeight="500">
            Start:
          </Text>
          <Input
            type="date"
            placeholder="date"
            required
            onChange={handleDateChange}
            ref={startDateInputRef}
            value={startDate}
            focusBorderColor="green.500"
            w="150px"
          />
          <Input
            type="time"
            placeholder="time"
            required
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
            focusBorderColor="green.500"
            w="100px"
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="500">
            End:
          </Text>
          <Input
            type="date"
            placeholder="date"
            onChange={(e) => setEndDate(e.target.value)}
            ref={endDateInputRef}
            value={endDate}
            readOnly
            focusBorderColor="green.500"
            w="150px"
          />
          <Input
            type="time"
            placeholder="time"
            required
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
            w="100px"
          />
        </Box>
        <Button
          type="submit"
          marginTop={2}
          marginBottom={6}
          height={7}
          color="white"
          backgroundColor="rgb(1, 51, 40, 0.5)"
          _hover={{ backgroundColor: "rgb(204, 139, 101, 0.6)" }}
        >
          Update
        </Button>
      </form>
    </Stack>
  );
};
