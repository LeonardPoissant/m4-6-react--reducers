import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  seatId: null,
  price: null
};

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        status: "select-seat",
        seatId: action.seatId,
        price: action.price
      };
    }
    case "cancel-booking-process": {
      return {
        ...state,
        status: "idle",
        seatId: null,
        price: null
      };
    }
    case "purchase-ticket-request": {
      return {
        ...state,
        error: null,
        status: "await-response"
      };
    }
    case "purchase-ticket-failure": {
      return {
        ...state,
        error: "Please enter valid information",
        status: action.message
      };
    }
    case "purchase-ticket-success": {
      return {
        ...state,
        status: "purchased",
        seatId: null,
        price: null,
        error: null
      };
    }

    case "clear-snack-bar": {
      return {
        ...state,
        status: "idle"
      };
    }

    default:
      throw new Error(`Error: ${action.type}`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = data => {
    //console.log(`${rowName}-${seatIndex} ${price}`);
    dispatch({
      ...data,
      type: "begin-booking-process"
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
  const purchaseTicketFailure = message => {
    dispatch({
      ...message,
      type: "purchase-ticket-failure"
    });
  };

  const purchaseTicketSuccess = data => {
    dispatch({
      ...data,
      type: "purchase-ticket-success"
    });
  };

  const clearSnackBar = data => {
    dispatch({
      ...data,
      type: "clear-snack-bar"
    });
  };

  return (
    <>
      <BookingContext.Provider
        value={{
          state,
          actions: {
            beginBookingProcess,
            cancelBookingProcess,
            purchaseTicketRequest,
            purchaseTicketFailure,
            purchaseTicketSuccess,
            clearSnackBar
          }
        }}
      >
        {children}
      </BookingContext.Provider>
      ;
    </>
  );
};
