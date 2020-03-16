import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null
};

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process": {
      return {
        status: "select-seat",
        selectedSeatId: action.selectedSeatId,
        price: action.price
      };
    }
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = ({ selectedSeatId, price }) => {
    dispatch({
      type: "begin-booking-process",
      selectedSeatId,
      price
    });
  };

  return (
    <>
      <BookingContext.Provider
        value={{
          state,
          actions: { beginBookingProcess }
        }}
      >
        {children}
      </BookingContext.Provider>
      ;
    </>
  );
};
