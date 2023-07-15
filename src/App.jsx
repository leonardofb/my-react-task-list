import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Home } from './pages/Home';
import { TaskList } from './pages/TaskList';
import { SobreNosotros } from './pages/SobreNosotros';
import { ChakraProvider, Box, VStack, Text, Button, Flex, ColorModeScript, useColorModeValue} from '@chakra-ui/react';
import { useColorMode } from "@chakra-ui/react";
import MyTheme from "./theme";

export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode("dark");
  console.log(colorMode, toggleColorMode);

  const buttonBg = useColorModeValue("teal.500", "teal.200");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("white", "gray.700");
  const inputColor = useColorModeValue("gray.800", "gray.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  return (
    <ChakraProvider theme={MyTheme}>
      <ColorModeScript initialColorMode={MyTheme.config.initialColorMode} />
      <Router>
        <Flex
          direction="center"
          justify="space-evenly"
          align="center"
          w="90%"
          margin="auto"
          border="1px solid red"
          height="100vh"
        >
          <Flex w="250px" p={4}>
            <VStack spacing={4} align="start">
              <Link to="/">
                <Button colorScheme="teal" bg={buttonBg}>Home</Button>
              </Link>
              <Link to="/TaskList">
                <Button colorScheme="teal" bg={buttonBg}>Task List</Button>
              </Link>
              <Link to="/SobreNosotros">
                <Button colorScheme="teal" bg={buttonBg}>About us</Button>
              </Link>
              <Button colorScheme="whatsapp" onClick={toggleColorMode} mt={4}
              size="xs">
                Toggle to {colorMode === "dark" ? "light" : "dark"} mode
              </Button>
            </VStack>
          </Flex>

          <Box flex="1" p={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/TaskList" element={<TaskList />} />
              <Route path="/SobreNosotros" element={<SobreNosotros />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
