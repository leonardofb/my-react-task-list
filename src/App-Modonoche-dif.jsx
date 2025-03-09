import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { TaskList } from "./pages/TaskList";
import { SobreNosotros } from "./pages/SobreNosotros";
import { Box, VStack, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { useColorMode, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import tareasDark from "./assets/images/tareas-Dark.jpg";
import tareasLight from "./assets/images/tareas.jpeg";

export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonBg = useColorModeValue("teal.500", "teal.200");

  // Se define la imagen de fondo de acuerdo al modo
  const backgroundImage = colorMode === "dark" ? tareasDark : tareasLight;
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex
          direction="column"
          justify="center"
          align="center"
          w="95%"
          margin="auto"
          height="100vh"
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
        >
          {/* Contenedor en fila para layout de dos columnas */}
          <Flex direction="row" w="100%" height="100%">
            {/* Barra de navegación */}
            <Flex w="250px" p={4} pointerEvents="auto">
              <VStack spacing={4} align="start">
                <Link to="/">
                  <Button colorScheme="teal" bg={buttonBg}>
                    Home
                  </Button>
                </Link>
                <Link to="/TaskList">
                  <Button colorScheme="teal" bg={buttonBg}>
                    Task List
                  </Button>
                </Link>
                <Link to="/SobreNosotros">
                  <Button colorScheme="teal" bg={buttonBg}>
                    About us
                  </Button>
                </Link>
                {/* Primer botón para alternar el modo */}
                <Button
                  colorScheme="whatsapp"
                  onClick={toggleColorMode}
                  mt={4}
                  size="xs"
                >
                  Toggle to {colorMode === "dark" ? "light" : "dark"} mode
                </Button>
                {/* Segundo botón para alternar el modo */}
                <Button
                  colorScheme="whatsapp"
                  onClick={toggleColorMode}
                  mt={2}
                  size="xs"
                >
                  Toggle Mode (segunda opción)
                </Button>
              </VStack>
            </Flex>

            {/* Área de contenido */}
            <Box flex="1" p={4}>
              {/* También puedes incluir otro toggle aquí si lo prefieres */}
              <Button onClick={toggleColorMode} mb={4} size="sm">
                Toggle Mode (en contenido)
              </Button>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/TaskList" element={<TaskList />} />
                <Route path="/SobreNosotros" element={<SobreNosotros />} />
              </Routes>
            </Box>
          </Flex>
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
