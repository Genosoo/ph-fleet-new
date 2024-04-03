import { useState, useEffect } from "react";
import MapContent from "./MapContent";
import { useFetchData } from "../../context/FetchData";
import Loader from "../../Loader";

export default function MainApp() {
  const [loading, setLoading] = useState(true); // State to track loading status
  const fetchedData = useFetchData();

  useEffect(() => {
    // Check if fetchedData is not null, indicating that data has been fetched
    if (fetchedData !== null) {
      setLoading(false); // Set loading to false when data is fetched
    }
  }, [fetchedData]); // Dependency on fetchedData

  // Display loading indicator if data is still being fetched
  if (loading) {
    return <Loader />
  }

  // Render MapContent component with fetched data when loading is complete
  return (
    <div>
      <MapContent
        marineTrafficData={fetchedData.marineTrafficData}
        tracksatData={fetchedData.tracksatData}
        spiderTrakData={fetchedData.spiderTrakData}
        personnelData={fetchedData.personnelData}
        videoStreamData={fetchedData.videoStreamData}
        officeData={fetchedData.officeData}
        vehiclesData={fetchedData.vehiclesData}
        incidentData={fetchedData.incidentData}
        carData={fetchedData.carData}
      />
    </div>
  );
}
