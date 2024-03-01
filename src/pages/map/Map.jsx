/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapContent from "./MapContent";
import RefreshData from "./refreshData/RefreshData";
import { 
  apiMarineTrafficData,
  apiTrakSatData,
  apiSpiderTrakData,
  apiPersonnelData,
  apiVideoStream,
  apiOfficesData,
  apiVehiclesData,
  apiIncident,
  apiCarTrack

 } from "../../api/api_urls";

export default function MainApp() {
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [tracksatData, setTracksatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [videoStreamData, setVideoStreamData] = useState([]);
  const [officeData, setOfficeData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [incidentData, setIncidentData] = useState([]);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marineTrafficResponse = await axios.get(apiMarineTrafficData);
        const tracksatResponse = await axios.get(apiTrakSatData);
        const spiderTrakResponse = await axios.get(apiSpiderTrakData);
        const personnelResponse = await axios.get(apiPersonnelData);
        const videoStreamResponse = await axios.get(apiVideoStream);
        const officeResponse = await axios.get(apiOfficesData);
        const vehiclesResponse = await axios.get(apiVehiclesData);
        const incidentResponse = await axios.get(apiIncident);
        const carResponse = await axios.get(apiCarTrack);

        setMarineTrafficData(marineTrafficResponse.data.success);
        setTracksatData(tracksatResponse.data.success);
        setSpiderTrakData(spiderTrakResponse.data.success);
        setPersonnelData(personnelResponse.data.success);
        setVideoStreamData(videoStreamResponse.data.success);
        setOfficeData(officeResponse.data.success);
        setVehiclesData(vehiclesResponse.data.success);
        setIncidentData(incidentResponse.data.success);
        setCarData(carResponse.data.data);

        console.log("Marine Traffic", marineTrafficResponse.data);
        console.log("Tracksat", tracksatResponse.data);
        console.log("Spider Track", spiderTrakResponse.data);
        console.log("Personnel", personnelResponse.data);
        console.log("video Stream", videoStreamResponse.data);
        console.log("Office", officeResponse.data);
        console.log("Vehicles", vehiclesResponse.data);
        console.log("Incident", incidentResponse.data);
        console.log("Car", carResponse.data);
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
        carData={carData}
      />
    </div>
  );
}
