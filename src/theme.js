import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};
// 3. extend the theme
const MyTheme = extendTheme({ config });

export default MyTheme;