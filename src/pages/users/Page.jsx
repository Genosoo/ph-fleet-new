import TableComponent from "./table/TableComponent";
import { useFetchData } from "../../context/FetchData";
import { apiUsers } from "../../api/api_urls";
import GetToken from "../../components/token/GetToken";

export default function Page() {
  const fetchedData = useFetchData();
  const csrfToken =  GetToken()

  return (
    <main className="">
        <TableComponent 
            usersData={fetchedData.usersData}
            apiUsers={apiUsers}
            csrfToken={csrfToken}
         />
    </main>
  )
}
