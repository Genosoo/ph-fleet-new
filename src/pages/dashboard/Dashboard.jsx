/* eslint-disable react/prop-types */
import Cards from "./cards/Cards";
import Charts from "./charts/Charts";
import  { useEffect, useState } from "react";
import axios from "axios";
import ListCards from "./listcards/ListCards";

const baseUrl = import.meta.env.VITE_URL;

const getMarineTrafficData = `${baseUrl}/api/marine_traffic_latest/`;
const getTrakSatData = `${baseUrl}/api/traksat_latest/`;
const getSpiderTrakData = `${baseUrl}/api/spidertracks_latest/`;
// const getPersonnelData = `${baseUrl}/api/personnel_latest`;
// const getVideoStreamData = `${baseUrl}/api/video_stream_latest`;

export default function Dashboard() {
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [trakSatData, setTrakSatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);
  // const [personnelData, setPersonnelData] = useState([]);
  // const [videoStreamData, setVideoStreamData] = useState([]);


  const fetchData = async () => {
    try {
      const marineTrafficResponse = await axios.get(getMarineTrafficData);
      const trackSatResponse = await axios.get(getTrakSatData);
      const spiderTrakResponse = await axios.get(getSpiderTrakData);
      // const personnelResponse = await axios.get(getPersonnelData);
      // const videoStreamResponse = await axios.get(getVideoStreamData);

      setMarineTrafficData(marineTrafficResponse.data.success);
      setTrakSatData(trackSatResponse.data.success);
      setSpiderTrakData(spiderTrakResponse.data.success);
      // setPersonnelData(personnelResponse.data.success);
      // setVideoStreamData(videoStreamResponse.data.success);

      console.log("Marine Traffic", marineTrafficResponse.data);
      console.log("TrakSat", trackSatResponse.data);
      console.log("Spider Track", spiderTrakResponse.data);
      // console.log("Personnel", personnelResponse.data);
      // console.log("video Stream", videoStreamResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data at regular intervals
    }, 60000); // Fetch data every 60 seconds (adjust the interval as needed)

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);  

  return (
    <div className="dashboard_container">
      <Cards marineTrafficData={marineTrafficData} trakSatData={trakSatData} spiderTrakData={spiderTrakData} />
      <Charts />
      <ListCards />
    </div>
  )
}
