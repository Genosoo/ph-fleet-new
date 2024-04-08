import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

export default function ButtonAddReport() {
  return (
    <Link className="btnAdd" to={"/fleet/incidents/add-report"}>
      <FaPlus />  Add Report
    </Link>
  )
}
