import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
  price: null
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server": {
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
        price: action.price
      };
    }

    case "mark-seat-as-purchased": {
      console.log("mark-seat-as-purchased", state);
      return {
        ...state
      };
    }

    default:
      throw new Error(`This is an error:${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const receiveSeatInfoFromServer = data => {
    dispatch({
      ...data,
      type: "receive-seat-info-from-server"
    });
  };

  const markSeatasPurchased = data => {
    console.log("markSeatasPurchased", data);
    dispatch({
      ...data,
      type: "mark-seat-as-purchased"
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: { receiveSeatInfoFromServer, markSeatasPurchased }
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
