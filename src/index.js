import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Controller from "./controller";
import Widget from "./widget";

ReactDOM.render(
  <React.StrictMode>
    {window.location.pathname === "/widget" ? <Widget /> : <Controller />}
  </React.StrictMode>,
  document.getElementById("root")
);
