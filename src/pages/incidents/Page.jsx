import TableComponent from "./table/TableComponent";
import "./IncidentStyles.css"
import GetToken from "../../components/token/GetToken";

export default function Incident() {
  const csrfToken =  GetToken()
 
  return (
    <div className="incidentContainer">
      <TableComponent csrfToken={csrfToken}  />
    </div>
  );
}
