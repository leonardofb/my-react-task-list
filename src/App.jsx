import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Home } from './pages/Home';
import { TaskList } from './pages/TaskList';
import { SobreNosotros } from './pages/SobreNosotros';
import { ChakraProvider, Box, VStack, Text, Button } from '@chakra-ui/react';

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box display="flex">
          <Box w="250px" bg="gray.200" p={4}>
            <VStack spacing={4} align="start">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/TaskList">
                <Button variant="ghost">Task List</Button>
              </Link>
              <Link to="/SobreNosotros">
                <Button variant="ghost">Sobre Nosotros</Button>
              </Link>
            </VStack>
          </Box>
          <Box flex="1" p={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/TaskList" element={<TaskList />} />
              <Route path="/SobreNosotros" element={<SobreNosotros />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};


export default App;
