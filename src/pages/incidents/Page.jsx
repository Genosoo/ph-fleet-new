import TableComponent from "./table/TableComponent";
import "./Styles.css"
import GetToken from "../../components/token/GetToken";

export default function Incident() {
  const csrfToken =  GetToken()
 
  return (
    <div className="pr-20">
      <TableComponent csrfToken={csrfToken}  />
    </div>
  );
}
