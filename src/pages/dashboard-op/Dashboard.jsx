/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Cards from "./cards/Cards";
import Charts from "./charts/index";
import ListCards from "./listcards/ListCards";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import { apiSummary  } from "../../api/api_urls";
import axios from 'axios';
import  { useState, useEffect } from 'react';

export default function Dashboard() {
  const {marineTrafficData,
    traksatData, 
    spidertracksData, 
    personnelData, 
    officeData, 
    vehiclesData,
    checkInData, 
    incidentData,
  } = useContext(DataContext)

  const [summaryData, setSummaryData] = useState([])


  useEffect(() => {
      const fetchSummary = async() => {
          try {
              const res = await axios.get(apiSummary)
              setSummaryData(res.data.success)
       console.log("Summary:", res.data.success)
          } catch (error) {
              console.error(error)
          }
      }
      fetchSummary();
  },[])



  return (
    <div className="dashboard_container">
          <Cards
            marineTrafficData={marineTrafficData}
            trakSatData={traksatData}
            spiderTrakData={spidertracksData}
            personnelData={personnelData}
            checkInData={checkInData}
            officesData={officeData}
            vehiclesData={vehiclesData}
            summaryData={summaryData}
          />

          <Charts
             marineTrafficData={marineTrafficData}
             trakSatData={traksatData}
             spiderTrakData={spidertracksData}
          />
          
          <ListCards
            marineTrafficData={marineTrafficData}
            trakSatData={traksatData}
            spiderTrakData={spidertracksData}
            checkInData={checkInData}
            incidentData={incidentData}
          />
    </div>
  );
}
