import React, { useContext } from "react";

import Tippy from "@tippy.js/react";

import "tippy.js/dist/tippy.css";

import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";

import { getRowName, getSeatNum, encodeSeatId } from "../helpers";

import seatImageSrc from "../assets/seat-available.svg";

const Seat = ({ rowIndex, seatIndex, price, status }) => {
  const {
    actions: { beginBookingProcess }
  } = useContext(BookingContext);
  console.log(status);

  const rowName = getRowName(rowIndex);
  const seatNum = getSeatNum(seatIndex);
  const seatId = encodeSeatId(rowIndex, seatIndex);

  return (
    <Tippy content={`Row ${rowName}, Seat ${seatNum}, price ${price}`}>
      <button
        disabled={status === "unavailable"}
        onClick={() => {
          beginBookingProcess({ seatId, price });
        }}
      >
        <img
          src={seatImageSrc}
          style={
            status === "unavailable"
              ? { filter: "grayscale(100%)" }
              : { filter: "none" }
          }
        ></img>
      </button>
    </Tippy>
  );
};

export default Seat;
