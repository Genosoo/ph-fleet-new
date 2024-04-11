/* eslint-disable react/prop-types */
import { PiArrowCounterClockwiseBold } from "react-icons/pi";

export default function ButtonResetFilter({ resetFilters }) {
  return (
    <button className="btnResetFilter" onClick={resetFilters}>
        < PiArrowCounterClockwiseBold/> 
    </button>
  )
}
