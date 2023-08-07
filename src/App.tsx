import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createTheme } from "@mui/material";
function App() {
  return <Provider store={store}></Provider>;
}

export default App;
