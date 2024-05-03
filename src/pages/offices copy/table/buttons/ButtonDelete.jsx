/* eslint-disable react/prop-types */
import { FiDelete } from "react-icons/fi";
export default function ButtonDelete({ itemId, handleOpenDeleteConfirmation }) {
  return (
    <button className="btnDelete"  onClick={() => handleOpenDeleteConfirmation(itemId)}>
        <FiDelete />
    </button>
  )
}
