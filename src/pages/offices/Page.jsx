import TableComponent from "./table/TableComponent";
import "./Styles.css"
import GetToken from "../../components/token/GetToken";

export default function Page() {
  const csrfToken = GetToken()

  return (
    <div className="officesContainer">
       <TableComponent  
        csrfToken={csrfToken}
        />
    </div>
  )
}
