import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Input, Button, Text, Flex, Spacer, extendTheme } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        height: "100%",
      },
      "#root": {
        height: "100%",
      },
    },
  },
});

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    // Simulate a random reply
    const randomReply = {
      id: Date.now() + 1,
      text: Math.random().toString(36).substring(7),
      sender: "bot",
    };

    setMessages([...messages, newMessage, randomReply]);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh" flexDirection="column" p={4} bg="gray.100">
        <VStack flex={1} overflowY="auto" spacing={4}>
          {messages.map((message) => (
            <Flex key={message.id} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg={message.sender === "user" ? "blue.100" : "green.100"} p={3} borderRadius="md">
              <Text>{message.text}</Text>
            </Flex>
          ))}
        </VStack>
        <HStack mt={4}>
          <Input placeholder="Type your message..." value={input} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
          <Button colorScheme="blue" onClick={handleSendMessage}>
            <FaPaperPlane />
          </Button>
        </HStack>
      </Flex>
    </ChakraProvider>
  );
};

export default Index;
