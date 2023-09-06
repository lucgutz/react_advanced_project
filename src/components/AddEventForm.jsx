import { useState, useRef } from "react";
import {
  Center,
  Stack,
  Input,
  Checkbox,
  Radio,
  Flex,
  Box,
  Card,
  CardBody,
  Text,
  Button,
  CardHeader,
} from "@chakra-ui/react";

export const AddEventForm = ({ createEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startDateInputRef = useRef(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const endDateInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const handleCreatedBy = (userId) => {
    setSelectedUser(userId);
  };

  const handleDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    setEndDate(newStartDate);
  };

  const handleCategoriesChange = (value) => {
    if (categories.includes(value)) {
      setCategories(categories.filter((category) => category !== value));
    } else {
      if (categories.length < 2) {
        setCategories([...categories, value]);
      }
    }
  };

  const areAllInputsFilled = () => {
    return (
      title &&
      description &&
      startDate &&
      startTime &&
      endDate &&
      endTime &&
      categories.length > 0 &&
      selectedUser !== ""
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateAndStartTime = new Date(
      `${startDate}T${startTime}Z`
    ).toISOString();
    const dateAndEndTime = new Date(`${endDate}T${endTime}Z`).toISOString();

    createEvent({
      title,
      description,
      image,
      startTime: dateAndStartTime,
      endTime: dateAndEndTime,
      categoryIds: categories,
      createdBy: selectedUser,
    });

    setTitle("");
    setDescription("");
    setImage("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setCategories([]);
    setSelectedUser(null);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bg="rgb(204, 139, 101, 0.7)"
      minHeight="100vh"
      marginTop={8}
      paddingTop={8}
      paddingBottom={8}
    >
      <Card
        p="1rem"
        borderRadius="10px"
        boxShadow="8px 8px 7px rgba(0, 0, 0, 0.2)"
        maxWidth={{ base: "90%", sm: "400px" }}
      >
        <CardHeader>
          <Center fontSize="xl" fontWeight="bold">
            Create a new event
          </Center>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Box>
                <Text fontSize="md" fontWeight={500}>
                  Title:
                </Text>
                <Input
                  type="text"
                  placeholder="Title of your event"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  focusBorderColor="black"
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500}>
                  Description:
                </Text>
                <Input
                  type="text"
                  placeholder="Description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  focusBorderColor="black"
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500}>
                  Add a photo (URL):
                </Text>
                <Input
                  type="text"
                  placeholder="Paste URL here"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                  focusBorderColor="black"
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500}>
                  Start:
                </Text>
                <Input
                  type="date"
                  placeholder="Date"
                  required
                  onChange={handleDateChange}
                  ref={startDateInputRef}
                  value={startDate}
                  focusBorderColor="black"
                />
                <Input
                  type="time"
                  placeholder="Time"
                  required
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                  focusBorderColor="black"
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500}>
                  End:
                </Text>
                <Input
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setEndDate(e.target.value)}
                  ref={endDateInputRef}
                  value={endDate}
                  focusBorderColor="black"
                  readOnly
                />
                <Input
                  type="time"
                  placeholder="Time"
                  required
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                  focusBorderColor="black"
                />
              </Box>
              <Text fontSize="md" fontWeight={500}>
                Categories (max. 2):
              </Text>
              <Box>
                <Checkbox
                  value={1}
                  isChecked={categories.includes(1)}
                  onChange={() => handleCategoriesChange(1)}
                  colorScheme="orange"
                >
                  Sports
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  value={2}
                  isChecked={categories.includes(2)}
                  onChange={() => handleCategoriesChange(2)}
                  colorScheme="orange"
                >
                  Games
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  value={3}
                  isChecked={categories.includes(3)}
                  onChange={() => handleCategoriesChange(3)}
                  colorScheme="orange"
                >
                  Relaxation
                </Checkbox>
              </Box>
              <Box>
                <Text fontSize="md" marginBottom={2} fontWeight={500}>
                  Event created by:
                </Text>
                <Box paddingBottom={2}>
                  <Radio
                    name="user"
                    value={1}
                    isChecked={selectedUser === 1}
                    onChange={() => handleCreatedBy(1)}
                    colorScheme="orange"
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
                    colorScheme="orange"
                  >
                    Jane Bennett
                  </Radio>
                </Box>
              </Box>
              <Center>
                <Button
                  backgroundColor={
                    areAllInputsFilled
                      ? "rgb(1, 51, 40, 0.5)"
                      : "rgb(1, 51, 40, 0.5)"
                  }
                  isDisabled={!areAllInputsFilled()}
                  type="submit"
                  _disabled={{ opacity: 0.5 }}
                  _hover={
                    !areAllInputsFilled()
                      ? {}
                      : {
                          backgroundColor: "rgb(204, 139, 101, 0.6)",
                          transform: "scale(1.1)",
                          transition: "transform 0.3s",
                        }
                  }
                  _active={
                    !areAllInputsFilled()
                      ? {}
                      : {
                          transform: "scale(0.9)",
                        }
                  }
                >
                  Add Event
                </Button>
              </Center>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
};
