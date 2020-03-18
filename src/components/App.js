import React from "react";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import PurchaseModal from "./PurchaseModal";
import TicketWidget from "./TicketWidget";

import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    actions: { receiveSeatInfoFromServer }
  } = React.useContext(SeatContext);

  const {
    state: { status },
    actions: { clearSnackBar }
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <div>
        <TicketWidget />
      </div>
      <PurchaseModal />
      <Snackbar open={status === "purchased"} severity="success">
        <MuiAlert onClose={clearSnackBar} severity="success">
          Congratulations!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default App;
