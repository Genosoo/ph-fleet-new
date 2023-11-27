/* eslint-disable react/prop-types */
import Cards from "./cards/Cards";
import Charts from "./charts/Charts";
import { useEffect, useState } from "react";
import axios from "axios";
import ListCards from "./listcards/ListCards";

const baseUrl = import.meta.env.VITE_URL;

const getMarineTrafficData = `${baseUrl}/api/marine_traffic_latest/`;
const getTrakSatData = `${baseUrl}/api/traksat_latest/`;
const getSpiderTrakData = `${baseUrl}/api/spidertracks_latest/`;
const getAllUsers = `${baseUrl}/api/users/`;
const getCheckInToday = `${baseUrl}/api/checked_in_users/`;
const getPersonnelData = `${baseUrl}/api/personnel_latest`;

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [trakSatData, setTrakSatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [checkInData, setCheckInData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const marineTrafficResponse = await axios.get(getMarineTrafficData);
      const trackSatResponse = await axios.get(getTrakSatData);
      const spiderTrakResponse = await axios.get(getSpiderTrakData);
      const getAllUserData = await axios.get(getAllUsers);
      const personnelResponse = await axios.get(getPersonnelData);
      const checkInResponse = await axios.get(getCheckInToday);

      setMarineTrafficData(marineTrafficResponse.data.success);
      setTrakSatData(trackSatResponse.data.success);
      setSpiderTrakData(spiderTrakResponse.data.success);
      setPersonnelData(personnelResponse.data.success);
      setCheckInData(checkInResponse.data.success);

      console.log("Marine Traffic", marineTrafficResponse.data);
      console.log("TrakSat", trackSatResponse.data);
      console.log("Spider Track", spiderTrakResponse.data);
      console.log("all users", getAllUserData.data);
      console.log("Check in Today", checkInResponse.data);
      console.log("Personnel", personnelResponse.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    // const intervalId = setInterval(() => {
    //   fetchData(); // Fetch data at regular intervals
    // }, 60000); // Fetch data every 60 seconds (adjust the interval as needed)

    // Clear interval on component unmount to prevent memory leaks
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard_container">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching Data...</p>
        </div>
      ) : (
        <>
          <Cards
            marineTrafficData={marineTrafficData}
            trakSatData={trakSatData}
            spiderTrakData={spiderTrakData}
            personnelData={personnelData}
            checkInData={checkInData}
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
