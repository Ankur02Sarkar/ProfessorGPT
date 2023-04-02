import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
  colors: {
    black: "#000000",
    white: "#ffffff",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "black")(props),
        color: mode("gray.800", "white")(props),
      },
    }),
  },
});

export default customTheme;
