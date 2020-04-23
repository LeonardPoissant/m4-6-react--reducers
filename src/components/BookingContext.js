import React, { useReducer, createContext } from "react";

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null
};

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        error: null,
        selectedSeatId: action.seatId,
        price: action.price
      };

    case "cancel-booking-process":
      return {
        ...state,
        status: "idle",
        selectedSeatId: null,
        price: null
      };

    case "purchase-ticket-request":
      return {
        ...state,
        status: "await-response",
        error: null
      };

    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: action.message
      };

    case "purchase-ticket-success":
      return {
        ...state,
        status: "success",
        price: null,
        selectedSeatId: null,
        error: null
      };

    case "clear-snack-bar":
      return {
        ...state,
        status: "idle"
      };

    default:
      throw new Error(`"error", ${action.type}`);
  }
}

export const BookingMechanism = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = ({ seatId, price }) => {
    console.log("BOOKINGCONTEXT", state);
    dispatch({
      type: "begin-booking-process",
      seatId,
      price
    });
  };

  const cancelBookingProcess = data => {
    dispatch({
      ...data,
      type: "cancel-booking-process"
    });
  };

  const purchaseTicketRequest = data => {
    dispatch({
      ...data,
      type: "purchase-ticket-request"
    });
  };
  const purchaseTicketSuccess = data => {
    dispatch({
      ...data,
      type: "purchase-ticket-success"
    });
  };
  const purchaseTicketFailure = message => {
    dispatch({
      type: "purchase-ticket-failure",
      message
    });
  };
  const clearSnackBar = data => {
    dispatch({
      ...data,
      type: "clear-snack-bar"
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketSuccess,
          purchaseTicketFailure,
          clearSnackBar
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingMechanism;
