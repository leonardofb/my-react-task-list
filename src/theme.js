import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
      '.task-list-container': {
        position: 'sticky',
        top: 0,
      },
    },
  },




};


// 3. extend the theme
const MyTheme = extendTheme({ config });

export default MyTheme;