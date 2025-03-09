import { Box, Text, useColorModeValue } from "@chakra-ui/react";
export const Home = () => {
  // Define colores dinámicos según el modo:
  // En modo claro, un azul oscuro para el título y gris oscuro para el texto.
  // En modo oscuro, un amarillo suave para el título y gris claro para el texto.
  const titleColor = useColorModeValue("blue.800", "yellow.300");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box textAlign="center" p={8}>
      <Text fontSize="5xl" fontWeight="bold" color={titleColor}>
        ¡Hola, Bienvenido a La Lista de Tareas de Poliservicos!
      </Text>
      <Text fontSize="xl" mt={4} color={textColor}>
        Organiza tus tareas, planifica tus proyectos y vive una experiencia
        digital única. ¡Conquista tu día con estilo y eficiencia!
      </Text>
    </Box>
  );
};
