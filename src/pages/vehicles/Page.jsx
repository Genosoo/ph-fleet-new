import TableComponent from "./table/TableComponent";
import "./Styles.css"
import GetToken from "../../components/token/GetToken";
import {  apiUnit} from "../../api/api_urls";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const csrfToken = GetToken()
  const [unitData, setUnitData] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      try {
        const unitResponse = await axios.get(apiUnit);

        setUnitData(unitResponse.data.success)

      } catch (error) {
        console.log(error)
    }
  }
  fetchData()
  },[])

  return (
    <div className="vehiclesContainer">
       <TableComponent  
          csrfToken={csrfToken} 
          unitData={unitData}
        />
    </div>
  )
}
