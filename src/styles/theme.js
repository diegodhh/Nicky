import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "rgba(255, 142, 83, 1)" },
    secondary: { main: "rgba(254, 107, 139, 1)" },
    liveOrange: {
      main: "rgba(255, 142, 83, 1)",
      ligth: "rgba(255, 142, 83, 0.3)",
    },
    liveRed: { main: "rgba(254, 107, 139, 1)" },
    liveYellow: { main: "#rgba(225, 194, 76, 1)" },
    liveBlue: { main: "rgba(34, 74, 100, 1)", ligth: "rgba(34, 74, 100, 0.3)" },

    darkBlue: { main: "rgba(57, 180, 167, 1)" },
    lightGreen: { main: "rgba(4, 114, 77, 1)" },
  },
  status: {
    danger: "orange",
  },
});
