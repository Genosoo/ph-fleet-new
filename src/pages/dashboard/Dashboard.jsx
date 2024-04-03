/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Cards from "./cards/Cards";
import Charts from "./charts/index";
import ListCards from "./listcards/ListCards";

import { useFetchData } from "../../context/FetchData";


export default function Dashboard() {
  const fetchedData = useFetchData();





  return (
    <div className="dashboard_container">
          <Cards
            marineTrafficData={fetchedData.marineTrafficData}
            trakSatData={fetchedData.tracksatData}
            spiderTrakData={fetchedData.spiderTrakData}
            personnelData={fetchedData.personnelData}
            checkInData={fetchedData.checkInData}
            officesData={fetchedData.officesData}
            vehiclesData={fetchedData.vehiclesData}
          />

          <Charts
             marineTrafficData={fetchedData.marineTrafficData}
             trakSatData={fetchedData.tracksatData}
             spiderTrakData={fetchedData.spiderTrakData}
          />
          
          <ListCards
            marineTrafficData={fetchedData.marineTrafficData}
            trakSatData={fetchedData.tracksatData}
            spiderTrakData={fetchedData.spiderTrakData}
            personnelData={fetchedData.personnelData}
            checkInData={fetchedData.checkInData}
          />
    </div>
  );
}
