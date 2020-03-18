import React from "react";
import styled from "styled-components";

import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import PurchaseModal from "./PurchaseModal";
import TicketWidget from "./TicketWidget";

import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    actions: { receiveSeatInfoFromServer }
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, []);

  const {
    actions: { beginBookingProcess }
  } = React.useContext(BookingContext);

  return (
    <>
      <GlobalStyles />
      <div>
        <TicketWidget />
      </div>
      <PurchaseModal />
    </>
  );
}

export default App;
