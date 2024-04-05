import { useState, useEffect } from "react";
import axios from "axios";
import {
  apiMarineTrafficData,
  apiTrakSatData,
  apiSpiderTrakData,
  apiPersonnelData,
  apiVideoStream,
  apiOfficesData,
  apiVehiclesData,
  apiIncident,
  apiCarTrack,
  apiCheckInToday,
  apiVesselsData,
  apiUsers,
  apiAircraftData,
} from "../api/api_urls";

export const useFetchData = () => {
  const [data, setData] = useState(null); // State to hold fetched data

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
        const checkInResponse = await axios.get(apiCheckInToday);
        const vesselsResponse = await axios.get(apiVesselsData);
        const usersResponse = await axios.get(apiUsers);
        const aircraftResponse = await axios.get(apiAircraftData);

        // Set the fetched data to the state
        const newData = {
          marineTrafficData: marineTrafficResponse.data.success,
          tracksatData: tracksatResponse.data.success,
          spiderTrakData: spiderTrakResponse.data.success,
          personnelData: personnelResponse.data.success,
          videoStreamData: videoStreamResponse.data.success,
          officeData: officeResponse.data.success,
          vehiclesData: vehiclesResponse.data.success,
          incidentData: incidentResponse.data.success,
          carData: carResponse.data.data,
          checkInData: checkInResponse.data.success,
          vesselsData: vesselsResponse.data.success,
          usersData: usersResponse.data.success,
          aircraftData: aircraftResponse.data.success,
        };

        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};
