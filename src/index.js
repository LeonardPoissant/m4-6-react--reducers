import React from "react";
import ReactDOM from "react-dom";

import { SeatProvider } from "./components/SeatContext";
import { BookingMechanism } from "./components/BookingContext";

import App from "./components/App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BookingMechanism>
    <SeatProvider>
      <App />
    </SeatProvider>
  </BookingMechanism>,
  rootElement
);
