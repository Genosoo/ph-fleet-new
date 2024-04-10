/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa6";
export default function ButtonAdd({ handleOpenAddForm }) {
  return (
    <button className="btnAdd" onClick={handleOpenAddForm}>
        <FaPlus className="icon" />
        Add Personnel
    </button>
  )
}
