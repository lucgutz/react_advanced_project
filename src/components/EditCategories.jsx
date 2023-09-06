import { useState } from "react";
import { sendRequest } from "./SendRequest";
import { Button, Box, Text, Checkbox, useToast } from "@chakra-ui/react";

const ROOT_URL = "http://localhost:3000/";

export const EditCategories = ({ event }) => {
  const [categories, setCategories] = useState([]);
  const message = useToast();

  const handleCategoriesChange = (value) => {
    if (categories.includes(value)) {
      setCategories(categories.filter((category) => category !== value));
    } else {
      if (categories.length < 2) {
        setCategories([...categories, value]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      categoryIds: categories,
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
      <form onSubmit={handleSubmit}>
        <Text fontSize="md" fontWeight="500">
          Categories (max. 2):
        </Text>
        <Box>
          <Checkbox
            value={1}
            isChecked={categories.includes(1)}
            onChange={() => handleCategoriesChange(1)}
            colorScheme="green"
          >
            Sports
          </Checkbox>
        </Box>
        <Box>
          <Checkbox
            value={2}
            isChecked={categories.includes(2)}
            onChange={() => handleCategoriesChange(2)}
            colorScheme="green"
          >
            Games
          </Checkbox>
        </Box>
        <Box>
          <Checkbox
            value={3}
            isChecked={categories.includes(3)}
            onChange={() => handleCategoriesChange(3)}
            colorScheme="green"
          >
            Relaxation
          </Checkbox>
        </Box>

        <Button
          type="submit"
          marginTop={1}
          marginBottom={6}
          height={7}
          color="white"
          backgroundColor="rgb(1, 51, 40, 0.5)"
          _hover={{ backgroundColor: "rgb(204, 139, 101, 0.6)" }}
        >
          Update
        </Button>
      </form>
    </>
  );
};
