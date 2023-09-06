import {
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const TextInputSearch = ({ onChange }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      marginTop={6}
      paddingTop={8}
    >
      <Box marginRight={6}></Box>
      <InputGroup width="auto">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="black" />
        </InputLeftElement>
        <Input
          type="text"
          onChange={onChange}
          padding={2}
          fontSize="sm"
          paddingLeft={8}
          paddingRight={1}
          placeholder="Search for events"
          borderRadius="lg"
          backgroundColor="white"
          _hover={{ borderColor: "rgb(204, 139, 101)", borderWidth: "4px" }}
        ></Input>
      </InputGroup>
    </Flex>
  );
};
