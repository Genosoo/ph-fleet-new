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
  apiCarTrack,
  apiCheckInToday,
  apiVesselsData,
  apiUsers,
  apiAircraftData,
  apiAccount,

  apiIncident,
  apiIncidentType,
  apiIncidentSeverity,
  apiIncidentStatus
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
    carData: [],
    checkInData: [],
    vesselsData: [],
    usersData: [],
    aircraftsData: [],
    accountData: {},

    incidentData: [],
    incidentType: [],
    incidentSeverity: [],
    incidentStatus: [],

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
        
          carResponse,
          checkInResponse,
          vesselsResponse,
          usersResponse,
          aircraftResponse,
          accountResponse,

          incidentResponse,
          incidentTypeResponse,
          incidentSeverityResponse,
          incidentStatusResponse,

        ] = await Promise.all([
          axios.get(apiMarineTrafficData),
          axios.get(apiTrakSatData),
          axios.get(apiSpiderTrakData),
          axios.get(apiPersonnelData),
          axios.get(apiVideoStream),
          axios.get(apiOfficesData),
          axios.get(apiVehiclesData),
          axios.get(apiCarTrack),
          axios.get(apiCheckInToday),
          axios.get(apiVesselsData),
          axios.get(apiUsers),
          axios.get(apiAircraftData),
          axios.get(apiAccount),

          axios.get(apiIncident),
          axios.get(apiIncidentType),
          axios.get(apiIncidentSeverity),
          axios.get(apiIncidentStatus),

        ]);

        setData({
          marineTrafficData: marineTrafficResponse.data.success,
          traksatData: tracksatResponse.data.success,
          spidertracksData: spidertracksResponse.data.success,
          personnelData: personnelResponse.data.success,
          videoStreamData: videoStreamResponse.data.success,
          officeData: officeResponse.data.success,
          vehiclesData: vehiclesResponse.data.success,
          carData: carResponse.data.data,
          checkInData: checkInResponse.data.success,
          vesselsData: vesselsResponse.data.success,
          usersData: usersResponse.data.success,
          aircraftsData: aircraftResponse.data.success,
          accountData: accountResponse.data.success,

          incidentData: incidentResponse.data.success,
          incidentType: incidentTypeResponse.data.success,
          incidentSeverity: incidentSeverityResponse.data.success,
          incidentStatus: incidentStatusResponse.data.success,

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

  // Define a function to update usersData state
  const updateUsersData = (newUsersData) => {
    setData((prevData) => ({
      ...prevData,
      usersData: newUsersData,
    }));
  };

  // Define a function to update accountData state
  const updateAccountData = (newAccountData) => {
    setData((prevData) => ({
      ...prevData,
      accountData: newAccountData,
    }));
  };

   // Define a function to update accountData state
   const updateAircraftsData = (newAircraftsData) => {
    setData((prevData) => ({
      ...prevData,
      aircraftsData: newAircraftsData,
    }));
  };

  const updateIncidentData = (newIncidentData) => {
    setData((prevData) => ({
      ...prevData,
      incidentData: newIncidentData,
    }));
  };


  return (
    <DataContext.Provider value={{ ...data, 
      updateVesselsData, 
      updateUsersData, 
      updateAccountData, 
      updateAircraftsData,
      updateIncidentData
     }}>
      {isLoading ? <Loader /> : children}
    </DataContext.Provider>
  );
}
