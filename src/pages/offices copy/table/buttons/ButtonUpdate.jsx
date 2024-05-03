/* eslint-disable react/prop-types */
import { CiEdit } from "react-icons/ci";
export default function ButtonUpdate({ item, handleOpenUpdateForm }) {
  return (
    <button className="btnUpdate" onClick={() => handleOpenUpdateForm(item)}>
        <CiEdit  />
    </button>
  )
}
