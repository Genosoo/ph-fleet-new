/* eslint-disable react/prop-types */
import MapContent from "./MapContent";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

export default function Map() {
  const {marineTrafficData,
    traksatData, 
    spidertracksData, 
    personnelData, 
    videoStreamData, 
    officesData, 
    vehiclesData,
    incidentData,
    carData,
    checkInData, 
    // vesselsData, 
    // usersData, 
    // aircraftData,
   
} = useContext(DataContext)


console.log("Check In Data:", checkInData)


  return (
    <div className="mapMainContainer">
      <MapContent
        marineTrafficData={marineTrafficData}
        tracksatData={traksatData}
        spiderTrakData={spidertracksData}
        personnelData={personnelData}
        videoStreamData={videoStreamData}
        officesData={officesData}
        vehiclesData={vehiclesData}
        incidentData={incidentData}
        carData={carData}
        checkInData={checkInData}
      />
    </div>
  );
}
