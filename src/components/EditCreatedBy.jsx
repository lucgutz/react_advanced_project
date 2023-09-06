import { useState } from "react";
import { sendRequest } from "./SendRequest";
import { Button, Box, Radio, Stack, Text, useToast } from "@chakra-ui/react";

const ROOT_URL = "http://localhost:3000/";

export const EditCreatedBy = ({ event }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const message = useToast();

  const handleCreatedBy = (userId) => {
    setSelectedUser(userId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      createdBy: selectedUser,
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
      <Stack>
        <form onSubmit={handleSubmit}>
          <Box>
            <Text fontSize="md" fontWeight="500">
              Event created by:
            </Text>
            <Box paddingBottom={2}>
              <Radio
                name="user"
                value={1}
                isChecked={selectedUser === 1}
                onChange={() => handleCreatedBy(1)}
                colorScheme="green"
              >
                Ignacio Doe
              </Radio>
            </Box>
            <Box>
              <Radio
                name="user"
                value={2}
                isChecked={selectedUser === 2}
                onChange={() => handleCreatedBy(2)}
                colorScheme="green"
              >
                Jane Bennett
              </Radio>
            </Box>
          </Box>
          <Box marginY={2}>
            <Button
              type="submit"
              marginBottom={6}
              height={7}
              color="white"
              backgroundColor="rgb(1, 51, 40, 0.5)"
              _hover={{ backgroundColor: "rgb(204, 139, 101, 0.6)" }}
            >
              Update
            </Button>
          </Box>
        </form>
      </Stack>
    </>
  );
};
