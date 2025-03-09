import React from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorMode,
} from "@chakra-ui/react";
import styles from "./styles/Nosotros.module.css";

export const SobreNosotros = () => {
  const { colorMode } = useColorMode()
    return (
      <Box
      className={styles.container}
      bg={colorMode === "dark" ? "gray.800" : "gray.100"}
      color={colorMode === "dark" ? "white" : "black"}
      borderRadius="lg"
      p={6}
    >


      <Text className={styles.title}>Tecnologías Aplicadas</Text>
      <Text mb={4}>
        Nuestra aplicación se basa en tecnologías modernas para ofrecer alta velocidad, diseño atractivo y una excelente experiencia de usuario.
        Haga clic en cada tema para conocer más detalles y, al volver a hacer clic, se ocultará la información.
      </Text>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                React
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Utilizamos React, una biblioteca de JavaScript líder en la industria, 
            para construir interfaces de usuario interactivas y dinámicas.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Vite
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            El proyecto se basa en Vite, una herramienta de desarrollo y build 
            ultrarrápida. Esto se traduce en tiempos de carga mínimos.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                React Router
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Para una navegación fluida entre las distintas secciones de la aplicación, 
            empleamos React Router.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Chakra UI
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            El diseño visual de la aplicación se ha creado con Chakra UI, 
            un framework de componentes que permite desarrollar interfaces modernas y accesibles.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                vite-plugin-static-copy
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Para mantener una organización impecable de los recursos, 
            se utiliza el plugin vite-plugin-static-copy.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
              Configuración y despliegue en GitHub Pages
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            La aplicación está optimizada para ser desplegada en GitHub Pages, 
            facilitando su acceso en línea y garantizando una solución escalable.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Text mt={6}>
        En resumen, esta aplicación está construida sobre un 
        stack tecnológico robusto y moderno que combina alta velocidad, 
        eficiencia y un diseño visual atractivo.
      </Text>
    </Box>
  );
};

export default SobreNosotros;
