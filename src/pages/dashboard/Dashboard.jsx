/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Cards from "./cards/Cards";
import Charts from "./charts/Charts";
import { useEffect, useState } from "react";
import axios from "axios";
import ListCards from "./listcards/ListCards";
import { 
  apiMarineTrafficData, 
  apiTrakSatData, 
  apiSpiderTrakData,
  apiUsers,
  apiCheckInToday,
  apiPersonnelData,
  apiOfficesData,
  apiVehiclesData
 } from "../../api/api_urls";



export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [trakSatData, setTrakSatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [checkInData, setCheckInData] = useState([]);
  const [officesData, setOfficesData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);



  useEffect(() => {
  const fetchData = async () => {
    try {

      const marineTrafficResponse = await axios.get(apiMarineTrafficData);
      const trackSatResponse = await axios.get(apiTrakSatData);
      const spiderTrakResponse = await axios.get(apiSpiderTrakData);
      const getAllUserData = await axios.get(apiUsers);
      const personnelResponse = await axios.get(apiPersonnelData);
      const checkInResponse = await axios.get(apiCheckInToday);
      const officesResponse = await axios.get(apiOfficesData);
      const vehiclesResponse = await axios.get(apiVehiclesData);

      setMarineTrafficData(marineTrafficResponse.data.success);
      setTrakSatData(trackSatResponse.data.success);
      setSpiderTrakData(spiderTrakResponse.data.success);
      setPersonnelData(personnelResponse.data.success);
      setCheckInData(checkInResponse.data.success);
      setOfficesData(officesResponse.data.success);
      setVehiclesData(vehiclesResponse.data.success);

      console.log("Marine Traffic ", marineTrafficResponse.data);
      console.log("TrakSat", trackSatResponse.data);
      console.log("Spider Track", spiderTrakResponse.data);
      console.log("all users", getAllUserData.data);
      console.log("Check in Today", checkInResponse.data);
      console.log("Personnel", personnelResponse.data);
      console.log("Offices", officesResponse.data);
      console.log("Vehicles", vehiclesResponse.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

    fetchData(); 
  }, []);


  return (
    <div className="dashboard_container">
      {loading ? (
          <div className="loaderContainer">
          <div className="loader">
           <span></span>
         </div>
        </div>
      ) : (
        <>
          <Cards
            marineTrafficData={marineTrafficData}
            trakSatData={trakSatData}
            spiderTrakData={spiderTrakData}
            personnelData={personnelData}
            checkInData={checkInData}
            officesData={officesData}
            vehiclesData={vehiclesData}
          />
          <Charts />
          <ListCards
            marineTrafficData={marineTrafficData}
            trakSatData={trakSatData}
            spiderTrakData={spiderTrakData}
            personnelData={personnelData}
            checkInData={checkInData}
          />
        </>
      )}
    </div>
  );
}
