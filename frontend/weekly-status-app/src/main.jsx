import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from "./store";
import { Provider } from "react-redux";
import { UserContextProvoder } from "./contexts/userContext";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6a5acd",
      light: "#e4daf5",
    },
    secondary: {
      main: "#FA8334",
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

