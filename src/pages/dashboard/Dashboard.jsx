/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Cards from "./cards/Cards";
import Charts from "./charts/index";
import ListCards from "./listcards/ListCards";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";


export default function Dashboard() {
  const {marineTrafficData,
    traksatData, 
    spidertracksData, 
    personnelData, 
    officeData, 
    vehiclesData,
    checkInData, 
  } = useContext(DataContext)


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
            personnelData={personnelData}
            checkInData={checkInData}
          />
    </div>
  );
}
