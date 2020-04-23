import React, { createContext, useReducer } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numofRows: 0,
  seatsPerRow: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow
      };

    case "mark-seat-as-purchased":
      return {
        ...state,
        isBooked: true
      };

    default:
      throw new Error(`unrecognized action : ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = data => {
    dispatch({
      ...data,
      type: "receive-seat-info-from-server"
    });
  };
  const markSeatAsPurchased = data => {
    dispatch({
      ...data,
      type: "mark-seat-as-purchased"
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased
        }
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};

export default SeatContext;
