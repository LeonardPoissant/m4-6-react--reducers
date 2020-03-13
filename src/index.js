import React from "react";
import ReactDOM from "react-dom";

import { SeatProvider } from "./components/SeatContext";

import App from "./components/App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <SeatProvider>
    <App />
  </SeatProvider>,
  rootElement
);
