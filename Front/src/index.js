import React from "react";
import ReactDOM from "react-dom";
import { TemaProvider } from "./utils/TemaContext";
import App from "./routes/App";
import "./css/index.css";
import "./css/App.css";

ReactDOM.render(
  <React.StrictMode>
    <TemaProvider>
      <App />
    </TemaProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
