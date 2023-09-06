import { useState } from "react";
import { sendRequest } from "./SendRequest";
import { Text, Box, Input, useToast, Stack, Button } from "@chakra-ui/react";

const ROOT_URL = "http://localhost:3000/";

export const EditEvent = ({ event }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const message = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title,
      description,
      image,
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
    <>
      <Stack spacing={3}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Text fontSize="md" fontWeight="500">
              Title:{" "}
            </Text>
            <Input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              focusBorderColor="green.500"
              w="300px"
            />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="500">
              Description:{" "}
            </Text>
            <Input
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              focusBorderColor="green.500"
              w="300px"
            />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="500">
              Photo (url):
            </Text>
            <Input
              type="text"
              required
              onChange={(e) => setImage(e.target.value)}
              value={image}
              focusBorderColor="green.500"
              w="300px"
            />
          </Box>
          <Button
            type="submit"
            color="white"
            backgroundColor="rgb(1, 51, 40, 0.5)"
            _hover={{ backgroundColor: "rgb(204, 139, 101, 0.6)" }}
            marginTop={1}
            marginBottom={6}
            height={7}
          >
            Update
          </Button>
        </form>
      </Stack>
    </>
  );
};
