import React from "react";

import styled from "styled-components";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import SeatImgSrc from "../assets/seat-available.svg";

import { getRowName, getSeatNum, encodeSeatId } from "../helpers";
import { BookingContext } from "./BookingContext";

const Seat = ({ rowIndex, seatIndex, price, status }) => {
  const {
    actions: { beginBookingProcess }
  } = React.useContext(BookingContext);

  const rowName = getRowName(rowIndex);
  const seatNum = getSeatNum(rowName);
  const seatId = encodeSeatId(rowIndex, seatIndex);

  return (
    <>
      <Tippy content={`Row ${rowName} Seat ${seatNum} Price ${price}`}>
        <SeatWrapper
          key={seatId}
          disabled={status === "unavailable"}
          onClick={() => beginBookingProcess(seatId, price)}
        >
          <img src={SeatImgSrc} />
        </SeatWrapper>
      </Tippy>
    </>
  );
};

const SeatWrapper = styled.button`
  border-style: none;
  padding: 5px;

  &:disabled img {
    filter: grayscale(100%);
  }
`;

export default Seat;
