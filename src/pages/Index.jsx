import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Input, Button, Text, Flex, Spacer, extendTheme } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        height: "100%",
        background: "#111b21",
        color: "#e5ddd5",
      },
      "#root": {
        height: "100%",
      },
      "::-webkit-scrollbar": {
        width: "12px",
        borderRadius: "10px",
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        backgroundColor: `rgba(255, 255, 255, 0.15)`,
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "whatsapp",
      },
    },
    Input: {
      baseStyle: {
        field: {
          color: "white",
        },
      },
    },
  },
  colors: {
    whatsapp: {
      300: "#00A884",
    },
    userMessageBg: "#005c4b",
    botMessageBg: "#262d31",
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
      <Flex height="100vh" flexDirection="column" p={4} bg="#111b21">
        <VStack flex={1} overflowY="scroll" spacing={1} sx={{ "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
          {messages.map((message) => (
            <Flex key={message.id} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg={message.sender === "user" ? "userMessageBg" : "botMessageBg"} p={3} borderRadius="lg" maxWidth="75%" m={1}>
              <Text>{message.text}</Text>
            </Flex>
          ))}
        </VStack>
        <HStack mt={4}>
          <Input placeholder="Type a message" value={input} onChange={handleInputChange} onKeyPress={handleInputKeyPress} borderRadius="2xl" border="none" bg="#262d31" px={4} />
          <Button onClick={handleSendMessage} borderRadius="full" p="0" minW="45px" h="45px" alignItems="center" justifyContent="center" bg="whatsapp.300" _hover={{ bg: "#00A884" }}>
            <FaPaperPlane />
          </Button>
        </HStack>
      </Flex>
    </ChakraProvider>
  );
};

export default Index;
