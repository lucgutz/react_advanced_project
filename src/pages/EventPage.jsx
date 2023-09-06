import { useLoaderData } from "react-router-dom";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { UpdateEvent } from "../components/UpdateEvent";
import {
  Flex,
  Image,
  Box,
  Stack,
  Text,
  Heading,
  Center,
} from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const eventResponse =
    await fetch(`http://localhost:3000/events/${params.eventId}
  `);
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const usersResponse = await fetch("http://localhost:3000/users");

  const event = await eventResponse.json();
  const categories = await categoriesResponse.json();
  const users = await usersResponse.json();

  const eventCategories = event.categoryIds.map((categoryId) =>
    categories.find((category) => category.id === categoryId)
  );

  const eventWithCategories = {
    ...event,
    categories: eventCategories,
  };

  const eventUser = users.find((user) => user.id === event.createdBy);
  return { event: eventWithCategories, eventUser };
};

export const EventPage = () => {
  const { event, eventUser } = useLoaderData();

  const categoriesString = event.categories
    .map(
      (category) =>
        category.name.charAt(0).toUpperCase() + category.name.slice(1)
    )
    .join(" & ");

  return (
    <>
      <Box bg="rgb(227, 220, 210)" paddingTop={10} minHeight="100vh">
        <Flex direction="column" align="center" padding={10}>
          <Box
            bg="white"
            borderRadius="xl"
            maxWidth="60%"
            height="auto"
            position="relative"
            borderColor="white"
            boxShadow="8px 8px 7px rgba(0, 0, 0, 0.2)"
          >
            <Box position="relative">
              <Image
                src={event.image}
                maxH="300px"
                w="100%"
                objectFit="cover"
                borderRadius="xl"
              ></Image>

              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bg="rgb(1, 51, 40, 0.5)"
                textAlign="center"
                borderTopRadius="xl"
                py={2}
              >
                <Text color="white" fontSize="xl" fontWeight={600}>
                  {categoriesString}
                </Text>
              </Box>
            </Box>

            <Flex align="center" direction={["column", "column", "row"]}>
              <Box flex="1" mt={4} mb={4}>
                <Box marginBottom={4}>
                  <Center>
                    <Heading textAlign="center" fontSize={["md", "md", "2xl"]}>
                      {event.title}
                    </Heading>
                  </Center>
                  <Center>
                    <Text
                      margin={2}
                      fontWeight="bold"
                      fontSize={["sm", "sm", "lg", "lg"]}
                      color="rgb(2, 100, 79)"
                      textAlign="center"
                    >
                      {event.description}
                    </Text>
                  </Center>
                </Box>

                <Box marginBottom={3}>
                  <Center>
                    <Text
                      fontSize={["sm", "sm", "lg"]}
                      padding={2}
                      textAlign="center"
                      fontWeight={600}
                    >
                      This event will take place on:
                    </Text>
                  </Center>
                  <Center>
                    <Text fontSize="1em">
                      <CalendarIcon /> {event.endTime.slice(0, 10)}{" "}
                    </Text>
                  </Center>
                  <Center>
                    <Text fontSize="1em">
                      <TimeIcon /> {event.startTime.slice(11, 16)}h -{" "}
                      {event.endTime.slice(11, 16)}h
                    </Text>
                  </Center>
                </Box>
              </Box>

              <Box flex="1" mt={4} mb={4}>
                <Stack align="center" justify="center">
                  <Text mb={-3} fontWeight="bold" fontSize={["sm", "md", "lg"]}>
                    Created by:
                  </Text>
                  <Text fontSize={["sm", "md", "lg"]}>{eventUser.name}</Text>
                  <Box
                    width={["60%", "60%", "50%"]}
                    height={["60%", "60%", "40%"]}
                    borderRadius="lg"
                    borderWidth="10px"
                    borderColor="rgb(204, 139, 101, 0.5)"
                  >
                    <Image
                      src={eventUser.image}
                      alt="Photo of event owner"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>
                </Stack>

                <Box paddingTop={3}>
                  <Center>
                    <UpdateEvent event={event}></UpdateEvent>
                  </Center>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
