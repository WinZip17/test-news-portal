import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./models/init"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
