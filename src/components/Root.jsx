import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Flex, Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navigation />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};
