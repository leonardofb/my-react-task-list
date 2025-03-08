/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";
/* eslint-disable no-unused-vars */
import MyTheme from "./theme";
const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <ColorModeScript initialColorMode={MyTheme.config.initialColorMode} />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);