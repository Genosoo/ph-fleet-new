import TableComponent from "./table/TableComponent";
import GetToken from "../../components/token/GetToken";
import './Styles.css'
import { apiRoles, apiUnit, apiPersonnelStatus, apiPersonnelRank } from "../../api/api_urls";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Page() {
  const csrfToken =  GetToken()
  const [rolesData, setRolesData] = useState([])
  const [unitData, setUnitData] = useState([])
  const [personnelStatus, setPersonnelStatus] = useState([])
  const [personnelRank, setPersonnelRank] = useState([])

  
  useEffect(() => {
    const fetchData = async() => {
      try {
        const rolesResponse = await axios.get(apiRoles);
        const unitResponse = await axios.get(apiUnit);
        const personnelStatusResponse = await axios.get(apiPersonnelStatus);
        const rankResponse = await axios.get(apiPersonnelRank);


        setRolesData(rolesResponse.data.success)
        setUnitData(unitResponse.data.success)
        setPersonnelStatus(personnelStatusResponse.data.success)
        setPersonnelRank(rankResponse.data.success)

      } catch (error) {
        console.log(error)
    }
  }
  fetchData()
  },[])

  return (
    <main className="usersContainer">
        <TableComponent csrfToken={csrfToken}
          rolesData={rolesData}
          unitData={unitData}
          personnelStatus={personnelStatus}
          personnelRank={personnelRank} />
    </main>
  )
}
