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
    officeData, 
    vehiclesData,
    incidentData,
    carData,
    // checkInData, 
    // vesselsData, 
    // usersData, 
    // aircraftData,
   
} = useContext(DataContext)



  return (
    <div>
      <MapContent
        marineTrafficData={marineTrafficData}
        tracksatData={traksatData}
        spiderTrakData={spidertracksData}
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
