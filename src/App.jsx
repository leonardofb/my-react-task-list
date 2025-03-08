/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Home } from './pages/Home';
import { TaskList } from './pages/TaskList';
import { SobreNosotros } from './pages/SobreNosotros';
import { Box, VStack, Button, Flex, useColorModeValue, Container } from '@chakra-ui/react';
import { useColorMode } from "@chakra-ui/react";
import {ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from './theme';
/* eslint-enable no-unused-vars */

export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode("dark");
  console.log(colorMode, toggleColorMode);
  const buttonBg = useColorModeValue("teal.500", "teal.200");

 // const bgColor = colorMode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';

  const backgroundImage = colorMode === 'dark' ? '/src/images/tareas-Dark.jpg' : '/src/images/tareas.jpeg';
 
  return (
    <ChakraProvider theme={theme}>
    <Router>
    
      <Flex
        direction="center"
        justify="space-evenly"
        align="center"
        w="95%"
        margin="auto"
        border="1px solid red"
        height="100vh"
        backgroundImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        
      > 
            
        <Flex w="250px" p={4} pointerEvents="auto"  margin="auto">
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
            <Button colorScheme="whatsapp" onClick={toggleColorMode} mt={4} size="xs">
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
