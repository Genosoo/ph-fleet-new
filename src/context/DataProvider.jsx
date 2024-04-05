/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import Loader from '../Loader';
import axios from 'axios';
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
  apiAccount,
} from '../api/api_urls';

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    marineTrafficData: [],
    traksatData: [],
    spidertracksData: [],
    personnelData: [],
    videoStreamData: [],
    officeData: [],
    vehiclesData: [],
    incidentData: [],
    carData: [],
    checkInData: [],
    vesselsData: [],
    usersData: [],
    aircraftData: [],
    accountData: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          marineTrafficResponse,
          tracksatResponse,
          spidertracksResponse,
          personnelResponse,
          videoStreamResponse,
          officeResponse,
          vehiclesResponse,
          incidentResponse,
          carResponse,
          checkInResponse,
          vesselsResponse,
          usersResponse,
          aircraftResponse,
          accountResponse,
        ] = await Promise.all([
          axios.get(apiMarineTrafficData),
          axios.get(apiTrakSatData),
          axios.get(apiSpiderTrakData),
          axios.get(apiPersonnelData),
          axios.get(apiVideoStream),
          axios.get(apiOfficesData),
          axios.get(apiVehiclesData),
          axios.get(apiIncident),
          axios.get(apiCarTrack),
          axios.get(apiCheckInToday),
          axios.get(apiVesselsData),
          axios.get(apiUsers),
          axios.get(apiAircraftData),
          axios.get(apiAccount),
        ]);

        setData({
          marineTrafficData: marineTrafficResponse.data.success,
          traksatData: tracksatResponse.data.success,
          spidertracksData: spidertracksResponse.data.success,
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
          accountData: accountResponse.data.success,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define a function to update vesselsData state
  const updateVesselsData = (newVesselsData) => {
    setData((prevData) => ({
      ...prevData,
      vesselsData: newVesselsData,
    }));
  };


    // Define a function to update vesselsData state
    const updateUsersData = (newUsersData) => {
      setData((prevData) => ({
        ...prevData,
        usersData: newUsersData,
      }));
    };

  return (
    <DataContext.Provider value={{ ...data, updateVesselsData, updateUsersData }}>
      {isLoading ? <Loader /> : children}
    </DataContext.Provider>
  );
}
