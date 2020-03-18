import React from "react";

import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { decodeSeatId } from "../helpers";

import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { status, seatId, price, message },
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess
    }
  } = React.useContext(BookingContext);
  console.log("SEATID", seatId, status);
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const { seatNum, rowName } = decodeSeatId(seatId);

  return (
    <Dialog open={seatId !== null} onClose={cancelBookingProcess}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <h1>PURCHASE TICKET</h1>
            <h3>You are purchasing 1 ticket at the price of {price}$</h3>
            <TableRow>
              <TableCell>Row:</TableCell>
              <TableCell>Seat:</TableCell>
              <TableCell>Price:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{rowName}</TableCell>
              <TableCell>{seatNum}</TableCell>
              <TableCell>{price}$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <form
        onSubmit={ev => {
          ev.preventDefault();

          purchaseTicketRequest();

          fetch("/api/book-seat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              creditCard,
              expiration,
              seatId
            })
              .then(res => res.json())
              .then(data => {
                if (data.success) {
                  console.log("SUCCESS");
                  purchaseTicketSuccess();
                } else {
                  console.log("FAILURE");
                  purchaseTicketFailure(data.message);
                }
              })
              .catch(err => {
                console.log(err);
                purchaseTicketFailure("ASDSKJDSKJD");
              })
          });
        }}
      >
        <h2>Enter CC Information</h2>
        <TextField
          placeholder="Credit-Card-Number"
          value={creditCard}
          onChange={ev => setCreditCard(ev.currentTarget.value)}
        ></TextField>
        <TextField
          placeholder="Expiration"
          value={expiration}
          onChange={ev => setExpiration(ev.currentTarget.value)}
        ></TextField>
        <Button>Confirm</Button>
      </form>
    </Dialog>
  );
};

export default PurchaseModal;
