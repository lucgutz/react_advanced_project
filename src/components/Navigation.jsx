import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <Flex
          backgroundColor="rgb(16, 12, 13) "
          as="ul"
          listStyleType="none"
          alignItems="center"
          justifyContent="center"
          position="fixed"
          width="100%"
          top="0"
          zIndex={1000}
          paddingX="4"
          color="white"
        >
          <Flex alignItems="center">
            <Flex>
              <li>
                <Link to="/">
                  <Button
                    backgroundColor="rgb(16, 12, 13) "
                    _hover={{ backgroundColor: "rgb(204, 139, 101, 0.5)" }}
                  >
                    Events
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/AddEvent">
                  <Button
                    backgroundColor="rgb(16, 12, 13) "
                    _hover={{ backgroundColor: "rgb(204, 139, 101, 0.5)" }}
                  >
                    Add Event
                  </Button>
                </Link>
              </li>
            </Flex>
          </Flex>
        </Flex>
      </ul>
    </nav>
  );
};
