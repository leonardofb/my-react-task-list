import React from "react";
/* eslint-disable no-unused-vars */
import {App} from "./App";
import { ColorModeScript } from '@chakra-ui/react'
/* eslint-eneable no-unused-vars */
import * as ReactDOM from 'react-dom/client'
//import App from './App'
import theme from './theme'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
    <>
        {/* 👇 Here's the script */}
    <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </React.StrictMode>
  </>,
)

/*
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

);
*/