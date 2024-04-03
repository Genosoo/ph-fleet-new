import { useState, useEffect, useMemo } from "react";
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
  const [initialDataLoaded, setInitialDataLoaded] = useState(false); // State to track if initial data is loaded
  const [cachedData, setCachedData] = useState({}); // State to store cached data

  // Function to fetch data
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

      // Store fetched data in cache
      setCachedData({
        marineTrafficData: marineTrafficResponse.data.success,
        tracksatData: tracksatResponse.data.success,
        spiderTrakData: spiderTrakResponse.data.success,
        personnelData: personnelResponse.data.success,
        videoStreamData: videoStreamResponse.data.success,
        officeData: officeResponse.data.success,
        vehiclesData: vehiclesResponse.data.success,
        incidentData: incidentResponse.data.success,
        carData: carResponse.data.data
      });

      // Indicate that initial data is loaded
      setInitialDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();

    // Fetch data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Memoize cached data
  const memoizedCachedData = useMemo(() => cachedData, [cachedData]);
  console.log("cached:", memoizedCachedData)

  return (
    <div>
      <RefreshData />
      {initialDataLoaded ? ( // Render MapContent only if initial data is loaded
        <MapContent
          marineTrafficData={memoizedCachedData.marineTrafficData}
          tracksatData={memoizedCachedData.tracksatData}
          spiderTrakData={memoizedCachedData.spiderTrakData}
          personnelData={memoizedCachedData.personnelData}
          videoStreamData={memoizedCachedData.videoStreamData}
          officeData={memoizedCachedData.officeData}
          vehiclesData={memoizedCachedData.vehiclesData}
          incidentData={memoizedCachedData.incidentData}
          carData={memoizedCachedData.carData}
        />
      ) : (
       <div className="loaderContainer">
         <div className="loader">
          <span></span>
        </div>
       </div>

      )}
    </div>
  );
}
