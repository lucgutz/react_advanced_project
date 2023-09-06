import { Image, Heading, Card, CardBody, Text, Box } from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";

export const EventCard = ({ event }) => {
  const categoriesString = event.categories
    .map(
      (category) =>
        category.name.charAt(0).toUpperCase() + category.name.slice(1)
    )
    .join(" & ");

  return (
    <>
      <Card
        borderTopRadius="xl"
        w="sm"
        h="content-fit"
        cursor="pointer"
        backgroundColor="rgb(227, 220, 210)"
        borderColor="white"
        borderWidth="10px"
        _hover={{
          transform: "scale(1.01)",
          borderColor: "white",
          backgroundColor: "rgb(204, 139, 101, 0.5)",
        }}
        style={{
          boxShadow: "8px 8px 7px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Image src={event.image} h={60} w="100%" borderRadius="md" />
        <Box
          position="absolute"
          top="0"
          left="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="90px"
          height="90px"
          borderRadius="md"
          backgroundColor="rgb(1, 51, 40, 0.5)"
          color="white"
        >
          <Text textAlign="center" fontWeight={500} fontSize={16}>
            {categoriesString}
          </Text>
        </Box>
        <CardBody textAlign="center">
          <Box>
            <Heading size="lg" marginBottom={2}>
              {event.title}
            </Heading>
            <Text fontWeight={700} color="rgb(2, 100, 79)">
              {event.description}
            </Text>
          </Box>
          <Box mt="5" spacing="2">
            <Box>
              <Text fontWeight={500}>
                <CalendarIcon /> {event.endTime.slice(0, 10)}
              </Text>
              <Text>
                <TimeIcon /> {event.startTime.slice(11, 16)}h -{" "}
                {event.endTime.slice(11, 16)}h
              </Text>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};
