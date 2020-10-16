import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import "./index.css";
import App from "./App";
import "fontsource-roboto";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <CssBaseline />
  </React.StrictMode>,
  document.getElementById("root")
);
