import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from "./store";
import { Provider } from "react-redux";
import { UserContextProvoder } from "./contexts/userContext";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0277bd",
      light: "#e8f1fa",
    },
    secondary: {
      main: "#f19d33",
      dark: "#f18b05",
      light: "#dcb685",
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvoder>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserContextProvoder>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
