import TableComponent from "./table/TableComponent";
import GetToken from "../../components/token/GetToken";
import './Styles.css'

export default function Page() {
 const csrfToken =  GetToken()

  return (
    <main className="aircraftsContainer">
       <TableComponent csrfToken={csrfToken}/>
    </main>
  )
}
