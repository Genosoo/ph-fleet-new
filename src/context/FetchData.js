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
} from "../api/api_urls";

export const useFetchData = () => {
  const [data, setData] = useState(() => {
    // Check if data exists in local storage
    const cachedData = localStorage.getItem("cachedData");
    return cachedData ? JSON.parse(cachedData) : null;
  }); // State to hold fetched data

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
        };

        setData(newData);
        localStorage.setItem("cachedData", JSON.stringify(newData)); // Store data in local storage
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!data) {
      fetchData(); // Call fetchData function only if data is not already fetched
    }

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 5 minutes
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 10 * 1000);

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, [data]); // Dependency array includes data to prevent infinite loop

  return data; // Return fetched data
};
