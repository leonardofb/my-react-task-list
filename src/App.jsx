import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { TaskList } from "./pages/TaskList";
import { SobreNosotros } from "./pages/SobreNosotros";
import {
  Box,
  VStack,
  Button,
  Flex,
  useColorModeValue,
  useColorMode,
  ChakraProvider,
} from "@chakra-ui/react";
import theme from "./theme";
import tareasDark from "./assets/images/tareas-Dark.jpg";
import tareasLight from "./assets/images/tareas.jpeg";

// Componente que contiene la lógica y la interfaz
const AppContent = () => {
  // Hook para obtener el modo actual y la función para alternarlo
  const { colorMode, toggleColorMode } = useColorMode();
  // Define el color de fondo de los botones según el modo
  const buttonBg = useColorModeValue("teal.500", "teal.200");
  // Selecciona la imagen de fondo según el modo de color
  const backgroundImage = colorMode === "dark" ? tareasDark : tareasLight;

  return (
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
        {/* Layout en dos columnas: menú de navegación y área de contenido */}
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
              {/* Botones para alternar el modo */}
              <Button
                colorScheme="whatsapp"
                onClick={toggleColorMode}
                mt={4}
                size="xs"
              >
                Toggle to {colorMode === "dark" ? "light" : "dark"} mode
              </Button>
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
            {/* Opcional: otro botón de toggle en el contenido */}
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
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppContent />
    </ChakraProvider>
  );
};

export default App;

