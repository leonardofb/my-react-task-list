//Primer metodo
/*
import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom"
import {App} from "./App";
import { ColorModeScript} from "@chakra-ui/react";
import MyTheme from "./theme";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorModeScript initialColorMode={MyTheme.config.initialColorMode} />
    <App />
  </StrictMode>

);
*/

//Segundo Metodo

import { StrictMode } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";
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