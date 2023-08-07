import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material";
import Landing from "./pages/Landing";
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{}}>
        <Landing />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
