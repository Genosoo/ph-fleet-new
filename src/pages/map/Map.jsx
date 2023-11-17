/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapContent from "./MapContent";

const baseUrl = import.meta.env.VITE_URL;

const getMarineTrafficData = `${baseUrl}/api/marine_traffic_latest/`;
const getTraksatData = `${baseUrl}/api/traksat_latest/`;
const getSpiderTrakData = `${baseUrl}/api/spidertracks_latest/`;
const getPersonnelData = `${baseUrl}/api/personnel_latest`;
const getVideoStreamData = `${baseUrl}/api/video_stream_latest`;

export default function MainApp() {
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [tracksatData, setTracksatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [videoStreamData, setVideoStreamData] = useState([]);

  const fetchData = async () => {
    try {
      const marineTrafficResponse = await axios.get(getMarineTrafficData);
      const tracksatResponse = await axios.get(getTraksatData);
      const spiderTrakResponse = await axios.get(getSpiderTrakData);
      const personnelResponse = await axios.get(getPersonnelData);
      const videoStreamResponse = await axios.get(getVideoStreamData);

      setMarineTrafficData(marineTrafficResponse.data.success);
      setTracksatData(tracksatResponse.data.success);
      setSpiderTrakData(spiderTrakResponse.data.success);
      setPersonnelData(personnelResponse.data.success);
      setVideoStreamData(videoStreamResponse.data.success);

      console.log("Marine Traffic", marineTrafficResponse.data);
      console.log("Tracksat", tracksatResponse.data);
      console.log("Spider Track", spiderTrakResponse.data);
      console.log("Personnel", personnelResponse.data);
      console.log("video Stream", videoStreamResponse.data);
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
    <div>
      <MapContent
        marineTrafficData={marineTrafficData}
        tracksatData={tracksatData}
        spiderTrakData={spiderTrakData}
        personnelData= {personnelData}
        videoStreamData= {videoStreamData}
      />
    </div>
  );
}
