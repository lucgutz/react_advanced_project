import { useLoaderData } from "react-router-dom";
import { TextInputSearch } from "../components/ui/TextInputSearch";
import { useState } from "react";
import { EventsList } from "../components/EventsList";
import { Box, Flex, Checkbox, Text, HStack } from "@chakra-ui/react";

export const loader = async () => {
  const eventsResponse = await fetch("http://localhost:3000/events");
  const categoriesResonse = await fetch("http://localhost:3000/categories");

  const events = await eventsResponse.json();
  const categories = await categoriesResonse.json();

  const eventsWithCategories = events.map((event) => {
    const eventCategories = event.categoryIds.map((categoryId) =>
      categories.find((cat) => cat.id === categoryId)
    );
    return { ...event, categories: eventCategories };
  });

  return { event: eventsWithCategories };
};

export const EventsPage = () => {
  const { event } = useLoaderData();
  const [searchField, setSearchField] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ["Games", "Sports", "Relaxation"];

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const matchedEvents = event.filter((event) => {
    const matchedTitle = event.title
      .toLowerCase()
      .includes(searchField.toLowerCase());

    if (selectedCategories.length === 0) {
      return matchedTitle;
    }

    return (
      matchedTitle &&
      event.categories.some((category) =>
        selectedCategories.includes(category.name)
      )
    );
  });

  const handleCategoryChange = (category) => {
    setSelectedCategories((selectedCategories) => {
      if (selectedCategories.includes(category)) {
        return selectedCategories.filter((cat) => cat !== category);
      } else {
        return [...selectedCategories, category];
      }
    });
  };

  return (
    <>
      <Flex
        flexDirection="column"
        minHeight="100vh"
        backgroundColor="rgb(227, 220, 210)"
      >
        <Box bg="rgb(204, 139, 101, 0.7)" paddingTop={4} paddingBottom={2}>
          <HStack alignItems="center" justifyContent="center">
            <Text
              paddingLeft={3}
              paddingRight={6}
              marginTop={8}
              color="white"
              fontWeight="bold"
              s
              fontSize="1.2rem"
            >
              Have a look at our events!
            </Text>

            <Box paddingTop={7}>
              <Checkbox
                fontWeight={500}
                paddingRight={1}
                isChecked={selectedCategories.length === 0}
                onChange={() => setSelectedCategories([])}
                colorScheme="orange"
              >
                All categories
              </Checkbox>
              {categories.map((category) => (
                <Checkbox
                  fontWeight={500}
                  paddingRight={1}
                  key={category}
                  isChecked={selectedCategories.includes(
                    category.toLowerCase()
                  )}
                  onChange={() => handleCategoryChange(category.toLowerCase())}
                  colorScheme="orange"
                >
                  {category}
                </Checkbox>
              ))}
            </Box>
            <TextInputSearch onChange={handleChange} />
          </HStack>
        </Box>
        <Box flexGrow={1} p={4}>
          <EventsList events={matchedEvents} />
        </Box>
      </Flex>
    </>
  );
};
