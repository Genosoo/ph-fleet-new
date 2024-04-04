import TableComponent from "./table/TableComponent";
import { apiUsers } from "../../api/api_urls";
import GetToken from "../../components/token/GetToken";
import './UserStyles.css'

export default function Page() {
  const csrfToken =  GetToken()

  return (
    <main className="usersContainer">
        <TableComponent 
            apiUsers={apiUsers}
            csrfToken={csrfToken}
         />
    </main>
  )
}
