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
  apiIncidentStatus,
  apiPersonnelHistory,
  apiReportIn,
} from '../api/api_urls';

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    marineTrafficData: [],
    traksatData: [],
    spidertracksData: [],
    videoStreamData: [],
    officesData: [],
    vehiclesData: [],
    carData: [],
    checkInData: [],
    vesselsData: [],
    usersData: [],
    aircraftsData: [],
    accountData: {},
    rolesData: [],
    unitData: [],
    

    incidentData: [],
    incidentType: [],
    incidentSeverity: [],
    incidentStatus: [],

    personnelData: [],
    personnelHistory: [],
    personnelStatus: [],
    personnelRank: [],

    reportInData: [],



  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          marineTrafficResponse,
          tracksatResponse,
          spidertracksResponse,
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

          personnelResponse,
          personnelHistoryResponse,

          reportInResponse,



        ] = await Promise.all([
          axios.get(apiMarineTrafficData),
          axios.get(apiTrakSatData),
          axios.get(apiSpiderTrakData),
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

          axios.get(apiPersonnelData),
          axios.get(apiPersonnelHistory),
          
          axios.get(apiReportIn),

        ]);

        setData({
          marineTrafficData: marineTrafficResponse.data.success,
          traksatData: tracksatResponse.data.success,
          spidertracksData: spidertracksResponse.data.success,
          videoStreamData: videoStreamResponse.data.success,
          officesData: officeResponse.data.success,
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


          personnelData: personnelResponse.data.success,
          personnelHistory: personnelHistoryResponse.data.success,

          reportInData: reportInResponse.data.success,


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

  const updatePersonnelData = (newPersonnelData) => {
    setData((prevData) => ({
      ...prevData,
      personnelData: newPersonnelData,
    }));
  };


  const updateOfficesData = (newOfficesData) => {
    setData((prevData) => ({
      ...prevData,
      officesData: newOfficesData,
    }));
  };


  const updateReportInData = (newReportInData) => {
    setData((prevData) => ({
      ...prevData,
      reportInData: newReportInData,
    }));
  };


  const updateVehiclesData = (newVehiclesData) => {
    setData((prevData) => ({
      ...prevData,
      vehiclesData: newVehiclesData,
    }));
  };


 
  return (
    <DataContext.Provider value={{ ...data, 
      updateVesselsData, 
      updateUsersData, 
      updateAccountData, 
      updateAircraftsData,
      updateIncidentData,
      updatePersonnelData,
      updateOfficesData,
      updateReportInData,
      updateVehiclesData
     }}>
      {isLoading ? <Loader /> : children}
    </DataContext.Provider>
  );
}
