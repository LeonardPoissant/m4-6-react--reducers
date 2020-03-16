import React from "react";
import ReactDOM from "react-dom";

import { SeatProvider } from "./components/SeatContext";

import { BookingProvider } from "./components/BookingContext";

import App from "./components/App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BookingProvider>
    <SeatProvider>
      <App />
    </SeatProvider>
  </BookingProvider>,
  rootElement
);
