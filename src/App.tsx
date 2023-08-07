import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import Landing from "./pages/Landing";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1C1E25",
      light: "#fff",
    },
    secondary: {
      main: "#15171C",
      light: "#000",
    },
    text: {
      primary: "#fff",
      secondary: "#000",
      disabled: "grey",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box bgcolor={"primary.main"} minHeight={"100vh"}>
          <Landing />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
