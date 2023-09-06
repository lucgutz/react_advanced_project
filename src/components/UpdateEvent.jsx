import { useState } from "react";
import { sendRequest } from "./SendRequest";
import { EditEvent } from "./EditEvent";
import { EditDate } from "./EditDate";
import { EditCategories } from "./EditCategories";
import { EditCreatedBy } from "./EditCreatedBy";
import { Flex } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";

const ROOT_URL = "http://localhost:3000/";

export const UpdateEvent = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const message = useToast();

  const handleDeleteEvent = async () => {
    try {
      await sendRequest("DELETE", ROOT_URL, `events/${event.id}`);
      setShowConfirmation(false);

      message({
        title: "Event deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      message({
        title: "An error occurred while deleting the event. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={["xs", "sm", "md"]}
        backgroundColor="rgb(204, 139, 101, 0.5)"
        _hover={{ backgroundColor: "rgb(204, 139, 101)" }}
      >
        Edit event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="500px" maxH="80vh">
          <ModalHeader>Edit event</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="80vh" overflowY="auto">
            <EditEvent event={event}></EditEvent>
            <EditDate event={event}></EditDate>
            <EditCategories event={event}></EditCategories>
            <EditCreatedBy event={event}></EditCreatedBy>

            <Modal
              isOpen={showConfirmation}
              onClose={() => setShowConfirmation(false)}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this event?
                </ModalBody>
                <ModalFooter>
                  <Button
                    backgroundColor="rgb(1, 51, 40, 0.5)"
                    color="white"
                    _hover={{ backgroundColor: "rgb(204, 139, 101, 0.6)" }}
                    mr={3}
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDeleteEvent}>
                    Confirm and delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="space-between" width="100%">
              <Button
                color="white"
                backgroundColor="red.300"
                _hover={{ backgroundColor: "red.500" }}
                onClick={() => setShowConfirmation(true)}
              >
                DELETE EVENT
              </Button>
              <Button
                backgroundColor="rgb(1, 51, 40, 0.5)"
                onClick={onClose}
                _hover={{ backgroundColor: "rgb(204, 139, 101, 0.6)" }}
                color="white"
              >
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
