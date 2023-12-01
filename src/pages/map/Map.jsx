/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapContent from "./MapContent";
import RefreshData from "./refreshData/RefreshData";

const baseUrl = import.meta.env.VITE_URL;

const getMarineTrafficData = `${baseUrl}/api/marine_traffic_latest/`;
const getTraksatData = `${baseUrl}/api/traksat_latest/`;
const getSpiderTrakData = `${baseUrl}/api/spidertracks_latest/`;
const getPersonnelData = `${baseUrl}/api/personnel_latest`;
const getVideoStreamData = `${baseUrl}/api/video_stream_latest`;
const getOfficeData = `${baseUrl}/api/office/`;
const getVehiclesData = `${baseUrl}/api/vehicle/`;
const getIncidentData = `${baseUrl}/api/incident/`;

export default function MainApp() {
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [tracksatData, setTracksatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [videoStreamData, setVideoStreamData] = useState([]);
  const [officeData, setOfficeData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marineTrafficResponse = await axios.get(getMarineTrafficData);
        const tracksatResponse = await axios.get(getTraksatData);
        const spiderTrakResponse = await axios.get(getSpiderTrakData);
        const personnelResponse = await axios.get(getPersonnelData);
        const videoStreamResponse = await axios.get(getVideoStreamData);
        const officeResponse = await axios.get(getOfficeData);
        const vehiclesResponse = await axios.get(getVehiclesData);
        const incidentResponse = await axios.get(getIncidentData);

        setMarineTrafficData(marineTrafficResponse.data.success);
        setTracksatData(tracksatResponse.data.success);
        setSpiderTrakData(spiderTrakResponse.data.success);
        setPersonnelData(personnelResponse.data.success);
        setVideoStreamData(videoStreamResponse.data.success);
        setOfficeData(officeResponse.data.success);
        setVehiclesData(vehiclesResponse.data.success);
        setIncidentData(incidentResponse.data.success);

        console.log("Marine Traffic", marineTrafficResponse.data);
        console.log("Tracksat", tracksatResponse.data);
        console.log("Spider Track", spiderTrakResponse.data);
        console.log("Personnel", personnelResponse.data);
        console.log("video Stream", videoStreamResponse.data);
        console.log("Office", officeResponse.data);
        console.log("Vehicles", vehiclesResponse.data);
        console.log("Incident", incidentResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 60000); // Fetch data every 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Include csrfToken as a dependency

  return (
    <div>
      <RefreshData />
      <MapContent
        marineTrafficData={marineTrafficData}
        tracksatData={tracksatData}
        spiderTrakData={spiderTrakData}
        personnelData={personnelData}
        videoStreamData={videoStreamData}
        officeData={officeData}
        vehiclesData={vehiclesData}
        incidentData={incidentData}
      />
    </div>
  );
}
