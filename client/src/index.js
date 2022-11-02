// imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

// creating the root
const root = ReactDOM.createRoot(document.getElementById("root"));

// rendering out the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
